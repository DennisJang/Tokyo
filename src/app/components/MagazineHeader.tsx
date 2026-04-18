import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import type { Chapter } from '../data/tripGuide';

interface MagazineHeaderProps {
  title: string;
  tagline: { ko: string; en: string };
  chapters: Chapter[];
  onChapterSelect: (id: string) => void;
  currentSection?: string;
}

export function MagazineHeader({ title, tagline, chapters, onChapterSelect, currentSection }: MagazineHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChapterClick = (id: string) => {
    onChapterSelect(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Sticky top bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 max-w-[430px] mx-auto"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="flex items-center justify-between px-5 h-[52px]">
          {/* Brand */}
          <div>
            <span
              className="text-white tracking-[0.18em]"
              style={{
                fontSize: scrolled ? '14px' : '17px',
                fontWeight: 600,
                transition: 'font-size 0.3s ease',
                letterSpacing: '0.18em',
              }}
            >
              {title}
            </span>
            {!scrolled && (
              <p className="text-white/35" style={{ fontSize: '9px', letterSpacing: '0.08em', lineHeight: 1.2, marginTop: '1px' }}>
                {tagline.ko}
              </p>
            )}
          </div>

          {/* Compact section indicator when scrolled */}
          {scrolled && currentSection && (
            <span className="text-white/40" style={{ fontSize: '12px' }}>
              {currentSection}
            </span>
          )}

          {/* Menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Chapter navigation drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="fixed top-[52px] right-0 z-50 bg-[#111111]/98 backdrop-blur-xl border-l border-b border-white/8 rounded-bl-2xl overflow-hidden"
            style={{ width: '220px', maxWidth: '80vw', animation: 'slideInRight 0.2s ease' }}
          >
            {/* Special sections */}
            <div className="px-4 pt-4 pb-2">
              <p className="text-white/25 tracking-widest" style={{ fontSize: '9px', letterSpacing: '0.12em' }}>
                CONTENTS
              </p>
            </div>

            <button
              onClick={() => { handleChapterClick('editor-note'); }}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left"
            >
              <span className="text-white/70" style={{ fontSize: '13px' }}>에디터 노트</span>
              <span className="font-mono text-white/25" style={{ fontSize: '10px' }}>01</span>
            </button>

            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => handleChapterClick(ch.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left"
              >
                <span className="text-white/70" style={{ fontSize: '13px' }}>{ch.title_large.primary}</span>
                <span className="font-mono text-white/25" style={{ fontSize: '10px' }}>
                  {String(ch.order).padStart(2, '0')}
                </span>
              </button>
            ))}

            <button
              onClick={() => { handleChapterClick('day-trips'); }}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left"
            >
              <span className="text-white/70" style={{ fontSize: '13px' }}>Day Trips</span>
              <span className="font-mono text-white/25" style={{ fontSize: '10px' }}>11</span>
            </button>

            <button
              onClick={() => { handleChapterClick('appendix'); }}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left border-t border-white/6"
            >
              <span className="text-white/50" style={{ fontSize: '13px' }}>Practical</span>
              <span className="font-mono text-white/20" style={{ fontSize: '10px' }}>—</span>
            </button>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
