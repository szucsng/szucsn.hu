import { siteConfig } from "@/lib/site";
import Reveal from "./Reveal";

const services = [
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

export default function Services() {
  return (
    <section id="szolgaltatasok" className="border-t border-paper/10">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-36">
        <Reveal>
          <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
            <div>
              <p className="font-mono text-xs tracking-widest3 uppercase text-safelight mb-3">
                Szolgáltatások
              </p>
              <h2 className="font-display italic text-display-lg text-paper">
                Mit csinálok
              </h2>
            </div>
            <p className="max-w-sm text-sm text-grain leading-relaxed">
              A különböző területeket nem különálló dolgokként kezelem — mindegyik
              ugyanannak a szemléletnek a része.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper/10">
          {services.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} y={20}>
              <div className="group bg-void p-8 md:p-10 hover:bg-void-light transition-colors duration-400">
                <p className="font-mono text-[11px] tracking-widest3 uppercase text-safelight/60 mb-4">
                  {s.label}
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-paper group-hover:text-safelight transition-colors duration-300 mb-4">
                  {s.title}
                </h3>
                <p className="text-sm text-grain leading-relaxed mb-6">
                  {s.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 border border-paper/10 font-mono text-[10px] tracking-wide uppercase text-grain/60 group-hover:border-safelight/30 group-hover:text-grain transition-all duration-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
