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
  coverVideo?: string;
  coverPoster?: string;
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
    year: "2026",
    description:
      "Modern időpontfoglalási és szalonmenedzsment platform, amely egyetlen rendszerben köti össze a vendégeket és a szolgáltatókat.",
    longDescription:
      "A Reservell egy teljes körű időpontfoglalási és szalonmenedzsment platform, amelyet nulláról építettem. A projekt magában foglal egy reszponzív webes felületet vendégek számára, egy modern kezelőfelületet szalonoknak, valamint egy backend rendszert a foglalások, ügyfelek és szolgáltatások kezelésére.\n\nA felhasználói élményre helyeztem a legnagyobb hangsúlyt: gyors betöltés, intuitív navigáció és tiszta vizuálisrendszer. A technológiai stack modern és fenntartható: TypeScript, React, Next.js, Node.js.",
    meta: [
      { label: "LANG", value: "TypeScript · React" },
      { label: "STACK", value: "Node.js · Next.js" },
      { label: "SZEREP", value: "Tervezés & fejlesztés" },
    ],
    href: "https://reservell.com",
    swatch: ["#2A2E30", "#EEB92A"],
    logo: "/images/logos/reservell_clock.png",
    role: "Tervezés & fejlesztés",
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
      { label: "SZEREP", value: "Tervezés & fejlesztés" },
    ],
    href: "https://barbearavasbarbershop.hu",
    swatch: ["#1B1B1C", "#72686C"],
    logo: "/images/logos/barbearshop.png",
    role: "Tervezés & fejlesztés",
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
      { label: "SZEREP", value: "Tervezés & fejlesztés" },
    ],
    href: "https://plczkart.szucsn.hu",
    logo: "/images/logos/plczk_art.png",
    swatch: ["#2a0e1a", "#e2559a"],
    role: "Tervezés & fejlesztés",
    technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    id: "05",
    slug: "szirma-vege",
    kind: "photo",
    title: "Szirma vége",
    year: "2026",
    description:
      "Nyári naplementés portrék Szirma végén. Egy üres út, a város pereme és az alkonyi fény.",
    longDescription:
      "Egy nyári délután a szirma végi úton. Mire odaértünk, a nap már alacsonyan járt, a dombok és a házak körvonalai összemosódtak, és a fény mindent meleg narancsba vont.\n\nNem volt különösebb terv: végigsétáltunk az úton, megálltunk ott, ahol a háttér rendben volt, és hagytuk, hogy a fény csinálja a többit. A sorozatban a portrék mellett helyet kapott a helyszín is — az üres út, a kerítés, a távoli házak —, meg egy kép a telefon képernyőjéről, ahogy épp videón rögzítjük az egyik beállítást.",
    meta: [
      { label: "f/", value: "5 – 5.6" },
      { label: "ISO", value: "250 – 1600" },
    ],
    href: "#",
    swatch: ["#1a100c", "#D96A2E"],
    gallery: [
      "/images/galleries/szirma/_MG_2148.jpg",
      "/images/galleries/szirma/_MG_2121.jpg",
      "/images/galleries/szirma/_MG_2196.jpg",
      "/images/galleries/szirma/_MG_2210.jpg",
      "/images/galleries/szirma/_MG_2348.jpg",
      "/images/galleries/szirma/_MG_2225.jpg",
      "/images/galleries/szirma/_MG_2334.jpg",
      "/images/galleries/szirma/_MG_2372.jpg",
      "/images/galleries/szirma/_MG_2409.jpg",
    ],
    role: "Fotós & utómunka",
    technologies: ["Canon EOS 6D", "80–300mm", "Alkonyi fény", "Snapseed"],
  },
  {
    id: "06",
    slug: "avas-varoshaz-ter",
    kind: "photo",
    title: "Avas – Városház tér",
    year: "2026",
    description:
      "Őszi fotóséta az Avasról a Városház térig. Aranyleveles utak, avasi lépcsők és a város a magasból.",
    longDescription:
      "Október elején elindultunk az Avasról, le a hegy alján, és a séta végén a Városház téren kötöttünk ki. Útközben megálltunk a lombok alatt, az avasi lépcsőknél és a kilátónál, ahonnan a város vörös tetőkkel és tornyokkal egyszerre volt háttér és főszereplő.\n\nA napfény erős volt, ezért a legtöbb képet a fák árnyékában készítettük. A sorozatban a portrék mellett végig ott van a séta útvonala is: az őszi út, a lépcső, a pad és a kilátó.",
    meta: [
      { label: "f/", value: "3.5 – 13" },
      { label: "ISO", value: "400 – 2500" },
    ],
    href: "#",
    swatch: ["#211a10", "#C98A2E"],
    gallery: [
      "/images/galleries/avas-varoshaz-ter/_MG_3485.jpg",
      "/images/galleries/avas-varoshaz-ter/_MG_3387.jpg",
      "/images/galleries/avas-varoshaz-ter/_MG_3411.jpg",
      "/images/galleries/avas-varoshaz-ter/_MG_3414.jpg",
      "/images/galleries/avas-varoshaz-ter/_MG_3442.jpg",
      "/images/galleries/avas-varoshaz-ter/_MG_3471.jpg",
      "/images/galleries/avas-varoshaz-ter/_MG_3474.jpg",
      "/images/galleries/avas-varoshaz-ter/_MG_3493.jpg",
      "/images/galleries/avas-varoshaz-ter/_MG_3539-2.jpg",
    ],
    role: "Fotós & utómunka",
    technologies: ["Canon EOS 6D", "24–105mm", "Természetes fény", "Lightroom"],
  },
  {
    id: "07",
    slug: "tatrai_studio",
    kind: "code",
    title: "Tátrai Stúdió",
    year: "2026",
    description:
      "Tátrai Levente fotós és videós munkái: showreel, eseményekre bontott galéria és saját admin felület a feltöltésekhez.",
    longDescription:
      "Tátrai Levente fotós és videós portfóliója: esküvők, események, brand filmek és short form tartalmak. A főoldal egy loopoló showreellel indít, utána jönnek a szolgáltatások, a kiemelt munkák és a galéria. A háttérben egy háromdimenziós, mozgó felület adja a hangulatot, a képek pedig eseményekre bontva, lightboxban nyílnak.\n\nA tartalom nem kódból frissül: az admin felületen új események és képek tölthetők fel, a rendszer automatikusan legenerálja a thumbnail és medium méreteket. A belépés email/jelszó alapú, a jogosultságok szerepkörhöz kötöttek. A stack Next.js, Prisma és MySQL.",
    meta: [
      { label: "LANG", value: "TypeScript · React" },
      { label: "STACK", value: "Next.js · Prisma" },
      { label: "SZEREP", value: "Tervezés & fejlesztés" },
    ],
    href: "https://tatraistudio.szucsn.hu",
    swatch: ["#00008B", "#1E90FF"],
    logo: "/images/logos/tatrai_studio.png",
    coverVideo: "/media/tatrai-studio.mp4",
    coverPoster: "/media/tatrai-studio-poster.jpg",
    role: "Tervezés & fejlesztés",
    technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Prisma", "Three.js"],
  },
  {
    id: "08",
    slug: "szucsgumi",
    kind: "code",
    title: "Szűcs Gumi",
    year: "2026",
    description:
      "Prémium, sötét hangulatú weboldal a Szűcs Gumi miskolci gumiszervizének: gyors, statikus Astro oldal a szolgáltatásokkal, galériával és kapcsolattal.",
    longDescription:
      "Egy miskolci gumiszerviz és autószerviz teljes webes jelenléte, prémium, sötét vizuális irányban. A főoldal a szolgáltatások köré épül — gumicsere, kerékcsere, centrírozás, defektjavítás —, mellette galéria, bemutatkozás, vélemény szekció és kapcsolat térképpel és útvonaltervezéssel.\n\nA site Astro + TypeScript alapon, kliensoldali framework nélkül készült, statikus HTML-ként. A képek AVIF/WebP formátumban, lazy loadinggal töltődnek, a JS csak a szükséges interakciókért felel — mobilmenü, lightbox, scroll reveal. Az SEO-hoz strukturált adat, sitemap, robots és Open Graph került be.",
    meta: [
      { label: "LANG", value: "TypeScript · HTML" },
      { label: "STACK", value: "Astro · Vite" },
      { label: "SZEREP", value: "Tervezés & fejlesztés" },
    ],
    href: "https://szucsgumi.szucsn.hu",
    swatch: ["#050708", "#FF2B1F"],
    logo: "/images/logos/szucsgumi.png",
    role: "Tervezés & fejlesztés",
    technologies: ["Astro", "TypeScript", "Vite", "CSS", "Sharp"],
  },
];

export function getFrameBySlug(slug: string): Frame | undefined {
  return frames.find((f) => f.slug === slug);
}
