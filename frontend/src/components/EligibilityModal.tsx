import React, { useState, useEffect } from 'react';
import { Opportunity, EligibilityResult } from '../types';
import { useAuth } from '../context/AuthContext';
import { eligibilityApi } from '../api/client';
import { EligibilityGauge } from './EligibilityGauge';
import { X, CheckCircle2, AlertTriangle, XCircle, Sparkles, ArrowRight } from 'lucide-react';

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity | null;
  onApplyNow?: (opp: Opportunity) => void;
}

export const EligibilityModal: React.FC<EligibilityModalProps> = ({
  isOpen,
  onClose,
  opportunity,
  onApplyNow,
}) => {
  const { profile } = useAuth();

  const [branch, setBranch] = useState('Cyber Security');
  const [cgpa, setCgpa] = useState(8.48);
  const [gradYear, setGradYear] = useState(2028);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Python', 'Linux', 'Networking', 'Cybersecurity', 'SQL'
  ]);

  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setBranch(profile.branch || 'Cyber Security');
      setCgpa(profile.cgpa || 8.48);
      setGradYear(profile.graduation_year || 2028);
      if (profile.skills && profile.skills.length > 0) {
        setSelectedSkills(profile.skills.map((s) => s.skill.name));
      }
    }
  }, [profile]);

  useEffect(() => {
    if (isOpen && opportunity) {
      runCheck();
    }
  }, [isOpen, opportunity, branch, cgpa, gradYear, selectedSkills]);

  const runCheck = async () => {
    if (!opportunity) return;
    setLoading(true);
    try {
      const res = await eligibilityApi.check({
        opportunity_id: opportunity.id,
        branch,
        cgpa,
        graduation_year: gradYear,
        skills: selectedSkills,
      });
      setResult(res);
    } catch (err) {
      console.warn('Eligibility check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSkill = (skillName: string) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skillName));
    } else {
      setSelectedSkills([...selectedSkills, skillName]);
    }
  };

  if (!isOpen || !opportunity) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(5, 8, 17, 0.85)',
        backdropFilter: 'blur(12px)',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: 680,
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: 28,
          position: 'relative',
          background: 'rgba(10, 14, 30, 0.98)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(0,242,254,0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <span className="section-tag" style={{ margin: 0, fontSize: 10 }}>
              LIVE ELIGIBILITY ENGINE (POST /eligibility/check)
            </span>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 6 }}>
              {opportunity.role}
            </h2>
            <div style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>
              {opportunity.company.name} • Min CGPA: {opportunity.min_cgpa} • Batches: {opportunity.grad_years}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: 'none',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Banner */}
        {result && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              background: 'rgba(13, 18, 38, 0.9)',
              border: `1px solid ${result.match_percentage >= 85 ? 'rgba(16,185,129,0.3)' : 'rgba(0,242,254,0.3)'}`,
              borderRadius: 16,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <EligibilityGauge percentage={result.match_percentage} size={110} />

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                {result.eligible ? (
                  <span className="badge badge-emerald">
                    <CheckCircle2 size={13} /> Highly Eligible
                  </span>
                ) : (
                  <span className="badge badge-amber">
                    <AlertTriangle size={13} /> Partial Match
                  </span>
                )}
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  Backend Match Score
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12.5 }}>
                <div style={{ color: result.cgpa_matched ? '#10b981' : '#f43f5e', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {result.cgpa_matched ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                  CGPA Requirement: {cgpa} (Min: {opportunity.min_cgpa})
                </div>
                <div style={{ color: result.branch_matched ? '#10b981' : '#f43f5e', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {result.branch_matched ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                  Branch Match: {branch}
                </div>
                <div style={{ color: result.grad_year_matched ? '#10b981' : '#f43f5e', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {result.grad_year_matched ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                  Batch Match: Class of {gradYear}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Simulation Controls */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
            Simulate Candidate Parameters
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 16 }}>
            <div>
              <label className="form-label">CGPA Slider ({cgpa})</label>
              <input
                type="range"
                min="5.0"
                max="10.0"
                step="0.05"
                value={cgpa}
                onChange={(e) => setCgpa(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
              />
            </div>

            <div>
              <label className="form-label">Branch</label>
              <select
                className="form-select"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                <option value="Cyber Security">Cyber Security</option>
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </select>
            </div>

            <div>
              <label className="form-label">Graduation Year</label>
              <select
                className="form-select"
                value={gradYear}
                onChange={(e) => setGradYear(parseInt(e.target.value))}
              >
                <option value={2026}>2026</option>
                <option value={2027}>2027</option>
                <option value={2028}>2028</option>
                <option value={2029}>2029</option>
              </select>
            </div>
          </div>

          <div>
            <label className="form-label">Toggle Technical Skills</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Python', 'Linux', 'Networking', 'Cybersecurity', 'SQL', 'React', 'Cloud', 'Git', 'Data Structures', 'C++', 'Java', 'Docker'].map((s) => {
                const isSelected = selectedSkills.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSkill(s)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 99,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.1)',
                      background: isSelected ? 'rgba(0,242,254,0.15)' : 'rgba(255,255,255,0.04)',
                      color: isSelected ? '#00f2fe' : '#94a3b8',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Missing Skills Warning */}
        {result && result.missing_skills.length > 0 && (
          <div
            style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: 12,
              padding: '12px 16px',
              marginBottom: 20,
              fontSize: 13,
              color: '#fbbf24',
            }}
          >
            <strong>Recommended Competency Gaps:</strong> You are missing{' '}
            {result.missing_skills.join(', ')}. Mastering these will elevate your match to 95%+.
          </div>
        )}

        {/* Action Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 10 }}>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Close
          </button>
          {onApplyNow && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onApplyNow(opportunity);
              }}
              className="btn btn-primary"
            >
              Apply With This Profile <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
