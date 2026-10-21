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
    slug: "portre-sorozat-kezmuvesek",
    kind: "photo",
    title: "Portré sorozat — kézművesek",
    year: "2024",
    description:
      "Hat portré vidéki kézművesekről, természetes fényben, a munkakörnyezetükben fotózva.",
    longDescription:
      "Egy portrésorozat vidéki kézművesekről, akik a hagyományos mesterségeket élik tovább. Minden portré a alany természetes munkakörnyezetében készült, természetes fényben, minimális beavatkozással.\n\nA célom az volt, hogy a személyes történeteket és a mesterség iránti elhivatottságot ábrázoljam, miközben a természetes fény és a környezet adják a képek hangulatát.",
    meta: [
      { label: "f/", value: "1.8" },
      { label: "ISO", value: "200" },
    ],
    href: "#",
    swatch: ["#1a1815", "#6b5b4a"],
    gallery: [
      "/images/galleries/04-1.svg",
      "/images/galleries/04-2.svg",
      "/images/galleries/04-3.svg",
    ],
    role: "Fotós & utómunka",
    technologies: ["Canon EOS 6D", "50mm f/1.8", "Természetes fény"],
  },
  {
    id: "05",
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
    swatch: ["#1d1a18", "#8a6b4f"],
    role: "Fejlesztő & designer",
    technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    id: "06",
    slug: "cli-eszkoz-csapatoknak",
    kind: "code",
    title: "CLI eszköz csapatoknak",
    year: "2023",
    description:
      "Parancssori eszköz, ami automatizálja a release-folyamatot: changelog, verziózás, deploy egy lépésben.",
    longDescription:
      "Ez a parancssori eszköz a fejlesztői csapatok mindennapi munkafolyamatát egyszerűsíti le. Automatizálja a release-folyamatot: verziószámok kezelése, changelog generálás, és deploy indítás mindössze egyetlen paranccsal.\n\nGo-ban írtam a maximális teljesíny és hordozhatóság érdekében. Nyílt forráskódú, és már több mint 12 ezer letöltése van havonta.",
    meta: [
      { label: "LANG", value: "Go" },
      { label: "LETÖLTÉS", value: "12k+ / hó" },
      { label: "SZEREP", value: "Nyílt forráskód" },
    ],
    href: "#",
    swatch: ["#201e19", "#3f4a4d"],
    logo: "/images/logos/cli.svg",
    role: "Tervező & fejlesztő",
    technologies: ["Go", "CLI", "GitHub Actions", "Semantic Versioning"],
  },
  {
    id: "07",
    slug: "taj-karpátok",
    kind: "photo",
    title: "Táj — Kárpátok",
    year: "2023",
    description:
      "Egyhetes túra anyaga a Kárpátokból, közepes formátumú kamerával, hajnali és alkonyati fényben.",
    longDescription:
      "Egyhetes gyalogos túra anyaga a Kárpátokban, közepes formátumú kamerával (6x7) rögzítve. A sorozat a hajnali és alkonyati órákban készült, amikor a fény a legdrámaibb és legmelegebb.\n\nA közepes formátum nagyobb felbontása és sekély mélységélessége olyan részletgazdagságot és hangulatot ad a képeknek, amelyet a digitális eszközök nehezen tudnak utánozni.",
    meta: [
      { label: "f/", value: "8" },
      { label: "ISO", value: "100" },
      { label: "FORMÁTUM", value: "6x7 közepes" },
    ],
    href: "#",
    swatch: ["#181614", "#7a6a52"],
    gallery: [
      "/images/galleries/06-1.svg",
      "/images/galleries/06-2.svg",
      "/images/galleries/06-3.svg",
    ],
    role: "Fotós & utómunka",
    technologies: ["Mamiya RB67", "Közepes formátum", "Diafilm", "Sötét szoba"],
  },
];

export function getFrameBySlug(slug: string): Frame | undefined {
  return frames.find((f) => f.slug === slug);
}
