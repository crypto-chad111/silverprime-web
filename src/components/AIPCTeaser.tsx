"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const stats = [
  { value: "<250 g", label: "No FAA registration" },
  { value: "10–15 min", label: "Flight time" },
  { value: "Wi-Fi Direct", label: "No router needed" },
  { value: "$199–249", label: "Target retail price" },
  { value: "HD Camera", label: "RTSP stream to Silver Prime" },
  { value: "2027", label: "Commercial launch target" },
];

// Live images
const droneShotSrc      = "/images/aipc-drone-solo.png";
const droneUserSrc      = "/images/aipc-drone-user.png";
const droneInternalSrc  = "/images/aipc-drone-internal.png";

// Upcoming images — drop files into public/images/ and set available={true}
const droneOutdoorSrc   = "/images/aipc-drone-outdoor.png";
const droneLensSrc      = "/images/aipc-drone-lens.png";
const dronePairingSrc   = "/images/aipc-drone-pairing.png";

type LightboxItem = { src: string; label: string };

// ── Interactive image tile (glow on scroll-in, click to expand) ──────────────
function GalleryImage({
  label,
  src,
  available,
  onExpand,
}: {
  label: string;
  src: string;
  available: boolean;
  onExpand?: () => void;
}) {
  if (available) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96, boxShadow: "0 0 0px rgba(124,92,255,0)" }}
        whileInView={{
          opacity: 1,
          scale: 1,
          boxShadow: "0 0 28px 4px rgba(124,92,255,0.45)",
        }}
        whileHover={{
          scale: 1.045,
          boxShadow: "0 0 44px 8px rgba(124,92,255,0.68)",
        }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        onClick={onExpand}
        className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-bg-raised cursor-zoom-in"
      >
        <Image src={src} alt={label} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        {/* Caption */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-bg/90 to-transparent px-4 py-3">
          <p className="text-xs text-silver-300">{label}</p>
        </div>
        {/* Expand hint */}
        <div className="absolute top-3 right-3 rounded-full bg-black/55 backdrop-blur-sm px-2.5 py-1 text-[10px] text-silver-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none">
          ⊕ expand
        </div>
      </motion.div>
    );
  }

  // Placeholder tile — glow animation still applies, no click
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl aspect-[4/3] glass flex flex-col items-center justify-center gap-3 border border-dashed border-silver-700"
    >
      <span className="text-3xl opacity-30">🤖</span>
      <p className="text-xs text-silver-500 text-center px-4">{label}</p>
      <span className="text-[10px] uppercase tracking-widest text-silver-700">Image coming soon</span>
    </motion.div>
  );
}

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }: { item: LightboxItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 backdrop-blur-md p-4 md:p-10"
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 0 80px rgba(124,92,255,0.45)" }}
      >
        <div className="relative aspect-[4/3] w-full bg-bg">
          <Image
            src={item.src}
            alt={item.label}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </div>
        {/* Footer bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4 flex items-end justify-between">
          <p className="text-sm text-silver-200">{item.label}</p>
          <button
            onClick={onClose}
            className="rounded-full glass px-3 py-1.5 text-xs text-silver-300 hover:text-white transition"
          >
            ✕ close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export function AIPCTeaser() {
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const close = useCallback(() => setLightbox(null), []);

  // ESC to close
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, close]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const expand = (src: string, label: string) => setLightbox({ src, label });

  return (
    <>
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

        {/* Row 1 — 3 live concept images */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest text-silver-500 mb-4">AIPC Visualised</p>
          <div className="grid gap-4 md:grid-cols-3">
            <GalleryImage
              label="AIPC — studio product shot"
              src={droneShotSrc}
              available={true}
              onExpand={() => expand(droneShotSrc, "AIPC — studio product shot")}
            />
            <GalleryImage
              label="AIPC — palm hover, scale reference"
              src={droneUserSrc}
              available={true}
              onExpand={() => expand(droneUserSrc, "AIPC — palm hover, scale reference")}
            />
            <GalleryImage
              label="AIPC — internal components exploded"
              src={droneInternalSrc}
              available={true}
              onExpand={() => expand(droneInternalSrc, "AIPC — internal components exploded")}
            />
          </div>
        </div>

        {/* Row 2 — 3 upcoming images */}
        <div className="grid gap-4 md:grid-cols-3 mb-12">
          <GalleryImage
            label="AIPC — outdoor GPS flight"
            src={droneOutdoorSrc}
            available={true}
            onExpand={() => expand(droneOutdoorSrc, "AIPC — outdoor GPS flight")}
          />
          <GalleryImage
            label="AIPC — camera lens close-up"
            src={droneLensSrc}
            available={true}
            onExpand={() => expand(droneLensSrc, "AIPC — camera lens close-up")}
          />
          <GalleryImage
            label="AIPC — pairing with Silver Prime app"
            src={dronePairingSrc}
            available={true}
            onExpand={() => expand(dronePairingSrc, "AIPC — pairing with Silver Prime app")}
          />
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

      {/* Lightbox — rendered outside section so it overlays everything */}
      <AnimatePresence>
        {lightbox && <Lightbox item={lightbox} onClose={close} />}
      </AnimatePresence>
    </>
  );
}
