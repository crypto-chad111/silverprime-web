"use client";

import { TIERS_BY_ID } from "@/data/tiers";

interface TierBadgeProps {
  tierId: string | null;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

export function TierBadge({ tierId, size = "md", showName = false }: TierBadgeProps) {
  const tier = tierId ? TIERS_BY_ID[tierId] : null;
  if (!tier) return null;

  const sizeStyles = {
    sm: { fontSize: "0.75rem", padding: "2px 8px", iconSize: "0.85rem" },
    md: { fontSize: "0.8rem",  padding: "4px 10px", iconSize: "1rem" },
    lg: { fontSize: "0.9rem",  padding: "6px 14px", iconSize: "1.2rem" },
  }[size];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full font-semibold whitespace-nowrap"
      style={{
        background: `${tier.color}18`,
        border: `1px solid ${tier.color}50`,
        color: tier.color,
        fontSize: sizeStyles.fontSize,
        padding: sizeStyles.padding,
      }}
      title={tier.name}
    >
      <span style={{ fontSize: sizeStyles.iconSize }}>{tier.icon}</span>
      {showName && <span>{tier.name}</span>}
    </span>
  );
}
