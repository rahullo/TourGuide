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

const generateTour = (dest: any, index: number) => {
  const category = getRandomItem(categories).name;
  const adjective = getRandomItem(tourAdjectives);
  const noun = getRandomItem(tourNouns);
  const title = `${adjective} ${dest.name} ${category} ${noun}`;
  const slug = `${dest.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}-${Date.now()}`;
  
  const price = getRandomInt(30, 250);
  const hasDiscount = Math.random() > 0.7;
  
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
      dest.image,
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
      'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=800&q=80'
    ],
    category,
    tags: [dest.name, category, 'Guided'],
    duration: `${getRandomInt(2, 8)} hours`,
    durationHours: getRandomInt(2, 8),
    groupSize: { min: 1, max: getRandomInt(8, 20) },
    difficulty: getRandomItem(['Easy', 'Moderate', 'Challenging']),
    languages: ['English', 'Spanish', 'French'].slice(0, getRandomInt(1, 3)),
    price,
    originalPrice: hasDiscount ? price + getRandomInt(10, 50) : undefined,
    currency: 'USD',
    rating: Number((Math.random() * (5 - 4) + 4).toFixed(2)),
    reviewCount: getRandomInt(10, 500),
    bookingCount: getRandomInt(50, 2000),
    host: mockHost,
    highlights: ['Expert local guide', 'Skip-the-line access', 'Small group experience'],
    inclusions: ['All taxes and fees', 'Professional guide'],
    bestSeller: Math.random() > 0.8,
    instant: Math.random() > 0.5,
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
