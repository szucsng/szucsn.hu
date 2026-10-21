"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import FilterBar from "@/components/FilterBar";
import AnimatedStats from "@/components/AnimatedStats";
import FrameCard from "@/components/FrameCard";
import { frames } from "@/lib/frames";

type FilterKind = "all" | "code" | "photo";

export default function WorksPage() {
  const [filter, setFilter] = useState<FilterKind>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return frames;
    return frames.filter((f) => f.kind === filter);
  }, [filter]);

  const counts = useMemo(
    () => ({
      all: frames.length,
      code: frames.filter((f) => f.kind === "code").length,
      photo: frames.filter((f) => f.kind === "photo").length,
    }),
    [],
  );

  const years = frames.map((f) => f.year).sort();
  const season = years[0] ? `${years[0]}–${years[years.length - 1]}` : "";

  const stats = [
    { key: "TÉTEL", value: String(frames.length).padStart(2, "0"), numericPart: frames.length },
    { key: "KÓD", value: String(counts.code).padStart(2, "0"), numericPart: counts.code },
    { key: "FOTÓ", value: String(counts.photo).padStart(2, "0"), numericPart: counts.photo },
    { key: "SZEZON", value: season },
  ];

  return (
    <>
      <Nav />
      <main>
        {/* ── Hero ────────────────────────────────────────────── */}
        <section id="top" className="relative pt-16 overflow-hidden">
          <div className="sprockets mt-6" aria-hidden="true" />

          <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-28">
            <Reveal>
              <p className="font-mono text-[11px] tracking-widest3 uppercase text-safelight mb-6">
                Archívum — Kontaktmásolat
              </p>

              <h1 className="font-display italic text-[16vw] leading-[0.92] md:text-display-xl text-paper">
                Munkáim
              </h1>

              <div className="mt-8 mb-12">
                <div className="h-px bg-safelight/40 w-24" />
              </div>

              <p className="max-w-xl text-lg md:text-xl text-grain leading-relaxed">
                Minden tétel egy „frame” — kód vagy fénykép, ugyanazokkal a
                kérdésekkel megközelítve: mit hagyok a keretben, és mit vágok
                le.
              </p>

              <div className="mt-14">
                <AnimatedStats stats={stats} />
              </div>
            </Reveal>
          </div>

          <div className="sprockets-thin" aria-hidden="true" />
        </section>

        {/* ── Filter + Grid ──────────────────────────────────── */}
        <section className="border-t border-paper/10">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-36">
            <Reveal>
              <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
                <div>
                  <p className="font-mono text-xs tracking-widest3 uppercase text-safelight mb-3">
                    Kontaktmásolat
                  </p>
                  <h2 className="font-display italic text-display-lg text-paper">
                    A teljes sorozat
                  </h2>
                </div>
                <FilterBar active={filter} onChange={setFilter} counts={counts} />
              </div>
            </Reveal>

            <LayoutGroup>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper/10"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((frame, i) => (
                    <motion.div
                      key={frame.id}
                      layout
                      className="bg-void"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.04,
                        ease: [0.21, 0.47, 0.32, 0.98],
                        layout: { type: "spring", stiffness: 300, damping: 30 },
                      }}
                    >
                      <FrameCard frame={frame} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>

            {/* Empty state */}
            <AnimatePresence>
              {filtered.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="py-20 text-center"
                >
                  <p className="font-mono text-sm text-grain">Nincs találat.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <Reveal delay={0.1}>
              <p className="mt-14 font-mono text-[11px] tracking-widest3 uppercase text-grain/50 text-center">
                {filtered.length} tétel
                {filter !== "all" && ` / ${frames.length} összesen`}
                {" · "}{season}
              </p>
            </Reveal>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
