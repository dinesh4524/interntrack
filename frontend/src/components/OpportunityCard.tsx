import React from 'react';
import { Link } from 'react-router-dom';
import { Opportunity } from '../types';
import { MapPin, Clock, DollarSign, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onApply?: (opp: Opportunity) => void;
  onCheckEligibility?: (opp: Opportunity) => void;
  featured?: boolean;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onApply,
  onCheckEligibility,
  featured = false,
}) => {
  const getMatchColor = (match?: number) => {
    if (!match) return '#94a3b8';
    if (match >= 85) return '#10b981';
    if (match >= 70) return '#00f2fe';
    return '#f59e0b';
  };

  const matchColor = getMatchColor(opportunity.match_percentage);

  return (
    <div
      className="glass-panel glass-panel-hover"
      style={{
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: featured ? '1px solid rgba(0, 242, 254, 0.4)' : undefined,
        boxShadow: featured ? '0 12px 35px rgba(0, 242, 254, 0.1)' : undefined,
        position: 'relative',
      }}
    >
      {/* Top Header: Company + Match / Category */}
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `rgba(${opportunity.company.logo_color === '#00f2fe' ? '0,242,254' : '99,102,241'}, 0.15)`,
                border: `1px solid ${opportunity.company.logo_color}55`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 16,
                color: opportunity.company.logo_color || '#00f2fe',
              }}
            >
              {opportunity.company.logo_text || opportunity.company.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 5 }}>
                {opportunity.company.name}
                {opportunity.company.verified && <ShieldCheck size={14} color="#00f2fe" />}
              </h4>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                {opportunity.category}
              </div>
            </div>
          </div>

          {opportunity.match_percentage ? (
            <span
              className="badge"
              style={{
                background: `rgba(${opportunity.match_percentage >= 85 ? '16,185,129' : '0,242,254'}, 0.12)`,
                border: `1px solid ${matchColor}55`,
                color: matchColor,
                fontSize: 11,
              }}
            >
              {opportunity.match_percentage}% MATCH
            </span>
          ) : (
            <span className="badge badge-cyan" style={{ fontSize: 10 }}>
              {opportunity.work_mode}
            </span>
          )}
        </div>

        {/* Role Title */}
        <Link
          to={`/opportunities/${opportunity.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <h3
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: '#fff',
              marginBottom: 10,
              lineHeight: 1.3,
            }}
          >
            {opportunity.role}
          </h3>
        </Link>

        {/* Meta Info */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 14,
            fontSize: 13,
            color: 'var(--text-secondary)',
            marginBottom: 16,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <MapPin size={14} color="#64748b" /> {opportunity.location}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <DollarSign size={14} color="#64748b" /> {opportunity.stipend}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={14} color="#64748b" /> {opportunity.duration}
          </span>
        </div>

        {/* Required Skills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
          {opportunity.skills.slice(0, 4).map((s) => (
            <span
              key={s.id}
              style={{
                fontSize: 11,
                padding: '3px 9px',
                borderRadius: 99,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
              }}
            >
              {s.name}
            </span>
          ))}
          {opportunity.skills.length > 4 && (
            <span style={{ fontSize: 11, color: '#64748b', alignSelf: 'center' }}>
              +{opportunity.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 16,
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          gap: 10,
        }}
      >
        <Link
          to={`/opportunities/${opportunity.id}`}
          className="btn btn-secondary btn-sm"
          style={{ flex: 1, padding: '8px 12px', fontSize: 12.5 }}
        >
          View Details
        </Link>

        {opportunity.is_applied ? (
          <span
            className="badge badge-emerald"
            style={{ padding: '8px 14px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 5 }}
          >
            <CheckCircle2 size={14} /> Applied
          </span>
        ) : onApply ? (
          <button
            onClick={() => onApply(opportunity)}
            className="btn btn-primary btn-sm"
            style={{ flex: 1, padding: '8px 12px', fontSize: 12.5 }}
          >
            Apply Now <ArrowRight size={14} />
          </button>
        ) : (
          <Link
            to={`/opportunities/${opportunity.id}`}
            className="btn btn-primary btn-sm"
            style={{ flex: 1, padding: '8px 12px', fontSize: 12.5 }}
          >
            Apply <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
};
