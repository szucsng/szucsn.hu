import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import ProjectGallery from "@/components/ProjectGallery";
import LogoStage from "@/components/LogoStage";
import { frames, getFrameBySlug } from "@/lib/frames";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return frames.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const frame = getFrameBySlug(slug);
  if (!frame) return {};
  return {
    title: `${frame.title} — ${siteConfig.name}`,
    description: frame.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const frame = getFrameBySlug(slug);
  if (!frame) notFound();

  const [from, to] = frame.swatch;
  const isPhoto = frame.kind === "photo";
  const hasGallery = isPhoto && frame.gallery && frame.gallery.length > 0;
  const liveHref = frame.href && frame.href !== "#" ? frame.href : null;

  const currentIndex = frames.findIndex((f) => f.slug === slug);
  const prevFrame = currentIndex > 0 ? frames[currentIndex - 1] : null;
  const nextFrame =
    currentIndex < frames.length - 1 ? frames[currentIndex + 1] : null;

  const category = isPhoto ? "Fotósorozat" : "Web projekt";
  const paragraphs = (frame.longDescription || frame.description).split("\n\n");
  const detailMeta = frame.meta.filter((m) => m.label !== "SZEREP");

  const facts = [
    { label: "SZEREP", value: frame.role || "—" },
    { label: "ÉV", value: frame.year },
    { label: "KATEGÓRIA", value: category },
    isPhoto
      ? { label: "KAMERA", value: frame.technologies?.[0] || "Digitális" }
      : { label: "STÁTUSZ", value: liveHref ? "Élő oldal" : "Archív" },
  ];

  const accent = to;
  const accentSoft = `${to}55`;
  const accentFaint = `${to}1a`;
  const pageBase = mixHex(to, "#14120F", 0.2);
  const pageDeep = mixHex(from, "#14120F", 0.38);

  return (
    <div
      className="relative min-h-screen"
      style={
        {
          "--project-accent": accent,
          "--project-accent-soft": `${accent}33`,
        } as React.CSSProperties
      }
    >
      {/* ── Ambient brand background ─────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${pageBase} 0px, ${pageBase} max(100svh, 640px), ${pageDeep} max(150svh, 960px), #14120F max(230svh, 1500px), #0f0d0b 100%)`,
          }}
        />
        <div className="grain-overlay" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block"
      >
        <div
          className="absolute -left-[28%] -top-[28%] h-[85vh] w-[85vw] rounded-full opacity-30 blur-[150px]"
          style={{
            background: `radial-gradient(circle, ${to}66 0%, transparent 68%)`,
          }}
        />
        <div
          className="absolute -right-[28%] top-[8%] h-[75vh] w-[75vw] rounded-full opacity-25 blur-[150px]"
          style={{
            background: `radial-gradient(circle, ${from}99 0%, transparent 68%)`,
          }}
        />
        <div
          className="absolute bottom-[-22%] left-[12%] h-[60vh] w-[70vw] rounded-full opacity-20 blur-[170px]"
          style={{
            background: `radial-gradient(circle, ${accent}44 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="relative z-10">
        <Nav />
        <main>
            <article>
              {/* ── Full-bleed cover ──────────────────────────── */}
              <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
                {hasGallery ? (
                  <div className="absolute inset-0 overflow-hidden bg-void">
                    <img
                      src={frame.gallery![0]}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-3xl"
                    />
                    <img
                      src={frame.gallery![0]}
                      alt={`${frame.title} — borítókép`}
                      className="relative z-10 mx-auto h-full w-auto max-w-full object-contain"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-void/25" />
                    <div className="grain-overlay" aria-hidden="true" />
                  </div>
                ) : (
                  <LogoStage
                    logoSrc={frame.logo}
                    videoSrc={frame.coverVideo}
                    posterSrc={frame.coverPoster}
                    title={frame.title}
                    year={frame.year}
                    id={frame.id}
                    from={from}
                    to={to}
                    variant="cover"
                  />
                )}

                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%]"
                  style={{
                    background: `linear-gradient(to top, ${pageBase} 0%, ${pageBase}e6 16%, ${pageBase}99 45%, ${pageBase}33 76%, transparent 100%)`,
                  }}
                />
              </section>

              {/* ── Glass title card ──────────────────────────── */}
              <section className="relative z-10 mx-auto -mt-28 max-w-7xl px-6 md:-mt-36 md:px-10 lg:px-14">
                <div className="glass relative overflow-hidden rounded-[2rem] p-6 md:p-10 lg:p-12">
                  <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `linear-gradient(140deg, ${from}66 0%, transparent 40%, transparent 65%, ${to}1a 100%)`,
                    }}
                  />
                  <div
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
                    style={{
                      background: `radial-gradient(circle, ${accent}66 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] tracking-widest3 uppercase backdrop-blur-md"
                        style={{
                          borderColor: accentSoft,
                          backgroundColor: accentFaint,
                          color: accent,
                        }}
                      >
                        {category}
                      </span>
                      <span className="font-mono text-[11px] text-grain/60">
                        {frame.year}
                      </span>
                    </div>

                    <h1 className="mt-6 max-w-4xl font-display italic text-display-xl text-paper">
                      {frame.title}
                    </h1>

                    <div
                      className="mt-8 h-px w-16 opacity-70"
                      style={{ backgroundColor: accent }}
                    />

                    <div className="mt-8 grid gap-8 md:grid-cols-12">
                      <div className="md:col-span-7">
                        <p className="font-mono text-[10px] tracking-widest3 uppercase text-grain/60">
                          Bevezető
                        </p>
                        <p className="mt-4 text-xl leading-relaxed text-paper/90 md:text-2xl">
                          {frame.description}
                        </p>
                      </div>

                      {liveHref && (
                        <div className="flex items-end md:col-span-4 md:col-start-9">
                          <a
                            href={liveHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 font-mono text-[11px] tracking-widest2 uppercase text-paper backdrop-blur-xl transition-all duration-400 hover:border-[var(--project-accent)] hover:text-[var(--project-accent)]"
                          >
                            Oldal megtekintése
                            <span
                              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              style={{ color: accent }}
                            >
                              ↗
                            </span>
                          </a>
                        </div>
                      )}
                    </div>

                    <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
                      {facts.map((fact) => (
                        <div key={fact.label} className="bg-void/40 px-4 py-4">
                          <dt className="font-mono text-[10px] tracking-widest3 uppercase text-grain/50">
                            {fact.label}
                          </dt>
                          <dd className="mt-2 text-sm text-paper">
                            {fact.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </section>

              {/* ── Album (photo) ─────────────────────────────── */}
              {hasGallery && (
                <section className="mx-auto mt-6 max-w-7xl px-6 md:px-10 lg:px-14">
                  <div className="glass rounded-[2rem] p-4 md:p-6">
                    <ProjectGallery
                      gallery={frame.gallery!}
                      title={frame.title}
                      accent={accent}
                    />
                  </div>
                </section>
              )}

              {/* ── Story + sidebar ───────────────────────────── */}
              <section className="mx-auto mt-6 max-w-7xl px-6 md:px-10 lg:px-14">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                  <div className="md:col-span-8">
                    <div className="glass rounded-[2rem] p-6 md:p-10">
                      <p
                        className="font-mono text-[10px] tracking-widest3 uppercase"
                        style={{ color: accent }}
                      >
                        01 — A projektről
                      </p>
                      <h2 className="mt-4 font-display italic text-display-md text-paper">
                        A történet
                      </h2>

                      <div className="mt-8 space-y-6">
                        {paragraphs.map((paragraph, index) => (
                          <Reveal key={index} delay={index * 0.04}>
                            <p
                              className={
                                index === 0
                                  ? "text-xl leading-relaxed text-paper/90 md:text-2xl"
                                  : "text-base leading-relaxed text-grain md:text-lg"
                              }
                            >
                              {paragraph}
                            </p>
                          </Reveal>
                        ))}
                      </div>

                      {frame.technologies && frame.technologies.length > 0 && (
                        <Reveal delay={0.1}>
                          <div className="mt-14 border-t border-white/10 pt-8">
                            <p
                              className="font-mono text-[10px] tracking-widest3 uppercase"
                              style={{ color: accent }}
                            >
                              02 —{" "}
                              {isPhoto
                                ? "Eszközök & utómunka"
                                : "Technológiák"}
                            </p>

                            <ul className="mt-6 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                              {frame.technologies.map((technology, index) => (
                                <li
                                  key={technology}
                                  className="flex items-baseline gap-3 border-t border-white/10 py-3"
                                >
                                  <span
                                    className="font-mono text-[10px] opacity-70"
                                    style={{ color: accent }}
                                  >
                                    {String(index + 1).padStart(2, "0")}
                                  </span>
                                  <span className="text-sm text-paper">
                                    {technology}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Reveal>
                      )}
                    </div>
                  </div>

                  <aside className="md:col-span-4">
                    <div className="glass rounded-[2rem] p-6 md:sticky md:top-24">
                      <p
                        className="font-mono text-[10px] tracking-widest3 uppercase"
                        style={{ color: accent }}
                      >
                        Projekt adatai
                      </p>

                      <dl className="mt-5">
                        <FactRow label="Szerep" value={frame.role || "—"} />
                        <FactRow label="Év" value={frame.year} />
                        <FactRow label="Kategória" value={category} />
                        {detailMeta.map((meta) => (
                          <FactRow
                            key={meta.label}
                            label={meta.label}
                            value={meta.value}
                          />
                        ))}
                      </dl>

                      {liveHref && (
                        <a
                          href={liveHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-paper transition-colors duration-300 hover:text-[var(--project-accent)]"
                        >
                          Oldal megtekintése
                          <span
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            style={{ color: accent }}
                          >
                            ↗
                          </span>
                        </a>
                      )}

                      <Link
                        href="/munkak"
                        className="group mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-grain/60 transition-colors duration-300 hover:text-paper"
                      >
                        <span
                          className="transition-transform duration-300 group-hover:-translate-x-1"
                          style={{ color: accent }}
                        >
                          ←
                        </span>
                        Vissza a munkákhoz
                      </Link>
                    </div>
                  </aside>
                </div>
              </section>

              {/* ── Project navigation ────────────────────────── */}
              <section className="mx-auto mt-6 max-w-7xl px-6 pb-10 md:px-10 lg:px-14">
                <div className="glass relative overflow-hidden rounded-[2rem]">
                  <div
                    className="pointer-events-none absolute left-1/2 top-0 h-56 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
                    style={{
                      background: `radial-gradient(circle, ${accent}66 0%, transparent 70%)`,
                    }}
                  />

                  <nav
                    aria-label="Projekt navigáció"
                    className="relative grid grid-cols-1 gap-px bg-white/10 md:grid-cols-3"
                  >
                    {prevFrame ? (
                      <Link
                        href={`/munkak/${prevFrame.slug}`}
                        className="group flex flex-col bg-void/40 px-6 py-7 transition-colors duration-300 hover:bg-void/20"
                      >
                        <span className="font-mono text-[9px] uppercase tracking-widest3 text-grain/50">
                          ← Előző projekt
                        </span>
                        <span className="mt-3 font-display italic text-2xl text-paper transition-colors duration-300 group-hover:text-[var(--project-accent)]">
                          {prevFrame.title}
                        </span>
                        <span className="mt-2 font-mono text-[9px] uppercase tracking-widest2 text-grain/40">
                          {prevFrame.kind === "photo" ? "Fotósorozat" : "Web projekt"} ·{" "}
                          {prevFrame.year}
                        </span>
                      </Link>
                    ) : (
                      <div className="flex flex-col bg-void/30 px-6 py-7">
                        <span className="font-mono text-[9px] uppercase tracking-widest3 text-grain/30">
                          ← Előző projekt
                        </span>
                        <span className="mt-3 font-display italic text-2xl text-grain/30">
                          Nincs előző
                        </span>
                      </div>
                    )}

                    <Link
                      href="/munkak"
                      className="group flex flex-col justify-center bg-void/50 px-6 py-7 transition-colors duration-300 hover:bg-void/30 md:items-center md:text-center"
                    >
                      <span className="font-mono text-[9px] uppercase tracking-widest3 text-grain/50">
                        Archívum
                      </span>
                      <span className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-paper transition-colors duration-300 group-hover:text-[var(--project-accent)]">
                        Összes munka
                      </span>
                      <span className="mt-2 font-mono text-[9px] uppercase tracking-widest2 text-grain/40">
                        {frames.length} projekt
                      </span>
                    </Link>

                    {nextFrame ? (
                      <Link
                        href={`/munkak/${nextFrame.slug}`}
                        className="group flex flex-col bg-void/40 px-6 py-7 transition-colors duration-300 hover:bg-void/20 md:items-end md:text-right"
                      >
                        <span className="font-mono text-[9px] uppercase tracking-widest3 text-grain/50">
                          Következő projekt →
                        </span>
                        <span className="mt-3 font-display italic text-2xl text-paper transition-colors duration-300 group-hover:text-[var(--project-accent)]">
                          {nextFrame.title}
                        </span>
                        <span className="mt-2 font-mono text-[9px] uppercase tracking-widest2 text-grain/40">
                          {nextFrame.kind === "photo" ? "Fotósorozat" : "Web projekt"} ·{" "}
                          {nextFrame.year}
                        </span>
                      </Link>
                    ) : (
                      <div className="flex flex-col bg-void/30 px-6 py-7 md:items-end md:text-right">
                        <span className="font-mono text-[9px] uppercase tracking-widest3 text-grain/30">
                          Következő projekt →
                        </span>
                        <span className="mt-3 font-display italic text-2xl text-grain/30">
                          Nincs következő
                        </span>
                      </div>
                    )}
                  </nav>
                </div>
              </section>

              <Contact />
            </article>
          </main>
        <Footer />
      </div>
    </div>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
      <dt className="font-mono text-[10px] uppercase tracking-widest2 text-grain/55">
        {label}
      </dt>
      <dd className="text-right text-sm text-paper">{value}</dd>
    </div>
  );
}

function mixHex(hex: string, base: string, ratio: number) {
  const toRgb = (value: string) => {
    const clean = value.replace("#", "");
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16),
    ];
  };

  const [r1, g1, b1] = toRgb(hex);
  const [r2, g2, b2] = toRgb(base);
  const mix = (a: number, b: number) => Math.round(a * ratio + b * (1 - ratio));

  return `#${[mix(r1, r2), mix(g1, g2), mix(b1, b2)]
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("")}`;
}
