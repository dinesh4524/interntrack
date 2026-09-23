import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ShieldCheck, ArrowRight, Lock, Mail, Sparkles, UserCheck, Eye, EyeOff } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      success('Welcome Back!', 'Logged in successfully.');
      navigate(from, { replace: true });
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Invalid email or password. Please use demo@interntrack.com / Demo@12345';
      toastError('Login Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setLoading(true);
    try {
      await login(demoEmail, demoPass);
      success('Welcome to Demo Account!', `Logged in as ${demoEmail.split('@')[0]}.`);
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      toastError('Demo Login Failed', err.response?.data?.detail || 'Please check backend server status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        position: 'relative',
      }}
    >
      {/* Background glow orbs */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 320,
          height: 320,
          background: 'radial-gradient(circle, rgba(0,242,254,0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
        }}
      />

      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: 920,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
        }}
      >
        {/* Left: Brand Statement Editorial Banner */}
        <div
          style={{
            padding: 'clamp(28px, 5vw, 44px)',
            background: 'linear-gradient(135deg, rgba(8, 14, 34, 0.9) 0%, rgba(5, 8, 17, 0.95) 100%)',
            borderRight: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, rgba(0,242,254,0.2) 0%, rgba(99,102,241,0.2) 100%)',
                  border: '1px solid rgba(0,242,254,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShieldCheck size={20} color="#00f2fe" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 800 }}>
                Intern<span style={{ color: 'var(--accent-cyan)' }}>Track</span>
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(22px, 3.5vw, 30px)',
                fontWeight: 800,
                lineHeight: 1.2,
                color: '#fff',
                marginBottom: 12,
              }}
            >
              Your next career move starts with one login.
            </h2>

            <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>
              Access your real-time eligibility scores, application progression radar, and verified campus placement credentials.
            </p>
          </div>

          {/* 1-Click Demo Buttons */}
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: 10, letterSpacing: '0.04em' }}>
              ⚡ 1-Click Instant Demo Login
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                type="button"
                onClick={() => handleDemoLogin('demo@interntrack.com', 'Demo@12345')}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start', padding: '10px 14px', fontSize: 12.5 }}
                disabled={loading}
              >
                <UserCheck size={16} color="#10b981" />
                <span>Student: <strong>demo@interntrack.com</strong></span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('admin@interntrack.com', 'Admin@12345')}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start', padding: '10px 14px', fontSize: 12.5 }}
                disabled={loading}
              >
                <Sparkles size={16} color="#f59e0b" />
                <span>Admin: <strong>admin@interntrack.com</strong></span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Login Card Form */}
        <div style={{ padding: 'clamp(28px, 5vw, 44px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
              Sign In
            </h3>
            <p style={{ fontSize: 13.5, color: '#94a3b8' }}>
              Enter your credentials to continue to your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="form-input"
                  required
                  placeholder="demo@interntrack.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: 40 }}
                />
                <Mail
                  size={18}
                  color="#64748b"
                  style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label className="form-label" style={{ margin: 0 }}>Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); toastError('Password Reset', 'Please use Demo@12345 or contact placement admin.'); }} style={{ fontSize: 12, color: 'var(--accent-cyan)', textDecoration: 'none' }}>
                  Forgot password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  required
                  placeholder="Demo@12345"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: 40, paddingRight: 44 }}
                />
                <Lock
                  size={18}
                  color="#64748b"
                  style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
                />
                {/* Eye toggle button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 4,
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
              style={{ width: '100%', marginTop: 6 }}
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard →'}
            </button>
          </form>

          <div style={{ marginTop: 20, textAlign: 'center', fontSize: 13, color: '#94a3b8' }}>
            Don't have an account yet?{' '}
            <Link to="/register" style={{ color: 'var(--accent-cyan)', fontWeight: 700, textDecoration: 'none' }}>
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
