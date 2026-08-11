'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, DollarSign, Download, MessageCircle, XCircle } from 'lucide-react';
import { mockBookings, Booking } from '@/lib/data';

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');

  const filteredBookings = mockBookings.filter(b => {
    if (activeTab === 'upcoming') return b.status === 'confirmed' || b.status === 'pending';
    if (activeTab === 'past') return b.status === 'completed';
    if (activeTab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  const getStatusBadge = (status: Booking['status']) => {
    switch(status) {
      case 'confirmed': return <span className="badge badge-success">Confirmed</span>;
      case 'pending': return <span className="badge badge-accent">Pending</span>;
      case 'completed': return <span className="badge badge-primary">Completed</span>;
      case 'cancelled': return <span className="badge badge-error">Cancelled</span>;
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)', marginBottom: 24 }}>My Bookings</h2>

      {/* Tabs */}
      <div className="tab-nav" style={{ marginBottom: 24 }}>
        {[
          { id: 'upcoming', label: 'Upcoming' },
          { id: 'past', label: 'Past Trips' },
          { id: 'cancelled', label: 'Cancelled' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Booking List */}
      {filteredBookings.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {filteredBookings.map(booking => (
            <div key={booking.id} className="card card-elevated" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)' }}>Booking ID: {booking.id}</span>
                {getStatusBadge(booking.status)}
              </div>
              
              <div style={{ padding: 20, display: 'flex', gap: 24 }}>
                <img src={booking.tourImage} alt={booking.tourTitle} style={{ width: 140, height: 140, borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12 }}>{booking.tourTitle}</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--color-text-secondary)' }}>
                      <Calendar size={16} style={{ color: 'var(--color-text-tertiary)' }} /> {booking.date} at {booking.time}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--color-text-secondary)' }}>
                      <Users size={16} style={{ color: 'var(--color-text-tertiary)' }} /> {booking.guests} Guests
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--color-text-secondary)' }}>
                      <MapPin size={16} style={{ color: 'var(--color-text-tertiary)' }} /> View Meeting Point
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--color-text-secondary)' }}>
                      <DollarSign size={16} style={{ color: 'var(--color-text-tertiary)' }} /> {booking.currency} {booking.total} Total
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {(booking.status === 'confirmed' || booking.status === 'completed') && (
                      <button className="btn btn-primary btn-sm">
                        <Download size={14} /> Download Voucher
                      </button>
                    )}
                    {(booking.status === 'confirmed' || booking.status === 'pending') && (
                      <>
                        <button className="btn btn-secondary btn-sm">
                          <MessageCircle size={14} /> Contact Guide
                        </button>
                        <button className="btn btn-secondary btn-sm" style={{ color: 'var(--color-error)' }}>
                          <XCircle size={14} /> Cancel Booking
                        </button>
                      </>
                    )}
                    {booking.status === 'completed' && (
                      <button className="btn btn-secondary btn-sm" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
                        Leave a Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <p style={{ fontSize: 15, color: 'var(--color-text-secondary)' }}>You don't have any {activeTab} bookings.</p>
        </div>
      )}
    </div>
  );
}
