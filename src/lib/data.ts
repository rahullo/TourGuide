// ─────────────────────────────────────────────────────────
// TourGuide Mock Data - Tours, Users, Bookings, Reviews
// ─────────────────────────────────────────────────────────

export interface Tour {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  country: string;
  coordinates: { lat: number; lng: number };
  images: string[];
  category: string;
  tags: string[];
  duration: string;
  durationHours: number;
  groupSize: { min: number; max: number };
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  languages: string[];
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  bookingCount: number;
  host: Host;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryItem[];
  meetingPoint: string;
  accessibility: string[];
  ageRestriction: string;
  cancellationPolicy: string;
  safetyInfo: string[];
  faqs: { question: string; answer: string }[];
  availableDates: string[];
  timeSlots: string[];
  featured: boolean;
  trending: boolean;
  bestSeller: boolean;
  instant: boolean;
}

export interface Host {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  verified: boolean;
  superhost: boolean;
  rating: number;
  reviewCount: number;
  tourCount: number;
  responseTime: string;
  languages: string[];
  expertise: string[];
  memberSince: string;
}

export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
  duration: string;
}

export interface Review {
  id: string;
  tourId: string;
  user: { name: string; avatar: string; country: string };
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

export interface Booking {
  id: string;
  tourId: string;
  tourTitle: string;
  tourImage: string;
  date: string;
  time: string;
  guests: number;
  total: number;
  currency: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  voucherCode: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  image: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  tourCount: number;
}

// ─────────────────────────── Categories ───────────────────────────
export const categories: Category[] = [
  { id: '1', name: 'Adventure', icon: '🏔️', count: 1245, image: 'https://images.unsplash.com/photo-1533692328991-08159ff19fca?w=400&h=300&fit=crop' },
  { id: '2', name: 'Cultural', icon: '🏛️', count: 2130, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop' },
  { id: '3', name: 'Food & Wine', icon: '🍷', count: 987, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop' },
  { id: '4', name: 'Nature', icon: '🌿', count: 1560, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop' },
  { id: '5', name: 'City Tours', icon: '🏙️', count: 3200, image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop' },
  { id: '6', name: 'Water Sports', icon: '🤿', count: 890, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop' },
  { id: '7', name: 'Photography', icon: '📸', count: 456, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
  { id: '8', name: 'Wellness', icon: '🧘', count: 678, image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop' },
];

// ─────────────────────────── Destinations ───────────────────────────
export const destinations: Destination[] = [
  // Europe
  { id: '1', name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop', tourCount: 542 },
  { id: '3', name: 'Rome', country: 'Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop', tourCount: 478 },
  { id: '5', name: 'Barcelona', country: 'Spain', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop', tourCount: 267 },
  { id: '10', name: 'Reykjavik', country: 'Iceland', image: 'https://images.unsplash.com/photo-1521193089946-7aa29d1fe776?w=600&h=400&fit=crop', tourCount: 156 },
  { id: '11', name: 'London', country: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop', tourCount: 612 },
  { id: '12', name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=400&fit=crop', tourCount: 289 },
  { id: '13', name: 'Amsterdam', country: 'Netherlands', image: 'https://images.unsplash.com/photo-1517736996303-4e64a4f87399?w=600&h=400&fit=crop', tourCount: 340 },
  { id: '14', name: 'Lisbon', country: 'Portugal', image: 'https://images.unsplash.com/photo-1585255318859-f5c15f4cffe9?w=600&h=400&fit=crop', tourCount: 275 },
  { id: '15', name: 'Prague', country: 'Czech Republic', image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=600&h=400&fit=crop', tourCount: 210 },
  { id: '16', name: 'Interlaken', country: 'Switzerland', image: 'https://images.unsplash.com/photo-1527668752968-14ce70a6d7ea?w=600&h=400&fit=crop', tourCount: 184 },
  { id: '17', name: 'Dubrovnik', country: 'Croatia', image: 'https://images.unsplash.com/photo-1555990538-2df8b1be4bdc?w=600&h=400&fit=crop', tourCount: 165 },

  // Asia
  { id: '2', name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop', tourCount: 389 },
  { id: '4', name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop', tourCount: 312 },
  { id: '7', name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop', tourCount: 215 },
  { id: '18', name: 'Phuket', country: 'Thailand', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&h=400&fit=crop', tourCount: 280 },
  { id: '19', name: 'Maldives', country: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop', tourCount: 120 },
  { id: '20', name: 'Hanoi', country: 'Vietnam', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&h=400&fit=crop', tourCount: 156 },
  { id: '21', name: 'Seoul', country: 'South Korea', image: 'https://images.unsplash.com/photo-1515861461225-1488dfdaf0a8?w=600&h=400&fit=crop', tourCount: 230 },
  { id: '22', name: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop', tourCount: 345 },
  { id: '23', name: 'Istanbul', country: 'Turkey', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=400&fit=crop', tourCount: 410 },

  // Africa
  { id: '8', name: 'Cape Town', country: 'South Africa', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&h=400&fit=crop', tourCount: 184 },
  { id: '24', name: 'Marrakech', country: 'Morocco', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&h=400&fit=crop', tourCount: 195 },
  { id: '25', name: 'Cairo', country: 'Egypt', image: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=600&h=400&fit=crop', tourCount: 150 },
  { id: '26', name: 'Serengeti', country: 'Tanzania', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop', tourCount: 85 },
  { id: '27', name: 'Mahe', country: 'Seychelles', image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&h=400&fit=crop', tourCount: 42 },
  
  // Oceania
  { id: '9', name: 'Sydney', country: 'Australia', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=400&fit=crop', tourCount: 310 },
  { id: '28', name: 'Queenstown', country: 'New Zealand', image: 'https://images.unsplash.com/photo-1589801124699-281b3cc767ea?w=600&h=400&fit=crop', tourCount: 145 },
  { id: '29', name: 'Bora Bora', country: 'French Polynesia', image: 'https://images.unsplash.com/photo-1589979481223-deb8930430fa?w=600&h=400&fit=crop', tourCount: 65 },
  { id: '30', name: 'Nadi', country: 'Fiji', image: 'https://images.unsplash.com/photo-1540835296355-c05282914106?w=600&h=400&fit=crop', tourCount: 88 },

  // Americas
  { id: '6', name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop', tourCount: 623 },
  { id: '31', name: 'Rio de Janeiro', country: 'Brazil', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&h=400&fit=crop', tourCount: 220 },
  { id: '32', name: 'Cancun', country: 'Mexico', image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=600&h=400&fit=crop', tourCount: 315 },
  { id: '33', name: 'Banff', country: 'Canada', image: 'https://images.unsplash.com/photo-1523315748882-938ed9944a90?w=600&h=400&fit=crop', tourCount: 190 },
  { id: '34', name: 'Cusco', country: 'Peru', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&h=400&fit=crop', tourCount: 140 },
  { id: '35', name: 'San Jose', country: 'Costa Rica', image: 'https://images.unsplash.com/photo-1623999490159-fbba117b08ee?w=600&h=400&fit=crop', tourCount: 165 },
  { id: '36', name: 'Buenos Aires', country: 'Argentina', image: 'https://images.unsplash.com/photo-1612450849202-b43e813a30c8?w=600&h=400&fit=crop', tourCount: 175 },
];

// ─────────────────────────── Hosts ───────────────────────────
const hosts: Host[] = [
  {
    id: 'h1',
    name: 'Marco Rossi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Born and raised in Rome, I have been sharing the secrets of the Eternal City for over 15 years. Art historian by training, storyteller by passion.',
    verified: true, superhost: true, rating: 4.97, reviewCount: 1243, tourCount: 12,
    responseTime: 'Within 1 hour', languages: ['English', 'Italian', 'Spanish'],
    expertise: ['Roman History', 'Art & Architecture', 'Food Culture'], memberSince: '2019'
  },
  {
    id: 'h2',
    name: 'Yuki Tanaka',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'A Tokyo local with deep love for Japanese culture. From ancient temples to neon-lit streets, I will show you the real Tokyo that guidebooks miss.',
    verified: true, superhost: true, rating: 4.95, reviewCount: 876, tourCount: 8,
    responseTime: 'Within 2 hours', languages: ['English', 'Japanese', 'Mandarin'],
    expertise: ['Japanese Culture', 'Street Food', 'Hidden Gems'], memberSince: '2020'
  },
  {
    id: 'h3',
    name: 'Sophie Laurent',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    bio: 'Certified sommelier and Paris native. I combine my passion for wine, cheese, and history into unforgettable culinary journeys through the City of Light.',
    verified: true, superhost: false, rating: 4.91, reviewCount: 534, tourCount: 6,
    responseTime: 'Within 3 hours', languages: ['English', 'French'],
    expertise: ['Wine & Cheese', 'Parisian Culture', 'Gastronomy'], memberSince: '2021'
  },
  {
    id: 'h4',
    name: 'Ketut Suryadi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Balinese local guide with 10+ years of experience. I specialize in spiritual journeys, rice terrace treks, and authentic village experiences.',
    verified: true, superhost: true, rating: 4.93, reviewCount: 721, tourCount: 10,
    responseTime: 'Within 1 hour', languages: ['English', 'Indonesian', 'Balinese'],
    expertise: ['Balinese Culture', 'Trekking', 'Spirituality'], memberSince: '2018'
  },
];

// ─────────────────────────── Tours ───────────────────────────
export const tours: Tour[] = [
  {
    id: 't1', slug: 'ancient-rome-colosseum-forum-tour',
    title: 'Ancient Rome: Colosseum, Forum & Palatine Hill',
    subtitle: 'Skip-the-line guided tour through 2,000 years of history',
    description: 'Walk through the legendary Colosseum where gladiators once fought, explore the ruins of the Roman Forum where emperors ruled, and climb the Palatine Hill for breathtaking views of the ancient city. This comprehensive tour brings ancient Rome to life with expert commentary and skip-the-line access.',
    location: 'Rome', country: 'Italy',
    coordinates: { lat: 41.8902, lng: 12.4922 },
    images: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop',
    ],
    category: 'Cultural', tags: ['History', 'Architecture', 'Walking Tour', 'UNESCO'],
    duration: '3 hours', durationHours: 3,
    groupSize: { min: 1, max: 15 }, difficulty: 'Easy',
    languages: ['English', 'Italian', 'Spanish'],
    price: 59, originalPrice: 79, currency: 'USD',
    rating: 4.96, reviewCount: 2847, bookingCount: 15420,
    host: hosts[0],
    highlights: ['Skip-the-line Colosseum access', 'Expert historian guide', 'Roman Forum exploration', 'Palatine Hill panoramic views', 'Small group experience'],
    inclusions: ['Skip-the-line entry tickets', 'Licensed guide', 'Headsets for large groups', 'Bottled water'],
    exclusions: ['Hotel pickup/drop-off', 'Gratuities', 'Food and drinks'],
    itinerary: [
      { time: '09:00', title: 'Meet at Colosseum', description: 'Meet your guide at the designated meeting point near the Colosseum metro station.', duration: '10 min' },
      { time: '09:10', title: 'Colosseum Tour', description: 'Skip the line and enter the iconic amphitheater. Learn about gladiatorial combat and Roman engineering.', duration: '75 min' },
      { time: '10:25', title: 'Roman Forum', description: 'Walk through the ancient marketplace and political center of Rome.', duration: '50 min' },
      { time: '11:15', title: 'Palatine Hill', description: 'Climb the legendary hill for stunning views and explore imperial palace ruins.', duration: '35 min' },
    ],
    meetingPoint: 'Near Colosseum Metro Station (Line B), look for the green TourGuide flag',
    accessibility: ['Partially wheelchair accessible', 'Not suitable for mobility impairments on Palatine Hill'],
    ageRestriction: 'All ages welcome. Children under 6 free.',
    cancellationPolicy: 'Free cancellation up to 24 hours before the tour. No refund for no-shows.',
    safetyInfo: ['Wear comfortable walking shoes', 'Bring sun protection in summer', 'Stay hydrated'],
    faqs: [
      { question: 'What if it rains?', answer: 'The tour operates rain or shine. We recommend bringing a light rain jacket.' },
      { question: 'Is this suitable for children?', answer: 'Yes! Our guides are great with kids and adapt the commentary to keep younger visitors engaged.' },
      { question: 'How much walking is involved?', answer: 'Approximately 3km of walking on mostly flat terrain with some stairs at Palatine Hill.' },
    ],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15', '2026-08-16'],
    timeSlots: ['09:00', '11:00', '14:00', '16:00'],
    featured: true, trending: true, bestSeller: true, instant: true
  },
  {
    id: 't2', slug: 'tokyo-street-food-adventure',
    title: 'Tokyo Street Food & Hidden Izakaya Tour',
    subtitle: 'Taste authentic Tokyo through its backstreet kitchens and local favorites',
    description: 'Dive into Tokyo\'s vibrant food scene on this immersive culinary adventure. Explore the bustling streets of Shinjuku and Shibuya, sample 10+ dishes at hidden local spots, and discover the izakaya culture that makes Tokyo the culinary capital of the world.',
    location: 'Tokyo', country: 'Japan',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1554797589-7241bb691973?w=800&h=600&fit=crop',
    ],
    category: 'Food & Wine', tags: ['Street Food', 'Nightlife', 'Japanese Cuisine', 'Local Experience'],
    duration: '4 hours', durationHours: 4,
    groupSize: { min: 2, max: 10 }, difficulty: 'Easy',
    languages: ['English', 'Japanese'],
    price: 89, currency: 'USD',
    rating: 4.94, reviewCount: 1562, bookingCount: 8934,
    host: hosts[1],
    highlights: ['10+ food tastings included', 'Hidden izakaya experience', 'Local guide insights', 'Sake tasting', 'Small group intimacy'],
    inclusions: ['All food tastings (10+ dishes)', 'Sake and beer samples', 'Local guide', 'Food allergy accommodations'],
    exclusions: ['Hotel transfers', 'Additional alcoholic beverages', 'Tips'],
    itinerary: [
      { time: '17:00', title: 'Meet in Shinjuku', description: 'Gather at the iconic Shinjuku Station east exit. Your food journey begins!', duration: '15 min' },
      { time: '17:15', title: 'Yakitori Alley', description: 'Start with the best yakitori (grilled chicken skewers) in Tokyo at a generations-old stall.', duration: '45 min' },
      { time: '18:00', title: 'Hidden Ramen Shop', description: 'Slurp authentic ramen at a tiny 8-seat counter beloved by locals.', duration: '40 min' },
      { time: '18:40', title: 'Izakaya Hopping', description: 'Experience 3 different izakayas, sampling gyoza, takoyaki, and more.', duration: '90 min' },
      { time: '20:10', title: 'Dessert & Sake Finale', description: 'End with matcha desserts and a premium sake tasting.', duration: '50 min' },
    ],
    meetingPoint: 'Shinjuku Station East Exit, next to the Studio Alta building',
    accessibility: ['Not wheelchair accessible', 'Some narrow staircases in old izakayas'],
    ageRestriction: 'Must be 18+ for sake tasting. Alternative beverages available.',
    cancellationPolicy: 'Free cancellation up to 48 hours before. 50% refund within 48 hours.',
    safetyInfo: ['Inform guide of food allergies before the tour', 'Wear comfortable walking shoes'],
    faqs: [
      { question: 'Can you accommodate dietary restrictions?', answer: 'Yes! Please inform us at booking. We can accommodate vegetarian, halal, and most allergies.' },
      { question: 'Is the tour suitable for non-drinkers?', answer: 'Absolutely. Non-alcoholic alternatives are available at every stop.' },
    ],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['17:00', '18:30'],
    featured: true, trending: true, bestSeller: false, instant: true
  },
  {
    id: 't3', slug: 'paris-wine-cheese-masterclass',
    title: 'Paris Wine & Cheese Masterclass Experience',
    subtitle: 'An intimate tasting journey through French terroirs in the heart of Paris',
    description: 'Join certified sommelier Sophie for an exquisite journey through France\'s finest wines and artisanal cheeses. Set in a charming Marais wine cellar, this experience combines education and indulgence as you discover the art of French pairing.',
    location: 'Paris', country: 'France',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop',
    ],
    category: 'Food & Wine', tags: ['Wine Tasting', 'Cheese', 'Culinary', 'Indoor Experience'],
    duration: '2.5 hours', durationHours: 2.5,
    groupSize: { min: 2, max: 12 }, difficulty: 'Easy',
    languages: ['English', 'French'],
    price: 95, originalPrice: 120, currency: 'USD',
    rating: 4.98, reviewCount: 987, bookingCount: 5621,
    host: hosts[2],
    highlights: ['7 premium French wines', '5 artisanal cheeses', 'Certified sommelier host', 'Historic Marais cellar', 'Take-home tasting notes'],
    inclusions: ['7 wine tastings', '5 cheese pairings', 'Charcuterie board', 'Tasting notes booklet', 'Sommelier-led education'],
    exclusions: ['Transportation', 'Additional wine purchases', 'Gratuities'],
    itinerary: [
      { time: '15:00', title: 'Welcome & Introduction', description: 'Arrive at the cellar, receive your tasting notes, and learn the basics of French wine regions.', duration: '20 min' },
      { time: '15:20', title: 'White Wine Journey', description: 'Taste 3 white wines from Burgundy, Loire Valley, and Alsace paired with soft cheeses.', duration: '45 min' },
      { time: '16:05', title: 'Red Wine Discovery', description: 'Explore 4 reds from Bordeaux, Rhône, and Languedoc with aged cheese pairings.', duration: '50 min' },
      { time: '16:55', title: 'Free Tasting & Q&A', description: 'Open tasting with charcuterie, ask questions, and discover your wine personality.', duration: '35 min' },
    ],
    meetingPoint: '14 Rue des Rosiers, Le Marais, Paris 75004. Ring the bell marked "Cave".',
    accessibility: ['Not wheelchair accessible (stairs to cellar)', 'Seated experience'],
    ageRestriction: 'Must be 18+ (legal drinking age in France).',
    cancellationPolicy: 'Free cancellation up to 24 hours before. No refund within 24 hours.',
    safetyInfo: ['Drink responsibly', 'Inform about allergies (dairy, sulfites)'],
    faqs: [
      { question: 'Do I need wine knowledge?', answer: 'Not at all! This experience is designed for all levels from curious beginners to enthusiasts.' },
    ],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15', '2026-08-16'],
    timeSlots: ['11:00', '15:00', '18:00'],
    featured: true, trending: false, bestSeller: true, instant: true
  },
  {
    id: 't4', slug: 'bali-rice-terraces-waterfall-trek',
    title: 'Bali Rice Terraces, Waterfall & Temple Trek',
    subtitle: 'A full-day journey through Bali\'s most iconic landscapes',
    description: 'Experience the breathtaking beauty of Bali on this full-day adventure. Trek through the iconic Tegallalang Rice Terraces, swim in a hidden waterfall, visit ancient Hindu temples, and enjoy a traditional Balinese lunch with panoramic valley views.',
    location: 'Bali', country: 'Indonesia',
    coordinates: { lat: -8.4095, lng: 115.1889 },
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=600&fit=crop',
    ],
    category: 'Nature', tags: ['Trekking', 'Waterfall', 'Rice Terraces', 'Temple', 'Full Day'],
    duration: '10 hours', durationHours: 10,
    groupSize: { min: 2, max: 8 }, difficulty: 'Moderate',
    languages: ['English', 'Indonesian'],
    price: 75, currency: 'USD',
    rating: 4.92, reviewCount: 1876, bookingCount: 11230,
    host: hosts[3],
    highlights: ['Tegallalang Rice Terrace trek', 'Hidden waterfall swim', 'Ancient temple visit', 'Traditional Balinese lunch', 'Hotel pickup included'],
    inclusions: ['Hotel pickup & drop-off', 'Licensed guide', 'Traditional lunch', 'Temple entry fees', 'Bottled water & snacks', 'Rain ponchos if needed'],
    exclusions: ['Personal expenses', 'Souvenir purchases', 'Optional donations at temples'],
    itinerary: [
      { time: '07:00', title: 'Hotel Pickup', description: 'Comfortable AC vehicle picks you up from your hotel in Ubud, Seminyak, or Kuta area.', duration: '45 min' },
      { time: '07:45', title: 'Tegallalang Rice Terraces', description: 'Trek through the stunning UNESCO-listed terraces with your guide explaining the Subak irrigation system.', duration: '120 min' },
      { time: '10:00', title: 'Hidden Waterfall', description: 'Short jungle trek to a beautiful hidden waterfall. Swim in the natural pool!', duration: '90 min' },
      { time: '11:30', title: 'Traditional Lunch', description: 'Enjoy a delicious Balinese feast overlooking a lush valley.', duration: '60 min' },
      { time: '12:30', title: 'Tirta Empul Temple', description: 'Visit this sacred water temple and observe traditional purification rituals.', duration: '75 min' },
      { time: '14:00', title: 'Return Journey', description: 'Relax on the drive back to your hotel.', duration: '60 min' },
    ],
    meetingPoint: 'Hotel lobby pickup (Ubud, Seminyak, Kuta, Sanur areas)',
    accessibility: ['Not wheelchair accessible', 'Requires moderate fitness for trekking', 'Uneven terrain and steps'],
    ageRestriction: 'Children 5+ welcome. Under 12 must be with adult.',
    cancellationPolicy: 'Free cancellation up to 48 hours before. 50% refund within 24-48 hours.',
    safetyInfo: ['Wear sturdy shoes', 'Bring swimwear for waterfall', 'Cover shoulders at temples', 'Apply insect repellent'],
    faqs: [
      { question: 'What should I bring?', answer: 'Comfortable shoes, swimwear, towel, sunscreen, camera, and a light jacket.' },
      { question: 'Is it suitable in rainy season?', answer: 'Yes! The terraces are especially beautiful in rain. We provide ponchos.' },
    ],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['07:00'],
    featured: true, trending: true, bestSeller: true, instant: false
  },
  {
    id: 't5', slug: 'barcelona-gaudi-architecture-tour',
    title: 'Barcelona: Gaudí Masterpieces Walking Tour',
    subtitle: 'Discover Sagrada Família, Park Güell & Casa Batlló with an architecture expert',
    description: 'Explore the genius of Antoni Gaudí on this architectural masterclass through Barcelona. Visit three of his most iconic works with skip-the-line access and gain deep insight into the mind behind modernist architecture.',
    location: 'Barcelona', country: 'Spain',
    coordinates: { lat: 41.4036, lng: 2.1744 },
    images: [
      'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1579282240050-352db0a14c21?w=800&h=600&fit=crop',
    ],
    category: 'Cultural', tags: ['Architecture', 'Gaudí', 'Walking Tour', 'UNESCO', 'Art'],
    duration: '5 hours', durationHours: 5,
    groupSize: { min: 1, max: 12 }, difficulty: 'Easy',
    languages: ['English', 'Spanish', 'Catalan'],
    price: 110, originalPrice: 140, currency: 'USD',
    rating: 4.95, reviewCount: 1234, bookingCount: 7890,
    host: { ...hosts[0], id: 'h5', name: 'Carlos Mendez', bio: 'Architecture professor and Barcelona native. I have studied Gaudí for 20 years and love sharing his vision.' },
    highlights: ['Skip-the-line to all 3 sites', 'Architecture professor guide', 'Sagrada Família interior', 'Park Güell mosaic terrace', 'Casa Batlló immersive experience'],
    inclusions: ['Skip-the-line tickets to 3 sites', 'Expert architecture guide', 'Metro tickets between sites', 'Headsets for comfort'],
    exclusions: ['Food and drinks', 'Hotel pickup', 'Gratuities'],
    itinerary: [
      { time: '09:00', title: 'Casa Batlló', description: 'Begin at this dreamlike building on Passeig de Gràcia and explore its organic interiors.', duration: '75 min' },
      { time: '10:15', title: 'Transit to Sagrada Família', description: 'Travel by metro while learning about Gaudí\'s life and influences.', duration: '20 min' },
      { time: '10:35', title: 'Sagrada Família', description: 'Marvel at Gaudí\'s unfinished masterpiece—explore the interior, crypt, and museum.', duration: '90 min' },
      { time: '12:05', title: 'Transit to Park Güell', description: 'Bus ride with commentary on Barcelona\'s modernist district.', duration: '25 min' },
      { time: '12:30', title: 'Park Güell', description: 'Explore the colorful mosaic terraces, Hypostyle Hall, and panoramic city views.', duration: '60 min' },
    ],
    meetingPoint: 'In front of Casa Batlló, Passeig de Gràcia 43, Barcelona',
    accessibility: ['Partially wheelchair accessible at ground levels', 'Significant walking involved'],
    ageRestriction: 'All ages. Children under 10 free at Park Güell.',
    cancellationPolicy: 'Free cancellation up to 24 hours before.',
    safetyInfo: ['Wear comfortable shoes', 'Keep belongings secure in crowded areas'],
    faqs: [
      { question: 'Can we go to the Sagrada Família towers?', answer: 'Tower access can be added for an additional fee. Please inquire at booking.' },
    ],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14'],
    timeSlots: ['09:00', '14:00'],
    featured: false, trending: true, bestSeller: false, instant: true
  },
  {
    id: 't6', slug: 'new-york-highlights-bike-tour',
    title: 'New York City Highlights Bike Tour',
    subtitle: 'Cycle through Manhattan\'s iconic landmarks in 3 hours',
    description: 'See the best of New York City on two wheels! This guided bike tour takes you through Central Park, past Times Square, across the Brooklyn Bridge, and along the Hudson River Greenway for an unforgettable NYC experience.',
    location: 'New York', country: 'USA',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    images: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1492666673288-3c4b4f1a6b11?w=800&h=600&fit=crop',
    ],
    category: 'Adventure', tags: ['Biking', 'City Tour', 'Outdoor', 'Landmarks'],
    duration: '3 hours', durationHours: 3,
    groupSize: { min: 2, max: 16 }, difficulty: 'Easy',
    languages: ['English'],
    price: 65, currency: 'USD',
    rating: 4.88, reviewCount: 2345, bookingCount: 13456,
    host: { ...hosts[0], id: 'h6', name: 'Jake Thompson', bio: 'NYC cyclist and history buff. Exploring the city on two wheels since 2010.' },
    highlights: ['Central Park ride', 'Brooklyn Bridge crossing', 'Times Square photo stop', 'Hudson River Greenway', 'Premium bike included'],
    inclusions: ['Premium hybrid bike rental', 'Helmet', 'Guided commentary', 'Photo stops', 'Water bottle'],
    exclusions: ['Food and drinks', 'Tips', 'Personal insurance'],
    itinerary: [
      { time: '10:00', title: 'Bike Fitting & Safety Briefing', description: 'Get fitted with your bike and helmet at our Midtown shop.', duration: '15 min' },
      { time: '10:15', title: 'Central Park Loop', description: 'Ride through the scenic paths of Central Park.', duration: '50 min' },
      { time: '11:05', title: 'Midtown to Brooklyn Bridge', description: 'Cycle through Manhattan and cross the iconic Brooklyn Bridge.', duration: '55 min' },
      { time: '12:00', title: 'DUMBO & Return', description: 'Explore DUMBO waterfront then ride back via the Hudson River Greenway.', duration: '60 min' },
    ],
    meetingPoint: 'NYC Bike Tours Shop, 56 W 56th St, Manhattan',
    accessibility: ['Requires ability to ride a bicycle', 'Some hills in Central Park'],
    ageRestriction: 'Ages 12+. Under 16 must be with adult.',
    cancellationPolicy: 'Free cancellation up to 24 hours before.',
    safetyInfo: ['Helmets mandatory', 'Follow traffic rules', 'Stay with the group'],
    faqs: [
      { question: 'What if I haven\'t biked in a while?', answer: 'No worries! The pace is relaxed and we use flat, safe bike paths for most of the route.' },
    ],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['09:00', '10:00', '14:00'],
    featured: false, trending: false, bestSeller: false, instant: true
  },
  {
    id: 't9', slug: 'monaco-grand-prix-circuit-tour',
    title: 'Monaco Grand Prix Circuit & Old Town Walking Tour',
    subtitle: 'Walk the legendary F1 street circuit and explore the glamorous principality',
    description: 'Follow the exact route of the Formula 1 Monaco Grand Prix on foot, then explore the charming Old Town with its narrow streets, the Prince\'s Palace, and stunning Mediterranean views. A perfect blend of motorsport history and Monégasque culture.',
    location: 'Monte Carlo', country: 'Monaco',
    coordinates: { lat: 43.7384, lng: 7.4246 },
    images: [
      'https://images.unsplash.com/photo-1589405858862-2ac9031448b2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop',
    ],
    category: 'City Tours', tags: ['F1', 'Luxury', 'Walking Tour', 'History'],
    duration: '3 hours', durationHours: 3,
    groupSize: { min: 1, max: 12 }, difficulty: 'Easy',
    languages: ['English', 'French', 'Italian'],
    price: 75, currency: 'USD',
    rating: 4.89, reviewCount: 342, bookingCount: 2100,
    host: hosts[0],
    highlights: ['Walk the F1 Grand Prix circuit', 'Prince\'s Palace exterior visit', 'Monte Carlo Casino square', 'Panoramic Mediterranean views', 'Japanese Garden'],
    inclusions: ['Licensed local guide', 'Headsets for groups', 'Map of the circuit'],
    exclusions: ['Hotel pickup', 'Food and drinks', 'Museum entries'],
    itinerary: [
      { time: '09:00', title: 'Meet at Casino Square', description: 'Start at the iconic Monte Carlo Casino.', duration: '15 min' },
      { time: '09:15', title: 'Grand Prix Circuit Walk', description: 'Walk the famous street circuit including the tunnel and hairpin.', duration: '75 min' },
      { time: '10:30', title: 'Old Town Exploration', description: 'Explore the historic Rock of Monaco and Prince\'s Palace.', duration: '60 min' },
      { time: '11:30', title: 'Oceanographic Museum Area', description: 'Visit the area around the world-famous aquarium.', duration: '15 min' },
    ],
    meetingPoint: 'Monte Carlo Casino main entrance', accessibility: ['Mostly flat terrain with some hills'], ageRestriction: 'All ages welcome',
    cancellationPolicy: 'Free cancellation up to 24 hours before.', safetyInfo: ['Wear comfortable shoes', 'Bring water'],
    faqs: [{ question: 'Is this tour available on race weekend?', answer: 'No, the circuit is closed during Grand Prix weekend. We offer special viewing tours instead.' }],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14'],
    timeSlots: ['09:00', '14:00'],
    featured: true, trending: true, bestSeller: false, instant: true
  },
  {
    id: 't10', slug: 'dubai-desert-safari-adventure',
    title: 'Dubai Desert Safari: Dune Bashing, Camel Ride & BBQ',
    subtitle: 'Experience the Arabian desert with thrilling adventures and traditional dining',
    description: 'An unforgettable evening in the Arabian desert featuring dune bashing in a 4x4, camel riding, sandboarding, henna painting, and a lavish BBQ dinner under the stars with live belly dancing.',
    location: 'Dubai', country: 'UAE',
    coordinates: { lat: 25.0657, lng: 55.1713 },
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800&h=600&fit=crop',
    ],
    category: 'Adventure', tags: ['Desert', '4x4', 'Sunset', 'BBQ', 'Camel'],
    duration: '6 hours', durationHours: 6,
    groupSize: { min: 2, max: 20 }, difficulty: 'Easy',
    languages: ['English', 'Arabic'],
    price: 89, originalPrice: 120, currency: 'USD',
    rating: 4.91, reviewCount: 1856, bookingCount: 12400,
    host: hosts[1],
    highlights: ['Dune bashing in luxury 4x4', 'Camel riding at sunset', 'Sandboarding', 'BBQ dinner with live entertainment', 'Stargazing in the desert'],
    inclusions: ['Hotel pickup and drop-off', '4x4 dune bashing', 'Camel ride', 'BBQ dinner with drinks', 'Henna painting'],
    exclusions: ['Quad biking (available for extra charge)', 'Professional photography'],
    itinerary: [
      { time: '15:00', title: 'Hotel Pickup', description: 'Pickup from your Dubai hotel in air-conditioned vehicle.', duration: '45 min' },
      { time: '15:45', title: 'Dune Bashing', description: 'Thrilling 4x4 ride over golden sand dunes.', duration: '45 min' },
      { time: '16:30', title: 'Desert Activities', description: 'Camel riding, sandboarding, and photo opportunities at sunset.', duration: '60 min' },
      { time: '17:30', title: 'BBQ Dinner & Entertainment', description: 'Enjoy a buffet BBQ with belly dancing and tanoura show.', duration: '120 min' },
    ],
    meetingPoint: 'Hotel lobby pickup', accessibility: ['Not wheelchair accessible'], ageRestriction: 'Children under 3 not recommended for dune bashing.',
    cancellationPolicy: 'Free cancellation up to 48 hours before.', safetyInfo: ['Seatbelts must be worn during dune bashing', 'Not suitable for pregnant women'],
    faqs: [{ question: 'What should I wear?', answer: 'Comfortable clothes, closed-toe shoes recommended. It can be cold in the desert at night—bring a light jacket.' }],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['15:00'],
    featured: true, trending: true, bestSeller: true, instant: true
  },
  {
    id: 't11', slug: 'istanbul-bosphorus-cruise-tour',
    title: 'Istanbul Bosphorus Cruise & Spice Market Tour',
    subtitle: 'Sail between two continents and explore Istanbul\'s vibrant bazaars',
    description: 'Cruise the Bosphorus Strait between Europe and Asia, passing Ottoman palaces and fortresses, then dive into the aromatic Spice Market for an immersive cultural experience.',
    location: 'Istanbul', country: 'Turkey',
    coordinates: { lat: 41.0082, lng: 28.9784 },
    images: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop',
    ],
    category: 'Cultural', tags: ['Cruise', 'History', 'Market', 'Ottoman'],
    duration: '5 hours', durationHours: 5,
    groupSize: { min: 2, max: 20 }, difficulty: 'Easy',
    languages: ['English', 'Turkish'],
    price: 55, currency: 'USD',
    rating: 4.87, reviewCount: 1234, bookingCount: 8900,
    host: hosts[2],
    highlights: ['Bosphorus cruise between continents', 'Dolmabahçe Palace views', 'Spice Market exploration', 'Turkish tea tasting'],
    inclusions: ['Bosphorus cruise ticket', 'Licensed guide', 'Turkish tea'],
    exclusions: ['Lunch', 'Shopping purchases'],
    itinerary: [
      { time: '09:30', title: 'Meet at Eminönü Pier', description: 'Meet your guide at the ferry terminal.', duration: '15 min' },
      { time: '09:45', title: 'Bosphorus Cruise', description: 'Sail past palaces, mosques, and fortresses.', duration: '120 min' },
      { time: '11:45', title: 'Spice Market Tour', description: 'Explore the Egyptian Bazaar with your guide.', duration: '75 min' },
      { time: '13:00', title: 'Tea & Farewell', description: 'Enjoy Turkish tea overlooking the Golden Horn.', duration: '30 min' },
    ],
    meetingPoint: 'Eminönü Ferry Terminal, Gate 3', accessibility: ['Wheelchair accessible on ferry'], ageRestriction: 'All ages welcome',
    cancellationPolicy: 'Free cancellation up to 24 hours before.', safetyInfo: ['Life jackets available on board', 'Watch your belongings at the market'],
    faqs: [{ question: 'Does the cruise go to Asia?', answer: 'The cruise sails along both the European and Asian shores but doesn\'t dock on the Asian side.' }],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['09:30', '14:00'],
    featured: false, trending: true, bestSeller: false, instant: true
  },
  {
    id: 't12', slug: 'barcelona-gaudi-masterpiece-tour',
    title: 'Barcelona Gaudí Masterpiece Tour with Sagrada Família',
    subtitle: 'Skip-the-line access to Sagrada Família, Park Güell & Casa Batlló',
    description: 'Discover the genius of Antoni Gaudí through his greatest masterpieces. Visit Sagrada Família, Park Güell, and Casa Batlló with skip-the-line tickets and an expert art guide.',
    location: 'Barcelona', country: 'Spain',
    coordinates: { lat: 41.4036, lng: 2.1744 },
    images: [
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop',
    ],
    category: 'Cultural', tags: ['Architecture', 'Art', 'UNESCO', 'Walking Tour'],
    duration: '6 hours', durationHours: 6,
    groupSize: { min: 1, max: 12 }, difficulty: 'Easy',
    languages: ['English', 'Spanish', 'French'],
    price: 95, originalPrice: 125, currency: 'USD',
    rating: 4.95, reviewCount: 2134, bookingCount: 11200,
    host: hosts[0],
    highlights: ['Skip-the-line Sagrada Família', 'Park Güell panoramic views', 'Casa Batlló interior visit', 'Expert art historian guide'],
    inclusions: ['All skip-the-line tickets', 'Licensed art guide', 'Headsets'],
    exclusions: ['Hotel pickup', 'Lunch', 'Gratuities'],
    itinerary: [
      { time: '09:00', title: 'Sagrada Família', description: 'Enter Gaudí\'s unfinished masterpiece with skip-the-line tickets.', duration: '90 min' },
      { time: '10:30', title: 'Transfer to Park Güell', description: 'Drive to Park Güell in air-conditioned vehicle.', duration: '20 min' },
      { time: '10:50', title: 'Park Güell', description: 'Explore the mosaic wonderland with city views.', duration: '75 min' },
      { time: '12:05', title: 'Casa Batlló', description: 'Visit the stunning House of Bones on Passeig de Gràcia.', duration: '55 min' },
    ],
    meetingPoint: 'Sagrada Família, Nativity Facade entrance', accessibility: ['Partially wheelchair accessible'], ageRestriction: 'All ages. Under 11 free at Sagrada Família.',
    cancellationPolicy: 'Free cancellation up to 48 hours before.', safetyInfo: ['Comfortable shoes required', 'Sun protection in summer'],
    faqs: [{ question: 'Can we enter the Sagrada Família towers?', answer: 'Tower access can be added for an extra fee. Please request at booking.' }],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['09:00', '14:00'],
    featured: true, trending: false, bestSeller: true, instant: true
  },
  {
    id: 't13', slug: 'santorini-sunset-catamaran-cruise',
    title: 'Santorini Sunset Catamaran Cruise with Dinner',
    subtitle: 'Sail the caldera, swim in hot springs, and dine as the sun sets over the Aegean',
    description: 'Experience the magic of Santorini from the water on a luxury catamaran cruise. Swim at volcanic hot springs, snorkel in crystal waters, and enjoy a fresh BBQ dinner while watching the world-famous Santorini sunset.',
    location: 'Santorini', country: 'Greece',
    coordinates: { lat: 36.3932, lng: 25.4615 },
    images: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
    ],
    category: 'Water Sports', tags: ['Sailing', 'Sunset', 'Snorkeling', 'Dinner Cruise'],
    duration: '5 hours', durationHours: 5,
    groupSize: { min: 4, max: 20 }, difficulty: 'Easy',
    languages: ['English', 'Greek'],
    price: 145, originalPrice: 185, currency: 'USD',
    rating: 4.97, reviewCount: 987, bookingCount: 5800,
    host: hosts[3],
    highlights: ['Luxury catamaran sailing', 'Volcanic hot springs swim', 'Snorkeling at Red Beach', 'BBQ dinner on board', 'Legendary Santorini sunset'],
    inclusions: ['Catamaran cruise', 'BBQ dinner', 'Unlimited wine & beer', 'Snorkeling equipment', 'Towels'],
    exclusions: ['Hotel transfer (available for extra)', 'Gratuities'],
    itinerary: [
      { time: '14:30', title: 'Board the Catamaran', description: 'Board from Vlychada Marina.', duration: '15 min' },
      { time: '14:45', title: 'Sailing & Hot Springs', description: 'Sail to the volcanic hot springs for a swim.', duration: '90 min' },
      { time: '16:15', title: 'Snorkeling Stop', description: 'Snorkel at a secluded cove near Red Beach.', duration: '45 min' },
      { time: '17:00', title: 'BBQ Dinner & Sunset', description: 'Enjoy dinner while watching the sunset paint the caldera.', duration: '120 min' },
    ],
    meetingPoint: 'Vlychada Marina, Santorini', accessibility: ['Not wheelchair accessible'], ageRestriction: 'Children under 4 not permitted.',
    cancellationPolicy: 'Free cancellation up to 48 hours before.', safetyInfo: ['Life jackets provided', 'Swimming ability required'],
    faqs: [{ question: 'What if the weather is bad?', answer: 'We monitor conditions closely. If the trip is cancelled due to weather, you will receive a full refund or reschedule.' }],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['14:30'],
    featured: true, trending: true, bestSeller: true, instant: false
  },
  {
    id: 't14', slug: 'machu-picchu-sacred-valley-day-trip',
    title: 'Machu Picchu & Sacred Valley Full-Day Tour',
    subtitle: 'Discover the lost city of the Incas with expert archaeological guides',
    description: 'Journey from Cusco through the Sacred Valley to the awe-inspiring Machu Picchu. Explore ancient temples, terraces, and learn about Inca civilization from expert archaeologists.',
    location: 'Cusco', country: 'Peru',
    coordinates: { lat: -13.1631, lng: -72.5450 },
    images: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop',
    ],
    category: 'Adventure', tags: ['UNESCO', 'Archaeology', 'Hiking', 'Inca'],
    duration: '14 hours', durationHours: 14,
    groupSize: { min: 2, max: 16 }, difficulty: 'Moderate',
    languages: ['English', 'Spanish'],
    price: 195, originalPrice: 250, currency: 'USD',
    rating: 4.94, reviewCount: 876, bookingCount: 4500,
    host: hosts[0],
    highlights: ['Machu Picchu guided tour', 'Scenic train through Sacred Valley', 'Ollantaytambo ruins', 'Buffet lunch with valley views'],
    inclusions: ['Train tickets', 'Machu Picchu entry', 'Licensed guide', 'Buffet lunch', 'Bus transfers'],
    exclusions: ['Huayna Picchu climb (extra permit)', 'Tips'],
    itinerary: [
      { time: '04:00', title: 'Hotel Pickup in Cusco', description: 'Early morning departure from your hotel.', duration: '30 min' },
      { time: '04:30', title: 'Drive to Ollantaytambo', description: 'Scenic drive through the Sacred Valley.', duration: '120 min' },
      { time: '06:30', title: 'Train to Aguas Calientes', description: 'Scenic train ride along the Urubamba River.', duration: '90 min' },
      { time: '08:00', title: 'Machu Picchu Tour', description: 'Guided exploration of the citadel.', duration: '240 min' },
    ],
    meetingPoint: 'Hotel lobby pickup in Cusco', accessibility: ['Not wheelchair accessible', 'High altitude - acclimatize first'], ageRestriction: 'All ages, but strenuous for young children.',
    cancellationPolicy: 'Free cancellation up to 72 hours before.', safetyInfo: ['Acclimatize in Cusco for at least 2 days', 'Bring rain gear', 'Stay hydrated'],
    faqs: [{ question: 'Do I need to be fit?', answer: 'A moderate fitness level is recommended. The altitude (2,430m) can be challenging—acclimatize in Cusco first.' }],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14'],
    timeSlots: ['04:00'],
    featured: true, trending: false, bestSeller: true, instant: false
  },
  {
    id: 't15', slug: 'cape-town-table-mountain-peninsula',
    title: 'Cape Town: Table Mountain & Cape Peninsula Day Tour',
    subtitle: 'Cable car ride, penguin colony, and the breathtaking Cape of Good Hope',
    description: 'Experience the best of Cape Town in one day. Ride the cable car up Table Mountain, visit the penguin colony at Boulders Beach, and stand at the dramatic Cape of Good Hope.',
    location: 'Cape Town', country: 'South Africa',
    coordinates: { lat: -33.9249, lng: 18.4241 },
    images: [
      'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=800&h=600&fit=crop',
    ],
    category: 'Nature', tags: ['Mountain', 'Wildlife', 'Scenic Drive', 'Photography'],
    duration: '10 hours', durationHours: 10,
    groupSize: { min: 2, max: 14 }, difficulty: 'Easy',
    languages: ['English'],
    price: 110, currency: 'USD',
    rating: 4.92, reviewCount: 654, bookingCount: 3800,
    host: hosts[3],
    highlights: ['Table Mountain cable car', 'Boulders Beach penguins', 'Cape of Good Hope', 'Chapman\'s Peak scenic drive'],
    inclusions: ['Air-conditioned vehicle', 'Table Mountain cable car ticket', 'Park entry fees', 'Licensed guide'],
    exclusions: ['Lunch', 'Gratuities'],
    itinerary: [
      { time: '08:00', title: 'Hotel Pickup', description: 'Pickup from Cape Town CBD hotel.', duration: '30 min' },
      { time: '08:30', title: 'Table Mountain', description: 'Cable car up for 360° views of the city.', duration: '120 min' },
      { time: '10:30', title: 'Chapman\'s Peak Drive', description: 'One of the world\'s most scenic coastal drives.', duration: '45 min' },
      { time: '11:15', title: 'Cape of Good Hope', description: 'Visit the southwestern tip of the African continent.', duration: '90 min' },
    ],
    meetingPoint: 'Hotel lobby pickup', accessibility: ['Cable car is wheelchair accessible'], ageRestriction: 'All ages welcome.',
    cancellationPolicy: 'Free cancellation up to 24 hours before.', safetyInfo: ['Weather can change quickly on Table Mountain', 'Don\'t feed the baboons'],
    faqs: [{ question: 'What if the cable car is closed?', answer: 'If closed due to weather, we offer a hike up or visit alternative attractions.' }],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['08:00'],
    featured: false, trending: true, bestSeller: false, instant: true
  },
  {
    id: 't16', slug: 'marrakech-medina-food-tour',
    title: 'Marrakech Medina Food Tour & Cooking Class',
    subtitle: 'Navigate the souks, taste street food, and cook a traditional Moroccan feast',
    description: 'Dive into the sensory overload of Marrakech\'s Medina with a local food expert. Sample street food, learn to bargain in the souks, and finish with a hands-on tagine cooking class.',
    location: 'Marrakech', country: 'Morocco',
    coordinates: { lat: 31.6295, lng: -7.9811 },
    images: [
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1548017469-0b0f4a348fea?w=800&h=600&fit=crop',
    ],
    category: 'Food & Wine', tags: ['Street Food', 'Cooking Class', 'Market', 'Culture'],
    duration: '5 hours', durationHours: 5,
    groupSize: { min: 2, max: 10 }, difficulty: 'Easy',
    languages: ['English', 'French', 'Arabic'],
    price: 65, currency: 'USD',
    rating: 4.93, reviewCount: 789, bookingCount: 4200,
    host: hosts[2],
    highlights: ['10+ food tastings', 'Souk navigation with local guide', 'Hands-on cooking class', 'Recipe booklet to take home'],
    inclusions: ['All food tastings', 'Cooking class', 'Mint tea', 'Recipe booklet'],
    exclusions: ['Hotel transfer', 'Alcoholic beverages'],
    itinerary: [
      { time: '10:00', title: 'Meet at Jemaa el-Fnaa', description: 'Start in the famous main square.', duration: '15 min' },
      { time: '10:15', title: 'Street Food Trail', description: 'Sample 10+ traditional Moroccan street foods.', duration: '120 min' },
      { time: '12:15', title: 'Spice Souk Visit', description: 'Explore the aromatic spice market.', duration: '30 min' },
      { time: '12:45', title: 'Cooking Class', description: 'Learn to make tagine and Moroccan salads.', duration: '105 min' },
    ],
    meetingPoint: 'Café de France, Jemaa el-Fnaa', accessibility: ['Not wheelchair accessible - narrow alleyways'], ageRestriction: 'Children 6+ welcome.',
    cancellationPolicy: 'Free cancellation up to 24 hours before.', safetyInfo: ['Watch your belongings in the souks', 'Wear comfortable shoes'],
    faqs: [{ question: 'Are vegetarian options available?', answer: 'Absolutely! We can customize the food trail and cooking class for vegetarian and vegan diets.' }],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['10:00', '15:00'],
    featured: false, trending: false, bestSeller: true, instant: true
  },
  {
    id: 't17', slug: 'sydney-harbour-bridge-climb',
    title: 'Sydney Harbour Bridge Climb & Opera House Tour',
    subtitle: 'Scale the iconic bridge for panoramic views and explore the Opera House interior',
    description: 'Climb to the summit of the Sydney Harbour Bridge for unrivalled 360° views, then take a guided tour inside the UNESCO-listed Opera House.',
    location: 'Sydney', country: 'Australia',
    coordinates: { lat: -33.8523, lng: 151.2108 },
    images: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&h=600&fit=crop',
    ],
    category: 'Adventure', tags: ['Bridge Climb', 'Iconic', 'Views', 'Architecture'],
    duration: '5 hours', durationHours: 5,
    groupSize: { min: 1, max: 14 }, difficulty: 'Moderate',
    languages: ['English'],
    price: 175, currency: 'USD',
    rating: 4.96, reviewCount: 1432, bookingCount: 7800,
    host: hosts[1],
    highlights: ['Summit of Harbour Bridge', '360° panoramic views', 'Opera House backstage tour', 'Professional summit photo'],
    inclusions: ['Bridge Climb gear & ticket', 'Opera House tour ticket', 'Summit photo', 'Climb certificate'],
    exclusions: ['Hotel transfer', 'Food and drinks'],
    itinerary: [
      { time: '09:00', title: 'Bridge Climb Check-in', description: 'Arrive, gear up, and safety briefing.', duration: '30 min' },
      { time: '09:30', title: 'Bridge Climb', description: 'Scale the arches to the 134m summit.', duration: '150 min' },
      { time: '12:00', title: 'Walk to Opera House', description: 'Stroll through the Rocks to Circular Quay.', duration: '15 min' },
      { time: '12:15', title: 'Opera House Tour', description: 'Explore the iconic sails and performance halls.', duration: '60 min' },
    ],
    meetingPoint: 'BridgeClimb Sydney, 3 Cumberland St, The Rocks', accessibility: ['Not wheelchair accessible for climb'], ageRestriction: 'Minimum age 8 for climb.',
    cancellationPolicy: 'Free cancellation up to 48 hours before.', safetyInfo: ['All gear provided', 'No loose items at summit', 'Blood alcohol limit applies'],
    faqs: [{ question: 'Is the bridge climb scary?', answer: 'The climb is very safe with continuous safety rails and a secure harness system. It\'s exhilarating, not scary!' }],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['09:00', '14:00'],
    featured: true, trending: false, bestSeller: true, instant: true
  },
  {
    id: 't18', slug: 'kyoto-geisha-district-tea-ceremony',
    title: 'Kyoto: Geisha District Walk & Traditional Tea Ceremony',
    subtitle: 'Explore Gion\'s wooden machiya streets and experience an authentic matcha ceremony',
    description: 'Walk through the atmospheric Gion geisha district, visit serene temples, and participate in an authentic Japanese tea ceremony in a traditional tea house.',
    location: 'Kyoto', country: 'Japan',
    coordinates: { lat: 35.0037, lng: 135.7754 },
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&h=600&fit=crop',
    ],
    category: 'Cultural', tags: ['Geisha', 'Tea Ceremony', 'Temples', 'Traditional'],
    duration: '4 hours', durationHours: 4,
    groupSize: { min: 2, max: 8 }, difficulty: 'Easy',
    languages: ['English', 'Japanese'],
    price: 85, currency: 'USD',
    rating: 4.95, reviewCount: 678, bookingCount: 3900,
    host: hosts[1],
    highlights: ['Gion geisha district walk', 'Traditional tea ceremony', 'Yasaka Shrine visit', 'Hanamikoji Street exploration'],
    inclusions: ['Licensed guide', 'Tea ceremony experience', 'Matcha tea and wagashi sweet'],
    exclusions: ['Temple entry fees', 'Lunch'],
    itinerary: [
      { time: '14:00', title: 'Meet at Yasaka Shrine', description: 'Meet your guide at the iconic orange shrine gate.', duration: '15 min' },
      { time: '14:15', title: 'Gion District Walk', description: 'Explore the traditional wooden streets.', duration: '75 min' },
      { time: '15:30', title: 'Hanamikoji Street', description: 'Walk the famous geisha street.', duration: '30 min' },
      { time: '16:00', title: 'Tea Ceremony', description: 'Authentic matcha ceremony in a traditional tea house.', duration: '60 min' },
    ],
    meetingPoint: 'Yasaka Shrine main entrance', accessibility: ['Mostly flat walking'], ageRestriction: 'All ages welcome.',
    cancellationPolicy: 'Free cancellation up to 24 hours before.', safetyInfo: ['Wear respectful clothing for temple visits', 'Photography restricted in some areas'],
    faqs: [{ question: 'Will we see geisha?', answer: 'While we walk through the district, spotting geisha is not guaranteed as they have private schedules.' }],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['10:00', '14:00'],
    featured: false, trending: true, bestSeller: false, instant: true
  },
  {
    id: 't19', slug: 'jaipur-golden-triangle-highlights',
    title: 'Jaipur: Pink City Heritage Walk & Amber Fort',
    subtitle: 'Explore royal palaces, vibrant bazaars, and the magnificent hilltop fort',
    description: 'Discover the magic of India\'s Pink City with a heritage walk through colorful bazaars, visit the stunning Amber Fort by jeep, and explore the City Palace and Hawa Mahal.',
    location: 'Jaipur', country: 'India',
    coordinates: { lat: 26.9124, lng: 75.7873 },
    images: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop',
    ],
    category: 'Cultural', tags: ['Heritage', 'Palace', 'Fort', 'Bazaar', 'India'],
    duration: '8 hours', durationHours: 8,
    groupSize: { min: 2, max: 12 }, difficulty: 'Easy',
    languages: ['English', 'Hindi'],
    price: 45, currency: 'USD',
    rating: 4.88, reviewCount: 543, bookingCount: 3200,
    host: hosts[3],
    highlights: ['Amber Fort by jeep', 'City Palace museum', 'Hawa Mahal photo stop', 'Local bazaar shopping', 'Traditional Rajasthani lunch'],
    inclusions: ['Air-conditioned vehicle', 'All entry fees', 'Jeep ride at Amber Fort', 'Licensed guide', 'Lunch'],
    exclusions: ['Shopping purchases', 'Tips'],
    itinerary: [
      { time: '08:00', title: 'Hotel Pickup', description: 'Pickup from Jaipur hotel.', duration: '30 min' },
      { time: '08:30', title: 'Amber Fort', description: 'Jeep ride up and guided tour of the magnificent fort.', duration: '150 min' },
      { time: '11:00', title: 'City Palace', description: 'Explore the royal museum.', duration: '60 min' },
      { time: '12:00', title: 'Hawa Mahal & Bazaars', description: 'Photo stop and bazaar walk with lunch.', duration: '120 min' },
    ],
    meetingPoint: 'Hotel lobby pickup', accessibility: ['Partially wheelchair accessible'], ageRestriction: 'All ages welcome.',
    cancellationPolicy: 'Free cancellation up to 24 hours before.', safetyInfo: ['Stay hydrated', 'Wear sun protection', 'Comfortable shoes recommended'],
    faqs: [{ question: 'Is bargaining expected in the bazaars?', answer: 'Yes! Your guide will help you navigate and get fair prices.' }],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['08:00'],
    featured: false, trending: false, bestSeller: false, instant: true
  },
  {
    id: 't20', slug: 'bangkok-temple-tuk-tuk-tour',
    title: 'Bangkok Temple & Tuk-Tuk Adventure Tour',
    subtitle: 'Visit iconic temples and cruise through Bangkok\'s streets by tuk-tuk',
    description: 'Zip through Bangkok in a traditional tuk-tuk visiting the Grand Palace, Wat Pho\'s reclining Buddha, and Wat Arun at sunset. A thrilling way to see the city\'s highlights!',
    location: 'Bangkok', country: 'Thailand',
    coordinates: { lat: 13.7563, lng: 100.5018 },
    images: [
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop',
    ],
    category: 'City Tours', tags: ['Temples', 'Tuk-Tuk', 'Culture', 'Photography'],
    duration: '5 hours', durationHours: 5,
    groupSize: { min: 1, max: 8 }, difficulty: 'Easy',
    languages: ['English', 'Thai'],
    price: 55, currency: 'USD',
    rating: 4.90, reviewCount: 1234, bookingCount: 6700,
    host: hosts[1],
    highlights: ['Grand Palace visit', 'Reclining Buddha at Wat Pho', 'Wat Arun sunset views', 'Tuk-tuk ride through old Bangkok', 'Thai iced tea tasting'],
    inclusions: ['Tuk-tuk transportation', 'All temple entry fees', 'Licensed guide', 'Thai iced tea', 'Cold towels'],
    exclusions: ['Lunch', 'Tips'],
    itinerary: [
      { time: '13:00', title: 'Meet at Grand Palace', description: 'Meet your guide and tuk-tuk driver.', duration: '15 min' },
      { time: '13:15', title: 'Grand Palace', description: 'Explore the stunning royal palace complex.', duration: '90 min' },
      { time: '14:45', title: 'Wat Pho', description: 'See the 46m-long reclining Buddha.', duration: '45 min' },
      { time: '15:30', title: 'Tuk-tuk ride & Wat Arun', description: 'Cross the river and catch sunset at the Temple of Dawn.', duration: '90 min' },
    ],
    meetingPoint: 'Grand Palace main entrance, Thanon Na Phra Lan', accessibility: ['Not wheelchair accessible'], ageRestriction: 'All ages. Dress code: knees and shoulders covered.',
    cancellationPolicy: 'Free cancellation up to 24 hours before.', safetyInfo: ['Cover knees and shoulders for temples', 'Stay hydrated', 'Beware of scams near temples'],
    faqs: [{ question: 'What should I wear?', answer: 'Temples require covered knees and shoulders. Sarongs are available for rent at temple entrances.' }],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['09:00', '13:00'],
    featured: false, trending: true, bestSeller: false, instant: true
  },
  {
    id: 't21', slug: 'reykjavik-golden-circle-northern-lights',
    title: 'Iceland Golden Circle & Northern Lights Hunt',
    subtitle: 'Geysers, waterfalls, and the magical aurora borealis in one day',
    description: 'Visit Iceland\'s famous Golden Circle—Þingvellir, Geysir, and Gullfoss—then hunt for the Northern Lights in the dark Icelandic countryside.',
    location: 'Reykjavik', country: 'Iceland',
    coordinates: { lat: 64.1466, lng: -21.9426 },
    images: [
      'https://images.unsplash.com/photo-1521193089946-7aa29d1fe776?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop',
    ],
    category: 'Nature', tags: ['Northern Lights', 'Geysir', 'Waterfall', 'UNESCO'],
    duration: '12 hours', durationHours: 12,
    groupSize: { min: 4, max: 20 }, difficulty: 'Easy',
    languages: ['English'],
    price: 155, currency: 'USD',
    rating: 4.85, reviewCount: 567, bookingCount: 3200,
    host: hosts[2],
    highlights: ['Þingvellir National Park (UNESCO)', 'Strokkur Geysir eruption', 'Gullfoss waterfall', 'Northern Lights hunt', 'Hot chocolate by geothermal spring'],
    inclusions: ['Minibus transport', 'Licensed guide', 'Hot chocolate', 'Northern Lights guarantee (free retry)'],
    exclusions: ['Lunch', 'Tips', 'Warm clothing (bring your own)'],
    itinerary: [
      { time: '09:00', title: 'Reykjavik Pickup', description: 'Pickup from BSÍ Bus Terminal.', duration: '30 min' },
      { time: '09:30', title: 'Þingvellir', description: 'Walk between tectonic plates at this UNESCO site.', duration: '75 min' },
      { time: '10:45', title: 'Geysir & Gullfoss', description: 'Watch Strokkur erupt and see the golden waterfall.', duration: '150 min' },
      { time: '20:00', title: 'Northern Lights Hunt', description: 'Drive to dark-sky locations to search for aurora.', duration: '180 min' },
    ],
    meetingPoint: 'BSÍ Bus Terminal, Reykjavik', accessibility: ['Partially accessible'], ageRestriction: 'All ages welcome.',
    cancellationPolicy: 'Free cancellation up to 24 hours before. Northern Lights guarantee: free retry if not seen.',
    safetyInfo: ['Dress warmly in layers', 'Waterproof shoes essential', 'Slippery paths near waterfalls'],
    faqs: [{ question: 'What if we don\'t see Northern Lights?', answer: 'We offer a free retry on another available date. Sightings depend on solar activity and weather.' }],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['09:00'],
    featured: false, trending: false, bestSeller: false, instant: true
  },
  {
    id: 't22', slug: 'amsterdam-canal-cruise-anne-frank',
    title: 'Amsterdam Canal Cruise & Anne Frank Neighborhood Tour',
    subtitle: 'Glide through historic canals and explore the Jewish Quarter\'s poignant history',
    description: 'Enjoy a scenic canal cruise through Amsterdam\'s UNESCO canals, then walk through the historic Jewish Quarter learning about Anne Frank\'s life and the city\'s WWII history.',
    location: 'Amsterdam', country: 'Netherlands',
    coordinates: { lat: 52.3676, lng: 4.9041 },
    images: [
      'https://images.unsplash.com/photo-1517736996303-4e64a4f87399?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567000833660-57e4cf898f8c?w=800&h=600&fit=crop',
    ],
    category: 'Cultural', tags: ['Canal Cruise', 'History', 'WWII', 'UNESCO'],
    duration: '4 hours', durationHours: 4,
    groupSize: { min: 2, max: 20 }, difficulty: 'Easy',
    languages: ['English', 'Dutch', 'German'],
    price: 65, currency: 'USD',
    rating: 4.88, reviewCount: 876, bookingCount: 5100,
    host: hosts[0],
    highlights: ['1-hour canal cruise', 'Anne Frank neighborhood walk', 'Jewish Quarter history', 'Portuguese Synagogue', 'Jordaan district stroll'],
    inclusions: ['Canal cruise ticket', 'Licensed guide', 'Headsets'],
    exclusions: ['Anne Frank House entry (separate ticket)', 'Lunch', 'Tips'],
    itinerary: [
      { time: '10:00', title: 'Canal Cruise', description: 'Board at Centraal Station pier for a scenic cruise.', duration: '60 min' },
      { time: '11:00', title: 'Anne Frank Neighborhood', description: 'Walk through the Jordaan and learn about wartime Amsterdam.', duration: '75 min' },
      { time: '12:15', title: 'Jewish Quarter', description: 'Visit the Portuguese Synagogue area and memorial.', duration: '45 min' },
      { time: '13:00', title: 'Farewell', description: 'Tour ends near Waterlooplein.', duration: '15 min' },
    ],
    meetingPoint: 'Amsterdam Centraal Station, pier side', accessibility: ['Canal boat wheelchair accessible'], ageRestriction: 'All ages welcome.',
    cancellationPolicy: 'Free cancellation up to 24 hours before.',
    safetyInfo: ['Watch your step boarding the boat', 'Keep belongings secure'],
    faqs: [{ question: 'Does this include Anne Frank House entry?', answer: 'No, Anne Frank House tickets must be booked separately well in advance.' }],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['10:00', '14:00'],
    featured: false, trending: false, bestSeller: false, instant: true
  },
  {
    id: 't23', slug: 'cairo-pyramids-sphinx-egyptian-museum',
    title: 'Cairo: Pyramids of Giza, Sphinx & Egyptian Museum',
    subtitle: 'Stand before the last ancient wonder and explore 5,000 years of civilization',
    description: 'Visit the Great Pyramids of Giza and the enigmatic Sphinx, then explore the Grand Egyptian Museum housing Tutankhamun\'s golden treasures.',
    location: 'Cairo', country: 'Egypt',
    coordinates: { lat: 29.9792, lng: 31.1342 },
    images: [
      'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1568322445389-f64e1bbee570?w=800&h=600&fit=crop',
    ],
    category: 'Cultural', tags: ['Pyramids', 'Ancient Egypt', 'UNESCO', 'Museum'],
    duration: '8 hours', durationHours: 8,
    groupSize: { min: 2, max: 15 }, difficulty: 'Easy',
    languages: ['English', 'Arabic'],
    price: 75, currency: 'USD',
    rating: 4.86, reviewCount: 1123, bookingCount: 6500,
    host: hosts[0],
    highlights: ['Great Pyramid of Khufu', 'The Sphinx photo stop', 'Grand Egyptian Museum', 'Tutankhamun\'s treasures', 'Traditional Egyptian lunch'],
    inclusions: ['Air-conditioned vehicle', 'All entry fees', 'Licensed Egyptologist guide', 'Lunch', 'Bottled water'],
    exclusions: ['Camel ride (available for extra)', 'Tips', 'Inside pyramid entry (extra fee)'],
    itinerary: [
      { time: '08:00', title: 'Hotel Pickup', description: 'Pickup from Cairo or Giza hotel.', duration: '30 min' },
      { time: '08:30', title: 'Pyramids of Giza', description: 'Guided tour of all three pyramids and the Sphinx.', duration: '180 min' },
      { time: '11:30', title: 'Lunch', description: 'Traditional Egyptian lunch with pyramid views.', duration: '60 min' },
      { time: '12:30', title: 'Grand Egyptian Museum', description: 'Explore Tutankhamun\'s treasures and ancient artifacts.', duration: '150 min' },
    ],
    meetingPoint: 'Hotel lobby pickup', accessibility: ['Desert terrain—not wheelchair accessible at pyramids'], ageRestriction: 'All ages welcome.',
    cancellationPolicy: 'Free cancellation up to 24 hours before.',
    safetyInfo: ['Wear comfortable shoes and sun protection', 'Bring lots of water', 'Beware of unofficial guides'],
    faqs: [{ question: 'Can I go inside the pyramids?', answer: 'Yes! An inside-pyramid ticket can be added for an extra $15.' }],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['08:00'],
    featured: true, trending: false, bestSeller: false, instant: true
  },
  {
    id: 't24', slug: 'singapore-hawker-heritage-night-tour',
    title: 'Singapore Hawker Heritage & Gardens by the Bay Night Tour',
    subtitle: 'Taste UNESCO-listed hawker culture and witness the Supertree light show',
    description: 'Experience Singapore\'s legendary hawker food culture at multiple heritage centers, then marvel at the futuristic Gardens by the Bay and its spectacular Supertree light show.',
    location: 'Singapore', country: 'Singapore',
    coordinates: { lat: 1.2814, lng: 103.8636 },
    images: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800&h=600&fit=crop',
    ],
    category: 'Food & Wine', tags: ['Street Food', 'Night Tour', 'Gardens', 'Light Show'],
    duration: '5 hours', durationHours: 5,
    groupSize: { min: 2, max: 10 }, difficulty: 'Easy',
    languages: ['English', 'Mandarin'],
    price: 70, currency: 'USD',
    rating: 4.92, reviewCount: 654, bookingCount: 3800,
    host: hosts[2],
    highlights: ['3 hawker center visits', 'Hainanese chicken rice tasting', 'Chilli crab demo', 'Gardens by the Bay walk', 'Supertree Grove light show'],
    inclusions: ['All food tastings (8+ dishes)', 'Gardens by the Bay ticket', 'Licensed guide', 'MRT travel card'],
    exclusions: ['Alcoholic drinks', 'Tips'],
    itinerary: [
      { time: '16:00', title: 'Meet at Chinatown', description: 'Start at the historic Chinatown Complex.', duration: '15 min' },
      { time: '16:15', title: 'Hawker Food Trail', description: 'Taste 8+ dishes across 3 hawker centers.', duration: '150 min' },
      { time: '18:45', title: 'Gardens by the Bay', description: 'Walk through the Supertree Grove.', duration: '30 min' },
      { time: '19:15', title: 'Light Show', description: 'Watch the Garden Rhapsody light and sound show.', duration: '30 min' },
    ],
    meetingPoint: 'Chinatown MRT Station, Exit A', accessibility: ['Wheelchair accessible'], ageRestriction: 'All ages welcome.',
    cancellationPolicy: 'Free cancellation up to 24 hours before.',
    safetyInfo: ['Bring umbrella in case of rain', 'Wear comfortable shoes'],
    faqs: [{ question: 'I have dietary restrictions. Can you accommodate?', answer: 'Yes! We can adjust the food trail for halal, vegetarian, and allergy needs. Let us know at booking.' }],
    availableDates: ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15'],
    timeSlots: ['16:00'],
    featured: false, trending: true, bestSeller: false, instant: true
  },
];

// ─────────────────────────── Reviews ───────────────────────────
export const reviews: Review[] = [
  { id: 'r1', tourId: 't1', user: { name: 'Sarah M.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face', country: 'United Kingdom' }, rating: 5, date: '2026-07-28', comment: 'Marco is an incredible guide! His knowledge of Roman history is unmatched. The skip-the-line access saved us hours. Highly recommend!', helpful: 24 },
  { id: 'r2', tourId: 't1', user: { name: 'David K.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face', country: 'Australia' }, rating: 5, date: '2026-07-25', comment: 'Best tour we took in Rome. Marco brings history to life with his storytelling. The Palatine Hill views were breathtaking.', helpful: 18 },
  { id: 'r3', tourId: 't1', user: { name: 'Akiko T.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face', country: 'Japan' }, rating: 4, date: '2026-07-20', comment: 'Very informative tour. The only downside was the heat in July—bring lots of water! The guide was excellent and very patient.', helpful: 12 },
  { id: 'r4', tourId: 't2', user: { name: 'Emily R.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face', country: 'Canada' }, rating: 5, date: '2026-07-30', comment: 'This was the highlight of our Tokyo trip! Yuki took us to places we never would have found. The ramen was life-changing.', helpful: 31 },
  { id: 'r5', tourId: 't2', user: { name: 'Hans W.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face', country: 'Germany' }, rating: 5, date: '2026-07-22', comment: 'Amazing food experience! We ate so much incredible food. The hidden izakaya was a magical experience. 10/10 would book again.', helpful: 22 },
  { id: 'r6', tourId: 't3', user: { name: 'Maria G.', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face', country: 'Brazil' }, rating: 5, date: '2026-08-01', comment: 'Sophie is a wonderful host! The cellar atmosphere was perfect, and I learned so much about French wines. Already booked for my next visit.', helpful: 15 },
  { id: 'r7', tourId: 't4', user: { name: 'James L.', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face', country: 'United States' }, rating: 5, date: '2026-07-18', comment: 'An unforgettable day in Bali! The rice terraces were even more beautiful than photos. Swimming at the hidden waterfall was magical.', helpful: 28 },
  { id: 'r8', tourId: 't4', user: { name: 'Lisa P.', avatar: 'https://images.unsplash.com/photo-1596215143922-aaac6391ce40?w=80&h=80&fit=crop&crop=face', country: 'Netherlands' }, rating: 5, date: '2026-07-15', comment: 'Ketut was the most amazing guide—so knowledgeable about Balinese culture and so warm. The lunch with the valley view was a dream.', helpful: 19 },
];

// ─────────────────────────── Bookings (for account page) ───────────────────────────
export const mockBookings: Booking[] = [
  { id: 'BK-2026-001', tourId: 't1', tourTitle: 'Ancient Rome: Colosseum, Forum & Palatine Hill', tourImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop', date: '2026-08-15', time: '09:00', guests: 2, total: 118, currency: 'USD', status: 'confirmed', createdAt: '2026-08-02', voucherCode: 'TG-ROME-A7X9K2' },
  { id: 'BK-2026-002', tourId: 't3', tourTitle: 'Paris Wine & Cheese Masterclass Experience', tourImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop', date: '2026-08-20', time: '15:00', guests: 2, total: 190, currency: 'USD', status: 'confirmed', createdAt: '2026-08-05', voucherCode: 'TG-PARIS-B3M4N8' },
  { id: 'BK-2026-003', tourId: 't2', tourTitle: 'Tokyo Street Food & Hidden Izakaya Tour', tourImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop', date: '2026-07-10', time: '17:00', guests: 4, total: 356, currency: 'USD', status: 'completed', createdAt: '2026-06-28', voucherCode: 'TG-TOKYO-C1P5Q7' },
  { id: 'BK-2026-004', tourId: 't6', tourTitle: 'New York City Highlights Bike Tour', tourImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop', date: '2026-06-01', time: '10:00', guests: 1, total: 65, currency: 'USD', status: 'cancelled', createdAt: '2026-05-20', voucherCode: 'TG-NYC-D9R2S6' },
];

// ─────────────────────────── Stats (for dashboards) ───────────────────────────
export const operatorStats = {
  totalRevenue: 48750,
  totalBookings: 643,
  avgRating: 4.94,
  conversionRate: 8.7,
  viewsThisMonth: 12450,
  bookingsThisMonth: 87,
  revenueThisMonth: 6530,
  cancellationRate: 2.1,
  revenueChart: [
    { month: 'Jan', revenue: 3200 },
    { month: 'Feb', revenue: 2800 },
    { month: 'Mar', revenue: 4100 },
    { month: 'Apr', revenue: 5200 },
    { month: 'May', revenue: 6100 },
    { month: 'Jun', revenue: 7800 },
    { month: 'Jul', revenue: 8400 },
    { month: 'Aug', revenue: 6530 },
  ],
  bookingsByStatus: { confirmed: 187, completed: 412, cancelled: 14, pending: 30 },
};

export const adminStats = {
  totalUsers: 24350,
  totalTours: 1876,
  totalBookings: 15420,
  totalRevenue: 1245000,
  newUsersThisMonth: 1230,
  pendingVerifications: 23,
  openDisputes: 7,
  activeCoupons: 12,
};

// Helper: get tour by slug
export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find(t => t.slug === slug);
}

// Helper: get reviews for tour
export function getReviewsForTour(tourId: string): Review[] {
  return reviews.filter(r => r.tourId === tourId);
}

// Helper: get related tours
export function getRelatedTours(tour: Tour, limit = 3): Tour[] {
  return tours.filter(t => t.id !== tour.id && (t.category === tour.category || t.country === tour.country)).slice(0, limit);
}
