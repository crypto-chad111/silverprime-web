/**
 * Kickstarter tier catalogue — single source of truth.
 * Update prices/descriptions here once the Kickstarter campaign is finalised.
 */

import type { Tier } from "@/lib/types";

export const TIERS: Tier[] = [
  {
    id: "digital-supporter",
    name: "Digital Supporter",
    priceUsd: 29,
    icon: "🌟",
    level: 1,
    description: "Silver Prime Premium lifetime licence + name in credits",
    color: "#94a3b8",
  },
  {
    id: "app-founding-member",
    name: "App Founding Member",
    priceUsd: 99,
    icon: "🚀",
    level: 2,
    description: "Premium lifetime + Discord VIP + private beta access",
    color: "#60a5fa",
  },
  {
    id: "pioneer-pack",
    name: "Pioneer Pack",
    priceUsd: 399,
    icon: "🛸",
    level: 3,
    description: "1 AIPC drone — early bird (20% off retail)",
    color: "#34d399",
  },
  {
    id: "standard-pre-order",
    name: "Standard Pre-Order",
    priceUsd: 499,
    icon: "🛸",
    level: 4,
    description: "1 AIPC drone",
    color: "#34d399",
  },
  {
    id: "pro-bundle",
    name: "Pro Bundle",
    priceUsd: 599,
    icon: "🛸",
    level: 5,
    description: "AIPC + Shoulder Platform",
    color: "#a78bfa",
  },
  {
    id: "full-kit",
    name: "Full Kit",
    priceUsd: 699,
    icon: "🛸",
    level: 6,
    description: "AIPC + Shoulder Platform + spare battery + Silver Prime Premium",
    color: "#a78bfa",
  },
  {
    id: "innovator-edition",
    name: "Innovator Edition",
    priceUsd: 999,
    icon: "🏆",
    level: 7,
    description: "Full Kit + engraved nameplate + quarterly founder video calls",
    color: "#f59e0b",
  },
  {
    id: "founding-partner",
    name: "Founding Partner",
    priceUsd: 2500,
    icon: "💎",
    level: 8,
    description: "Innovator + 1hr video call with founders + Wall of Fame",
    color: "#e879f9",
  },
  {
    id: "lead-investor",
    name: "Lead Investor",
    priceUsd: 15000,
    icon: "👑",
    level: 9,
    description: "Full Kit + in-person HQ visit + advisory role + logo on site",
    color: "#fbbf24",
  },
];

export const TIERS_BY_ID = Object.fromEntries(TIERS.map((t) => [t.id, t]));
export const TIERS_BY_LEVEL = [...TIERS].sort((a, b) => b.level - a.level);
