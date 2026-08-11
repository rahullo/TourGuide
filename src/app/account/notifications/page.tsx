'use client';

import { useState } from 'react';
import {
  Bell, Check, CheckCheck, Tag, Calendar, Star, Shield, Megaphone,
  Trash2, Settings, Mail, Smartphone
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'booking' | 'promo' | 'review' | 'system' | 'wishlist';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: 'n1', type: 'booking', title: 'Booking Confirmed!', message: 'Your booking for "Ancient Rome: Colosseum, Forum & Palatine Hill" on Aug 15 has been confirmed. Check your email for the voucher.', time: '2 hours ago', read: false },
  { id: 'n2', type: 'wishlist', title: 'Price Drop Alert 🔥', message: 'Santorini Sunset Catamaran Cruise dropped from $185 to $145. Book now before the deal expires!', time: '5 hours ago', read: false },
  { id: 'n3', type: 'promo', title: 'Summer Special: 20% Off', message: 'Use code SUMMER20 for 20% off all tours booked before August 31. Don\'t miss out!', time: '1 day ago', read: false },
  { id: 'n4', type: 'review', title: 'Leave a Review', message: 'How was your Tokyo Street Food tour? Share your experience and help other travelers decide.', time: '3 days ago', read: true },
  { id: 'n5', type: 'system', title: 'Account Security', message: 'A new login was detected from Windows device. If this wasn\'t you, please change your password immediately.', time: '5 days ago', read: true },
  { id: 'n6', type: 'booking', title: 'Booking Reminder', message: 'Your Paris Wine & Cheese Masterclass is in 10 days. Don\'t forget to check the meeting point details!', time: '1 week ago', read: true },
];

const typeConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  booking: { icon: <Calendar size={18} />, color: '#14b8a6', bg: '#14b8a610' },
  promo: { icon: <Tag size={18} />, color: '#f59e0b', bg: '#f59e0b10' },
  review: { icon: <Star size={18} />, color: '#8b5cf6', bg: '#8b5cf610' },
  system: { icon: <Shield size={18} />, color: '#ef4444', bg: '#ef444410' },
  wishlist: { icon: <Megaphone size={18} />, color: '#ec4899', bg: '#ec489910' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [promoNotifs, setPromoNotifs] = useState(true);
  const [showPrefs, setShowPrefs] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text)' }}>
            Notifications
            {unreadCount > 0 && (
              <span style={{
                marginLeft: 10, fontSize: 12, fontWeight: 700,
                padding: '3px 10px', borderRadius: 'var(--radius-full)',
                background: 'var(--color-error)', color: 'white',
                verticalAlign: 'middle',
              }}>
                {unreadCount} new
              </span>
            )}
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setShowPrefs(!showPrefs)}
            className="btn btn-ghost"
            style={{ fontSize: 12, padding: '6px 12px' }}
          >
            <Settings size={14} /> Preferences
          </button>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="btn btn-ghost" style={{ fontSize: 12, padding: '6px 12px' }}>
              <CheckCheck size={14} /> Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* Notification Preferences */}
      {showPrefs && (
        <div className="card" style={{ padding: 20, marginBottom: 24, border: '2px solid var(--color-primary-100)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: 'var(--color-text)' }}>
            Notification Preferences
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Email Notifications', desc: 'Receive booking confirmations and updates via email', icon: <Mail size={18} />, checked: emailNotifs, onChange: () => setEmailNotifs(!emailNotifs) },
              { label: 'Push Notifications', desc: 'Get instant alerts on your browser', icon: <Smartphone size={18} />, checked: pushNotifs, onChange: () => setPushNotifs(!pushNotifs) },
              { label: 'Promotional Emails', desc: 'Deals, discounts, and travel inspiration', icon: <Tag size={18} />, checked: promoNotifs, onChange: () => setPromoNotifs(!promoNotifs) },
            ].map(pref => (
              <div key={pref.label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg-tertiary)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: 'var(--color-primary)' }}>{pref.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>{pref.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{pref.desc}</div>
                  </div>
                </div>
                <button
                  onClick={pref.onChange}
                  style={{
                    width: 48, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
                    background: pref.checked ? 'var(--color-primary)' : 'var(--color-border)',
                    position: 'relative', transition: 'background 0.2s',
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', background: 'white',
                    position: 'absolute', top: 3,
                    left: pref.checked ? 25 : 3,
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['all', 'unread'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className="btn"
            style={{
              padding: '8px 18px', fontSize: 13, fontWeight: 600,
              background: filter === tab ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
              color: filter === tab ? 'white' : 'var(--color-text-secondary)',
              border: 'none', borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
            }}
          >
            {tab === 'all' ? 'All' : `Unread (${unreadCount})`}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filteredNotifications.map(notif => {
          const config = typeConfig[notif.type];
          return (
            <div
              key={notif.id}
              className="card"
              style={{
                padding: '16px 20px',
                display: 'flex', alignItems: 'flex-start', gap: 14,
                borderLeft: notif.read ? 'none' : `4px solid ${config.color}`,
                background: notif.read ? 'var(--color-surface)' : `${config.bg}`,
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 'var(--radius-md)',
                background: config.bg, color: config.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {config.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: notif.read ? 500 : 700, color: 'var(--color-text)' }}>
                    {notif.title}
                  </span>
                  {!notif.read && (
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: config.color, flexShrink: 0 }} />
                  )}
                </div>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 6 }}>
                  {notif.message}
                </p>
                <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{notif.time}</span>
              </div>
              <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="btn btn-ghost"
                    style={{ padding: '4px 8px', fontSize: 11 }}
                    title="Mark as read"
                  >
                    <Check size={14} />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="btn btn-ghost"
                  style={{ padding: '4px 8px', color: 'var(--color-text-tertiary)' }}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '60px 40px' }}>
          <Bell size={40} style={{ color: 'var(--color-text-tertiary)', marginBottom: 16 }} />
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            {filter === 'unread' ? 'All Caught Up!' : 'No Notifications'}
          </h3>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
            {filter === 'unread'
              ? 'You\'ve read all your notifications. Check back later!'
              : 'You don\'t have any notifications yet. They\'ll appear here when you do.'}
          </p>
        </div>
      )}
    </div>
  );
}
