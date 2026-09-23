import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Clock, Award, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FloatingHeroCards: React.FC = () => {
  return (
    <div
      className="hero-cards-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 520,
        minHeight: 460,
        margin: '0 auto',
      }}
    >
      {/* Background Center Orb Glow */}
      <div
        className="animate-pulse-glow"
        style={{
          position: 'absolute',
          top: '25%',
          left: '20%',
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,242,254,0.18) 0%, rgba(99,102,241,0.08) 60%, transparent 80%)',
          filter: 'blur(40px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Main Glass Candidate Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hero-main-card"
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'rgba(13, 18, 38, 0.88)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          borderRadius: 24,
          padding: 'clamp(18px, 4vw, 24px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(0,242,254,0.15)',
          marginTop: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span className="section-tag" style={{ margin: 0, fontSize: 10 }}>
            VERIFIED CANDIDATE
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-cyan)', fontWeight: 700 }}>
            94% ELIGIBILITY
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #00f2fe 0%, #6366f1 100%)',
              color: '#050811',
              fontWeight: 800,
              fontSize: 17,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,242,254,0.4)',
              flexShrink: 0,
            }}
          >
            DK
          </div>
          <div>
            <h4 style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>Dinesh Kumar</h4>
            <div style={{ fontSize: 12.5, color: '#94a3b8' }}>B.E. CSE • Cyber Security (2028)</div>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 6,
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 12,
            padding: '10px 12px',
            marginBottom: 14,
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div>
            <div style={{ fontSize: 9.5, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>CGPA</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>
              8.48 <span style={{ fontSize: 10, color: '#64748b' }}>/ 10</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 9.5, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>NPTEL</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#10b981' }}>3 Verified</div>
          </div>
          <div>
            <div style={{ fontSize: 9.5, color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Status</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-cyan)' }}>Interview</div>
          </div>
        </div>

        {/* Skill Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {['Python', 'Cybersecurity', 'Linux', 'SQL', 'Networking'].map((s) => (
            <span
              key={s}
              style={{
                fontSize: 11,
                padding: '3px 9px',
                borderRadius: 99,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#cbd5e1',
              }}
            >
              {s}
            </span>
          ))}
        </div>

        <Link
          to="/opportunities"
          className="btn btn-primary btn-sm"
          style={{ width: '100%', fontSize: 13 }}
        >
          Check Live Eligibility Match <ArrowRight size={14} />
        </Link>
      </motion.div>

      {/* Floating Card 1: 87% Match */}
      <motion.div
        className="animate-float-1 floating-badge badge-match"
        style={{
          position: 'absolute',
          top: -10,
          left: 0,
          zIndex: 20,
          background: 'rgba(10, 14, 30, 0.94)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: 14,
          padding: '8px 14px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <CheckCircle2 size={16} color="#10b981" />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800, color: '#10b981' }}>
          87% Match
        </span>
      </motion.div>

      {/* Floating Card 2: Shortlisted / Interview Scheduled */}
      <motion.div
        className="animate-float-2 floating-badge badge-interview"
        style={{
          position: 'absolute',
          bottom: -15,
          left: 10,
          zIndex: 20,
          background: 'rgba(10, 14, 30, 0.94)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          borderRadius: 14,
          padding: '8px 14px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#6366f1',
            boxShadow: '0 0 8px #6366f1',
          }}
        />
        <div>
          <div style={{ fontSize: 9.5, color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
            SecureNet Labs
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>Interview Scheduled</div>
        </div>
      </motion.div>

      {/* Floating Card 3: ₹25K / Month */}
      <motion.div
        className="animate-float-3 floating-badge badge-stipend"
        style={{
          position: 'absolute',
          bottom: -10,
          right: 10,
          zIndex: 20,
          background: 'rgba(10, 14, 30, 0.94)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 242, 254, 0.4)',
          borderRadius: 14,
          padding: '8px 14px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ fontSize: 9.5, color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
          Peak Stipend
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent-cyan)' }}>₹25,000 / mo</div>
      </motion.div>

      {/* Floating Card 4: 3 Days Left */}
      <motion.div
        className="animate-float-1 floating-badge badge-deadline"
        style={{
          position: 'absolute',
          top: -5,
          right: 0,
          zIndex: 20,
          background: 'rgba(10, 14, 30, 0.94)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(244, 63, 94, 0.4)',
          borderRadius: 14,
          padding: '6px 12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#f43f5e',
            boxShadow: '0 0 6px #f43f5e',
          }}
        />
        <span style={{ fontSize: 11.5, fontWeight: 700, color: '#fff' }}>3 Days Left</span>
      </motion.div>

      <style>{`
        @media (max-width: 640px) {
          .floating-badge {
            display: none !important;
          }
          .hero-main-card {
            margin-top: 0 !important;
          }
          .hero-cards-wrapper {
            min-height: auto !important;
          }
        }
      `}</style>
    </div>
  );
};
