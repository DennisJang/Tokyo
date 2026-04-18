import { useState, useRef } from 'react';
import { Map, ChevronUp, ChevronDown } from 'lucide-react';
import type { Chapter, PlaceCard } from '../data/tripGuide';

interface BottomMapSheetProps {
  chapter: Chapter;
  onPinTap?: (cardId: string) => void;
}

export function BottomMapSheet({ chapter, onPinTap }: BottomMapSheetProps) {
  const [expanded, setExpanded] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const delta = startY.current - currentY.current;
    if (delta > 40) setExpanded(true);
    if (delta < -40) setExpanded(false);
  };

  const { lat, lng } = chapter.cluster_center;

  // Build OSM embed URL
  const padding = 0.015;
  const bbox = `${lng - padding},${lat - padding},${lng + padding},${lat + padding}`;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div
      className="sticky bottom-0 left-0 right-0 z-30 bg-[#111111]/95 backdrop-blur-xl border-t border-white/8 rounded-t-3xl"
      style={{
        height: expanded ? '60vh' : '80px',
        transition: 'height 0.4s cubic-bezier(0.32,0.72,0,1)',
        overflow: 'hidden',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Handle + header row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-3.5"
      >
        <div className="flex items-center gap-3">
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="w-8 h-1 rounded-full bg-white/20" />
          <div className="w-1 h-1 rounded-full bg-white/20" />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20" />

        <div className="flex items-center gap-2">
          <Map size={13} className="text-white/40" />
          <span className="text-white/50" style={{ fontSize: '12px', letterSpacing: '0.06em' }}>
            {expanded ? '지도 닫기' : '지도 보기'}
          </span>
          {expanded
            ? <ChevronDown size={13} className="text-white/40" />
            : <ChevronUp size={13} className="text-white/40" />
          }
        </div>
      </button>

      {/* Map content */}
      {expanded && (
        <div className="relative w-full" style={{ height: 'calc(60vh - 60px)' }}>
          <iframe
            title={`map-chapter-${chapter.id}`}
            src={mapUrl}
            className="w-full h-full"
            style={{
              border: 'none',
              filter: 'invert(0.88) hue-rotate(200deg) saturate(0.25) brightness(0.85)',
            }}
          />

          {/* Pin list overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {chapter.cards.map((card: PlaceCard) => (
              <button
                key={card.id}
                onClick={() => onPinTap?.(card.id)}
                className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white/70 hover:text-white transition-colors"
                style={{ fontSize: '11px' }}
              >
                {card.name.ko}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
