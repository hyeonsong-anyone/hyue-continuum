"use client";

import { useEffect, useRef, useState } from "react";
import { venueGeo, venueLabel, mapLinks } from "@/lib/data";

// 도메인 제한이 걸린 공개 키 (Vercel env). 미설정/인증실패 시 링크로 우아하게 폴백.
const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
const SDK_ID = "naver-maps-sdk";

declare global {
  interface Window {
    naver?: { maps?: unknown };
    navermap_authFailure?: () => void;
  }
}

function openDirections() {
  window.open(mapLinks.naverDirections, "_blank", "noopener,noreferrer");
}

export function NaverMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(!CLIENT_ID);

  useEffect(() => {
    if (!CLIENT_ID) return;
    let cancelled = false;

    function init() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const naver = (window as any).naver;
      if (cancelled || !naver?.maps || !ref.current) return;

      const pos = new naver.maps.LatLng(venueGeo.lat, venueGeo.lng);
      const map = new naver.maps.Map(ref.current, {
        center: pos,
        zoom: 16,
        scrollWheel: false, // 페이지 스크롤 가로채지 않게
      });
      const marker = new naver.maps.Marker({ position: pos, map });

      // 지도 안 라벨(회관 이름) — 항상 표시
      const info = new naver.maps.InfoWindow({
        content: `<div style="padding:7px 11px;font-size:12px;line-height:1.4;color:#111;font-weight:700;white-space:nowrap;">${venueLabel}<br><span style="font-weight:500;color:#2447d4;">탭하면 네이버 길찾기 →</span></div>`,
        borderWidth: 0,
        backgroundColor: "#fff",
        anchorSize: new naver.maps.Size(10, 10),
        pixelOffset: new naver.maps.Point(0, -4),
      });
      info.open(map, marker);

      // 지도/마커/라벨 어디를 눌러도 길찾기로 이동
      naver.maps.Event.addListener(map, "click", openDirections);
      naver.maps.Event.addListener(marker, "click", openDirections);
    }

    window.navermap_authFailure = () => !cancelled && setFailed(true);

    if (window.naver?.maps) {
      init();
      return;
    }

    let script = document.getElementById(SDK_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SDK_ID;
      script.async = true;
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${CLIENT_ID}`;
      script.onerror = () => !cancelled && setFailed(true);
      document.head.appendChild(script);
    }
    script.addEventListener("load", init);

    return () => {
      cancelled = true;
      script?.removeEventListener("load", init);
    };
  }, []);

  if (failed) {
    return (
      <button
        type="button"
        onClick={openDirections}
        className="flex h-[230px] w-full flex-col items-center justify-center gap-1 bg-card text-accent"
      >
        <span className="text-[14px] font-semibold">{venueLabel}</span>
        <span className="text-[13px]">네이버 길찾기 →</span>
      </button>
    );
  }

  return <div ref={ref} className="h-[230px] w-full cursor-pointer" />;
}
