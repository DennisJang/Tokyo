import { ChevronDown } from 'lucide-react';

interface IssueCoverProps {
  title: string;
  tagline: { ko: string; en: string };
  coverImage: string;
  onEnter: () => void;
}

export function IssueCover({ title, tagline, coverImage, onEnter }: IssueCoverProps) {
  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
      onClick={onEnter}
    >
      {/* Background */}
      <img
        src={coverImage}
        alt="Tokyo"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <p
          className="text-white/40 tracking-[0.5em] uppercase mb-6"
          style={{ fontSize: '10px', letterSpacing: '0.5em' }}
        >
          DIGITAL TRAVEL MAGAZINE
        </p>

        <h1
          className="text-white tracking-[0.22em]"
          style={{
            fontSize: 'clamp(72px, 22vw, 120px)',
            fontWeight: 700,
            letterSpacing: '0.18em',
            lineHeight: 1,
          }}
        >
          {title}
        </h1>

        <div className="mt-6 h-px w-16 bg-white/30" />

        <p className="text-white/60 mt-5" style={{ fontSize: '13px', lineHeight: 1.6 }}>
          {tagline.ko}
        </p>
        <p className="text-white/35 italic mt-1" style={{ fontSize: '12px' }}>
          {tagline.en}
        </p>

        <div className="mt-14 flex flex-col items-center gap-2 opacity-50">
          <p className="text-white/60" style={{ fontSize: '11px', letterSpacing: '0.12em' }}>
            아래로 스크롤
          </p>
          <ChevronDown size={16} className="text-white/50 animate-bounce" />
        </div>
      </div>

      {/* Issue date */}
      <div className="absolute bottom-6 right-6">
        <span className="font-mono text-white/25" style={{ fontSize: '10px' }}>
          2026 · SPRING
        </span>
      </div>
    </section>
  );
}
