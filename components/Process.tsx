import Reveal from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Megbeszélés",
    text: "Átbeszéljük a célt, a kereteket és a határidőt. Ha van meglévő anyag vagy rendszer, azt is átnézzük.",
  },
  {
    number: "02",
    title: "Terv és ajánlat",
    text: "Kap egy tiszta scope-ot, ütemtervet és árajánlatot — nincs rejtett tétel.",
  },
  {
    number: "03",
    title: "Kivitelezés",
    text: "Rövid körökben haladunk, hogy időben lássa a haladást, és menet közben tudjunk igazítani.",
  },
  {
    number: "04",
    title: "Átadás",
    text: "Dokumentáció, átadás és egy rövid támogatási időszak, hogy ne maradjon nyitott kérdés.",
  },
];

export default function Process() {
  return (
    <section className="border-t border-white/10">
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-safelight/10 blur-3xl"
        />

        <Reveal>
          <div className="relative mb-14 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest3 text-safelight">
                Folyamat
              </p>
              <h2 className="font-display italic text-display-lg text-paper">
                Hogyan dolgozom
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-grain">
              A pontos lépések projektfüggők, de a váz ugyanaz: tiszta keretek,
              látható haladás és rendezett átadás.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.06} className="h-full">
              <div className="group glass-soft h-full rounded-2xl p-6 transition-colors duration-400 hover:border-safelight/30">
                <span className="font-mono text-[11px] tracking-widest2 text-safelight/60">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-2xl text-paper">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-grain">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
