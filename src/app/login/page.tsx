'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock, Mail, ChevronRight, Eye, EyeOff,
  ShieldCheck
} from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Logo from '@/components/Logo';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/account';
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (res?.error) {
      setError(res.error === 'CredentialsSignin' ? 'Invalid email or password.' : res.error);
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="page-content" style={{ display: 'flex', background: 'var(--color-bg-secondary)' }}>
      {/* Left Image (Desktop only) */}
      <div className="hide-mobile" style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=1600&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 0%, rgba(15,118,110,0.8) 100%)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 60,
        }}>
          <h2 className="font-display" style={{ fontSize: 40, fontWeight: 700, color: 'white', marginBottom: 16 }}>
            Welcome back to your next adventure.
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', maxWidth: 400 }}>
            Log in to manage your bookings, save your favorite tours, and connect with expert guides.
          </p>
        </div>
      </div>

      {/* Right Form */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(32px, 8vw, 80px)', maxWidth: 640,
        background: 'var(--color-surface)',
      }}>
        <div style={{ width: '100%', maxWidth: 420, margin: '0 auto' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 28 }}>
            <Logo size={36} variant="dark" />
            <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.5px' }}>
              Tour<span style={{ color: 'var(--color-primary)' }}>Guide</span>
            </span>
          </Link>

          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>Log in</h1>
          <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', marginBottom: 32 }}>
            Don&apos;t have an account? <Link href="/register" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
          </p>

          {error && (
            <div style={{
              padding: '12px 16px', borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#ef4444', fontSize: 13, marginBottom: 20,
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6, display: 'block' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
                <input
                  type="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="input" style={{ paddingLeft: 42 }}
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>Password</label>
                <Link href="#" style={{ fontSize: 12, color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
                <input
                  type={showPassword ? 'text' : 'password'} required
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="input" style={{ paddingLeft: 42, paddingRight: 42 }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-text-tertiary)', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}>
              {loading ? (
                <span className="animate-pulse-soft">Logging in...</span>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '32px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
            <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)', fontWeight: 500, textTransform: 'uppercase' }}>Or continue with</span>
            <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button type="button" onClick={() => signIn('google', { callbackUrl })} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 15 }}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 20, height: 20 }} />
              Log in with Google
            </button>
            <button type="button" onClick={() => signIn('apple', { callbackUrl })} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 15 }}>
              <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" style={{ width: 20, height: 20 }} />
              Log in with Apple
            </button>
          </div>

          <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--color-text-tertiary)', justifyContent: 'center' }}>
            <ShieldCheck size={16} style={{ color: 'var(--color-success)' }} />
            We protect your personal information
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="page-content" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
