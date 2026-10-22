import { siteConfig } from "@/lib/site";
import Reveal from "./Reveal";

type Props = {
  embedded?: boolean;
};

export default function Contact({ embedded = false }: Props) {
  return (
    <section
      id="kapcsolat"
      className={embedded ? "" : "border-t border-paper/10"}
    >
      <div
        className={
          embedded
            ? "px-6 py-14 md:px-10 md:py-20"
            : "max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-36"
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
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
                className="group inline-flex items-center gap-3 font-mono text-lg md:text-2xl text-paper border-b border-paper/20 hover:border-[var(--project-accent)] pb-1 transition-all duration-400"
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
              <div className="space-y-4">
                {siteConfig.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 p-4 border border-paper/10 hover:border-[var(--project-accent)] transition-all duration-300"
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
