"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, query, orderBy, limit, onSnapshot,
  addDoc, getDocs, where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/lib/useAuth";
import { TierBadge } from "@/components/community/TierBadge";
import { TIERS } from "@/data/tiers";
import type { FeedMessage, Profile } from "@/lib/types";

// ─── Tier stats bar ────────────────────────────────────────────────────────────

function TierStatsBar() {
  const [stats, setStats] = useState<{ total: number; byTier: Record<string, number>; totalUsd: number }>({
    total: 0, byTier: {}, totalUsd: 0,
  });

  useEffect(() => {
    const q = query(collection(db, "profiles"), where("isVerified", "==", true));
    return onSnapshot(q, (snap) => {
      const byTier: Record<string, number> = {};
      let totalUsd = 0;
      snap.docs.forEach((d) => {
        const p = d.data() as Profile;
        if (p.highestTierId) byTier[p.highestTierId] = (byTier[p.highestTierId] ?? 0) + 1;
        totalUsd += p.totalInvestedUsd ?? 0;
      });
      setStats({ total: snap.size, byTier, totalUsd });
    });
  }, []);

  return (
    <div className="rounded-2xl p-5 mb-6"
      style={{ background: "rgba(124,92,255,0.06)", border: "1px solid rgba(124,92,255,0.15)" }}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#7C5CFF] font-bold text-sm tracking-wider uppercase">Campaign Stats</span>
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-silver-500">Live</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        <Stat label="Total backers"     value={stats.total.toString()} />
        <Stat label="Total invested"    value={`$${stats.totalUsd.toLocaleString()}`} />
        <Stat label="Tiers represented" value={Object.keys(stats.byTier).length.toString()} />
      </div>
      <div className="flex flex-wrap gap-2">
        {TIERS.slice().reverse().map((t) => {
          const count = stats.byTier[t.id] ?? 0;
          if (!count) return null;
          return (
            <span key={t.id} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: `${t.color}12`, border: `1px solid ${t.color}30`, color: t.color }}>
              {t.icon} {count} {count === 1 ? "backer" : "backers"}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-xs text-silver-500">{label}</p>
    </div>
  );
}

// ─── Platinum/Lead Investor featured profiles ──────────────────────────────────

function FeaturedFounders() {
  const [founders, setFounders] = useState<Profile[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "profiles"),
      where("highestTierLevel", ">=", 8),
      where("isPublic", "==", true),
      where("isVerified", "==", true),
    );
    getDocs(q).then((snap) => setFounders(snap.docs.map((d) => d.data() as Profile)));
  }, []);

  if (!founders.length) return null;

  return (
    <div className="mb-6">
      <p className="text-xs font-semibold text-silver-500 uppercase tracking-wider mb-3">👑 Platinum Founders</p>
      <div className="flex flex-wrap gap-3">
        {founders.map((f) => (
          <Link key={f.uid} href={`/community/profile/${f.uid}`}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl transition hover:scale-[1.02]"
            style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" }}>
            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0"
              style={{ background: "rgba(255,255,255,0.08)" }}>
              {f.avatarUrl
                ? <img src={f.avatarUrl} alt={f.displayName} className="w-full h-full object-cover" />
                : <span className="w-full h-full flex items-center justify-center text-sm font-bold text-white">
                    {f.displayName?.[0]?.toUpperCase()}
                  </span>
              }
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">{f.displayName}</p>
              <TierBadge tierId={f.highestTierId} size="sm" showName />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Feed message bubble ───────────────────────────────────────────────────────

function MessageBubble({ msg, isOwn, isAdmin, viewerIsAdmin, onDelete }: {
  msg: FeedMessage;
  isOwn: boolean;
  isAdmin: boolean;
  viewerIsAdmin: boolean;
  onDelete: (id: string) => void;
}) {
  // Admins can always see and click any profile
  const profileHidden = !msg.isPublic && !isOwn && !viewerIsAdmin;
  const isClickable   = msg.profileId !== "system" && (!profileHidden || viewerIsAdmin);

  if (msg.isAnnouncement) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center py-1">
        <span className="text-xs px-4 py-1.5 rounded-full font-medium"
          style={{ background: "rgba(124,92,255,0.12)", border: "1px solid rgba(124,92,255,0.2)", color: "#a78bfa" }}>
          {msg.content}
        </span>
      </motion.div>
    );
  }

  // Avatar element — gold ring for admin authors
  const avatarEl = (
    <div
      className="w-8 h-8 rounded-full overflow-hidden shrink-0"
      style={{
        background: "rgba(255,255,255,0.08)",
        // Amber ring for admin messages, subtle ring otherwise
        boxShadow: msg.isAuthorAdmin
          ? "0 0 0 2px #f59e0b"
          : "0 0 0 1.5px rgba(255,255,255,0.08)",
      }}
    >
      {!profileHidden && msg.avatarUrl
        ? <img src={msg.avatarUrl} alt="" className="w-full h-full object-cover" />
        : <span className="w-full h-full flex items-center justify-center text-xs font-bold text-silver-400">
            {profileHidden && !viewerIsAdmin ? "?" : msg.displayName?.[0]?.toUpperCase() ?? "?"}
          </span>
      }
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isOwn ? "flex-row-reverse" : ""}`}>

      {/* Avatar */}
      {isClickable ? (
        <Link href={`/community/profile/${msg.profileId}`} className="shrink-0 hover:opacity-80 transition">
          {avatarEl}
        </Link>
      ) : (
        <div className="shrink-0">{avatarEl}</div>
      )}

      {/* Bubble */}
      <div className={`flex flex-col gap-1 max-w-[72%] ${isOwn ? "items-end" : "items-start"}`}>
        <div className="flex items-center gap-2 flex-wrap">
          {!isOwn && (
            <span className="text-xs text-silver-500">
              {profileHidden && !viewerIsAdmin ? "Anonymous backer" : msg.displayName}
            </span>
          )}
          {msg.isAuthorAdmin && (
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md"
              style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)" }}>
              Admin
            </span>
          )}
          <TierBadge tierId={msg.highestTierId} size="sm" />
        </div>
        <div className="rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
          style={
            isOwn
              ? { background: "linear-gradient(135deg, rgba(124,92,255,0.8), rgba(100,72,230,0.8))", color: "white" }
              : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", color: "#e2e8f0" }
          }>
          {msg.content}
        </div>
        {isAdmin && (
          <button onClick={() => onDelete(msg.id)} className="text-xs text-red-400/60 hover:text-red-400 transition">
            delete
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Contact Admin Modal ───────────────────────────────────────────────────────

function ContactAdminModal({ profileUid, displayName, onClose }: {
  profileUid: string;
  displayName: string;
  onClose: () => void;
}) {
  const [text, setText]       = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      await addDoc(collection(db, "adminDms"), {
        adminId:           "",
        memberId:          profileUid,
        memberDisplayName: displayName,
        direction:         "from_member",
        content:           text.trim(),
        readAt:            null,
        createdAt:         Date.now(),
      });
      setSent(true);
      setTimeout(onClose, 1800);
    } catch (e) { console.error(e); }
    setSending(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl p-6"
        style={{ background: "#111118", border: "1px solid rgba(124,92,255,0.3)" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Message Admin</h3>
          <button onClick={onClose} className="text-silver-500 hover:text-white text-xl leading-none">×</button>
        </div>
        {sent ? (
          <p className="text-emerald-400 text-sm text-center py-4">Message sent! ✓ We&apos;ll get back to you soon.</p>
        ) : (
          <form onSubmit={send} className="flex flex-col gap-3">
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Write your message to the Silver Prime team…"
              rows={4}
              className="w-full rounded-xl px-4 py-3 text-sm text-white resize-none outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
            <button type="submit" disabled={sending || !text.trim()}
              className="w-full rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-40 transition"
              style={{ background: "linear-gradient(135deg, #7C5CFF, #5b3fd9)" }}>
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

// ─── Main Feed ────────────────────────────────────────────────────────────────

export function FeedClient() {
  const router    = useRouter();
  const authState = useAuth();

  const [messages, setMessages] = useState<FeedMessage[]>([]);
  const [input, setInput]       = useState("");
  const [sending, setSending]   = useState(false);
  const [showDmModal, setShowDmModal] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Guard
  useEffect(() => {
    if (authState.status === "unauthenticated") { router.push("/community"); return; }
    if (authState.status === "authenticated") {
      if (authState.profile.isBanned) { auth.signOut(); router.push("/community"); return; }
      if (!authState.profile.isVerified && !authState.profile.isAdmin) {
        router.push("/community/pending"); return;
      }
    }
  }, [authState, router]);

  // Real-time feed
  useEffect(() => {
    const q = query(collection(db, "feedMessages"), orderBy("createdAt", "asc"), limit(100));
    return onSnapshot(q, (snap) =>
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() } as FeedMessage)))
    );
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || sending || authState.status !== "authenticated") return;
    const { profile } = authState;
    setSending(true);
    setInput("");
    try {
      await addDoc(collection(db, "feedMessages"), {
        profileId:        profile.uid,
        // Admins always show their name/avatar in the feed
        displayName:      profile.isAdmin ? profile.displayName : (profile.isPublic ? profile.displayName : ""),
        avatarUrl:        profile.isAdmin ? profile.avatarUrl   : (profile.isPublic ? profile.avatarUrl   : ""),
        highestTierId:    profile.highestTierId,
        highestTierLevel: profile.highestTierLevel,
        isPublic:         profile.isAdmin ? true : profile.isPublic,
        isAuthorAdmin:    profile.isAdmin ?? false,
        content:          text,
        isAnnouncement:   false,
        createdAt:        Date.now(),
      });
    } catch (e) { console.error(e); }
    setSending(false);
  }, [input, sending, authState]);

  const handleDelete = useCallback(async (id: string) => {
    const { deleteDoc, doc: firestoreDoc } = await import("firebase/firestore");
    await deleteDoc(firestoreDoc(db, "feedMessages", id));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  if (authState.status === "loading") return <LoadingScreen />;
  if (authState.status !== "authenticated") return null;

  const { profile } = authState;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0A0C" }}>
      {/* Nav */}
      <header className="flex items-center justify-between px-5 py-3 shrink-0 sticky top-0 z-30"
        style={{ background: "rgba(10,10,12,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-2">
          <Link href="/" className="text-base font-bold text-white">Silver Prime</Link>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium hidden sm:inline"
            style={{ background: "rgba(124,92,255,0.18)", color: "#a78bfa" }}>
            Founders Club
          </span>
        </div>
        <div className="flex items-center gap-3">
          <TierBadge tierId={profile.highestTierId} size="sm" showName />
          {/* Members: Contact Admin button */}
          {!profile.isAdmin && (
            <button
              onClick={() => setShowDmModal(true)}
              className="text-sm transition hidden sm:block"
              style={{ color: "#f59e0b" }}
            >
              💬 Message Admin
            </button>
          )}
          <Link href="/community/me" className="text-sm text-silver-400 hover:text-white transition">
            My Profile
          </Link>
          {profile.isAdmin && (
            <Link href="/admin/dashboard" className="text-sm text-amber-400 hover:text-amber-300 transition">
              Admin ⚡
            </Link>
          )}
          <button onClick={() => { auth.signOut(); router.push("/community"); }}
            className="text-xs text-silver-600 hover:text-silver-400 transition">
            Sign out
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 flex flex-col gap-4">
        <TierStatsBar />
        <FeaturedFounders />

        {/* Feed */}
        <div className="flex-1 rounded-2xl flex flex-col overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-silver-400 uppercase tracking-wider">Live Community Feed</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-[320px] max-h-[520px]">
            {messages.length === 0 && (
              <p className="text-center text-silver-600 text-sm py-10">No messages yet — be the first to say hello! 👋</p>
            )}
            <AnimatePresence>
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  isOwn={msg.profileId === profile.uid}
                  isAdmin={profile.isAdmin}
                  viewerIsAdmin={profile.isAdmin}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 pb-4 pt-2 border-t border-white/5">
            <div className="flex items-center gap-3 rounded-xl px-4 py-2.5"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(124,92,255,0.2)" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Say something to the community…"
                className="flex-1 bg-transparent text-sm text-white placeholder-silver-600 outline-none"
              />
              <button onClick={sendMessage} disabled={!input.trim() || sending}
                className="shrink-0 rounded-lg p-1.5 transition disabled:opacity-30"
                style={{ background: input.trim() ? "rgba(124,92,255,0.8)" : "transparent" }}
                aria-label="Send">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M12 7L2 2l2.5 5L2 12l10-5z" fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            {!profile.isPublic && !profile.isAdmin && (
              <p className="text-xs text-silver-600 mt-1.5 px-1">
                Your profile is private — your name and avatar are hidden to others.{" "}
                <Link href="/community/me" className="text-[#7C5CFF] hover:underline">Change in settings</Link>
              </p>
            )}
            {/* Mobile Message Admin button */}
            {!profile.isAdmin && (
              <button onClick={() => setShowDmModal(true)}
                className="mt-2 text-xs sm:hidden w-full text-center py-2 rounded-lg transition"
                style={{ color: "#f59e0b", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                💬 Message Admin
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contact Admin Modal */}
      {showDmModal && (
        <ContactAdminModal
          profileUid={profile.uid}
          displayName={profile.displayName}
          onClose={() => setShowDmModal(false)}
        />
      )}
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0C" }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#7C5CFF] border-t-transparent animate-spin" />
        <p className="text-silver-500 text-sm">Loading…</p>
      </div>
    </div>
  );
}
