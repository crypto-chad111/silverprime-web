import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Application Pending — Silver Prime Founders Club",
};

export default function PendingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "#0A0A0C" }}>
      <div
        className="w-full max-w-md rounded-2xl p-10 text-center"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(251,191,36,0.25)",
        }}
      >
        <div className="text-5xl mb-4">⏳</div>
        <h1 className="text-2xl font-bold text-white mb-3">Application under review</h1>
        <p className="text-silver-400 leading-relaxed mb-6">
          Your investment proof is being reviewed by the Silver Prime team.
          You&apos;ll receive a confirmation email once your account is approved —
          usually within <strong className="text-white">24–48 hours</strong>.
        </p>
        <p className="text-silver-600 text-sm mb-8">
          If you have questions, reach out via the main site.
        </p>
        <Link
          href="/"
          className="inline-block rounded-xl px-6 py-3 text-sm font-semibold text-white transition"
          style={{ background: "linear-gradient(135deg, #7C5CFF, #5b3fd9)" }}
        >
          Back to Silver Prime
        </Link>
      </div>
    </div>
  );
}
