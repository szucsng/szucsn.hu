export type Service = {
  label: string;
  title: string;
  description: string;
  details: string[];
  tags: string[];
};

export const services: Service[] = [
  {
    label: "FEJLESZTÉS",
    title: "Webes alkalmazások",
    description:
      "Modern, reszponzív webes rendszerek tervezése és fejlesztése. Full-stack megoldások TypeScripttel, React-tel és Node.js-sel.",
    details: [
      "Egyedi webalkalmazások és admin felületek",
      "Reszponzív bemutatkozó és márkaoldalak",
      "API-k, adatbázis és bejelentkezés",
      "Teljesítmény- és SEO-alapok",
    ],
    tags: ["TypeScript", "React", "Next.js", "Node.js"],
  },
  {
    label: "FOTÓZÁS",
    title: "Vizuális történetmesélés",
    description:
      "Portré, sport, esemény és kreatív fotózás. A kompozíció és a fények megteremtése ugyanolyan kreatív problémamegoldás, mint egy jól felépített rendszer.",
    details: [
      "Portré-, sport- és eseményfotózás",
      "Helyszín- és fénytervezés",
      "Válogatás, retusálás és színkorrekció",
      "Átadás webes és nyomdai méretben",
    ],
    tags: ["Portré", "Sport", "Esemény", "Kreatív"],
  },
  {
    label: "TERVEZÉS",
    title: "UI/UX & felülettervezés",
    description:
      "Felhasználó-központú felülettervezés, ahol a funkcionalitás és az esztétika találkozik. Tiszta, átlátható rendszerek.",
    details: [
      "Folyamat- és felhasználói feltárás",
      "Wireframe és kattintható prototípus",
      "Design system és újrahasznosítható komponensek",
      "Fejlesztői átadás dokumentációval",
    ],
    tags: ["UI/UX", "Design rendszer", "Prototípus"],
  },
  {
    label: "MENEDZSMENT",
    title: "Projektvezetés",
    description:
      "Projektek tervezése és koordinálása a kezdeti ötlettől a megvalósításig. Átlátható folyamatok és hatékony kommunikáció.",
    details: [
      "Célok, scope és ütemterv rögzítése",
      "Rendszeres egyeztetés és állapotriport",
      "Eszközök, partnerek és határidők koordinálása",
      "Átadás, dokumentáció és támogatás",
    ],
    tags: ["Agilis", "Scrum", "Koordináció"],
  },
];
