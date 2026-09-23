import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeroCanvas } from '../components/HeroCanvas';
import { FloatingHeroCards } from '../components/FloatingHeroCards';
import { OpportunityCard } from '../components/OpportunityCard';
import { Opportunity } from '../types';
import { opportunitiesApi } from '../api/client';
import { 
  Compass, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Briefcase, 
  Award, 
  BarChart3, 
  Zap, 
  ChevronRight,
  Clock,
  Terminal,
  Cpu
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredOpps, setFeaturedOpps] = useState<Opportunity[]>([]);
  const [loadingOpps, setLoadingOpps] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await opportunitiesApi.list({ page_size: 4 });
        setFeaturedOpps(res.items);
      } catch (err) {
        console.warn('Could not load featured opportunities:', err);
      } finally {
        setLoadingOpps(false);
      }
    };
    fetchOpportunities();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      {/* ====================================================
           HERO SECTION
      ==================================================== */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(40px, 6vw, 80px) 0 clamp(40px, 6vw, 80px)',
          minHeight: 'auto',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
        }}
      >
        <HeroCanvas />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(28px, 4vw, 48px)',
              alignItems: 'center',
            }}
          >
            {/* Left Content */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(0, 242, 254, 0.08)',
                  border: '1px solid rgba(0, 242, 254, 0.25)',
                  borderRadius: 99,
                  padding: '4px 12px',
                  marginBottom: 18,
                  maxWidth: '100%',
                }}
              >
                <Sparkles size={13} color="#00f2fe" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.04em', truncate: true }}>
                  CAMPUS PLACEMENT & INTERNSHIP 2026
                </span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 6vw, 56px)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: '#ffffff',
                  marginBottom: 16,
                  letterSpacing: '-0.03em',
                }}
              >
                Your next <span style={{ color: 'var(--accent-cyan)' }}>opportunity</span><br />
                starts here.
              </h1>

              <p
                style={{
                  fontSize: 'clamp(14px, 2vw, 17.5px)',
                  color: '#94a3b8',
                  lineHeight: 1.6,
                  maxWidth: 540,
                  marginBottom: 28,
                }}
              >
                Discover internships, build career-ready skills, check your eligibility score in real-time, and track every application step.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
                <Link to="/opportunities" className="btn btn-primary btn-lg" style={{ flex: '1 1 200px' }}>
                  Explore Opportunities <ArrowRight size={17} />
                </Link>
                <Link to="/register" className="btn btn-secondary btn-lg" style={{ flex: '1 1 140px' }}>
                  Get Started →
                </Link>
              </div>

              {/* Metrics Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 8,
                  background: 'rgba(13, 18, 38, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 16,
                  padding: '12px 14px',
                  backdropFilter: 'blur(12px)',
                  textAlign: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: 'clamp(15px, 3vw, 18px)', fontWeight: 800, color: '#10b981' }}>94%</div>
                  <div style={{ fontSize: 9.5, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Match Rate</div>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: 'clamp(15px, 3vw, 18px)', fontWeight: 800, color: 'var(--accent-cyan)' }}>₹35K</div>
                  <div style={{ fontSize: 9.5, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Peak Stipend</div>
                </div>
                <div>
                  <div style={{ fontSize: 'clamp(15px, 3vw, 18px)', fontWeight: 800, color: '#818cf8' }}>48h</div>
                  <div style={{ fontSize: 9.5, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Avg. Reply</div>
                </div>
              </div>
            </div>

            {/* Right Visual 3D Stage */}
            <div style={{ position: 'relative', width: '100%' }}>
              <FloatingHeroCards />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
           1. STATISTICS BAND
      ==================================================== */}
      <section style={{ padding: 'clamp(36px, 5vw, 60px) 0', background: 'rgba(8, 12, 26, 0.5)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 'clamp(12px, 2vw, 20px)',
            }}
          >
            {[
              { number: '120', suffix: '+', label: 'Verified Roles', icon: Briefcase, color: '#00f2fe' },
              { number: '45', suffix: '+', label: 'Companies', icon: ShieldCheck, color: '#6366f1' },
              { number: '85', suffix: '+', label: 'Skill Tracks', icon: Layers, color: '#10b981' },
              { number: '320', suffix: '+', label: 'Applications', icon: Award, color: '#f59e0b' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="glass-panel"
                  style={{
                    padding: '16px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: `rgba(255,255,255,0.05)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} color={stat.color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
                      {stat.number}<span style={{ color: stat.color }}>{stat.suffix}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: '#94a3b8', marginTop: 1 }}>{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================
           2. FEATURED OPPORTUNITIES
      ==================================================== */}
      <section style={{ padding: 'clamp(50px, 7vw, 90px) 0', position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
            <div>
              <span className="section-tag">OPPORTUNITY DISCOVERY</span>
              <h2 className="section-title">Find work worth growing for.</h2>
              <p className="section-subtitle">
                Explore curated roles aligned with your technical competencies, academic year, and career aspirations.
              </p>
            </div>
            <Link to="/opportunities" className="btn btn-secondary btn-sm">
              View All Roles <ArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {featuredOpps.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
           3. HOW IT WORKS (EDITORIAL 3-STEP)
      ==================================================== */}
      <section
        id="how-it-works"
        style={{
          padding: 'clamp(50px, 7vw, 90px) 0',
          background: 'rgba(8, 12, 26, 0.6)',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-tag">STREAMLINED WORKFLOW</span>
            <h2 className="section-title">How InternTrack Works</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              A frictionless journey from campus classroom to industry recruitment offer.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 20,
            }}
          >
            {[
              {
                num: '01',
                title: 'DISCOVER',
                desc: 'Find vetted internship openings matching your engineering branch, CGPA, and technical domain.',
                badge: 'SMART SEARCH',
                color: '#00f2fe',
              },
              {
                num: '02',
                title: 'CHECK',
                desc: 'Understand your exact eligibility match score with real-time recruiter constraint simulation.',
                badge: 'REAL-TIME ENGINE',
                color: '#6366f1',
              },
              {
                num: '03',
                title: 'TRACK',
                desc: 'Follow your application progression step-by-step from screening to final offer selection.',
                badge: 'LIVE PIPELINE',
                color: '#10b981',
              },
            ].map((step, i) => (
              <div
                key={i}
                className="glass-panel"
                style={{
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 36,
                      fontWeight: 800,
                      color: step.color,
                      opacity: 0.9,
                      lineHeight: 1,
                      marginBottom: 12,
                    }}
                  >
                    {step.num}
                  </div>
                  <span className="badge" style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}33`, marginBottom: 10 }}>
                    {step.badge}
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: '8px 0' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: '#94a3b8', lineHeight: 1.5 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
           4. FINAL CALL TO ACTION
      ==================================================== */}
      <section style={{ padding: 'clamp(50px, 7vw, 90px) 0' }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: 'clamp(32px, 6vw, 60px) clamp(20px, 4vw, 40px)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,242,254,0.15)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 4.5vw, 40px)',
                fontWeight: 800,
                color: '#fff',
                marginBottom: 14,
              }}
            >
              Ready to accelerate your career journey?
            </h2>
            <p
              style={{
                fontSize: 14.5,
                color: '#94a3b8',
                maxWidth: 580,
                margin: '0 auto 28px',
                lineHeight: 1.6,
              }}
            >
              Join InternTrack today to unlock verified opportunities, real-time eligibility scores, and campus placement tracking.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12 }}>
              <Link to="/register" className="btn btn-primary btn-lg" style={{ flex: '1 1 200px' }}>
                Create Free Account <ArrowRight size={17} />
              </Link>
              <Link to="/login" className="btn btn-secondary btn-lg" style={{ flex: '1 1 140px' }}>
                Student Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
