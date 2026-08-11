'use client';

import Link from 'next/link';
import { ShoppingBag, Heart, MapPin, Calendar, CreditCard, ChevronRight } from 'lucide-react';
import { mockBookings } from '@/lib/data';

export default function AccountDashboard() {
  const upcomingBookings = mockBookings.filter(b => b.status === 'confirmed');
  
  return (
    <div className="animate-fade-in">
      <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)', marginBottom: 24 }}>Welcome back, Jane!</h2>
      
      {/* Quick Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
        {[
          { label: 'Upcoming Tours', value: upcomingBookings.length, icon: <Calendar size={24} />, color: 'var(--color-primary)' },
          { label: 'Past Trips', value: '2', icon: <MapPin size={24} />, color: 'var(--color-info)' },
          { label: 'Saved Items', value: '14', icon: <Heart size={24} />, color: 'var(--color-error)' },
        ].map((stat, i) => (
          <div key={i} className="card card-elevated" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 'var(--radius-full)',
              background: `color-mix(in srgb, ${stat.color} 15%, transparent)`,
              color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text)', lineHeight: 1.2 }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Bookings */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)' }}>Upcoming Bookings</h3>
        <Link href="/account/bookings" style={{ fontSize: 14, color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
          View all
        </Link>
      </div>

      {upcomingBookings.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {upcomingBookings.map(booking => (
            <div key={booking.id} className="card card-elevated" style={{ display: 'flex', gap: 20, padding: 16 }}>
              <img src={booking.tourImage} alt={booking.tourTitle} style={{ width: 120, height: 120, borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '4px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text)', marginBottom: 8, maxWidth: '80%' }}>{booking.tourTitle}</h4>
                  <span className="badge badge-primary">Confirmed</span>
                </div>
                <div style={{ display: 'flex', gap: 24, fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 'auto' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={14} /> {booking.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={14} /> {booking.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--color-border-light)', paddingTop: 12, marginTop: 12 }}>
                  <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>Booking ID: {booking.id}</span>
                  <Link href={`/account/bookings`} className="btn btn-secondary btn-sm">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: 40, textAlign: 'center' }}>
          <ShoppingBag size={48} style={{ color: 'var(--color-text-tertiary)', margin: '0 auto 16px' }} />
          <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text)', marginBottom: 8 }}>No upcoming trips</h4>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 24 }}>Time to plan your next adventure!</p>
          <Link href="/tours" className="btn btn-primary">Explore Tours</Link>
        </div>
      )}
    </div>
  );
}
