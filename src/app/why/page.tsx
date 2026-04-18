import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Why Silver Prime is different",
  description:
    "On-device option. Your own keys. No forced account. Rename-your-AI. Android-first. An honest comparison.",
};

const matrix = [
  { feature: "Runs on-device (no cloud required)",     sp: true,  gpt: false, gemini: false, copilot: false },
  { feature: "You bring your own API key",              sp: true,  gpt: false, gemini: false, copilot: false },
  { feature: "No account required",                     sp: true,  gpt: false, gemini: false, copilot: false },
  { feature: "Rename the assistant to anything",        sp: true,  gpt: false, gemini: false, copilot: false },
  { feature: "Android system overlay / floating bubble", sp: true,  gpt: false, gemini: false, copilot: false },
  { feature: "Data never leaves the device by default",  sp: true,  gpt: false, gemini: false, copilot: false },
  { feature: "Frontier models via your key (Groq, Anthropic, OpenAI, Gemini)", sp: true, gpt: true, gemini: true, copilot: true },
  { feature: "One-time price, no subscriptions",         sp: true,  gpt: false, gemini: false, copilot: false },
  { feature: "Open roadmap you can read",                sp: true,  gpt: false, gemini: false, copilot: false },
];

function Cell({ v }: { v: boolean }) {
  return v ? (
    <span className="text-ok" aria-label="yes">●</span>
  ) : (
    <span className="text-silver-700" aria-label="no">○</span>
  );
}

export default function WhyPage() {
  return (
    <main className="relative">
      <Nav />

      <section className="mx-auto max-w-4xl px-6 pt-36 pb-10">
        <p className="mb-3 text-xs uppercase tracking-widest text-accent-glow">Manifesto</p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight silver-text text-balance">
          The assistant you own, not the one that owns you.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-silver-300 text-pretty">
          Every mainstream AI assistant today treats your phone as a thin client for their
          server. Silver Prime flips that. The model runs on your device. The keys are yours.
          The conversations stay local. The name on the app is whatever you type.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12 space-y-10">
        <Principle
          num="01"
          title="On-device by default"
          body="Phi-3-mini runs locally via llama.rn. You can have a full conversation with zero network. When you want frontier-model power, smart routing kicks requests out to your key — and only with your permission."
        />
        <Principle
          num="02"
          title="Your keys, encrypted on your device"
          body="Bring your Groq, Anthropic, OpenAI, or Gemini key. Stored in the Android Keystore — hardware-backed, never synced, never transmitted to us because there is no us-server."
        />
        <Principle
          num="03"
          title="No account. No tracking. No ads."
          body="There is no sign-up flow. There is no analytics SDK. There is no creator revenue from your data. The only money we ever see is a one-time Premium unlock through Google Play."
        />
        <Principle
          num="04"
          title="Rename it. It's yours."
          body={'The default persona is "Prime." Change it to Jarvis, Athena, your cat\'s name, or a slur aimed at your own productivity. The underlying capabilities are identical. The voice on top is yours to shape.'}
        />
        <Principle
          num="05"
          title="Android-first, not Android-afterthought"
          body="iOS work is cancelled. Not deferred — cancelled. Every pixel of battery, every accessibility hook, every floating-bubble animation is tuned for Android 10+. You get integrations iOS literally cannot ship."
        />
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-6 font-display text-3xl md:text-4xl font-semibold silver-text">Honest comparison</h2>
        <p className="mb-8 text-silver-400 text-sm">
          We&apos;re not going to pretend these apps are bad. They&apos;re excellent. They&apos;re
          just a different product. Here&apos;s what you actually give up when you pick one of them.
        </p>
        <div className="overflow-x-auto rounded-2xl glass">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-silver-800 text-left">
                <th className="p-4 font-medium text-silver-300">Capability</th>
                <th className="p-4 text-center font-medium text-silver-100">Silver Prime</th>
                <th className="p-4 text-center font-medium text-silver-400">ChatGPT app</th>
                <th className="p-4 text-center font-medium text-silver-400">Gemini</th>
                <th className="p-4 text-center font-medium text-silver-400">Copilot</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((r) => (
                <tr key={r.feature} className="border-b border-silver-900 last:border-0">
                  <td className="p-4 text-silver-200">{r.feature}</td>
                  <td className="p-4 text-center text-lg"><Cell v={r.sp} /></td>
                  <td className="p-4 text-center text-lg"><Cell v={r.gpt} /></td>
                  <td className="p-4 text-center text-lg"><Cell v={r.gemini} /></td>
                  <td className="p-4 text-center text-lg"><Cell v={r.copilot} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Principle({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-[auto_1fr] md:gap-10 items-start">
      <span className="font-mono text-sm text-accent-glow md:pt-1">{num}</span>
      <div>
        <h3 className="mb-2 text-2xl font-semibold text-silver-100">{title}</h3>
        <p className="text-silver-300 text-pretty">{body}</p>
      </div>
    </div>
  );
}
