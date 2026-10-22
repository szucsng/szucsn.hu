import { siteConfig } from "@/lib/site";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section
      id="kapcsolat"
      className="border-y border-white/10 bg-white/[0.015] backdrop-blur-xl"
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--project-accent-soft, rgba(184,73,46,0.18)) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left: heading */}
          <div className="md:col-span-7">
            <Reveal>
              <p
                className="font-mono text-xs tracking-widest3 uppercase mb-3"
                style={{ color: "var(--project-accent, #B8492E)" }}
              >
                Kapcsolat
              </p>
              <h2 className="font-display italic text-display-lg text-paper mb-8">
                Van egy projekt,<br />ami mindkét szemet igényli?
              </h2>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 font-mono text-lg md:text-2xl text-paper border-b border-white/20 hover:border-[var(--project-accent)] pb-1 transition-all duration-400"
              >
                {siteConfig.email}
                <span
                  className="group-hover:translate-x-1 transition-transform duration-300"
                  style={{ color: "var(--project-accent, #B8492E)" }}
                >
                  →
                </span>
              </a>
            </Reveal>
          </div>

          {/* Right: social */}
          <div className="md:col-span-5 md:pt-12">
            <Reveal delay={0.15}>
              <p className="font-mono text-[11px] tracking-widest3 uppercase text-grain/50 mb-5">
                Elérhetőségek
              </p>
              <div className="space-y-3">
                {siteConfig.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-xl p-4 border border-white/10 bg-white/[0.02] hover:border-[var(--project-accent)] transition-all duration-300"
                  >
                    <img
                      src={s.icon}
                      alt=""
                      className="h-5 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <span className="font-mono text-[11px] tracking-widest2 uppercase text-grain group-hover:text-paper transition-colors duration-300">
                        {s.label}
                      </span>
                    </div>
                    <span
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                      style={{ color: "var(--project-accent, #B8492E)" }}
                    >
                      →
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
