"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Orb3D = dynamic(() => import("./Orb3D").then((m) => m.Orb3D), {
  ssr: false,
  loading: () => <div className="mx-auto h-[260px] w-[260px] rounded-full bg-orb-grad opacity-80" />,
});

function useOrbSize() {
  const [size, setSize] = useState(300);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setSize(260);
      else if (w < 768) setSize(320);
      else setSize(420);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

export function Hero() {
  const orbSize = useOrbSize();
  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,232,236,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(232,232,236,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 40%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, black 40%, transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <Orb3D state="idle" size={orbSize} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs tracking-widest uppercase text-silver-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-slow" />
          Android · Pre-launch · Hybrid LLM
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-balance"
        >
          <span className="silver-text">The AI assistant</span>
          <br />
          <span className="shimmer-text">you rename.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mx-auto mt-7 max-w-2xl text-lg md:text-xl text-silver-300 text-pretty"
        >
          Silver Prime is an Android-native assistant that runs on your device or your key —
          never on our servers. Call it anything. Own everything.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#waitlist"
            className="rounded-full bg-silver-grad px-6 py-3 text-sm font-semibold text-bg shadow-glow hover:brightness-110 transition"
          >
            Join the waitlist
          </a>
          <a
            href="/roadmap"
            className="rounded-full glass px-6 py-3 text-sm font-semibold text-silver-100 hover:bg-bg-raised transition"
          >
            See the roadmap →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
