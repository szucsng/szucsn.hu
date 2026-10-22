import Link from "next/link";
import { frames } from "@/lib/frames";
import FrameCard from "./FrameCard";
import Reveal from "./Reveal";

export default function FrameGrid() {
  return (
    <section id="munkak" className="border-t border-paper/10">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-36">
        <Reveal>
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <p className="font-mono text-xs tracking-widest3 uppercase text-safelight mb-3">
                Kontaktmásolat
              </p>
              <h2 className="font-display italic text-display-lg text-paper">
                Munkáim
              </h2>
            </div>
            <p className="max-w-sm text-sm text-grain leading-relaxed">
              Minden tétel egy „frame” — kód vagy fénykép, ugyanazokkal a
              kérdésekkel megközelítve: mit hagyok a keretben, és mit vágok le.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper/10">
          {frames.slice(0, 3).map((frame, i) => (
            <div key={frame.id} className="bg-void">
              <Reveal delay={i * 0.08} y={24} className="h-full">
                <FrameCard frame={frame} />
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 flex justify-center">
            <Link
              href="/munkak"
              className="group inline-flex items-center gap-3 border border-paper/20 px-7 py-3.5 font-mono text-xs tracking-widest2 uppercase text-paper hover:border-safelight hover:text-safelight transition-all duration-400"
            >
              Az összes munka megtekintése
              <span className="text-safelight group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
