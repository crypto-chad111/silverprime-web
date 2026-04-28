"use client";

import { motion } from "framer-motion";

const freeFeatures = [
  "Streaming chat (requires Groq API key)",
  "Llama 3.1 8B model (cloud)",
  "Limited history — last 20 messages",
  "Basic voice input (Whisper STT)",
  "3 themes: Dark · Dim · Bright",
  "Renameable assistant",
];

const premiumFeatures = [
  "Everything in Free",
  "On-device Phi-3-mini — fully offline, no API key needed",
  "Smart cloud / local routing",
  "Unlimited conversation history",
  '"Hey Silver" wakeword — background listening',
  "Full two-way voice I/O (TTS replies)",
  "Context awareness (knows which app you're using)",
  "Vision: photo description + scene classification",
  "Face recognition — enrol family & friends",
  "Self-improvement sandbox",
  "Encrypted Google Drive backup",
  "All future Premium features — forever",
];


export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">

      {/* Header */}
      <div className="mb-14 text-center max-w-2xl mx-auto">
        <p className="mb-3 text-xs uppercase tracking-widest text-accent-glow">Simple pricing</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight silver-text">
          No subscriptions. Ever.
        </h2>
        <p className="mt-4 text-silver-400">
          Start free. Unlock everything once. Add the drone when you&apos;re ready.
        </p>
      </div>

      {/* Three-column cards */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">

        {/* ── Free ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl glass p-8 flex flex-col"
        >
          <p className="text-xs uppercase tracking-widest text-silver-500 mb-2">App · Free</p>
          <div className="flex items-end gap-2 mb-1">
            <span className="font-display text-5xl font-semibold silver-text">$0</span>
            <span className="text-silver-400 mb-1">forever</span>
          </div>
          <p className="text-sm text-silver-400 mb-6">
            Bring your Groq API key and start chatting immediately. No account required.
          </p>
          <ul className="space-y-3 mb-8 flex-1">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-silver-300">
                <span className="text-silver-600 mt-0.5 shrink-0">○</span>
                {f}
              </li>
            ))}
          </ul>
          <a
            href="#waitlist"
            className="block text-center rounded-full glass px-6 py-3 text-sm font-semibold text-silver-100 hover:bg-bg-raised transition"
          >
            Join the waitlist
          </a>
        </motion.div>

        {/* ── Premium ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl relative overflow-hidden p-8 flex flex-col"
          style={{
            background: "linear-gradient(135deg, rgba(124,92,255,0.13) 0%, rgba(17,17,20,0.85) 65%)",
            border: "1px solid rgba(124,92,255,0.35)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(124,92,255,0.18) 0%, transparent 70%)" }}
          />
          <p className="text-xs uppercase tracking-widest text-accent-glow mb-2">App · Premium</p>
          <div className="flex items-end gap-2 mb-1">
            <span className="font-display text-5xl font-semibold silver-text">$14.99</span>
            <span className="text-silver-400 mb-1">one-time</span>
          </div>
          <p className="text-xs text-silver-500 mb-1">Pay once. Own forever. No recurring charges.</p>
          {/* Waitlist discount callout */}
          <div className="flex items-center gap-2 mb-6 rounded-xl bg-warn/10 ring-1 ring-warn/25 px-3 py-2">
            <span className="text-warn text-xs">★</span>
            <p className="text-xs text-warn">
              Founding member rate: <strong>$9.99</strong> — waitlist only, limited time.
            </p>
          </div>
          <ul className="space-y-2.5 mb-8 flex-1">
            {premiumFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-silver-200">
                <span className="text-accent-glow mt-0.5 shrink-0">◆</span>
                {f}
              </li>
            ))}
          </ul>
          <a
            href="#waitlist"
            className="block text-center rounded-full bg-silver-grad px-6 py-3 text-sm font-semibold text-bg shadow-glow hover:brightness-110 transition"
          >
            Get early access — $9.99
          </a>
        </motion.div>

        {/* ── AIPC Drone ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl relative overflow-hidden p-8 flex flex-col"
          style={{
            background: "linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(17,17,20,0.85) 65%)",
            border: "1px solid rgba(251,191,36,0.2)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)" }}
          />
          <p className="text-xs uppercase tracking-widest text-warn mb-2">Hardware · Coming 2027</p>
          <h3 className="text-lg font-semibold text-silver-100 mb-1">AIPC Drone</h3>
          <div className="flex items-end gap-2 mb-1">
            <span className="font-display text-5xl font-semibold silver-text">$149</span>
            <span className="text-silver-400 mb-1">early bird</span>
          </div>
          <p className="text-xs text-silver-500 mb-6">$199 standard retail · Q1 2027</p>

          <ul className="space-y-3 mb-8 flex-1">
            {[
              "Ring-form AI companion drone — < 250 g",
              "Your phone IS the AI brain, no separate app",
              "HD camera · Wi-Fi Direct · mic + speaker",
              "Shoulder platform harness (+$49)",
              "No subscription — ever",
            ].map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-silver-300">
                <span className="text-warn mt-0.5 shrink-0">◆</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="space-y-3">
            <a
              href="/#waitlist"
              className="block text-center rounded-full px-6 py-3 text-sm font-semibold text-bg transition hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)" }}
            >
              Reserve early bird spot
            </a>
            <a
              href="/aipc"
              className="block text-center rounded-full glass px-6 py-3 text-sm font-medium text-warn hover:text-silver-100 transition"
            >
              Full specs, gallery &amp; pricing →
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bundle highlight bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-2xl glass p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ border: "1px solid rgba(124,92,255,0.25)" }}
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl">🏆</span>
          <div>
            <p className="font-semibold text-silver-100">
              Best value: Full Kit Bundle
            </p>
            <p className="text-sm text-silver-400 mt-0.5">
              Pro drone + shoulder platform + Silver Prime Premium — everything in one.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <p className="text-2xl font-semibold silver-text">$289</p>
            <p className="text-xs text-silver-500">bundle price</p>
          </div>
          <a
            href="/aipc"
            className="rounded-full bg-silver-grad px-5 py-2.5 text-sm font-semibold text-bg shadow-glow hover:brightness-110 transition whitespace-nowrap"
          >
            See full details →
          </a>
        </div>
      </motion.div>

      {/* Disclaimers */}
      <p className="mt-6 text-center text-xs text-silver-600">
        * Hardware prices are preliminary estimates subject to change.
        Early bird pricing guaranteed for waitlist members who confirm their spot.
      </p>
    </section>
  );
}
