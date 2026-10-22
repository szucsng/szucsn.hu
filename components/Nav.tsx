"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const hrefFor = (href: string) =>
    href.startsWith("/") ? href : isHome ? href : `/${href}`;

  const isActive = (href: string) =>
    href === "/munkak" ? pathname.startsWith("/munkak") : href === pathname;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "bg-void/90 backdrop-blur-xl border-b border-paper/10"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label={`${siteConfig.name} — főoldal`}
            className="group flex items-center gap-2.5"
          >
            <span className="relative flex h-6 w-6 items-center justify-center border border-paper/20 transition-colors duration-300 group-hover:border-safelight/60">
              <span className="absolute inset-1 border border-safelight/50 transition-transform duration-500 group-hover:rotate-45" />
              <span className="h-1 w-1 bg-safelight" />
            </span>
            <span className="font-mono text-xs tracking-widest2 uppercase text-paper">
              {siteConfig.name.split(" ")[0]}
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {links.map((l, i) => {
              const href = hrefFor(l.href);
              const active = isActive(l.href);
              return (
                <li key={l.label}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative flex items-center gap-1.5 py-2 font-mono text-[11px] tracking-widest2 uppercase transition-colors duration-300 ${
                      active ? "text-paper" : "text-grain hover:text-paper"
                    }`}
                  >
                    <span
                      className={`text-[8px] transition-colors duration-300 ${
                        active
                          ? "text-safelight"
                          : "text-grain/30 group-hover:text-safelight"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {l.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-safelight transition-all duration-400 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href={hrefFor("#kapcsolat")}
              className="hidden lg:flex items-center gap-2 border border-paper/10 px-3 py-1.5 font-mono text-[9px] tracking-widest2 uppercase text-grain/70 transition-colors duration-300 hover:border-safelight/40 hover:text-paper"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-safelight opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-safelight" />
              </span>
              Elérhető
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
              className="relative flex h-10 w-10 items-center justify-center border border-paper/15 md:hidden"
            >
              <span
                className={`absolute h-px w-5 bg-paper transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-paper transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>
        </nav>

        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-safelight/30 to-transparent transition-opacity duration-500 ${
            scrolled || open ? "opacity-100" : "opacity-0"
          }`}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex h-full flex-col justify-between px-6 pb-10 pt-24">
              <nav className="space-y-1">
                {links.map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={hrefFor(l.href)}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 border-b border-paper/10 py-4"
                    >
                      <span className="font-mono text-[10px] text-safelight/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display italic text-4xl text-paper transition-colors duration-300 group-hover:text-safelight">
                        {l.label}
                      </span>
                      <span className="ml-auto text-safelight transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="space-y-5">
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest2 uppercase text-grain/60">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-safelight opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-safelight" />
                  </span>
                  Elérhető munkára
                </div>
                <div className="flex flex-wrap gap-5">
                  {siteConfig.social.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[10px] tracking-widest2 uppercase text-grain/50 transition-colors duration-300 hover:text-paper"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
