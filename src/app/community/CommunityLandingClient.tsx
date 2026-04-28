"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

// ─── Tier preview badges shown on the landing ────────────────────────────────

const TIER_PREVIEWS = [
  { icon: "👑", name: "Lead Investor",    color: "#fbbf24" },
  { icon: "💎", name: "Founding Partner", color: "#e879f9" },
  { icon: "🏆", name: "Innovator",        color: "#f59e0b" },
  { icon: "🛸", name: "Pro Bundle",       color: "#a78bfa" },
  { icon: "🚀", name: "App Founding",     color: "#60a5fa" },
  { icon: "🌟", name: "Supporter",        color: "#94a3b8" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function CommunityLandingClient() {
  const router = useRouter();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showReset, setShowReset] = useState(false);

  // ── Login ──────────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const profileSnap = await getDoc(doc(db, "profiles", cred.user.uid));

      if (!profileSnap.exists()) {
        setError("Profile not found. Please contact support.");
        setLoading(false);
        return;
      }

      const profile = profileSnap.data();

      if (profile.isBanned) {
        setError("Your account has been suspended. Contact support if you believe this is an error.");
        await auth.signOut();
        setLoading(false);
        return;
      }

      if (profile.isAdmin) {
        router.push("/admin/dashboard");
        return;
      }

      if (!profile.isVerified) {
        router.push("/community/pending");
        return;
      }

      router.push("/community/feed");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === "auth/invalid-credential" || code === "auth/user-not-found" || code === "auth/wrong-password") {
        setError("Invalid email or password.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please wait a moment before trying again.");
      } else {
        setError("Login failed. Please try again.");
      }
      setLoading(false);
    }
  };

  // ── Password reset ─────────────────────────────────────────────────────────
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch {
      setError("Could not send reset email. Check the address and try again.");
    }
    setLoading(false);
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0A0A0C" }}
    >
      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold text-white">Silver Prime</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: "rgba(124,92,255,0.18)", color: "#a78bfa" }}>
            Founders Club
          </span>
        </Link>
        <Link
          href="/kickstarter"
          className="text-sm text-silver-400 hover:text-white transition"
        >
          Not a backer yet? →
        </Link>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* ── Left: hero info panel ── */}
        <div
          className="lg:w-1/2 flex flex-col justify-center px-8 py-16 lg:px-16"
          style={{
            background: "linear-gradient(135deg, rgba(124,92,255,0.08) 0%, rgba(10,10,12,0) 60%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#7C5CFF] text-sm font-semibold tracking-wider uppercase mb-3">
              Exclusive Access
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Silver Prime<br />
              <span style={{ color: "#a78bfa" }}>Founders Club</span>
            </h1>
            <p className="text-silver-400 text-lg leading-relaxed mb-8 max-w-md">
              The private community for Silver Prime Kickstarter backers.
              Track your investment, connect with fellow founders, and watch
              the campaign grow in real time.
            </p>

            {/* Tier badge showcase */}
            <div className="flex flex-wrap gap-2 mb-8">
              {TIER_PREVIEWS.map((t) => (
                <span
                  key={t.name}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    background: `${t.color}18`,
                    border: `1px solid ${t.color}40`,
                    color: t.color,
                  }}
                >
                  {t.icon} {t.name}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-2 text-sm text-silver-500">
              <span>✅ Verified investors only</span>
              <span>✅ Live campaign stats & real-time feed</span>
              <span>✅ Tier badges + investment dashboard</span>
              <span>✅ Direct line to the Silver Prime team</span>
            </div>
          </motion.div>
        </div>

        {/* ── Right: login / reset form ── */}
        <div className="lg:w-1/2 flex items-center justify-center px-6 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-sm"
          >
            <AnimatePresence mode="wait">
              {!showReset ? (
                /* ── Login form ── */
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div
                    className="rounded-2xl p-8"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(124,92,255,0.2)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <h2 className="text-xl font-bold text-white mb-1">Member Login</h2>
                    <p className="text-silver-500 text-sm mb-6">
                      Don&apos;t have an account?{" "}
                      <Link href="/community/signup" className="text-[#7C5CFF] hover:text-[#a78bfa] transition">
                        Apply to join →
                      </Link>
                    </p>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                      <div>
                        <label className="block text-xs font-medium text-silver-400 mb-1.5">
                          Email address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-silver-600 outline-none focus:ring-1 transition"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                          placeholder="you@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-silver-400 mb-1.5">
                          Password
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-silver-600 outline-none focus:ring-1 transition"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                          placeholder="••••••••"
                        />
                      </div>

                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-400 px-1"
                        >
                          {error}
                        </motion.p>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl py-3 text-sm font-semibold text-white transition disabled:opacity-50"
                        style={{ background: "linear-gradient(135deg, #7C5CFF, #5b3fd9)" }}
                      >
                        {loading ? "Signing in…" : "Sign in"}
                      </button>

                      <button
                        type="button"
                        onClick={() => { setShowReset(true); setError(""); }}
                        className="text-xs text-silver-500 hover:text-silver-300 transition text-center"
                      >
                        Forgot password?
                      </button>
                    </form>
                  </div>
                </motion.div>
              ) : (
                /* ── Password reset form ── */
                <motion.div
                  key="reset"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div
                    className="rounded-2xl p-8"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(124,92,255,0.2)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <h2 className="text-xl font-bold text-white mb-1">Reset Password</h2>
                    <p className="text-silver-500 text-sm mb-6">
                      Enter your email and we&apos;ll send a reset link.
                    </p>

                    {resetSent ? (
                      <div className="text-center py-4">
                        <p className="text-2xl mb-3">📬</p>
                        <p className="text-white font-medium mb-1">Reset email sent!</p>
                        <p className="text-silver-500 text-sm mb-5">
                          Check your inbox (and spam folder).
                        </p>
                        <button
                          onClick={() => { setShowReset(false); setResetSent(false); }}
                          className="text-sm text-[#7C5CFF] hover:text-[#a78bfa] transition"
                        >
                          ← Back to login
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleReset} className="flex flex-col gap-4">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-silver-600 outline-none focus:ring-1 transition"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                          placeholder="you@example.com"
                        />
                        {error && (
                          <p className="text-sm text-red-400 px-1">{error}</p>
                        )}
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full rounded-xl py-3 text-sm font-semibold text-white transition disabled:opacity-50"
                          style={{ background: "linear-gradient(135deg, #7C5CFF, #5b3fd9)" }}
                        >
                          {loading ? "Sending…" : "Send reset link"}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setShowReset(false); setError(""); }}
                          className="text-xs text-silver-500 hover:text-silver-300 transition text-center"
                        >
                          ← Back to login
                        </button>
                      </form>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-center text-xs text-silver-600 mt-5">
              This platform is exclusively for verified Kickstarter backers.{" "}
              <Link href="/kickstarter" className="hover:text-silver-400 transition">
                Learn about the campaign →
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
