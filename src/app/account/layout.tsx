'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  User, ShoppingBag, Heart, Settings, LogOut,
  ChevronRight, LayoutDashboard, Bell, CreditCard
} from 'lucide-react';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userName = session?.user?.name || 'User';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const navItems = [
    { label: 'Dashboard', href: '/account', icon: <LayoutDashboard size={18} />, exact: true },
    { label: 'My Bookings', href: '/account/bookings', icon: <ShoppingBag size={18} /> },
    { label: 'Wishlist', href: '/account/wishlist', icon: <Heart size={18} /> },
    { label: 'Payment Methods', href: '/account/payments', icon: <CreditCard size={18} /> },
    { label: 'Notifications', href: '/account/notifications', icon: <Bell size={18} /> },
    { label: 'Settings', href: '/account/settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="page-content" style={{ background: 'var(--color-bg-secondary)' }}>
      {/* Header */}
      <div style={{ background: 'var(--color-primary-900)', color: 'white', padding: '40px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{
            width: 80, height: 80, borderRadius: 'var(--radius-full)',
            background: 'var(--color-primary-100)', color: 'var(--color-primary-800)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 700, border: '4px solid rgba(255,255,255,0.2)',
            overflow: 'hidden',
          }}>
            {session?.user?.image ? (
              <img src={session.user.image} alt={userName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              userInitials
            )}
          </div>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{userName}</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{session?.user?.email || 'Member since 2026'}</p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 40, alignItems: 'flex-start' }}>
          
          {/* Sidebar Navigation */}
          <aside className="card" style={{ padding: '16px 12px' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navItems.map(item => {
                const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                      borderRadius: 'var(--radius-md)', textDecoration: 'none',
                      fontSize: 14, fontWeight: 500,
                      background: isActive ? 'var(--color-primary-50)' : 'transparent',
                      color: isActive ? 'var(--color-primary-800)' : 'var(--color-text-secondary)',
                      transition: 'all var(--transition-fast)',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'var(--color-bg-tertiary)';
                        e.currentTarget.style.color = 'var(--color-text)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                      }
                    }}
                  >
                    <span style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-text-tertiary)' }}>
                      {item.icon}
                    </span>
                    {item.label}
                    {isActive && <ChevronRight size={16} style={{ marginLeft: 'auto', color: 'var(--color-primary)' }} />}
                  </Link>
                );
              })}

              <div style={{ height: 1, background: 'var(--color-border-light)', margin: '12px 16px' }} />

              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                  borderRadius: 'var(--radius-md)', textDecoration: 'none',
                  fontSize: 14, fontWeight: 500, background: 'transparent', border: 'none', cursor: 'pointer',
                  color: 'var(--color-error)', width: '100%', textAlign: 'left',
                }}
              >
                <LogOut size={18} /> Log Out
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
