"use client";

import { motion } from "framer-motion";
import type { Milestone } from "../../content/roadmap";
import { cn } from "@/lib/cn";

const statusPill: Record<Milestone["status"], string> = {
  done: "bg-ok/10 text-ok ring-1 ring-ok/30",
  "in-progress": "bg-accent/15 text-accent-glow ring-1 ring-accent/40",
  planned: "bg-silver-800 text-silver-300 ring-1 ring-silver-700",
};

const statusLabel: Record<Milestone["status"], string> = {
  done: "Shipped",
  "in-progress": "In progress",
  planned: "Planned",
};

export function MilestoneCard({ m, index }: { m: Milestone; index: number }) {
  return (
    <motion.article
      id={m.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="relative rounded-2xl glass p-5 scroll-mt-24"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-silver-400">{m.stage}</span>
        <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-widest", statusPill[m.status])}>
          {statusLabel[m.status]}
        </span>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-silver-100">{m.title}</h3>
      <p className="text-sm leading-relaxed text-silver-300">{m.summary}</p>
      {m.shippedOn && (
        <p className="mt-4 text-xs text-silver-500">
          Shipped <time dateTime={m.shippedOn}>{m.shippedOn}</time>
        </p>
      )}
      {m.tags && m.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {m.tags.map((t) => (
            <span key={t} className="rounded-full bg-bg-raised px-2 py-0.5 text-[10px] text-silver-400 ring-1 ring-silver-800">
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  );
}
