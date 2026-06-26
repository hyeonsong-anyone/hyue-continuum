# HANDOFF — CONTINUUM 모바일 초대장

## 상태: 1차 구현 완료 (빌드 0 에러, 모바일 검증)

### 검증 완료
- `npm run build` 0 에러 / TS 통과
- 모바일 390px 전 섹션 스크린샷 확인 (Hero / Information / Location / FoodSpots / GuestBook)
- 더보기 토글 동작 확인
- 방명록 미설정 시 GET 200(enabled:false) / POST 503 우아한 degrade
- security-reviewer 검토 → HIGH 대응: ① IP 솔트 기본값 제거(GUESTBOOK_IP_SALT 필수화) ② 신뢰 헤더(x-vercel-forwarded-for) 우선 ③ ip_hash/hidden 컬럼 REVOKE. TOCTOU rate-limit race는 저위험 공개 방명록 → best-effort + 관리자 숨김(hidden)으로 수용.

### 미해결 (게시 전 사용자 확인 필요)
1. 네이버 링크 중복(원본 카드 오류): 일식 어니언스 / 중식 용봉서울 둘 다 `naver.me/5O2vXbYX` — `lib/data.ts` `TODO_VERIFY` 주석. 올바른 링크 1개 필요.
2. Supabase 프로젝트/키 3개 + `GUESTBOOK_IP_SALT` 발급 → 방명록 활성화. 마이그레이션: `supabase/migrations/0001_guestbook.sql`.
3. QR 자산(온라인 전시 / 네이버지도) 원본·URL 미반영(현재 미삽입).

### Hero 키비주얼 (확정: 시안 A)
포스터 픽셀 복제는 비현실적이라 폐기. **웹 네이티브 키네틱**으로 전환 — `components/heroes/HeroKinetic.tsx`:
CONTINUUM 세로 3컬럼(외곽선/흰색/청색)이 위·아래로 흐름(교대 방향·속도, hover 정지, reduced-motion 폴백). accent `#1f44e8`.
시안 B(수직 리빌)/C(라이트 빔)는 `components/heroes/`에 보존, 비교 페이지 `/heroes`에서 확인 가능(C는 추후 결정 대기).

### 모바일 규격 프레임
PC 에서도 가운데 430px 프레임으로 표시(`app/globals.css .appframe`, `container-type: inline-size`). 폰트는 viewport(vw)가 아니라 프레임 폭(`cqw`) 기준 — 데스크톱에서 글자 안 커짐.

### Codex 요청
build/lint 재검증, 방명록 입력검증·RLS 재점검, reduced-motion 폴백 확인.
