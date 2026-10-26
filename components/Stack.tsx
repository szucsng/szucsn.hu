import type { CSSProperties } from "react";
import { siteConfig } from "@/lib/site";
import { techIcons } from "@/lib/tech-icons";
import Reveal from "./Reveal";

function readableColor(hex: string) {
  const value = parseInt(hex, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.22 ? "F2EDE4" : hex;
}

export default function Stack() {
  return (
    <section className="border-t border-white/10 bg-white/[0.015] backdrop-blur-xl">
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-safelight/10 blur-3xl"
        />

        <Reveal>
          <div className="relative mb-14 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest3 text-safelight">
                Stack
              </p>
              <h2 className="font-display italic text-display-lg text-paper">
                Amivel dolgozom
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-grain">
              A nyelvtől az infrastruktúráig — amit a mindennapi munkában
              használok.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {siteConfig.stack.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.06} className="h-full">
              <div className="glass-soft h-full rounded-2xl p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest3 text-safelight/70">
                  {group.label}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const icon = techIcons[item];
                    const color = icon ? readableColor(icon.hex) : null;
                    return (
                      <span
                        key={item}
                        style={
                          color
                            ? ({ "--tech": `#${color}` } as CSSProperties)
                            : undefined
                        }
                        className={`group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide text-grain/70 transition-colors duration-300 ${
                          color
                            ? "hover:border-[var(--tech)]"
                            : "hover:border-safelight/30"
                        }`}
                      >
                        {icon ? (
                          <svg
                            viewBox="0 0 24 24"
                            className="h-3.5 w-3.5 shrink-0"
                            fill={`#${color}`}
                            aria-hidden="true"
                          >
                            <path d={icon.path} />
                          </svg>
                        ) : (
                          <span className="h-1 w-1 shrink-0 rounded-full bg-grain/40" />
                        )}
                        <span
                          className={
                            color
                              ? "transition-colors duration-300 group-hover:text-[var(--tech)]"
                              : undefined
                          }
                        >
                          {item}
                        </span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
