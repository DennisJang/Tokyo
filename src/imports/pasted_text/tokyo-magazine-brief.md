# TOKYO — Single-Issue Digital Travel Magazine
## Figma Make Design Brief

> Inputs:
> - This brief (`figma_make_prompt.md`) — design specification (English)
> - `trip_guide.json` — content data contract
>
> Output:
> - A Figma file with all chapter covers, card stacks, detail sheets, and appendix as connected frames
> - Component variants and design tokens
> - Exportable to React for integration into safehomepro.co.kr

---

## Layer 1 — Identity

A single-issue digital travel magazine titled **TOKYO**.

- **Tagline**: "효율보다 다양성을 택한 도시" / "A city that chose variety over efficiency"
- **Format**: mobile-first, 430pt viewport baseline (iPhone 15 Pro Max)
- **Color mode**: dark mode primary; light mode tokens defined for future toggle
- **Primary language**: Korean (ko); secondary: English (en), Japanese (ja for native place names)
- **Voice**: editorial, not transactional. The reader is a thoughtful traveler imagining the trip, not a tourist crossing items off a list.
- **Density**: `cereal` — generous whitespace, asymmetric layouts, never cram
- **Deployment**: safehomepro.co.kr

The magazine is read once, slowly. It is not a directory. Every screen should feel intentional.

---

## Layer 2 — References

Pull from these specific design vocabularies. Do not blend them into a generic style; let each surface borrow from a clear source.

### Apple News (long-form articles)
- Full-bleed cover images at the top of every section
- Large Title typography (48pt) that compresses to Compact title (17pt) on scroll — this is the iOS HIG transition
- Generous vertical rhythm; resist filling vertical gaps
- Body text left-aligned, metadata right-aligned, both within a wide gutter

### Apple Travel Guides (iOS app)
- Place cards with rounded corners (16pt radius), subtle shadow (y:2, blur:12, opacity:0.08)
- Inline maps that expand to half-sheet on tap; never go full-page
- Hours and address data in small caps, muted color (60% opacity)
- Bottom sheet for card detail (drag-down to dismiss; Apple HIG sheet pattern)

### Cereal Magazine
- Asymmetric image layouts: one large image followed by two small, repeating
- Sans-serif headlines (consider Söhne, Inter, or Pretendard for ko); body in a serif (Söhne Mono optional for accents)
- Section titles in lowercase or all-caps, never title case
- Whitespace is content; resist filling every gap

### Monocle City Guides
- Final "Essentials" appendix as practical reference with checklist density
- Numbered chapters; chapter cover with full-bleed image + chapter number top-right (small, monospace)
- Confident captions; minimal hedging

### Wallpaper City Guides
- Map-first navigation as a secondary entry point
- Place icons on map = entry point to detail card

---

## Layer 3 — System (Component Architecture)

The magazine is composed of **four primary components** in sequence, plus **three special sections**.

### Primary Component A — Chapter Cover

Triggered by every entry in `trip_guide.chapters[]`.

```
┌──────────────────────────────────────┐
│                                      │
│   [full-bleed image of cover_entity] │
│                                      │
│   渋谷  ← native, 12pt, 60% opacity  │
│   시부야 ← Large Title 48pt           │
│   Shibuya ← roman, 14pt italic        │
│                                      │
│   "스크램블의 한가운데, 그래서 도쿄의   │
│    심장" ← subtitle_intent, 16pt italic│
│                                      │
│   ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔     │
│   13 places · cafe·shop·landmark     │
│                                      │
│                              02 / 11 │ ← chapter number
└──────────────────────────────────────┘
```

- Hero image source: `chapters[i].cover_entity_id` → `entities[].google_place_id` → Google Places photos API (or fallback `image_query`)
- On scroll, Large Title compresses to Compact title (17pt) pinned to top nav

### Primary Component B — Card Stack (Vertical Scroll)

After Chapter Cover, render `chapters[i].cards[]` as vertical stack.

Card layout (collapsed state):

```
┌──────────────────────────────────────┐
│                                      │
│   [3:2 image, fetched via            │
│    google_place_id]                  │
│                                      │
│   시부야 스카이                        │ ← name.ko, 22pt
│   Shibuya Sky · 渋谷スカイ             │ ← romaji + native, 12pt 60% opacity
│                                      │
│   "도쿄에서 가장 비싼 360도 — 일몰     │ ← one_liner.ko, 14pt, max 2 lines
│    한 시간 전에 와서, 야경까지 머문다"  │
│                                      │
│   [viewpoint] [landmark]             │ ← theme_tags as 10pt pills
│                                      │
└──────────────────────────────────────┘
```

- Sort: `cards[]` is already pre-sorted by mention_count desc
- `confidence < 0.6` cards: render with -10% saturation on the image (signals single-mention, not authoritative)
- Tap entire card → expand to Card Detail

### Primary Component C — Card Detail (Tap-Expand)

Bottom-sheet presentation per Apple HIG sheet pattern. Initial height: 90% of screen. Drag-down to dismiss.

```
┌──────────────────────────────────────┐
│   ━━ ← drag handle                   │
│                                      │
│   [4:3 hero image, full-width]       │
│                                      │
│   시부야 스카이                        │ ← name.ko, 28pt
│   Shibuya Sky                        │ ← romaji, 14pt italic
│   渋谷スカイ                          │ ← native, 12pt 60% opacity
│                                      │
│   "도쿄에서 가장 비싼 360도 — 일몰     │ ← one_liner.ko, 16pt
│    한 시간 전에 와서, 야경까지 머문다"  │
│                                      │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━     │
│                                      │
│   📍 Japan, 〒150-6145 Tokyo,        │ ← address (with copy button)
│      Shibuya, 2-24-12, 14F·45F·46F   │
│                                      │
│   🕐 10:00 – 22:30 daily              │ ← hours
│                                      │
│   [viewpoint] [landmark]             │ ← theme_tags
│                                      │
│   ┌──────────────────────────────┐   │
│   │ [mini map, 200pt height,     │   │ ← centered on coordinates
│   │  pin at center, tap to       │   │
│   │  open in Apple/Google Maps]  │   │
│   └──────────────────────────────┘   │
│                                      │
└──────────────────────────────────────┘
```

### Primary Component D — Pinned Bottom Map Sheet

Always-visible bottom sheet on every chapter screen.

- Collapsed: 80pt tall, shows map preview + "View map" affordance
- Expanded (drag up): 60% screen height
- Shows all entity pins for current chapter
- Pin tap → scroll card stack to corresponding card (smooth scroll, 400ms ease-out)
- Initial map center: `chapters[i].cluster_center.lat/lng`
- Initial zoom: 14 (chapter scope) / 11 (day_trips scope)

---

### Special Section A — Editor Note

Rendered before chapter 1. No cards.

```
┌──────────────────────────────────────┐
│                                      │
│   [full-bleed cover image]           │ ← from editor_note.cover_image.intent
│                                      │
│   01                                 │ ← section number, top-right
│                                      │
│   왜 지금 도쿄를 펼치는가              │ ← title.ko, 36pt
│   Why Tokyo, Why Now                 │ ← title.en, 14pt italic
│                                      │
│   "예약하는 순간, 이미 여행은 시작     │ ← body.ko, 18pt body text
│   됩니다. 한 연구는…"                  │   line-height 1.7, max-width 540pt
│                                      │
│                                      │
│   [EN] toggle                        │ ← language toggle, bottom-right
│                                      │
└──────────────────────────────────────┘
```

- Body text: 18pt, line-height 1.7, max-width 540pt (centered)
- Korean primary; English toggle reveals `body.en`

### Special Section B — Day Trips

Rendered after chapter 9 (Azabu-Juban). Marked with `is_day_trip: true` flag.

- Section cover: title "Day Trips — 도쿄 너머 하루" + subtitle_intent
- 4 subsections, each as a horizontally-scrolling carousel of entity cards
- Each subsection has a `narrative` block above the carousel (16pt italic)
- Visual differentiation from in-Tokyo chapters: thinner margins, monochrome accent color (sets it apart as "별책")

```
┌──────────────────────────────────────┐
│   하코네 — 산과 온천                   │ ← subsection name
│   Hakone — Mountains & Hot Springs   │
│                                      │
│   "신칸센으로 한 시간. 해발이 도쿄의   │ ← narrative
│    다른 모든 것을 흐리게 만든다."       │
│                                      │
│   ┌─────┬─────┬─────┬─────┐          │
│   │card1│card2│card3│ →   │ ← horizontal scroll
│   └─────┴─────┴─────┴─────┘          │
└──────────────────────────────────────┘
```

### Special Section C — Appendix.Practical

Rendered as the final section. Monocle "Essentials" pattern.

- 5 subcategories rendered as collapsible accordions (initially collapsed except the first)
- Each tip is a single line with optional `source_atoms` indicator (small "ⓘ" icon, tap to reveal which IG post it came from — provenance, not a primary feature)
- No images, no cards. Pure typography.

```
┌──────────────────────────────────────┐
│   Practical                          │ ← section title, all caps 24pt
│   떠나기 전                            │
│                                      │
│   ▼ 입국 · 통신 · 환전                  │ ← accordion expanded
│      • Visit Japan Web 사전 등록 ⓘ    │
│      • USIM 또는 ESIM ⓘ              │
│      • 공항 ↔ 시내 ⓘ                  │
│      ...                             │
│                                      │
│   ▶ 필수 앱                           │ ← accordion collapsed
│   ▶ 준비물 · 짐                        │
│   ▶ 현지 팁 — 편의점 · 돈키호테         │
│   ▶ 에티켓                            │
└──────────────────────────────────────┘
```

---

## Layer 4 — Data Contract

Figma Make consumes `trip_guide.json` and maps fields to components as follows.

### Top-level Issue Metadata
| trip_guide field | → Figma component |
|---|---|
| `issue.title` | App header / brand mark |
| `issue.tagline.ko` | Header subtitle (small, below title) |
| `issue.color_mode` | Default theme = dark |
| `issue.primary_language` | Initial language = ko; en/ja toggle available |

### Editor Note (rendered first)
| trip_guide field | → Figma component |
|---|---|
| `editor_note.title.ko` | Editor Note Title (36pt) |
| `editor_note.cover_image.intent` | Image fetch query for hero |
| `editor_note.body.ko` | Body text (18pt, line-height 1.7) |
| `editor_note.body.en` | Body text (en toggle) |

### Chapters (rendered in `order`)
| trip_guide field | → Figma component |
|---|---|
| `chapters[i].order` | **LOCKED sort key — do not re-sort by entity_count or alphabetically** |
| `chapters[i].title_large.primary` | Chapter Cover Large Title (48pt ko) |
| `chapters[i].title_large.native` | Chapter Cover small caption (12pt jp) |
| `chapters[i].title_large.local` | Chapter Cover italic line (14pt en) |
| `chapters[i].subtitle_intent` | Chapter Cover italic subhead |
| `chapters[i].cover_entity_id` | Hero image source (lookup entity → google_place_id → Places photo) |
| `chapters[i].cluster_center` | Initial map center for this chapter |
| `chapters[i].cards[]` | Card Stack (already sorted, do not re-sort) |

### Card Fields (per `chapters[i].cards[j]`)
| trip_guide field | → Figma component |
|---|---|
| `cards[j].name.ko` | Card primary name (22pt) |
| `cards[j].name.romaji + name.native` | Card secondary line (12pt) |
| `cards[j].one_liner.ko` | Card body text (14pt, max 2 lines collapsed) |
| `cards[j].address` | Detail sheet address |
| `cards[j].coordinates` | Map pin location |
| `cards[j].hours` | Detail sheet hours |
| `cards[j].theme_tags` | Tag pills (10pt) |
| `cards[j].google_place_id` | **Primary image source** (Google Places photos API) |
| `cards[j].image_query` | Fallback image source (Pexels/Unsplash search) |
| `cards[j].confidence` | If `< 0.6` → desaturate image -10% |
| `cards[j].mention_count` | Optional small badge "×N" if ≥ 2 |
| `cards[j]._provenance_atoms` | Hidden in primary UI; surface in detail sheet "ⓘ source" |

### Day Trips
| trip_guide field | → Figma component |
|---|---|
| `day_trips.is_day_trip` | Visual differentiation flag (별책 treatment) |
| `day_trips.subsections[i].name.ko` | Subsection title |
| `day_trips.subsections[i].narrative.ko` | Italic narrative block |
| `day_trips.subsections[i].entity_ids` | Horizontal carousel cards (lookup entities) |
| `day_trips.subsections[i].cover_entity_id` | Subsection cover image |

### Appendix.Practical
| trip_guide field | → Figma component |
|---|---|
| `appendix.practical.subcategories[i].name.ko` | Accordion header |
| `appendix.practical.subcategories[i].tips[j].text.ko` | List item text |
| `appendix.practical.subcategories[i].tips[j].source_atoms` | "ⓘ" tap-target showing source IG posts |

### Image Fetching Strategy
1. **Primary**: Google Places Photos API via `google_place_id` (highest fidelity, real-world venue images)
2. **Fallback**: Pexels or Unsplash search via `image_query` (when `google_place_id` is null — Skytree photo spots, neighborhoods, streets)
3. **Special — Editor Note hero**: query from `editor_note.cover_image.intent`
4. **Special — Skytree photo spots**: append " alley night photography" to query for editorial mood

### Data Integrity Rules (Non-Negotiable)
1. `chapters[]` order is **locked** by `chapters[i].order`. Do not re-sort by entity count or alphabetically.
2. `chapters[i].cards[]` is pre-sorted (mention_count desc, then ko name asc). Do not re-sort.
3. `confidence < 0.6` cards render with subtle desaturation. These are single-mention entities — present them, but visually signal lower authority.
4. `notes_aggregated` (in entities_graph.json) is **supplementary** for designer reference only. The primary card copy is `cards[j].one_liner.ko`.
5. `_source_tier` field on `one_liner` is metadata for designers — Tier 1 = curator-sourced (high quality), Tier 4 = auto-generated (consider designer override pass).

---

## Tone Guidelines (When Generating Additional Copy)

If Figma Make generates supplementary copy (microcopy, button labels, empty states), follow:

- **Korean is primary**. English is secondary, not translation parity. They can carry slightly different meaning.
- **One-liners are statements, not descriptions**. "스크램블의 한가운데, 그래서 도쿄의 심장" — not "시부야 스크램블 교차로는 도쿄의 가장 유명한 횡단보도입니다."
- **Avoid superlatives** ("최고의", "가장 유명한"). Avoid hashtag voice. Avoid emoji in headlines (✓ in metadata icons like 📍🕐).
- **Time-of-day matters more than business hours** in narrative text. "노을 직전" reads better than "17:30~18:00". Save exact hours for the metadata row.
- **Korean-English mix** is permitted in headlines for editorial flair (e.g., "Best of Cereal in 시부야"), used sparingly.
- **Negative space is a design element**, not a bug. Leave gaps. Resist captions on every image.

---

## Output Expectations

Figma Make should produce:

1. **Figma file** with all sections as connected frames:
   - 1 Editor Note frame
   - 8 Chapter Cover frames + 8 Card Stack frames + Card Detail bottom sheet variant
   - 1 Day Trips section frame with 4 subsection sub-frames
   - 1 Appendix Practical frame with 5 accordion items
   - 1 Pinned Bottom Map Sheet (component, used across all chapter frames)

2. **Component variants**:
   - Card: collapsed / expanded (detail sheet) / low-confidence (desaturated)
   - Chapter Cover: large-title / compact-title (scrolled state)
   - Map Sheet: collapsed (80pt) / expanded (60% screen)
   - Accordion: expanded / collapsed

3. **Auto-layout** that adapts from 320pt to 430pt mobile viewport. No fixed widths.

4. **Design tokens** defined as Figma variables:
   - Colors: dark mode primary (8 colors min — bg, surface, text-primary, text-muted, accent, border, signal-warn, signal-success); light mode mirror
   - Typography: 8 sizes (12, 14, 16, 18, 22, 28, 36, 48), 3 weights (regular, medium, semibold)
   - Spacing: 8pt grid (4, 8, 12, 16, 24, 32, 48, 64)
   - Radius: 8pt (small), 16pt (card), 24pt (sheet)

5. **Exportable to React** via Figma's Code Connect or Anima/Locofy plugin. Component naming should be export-friendly (PascalCase, no spaces).

6. **A README frame** (in the Figma file, not in code) listing component names, design token names, and the data contract reference back to `trip_guide.json` field paths.

---

## End of Brief

The deliverable is a Figma file ready for code export. The data layer (`trip_guide.json`) is the source of truth — designs should reflect the data, not embellish it. When in doubt, choose less.