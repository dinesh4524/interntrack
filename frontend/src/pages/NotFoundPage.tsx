import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 24,
      }}
    >
      <div className="glass-panel" style={{ padding: '60px 40px', maxWidth: 480 }}>
        <ShieldAlert size={48} color="var(--accent-cyan)" style={{ marginBottom: 16 }} />
        <h1 style={{ fontSize: 48, fontWeight: 800, color: '#fff', marginBottom: 8 }}>404</h1>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
          Page Not Found
        </h2>
        <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          The page or opportunity you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>
    </div>
  );
};
