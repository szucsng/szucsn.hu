import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import ProjectGallery from "@/components/ProjectGallery";
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

  const currentIndex = frames.findIndex((f) => f.slug === slug);
  const prevFrame = currentIndex > 0 ? frames[currentIndex - 1] : null;
  const nextFrame = currentIndex < frames.length - 1 ? frames[currentIndex + 1] : null;

  return (
    <>
      <Nav />
      <ScrollProgress>
        <main>
          {/* ── Project Hero ───────────────────────────────────── */}
          <section className="relative pt-16 overflow-hidden">
            <div className="sprockets mt-6" aria-hidden="true" />

            <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-28">
              <Reveal>
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-10">
                  <Link
                    href="/munkak"
                    className="font-mono text-[11px] tracking-widest2 uppercase text-grain hover:text-paper transition-colors duration-300"
                  >
                    ← Munkáim
                  </Link>
                  <span className="text-grain/30">/</span>
                  <span className="font-mono text-[11px] tracking-widest2 uppercase text-safelight">
                    #{frame.id}
                  </span>
                </div>

                {/* Title area */}
                <div className="flex items-start justify-between flex-wrap gap-8">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="inline-flex items-center gap-2 px-3 py-1 border border-safelight/30 font-mono text-[10px] tracking-widest3 uppercase text-safelight">
                        {frame.kind === "code" ? "Projekt" : "Fotósorozat"}
                      </span>
                      <span className="font-mono text-[11px] text-grain/50">
                        {frame.year}
                      </span>
                    </div>

                    <h1 className="font-display italic text-display-lg text-paper">
                      {frame.title}
                    </h1>

                    <p className="mt-6 text-lg text-grain leading-relaxed max-w-2xl">
                      {frame.description}
                    </p>
                  </div>

                  {frame.href && frame.href !== "#" && (
                    <a
                      href={frame.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 border border-paper/20 px-7 py-3.5 font-mono text-xs tracking-widest2 uppercase text-paper hover:border-safelight hover:text-safelight transition-all duration-400 shrink-0"
                    >
                      Megnyitás
                      <span className="text-safelight group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </a>
                  )}
                </div>
              </Reveal>
            </div>

            <div className="sprockets-thin" aria-hidden="true" />
          </section>

          {/* ── Visual ─────────────────────────────────────────── */}
          {hasGallery ? (
            <ProjectGallery gallery={frame.gallery!} title={frame.title} />
          ) : (
            <section className="max-w-6xl mx-auto px-6 md:px-10">
              <Reveal>
                <div
                  className="relative aspect-[21/9] w-full overflow-hidden border border-paper/10 group"
                >
                  <div
                    className="absolute inset-0"
                    style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
                  />
                  <div className="grain-overlay" aria-hidden="true" />

                  {/* Radial glow */}
                  <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), transparent 60%)" }} />

                  {frame.logo && (
                    <img
                      src={frame.logo}
                      alt={`${frame.title} logó`}
                      className="absolute inset-0 m-auto object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                      style={{ maxWidth: "40%", maxHeight: "35%" }}
                    />
                  )}

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 pointer-events-none">
                    <span className="font-mono text-[11px] tracking-widest2 uppercase text-paper/70 bg-void/40 backdrop-blur-sm px-2.5 py-1">
                      #{frame.id}
                    </span>
                    <span className="font-mono text-[11px] tracking-widest2 uppercase text-paper/50 bg-void/40 backdrop-blur-sm px-2.5 py-1">
                      {frame.kind === "code" ? "COMMIT" : "EXPOSURE"}
                    </span>
                  </div>
                </div>
              </Reveal>
            </section>
          )}

          {/* ── Details ────────────────────────────────────────── */}
          <section className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
              {/* Main content */}
              <div className="md:col-span-8">
                <Reveal>
                  <p className="font-mono text-xs tracking-widest3 uppercase text-safelight mb-3">
                    Leírás
                  </p>
                  <h2 className="font-display italic text-display-md text-paper mb-10">
                    A projektről
                  </h2>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="space-y-5 text-base md:text-lg text-grain leading-relaxed max-w-2xl">
                    {(frame.longDescription || frame.description).split("\n\n").map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* Sidebar meta */}
              <div className="md:col-span-4">
                <Reveal delay={0.15}>
                  <div className="border border-paper/10 p-6 space-y-6 sticky top-24">
                    {frame.role && (
                      <div>
                        <dt className="font-mono text-[11px] tracking-widest3 uppercase text-grain/60 mb-2">
                          SZEREP
                        </dt>
                        <dd className="text-paper text-sm">{frame.role}</dd>
                      </div>
                    )}

                    <div className="border-t border-paper/10 pt-6">
                      <dt className="font-mono text-[11px] tracking-widest3 uppercase text-grain/60 mb-4">
                        META
                      </dt>
                      <dl className="space-y-3">
                        {frame.meta.map((m) => (
                          <div key={m.label} className="flex justify-between gap-4 font-mono text-xs">
                            <dt className="tracking-widest2 uppercase text-grain/70">{m.label}</dt>
                            <dd className="text-paper text-right">{m.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    {frame.technologies && frame.technologies.length > 0 && (
                      <div className="border-t border-paper/10 pt-6">
                        <dt className="font-mono text-[11px] tracking-widest3 uppercase text-grain/60 mb-3">
                          TECHNOLÓGIÁK
                        </dt>
                        <dd className="flex flex-wrap gap-2">
                          {frame.technologies.map((t) => (
                            <span
                              key={t}
                              className="px-3 py-1.5 border border-paper/10 font-mono text-[10px] tracking-wide uppercase text-grain hover:border-safelight/40 hover:text-paper transition-all duration-300"
                            >
                              {t}
                            </span>
                          ))}
                        </dd>
                      </div>
                    )}

                    <div className="border-t border-paper/10 pt-6">
                      <dt className="font-mono text-[11px] tracking-widest3 uppercase text-grain/60 mb-1">
                        ÉV
                      </dt>
                      <dd className="font-display text-3xl text-paper">{frame.year}</dd>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ── Navigation between projects ────────────────────── */}
          <section className="border-t border-paper/10">
            <div className="max-w-6xl mx-auto px-6 md:px-10 py-14">
              <div className="grid grid-cols-2 gap-px bg-paper/10">
                {prevFrame ? (
                  <Link
                    href={`/munkak/${prevFrame.slug}`}
                    className="group bg-void p-6 md:p-10 hover:bg-void-light transition-colors duration-400"
                  >
                    <span className="font-mono text-[10px] tracking-widest3 uppercase text-grain/50">
                      ← Előző
                    </span>
                    <p className="mt-3 font-display text-xl md:text-2xl text-paper group-hover:text-safelight transition-colors duration-300">
                      {prevFrame.title}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-grain/50">
                      {prevFrame.year}
                    </p>
                  </Link>
                ) : (
                  <div className="bg-void p-6 md:p-10 opacity-20" />
                )}
                {nextFrame ? (
                  <Link
                    href={`/munkak/${nextFrame.slug}`}
                    className="group bg-void p-6 md:p-10 hover:bg-void-light transition-colors duration-400 text-right"
                  >
                    <span className="font-mono text-[10px] tracking-widest3 uppercase text-grain/50">
                      Következő →
                    </span>
                    <p className="mt-3 font-display text-xl md:text-2xl text-paper group-hover:text-safelight transition-colors duration-300">
                      {nextFrame.title}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-grain/50">
                      {nextFrame.year}
                    </p>
                  </Link>
                ) : (
                  <div className="bg-void p-6 md:p-10 opacity-20" />
                )}
              </div>
            </div>
          </section>

          <Contact />
        </main>
      </ScrollProgress>
      <Footer />
    </>
  );
}
