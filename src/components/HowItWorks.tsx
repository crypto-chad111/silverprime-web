"use client";

import { motion } from "framer-motion";

const techBadges = [
  "Phi-3-mini", "Llama 3.1", "Mixtral 8×7B", "Whisper", "Porcupine",
  "React Native", "WatermelonDB", "llama.cpp", "Groq API",
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-widest text-accent-glow">Under the hood</p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight silver-text">
          Hybrid AI. Your phone decides.
        </h2>
        <p className="mt-4 text-silver-400">
          Silver Prime runs two AI engines simultaneously and routes every request to the right one — silently, instantly.
        </p>
      </div>

      {/* Architecture diagram */}
      <div className="grid gap-6 md:grid-cols-3 items-center mb-16">
        {/* Left: your phone */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl glass p-6 text-center"
        >
          <div className="text-4xl mb-3">📱</div>
          <h3 className="text-lg font-semibold text-silver-100 mb-2">Your Prompt</h3>
          <p className="text-sm text-silver-400">You speak or type. Silver Prime evaluates complexity, connectivity, and your preference.</p>
        </motion.div>

        {/* Centre: smart router */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="rounded-2xl border border-accent/40 bg-accent/10 p-5 text-center w-full">
            <div className="text-2xl mb-2">🧠</div>
            <h3 className="text-base font-semibold text-accent-glow mb-1">Smart Router</h3>
            <p className="text-xs text-silver-400">Complexity · Connectivity · Your mode</p>
          </div>
          <div className="flex gap-3 text-silver-600 text-xl">
            <span>↙</span>
            <span>↘</span>
          </div>
        </motion.div>

        {/* Right: two engines */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          <div className="rounded-2xl glass p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🔒</span>
              <h3 className="text-base font-semibold text-silver-100">Phi-3-mini</h3>
              <span className="ml-auto text-[10px] rounded-full bg-ok/10 text-ok ring-1 ring-ok/30 px-2 py-0.5 uppercase tracking-wide">Private</span>
            </div>
            <p className="text-xs text-silver-400">2.2 GB · runs on-device · offline · zero telemetry</p>
          </div>
          <div className="rounded-2xl glass p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">⚡</span>
              <h3 className="text-base font-semibold text-silver-100">Groq Cloud</h3>
              <span className="ml-auto text-[10px] rounded-full bg-accent/10 text-accent-glow ring-1 ring-accent/30 px-2 py-0.5 uppercase tracking-wide">Fast</span>
            </div>
            <p className="text-xs text-silver-400">Llama 3.1 · Mixtral · your key · 500+ tokens/s</p>
          </div>
        </motion.div>
      </div>

      {/* Tech badges */}
      <div className="border-t border-silver-800 pt-10">
        <p className="mb-4 text-xs uppercase tracking-widest text-silver-500">Powered by</p>
        <div className="flex flex-wrap gap-2">
          {techBadges.map((b) => (
            <span
              key={b}
              className="rounded-full glass px-3 py-1.5 text-xs font-mono text-silver-300"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
