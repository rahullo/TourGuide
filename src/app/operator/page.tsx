'use client';

import { DollarSign, Users, Star, ArrowUpRight, ArrowDownRight, Calendar, Activity } from 'lucide-react';
import { operatorStats } from '@/lib/data';

export default function OperatorDashboard() {
  const stats = [
    { label: 'Total Revenue', value: `$${(operatorStats.totalRevenue / 1000).toFixed(1)}k`, trend: '+12.5%', isPositive: true, icon: <DollarSign size={20} /> },
    { label: 'Total Bookings', value: operatorStats.totalBookings, trend: '+8.2%', isPositive: true, icon: <Calendar size={20} /> },
    { label: 'Average Rating', value: operatorStats.avgRating, trend: '+0.1', isPositive: true, icon: <Star size={20} /> },
    { label: 'Conversion Rate', value: `${operatorStats.conversionRate}%`, trend: '-1.2%', isPositive: false, icon: <Activity size={20} /> },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>Here's what's happening with your tours today.</p>
        </div>
        <select className="input" style={{ width: 140, background: 'var(--color-surface)' }}>
          <option>Last 30 Days</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 32 }}>
        {stats.map((stat, i) => (
          <div key={i} className="card card-elevated" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-50)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: stat.isPositive ? 'var(--color-success)' : 'var(--color-error)', background: stat.isPositive ? '#dcfce7' : '#fee2e2', padding: '4px 8px', borderRadius: 'var(--radius-full)' }}>
                {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text)', marginBottom: 4 }}>{stat.value}</div>
            <div style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Chart Area */}
        <div className="card card-elevated" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 24 }}>Revenue Overview</h2>
          <div style={{ height: 300, display: 'flex', alignItems: 'flex-end', gap: 12, paddingBottom: 24, borderBottom: '1px solid var(--color-border-light)' }}>
            {operatorStats.revenueChart.map((data, i) => {
              const max = Math.max(...operatorStats.revenueChart.map(d => d.revenue));
              const height = (data.revenue / max) * 100;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: '100%', height: `${height}%`, background: i === 7 ? 'var(--color-primary)' : 'var(--color-primary-100)', borderRadius: '4px 4px 0 0', transition: 'height 0.5s ease' }} />
                  <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card card-elevated" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', marginBottom: 24 }}>Recent Bookings</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-full)', background: 'var(--color-bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={16} style={{ color: 'var(--color-text-secondary)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>New booking: Rome Tour</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>2 guests • Oct 15</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-primary)' }}>+$118</div>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary" style={{ width: '100%', marginTop: 24, justifyContent: 'center' }}>View All Bookings</button>
        </div>
      </div>
    </div>
  );
}
