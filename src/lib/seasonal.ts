// ─────────────────────────────────────────────────────────
// Seasonal Recommendation Engine
// Maps months → seasons → best destinations to visit
// ─────────────────────────────────────────────────────────

export type Season = 'winter' | 'spring' | 'summer' | 'autumn';

export interface SeasonalDestination {
  name: string;
  country: string;
  reason: string;
  image: string;
  avgTemp: string;
  tags: string[];
}

export interface SeasonInfo {
  season: Season;
  emoji: string;
  title: string;
  subtitle: string;
  gradient: string;
  destinations: SeasonalDestination[];
}

// Determine season from current month (Northern Hemisphere default)
export function getCurrentSeason(): Season {
  const month = new Date().getMonth(); // 0-11
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

export function getCurrentMonthName(): string {
  return new Date().toLocaleString('en-US', { month: 'long' });
}

// ─────────────────────────── Seasonal Data ───────────────────────────

export const seasonalData: Record<Season, SeasonInfo> = {
  winter: {
    season: 'winter',
    emoji: '❄️',
    title: 'Winter Wonderland Escapes',
    subtitle: 'Chase the snow or escape to tropical warmth — the best winter getaways',
    gradient: 'linear-gradient(135deg, #1e3a5f, #4a90d9, #a8d8ea)',
    destinations: [
      {
        name: 'Reykjavik',
        country: 'Iceland',
        reason: 'Northern Lights, ice caves & geothermal spas',
        image: 'https://images.unsplash.com/photo-1521193089946-7aa29d1fe776?w=600&h=400&fit=crop',
        avgTemp: '-1°C / 30°F',
        tags: ['Northern Lights', 'Ice Caves', 'Hot Springs'],
      },
      {
        name: 'Interlaken',
        country: 'Switzerland',
        reason: 'World-class skiing, snow-capped Alps & cozy chalets',
        image: 'https://images.unsplash.com/photo-1527668752968-14ce70a6d7ea?w=600&h=400&fit=crop',
        avgTemp: '-2°C / 28°F',
        tags: ['Skiing', 'Alps', 'Winter Sports'],
      },
      {
        name: 'Banff',
        country: 'Canada',
        reason: 'Frozen lakes, powder skiing & mountain wildlife',
        image: 'https://images.unsplash.com/photo-1523315748882-938ed9944a90?w=600&h=400&fit=crop',
        avgTemp: '-10°C / 14°F',
        tags: ['Skiing', 'Frozen Lakes', 'Wildlife'],
      },
      {
        name: 'Maldives',
        country: 'Maldives',
        reason: 'Escape winter — peak sunshine, dry season, crystal waters',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop',
        avgTemp: '28°C / 82°F',
        tags: ['Beach', 'Snorkeling', 'Luxury'],
      },
      {
        name: 'Phuket',
        country: 'Thailand',
        reason: 'Warm beaches, temple tours & vibrant night markets',
        image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&h=400&fit=crop',
        avgTemp: '27°C / 81°F',
        tags: ['Beach', 'Temples', 'Street Food'],
      },
      {
        name: 'Dubai',
        country: 'UAE',
        reason: 'Perfect weather for desert safaris & outdoor dining',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
        avgTemp: '24°C / 75°F',
        tags: ['Desert', 'Luxury', 'Shopping'],
      },
    ],
  },

  spring: {
    season: 'spring',
    emoji: '🌸',
    title: 'Spring Bloom Getaways',
    subtitle: 'Cherry blossoms, tulip fields & perfect weather for exploring',
    gradient: 'linear-gradient(135deg, #fce4ec, #f8bbd0, #e91e63)',
    destinations: [
      {
        name: 'Kyoto',
        country: 'Japan',
        reason: 'Cherry blossom season — iconic temples under pink canopies',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop',
        avgTemp: '15°C / 59°F',
        tags: ['Cherry Blossoms', 'Temples', 'Culture'],
      },
      {
        name: 'Amsterdam',
        country: 'Netherlands',
        reason: 'Tulip season at Keukenhof, canal cruises & cycling',
        image: 'https://images.unsplash.com/photo-1517736996303-4e64a4f87399?w=600&h=400&fit=crop',
        avgTemp: '12°C / 54°F',
        tags: ['Tulips', 'Canals', 'Cycling'],
      },
      {
        name: 'Paris',
        country: 'France',
        reason: 'Café terraces reopen, gardens bloom & fewer crowds',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop',
        avgTemp: '14°C / 57°F',
        tags: ['Gardens', 'Art', 'Gastronomy'],
      },
      {
        name: 'Lisbon',
        country: 'Portugal',
        reason: 'Sunshine, tram rides & vibrant outdoor festivals',
        image: 'https://images.unsplash.com/photo-1585255318859-f5c15f4cffe9?w=600&h=400&fit=crop',
        avgTemp: '18°C / 64°F',
        tags: ['Trams', 'Sunshine', 'Pastries'],
      },
      {
        name: 'Cusco',
        country: 'Peru',
        reason: 'Dry season starts — ideal for Machu Picchu treks',
        image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&h=400&fit=crop',
        avgTemp: '12°C / 54°F',
        tags: ['Machu Picchu', 'Trekking', 'History'],
      },
      {
        name: 'Seoul',
        country: 'South Korea',
        reason: 'Cherry blossoms along the Han River, vibrant K-culture',
        image: 'https://images.unsplash.com/photo-1515861461225-1488dfdaf0a8?w=600&h=400&fit=crop',
        avgTemp: '13°C / 55°F',
        tags: ['Cherry Blossoms', 'K-Culture', 'Street Food'],
      },
    ],
  },

  summer: {
    season: 'summer',
    emoji: '☀️',
    title: 'Summer Adventure Destinations',
    subtitle: 'Sun-soaked coastlines, festivals & the perfect season for exploration',
    gradient: 'linear-gradient(135deg, #ff9800, #ff5722, #f44336)',
    destinations: [
      {
        name: 'Santorini',
        country: 'Greece',
        reason: 'Iconic sunsets, blue domes & crystal Aegean waters',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=400&fit=crop',
        avgTemp: '28°C / 82°F',
        tags: ['Sunset', 'Islands', 'Mediterranean'],
      },
      {
        name: 'Barcelona',
        country: 'Spain',
        reason: 'Beach days, Gaudí architecture & La Tomatina festival',
        image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop',
        avgTemp: '27°C / 81°F',
        tags: ['Beach', 'Architecture', 'Nightlife'],
      },
      {
        name: 'Bali',
        country: 'Indonesia',
        reason: 'Dry season perfection — rice terraces, surfing & temples',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop',
        avgTemp: '27°C / 81°F',
        tags: ['Surfing', 'Temples', 'Rice Terraces'],
      },
      {
        name: 'Dubrovnik',
        country: 'Croatia',
        reason: 'Old town walls, island hopping & Adriatic sunsets',
        image: 'https://images.unsplash.com/photo-1555990538-2df8b1be4bdc?w=600&h=400&fit=crop',
        avgTemp: '26°C / 79°F',
        tags: ['Old Town', 'Islands', 'Game of Thrones'],
      },
      {
        name: 'Cape Town',
        country: 'South Africa',
        reason: 'Whale watching season, Table Mountain & wine regions',
        image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&h=400&fit=crop',
        avgTemp: '18°C / 64°F',
        tags: ['Mountains', 'Wine', 'Wildlife'],
      },
      {
        name: 'Cancun',
        country: 'Mexico',
        reason: 'Caribbean beaches, cenotes & Mayan ruins',
        image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=600&h=400&fit=crop',
        avgTemp: '31°C / 88°F',
        tags: ['Beach', 'Ruins', 'Cenotes'],
      },
    ],
  },

  autumn: {
    season: 'autumn',
    emoji: '🍂',
    title: 'Autumn Foliage & Harvest',
    subtitle: 'Golden landscapes, harvest festivals & crisp adventure weather',
    gradient: 'linear-gradient(135deg, #bf360c, #e65100, #ff8f00)',
    destinations: [
      {
        name: 'Kyoto',
        country: 'Japan',
        reason: 'Spectacular maple foliage at ancient temples',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop',
        avgTemp: '16°C / 61°F',
        tags: ['Autumn Leaves', 'Temples', 'Culture'],
      },
      {
        name: 'New York',
        country: 'USA',
        reason: 'Central Park foliage, Broadway & Halloween in NYC',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop',
        avgTemp: '14°C / 57°F',
        tags: ['Foliage', 'Broadway', 'City Life'],
      },
      {
        name: 'Prague',
        country: 'Czech Republic',
        reason: 'Fairytale streets, beer gardens & golden hour charm',
        image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=600&h=400&fit=crop',
        avgTemp: '10°C / 50°F',
        tags: ['Old Town', 'Beer', 'Architecture'],
      },
      {
        name: 'Marrakech',
        country: 'Morocco',
        reason: 'Perfect weather to explore souks, riads & the Sahara',
        image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&h=400&fit=crop',
        avgTemp: '22°C / 72°F',
        tags: ['Souks', 'Desert', 'Culture'],
      },
      {
        name: 'Buenos Aires',
        country: 'Argentina',
        reason: 'Spring blooms (Southern Hemisphere), tango & steak',
        image: 'https://images.unsplash.com/photo-1612450849202-b43e813a30c8?w=600&h=400&fit=crop',
        avgTemp: '20°C / 68°F',
        tags: ['Tango', 'Food', 'Culture'],
      },
      {
        name: 'Rome',
        country: 'Italy',
        reason: 'Fewer crowds, pleasant weather & truffle season',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop',
        avgTemp: '18°C / 64°F',
        tags: ['History', 'Food', 'Architecture'],
      },
    ],
  },
};

// Hero background images - high quality scenic shots that rotate
export const heroBackgrounds = [
  {
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop',
    location: 'Monument Valley, USA',
  },
  {
    url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&h=1080&fit=crop',
    location: 'Tropical Beach, Maldives',
  },
  {
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&h=1080&fit=crop',
    location: 'Fushimi Inari Shrine, Kyoto',
  },
  {
    url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&h=1080&fit=crop',
    location: 'Eiffel Tower, Paris',
  },
  {
    url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1920&h=1080&fit=crop',
    location: 'Santorini, Greece',
  },
  {
    url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&h=1080&fit=crop',
    location: 'Tegallalang, Bali',
  },
  {
    url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1920&h=1080&fit=crop',
    location: 'Colosseum, Rome',
  },
  {
    url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&h=1080&fit=crop',
    location: 'Serengeti, Tanzania',
  },
  {
    url: 'https://images.unsplash.com/photo-1523315748882-938ed9944a90?w=1920&h=1080&fit=crop',
    location: 'Banff, Canada',
  },
  {
    url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop',
    location: 'Dubai, UAE',
  },
];
