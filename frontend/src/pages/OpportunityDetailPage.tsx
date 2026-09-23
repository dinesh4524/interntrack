import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Opportunity } from '../types';
import { opportunitiesApi } from '../api/client';
import { ApplyModal } from '../components/ApplyModal';
import { EligibilityModal } from '../components/EligibilityModal';
import { Skeleton } from '../components/Skeleton';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  ArrowRight,
  Share2,
  ExternalLink
} from 'lucide-react';

export const OpportunityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isEligOpen, setIsEligOpen] = useState(false);

  const fetchDetail = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await opportunitiesApi.getById(id);
      setOpportunity(data);
    } catch (err) {
      console.warn('Could not load opportunity detail:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 16px' }}>
        <Skeleton width={120} height={32} style={{ marginBottom: 24 }} />
        <Skeleton width="60%" height={44} style={{ marginBottom: 16 }} />
        <Skeleton height={200} borderRadius={16} style={{ marginBottom: 24 }} />
        <Skeleton height={400} borderRadius={16} />
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="container" style={{ padding: '60px 16px', textAlign: 'center' }}>
        <h2>Opportunity Not Found</h2>
        <Link to="/opportunities" className="btn btn-primary" style={{ marginTop: 20 }}>
          Back to Opportunities
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 16px 80px' }}>
      {/* Back link */}
      <Link
        to="/opportunities"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: '#94a3b8',
          textDecoration: 'none',
          fontSize: 14,
          marginBottom: 24,
        }}
      >
        <ArrowLeft size={16} /> Back to Opportunities
      </Link>

      {/* Hero Glass Card for Opportunity */}
      <div
        className="glass-panel"
        style={{
          padding: '36px 32px',
          marginBottom: 32,
          position: 'relative',
          border: '1px solid rgba(0, 242, 254, 0.25)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                background: `rgba(${opportunity.company.logo_color === '#00f2fe' ? '0,242,254' : '99,102,241'}, 0.2)`,
                border: `1px solid ${opportunity.company.logo_color}55`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 22,
                color: opportunity.company.logo_color || '#00f2fe',
              }}
            >
              {opportunity.company.logo_text || opportunity.company.name.slice(0, 2).toUpperCase()}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {opportunity.company.name}
                </h3>
                {opportunity.company.verified && <ShieldCheck size={16} color="#00f2fe" />}
              </div>
              <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                {opportunity.role}
              </h1>
            </div>
          </div>

          {opportunity.match_percentage && (
            <div
              style={{
                background: 'rgba(0, 242, 254, 0.1)',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                borderRadius: 16,
                padding: '12px 20px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: '#00f2fe' }}>
                {opportunity.match_percentage}%
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                Candidate Match
              </div>
            </div>
          )}
        </div>

        {/* Info Pills Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            paddingTop: 24,
            marginTop: 24,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: 14,
            color: 'var(--text-secondary)',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={16} color="var(--accent-cyan)" /> {opportunity.location} ({opportunity.work_mode})
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <DollarSign size={16} color="var(--accent-emerald)" /> {opportunity.stipend}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Clock size={16} color="#8b5cf6" /> {opportunity.duration}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Calendar size={16} color="#f43f5e" /> Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Main Content Layout (2 Cols) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 32,
          alignItems: 'flex-start',
        }}
      >
        {/* Left Col: Job Description, Responsibilities, Benefits */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Overview */}
          <div className="glass-panel" style={{ padding: 28 }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 14 }}>
              Role Overview & Mission
            </h3>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
              {opportunity.description}
            </p>
          </div>

          {/* Responsibilities */}
          {opportunity.responsibilities && (
            <div className="glass-panel" style={{ padding: 28 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 14 }}>
                Key Responsibilities & Deliverables
              </h3>
              <div style={{ fontSize: 14.5, color: '#cbd5e1', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {opportunity.responsibilities}
              </div>
            </div>
          )}

          {/* Benefits */}
          {opportunity.benefits && (
            <div className="glass-panel" style={{ padding: 28 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 14 }}>
                Perks, Learning & Benefits
              </h3>
              <div style={{ fontSize: 14.5, color: '#cbd5e1', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {opportunity.benefits}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Eligibility Criteria & Apply Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Sticky Action Card */}
          <div
            className="glass-panel"
            style={{
              padding: 28,
              border: '1px solid rgba(0, 242, 254, 0.3)',
              position: 'sticky',
              top: 96,
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 18 }}>
              Apply for this Opportunity
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              <button
                onClick={() => setIsApplyOpen(true)}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                Apply Now <ArrowRight size={18} />
              </button>

              <button
                onClick={() => setIsEligOpen(true)}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                <Sparkles size={16} color="var(--accent-cyan)" /> Check Live Eligibility
              </button>
            </div>

            {/* Eligibility Constraints */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginBottom: 14 }}>
                Academic Constraints
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13.5, color: '#94a3b8' }}>
                <div>
                  <strong style={{ color: '#fff' }}>Min CGPA:</strong> {opportunity.min_cgpa} / 10.0
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>Allowed Batches:</strong> {opportunity.grad_years}
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>Eligible Majors:</strong> {opportunity.allowed_branches}
                </div>
              </div>
            </div>

            {/* Required Skills */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 20, marginTop: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginBottom: 12 }}>
                Required Skill Competencies
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {opportunity.skills.map((s) => (
                  <span key={s.id} className="badge badge-cyan" style={{ fontSize: 12 }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ApplyModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        opportunity={opportunity}
        onSuccess={fetchDetail}
      />

      <EligibilityModal
        isOpen={isEligOpen}
        onClose={() => setIsEligOpen(false)}
        opportunity={opportunity}
        onApplyNow={(opp) => {
          setIsEligOpen(false);
          setIsApplyOpen(true);
        }}
      />
    </div>
  );
};
