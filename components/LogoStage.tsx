"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  logoSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
  title: string;
  year: string;
  id: string;
  from: string;
  to: string;
  variant?: "stage" | "cover";
};

export default function LogoStage({
  logoSrc,
  videoSrc,
  posterSrc,
  title,
  year,
  id,
  from,
  to,
  variant = "stage",
}: Props) {
  const isCover = variant === "cover";
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, margin: "-90px" });
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  /* Phones skip the looping blur animations: they are the heaviest part of the
     stage and iOS Safari can drop the whole page while decoding them. */
  const calm = reduce || isMobile;
  const [hovered, setHovered] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const spring = { stiffness: 140, damping: 24, mass: 0.6 };
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [5, -5]), spring);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-5, 5]), spring);
  const logoX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), spring);
  const logoY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-9, 9]), spring);

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (calm) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    pointerX.set(0);
    pointerY.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={stageRef}
      className={`group/stage relative w-full overflow-hidden ${
        isCover
          ? "h-full"
          : "aspect-[16/10] border border-paper/10 md:aspect-[21/9]"
      }`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
        perspective: 1100,
      }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
    >
      {videoSrc && (
        <>
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSrc}
            poster={posterSrc}
            autoPlay={!reduce}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-void/30" />
        </>
      )}

      {/* Ambient light — két lassan mozgó glow */}
      {!videoSrc && (
        <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-[22%] top-[-45%] hidden h-[125%] w-[70%] rounded-full blur-3xl md:block"
        style={{ background: `radial-gradient(circle, ${to}88 0%, transparent 68%)` }}
        animate={
          calm || !inView
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
        className="pointer-events-none absolute -right-[18%] bottom-[-55%] hidden h-[130%] w-[60%] rounded-full blur-3xl md:block"
        style={{ background: `radial-gradient(circle, ${from}cc 0%, transparent 70%)` }}
        animate={
          calm || !inView
            ? undefined
            : {
                x: ["0%", "-16%", "10%", "0%"],
                y: ["0%", "-12%", "8%", "0%"],
                scale: [1, 1.1, 0.96, 1],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
        </>
      )}

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

      {/* Finom háttérglow a logó mögött */}
      {!videoSrc && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div
            aria-hidden
            className="hidden h-[42%] w-[42%] rounded-full blur-[90px] md:block"
            style={{
              background: `radial-gradient(circle, ${to}88 0%, transparent 70%)`,
            }}
            animate={
              calm || !inView
                ? undefined
                : { opacity: hovered ? 0.9 : 0.45, scale: hovered ? 1.18 : 1 }
            }
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* Scan vonal a logó megjelenésekor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 h-px w-[48%] -translate-x-1/2"
        style={{
          background: `linear-gradient(90deg, transparent, ${to}, #f2ede4, ${to}, transparent)`,
          boxShadow: `0 0 26px ${to}99`,
        }}
        initial={{ top: "30%", opacity: 0 }}
        animate={
          inView && !calm
            ? { top: ["30%", "70%"], opacity: [0, 0.9, 0] }
            : { opacity: 0 }
        }
        transition={{ duration: 1.9, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Sarokjelzések — viewfinder */}
      {!isCover && (
        <>
          <span className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-paper/30" />
          <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r border-t border-paper/30" />
        </>
      )}
      <span className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b border-l border-paper/30" />
      <span className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r border-paper/30" />

      {/* Logó — 3D fókusz behúzás + lebegés + parallax */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex items-center justify-center"
          style={{ rotateX, rotateY, transformStyle: calm ? "flat" : "preserve-3d" }}
        >
          <motion.div
            className="logo-reveal"
            style={{ x: logoX, y: logoY }}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            variants={{
              hidden: {
                opacity: 0,
                scale: reduce ? 1 : isMobile ? 0.96 : 0.8,
                rotateX: calm ? 0 : 12,
                rotateY: calm ? 0 : -14,
                filter: calm ? "blur(0px)" : "blur(28px)",
              },
              show: {
                opacity: 1,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                filter: "blur(0px)",
                transition: reduce
                  ? { duration: 0.01 }
                  : {
                      duration: isMobile ? 0.7 : 1.8,
                      delay: isMobile ? 0.05 : 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    },
              },
            }}
          >
            <motion.div
              className="relative"
              animate={{ scale: hovered ? 1.035 : 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {logoSrc ? (
                <motion.img
                  src={logoSrc}
                  alt={`${title} logó`}
                  className={`w-auto object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.55)] ${
                    isCover
                      ? "max-h-[38vh] max-w-[76vw] md:max-h-[48vh] md:max-w-[680px]"
                      : "max-h-[24vh] max-w-[58vw] md:max-h-[min(34vh,300px)] md:max-w-[480px]"
                  }`}
                  animate={
                    calm || !inView
                      ? undefined
                      : {
                          y: [0, -7, 0],
                          rotate: [0, 0.4, 0],
                        }
                  }
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : (
                <span className="font-display italic text-5xl text-paper md:text-7xl">
                  {title}
                </span>
              )}

              {/* talajárnyék */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[12%] -bottom-7 h-8 rounded-[50%] bg-black/50 blur-2xl"
                animate={
                  calm || !inView
                    ? undefined
                    : { scaleX: [1, 0.92, 1], opacity: [0.55, 0.35, 0.55] }
                }
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Fénypászta a logó megjelenése után */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[38%] bg-gradient-to-r from-transparent via-white/25 to-transparent mix-blend-screen blur-2xl"
        initial={{ x: "-140%" }}
        animate={inView && !calm ? { x: "300%" } : { x: "-140%" }}
        transition={{ duration: 2.4, delay: 1.05, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Képernyő feliratok */}
      <div
        className={`absolute inset-x-0 top-0 items-start justify-between p-5 ${
          isCover ? "hidden" : "flex"
        }`}
      >
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
