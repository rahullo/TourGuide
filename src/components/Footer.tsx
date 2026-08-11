'use client';

import Link from 'next/link';
import { MapPin, Mail, Phone, Globe, Camera, MessageCircle, Video, Share2, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-bg-secondary)',
      borderTop: '1px solid var(--color-border-light)',
      padding: '64px 0 0',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 800, fontSize: 16, fontFamily: "'Playfair Display', serif"
              }}>T</div>
              <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)' }}>
                Tour<span style={{ color: 'var(--color-primary-light)' }}>Guide</span>
              </span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
              Discover unforgettable experiences with verified local guides around the world. Book with confidence.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[Camera, MessageCircle, Video, Share2].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: 'var(--radius-full)',
                  background: 'var(--color-bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-text-secondary)', transition: 'all var(--transition-fast)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-bg-tertiary)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore</h4>
            {['All Tours', 'Adventure', 'Cultural', 'Food & Wine', 'Nature', 'City Tours'].map(item => (
              <Link key={item} href="/tours" style={{
                display: 'block', fontSize: 14, color: 'var(--color-text-secondary)',
                textDecoration: 'none', padding: '6px 0',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Destinations */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Top Destinations</h4>
            {['Rome, Italy', 'Tokyo, Japan', 'Paris, France', 'Bali, Indonesia', 'Barcelona, Spain', 'Kyoto, Japan', 'Cape Town, South Africa'].map(item => (
              <Link key={item} href="/tours" style={{
                display: 'block', fontSize: 14, color: 'var(--color-text-secondary)',
                textDecoration: 'none', padding: '6px 0',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Support */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Support</h4>
            {['Help Center', 'Contact Us', 'Cancellation Policy', 'Trust & Safety', 'Become a Guide', 'Affiliate Program'].map(item => (
              <Link key={item} href="#" style={{
                display: 'block', fontSize: 14, color: 'var(--color-text-secondary)',
                textDecoration: 'none', padding: '6px 0',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div style={{
          background: 'linear-gradient(135deg, var(--color-primary-900), var(--color-primary-700))',
          borderRadius: 'var(--radius-xl)',
          padding: '40px 32px',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24,
          marginBottom: 40,
        }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 4 }}>
              Get travel inspiration & deals
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
              Join 500,000+ travelers receiving our weekly newsletter
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flex: '1 1 320px', maxWidth: 420 }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{
                flex: 1, padding: '12px 16px', borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.1)', color: 'white',
                fontSize: 14, outline: 'none',
              }}
            />
            <button className="btn" style={{
              background: 'white', color: 'var(--color-primary-800)',
              fontWeight: 700, padding: '12px 24px',
            }}>
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--color-border-light)',
          padding: '20px 0',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, fontSize: 13, color: 'var(--color-text-tertiary)',
        }}>
          <span>© 2026 TourGuide. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Accessibility'].map(item => (
              <Link key={item} href="#" style={{ color: 'var(--color-text-tertiary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-tertiary)')}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
