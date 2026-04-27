"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { value: "<250 g", label: "No FAA registration" },
  { value: "10–15 min", label: "Flight time" },
  { value: "Wi-Fi Direct", label: "No router needed" },
  { value: "$199–249", label: "Target retail price" },
  { value: "HD Camera", label: "RTSP stream to Silver Prime" },
  { value: "2027", label: "Commercial launch target" },
];

// Image placeholders — replace src with real image paths once generated
const droneShotPlaceholder = "/images/aipc-drone-solo.jpg";
const droneUserPlaceholder = "/images/aipc-drone-user.jpg";
const droneInternalPlaceholder = "/images/aipc-drone-internal.jpg";

function ImagePlaceholder({
  label,
  src,
  available,
}: {
  label: string;
  src: string;
  available: boolean;
}) {
  if (available) {
    return (
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-bg-raised">
        <Image src={src} alt={label} fill className="object-cover" />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-bg/90 to-transparent px-4 py-3">
          <p className="text-xs text-silver-300">{label}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] glass flex flex-col items-center justify-center gap-3 border border-dashed border-silver-700">
      <span className="text-3xl opacity-30">🤖</span>
      <p className="text-xs text-silver-500 text-center px-4">{label}</p>
      <span className="text-[10px] uppercase tracking-widest text-silver-700">Image coming soon</span>
    </div>
  );
}

export function AIPCTeaser() {
  return (
    <section id="aipc" className="mx-auto max-w-6xl px-6 py-24">
      {/* Header */}
      <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-warn">Coming 2027</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            <span className="silver-text">Silver Prime.</span>
            <br />
            <span className="shimmer-text">Now it can fly.</span>
          </h2>
          <p className="mt-5 text-silver-300 text-lg max-w-xl">
            The AIPC is a palm-sized AI companion drone. Silver Prime on your phone <em>is</em> the brain —
            the drone is your eyes, ears, and voice in the physical world.
          </p>
        </div>
        <span className="self-start md:self-auto rounded-full bg-warn/10 px-4 py-2 text-xs uppercase tracking-widest text-warn ring-1 ring-warn/30 whitespace-nowrap">
          Hardware · Pre-announcement
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-2xl glass p-4 text-center"
          >
            <p className="text-xl font-semibold text-silver-100 mb-1">{s.value}</p>
            <p className="text-xs text-silver-400">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Image grid — 3 AI-generated + 3 reserved placeholders */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-silver-500 mb-4">AIPC Visualised</p>
        <div className="grid gap-4 md:grid-cols-3">
          {/* Slot 1 — drone solo */}
          <ImagePlaceholder
            label="AIPC — solo product shot, palm-scale"
            src={droneShotPlaceholder}
            available={false}
          />
          {/* Slot 2 — drone + user */}
          <ImagePlaceholder
            label="AIPC hovering in front of user (back-only visible)"
            src={droneUserPlaceholder}
            available={false}
          />
          {/* Slot 3 — internal breakdown */}
          <ImagePlaceholder
            label="AIPC internal breakdown — components visible"
            src={droneInternalPlaceholder}
            available={false}
          />
        </div>
      </div>

      {/* 3 reserved image slots */}
      <div className="grid gap-4 md:grid-cols-3">
        <ImagePlaceholder label="Reserved · Custom image slot A" src="" available={false} />
        <ImagePlaceholder label="Reserved · Custom image slot B" src="" available={false} />
        <ImagePlaceholder label="Reserved · Custom image slot C" src="" available={false} />
      </div>

      {/* Body copy */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl glass p-6">
          <h3 className="font-semibold text-silver-100 mb-2">Silver Prime is the brain</h3>
          <p className="text-sm text-silver-400 leading-relaxed">
            No separate app, no separate AI. Your phone handles all inference — the drone streams HD video back to Silver Prime, which narrates, identifies, and acts on what it sees.
          </p>
        </div>
        <div className="rounded-2xl glass p-6">
          <h3 className="font-semibold text-silver-100 mb-2">Invisible rotors, clean form</h3>
          <p className="text-sm text-silver-400 leading-relaxed">
            Circular body. Rotors hidden inside — only airflow vents visible on the exterior. Fits in the palm of your hand. Under 250 g so no FAA registration is required for recreational use.
          </p>
        </div>
        <div className="rounded-2xl glass p-6">
          <h3 className="font-semibold text-silver-100 mb-2">Works without a router</h3>
          <p className="text-sm text-silver-400 leading-relaxed">
            Wi-Fi Direct connects drone to phone directly. Outdoor GPS for positioning. Indoor altitude hold. Microphone array and speaker — Silver Prime&apos;s voice can come from the drone.
          </p>
        </div>
      </div>
    </section>
  );
}
