"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "./Reveal";
import { useExif } from "@/hooks/use-exif";

type Props = {
  gallery: string[];
  title: string;
  accent?: string;
};

export default function ProjectGallery({
  gallery,
  title,
  accent = "#B8492E",
}: Props) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = useCallback((i: number) => {
    setIndex(i);
    setLightbox(true);
  }, []);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % gallery.length),
    [gallery.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + gallery.length) % gallery.length),
    [gallery.length],
  );

  /* Keyboard navigation */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!lightbox) return;
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, next, prev]);

  /* Lock page scroll while the album is open */
  useEffect(() => {
    if (!lightbox) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [lightbox]);

  /* Swipe gesture */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart.current === null) return;
      const diff = touchStart.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? next() : prev();
      }
      touchStart.current = null;
    },
    [next, prev],
  );

  const activeExif = useExif(gallery[index]);

  if (gallery.length === 0) return null;

  return (
    <>
      <section className="w-full">
        <Reveal>
          {/* Album header */}
          <div className="flex flex-wrap items-end justify-between gap-3 mb-5 border-b border-paper/10 pb-4">
            <div>
              <p
                className="font-mono text-[11px] tracking-widest3 uppercase"
                style={{ color: accent }}
              >
                Album
              </p>
              <p className="mt-1 font-mono text-[11px] tracking-widest2 uppercase text-grain/50">
                {gallery.length} kép · kattints a nagyításhoz
              </p>
            </div>
            <span className="font-mono text-[11px] tracking-widest2 uppercase text-grain/40">
              {title}
            </span>
          </div>

          {/* Album grid — teljes kép, vágás nélkül */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
            {gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => open(i)}
                aria-label={`${title} — ${i + 1}. kép megnyitása`}
                className="group relative block w-full overflow-hidden border border-paper/10 bg-void-light text-left transition-colors duration-400 hover:border-[var(--project-accent)]"
              >
                <img
                  src={src}
                  alt={`${title} — ${i + 1}. kép`}
                  className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                <span className="pointer-events-none absolute left-3 top-3 bg-void/50 backdrop-blur-sm px-2 py-1 font-mono text-[10px] tracking-widest2 uppercase text-paper/80">
                  #{String(i + 1).padStart(2, "0")}
                </span>

                <ExposureChip src={src} />

                <span className="pointer-events-none absolute bottom-3 right-3 bg-void/60 backdrop-blur-md px-3 py-1.5 border border-paper/15 font-mono text-[10px] tracking-widest2 uppercase text-paper/80 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                  Nagyítás ↗
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {lightbox && (
              <motion.div
                className="fixed inset-0 z-[100] bg-void/95 backdrop-blur-xl flex flex-col items-center justify-center gap-3 p-4 pt-20 md:p-8"
                role="dialog"
                aria-modal="true"
                aria-label={`${title} album`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightbox(false)}
              >
                {/* Counter */}
                <span className="absolute top-5 left-5 z-20 font-mono text-[11px] tracking-widest2 uppercase text-paper/70 bg-void/60 backdrop-blur-md px-3 py-1.5 border border-paper/10">
                  {String(index + 1).padStart(2, "0")}
                  <span className="text-paper/30 mx-1">/</span>
                  {String(gallery.length).padStart(2, "0")}
                </span>

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setLightbox(false)}
                  aria-label="Bezárás"
                  className="absolute top-4 right-4 z-20 h-10 w-10 inline-flex items-center justify-center border border-paper/20 bg-void/60 backdrop-blur-md font-mono text-paper hover:border-[var(--project-accent)] hover:text-[var(--project-accent)] transition-all duration-300"
                >
                  ×
                </button>

                <span className="hidden md:block absolute top-6 right-20 font-mono text-[11px] tracking-widest2 uppercase text-grain/50">
                  ESC a bezáráshoz
                </span>

                {/* Image */}
                <div
                  className="relative flex flex-1 min-h-0 max-h-[85vh] max-w-6xl items-center justify-center pr-0 sm:pr-24 md:pr-28"
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={index}
                      src={gallery[index]}
                      alt={`${title} — ${index + 1}. kép`}
                      className="max-h-full w-auto max-w-full object-contain"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                    />
                  </AnimatePresence>

                  {/* Nav arrows */}
                  {gallery.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prev}
                        aria-label="Előző kép"
                        className="absolute left-3 md:-left-16 top-1/2 -translate-y-1/2 h-11 w-11 md:h-12 md:w-12 inline-flex items-center justify-center border border-paper/20 bg-void/60 backdrop-blur-md font-mono text-paper hover:border-[var(--project-accent)] hover:text-[var(--project-accent)] transition-all duration-300"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={next}
                        aria-label="Következő kép"
                        className="absolute right-3 sm:right-24 md:-right-16 top-1/2 -translate-y-1/2 h-11 w-11 md:h-12 md:w-12 inline-flex items-center justify-center border border-paper/20 bg-void/60 backdrop-blur-md font-mono text-paper hover:border-[var(--project-accent)] hover:text-[var(--project-accent)] transition-all duration-300"
                      >
                        →
                      </button>
                    </>
                  )}
                </div>

                {/* EXIF panel — in flow under the photo on mobile, floating on desktop */}
                {activeExif && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-void/65 p-4 backdrop-blur-xl md:absolute md:bottom-8 md:left-8 md:right-auto md:w-auto md:max-w-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                      <p
                        className="font-mono text-[9px] uppercase tracking-widest3"
                        style={{ color: accent }}
                      >
                        Exif · {String(index + 1).padStart(2, "0")} /{" "}
                        {String(gallery.length).padStart(2, "0")}
                      </p>
                      {activeExif.date && (
                        <span className="font-mono text-[9px] tracking-widest2 uppercase text-grain/60">
                          {activeExif.date}
                        </span>
                      )}
                    </div>

                    {activeExif.camera && (
                      <p className="mt-2 text-sm text-paper">{activeExif.camera}</p>
                    )}
                    {activeExif.lens && (
                      <p className="mt-1 font-mono text-[10px] text-grain/70">
                        {activeExif.lens}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-wider text-paper/80">
                      {activeExif.fNumber && <span>f/{activeExif.fNumber}</span>}
                      {activeExif.exposureTime && (
                        <span>{activeExif.exposureTime}</span>
                      )}
                      {activeExif.iso && <span>ISO {activeExif.iso}</span>}
                      {activeExif.focalLength && (
                        <span>{activeExif.focalLength}</span>
                      )}
                    </div>

                    {(activeExif.artist || activeExif.copyright) && (
                      <p className="mt-3 border-t border-white/10 pt-2 font-mono text-[9px] uppercase tracking-wider text-grain/60">
                        {activeExif.artist}
                        {activeExif.artist && activeExif.copyright ? " · " : ""}
                        {activeExif.copyright ? `© ${activeExif.copyright}` : ""}
                      </p>
                    )}
                  </div>
                )}

                {/* Thumbnail rail — jobb oldalon */}
                {gallery.length > 1 && (
                  <div
                    className="absolute right-4 top-1/2 z-10 hidden max-h-[calc(100svh-7rem)] -translate-y-1/2 flex-col gap-2 overflow-y-auto rounded-2xl border border-white/10 bg-void/55 p-2 backdrop-blur-xl [scrollbar-width:none] sm:flex md:right-6 [&::-webkit-scrollbar]:hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="px-1 pb-1 text-center font-mono text-[8px] uppercase tracking-widest2 text-grain/50">
                      Képek
                    </span>
                    {gallery.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`${i + 1}. kép`}
                        aria-pressed={i === index}
                        className={`relative w-14 md:w-16 shrink-0 aspect-square overflow-hidden rounded-lg border transition-all duration-300 ${
                          i === index
                            ? "border-[var(--project-accent)] opacity-100"
                            : "border-paper/15 opacity-40 hover:opacity-70"
                        }`}
                      >
                        <img
                          src={src}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0.5 left-0.5 bg-void/70 px-1 font-mono text-[8px] text-paper/70 backdrop-blur-sm">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function ExposureChip({ src }: { src: string }) {
  const exif = useExif(src);
  if (!exif) return null;

  const exposure = [
    exif.fNumber ? `f/${exif.fNumber}` : null,
    exif.exposureTime,
    exif.iso ? `ISO ${exif.iso}` : null,
    exif.focalLength,
  ]
    .filter(Boolean)
    .join(" · ");

  if (!exposure) return null;

  return (
    <div className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/10 bg-void/65 px-3 py-1.5 backdrop-blur-md">
      <p className="font-mono text-[8px] uppercase tracking-widest2 text-paper/80 md:text-[9px]">
        {exposure}
      </p>
      {exif.camera && (
        <p className="mt-0.5 font-mono text-[8px] uppercase tracking-widest2 text-paper/45">
          {exif.camera}
        </p>
      )}
    </div>
  );
}
