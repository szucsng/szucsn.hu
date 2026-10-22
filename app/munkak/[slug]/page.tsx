import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
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
  const featuredFrame = nextFrame ?? prevFrame;

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

  return (
    <>
      <Nav />
      <ScrollProgress accent={accent}>
        <main>
          <article
            style={
              {
                "--project-accent": accent,
              } as React.CSSProperties
            }
          >
            {/* ── Cover visual ───────────────────────────────────── */}
            <section className="relative pt-16">
              <div className="sprockets mt-6" aria-hidden="true" />

              <div className="relative h-[58vh] min-h-[420px] w-full overflow-hidden md:h-[68vh] md:min-h-[520px]">
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
                    <div className="pointer-events-none absolute inset-0 bg-void/20" />
                    <div className="grain-overlay" aria-hidden="true" />
                  </div>
                ) : (
                  <LogoStage
                    logoSrc={frame.logo}
                    title={frame.title}
                    year={frame.year}
                    id={frame.id}
                    from={from}
                    to={to}
                    variant="cover"
                  />
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent" />
              </div>

              <div className="sprockets-thin" aria-hidden="true" />
            </section>

            {/* ── Title + intro ──────────────────────────────────── */}
            <section className="relative max-w-6xl mx-auto px-6 md:px-10 pt-12 md:pt-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-80"
                style={{
                  background: `radial-gradient(ellipse at 18% 0%, ${accent}14 0%, transparent 70%)`,
                }}
              />

              <div className="relative">
                <Reveal>
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center border px-3 py-1 font-mono text-[10px] tracking-widest3 uppercase"
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

                  <h1 className="mt-6 max-w-5xl font-display italic text-display-xl text-paper">
                    {frame.title}
                  </h1>

                  <div
                    className="mt-8 h-px w-16 opacity-70"
                    style={{ backgroundColor: accent }}
                  />
                </Reveal>

                <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                  <Reveal className="max-w-2xl">
                    <p className="font-mono text-[10px] tracking-widest3 uppercase text-grain/60">
                      Bevezető
                    </p>
                    <p className="mt-4 text-xl leading-relaxed text-paper/90 md:text-2xl">
                      {frame.description}
                    </p>
                  </Reveal>

                  {liveHref && (
                    <Reveal delay={0.1} className="shrink-0">
                      <a
                        href={liveHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 border border-paper/20 px-6 py-3 font-mono text-[11px] tracking-widest2 uppercase text-paper transition-all duration-400 hover:border-[var(--project-accent)] hover:text-[var(--project-accent)]"
                      >
                        Oldal megtekintése
                        <span
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          style={{ color: accent }}
                        >
                          ↗
                        </span>
                      </a>
                    </Reveal>
                  )}
                </div>

                <Reveal delay={0.15}>
                  <dl className="mt-14 grid grid-cols-2 gap-px border-y border-paper/10 bg-paper/10 md:grid-cols-4">
                    {facts.map((fact) => (
                      <div key={fact.label} className="bg-void px-5 py-6">
                        <dt className="font-mono text-[10px] tracking-widest3 uppercase text-grain/50">
                          {fact.label}
                        </dt>
                        <dd className="mt-2 text-sm text-paper">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>
            </section>

            {/* ── Album (photo) ──────────────────────────────────── */}
            {hasGallery && (
              <div className="mt-20">
                <ProjectGallery
                  gallery={frame.gallery!}
                  title={frame.title}
                  accent={accent}
                />
              </div>
            )}

            {/* ── Story ──────────────────────────────────────────── */}
            <section className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-36">
              <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-7 md:col-start-2">
                  <Reveal>
                    <p
                      className="font-mono text-[10px] tracking-widest3 uppercase"
                      style={{ color: accent }}
                    >
                      01 — A projektről
                    </p>
                    <h2 className="mt-4 font-display italic text-display-md text-paper">
                      A történet
                    </h2>
                  </Reveal>

                  <div className="mt-10 space-y-8">
                    {paragraphs.map((paragraph, index) => (
                      <Reveal key={index} delay={index * 0.05}>
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
                      <div className="mt-20">
                        <p
                          className="font-mono text-[10px] tracking-widest3 uppercase"
                          style={{ color: accent }}
                        >
                          02 — {isPhoto ? "Eszközök & utómunka" : "Technológiák"}
                        </p>

                        <ul className="mt-8 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                          {frame.technologies.map((technology, index) => (
                            <li
                              key={technology}
                              className="flex items-baseline gap-4 border-t border-paper/10 py-4"
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

                <aside className="md:col-span-3">
                  <Reveal delay={0.1} className="md:sticky md:top-24">
                    <div>
                      <p
                        className="font-mono text-[10px] tracking-widest3 uppercase"
                        style={{ color: accent }}
                      >
                        Projekt adatai
                      </p>

                      <dl className="mt-6">
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
                  </Reveal>
                </aside>
              </div>
            </section>

            {/* ── Next project ───────────────────────────────────── */}
            {featuredFrame && (
              <section className="border-t border-paper/10">
                <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28 text-center">
                  <Reveal>
                    <p
                      className="font-mono text-[10px] tracking-widest3 uppercase"
                      style={{ color: accent }}
                    >
                      {nextFrame ? "Következő projekt" : "Előző projekt"}
                    </p>

                    <Link
                      href={`/munkak/${featuredFrame.slug}`}
                      className="group mt-6 block"
                    >
                      <span className="block font-display italic text-display-lg text-paper transition-colors duration-300 group-hover:text-[var(--project-accent)]">
                        {featuredFrame.title}
                      </span>
                      <span className="mt-4 block font-mono text-[11px] tracking-widest2 uppercase text-grain/50">
                        {featuredFrame.kind === "photo"
                          ? "Fotósorozat"
                          : "Web projekt"}{" "}
                        · {featuredFrame.year}
                      </span>
                    </Link>
                  </Reveal>

                  <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-paper/10 pt-6 font-mono text-[10px] uppercase tracking-widest2 text-grain/50">
                    {prevFrame ? (
                      <Link
                        href={`/munkak/${prevFrame.slug}`}
                        className="transition-colors duration-300 hover:text-paper"
                      >
                        ← Előző: {prevFrame.title}
                      </Link>
                    ) : (
                      <span />
                    )}

                    <Link
                      href="/munkak"
                      className="transition-colors duration-300 hover:text-paper"
                    >
                      Összes munka
                    </Link>

                    {nextFrame ? (
                      <span className="text-grain/30">
                        Következő: {nextFrame.title}
                      </span>
                    ) : (
                      <span />
                    )}
                  </div>
                </div>
              </section>
            )}

            <Contact />
          </article>
        </main>
      </ScrollProgress>
      <Footer />
    </>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-paper/10 py-3">
      <dt className="font-mono text-[10px] uppercase tracking-widest2 text-grain/55">
        {label}
      </dt>
      <dd className="text-right text-sm text-paper">{value}</dd>
    </div>
  );
}
