'use client';

import { useState } from 'react';
import { CreditCard, Plus, Trash2, Shield, Check, X } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiry: string;
  name: string;
  isDefault: boolean;
}

const initialCards: PaymentMethod[] = [
  { id: 'pm1', type: 'visa', last4: '4242', expiry: '12/28', name: 'Rahul L.', isDefault: true },
  { id: 'pm2', type: 'mastercard', last4: '8888', expiry: '06/27', name: 'Rahul L.', isDefault: false },
];

const cardBrands: Record<string, { color: string; label: string }> = {
  visa: { color: '#1A1F71', label: 'VISA' },
  mastercard: { color: '#EB001B', label: 'Mastercard' },
  amex: { color: '#006FCF', label: 'Amex' },
};

export default function PaymentsPage() {
  const [cards, setCards] = useState<PaymentMethod[]>(initialCards);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', expiry: '', cvc: '', name: '' });

  const removeCard = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  const setDefault = (id: string) => {
    setCards(prev => prev.map(c => ({ ...c, isDefault: c.id === id })));
  };

  const handleAddCard = () => {
    if (!newCard.number || !newCard.expiry || !newCard.cvc || !newCard.name) return;
    const last4 = newCard.number.replace(/\s/g, '').slice(-4);
    const newPm: PaymentMethod = {
      id: `pm${Date.now()}`,
      type: newCard.number.startsWith('4') ? 'visa' : newCard.number.startsWith('5') ? 'mastercard' : 'amex',
      last4,
      expiry: newCard.expiry,
      name: newCard.name,
      isDefault: cards.length === 0,
    };
    setCards(prev => [...prev, newPm]);
    setNewCard({ number: '', expiry: '', cvc: '', name: '' });
    setShowAddForm(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text)' }}>Payment Methods</h2>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>
            Manage your saved cards for faster checkout
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary"
          style={{ padding: '10px 20px', fontSize: 13 }}
        >
          {showAddForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Card</>}
        </button>
      </div>

      {/* Add Card Form */}
      {showAddForm && (
        <div className="card" style={{ padding: 24, marginBottom: 24, border: '2px solid var(--color-primary-100)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: 'var(--color-text)' }}>
            Add New Payment Method
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
                Card Number
              </label>
              <input
                value={newCard.number}
                onChange={e => setNewCard(prev => ({ ...prev, number: e.target.value }))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)', fontSize: 14,
                  background: 'var(--color-bg-tertiary)', color: 'var(--color-text)', outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
                Expiry Date
              </label>
              <input
                value={newCard.expiry}
                onChange={e => setNewCard(prev => ({ ...prev, expiry: e.target.value }))}
                placeholder="MM/YY"
                maxLength={5}
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)', fontSize: 14,
                  background: 'var(--color-bg-tertiary)', color: 'var(--color-text)', outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
                CVC
              </label>
              <input
                value={newCard.cvc}
                onChange={e => setNewCard(prev => ({ ...prev, cvc: e.target.value }))}
                placeholder="123"
                maxLength={4}
                type="password"
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)', fontSize: 14,
                  background: 'var(--color-bg-tertiary)', color: 'var(--color-text)', outline: 'none',
                }}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
                Cardholder Name
              </label>
              <input
                value={newCard.name}
                onChange={e => setNewCard(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Name on card"
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)', fontSize: 14,
                  background: 'var(--color-bg-tertiary)', color: 'var(--color-text)', outline: 'none',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
            <Shield size={14} style={{ color: 'var(--color-primary)' }} />
            <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
              Your card information is encrypted and securely stored
            </span>
          </div>
          <button onClick={handleAddCard} className="btn btn-primary" style={{ marginTop: 20, padding: '12px 32px', fontSize: 14, width: '100%' }}>
            <CreditCard size={16} /> Save Card
          </button>
        </div>
      )}

      {/* Saved Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {cards.map(card => (
          <div key={card.id} className="card" style={{
            padding: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            border: card.isDefault ? '2px solid var(--color-primary-200)' : '1px solid var(--color-border-light)',
            transition: 'all 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* Card Brand Badge */}
              <div style={{
                width: 56, height: 36, borderRadius: 6,
                background: `linear-gradient(135deg, ${cardBrands[card.type].color}, ${cardBrands[card.type].color}99)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
              }}>
                {cardBrands[card.type].label}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text)' }}>
                  •••• •••• •••• {card.last4}
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  {card.name} · Expires {card.expiry}
                </div>
              </div>
              {card.isDefault && (
                <span style={{
                  fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                  padding: '3px 10px', borderRadius: 'var(--radius-full)',
                  background: 'var(--color-primary-50)', color: 'var(--color-primary)',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <Check size={10} /> Default
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {!card.isDefault && (
                <button
                  onClick={() => setDefault(card.id)}
                  className="btn btn-ghost"
                  style={{ fontSize: 12, padding: '6px 12px' }}
                >
                  Set Default
                </button>
              )}
              <button
                onClick={() => removeCard(card.id)}
                className="btn btn-ghost"
                style={{ color: 'var(--color-error)', padding: '6px 10px' }}
                title="Remove card"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {cards.length === 0 && !showAddForm && (
        <div className="card" style={{ textAlign: 'center', padding: '60px 40px' }}>
          <CreditCard size={40} style={{ color: 'var(--color-text-tertiary)', marginBottom: 16 }} />
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No Payment Methods</h3>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 24 }}>
            Add a card to make booking faster and easier.
          </p>
          <button onClick={() => setShowAddForm(true)} className="btn btn-primary" style={{ padding: '12px 32px' }}>
            <Plus size={16} /> Add Your First Card
          </button>
        </div>
      )}
    </div>
  );
}
