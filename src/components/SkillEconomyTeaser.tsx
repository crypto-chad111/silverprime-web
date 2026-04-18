"use client";

import { motion } from "framer-motion";
import { StatusBadge } from "./StatusBadge";

const steps = [
  {
    num: "01",
    title: "Ask",
    body: "Request a capability the assistant can't do yet. Anything from a workflow shortcut to a new data source.",
  },
  {
    num: "02",
    title: "Sandbox",
    body: "It drafts the capability, runs it in a local Hermes isolate with fixtures, and shows you the output. You approve before anything is promoted.",
  },
  {
    num: "03",
    title: "Publish (optional)",
    body: "Sign the skill to the Solana registry. The bundle is pinned to IPFS; the on-chain record holds the CID, author, and price in $SOL.",
  },
  {
    num: "04",
    title: "Earn",
    body: "Other users buy the skill for $SOL. An Anchor program releases access on payment and tracks marketplace-enforced royalties to you on every resale.",
  },
];

export function SkillEconomyTeaser() {
  return (
    <section id="economy" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-warn">On the roadmap</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight silver-text text-balance">
            The assistant that grows with you — and pays you back.
          </h2>
          <p className="mt-4 text-silver-400">
            Stages 6 and 7. Today&apos;s app doesn&apos;t do this yet. We&apos;re showing you
            the direction, not pretending it&apos;s built.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <StatusBadge status="planned" stage="Stage 6" />
          <StatusBadge status="research" stage="Stage 7 · Solana" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="relative rounded-2xl glass p-6"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs text-silver-400">{s.num}</span>
              {i >= 2 && (
                <span className="rounded-full bg-warn/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-warn ring-1 ring-warn/30">
                  $SOL
                </span>
              )}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-silver-100">{s.title}</h3>
            <p className="text-sm leading-relaxed text-silver-300">{s.body}</p>
          </motion.div>
        ))}
      </div>

      <p className="mt-10 text-xs text-silver-500 max-w-3xl">
        Royalties are marketplace-enforced, not protocol-level. No custom Silver Prime token —
        payments and royalties denominate in $SOL. Wallet connection via Phantom, Solflare, or
        Backpack (Mobile Wallet Adapter). Skill bundles pinned to IPFS.
      </p>
    </section>
  );
}
