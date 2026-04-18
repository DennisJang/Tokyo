/**
 * tripGuide 데이터 모듈
 *
 * 단일 호 매거진의 single source of truth = trip_guide_v2.json.
 * 이 파일이 하는 일:
 *   1) JSON import → 타입 부여 (런타임 변환 없음)
 *   2) entity_id → 이미지 URL 매핑 (이미지 fetch 파이프라인 대체)
 *   3) Practical tips: string[] → { id, text } 어댑터 (기존 컴포넌트 호환)
 *   4) 카드에 image 필드 주입 (PlaceCard 컴포넌트는 card.image를 본다)
 */

import rawData from './trip_guide_v2.json';

// ─────────────────────────────────────────────────────────────
// 타입 — v2 스키마 기준
// ─────────────────────────────────────────────────────────────

export interface PlaceCard {
  entity_id: string;
  name: { native: string; romaji: string; ko: string };
  one_liner: { ko: string; en?: string };
  address: string;
  hours: string;
  theme_tags: string[];
  coordinates: { lat: number; lng: number };
  google_place_id: string | null;
  image_query?: string;
  confidence: number;
  mention_count: number;
  signature_line?: string; // ★ v2 신규
  image: string; // 런타임 주입 — 아래 IMAGE_MAP에서 보강
  // 하위 호환: 기존 코드가 card.id를 쓰던 경우를 위해 alias
  id: string;
}

export interface Chapter {
  id: string;
  order: number;
  title_large: { primary: string; native: string; local: string };
  subtitle_intent: string;
  cover_image: string; // 런타임 주입
  cluster_center: { lat: number; lng: number };
  cards: PlaceCard[];
}

export interface DayTripSubsection {
  id: string;
  name: { ko: string; en: string };
  narrative: { ko: string; en?: string };
  cover_image: string;
  cards: PlaceCard[];
}

export interface AppendixTip {
  id: string;
  text: { ko: string; en?: string };
  source_atoms?: string[];
}

export interface AppendixCategory {
  id: string;
  name: { ko: string; en?: string };
  tips: AppendixTip[];
}

export interface TripGuide {
  issue: {
    title: string;
    tagline: { ko: string; en: string };
    color_mode: string;
    primary_language: string;
    total_sections: number;
  };
  editor_note: {
    section_number: string;
    title: { ko: string; en: string };
    cover_image: string;
    body: { ko: string; en: string };
  };
  chapters: Chapter[];
  day_trips: {
    is_day_trip: true;
    cover_image: string;
    title: { ko: string; en: string };
    subtitle_intent: string;
    subsections: DayTripSubsection[];
  };
  appendix: {
    practical: {
      subcategories: AppendixCategory[];
    };
  };
}

// ─────────────────────────────────────────────────────────────
// 이미지 매핑 (entity_id → Unsplash URL)
//
// v2 JSON은 image_query만 보유 → 런타임 fetch 파이프라인 구축 전까지의 정적 매핑.
// 신규 entity는 FALLBACK_IMAGE를 받음. 이 매핑은 디자인 수정 작업과 별개로
// 유지보수 가능 (PR 분리 가능한 데이터 자산).
// ─────────────────────────────────────────────────────────────

const I = {
  tokyoNight: 'https://images.unsplash.com/photo-1663511173980-5de62312e68a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  shibuya: 'https://images.unsplash.com/photo-1734818217382-a0318e11ea62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  shinjuku: 'https://images.unsplash.com/photo-1586918445934-bb5af13d81f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  shinjukuNight: 'https://images.unsplash.com/photo-1702780529435-9ba49e93dde8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  harajuku: 'https://images.unsplash.com/photo-1576631016442-35b1141ecea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  ginza: 'https://images.unsplash.com/photo-1759485313282-95158832ce43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  asakusa: 'https://images.unsplash.com/photo-1463319611694-4bf9eb5a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  shimokitazawa: 'https://images.unsplash.com/photo-1706631095330-0f195b7d5285?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  yanaka: 'https://images.unsplash.com/photo-1759200263591-3e5394f4b4ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  roppongi: 'https://images.unsplash.com/photo-1743148509723-a951c5245708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  azabuJuban: 'https://images.unsplash.com/photo-1760445935358-08b359d9b822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  hakone: 'https://images.unsplash.com/photo-1764491782041-8442db50dc10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  nikko: 'https://images.unsplash.com/photo-1611577625125-ffffe4c02c38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  kamakura: 'https://images.unsplash.com/photo-1669954435562-94c02d3246cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  yokohama: 'https://images.unsplash.com/photo-1619941543043-c925a40495bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  coffee: 'https://images.unsplash.com/photo-1757492212159-21983e6bd083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  ramen: 'https://images.unsplash.com/photo-1730386303244-47a4f6607e78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  shibuyaSky: 'https://images.unsplash.com/photo-1718965102429-eadea742307f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  vintage: 'https://images.unsplash.com/photo-1585667055741-7a94f3397509?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  torii: 'https://images.unsplash.com/photo-1759299984042-f65735de76ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  jazz: 'https://images.unsplash.com/photo-1736777798982-cd09656ff13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  izakaya: 'https://images.unsplash.com/photo-1580679630809-03fd24148ecf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
  meiji: 'https://images.unsplash.com/photo-1594485770559-818d3132a5ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
};

const FALLBACK_IMAGE = I.tokyoNight;

// theme_tags 기반 fallback — entity_id 매핑이 없을 때 카테고리로 대체
function fallbackByTags(tags: string[]): string {
  const t = new Set(tags.map((x) => x.toLowerCase()));
  if (t.has('viewpoint')) return I.shibuyaSky;
  if (t.has('shrine') || t.has('temple')) return I.torii;
  if (t.has('ramen')) return I.ramen;
  if (t.has('cafe') || t.has('coffee')) return I.coffee;
  if (t.has('izakaya') || t.has('bar')) return I.izakaya;
  if (t.has('vintage') || t.has('shop')) return I.vintage;
  if (t.has('music') || t.has('jazz')) return I.jazz;
  return FALLBACK_IMAGE;
}

// 핵심 entity만 명시 매핑. 나머지는 chapter_id + tags fallback.
const IMAGE_MAP: Record<string, string> = {
  ent_001: I.shibuyaSky,        // 시부야 스카이
  ent_meiji: I.meiji,           // (있다면)
  // 필요시 핵심 entity_id에 한해 명시 추가
};

// chapter_id → cover image (v2 실제 id 기준)
const CHAPTER_COVER: Record<string, string> = {
  ch_shibuya: I.shibuya,
  ch_shinjuku: I.shinjukuNight,
  ch_ginza: I.ginza,
  ch_harajuku_omotesando: I.harajuku,
  ch_asakusa_skytree: I.asakusa,
  ch_ueno_akihabara: I.yanaka, // 우에노/야나카는 옛 도쿄 정서 공유
  ch_shimokitazawa: I.shimokitazawa,
  ch_azabujuban_mongennakacho: I.azabuJuban,
};

// day-trip subsection id → cover (v2 실제 id 기준)
const DAYTRIP_COVER: Record<string, string> = {
  day_hakone: I.hakone,
  day_kamakura: I.kamakura,
  day_odaiba: I.yokohama, // 항구·바다 심상 공유
  day_fuji: I.hakone,     // 후지·산 심상 공유
};

function imageForCard(card: any): string {
  if (IMAGE_MAP[card.entity_id]) return IMAGE_MAP[card.entity_id];
  return fallbackByTags(card.theme_tags ?? []);
}

// ─────────────────────────────────────────────────────────────
// JSON → 런타임 객체 (이미지 주입 + tip 어댑터)
// ─────────────────────────────────────────────────────────────

function adaptCard(c: any): PlaceCard {
  return {
    ...c,
    id: c.entity_id, // 하위 호환 alias (key prop·기존 코드)
    image: imageForCard(c),
  };
}

function adaptChapter(ch: any): Chapter {
  return {
    id: ch.id,
    order: ch.order,
    title_large: ch.title_large,
    subtitle_intent: ch.subtitle_intent,
    cluster_center: ch.cluster_center,
    cover_image: CHAPTER_COVER[ch.id] ?? FALLBACK_IMAGE,
    cards: (ch.cards ?? []).map(adaptCard),
  };
}

function adaptDayTripSubsection(s: any): DayTripSubsection {
  return {
    id: s.id,
    name: s.name,
    narrative: s.narrative,
    cover_image: DAYTRIP_COVER[s.id] ?? I.hakone,
    cards: (s.cards ?? []).map(adaptCard),
  };
}

/**
 * Practical tips 어댑터.
 * v2: tips: string[]
 * 기존 컴포넌트가 기대: tips: { id, text:{ko}, source_atoms? }[]
 *
 * id는 안정적 key가 필요해서 인덱스 기반으로 부여.
 * (DOM key 안정성용일 뿐 외부 노출 없음.)
 */
function adaptPracticalTips(tips: any[], categoryId: string): AppendixTip[] {
  return tips.map((tip, i) => {
    if (typeof tip === 'string') {
      return {
        id: `${categoryId}_t${i}`,
        text: { ko: tip },
      };
    }
    // 미래에 v3가 객체 구조로 가도 동작하도록
    return {
      id: tip.id ?? `${categoryId}_t${i}`,
      text: tip.text ?? { ko: String(tip) },
      source_atoms: tip.source_atoms,
    };
  });
}

function adaptAppendix(a: any): TripGuide['appendix'] {
  const subs = (a?.practical?.subcategories ?? []).map((sub: any) => ({
    id: sub.id,
    name: sub.name,
    tips: adaptPracticalTips(sub.tips ?? [], sub.id),
  }));
  return { practical: { subcategories: subs } };
}

// ─────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────

const raw = rawData as any;

export const tripGuide: TripGuide = {
  issue: {
    title: raw.issue.title,
    tagline: raw.issue.tagline,
    color_mode: raw.issue.color_mode,
    primary_language: raw.issue.primary_language,
    total_sections: (raw.chapters?.length ?? 0) + 3, // editor + chapters + day_trips + practical
  },
  editor_note: {
    section_number: String(raw.editor_note?.order ?? 1).padStart(2, '0'),
    title: raw.editor_note?.title ?? { ko: '', en: '' },
    cover_image: I.tokyoNight,
    body: raw.editor_note?.body ?? { ko: '', en: '' },
  },
  chapters: (raw.chapters ?? []).map(adaptChapter),
  day_trips: {
    is_day_trip: true,
    cover_image: I.hakone,
    title: raw.day_trips?.title ?? { ko: 'Day Trips', en: 'Day Trips' },
    subtitle_intent: raw.day_trips?.subtitle_intent ?? '',
    subsections: (raw.day_trips?.subsections ?? []).map(adaptDayTripSubsection),
  },
  appendix: adaptAppendix(raw.appendix),
};
