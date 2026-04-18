"use client";

import { motion } from "framer-motion";

type OrbState = "idle" | "listening" | "thinking";

export function Orb({ state = "idle", size = 320 }: { state?: OrbState; size?: number }) {
  const pulse = state === "thinking" ? 1.06 : state === "listening" ? 1.03 : 1.015;

  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.6) 0%, rgba(124,92,255,0.0) 65%)",
        }}
      />
      <motion.div
        className="absolute inset-6 rounded-full shadow-glow"
        style={{ background: "var(--orb-grad, radial-gradient(circle at 30% 30%, #E8E8EC 0%, #9A9AA4 35%, #3E3E48 70%, #0A0A0C 100%))" }}
        animate={{ scale: [1, pulse, 1], rotate: [0, 6, 0] }}
        transition={{ duration: state === "thinking" ? 2.4 : 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-10 rounded-full opacity-60 mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(255,255,255,0.0), rgba(255,255,255,0.35), rgba(124,92,255,0.35), rgba(255,255,255,0.0))",
          filter: "blur(6px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      <div
        className="absolute inset-[22%] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 40%)",
        }}
      />
    </div>
  );
}
