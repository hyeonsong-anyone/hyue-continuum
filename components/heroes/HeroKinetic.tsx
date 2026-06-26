"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeroInfo } from "./HeroInfo";

/**
 * 시안 A — 세로 키네틱 타이포.
 * CONTINUUM 세로 컬럼 3개가 위/아래로 흐름(교대 방향·속도). 흰색/청색/외곽선.
 */
const LETTERS = "CONTINUUM".split("");
const REPEAT = 4; // 한 블록당 CONTINUUM 반복 수 (뷰포트보다 길게 → seamless)
const FONT = "display leading-[1.0] text-[clamp(1.8rem,12cqw,3rem)]";

function Half({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <div className="flex flex-col items-center">
      {Array.from({ length: REPEAT }).flatMap((_, r) =>
        LETTERS.map((ch, i) => (
          <span key={`${r}-${i}`} className={`${FONT} ${className}`} style={style}>
            {ch}
          </span>
        )),
      )}
    </div>
  );
}

function VColumn({
  className,
  reverse,
  duration,
  style,
}: {
  className: string;
  reverse?: boolean;
  duration: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="h-full overflow-hidden">
      <div
        className="marquee-v"
        style={{
          ["--marquee-duration" as string]: duration,
          animationDirection: reverse ? "reverse" : "normal",
          ...(reduce ? { transform: "none" } : {}),
        }}
      >
        <Half className={className} style={style} />
        <Half className={className} style={style} />
      </div>
    </div>
  );
}

export function HeroKinetic() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* 세로 3컬럼 */}
      <div className="absolute inset-0 z-10 flex items-stretch justify-center gap-[7cqw]">
        <VColumn
          className="text-transparent"
          duration="22s"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
        />
        <VColumn className="text-white" duration="30s" reverse />
        <VColumn className="text-accent" duration="18s" />
      </div>

      {/* 하단 가독성 그라데이션 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[36%] bg-gradient-to-t from-black via-black/85 to-transparent" />

      <HeroInfo align="left" />
    </section>
  );
}
