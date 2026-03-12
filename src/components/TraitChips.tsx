"use client";

import { TrollTraits, getTraitSummary } from "@/lib/traits";

interface TraitChipsProps {
  traits: TrollTraits;
}

const CHIP_COLORS = ["bg-pink", "bg-blue", "bg-green", "bg-orange", "bg-purple", "bg-cyan"];

export default function TraitChips({ traits }: TraitChipsProps) {
  const summary = getTraitSummary(traits);

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {summary.map((item, i) => (
        <div
          key={item.label}
          className={`inline-flex items-center gap-1.5 px-3 py-1 border-2 border-black text-xs font-bold rounded-lg ${CHIP_COLORS[i % CHIP_COLORS.length]}`}
          style={{ color: "white" }}
        >
          <span>{item.label}:</span>
          <span className="capitalize">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
