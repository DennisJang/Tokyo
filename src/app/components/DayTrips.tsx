import { useRef } from 'react';
import type { TripGuide, PlaceCard } from '../data/tripGuide';
import { PlaceCard as PlaceCardComponent } from './PlaceCard';

interface DayTripsProps {
  dayTrips: TripGuide['day_trips'];
  onCardClick: (card: PlaceCard) => void;
}

export function DayTrips({ dayTrips, onCardClick }: DayTripsProps) {
  return (
    <section className="relative bg-[#0d0d0d]">
      {/* Section cover */}
      <div className="relative" style={{ height: '70vh' }}>
        <img
          src={dayTrips.cover_image}
          alt="Day Trips"
          className="w-full h-full object-cover"
          style={{ filter: 'saturate(0.65)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#0d0d0d]" />

        {/* Section number */}
        <div className="absolute top-6 right-6">
          <span className="font-mono text-white/35 tracking-widest" style={{ fontSize: '11px' }}>11</span>
        </div>

        {/* Title block */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10">
          <h2
            className="text-white"
            style={{ fontSize: '36px', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.01em' }}
          >
            {dayTrips.title.ko}
          </h2>
          <p className="text-white/45 italic mt-2" style={{ fontSize: '14px' }}>
            {dayTrips.title.en}
          </p>
          <p className="text-white/55 italic mt-3" style={{ fontSize: '15px', lineHeight: 1.55 }}>
            "{dayTrips.subtitle_intent}"
          </p>
        </div>
      </div>

      {/* Visual differentiation — thin accent line */}
      <div className="mx-6 my-6 h-px bg-white/8" />

      {/* Subsections */}
      <div className="space-y-12 pb-16">
        {dayTrips.subsections.map((sub) => (
          <DayTripSubsection key={sub.id} subsection={sub} onCardClick={onCardClick} />
        ))}
      </div>
    </section>
  );
}

function DayTripSubsection({
  subsection,
  onCardClick,
}: {
  subsection: TripGuide['day_trips']['subsections'][0];
  onCardClick: (card: PlaceCard) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      {/* Subsection header */}
      <div className="px-5 mb-4">
        <h3 className="text-white" style={{ fontSize: '18px', fontWeight: 500, lineHeight: 1.3 }}>
          {subsection.name.ko}
        </h3>
        <p className="text-white/35" style={{ fontSize: '12px', marginTop: '2px' }}>
          {subsection.name.en}
        </p>
      </div>

      {/* Narrative */}
      <div className="px-5 mb-5">
        <p
          className="text-white/55 italic"
          style={{ fontSize: '15px', lineHeight: 1.65, borderLeft: '2px solid rgba(255,255,255,0.12)', paddingLeft: '14px' }}
        >
          "{subsection.narrative.ko}"
        </p>
      </div>

      {/* Horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-5 pb-2"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
      >
        {subsection.cards.map((card) => (
          <div
            key={card.id}
            className="shrink-0"
            style={{ width: '240px', scrollSnapAlign: 'start' }}
          >
            <DayTripCard card={card} onClick={onCardClick} />
          </div>
        ))}

        {/* Scroll cue */}
        <div className="shrink-0 w-16 flex items-center justify-center opacity-30">
          <span className="text-white/50" style={{ fontSize: '11px', writingMode: 'vertical-rl' }}>
            →
          </span>
        </div>
      </div>
    </div>
  );
}

function DayTripCard({ card, onClick }: { card: PlaceCard; onClick: (card: PlaceCard) => void }) {
  return (
    <button onClick={() => onClick(card)} className="w-full text-left">
      <div className="rounded-2xl overflow-hidden bg-[#161616]">
        <div style={{ aspectRatio: '3/2' }}>
          <img
            src={card.image}
            alt={card.name.ko}
            className="w-full h-full object-cover"
            style={{ filter: 'saturate(0.7)' }}
          />
        </div>
        <div className="px-3 pt-3 pb-3.5">
          <p className="text-white" style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.3 }}>
            {card.name.ko}
          </p>
          <p
            className="text-white/50 mt-1"
            style={{
              fontSize: '12px',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {card.one_liner.ko}
          </p>
        </div>
      </div>
    </button>
  );
}
