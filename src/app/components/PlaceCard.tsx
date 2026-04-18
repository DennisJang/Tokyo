import type { PlaceCard as PlaceCardType } from '../data/tripGuide';

interface PlaceCardProps {
  card: PlaceCardType;
  onClick: (card: PlaceCardType) => void;
  chapterIndex?: number;
}

export function PlaceCard({ card, onClick }: PlaceCardProps) {
  const isLowConfidence = card.confidence < 0.6;

  return (
    <button
      onClick={() => onClick(card)}
      className="w-full text-left bg-transparent border-0 p-0"
    >
      <div
        className="rounded-2xl overflow-hidden bg-[#161616]"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
      >
        {/* Image — 3:2 ratio */}
        <div className="relative" style={{ aspectRatio: '3/2' }}>
          <img
            src={card.image}
            alt={card.name.ko}
            className="w-full h-full object-cover"
            style={{
              filter: isLowConfidence ? 'saturate(0.9)' : undefined,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Mention count badge */}
          {card.mention_count >= 2 && (
            <div className="absolute top-3 right-3">
              <span
                className="font-mono text-white/50 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded"
                style={{ fontSize: '10px' }}
              >
                ×{card.mention_count}
              </span>
            </div>
          )}

          {/* Low confidence indicator */}
          {isLowConfidence && (
            <div className="absolute bottom-3 left-3">
              <span
                className="text-white/40 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded"
                style={{ fontSize: '9px', letterSpacing: '0.04em' }}
              >
                ⓘ 단일 출처
              </span>
            </div>
          )}
        </div>

        {/* Card content */}
        <div className="px-4 pt-3.5 pb-4 space-y-1.5">
          {/* Name */}
          <div>
            <h3 className="text-white" style={{ fontSize: '22px', fontWeight: 500, lineHeight: 1.2 }}>
              {card.name.ko}
            </h3>
            <p className="text-white/40 mt-0.5" style={{ fontSize: '12px', lineHeight: 1.4 }}>
              {card.name.romaji} · {card.name.native}
            </p>
          </div>

          {/* One liner */}
          <p
            className="text-white/65"
            style={{
              fontSize: '14px',
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {card.one_liner.ko}
          </p>

          {/* Signature line — small, muted, em-dash separator
              · 단일 button 안이므로 가격 링크는 여기선 비활성. 상세 시트에서만 링크.
              · word-break: keep-all로 한국어 단어 단위 줄바꿈 (가운뎃점에서 자연스럽게 끊김) */}
          {card.signature_line && (
            <p
              className="text-white/45"
              style={{
                fontSize: '12px',
                lineHeight: 1.55,
                marginTop: '6px',
                wordBreak: 'keep-all',
              }}
            >
              {card.signature_line}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {card.theme_tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full border border-white/10 text-white/40"
                style={{ fontSize: '10px', letterSpacing: '0.03em' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
