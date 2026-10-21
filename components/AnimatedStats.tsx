"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

type StatItem = {
  key: string;
  value: string;
  numericPart?: number;
  suffix?: string;
};

type Props = {
  stats: StatItem[];
};

function AnimatedNumber({ target, suffix }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-paper text-sm tabular-nums">
      {String(count).padStart(2, "0")}
      {suffix && <span className="text-grain/50 ml-0.5">{suffix}</span>}
    </div>
  );
}

export default function AnimatedStats({ stats }: Props) {
  return (
    <dl className="inline-grid grid-cols-2 sm:grid-cols-4 gap-px bg-paper/10 border border-paper/10 font-mono text-[11px]">
      {stats.map((s, i) => (
        <motion.div
          key={s.key}
          className="bg-void px-6 py-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.4 + i * 0.1,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
        >
          <dt className="tracking-widest3 uppercase text-grain/60">
            {s.key}
          </dt>
          {s.numericPart !== undefined ? (
            <dd className="mt-1.5">
              <AnimatedNumber target={s.numericPart} suffix={s.suffix} />
            </dd>
          ) : (
            <dd className="mt-1.5 text-paper text-sm">{s.value}</dd>
          )}
        </motion.div>
      ))}
    </dl>
  );
}
