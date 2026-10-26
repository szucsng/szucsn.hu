// Ez az egyetlen fájl, amit MINDENKÉPP szerkeszteni kell a saját adataiddal.
export const siteConfig: {
  name: string;
  role: string;
  tagline: string;
  url: string;
  email: string;
  location: string;
  social: { label: string; href: string; icon: string }[];
  about: string[];
  settings: { key: string; value: string }[];
  achievements: { value: string; title: string; detail: string }[];
  stack: { label: string; items: string[] }[];
} = {
  name: "Szűcs Noel",
  role: "Fejlesztő & fotós",
  tagline: "Kódot, rendszereket és képeket építek — mindig a részletekre figyelve.",
  url: "https://szucsn.hu",
  email: "mail@szucsn.hu",
  location: "Miskolc, HU",

  social: [
    // Ide jöhetnek később a profiljaid:
    { label: "GITHUB", href: "https://github.com/szucsng", icon: "/images/github.png" },
    { label: "INSTAGRAM", href: "https://instagram.com/noel.szucs.940", icon: "/images/instagram.png" },
    { label: "EMAIL", href: "https://mail.google.com/mail/?view=cm&fs=1&to=mail@szucsn.hu", icon: "/images/email.png" },
  ],

  about: [
    "Informatikával és fejlesztéssel foglalkozom, elsősorban modern webes rendszerek, egyedi alkalmazások és felhasználói felületek építésével. Szeretem a problémákat nem csak megoldani, hanem olyan rendszert létrehozni, ami hosszú távon is átlátható és használható marad.",

    "A munkáim során a frontend és a backend világa egyaránt érdekel. TypeScriptben és JavaScriptben dolgozom, Node.js alapú rendszereket építek, valamint adatbázisokkal, API-kkal és komplex webes alkalmazásokkal is foglalkozom.",

    "A fejlesztés mellett a vizuális világ is fontos része annak, amit csinálok. Fotózással és videós tartalmak készítésével is foglalkozom, ahol a kompozíció, a fények és a megfelelő pillanat megtalálása ugyanúgy kreatív problémamegoldás számomra, mint egy jól felépített digitális rendszer.",

    "A sport szintén meghatározó része volt az elmúlt éveimnek. Több éven keresztül versenyszerűen röplabdáztam, ami megtanított csapatban gondolkodni, alkalmazkodni és akkor is teljesíteni, amikor nincs tökéletes körülmény.",

    "A különböző területeket nem különálló dolgokként kezelem. A fejlesztésben a struktúrát, a fotózásban a vizuális történetmesélést, a sportban pedig a következetességet keresem. Ezek együtt alakítják azt a szemléletet, amellyel egy új projektbe kezdek.",

    "Ez az oldal ennek a metszete: projektek, kódok, képek és ötletek egy helyen — mindegyik mögött egy saját történettel."
  ],

  settings: [
    { key: "NYELVEK", value: "TypeScript, JavaScript, Python, HTML/CSS" },
    { key: "STACK", value: "Node.js, Next.js, MySQL" },
    { key: "FÓKUSZ", value: "Full-stack fejlesztés & UI/UX" },
    { key: "WEB", value: "Modern webalkalmazások & egyedi rendszerek" },
    { key: "KAMERA", value: "Canon EOS 6D + 24-105mm" },
    { key: "FOTÓ", value: "Portré, sport, esemény & kreatív fotózás" },
    { label: "SPORT", value: "Röplabda · U17 · versenysport" },
    { label: "JELENLEG", value: "Saját projektek & szabadúszó munkák" },
  ],

  achievements: [
    {
      value: "2.",
      title: "Vadász Dénes Informatika Verseny",
      detail: "Országos 2. hely",
    },
    {
      value: "4.",
      title: "Dusza Árpád Programozási Verseny",
      detail: "Döntő, 4. hely",
    },
    {
      value: "U17",
      title: "Versenysport — röplabda",
      detail: "Csapatmunka, fegyelem, kommunikáció",
    },
  ],

  stack: [
    {
      label: "Nyelv & keretrendszer",
      items: [
        "TypeScript",
        "JavaScript",
        "Python",
        "PHP",
        "React",
        "Next.js",
        "Node.js",
        "Vite",
        "Tailwind CSS",
      ],
    },
    {
      label: "Backend & infrastruktúra",
      items: ["MySQL", "Prisma", "Docker", "Nginx", "Debian", "Git", "GitHub"],
    },
    {
      label: "Egyéb",
      items: ["FiveM", "ESX", "ox_core", "Pterodactyl", "Three.js", "Discord"],
    },
  ],
};