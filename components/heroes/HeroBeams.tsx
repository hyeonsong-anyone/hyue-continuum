"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeroInfo } from "./HeroInfo";

/**
 * 시안 C — 리빙 라이트 빔.
 * 포스터의 청색 기둥 DNA를 '살아 움직이는 빛'으로 재해석. 빔들이 천천히 호흡(scale/opacity/translate)하고
 * 그 앞에 깔끔한 CONTINUUM. 포스터를 복제하지 않으면서 같은 언어 유지.
 */
const LETTERS = "CONTINUUM".split("");

const BEAMS = [
  { left: 12, w: 5, dur: 7, delay: 0, peak: 0.5 },
  { left: 26, w: 8, dur: 9, delay: 1.2, peak: 0.75 },
  { left: 40, w: 11, dur: 8, delay: 0.5, peak: 0.95 },
  { left: 58, w: 11, dur: 8.5, delay: 0.9, peak: 0.95 },
  { left: 72, w: 8, dur: 9.5, delay: 0.2, peak: 0.7 },
  { left: 85, w: 5, dur: 7.5, delay: 1.6, peak: 0.45 },
];

export function HeroBeams() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      {/* 빛 빔 */}
      <div className="absolute inset-0">
        {BEAMS.map((b, i) => (
          <motion.div
            key={i}
            className="absolute top-0 h-full"
            style={{
              left: `${b.left}%`,
              width: `${b.w}%`,
              background: `linear-gradient(to bottom, transparent 0%, rgba(31,68,232,${b.peak}) 45%, rgba(70,107,255,${b.peak}) 60%, transparent 100%)`,
              filter: "blur(14px)",
            }}
            initial={reduce ? false : { opacity: 0.25, scaleY: 0.85 }}
            animate={
              reduce
                ? { opacity: b.peak * 0.6 }
                : { opacity: [0.25, b.peak, 0.3], scaleY: [0.85, 1.05, 0.9], y: ["2%", "-2%", "2%"] }
            }
            transition={
              reduce
                ? undefined
                : { duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }
            }
          />
        ))}
      </div>

      {/* 중앙 비네팅으로 글자 대비 확보 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(0,0,0,0.55)_0%,transparent_70%)]" />

      {/* 세로 CONTINUUM */}
      <motion.div
        className="relative z-20 flex flex-col items-center"
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {LETTERS.map((ch, i) => (
          <motion.span
            key={i}
            className="display block text-[clamp(2.2rem,10cqw,3.2rem)] leading-[1.0] text-white"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.div>

      <HeroInfo align="center" />
    </section>
  );
}
