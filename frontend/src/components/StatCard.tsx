import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  icon?: LucideIcon;
  change?: string;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  suffix = '',
  icon: Icon,
  change,
  color = 'var(--accent-cyan)',
}) => {
  return (
    <div
      className="glass-panel glass-panel-hover"
      style={{
        padding: 'clamp(14px, 3vw, 22px) clamp(12px, 2.5vw, 18px)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.3 }}>{label}</span>
        {Icon && (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `rgba(${color === 'var(--accent-cyan)' ? '0,242,254' : '99,102,241'}, 0.12)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={16} color={color} />
          </div>
        )}
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
            {value}
          </span>
          {suffix && (
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: color }}>
              {suffix}
            </span>
          )}
        </div>

        {change && (
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.3 }}>
            {change}
          </div>
        )}
      </div>
    </div>
  );
};
