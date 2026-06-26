import { Reveal, RevealItem } from "./Reveal";

/**
 * 좌측 정렬 섹션 제목. accent 키커(한글 라벨) + 대형 영문 타이틀.
 * 진입 시 Reveal(검증된 whileInView 메커니즘)로 페이드업 — 항상 표시 보장.
 */
export function SectionHeader({
  en,
  ko,
}: {
  en: string[]; // 줄 단위 (예: ["NEARBY", "FOOD SPOTS"])
  ko: string;
}) {
  return (
    <Reveal className="pb-12 pt-28">
      <RevealItem className="mb-4 flex items-center gap-2.5">
        <span className="h-3.5 w-1 rounded-sm bg-accent" />
        <span className="text-[13px] font-semibold tracking-wide text-accent">
          {ko}
        </span>
      </RevealItem>
      <RevealItem>
        <h2 className="display text-left text-[clamp(2.2rem,12cqw,3.4rem)]">
          {en.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
      </RevealItem>
    </Reveal>
  );
}
