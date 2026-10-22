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
  const liveHref =
    frame.href && frame.href !== "#" ? frame.href : null;

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
            {/* ── Hero ───────────────────────────────────────────── */}
            <section className="relative overflow-hidden pt-16">
              <div className="sprockets mt-6" aria-hidden="true" />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 86% 4%, ${accent}24 0%, transparent 52%), radial-gradient(ellipse at 4% 96%, ${from}30 0%, transparent 55%)`,
                }}
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 top-16 hidden select-none font-display italic text-[18rem] leading-none lg:block"
                style={{ color: `${accent}14` }}
              >
                {frame.id}
              </span>

              <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-16 md:pb-24">
                <Reveal>
                  <div className="flex items-center justify-between gap-4">
                    <Link
                      href="/munkak"
                      className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-widest2 uppercase text-grain transition-colors duration-300 hover:text-paper"
                    >
                      <span
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                        style={{ color: accent }}
                      >
                        ←
                      </span>
                      Munkáim
                    </Link>
                    <span className="font-mono text-[11px] tracking-widest2 uppercase text-grain/50">
                      Case study · {String(currentIndex + 1).padStart(2, "0")} /{" "}
                      {String(frames.length).padStart(2, "0")}
                    </span>
                  </div>
                </Reveal>

                <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-12 md:gap-12">
                  <div className="md:col-span-8">
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

                      <h1 className="mt-6 max-w-4xl font-display italic text-display-lg text-paper">
                        {frame.title}
                      </h1>

                      <div
                        className="mt-8 h-px w-24 opacity-60"
                        style={{ backgroundColor: accent }}
                      />
                    </Reveal>
                  </div>

                  <div className="md:col-span-4">
                    <Reveal delay={0.1}>
                      <p className="font-mono text-[10px] tracking-widest3 uppercase text-grain/60">
                        Bevezető
                      </p>
                      <p className="mt-4 text-lg leading-relaxed text-grain md:text-xl">
                        {frame.description}
                      </p>

                      {liveHref && (
                        <a
                          href={liveHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group mt-8 inline-flex items-center gap-3 border border-paper/20 px-6 py-3 font-mono text-[11px] tracking-widest2 uppercase text-paper transition-all duration-400 hover:border-[var(--project-accent)] hover:text-[var(--project-accent)]"
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
                    </Reveal>
                  </div>
                </div>

                <Reveal delay={0.15}>
                  <dl
                    className="mt-16 grid grid-cols-2 gap-px border border-paper/10 border-t-2 bg-paper/10 md:grid-cols-4"
                    style={{ borderTopColor: accentSoft }}
                  >
                    {facts.map((fact) => (
                      <div key={fact.label} className="bg-void px-5 py-5">
                        <dt className="font-mono text-[10px] tracking-widest3 uppercase text-grain/50">
                          {fact.label}
                        </dt>
                        <dd className="mt-2 text-sm text-paper">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>

              <div className="sprockets-thin" aria-hidden="true" />
            </section>

            {/* ── Visual ─────────────────────────────────────────── */}
            <section className="max-w-6xl mx-auto px-6 md:px-10">
              {hasGallery ? (
                <ProjectGallery
                  gallery={frame.gallery!}
                  title={frame.title}
                  accent={accent}
                />
              ) : (
                <LogoStage
                  logoSrc={frame.logo}
                  title={frame.title}
                  year={frame.year}
                  id={frame.id}
                  from={from}
                  to={to}
                />
              )}
            </section>

            {/* ── Case study ─────────────────────────────────────── */}
            <section className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-36">
              <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-12">
                <div className="md:col-span-8">
                  <Reveal>
                    <div className="border-t border-paper/10 pt-6">
                      <div className="flex items-baseline gap-4">
                        <span
                          className="font-mono text-[11px] tracking-widest2"
                          style={{ color: accent }}
                        >
                          01
                        </span>
                        <h2 className="font-display italic text-display-md text-paper">
                          A projektről
                        </h2>
                      </div>
                    </div>
                  </Reveal>

                  <div className="mt-10 space-y-8">
                    {paragraphs.map((paragraph, index) => (
                      <Reveal key={index} delay={index * 0.05}>
                        <p
                          className={
                            index === 0
                              ? "max-w-2xl text-xl leading-relaxed text-paper/90 md:text-2xl"
                              : "max-w-2xl text-base leading-relaxed text-grain md:text-lg"
                          }
                        >
                          {paragraph}
                        </p>
                      </Reveal>
                    ))}
                  </div>

                  {frame.technologies && frame.technologies.length > 0 && (
                    <Reveal delay={0.1}>
                      <div className="mt-20 border-t border-paper/10 pt-6">
                        <div className="flex items-baseline gap-4">
                          <span
                            className="font-mono text-[11px] tracking-widest2"
                            style={{ color: accent }}
                          >
                            02
                          </span>
                          <h2 className="font-display italic text-display-md text-paper">
                            {isPhoto ? "Eszközök & utómunka" : "Technológiák"}
                          </h2>
                        </div>

                        <ul className="mt-8 grid grid-cols-1 gap-px border border-paper/10 bg-paper/10 sm:grid-cols-2">
                          {frame.technologies.map((technology, index) => (
                            <li
                              key={technology}
                              className="flex items-baseline gap-3 bg-void px-5 py-4"
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

                <aside className="md:col-span-4">
                  <Reveal delay={0.1} className="md:sticky md:top-24">
                    <div className="space-y-4">
                      <div className="border border-paper/10">
                        <div className="border-b border-paper/10 p-5">
                          <p
                            className="font-mono text-[10px] tracking-widest3 uppercase"
                            style={{ color: accent }}
                          >
                            Projekt adatai
                          </p>
                          <p className="mt-3 font-display text-2xl text-paper">
                            {frame.title}
                          </p>
                        </div>

                        <dl className="divide-y divide-paper/10">
                          <MetaRow label="Szerep" value={frame.role || "—"} />
                          <MetaRow label="Év" value={frame.year} />
                          <MetaRow label="Kategória" value={category} />
                          {detailMeta.map((meta) => (
                            <MetaRow
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
                            className="group flex items-center justify-between gap-4 border-t border-paper/10 p-5 font-mono text-[11px] tracking-widest2 uppercase text-paper transition-colors duration-300 hover:text-[var(--project-accent)]"
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
                      </div>

                      <Link
                        href="/munkak"
                        className="group flex items-center justify-between gap-4 border border-paper/10 px-5 py-4 font-mono text-[10px] tracking-widest2 uppercase text-grain/70 transition-colors duration-300 hover:border-[var(--project-accent)] hover:text-paper"
                      >
                        Vissza a munkákhoz
                        <span
                          className="transition-transform duration-300 group-hover:-translate-x-1"
                          style={{ color: accent }}
                        >
                          ←
                        </span>
                      </Link>
                    </div>
                  </Reveal>
                </aside>
              </div>
            </section>

            {/* ── Project navigation ─────────────────────────────── */}
            <section className="border-t border-paper/10">
              <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
                <Reveal>
                  <div className="mb-8 flex items-end justify-between gap-6">
                    <div>
                      <p
                        className="font-mono text-[10px] tracking-widest3 uppercase"
                        style={{ color: accent }}
                      >
                        Tovább
                      </p>
                      <h2 className="mt-2 font-display italic text-display-md text-paper">
                        A többi munka
                      </h2>
                    </div>
                    <span className="font-mono text-[11px] tracking-widest2 uppercase text-grain/50">
                      {String(currentIndex + 1).padStart(2, "0")} /{" "}
                      {String(frames.length).padStart(2, "0")}
                    </span>
                  </div>
                </Reveal>

                <div
                  className={`grid gap-px bg-paper/10 ${
                    prevFrame && nextFrame ? "grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {prevFrame && (
                    <Link
                      href={`/munkak/${prevFrame.slug}`}
                      className="group bg-void p-6 transition-colors duration-400 hover:bg-void-light md:p-10"
                    >
                      <span className="font-mono text-[10px] tracking-widest3 uppercase text-grain/50">
                        ← Előző
                      </span>
                      <p className="mt-4 font-display text-2xl text-paper transition-colors duration-300 group-hover:text-[var(--project-accent)] md:text-3xl">
                        {prevFrame.title}
                      </p>
                      <p className="mt-2 font-mono text-[11px] text-grain/50">
                        {prevFrame.kind === "photo" ? "Fotósorozat" : "Web projekt"} ·{" "}
                        {prevFrame.year}
                      </p>
                    </Link>
                  )}

                  {nextFrame && (
                    <Link
                      href={`/munkak/${nextFrame.slug}`}
                      className="group bg-void p-6 text-right transition-colors duration-400 hover:bg-void-light md:p-10"
                    >
                      <span className="font-mono text-[10px] tracking-widest3 uppercase text-grain/50">
                        Következő →
                      </span>
                      <p className="mt-4 font-display text-2xl text-paper transition-colors duration-300 group-hover:text-[var(--project-accent)] md:text-3xl">
                        {nextFrame.title}
                      </p>
                      <p className="mt-2 font-mono text-[11px] text-grain/50">
                        {nextFrame.kind === "photo" ? "Fotósorozat" : "Web projekt"} ·{" "}
                        {nextFrame.year}
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            </section>

            <Contact />
          </article>
        </main>
      </ScrollProgress>
      <Footer />
    </>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-5 py-3.5">
      <dt className="font-mono text-[10px] uppercase tracking-widest2 text-grain/55">
        {label}
      </dt>
      <dd className="text-right text-sm text-paper">{value}</dd>
    </div>
  );
}
