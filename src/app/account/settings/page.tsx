'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCurrency } from '@/lib/CurrencyContext';
import {
  User, Lock, Globe, Bell, Shield, Camera, Check, Save, Eye, EyeOff
} from 'lucide-react';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [profile, setProfile] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    bio: '',
    location: '',
  });

  // Security form state
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Preferences state
  const [prefs, setPrefs] = useState({
    language: 'en',
    currency: 'USD',
    darkMode: false,
    twoFactor: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { setCurrency } = useCurrency();

  useEffect(() => {
    if (session?.user) {
      fetch('/api/user/settings')
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setProfile({
              name: data.user.name || session.user.name || '',
              email: data.user.email || session.user.email || '',
              phone: data.user.phone || '',
              bio: data.user.bio || '',
              location: data.user.location || '',
            });
            if (data.user.preferences) {
              setPrefs({
                language: data.user.preferences.language || 'en',
                currency: data.user.preferences.currency || 'USD',
                darkMode: data.user.preferences.darkMode || false,
                twoFactor: data.user.preferences.twoFactor || false,
              });
            }
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching settings:', err);
          setLoading(false);
        });
    } else if (session === null) {
      router.push('/login');
    }
  }, [session, router]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...profile,
          preferences: prefs,
        }),
      });
      
      if (res.ok) {
        setCurrency(prefs.currency as any);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        console.error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid var(--color-border)', borderTopColor: 'var(--color-primary)', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)' as const,
    border: '1px solid var(--color-border)', fontSize: 14,
    background: 'var(--color-bg-tertiary)', color: 'var(--color-text)', outline: 'none' as const,
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    fontSize: 12, fontWeight: 600 as const, color: 'var(--color-text-secondary)',
    display: 'block' as const, marginBottom: 6,
  };

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: <User size={16} /> },
    { id: 'security' as const, label: 'Security', icon: <Lock size={16} /> },
    { id: 'preferences' as const, label: 'Preferences', icon: <Globe size={16} /> },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text)' }}>Settings</h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>
          Manage your account settings and preferences
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--color-bg-tertiary)', padding: 4, borderRadius: 'var(--radius-md)' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '10px 16px', fontSize: 13, fontWeight: 600,
              background: activeTab === tab.id ? 'var(--color-surface)' : 'transparent',
              color: activeTab === tab.id ? 'var(--color-text)' : 'var(--color-text-secondary)',
              border: 'none', borderRadius: 'var(--radius-sm)',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: activeTab === tab.id ? 'var(--shadow-sm)' : 'none',
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="card" style={{ padding: 24 }}>
          {/* Avatar Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid var(--color-border-light)' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=0f766e&color=fff&size=96`}
                alt="Profile"
                style={{ width: 80, height: 80, borderRadius: 'var(--radius-full)', objectFit: 'cover', border: '4px solid var(--color-primary-100)' }}
              />
              <button style={{
                position: 'absolute', bottom: 0, right: 0,
                width: 28, height: 28, borderRadius: '50%',
                background: 'var(--color-primary)', color: 'white',
                border: '3px solid var(--color-surface)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Camera size={12} />
              </button>
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)' }}>{profile.name}</h3>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{profile.email}</p>
            </div>
          </div>

          {/* Profile Form */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                value={profile.name}
                onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input
                value={profile.email}
                onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))}
                type="email"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input
                value={profile.phone}
                onChange={e => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Location</label>
              <input
                value={profile.location}
                onChange={e => setProfile(prev => ({ ...prev, location: e.target.value }))}
                style={inputStyle}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Bio</label>
              <textarea
                value={profile.bio}
                onChange={e => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' as const }}
              />
            </div>
          </div>
          <button onClick={handleSave} disabled={saving} className="btn btn-primary" style={{ marginTop: 24, padding: '12px 32px', fontSize: 14, opacity: saving ? 0.7 : 1 }}>
            {saved ? <><Check size={16} /> Saved!</> : <><Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}</>}
          </button>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: 'var(--color-text)' }}>
            Change Password
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
            <div>
              <label style={labelStyle}>Current Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  value={security.currentPassword}
                  onChange={e => setSecurity(prev => ({ ...prev, currentPassword: e.target.value }))}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter current password"
                  style={inputStyle}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label style={labelStyle}>New Password</label>
              <input
                value={security.newPassword}
                onChange={e => setSecurity(prev => ({ ...prev, newPassword: e.target.value }))}
                type="password"
                placeholder="Enter new password"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Confirm New Password</label>
              <input
                value={security.confirmPassword}
                onChange={e => setSecurity(prev => ({ ...prev, confirmPassword: e.target.value }))}
                type="password"
                placeholder="Confirm new password"
                style={inputStyle}
              />
            </div>
          </div>
          <button onClick={handleSave} className="btn btn-primary" style={{ marginTop: 24, padding: '12px 32px', fontSize: 14 }}>
            <Lock size={16} /> Update Password
          </button>

          <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--color-border-light)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: 'var(--color-text)' }}>
              Two-Factor Authentication
            </h3>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 20px', borderRadius: 'var(--radius-md)',
              background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border-light)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Shield size={20} style={{ color: 'var(--color-primary)' }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>
                    Two-Factor Authentication
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                    Add an extra layer of security to your account
                  </div>
                </div>
              </div>
              <button
                onClick={() => setPrefs(prev => ({ ...prev, twoFactor: !prev.twoFactor }))}
                style={{
                  width: 48, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
                  background: prefs.twoFactor ? 'var(--color-primary)' : 'var(--color-border)',
                  position: 'relative', transition: 'background 0.2s',
                }}
              >
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', background: 'white',
                  position: 'absolute', top: 3,
                  left: prefs.twoFactor ? 25 : 3,
                  transition: 'left 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }} />
              </button>
            </div>
          </div>

          <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--color-border-light)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: 'var(--color-error)' }}>
              Danger Zone
            </h3>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16 }}>
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="btn" style={{
              padding: '10px 24px', fontSize: 13,
              background: 'transparent', border: '2px solid var(--color-error)',
              color: 'var(--color-error)', cursor: 'pointer', borderRadius: 'var(--radius-md)',
            }}>
              Delete Account
            </button>
          </div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: 'var(--color-text)' }}>
            Regional Settings
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={labelStyle}>Language</label>
              <select
                value={prefs.language}
                onChange={e => setPrefs(prev => ({ ...prev, language: e.target.value }))}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="it">Italiano</option>
                <option value="pt">Português</option>
                <option value="ja">日本語</option>
                <option value="zh">中文</option>
                <option value="ko">한국어</option>
                <option value="ar">العربية</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Currency</label>
              <select
                value={prefs.currency}
                onChange={e => setPrefs(prev => ({ ...prev, currency: e.target.value }))}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="AUD">AUD (A$)</option>
                <option value="CAD">CAD (C$)</option>
                <option value="CHF">CHF (CHF)</option>
                <option value="SGD">SGD (S$)</option>
                <option value="AED">AED (د.إ)</option>
              </select>
            </div>
          </div>

          <button onClick={handleSave} disabled={saving} className="btn btn-primary" style={{ marginTop: 24, padding: '12px 32px', fontSize: 14, opacity: saving ? 0.7 : 1 }}>
            {saved ? <><Check size={16} /> Saved!</> : <><Save size={16} /> {saving ? 'Saving...' : 'Save Preferences'}</>}
          </button>
        </div>
      )}

      {/* Success Toast */}
      {saved && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24,
          background: 'var(--color-primary)', color: 'white',
          padding: '14px 24px', borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 14, fontWeight: 600, zIndex: 100,
          animation: 'fadeInUp 0.3s ease',
        }}>
          <Check size={18} /> Settings saved successfully!
        </div>
      )}
    </div>
  );
}
