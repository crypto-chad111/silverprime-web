import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx,ts}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0A0A0C",
          raised: "#111114",
          sunk: "#060608",
        },
        silver: {
          50:  "#F5F5F7",
          100: "#E8E8EC",
          200: "#D4D4DC",
          300: "#B8B8C0",
          400: "#9A9AA4",
          500: "#7A7A84",
          600: "#5A5A64",
          700: "#3E3E48",
          800: "#26262E",
          900: "#16161C",
        },
        accent: {
          DEFAULT: "#7C5CFF",
          muted: "#5B3FE0",
          glow: "#9B82FF",
        },
        ok:   "#22D3EE",
        warn: "#FBBF24",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(124,92,255,0.45)",
        ring: "inset 0 0 0 1px rgba(232,232,236,0.08)",
      },
      backgroundImage: {
        "silver-grad": "linear-gradient(135deg, #F5F5F7 0%, #B8B8C0 55%, #6A6A74 100%)",
        "orb-grad":   "radial-gradient(circle at 30% 30%, #E8E8EC 0%, #9A9AA4 35%, #3E3E48 70%, #0A0A0C 100%)",
        "grid-faint": "linear-gradient(rgba(232,232,236,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,232,236,0.04) 1px, transparent 1px)",
      },
      animation: {
        "orb-float": "orb-float 8s ease-in-out infinite",
        "shimmer":   "shimmer 3s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        "orb-float": {
          "0%,100%": { transform: "translateY(0) scale(1)" },
          "50%":     { transform: "translateY(-12px) scale(1.02)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
