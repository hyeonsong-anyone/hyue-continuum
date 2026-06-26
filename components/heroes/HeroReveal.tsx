"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroInfo } from "./HeroInfo";

/**
 * 시안 B — 수직 스택 리빌 + 포인터 패럴럭스.
 * CONTINUUM 세로 스택이 마스크 리빌로 차오르고, 청색 라인이 위→아래로 그려짐.
 * 포인터(마우스/터치) 이동에 배경 원근 그리드가 미세하게 반응.
 */
const LETTERS = "CONTINUUM".split("");

export function HeroReveal() {
  const reduce = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLElement>(null);

  function onMove(e: React.PointerEvent) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    });
  }

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      {/* 원근 그리드 (포인터 패럴럭스) */}
      <motion.svg
        className="absolute inset-0 h-full w-full opacity-[0.13]"
        viewBox="0 0 100 130"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
        animate={{ x: tilt.x * -10, y: tilt.y * -10 }}
        transition={{ type: "spring", stiffness: 60, damping: 18 }}
      >
        <g stroke="#7e9bff" strokeWidth="0.18" fill="none">
          <rect x="14" y="18" width="72" height="96" />
          <rect x="28" y="34" width="44" height="64" />
          {[14, 28, 50, 72, 86].map((x) => (
            <line key={x} x1={x} y1="18" x2={x} y2="114" />
          ))}
          <line x1="14" y1="18" x2="28" y2="34" />
          <line x1="86" y1="18" x2="72" y2="34" />
          <line x1="14" y1="114" x2="28" y2="98" />
          <line x1="86" y1="114" x2="72" y2="98" />
        </g>
      </motion.svg>

      {/* 청색 라인 (위→아래 드로잉) */}
      <motion.div
        className="absolute left-1/2 top-[12%] z-10 w-[2px] -translate-x-1/2 bg-gradient-to-b from-accent via-accent to-transparent"
        style={{ height: "76%", transformOrigin: "top" }}
        initial={reduce ? false : { scaleY: 0 }}
        animate={reduce ? undefined : { scaleY: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />

      {/* 세로 CONTINUUM 마스크 리빌 */}
      <motion.div
        className="relative z-20 flex flex-col items-center"
        animate={{ x: tilt.x * 6, y: tilt.y * 6 }}
        transition={{ type: "spring", stiffness: 50, damping: 18 }}
      >
        {LETTERS.map((ch, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className="display block text-[clamp(2.2rem,10cqw,3.2rem)] leading-[1.0] text-white"
              initial={reduce ? false : { y: "110%" }}
              animate={reduce ? undefined : { y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.07 }}
            >
              {ch}
            </motion.span>
          </span>
        ))}
      </motion.div>

      <HeroInfo align="center" />
    </section>
  );
}
