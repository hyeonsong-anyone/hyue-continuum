"use client";

import { motion, useReducedMotion } from "framer-motion";
import { exhibition } from "@/lib/data";

/** 히어로 공통 하단 정보 + 스크롤 큐. 시안 비교 시 일관성 유지. */
export function HeroInfo({ align = "center" }: { align?: "center" | "left" }) {
  const reduce = useReducedMotion();
  const left = align === "left";
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-40 flex flex-col px-7 pb-10 ${
        left ? "items-start text-left" : "items-center text-center"
      }`}
    >
      <motion.div
        className={`flex flex-col gap-1.5 ${left ? "items-start" : "items-center"}`}
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex items-center gap-3 text-base font-semibold tracking-tight">
          <span>{exhibition.periodFrom}</span>
          <span className="h-px w-8 bg-accent" />
          <span>{exhibition.periodTo}</span>
        </div>
        <p className="text-[13px] text-ink">{exhibition.venue}</p>
        <p className="text-[11px] tracking-[0.12em] text-ink-sub">{exhibition.hostEn}</p>
      </motion.div>

      <div
        className={`mt-6 flex w-full items-center gap-2 ${left ? "justify-start" : "justify-center"}`}
      >
        <span className="text-[10px] tracking-[0.3em] text-ink-sub">SCROLL</span>
        <motion.span
          className="text-base text-ink-sub"
          aria-hidden
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </div>
    </div>
  );
}
