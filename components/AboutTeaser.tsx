import Link from "next/link";
import { siteConfig } from "@/lib/site";
import Reveal from "./Reveal";

export default function AboutTeaser() {
  return (
    <section className="border-t border-white/10 bg-white/[0.015] backdrop-blur-xl">
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-safelight/10 blur-3xl"
        />

        <Reveal>
          <div className="relative grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest3 text-safelight">
                Rólam
              </p>
              <h2 className="font-display italic text-display-lg text-paper">
                Két kereső, egy szem
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-grain md:text-lg">
                {siteConfig.about[0]}
              </p>
            </div>

            <div className="md:col-span-4 md:text-right">
              <Link
                href="/rolam"
                className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 font-mono text-[11px] uppercase tracking-widest2 text-paper backdrop-blur-xl transition-all duration-400 hover:border-safelight hover:text-safelight"
              >
                Több rólam
                <span className="text-safelight transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
