import { exhibition, transit, mapLinks } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { Reveal, RevealItem } from "./Reveal";
import { NaverMap } from "./NaverMap";
import { LabelRule, BlueBar, LinkButton } from "./ui/primitives";

export function Location() {
  return (
    <section className="mx-auto w-full max-w-[430px] px-6">
      <SectionHeader en={["LOCATION", "& PARKING"]} ko="오시는 길" />

      <Reveal>
        {/* 장소 */}
        <RevealItem className="mb-10 text-center">
          <p className="text-lg font-bold">{exhibition.venue}</p>
          <p className="mt-1 text-sm text-ink-sub">{exhibition.venueSub}</p>
          <p className="mt-3 text-[15px]">{exhibition.address}</p>
          <p className="text-[13px] text-ink-sub">구주소 · {exhibition.addressOld}</p>
        </RevealItem>

        {/* 네이버 지도 (Dynamic Map) */}
        <RevealItem className="mb-4 overflow-hidden rounded-2xl border border-line">
          <NaverMap />
        </RevealItem>
        <RevealItem className="mb-14 flex justify-center">
          <LinkButton href={mapLinks.naverDirections}>네이버 지도 길찾기 →</LinkButton>
        </RevealItem>
      </Reveal>

      {/* 지하철 */}
      <Reveal className="mb-14">
        <LabelRule>지하철</LabelRule>
        <RevealItem className="mb-4">
          <BlueBar>
            {transit.primary.line} {transit.primary.station}
          </BlueBar>
          <p className="mt-2 pl-3.5 text-[14px] text-ink/90">{transit.primary.detail}</p>
        </RevealItem>
        <div className="space-y-3 pl-3.5">
          {transit.others.map((t) => (
            <RevealItem key={`${t.line}-${t.station}`} className="text-[13px] leading-relaxed">
              <span className="font-semibold">
                {t.line} {t.station}
              </span>
              <br />
              <span className="text-ink-sub">{t.route}</span>
            </RevealItem>
          ))}
        </div>
      </Reveal>

      {/* 버스 */}
      <Reveal>
        <LabelRule>버스</LabelRule>
        <RevealItem>
          <BlueBar>{transit.bus.stop}</BlueBar>
          <p className="mt-2 pl-3.5 text-[14px] text-ink/90">
            {transit.bus.lines.join(" · ")}
          </p>
        </RevealItem>
      </Reveal>
    </section>
  );
}
