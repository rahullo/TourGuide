'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Map, Calendar as CalendarIcon, Users,
  PieChart, Settings, LogOut, ChevronRight, Bell, Plus,
  Menu, X
} from 'lucide-react';
import { useState } from 'react';

export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', href: '/operator', icon: <LayoutDashboard size={18} />, exact: true },
    { label: 'My Tours', href: '/operator/tours', icon: <Map size={18} /> },
    { label: 'Calendar', href: '/operator/calendar', icon: <CalendarIcon size={18} /> },
    { label: 'Bookings', href: '/operator/bookings', icon: <Users size={18} /> },
    { label: 'Analytics', href: '/operator/analytics', icon: <PieChart size={18} /> },
    { label: 'Settings', href: '/operator/settings', icon: <Settings size={18} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg-secondary)' }}>
      
      {/* Sidebar (Desktop) */}
      <aside className="hide-mobile" style={{
        width: 260, background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)',
        display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, left: 0,
        zIndex: 40
      }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--color-border-light)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16 }}>T</div>
          <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)' }}>Operator</span>
        </div>

        <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
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
                }}
              >
                <span style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-text-tertiary)' }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '20px 16px', borderTop: '1px solid var(--color-border-light)' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '260px' }} className="operator-main">
        <header style={{
          height: 72, background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 24px',
          position: 'sticky', top: 0, zIndex: 30,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/operator/tours/new" className="btn btn-primary btn-sm">
              <Plus size={16} /> Create Tour
            </Link>
            <button className="btn btn-icon btn-ghost"><Bell size={18} /></button>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--color-primary-100)', color: 'var(--color-primary-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>JD</div>
          </div>
        </header>
        
        <main style={{ padding: '32px 24px', maxWidth: 1200, margin: '0 auto' }}>
          {children}
        </main>
      </div>
      
      {/* Quick fix for mobile spacing */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .operator-main { margin-left: 0 !important; }
        }
      `}} />
    </div>
  );
}
