'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/lib/theme';
import { useSession, signOut } from 'next-auth/react';
import {
  Search, Menu, X, Heart, User, Globe, Sun, Moon,
  MapPin, ChevronDown, Bell, ShoppingBag, LogOut, Compass, Settings
} from 'lucide-react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const userRole = (session?.user as { role?: string })?.role;

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Click-outside to close dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Should we show "List Your Tour"? Only for unauthenticated users or guides
  const showListTourButton = !session || userRole === 'guide' || userRole === 'admin';

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--header-height)',
          zIndex: 50,
          transition: 'all var(--transition-base)',
          background: scrolled ? 'var(--color-surface)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--color-border-light)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{
              width: 38, height: 38, borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 800, fontSize: 18, fontFamily: "'Playfair Display', serif"
            }}>T</div>
            <span style={{
              fontSize: 20, fontWeight: 700, color: scrolled ? 'var(--color-text)' : 'white',
              transition: 'color var(--transition-base)',
              letterSpacing: '-0.5px'
            }}>
              Tour<span style={{ color: 'var(--color-primary-light)' }}>Guide</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {[
              { label: 'Discover', href: '/tours' },
              { label: 'Destinations', href: '/tours?tab=destinations' },
              { label: 'Experiences', href: '/tours?tab=experiences' },
            ].map(item => (
              <Link key={item.label} href={item.href} style={{
                fontSize: 14, fontWeight: 500, textDecoration: 'none',
                color: scrolled ? 'var(--color-text-secondary)' : 'rgba(255,255,255,0.85)',
                transition: 'color var(--transition-fast)',
              }}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(true)}
              className="btn btn-icon"
              style={{
                background: scrolled ? 'var(--color-bg-tertiary)' : 'rgba(255,255,255,0.15)',
                color: scrolled ? 'var(--color-text)' : 'white',
                border: 'none',
              }}
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-icon hide-mobile"
              style={{
                background: scrolled ? 'var(--color-bg-tertiary)' : 'rgba(255,255,255,0.15)',
                color: scrolled ? 'var(--color-text)' : 'white',
                border: 'none',
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Wishlist - only show when logged in */}
            {session && (
              <Link href="/account/wishlist" className="btn btn-icon hide-mobile" style={{
                background: scrolled ? 'var(--color-bg-tertiary)' : 'rgba(255,255,255,0.15)',
                color: scrolled ? 'var(--color-text)' : 'white',
                border: 'none', textDecoration: 'none',
              }}>
                <Heart size={18} />
              </Link>
            )}

            {/* User Menu */}
            {status === 'loading' ? (
              <div style={{ width: 80, height: 36, background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)' }} className="hide-mobile animate-pulse-soft" />
            ) : session ? (
              <div ref={dropdownRef} style={{ position: 'relative' }} className="hide-mobile">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="btn btn-secondary" style={{
                  background: scrolled ? 'var(--color-surface)' : 'rgba(255,255,255,0.15)',
                  color: scrolled ? 'var(--color-text)' : 'white',
                  borderColor: scrolled ? 'var(--color-border)' : 'rgba(255,255,255,0.3)',
                  fontSize: 13, padding: '6px 12px', gap: 8,
                }}>
                  <img src={session.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || 'U')}&background=0f766e&color=fff&size=48`} alt="Profile" style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }} />
                  <span>{session.user?.name?.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </button>
                {dropdownOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                    background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)',
                    minWidth: 220, padding: 8, display: 'flex', flexDirection: 'column',
                  }}>
                    <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--color-border-light)', marginBottom: 8 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>{session.user?.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{session.user?.email}</div>
                      <div style={{
                        marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 4,
                        fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                        padding: '2px 8px', borderRadius: 'var(--radius-full)',
                        background: userRole === 'guide' ? 'var(--color-primary-50)' : 'var(--color-bg-tertiary)',
                        color: userRole === 'guide' ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                        letterSpacing: '0.05em',
                      }}>
                        {userRole === 'guide' ? <Compass size={10} /> : <User size={10} />}
                        {userRole === 'guide' ? 'Tour Guide' : 'Traveler'}
                      </div>
                    </div>
                    <Link href="/account" className="btn btn-ghost" style={{ justifyContent: 'flex-start', padding: '8px 14px' }} onClick={() => setDropdownOpen(false)}>
                      <User size={16} /> My Account
                    </Link>
                    <Link href="/account/bookings" className="btn btn-ghost" style={{ justifyContent: 'flex-start', padding: '8px 14px' }} onClick={() => setDropdownOpen(false)}>
                      <ShoppingBag size={16} /> Bookings
                    </Link>
                    {userRole === 'guide' && (
                      <Link href="/operator" className="btn btn-ghost" style={{ justifyContent: 'flex-start', padding: '8px 14px' }} onClick={() => setDropdownOpen(false)}>
                        <Compass size={16} /> Guide Dashboard
                      </Link>
                    )}
                    <Link href="/account/settings" className="btn btn-ghost" style={{ justifyContent: 'flex-start', padding: '8px 14px' }} onClick={() => setDropdownOpen(false)}>
                      <Settings size={16} /> Settings
                    </Link>
                    <div style={{ height: 1, background: 'var(--color-border-light)', margin: '4px 0' }} />
                    <button onClick={() => { setDropdownOpen(false); signOut(); }} className="btn btn-ghost" style={{ justifyContent: 'flex-start', padding: '8px 14px', color: 'var(--color-error)' }}>
                      <LogOut size={16} /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hide-mobile" style={{ display: 'flex', gap: 8 }}>
                <Link href="/login" className="btn btn-ghost" style={{
                  color: scrolled ? 'var(--color-text)' : 'white',
                  fontSize: 13, padding: '8px 16px', textDecoration: 'none',
                }}>
                  Log in
                </Link>
                <Link href="/register" className="btn btn-secondary" style={{
                  background: scrolled ? 'var(--color-surface)' : 'rgba(255,255,255,0.15)',
                  color: scrolled ? 'var(--color-text)' : 'white',
                  borderColor: scrolled ? 'var(--color-border)' : 'rgba(255,255,255,0.3)',
                  fontSize: 13, padding: '8px 16px', textDecoration: 'none',
                }}>
                  Sign up
                </Link>
              </div>
            )}

            {/* Become a Guide CTA — only for non-tourist users */}
            {showListTourButton && (
              <Link href={session ? '/operator' : '/login?callbackUrl=/operator'} className="btn btn-primary hide-mobile" style={{
                fontSize: 13, padding: '8px 16px', textDecoration: 'none',
              }}>
                List Your Tour
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-icon hide-desktop"
              style={{
                background: scrolled ? 'var(--color-bg-tertiary)' : 'rgba(255,255,255,0.15)',
                color: scrolled ? 'var(--color-text)' : 'white',
                border: 'none',
              }}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div className="overlay" onClick={() => setMobileMenuOpen(false)} />
          <div style={{
            position: 'fixed', top: 0, right: 0, bottom: 0, width: '85%', maxWidth: 360,
            background: 'var(--color-surface)', zIndex: 51,
            padding: '80px 24px 24px', overflowY: 'auto',
            animation: 'slideInRight 0.3s ease-out',
          }}>
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: 'absolute', top: 20, right: 20,
                background: 'none', border: 'none', color: 'var(--color-text)',
                cursor: 'pointer',
              }}
            >
              <X size={24} />
            </button>

            {/* Mobile User Info */}
            {session && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '0 16px 20px',
                borderBottom: '1px solid var(--color-border-light)',
                marginBottom: 16,
              }}>
                <img
                  src={session.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || 'U')}&background=0f766e&color=fff&size=48`}
                  alt="Profile"
                  style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text)' }}>{session.user?.name}</div>
                  <div style={{
                    fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                    color: userRole === 'guide' ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                  }}>
                    {userRole === 'guide' ? '🧭 Tour Guide' : '✈️ Traveler'}
                  </div>
                </div>
              </div>
            )}

            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                { label: 'Discover Tours', href: '/tours', icon: <Search size={20} /> },
                { label: 'Destinations', href: '/tours?tab=destinations', icon: <MapPin size={20} /> },
                { label: 'My Account', href: '/account', icon: <User size={20} /> },
                { label: 'My Bookings', href: '/account/bookings', icon: <ShoppingBag size={20} /> },
                { label: 'Wishlist', href: '/account/wishlist', icon: <Heart size={20} /> },
                { label: 'Notifications', href: '/account', icon: <Bell size={20} /> },
              ].map(item => (
                <Link key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 16px', borderRadius: 'var(--radius-md)',
                  color: 'var(--color-text)', textDecoration: 'none', fontSize: 15, fontWeight: 500,
                  transition: 'background var(--transition-fast)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-bg-tertiary)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>

            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button onClick={toggleTheme} className="btn btn-secondary" style={{ justifyContent: 'center' }}>
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              {showListTourButton && (
                <Link href={session ? '/operator' : '/login?callbackUrl=/operator'} className="btn btn-primary" style={{ textDecoration: 'none', justifyContent: 'center' }}>
                  List Your Tour
                </Link>
              )}
              {session && (
                <button onClick={() => { setMobileMenuOpen(false); signOut(); }} className="btn btn-ghost" style={{ justifyContent: 'center', color: 'var(--color-error)' }}>
                  <LogOut size={16} /> Log Out
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <>
          <div className="overlay" onClick={() => setSearchOpen(false)} />
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0,
            background: 'var(--color-surface)',
            zIndex: 51, padding: '24px',
            animation: 'fadeInDown 0.3s ease-out',
            boxShadow: 'var(--shadow-xl)',
          }}>
            <div className="container" style={{ maxWidth: 720 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{
                  flex: 1, display: 'flex', alignItems: 'center', gap: 12,
                  background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-lg)',
                  padding: '12px 16px',
                }}>
                  <Search size={20} style={{ color: 'var(--color-text-tertiary)' }} />
                  <input
                    autoFocus
                    placeholder="Search tours, destinations, experiences..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        router.push(`/tours?q=${encodeURIComponent(searchQuery.trim())}`);
                        setSearchOpen(false);
                        setSearchQuery('');
                      }
                    }}
                    style={{
                      flex: 1, border: 'none', background: 'transparent',
                      fontSize: 16, color: 'var(--color-text)', outline: 'none',
                    }}
                  />
                </div>
                <button onClick={() => setSearchOpen(false)} className="btn btn-ghost" style={{ fontSize: 14 }}>
                  Cancel
                </button>
              </div>
              <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Rome', 'Tokyo', 'Paris', 'Bali', 'Barcelona', 'India', 'Switzerland'].map(q => (
                  <Link key={q} href={`/tours?q=${q}`} onClick={() => setSearchOpen(false)} style={{
                    padding: '6px 14px', borderRadius: 'var(--radius-full)',
                    background: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)',
                    fontSize: 13, textDecoration: 'none', fontWeight: 500,
                    transition: 'all var(--transition-fast)',
                  }}>
                    {q}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
