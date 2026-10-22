"use client";

import { motion } from "motion/react";

type FilterKind = "all" | "code" | "photo";

const filters: { key: FilterKind; label: string }[] = [
  { key: "all", label: "Összes" },
  { key: "code", label: "Kód" },
  { key: "photo", label: "Fotó" },
];

type Props = {
  active: FilterKind;
  onChange: (kind: FilterKind) => void;
  counts: Record<FilterKind, number>;
};

export default function FilterBar({ active, onChange, counts }: Props) {
  return (
    <div className="glass-soft flex items-center gap-1 rounded-full p-1">
      {filters.map((f) => (
        <button
          key={f.key}
          type="button"
          onClick={() => onChange(f.key)}
          className={`relative px-4 py-2 font-mono text-[11px] tracking-widest2 uppercase transition-colors duration-300 ${
            active === f.key ? "text-paper" : "text-grain hover:text-paper/70"
          }`}
        >
          {active === f.key && (
            <motion.span
              layoutId="filter-pill"
              className="absolute inset-0 rounded-full bg-safelight/15 border border-safelight/30"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {f.label}
            <span className={`text-[10px] ${active === f.key ? "text-safelight" : "text-grain/50"}`}>
              {counts[f.key]}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
