import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Github, Linkedin, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: '#03050c',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '60px 0 30px',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 40,
            marginBottom: 48,
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, rgba(0,242,254,0.2) 0%, rgba(99,102,241,0.2) 100%)',
                  border: '1px solid rgba(0,242,254,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShieldCheck size={18} color="#00f2fe" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800 }}>
                Intern<span style={{ color: 'var(--accent-cyan)' }}>Track</span>
              </span>
            </div>
            <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.6, maxWidth: 280 }}>
              The student internship & campus placement portal powered by real-time eligibility evaluation and live recruitment pipeline telemetry.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Platform</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <Link to="/opportunities" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 13.5 }}>
                  Explore Opportunities
                </Link>
              </li>
              <li>
                <Link to="/skills" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 13.5 }}>
                  Skill Competency Graph
                </Link>
              </li>
              <li>
                <Link to="/login" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 13.5 }}>
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/register" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 13.5 }}>
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Zero-Cost Stack</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#94a3b8' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00f2fe' }}></span>
                Frontend: Vercel SPA (React/TS/Vite)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }}></span>
                Backend: Render (FastAPI/Python)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></span>
                Database: Neon PostgreSQL
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Student Excellence</div>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
              Crafted for Dinesh Kumar (B.E. CSE Cyber Security • Class of 2028).
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <a
                href="https://github.com/dinesh4524"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94a3b8',
                }}
              >
                <Github size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94a3b8',
                }}
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            fontSize: 12.5,
            color: '#475569',
          }}
        >
          <div>© 2026 InternTrack. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>Built with precision for campus placements</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
