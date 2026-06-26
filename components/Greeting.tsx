import { greeting } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { Reveal, RevealItem } from "./Reveal";

export function Greeting() {
  return (
    <section className="mx-auto w-full max-w-[430px] px-6">
      <SectionHeader en={["INVITATION"]} ko="초대의 글" />

      <Reveal>
        <div className="space-y-5">
          {greeting.body.map((para, i) => (
            <RevealItem key={i}>
              <p className="text-[15px] leading-[1.9] text-ink/90">{para}</p>
            </RevealItem>
          ))}
        </div>

        {/* 서명 */}
        <RevealItem className="mt-10">
          <div className="ml-auto h-px w-12 bg-accent" />
          <div className="mt-4 text-right">
            <p className="text-[13px] text-ink-sub">{greeting.date}</p>
            <p className="mt-2 text-[13px] text-ink-sub">{greeting.role}</p>
            <p className="mt-1 text-lg font-bold tracking-tight">{greeting.signer}</p>
          </div>
        </RevealItem>
      </Reveal>
    </section>
  );
}
