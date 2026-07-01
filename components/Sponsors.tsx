import { sponsors } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { Reveal, RevealItem } from "./Reveal";

export function Sponsors() {
  return (
    <section className="mx-auto w-full max-w-[430px] px-6 pb-8">
      <SectionHeader en={["SPONSORS"]} ko="후원사" />

      <Reveal>
        <div className="grid grid-cols-3 gap-3">
          {sponsors.map((s) => (
            <RevealItem key={s.src} className="aspect-square">
              <div
                className={`flex h-full w-full items-center justify-center rounded-full ${
                  s.dark ? "bg-black" : "bg-white"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.name}
                  className="object-contain"
                  style={{ maxWidth: `${s.scale}%`, maxHeight: `${s.scale}%` }}
                />
              </div>
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
