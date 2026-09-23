import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Compass, 
  Briefcase, 
  CheckCircle, 
  Layers, 
  User as UserIcon, 
  LogOut, 
  LogIn, 
  Menu, 
  X, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(5, 8, 17, 0.92)'
          : 'rgba(5, 8, 17, 0.65)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled
          ? '1px solid rgba(255, 255, 255, 0.08)'
          : '1px solid rgba(255, 255, 255, 0.04)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        {/* Brand Logo */}
        <Link
          to={user ? "/dashboard" : "/"}
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#fff', flexShrink: 0 }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, rgba(0,242,254,0.25) 0%, rgba(99,102,241,0.25) 100%)',
              border: '1px solid rgba(0,242,254,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(0,242,254,0.2)',
            }}
          >
            <ShieldCheck size={18} color="#00f2fe" />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>
            Intern<span style={{ color: 'var(--accent-cyan)' }}>Track</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none' }} className="desktop-nav-links">
          <ul style={{ display: 'flex', alignItems: 'center', gap: 24, listStyle: 'none' }}>
            {!user ? (
              <>
                <li>
                  <Link to="/" style={{ color: location.pathname === '/' ? 'var(--accent-cyan)' : '#94a3b8', textDecoration: 'none', fontSize: 13.5, fontWeight: 600 }}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/opportunities" style={{ color: location.pathname === '/opportunities' ? 'var(--accent-cyan)' : '#94a3b8', textDecoration: 'none', fontSize: 13.5, fontWeight: 600 }}>
                    Opportunities
                  </Link>
                </li>
                <li>
                  <a href="/#how-it-works" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 13.5, fontWeight: 600 }}>
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="/#skills-preview" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 13.5, fontWeight: 600 }}>
                    Skills
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/dashboard" style={{ color: location.pathname === '/dashboard' ? 'var(--accent-cyan)' : '#94a3b8', textDecoration: 'none', fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Compass size={15} /> Overview
                  </Link>
                </li>
                <li>
                  <Link to="/opportunities" style={{ color: location.pathname === '/opportunities' ? 'var(--accent-cyan)' : '#94a3b8', textDecoration: 'none', fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Briefcase size={15} /> Explore
                  </Link>
                </li>
                <li>
                  <Link to="/applications" style={{ color: location.pathname.startsWith('/applications') ? 'var(--accent-cyan)' : '#94a3b8', textDecoration: 'none', fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle size={15} /> Applications
                  </Link>
                </li>
                <li>
                  <Link to="/skills" style={{ color: location.pathname === '/skills' ? 'var(--accent-cyan)' : '#94a3b8', textDecoration: 'none', fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Layers size={15} /> Skills
                  </Link>
                </li>
                {user.role === 'ADMIN' && (
                  <li>
                    <Link to="/admin" style={{ color: location.pathname === '/admin' ? 'var(--accent-amber)' : '#fbbf24', textDecoration: 'none', fontSize: 13.5, fontWeight: 700 }}>
                      ⚡ Admin
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {!user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Link to="/login" className="btn btn-secondary btn-sm" style={{ padding: '6px 14px', fontSize: 12.5 }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm desktop-only-btn" style={{ padding: '6px 14px', fontSize: 12.5 }}>
                Get Started
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
              {/* User Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-full)',
                    padding: '3px 10px 3px 5px',
                    cursor: 'pointer',
                    color: '#fff',
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #00f2fe 0%, #6366f1 100%)',
                      color: '#050811',
                      fontWeight: 800,
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span style={{ fontSize: 12.5, fontWeight: 600 }}>{user.name.split(' ')[0]}</span>
                  <ChevronDown size={13} color="#94a3b8" />
                </button>

                {profileDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 42,
                      width: 210,
                      background: 'rgba(10, 14, 30, 0.96)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 14,
                      boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
                      padding: '6px 0',
                      zIndex: 100,
                    }}
                  >
                    <div style={{ padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{user.name}</div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>{user.email}</div>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 14px',
                        color: '#94a3b8',
                        textDecoration: 'none',
                        fontSize: 13,
                      }}
                    >
                      <UserIcon size={15} /> Student Profile
                    </Link>

                    <Link
                      to="/applications"
                      onClick={() => setProfileDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 14px',
                        color: '#94a3b8',
                        textDecoration: 'none',
                        fontSize: 13,
                      }}
                    >
                      <CheckCircle size={15} /> My Applications
                    </Link>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '4px 0' }} />

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                        navigate('/');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 14px',
                        color: '#fb7185',
                        background: 'none',
                        border: 'none',
                        width: '100%',
                        textAlign: 'left',
                        fontSize: 13,
                        cursor: 'pointer',
                      }}
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Hamburger Button for Public Pages */}
          {!user && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
              }}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu (Public) */}
      {mobileMenuOpen && !user && (
        <div
          style={{
            background: 'rgba(5, 8, 17, 0.98)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '16px 20px 24px',
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <li>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/opportunities" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>
                Explore Opportunities
              </Link>
            </li>
            <li>
              <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 14 }}>
                How It Works
              </a>
            </li>
            <li style={{ paddingTop: 8, display: 'flex', gap: 10 }}>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary" style={{ flex: 1, minHeight: 42 }}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ flex: 1, minHeight: 42 }}>
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) {
          .desktop-nav-links { display: block !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 480px) {
          .desktop-only-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};
