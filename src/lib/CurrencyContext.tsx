'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

export type CurrencyType = 'USD' | 'EUR' | 'GBP' | 'INR' | 'JPY' | 'AUD' | 'CAD' | 'CHF' | 'SGD' | 'AED';

export interface CurrencyOption {
  code: CurrencyType;
  symbol: string;
  label: string;
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'INR', symbol: '₹', label: 'INR (₹)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'JPY', symbol: '¥', label: 'JPY (¥)' },
  { code: 'AUD', symbol: 'A$', label: 'AUD (A$)' },
  { code: 'CAD', symbol: 'C$', label: 'CAD (C$)' },
  { code: 'CHF', symbol: 'CHF', label: 'CHF' },
  { code: 'SGD', symbol: 'S$', label: 'SGD (S$)' },
  { code: 'AED', symbol: 'د.إ', label: 'AED (د.إ)' },
];

export interface CurrencyContextProps {
  currency: CurrencyType;
  symbol: string;
  rate: number;
  setCurrency: (curr: CurrencyType) => void;
  formatPrice: (usdPrice: number) => string;
}

export const EXCHANGE_RATES: Record<CurrencyType, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.15,
  JPY: 151.45,
  AUD: 1.54,
  CAD: 1.36,
  CHF: 0.91,
  SGD: 1.35,
  AED: 3.67,
};

export const CURRENCY_SYMBOLS: Record<CurrencyType, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'CHF',
  SGD: 'S$',
  AED: 'د.إ',
};

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyType>('USD');
  const { data: session } = useSession();

  // Load user's currency from local storage or API on mount
  useEffect(() => {
    const fetchUserCurrency = async () => {
      try {
        if (session?.user) {
          const res = await fetch('/api/user/settings');
          if (res.ok) {
            const data = await res.json();
            if (data?.user?.preferences?.currency) {
              setCurrencyState(data.user.preferences.currency as CurrencyType);
              return;
            }
          }
        }
        // Fallback to localStorage for guests
        const localPref = localStorage.getItem('tourguide_currency') as CurrencyType;
        if (localPref && EXCHANGE_RATES[localPref]) {
          setCurrencyState(localPref);
        }
      } catch (err) {
        console.error('Failed to load currency preference', err);
      }
    };

    fetchUserCurrency();
  }, [session]);

  const setCurrency = (curr: CurrencyType) => {
    if (EXCHANGE_RATES[curr]) {
      setCurrencyState(curr);
      localStorage.setItem('tourguide_currency', curr);
    }
  };

  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  const rate = EXCHANGE_RATES[currency] || 1;

  const formatPrice = (usdPrice: number) => {
    if (usdPrice == null || isNaN(usdPrice)) {
      return `${symbol}0`;
    }
    const converted = usdPrice * rate;
    return `${symbol}${Math.round(converted).toLocaleString('en-US')}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, symbol, rate, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
