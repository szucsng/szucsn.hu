"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Variants } from "motion/react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const line: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -60]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = (
    <>
      <div className="sprockets mt-6" aria-hidden="true" />

      <motion.div
        className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-32"
        variants={container}
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        style={{ opacity, y }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-safelight/10 blur-3xl"
        />

        <div className="relative">
          <motion.p
            variants={item}
            className="font-mono text-[11px] tracking-widest3 uppercase text-safelight mb-8"
          >
            {siteConfig.role} — {siteConfig.location}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display italic text-display-xl text-paper max-w-6xl"
          >
            {siteConfig.name}
          </motion.h1>

          <motion.div variants={line} className="origin-left mt-8 mb-8">
            <div className="h-px bg-safelight/40 w-24" />
          </motion.div>

          <motion.p
            variants={item}
            className="max-w-2xl text-lg md:text-xl text-grain leading-relaxed"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/munkak"
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 font-mono text-xs tracking-widest2 uppercase text-paper backdrop-blur-xl hover:border-safelight hover:text-safelight transition-all duration-400"
            >
              Munkáim
              <span className="inline-block group-hover:translate-x-1 transition-transform duration-300 text-safelight">
                →
              </span>
            </Link>
            <a
              href="#rolam"
              className="inline-flex items-center gap-2 px-5 py-3.5 font-mono text-xs tracking-widest2 uppercase text-grain hover:text-paper transition-colors duration-300"
            >
              Rólam
            </a>
          </motion.div>
        </div>
      </motion.div>

      <div className="sprockets" aria-hidden="true" />
    </>
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden border-b border-white/10 bg-white/[0.015] pt-16 backdrop-blur-xl"
    >
      {content}
    </section>
  );
}
