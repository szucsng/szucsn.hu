import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

const title = "Szolgáltatások";
const description =
  "Webes alkalmazások, vizuális történetmesélés, UI/UX tervezés és projektvezetés — egy szemlélettel, a tervezéstől a megvalósításig.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/szolgaltatasok",
  },
  openGraph: {
    title: `${title} — ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/szolgaltatasok`,
    siteName: siteConfig.name,
    locale: "hu_HU",
    type: "website",
    images: [
      {
        url: "/images/_MG_6125.jpg",
        width: 2124,
        height: 3514,
        alt: "Szűcs Noel portré",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${siteConfig.name}`,
    description,
    images: ["/images/_MG_6125.jpg"],
  },
};

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <section
          id="top"
          className="relative overflow-hidden border-b border-white/10 bg-white/[0.015] pt-16 backdrop-blur-xl"
        >
          <div className="sprockets mt-6" aria-hidden="true" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-safelight/10 blur-3xl"
            />

            <Reveal>
              <div className="relative">
                <p className="mb-6 font-mono text-[11px] uppercase tracking-widest3 text-safelight">
                  Szolgáltatások
                </p>

                <h1 className="font-display italic text-display-xl leading-[0.92] text-paper">
                  Mit csinálok
                </h1>

                <div className="mb-10 mt-8">
                  <div className="h-px w-24 bg-safelight/40" />
                </div>

                <p className="max-w-2xl text-lg leading-relaxed text-grain md:text-xl">
                  A különböző területeket nem különálló dolgokként kezelem — mindegyik
                  ugyanannak a szemléletnek a része.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="sprockets-thin" aria-hidden="true" />
        </section>

        <Services showHeader={false} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
