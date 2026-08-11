import mongoose from 'mongoose';

const HostSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  rating: Number,
  reviews: Number,
  verified: Boolean,
});

const TourSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String },
  location: { type: String, required: true },
  country: { type: String, required: true },
  coordinates: {
    lat: Number,
    lng: Number,
  },
  images: [String],
  category: { type: String, required: true },
  tags: [String],
  duration: { type: String },
  durationHours: { type: Number },
  groupSize: {
    min: Number,
    max: Number,
  },
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging', 'Expert'] },
  languages: [String],
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  currency: { type: String, default: 'USD' },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  bookingCount: { type: Number, default: 0 },
  host: HostSchema,
  highlights: [String],
  inclusions: [String],
  bestSeller: { type: Boolean, default: false },
  instant: { type: Boolean, default: false },
}, {
  timestamps: true,
});

// Text index for search
TourSchema.index({
  title: 'text',
  location: 'text',
  country: 'text',
  category: 'text',
  tags: 'text'
});

export default mongoose.models.Tour || mongoose.model('Tour', TourSchema);
