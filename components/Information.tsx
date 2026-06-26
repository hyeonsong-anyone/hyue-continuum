import { exhibition, timeTable, onlineExhibition } from "@/lib/data";
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
      <SectionHeader en={["INFORMATION"]} ko="전시 안내사항" />

      {/* 개념문 */}
      <Reveal className="mb-16">
        <RevealItem>
          <p className="text-[15px] leading-[1.85] text-ink/90">{exhibition.concept}</p>
        </RevealItem>
      </Reveal>

      {/* 일정 / 장소 */}
      <Reveal>
        <LabelRule>전시 정보</LabelRule>
        <Row label="기간">{exhibition.period}</Row>
        <Row label="시간">
          {exhibition.schedule.map((s) => (
            <span key={s.day} className="block leading-relaxed">
              <span className="text-ink-sub">{s.day}</span>&nbsp;&nbsp;{s.time}
            </span>
          ))}
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

      {/* 타임테이블 */}
      <Reveal className="mt-16">
        <LabelRule>타임테이블 · {timeTable.date}</LabelRule>
        <div className="space-y-3">
          {timeTable.items.map((it) => (
            <RevealItem key={it.label} className="flex items-baseline gap-4">
              <span className="w-28 shrink-0 text-[14px] font-semibold text-accent-soft">
                {it.time}
              </span>
              <span className="text-[15px]">{it.label}</span>
            </RevealItem>
          ))}
        </div>
      </Reveal>

      {/* 온라인 전시 */}
      <Reveal className="mt-16">
        <LabelRule>온라인 전시</LabelRule>
        <RevealItem>
          <a
            href={onlineExhibition.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-line bg-card p-4 transition-colors hover:border-accent"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={onlineExhibition.qr}
              alt="온라인 전시 QR"
              className="h-24 w-24 shrink-0 rounded-lg bg-white p-1.5"
            />
            <span className="flex flex-col gap-1">
              <span className="text-[15px] font-semibold">ONLINE EXHIBITION</span>
              <span className="text-[13px] text-ink-sub">
                QR을 스캔하거나 탭하면 온라인 전시로 이동합니다
              </span>
              <span className="mt-1 text-[13px] text-accent">바로가기 →</span>
            </span>
          </a>
        </RevealItem>
      </Reveal>
    </section>
  );
}
