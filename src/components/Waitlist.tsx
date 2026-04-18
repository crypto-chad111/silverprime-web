"use client";

import { useState } from "react";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");

  return (
    <section id="waitlist" className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight silver-text">
        Be first on Android.
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-silver-300">
        We&apos;ll email you once when the Play Store listing goes live. No marketing,
        no newsletter, no tracking pixels.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!/^\S+@\S+\.\S+$/.test(email)) return setState("err");
          // TODO: wire to Netlify Forms or a real endpoint
          setState("ok");
        }}
        className="mx-auto mt-10 flex max-w-md flex-col sm:flex-row gap-3"
      >
        <input
          type="email"
          required
          placeholder="you@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-full glass px-5 py-3 text-sm text-silver-100 placeholder:text-silver-500 outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          className="rounded-full bg-silver-grad px-6 py-3 text-sm font-semibold text-bg shadow-glow hover:brightness-110 transition"
        >
          Notify me
        </button>
      </form>
      {state === "ok" && <p className="mt-4 text-sm text-ok">You&apos;re on the list.</p>}
      {state === "err" && <p className="mt-4 text-sm text-warn">That email doesn&apos;t look right.</p>}
    </section>
  );
}
