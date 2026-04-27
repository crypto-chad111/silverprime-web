export type MilestoneStatus = "done" | "in-progress" | "planned";

export interface Milestone {
  id: string;
  stage: string;
  title: string;
  summary: string;
  details?: string;
  status: MilestoneStatus;
  shippedOn?: string;
  tags?: string[];
}

export const lanes: {
  past: Milestone[];
  present: Milestone[];
  future: Milestone[];
  hardware: Milestone[];
} = {
  past: [
    {
      id: "stage-1",
      stage: "Stage 1",
      title: "Architecture & Specification",
      summary:
        "Full system design: floating bubble, hybrid LLM routing, Android-native integrations, data model, risk flags.",
      status: "done",
      shippedOn: "2026-04-16",
      tags: ["spec", "architecture"],
    },
    {
      id: "stage-1-5",
      stage: "Stage 1.5",
      title: "Revisions Addendum",
      summary:
        "Pivoted Android-only, hybrid on-device Phi-3 + user keys, one-time Premium unlock, vision + backup scope.",
      status: "done",
      shippedOn: "2026-04-16",
      tags: ["spec", "pivot"],
    },
    {
      id: "stage-2",
      stage: "Stage 2",
      title: "Foundation scaffold",
      summary:
        "React Native 0.74 + Expo bare, TypeScript, WatermelonDB + SQLCipher, MMKV, theming, first debug APK (~165 MB).",
      status: "done",
      shippedOn: "2026-04-17",
      tags: ["android", "scaffold"],
    },
  ],
  present: [
    {
      id: "stage-3-1",
      stage: "Stage 3.1",
      title: "Cloud LLM gateway + Groq wiring",
      summary:
        "Keychain-backed key store, Groq chat-completions client, llmRouter seam, Settings UI. Multi-turn replies live on device.",
      status: "done",
      shippedOn: "2026-04-17",
      tags: ["ai", "groq", "shipped"],
    },
    {
      id: "stage-3-2",
      stage: "Stage 3.2",
      title: "Streaming + conversation persistence",
      summary:
        "XHR-based SSE streaming, token-by-token replies, sessions persisted in SQLCipher, hydration on launch, bundled APK (~175 MB).",
      status: "done",
      shippedOn: "2026-04-18",
      tags: ["ai", "sse", "persistence"],
    },
  ],
  future: [
    {
      id: "stage-3-3",
      stage: "Stage 3.3",
      title: "On-device Phi-3-mini",
      summary:
        "llama.rn integration, first-run ~2 GB model download, offline replies, smart routing picks local vs cloud by complexity score.",
      status: "planned",
      tags: ["on-device", "llama.rn"],
    },
    {
      id: "stage-3-4",
      stage: "Stage 3.4",
      title: "Voice I/O",
      summary:
        "Whisper.cpp STT, Porcupine wakeword, Android native TTS. Hands-free from the floating bubble.",
      status: "planned",
      tags: ["voice"],
    },
    {
      id: "stage-3-5",
      stage: "Stage 3.5",
      title: "Deep Android integrations",
      summary:
        "AccessibilityService, Calendar, Reminders, SMS, Phone, Maps, Weather, Web Search. Templates + intent router.",
      status: "planned",
      tags: ["android", "integrations"],
    },
    {
      id: "stage-4",
      stage: "Stage 4",
      title: "Self-improvement + Vision + Backup",
      summary:
        "Hermes isolate sandbox, static-analysis gates, MobileCLIP + ML Kit + face enrolment, Google Drive appDataFolder auto-backup.",
      status: "planned",
      tags: ["premium", "vision", "backup"],
    },
    {
      id: "stage-5",
      stage: "Stage 5",
      title: "Polish + Play Store launch",
      summary:
        "Remaining integrations, bubble animation polish, accessibility audit, Data Safety declaration, Play Console release.",
      status: "planned",
      tags: ["launch"],
    },
    {
      id: "stage-6",
      stage: "Stage 6",
      title: "Pro channel — sideload APK + custom update manifest",
      summary:
        "Power-user APK served direct from silverprime.app. App pings a signed version manifest; updates install via the Android system dialog, no Play Store round-trip. JS-layer capabilities ship freely; native updates prompt a system install. Play Store build continues in parallel for mainstream users.",
      status: "planned",
      tags: ["distribution", "sideload", "pro"],
    },
    {
      id: "stage-7",
      stage: "Stage 7",
      title: "Solana skill marketplace",
      summary:
        "Publish a self-authored capability, verify it in a hosted sandbox, list it on-chain. Buyers pay in $SOL; an Anchor program releases access and tracks marketplace-enforced royalties to the author. Skill bundles on IPFS with pinning; wallet integration via Phantom / Solflare / Backpack. No custom token — payments denominate in $SOL.",
      status: "planned",
      tags: ["solana", "sol", "marketplace", "ipfs"],
    },
  ],
  hardware: [
    {
      id: "aipc-h1",
      stage: "AIPC · Phase 1",
      title: "Concept & Integration Design",
      summary:
        "Define the circular form factor, hidden-rotor housing geometry, and palm-size target weight. Specify the Wi-Fi Direct protocol between drone and Silver Prime app. Design the RTSP video pipeline, microphone array routing, and speaker integration. Specify the shoulder platform harness: magnetic landing pad, wireless charging coil, USB-C backup port, slim carbon fibre cross-body strap. No physical hardware — software architecture and interface contracts only.",
      status: "planned",
      tags: ["aipc", "design", "wi-fi-direct"],
    },
    {
      id: "aipc-h2",
      stage: "AIPC · Phase 2",
      title: "Prototype Hardware",
      summary:
        "First physical unit: 130 mm carbon frame, four internally-ducted rotors with recessed vent outlets, HD camera module, GPS receiver, flight controller, slim LiPo pack. Silver Prime app receives live RTSP stream and exposes drone controls through the existing llmRouter interface — no second app, no second AI. Shoulder platform prototype: circular magnetic charging pad, cross-body harness fit testing across sizes.",
      status: "planned",
      tags: ["aipc", "prototype", "hardware"],
    },
    {
      id: "aipc-h3",
      stage: "AIPC · Phase 3",
      title: "Flight Validation & App Integration",
      summary:
        "Flight-test the sub-250 g target (no FAA registration required for recreational use). Validate 10–15 minute flight time, altitude hold, GPS return-to-home. Harden the Silver Prime ↔ drone Wi-Fi Direct handshake. Close-beta with a small group of waitlist members.",
      status: "planned",
      tags: ["aipc", "testing", "flight"],
    },
    {
      id: "aipc-h4",
      stage: "AIPC · Phase 4",
      title: "Production & Commercial Launch",
      summary:
        "Manufacturing partner, FCC / CE compliance, packaging. Waitlist early-bird units ($149) ship first, then standard retail ($199). Pro Bundle ($249) adds spare battery and carry case. Shoulder Platform add-on ($49) available separately. Full Kit Bundle ($289) pairs Pro drone + shoulder platform + Silver Prime Premium. All units ship with Silver Prime pre-installed — no subscription required.",
      status: "planned",
      tags: ["aipc", "launch", "hardware"],
    },
  ],
};
