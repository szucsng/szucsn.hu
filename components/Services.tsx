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
    <section
      id="szolgaltatasok"
      className="border-t border-white/10 bg-white/[0.015] backdrop-blur-xl"
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-safelight/10 blur-3xl"
        />
        <div className="relative">
            <Reveal>
              <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08} y={20}>
                  <div className="group glass-soft h-full rounded-2xl p-6 md:p-8 transition-colors duration-400 hover:border-safelight/30">
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
                          className="px-2.5 py-1 rounded-full border border-white/10 font-mono text-[10px] tracking-wide uppercase text-grain/60 group-hover:border-safelight/30 group-hover:text-grain transition-all duration-300"
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
      </div>
    </section>
  );
}
