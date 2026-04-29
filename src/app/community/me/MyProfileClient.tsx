"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { updateDoc, doc, collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth, db, storage } from "@/lib/firebase";
import { useAuth } from "@/lib/useAuth";
import { TierBadge } from "@/components/community/TierBadge";
import { TIERS_BY_ID } from "@/data/tiers";
import type { Investment, AdminDM } from "@/lib/types";

export function MyProfileClient() {
  const router   = useRouter();
  const authState = useAuth();

  const [editing, setEditing]     = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio]             = useState("");
  const [saving, setSaving]       = useState(false);
  const [saveMsg, setSaveMsg]     = useState("");

  const [investments, setInvestments] = useState<Investment[]>([]);
  const [dms, setDms]                 = useState<AdminDM[]>([]);
  const [unreadDms, setUnreadDms]     = useState(0);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // Password change
  const [showPwChange, setShowPwChange] = useState(false);
  const [currentPw, setCurrentPw]       = useState("");
  const [newPw, setNewPw]               = useState("");
  const [pwMsg, setPwMsg]               = useState("");

  // Guard
  useEffect(() => {
    if (authState.status === "unauthenticated") { router.push("/community"); return; }
    if (authState.status === "authenticated") {
      if (authState.profile.isBanned) { auth.signOut(); router.push("/community"); return; }
      if (!authState.profile.isVerified && !authState.profile.isAdmin) {
        router.push("/community/pending"); return;
      }
      setDisplayName(authState.profile.displayName);
      setBio(authState.profile.bio ?? "");
    }
  }, [authState, router]);

  // Load investments
  useEffect(() => {
    if (authState.status !== "authenticated") return;
    const q = query(
      collection(db, "investments"),
      where("profileId", "==", authState.profile.uid),
      where("status", "==", "approved"),
      orderBy("createdAt", "asc"),
    );
    getDocs(q).then(snap => setInvestments(snap.docs.map(d => d.data() as Investment)));
  }, [authState]);

  // Real-time DMs from admin
  useEffect(() => {
    if (authState.status !== "authenticated") return;
    const q = query(
      collection(db, "adminDms"),
      where("memberId", "==", authState.profile.uid),
    );
    return onSnapshot(q, snap => {
      const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() } as AdminDM));
      msgs.sort((a, b) => a.createdAt - b.createdAt);
      setDms(msgs);
      setUnreadDms(msgs.filter(m => m.direction === "to_member" && !m.readAt).length);
    });
  }, [authState]);

  if (authState.status === "loading") return <LoadingScreen />;
  if (authState.status !== "authenticated") return null;

  const { profile } = authState;

  // ── Save profile edits ──────────────────────────────────────────────────────
  const saveProfile = async () => {
    setSaving(true);
    await updateDoc(doc(db, "profiles", profile.uid), {
      displayName: displayName.trim(),
      bio: bio.trim(),
    });
    setSaving(false);
    setSaveMsg("Saved ✓");
    setEditing(false);
    setTimeout(() => setSaveMsg(""), 3000);
  };

  // ── Toggle privacy ──────────────────────────────────────────────────────────
  const togglePrivacy = async () => {
    await updateDoc(doc(db, "profiles", profile.uid), { isPublic: !profile.isPublic });
  };

  // ── Upload avatar ───────────────────────────────────────────────────────────
  const uploadAvatar = async (file: File) => {
    const storageRef = ref(storage, `avatars/${profile.uid}/avatar_${Date.now()}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await updateDoc(doc(db, "profiles", profile.uid), { avatarUrl: url });
  };

  // ── Upload banner ───────────────────────────────────────────────────────────
  const uploadBanner = async (file: File) => {
    const storageRef = ref(storage, `banners/${profile.uid}/banner_${Date.now()}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await updateDoc(doc(db, "profiles", profile.uid), { bannerUrl: url });
  };

  // ── Change password ─────────────────────────────────────────────────────────
  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg("");
    if (newPw.length < 8) { setPwMsg("New password must be at least 8 characters."); return; }
    try {
      const cred = EmailAuthProvider.credential(profile.email, currentPw);
      await reauthenticateWithCredential(auth.currentUser!, cred);
      await updatePassword(auth.currentUser!, newPw);
      setPwMsg("Password updated ✓");
      setCurrentPw(""); setNewPw("");
      setTimeout(() => { setPwMsg(""); setShowPwChange(false); }, 2500);
    } catch {
      setPwMsg("Current password incorrect.");
    }
  };

  const totalInvested = investments.reduce((s, i) => s + i.amountUsd, 0);

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0C" }}>
      {/* Nav */}
      <header className="flex items-center justify-between px-5 py-3 sticky top-0 z-30"
        style={{ background: "rgba(10,10,12,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
        <Link href="/community/feed" className="text-sm text-silver-400 hover:text-white transition">← Feed</Link>
        <span className="text-base font-bold text-white">My Profile</span>
        <button onClick={() => { auth.signOut(); router.push("/community"); }}
          className="text-xs text-silver-600 hover:text-silver-400 transition">Sign out</button>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">

        {/* ── Banner + avatar ── */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
          {/* Banner */}
          <div
            className="relative h-32 cursor-pointer group"
            style={{
              background: profile.bannerUrl
                ? `url(${profile.bannerUrl}) center/cover`
                : "linear-gradient(135deg, rgba(124,92,255,0.3), rgba(10,10,12,0.8))",
            }}
            onClick={() => bannerInputRef.current?.click()}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              style={{ background: "rgba(0,0,0,0.5)" }}>
              <span className="text-white text-sm font-medium">📷 Change banner</span>
            </div>
          </div>
          <input ref={bannerInputRef} type="file" accept="image/*" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) uploadBanner(f); }} />

          {/* Avatar + info row */}
          <div className="px-5 pb-5" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="flex items-end gap-4 -mt-8 mb-4">
              {/* Avatar */}
              <div className="relative cursor-pointer group shrink-0"
                onClick={() => avatarInputRef.current?.click()}>
                <div className="w-16 h-16 rounded-full overflow-hidden border-4"
                  style={{ borderColor: "#0A0A0C", background: "rgba(255,255,255,0.1)" }}>
                  {profile.avatarUrl
                    ? <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
                    : <span className="w-full h-full flex items-center justify-center text-xl font-bold text-white">
                        {profile.displayName?.[0]?.toUpperCase()}
                      </span>
                  }
                </div>
                <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  style={{ background: "rgba(0,0,0,0.6)" }}>
                  <span className="text-white text-xs">Edit</span>
                </div>
              </div>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) uploadAvatar(f); }} />

              <div className="flex-1 min-w-0 pt-8">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-lg font-bold text-white">{profile.displayName}</h1>
                  <TierBadge tierId={profile.highestTierId} size="sm" showName />
                </div>
                <p className="text-silver-500 text-sm">@{profile.username}</p>
              </div>

              <button onClick={() => setEditing(!editing)}
                className="text-xs px-3 py-1.5 rounded-lg transition shrink-0"
                style={{ background: "rgba(124,92,255,0.15)", color: "#a78bfa", border: "1px solid rgba(124,92,255,0.3)" }}>
                {editing ? "Cancel" : "Edit profile"}
              </button>
            </div>

            {!editing && profile.bio && (
              <p className="text-silver-400 text-sm">{profile.bio}</p>
            )}

            {/* Edit form */}
            {editing && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3">
                <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} maxLength={40}
                  className="rounded-xl px-4 py-2.5 text-sm text-white outline-none w-full"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} />
                <textarea value={bio} onChange={e => setBio(e.target.value)} maxLength={140} rows={2} placeholder="Short bio…"
                  className="rounded-xl px-4 py-2.5 text-sm text-white outline-none w-full resize-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} />
                <div className="flex gap-2">
                  <button onClick={saveProfile} disabled={saving}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg, #7C5CFF, #5b3fd9)" }}>
                    {saving ? "Saving…" : "Save"}
                  </button>
                  {saveMsg && <span className="text-sm text-green-400 self-center">{saveMsg}</span>}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* ── Privacy toggle ── */}
        <div className="rounded-2xl p-5 flex items-center justify-between"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div>
            <p className="text-white font-medium text-sm">Public profile</p>
            <p className="text-silver-500 text-xs mt-0.5">
              {profile.isPublic
                ? "Your name, bio, and avatar are visible to other members."
                : "You appear as 'Anonymous backer' — only your tier icon is visible."}
            </p>
          </div>
          <button onClick={togglePrivacy}
            className="relative w-12 h-6 rounded-full transition-colors shrink-0"
            style={{ background: profile.isPublic ? "#7C5CFF" : "rgba(255,255,255,0.1)" }}>
            <span className="absolute top-1 transition-all w-4 h-4 rounded-full bg-white"
              style={{ left: profile.isPublic ? "calc(100% - 20px)" : "4px" }} />
          </button>
        </div>

        {/* ── Investment dashboard ── */}
        <div className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <h2 className="text-white font-semibold mb-4">My Investments</h2>

          {/* Total bar */}
          {totalInvested > 0 && (
            <div className="mb-5">
              <div className="flex justify-between text-xs text-silver-500 mb-1.5">
                <span>Total invested</span>
                <span className="text-white font-semibold">${totalInvested.toLocaleString()}</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, (totalInvested / 15000) * 100)}%`,
                    background: "linear-gradient(90deg, #7C5CFF, #a78bfa)",
                  }} />
              </div>
            </div>
          )}

          {/* Tier badges */}
          {investments.length === 0 ? (
            <p className="text-silver-600 text-sm">No approved investments yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {investments.map(inv => {
                const tier = TIERS_BY_ID[inv.tierId];
                if (!tier) return null;
                return (
                  <div key={inv.id} className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ background: `${tier.color}0d`, border: `1px solid ${tier.color}25` }}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tier.icon}</span>
                      <div>
                        <p className="text-white text-sm font-medium">{tier.name}</p>
                        <p className="text-xs text-silver-500">{tier.description}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold" style={{ color: tier.color }}>
                      ${inv.amountUsd.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Kickstarter upgrade link */}
          <div className="mt-5 pt-4 border-t border-white/5">
            <Link href="/kickstarter"
              className="flex items-center justify-between px-4 py-3 rounded-xl transition hover:scale-[1.01]"
              style={{ background: "rgba(124,92,255,0.08)", border: "1px solid rgba(124,92,255,0.2)" }}>
              <div>
                <p className="text-sm font-medium text-white">Back a higher tier</p>
                <p className="text-xs text-silver-500">Upgrade your investment on Kickstarter</p>
              </div>
              <span className="text-[#7C5CFF] text-sm">→</span>
            </Link>
          </div>
        </div>

        {/* ── Messages from Silver Prime ── */}
        <div className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-white font-medium text-sm">Messages from Silver Prime</span>
            {unreadDms > 0 && (
              <span className="text-xs bg-violet-500/30 text-violet-300 px-2 py-0.5 rounded-full font-semibold">
                {unreadDms} new
              </span>
            )}
          </div>
          {dms.length === 0 ? (
            <p className="text-silver-600 text-sm">No messages yet.</p>
          ) : (
            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
              {dms.map(dm => (
                <div
                  key={dm.id}
                  className={`px-4 py-3 rounded-xl text-sm max-w-[85%] ${
                    dm.direction === "to_member"
                      ? "self-start"
                      : "self-end"
                  }`}
                  style={{
                    background: dm.direction === "to_member"
                      ? "rgba(124,92,255,0.12)"
                      : "rgba(255,255,255,0.06)",
                    border: dm.direction === "to_member"
                      ? "1px solid rgba(124,92,255,0.25)"
                      : "1px solid rgba(255,255,255,0.08)",
                    color: dm.direction === "to_member" ? "#c4b5fd" : "#94a3b8",
                  }}
                >
                  {dm.direction === "to_member" && (
                    <p className="text-xs text-violet-400 font-semibold mb-1">Silver Prime</p>
                  )}
                  <p>{dm.content}</p>
                  <p className="text-xs opacity-50 mt-1">
                    {new Date(dm.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Change password ── */}
        <div className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={() => setShowPwChange(!showPwChange)}
            className="flex items-center justify-between w-full text-left">
            <span className="text-white font-medium text-sm">Change password</span>
            <span className="text-silver-500 text-xs">{showPwChange ? "▲" : "▼"}</span>
          </button>
          {showPwChange && (
            <motion.form initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              onSubmit={changePassword} className="flex flex-col gap-3 mt-4">
              {[
                { label: "Current password", val: currentPw, set: setCurrentPw },
                { label: "New password (min 8 chars)", val: newPw, set: setNewPw },
              ].map(({ label, val, set }) => (
                <div key={label}>
                  <label className="block text-xs text-silver-400 mb-1">{label}</label>
                  <input type="password" value={val} onChange={e => set(e.target.value)} required
                    className="w-full rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} />
                </div>
              ))}
              {pwMsg && <p className={`text-sm ${pwMsg.includes("✓") ? "text-green-400" : "text-red-400"}`}>{pwMsg}</p>}
              <button type="submit" className="px-4 py-2 rounded-xl text-sm font-semibold text-white w-fit"
                style={{ background: "linear-gradient(135deg, #7C5CFF, #5b3fd9)" }}>
                Update password
              </button>
            </motion.form>
          )}
        </div>

      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0C" }}>
      <div className="w-8 h-8 rounded-full border-2 border-[#7C5CFF] border-t-transparent animate-spin" />
    </div>
  );
}
