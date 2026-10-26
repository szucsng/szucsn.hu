import { siteConfig } from "@/lib/site";
import Reveal from "./Reveal";

export default function Achievements() {
  return (
    <section className="border-t border-white/10">
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-safelight/10 blur-3xl"
        />

        <Reveal>
          <div className="relative mb-14 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest3 text-safelight">
                Eredmények
              </p>
              <h2 className="font-display italic text-display-lg text-paper">
                Ami mögötte van
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-grain">
              Két országos verseny és több év versenysport — a következetesség
              és a csapatmunka innen jön.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {siteConfig.achievements.map((achievement, i) => (
            <Reveal key={achievement.title} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col bg-void/40 px-6 py-8">
                <span className="font-display italic text-5xl text-safelight">
                  {achievement.value}
                </span>
                <span className="mt-4 text-lg text-paper">
                  {achievement.title}
                </span>
                <span className="mt-auto pt-3 font-mono text-[10px] uppercase tracking-widest2 text-grain/50">
                  {achievement.detail}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
