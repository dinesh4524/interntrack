import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { skillsApi } from '../api/client';
import { Skill, StudentSkill } from '../types';
import { Skeleton } from '../components/Skeleton';
import { 
  Layers, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  TrendingUp,
  Cpu,
  Code2,
  Terminal,
  Server
} from 'lucide-react';

export const SkillsPage: React.FC = () => {
  const { profile, refreshProfile } = useAuth();
  const { success, error: toastError } = useToast();

  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkillForRoadmap, setSelectedSkillForRoadmap] = useState<string>('Cybersecurity');

  const [newSkillName, setNewSkillName] = useState('');
  const [newProficiency, setNewProficiency] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skills = await skillsApi.listAll();
        setAllSkills(skills);
      } catch (err) {
        console.warn('Could not load skills catalog:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    try {
      await skillsApi.addStudentSkill(newSkillName.trim(), newProficiency);
      success('Skill Recorded', `${newSkillName} added to your competency matrix.`);
      setNewSkillName('');
      await refreshProfile();
    } catch (err: any) {
      toastError('Error', err.response?.data?.detail || 'Failed to add skill.');
    }
  };

  const handleRemoveSkill = async (id: string, name: string) => {
    try {
      await skillsApi.removeStudentSkill(id);
      success('Skill Removed', `${name} removed.`);
      await refreshProfile();
    } catch (err: any) {
      toastError('Error', 'Failed to remove skill.');
    }
  };

  const roadmaps: Record<string, { title: string; steps: string[] }> = {
    Cybersecurity: {
      title: 'Offensive Security & Red Teaming Roadmap',
      steps: [
        '01. Master Linux commands, socket architecture, and bash scripting',
        '02. Analyze TCP/IP packet handshakes & Wireshark protocol dissecting',
        '03. Practice OWASP Top 10 web vulnerabilities & SQL injection payloads',
        '04. Build automated Python exploit scripts and obtain verified NPTEL certifications',
      ],
    },
    Python: {
      title: 'Enterprise Python & Distributed Systems Roadmap',
      steps: [
        '01. Object-oriented architecture, decorators, generators & async/await concurrency',
        '02. High-performance REST APIs with FastAPI, Pydantic, and SQLAlchemy ORM',
        '03. Unit testing with Pytest and automated GitHub Actions CI/CD workflows',
        '04. Docker containerization and cloud deployment on Render/AWS',
      ],
    },
    Linux: {
      title: 'Linux Systems & Kernel Telemetry Roadmap',
      steps: [
        '01. File permissions, daemon service creation with systemd, and bash automation',
        '02. Socket programming, iptables firewall rule auditing, and SSH key management',
        '03. Process triage, memory heap inspection, and eBPF tracing tools',
        '04. Production container runtime configuration and security hardening',
      ],
    },
    Cloud: {
      title: 'Cloud DevOps & Infrastructure Roadmap',
      steps: [
        '01. Docker containerizing microservices and multi-stage image builds',
        '02. Kubernetes pods, services, ingress controllers, and Helm chart deployments',
        '03. Infrastructure as Code (Terraform) and Neon PostgreSQL cloud scaling',
        '04. Monitoring system uptime with Prometheus metrics and Grafana alerts',
      ],
    },
  };

  const studentSkillNames = new Set(profile?.skills?.map((s) => s.skill.name.toLowerCase()) || []);

  return (
    <div className="container" style={{ padding: '40px 16px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <span className="section-tag">COMPETENCY MATRIX</span>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, color: '#fff' }}>
          Navigate your technical constellation.
        </h1>
        <p style={{ fontSize: 15, color: '#94a3b8', marginTop: 4 }}>
          Add, adjust proficiency, and follow structured industry learning roadmaps for target internships.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 32,
          alignItems: 'flex-start',
        }}
      >
        {/* Left Col: Student Active Skills & Add Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Add Skill Card */}
          <div className="glass-panel" style={{ padding: 24, border: '1px solid rgba(0, 242, 254, 0.25)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 14 }}>
              Add Technical Competency
            </h3>
            <form onSubmit={handleAddSkill} style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <input
                type="text"
                className="form-input"
                required
                placeholder="e.g. Docker, TypeScript, React, Java"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                style={{ flex: 2, minWidth: 180 }}
              />
              <select
                className="form-select"
                value={newProficiency}
                onChange={(e: any) => setNewProficiency(e.target.value)}
                style={{ flex: 1, minWidth: 130 }}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }}>
                <Plus size={16} /> Add Skill
              </button>
            </form>
          </div>

          {/* Active Skills List */}
          <div className="glass-panel" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>
                Your Verified Competency Stack ({profile?.skills?.length || 0})
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {profile?.skills && profile.skills.length > 0 ? (
                profile.skills.map((ss) => (
                  <div
                    key={ss.id}
                    onClick={() => setSelectedSkillForRoadmap(ss.skill.name)}
                    style={{
                      padding: '14px 18px',
                      background: selectedSkillForRoadmap === ss.skill.name ? 'rgba(0, 242, 254, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                      border: selectedSkillForRoadmap === ss.skill.name ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: 14,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          background: 'rgba(0, 242, 254, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent-cyan)',
                          fontWeight: 700,
                        }}
                      >
                        {ss.skill.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: 14.5, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
                          {ss.skill.name}
                          {ss.verified && <ShieldCheck size={14} color="#10b981" />}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                          Proficiency: <strong>{ss.proficiency}</strong>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span
                        className="badge"
                        style={{
                          background: ss.proficiency === 'Advanced' ? 'rgba(16,185,129,0.15)' : 'rgba(0,242,254,0.15)',
                          color: ss.proficiency === 'Advanced' ? '#10b981' : '#00f2fe',
                          fontSize: 11,
                        }}
                      >
                        {ss.proficiency}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSkill(ss.id, ss.skill.name);
                        }}
                        style={{ background: 'none', border: 'none', color: '#fb7185', cursor: 'pointer', padding: 4 }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '30px 0', color: '#64748b', fontSize: 13 }}>
                  No skills recorded. Add your proficiencies above!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Learning Roadmap */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div className="glass-panel" style={{ padding: 28, border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <BookOpen size={18} color="#818cf8" />
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>
                {roadmaps[selectedSkillForRoadmap]?.title || `${selectedSkillForRoadmap} Industry Roadmap`}
              </h3>
            </div>

            <p style={{ fontSize: 13.5, color: '#94a3b8', lineHeight: 1.6, marginBottom: 20 }}>
              Milestone roadmap curated to take students from baseline concepts to production-grade placement readiness.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {(roadmaps[selectedSkillForRoadmap]?.steps || roadmaps['Cybersecurity'].steps).map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: 12,
                    fontSize: 13.5,
                    color: '#cbd5e1',
                    lineHeight: 1.5,
                  }}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Add Preset Skills Chips */}
          <div className="glass-panel" style={{ padding: 24 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
              Popular Campus Skill Tracks (1-Click Add)
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {allSkills.map((sk) => {
                const isAdded = studentSkillNames.has(sk.name.toLowerCase());
                return (
                  <button
                    key={sk.id}
                    type="button"
                    onClick={() => {
                      if (!isAdded) {
                        skillsApi.addStudentSkill(sk.name, 'Intermediate').then(() => refreshProfile());
                      }
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 99,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: isAdded ? 'default' : 'pointer',
                      border: isAdded ? '1px solid #10b98155' : '1px solid rgba(255,255,255,0.1)',
                      background: isAdded ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)',
                      color: isAdded ? '#10b981' : '#94a3b8',
                    }}
                  >
                    {isAdded ? '✓ ' : '+ '}
                    {sk.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
