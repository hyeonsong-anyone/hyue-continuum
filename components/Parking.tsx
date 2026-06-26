import { parking } from "@/lib/data";
import { Reveal, RevealItem } from "./Reveal";
import { LabelRule, BlueBar } from "./ui/primitives";

export function Parking() {
  return (
    <section className="mx-auto w-full max-w-[430px] px-6 py-24">
      <Reveal>
        <LabelRule>주차 안내</LabelRule>
        <div className="space-y-7">
          {parking.map((lot) => (
            <RevealItem key={lot.name}>
              <BlueBar>{lot.name}</BlueBar>
              <ul className="mt-2 space-y-1 pl-3.5">
                {lot.fee.map((f) => (
                  <li key={f} className="text-[14px] text-ink/85">
                    {f}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
