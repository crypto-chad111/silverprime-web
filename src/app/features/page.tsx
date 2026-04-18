import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Features — Silver Prime",
  description: "Hybrid LLM, privacy by architecture, renameable persona, streaming chat, persistent memory, extensibility.",
};

type Feature = {
  kicker: string;
  title: string;
  body: string;
  bullets: string[];
  tier: "free" | "premium" | "both";
};

const features: Feature[] = [
  {
    kicker: "01 · Inference",
    title: "Hybrid LLM routing",
    body: "A small on-device classifier picks where your message goes. Short, casual, private? Phi-3-mini. Long, complex, reasoning-heavy? Your key of choice.",
    bullets: [
      "Phi-3-mini-4k-instruct, Q4_K_M (~2.2 GB, first-run download)",
      "Groq llama-3.1-8b-instant via your key (default cloud target)",
      "Anthropic, OpenAI, Gemini adapters — all user-configured",
      "Heuristic complexity score: length, keywords, context turns, images",
      "Override in settings: Always local / Always cloud / Smart (default)",
    ],
    tier: "both",
  },
  {
    kicker: "02 · Privacy",
    title: "Privacy by architecture, not policy",
    body: "There's no backend to leak because there isn't one. API keys sit in the Android Keystore. Conversations sit in SQLCipher. Biometric data, if you opt in, never leaves the device.",
    bullets: [
      "No server-side auth, no analytics, no telemetry",
      "API keys wrapped by Android Keystore (hardware-backed)",
      "Conversations in SQLCipher-encrypted SQLite",
      "Face embeddings, if enrolled, never transmitted",
      "One-tap wipe for face + voice data",
    ],
    tier: "both",
  },
  {
    kicker: "03 · Persona",
    title: "Renameable assistant",
    body: "Default persona is Prime. Change the name in onboarding or settings and every system prompt, every notification, every greeting follows.",
    bullets: [
      'Default: "Prime" (mirrors Siri / Alexa defaults)',
      "Custom name persists across sessions + backups",
      "Persona string injected into system prompt",
      "Voice wakeword adapts to the chosen name",
    ],
    tier: "both",
  },
  {
    kicker: "04 · Streaming",
    title: "Streaming chat",
    body: "Token-by-token replies via SSE. Typing cursor pulses while the model thinks. Abort mid-generation when you already got what you needed.",
    bullets: [
      "XHR-based SSE parser (Hermes-safe on RN 0.74)",
      "AbortController cancels in-flight streams",
      "Assistant turn persisted as it streams, not after",
      '"+ New" session button resets + aborts in one tap',
    ],
    tier: "both",
  },
  {
    kicker: "05 · Memory",
    title: "Conversation persistence",
    body: "Every session, every turn, stored locally. Launch the app six weeks later, your last chat is still there.",
    bullets: [
      "WatermelonDB + SQLCipher schema",
      "conversation_sessions + conversation_turns tables",
      "50 most-recent turns hydrated on launch",
      "Provisional title from the first user message",
      "Archive, restore, export — all local",
    ],
    tier: "both",
  },
  {
    kicker: "06 · Extensibility",
    title: "Self-improvement sandbox",
    body: "Premium unlocks a gap-detector that proposes new capabilities, generates JS via your key, runs static-analysis gates, and executes inside a Hermes isolate — with a 30-day rollback.",
    bullets: [
      "Daily cap on capability generations (default 5)",
      "JS-only generated code, banned-pattern linter",
      "Hermes isolated runtime — no host app access",
      "In-app review panel before any capability goes live",
      "30-day one-tap rollback",
    ],
    tier: "premium",
  },
];

const tierLabel = {
  free: "Free",
  premium: "Premium",
  both: "Free + Premium",
};
const tierColor = {
  free: "text-ok bg-ok/10 ring-ok/30",
  premium: "text-accent-glow bg-accent/15 ring-accent/30",
  both: "text-silver-300 bg-silver-800 ring-silver-700",
};

export default function FeaturesPage() {
  return (
    <main className="relative">
      <Nav />

      <section className="mx-auto max-w-4xl px-6 pt-36 pb-12">
        <p className="mb-3 text-xs uppercase tracking-widest text-accent-glow">Features</p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight silver-text text-balance">
          Six pillars, zero servers.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-silver-300 text-pretty">
          What you actually get when you install Silver Prime. Specific, not promoted.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 space-y-6">
        {features.map((f) => (
          <article key={f.title} className="rounded-2xl glass p-8">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="font-mono text-xs text-silver-400">{f.kicker}</span>
              <span className={`rounded-full px-3 py-0.5 text-[10px] uppercase tracking-widest ring-1 ${tierColor[f.tier]}`}>
                {tierLabel[f.tier]}
              </span>
            </div>
            <h2 className="mb-3 text-2xl md:text-3xl font-semibold text-silver-100">{f.title}</h2>
            <p className="mb-5 text-silver-300 text-pretty">{f.body}</p>
            <ul className="grid gap-2 text-sm text-silver-400">
              {f.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <Footer />
    </main>
  );
}
