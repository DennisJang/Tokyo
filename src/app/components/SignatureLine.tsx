import { ExternalLink } from 'lucide-react';
import { parseSignatureLine, type SignatureToken } from '../utils/signatureParser';

interface SignatureLineProps {
  /** 원본 signature_line 문자열 */
  line: string | undefined | null;
  /** Google Place ID — 가격 토큰을 링크로 만들 때 사용 */
  googlePlaceId: string | null | undefined;
  /** 장소명 — aria-label·툴팁용 */
  placeName?: string;
}

/**
 * Google Maps URL 빌더.
 * trip_guide_v2의 google_place_id는 Google Places API의 PlaceID와 동일.
 * 사용자가 요청한 패턴 그대로 사용.
 */
function googleMapsUrl(placeId: string): string {
  return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
}

/**
 * signature_line 렌더러.
 *
 * 가격 토큰(예: "입장 2,500엔") → Google Maps 링크 (장소 페이지로).
 * Affordance: 가격 텍스트 옆에 작은 외부 링크 아이콘.
 * 카피: "최신 가격 확인"은 부정확 (Maps에 가격이 항상 있진 않음) → 아이콘만.
 *
 * place_id가 없으면 모든 토큰이 일반 텍스트 (graceful degradation).
 */
export function SignatureLine({ line, googlePlaceId, placeName }: SignatureLineProps) {
  const tokens = parseSignatureLine(line);
  if (tokens.length === 0) return null;

  const canLink = Boolean(googlePlaceId);
  const url = googlePlaceId ? googleMapsUrl(googlePlaceId) : null;

  return (
    <p
      className="text-white/55"
      style={{
        fontSize: '13px',
        lineHeight: 1.65,
        wordBreak: 'keep-all', // 한국어 단어 단위 줄바꿈
      }}
    >
      {tokens.map((tok, i) => (
        <span key={i}>
          {i > 0 && <span className="text-white/25 mx-1.5">·</span>}
          {tok.isPrice && canLink ? (
            <a
              href={url!}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/20 underline-offset-[3px] hover:decoration-white/60 transition-colors inline-flex items-baseline gap-1"
              aria-label={`${placeName ?? ''} ${tok.text} — Google Maps에서 확인`}
              onClick={(e) => e.stopPropagation()}
            >
              {tok.text}
              <ExternalLink size={10} className="text-white/35 inline-block translate-y-[1px]" aria-hidden />
            </a>
          ) : (
            <span>{tok.text}</span>
          )}
        </span>
      ))}
    </p>
  );
}
