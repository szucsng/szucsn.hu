"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
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
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

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
      <header className="fixed inset-x-3 top-3 z-50 md:inset-x-6 md:top-4">
        <nav
          className={`glass relative mx-auto flex h-12 max-w-6xl items-center justify-between rounded-full px-4 transition-shadow duration-500 md:h-14 md:px-6 ${
            scrolled ? "shadow-[0_24px_80px_rgba(0,0,0,0.55)]" : ""
          }`}
        >
          {/* accent glass sheen */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 rounded-full transition-colors duration-500 ${
              scrolled ? "bg-void/55" : "bg-transparent"
            }`}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(115deg, var(--project-accent-soft, rgba(184,73,46,0.14)) 0%, transparent 30%, transparent 72%, rgba(255,255,255,0.03) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--project-accent-soft, rgba(184,73,46,0.45)), transparent)",
            }}
          />

          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label={`${siteConfig.name} — főoldal`}
            className="relative z-10 group flex items-center gap-2"
          >
            <img
              src="/images/logo-mark.png"
              alt=""
              width={320}
              height={213}
              className="h-5 w-auto transition-transform duration-500 group-hover:scale-105"
            />
            <span className="font-mono text-[10px] tracking-widest2 uppercase text-paper">
              {siteConfig.name.split(" ")[0]}
            </span>
          </Link>

          <ul className="relative z-10 hidden items-center gap-5 md:flex lg:gap-6">
            {links.map((l, i) => {
              const href = hrefFor(l.href);
              const active = isActive(l.href);
              return (
                <li key={l.label}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative flex items-center gap-1 py-2 font-mono text-[10px] tracking-widest2 uppercase transition-colors duration-300 ${
                      active ? "text-paper" : "text-grain hover:text-paper"
                    }`}
                  >
                    <span
                      className={`text-[8px] transition-colors duration-300 ${
                        active
                          ? ""
                          : "text-grain/30 group-hover:text-safelight"
                      }`}
                      style={
                        active
                          ? { color: "var(--project-accent, #B8492E)" }
                          : undefined
                      }
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {l.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px transition-all duration-400 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                      style={{
                        backgroundColor: "var(--project-accent, #B8492E)",
                      }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="relative z-10 flex items-center gap-2.5">
            <Link
              href={hrefFor("#kapcsolat")}
              className="hidden items-center gap-1.5 rounded-full border border-paper/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[8px] tracking-widest2 uppercase text-grain/70 transition-colors duration-300 hover:border-safelight/40 hover:text-paper xl:flex"
            >
              <span className="relative flex h-1 w-1">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-safelight opacity-60" />
                <span className="relative inline-flex h-1 w-1 rounded-full bg-safelight" />
              </span>
              Elérhető
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
              className="relative flex h-8 w-8 items-center justify-center rounded-full border border-paper/15 md:hidden"
            >
              <span
                className={`absolute h-px w-4 bg-paper transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-paper transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-5 bottom-0 h-[2px] origin-left rounded-full md:inset-x-6"
            style={{
              scaleX: progress,
              backgroundColor: "var(--project-accent, #B8492E)",
              boxShadow:
                "0 0 10px var(--project-accent-soft, rgba(184,73,46,0.5))",
            }}
          />
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-void/95 md:hidden"
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
                      <span
                        className="font-mono text-[10px]"
                        style={{ color: "var(--project-accent, #B8492E)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display italic text-4xl text-paper transition-colors duration-300 group-hover:text-safelight">
                        {l.label}
                      </span>
                      <span
                        className="ml-auto transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        style={{ color: "var(--project-accent, #B8492E)" }}
                      >
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
