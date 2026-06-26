"use client";

import { useEffect, useRef, useState } from "react";
import { venueGeo, mapLinks } from "@/lib/data";

// 도메인 제한이 걸린 공개 키 (Vercel env). 미설정/인증실패 시 링크로 우아하게 폴백.
const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
const SDK_ID = "naver-maps-sdk";

declare global {
  interface Window {
    naver?: { maps?: unknown };
    navermap_authFailure?: () => void;
  }
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
      new naver.maps.Marker({ position: pos, map });
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
      <a
        href={mapLinks.naverDirections}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-[230px] w-full items-center justify-center bg-card text-[14px] text-accent"
      >
        네이버 지도에서 보기 →
      </a>
    );
  }

  return <div ref={ref} className="h-[230px] w-full" />;
}
