import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const categories = searchParams.get('categories');
    const difficulties = searchParams.get('difficulties');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    const query: any = {};

    if (q) {
      query.$text = { $search: q };
    }

    if (categories) {
      query.category = { $in: categories.split(',') };
    }

    if (difficulties) {
      query.difficulty = { $in: difficulties.split(',') };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption: any = {};
    if (q) {
      // If searching, sort by text score first, unless overridden
      sortOption = { score: { $meta: 'textScore' } };
    }

    if (sortBy) {
      switch (sortBy) {
        case 'price-low': sortOption = { price: 1 }; break;
        case 'price-high': sortOption = { price: -1 }; break;
        case 'rating': sortOption = { rating: -1 }; break;
        case 'popular': sortOption = { bookingCount: -1 }; break;
        case 'duration-short': sortOption = { durationHours: 1 }; break;
        case 'duration-long': sortOption = { durationHours: -1 }; break;
        case 'recommended':
        default:
          if (!q) sortOption = { rating: -1, reviewCount: -1 };
          break;
      }
    }

    const skip = (page - 1) * limit;

    const [tours, total] = await Promise.all([
      Tour.find(query, q ? { score: { $meta: 'textScore' } } : {})
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean(),
      Tour.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      tours,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
