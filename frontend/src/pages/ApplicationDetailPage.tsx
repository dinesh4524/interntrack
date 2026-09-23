import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Application } from '../types';
import { applicationsApi } from '../api/client';
import { ApplicationTimeline } from '../components/ApplicationTimeline';
import { Skeleton } from '../components/Skeleton';
import { ArrowLeft, CheckCircle2, Clock, Calendar, ShieldCheck, MapPin, DollarSign, FileText } from 'lucide-react';

export const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await applicationsApi.getById(id);
        setApplication(data);
      } catch (err) {
        console.warn('Could not load application detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 16px' }}>
        <Skeleton width={120} height={32} style={{ marginBottom: 24 }} />
        <Skeleton height={200} borderRadius={16} style={{ marginBottom: 24 }} />
        <Skeleton height={300} borderRadius={16} />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="container" style={{ padding: '60px 16px', textAlign: 'center' }}>
        <h2>Application Not Found</h2>
        <Link to="/applications" className="btn btn-primary" style={{ marginTop: 20 }}>
          Back to Applications
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 16px 80px' }}>
      <Link
        to="/applications"
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
        <ArrowLeft size={16} /> Back to Applications Pipeline
      </Link>

      {/* Main Glass Overview Card */}
      <div
        className="glass-panel"
        style={{
          padding: '36px 32px',
          marginBottom: 32,
          border: '1px solid rgba(0, 242, 254, 0.25)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 24 }}>
          <div>
            <span className="section-tag" style={{ margin: 0, fontSize: 10 }}>APPLICATION RECORD</span>
            <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 800, color: '#fff', marginTop: 6 }}>
              {application.opportunity.role}
            </h1>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              {application.opportunity.company.name} • Applied on {new Date(application.applied_at).toLocaleDateString()}
            </div>
          </div>

          <span
            className="badge badge-cyan"
            style={{ fontSize: 14, padding: '8px 18px' }}
          >
            STATUS: {application.status}
          </span>
        </div>

        {/* Timeline */}
        <div style={{ padding: '16px 0 24px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <ApplicationTimeline currentStatus={application.status} />
        </div>

        {/* Meta Stats */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, paddingTop: 20, fontSize: 13.5, color: '#94a3b8' }}>
          <span><strong>Stipend:</strong> {application.opportunity.stipend}</span>
          <span><strong>Location:</strong> {application.opportunity.location} ({application.opportunity.work_mode})</span>
          <span><strong>Match Score:</strong> {application.match_percentage}%</span>
          {application.resume_url && (
            <span>
              <strong>Resume:</strong>{' '}
              <a href={application.resume_url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>
                View Link ↗
              </a>
            </span>
          )}
        </div>
      </div>

      {/* Status History Log */}
      <div className="glass-panel" style={{ padding: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FileText size={18} color="var(--accent-cyan)" /> Application Timeline & Stage Logs
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {application.status_history && application.status_history.length > 0 ? (
            application.status_history.map((hist, index) => (
              <div
                key={hist.id || index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  padding: '14px 18px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: 14,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'rgba(0, 242, 254, 0.15)',
                    border: '1px solid rgba(0, 242, 254, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle2 size={16} color="var(--accent-cyan)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
                      Stage: {hist.status}
                    </span>
                    <span style={{ fontSize: 12, color: '#64748b' }}>
                      {new Date(hist.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                    {hist.note || 'Status updated.'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div style={{ color: '#64748b', fontSize: 13 }}>No status history logs recorded.</div>
          )}
        </div>
      </div>
    </div>
  );
};
