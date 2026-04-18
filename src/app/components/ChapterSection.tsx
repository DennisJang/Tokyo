import { useRef } from 'react';
import type { Chapter, PlaceCard } from '../data/tripGuide';
import { PlaceCard as PlaceCardComponent } from './PlaceCard';
import { BottomMapSheet } from './BottomMapSheet';

interface ChapterSectionProps {
  chapter: Chapter;
  chapterIndex: number;
  totalChapters: number;
  onCardClick: (card: PlaceCard) => void;
}

export function ChapterSection({ chapter, chapterIndex, totalChapters, onCardClick }: ChapterSectionProps) {
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handlePinTap = (cardId: string) => {
    const el = cardRefs.current[cardId];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Format chapter number e.g. "02 / 11"
  const chapterNum = String(chapter.order).padStart(2, '0');
  const totalNum = String(totalChapters + 2).padStart(2, '0');

  const placeCount = chapter.cards.length;
  const tagSummary = [...new Set(chapter.cards.flatMap(c => c.theme_tags))].slice(0, 3).join(' · ');

  return (
    <section className="relative bg-[#0a0a0a]">
      {/* Chapter Cover */}
      <div className="relative" style={{ height: '90vh', minHeight: '500px' }}>
        <img
          src={chapter.cover_image}
          alt={chapter.title_large.primary}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-[#0a0a0a]" />

        {/* Chapter number — top right */}
        <div className="absolute top-6 right-6">
          <span className="font-mono text-white/40 tracking-widest" style={{ fontSize: '11px' }}>
            {chapterNum} / {totalNum}
          </span>
        </div>

        {/* Title block — bottom of cover */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10">
          {/* Native */}
          <p className="text-white/50" style={{ fontSize: '12px', marginBottom: '4px' }}>
            {chapter.title_large.native}
          </p>

          {/* Large primary title */}
          <h2
            className="text-white"
            style={{
              fontSize: '48px',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {chapter.title_large.primary}
          </h2>

          {/* Local (roman) */}
          <p className="text-white/50 italic mt-1" style={{ fontSize: '14px' }}>
            {chapter.title_large.local}
          </p>

          {/* Subtitle intent */}
          <p className="text-white/65 italic mt-3" style={{ fontSize: '16px', lineHeight: 1.55 }}>
            "{chapter.subtitle_intent}"
          </p>

          {/* Divider + meta */}
          <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
            <span className="text-white/45" style={{ fontSize: '12px', letterSpacing: '0.02em' }}>
              {placeCount} places · {tagSummary}
            </span>
          </div>
        </div>
      </div>

      {/* Card Stack */}
      <div className="px-4 pt-8 pb-4 space-y-5">
        {chapter.cards.map((card) => (
          <div
            key={card.id}
            ref={(el) => { cardRefs.current[card.id] = el; }}
          >
            <PlaceCardComponent
              card={card}
              onClick={onCardClick}
            />
          </div>
        ))}
      </div>

      {/* Bottom Map Sheet */}
      <BottomMapSheet chapter={chapter} onPinTap={handlePinTap} />
    </section>
  );
}