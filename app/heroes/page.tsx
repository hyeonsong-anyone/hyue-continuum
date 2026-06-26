"use client";

import { useState } from "react";
import { HeroKinetic } from "@/components/heroes/HeroKinetic";
import { HeroReveal } from "@/components/heroes/HeroReveal";
import { HeroBeams } from "@/components/heroes/HeroBeams";

const VARIANTS = [
  { key: "A", label: "A · 키네틱 타이포", node: <HeroKinetic /> },
  { key: "B", label: "B · 수직 리빌", node: <HeroReveal /> },
  { key: "C", label: "C · 라이트 빔", node: <HeroBeams /> },
];

export default function HeroesPage() {
  const [i, setI] = useState(0);

  return (
    <main className="relative">
      {/* 시안 스위처 */}
      <div className="fixed left-1/2 top-4 z-[100] flex -translate-x-1/2 gap-1.5 rounded-full border border-white/15 bg-black/60 p-1.5 backdrop-blur">
        {VARIANTS.map((v, idx) => (
          <button
            key={v.key}
            onClick={() => setI(idx)}
            className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
              i === idx ? "bg-accent text-white" : "text-ink-sub hover:text-white"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {VARIANTS[i].node}
    </main>
  );
}
