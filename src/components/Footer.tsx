import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto mt-32 max-w-6xl px-6 pb-16 text-sm text-silver-400">
      <div className="flex flex-col gap-6 border-t border-silver-800 pt-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-silver-grad" />
          <span className="silver-text font-medium">Silver Prime</span>
          <span className="text-silver-600">·</span>
          <span>Android, for people who own their AI.</span>
        </div>
        <div className="flex items-center gap-5">
          {/* TODO: replace with X handle */}
          <a href="#" aria-label="X" className="hover:text-silver-100 transition">X</a>
          <a href="https://github.com/crypto-chad111" target="_blank" rel="noopener noreferrer" className="hover:text-silver-100 transition">GitHub</a>
          <Link href="/docs" className="hover:text-silver-100 transition">Docs</Link>
          <Link href="/roadmap" className="hover:text-silver-100 transition">Roadmap</Link>
        </div>
      </div>
      <p className="mt-6 text-xs text-silver-600">© {new Date().getFullYear()} Silver Prime. No servers, no tracking, no ads.</p>
    </footer>
  );
}
