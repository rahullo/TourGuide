import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';
import { globalDestinations } from '@/lib/destinations';
import { categories } from '@/lib/data';

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomSubset = <T,>(arr: T[], count: number): T[] => [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

const tourAdjectives = ['Amazing', 'Ultimate', 'Hidden', 'Authentic', 'Essential', 'Exclusive', 'Magical', 'Classic', 'Secret', 'Unforgettable'];
const tourNouns = ['Experience', 'Tour', 'Adventure', 'Journey', 'Walk', 'Discovery', 'Masterclass', 'Expedition', 'Escape'];

const mockHost = {
  name: 'Local Guide',
  avatar: 'https://i.pravatar.cc/150?img=33',
  rating: 4.8,
  reviews: 120,
  verified: true,
};

// Curated high quality image pools for unique tour imagery
const categoryImagePools: Record<string, string[]> = {
  'Cultural': [
    'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
    'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80',
    'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&q=80',
    'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80',
  ],
  'Food & Wine': [
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
    'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=800&q=80',
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
  ],
  'Adventure': [
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800&q=80',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80',
    'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  ],
  'Nature': [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80',
    'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&q=80',
  ],
  'City Tours': [
    'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&q=80',
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80',
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
    'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&q=80',
  ],
  'Water Activities': [
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    'https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?w=800&q=80',
    'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  ],
};

const generateTour = (dest: any, index: number) => {
  const category = categories[index % categories.length].name;
  const adjective = tourAdjectives[(index * 3 + dest.name.length) % tourAdjectives.length];
  const noun = tourNouns[(index * 2 + dest.country.length) % tourNouns.length];
  const title = `${adjective} ${dest.name} ${category} ${noun}`;
  const slug = `${dest.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}-${Date.now()}`;
  
  const price = getRandomInt(35, 220);
  const hasDiscount = (index % 2 === 0);

  // Pick unique images for this tour
  const pool = categoryImagePools[category] || categoryImagePools['Cultural'];
  const primaryImg = index === 0 ? dest.image : pool[(dest.name.length + index) % pool.length];
  const secondaryImg1 = pool[(dest.name.length + index + 1) % pool.length];
  const secondaryImg2 = pool[(dest.name.length + index + 2) % pool.length];
  
  return {
    id: `tour_${slug}`,
    slug,
    title,
    subtitle: `Discover the best of ${dest.name} with this exclusive ${category.toLowerCase()} experience.`,
    description: `Join us for an unforgettable journey through ${dest.name}, ${dest.country}. This ${category.toLowerCase()} tour will take you to the most iconic spots and hidden gems.`,
    location: dest.name,
    country: dest.country,
    coordinates: { lat: 0, lng: 0 },
    images: [
      primaryImg,
      secondaryImg1,
      secondaryImg2,
    ],
    category,
    tags: [dest.name, category, 'Guided'],
    duration: `${(index % 4) + 2} hours`,
    durationHours: (index % 4) + 2,
    groupSize: { min: 1, max: 12 + index * 2 },
    difficulty: ['Easy', 'Moderate', 'Challenging'][index % 3],
    languages: ['English', 'Spanish', 'French'].slice(0, (index % 2) + 1),
    price,
    originalPrice: hasDiscount ? price + 25 + (index * 10) : undefined,
    currency: 'USD',
    rating: Number((4.6 + (index * 0.1) % 0.4).toFixed(2)),
    reviewCount: 45 + (dest.name.length * 12) + index * 23,
    bookingCount: 180 + (dest.name.length * 50) + index * 60,
    host: mockHost,
    highlights: ['Expert local guide', 'Skip-the-line access', 'Small group experience'],
    inclusions: ['All taxes and fees', 'Professional guide'],
    bestSeller: index === 0,
    instant: index !== 1,
  };
};

export async function GET() {
  try {
    await dbConnect();
    
    // Check if we already have tours
    const count = await Tour.countDocuments();
    if (count > 0) {
      // Clear existing tours
      await Tour.deleteMany({});
    }

    const toursToInsert: any[] = [];

    // Generate 3 tours for each destination
    globalDestinations.forEach(dest => {
      for (let i = 0; i < 3; i++) {
        toursToInsert.push(generateTour(dest, i));
      }
    });

    await Tour.insertMany(toursToInsert);

    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${toursToInsert.length} tours across ${globalDestinations.length} destinations.` 
    });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
