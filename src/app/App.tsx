import { useRef, useState, useCallback } from 'react';
import { tripGuide } from './data/tripGuide';
import type { PlaceCard } from './data/tripGuide';
import { IssueCover } from './components/IssueCover';
import { MagazineHeader } from './components/MagazineHeader';
import { EditorNote } from './components/EditorNote';
import { ChapterSection } from './components/ChapterSection';
import { DayTrips } from './components/DayTrips';
import { AppendixPractical } from './components/AppendixPractical';
import { CardDetailSheet } from './components/CardDetailSheet';

export default function App() {
  const [selectedCard, setSelectedCard] = useState<PlaceCard | null>(null);
  const [currentSection, setCurrentSection] = useState('');
  const [coverDismissed, setCoverDismissed] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const registerRef = useCallback((id: string, el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleEnterMagazine = () => {
    setCoverDismissed(true);
    setTimeout(() => {
      const el = sectionRefs.current['editor-note'];
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const { issue, editor_note, chapters, day_trips, appendix } = tripGuide;

  return (
    <div className="min-h-screen bg-[#0a0a0a] max-w-[430px] mx-auto relative">
      {/* Sticky Header (appears after cover) */}
      {coverDismissed && (
        <MagazineHeader
          title={issue.title}
          tagline={issue.tagline}
          chapters={chapters}
          onChapterSelect={scrollToSection}
          currentSection={currentSection}
        />
      )}

      {/* Issue Cover */}
      <div ref={(el) => registerRef('cover', el)}>
        <IssueCover
          title={issue.title}
          tagline={issue.tagline}
          coverImage={editor_note.cover_image}
          onEnter={handleEnterMagazine}
        />
      </div>

      {/* Editor Note */}
      <div ref={(el) => registerRef('editor-note', el)}>
        <EditorNote
          sectionNumber={editor_note.section_number}
          title={editor_note.title}
          coverImage={editor_note.cover_image}
          body={editor_note.body}
          totalSections={issue.total_sections}
        />
      </div>

      {/* Chapter separator */}
      <div className="px-6 py-12 bg-[#0a0a0a]">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-white/8" />
          <span className="font-mono text-white/20 tracking-widest" style={{ fontSize: '9px', letterSpacing: '0.18em' }}>
            CHAPTERS
          </span>
          <div className="flex-1 h-px bg-white/8" />
        </div>
      </div>

      {/* Chapters */}
      {chapters.map((chapter, i) => (
        <div key={chapter.id} ref={(el) => registerRef(chapter.id, el)}>
          <ChapterSection
            chapter={chapter}
            chapterIndex={i}
            totalChapters={chapters.length}
            onCardClick={setSelectedCard}
          />

          {/* Chapter spacer */}
          {i < chapters.length - 1 && (
            <div className="h-16 bg-[#0a0a0a] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white/15" />
            </div>
          )}
        </div>
      ))}

      {/* Day Trips separator */}
      <div className="px-6 py-12 bg-[#0d0d0d]">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-white/6" />
          <span className="font-mono text-white/15 tracking-widest" style={{ fontSize: '9px', letterSpacing: '0.18em' }}>
            DAY TRIPS
          </span>
          <div className="flex-1 h-px bg-white/6" />
        </div>
      </div>

      {/* Day Trips */}
      <div ref={(el) => registerRef('day-trips', el)}>
        <DayTrips dayTrips={day_trips} onCardClick={setSelectedCard} />
      </div>

      {/* Appendix */}
      <div ref={(el) => registerRef('appendix', el)}>
        <AppendixPractical appendix={appendix} />
      </div>

      {/* Card Detail Sheet */}
      <CardDetailSheet
        card={selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </div>
  );
}
