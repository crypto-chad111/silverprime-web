"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    title: "Hybrid LLM",
    body: "Phi-3-mini on-device for privacy. Groq, Anthropic, OpenAI or Gemini via your key when you want frontier power. Smart routing decides.",
  },
  {
    title: "Your keys. Your data.",
    body: "No backend. No account required. API keys encrypted with Android Keystore. Conversations stored locally with SQLCipher.",
  },
  {
    title: "Renameable",
    body: 'Default name is "Prime." Call it Jarvis, Athena, Nova, or your dog\'s name. Persona adapts; capabilities don\'t change.',
  },
  {
    title: "Streaming chat",
    body: "Token-by-token replies via SSE. Cursor pulses while thinking. Abort mid-stream. New session with one tap.",
  },
  {
    title: "Conversation memory",
    body: "Sessions persisted across launches. Resume where you left off. Every turn, every session, encrypted at rest.",
  },
  {
    title: "Extensibility (Premium)",
    body: "Self-improvement sandbox generates JS capabilities via your key, reviewed in-app, runs in a Hermes isolate with static-analysis gates.",
  },
];

export function Pillars() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-widest text-accent-glow">What it is</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight silver-text">
          Built around six ideas.
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative rounded-2xl glass p-6 transition hover:-translate-y-0.5"
          >
            <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition"
                 style={{ background: "radial-gradient(600px 200px at var(--x,50%) var(--y,0%), rgba(124,92,255,0.12), transparent 60%)" }} />
            <h3 className="mb-2 text-lg font-semibold text-silver-100">{p.title}</h3>
            <p className="text-sm leading-relaxed text-silver-300">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
