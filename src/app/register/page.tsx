'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Lock, Mail, User, Eye, EyeOff, ShieldCheck, Compass, Plane
} from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/account';
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'tourist' | 'guide'>('tourist');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Step 1: Register user in MongoDB
      const registerRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          password,
          role,
        }),
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        setError(registerData.error || 'Registration failed.');
        setLoading(false);
        return;
      }

      // Step 2: Automatically sign in after successful registration
      const signInRes = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: role === 'guide' ? '/operator' : callbackUrl,
      });

      if (signInRes?.error) {
        setError('Account created but login failed. Please try logging in manually.');
        setLoading(false);
      } else {
        router.push(role === 'guide' ? '/operator' : callbackUrl);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="page-content" style={{ display: 'flex', background: 'var(--color-bg-secondary)' }}>
      {/* Right Form */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(32px, 8vw, 80px)', maxWidth: 640,
        background: 'var(--color-surface)',
        order: 2,
      }}>
        <div style={{ width: '100%', maxWidth: 420, margin: '0 auto' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>Create an account</h1>
          <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', marginBottom: 24 }}>
            Already have an account? <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
          </p>

          {/* Role Selector */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', marginBottom: 10, display: 'block' }}>I want to...</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <button
                type="button"
                onClick={() => setRole('tourist')}
                style={{
                  padding: '16px 14px', borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${role === 'tourist' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  background: role === 'tourist' ? 'var(--color-primary-50)' : 'var(--color-surface)',
                  cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                }}
              >
                <Plane size={24} style={{ color: role === 'tourist' ? 'var(--color-primary)' : 'var(--color-text-tertiary)', marginBottom: 6 }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: role === 'tourist' ? 'var(--color-primary)' : 'var(--color-text)' }}>Explore Tours</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 2 }}>As a traveler</div>
              </button>
              <button
                type="button"
                onClick={() => setRole('guide')}
                style={{
                  padding: '16px 14px', borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${role === 'guide' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  background: role === 'guide' ? 'var(--color-primary-50)' : 'var(--color-surface)',
                  cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                }}
              >
                <Compass size={24} style={{ color: role === 'guide' ? 'var(--color-primary)' : 'var(--color-text-tertiary)', marginBottom: 6 }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: role === 'guide' ? 'var(--color-primary)' : 'var(--color-text)' }}>List My Tours</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 2 }}>As a tour guide</div>
              </button>
            </div>
          </div>

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
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6, display: 'block' }}>First Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
                  <input
                    type="text" required
                    value={firstName} onChange={e => setFirstName(e.target.value)}
                    className="input" style={{ paddingLeft: 42 }}
                    placeholder="Rahul"
                  />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6, display: 'block' }}>Last Name</label>
                <input
                  type="text" required
                  value={lastName} onChange={e => setLastName(e.target.value)}
                  className="input"
                  placeholder="Lohra"
                />
              </div>
            </div>

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
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6, display: 'block' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
                <input
                  type={showPassword ? 'text' : 'password'} required
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="input" style={{ paddingLeft: 42, paddingRight: 42 }}
                  placeholder="••••••••"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-text-tertiary)', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 6 }}>Must be at least 6 characters long.</div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}>
              {loading ? (
                <span className="animate-pulse-soft">Creating account...</span>
              ) : (
                role === 'guide' ? 'Sign Up as Tour Guide' : 'Sign Up as Traveler'
              )}
            </button>

            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', textAlign: 'center', lineHeight: 1.6 }}>
              By signing up, you agree to our <Link href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Terms of Service</Link> and <Link href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Privacy Policy</Link>.
            </div>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '32px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
            <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)', fontWeight: 500, textTransform: 'uppercase' }}>Or sign up with</span>
            <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button type="button" onClick={() => signIn('google', { callbackUrl })} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 15 }}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 20, height: 20 }} />
              Sign up with Google
            </button>
          </div>

          <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--color-text-tertiary)', justifyContent: 'center' }}>
            <ShieldCheck size={16} style={{ color: 'var(--color-success)' }} />
            We protect your personal information
          </div>
        </div>
      </div>

      {/* Left Image (Desktop only) */}
      <div className="hide-mobile" style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        order: 1,
        backgroundImage: 'url(https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200&h=1600&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 60,
        }}>
          <h2 className="font-display" style={{ fontSize: 40, fontWeight: 700, color: 'white', marginBottom: 16 }}>
            Join a community of 2M+ travelers.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
            {[
              { icon: '⭐', text: 'Access to 10,000+ verified tours' },
              { icon: '🎁', text: 'Earn points on every booking' },
              { icon: '❤️', text: 'Save your favorite experiences' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 16, color: 'white', fontWeight: 500 }}>
                <span>{item.icon}</span> {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="page-content" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
