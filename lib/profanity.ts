/**
 * 간단 금칙어 필터 (한/영). 완벽한 차단이 아니라 명백한 욕설·비방의 1차 차단용.
 * 우회를 모두 막지는 못하므로 신고/관리 기능과 병행 운영을 전제로 한다.
 */
const BANNED = [
  // 한국어
  "씨발", "시발", "씨바", "ㅅㅂ", "병신", "ㅂㅅ", "지랄", "ㅈㄹ", "개새", "새끼",
  "좆", "좃", "썅", "엿먹", "꺼져", "닥쳐", "fuck", "shit", "bitch", "asshole",
];

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^0-9a-z가-힣ㄱ-ㅎ]/g, "");

export function containsProfanity(text: string): boolean {
  const n = normalize(text);
  return BANNED.some((w) => n.includes(normalize(w)));
}
