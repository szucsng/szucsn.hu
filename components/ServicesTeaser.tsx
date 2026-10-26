import Link from "next/link";
import { services } from "@/lib/services";
import Reveal from "./Reveal";

export default function ServicesTeaser() {
  return (
    <section className="border-t border-white/10">
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-safelight/10 blur-3xl"
        />

        <Reveal>
          <div className="relative flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest3 text-safelight">
                Szolgáltatások
              </p>
              <h2 className="font-display italic text-display-lg text-paper">
                Mit csinálok
              </h2>
            </div>

            <Link
              href="/szolgaltatasok"
              className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-grain/60 transition-colors duration-300 hover:text-paper"
            >
              Részletek
              <span className="text-safelight transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.label} delay={i * 0.06} className="h-full">
              <Link
                href="/szolgaltatasok"
                className="group glass-soft flex h-full flex-col rounded-2xl p-5 transition-colors duration-300 hover:border-safelight/30"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest3 text-safelight/60">
                  {service.label}
                </span>
                <span className="mt-3 font-display text-xl text-paper transition-colors duration-300 group-hover:text-safelight">
                  {service.title}
                </span>
                <span className="mt-auto pt-4 font-mono text-[9px] uppercase tracking-widest2 text-grain/40">
                  0{i + 1}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
