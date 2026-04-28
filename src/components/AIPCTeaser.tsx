"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const stats = [
  { value: "< 250 g",     label: "No FAA registration" },
  { value: "Wi-Fi Direct", label: "No router needed" },
  { value: "Q1 2027",      label: "Commercial launch" },
];

export function AIPCTeaser() {
  return (
    <section id="aipc" className="mx-auto max-w-6xl px-6 py-24">
      <div className="rounded-2xl overflow-hidden grid md:grid-cols-2 gap-0"
        style={{ border: "1px solid rgba(251,191,36,0.18)", background: "linear-gradient(135deg, rgba(251,191,36,0.06) 0%, rgba(17,17,20,0.7) 60%)" }}
      >
        {/* ── Left: copy ── */}
        <div className="flex flex-col justify-center p-10 md:p-12">
          <p className="mb-3 text-xs uppercase tracking-widest text-warn">Coming 2027 · Hardware</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance leading-tight mb-5">
            <span className="silver-text">Silver Prime.</span>
            <br />
            <span className="shimmer-text">Now it can fly.</span>
          </h2>
          <p className="text-silver-300 text-base leading-relaxed mb-8 max-w-sm">
            The AIPC is a ring-form AI companion drone. Your phone is the brain.
            The drone is your eyes, ears, and presence in the physical world.
            No separate AI. No subscription.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="rounded-full glass px-4 py-2 text-center">
                <span className="text-sm font-semibold text-silver-100">{s.value}</span>
                <span className="text-silver-500 text-xs ml-2">{s.label}</span>
              </div>
            ))}
          </div>

          <Link
            href="/aipc"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-bg transition hover:brightness-110 self-start"
            style={{ background: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)" }}
          >
            Explore the AIPC — specs, gallery &amp; pricing →
          </Link>
        </div>

        {/* ── Right: single hero image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative min-h-[280px] md:min-h-[380px]"
        >
          <Image
            src="/images/aipc-shoulder-flight.png"
            alt="AIPC ring drone in active scan mode on shoulder platform"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Gradient fade into the card border on left edge (desktop only) */}
          <div className="absolute inset-y-0 left-0 w-16 hidden md:block"
            style={{ background: "linear-gradient(to right, rgba(14,14,17,0.85), transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
