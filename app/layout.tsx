import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";
import { siteConfig } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jbmono",
});

const ogImage = {
  url: "/images/_MG_6125.jpg",
  width: 2124,
  height: 3514,
  alt: "Szűcs Noel portré",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  keywords: [
    "Szűcs Noel",
    "full-stack fejlesztő",
    "webfejlesztés",
    "Next.js",
    "TypeScript",
    "fotós",
    "Miskolc",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "hu_HU",
    type: "profile",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
    images: [ogImage.url],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.name,
      url: siteConfig.url,
      image: `${siteConfig.url}/images/_MG_6125.jpg`,
      jobTitle: siteConfig.role,
      email: `mailto:${siteConfig.email}`,
      description: siteConfig.tagline,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Miskolc",
        addressCountry: "HU",
      },
      knowsAbout: [
        "TypeScript",
        "JavaScript",
        "Python",
        "Node.js",
        "Next.js",
        "React",
        "MySQL",
        "UI/UX design",
        "Fotózás",
      ],
      sameAs: siteConfig.social
        .filter((item) => item.href.startsWith("http"))
        .map((item) => item.href),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.tagline,
      inLanguage: "hu-HU",
      publisher: { "@id": `${siteConfig.url}/#person` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#service`,
      name: `${siteConfig.name} — ${siteConfig.role}`,
      url: siteConfig.url,
      image: `${siteConfig.url}/images/_MG_6125.jpg`,
      email: siteConfig.email,
      description: siteConfig.tagline,
      founder: { "@id": `${siteConfig.url}/#person` },
      areaServed: { "@type": "Country", name: "Magyarország" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Miskolc",
        addressCountry: "HU",
      },
      serviceType: [
        "Webalkalmazás-fejlesztés",
        "Full-stack fejlesztés",
        "UI/UX tervezés",
        "Fotózás",
        "Videózás",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" className={`${fraunces.variable} ${inter.variable} ${jbmono.variable}`}>
      <body className="font-body antialiased bg-void text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
          <div className="absolute -left-[20%] -top-[22%] h-[75vh] w-[75vw] rounded-full bg-safelight/10 blur-[160px]" />
          <div className="absolute -right-[22%] top-[12%] h-[65vh] w-[65vw] rounded-full bg-steel/20 blur-[160px]" />
          <div className="absolute bottom-[-22%] left-[18%] h-[60vh] w-[70vw] rounded-full bg-safelight/[0.06] blur-[180px]" />
          <div className="absolute inset-0 bg-void/40" />
          <div className="grain-overlay" />
        </div>
        <div className="relative z-10">
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </div>
      </body>
    </html>
  );
}
