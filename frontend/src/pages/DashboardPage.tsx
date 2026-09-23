import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dashboardApi, notificationsApi } from '../api/client';
import { DashboardData, Opportunity, Application } from '../types';
import { StatCard } from '../components/StatCard';
import { OpportunityCard } from '../components/OpportunityCard';
import { ApplicationTimeline } from '../components/ApplicationTimeline';
import { ApplyModal } from '../components/ApplyModal';
import { EligibilityModal } from '../components/EligibilityModal';
import { Skeleton } from '../components/Skeleton';
import { 
  Compass, 
  CheckCircle, 
  Clock, 
  Award, 
  Briefcase, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Bell, 
  Layers, 
  UserCheck, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // Modals
  const [selectedOppForApply, setSelectedOppForApply] = useState<Opportunity | null>(null);
  const [selectedOppForElig, setSelectedOppForElig] = useState<Opportunity | null>(null);

  const fetchDashboard = async () => {
    try {
      const res = await dashboardApi.get();
      setData(res);
    } catch (err) {
      console.warn('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleMarkNotifRead = async (id: string) => {
    try {
      await notificationsApi.markAsRead(id);
      fetchDashboard();
    } catch (err) {
      console.warn('Mark read error:', err);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: 'clamp(24px, 4vw, 40px) 16px' }}>
        <div style={{ marginBottom: 28 }}>
          <Skeleton width="40%" height={32} style={{ marginBottom: 8 }} />
          <Skeleton width="25%" height={18} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 28 }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height={100} borderRadius={14} />
          ))}
        </div>
        <Skeleton height={260} borderRadius={18} style={{ marginBottom: 28 }} />
      </div>
    );
  }

  const firstName = user?.name ? user.name.split(' ')[0] : 'Candidate';

  return (
    <div className="container" style={{ padding: 'clamp(24px, 4vw, 40px) 16px 80px', width: '100%', overflowX: 'hidden' }}>
      {/* Top Greeting Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span className="section-tag" style={{ margin: 0, fontSize: 10 }}>STUDENT EXECUTIVE PORTAL</span>
            <span style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>• Class of 2028</span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#fff', lineHeight: 1.15 }}>
            {getGreeting()}, <span style={{ color: 'var(--accent-cyan)' }}>{firstName}</span>.
          </h1>
          <p style={{ fontSize: 14, color: '#94a3b8', marginTop: 2 }}>
            Here's your career overview and active recruitment pipeline telemetry.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', width: 'auto' }}>
          <Link to="/opportunities" className="btn btn-primary btn-sm" style={{ padding: '8px 16px' }}>
            <Compass size={15} /> Browse Opportunities
          </Link>
          <Link to="/profile" className="btn btn-secondary btn-sm" style={{ padding: '8px 16px' }}>
            Profile ({data?.statistics.profile_completion || 85}%)
          </Link>
        </div>
      </div>

      {/* Statistics Cards Band (2x2 on phones, 4x1 on desktop) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'clamp(10px, 2vw, 18px)',
          marginBottom: 32,
        }}
      >
        <StatCard
          label="Total Applications"
          value={data?.statistics.total_applications || 0}
          icon={Briefcase}
          color="var(--accent-cyan)"
          change="Submitted & active in pipeline"
        />
        <StatCard
          label="Shortlisted Roles"
          value={data?.statistics.shortlisted || 0}
          icon={CheckCircle}
          color="#10b981"
          change="Passed preliminary screening"
        />
        <StatCard
          label="Interview Rounds"
          value={data?.statistics.interviews || 0}
          icon={Calendar}
          color="#8b5cf6"
          change="Scheduled technical rounds"
        />
        <StatCard
          label="Upcoming Deadlines"
          value={data?.statistics.upcoming_deadlines_count || 0}
          icon={Clock}
          color="#f43f5e"
          change="Closing in next 14 days"
        />
      </div>

      {/* Main Grid: Recommended Opportunities + Radar & Notifications */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(20px, 3vw, 32px)',
          alignItems: 'flex-start',
        }}
      >
        {/* Left Column: Active Stepper & Opportunities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Active Application Stepper */}
          <div className="glass-panel" style={{ padding: 'clamp(16px, 3vw, 24px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>
                  Application Journey Pipeline
                </h3>
                <p style={{ fontSize: 12, color: '#94a3b8' }}>
                  Multi-stage recruitment progression
                </p>
              </div>
              <Link to="/applications" style={{ fontSize: 12.5, color: 'var(--accent-cyan)', fontWeight: 600, textDecoration: 'none' }}>
                View All ({data?.recent_applications.length || 0}) →
              </Link>
            </div>

            {data?.recent_applications && data.recent_applications.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {data.recent_applications.slice(0, 2).map((app) => (
                  <div
                    key={app.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: 14,
                      padding: '14px 16px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
                      <div>
                        <div style={{ fontSize: 14.5, fontWeight: 700, color: '#fff' }}>{app.opportunity.role}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                          {app.opportunity.company.name} • {new Date(app.applied_at).toLocaleDateString()}
                        </div>
                      </div>
                      <span className="badge badge-indigo" style={{ fontSize: 10 }}>
                        {app.status}
                      </span>
                    </div>

                    <ApplicationTimeline currentStatus={app.status} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 16px', color: '#64748b', fontSize: 13.5 }}>
                No active applications yet. Browse opportunities below!
              </div>
            )}
          </div>

          {/* Recommended Opportunities for Candidate */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
              <div>
                <span className="section-tag" style={{ margin: 0, fontSize: 10 }}>RECOMMENDED FOR YOUR PROFILE</span>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginTop: 4 }}>
                  High-Match Internships
                </h2>
              </div>
              <Link to="/opportunities" style={{ fontSize: 12.5, color: 'var(--accent-cyan)', fontWeight: 600, textDecoration: 'none' }}>
                Explore All →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
              {data?.recommended_opportunities.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  onApply={(o) => setSelectedOppForApply(o)}
                  onCheckEligibility={(o) => setSelectedOppForElig(o)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Deadlines Radar + Notifications */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Upcoming Deadlines Radar */}
          <div className="glass-panel" style={{ padding: 'clamp(16px, 3vw, 24px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Clock size={16} color="#f43f5e" />
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>
                Urgent Deadlines Radar
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data?.upcoming_deadlines.map((dl) => (
                <div
                  key={dl.opportunity_id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: 12,
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{dl.role}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{dl.company_name}</div>
                  </div>

                  <span
                    className="badge"
                    style={{
                      background: dl.days_remaining <= 3 ? 'rgba(244,63,94,0.15)' : 'rgba(245,158,11,0.15)',
                      color: dl.days_remaining <= 3 ? '#fb7185' : '#fbbf24',
                      fontSize: 10.5,
                      padding: '3px 8px',
                    }}
                  >
                    {dl.days_remaining}d left
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Campus Placement Notifications */}
          <div className="glass-panel" style={{ padding: 'clamp(16px, 3vw, 24px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Bell size={16} color="var(--accent-cyan)" />
                <h3 style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>
                  Placement Alerts
                </h3>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {data?.notifications && data.notifications.length > 0 ? (
                data.notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleMarkNotifRead(n.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 10,
                      background: n.is_read ? 'rgba(255,255,255,0.02)' : 'rgba(0, 242, 254, 0.06)',
                      border: n.is_read ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0, 242, 254, 0.2)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: '#fff' }}>{n.title}</div>
                      {!n.is_read && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00f2fe' }} />}
                    </div>
                    <div style={{ fontSize: 11.5, color: '#94a3b8', lineHeight: 1.4 }}>{n.message}</div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '16px 0', color: '#64748b', fontSize: 12.5 }}>
                  No new notifications.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ApplyModal
        isOpen={!!selectedOppForApply}
        onClose={() => setSelectedOppForApply(null)}
        opportunity={selectedOppForApply}
        onSuccess={fetchDashboard}
      />

      <EligibilityModal
        isOpen={!!selectedOppForElig}
        onClose={() => setSelectedOppForElig(null)}
        opportunity={selectedOppForElig}
        onApplyNow={(opp) => {
          setSelectedOppForElig(null);
          setSelectedOppForApply(opp);
        }}
      />
    </div>
  );
};
