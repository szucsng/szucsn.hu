"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

type Props = {
  logoSrc?: string;
  title: string;
  year: string;
  id: string;
  from: string;
  to: string;
};

export default function LogoStage({ logoSrc, title, year, id, from, to }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, margin: "-90px" });
  const reduce = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const spring = { stiffness: 140, damping: 24, mass: 0.6 };
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [5, -5]), spring);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-5, 5]), spring);
  const logoX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), spring);
  const logoY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-9, 9]), spring);

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      ref={stageRef}
      className="group/stage relative aspect-[16/10] w-full overflow-hidden border border-paper/10 md:aspect-[21/9]"
      style={{
        backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
        perspective: 1100,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Ambient light — két lassan mozgó glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-[22%] top-[-45%] h-[125%] w-[70%] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${to}88 0%, transparent 68%)` }}
        animate={
          reduce || !inView
            ? undefined
            : {
                x: ["0%", "20%", "-8%", "0%"],
                y: ["0%", "14%", "-10%", "0%"],
                scale: [1, 1.14, 0.94, 1],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[18%] bottom-[-55%] h-[130%] w-[60%] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${from}cc 0%, transparent 70%)` }}
        animate={
          reduce || !inView
            ? undefined
            : {
                x: ["0%", "-16%", "10%", "0%"],
                y: ["0%", "-12%", "8%", "0%"],
                scale: [1, 1.1, 0.96, 1],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Finom grid + vignette + grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(242,237,228,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,237,228,0.22) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse at center, black 12%, transparent 76%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 12%, transparent 76%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, transparent 22%, rgba(8,7,6,0.62) 100%)",
        }}
      />
      <div className="grain-overlay" aria-hidden="true" />

      {/* Lassan forgó conic ring */}
      <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
        <motion.div
          aria-hidden
          className="aspect-square h-[76%] rounded-full opacity-50"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${to} 78deg, transparent 168deg, transparent 228deg, #f2ede4 306deg, transparent 360deg)`,
            maskImage:
              "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))",
            WebkitMaskImage:
              "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))",
          }}
          animate={reduce || !inView ? undefined : { rotate: 360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Sarokjelzések — viewfinder */}
      <span className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-paper/30" />
      <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r border-t border-paper/30" />
      <span className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b border-l border-paper/30" />
      <span className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r border-paper/30" />

      {/* Logó — fókusz behúzás + finom lebegés + parallax */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex items-center justify-center"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <motion.div
            style={{ x: logoX, y: logoY }}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            variants={{
              hidden: {
                opacity: 0,
                scale: reduce ? 1 : 0.82,
                filter: reduce ? "blur(0px)" : "blur(26px)",
              },
              show: {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                transition: reduce
                  ? { duration: 0.01 }
                  : { duration: 1.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {logoSrc ? (
              <motion.img
                src={logoSrc}
                alt={`${title} logó`}
                className="w-auto max-h-[24vh] max-w-[58vw] object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.55)] md:max-h-[min(34vh,300px)] md:max-w-[480px]"
                animate={
                  reduce || !inView
                    ? undefined
                    : { y: [0, -7, 0], rotate: [0, 0.6, 0] }
                }
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
            ) : (
              <span className="font-display italic text-5xl text-paper md:text-7xl">
                {title}
              </span>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Fénypászta a logó megjelenése után */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-transparent via-white/15 to-transparent blur-2xl"
        initial={{ x: "-140%" }}
        animate={inView && !reduce ? { x: "300%" } : { x: "-140%" }}
        transition={{ duration: 2.4, delay: 1.05, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Képernyő feliratok */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
        <motion.span
          className="bg-void/40 px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest2 text-paper/80 backdrop-blur-sm"
          initial={{ opacity: 0, y: -8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          #{id}
        </motion.span>
        <motion.span
          className="bg-void/40 px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest2 text-paper/60 backdrop-blur-sm"
          initial={{ opacity: 0, y: -8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Identity · {year}
        </motion.span>
      </div>
    </motion.div>
  );
}
