import mongoose, { Schema, Document, Model } from 'mongoose';

export type UserRole = 'tourist' | 'guide' | 'admin';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // hashed; optional for OAuth users
  image?: string;
  role: UserRole;
  phone?: string;
  bio?: string;
  location?: string;
  country?: string;
  languages?: string[];
  preferences?: {
    language: string;
    currency: string;
    darkMode: boolean;
    twoFactor: boolean;
  };
  // Guide-specific fields
  verified?: boolean;
  superhost?: boolean;
  expertise?: string[];
  responseTime?: string;
  tourCount?: number;
  guideRating?: number;
  guideReviewCount?: number;
  memberSince: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, select: false }, // excluded from queries by default
    image: { type: String, default: '' },
    role: {
      type: String,
      enum: ['tourist', 'guide', 'admin'],
      default: 'tourist',
    },
    phone: { type: String, default: '' },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    country: { type: String, default: '' },
    languages: { type: [String], default: ['English'] },
    preferences: {
      language: { type: String, default: 'en' },
      currency: { type: String, default: 'USD' },
      darkMode: { type: Boolean, default: false },
      twoFactor: { type: Boolean, default: false }
    },

    // Guide-specific
    verified: { type: Boolean, default: false },
    superhost: { type: Boolean, default: false },
    expertise: { type: [String], default: [] },
    responseTime: { type: String, default: 'Within 24 hours' },
    tourCount: { type: Number, default: 0 },
    guideRating: { type: Number, default: 0 },
    guideReviewCount: { type: Number, default: 0 },
    memberSince: {
      type: String,
      default: () => new Date().getFullYear().toString(),
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in dev hot-reload
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
