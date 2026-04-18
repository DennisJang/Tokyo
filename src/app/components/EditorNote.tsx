import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface EditorNoteProps {
  sectionNumber: string;
  title: { ko: string; en: string };
  coverImage: string;
  body: { ko: string; en: string };
  totalSections: number;
}

export function EditorNote({ sectionNumber, title, coverImage, body, totalSections }: EditorNoteProps) {
  const [lang, setLang] = useState<'ko' | 'en'>('ko');

  const paragraphs = body[lang].split('\n\n');

  return (
    <section className="relative min-h-screen bg-[#0a0a0a]">
      {/* Full-bleed hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={coverImage}
          alt="Tokyo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0a0a0a]" />

        {/* Section number */}
        <div className="absolute top-6 right-6">
          <span className="font-mono text-[11px] text-white/50 tracking-widest">{sectionNumber}</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-24 -mt-12 relative z-10">
        <div className="mb-8">
          <h1
            className="text-[36px] text-white tracking-tight mb-2"
            style={{ lineHeight: 1.15, fontWeight: 500 }}
          >
            {title.ko}
          </h1>
          <p className="text-[14px] text-white/50 italic">{title.en}</p>
        </div>

        <div className="space-y-5 max-w-[540px]">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-white/80"
              style={{ fontSize: '17px', lineHeight: 1.75, fontWeight: 400 }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Language toggle */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-white/50 hover:text-white/80 hover:border-white/30 transition-all"
            style={{ fontSize: '12px', letterSpacing: '0.08em' }}
          >
            {lang === 'ko' ? 'EN' : 'KO'}
          </button>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30">
        <ChevronDown size={18} className="text-white animate-bounce" />
      </div>
    </section>
  );
}
