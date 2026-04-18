import { useEffect, useRef, useState } from 'react';
import { X, MapPin, Clock, Copy, Check, ExternalLink } from 'lucide-react';
import type { PlaceCard } from '../data/tripGuide';
import { SignatureLine } from './SignatureLine';

interface CardDetailSheetProps {
  card: PlaceCard | null;
  onClose: () => void;
}

export function CardDetailSheet({ card, onClose }: CardDetailSheetProps) {
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    if (card) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [card]);

  const handleCopy = () => {
    if (card) {
      navigator.clipboard.writeText(card.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
    const delta = currentY.current - startY.current;
    if (delta > 0 && sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${delta}px)`;
    }
  };

  const handleTouchEnd = () => {
    const delta = currentY.current - startY.current;
    if (delta > 100) {
      onClose();
    } else if (sheetRef.current) {
      sheetRef.current.style.transform = '';
    }
  };

  const openMaps = () => {
    if (!card) return;
    // Place ID가 있으면 그쪽으로, 없으면 좌표로 fallback
    const url = card.google_place_id
      ? `https://www.google.com/maps/place/?q=place_id:${card.google_place_id}`
      : `https://maps.google.com/?q=${card.coordinates.lat},${card.coordinates.lng}`;
    window.open(url, '_blank');
  };

  if (!card) return null;

  const isLowConfidence = card.confidence < 0.6;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.2s ease' }}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#111111] rounded-t-[24px] overflow-hidden"
        style={{
          height: '90vh',
          maxWidth: '430px',
          margin: '0 auto',
          transition: 'transform 0.3s cubic-bezier(0.32,0.72,0,1)',
          animation: 'slideUp 0.35s cubic-bezier(0.32,0.72,0,1)',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="overflow-y-auto h-full pb-12">
          {/* Hero image */}
          <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
            <img
              src={card.image}
              alt={card.name.ko}
              className="w-full h-full object-cover"
              style={{ filter: isLowConfidence ? 'saturate(0.9)' : undefined }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            {/* Lang toggle */}
            <button
              onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
              className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/60 hover:text-white transition-colors"
              style={{ fontSize: '11px', letterSpacing: '0.08em' }}
            >
              {lang === 'ko' ? 'EN' : 'KO'}
            </button>

            {/* Mention badge */}
            {card.mention_count >= 2 && (
              <div className="absolute bottom-4 right-4 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm">
                <span className="text-white/60 font-mono" style={{ fontSize: '10px' }}>
                  ×{card.mention_count}
                </span>
              </div>
            )}
          </div>

          {/* Title block */}
          <div className="px-6 pt-5 space-y-1">
            <h2 className="text-white" style={{ fontSize: '28px', fontWeight: 500, lineHeight: 1.2 }}>
              {card.name.ko}
            </h2>
            <p className="text-white/50 italic" style={{ fontSize: '14px' }}>
              {card.name.romaji}
            </p>
            <p className="text-white/35" style={{ fontSize: '12px' }}>
              {card.name.native}
            </p>
          </div>

          {/* One-liner */}
          <div className="px-6 mt-4">
            <p className="text-white/75" style={{ fontSize: '16px', lineHeight: 1.65 }}>
              {lang === 'ko' ? card.one_liner.ko : (card.one_liner.en ?? card.one_liner.ko)}
            </p>
          </div>

          {/* Signature line — 가격은 Google Maps 링크 (★ 신규) */}
          {card.signature_line && (
            <div className="px-6 mt-3">
              <SignatureLine
                line={card.signature_line}
                googlePlaceId={card.google_place_id}
                placeName={card.name.ko}
              />
            </div>
          )}

          {/* Hairline divider */}
          <div className="mx-6 mt-5 h-px bg-white/8" />

          {/* Metadata */}
          <div className="px-6 mt-5 space-y-4">
            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin size={14} className="text-white/40 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white/60" style={{ fontSize: '13px', lineHeight: 1.5 }}>
                  {card.address}
                </p>
              </div>
              <button
                onClick={handleCopy}
                className="shrink-0 text-white/30 hover:text-white/60 transition-colors"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3">
              <Clock size={14} className="text-white/40 mt-0.5 shrink-0" />
              <p className="text-white/60" style={{ fontSize: '13px', lineHeight: 1.5 }}>
                {card.hours}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="px-6 mt-4 flex flex-wrap gap-2">
            {card.theme_tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full border border-white/12 text-white/45"
                style={{ fontSize: '10px', letterSpacing: '0.04em' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Mini map */}
          <div className="px-6 mt-6">
            <button
              onClick={openMaps}
              className="w-full rounded-2xl overflow-hidden relative group"
              style={{ height: '160px' }}
            >
              <iframe
                title={`map-${card.id}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${card.coordinates.lng - 0.005},${card.coordinates.lat - 0.003},${card.coordinates.lng + 0.005},${card.coordinates.lat + 0.003}&layer=mapnik&marker=${card.coordinates.lat},${card.coordinates.lng}`}
                className="w-full h-full"
                style={{ border: 'none', filter: 'invert(0.9) hue-rotate(200deg) saturate(0.3) brightness(0.8)', pointerEvents: 'none' }}
              />
              <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 text-white/80 backdrop-blur-sm" style={{ fontSize: '12px' }}>
                  <ExternalLink size={11} />
                  Maps에서 열기
                </span>
              </div>
            </button>
          </div>

          {/* Low confidence signal */}
          {isLowConfidence && (
            <div className="mx-6 mt-4 px-3 py-2 rounded-xl bg-white/4 border border-white/8">
              <p className="text-white/35" style={{ fontSize: '11px' }}>
                ⓘ 단일 출처 — 정보 신뢰도가 다른 장소보다 낮을 수 있습니다
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
