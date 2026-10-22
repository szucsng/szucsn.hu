import { siteConfig } from "@/lib/site";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section
      id="rolam"
      className="border-t border-white/10 bg-white/[0.015] backdrop-blur-xl"
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-safelight/10 blur-3xl"
        />
        <div className="relative">
            {/* Header */}
            <Reveal>
              <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
                <div>
                  <p className="font-mono text-xs tracking-widest3 uppercase text-safelight mb-3">
                    Rólam
                  </p>
                  <h2 className="font-display italic text-display-lg text-paper">
                    Két kereső, egy szem
                  </h2>
                </div>
              </div>
            </Reveal>

            {/* Content grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
              {/* Portrait */}
              <Reveal className="md:col-span-4 lg:col-span-3">
                <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 group">
                  <div className="grain-overlay" aria-hidden="true" />
                  <img
                    src="/images/_MG_6125.jpg"
                    alt="Szücs Noel portré"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-mono text-[11px] tracking-widest2 uppercase text-paper/70">
                    PORTRÉ
                  </span>
                </div>
              </Reveal>

              {/* Bio */}
              <Reveal className="md:col-span-8 lg:col-span-5" delay={0.1}>
                <div className="space-y-4 text-base md:text-lg text-grain leading-relaxed">
                  {siteConfig.about.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>

              {/* Settings panel */}
              <Reveal className="md:col-span-12 lg:col-span-4" delay={0.2}>
                <div className="glass-soft rounded-2xl p-6">
                  <p className="font-mono text-[11px] tracking-widest3 uppercase text-safelight/80 mb-5">
                    Beállítások
                  </p>
                  <dl className="space-y-3">
                    {siteConfig.settings.map((s) => (
                      <div
                        key={s.key}
                        className="flex flex-col gap-1 font-mono text-xs border-b border-white/10 pb-3 last:border-0 last:pb-0"
                      >
                        <dt className="tracking-widest2 uppercase text-grain/60">
                          {s.key}
                        </dt>
                        <dd className="text-paper/90">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
      </div>
    </section>
  );
}
