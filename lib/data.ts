/**
 * CONTINUUM 졸업전시 초대장 단일 데이터 소스 (초대장 핵심만).
 * 카드뉴스 18장 + JSON 원본에서 검증 후 발췌. 작품37/참여학생/위원회 명단은 범위 제외.
 */

export const exhibition = {
  title: "CONTINUUM",
  host: "2026 한양대학교 ERICA 건축학부 졸업전시",
  hostEn: "2026 HANYANG UNIV. ERICA SCHOOL OF ARCHITECTURE GRADUATION EXHIBITION",
  period: "2026.07.04 — 07.07",
  periodFrom: "2026.07.04",
  periodTo: "07.07",
  hours: "10AM – 20PM",
  // 07.04(토)~07.07(화) 중 일요일은 07.05 하루 → 그 날만 19시 마감
  hoursSunday: "07.05 (일) 10AM – 19PM",
  venue: "송파예술문화회관 예송미술관 제1·2관",
  venueSub: "송파구민회관 1층",
  address: "서울시 송파구 백제고분로 242",
  addressOld: "삼전동 62-2",
  concept:
    "2026 한양대학교 ERICA 건축학과 졸업전시 CONTINUUM은 끊임없이 이어져 온 시간과 사유, 그리고 설계의 과정 속에서 드러난 하나의 단면을 공유하는 자리이다. 각자의 작업은 서로 다른 방향을 향하지만, 모두 건축이라는 연속된 흐름 위에 놓여있다. 이 전시는 흐름 위에 잠시 드러난 하나의 좌표이며 하나의 단면이다. 우리가 지금 어디에 서 있는지, 어떤 질문을 붙들고 있는지를 드러내는 순간이며 연속은 계속된다.",
  closing: "연속은 계속된다",
  instagram: ["@HYUE.GRAD", "@HYUESOA"],
} as const;

export type TransitItem = { line: string; station: string; route: string };

export const transit = {
  primary: {
    line: "9호선",
    station: "석촌고분역",
    detail: "4번 출구에서 출구방향으로 약 270m 직진",
  },
  others: [
    { line: "2호선", station: "잠실역", route: "5번출구 → 3314·3315번 버스 환승 → 송파구민회관 하차" },
    { line: "2호선", station: "종합운동장역", route: "4번출구 → 350·3314·3322·3417번 버스 환승 → 송파구민회관 하차" },
    { line: "3호선", station: "학여울역", route: "1번출구 → 3012번 버스 환승 → 송파구민회관 하차" },
    { line: "8호선", station: "석촌역", route: "7번출구 200m 직진 → 340·350·3012번 버스 환승 → 송파구민회관 하차" },
  ] as TransitItem[],
  bus: {
    stop: "송파구민회관·구의회 정류장 하차",
    lines: ["340", "350", "3314", "3322", "3417", "3420", "송파03"],
  },
};

export type ParkingLot = { name: string; fee: string[] };

export const parking: ParkingLot[] = [
  { name: "송파문화예술회관·구의회 주차장", fee: ["최초 30분 무료", "이후 5분당 300원"] },
  { name: "삼전동 주민센터 주차장", fee: ["위 주차장 만차 시 이용 가능"] },
  { name: "삼전근린공원 공영주차장", fee: ["5분당 150원", "1시간 1,800원"] },
];

export type FoodItem = {
  name: string;
  addr: string;
  hours: string;
  dist: string;
  link: string;
};

export type FoodCategory = { key: string; label: string; items: FoodItem[] };

// 거리(예송미술관 기준) 정렬 유지. 카테고리당 상위 3 노출 + 더보기.
export const food: FoodCategory[] = [
  {
    key: "korean",
    label: "한식",
    items: [
      { name: "돈족골", addr: "송파구 삼학사로 66", hours: "매일 9:30–23:00", dist: "458m · 도보 8분", link: "https://naver.me/FlBPaPEM" },
      { name: "윤국밥 본점", addr: "송파구 삼학사로 65", hours: "24시간 영업", dist: "415m · 도보 7분", link: "https://naver.me/5YoiY99N" },
      { name: "주은감자탕", addr: "송파구 삼학사로 71", hours: "7:20–23:50 (화 휴무)", dist: "457m · 도보 8분", link: "https://naver.me/GqfJt8rG" },
      { name: "지호한방삼계탕 삼전동점", addr: "송파구 삼학사로 73 은일빌딩", hours: "10:30–22:00 (브레이크 16:00–17:00)", dist: "460m · 도보 8분", link: "https://naver.me/FiPiaED3" },
      { name: "양양집", addr: "송파구 삼학사로 83 1층", hours: "24시간 영업", dist: "561m · 도보 9분", link: "https://naver.me/GFsTZpR8" },
      { name: "청담동순도리 석촌호수점", addr: "송파구 삼학사로 92 1층", hours: "매일 11:00–04:00", dist: "721m · 도보 12분", link: "https://naver.me/5jXC32HT" },
    ],
  },
  {
    key: "japanese",
    label: "일식",
    items: [
      { name: "마츠미 석촌호수본점", addr: "송파구 백제고분로 262", hours: "11:30–21:00 (브레이크 15:00–17:00 / 일 휴무)", dist: "200m · 도보 3분", link: "https://naver.me/GtURne9C" },
      { name: "어니언스 석촌호수", addr: "송파구 삼학사로 51", hours: "11:30–21:00 (브레이크 15:00–17:00 / 일 휴무)", dist: "373m · 도보 5분", link: "https://naver.me/x3cDdXyg" },
      { name: "야키토리 나니야", addr: "송파구 삼전로 16", hours: "18:00–01:00 (월 휴무)", dist: "495m · 도보 7분", link: "https://naver.me/x5GolclU" },
    ],
  },
  {
    key: "chinese",
    label: "중식",
    items: [
      { name: "용봉서울", addr: "송파구 삼학사로 52 나래울빌딩", hours: "10:00–21:00", dist: "389m · 도보 5분", link: "https://naver.me/502vXbYX" },
      { name: "다래연 삼전점", addr: "송파구 백제고분로 21길 10", hours: "11:00–22:00 (일 휴무)", dist: "465m · 도보 7분", link: "https://naver.me/FlZkvlBn" },
      { name: "형제짬뽕", addr: "송파구 삼전로 10길 68", hours: "11:00–20:20 (브레이크 15:00–16:00)", dist: "543m · 도보 9분", link: "https://naver.me/F0z2OhWR" },
    ],
  },
  {
    key: "western",
    label: "양식",
    items: [
      { name: "시골남자파스타 본점", addr: "송파구 백제고분로 33길 13", hours: "09:30–21:30", dist: "682m · 도보 11분", link: "https://naver.me/F2ZuKpxs" },
      { name: "피제리아 다붓", addr: "송파구 백제고분로 36길 30", hours: "11:30–21:00 (브레이크 15:00–17:00 / 화 휴무)", dist: "719m · 도보 11분", link: "https://naver.me/G9r5RPIP" },
      { name: "피제리아 모모", addr: "송파구 삼학사로 18길 13", hours: "11:30–21:30 (브레이크 15:00–17:00 / 화 휴무)", dist: "886m · 도보 11분", link: "https://naver.me/x6JgORhM" },
    ],
  },
  {
    key: "cafe",
    label: "카페",
    items: [
      { name: "버터앤쉘터", addr: "송파구 백제고분로 266", hours: "10:30–22:00", dist: "234m · 도보 3분", link: "https://naver.me/F0AXgQkp" },
      { name: "맨들러", addr: "송파구 백제고분로 208", hours: "09:00–22:00", dist: "322m · 도보 4분", link: "https://naver.me/5EUZFE9b" },
      { name: "마루미 베이글", addr: "송파구 삼학사로 42-1", hours: "08:00–16:00", dist: "488m · 도보 7분", link: "https://naver.me/GxL1dmHz" },
    ],
  },
];

// 전시장 좌표 (예송미술관, 백제고분로 242 — Nominatim 확인)
export const venueGeo = { lat: 37.5020614, lng: 127.0932646 };
export const venueLabel = "송파구민회관 예송미술관 제1·2관";

// 네이버 길찾기 — 도착지(전시장) 좌표/이름만 지정 (출발지는 사용자 현위치/직접 입력)
export const mapLinks = {
  naverDirections:
    "https://map.naver.com/index.nhn?menu=route&pathType=1" +
    `&etext=${encodeURIComponent(venueLabel)}` +
    `&elng=${venueGeo.lng}&elat=${venueGeo.lat}`,
};
