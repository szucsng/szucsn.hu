"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import type { Frame } from "@/lib/frames";
import { useExif } from "@/hooks/use-exif";

export default function FrameCard({ frame }: { frame: Frame }) {
  const [from, to] = frame.swatch;
  const gallery = frame.gallery ?? [];
  const hasGallery = frame.kind === "photo" && gallery.length > 0;
  const [index, setIndex] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const touchStart = useRef<number | null>(null);
  const swiped = useRef(false);

  const exif = useExif(hasGallery ? gallery[index] : undefined);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -6, y: x * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  /* Swipe through the gallery on touch devices */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    swiped.current = false;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart.current === null) return;
      const diff = touchStart.current - e.changedTouches[0].clientX;
      touchStart.current = null;
      if (Math.abs(diff) < 40) return;
      swiped.current = true;
      setIndex((i) => (i + (diff > 0 ? 1 : -1) + gallery.length) % gallery.length);
    },
    [gallery.length],
  );

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    if (!swiped.current) return;
    e.preventDefault();
    swiped.current = false;
  }, []);

  const displayMeta = useMemo(() => {
    if (!hasGallery || !exif) return frame.meta;

    const exifMap: Record<string, string> = {};
    if (exif.fNumber) exifMap["f/"] = exif.fNumber;
    if (exif.iso) exifMap["ISO"] = exif.iso;
    if (exif.focalLength) exifMap["FOCAL"] = exif.focalLength;
    if (exif.exposureTime) exifMap["ZÁRSEBESSÉG"] = exif.exposureTime;

    const merged = frame.meta.map((m) =>
      exifMap[m.label] ? { ...m, value: exifMap[m.label] } : m,
    );

    const manualLabels = new Set(frame.meta.map((m) => m.label));
    for (const [label, value] of Object.entries(exifMap)) {
      if (!manualLabels.has(label)) merged.push({ label, value });
    }

    return merged;
  }, [hasGallery, exif, frame.meta]);

  const badge = (
    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 pointer-events-none z-10">
      <span className="font-mono text-[11px] tracking-widest2 uppercase text-paper/80 bg-void/40 backdrop-blur-sm px-2 py-0.5">
        #{frame.id}
      </span>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[11px] tracking-widest2 uppercase text-paper/50 bg-void/40 backdrop-blur-sm px-2 py-0.5">
          {frame.kind === "code" ? "COMMIT" : "EXPOSURE"}
        </span>
      </div>
    </div>
  );

  const info = (
    <div className="p-5 border-t border-white/10 bg-void/25 backdrop-blur-xl flex-1 flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl text-paper group-hover:text-safelight transition-colors duration-300">
          {frame.title}
        </h3>
        <span className="font-mono text-[11px] text-paper/40 shrink-0 mt-1">
          {frame.year}
        </span>
      </div>
      <p className="mt-2 text-sm text-grain leading-relaxed line-clamp-2">
        {frame.description}
      </p>

      <dl className="mt-auto pt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-grain/70 border-t border-white/10">
        {displayMeta.map((m) => (
          <div key={m.label} className="flex gap-1.5">
            <dt className="text-safelight/70">{m.label}</dt>
            <dd>{m.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );

  /* ── Gallery card ──────────────────────────────────────── */
  if (hasGallery) {
    return (
      <a href={`/munkak/${frame.slug}`} className="group block h-full" onClick={handleCardClick}>
        <div
          ref={cardRef}
          className="card-tilt overflow-hidden rounded-[1.5rem] border border-white/10 bg-void/25 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl hover:border-safelight/50 transition-[border-color] duration-400 flex h-full flex-col"
          style={{ transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Image area */}
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-void-light">
            {gallery.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${frame.title} — ${i + 1}. kép`}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
                style={{
                  opacity: i === index ? 1 : 0,
                  transform: hovered ? "scale(1.05)" : "scale(1)",
                }}
                loading="lazy"
              />
            ))}

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {badge}

            {/* Gallery nav buttons */}
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIndex((i) => (i - 1 + gallery.length) % gallery.length);
                  }}
                  aria-label="Előző kép"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-9 sm:w-9 inline-flex items-center justify-center border border-paper/20 bg-void/50 backdrop-blur-md font-mono text-paper hover:border-safelight hover:text-safelight transition-all duration-300 opacity-100 translate-x-0 sm:opacity-0 sm:translate-x-2 sm:group-hover:opacity-100 sm:group-hover:translate-x-0"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIndex((i) => (i + 1) % gallery.length);
                  }}
                  aria-label="Következő kép"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-9 sm:w-9 inline-flex items-center justify-center border border-paper/20 bg-void/50 backdrop-blur-md font-mono text-paper hover:border-safelight hover:text-safelight transition-all duration-300 opacity-100 translate-x-0 sm:opacity-0 sm:-translate-x-2 sm:group-hover:opacity-100 sm:group-hover:translate-x-0"
                >
                  →
                </button>

                {/* Counter pill */}
                <span className="absolute bottom-3 left-3 font-mono text-[11px] text-paper/80 bg-void/60 backdrop-blur-md px-2.5 py-1 border border-paper/10 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                  {String(index + 1).padStart(2, "0")}
                  <span className="text-paper/30 mx-0.5">/</span>
                  {String(gallery.length).padStart(2, "0")}
                </span>

                {/* Progress dots */}
                <div className="absolute bottom-3 right-3 flex gap-1.5 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIndex(i);
                      }}
                      aria-label={`${i + 1}. kép`}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i === index
                          ? "bg-safelight w-4"
                          : "bg-paper/40 hover:bg-paper/70"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {info}
        </div>
      </a>
    );
  }

  /* ── Code / gradient card ──────────────────────────────── */
  const cardContent = (
    <>
      <div
        ref={cardRef}
        className="card-tilt overflow-hidden rounded-[1.5rem] border border-white/10 bg-void/25 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl hover:border-safelight/50 transition-[border-color] duration-400 flex h-full flex-col"
        style={{ transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative aspect-[4/3] w-full shrink-0 overflow-hidden"
          style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
        >
          <div className="grain-overlay" aria-hidden="true" />

          {/* Radial light effect on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 70%)`,
              opacity: hovered ? 1 : 0,
            }}
          />

          {frame.logo && (
            <img
              src={frame.logo}
              alt={`${frame.title} logó`}
              className="absolute inset-0 m-auto object-contain transition-all duration-700 ease-out group-hover:scale-110"
              style={{ maxWidth: "55%", maxHeight: "38%" }}
              loading="lazy"
            />
          )}

          {badge}

          {/* View project hint */}
          <div className="absolute inset-x-0 bottom-0 p-4 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
            <span className="font-mono text-[10px] tracking-widest2 uppercase text-paper/80 bg-void/60 backdrop-blur-md px-3 py-1.5 border border-paper/15">
              Részletek →
            </span>
          </div>
        </div>

        {info}
      </div>
    </>
  );

  return (
    <a href={`/munkak/${frame.slug}`} className="group block h-full">
      {cardContent}
    </a>
  );
}
