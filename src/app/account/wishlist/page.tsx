'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin, Star, Trash2, Clock, Users, Search, Filter } from 'lucide-react';
import { tours } from '@/lib/data';
import { useCurrency } from '@/lib/CurrencyContext';

// Mock wishlist - in production this would come from the database
const initialWishlist = ['t1', 't9', 't10', 't13', 't17', 't18'];

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<string[]>(initialWishlist);
  const [searchQuery, setSearchQuery] = useState('');
  const [removedItem, setRemovedItem] = useState<string | null>(null);
  const { formatPrice } = useCurrency();

  const wishlistTours = tours.filter(t => wishlistIds.includes(t.id));
  const filteredTours = searchQuery
    ? wishlistTours.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : wishlistTours;

  const removeFromWishlist = (tourId: string) => {
    setWishlistIds(prev => prev.filter(id => id !== tourId));
  };

  if (wishlistIds.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '80px 40px' }}>
        <div style={{
          width: 80, height: 80, borderRadius: 'var(--radius-full)',
          background: 'var(--color-bg-tertiary)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
        }}>
          <Heart size={36} style={{ color: 'var(--color-text-tertiary)' }} />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: 'var(--color-text)' }}>
          Your Wishlist is Empty
        </h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', maxWidth: 400, margin: '0 auto 24px' }}>
          Start exploring tours and save your favorites here. Tap the heart icon on any tour to add it to your wishlist.
        </p>
        <Link href="/tours" className="btn btn-primary" style={{ textDecoration: 'none', padding: '12px 32px' }}>
          <Search size={16} /> Explore Tours
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text)' }}>My Wishlist</h2>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>
            {wishlistTours.length} saved {wishlistTours.length === 1 ? 'tour' : 'tours'}
          </p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)',
          padding: '8px 14px', border: '1px solid var(--color-border-light)', minWidth: 220,
        }}>
          <Search size={16} style={{ color: 'var(--color-text-tertiary)' }} />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search your wishlist..."
            style={{
              border: 'none', outline: 'none', fontSize: 13, background: 'transparent',
              color: 'var(--color-text)', width: '100%',
            }}
          />
        </div>
      </div>

      {/* Tour Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {filteredTours.map(tour => (
          <div key={tour.id} className="card" style={{ overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s' }}>
            {/* Image */}
            <div style={{ position: 'relative', height: 180 }}>
              <img
                src={tour.images[0]}
                alt={tour.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                onClick={() => removeFromWishlist(tour.id)}
                style={{
                  position: 'absolute', top: 10, right: 10,
                  width: 36, height: 36, borderRadius: 'var(--radius-full)',
                  background: 'rgba(239, 68, 68, 0.9)', color: 'white',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'transform 0.2s',
                }}
                title="Remove from wishlist"
              >
                <Heart size={16} fill="white" />
              </button>
              {tour.originalPrice && (
                <div style={{
                  position: 'absolute', top: 10, left: 10,
                  background: 'var(--color-error)', color: 'white',
                  padding: '4px 10px', borderRadius: 'var(--radius-full)',
                  fontSize: 11, fontWeight: 700,
                }}>
                  {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <MapPin size={13} style={{ color: 'var(--color-primary)' }} />
                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  {tour.location}, {tour.country}
                </span>
              </div>
              <Link href={`/tours/${tour.slug}`} style={{ textDecoration: 'none' }}>
                <h3 style={{
                  fontSize: 15, fontWeight: 600, color: 'var(--color-text)',
                  lineHeight: 1.4, marginBottom: 10,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {tour.title}
                </h3>
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, fontSize: 12, color: 'var(--color-text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={13} /> {tour.duration}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Users size={13} /> Up to {tour.groupSize.max}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={14} fill="#f59e0b" style={{ color: '#f59e0b' }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{tour.rating}</span>
                  <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>({tour.reviewCount})</span>
                </div>
                <div>
                  {tour.originalPrice && (
                    <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)', textDecoration: 'line-through', marginRight: 6 }}>
                      {formatPrice(tour.originalPrice)}
                    </span>
                  )}
                  <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-primary)' }}>
                    {formatPrice(tour.price)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTours.length === 0 && searchQuery && (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
            No wishlist items match &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
