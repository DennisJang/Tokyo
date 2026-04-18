export interface PlaceCard {
  id: string;
  name: { ko: string; romaji: string; native: string };
  one_liner: { ko: string; en: string };
  address: string;
  hours: string;
  theme_tags: string[];
  coordinates: { lat: number; lng: number };
  image: string;
  confidence: number;
  mention_count: number;
}

export interface Chapter {
  id: string;
  order: number;
  title_large: { primary: string; native: string; local: string };
  subtitle_intent: string;
  cover_image: string;
  cluster_center: { lat: number; lng: number };
  cards: PlaceCard[];
}

export interface DayTripSubsection {
  id: string;
  name: { ko: string; en: string };
  narrative: { ko: string; en: string };
  cover_image: string;
  cards: PlaceCard[];
}

export interface AppendixTip {
  id: string;
  text: { ko: string; en: string };
  source_atoms?: string[];
}

export interface AppendixCategory {
  id: string;
  name: { ko: string; en: string };
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

const IMAGES = {
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

export const tripGuide: TripGuide = {
  issue: {
    title: 'TOKYO',
    tagline: {
      ko: '효율보다 다양성을 택한 도시',
      en: 'A city that chose variety over efficiency',
    },
    color_mode: 'dark',
    primary_language: 'ko',
    total_sections: 11,
  },

  editor_note: {
    section_number: '01',
    title: {
      ko: '왜 지금 도쿄를 펼치는가',
      en: 'Why Tokyo, Why Now',
    },
    cover_image: IMAGES.tokyoNight,
    body: {
      ko: '예약하는 순간, 이미 여행은 시작됩니다. 한 연구는 여행 자체보다 여행을 기다리는 시간이 행복에 더 크게 기여한다고 말했지만, 도쿄에서는 그 경계가 흐려집니다. 이 도시는 도착 전부터 당신을 흡수합니다.\n\n효율의 도시라고들 하지만, 그것은 절반의 진실입니다. 도쿄는 모순들이 층층이 쌓인 도시입니다. 24시간 편의점 옆에 100년 된 찻집이 있고, 세계에서 가장 붐비는 교차로 한 블록 뒤에는 아무도 모르는 골목이 있습니다.\n\n이 매거진은 목적지의 목록이 아닙니다. 한 도시를 천천히 읽는 방법입니다.',
      en: 'The moment you book, the trip has already begun. A study once suggested that the anticipation of travel contributes more to happiness than the trip itself — but in Tokyo, that boundary dissolves. The city absorbs you before you arrive.\n\nThey call it a city of efficiency, but that is only half the truth. Tokyo is a city of accumulated contradictions. A hundred-year-old tea house sits beside a 24-hour convenience store; one block behind the world\'s busiest intersection lies an alley no one knows.\n\nThis magazine is not a list of destinations. It is a way of reading a city slowly.',
    },
  },

  chapters: [
    {
      id: 'shibuya',
      order: 2,
      title_large: { primary: '시부야', native: '渋谷', local: 'Shibuya' },
      subtitle_intent: '스크램블의 한가운데, 그래서 도쿄의 심장',
      cover_image: IMAGES.shibuya,
      cluster_center: { lat: 35.6595, lng: 139.7004 },
      cards: [
        {
          id: 'shibuya-sky',
          name: { ko: '시부야 스카이', romaji: 'Shibuya Sky', native: '渋谷スカイ' },
          one_liner: {
            ko: '도쿄에서 가장 비싼 360도 — 일몰 한 시간 전에 와서, 야경까지 머문다',
            en: 'The most expensive 360° in Tokyo — arrive an hour before sunset, stay for the city lights',
          },
          address: '2-24-12 Shibuya, Shibuya City, Tokyo 150-6145',
          hours: '10:00 – 22:30 (last entry 21:20)',
          theme_tags: ['전망대', '랜드마크', '일몰'],
          coordinates: { lat: 35.6581, lng: 139.7017 },
          image: IMAGES.shibuyaSky,
          confidence: 0.92,
          mention_count: 8,
        },
        {
          id: 'shibuya-crossing',
          name: { ko: '시부야 스크램블 교차로', romaji: 'Shibuya Scramble Crossing', native: '渋谷スクランブル交差点' },
          one_liner: {
            ko: '새벽 3시에 와도 사람이 있다. 그게 포인트다',
            en: 'There are people at 3am too. That is the point.',
          },
          address: 'Shibuya, Shibuya City, Tokyo',
          hours: '24시간',
          theme_tags: ['랜드마크', '야경', '포토스팟'],
          coordinates: { lat: 35.6595, lng: 139.7004 },
          image: IMAGES.shibuya,
          confidence: 0.98,
          mention_count: 12,
        },
        {
          id: 'shibuya-coffee',
          name: { ko: '로그로드 다이칸야마', romaji: 'Log Road Daikanyama', native: 'ログロード代官山' },
          one_liner: {
            ko: '철길 위에 조성된 좁고 긴 상점가. 스타벅스 리저브가 여기 있는 이유가 있다',
            en: 'A narrow strip of shops built over old railway lines. There\'s a reason the Starbucks Reserve is here.',
          },
          address: '13-1 Daikanyama, Shibuya City, Tokyo',
          hours: '11:00 – 21:00',
          theme_tags: ['카페', '산책', '쇼핑'],
          coordinates: { lat: 35.6492, lng: 139.7025 },
          image: IMAGES.coffee,
          confidence: 0.78,
          mention_count: 5,
        },
        {
          id: 'shibuya-izakaya',
          name: { ko: '노렌요코초', romaji: 'Noren Yokocho', native: 'のれん横丁' },
          one_liner: {
            ko: '시부야역 바로 옆, 작은 이자카야들이 어깨를 맞댄 골목. 오후 6시부터가 진짜',
            en: 'A row of tiny izakayas shoulder to shoulder, right beside Shibuya station. After 6pm is the real one.',
          },
          address: '2-24-1 Shibuya, Shibuya City, Tokyo',
          hours: '17:00 – 24:00',
          theme_tags: ['이자카야', '야식', '분위기'],
          coordinates: { lat: 35.6581, lng: 139.7003 },
          image: IMAGES.izakaya,
          confidence: 0.85,
          mention_count: 6,
        },
      ],
    },
    {
      id: 'shinjuku',
      order: 3,
      title_large: { primary: '신주쿠', native: '新宿', local: 'Shinjuku' },
      subtitle_intent: '낮의 백화점과 밤의 골든가이. 같은 역, 두 개의 도시',
      cover_image: IMAGES.shinjuku,
      cluster_center: { lat: 35.6938, lng: 139.7034 },
      cards: [
        {
          id: 'shinjuku-golden-gai',
          name: { ko: '골든가이', romaji: 'Golden Gai', native: '新宿ゴールデン街' },
          one_liner: {
            ko: '좌석이 다섯 개인 바에서 낯선 사람과 위스키를 마신다. 그게 신주쿠다',
            en: 'Whisky with strangers in a bar that fits five people. That\'s Shinjuku.',
          },
          address: 'Kabukicho 1-chome, Shinjuku City, Tokyo',
          hours: '19:00 – 새벽 4:00 (바별 상이)',
          theme_tags: ['바', '야경', '레트로'],
          coordinates: { lat: 35.6938, lng: 139.7034 },
          image: IMAGES.shinjuku,
          confidence: 0.95,
          mention_count: 11,
        },
        {
          id: 'shinjuku-omoide',
          name: { ko: '오모이데 요코초', romaji: 'Omoide Yokocho', native: '思い出横丁' },
          one_liner: {
            ko: '기억의 골목. 야키토리 연기가 골목을 채우는 저녁, 혼자 ���아도 외롭지 않다',
            en: 'Memory Alley. Yakitori smoke fills the lane at dusk — you won\'t feel alone, even by yourself.',
          },
          address: '1-2-11 Nishi-Shinjuku, Shinjuku City, Tokyo',
          hours: '16:00 – 01:00',
          theme_tags: ['야키토리', '이자카야', '분위기'],
          coordinates: { lat: 35.6941, lng: 139.7001 },
          image: IMAGES.izakaya,
          confidence: 0.91,
          mention_count: 9,
        },
        {
          id: 'shinjuku-kabukicho',
          name: { ko: '가부키초', romaji: 'Kabukicho', native: '歌舞伎町' },
          one_liner: {
            ko: '도쿄 유흥의 심장. 새벽 2시의 가부키초는 낮의 도시와 다른 언어를 쓴다',
            en: 'The heart of Tokyo nightlife. At 2am, Kabukicho speaks a different language from the daytime city.',
          },
          address: 'Kabukicho, Shinjuku City, Tokyo',
          hours: '24시간',
          theme_tags: ['나이트라이프', '야경', '엔터테인먼트'],
          coordinates: { lat: 35.6952, lng: 139.7045 },
          image: IMAGES.shinjukuNight,
          confidence: 0.88,
          mention_count: 7,
        },
        {
          id: 'shinjuku-jazz',
          name: { ko: '디스크 유니온 신주쿠', romaji: 'Disk Union Shinjuku', native: 'ディスクユニオン新宿' },
          one_liner: {
            ko: '중고 LP의 성지. 재즈 코너에서 두 시간을 보내도 아무도 눈치 주지 않는다',
            en: 'The holy ground of used vinyl. Two hours in the jazz section and no one will rush you out.',
          },
          address: '3-31-4 Shinjuku, Shinjuku City, Tokyo',
          hours: '11:00 – 21:00',
          theme_tags: ['음악', '빈티지', '쇼핑'],
          coordinates: { lat: 35.6913, lng: 139.7017 },
          image: IMAGES.vintage,
          confidence: 0.72,
          mention_count: 4,
        },
      ],
    },
    {
      id: 'harajuku',
      order: 4,
      title_large: { primary: '하라주쿠', native: '原宿', local: 'Harajuku' },
      subtitle_intent: '명품 거리와 다케시타 사이, 일본 청년문화의 진원지',
      cover_image: IMAGES.harajuku,
      cluster_center: { lat: 35.6702, lng: 139.7027 },
      cards: [
        {
          id: 'meiji-jingu',
          name: { ko: '메이지 신궁', romaji: 'Meiji Jingu', native: '明治神宮' },
          one_liner: {
            ko: '70만 평의 숲. 하라주쿠역에서 걸어서 5분, 도시에서 100년 멀어진다',
            en: '700,000 square metres of forest. Five minutes from Harajuku station — a century away from the city.',
          },
          address: '1-1 Yoyogikamizonocho, Shibuya City, Tokyo 151-8557',
          hours: '일출~일몰 (계절 변동)',
          theme_tags: ['신사', '숲', '산책'],
          coordinates: { lat: 35.6763, lng: 139.6993 },
          image: IMAGES.meiji,
          confidence: 0.97,
          mention_count: 10,
        },
        {
          id: 'omotesando',
          name: { ko: '오모테산도 힐즈', romaji: 'Omotesando Hills', native: '表参道ヒルズ' },
          one_liner: {
            ko: '안도 다다오가 설계한 나선형 내부. 건물이 콘텐츠다',
            en: 'Tadao Ando\'s spiralling interior. The architecture is the content.',
          },
          address: '4-12-10 Jingumae, Shibuya City, Tokyo 150-0001',
          hours: '11:00 – 21:00',
          theme_tags: ['쇼핑', '건축', '명품'],
          coordinates: { lat: 35.6657, lng: 139.7097 },
          image: IMAGES.harajuku,
          confidence: 0.83,
          mention_count: 6,
        },
        {
          id: 'takeshita-street',
          name: { ko: '다케시타 거리', romaji: 'Takeshita Street', native: '竹下通り' },
          one_liner: {
            ko: '크레페와 아이돌 굿즈와 코스프레. 이것이 하라주쿠의 다른 얼굴이다',
            en: 'Crepes, idol goods, cosplay. This is Harajuku\'s other face.',
          },
          address: 'Jingumae 1-chome, Shibuya City, Tokyo',
          hours: '10:00 – 19:00',
          theme_tags: ['팝컬처', '쇼핑', '거리음식'],
          coordinates: { lat: 35.6711, lng: 139.7032 },
          image: IMAGES.harajuku,
          confidence: 0.89,
          mention_count: 8,
        },
        {
          id: 'harajuku-torii',
          name: { ko: '도고토리이 거리', romaji: 'Togo Shrine Alley', native: '東郷神社参道' },
          one_liner: {
            ko: '다케시타 소음에서 두 블록. 여기까지 오는 관광객은 드물다',
            en: 'Two blocks from Takeshita\'s noise. Few tourists make it this far.',
          },
          address: '1-5-3 Jingumae, Shibuya City, Tokyo 150-0001',
          hours: '06:00 – 17:00',
          theme_tags: ['신사', '조용한', '숨은명소'],
          coordinates: { lat: 35.6729, lng: 139.7058 },
          image: IMAGES.torii,
          confidence: 0.55,
          mention_count: 2,
        },
      ],
    },
    {
      id: 'ginza',
      order: 5,
      title_large: { primary: '긴자', native: '銀座', local: 'Ginza' },
      subtitle_intent: '도쿄에서 가장 비싼 주소. 그러나 무료로 즐기는 방법이 있다',
      cover_image: IMAGES.ginza,
      cluster_center: { lat: 35.6717, lng: 139.7649 },
      cards: [
        {
          id: 'ginza-itoya',
          name: { ko: '이토야', romaji: 'Itoya', native: '伊東屋' },
          one_liner: {
            ko: '12층 문구점. 지하 1층 농장에서 샐러드가 나온다. 도쿄니까 가능한 일',
            en: 'A 12-floor stationery store with a basement farm that supplies the rooftop café. Only in Tokyo.',
          },
          address: '2-7-15 Ginza, Chuo City, Tokyo 104-0061',
          hours: '10:00 – 20:00',
          theme_tags: ['문구', '쇼핑', '디자인'],
          coordinates: { lat: 35.6722, lng: 139.7637 },
          image: IMAGES.ginza,
          confidence: 0.88,
          mention_count: 7,
        },
        {
          id: 'ginza-six',
          name: { ko: '긴자 식스', romaji: 'Ginza Six', native: 'GINZA SIX' },
          one_liner: {
            ko: '가장 도쿄다운 백화점. 지하 묘지 위에 세운 건물이라는 사실이 더 도쿄답다',
            en: 'The most Tokyo department store. The fact that it was built over a graveyard is even more so.',
          },
          address: '6-10-1 Ginza, Chuo City, Tokyo 104-0061',
          hours: '10:30 – 20:30',
          theme_tags: ['백화점', '쇼핑', '건축'],
          coordinates: { lat: 35.6698, lng: 139.7649 },
          image: IMAGES.ginza,
          confidence: 0.91,
          mention_count: 9,
        },
        {
          id: 'ginza-coffee',
          name: { ko: 'THE OKURA TOKYO 라운지', romaji: 'The Okura Tokyo Lounge', native: 'ザ・オークラ東京' },
          one_liner: {
            ko: '일본 최고의 아프터눈 티. 예약 없이는 불가능하지만, 바에서 같은 경험을 살 수 있다',
            en: 'Japan\'s finest afternoon tea. Impossible without a reservation — but the bar offers the same experience.',
          },
          address: '2-10-4 Toranomon, Minato City, Tokyo 105-0001',
          hours: '11:30 – 22:00',
          theme_tags: ['호텔바', '애프터눈티', '럭셔리'],
          coordinates: { lat: 35.6671, lng: 139.7479 },
          image: IMAGES.coffee,
          confidence: 0.76,
          mention_count: 4,
        },
      ],
    },
    {
      id: 'asakusa',
      order: 6,
      title_large: { primary: '아사쿠사', native: '浅草', local: 'Asakusa' },
      subtitle_intent: '도쿄에서 가장 오래된 동네. 시간이 다르게 흐른다',
      cover_image: IMAGES.asakusa,
      cluster_center: { lat: 35.7148, lng: 139.7967 },
      cards: [
        {
          id: 'sensoji',
          name: { ko: '센소지', romaji: 'Senso-ji', native: '浅草寺' },
          one_liner: {
            ko: '새벽 5시, 관광객이 없는 센소지는 완전히 다른 장소다',
            en: 'At 5am, with no tourists, Senso-ji is a completely different place.',
          },
          address: '2-3-1 Asakusa, Taito City, Tokyo 111-0032',
          hours: '새벽 6:00 – 17:00 (경내 24시간)',
          theme_tags: ['사원', '랜드마크', '새벽'],
          coordinates: { lat: 35.7148, lng: 139.7967 },
          image: IMAGES.asakusa,
          confidence: 0.99,
          mention_count: 14,
        },
        {
          id: 'nakamise',
          name: { ko: '나카미세도리', romaji: 'Nakamise-dori', native: '仲見世通り' },
          one_liner: {
            ko: '닝겐교야키와 아게만주. 200엔짜리 간식이 도쿄 최고의 거리음식일 때가 있다',
            en: 'Ningyo-yaki and fried manju. A 200-yen snack can be the best street food in Tokyo.',
          },
          address: 'Nakamise-dori, Asakusa, Taito City, Tokyo',
          hours: '10:00 – 19:00',
          theme_tags: ['전통시장', '거리음식', '기념품'],
          coordinates: { lat: 35.7136, lng: 139.7960 },
          image: IMAGES.asakusa,
          confidence: 0.94,
          mention_count: 10,
        },
        {
          id: 'asakusa-jazz',
          name: { ko: '아사쿠사 재즈 바', romaji: 'Asakusa Jazz Bars', native: '浅草ジャズバー' },
          one_liner: {
            ko: '아사쿠사에는 왜 이렇게 재즈 바가 많은가. 아무도 대답을 모른다. 그냥 좋다',
            en: 'Why does Asakusa have so many jazz bars? No one knows the answer. It just works.',
          },
          address: 'Asakusa, Taito City, Tokyo',
          hours: '19:00 – 새벽 2:00',
          theme_tags: ['재즈', '바', '분위기'],
          coordinates: { lat: 35.7152, lng: 139.7979 },
          image: IMAGES.jazz,
          confidence: 0.82,
          mention_count: 5,
        },
      ],
    },
    {
      id: 'shimokitazawa',
      order: 7,
      title_large: { primary: '시모키타자와', native: '下北沢', local: 'Shimokitazawa' },
      subtitle_intent: '도쿄 인디의 심장박동. 젠트리피케이션이 진행 중이지만 아직 살아있다',
      cover_image: IMAGES.shimokitazawa,
      cluster_center: { lat: 35.6618, lng: 139.6681 },
      cards: [
        {
          id: 'shimokita-vintage',
          name: { ko: '시모키타자와 빈티지 가게들', romaji: 'Shimokitazawa Vintage Shops', native: '下北沢古着屋' },
          one_liner: {
            ko: '이 동네를 목적 없이 걷는 것. 그것이 유일한 계획이어야 한다',
            en: 'Walking this neighbourhood without a plan. That should be the only plan.',
          },
          address: 'Kitazawa 2-chome, Setagaya City, Tokyo',
          hours: '12:00 – 20:00',
          theme_tags: ['빈티지', '쇼핑', '산책'],
          coordinates: { lat: 35.6618, lng: 139.6681 },
          image: IMAGES.vintage,
          confidence: 0.87,
          mention_count: 6,
        },
        {
          id: 'shimokita-music',
          name: { ko: '시모키타자와 라이브하우스', romaji: 'Live Houses of Shimokitazawa', native: 'ライブハウス下北沢' },
          one_liner: {
            ko: '좌석 100석 미만의 공연장에서 다음 달 유명해질 밴드를 듣는다',
            en: 'Watching the band that will be famous next month in a 100-seat venue.',
          },
          address: 'Shimokitazawa, Setagaya City, Tokyo',
          hours: '개장 18:00 · 공연 19:00 (공연별 상이)',
          theme_tags: ['라이브', '음악', '인디'],
          coordinates: { lat: 35.6625, lng: 139.6675 },
          image: IMAGES.shimokitazawa,
          confidence: 0.79,
          mention_count: 5,
        },
        {
          id: 'bonus-track',
          name: { ko: '보너스 트랙', romaji: 'Bonus Track', native: 'ボーナストラック' },
          one_liner: {
            ko: '재개발 부지에 세워진 작은 상점가. 이런 방식으로도 동네가 살아남는다',
            en: 'A small shopping street built on a redevelopment site. Proof that a neighbourhood can survive this way.',
          },
          address: '2-36-15 Daita, Setagaya City, Tokyo 155-0033',
          hours: '11:00 – 22:00',
          theme_tags: ['커뮤니티', '카페', '독립서점'],
          coordinates: { lat: 35.6609, lng: 139.6688 },
          image: IMAGES.coffee,
          confidence: 0.68,
          mention_count: 3,
        },
      ],
    },
    {
      id: 'yanaka',
      order: 8,
      title_large: { primary: '야나카', native: '谷中', local: 'Yanaka' },
      subtitle_intent: '전쟁을 피한 동네. 도쿄에서 옛 모습이 가장 많이 남은 곳',
      cover_image: IMAGES.yanaka,
      cluster_center: { lat: 35.7267, lng: 139.7666 },
      cards: [
        {
          id: 'yanaka-ginza',
          name: { ko: '야나카 긴자', romaji: 'Yanaka Ginza', native: '谷中銀座' },
          one_liner: {
            ko: '샌드위치 하나, 고양이 두 마리. 야나카는 그 속도로 움직인다',
            en: 'One sandwich, two cats. Yanaka moves at that speed.',
          },
          address: 'Yanaka 3-chome, Taito City, Tokyo',
          hours: '10:00 – 18:00 (가게별 상이)',
          theme_tags: ['전통상점가', '고양이', '산책'],
          coordinates: { lat: 35.7267, lng: 139.7666 },
          image: IMAGES.yanaka,
          confidence: 0.93,
          mention_count: 9,
        },
        {
          id: 'yanaka-cemetery',
          name: { ko: '야나카 묘지', romaji: 'Yanaka Cemetery', native: '谷中霊園' },
          one_liner: {
            ko: '봄에는 벚꽃, 그 외 계절에는 조용한 산책로. 도쿄에서 가장 시간이 느린 곳 중 하나',
            en: 'Cherry blossoms in spring, a quiet path otherwise. One of the slowest-moving places in Tokyo.',
          },
          address: '7-5-24 Yanaka, Taito City, Tokyo 110-0001',
          hours: '24시간 (관리소 09:00-17:00)',
          theme_tags: ['공원', '산책', '역사'],
          coordinates: { lat: 35.7289, lng: 139.7662 },
          image: IMAGES.torii,
          confidence: 0.8,
          mention_count: 5,
        },
        {
          id: 'yanaka-coffee',
          name: { ko: '카야바 커피', romaji: 'Kayaba Coffee', native: 'カヤバ珈琲' },
          one_liner: {
            ko: '1938년에 문을 열었고, 지금도 그때의 의자를 쓴다. 에그 샌드위치 하나, 커피 한 잔',
            en: 'Opened in 1938. Still using the same chairs. One egg sandwich, one coffee.',
          },
          address: '6-1-29 Yanaka, Taito City, Tokyo 110-0001',
          hours: '08:00 – 18:00 (화요일 휴무)',
          theme_tags: ['커피', '레트로', '아침'],
          coordinates: { lat: 35.7261, lng: 139.7671 },
          image: IMAGES.coffee,
          confidence: 0.91,
          mention_count: 8,
        },
      ],
    },
    {
      id: 'roppongi',
      order: 9,
      title_large: { primary: '롯폰기', native: '六本木', local: 'Roppongi' },
      subtitle_intent: '밤의 도시에서 낮의 미술관으로. 롯폰기의 두 번째 정체성',
      cover_image: IMAGES.roppongi,
      cluster_center: { lat: 35.6627, lng: 139.7317 },
      cards: [
        {
          id: 'mori-art',
          name: { ko: '모리 미술관', romaji: 'Mori Art Museum', native: '森美術館' },
          one_liner: {
            ko: '53층에 있는 현대미술관. 전시와 전망이 한 티켓에 포함된다',
            en: 'A contemporary art museum on the 53rd floor. The exhibition and the view are on one ticket.',
          },
          address: '6-10-1 Roppongi, Minato City, Tokyo 106-6150 53F',
          hours: '10:00 – 22:00 (화요일 17:00까지)',
          theme_tags: ['미술관', '전망', '현대미술'],
          coordinates: { lat: 35.6606, lng: 139.7291 },
          image: IMAGES.roppongi,
          confidence: 0.96,
          mention_count: 11,
        },
        {
          id: 'national-art-center',
          name: { ko: '국립신미술관', romaji: 'National Art Center Tokyo', native: '国立新美術館' },
          one_liner: {
            ko: '구로카와 기쇼의 마지막 대작. 전시가 없어도 건물 자체를 보러 갈 이유가 있다',
            en: 'Kisho Kurokawa\'s final major work. Worth visiting even when there\'s no exhibition.',
          },
          address: '7-22-2 Roppongi, Minato City, Tokyo 106-8558',
          hours: '10:00 – 18:00 (화요일 휴무)',
          theme_tags: ['미술관', '건축', '무료'],
          coordinates: { lat: 35.6651, lng: 139.7271 },
          image: IMAGES.roppongi,
          confidence: 0.89,
          mention_count: 7,
        },
        {
          id: 'roppongi-ramen',
          name: { ko: '잇푸도 롯폰기', romaji: 'Ippudo Roppongi', native: '一風堂六本木' },
          one_liner: {
            ko: '미술관을 나와 라멘 한 그릇. 시라마루 베이스를 시켜라',
            en: 'A bowl after the museum. Order the Shiromaru Base.',
          },
          address: '6-2-31 Roppongi, Minato City, Tokyo 106-0032',
          hours: '11:00 – 23:00',
          theme_tags: ['라멘', '식사', '체인'],
          coordinates: { lat: 35.6632, lng: 139.7317 },
          image: IMAGES.ramen,
          confidence: 0.77,
          mention_count: 4,
        },
      ],
    },
    {
      id: 'azabu-juban',
      order: 10,
      title_large: { primary: '아자부주반', native: '麻布十番', local: 'Azabu-Juban' },
      subtitle_intent: '외교관과 오래된 과자집이 공존하는, 도쿄에서 가장 조용한 부촌',
      cover_image: IMAGES.azabuJuban,
      cluster_center: { lat: 35.6567, lng: 139.7359 },
      cards: [
        {
          id: 'naniwaya-souhonten',
          name: { ko: '나니와야 소혼텐', romaji: 'Naniwaya Souhonten', native: '浪花家総本店' },
          one_liner: {
            ko: '타이야키의 원조. 1909년부터 같은 자리. 줄이 있어도 기다릴 가치가 있다',
            en: 'The original taiyaki shop since 1909. Same spot. The queue is worth it.',
          },
          address: '1-8-14 Azabu-Juban, Minato City, Tokyo 106-0045',
          hours: '11:00 – 19:00 (수요일 휴무)',
          theme_tags: ['디저트', '전통', '원조'],
          coordinates: { lat: 35.6567, lng: 139.7359 },
          image: IMAGES.azabuJuban,
          confidence: 0.94,
          mention_count: 8,
        },
        {
          id: 'azabu-market',
          name: { ko: '아자부주반 상점가', romaji: 'Azabu-Juban Shopping Street', native: '麻布十番商店街' },
          one_liner: {
            ko: '100년 된 화과자 가게 옆에 프랑스 대사관이 있다. 이 조합이 아자부주반이다',
            en: 'A century-old wagashi shop beside the French Embassy. That combination is Azabu-Juban.',
          },
          address: 'Azabu-Juban 1-chome, Minato City, Tokyo',
          hours: '10:00 – 20:00 (가게별 상이)',
          theme_tags: ['상점가', '화과자', '산책'],
          coordinates: { lat: 35.6573, lng: 139.7362 },
          image: IMAGES.azabuJuban,
          confidence: 0.85,
          mention_count: 6,
        },
        {
          id: 'motoazabu',
          name: { ko: '모토아자부 힐즈', romaji: 'Moto-Azabu Hills', native: '元麻布ヒルズ' },
          one_liner: {
            ko: '언덕 위의 조용한 주택가. 도쿄에서 가장 엽서 같은 골목이 여기 있다',
            en: 'A quiet residential hill. The most postcard-perfect alley in Tokyo is here.',
          },
          address: 'Moto-Azabu, Minato City, Tokyo',
          hours: '24시간 (골목)',
          theme_tags: ['산책', '조용한', '포토스팟'],
          coordinates: { lat: 35.6551, lng: 139.7320 },
          image: IMAGES.azabuJuban,
          confidence: 0.62,
          mention_count: 3,
        },
      ],
    },
  ],

  day_trips: {
    is_day_trip: true,
    cover_image: IMAGES.hakone,
    title: {
      ko: 'Day Trips — 도쿄 너머 하루',
      en: 'Day Trips — One Day Beyond Tokyo',
    },
    subtitle_intent: '도쿄에서 기차로 한두 시간. 완전히 다른 일본이 기다린다',
    subsections: [
      {
        id: 'hakone',
        name: { ko: '하코네 — 산과 온천', en: 'Hakone — Mountains & Hot Springs' },
        narrative: {
          ko: '신칸센으로 한 시간. 해발이 도쿄의 다른 모든 것을 흐리게 만든다. 오다큐 하코네 패스를 산다.',
          en: 'One hour by Romancecar. The altitude blurs everything else about Tokyo. Buy the Odakyu Hakone Pass.',
        },
        cover_image: IMAGES.hakone,
        cards: [
          {
            id: 'hakone-open-air',
            name: { ko: '하코네 조각의 숲 미술관', romaji: 'Hakone Open-Air Museum', native: '箱根彫刻の森美術館' },
            one_liner: {
              ko: '야외 미술관. 피카소관과 헨리 무어. 날씨가 좋으면 후지산이 보인다',
              en: 'Outdoor sculpture museum. Picasso Pavilion and Henry Moore. On clear days, Mt. Fuji.',
            },
            address: '1121 Ninotaira, Hakone, Ashigarashimo District, Kanagawa',
            hours: '09:00 – 17:00',
            theme_tags: ['미술관', '자연', '조각'],
            coordinates: { lat: 35.2527, lng: 139.0205 },
            image: IMAGES.hakone,
            confidence: 0.9,
            mention_count: 7,
          },
          {
            id: 'hakone-onsen',
            name: { ko: '텐잔 온센', romaji: 'Tenzan Onsen', native: '天山湯治郷' },
            one_liner: {
              ko: '하코네에서 가장 로컬한 온센. 관광객보다 현지인이 많다',
              en: 'The most local onsen in Hakone. More locals than tourists.',
            },
            address: '208 Yumoto, Hakone, Ashigarashimo District, Kanagawa',
            hours: '09:00 – 22:00',
            theme_tags: ['온센', '자연', '휴식'],
            coordinates: { lat: 35.2338, lng: 139.1058 },
            image: IMAGES.hakone,
            confidence: 0.85,
            mention_count: 6,
          },
          {
            id: 'hakone-fuji',
            name: { ko: '아시 호수', romaji: 'Lake Ashi', native: '芦ノ湖' },
            one_liner: {
              ko: '후지산을 호수에서 바라보는 앵글. 운이 따라야 구름이 없다',
              en: 'The angle of Fuji from across the lake. You need luck for a clear sky.',
            },
            address: 'Ashinoko, Hakone, Ashigarashimo District, Kanagawa',
            hours: '24시간',
            theme_tags: ['자연', '후지산', '포토스팟'],
            coordinates: { lat: 35.2037, lng: 139.0222 },
            image: IMAGES.hakone,
            confidence: 0.92,
            mention_count: 9,
          },
        ],
      },
      {
        id: 'nikko',
        name: { ko: '닛코 — 산속의 사당', en: 'Nikko — Shrine in the Mountains' },
        narrative: {
          ko: '도쿄에서 신칸센 90분. 도쿠가와 막부의 영묘가 삼나무 숲 속에 있다. 가을에 오면 전혀 다른 색이 된다.',
          en: '90 minutes from Tokyo by shinkansen. The Tokugawa shogunate mausoleum sits in a cedar forest. Come in autumn for entirely different colours.',
        },
        cover_image: IMAGES.nikko,
        cards: [
          {
            id: 'toshogu',
            name: { ko: '도쇼구', romaji: 'Toshogu Shrine', native: '東照宮' },
            one_liner: {
              ko: '일본에서 가장 화려한 신사. 금박과 조각이 건물 하나에 다 들어있다',
              en: 'Japan\'s most ornate shrine. Gold leaf and carvings packed into a single structure.',
            },
            address: '2301 Sannai, Nikko, Tochigi 321-1431',
            hours: '08:00 – 17:00',
            theme_tags: ['신사', '세계유산', '역사'],
            coordinates: { lat: 36.7580, lng: 139.5994 },
            image: IMAGES.nikko,
            confidence: 0.97,
            mention_count: 10,
          },
          {
            id: 'kegon-falls',
            name: { ko: '케곤 폭포', romaji: 'Kegon Falls', native: '華厳の滝' },
            one_liner: {
              ko: '97미터 낙하. 엘리베이터를 타고 내려가면 더 가까이 볼 수 있다',
              en: 'A 97-metre drop. Take the elevator down for a closer view.',
            },
            address: 'Chuzenji, Nikko, Tochigi 321-1661',
            hours: '08:00 – 16:30',
            theme_tags: ['폭포', '자연', '전망'],
            coordinates: { lat: 36.7494, lng: 139.4939 },
            image: IMAGES.nikko,
            confidence: 0.88,
            mention_count: 6,
          },
        ],
      },
      {
        id: 'kamakura',
        name: { ko: '가마쿠라 — 바다와 대불', en: 'Kamakura — Sea & Great Buddha' },
        narrative: {
          ko: '도쿄에서 한 시간. 13세기 막부의 수도였던 작은 해안 도시. 대불을 보고, 에노시마에서 해산물을 먹는다.',
          en: 'One hour from Tokyo. A small coastal city that was a 13th-century shogunate capital. See the Great Buddha. Eat seafood in Enoshima.',
        },
        cover_image: IMAGES.kamakura,
        cards: [
          {
            id: 'kotoku-in',
            name: { ko: '고토쿠인 (가마쿠라 대불)', romaji: 'Kotoku-in (Great Buddha)', native: '高徳院 (鎌倉大仏)' },
            one_liner: {
              ko: '13미터 청동 대불. 내부에 들어갈 수 있다는 사실을 아는 사람이 드물다',
              en: 'A 13-metre bronze Buddha. Few visitors know you can go inside.',
            },
            address: '4-2-28 Hase, Kamakura, Kanagawa 248-0016',
            hours: '08:00 – 17:30',
            theme_tags: ['불상', '세계유산', '역사'],
            coordinates: { lat: 35.3167, lng: 139.5353 },
            image: IMAGES.kamakura,
            confidence: 0.96,
            mention_count: 11,
          },
          {
            id: 'tsurugaoka',
            name: { ko: '쓰루가오카 하치만구', romaji: 'Tsurugaoka Hachimangu', native: '鶴岡八幡宮' },
            one_liner: {
              ko: '가마쿠라의 중심 신사. 단풍 계절에는 혼자 걷기 좋은 뒷길이 있다',
              en: 'Kamakura\'s central shrine. In autumn, there\'s a back path best walked alone.',
            },
            address: '2-1-31 Yukinoshita, Kamakura, Kanagawa 248-8588',
            hours: '05:00 – 21:00',
            theme_tags: ['신사', '단풍', '역사'],
            coordinates: { lat: 35.3258, lng: 139.5562 },
            image: IMAGES.torii,
            confidence: 0.9,
            mention_count: 7,
          },
        ],
      },
      {
        id: 'yokohama',
        name: { ko: '요코하마 — 차이나타운과 항구', en: 'Yokohama — Chinatown & Harbour' },
        narrative: {
          ko: '도쿄에서 30분. 미나토미라이의 야경이 도쿄와 다른 이유가 있다. 바다가 보인다.',
          en: '30 minutes from Tokyo. The Minato Mirai night view differs from Tokyo for a reason — there\'s an ocean.',
        },
        cover_image: IMAGES.yokohama,
        cards: [
          {
            id: 'yokohama-chinatown',
            name: { ko: '요코하마 차이나타운', romaji: 'Yokohama Chinatown', native: '横浜中華街' },
            one_liner: {
              ko: '일본 최대 차이나타운. 딤섬과 월병이 메인. 평일에 오면 줄이 없다',
              en: 'Japan\'s largest Chinatown. Dim sum and mooncakes are the main draws. Come on a weekday.',
            },
            address: 'Yamashitacho, Naka Ward, Yokohama, Kanagawa 231-0023',
            hours: '11:00 – 22:00',
            theme_tags: ['딤섬', '차이나타운', '거리음식'],
            coordinates: { lat: 35.4437, lng: 139.6476 },
            image: IMAGES.yokohama,
            confidence: 0.89,
            mention_count: 7,
          },
          {
            id: 'minatomirai',
            name: { ko: '미나토미라이', romaji: 'Minato Mirai 21', native: 'みなとみらい21' },
            one_liner: {
              ko: '황혼 이후의 항구 전경. 여기서 보면 도쿄가 아닌 것처럼 보인다',
              en: 'The harbour after dusk. From here, it no longer looks like Tokyo.',
            },
            address: 'Minato Mirai, Nishi Ward, Yokohama, Kanagawa',
            hours: '24시간',
            theme_tags: ['야경', '항구', '산책'],
            coordinates: { lat: 35.4602, lng: 139.6313 },
            image: IMAGES.yokohama,
            confidence: 0.91,
            mention_count: 8,
          },
        ],
      },
    ],
  },

  appendix: {
    practical: {
      subcategories: [
        {
          id: 'entry-comms',
          name: { ko: '입국 · 통신 · 환전', en: 'Entry · Communications · Exchange' },
          tips: [
            { id: 'vjw', text: { ko: 'Visit Japan Web 사전 등록 — 입국 심사 최소 3일 전', en: 'Pre-register on Visit Japan Web — at least 3 days before arrival' }, source_atoms: ['@visitjapan'] },
            { id: 'esim', text: { ko: 'USIM 또는 eSIM — IIJmio 또는 Ahamo 추천, 공항 픽업도 가능', en: 'SIM or eSIM — IIJmio or Ahamo recommended, airport pickup available' } },
            { id: 'airport', text: { ko: '나리타 ↔ 시내: N\'EX 3,070¥ / 게이세이 스카이라이너 2,570¥', en: 'Narita ↔ City: N\'EX ¥3,070 / Keisei Skyliner ¥2,570' } },
            { id: 'ic-card', text: { ko: 'Suica 또는 PASMO IC 카드 — 모든 대중교통·편의점 사용 가능', en: 'Suica or PASMO IC card — works on all transit and convenience stores' } },
            { id: 'exchange', text: { ko: '환전: 세븐뱅크 ATM (세계 최저 수수료급), 24시간 운영', en: 'Exchange: Seven Bank ATM (among the lowest fees globally), open 24h' } },
          ],
        },
        {
          id: 'apps',
          name: { ko: '필수 앱', en: 'Essential Apps' },
          tips: [
            { id: 'google-maps', text: { ko: 'Google Maps — 오프라인 도쿄 지도 미리 다운로드 필수', en: 'Google Maps — download Tokyo offline map before arrival' } },
            { id: 'transit', text: { ko: 'Navitime for Japan Travel — 환승 복잡한 노선 전용', en: 'Navitime for Japan Travel — for complex rail connections' } },
            { id: 'tabelog', text: { ko: '타베로그 — 맛집 평점은 3.5 이상부터 신뢰', en: 'Tabelog — trust ratings above 3.5' } },
            { id: 'paypay', text: { ko: 'PayPay — QR 결제, 외국 카드 연동 가능 (비자/마스터)', en: 'PayPay — QR payment, links to foreign Visa/Mastercard' } },
            { id: 'jnto', text: { ko: 'Japan Official Travel App — 재난 경보 및 다국어 관광 정보', en: 'Japan Official Travel App — disaster alerts and multilingual tourism info' } },
          ],
        },
        {
          id: 'packing',
          name: { ko: '준비물 · 짐', en: 'Packing · Luggage' },
          tips: [
            { id: 'shoes', text: { ko: '걸을 신발 두 켤레 — 도쿄는 하루 15km 걷는 도시', en: 'Two pairs of walking shoes — Tokyo is a 15km-per-day city' } },
            { id: 'luggage', text: { ko: '캐리어는 호텔 직배송 (야마토 운수) — 공항에서 들고 다닐 필요 없음', en: 'Ship luggage to hotel via Yamato Transport — no need to carry from airport' } },
            { id: 'power', text: { ko: '일본 콘센트: 110V, 미국형 2핀 — 유럽·한국 어댑터 필요', en: 'Japan power: 110V, US-type 2-pin — European/Korean adapter required' } },
            { id: 'cash', text: { ko: '현금 필수 — 소규모 식당, 신사, 자판기는 카드 미지원', en: 'Cash is essential — small restaurants, shrines, vending machines are cash only' } },
            { id: 'bag', text: { ko: '에코백 하나 — 편의점 봉투는 유료, 쇼핑 공간도 확보', en: 'One eco-bag — convenience store bags cost extra, extra shopping space is useful' } },
          ],
        },
        {
          id: 'local-tips',
          name: { ko: '현지 팁 — 편의점 · 돈키호테', en: 'Local Tips — Convenience Stores · Don Quijote' },
          tips: [
            { id: 'combini', text: { ko: '세븐일레븐 오니기리 > 로손 > 패밀리마트 (주관적 서열)', en: '7-Eleven onigiri > Lawson > FamilyMart (subjective ranking)' } },
            { id: 'lawson-coffee', text: { ko: '로손 마치카페 아이스 카페라떼: 180¥. 도쿄 최성가비 커피', en: 'Lawson Machi Café Iced Latte: ¥180. Best value coffee in Tokyo.' } },
            { id: 'donki', text: { ko: '돈키호테 면세: 5,000¥ 이상 구매 시 즉시 면세 (여권 지참)', en: 'Don Quijote tax-free: instant exemption on purchases over ¥5,000 (bring passport)' } },
            { id: 'konbini-atm', text: { ko: '편의점 ATM은 새벽 2시에도 열린다. 현금 떨어지면 당황하지 말 것', en: 'Convenience store ATMs work at 2am. Don\'t panic when you run out of cash.' } },
            { id: 'jrpass', text: { ko: 'JR 패스는 닛코·하코네·가마쿠라 당일치기 포함 시 경제적', en: 'JR Pass is economical if day trips to Nikko, Hakone, or Kamakura are included' } },
          ],
        },
        {
          id: 'etiquette',
          name: { ko: '에티켓', en: 'Etiquette' },
          tips: [
            { id: 'quiet', text: { ko: '전철 안에서 통화 금지. 무음 모드 + 이어폰이 기본', en: 'No phone calls on trains. Silent mode and earphones are standard.' } },
            { id: 'escalator', text: { ko: '에스컬레이터: 도쿄는 왼쪽 서기, 오른쪽 비우기 (오사카 반대)', en: 'Escalators: Tokyo stands left, keeps right clear (opposite of Osaka)' } },
            { id: 'trash', text: { ko: '길거리 쓰레기통이 없다. 편의점에 버리거나 들고 다닌다', en: 'There are no public bins. Use convenience store bins or carry your trash.' } },
            { id: 'tipping', text: { ko: '팁은 일절 없다. 거스름돈을 거부하면 혼란만 생긴다', en: 'No tipping. Refusing change creates confusion.' } },
            { id: 'onsen', text: { ko: '온센: 타투는 대부분 입장 불가. 수건으로 물을 오염시키지 않는다', en: 'Onsen: tattoos are usually prohibited. Never let your towel touch the water.' } },
          ],
        },
      ],
    },
  },
};
