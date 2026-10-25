import type { Metadata } from "next";
import WorksClient from "./WorksClient";
import { frames } from "@/lib/frames";
import { siteConfig } from "@/lib/site";

const title = "Munkáim";
const description =
  "Minden tétel egy „frame” — kód vagy fénykép, ugyanazokkal a kérdésekkel megközelítve: mit hagyok a keretben, és mit vágok le.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/munkak",
  },
  openGraph: {
    title: `${title} — ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/munkak`,
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

const collectionData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${siteConfig.url}/munkak#page`,
  url: `${siteConfig.url}/munkak`,
  name: `${title} — ${siteConfig.name}`,
  description,
  inLanguage: "hu-HU",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  about: { "@id": `${siteConfig.url}/#person` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: frames.length,
    itemListElement: frames.map((frame, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/munkak/${frame.slug}`,
      name: frame.title,
    })),
  },
};

export default function WorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionData) }}
      />
      <WorksClient />
    </>
  );
}
