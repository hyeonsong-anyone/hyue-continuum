# CONTINUUM — 2026 한양대 ERICA 건축학부 졸업전시 모바일 초대장

인스타 카드뉴스 18장 기반의 모바일 세로 스크롤 웹 초대장. 디자인 토큰·폰트·여백을 카드와 동일하게 맞춤.

## 스택
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Supabase(방명록)

## 섹션
Hero(시안 A · 세로 키네틱 타이포) → INFORMATION → LOCATION → PARKING → NEARBY FOOD SPOTS → GUESTBOOK(축하 방명록) → Footer

> 전체 페이지는 PC 에서도 가운데 **430px 모바일 프레임**으로 표시(`.appframe`, 폰트는 `cqw` 기준).
> 히어로 시안 비교 페이지: `/heroes` (A 확정, B·C 보존 — C는 추후 결정).

## 실행
```bash
npm install
cp .env.example .env        # Supabase 키 입력 (방명록용; 없어도 나머지는 동작)
npm run dev                 # http://localhost:3000
npm run build
```

## 방명록 (Supabase)
1. Supabase 프로젝트 생성 → `supabase/migrations/0001_guestbook.sql` 적용
2. `.env` 에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GUESTBOOK_IP_SALT`(랜덤) 설정
3. 4개 미설정 시 방명록 작성은 503으로 우아하게 비활성, 나머지 페이지는 정상

## 디자인 토큰 (app/globals.css)
- bg: `#0a0e1a → #000` 그라데이션 / accent: `#1f44e8`(카드 원본 스포이드) / text `#fff`, sub `#8a8f99`
- 폰트: 한글 Pretendard(self-host) + 영문 디스플레이 Inter(`--font-display-en`, 스왑 가능)

> ⚠️ 게시 전 확인: 어니언스/용봉서울 네이버 링크 중복(원본 카드 오류), QR 자산, Supabase 키. 상세는 `.claude/handoff/` 또는 PROJECT 메모 참조.
