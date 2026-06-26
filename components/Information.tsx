import { exhibition } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { Reveal, RevealItem } from "./Reveal";
import { LabelRule } from "./ui/primitives";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <RevealItem className="flex gap-4 border-b border-line py-4 last:border-0">
      <span className="w-16 shrink-0 text-[13px] text-ink-sub">{label}</span>
      <span className="text-[15px] leading-relaxed">{children}</span>
    </RevealItem>
  );
}

export function Information() {
  return (
    <section className="mx-auto w-full max-w-[430px] px-6">
      <SectionHeader en={["INFOR", "MATION"]} ko="전시 안내사항" />

      {/* 개념문 */}
      <Reveal className="mb-16">
        <RevealItem>
          <p className="text-[15px] leading-[1.85] text-ink/90">{exhibition.concept}</p>
        </RevealItem>
        <RevealItem>
          <p className="mt-6 text-right text-sm font-semibold text-accent">
            {exhibition.closing}
          </p>
        </RevealItem>
      </Reveal>

      {/* 일정 / 장소 */}
      <Reveal>
        <LabelRule>전시 정보</LabelRule>
        <Row label="기간">{exhibition.period}</Row>
        <Row label="시간">
          {exhibition.hours}
          <br />
          <span className="text-[13px] text-ink-sub">{exhibition.hoursSunday}</span>
        </Row>
        <Row label="장소">
          {exhibition.venue}
          <br />
          <span className="text-[13px] text-ink-sub">{exhibition.venueSub}</span>
        </Row>
        <Row label="주소">{exhibition.address}</Row>
        <Row label="인스타">
          {exhibition.instagram.map((h) => (
            <a
              key={h}
              href={`https://instagram.com/${h.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-3 text-accent"
            >
              {h}
            </a>
          ))}
        </Row>
      </Reveal>
    </section>
  );
}
