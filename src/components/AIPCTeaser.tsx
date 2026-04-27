"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AIPCGallery, type GallerySlot } from "./AIPCGallery";

const stats = [
  { value: "<250 g", label: "No FAA registration" },
  { value: "10–15 min", label: "Flight time" },
  { value: "Wi-Fi Direct", label: "No router needed" },
  { value: "$199–249", label: "Target retail price" },
  { value: "HD Camera", label: "RTSP stream to Silver Prime" },
  { value: "2027", label: "Commercial launch target" },
];

const gallerySlots: GallerySlot[] = [
  { src: "/images/aipc-drone-solo.png",        label: "AIPC — studio product shot",                    available: true  },
  { src: "/images/aipc-drone-user.png",        label: "AIPC — palm hover, scale reference",            available: true  },
  { src: "/images/aipc-drone-internal.png",    label: "AIPC — internal components exploded",           available: true  },
  { src: "/images/aipc-drone-outdoor.png",     label: "AIPC — outdoor GPS flight",                     available: true  },
  { src: "/images/aipc-drone-lens.png",        label: "AIPC — camera lens close-up",                   available: true  },
  { src: "/images/aipc-drone-pairing.png",     label: "AIPC — pairing with Silver Prime app",          available: true  },
  { src: "/images/aipc-shoulder-charging.png", label: "AIPC — landed on shoulder platform, charging",  available: false },
  { src: "/images/aipc-shoulder-flight.png",   label: "AIPC — active scan mode, shoulder platform on", available: false },
];

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
          <Link
            href="/aipc"
            className="mt-6 inline-flex items-center gap-2 text-sm text-accent-glow hover:text-silver-100 transition"
          >
            Full specs, pricing &amp; roadmap →
          </Link>
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

      {/* Gallery — all 6 images, interactive glow + lightbox */}
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest text-silver-500 mb-4">AIPC Visualised</p>
        <AIPCGallery slots={gallerySlots} />
      </div>

      {/* Body copy */}
      <div className="grid gap-6 md:grid-cols-3">
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
