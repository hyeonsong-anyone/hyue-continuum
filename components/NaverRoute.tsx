"use client";

import { venueGeo, venueLabel } from "@/lib/data";

// 네이버 지도 웹 폴백 (장소 검색 → 모바일에선 앱 딥링크 유도)
const WEB_FALLBACK = `https://map.naver.com/p/search/${encodeURIComponent(
  "송파구민회관 예송미술관",
)}`;

/**
 * 네이버 지도 길찾기 열기.
 * - 모바일: 네이버 지도 앱 스킴(nmap://route)으로 길찾기 → 미설치/차단 시 웹으로 폴백
 * - 데스크톱: 네이버 지도 웹(장소)
 * (옛 index.nhn?menu=route 는 모바일에서 빈 '빠른길찾기' 입력창만 떠서 사용하지 않음)
 */
export function openNaverRoute() {
  if (typeof window === "undefined") return;

  const ua = navigator.userAgent || "";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);

  if (!isMobile) {
    window.open(WEB_FALLBACK, "_blank", "noopener,noreferrer");
    return;
  }

  const name = encodeURIComponent(venueLabel);
  const appName = window.location.hostname || "hyue-continuum";
  const appUrl = `nmap://route/public?dlat=${venueGeo.lat}&dlng=${venueGeo.lng}&dname=${name}&appname=${appName}`;

  // 앱이 열리면 페이지가 백그라운드로 → 폴백 취소. 안 열리면 1.4s 후 웹으로.
  const timer = window.setTimeout(() => {
    window.location.href = WEB_FALLBACK;
  }, 1400);
  const onHide = () => {
    if (document.hidden) window.clearTimeout(timer);
  };
  document.addEventListener("visibilitychange", onHide, { once: true });

  window.location.href = appUrl;
}

/** 네이버 길찾기 버튼 (accent 스타일). */
export function NaverRouteButton() {
  return (
    <button
      type="button"
      onClick={openNaverRoute}
      className="inline-flex items-center gap-1.5 rounded-full border border-accent/60 px-3.5 py-1.5 text-[13px] font-medium text-accent transition-colors hover:bg-accent hover:text-white"
    >
      네이버 지도 길찾기 →
    </button>
  );
}
