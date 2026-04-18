import Link from "next/link";

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full glass px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-display font-semibold tracking-tight">
          <span className="inline-block h-3 w-3 rounded-full bg-silver-grad shadow-glow" />
          <span className="silver-text">Silver Prime</span>
        </Link>
        <ul className="hidden md:flex items-center gap-7 text-sm text-silver-300">
          <li><Link href="/#features" className="hover:text-silver-100 transition">Features</Link></li>
          <li><Link href="/roadmap" className="hover:text-silver-100 transition">Roadmap</Link></li>
          <li><Link href="/#why" className="hover:text-silver-100 transition">Why it&apos;s different</Link></li>
          <li><Link href="/#download" className="hover:text-silver-100 transition">Download</Link></li>
        </ul>
        <Link
          href="/#waitlist"
          className="rounded-full bg-silver-grad px-4 py-1.5 text-sm font-medium text-bg shadow-glow hover:brightness-110 transition"
        >
          Join waitlist
        </Link>
      </nav>
    </header>
  );
}
