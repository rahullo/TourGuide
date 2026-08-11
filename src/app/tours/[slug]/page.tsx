'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Star, Heart, Share2, MapPin, Clock, Users, Globe, Shield,
  ChevronRight, ChevronDown, ChevronUp, Calendar, Minus, Plus,
  CheckCircle, XCircle, MessageCircle, Award, Zap, ThumbsUp,
  Navigation, Info, AlertTriangle, HelpCircle, Flag, ArrowLeft
} from 'lucide-react';
import TourCard from '@/components/TourCard';
import { getReviewsForTour } from '@/lib/data';
import type { Tour } from '@/lib/data';
import { useCurrency } from '@/lib/CurrencyContext';

export default function TourDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [tour, setTour] = useState<Tour | null>(null);
  const [relatedTours, setRelatedTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { formatPrice } = useCurrency();

  useEffect(() => {
    fetch(`/api/tours/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTour(data.tour);
          // Fetch related
          fetch(`/api/tours?categories=${data.tour.category}&limit=4`)
            .then(res => res.json())
            .then(relData => {
              if (relData.success) {
                setRelatedTours(relData.tours.filter((t: Tour) => t.id !== data.tour.id).slice(0, 3));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ marginBottom: 16 }}></div>
          <p>Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Tour Not Found</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 24 }}>The tour you're looking for doesn't exist.</p>
          <Link href="/tours" className="btn btn-primary">Browse Tours</Link>
        </div>
      </div>
    );
  }

  const tourReviews = getReviewsForTour(tour.id);
  const totalPrice = tour.price * guests;

  return (
    <div className="page-content" style={{ background: 'var(--color-bg)' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border-light)', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--color-text-tertiary)' }}>
            <Link href="/" style={{ color: 'var(--color-text-tertiary)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <Link href="/tours" style={{ color: 'var(--color-text-tertiary)', textDecoration: 'none' }}>Tours</Link>
            <ChevronRight size={14} />
            <Link href={`/tours?q=${tour.location}`} style={{ color: 'var(--color-text-tertiary)', textDecoration: 'none' }}>{tour.location}</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--color-text-secondary)' }}>{tour.title.slice(0, 40)}...</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '24px 20px 80px' }}>
        {/* ═══════════ IMAGE GALLERY ═══════════ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gridTemplateRows: 'repeat(2, 220px)',
          gap: 8,
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          marginBottom: 32,
        }}>
          <div style={{ gridRow: 'span 2', position: 'relative', cursor: 'pointer' }}
            onClick={() => setSelectedImage(0)}>
            <img src={tour.images[0]} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {/* Badges overlay */}
            <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8 }}>
              {tour.bestSeller && <span className="badge badge-accent"><Award size={12} /> Best Seller</span>}
              {tour.instant && <span className="badge badge-primary"><Zap size={12} /> Instant Book</span>}
            </div>
          </div>
          {tour.images.slice(1, 3).map((img, i) => (
            <div key={i} style={{ cursor: 'pointer', position: 'relative' }}
              onClick={() => setSelectedImage(i + 1)}>
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {i === 1 && tour.images.length > 3 && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 16, fontWeight: 700,
                }}>
                  +{tour.images.length - 3} photos
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ═══════════ MAIN LAYOUT ═══════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'flex-start' }}>
          {/* LEFT: Content */}
          <div>
            {/* Header */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span className="badge badge-primary">{tour.category}</span>
                <span style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>
                  <MapPin size={13} style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> {tour.location}, {tour.country}
                </span>
              </div>

              <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.3, marginBottom: 8 }}>
                {tour.title}
              </h1>
              <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', marginBottom: 16 }}>
                {tour.subtitle}
              </p>

              {/* Quick Stats */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'var(--color-primary-50)', padding: '4px 10px', borderRadius: 'var(--radius-sm)' }}>
                    <Star size={14} fill="var(--color-accent)" stroke="var(--color-accent)" />
                    <span style={{ fontWeight: 700, color: 'var(--color-primary-800)', fontSize: 14 }}>{tour.rating}</span>
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>({tour.reviewCount.toLocaleString()} reviews)</span>
                </div>
                <span style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>•</span>
                <span style={{ fontSize: 13, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={14} /> {tour.duration}
                </span>
                <span style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>•</span>
                <span style={{ fontSize: 13, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Users size={14} /> Up to {tour.groupSize.max} people
                </span>
                <span style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>•</span>
                <span style={{ fontSize: 13, color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Globe size={14} /> {tour.languages.join(', ')}
                </span>

                {/* Share & Save */}
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                  <button className="btn btn-ghost btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>
                    <Share2 size={15} /> Share
                  </button>
                  <button onClick={() => setLiked(!liked)} className="btn btn-ghost btn-sm" style={{
                    borderRadius: 'var(--radius-full)',
                    color: liked ? 'var(--color-error)' : undefined,
                  }}>
                    <Heart size={15} fill={liked ? 'var(--color-error)' : 'none'} /> Save
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="tab-nav" style={{ marginBottom: 32 }}>
              {['overview', 'itinerary', 'reviews', 'faq'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* ── Overview Tab ── */}
            {activeTab === 'overview' && (
              <div className="animate-fade-in">
                {/* Description */}
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12 }}>About This Tour</h2>
                  <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>{tour.description}</p>
                </div>

                {/* Highlights */}
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12 }}>Highlights</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 10 }}>
                    {tour.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
                        <CheckCircle size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions / Exclusions */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <CheckCircle size={18} style={{ color: 'var(--color-success)' }} /> What's Included
                    </h3>
                    {tour.inclusions.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 14, color: 'var(--color-text-secondary)' }}>
                        <CheckCircle size={14} style={{ color: 'var(--color-success)' }} /> {item}
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <XCircle size={18} style={{ color: 'var(--color-error)' }} /> Not Included
                    </h3>
                    {tour.exclusions.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 14, color: 'var(--color-text-secondary)' }}>
                        <XCircle size={14} style={{ color: 'var(--color-error)' }} /> {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Host Profile */}
                <div style={{
                  background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)',
                  padding: 24, marginBottom: 32,
                  border: '1px solid var(--color-border-light)',
                }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text)', marginBottom: 16 }}>Meet Your Guide</h2>
                  <div style={{ display: 'flex', gap: 20 }}>
                    <img src={tour.host.avatar} alt={tour.host.name} style={{
                      width: 80, height: 80, borderRadius: 'var(--radius-full)', objectFit: 'cover',
                      border: '3px solid var(--color-primary-100)',
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)' }}>{tour.host.name}</h3>
                        {tour.host.verified && <Shield size={16} style={{ color: 'var(--color-primary)' }} />}
                        {tour.host.superhost && <span className="badge badge-accent" style={{ fontSize: 11 }}>Superhost</span>}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 12 }}>
                        <span>⭐ {tour.host.rating} ({tour.host.reviewCount} reviews)</span>
                        <span>🎯 {tour.host.tourCount} tours</span>
                        <span>⏱️ {tour.host.responseTime}</span>
                        <span>📅 Member since {tour.host.memberSince}</span>
                      </div>
                      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>{tour.host.bio}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {tour.host.expertise.map((exp, i) => (
                          <span key={i} className="badge badge-primary">{exp}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Meeting Point */}
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Navigation size={20} /> Meeting Point
                  </h2>
                  <div style={{
                    background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)',
                    padding: 16, border: '1px solid var(--color-border-light)',
                    fontSize: 14, color: 'var(--color-text-secondary)',
                  }}>
                    <MapPin size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', color: 'var(--color-primary)' }} /> {tour.meetingPoint}
                  </div>
                </div>

                {/* Safety & Policies */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 32 }}>
                  <div style={{ background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', padding: 20, border: '1px solid var(--color-border-light)' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <AlertTriangle size={16} style={{ color: 'var(--color-warning)' }} /> Safety Info
                    </h3>
                    {tour.safetyInfo.map((s, i) => (
                      <div key={i} style={{ fontSize: 13, color: 'var(--color-text-secondary)', padding: '3px 0' }}>• {s}</div>
                    ))}
                  </div>
                  <div style={{ background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', padding: 20, border: '1px solid var(--color-border-light)' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Info size={16} style={{ color: 'var(--color-info)' }} /> Cancellation Policy
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{tour.cancellationPolicy}</p>
                  </div>
                  <div style={{ background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', padding: 20, border: '1px solid var(--color-border-light)' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Users size={16} style={{ color: 'var(--color-primary)' }} /> Age & Accessibility
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 4 }}>{tour.ageRestriction}</p>
                    {tour.accessibility.map((a, i) => (
                      <div key={i} style={{ fontSize: 13, color: 'var(--color-text-secondary)', padding: '2px 0' }}>• {a}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Itinerary Tab ── */}
            {activeTab === 'itinerary' && (
              <div className="animate-fade-in">
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text)', marginBottom: 24 }}>Detailed Itinerary</h2>
                <div style={{ position: 'relative', paddingLeft: 32 }}>
                  {/* Timeline line */}
                  <div style={{
                    position: 'absolute', left: 11, top: 8, bottom: 8,
                    width: 2, background: 'var(--color-border)',
                  }} />
                  {tour.itinerary.map((item, i) => (
                    <div key={i} style={{
                      position: 'relative', marginBottom: 28,
                      paddingBottom: i < tour.itinerary.length - 1 ? 28 : 0,
                    }}>
                      {/* Dot */}
                      <div style={{
                        position: 'absolute', left: -32, top: 4,
                        width: 24, height: 24, borderRadius: 'var(--radius-full)',
                        background: i === 0 ? 'var(--color-primary)' : 'var(--color-surface)',
                        border: `2px solid ${i === 0 ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 1,
                      }}>
                        {i === 0 && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
                      </div>

                      <div style={{
                        background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)',
                        padding: 20, border: '1px solid var(--color-border-light)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                          <span className="badge badge-primary">{item.time}</span>
                          <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{item.duration}</span>
                        </div>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 6 }}>{item.title}</h3>
                        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Reviews Tab ── */}
            {activeTab === 'reviews' && (
              <div className="animate-fade-in">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>Reviews</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={16} fill="var(--color-accent)" stroke="var(--color-accent)" />
                        ))}
                      </div>
                      <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-text)' }}>{tour.rating}</span>
                      <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>({tour.reviewCount.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {tourReviews.map(review => (
                    <div key={review.id} style={{
                      padding: 20, borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border-light)',
                      background: 'var(--color-bg-secondary)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <img src={review.user.avatar} alt={review.user.name} style={{ width: 40, height: 40, borderRadius: 'var(--radius-full)', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>{review.user.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{review.user.country} · {review.date}</div>
                        </div>
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
                          {Array.from({ length: review.rating }).map((_, j) => (
                            <Star key={j} size={12} fill="var(--color-accent)" stroke="var(--color-accent)" />
                          ))}
                        </div>
                      </div>
                      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{review.comment}</p>
                      <div style={{ marginTop: 12, display: 'flex', gap: 16 }}>
                        <button style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          background: 'none', border: 'none', fontSize: 12,
                          color: 'var(--color-text-tertiary)', cursor: 'pointer',
                        }}>
                          <ThumbsUp size={13} /> Helpful ({review.helpful})
                        </button>
                        <button style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          background: 'none', border: 'none', fontSize: 12,
                          color: 'var(--color-text-tertiary)', cursor: 'pointer',
                        }}>
                          <Flag size={13} /> Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── FAQ Tab ── */}
            {activeTab === 'faq' && (
              <div className="animate-fade-in">
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text)', marginBottom: 24 }}>Frequently Asked Questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {tour.faqs.map((faq, i) => (
                    <div key={i} style={{
                      border: '1px solid var(--color-border-light)',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                    }}>
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                        style={{
                          width: '100%', padding: '16px 20px',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          background: 'var(--color-bg-secondary)', border: 'none',
                          cursor: 'pointer', fontSize: 14, fontWeight: 600,
                          color: 'var(--color-text)',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <HelpCircle size={16} style={{ color: 'var(--color-primary)' }} />
                          {faq.question}
                        </span>
                        {expandedFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {expandedFaq === i && (
                        <div style={{
                          padding: '12px 20px 16px 46px',
                          fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7,
                          background: 'var(--color-surface)',
                        }}>
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Booking Widget */}
          <div style={{ position: 'sticky', top: 'calc(var(--header-height) + 24px)', alignSelf: 'flex-start' }}>
            <div className="card card-elevated" style={{ padding: 24 }}>
              {/* Price */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  {tour.originalPrice && (
                    <span style={{ fontSize: 16, color: 'var(--color-text-tertiary)', textDecoration: 'line-through' }}>
                      ${tour.originalPrice}
                    </span>
                  )}
                  <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--color-primary)' }}>${tour.price}</span>
                  <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>/ person</span>
                </div>
                {tour.originalPrice && (
                  <span className="badge badge-accent" style={{ marginTop: 6 }}>
                    Save {Math.round((1 - tour.price / tour.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Date Selection */}
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, display: 'block' }}>
                  Select Date
                </label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
                  <select
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="input"
                    style={{ paddingLeft: 36 }}
                  >
                    <option value="">Choose a date</option>
                    {tour.availableDates.map(d => (
                      <option key={d} value={d}>{new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Selection */}
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, display: 'block' }}>
                  Select Time
                </label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {tour.timeSlots.map(t => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      style={{
                        padding: '8px 16px', borderRadius: 'var(--radius-md)',
                        border: `2px solid ${selectedTime === t ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        background: selectedTime === t ? 'var(--color-primary-50)' : 'var(--color-surface)',
                        color: selectedTime === t ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        fontSize: 13, fontWeight: 600, cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Selection */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, display: 'block' }}>
                  Guests
                </label>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 12px', border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}>
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                    style={{
                      width: 32, height: 32, borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--color-border)', background: 'var(--color-surface)',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: guests <= 1 ? 'var(--color-text-tertiary)' : 'var(--color-text)',
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)' }}>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                  <button
                    onClick={() => setGuests(Math.min(tour.groupSize.max, guests + 1))}
                    disabled={guests >= tour.groupSize.max}
                    style={{
                      width: 32, height: 32, borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--color-border)', background: 'var(--color-surface)',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: guests >= tour.groupSize.max ? 'var(--color-text-tertiary)' : 'var(--color-text)',
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div style={{
                background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)',
                padding: 16, marginBottom: 16,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
                  <span>${tour.price} × {guests} guests</span>
                  <span>${totalPrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
                  <span>Service fee</span>
                  <span>${Math.round(totalPrice * 0.08)}</span>
                </div>
                {tour.originalPrice && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--color-success)', marginBottom: 8 }}>
                    <span>Discount</span>
                    <span>-${(tour.originalPrice - tour.price) * guests}</span>
                  </div>
                )}
                <div style={{
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: 8, marginTop: 8,
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 16, fontWeight: 700, color: 'var(--color-text)',
                }}>
                  <span>Total</span>
                  <span>${totalPrice + Math.round(totalPrice * 0.08)}</span>
                </div>
              </div>

              {/* Book Button */}
              <Link
                href={`/checkout?tour=${tour.slug}&date=${selectedDate}&time=${selectedTime}&guests=${guests}`}
                className="btn btn-primary btn-lg"
                style={{
                  width: '100%', justifyContent: 'center', textDecoration: 'none',
                  fontSize: 16, padding: '16px',
                }}
              >
                Reserve Now
              </Link>

              {/* Guarantees */}
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { icon: <Shield size={14} />, text: 'Free cancellation up to 24h before' },
                  { icon: <Zap size={14} />, text: 'Instant confirmation' },
                  { icon: <Globe size={14} />, text: 'Mobile voucher accepted' },
                ].map((g, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-primary)' }}>{g.icon}</span>
                    {g.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════ RELATED TOURS ═══════════ */}
        {relatedTours.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h2 className="font-display" style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)', marginBottom: 24 }}>
              Similar Experiences
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 24,
            }}>
              {relatedTours.map((t, i) => (
                <TourCard key={t.id} tour={t} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
