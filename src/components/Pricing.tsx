"use client";

import { motion } from "framer-motion";

const freeFeatures = [
  "Streaming chat via your Groq key",
  "Llama 3.1 8B (Fast) model",
  "Limited conversation history",
  "Basic voice input (Whisper STT)",
  "3 themes: Dark · Dim · Bright",
  "Renameable assistant persona",
];

const premiumFeatures = [
  "Everything in Free",
  "On-device Phi-3-mini — fully offline",
  "Smart routing: local vs. cloud auto",
  "Unlimited conversation history",
  "\"Hey Silver\" wakeword — hands-free",
  "Voice I/O — full two-way voice",
  "Context awareness (foreground app)",
  "Vision: photo description via Moondream-2",
  "Face recognition: enrol friends & family",
  "Self-improvement sandbox",
  "Encrypted Google Drive backup",
  "All future Premium features",
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-14 text-center max-w-2xl mx-auto">
        <p className="mb-3 text-xs uppercase tracking-widest text-accent-glow">Simple pricing</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight silver-text">
          No subscriptions. Ever.
        </h2>
        <p className="mt-4 text-silver-400">
          Start free. Unlock everything once. Your AI, your data, your rules.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Free tier */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl glass p-8"
        >
          <p className="text-xs uppercase tracking-widest text-silver-500 mb-2">Free</p>
          <div className="flex items-end gap-2 mb-6">
            <span className="font-display text-5xl font-semibold silver-text">$0</span>
            <span className="text-silver-400 mb-1">forever</span>
          </div>
          <p className="text-sm text-silver-400 mb-6">
            Bring your Groq API key and start chatting immediately. No account required.
          </p>
          <ul className="space-y-3 mb-8">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-silver-300">
                <span className="text-silver-500 mt-0.5 shrink-0">○</span>
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

        {/* Premium tier */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl relative overflow-hidden p-8"
          style={{
            background: "linear-gradient(135deg, rgba(124,92,255,0.12) 0%, rgba(17,17,20,0.8) 60%)",
            border: "1px solid rgba(124,92,255,0.3)",
          }}
        >
          {/* Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(124,92,255,0.15) 0%, transparent 70%)" }}
          />
          <p className="text-xs uppercase tracking-widest text-accent-glow mb-2">Premium</p>
          <div className="flex items-end gap-2 mb-1">
            <span className="font-display text-5xl font-semibold silver-text">$9.99</span>
            <span className="text-silver-400 mb-1">one-time</span>
          </div>
          <p className="text-xs text-silver-500 mb-6">Pay once. Own forever. No recurring charges.</p>
          <ul className="space-y-3 mb-8">
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
            Get early access
          </a>
        </motion.div>
      </div>

      <p className="mt-8 text-center text-xs text-silver-600">
        Pricing subject to change before launch. Early waitlist members will be offered a discounted rate.
      </p>
    </section>
  );
}
