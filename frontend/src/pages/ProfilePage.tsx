import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { profileApi, projectsApi, certificationsApi } from '../api/client';
import { Project, Certification } from '../types';
import { Skeleton } from '../components/Skeleton';
import { 
  User, 
  GraduationCap, 
  Building2, 
  Award, 
  Plus, 
  Trash2, 
  Edit3, 
  Github, 
  Globe, 
  ExternalLink, 
  ShieldCheck, 
  Save, 
  CheckCircle2,
  FileCode,
  Link2
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { success, error: toastError } = useToast();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    college: '',
    degree: '',
    branch: '',
    cgpa: 8.48,
    graduation_year: 2028,
    bio: '',
    location: '',
    resume_url: '',
  });

  // Project Modal / Form
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: '',
    github_url: '',
    live_url: '',
  });

  // Certification Modal / Form
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [certForm, setCertForm] = useState({
    title: '',
    organization: '',
    issue_date: '',
    credential_url: '',
    verified: true,
  });

  useEffect(() => {
    if (profile) {
      setProfileForm({
        college: profile.college || 'College of Engineering',
        degree: profile.degree || 'B.E. Computer Science & Engineering',
        branch: profile.branch || 'Cyber Security',
        cgpa: profile.cgpa || 8.48,
        graduation_year: profile.graduation_year || 2028,
        bio: profile.bio || 'Passionate undergraduate security researcher.',
        location: profile.location || 'Bangalore, India',
        resume_url: profile.resume_url || 'https://drive.google.com/file/d/demo-resume/view',
      });
    }
  }, [profile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await profileApi.updateProfile(profileForm);
      await refreshProfile();
      success('Profile Updated', 'Your student metrics have been updated successfully.');
      setIsEditingProfile(false);
    } catch (err: any) {
      toastError('Save Error', err.response?.data?.detail || 'Failed to update profile.');
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await projectsApi.update(editingProject.id, projectForm);
        success('Project Updated', `${projectForm.title} updated.`);
      } else {
        await projectsApi.create(projectForm);
        success('Project Added 🚀', `${projectForm.title} added to portfolio.`);
      }
      setIsProjectModalOpen(false);
      setEditingProject(null);
      setProjectForm({ title: '', description: '', technologies: '', github_url: '', live_url: '' });
      await refreshProfile();
    } catch (err: any) {
      toastError('Error', err.response?.data?.detail || 'Failed to save project.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await projectsApi.delete(id);
      success('Project Deleted', 'Project removed from profile.');
      await refreshProfile();
    } catch (err: any) {
      toastError('Error', 'Failed to delete project.');
    }
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await certificationsApi.create(certForm);
      success('Certification Added 📜', `${certForm.title} recorded.`);
      setIsCertModalOpen(false);
      setCertForm({ title: '', organization: '', issue_date: '', credential_url: '', verified: true });
      await refreshProfile();
    } catch (err: any) {
      toastError('Error', 'Failed to add certification.');
    }
  };

  const handleDeleteCert = async (id: string) => {
    try {
      await certificationsApi.delete(id);
      success('Certification Removed', 'Credential removed from profile.');
      await refreshProfile();
    } catch (err: any) {
      toastError('Error', 'Failed to delete certification.');
    }
  };

  return (
    <div className="container" style={{ padding: '40px 16px 80px' }}>
      {/* Top Banner Card */}
      <div
        className="glass-panel"
        style={{
          padding: 36,
          marginBottom: 36,
          border: '1px solid rgba(0, 242, 254, 0.25)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: 'linear-gradient(135deg, #00f2fe 0%, #6366f1 100%)',
                color: '#050811',
                fontWeight: 800,
                fontSize: 26,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(0,242,254,0.3)',
              }}
            >
              {user?.name.slice(0, 2).toUpperCase()}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 800, color: '#fff' }}>
                  {user?.name}
                </h1>
                <span className="badge badge-emerald" style={{ fontSize: 11 }}>
                  <ShieldCheck size={14} /> Verified Student
                </span>
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
                {profile?.degree} • {profile?.branch} • {profile?.college}
              </div>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
                Graduation: Class of {profile?.graduation_year || 2028} • CGPA: {profile?.cgpa || 8.48} / 10.0
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="btn btn-secondary btn-sm"
            >
              <Edit3 size={15} /> {isEditingProfile ? 'Cancel Edit' : 'Edit Academic Metrics'}
            </button>

            {/* Profile Completion Bar */}
            <div style={{ width: 200 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: '#94a3b8' }}>Profile Completion</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  {profile?.profile_completion || 85}%
                </span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${profile?.profile_completion || 85}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #00f2fe, #6366f1)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        {profile?.bio && (
          <p style={{ fontSize: 14, color: '#94a3b8', marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {profile.bio}
          </p>
        )}
      </div>

      {/* Edit Profile Form */}
      {isEditingProfile && (
        <div className="glass-panel" style={{ padding: 28, marginBottom: 36, border: '1px solid var(--accent-cyan)' }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 16 }}>
            Update Academic Profile & Credentials
          </h3>
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
              <div>
                <label className="form-label">College / University</label>
                <input
                  type="text"
                  className="form-input"
                  value={profileForm.college}
                  onChange={(e) => setProfileForm({ ...profileForm, college: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Degree</label>
                <input
                  type="text"
                  className="form-input"
                  value={profileForm.degree}
                  onChange={(e) => setProfileForm({ ...profileForm, degree: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Branch / Major</label>
                <input
                  type="text"
                  className="form-input"
                  value={profileForm.branch}
                  onChange={(e) => setProfileForm({ ...profileForm, branch: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-input"
                  value={profileForm.cgpa}
                  onChange={(e) => setProfileForm({ ...profileForm, cgpa: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="form-label">Verified Resume URL (Google Drive, GitHub, or Portfolio)</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://drive.google.com/..."
                value={profileForm.resume_url}
                onChange={(e) => setProfileForm({ ...profileForm, resume_url: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Bio / Academic Summary</label>
              <textarea
                className="form-textarea"
                rows={2}
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button type="button" onClick={() => setIsEditingProfile(false)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                <Save size={14} /> Save Profile
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Sections: Featured Projects & Verified Certifications */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 32,
        }}
      >
        {/* Projects Section */}
        <div className="glass-panel" style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileCode size={18} color="var(--accent-cyan)" /> Engineering Projects ({profile?.projects?.length || 0})
            </h3>
            <button
              onClick={() => {
                setEditingProject(null);
                setProjectForm({ title: '', description: '', technologies: '', github_url: '', live_url: '' });
                setIsProjectModalOpen(true);
              }}
              className="btn btn-primary btn-sm"
              style={{ fontSize: 12 }}
            >
              <Plus size={14} /> Add Project
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {profile?.projects && profile.projects.length > 0 ? (
              profile.projects.map((proj) => (
                <div
                  key={proj.id}
                  style={{
                    padding: 18,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: 14,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{proj.title}</h4>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setProjectForm({
                            title: proj.title,
                            description: proj.description,
                            technologies: proj.technologies || '',
                            github_url: proj.github_url || '',
                            live_url: proj.live_url || '',
                          });
                          setIsProjectModalOpen(true);
                        }}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        style={{ background: 'none', border: 'none', color: '#fb7185', cursor: 'pointer' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5, marginBottom: 12 }}>
                    {proj.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <span style={{ fontSize: 11.5, color: 'var(--accent-cyan)' }}>
                      {proj.technologies}
                    </span>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {proj.github_url && (
                        <a href={proj.github_url} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                          <Github size={14} /> Repository
                        </a>
                      )}
                      {proj.live_url && (
                        <a href={proj.live_url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                          <Globe size={14} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 0', color: '#64748b', fontSize: 13 }}>
                No projects added yet. Click "+ Add Project" to build your portfolio.
              </div>
            )}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="glass-panel" style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award size={18} color="#10b981" /> Verified Credentials ({profile?.certifications?.length || 0})
            </h3>
            <button
              onClick={() => setIsCertModalOpen(true)}
              className="btn btn-primary btn-sm"
              style={{ fontSize: 12 }}
            >
              <Plus size={14} /> Add Certificate
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {profile?.certifications && profile.certifications.length > 0 ? (
              profile.certifications.map((cert) => (
                <div
                  key={cert.id}
                  style={{
                    padding: 16,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <h4 style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{cert.title}</h4>
                      {cert.verified && <ShieldCheck size={15} color="#10b981" />}
                    </div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
                      {cert.organization} • {cert.issue_date || 'Verified Credential'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {cert.credential_url && (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 10px', fontSize: 11 }}
                      >
                        Verify ↗
                      </a>
                    )}
                    <button
                      onClick={() => handleDeleteCert(cert.id)}
                      style={{ background: 'none', border: 'none', color: '#fb7185', cursor: 'pointer' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 0', color: '#64748b', fontSize: 13 }}>
                No certifications added yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {isProjectModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(5, 8, 17, 0.85)',
            backdropFilter: 'blur(12px)',
            padding: 16,
          }}
          onClick={() => setIsProjectModalOpen(false)}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: 540,
              padding: 28,
              background: 'rgba(10, 14, 30, 0.98)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 16 }}>
              {editingProject ? 'Edit Project' : 'Add New Engineering Project'}
            </h3>
            <form onSubmit={handleSaveProject} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="form-label">Project Title</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Phishing Email Detector"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Technologies Used</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Python, FastAPI, React, Docker"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Description & Impact</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  required
                  placeholder="Summarize the problem solved and core architectural telemetry..."
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label className="form-label">GitHub URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://github.com/..."
                    value={projectForm.github_url}
                    onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Live App URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://..."
                    value={projectForm.live_url}
                    onChange={(e) => setProjectForm({ ...projectForm, live_url: e.target.value })}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
                <button type="button" onClick={() => setIsProjectModalOpen(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {isCertModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(5, 8, 17, 0.85)',
            backdropFilter: 'blur(12px)',
            padding: 16,
          }}
          onClick={() => setIsCertModalOpen(false)}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: 500,
              padding: 28,
              background: 'rgba(10, 14, 30, 0.98)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 16 }}>
              Add Verified Credential
            </h3>
            <form onSubmit={handleSaveCert} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="form-label">Certification Title</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Cybersecurity and Privacy"
                  value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Issuing Organization</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. NPTEL — IIT Madras"
                  value={certForm.organization}
                  onChange={(e) => setCertForm({ ...certForm, organization: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Date / Session</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Apr 2026"
                  value={certForm.issue_date}
                  onChange={(e) => setCertForm({ ...certForm, issue_date: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Verification URL</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://nptel.ac.in/noc/..."
                  value={certForm.credential_url}
                  onChange={(e) => setCertForm({ ...certForm, credential_url: e.target.value })}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
                <button type="button" onClick={() => setIsCertModalOpen(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Record Credential
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
