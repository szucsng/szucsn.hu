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

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description: siteConfig.tagline,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "hu_HU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" className={`${fraunces.variable} ${inter.variable} ${jbmono.variable}`}>
      <body className="font-body antialiased bg-void text-paper">
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
