import React from 'react';

interface EligibilityGaugeProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export const EligibilityGauge: React.FC<EligibilityGaugeProps> = ({
  percentage,
  size = 120,
  strokeWidth = 10,
  showLabel = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

  const getColor = (val: number) => {
    if (val >= 85) return '#10b981'; // Emerald
    if (val >= 70) return '#00f2fe'; // Cyan
    if (val >= 50) return '#f59e0b'; // Amber
    return '#f43f5e'; // Rose
  };

  const activeColor = getColor(clampedPercentage);

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated Gauge */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={activeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.5s ease',
            filter: `drop-shadow(0 0 8px ${activeColor}88)`,
          }}
        />
      </svg>

      {showLabel && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: size > 100 ? 28 : 20,
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1,
            }}
          >
            {clampedPercentage}
            <span style={{ fontSize: size > 100 ? 16 : 12, color: activeColor }}>%</span>
          </span>
          <span
            style={{
              fontSize: 10,
              textTransform: 'uppercase',
              fontWeight: 700,
              color: 'var(--text-muted)',
              marginTop: 3,
              letterSpacing: '0.04em',
            }}
          >
            Match
          </span>
        </div>
      )}
    </div>
  );
};
