/**
 * signature_line 파서
 *
 * 입력: "입장 2,500엔 (사전 예매 권장) · 일몰 1시간 전 도착 · 옥상 사진존 무료"
 * 출력: [
 *   { text: "입장 2,500엔 (사전 예매 권장)", isPrice: true },
 *   { text: "일몰 1시간 전 도착", isPrice: false },
 *   { text: "옥상 사진존 무료", isPrice: false },
 * ]
 *
 * 가격 정의 = "숫자 + 엔" 또는 "숫자 + 円" 패턴.
 * "무료(free)"는 가격 의미상 0엔이지만 클릭해서 확인할 외부 정보가 없으므로
 * 의도적으로 isPrice=false 처리 → 일반 텍스트 렌더.
 */

export interface SignatureToken {
  text: string;
  isPrice: boolean;
}

// 숫자(콤마 포함) + 선택적 범위(~숫자) + 엔/円
// 예: 2,500엔 / 500엔 / 1,800엔 / 2,000~3,000엔 / 1,200엔~
const PRICE_RE = /\d[\d,]*\s*(?:~\s*\d[\d,]*)?\s*[엔円]/;

// trip_guide_v2의 signature_line은 ` · ` (공백+가운뎃점+공백)으로 토큰 구분.
// 일부 표기 변형 대응을 위해 양옆 공백은 유연하게 받는다.
const SEPARATOR_RE = /\s*·\s*/;

export function parseSignatureLine(line: string | undefined | null): SignatureToken[] {
  if (!line) return [];

  return line
    .split(SEPARATOR_RE)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((text) => ({
      text,
      isPrice: PRICE_RE.test(text),
    }));
}
