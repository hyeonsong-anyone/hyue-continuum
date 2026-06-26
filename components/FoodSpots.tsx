"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { food, type FoodCategory, type FoodItem } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { LabelRule, NumberBadge, LinkButton } from "./ui/primitives";

function Item({ item, n }: { item: FoodItem; n: number }) {
  return (
    <div className="flex gap-3 border-b border-line py-4 last:border-0">
      <div className="pt-0.5">
        <NumberBadge n={n} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-bold">{item.name}</p>
        <p className="mt-1 text-[13px] text-ink-sub">{item.addr}</p>
        <p className="text-[13px] text-ink-sub">{item.hours}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-[12px] text-accent-soft">예송미술관에서 {item.dist}</span>
          <LinkButton href={item.link}>네이버 지도</LinkButton>
        </div>
      </div>
    </div>
  );
}

function Category({ cat }: { cat: FoodCategory }) {
  const [open, setOpen] = useState(false);
  const head = cat.items.slice(0, 3);
  const rest = cat.items.slice(3);

  return (
    <div className="mb-14">
      <LabelRule>{cat.label}</LabelRule>
      {head.map((it, i) => (
        <Item key={it.name} item={it} n={i + 1} />
      ))}

      <AnimatePresence initial={false}>
        {open &&
          rest.map((it, i) => (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Item item={it} n={head.length + i + 1} />
            </motion.div>
          ))}
      </AnimatePresence>

      {rest.length > 0 && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-4 w-full rounded-full border border-line py-2 text-[13px] text-ink-sub transition-colors hover:border-accent hover:text-accent"
        >
          {open ? "접기" : `더보기 (+${rest.length})`}
        </button>
      )}
    </div>
  );
}

export function FoodSpots() {
  return (
    <section className="mx-auto w-full max-w-[430px] px-6">
      <SectionHeader en={["NEARBY", "FOOD SPOTS"]} ko="인근 식당 정보" />
      <Reveal>
        {food.map((cat) => (
          <Category key={cat.key} cat={cat} />
        ))}
      </Reveal>
    </section>
  );
}
