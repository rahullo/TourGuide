'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search, SlidersHorizontal, MapPin, Grid3X3, List, ChevronDown,
  Star, X, Map as MapIcon, Globe, Compass, ArrowRight, Loader2
} from 'lucide-react';
import TourCard from '@/components/TourCard';
import { categories } from '@/lib/data';
import type { Tour } from '@/lib/data';
import { globalDestinations } from '@/lib/destinations';
import { useCurrency } from '@/lib/CurrencyContext';

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'duration-short', label: 'Duration: Short' },
  { value: 'duration-long', label: 'Duration: Long' },
];

const DIFFICULTY_OPTIONS = ['Easy', 'Moderate', 'Challenging', 'Expert'];
const DURATION_OPTIONS = ['Under 2 hours', '2-4 hours', '4-8 hours', 'Full day (8+)'];

function ToursContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  
  const { formatPrice } = useCurrency();
  const activeTab = searchParams.get('tab') || 'discover';

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleDifficulty = (d: string) => {
    setSelectedDifficulty(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    );
  };

  const [fetchedTours, setFetchedTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTours, setTotalTours] = useState(0);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.set('q', searchQuery);
      if (selectedCategories.length > 0) queryParams.set('categories', selectedCategories.join(','));
      if (selectedDifficulty.length > 0) queryParams.set('difficulties', selectedDifficulty.join(','));
      queryParams.set('minPrice', priceRange[0].toString());
      queryParams.set('maxPrice', priceRange[1].toString());
      queryParams.set('sortBy', sortBy);
      queryParams.set('page', page.toString());

      const res = await fetch(`/api/tours?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) {
        setFetchedTours(data.tours);
        setTotalPages(data.totalPages);
        setTotalTours(data.total);
      }
    } catch (err) {
      console.error('Failed to fetch tours', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search input
    const timer = setTimeout(() => {
      fetchTours();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, sortBy, selectedCategories, selectedDifficulty, priceRange, page]);

  const activeFilterCount = selectedCategories.length + selectedDifficulty.length + (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0);

  return (
    <div className="page-content" style={{ background: 'var(--color-bg)' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary-900), var(--color-primary-700))',
        padding: '40px 0 24px',
      }}>
        <div className="container">
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 4 }}>
            Discover Tours & Experiences
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
            {totalTours} experiences available worldwide
          </p>

          {/* Search */}
          <div style={{
            marginTop: 20, display: 'flex', gap: 8,
            maxWidth: 600,
          }}>
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.12)', borderRadius: 'var(--radius-md)',
              padding: '10px 16px', border: '1px solid rgba(255,255,255,0.15)',
            }}>
              <Search size={18} style={{ color: 'rgba(255,255,255,0.6)' }} />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by destination, tour name..."
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  color: 'white', fontSize: 14,
                }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '24px 20px 60px' }}>
        {activeTab === 'destinations' && (
          <div style={{ marginTop: 20 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Explore by Destination</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 20,
            }}>
              {globalDestinations.map(dest => (
                <Link key={dest.id} href={`/tours?q=${dest.name}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', borderRadius: 'var(--radius-lg)' }}>
                    <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                         onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                         onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      padding: '30px 16px 16px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      color: 'white', display: 'flex', flexDirection: 'column'
                    }}>
                      <span style={{ fontSize: 18, fontWeight: 700 }}>{dest.name}</span>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{dest.country} • {dest.tourCount} tours</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'experiences' && (
          <div style={{ marginTop: 20 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Browse Experiences</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {categories.map(cat => (
                <Link key={cat.id} href={`/tours?q=${cat.name}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 16, transition: 'transform 0.2s', border: '1px solid var(--color-border-light)' }}
                       onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                       onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-50)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {cat.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text)' }}>{cat.name}</h3>
                      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Explore {cat.name.toLowerCase()} tours</p>
                    </div>
                    <ArrowRight size={16} style={{ color: 'var(--color-text-tertiary)' }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'discover' && (
          <>
            {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, marginBottom: 24, flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-secondary"
              style={{ position: 'relative' }}
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span style={{
                  position: 'absolute', top: -6, right: -6,
                  width: 20, height: 20, borderRadius: 'var(--radius-full)',
                  background: 'var(--color-primary)', color: 'white',
                  fontSize: 11, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Quick Category Filters */}
            <div className="hide-mobile" style={{ display: 'flex', gap: 6 }}>
              {categories.slice(0, 5).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.name)}
                  className={`btn btn-sm ${selectedCategories.includes(cat.name) ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ borderRadius: 'var(--radius-full)', fontSize: 12 }}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {/* Sort */}
            <div style={{ position: 'relative' }}>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="input"
                style={{ width: 'auto', paddingRight: 36, fontSize: 13, cursor: 'pointer' }}
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="hide-mobile" style={{
              display: 'flex', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)',
              padding: 2,
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '6px 10px', borderRadius: 'var(--radius-sm)',
                  background: viewMode === 'grid' ? 'var(--color-surface)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  color: viewMode === 'grid' ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                  boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none',
                }}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '6px 10px', borderRadius: 'var(--radius-sm)',
                  background: viewMode === 'list' ? 'var(--color-surface)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  color: viewMode === 'list' ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                  boxShadow: viewMode === 'list' ? 'var(--shadow-sm)' : 'none',
                }}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 32 }}>
          {/* Filter Sidebar */}
          {showFilters && (
            <aside style={{
              width: 260, flexShrink: 0,
              position: 'sticky', top: 'calc(var(--header-height) + 24px)',
              alignSelf: 'flex-start',
              maxHeight: 'calc(100vh - var(--header-height) - 48px)',
              overflowY: 'auto',
            }}>
              <div className="card card-elevated" style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)' }}>Filters</h3>
                  <button
                    onClick={() => { setSelectedCategories([]); setSelectedDifficulty([]); setPriceRange([0, 500]); }}
                    style={{ fontSize: 12, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Clear all
                  </button>
                </div>

                {/* Price Range */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)' }}>Max Price</h4>
                    <span style={{ fontSize: 13, color: 'var(--color-primary)', fontWeight: 600 }}>{formatPrice(priceRange[1])}</span>
                  </div>
                  <input
                    type="range"
                    min={0} max={500} value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                </div>

                {/* Categories */}
                <div style={{ marginBottom: 24 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12 }}>Category</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {categories.map(cat => (
                      <label key={cat.id} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        fontSize: 13, color: 'var(--color-text-secondary)', cursor: 'pointer',
                        padding: '4px 0',
                      }}>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.name)}
                          onChange={() => toggleCategory(cat.name)}
                          style={{ accentColor: 'var(--color-primary)', width: 16, height: 16 }}
                        />
                        {cat.icon} {cat.name}
                        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--color-text-tertiary)' }}>({cat.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div style={{ marginBottom: 24 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12 }}>Difficulty</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {DIFFICULTY_OPTIONS.map(d => (
                      <label key={d} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        fontSize: 13, color: 'var(--color-text-secondary)', cursor: 'pointer',
                        padding: '4px 0',
                      }}>
                        <input
                          type="checkbox"
                          checked={selectedDifficulty.includes(d)}
                          onChange={() => toggleDifficulty(d)}
                          style={{ accentColor: 'var(--color-primary)', width: 16, height: 16 }}
                        />
                        {d}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12 }}>Rating</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {[4.5, 4.0, 3.5, 3.0].map(r => (
                      <label key={r} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        fontSize: 13, color: 'var(--color-text-secondary)', cursor: 'pointer',
                        padding: '4px 0',
                      }}>
                        <input type="radio" name="rating" style={{ accentColor: 'var(--color-primary)' }} />
                        <div style={{ display: 'flex', gap: 2 }}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={12} fill={i < Math.floor(r) ? 'var(--color-accent)' : 'var(--color-border)'} stroke={i < Math.floor(r) ? 'var(--color-accent)' : 'var(--color-border)'} />
                          ))}
                        </div>
                        {r}+
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Results Grid */}
          <div style={{ flex: 1 }}>
            {loading ? (
              <div style={{
                textAlign: 'center', padding: '80px 20px',
                color: 'var(--color-text-secondary)',
              }}>
                <Loader2 size={48} className="animate-spin" style={{ color: 'var(--color-primary)', marginBottom: 16 }} />
                <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--color-text)', marginBottom: 8 }}>Loading tours...</h3>
              </div>
            ) : fetchedTours.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '80px 20px',
                color: 'var(--color-text-secondary)',
              }}>
                <MapPin size={48} style={{ color: 'var(--color-text-tertiary)', marginBottom: 16 }} />
                <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--color-text)', marginBottom: 8 }}>No tours found</h3>
                <p style={{ fontSize: 14 }}>Try adjusting your search or filters to find what you're looking for.</p>
                <button onClick={() => { setSearchQuery(''); setSelectedCategories([]); setSelectedDifficulty([]); }} className="btn btn-primary" style={{ marginTop: 20 }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: viewMode === 'grid'
                    ? `repeat(auto-fill, minmax(${showFilters ? '280px' : '300px'}, 1fr))`
                    : '1fr',
                  gap: 24,
                  marginBottom: 32,
                }}>
                  {fetchedTours.map((tour, i) => (
                    <TourCard key={tour.id} tour={tour} index={i} />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                    <button 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="btn btn-secondary"
                    >
                      Previous
                    </button>
                    <span style={{ display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 14 }}>
                      Page {page} of {totalPages}
                    </span>
                    <button 
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="btn btn-secondary"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}

export default function ToursPage() {
  return (
    <Suspense fallback={
      <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="spinner"></div>
      </div>
    }>
      <ToursContent />
    </Suspense>
  );
}
