"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export type GallerySlot = {
  src: string;
  label: string;
  available: boolean;
};

type LightboxItem = { src: string; label: string };

// ── Single interactive image tile ─────────────────────────────────────────────
export function GalleryImage({
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
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-bg/90 to-transparent px-4 py-3">
          <p className="text-xs text-silver-300">{label}</p>
        </div>
        <div className="absolute top-3 right-3 rounded-full bg-black/55 backdrop-blur-sm px-2.5 py-1 text-[10px] text-silver-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none">
          ⊕ expand
        </div>
      </motion.div>
    );
  }

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

// ── Fullscreen lightbox ───────────────────────────────────────────────────────
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

// ── Full gallery grid + lightbox controller ───────────────────────────────────
export function AIPCGallery({ slots }: { slots: GallerySlot[] }) {
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, close]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {slots.map((s) => (
          <GalleryImage
            key={s.src || s.label}
            label={s.label}
            src={s.src}
            available={s.available}
            onExpand={s.available ? () => setLightbox({ src: s.src, label: s.label }) : undefined}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightbox && <Lightbox item={lightbox} onClose={close} />}
      </AnimatePresence>
    </>
  );
}
