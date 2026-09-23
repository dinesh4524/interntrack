import React, { useState, useEffect } from 'react';
import { adminApi } from '../api/client';
import { StatCard } from '../components/StatCard';
import { Skeleton } from '../components/Skeleton';
import { ShieldCheck, Users, Briefcase, FileText, CheckCircle2, Award, ExternalLink } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [s, a, u] = await Promise.all([
          adminApi.getStats(),
          adminApi.getApplications(),
          adminApi.getUsers(),
        ]);
        setStats(s);
        setApplications(a);
        setUsersList(u);
      } catch (err) {
        console.warn('Admin fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 16px' }}>
        <Skeleton width={200} height={36} style={{ marginBottom: 24 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height={100} borderRadius={14} />
          ))}
        </div>
        <Skeleton height={400} borderRadius={16} />
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 16px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <span className="section-tag" style={{ color: 'var(--accent-amber)', borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.1)' }}>
          ADMINISTRATOR & PLACEMENT CONSOLE
        </span>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, color: '#fff' }}>
          Platform Analytics & Applicant Pool
        </h1>
        <p style={{ fontSize: 15, color: '#94a3b8', marginTop: 4 }}>
          Live system telemetry, candidate submissions, and campus recruitment metrics.
        </p>
      </div>

      {/* Stats Band */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 20,
          marginBottom: 36,
        }}
      >
        <StatCard label="Total Registered Users" value={stats?.total_users || 0} icon={Users} color="#00f2fe" />
        <StatCard label="Active Opportunities" value={stats?.total_opportunities || 0} icon={Briefcase} color="#6366f1" />
        <StatCard label="Total Applications" value={stats?.total_applications || 0} icon={FileText} color="#8b5cf6" />
        <StatCard label="Shortlisted / Offers" value={stats?.shortlisted || 0} icon={Award} color="#10b981" />
      </div>

      {/* Applications Table */}
      <div className="glass-panel" style={{ padding: 28, marginBottom: 36 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 20 }}>
          Recent Candidate Applications
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5, textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                <th style={{ padding: '12px 14px' }}>Student</th>
                <th style={{ padding: '12px 14px' }}>Role & Company</th>
                <th style={{ padding: '12px 14px' }}>Branch & CGPA</th>
                <th style={{ padding: '12px 14px' }}>Match %</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
                <th style={{ padding: '12px 14px' }}>Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '14px' }}>
                    <div style={{ fontWeight: 700, color: '#fff' }}>{app.student_name}</div>
                    <div style={{ fontSize: 11.5, color: '#64748b' }}>{app.student_email}</div>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{app.role}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{app.company}</div>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <div>{app.branch}</div>
                    <div style={{ fontSize: 12, color: 'var(--accent-cyan)' }}>CGPA: {app.cgpa}</div>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <strong style={{ color: app.match_percentage >= 85 ? '#10b981' : '#00f2fe' }}>
                      {app.match_percentage}%
                    </strong>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <span className="badge badge-indigo">{app.status}</span>
                  </td>
                  <td style={{ padding: '14px' }}>
                    {app.resume_url ? (
                      <a href={app.resume_url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>
                        View ↗
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registered Users Table */}
      <div className="glass-panel" style={{ padding: 28 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 20 }}>
          Registered Accounts
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5, textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                <th style={{ padding: '12px 14px' }}>Name</th>
                <th style={{ padding: '12px 14px' }}>Email</th>
                <th style={{ padding: '12px 14px' }}>Role</th>
                <th style={{ padding: '12px 14px' }}>College & Branch</th>
                <th style={{ padding: '12px 14px' }}>Joined</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '14px', fontWeight: 700, color: '#fff' }}>{u.name}</td>
                  <td style={{ padding: '14px', color: '#94a3b8' }}>{u.email}</td>
                  <td style={{ padding: '14px' }}>
                    <span className={u.role === 'ADMIN' ? 'badge badge-amber' : 'badge badge-cyan'}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '14px', color: '#cbd5e1' }}>
                    {u.college} • {u.branch}
                  </td>
                  <td style={{ padding: '14px', color: '#64748b', fontSize: 12 }}>
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
