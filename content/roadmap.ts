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
  ],
};
