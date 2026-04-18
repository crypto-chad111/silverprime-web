import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Download — Silver Prime",
  description: "Silver Prime for Android. Play Store listing coming soon. Signed APK fallback for early testers.",
};

export default function DownloadPage() {
  return (
    <main className="relative">
      <Nav />

      <section className="mx-auto max-w-4xl px-6 pt-36 pb-16">
        <p className="mb-3 text-xs uppercase tracking-widest text-accent-glow">Download</p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight silver-text text-balance">
          Android only. Pre-launch.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-silver-300 text-pretty">
          The Play Store listing goes live once we clear closed testing. In the meantime, if
          you want to sideload the latest signed APK, join the waitlist — we&apos;ll send you
          a link.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl glass p-8">
            <div className="mb-4 inline-flex rounded-full bg-bg-raised px-3 py-1 text-[10px] uppercase tracking-widest text-silver-400 ring-1 ring-silver-800">
              Coming soon
            </div>
            <h2 className="mb-3 text-2xl font-semibold text-silver-100">Google Play</h2>
            <p className="mb-6 text-sm text-silver-300">
              Full release channel. Auto-updates. Play Billing for Premium unlock.
            </p>
            <button
              disabled
              className="w-full rounded-full bg-silver-800 px-5 py-3 text-sm font-medium text-silver-500 cursor-not-allowed"
            >
              Play Store — not yet live
            </button>
          </div>

          <div className="rounded-2xl glass p-8">
            <div className="mb-4 inline-flex rounded-full bg-accent/15 px-3 py-1 text-[10px] uppercase tracking-widest text-accent-glow ring-1 ring-accent/30">
              Early testers
            </div>
            <h2 className="mb-3 text-2xl font-semibold text-silver-100">Signed APK</h2>
            <p className="mb-6 text-sm text-silver-300">
              Sideload directly. Enable &ldquo;install from unknown sources&rdquo; for your
              browser or file manager.
            </p>
            <a
              href="#waitlist"
              className="block w-full rounded-full bg-silver-grad px-5 py-3 text-center text-sm font-semibold text-bg shadow-glow hover:brightness-110 transition"
            >
              Request APK access
            </a>
          </div>

          <div className="rounded-2xl glass p-8">
            <div className="mb-4 inline-flex rounded-full bg-warn/10 px-3 py-1 text-[10px] uppercase tracking-widest text-warn ring-1 ring-warn/30">
              On the roadmap · Stage 6
            </div>
            <h2 className="mb-3 text-2xl font-semibold text-silver-100">Pro channel</h2>
            <p className="mb-6 text-sm text-silver-300">
              Sideload APK with a custom update manifest served from silverprime.app. Faster
              releases. Ships with the $SOL skill marketplace (Stage 7).
            </p>
            <button
              disabled
              className="w-full rounded-full bg-silver-800 px-5 py-3 text-sm font-medium text-silver-500 cursor-not-allowed"
            >
              Not built yet
            </button>
          </div>
        </div>

        <div className="mt-12 rounded-2xl glass p-8">
          <h3 className="mb-3 text-lg font-semibold text-silver-100">Device requirements</h3>
          <ul className="grid gap-3 md:grid-cols-2 text-sm text-silver-300">
            <li>· Android 10 (API 29) minimum, Android 14+ recommended</li>
            <li>· 4 GB RAM minimum, 6 GB recommended for smooth on-device LLM</li>
            <li>· 4 GB free storage (for Phi-3-mini model download)</li>
            <li>· arm64-v8a primary, armeabi-v7a secondary</li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
