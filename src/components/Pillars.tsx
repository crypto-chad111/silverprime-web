"use client";

import { motion } from "framer-motion";
import { StatusBadge, type Status } from "./StatusBadge";

type Pillar = {
  title: string;
  body: string;
  status: Status;
  stage?: string;
};

const pillars: Pillar[] = [
  {
    title: "Hybrid LLM",
    body:
      "Cloud today via your Groq key. Phi-3-mini on-device is coming — smart routing will decide local vs. cloud based on complexity, your API key, and your preference.",
    status: "in-progress",
    stage: "3.1 → 3.3",
  },
  {
    title: "Your keys. Your data.",
    body:
      "No backend. No account. API keys wrapped by the Android Keystore. Conversations stored locally in SQLCipher-encrypted SQLite.",
    status: "shipped",
  },
  {
    title: "Renameable persona",
    body:
      'Default name will be "Prime." You\'ll rename it to Jarvis, Athena, Nova, or your dog\'s name during onboarding. Capabilities stay identical; the voice on top is yours.',
    status: "planned",
    stage: "3.5",
  },
  {
    title: "Streaming chat",
    body:
      "Token-by-token replies via SSE. Cursor pulses while thinking. Abort mid-stream. New session with one tap.",
    status: "shipped",
  },
  {
    title: "Conversation memory",
    body:
      "Sessions persisted across launches. Resume where you left off. Every turn, every session, encrypted at rest.",
    status: "shipped",
  },
  {
    title: "Recursive self-improvement",
    body:
      "Ask for something it can't do. It will script the capability, run it in a sandbox you approve, and promote it into your assistant. JS-layer updates stay on-device; native updates route through the Pro channel.",
    status: "planned",
    stage: "4 + 6",
  },
];

export function Pillars() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-widest text-accent-glow">What it is</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight silver-text">
          Six pillars. Three shipped, three on the way.
        </h2>
        <p className="mt-4 text-silver-400 text-sm">
          Every claim below carries a status. Today&apos;s product first, tomorrow&apos;s second.
        </p>
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
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-silver-100">{p.title}</h3>
              <StatusBadge status={p.status} stage={p.stage} />
            </div>
            <p className="text-sm leading-relaxed text-silver-300">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
