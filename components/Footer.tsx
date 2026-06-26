import { exhibition } from "@/lib/data";

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-3 px-6 py-20 text-center">
      <p className="display text-2xl tracking-tight">{exhibition.title}</p>
      <p className="max-w-[280px] text-[10px] leading-relaxed tracking-[0.1em] text-ink-sub">
        {exhibition.hostEn}
      </p>
      <p className="text-[12px] text-ink-sub">
        {exhibition.instagram.join("  ·  ")}
      </p>
    </footer>
  );
}
