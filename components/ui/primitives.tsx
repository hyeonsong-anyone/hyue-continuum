import type { ReactNode } from "react";

/** 섹션 라벨 + 우측으로 뻗는 헤어라인 (한식당 ──────). */
export function LabelRule({ children }: { children: ReactNode }) {
  return (
    <div className="label-rule mb-8">
      <span className="text-base font-bold tracking-tight">{children}</span>
    </div>
  );
}

/** accent 세로 바 + 볼드 서브라벨 (▍승용차). */
export function BlueBar({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="inline-block h-4 w-1 rounded-sm bg-accent" />
      <span className="text-[15px] font-semibold">{children}</span>
    </div>
  );
}

/** accent 외곽선 원형 숫자 ①. */
export function NumberBadge({ n }: { n: number }) {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent text-[11px] font-bold text-accent">
      {n}
    </span>
  );
}

/** accent 링크/길찾기 버튼. */
export function LinkButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-accent/60 px-3.5 py-1.5 text-[13px] font-medium text-accent transition-colors hover:bg-accent hover:text-white"
    >
      {children}
    </a>
  );
}
