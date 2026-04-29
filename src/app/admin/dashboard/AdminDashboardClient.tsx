"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection, getDocs, doc, updateDoc, addDoc,
  query, where, onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/lib/useAuth";
import { TierBadge } from "@/components/community/TierBadge";
import { TIERS, TIERS_BY_ID } from "@/data/tiers";
import type { Profile, Investment, AdminDM } from "@/lib/types";

type Tab = "overview" | "pending" | "members";

interface MemberRow extends Profile {
  investments: Investment[];
}

export function AdminDashboardClient() {
  const authState = useAuth();
  const router    = useRouter();

  const [tab,     setTab]     = useState<Tab>("overview");
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");
  const [selected, setSelected] = useState<MemberRow | null>(null);

  // DM state
  const [dms,    setDms]    = useState<AdminDM[]>([]);
  const [dmText, setDmText] = useState("");

  // Deny flow
  const [denyTarget, setDenyTarget] = useState<string | null>(null);
  const [denyNote,   setDenyNote]   = useState("");

  // ── Auth guard ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (authState.status === "unauthenticated") { router.replace("/admin"); return; }
    if (authState.status === "authenticated" && !authState.profile.isAdmin) {
      router.replace("/admin");
    }
  }, [authState, router]);

  // ── Load all members + investments ────────────────────────────────────────
  useEffect(() => {
    if (authState.status !== "authenticated" || !authState.profile.isAdmin) return;

    (async () => {
      setLoading(true);

      const [profilesSnap, investsSnap] = await Promise.all([
        getDocs(collection(db, "profiles")),
        getDocs(collection(db, "investments")),
      ]);

      const byProfile: Record<string, Investment[]> = {};
      investsSnap.docs.forEach(d => {
        const inv = { id: d.id, ...d.data() } as Investment;
        if (!byProfile[inv.profileId]) byProfile[inv.profileId] = [];
        byProfile[inv.profileId].push(inv);
      });

      setMembers(
        profilesSnap.docs.map(d => ({
          ...(d.data() as Profile),
          investments: byProfile[d.id] ?? [],
        }))
      );
      setLoading(false);
    })();
  }, [authState]);

  // ── Real-time DMs for selected member ────────────────────────────────────
  useEffect(() => {
    if (!selected || authState.status !== "authenticated") { setDms([]); return; }
    const q = query(
      collection(db, "adminDms"),
      where("memberId", "==", selected.uid)
    );
    return onSnapshot(q, snap => {
      const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() } as AdminDM));
      msgs.sort((a, b) => a.createdAt - b.createdAt);
      setDms(msgs);
    });
  }, [selected, authState]);

  // ── Guards ────────────────────────────────────────────────────────────────
  if (authState.status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center">
        <div className="text-silver-400 text-sm">Loading dashboard…</div>
      </div>
    );
  }
  if (authState.status !== "authenticated" || !authState.profile.isAdmin) return null;

  const admin = authState.profile;

  // ── Derived stats ─────────────────────────────────────────────────────────
  const total       = members.length;
  const verified    = members.filter(m => m.isVerified && !m.isBanned).length;
  const pendingList = members.filter(m => !m.isVerified && !m.isBanned);
  const banned      = members.filter(m => m.isBanned).length;
  const totalRaised = members.reduce((s, m) => s + m.totalInvestedUsd, 0);

  const filtered = members.filter(m => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      m.displayName.toLowerCase().includes(s) ||
      m.email.toLowerCase().includes(s) ||
      m.username.toLowerCase().includes(s)
    );
  });

  // ── Actions ───────────────────────────────────────────────────────────────
  async function approveMember(member: MemberRow) {
    await updateDoc(doc(db, "profiles", member.uid), { isVerified: true });

    for (const inv of member.investments.filter(i => i.status === "pending")) {
      await updateDoc(doc(db, "investments", inv.id), {
        status: "approved",
        reviewedBy: admin.uid,
        reviewedAt: Date.now(),
      });
    }

    // Feed announcement
    await addDoc(collection(db, "feedMessages"), {
      profileId:        "system",
      displayName:      "Silver Prime",
      avatarUrl:        "",
      highestTierId:    member.highestTierId,
      highestTierLevel: member.highestTierLevel,
      isPublic:         true,
      content: `🎉 A new ${member.highestTierId ? (TIERS_BY_ID[member.highestTierId]?.name ?? "backer") : "backer"} just joined the Founders Club!`,
      isAnnouncement:   true,
      createdAt:        Date.now(),
    });

    patch(member.uid, { isVerified: true });
  }

  async function denyMember(member: MemberRow, note: string) {
    for (const inv of member.investments.filter(i => i.status === "pending")) {
      await updateDoc(doc(db, "investments", inv.id), {
        status:     "denied",
        reviewedBy: admin.uid,
        reviewedAt: Date.now(),
        adminNote:  note,
      });
    }
    setDenyTarget(null);
    setDenyNote("");
  }

  async function toggleBan(member: MemberRow) {
    const banned = !member.isBanned;
    await updateDoc(doc(db, "profiles", member.uid), { isBanned: banned });
    patch(member.uid, { isBanned: banned });
  }

  async function sendDM(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || !dmText.trim()) return;
    await addDoc(collection(db, "adminDms"), {
      adminId:           admin.uid,
      memberId:          selected.uid,
      memberDisplayName: selected.displayName,
      direction:         "to_member",
      content:           dmText.trim(),
      readAt:            null,
      createdAt:         Date.now(),
    });
    setDmText("");
  }

  // Helper — patch local state
  function patch(uid: string, changes: Partial<MemberRow>) {
    setMembers(prev => prev.map(m => m.uid === uid ? { ...m, ...changes } : m));
    setSelected(prev => prev?.uid === uid ? { ...prev, ...changes } : prev);
  }

  // ── Shared style helpers ──────────────────────────────────────────────────
  const btn = (variant: "green" | "red" | "ghost") =>
    `px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
      variant === "green" ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" :
      variant === "red"   ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" :
                            "bg-white/5 text-silver-400 hover:bg-white/10"
    }`;

  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white flex flex-col">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header className="border-b border-white/10 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-silver-300">Silver Prime</span>
          <span className="text-silver-600">/</span>
          <span className="font-bold">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-silver-500">{admin.email}</span>
          <button
            onClick={() => signOut(auth).then(() => router.replace("/admin"))}
            className="text-xs text-silver-400 hover:text-white transition"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ───────────────────────────────────────────────────── */}
        <aside className="w-44 border-r border-white/10 p-4 flex flex-col gap-1 shrink-0">
          {(["overview", "pending", "members"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                tab === t
                  ? "bg-white/10 text-white"
                  : "text-silver-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {t === "pending"
                ? `Pending${pendingList.length > 0 ? ` (${pendingList.length})` : ""}`
                : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </aside>

        {/* ── Main ──────────────────────────────────────────────────────── */}
        <main className="flex-1 overflow-auto p-6">

          {/* ══ OVERVIEW ══════════════════════════════════════════════════ */}
          {tab === "overview" && (
            <div className="max-w-2xl">
              <h1 className="text-xl font-bold mb-6">Overview</h1>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total members",  value: total },
                  { label: "Verified",        value: verified },
                  { label: "Pending",         value: pendingList.length },
                  { label: "Banned",          value: banned },
                ].map(s => (
                  <div key={s.label} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <div className="text-2xl font-bold">{s.value}</div>
                    <div className="text-xs text-silver-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-6">
                <div className="text-xs text-silver-400 mb-1">Total investment raised</div>
                <div className="text-3xl font-bold">${totalRaised.toLocaleString()}</div>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <div className="text-sm font-semibold mb-4">Backers by tier</div>
                <div className="flex flex-col gap-2">
                  {TIERS.slice().reverse().map(tier => {
                    const count = members.filter(
                      m => m.highestTierId === tier.id && m.isVerified && !m.isBanned
                    ).length;
                    if (!count) return null;
                    return (
                      <div key={tier.id} className="flex items-center gap-3">
                        <TierBadge tierId={tier.id} size="sm" showName />
                        <span className="text-sm text-silver-300">
                          {count} backer{count !== 1 ? "s" : ""}
                        </span>
                      </div>
                    );
                  })}
                  {members.filter(m => m.isVerified).length === 0 && (
                    <p className="text-sm text-silver-500">No verified members yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══ PENDING ═══════════════════════════════════════════════════ */}
          {tab === "pending" && (
            <div className="max-w-2xl">
              <h1 className="text-xl font-bold mb-6">
                Pending Verifications
                {pendingList.length > 0 && (
                  <span className="ml-3 text-sm bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">
                    {pendingList.length} waiting
                  </span>
                )}
              </h1>

              {pendingList.length === 0 ? (
                <p className="text-silver-500 text-sm">No pending verifications 🎉</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {pendingList.map(member => {
                    const inv = member.investments[0];
                    return (
                      <div key={member.uid} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        {/* Member info row */}
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="min-w-0">
                            <div className="font-semibold">
                              {member.displayName}{" "}
                              <span className="text-silver-500 text-sm font-normal">@{member.username}</span>
                            </div>
                            <div className="text-xs text-silver-400 mt-0.5">{member.email}</div>
                            <div className="mt-2 flex items-center gap-2 flex-wrap">
                              <TierBadge tierId={member.highestTierId} size="sm" showName />
                              {inv && (
                                <span className="text-xs text-silver-400">
                                  ${inv.amountUsd.toLocaleString()} claimed
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-silver-500 mt-1">
                              Joined {new Date(member.createdAt).toLocaleDateString()}
                            </div>
                          </div>

                          {/* Proof thumbnail */}
                          {inv?.proofUrl && (
                            <a href={inv.proofUrl} target="_blank" rel="noreferrer" className="shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={inv.proofUrl}
                                alt="Proof"
                                className="w-28 h-20 object-cover rounded-xl border border-white/10 hover:opacity-80 transition"
                              />
                            </a>
                          )}
                        </div>

                        {/* Action buttons / deny form */}
                        {denyTarget === member.uid ? (
                          <div className="mt-4 flex flex-col gap-2">
                            <input
                              type="text"
                              value={denyNote}
                              onChange={e => setDenyNote(e.target.value)}
                              placeholder="Reason for denial (optional — member won't see this)"
                              className="w-full rounded-xl px-3 py-2 text-sm bg-white/5 border border-white/10 text-white placeholder-silver-600 outline-none"
                            />
                            <div className="flex gap-2">
                              <button onClick={() => denyMember(member, denyNote)} className={btn("red")}>
                                Confirm Deny
                              </button>
                              <button onClick={() => setDenyTarget(null)} className={btn("ghost")}>
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4 flex gap-2 flex-wrap">
                            <button onClick={() => approveMember(member)} className={btn("green")}>
                              ✓ Approve
                            </button>
                            <button onClick={() => setDenyTarget(member.uid)} className={btn("red")}>
                              ✗ Deny
                            </button>
                            <button
                              onClick={() => { setSelected(member); setTab("members"); }}
                              className={btn("ghost")}
                            >
                              View full profile →
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ══ MEMBERS ═══════════════════════════════════════════════════ */}
          {tab === "members" && (
            <div className="flex gap-6 h-full">

              {/* Member list */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-xl font-bold">Members</h1>
                  <span className="text-sm text-silver-500">{filtered.length} shown</span>
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search name, email, username…"
                  className="w-full rounded-xl px-4 py-2.5 mb-4 text-sm bg-white/5 border border-white/10 text-white placeholder-silver-600 outline-none"
                />
                <div className="flex flex-col gap-2">
                  {filtered.map(member => (
                    <button
                      key={member.uid}
                      onClick={() => setSelected(prev => prev?.uid === member.uid ? null : member)}
                      className={`w-full text-left rounded-xl px-4 py-3 border transition flex items-center gap-3 ${
                        selected?.uid === member.uid
                          ? "bg-white/10 border-violet-500/40"
                          : "bg-white/5 border-white/10 hover:bg-white/8"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm">{member.displayName}</span>
                          <span className="text-xs text-silver-500">@{member.username}</span>
                          <TierBadge tierId={member.highestTierId} size="sm" />
                          {!member.isVerified && (
                            <span className="text-xs bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full">Pending</span>
                          )}
                          {member.isBanned && (
                            <span className="text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full">Banned</span>
                          )}
                        </div>
                        <div className="text-xs text-silver-500 mt-0.5">{member.email}</div>
                      </div>
                      <div className="text-xs text-silver-400 shrink-0">
                        ${member.totalInvestedUsd.toLocaleString()}
                      </div>
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <p className="text-sm text-silver-500">No members match your search.</p>
                  )}
                </div>
              </div>

              {/* ── Detail panel ──────────────────────────────────────── */}
              {selected && (
                <div className="w-80 shrink-0 border-l border-white/10 pl-6 overflow-y-auto flex flex-col gap-4">

                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold">Member Detail</h2>
                    <button onClick={() => setSelected(null)} className="text-silver-500 hover:text-white text-xl leading-none">×</button>
                  </div>

                  {/* Profile card */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="font-semibold">{selected.displayName}</div>
                    <div className="text-xs text-silver-400">@{selected.username}</div>
                    <div className="text-xs text-silver-400 mt-0.5 break-all">{selected.email}</div>
                    {selected.bio && (
                      <div className="text-xs text-silver-300 mt-2 italic">&ldquo;{selected.bio}&rdquo;</div>
                    )}
                    <div className="mt-3">
                      <TierBadge tierId={selected.highestTierId} size="sm" showName />
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      {[
                        { label: "Total invested",  value: `$${selected.totalInvestedUsd.toLocaleString()}` },
                        { label: "Joined",           value: new Date(selected.createdAt).toLocaleDateString() },
                        {
                          label: "Status",
                          value: selected.isBanned ? "Banned" : selected.isVerified ? "Verified" : "Pending",
                          colour: selected.isBanned ? "text-red-400" : selected.isVerified ? "text-emerald-400" : "text-amber-400",
                        },
                        { label: "Public profile",  value: selected.isPublic ? "Yes" : "No" },
                        { label: "Admin",            value: selected.isAdmin ? "Yes" : "No" },
                        { label: "UID",              value: selected.uid.slice(0, 8) + "…" },
                      ].map(row => (
                        <div key={row.label} className="bg-white/5 rounded-lg p-2">
                          <div className="text-silver-500">{row.label}</div>
                          <div className={`font-semibold ${(row as { colour?: string }).colour ?? ""}`}>
                            {row.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Investments */}
                  {selected.investments.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-silver-400 mb-2 uppercase tracking-wide">Investments</div>
                      <div className="flex flex-col gap-2">
                        {selected.investments.map(inv => (
                          <div key={inv.id} className="bg-white/5 rounded-xl p-3 border border-white/10">
                            <div className="flex items-center justify-between mb-1">
                              <TierBadge tierId={inv.tierId} size="sm" showName />
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                inv.status === "approved" ? "bg-emerald-500/20 text-emerald-400" :
                                inv.status === "denied"   ? "bg-red-500/20 text-red-400" :
                                                            "bg-amber-500/20 text-amber-400"
                              }`}>
                                {inv.status}
                              </span>
                            </div>
                            <div className="text-sm font-semibold">${inv.amountUsd.toLocaleString()}</div>
                            {inv.proofUrl && (
                              <a
                                href={inv.proofUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-blue-400 hover:underline mt-1 block"
                              >
                                View proof →
                              </a>
                            )}
                            {inv.adminNote && (
                              <div className="text-xs text-silver-500 mt-1">Note: {inv.adminNote}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div>
                    <div className="text-xs font-semibold text-silver-400 mb-2 uppercase tracking-wide">Actions</div>
                    <div className="flex flex-col gap-2">
                      {!selected.isVerified && !selected.isBanned && (
                        <>
                          <button onClick={() => approveMember(selected)} className={`${btn("green")} text-left`}>
                            ✓ Approve member
                          </button>
                          <button onClick={() => setDenyTarget(selected.uid)} className={`${btn("red")} text-left`}>
                            ✗ Deny member
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => toggleBan(selected)}
                        className={`${selected.isBanned ? btn("green") : btn("red")} text-left`}
                      >
                        {selected.isBanned ? "🔓 Unban member" : "🚫 Ban member"}
                      </button>
                    </div>

                    {denyTarget === selected.uid && (
                      <div className="mt-2 flex flex-col gap-2">
                        <input
                          type="text"
                          value={denyNote}
                          onChange={e => setDenyNote(e.target.value)}
                          placeholder="Reason (optional)"
                          className="w-full rounded-xl px-3 py-2 text-xs bg-white/5 border border-white/10 text-white placeholder-silver-600 outline-none"
                        />
                        <div className="flex gap-2">
                          <button onClick={() => denyMember(selected, denyNote)} className={btn("red")}>
                            Confirm Deny
                          </button>
                          <button onClick={() => setDenyTarget(null)} className={btn("ghost")}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* DM thread */}
                  <div>
                    <div className="text-xs font-semibold text-silver-400 mb-2 uppercase tracking-wide">
                      Direct Message
                    </div>
                    <div className="bg-white/5 rounded-xl border border-white/10 p-3 min-h-[80px] max-h-52 overflow-y-auto mb-2 flex flex-col gap-2">
                      {dms.length === 0 ? (
                        <span className="text-xs text-silver-600">No messages yet.</span>
                      ) : (
                        dms.map(dm => (
                          <div
                            key={dm.id}
                            className={`text-xs px-3 py-2 rounded-lg max-w-[90%] ${
                              dm.direction === "to_member"
                                ? "bg-violet-500/20 text-violet-200 self-end"
                                : "bg-white/10 text-silver-200 self-start"
                            }`}
                          >
                            {dm.content}
                          </div>
                        ))
                      )}
                    </div>
                    <form onSubmit={sendDM} className="flex gap-2">
                      <input
                        type="text"
                        value={dmText}
                        onChange={e => setDmText(e.target.value)}
                        placeholder="Message member…"
                        className="flex-1 rounded-xl px-3 py-2 text-xs bg-white/5 border border-white/10 text-white placeholder-silver-600 outline-none"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 rounded-xl bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 text-xs font-semibold transition"
                      >
                        Send
                      </button>
                    </form>
                  </div>

                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
