import React from 'react';
import { CheckCircle2, Clock, Calendar, Award, XCircle, ChevronRight } from 'lucide-react';

interface ApplicationTimelineProps {
  currentStatus: string;
  compact?: boolean;
}

const STAGES = [
  { id: 'APPLIED', label: 'Applied' },
  { id: 'SCREENING', label: 'Screening' },
  { id: 'SHORTLISTED', label: 'Shortlist' },
  { id: 'INTERVIEW', label: 'Interview' },
  { id: 'SELECTED', label: 'Offer' },
];

export const ApplicationTimeline: React.FC<ApplicationTimelineProps> = ({
  currentStatus,
  compact = false,
}) => {
  const isRejected = currentStatus === 'REJECTED';
  const getStageIndex = (status: string) => {
    const idx = STAGES.findIndex((s) => s.id === status);
    return idx === -1 ? 0 : idx;
  };

  const currentIndex = isRejected ? 1 : getStageIndex(currentStatus);

  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: '100%' }}>
        {STAGES.map((st, i) => {
          const isPassed = i <= currentIndex && !isRejected;
          const isCurrent = i === currentIndex;

          return (
            <div
              key={st.id}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: isCurrent
                  ? 'var(--accent-cyan)'
                  : isPassed
                  ? '#10b981'
                  : 'rgba(255,255,255,0.1)',
                boxShadow: isCurrent ? '0 0 6px rgba(0,242,254,0.6)' : undefined,
              }}
              title={st.label}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="timeline-container"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '12px 0',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      {/* Background Connecting Line */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(22px, 4vw, 28px)',
          left: 20,
          right: 20,
          height: 2,
          background: 'rgba(255, 255, 255, 0.08)',
          zIndex: 0,
        }}
      />

      {STAGES.map((st, i) => {
        const isPassed = i <= currentIndex && !isRejected;
        const isCurrent = i === currentIndex && !isRejected;

        let nodeColor = 'rgba(255,255,255,0.2)';
        let nodeBg = 'rgba(10, 14, 30, 1)';
        let textColor = '#64748b';

        if (isPassed) {
          nodeColor = '#10b981';
          nodeBg = 'rgba(16, 185, 129, 0.2)';
          textColor = '#fff';
        }
        if (isCurrent) {
          nodeColor = '#00f2fe';
          nodeBg = 'rgba(0, 242, 254, 0.25)';
          textColor = '#00f2fe';
        }

        return (
          <div
            key={st.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
              flex: 1,
            }}
          >
            <div
              className="timeline-node"
              style={{
                width: 'clamp(24px, 5vw, 32px)',
                height: 'clamp(24px, 5vw, 32px)',
                borderRadius: '50%',
                background: nodeBg,
                border: `2px solid ${nodeColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 6,
                boxShadow: isCurrent ? '0 0 12px rgba(0,242,254,0.5)' : undefined,
                transition: 'all 0.3s ease',
              }}
            >
              {isPassed ? (
                <CheckCircle2 size={14} color={nodeColor} />
              ) : (
                <span style={{ fontSize: 11, fontWeight: 700, color: nodeColor }}>{i + 1}</span>
              )}
            </div>
            <span style={{ fontSize: 'clamp(9.5px, 2.5vw, 12px)', fontWeight: 700, color: textColor, textAlign: 'center' }}>
              {st.label}
            </span>
          </div>
        );
      })}

      {isRejected && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 99,
            padding: '3px 8px',
            color: '#fb7185',
            fontSize: 10.5,
            fontWeight: 700,
            marginLeft: 8,
          }}
        >
          <XCircle size={12} /> Rejected
        </div>
      )}
    </div>
  );
};
