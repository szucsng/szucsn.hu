import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-void/25 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Left: copyright */}
          <div>
            <p className="font-mono text-[11px] text-grain/60">
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
            <p className="font-mono text-[11px] text-grain/40 mt-1">
              {siteConfig.location}
            </p>
          </div>

          {/* Center: nav */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 md:gap-x-8">
            <Link
              href="/"
              className="font-mono text-[11px] tracking-widest2 uppercase text-grain/60 hover:text-paper transition-colors duration-300"
            >
              Főoldal
            </Link>
            <Link
              href="/munkak"
              className="font-mono text-[11px] tracking-widest2 uppercase text-grain/60 hover:text-paper transition-colors duration-300"
            >
              Munkáim
            </Link>
            <Link
              href="/rolam"
              className="font-mono text-[11px] tracking-widest2 uppercase text-grain/60 hover:text-paper transition-colors duration-300"
            >
              Rólam
            </Link>
            <Link
              href="/szolgaltatasok"
              className="font-mono text-[11px] tracking-widest2 uppercase text-grain/60 hover:text-paper transition-colors duration-300"
            >
              Szolgáltatások
            </Link>
          </nav>

          {/* Right: social */}
          <div className="flex items-center gap-5">
            {siteConfig.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] tracking-widest2 uppercase text-grain/50 hover:text-paper transition-colors duration-300"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
