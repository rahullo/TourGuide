'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { Calendar, Users, MapPin, Search, ChevronRight, Star, Heart, Clock, Award, TrendingUp, Sun, Snowflake, Flower2, Leaf, Sparkles, Shield, Globe, Thermometer, Play, CheckCircle, ArrowRight } from 'lucide-react';
import TourCard from '@/components/TourCard';
import { categories, destinations, reviews } from '@/lib/data';
import type { Tour } from '@/lib/data';
import { seasonalData, getCurrentSeason, getCurrentMonthName, heroBackgrounds, type Season } from '@/lib/seasonal';
import { globalDestinations } from '@/lib/destinations';

const seasonIcons: Record<Season, React.ReactNode> = {
  winter: <Snowflake size={20} />,
  spring: <Flower2 size={20} />,
  summer: <Sun size={20} />,
  autumn: <Leaf size={20} />,
};

export default function HomePage() {
  const [searchDest, setSearchDest] = useState('');
  const [bgIndex, setBgIndex] = useState(0);
  const [bgReady, setBgReady] = useState(true);

  const [featuredTours, setFeaturedTours] = useState<Tour[]>([]);
  const [trendingTours, setTrendingTours] = useState<Tour[]>([]);

  useEffect(() => {
    // Fetch top rated/booked tours since we don't have a 'featured' boolean in DB yet
    fetch('/api/tours?limit=4&sortBy=rating')
      .then(res => res.json())
      .then(data => {
        if (data.success) setFeaturedTours(data.tours);
      });
      
    fetch('/api/tours?limit=4&sortBy=popular')
      .then(res => res.json())
      .then(data => {
        if (data.success) setTrendingTours(data.tours);
      });
  }, []);

  const currentSeason = getCurrentSeason();
  const currentMonth = getCurrentMonthName();
  const seasonInfo = seasonalData[currentSeason];

  // Rotate hero backgrounds
  useEffect(() => {
    // Pick a random starting index on each page load
    setBgIndex(Math.floor(Math.random() * heroBackgrounds.length));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgReady(false);
      setTimeout(() => {
        setBgIndex(prev => (prev + 1) % heroBackgrounds.length);
        setBgReady(true);
      }, 600);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Country-based search suggestions
  const allCountries = [...new Set(destinations.map(d => d.country))].sort();
  const filteredSuggestions = searchDest.length >= 2
    ? globalDestinations.filter(d =>
        d.name.toLowerCase().includes(searchDest.toLowerCase()) ||
        d.country.toLowerCase().includes(searchDest.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <div className="page-content" style={{ paddingTop: 0 }}>
      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Background with crossfade */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${heroBackgrounds[bgIndex].url})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transition: 'opacity 0.8s ease-in-out',
          opacity: bgReady ? 1 : 0,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.65) 100%)',
          }} />
        </div>

        {/* Content */}
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '120px 20px 80px' }}>
          <div className="animate-fade-in-up stagger-1">
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
              padding: '8px 20px', borderRadius: 'var(--radius-full)',
              color: 'white', fontSize: 14, fontWeight: 500, marginBottom: 24,
              border: '1px solid rgba(255,255,255,0.2)',
            }}>
              <Sparkles size={16} /> Trusted by 2M+ travelers worldwide
            </span>
          </div>

          <h1 className="font-display animate-fade-in-up stagger-2" style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 700, color: 'white', lineHeight: 1.1,
            marginBottom: 20, maxWidth: 800, margin: '0 auto 20px',
          }}>
            Discover the World's <br />
            <span style={{
              background: 'linear-gradient(135deg, #14b8a6, #fbbf24)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Best Experiences</span>
          </h1>

          <p className="animate-fade-in-up stagger-3" style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'rgba(255,255,255,0.8)', maxWidth: 600, margin: '0 auto 40px',
            lineHeight: 1.6,
          }}>
            Handpicked tours, verified local guides, and instant booking.
            Your next adventure starts here.
          </p>

          {/* ──── Redesigned Search Bar ──── */}
          <div className="animate-fade-in-up stagger-4" style={{
            maxWidth: 780, margin: '0 auto', position: 'relative',
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)',
              borderRadius: 20,
              padding: 10,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr)) auto',
                gap: 4,
                alignItems: 'center',
              }}>
                {/* Destination */}
                <div style={{
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '2px solid transparent',
                  transition: 'border-color 0.2s',
                }}>
                  <label style={{
                    fontSize: 10, fontWeight: 700, color: '#14b8a6',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    marginBottom: 4, display: 'block',
                  }}>
                    Destination
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f1f5f9', borderRadius: 8, padding: '8px 10px', border: '1px solid #e2e8f0' }}>
                    <MapPin size={15} style={{ color: '#64748b', flexShrink: 0 }} />
                    <input
                      value={searchDest}
                      onChange={e => setSearchDest(e.target.value)}
                      placeholder="Search by country or city..."
                      style={{
                        border: 'none', outline: 'none', fontSize: 14, fontWeight: 500,
                        color: '#0f172a', background: 'transparent', width: '100%',
                      }}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="hide-mobile" style={{ width: 1, height: 40, background: '#e2e8f0' }} />

                {/* Date */}
                <div style={{
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '2px solid transparent',
                  transition: 'border-color 0.2s',
                }}>
                  <label style={{
                    fontSize: 10, fontWeight: 700, color: '#14b8a6',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    marginBottom: 4, display: 'block',
                  }}>
                    When
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f1f5f9', borderRadius: 8, padding: '8px 10px', border: '1px solid #e2e8f0' }}>
                    <Calendar size={15} style={{ color: '#64748b', flexShrink: 0 }} />
                    <input
                      type="date"
                      placeholder="Pick a date"
                      style={{
                        border: 'none', outline: 'none', fontSize: 14, fontWeight: 500,
                        color: '#0f172a', background: 'transparent', width: '100%',
                      }}
                    />
                  </div>
                </div>

                <div className="hide-mobile" style={{ width: 1, height: 40, background: '#e2e8f0' }} />

                {/* Guests */}
                <div style={{
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '2px solid transparent',
                  transition: 'border-color 0.2s',
                }}>
                  <label style={{
                    fontSize: 10, fontWeight: 700, color: '#14b8a6',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    marginBottom: 4, display: 'block',
                  }}>
                    Guests
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f1f5f9', borderRadius: 8, padding: '8px 10px', border: '1px solid #e2e8f0' }}>
                    <Users size={15} style={{ color: '#64748b', flexShrink: 0 }} />
                    <select style={{
                      border: 'none', outline: 'none', fontSize: 14, fontWeight: 500,
                      color: '#0f172a', background: 'transparent', width: '100%',
                      cursor: 'pointer',
                    }}>
                      <option value="">How many?</option>
                      <option>1 guest</option>
                      <option>2 guests</option>
                      <option>3 guests</option>
                      <option>4 guests</option>
                      <option>5+ guests</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <Link href={`/tours${searchDest ? `?q=${searchDest}` : ''}`} className="btn btn-primary btn-lg" style={{
                  borderRadius: 14, textDecoration: 'none',
                  padding: '16px 32px', fontSize: 16,
                }}>
                  <Search size={20} />
                  <span className="hide-mobile">Search</span>
                </Link>
              </div>
            </div>

            {/* ──── Autocomplete Dropdown ──── */}
            {filteredSuggestions.length > 0 && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', left: 10, right: 10,
                background: 'white', borderRadius: 16, boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
                padding: 8, zIndex: 10, maxHeight: 320, overflowY: 'auto',
              }}>
                {filteredSuggestions.map(d => (
                  <Link
                    key={d.id}
                    href={`/tours?q=${d.name}`}
                    onClick={() => setSearchDest('')}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 14px', borderRadius: 10, textDecoration: 'none',
                      color: '#0f172a', transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <img src={d.image} alt={d.name} style={{
                      width: 44, height: 44, borderRadius: 10, objectFit: 'cover',
                    }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{d.name}</div>
                      <div style={{ fontSize: 12, color: '#64748b' }}>
                        <MapPin size={11} style={{ display: 'inline', verticalAlign: '-1px' }} /> {d.country} · {d.tourCount} tours
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up stagger-5" style={{
            marginTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Popular:</span>
            {['Rome', 'Tokyo', 'Paris', 'Bali', 'Barcelona', 'New York'].map(q => (
              <Link key={q} href={`/tours?q=${q}`} style={{
                padding: '4px 14px', borderRadius: 'var(--radius-full)',
                background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)',
                fontSize: 13, textDecoration: 'none', fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.15)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
              >
                {q}
              </Link>
            ))}
          </div>

          {/* Photo credit */}
          <div style={{
            position: 'absolute', bottom: 56, right: 20,
            fontSize: 11, color: 'rgba(255,255,255,0.35)',
          }}>
            📍 {heroBackgrounds[bgIndex].location}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          animation: 'float 2s ease-in-out infinite',
        }}>
          <div style={{
            width: 28, height: 44, borderRadius: 14, border: '2px solid rgba(255,255,255,0.4)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 8,
          }}>
            <div style={{
              width: 4, height: 10, borderRadius: 2, background: 'rgba(255,255,255,0.7)',
              animation: 'float 1.5s ease-in-out infinite',
            }} />
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRUST BAR ═══════════════════ */}
      <section style={{
        background: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border-light)',
        padding: '24px 0',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 24,
            textAlign: 'center',
          }}>
            {[
              { icon: <Shield size={24} />, label: 'Verified Guides', sub: '5,000+ certified' },
              { icon: <Star size={24} />, label: '4.9 Average Rating', sub: 'From 2M+ reviews' },
              { icon: <Clock size={24} />, label: 'Instant Confirmation', sub: 'Book in seconds' },
              { icon: <Globe size={24} />, label: '190+ Countries', sub: 'Global coverage' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
                <div style={{ color: 'var(--color-primary)' }}>{item.icon}</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)' }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SEASONAL RECOMMENDATIONS ═══════════════════ */}
      <section className="section" style={{
        background: 'var(--color-bg)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: seasonInfo.gradient,
                  padding: '5px 14px', borderRadius: 'var(--radius-full)',
                  color: 'white', fontSize: 12, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>
                  {seasonIcons[currentSeason]}
                  Best for {currentMonth}
                </div>
              </div>
              <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-text)', marginBottom: 6 }}>
                {seasonInfo.emoji} {seasonInfo.title}
              </h2>
              <p style={{ fontSize: 16, color: 'var(--color-text-secondary)' }}>
                {seasonInfo.subtitle}
              </p>
            </div>
            <Link href="/tours" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-primary)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {seasonInfo.destinations.map((dest, i) => (
              <Link key={dest.name} href={`/tours?q=${dest.name}`} style={{ textDecoration: 'none' }}>
                <div className="animate-fade-in-up" style={{
                  animationDelay: `${i * 0.08}s`, animationFillMode: 'both',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border-light)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                    <img src={dest.image} alt={dest.name} style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }} />
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                      padding: '4px 10px', borderRadius: 'var(--radius-full)',
                      display: 'flex', alignItems: 'center', gap: 4,
                      color: 'white', fontSize: 11, fontWeight: 600,
                    }}>
                      <Thermometer size={12} /> {dest.avgTemp}
                    </div>
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>{dest.name}</h3>
                      <span style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>· {dest.country}</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 10, lineHeight: 1.5 }}>
                      {dest.reason}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {dest.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: 11, padding: '3px 10px', borderRadius: 'var(--radius-full)',
                          background: 'var(--color-primary-50)', color: 'var(--color-primary)',
                          fontWeight: 600,
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CATEGORIES ═══════════════════ */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-text)', marginBottom: 6 }}>
                Browse by Category
              </h2>
              <p style={{ fontSize: 16, color: 'var(--color-text-secondary)' }}>
                Find the perfect experience for your travel style
              </p>
            </div>
            <Link href="/tours" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-primary)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 16,
          }}>
            {categories.map((cat, i) => (
              <Link key={cat.id} href={`/tours?category=${cat.name}`} style={{ textDecoration: 'none' }}>
                <div className="animate-fade-in-up" style={{
                  animationDelay: `${i * 0.06}s`, animationFillMode: 'both',
                  position: 'relative', borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden', aspectRatio: '1',
                  cursor: 'pointer',
                  transition: 'transform var(--transition-base)',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    padding: 16,
                  }}>
                    <span style={{ fontSize: 24, marginBottom: 2 }}>{cat.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{cat.name}</span>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>{cat.count.toLocaleString()} tours</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURED TOURS ═══════════════════ */}
      <section className="section" style={{ background: 'var(--color-bg)', paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Award size={20} style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Hand-picked
                </span>
              </div>
              <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-text)', marginBottom: 6 }}>
                Featured Experiences
              </h2>
              <p style={{ fontSize: 16, color: 'var(--color-text-secondary)' }}>
                Our editors' top picks for unforgettable moments
              </p>
            </div>
            <Link href="/tours" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-primary)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
              Explore All <ChevronRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
          }}>
            {featuredTours.map((tour, i) => (
              <TourCard key={tour.id} tour={tour} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ DESTINATIONS ═══════════════════ */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
              Top Destinations
            </h2>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', maxWidth: 500, margin: '0 auto' }}>
              Explore the world's most popular cities and uncover hidden gems
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridTemplateRows: 'repeat(2, 200px)',
            gap: 16,
          }}>
            {destinations.slice(0, 6).map((dest, i) => {
              const spans: Record<number, React.CSSProperties> = {
                0: { gridColumn: 'span 2', gridRow: 'span 2' },
                1: { gridColumn: 'span 2' },
                2: { gridColumn: 'span 2' },
                3: { gridColumn: 'span 2' },
                4: { gridColumn: 'span 2' },
                5: { gridColumn: 'span 2' },
              };
              return (
                <Link key={dest.id} href={`/tours?q=${dest.name}`} style={{
                  textDecoration: 'none',
                  ...spans[i],
                }}>
                  <div className="animate-fade-in-up" style={{
                    animationDelay: `${i * 0.08}s`, animationFillMode: 'both',
                    position: 'relative', borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden', height: '100%',
                    cursor: 'pointer',
                  }}>
                    <img src={dest.image} alt={dest.name} style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)',
                      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                      padding: 20,
                    }}>
                      <h3 style={{ fontSize: i === 0 ? 28 : 20, fontWeight: 700, color: 'white', marginBottom: 2 }}>{dest.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>
                        <MapPin size={13} /> {dest.country} · {dest.tourCount} tours
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRENDING ═══════════════════ */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <TrendingUp size={20} style={{ color: 'var(--color-error)' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-error)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Trending now
                </span>
              </div>
              <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-text)', marginBottom: 6 }}>
                What Travelers Love
              </h2>
              <p style={{ fontSize: 16, color: 'var(--color-text-secondary)' }}>
                Most booked experiences this month
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
          }}>
            {trendingTours.map((tour, i) => (
              <TourCard key={tour.id} tour={tour} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ AI TRIP PLANNER PROMO ═══════════════════ */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #0f172a, #1e293b, #0f766e)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(40px, 6vw, 80px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 40,
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Decorative Elements */}
            <div style={{
              position: 'absolute', top: -100, right: -100,
              width: 300, height: 300, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(20,184,166,0.2), transparent)',
            }} />
            <div style={{
              position: 'absolute', bottom: -80, left: -80,
              width: 200, height: 200, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,158,11,0.15), transparent)',
            }} />

            <div style={{ position: 'relative' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(20,184,166,0.15)', padding: '6px 16px',
                borderRadius: 'var(--radius-full)', marginBottom: 20,
                border: '1px solid rgba(20,184,166,0.3)',
              }}>
                <Sparkles size={16} style={{ color: '#14b8a6' }} />
                <span style={{ color: '#14b8a6', fontSize: 13, fontWeight: 600 }}>AI-Powered</span>
              </div>

              <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'white', marginBottom: 16, lineHeight: 1.2 }}>
                Let AI Plan Your <br />Perfect Trip
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 28, maxWidth: 440, lineHeight: 1.7 }}>
                Tell us your destination, budget, and interests — our AI will curate a personalized itinerary with the best tours, timing, and hidden gems.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Link href="/tours" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>
                  <Sparkles size={18} /> Try AI Planner
                </Link>
                <button className="btn btn-lg" style={{
                  background: 'rgba(255,255,255,0.1)', color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}>
                  <Play size={18} /> Watch Demo
                </button>
              </div>
            </div>

            <div style={{
              position: 'relative',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              {[
                { icon: '🗺️', title: '3-Day Rome Itinerary', desc: 'Colosseum → Vatican → Trastevere food tour', match: '98% match' },
                { icon: '🍜', title: 'Tokyo Food & Culture', desc: 'Tsukiji → Meiji Shrine → Shibuya night tour', match: '95% match' },
                { icon: '🏖️', title: 'Bali Adventure Week', desc: 'Rice terraces → Surfing → Temple sunrise', match: '92% match' },
              ].map((item, i) => (
                <div key={i} className="animate-slide-in-right" style={{
                  animationDelay: `${i * 0.15}s`, animationFillMode: 'both',
                  background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 'var(--radius-lg)', padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 16,
                }}>
                  <span style={{ fontSize: 28 }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{item.desc}</div>
                  </div>
                  <span className="badge badge-primary" style={{ fontSize: 11 }}>{item.match}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ REVIEWS / SOCIAL PROOF ═══════════════════ */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
              Loved by Travelers
            </h2>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)' }}>
              Real stories from real adventures
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 24,
          }}>
            {reviews.slice(0, 6).map((review, i) => (
              <div key={review.id} className="card card-elevated animate-fade-in-up" style={{
                animationDelay: `${i * 0.08}s`, animationFillMode: 'both',
                padding: 24,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <img src={review.user.avatar} alt={review.user.name} style={{
                    width: 44, height: 44, borderRadius: 'var(--radius-full)', objectFit: 'cover',
                    border: '2px solid var(--color-border-light)',
                  }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>{review.user.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{review.user.country}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} size={14} fill="var(--color-accent)" stroke="var(--color-accent)" />
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  &quot;{review.comment}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
              How TourGuide Works
            </h2>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)' }}>
              Three simple steps to your next adventure
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 40,
          }}>
            {[
              { step: '01', icon: <Search size={28} />, title: 'Discover', desc: 'Search thousands of tours by destination, date, budget, and interests. Filter, compare, and find your perfect match.' },
              { step: '02', icon: <CheckCircle size={28} />, title: 'Book Instantly', desc: 'Secure your spot in seconds with transparent pricing. Free cancellation on most tours. Pay in your currency.' },
              { step: '03', icon: <Heart size={28} />, title: 'Experience', desc: 'Meet your verified local guide and enjoy an unforgettable adventure. Leave a review to help fellow travelers.' },
            ].map((item, i) => (
              <div key={i} className="animate-fade-in-up" style={{
                animationDelay: `${i * 0.15}s`, animationFillMode: 'both',
                textAlign: 'center', padding: 24,
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 'var(--radius-xl)',
                  background: 'var(--color-primary-50)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: 'var(--color-primary)',
                  position: 'relative',
                }}>
                  {item.icon}
                  <span style={{
                    position: 'absolute', top: -8, right: -8,
                    width: 28, height: 28, borderRadius: 'var(--radius-full)',
                    background: 'var(--color-primary)', color: 'white',
                    fontSize: 11, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {item.step}
                  </span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg, var(--color-primary-800), var(--color-primary))',
        padding: '80px 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'white', marginBottom: 16 }}>
            Ready for Your Next Adventure?
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Join millions of travelers discovering the world's best experiences.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/tours" className="btn btn-lg" style={{
              background: 'white', color: 'var(--color-primary-800)',
              fontWeight: 700, textDecoration: 'none',
            }}>
              Explore Tours <ArrowRight size={18} />
            </Link>
            <Link href="/login?callbackUrl=/operator" className="btn btn-lg" style={{
              background: 'transparent', color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              textDecoration: 'none',
            }}>
              Become a Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
