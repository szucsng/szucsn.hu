"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/munkak", label: "Munkáim" },
  { href: "#rolam", label: "Rólam" },
  { href: "#szolgaltatasok", label: "Szolgáltatások" },
  { href: "#kapcsolat", label: "Kapcsolat" },
];

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hrefFor = (href: string) =>
    href.startsWith("/") ? href : isHome ? href : `/${href}`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-void/90 backdrop-blur-md border-b border-paper/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-xs tracking-widest2 uppercase text-paper hover:text-safelight transition-colors duration-300"
        >
          {siteConfig.name.split(" ")[0]}
        </Link>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const href = hrefFor(l.href);
            const active = href === pathname;
            return (
              <li key={l.label}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative font-mono text-[11px] tracking-widest2 uppercase transition-colors duration-300 ${
                    active ? "text-paper" : "text-grain hover:text-paper"
                  }`}
                >
                  {l.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-safelight" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile: simple menu icon */}
        <div className="md:hidden flex items-center gap-4">
          <Link
            href="/munkak"
            className="font-mono text-[11px] tracking-widest2 uppercase text-grain hover:text-paper transition-colors duration-300"
          >
            Munkáim
          </Link>
        </div>
      </nav>
    </header>
  );
}
