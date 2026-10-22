"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  accent?: string;
};

export default function ScrollProgress({ children, accent }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        className="fixed top-16 left-0 right-0 h-[2px] bg-safelight origin-left z-50"
        style={{ scaleX, backgroundColor: accent }}
      />
      {children}
    </div>
  );
}
