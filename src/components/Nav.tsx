"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/features", label: "Features" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/why", label: "Why it's different" },
  { href: "/aipc", label: "AIPC" },
  { href: "/kickstarter", label: "Kickstarter 🚀" },
  { href: "/download", label: "Download" },
  { href: "/community", label: "Founders Club 💎" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full glass px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-display font-semibold tracking-tight">
          <span className="inline-block h-3 w-3 rounded-full bg-silver-grad shadow-glow" />
          <span className="silver-text">Silver Prime</span>
        </Link>
        <ul className="hidden md:flex items-center gap-7 text-sm text-silver-300">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-silver-100 transition">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#waitlist"
          className="hidden md:inline-block rounded-full bg-silver-grad px-4 py-1.5 text-sm font-medium text-bg shadow-glow hover:brightness-110 transition"
        >
          Join waitlist
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden relative h-9 w-9 rounded-full ring-1 ring-silver-800 bg-bg-raised/50 flex items-center justify-center"
        >
          <span className="sr-only">Menu</span>
          <span className={`block h-0.5 w-4 bg-silver-100 transition-transform ${open ? "translate-y-[3px] rotate-45" : "-translate-y-1"}`} />
          <span className={`block h-0.5 w-4 bg-silver-100 absolute transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`block h-0.5 w-4 bg-silver-100 transition-transform ${open ? "-translate-y-[3px] -rotate-45" : "translate-y-1"}`} />
        </button>
      </nav>

      {open && (
        <div className="md:hidden mx-auto mt-2 max-w-6xl px-4">
          <div className="rounded-2xl glass p-4">
            <ul className="flex flex-col divide-y divide-silver-800/60 text-silver-200">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block py-3 text-base font-medium hover:text-silver-50"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/#waitlist"
              className="mt-3 block rounded-full bg-silver-grad px-4 py-3 text-center text-sm font-semibold text-bg shadow-glow"
            >
              Join waitlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
