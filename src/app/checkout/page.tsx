'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CreditCard, ShieldCheck, CheckCircle2, ChevronRight,
  User, Mail, Phone, Calendar, Clock, MapPin, Users
} from 'lucide-react';
import { getTourBySlug } from '@/lib/data';
import { useCurrency } from '@/lib/CurrencyContext';

function CheckoutContent() {
  const router = useRouter();
  const { formatPrice, currency } = useCurrency();
  const searchParams = useSearchParams();
  const slug = searchParams.get('tour');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const guests = parseInt(searchParams.get('guests') || '1', 10);

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tourData, setTourData] = useState(() => slug ? getTourBySlug(slug) : null);

  useEffect(() => {
    setMounted(true);
    if (slug && !tourData) {
      fetch(`/api/tours/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data?.tour) setTourData(data.tour);
        })
        .catch(console.error);
    }
  }, [slug, tourData]);

  const tour = tourData;

  if (!mounted) return null; // Prevent hydration errors with searchParams

  if (!tour) {
    return (
      <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Invalid Booking</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 24 }}>Tour details are missing or invalid.</p>
          <Link href="/tours" className="btn btn-primary">Browse Tours</Link>
        </div>
      </div>
    );
  }

  const subtotal = tour.price * guests;
  const discount = tour.originalPrice ? (tour.originalPrice - tour.price) * guests : 0;
  const serviceFee = Math.round(subtotal * 0.08);
  const total = subtotal + serviceFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/account/bookings?new=true');
      }, 2000);
    }, 2000);
  };

  if (success) {
    return (
      <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', background: 'var(--color-bg-secondary)' }}>
        <div className="card animate-scale-in" style={{ padding: '60px 40px', textAlign: 'center', maxWidth: 480, width: '100%' }}>
          <div style={{
            width: 80, height: 80, borderRadius: 'var(--radius-full)', background: 'var(--color-success)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', boxShadow: '0 0 0 10px rgba(34, 197, 94, 0.2)',
          }}>
            <CheckCircle2 size={40} />
          </div>
          <h1 className="font-display" style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12 }}>Payment Successful!</h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', marginBottom: 32, lineHeight: 1.6 }}>
            Your booking for <strong>{tour.title}</strong> has been confirmed. A receipt and tickets have been sent to your email.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <span className="animate-pulse-soft" style={{ fontSize: 14, color: 'var(--color-primary)', fontWeight: 600 }}>Redirecting to your bookings...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content" style={{ background: 'var(--color-bg-secondary)' }}>
      {/* Header */}
      <div style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container" style={{ padding: '24px 20px' }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)' }}>Complete Your Booking</h1>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px 80px' }}>
        <form onSubmit={handleCheckout} style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 40, alignItems: 'flex-start' }}>
          {/* LEFT: Forms */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            
            {/* 1. Contact Details */}
            <div className="card card-elevated" style={{ padding: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 28, height: 28, borderRadius: 'var(--radius-full)', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>1</span>
                Contact Details
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6, display: 'block' }}>First Name</label>
                  <input type="text" required className="input" placeholder="Jane" />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6, display: 'block' }}>Last Name</label>
                  <input type="text" required className="input" placeholder="Doe" />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6, display: 'block' }}>Email Address</label>
                  <input type="email" required className="input" placeholder="name@example.com" />
                  <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 4 }}>We'll send your booking confirmation here.</p>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6, display: 'block' }}>Phone Number</label>
                  <input type="tel" required className="input" placeholder="+1 (555) 000-0000" />
                  <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 4 }}>So the guide can contact you if needed.</p>
                </div>
              </div>
            </div>

            {/* 2. Payment */}
            <div className="card card-elevated" style={{ padding: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 28, height: 28, borderRadius: 'var(--radius-full)', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>2</span>
                Payment Method
              </h2>
              
              <div style={{
                border: '1px solid var(--color-primary)', borderRadius: 'var(--radius-lg)',
                background: 'var(--color-primary-50)', padding: 20, marginBottom: 24,
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginBottom: 20 }}>
                  <input type="radio" name="payment" defaultChecked style={{ accentColor: 'var(--color-primary)', width: 18, height: 18 }} />
                  <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--color-primary-900)' }}>Credit / Debit Card</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                    <div style={{ width: 36, height: 24, background: 'white', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)', fontSize: 10, fontWeight: 700, color: '#1a1f36' }}>VISA</div>
                    <div style={{ width: 36, height: 24, background: 'white', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)', fontSize: 10, fontWeight: 700, color: '#eb001b' }}>MC</div>
                  </div>
                </label>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-primary-800)', marginBottom: 6, display: 'block' }}>Card Number</label>
                    <div style={{ position: 'relative' }}>
                      <CreditCard size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-primary-600)' }} />
                      <input type="text" required placeholder="0000 0000 0000 0000" className="input" style={{ paddingLeft: 40, background: 'white', borderColor: 'var(--color-primary-200)' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-primary-800)', marginBottom: 6, display: 'block' }}>Expiration Date</label>
                    <input type="text" required placeholder="MM/YY" className="input" style={{ background: 'white', borderColor: 'var(--color-primary-200)' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-primary-800)', marginBottom: 6, display: 'block' }}>CVC</label>
                    <input type="text" required placeholder="123" className="input" style={{ background: 'white', borderColor: 'var(--color-primary-200)' }} />
                  </div>
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '16px 20px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
                <input type="radio" name="payment" style={{ accentColor: 'var(--color-primary)', width: 18, height: 18 }} />
                <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--color-text)' }}>PayPal</span>
                <div style={{ marginLeft: 'auto', fontWeight: 700, color: '#00457C', fontStyle: 'italic' }}>PayPal</div>
              </label>

            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div style={{ position: 'sticky', top: 'calc(var(--header-height) + 40px)' }}>
            <div className="card card-elevated" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', marginBottom: 20 }}>Order Summary</h3>
              
              <div style={{ display: 'flex', gap: 16, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--color-border-light)' }}>
                <img src={tour.images[0]} alt={tour.title} style={{ width: 80, height: 80, borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text)', marginBottom: 4, lineHeight: 1.3 }}>{tour.title}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                    <MapPin size={12} /> {tour.location}, {tour.country}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--color-border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--color-text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Calendar size={16} style={{ color: 'var(--color-text-tertiary)' }}/> Date</span>
                  <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>{date ? new Date(date).toLocaleDateString() : 'Not selected'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--color-text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Clock size={16} style={{ color: 'var(--color-text-tertiary)' }}/> Time</span>
                  <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>{time || 'Not selected'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--color-text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Users size={16} style={{ color: 'var(--color-text-tertiary)' }}/> Guests</span>
                  <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>{guests} {guests === 1 ? 'person' : 'people'}</span>
                </div>
              </div>

              <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', marginBottom: 16 }}>Price Details</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--color-text-secondary)' }}>
                  <span>{formatPrice(tour.price)} × {guests} {guests === 1 ? 'guest' : 'guests'}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--color-text-secondary)' }}>
                  <span>Service fee</span>
                  <span>{formatPrice(serviceFee)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--color-success)' }}>
                    <span>Discount applied</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 20, borderTop: '2px solid var(--color-border)', marginBottom: 24 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)' }}>Total ({currency})</span>
                <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-primary)' }}>{formatPrice(total)}</span>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? 'Processing Payment...' : 'Confirm & Pay'}
              </button>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 16, fontSize: 11, color: 'var(--color-text-tertiary)', lineHeight: 1.5 }}>
                <ShieldCheck size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                <span>By confirming this booking, you agree to the Terms of Service and Cancellation Policy. Secure SSL encrypted payment.</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="spinner"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
