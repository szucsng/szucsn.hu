export type Service = {
  label: string;
  title: string;
  description: string;
  tags: string[];
};

export const services: Service[] = [
  {
    label: "FEJLESZTÉS",
    title: "Webes alkalmazások",
    description:
      "Modern, reszponzív webes rendszerek tervezése és fejlesztése. Full-stack megoldások TypeScripttel, React-tel és Node.js-sel.",
    tags: ["TypeScript", "React", "Next.js", "Node.js"],
  },
  {
    label: "FOTÓZÁS",
    title: "Vizuális történetmesélés",
    description:
      "Portré, sport, esemény és kreatív fotózás. A kompozíció és a fények megteremtése ugyanolyan kreatív problémamegoldás, mint egy jól felépített rendszer.",
    tags: ["Portré", "Sport", "Esemény", "Kreatív"],
  },
  {
    label: "TERVEZÉS",
    title: "UI/UX & felülettervezés",
    description:
      "Felhasználó-központú felülettervezés, ahol a funkcionalitás és az esztétika találkozik. Tiszta, átlátható rendszerek.",
    tags: ["UI/UX", "Design rendszer", "Prototípus"],
  },
  {
    label: "MENEDZSMENT",
    title: "Projektvezetés",
    description:
      "Projektek tervezése és koordinálása a kezdeti ötlettől a megvalósításig. Átlátható folyamatok és hatékony kommunikáció.",
    tags: ["Agilis", "Scrum", "Koordináció"],
  },
];
