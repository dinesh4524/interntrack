import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Application } from '../types';
import { applicationsApi } from '../api/client';
import { ApplicationTimeline } from '../components/ApplicationTimeline';
import { Skeleton } from '../components/Skeleton';
import { useToast } from '../context/ToastContext';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Award, 
  Briefcase, 
  ArrowRight, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const ApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const { success, error: toastError } = useToast();

  const fetchApplications = async () => {
    try {
      const data = await applicationsApi.getMyApplications();
      setApplications(data);
    } catch (err) {
      console.warn('Could not load applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAdvanceStage = async (app: Application) => {
    const stageOrder = ['APPLIED', 'SCREENING', 'SHORTLISTED', 'INTERVIEW', 'SELECTED'];
    const currIdx = stageOrder.indexOf(app.status);
    if (currIdx === -1 || currIdx >= stageOrder.length - 1) {
      toastError('Final Stage', 'This application is already at the maximum stage.');
      return;
    }

    const nextStage = stageOrder[currIdx + 1];
    try {
      await applicationsApi.updateStatus(app.id, nextStage, `Candidate advanced to ${nextStage} stage during placement evaluation.`);
      success('Stage Advanced! 🚀', `Application moved to ${nextStage}.`);
      fetchApplications();
    } catch (err: any) {
      toastError('Update Error', err.response?.data?.detail || 'Failed to advance stage.');
    }
  };

  return (
    <div className="container" style={{ padding: '40px 16px 80px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 36 }}>
        <div>
          <span className="section-tag">RECRUITMENT PIPELINE</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, color: '#fff' }}>
            Your career journey in motion.
          </h1>
          <p style={{ fontSize: 15, color: '#94a3b8', marginTop: 4 }}>
            Track every submission stage from initial resume delivery to formal offer selection.
          </p>
        </div>

        <Link to="/opportunities" className="btn btn-primary">
          <Briefcase size={16} /> Apply to More Roles
        </Link>
      </div>

      {/* Applications List */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height={180} borderRadius={16} />
          ))}
        </div>
      ) : applications.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {applications.map((app) => (
            <div
              key={app.id}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '28px 24px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: 'rgba(0, 242, 254, 0.12)',
                      border: '1px solid rgba(0, 242, 254, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: 18,
                      color: 'var(--accent-cyan)',
                    }}
                  >
                    {app.opportunity.company.logo_text || app.opportunity.company.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>
                      {app.opportunity.role}
                    </h3>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                      {app.opportunity.company.name} • Applied on {new Date(app.applied_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    className="badge"
                    style={{
                      background: app.status === 'SELECTED' ? 'rgba(16,185,129,0.15)' : 'rgba(99,102,241,0.15)',
                      color: app.status === 'SELECTED' ? '#10b981' : '#818cf8',
                      border: `1px solid ${app.status === 'SELECTED' ? '#10b98155' : '#818cf855'}`,
                      fontSize: 12,
                      padding: '6px 14px',
                    }}
                  >
                    {app.status}
                  </span>

                  {/* Advance Stage Button for Interactive Demonstration */}
                  {app.status !== 'SELECTED' && app.status !== 'REJECTED' && (
                    <button
                      onClick={() => handleAdvanceStage(app)}
                      className="btn btn-cyan-outline btn-sm"
                      title="Simulate candidate stage advancement"
                      style={{ fontSize: 12, gap: 4 }}
                    >
                      <Zap size={14} /> Advance Stage →
                    </button>
                  )}
                </div>
              </div>

              {/* Timeline Stepper */}
              <div style={{ marginBottom: 16 }}>
                <ApplicationTimeline currentStatus={app.status} />
              </div>

              {/* Footer Actions */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 16,
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  fontSize: 13,
                }}
              >
                <div style={{ color: '#64748b' }}>
                  Match Score: <strong style={{ color: 'var(--accent-cyan)' }}>{app.match_percentage}%</strong>
                  {app.resume_url && (
                    <span style={{ marginLeft: 16 }}>
                      <a href={app.resume_url} target="_blank" rel="noreferrer" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                        🔗 Verified Resume Link
                      </a>
                    </span>
                  )}
                </div>

                <Link
                  to={`/applications/${app.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: 'var(--accent-cyan)',
                    fontWeight: 700,
                    textDecoration: 'none',
                    fontSize: 13,
                  }}
                >
                  View Status History & Notes <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="glass-panel"
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            color: '#94a3b8',
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🚀</div>
          <h3 style={{ fontSize: 18, color: '#fff', marginBottom: 6 }}>No Applications Submitted Yet</h3>
          <p style={{ fontSize: 14, marginBottom: 20 }}>
            Explore available opportunities and submit your profile with 1-click verification.
          </p>
          <Link to="/opportunities" className="btn btn-primary">
            Explore Opportunities Now
          </Link>
        </div>
      )}
    </div>
  );
};
