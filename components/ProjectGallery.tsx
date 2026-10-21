"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "./Reveal";

type Props = {
  gallery: string[];
  title: string;
};

export default function ProjectGallery({ gallery, title }: Props) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStart = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % gallery.length), [gallery.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + gallery.length) % gallery.length), [gallery.length]);

  /* Keyboard nav */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightbox) {
        if (e.key === "Escape") setLightbox(false);
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, next, prev]);

  /* Swipe gesture */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    touchStart.current = null;
  }, [next, prev]);

  if (gallery.length === 0) return null;

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal>
          {/* Main image */}
          <div
            ref={containerRef}
            className="relative aspect-[3/2] w-full overflow-hidden border border-paper/10 cursor-pointer group"
            onClick={() => setLightbox(true)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={gallery[index]}
                alt={`${title} — ${index + 1}. kép`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              />
            </AnimatePresence>

            {/* Gradient overlays */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void/50 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-void/30 to-transparent pointer-events-none" />

            {/* Counter */}
            <span className="absolute bottom-4 left-4 font-mono text-[11px] text-paper/80 bg-void/50 backdrop-blur-md px-3 py-1.5 border border-paper/10">
              {String(index + 1).padStart(2, "0")}
              <span className="text-paper/30 mx-1">/</span>
              {String(gallery.length).padStart(2, "0")}
            </span>

            {/* Navigation arrows */}
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  aria-label="Előző kép"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 inline-flex items-center justify-center border border-paper/20 bg-void/50 backdrop-blur-md font-mono text-paper hover:border-safelight hover:text-safelight transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  aria-label="Következő kép"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 inline-flex items-center justify-center border border-paper/20 bg-void/50 backdrop-blur-md font-mono text-paper hover:border-safelight hover:text-safelight transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0"
                >
                  →
                </button>
              </>
            )}

            {/* Expand hint */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-mono text-[10px] tracking-widest2 uppercase text-paper/60 bg-void/50 backdrop-blur-md px-2.5 py-1 border border-paper/10">
                Nagyítás
              </span>
            </div>

            {/* Progress bar */}
            {gallery.length > 1 && (
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-paper/10">
                <motion.div
                  className="h-full bg-safelight"
                  animate={{ width: `${((index + 1) / gallery.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                />
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="flex gap-2 mt-3">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${title} — ${i + 1}. kép`}
                  aria-pressed={i === index}
                  className={`relative flex-1 aspect-video overflow-hidden border transition-all duration-400 ${
                    i === index
                      ? "border-safelight opacity-100"
                      : "border-paper/10 opacity-40 hover:opacity-70"
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Active indicator line */}
                  {i === index && (
                    <motion.div
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-safelight"
                      layoutId="thumb-indicator"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </Reveal>
      </section>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] bg-void/95 backdrop-blur-xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(false)}
          >
            {/* Close hint */}
            <span className="absolute top-6 right-6 font-mono text-[11px] tracking-widest2 uppercase text-grain/50">
              ESC a bezáráshoz
            </span>

            {/* Image */}
            <div
              className="relative w-full max-w-5xl max-h-[85vh] mx-6"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  src={gallery[index]}
                  alt={`${title} — ${index + 1}. kép`}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                />
              </AnimatePresence>

              {/* Nav arrows in lightbox */}
              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Előző kép"
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 inline-flex items-center justify-center border border-paper/20 bg-void/60 backdrop-blur-md font-mono text-paper hover:border-safelight hover:text-safelight transition-all duration-300"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Következő kép"
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 inline-flex items-center justify-center border border-paper/20 bg-void/60 backdrop-blur-md font-mono text-paper hover:border-safelight hover:text-safelight transition-all duration-300"
                  >
                    →
                  </button>
                </>
              )}

              {/* Counter */}
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[11px] text-paper/60 bg-void/60 backdrop-blur-md px-3 py-1.5 border border-paper/10">
                {String(index + 1).padStart(2, "0")}
                <span className="text-paper/30 mx-1">/</span>
                {String(gallery.length).padStart(2, "0")}
              </span>
            </div>

            {/* Thumbnails in lightbox */}
            {gallery.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                    aria-label={`${i + 1}. kép`}
                    className={`relative w-16 aspect-video overflow-hidden border transition-all duration-300 ${
                      i === index
                        ? "border-safelight opacity-100"
                        : "border-paper/15 opacity-40 hover:opacity-70"
                    }`}
                  >
                    <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
