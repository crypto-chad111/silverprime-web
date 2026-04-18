"use client";

import { motion } from "framer-motion";
import type { Milestone } from "../../content/roadmap";
import { StatusBadge, type Status } from "./StatusBadge";

function toStatus(m: Milestone["status"]): Status {
  if (m === "done") return "shipped";
  return m;
}

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
        <StatusBadge status={toStatus(m.status)} />
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
