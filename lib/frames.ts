export type Frame = {
  id: string;
  slug: string;
  kind: "code" | "photo";
  title: string;
  year: string;
  description: string;
  longDescription?: string;
  meta: { label: string; value: string }[];
  href?: string;
  swatch: [string, string];
  logo?: string;
  gallery?: string[];
  role?: string;
  technologies?: string[];
};

export const frames: Frame[] = [
  {
    id: "01",
    slug: "reservell",
    kind: "code",
    title: "Reservell.com",
    year: "2025",
    description:
      "Modern időpontfoglalási és szalonmenedzsment platform, amely egyetlen rendszerben köti össze a vendégeket és a szolgáltatókat.",
    longDescription:
      "A Reservell egy teljes körű időpontfoglalási és szalonmenedzsment platform, amelyet nulláról építettem. A projekt magában foglal egy reszponzív webes felületet vendégek számára, egy modern kezelőfelületet szalonoknak, valamint egy backend rendszert a foglalások, ügyfelek és szolgáltatások kezelésére.\n\nA felhasználói élményre helyeztem a legnagyobb hangsúlyt: gyors betöltés, intuitív navigáció és tiszta vizuálisrendszer. A technológiai stack modern és fenntartható: TypeScript, React, Next.js, Node.js.",
    meta: [
      { label: "LANG", value: "TypeScript · React" },
      { label: "STACK", value: "Node.js · Next.js" },
      { label: "SZEREP", value: "Egyszemélyes fejlesztő" },
    ],
    href: "https://reservell.com",
    swatch: ["#2A2E30", "#EEB92A"],
    logo: "/images/logos/reservell_clock.png",
    role: "Full-stack fejlesztő & tervező",
    technologies: ["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "Prisma"],
  },
  {
    id: "02",
    slug: "latenightshots-friends",
    kind: "photo",
    title: "LateNightShots — Friends",
    year: "2025",
    description:
      "Egy késő esti fotósorozat baráti pillanatokról, spontán hangulattal és természetes, őszinte képekkel.",
    longDescription:
      "Ez a sorozat késő esti baráti találkozók hangulatát örökíti meg, ahol a természetes fények és a meleg tónusok adják a képek sajátos atmoszféráját. A célom az volt, hogy a spontán pillanatokat, a nevetést és a csendes összenézéseket rögzítsem, mesterséges beavatkozás nélkül.\n\nA sorozat Canon EOS 6D-vel készült, 24-105mm-es objektívvel, természetes fényben. A f/2.8 rekesznyílás és az ISO 400 érzékenység lehetővé tette, hogy a sötét környezetben is meleg, részletgazdag képeket készítsek.",
    meta: [
      { label: "f/", value: "2.8" },
      { label: "ISO", value: "400" },
    ],
    href: "#",
    swatch: ["#1c1a17", "#B8492E"],
    gallery: [
      "/images/galleries/_MG_2682.jpg",
      "/images/galleries/_MG_2695.jpg",
      "/images/galleries/_MG_2696.jpg",
    ],
    role: "Fotós & utómunka",
    technologies: ["Canon EOS 6D", "24-105mm", "Természetes fény", "Lightroom"],
  },
  {
    id: "03",
    slug: "avas-barbearshop",
    kind: "code",
    title: "Avas Barbearshop",
    year: "2026",
    description:
      "Az Avas Barbearshop weboldala, amely a fodrászüzlet szolgáltatásait és portfólióját mutatja be.",
    longDescription:
      "Az Avas Barbearshop weboldala egy modern, reszponzív bemutatkozó oldal, amely a fodrászüzlet szolgáltatásait, árlistáját és portfólióját mutatja be. A projekt részeként egy egyedi kezelőfelületet is kialakítottam, ahol a szalon tulajdonosai tudják kezelni a tartalmakat.\n\nA design a barbershop hangulatát tükrözi: meleg színek, tiszta tipográfia és letisztult felületek. A technológiai stack stabil és skálázható: TypeScript, React, Next.js, Redis gyorsítótárazással.",
    meta: [
      { label: "LANG", value: "TypeScript · React" },
      { label: "STACK", value: "Next.js · Redis" },
      { label: "SZEREP", value: "Vezető fejlesztő" },
    ],
    href: "https://barbearavasbarbershop.hu",
    swatch: ["#1B1B1C", "#72686C"],
    logo: "/images/logos/barbearshop.png",
    role: "Vezető fejlesztő",
    technologies: ["TypeScript", "React", "Next.js", "Redis", "Tailwind CSS"],
  },
  {
    id: "04",
    slug: "plczk-art",
    kind: "code",
    title: "plczk_art",
    year: "2026",
    description:
      "A plczk_art művészeti munkáit bemutató weboldal: galériaközpontú, letisztult felület, ahol a képek és az alkotói profil egy helyen jelennek meg.",
    longDescription:
      "A plczk_art weboldala a művészeti munkák bemutatására készült. A hangsúly a képeken és az alkotások közötti könnyed navigáción van: visszafogott tipográfia, semleges színek és nagyvonalú térirányítás, hogy a látogató figyelmét semmi ne vonja el a munkákról.\n\nA felület reszponzívan épül fel, a galéria mobilon és desktopon is egységes élményt ad. A cél egy olyan portfólió volt, amely hosszú távon is könnyen bővíthető új sorozatokkal.",
    meta: [
      { label: "LANG", value: "TypeScript · React" },
      { label: "STACK", value: "Next.js" },
      { label: "SZEREP", value: "Fejlesztő & designer" },
    ],
    href: "#",
    logo: "/images/logos/plczk_art.png",
    swatch: ["#2a0e1a", "#e2559a"],
    role: "Fejlesztő & designer",
    technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
];

export function getFrameBySlug(slug: string): Frame | undefined {
  return frames.find((f) => f.slug === slug);
}
