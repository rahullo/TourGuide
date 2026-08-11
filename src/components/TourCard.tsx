'use client';

import Link from 'next/link';
import { Star, Heart, Clock, Users, MapPin, Zap, Award } from 'lucide-react';
import { useState } from 'react';
import type { Tour } from '@/lib/data';
import { useCurrency } from '@/lib/CurrencyContext';

export default function TourCard({ tour, index = 0 }: { tour: Tour; index?: number }) {
  const [liked, setLiked] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const { formatPrice } = useCurrency();

  return (
    <div
      className="card animate-fade-in-up"
      style={{
        animationDelay: `${index * 0.08}s`,
        animationFillMode: 'both',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{
        position: 'relative',
        aspectRatio: '4/3',
        overflow: 'hidden',
        cursor: 'pointer',
      }}>
        <Link href={`/tours/${tour.slug}`}>
          <img
            src={tour.images[imgIdx]}
            alt={tour.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </Link>

        {/* Badges */}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          {tour.bestSeller && (
            <span className="badge badge-accent" style={{ backdropFilter: 'blur(8px)' }}>
              <Award size={12} /> Best Seller
            </span>
          )}
          {tour.instant && (
            <span className="badge badge-primary" style={{ backdropFilter: 'blur(8px)' }}>
              <Zap size={12} /> Instant
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 36, height: 36, borderRadius: 'var(--radius-full)',
            background: 'rgba(255,255,255,0.9)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all var(--transition-fast)',
            color: liked ? '#ef4444' : 'var(--color-text-tertiary)',
          }}
          aria-label="Add to wishlist"
        >
          <Heart size={18} fill={liked ? '#ef4444' : 'none'} />
        </button>

        {/* Discount */}
        {tour.originalPrice && (
          <div style={{
            position: 'absolute', bottom: 12, left: 12,
            background: 'var(--color-error)', color: 'white',
            padding: '4px 10px', borderRadius: 'var(--radius-full)',
            fontSize: 12, fontWeight: 700,
          }}>
            {Math.round((1 - tour.price / tour.originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Image Dots */}
        <div style={{
          position: 'absolute', bottom: 12, right: 12,
          display: 'flex', gap: 4,
        }}>
          {tour.images.slice(0, 4).map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.preventDefault(); setImgIdx(i); }}
              style={{
                width: i === imgIdx ? 16 : 6, height: 6,
                borderRadius: 'var(--radius-full)',
                background: i === imgIdx ? 'white' : 'rgba(255,255,255,0.5)',
                border: 'none', cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Location */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 12, color: 'var(--color-text-tertiary)', fontWeight: 500,
          marginBottom: 6,
        }}>
          <MapPin size={12} />
          {tour.location}, {tour.country}
        </div>

        {/* Title */}
        <Link href={`/tours/${tour.slug}`} style={{
          fontSize: 15, fontWeight: 600, color: 'var(--color-text)',
          textDecoration: 'none', lineHeight: 1.4,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden', marginBottom: 10,
        }}>
          {tour.title}
        </Link>

        {/* Meta */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 12,
          fontSize: 13, color: 'var(--color-text-secondary)',
          marginBottom: 12,
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={13} /> {tour.duration}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Users size={13} /> Up to {tour.groupSize.max}
          </span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Bottom: Rating + Price */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          borderTop: '1px solid var(--color-border-light)',
          paddingTop: 12,
          marginTop: 4,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: 'var(--color-primary-50)', padding: '3px 8px',
              borderRadius: 'var(--radius-sm)',
            }}>
              <Star size={13} fill="var(--color-accent)" stroke="var(--color-accent)" />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-primary-800)' }}>
                {tour.rating}
              </span>
            </div>
            <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
              ({tour.reviewCount.toLocaleString()})
            </span>
          </div>

          <div style={{ textAlign: 'right' }}>
            {tour.originalPrice && (
              <span style={{
                fontSize: 12, color: 'var(--color-text-tertiary)',
                textDecoration: 'line-through', marginRight: 4,
              }}>
                {formatPrice(tour.originalPrice)}
              </span>
            )}
            <div>
              <span style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>From </span>
              <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-primary)' }}>
                {formatPrice(tour.price)}
              </span>
              <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}> / person</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
