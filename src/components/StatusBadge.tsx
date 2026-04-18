import { cn } from "@/lib/cn";

export type Status = "shipped" | "in-progress" | "specced" | "planned" | "research";

const styles: Record<Status, string> = {
  shipped:       "bg-ok/10 text-ok ring-ok/30",
  "in-progress": "bg-accent/15 text-accent-glow ring-accent/40",
  specced:       "bg-silver-800 text-silver-200 ring-silver-700",
  planned:       "bg-silver-900 text-silver-400 ring-silver-800",
  research:      "bg-warn/10 text-warn ring-warn/30",
};

const labels: Record<Status, string> = {
  shipped:       "Shipped",
  "in-progress": "In progress",
  specced:       "Specced",
  planned:       "Planned",
  research:      "Research",
};

export function StatusBadge({
  status,
  stage,
  className,
}: {
  status: Status;
  stage?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-widest ring-1 whitespace-nowrap",
        styles[status],
        className,
      )}
    >
      <span>{labels[status]}</span>
      {stage && <span className="text-[10px] opacity-70">· {stage}</span>}
    </span>
  );
}
