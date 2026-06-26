import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
  weight: "45 920",
});

// 영문 대형 헤더용 그로테스크 (헬베티카풍). 정확한 Helvetica가 필요하면
// public/fonts에 라이선스 woff2를 넣고 이 변수만 교체하면 됨.
const displayEn = Inter({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display-en",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CONTINUUM — 2026 한양대학교 ERICA 건축학부 졸업전시",
  description:
    "2026 한양대학교 ERICA 건축학부 졸업전시 CONTINUUM에 초대합니다. 2026.07.04–07.08, 송파예술문화회관 예송미술관 제1·2관.",
  openGraph: {
    title: "CONTINUUM — 2026 한양대 ERICA 건축학부 졸업전시",
    description:
      "2026.07.04–07.08 · 송파예술문화회관 예송미술관 제1·2관. 끊임없이 이어져 온 흐름 위의 한 단면.",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1414, height: 1999, alt: "CONTINUUM 2026 한양대 ERICA 건축학부 졸업전시" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CONTINUUM — 2026 한양대 ERICA 건축학부 졸업전시",
    description: "2026.07.04–07.08 · 송파예술문화회관 예송미술관 제1·2관.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05060c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${displayEn.variable}`}>
      <body>
        <div className="appframe">{children}</div>
      </body>
    </html>
  );
}
