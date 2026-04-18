import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StatusBadge, type Status } from "@/components/StatusBadge";

export const metadata = {
  title: "Features — Silver Prime",
  description:
    "What Silver Prime does today, what's in progress, and what's on the roadmap. Hybrid LLM, privacy, streaming, memory, self-improvement, Solana skill marketplace.",
};

type Feature = {
  kicker: string;
  title: string;
  body: string;
  bullets: string[];
  tier: "free" | "premium" | "both";
  status: Status;
  stage?: string;
};

const features: Feature[] = [
  {
    kicker: "01 · Inference",
    title: "Hybrid LLM routing",
    body:
      "Cloud-only today via your Groq key. Phi-3-mini on-device is the next major milestone. When both exist, a small classifier will pick where your message goes based on length, keywords, and your preference.",
    bullets: [
      "Groq llama-3.1-8b-instant via your key — shipped",
      "Anthropic / OpenAI / Gemini adapters — planned after Stage 3.3",
      "Phi-3-mini-4k-instruct Q4_K_M, ~2.2 GB first-run download — planned Stage 3.3",
      "Heuristic complexity score: length, keywords, context turns, images — planned",
      "Override in settings: Always local / Always cloud / Smart (default)",
    ],
    tier: "both",
    status: "in-progress",
    stage: "3.1 → 3.3",
  },
  {
    kicker: "02 · Privacy",
    title: "Privacy by architecture, not policy",
    body:
      "There's no backend to leak because there isn't one. API keys sit in the Android Keystore. Conversations sit in SQLCipher. Biometric data, if you ever opt in, never leaves the device.",
    bullets: [
      "No server-side auth, no analytics, no telemetry — shipped",
      "API keys wrapped by Android Keystore (hardware-backed) — shipped",
      "Conversations in SQLCipher-encrypted SQLite — shipped",
      "Face embeddings never transmitted (if you enrol later) — planned Stage 4",
      "One-tap wipe for face + voice data — planned Stage 4",
    ],
    tier: "both",
    status: "shipped",
  },
  {
    kicker: "03 · Persona",
    title: "Renameable assistant",
    body:
      'Default persona will be "Prime." Change the name in onboarding or settings and every system prompt, every notification, every greeting follows.',
    bullets: [
      'Default: "Prime" (mirrors Siri / Alexa defaults)',
      "Custom name persists across sessions + backups",
      "Persona string injected into system prompt",
      "Voice wakeword will adapt to the chosen name (after Stage 3.4 voice lands)",
    ],
    tier: "both",
    status: "planned",
    stage: "3.5",
  },
  {
    kicker: "04 · Streaming",
    title: "Streaming chat",
    body:
      "Token-by-token replies via SSE. Typing cursor pulses while the model thinks. Abort mid-generation when you already got what you needed.",
    bullets: [
      "XHR-based SSE parser (Hermes-safe on RN 0.74)",
      "AbortController cancels in-flight streams",
      "Assistant turn persisted as it streams, not after",
      '"+ New" session button resets + aborts in one tap',
    ],
    tier: "both",
    status: "shipped",
  },
  {
    kicker: "05 · Memory",
    title: "Conversation persistence",
    body:
      "Every session, every turn, stored locally. Launch the app six weeks later, your last chat is still there.",
    bullets: [
      "WatermelonDB + SQLCipher schema",
      "conversation_sessions + conversation_turns tables",
      "50 most-recent turns hydrated on launch",
      "Provisional title from the first user message",
      "Archive, restore, export — all local",
    ],
    tier: "both",
    status: "shipped",
  },
  {
    kicker: "06 · Self-improvement",
    title: "Recursive self-improvement",
    body:
      "Ask the assistant to do something it can't. It will draft a capability, run it against fixtures in a sandbox you can inspect, and — once you approve — the capability becomes a permanent part of your assistant. JS-layer self-update is free and local: the assistant writes a new JS module, the Hermes isolate runs it, and if you confirm it works, it's written to the app's private storage and loaded on the next launch. No network required, no APK reinstall. Native features — new camera hooks, accessibility permissions, system integrations — live in the APK's native binaries, which Android signs and freezes. For those, the Pro channel (Stage 6) rebuilds a signed APK and prompts you to install the update. You always confirm. A skill marketplace (Stage 7) lets you publish capabilities you built — other users buy them for $SOL on Solana with marketplace-enforced royalties back to you.",
    bullets: [
      "JS module generated via your API key (Groq / Anthropic / OpenAI / Gemini)",
      "Static-analysis gate: no eval, no require, no __proto__, no host-app access",
      "Runs in Hermes isolated runtime with fixtures before promotion",
      "User approves every capability; 30-day one-tap rollback",
      "Optional Pro channel (Stage 6) rebuilds signed APK for native features",
      "Optional marketplace (Stage 7) lists skills on Solana for $SOL",
    ],
    tier: "premium",
    status: "planned",
    stage: "4 + 6 + 7",
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
          What Silver Prime actually does today — and what&apos;s honestly on the way. Every
          card is tagged <em>shipped</em>, <em>in progress</em>, or <em>planned</em>.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 space-y-6">
        {features.map((f) => (
          <article key={f.title} className="rounded-2xl glass p-8">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs text-silver-400">{f.kicker}</span>
              <div className="flex items-center gap-2">
                <StatusBadge status={f.status} stage={f.stage} />
                <span className={`rounded-full px-3 py-0.5 text-[10px] uppercase tracking-widest ring-1 ${tierColor[f.tier]}`}>
                  {tierLabel[f.tier]}
                </span>
              </div>
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
