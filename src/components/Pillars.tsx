"use client";

import { motion } from "framer-motion";
import { StatusBadge, type Status } from "./StatusBadge";

type Pillar = {
  title: string;
  body: string;
  status: Status;
  stage?: string;
  icon: string;
};

const pillars: Pillar[] = [
  {
    icon: "🔒",
    title: "Private On-Device AI",
    body:
      "Phi-3-mini (2.2 GB) runs entirely on your phone — no internet required, no telemetry, no data leaving your hands. Your conversations stay yours.",
    status: "in-progress",
    stage: "3.3",
  },
  {
    icon: "⚡",
    title: "Cloud AI Fallback",
    body:
      "Your Groq key, your models. Llama 3.1 8B / 70B and Mixtral 8×7B stream token-by-token when you need more power. Smart routing decides which to use.",
    status: "shipped",
  },
  {
    icon: "🎙️",
    title: '"Hey Silver" Wakeword',
    body:
      "Always listening — even with the screen off. Powered by Porcupine. Wake your assistant hands-free, like Alexa but fully private and yours to rename.",
    status: "planned",
    stage: "3.5",
  },
  {
    icon: "🔊",
    title: "Voice I/O",
    body:
      "Speak, don't type. Whisper on-device STT transcribes your voice instantly. Android TTS reads every reply aloud. A true conversation, not a chat box.",
    status: "planned",
    stage: "3.5",
  },
  {
    icon: "👁️",
    title: "Context Awareness",
    body:
      "Silver Prime sees which app you're using and what notifications arrive. It surfaces smart suggestions before you even ask — an assistant that pays attention.",
    status: "planned",
    stage: "4",
  },
  {
    icon: "💾",
    title: "Persistent Memory",
    body:
      "Every conversation survives app restarts. Full session history, encrypted at rest with SQLCipher. Resume where you left off, every time.",
    status: "shipped",
  },
  {
    icon: "💎",
    title: "One-Time Premium",
    body:
      "No subscriptions, ever. Pay once (~$9.99) and unlock on-device AI, unlimited history, wakeword, vision, face recognition, and self-improvement.",
    status: "planned",
    stage: "Launch",
  },
];

export function Pillars() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-widest text-accent-glow">What it does</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight silver-text">
          Seven features. Your own Jarvis.
        </h2>
        <p className="mt-4 text-silver-400 text-sm">
          Every claim carries a status. Shipped today, planned tomorrow — no vaporware.
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
              <div className="flex items-center gap-2">
                <span className="text-xl">{p.icon}</span>
                <h3 className="text-lg font-semibold text-silver-100">{p.title}</h3>
              </div>
              <StatusBadge status={p.status} stage={p.stage} />
            </div>
            <p className="text-sm leading-relaxed text-silver-300">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
