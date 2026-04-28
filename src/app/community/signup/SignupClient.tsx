"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";
import { TIERS } from "@/data/tiers";

type Step = "account" | "profile" | "proof" | "done";

export function SignupClient() {
  const [step, setStep] = useState<Step>("account");

  // Account step
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [confirm, setConfirm]       = useState("");

  // Profile step
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername]       = useState("");
  const [bio, setBio]                 = useState("");

  // Proof step
  const [tierId, setTierId]           = useState("");
  const [proofFile, setProofFile]     = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // ── Step 1: create Firebase Auth account ──────────────────────────────────
  const handleAccountStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords don't match."); return; }
    if (password.length < 8)  { setError("Password must be at least 8 characters."); return; }
    setStep("profile");
  };

  // ── Step 2: profile details ───────────────────────────────────────────────
  const handleProfileStep = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const clean = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
    if (clean.length < 3) { setError("Username must be at least 3 characters (letters, numbers, _)."); return; }
    setStep("proof");
  };

  // ── Step 3: investment proof ──────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { setError("File must be under 10 MB."); return; }
    setProofFile(file);
    setProofPreview(URL.createObjectURL(file));
    setError("");
  };

  // ── Final submit ──────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofFile) { setError("Please upload your proof of investment."); return; }
    if (!tierId)    { setError("Please select your Kickstarter tier."); return; }
    setError("");
    setLoading(true);

    try {
      // 1. Create auth account
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      // 2. Upload proof to Storage
      const proofRef = ref(storage, `proofs/${uid}/${Date.now()}_${proofFile.name}`);
      await uploadBytes(proofRef, proofFile);
      const proofUrl = await getDownloadURL(proofRef);

      // 3. Create profile doc (unverified)
      await setDoc(doc(db, "profiles", uid), {
        uid,
        email,
        displayName: displayName.trim(),
        username: username.trim().toLowerCase().replace(/[^a-z0-9_]/g, ""),
        bio: bio.trim(),
        avatarUrl: "",
        bannerUrl: "",
        isPublic: false,
        isVerified: false,
        isBanned: false,
        isAdmin: false,
        highestTierId: null,
        highestTierLevel: 0,
        totalInvestedUsd: 0,
        createdAt: Date.now(),
      });

      // 4. Create pending investment doc
      await setDoc(doc(db, "investments", `${uid}_${tierId}`), {
        id: `${uid}_${tierId}`,
        profileId: uid,
        tierId,
        amountUsd: TIERS.find(t => t.id === tierId)?.priceUsd ?? 0,
        proofUrl,
        status: "pending",
        reviewedBy: null,
        reviewedAt: null,
        adminNote: "",
        createdAt: Date.now(),
      });

      // 5. Sign out — member needs admin approval first
      await auth.signOut();

      setStep("done");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === "auth/email-already-in-use") {
        setError("That email is already registered. Try logging in instead.");
      } else {
        setError("Something went wrong. Please try again.");
        console.error(err);
      }
    }
    setLoading(false);
  };

  const STEPS: Step[] = ["account", "profile", "proof", "done"];
  const stepIndex = STEPS.indexOf(step);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0A0C" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <Link href="/community" className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">Silver Prime</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: "rgba(124,92,255,0.18)", color: "#a78bfa" }}>
            Founders Club
          </span>
        </Link>
        <Link href="/community" className="text-sm text-silver-400 hover:text-white transition">
          ← Back to login
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">

          {/* Progress bar */}
          {step !== "done" && (
            <div className="flex items-center gap-2 mb-8">
              {["Create account", "Your profile", "Proof of investment"].map((label, i) => (
                <div key={label} className="flex items-center gap-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                      style={{
                        background: i <= stepIndex - 0 ? "rgba(124,92,255,0.8)" : "rgba(255,255,255,0.08)",
                        color: i <= stepIndex - 0 ? "white" : "#64748b",
                        border: i === stepIndex ? "2px solid #7C5CFF" : "2px solid transparent",
                      }}
                    >
                      {i < stepIndex ? "✓" : i + 1}
                    </div>
                    <span className={`text-xs hidden sm:block ${i === stepIndex ? "text-white" : "text-silver-600"}`}>
                      {label}
                    </span>
                  </div>
                  {i < 2 && <div className="h-px flex-1 mx-2" style={{ background: i < stepIndex ? "#7C5CFF" : "rgba(255,255,255,0.08)" }} />}
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">

            {/* ── Step 1: Account ── */}
            {step === "account" && (
              <motion.div key="account" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(124,92,255,0.2)" }}>
                  <h2 className="text-2xl font-bold text-white mb-1">Create your account</h2>
                  <p className="text-silver-500 text-sm mb-6">You&apos;ll verify your investment in step 3.</p>

                  <form onSubmit={handleAccountStep} className="flex flex-col gap-4">
                    <Field label="Email address">
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
                    </Field>
                    <Field label="Password (min 8 characters)">
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
                    </Field>
                    <Field label="Confirm password">
                      <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required placeholder="••••••••" />
                    </Field>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    <SubmitBtn>Continue →</SubmitBtn>
                    <p className="text-xs text-silver-600 text-center">
                      Already have an account?{" "}
                      <Link href="/community" className="text-[#7C5CFF] hover:text-[#a78bfa] transition">Sign in</Link>
                    </p>
                  </form>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Profile ── */}
            {step === "profile" && (
              <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(124,92,255,0.2)" }}>
                  <h2 className="text-2xl font-bold text-white mb-1">Your profile</h2>
                  <p className="text-silver-500 text-sm mb-6">You can edit this any time. Privacy settings come later.</p>

                  <form onSubmit={handleProfileStep} className="flex flex-col gap-4">
                    <Field label="Display name">
                      <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} required placeholder="Jane Founder" maxLength={40} />
                    </Field>
                    <Field label="Username (letters, numbers, underscores)">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-silver-500 text-sm">@</span>
                        <input
                          type="text"
                          value={username}
                          onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                          required
                          placeholder="jane_founder"
                          maxLength={24}
                          className="pl-7 w-full"
                        />
                      </div>
                    </Field>
                    <Field label="Short bio (optional)">
                      <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Early backer, AI enthusiast…" maxLength={140} rows={3} />
                    </Field>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    <SubmitBtn>Continue →</SubmitBtn>
                    <button type="button" onClick={() => setStep("account")} className="text-xs text-silver-500 hover:text-silver-300 transition text-center">
                      ← Back
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Investment proof ── */}
            {step === "proof" && (
              <motion.div key="proof" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(124,92,255,0.2)" }}>
                  <h2 className="text-2xl font-bold text-white mb-1">Proof of investment</h2>
                  <p className="text-silver-500 text-sm mb-6">
                    Upload a screenshot or confirmation email from Kickstarter showing your pledge.
                    This is reviewed manually by the Silver Prime team — your application will be
                    approved within 24–48 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Tier selector */}
                    <div>
                      <label className="block text-xs font-medium text-silver-400 mb-2">
                        Which tier did you back?
                      </label>
                      <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                        {TIERS.map(t => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setTierId(t.id)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition"
                            style={{
                              background: tierId === t.id ? `${t.color}18` : "rgba(255,255,255,0.03)",
                              border: tierId === t.id ? `1px solid ${t.color}60` : "1px solid rgba(255,255,255,0.08)",
                              color: tierId === t.id ? t.color : "#94a3b8",
                            }}
                          >
                            <span className="text-lg">{t.icon}</span>
                            <div>
                              <p className="font-medium" style={{ color: tierId === t.id ? t.color : "white" }}>{t.name}</p>
                              <p className="text-xs text-silver-500">${t.priceUsd.toLocaleString()}</p>
                            </div>
                            {tierId === t.id && <span className="ml-auto text-xs">✓</span>}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* File upload */}
                    <div>
                      <label className="block text-xs font-medium text-silver-400 mb-2">
                        Kickstarter confirmation (screenshot or PDF, max 10 MB)
                      </label>
                      <input ref={fileInputRef} type="file" accept="image/*,.pdf" onChange={handleFileChange} className="hidden" />
                      {!proofPreview ? (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full rounded-xl border-2 border-dashed py-8 flex flex-col items-center gap-2 transition hover:border-[#7C5CFF]/60"
                          style={{ borderColor: "rgba(255,255,255,0.1)" }}
                        >
                          <span className="text-2xl">📎</span>
                          <span className="text-sm text-silver-400">Click to upload</span>
                          <span className="text-xs text-silver-600">JPG, PNG, PDF</span>
                        </button>
                      ) : (
                        <div className="relative rounded-xl overflow-hidden">
                          {proofFile?.type === "application/pdf" ? (
                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
                              style={{ background: "rgba(124,92,255,0.1)", border: "1px solid rgba(124,92,255,0.3)" }}>
                              <span className="text-2xl">📄</span>
                              <span className="text-sm text-white">{proofFile.name}</span>
                            </div>
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={proofPreview} alt="Proof preview" className="w-full max-h-40 object-cover rounded-xl" />
                          )}
                          <button
                            type="button"
                            onClick={() => { setProofFile(null); setProofPreview(""); }}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white text-xs flex items-center justify-center hover:bg-black/80 transition"
                          >✕</button>
                        </div>
                      )}
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <SubmitBtn loading={loading}>
                      {loading ? "Submitting application…" : "Submit application"}
                    </SubmitBtn>
                    <button type="button" onClick={() => setStep("profile")} className="text-xs text-silver-500 hover:text-silver-300 transition text-center">
                      ← Back
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* ── Done ── */}
            {step === "done" && (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="rounded-2xl p-10 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(124,92,255,0.2)" }}>
                  <div className="text-5xl mb-4">🎉</div>
                  <h2 className="text-2xl font-bold text-white mb-3">Application submitted!</h2>
                  <p className="text-silver-400 leading-relaxed mb-6">
                    Thanks, <strong className="text-white">{displayName}</strong>! Your investment proof is under review.
                    You&apos;ll receive a confirmation email within <strong className="text-white">24–48 hours</strong> once
                    a Silver Prime team member has verified your Kickstarter pledge.
                  </p>
                  <p className="text-silver-600 text-sm mb-6">
                    In the meantime, keep an eye on your inbox at <strong className="text-silver-400">{email}</strong>
                  </p>
                  <Link
                    href="/"
                    className="inline-block rounded-xl px-6 py-3 text-sm font-semibold text-white transition"
                    style={{ background: "linear-gradient(135deg, #7C5CFF, #5b3fd9)" }}
                  >
                    Back to Silver Prime →
                  </Link>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Small reusable form helpers ──────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-silver-400 mb-1.5">{label}</label>
      <div
        className="[&_input]:w-full [&_input]:rounded-xl [&_input]:px-4 [&_input]:py-3 [&_input]:text-sm [&_input]:text-white [&_input]:placeholder-silver-600 [&_input]:outline-none [&_input]:bg-white/5 [&_input]:border [&_input]:border-white/10
                   [&_textarea]:w-full [&_textarea]:rounded-xl [&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:text-sm [&_textarea]:text-white [&_textarea]:placeholder-silver-600 [&_textarea]:outline-none [&_textarea]:bg-white/5 [&_textarea]:border [&_textarea]:border-white/10 [&_textarea]:resize-none"
      >
        {children}
      </div>
    </div>
  );
}

function SubmitBtn({ children, loading }: { children: React.ReactNode; loading?: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-xl py-3 text-sm font-semibold text-white transition disabled:opacity-50"
      style={{ background: "linear-gradient(135deg, #7C5CFF, #5b3fd9)" }}
    >
      {children}
    </button>
  );
}
