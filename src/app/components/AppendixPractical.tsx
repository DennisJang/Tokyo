import { useState } from 'react';
import { ChevronDown, ChevronRight, Info } from 'lucide-react';
import type { TripGuide } from '../data/tripGuide';

interface AppendixPracticalProps {
  appendix: TripGuide['appendix'];
}

export function AppendixPractical({ appendix }: AppendixPracticalProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(
    appendix.practical.subcategories[0]?.id ?? null
  );
  const [sourceVisible, setSourceVisible] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  return (
    <section className="bg-[#0a0a0a] pb-24">
      {/* Header */}
      <div className="px-6 pt-16 pb-10 border-b border-white/8">
        <p
          className="text-white/40 tracking-widest"
          style={{ fontSize: '11px', letterSpacing: '0.14em' }}
        >
          PRACTICAL
        </p>
        <h2 className="text-white mt-2" style={{ fontSize: '32px', fontWeight: 500, lineHeight: 1.2 }}>
          떠나기 전
        </h2>
        <p className="text-white/35 italic mt-1" style={{ fontSize: '14px' }}>
          Before you go
        </p>
      </div>

      {/* Accordion list */}
      <div className="divide-y divide-white/6">
        {appendix.practical.subcategories.map((cat) => {
          const isOpen = openCategory === cat.id;

          return (
            <div key={cat.id}>
              {/* Accordion header */}
              <button
                onClick={() => toggle(cat.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span
                  className="text-white/80"
                  style={{ fontSize: '15px', fontWeight: 500 }}
                >
                  {cat.name.ko}
                </span>
                <span className="text-white/30 ml-2 shrink-0">
                  {isOpen
                    ? <ChevronDown size={16} />
                    : <ChevronRight size={16} />
                  }
                </span>
              </button>

              {/* Accordion content */}
              {isOpen && (
                <div className="px-6 pb-6 space-y-3.5">
                  {cat.tips.map((tip) => (
                    <div key={tip.id} className="flex items-start gap-3">
                      {/* Bullet */}
                      <span className="text-white/20 mt-1 shrink-0" style={{ fontSize: '12px' }}>•</span>

                      {/* Tip text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white/70" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                          {tip.text.ko}
                        </p>
                      </div>

                      {/* Source indicator */}
                      {tip.source_atoms && tip.source_atoms.length > 0 && (
                        <div className="shrink-0 relative">
                          <button
                            onClick={() => setSourceVisible(sourceVisible === tip.id ? null : tip.id)}
                            className="text-white/25 hover:text-white/50 transition-colors"
                          >
                            <Info size={13} />
                          </button>

                          {sourceVisible === tip.id && (
                            <div className="absolute right-0 bottom-full mb-2 w-40 rounded-xl bg-[#222] border border-white/12 px-3 py-2 z-10">
                              <p className="text-white/50" style={{ fontSize: '11px', lineHeight: 1.5 }}>
                                출처: {tip.source_atoms.join(', ')}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* End mark */}
      <div className="mt-16 px-6 flex items-center gap-4 opacity-25">
        <div className="flex-1 h-px bg-white/20" />
        <span className="font-mono text-white/60" style={{ fontSize: '10px', letterSpacing: '0.12em' }}>
          TOKYO
        </span>
        <div className="flex-1 h-px bg-white/20" />
      </div>
    </section>
  );
}
