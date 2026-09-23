import React, { useState, useEffect } from 'react';
import { Opportunity } from '../types';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { applicationsApi } from '../api/client';
import { X, CheckCircle2, ShieldCheck, Link2, Send, AlertCircle } from 'lucide-react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity | null;
  onSuccess?: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  opportunity,
  onSuccess,
}) => {
  const { user, profile } = useAuth();
  const { success, error: toastError } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+91 9876543210',
    college: '',
    branch: '',
    cgpa: 8.48,
    graduation_year: 2028,
    resume_url: '',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user && profile) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: '+91 9876543210',
        college: profile.college || 'College of Engineering',
        branch: profile.branch || 'Cyber Security',
        cgpa: profile.cgpa || 8.48,
        graduation_year: profile.graduation_year || 2028,
        resume_url: profile.resume_url || 'https://drive.google.com/file/d/demo-resume-sample/view',
        notes: `Excited to apply for the ${opportunity?.role} role!`,
      });
    }
  }, [user, profile, opportunity]);

  if (!isOpen || !opportunity) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.resume_url || !formData.resume_url.startsWith('http')) {
      toastError('Invalid Resume Link', 'Please provide a valid URL (Google Drive, GitHub, or Portfolio link).');
      return;
    }

    setSubmitting(true);
    try {
      await applicationsApi.submit({
        opportunity_id: opportunity.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        branch: formData.branch,
        cgpa: Number(formData.cgpa),
        graduation_year: Number(formData.graduation_year),
        resume_url: formData.resume_url,
        notes: formData.notes,
      });

      success('Application Submitted!', `Your application for ${opportunity.role} at ${opportunity.company.name} was successfully sent.`);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Failed to submit application. Please try again.';
      toastError('Application Error', msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
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
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: 620,
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 28,
          position: 'relative',
          background: 'rgba(10, 14, 30, 0.96)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 30px rgba(0,242,254,0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <span className="section-tag" style={{ margin: 0, fontSize: 10 }}>
              DIRECT RECRUITMENT APPLICATION
            </span>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 6 }}>
              {opportunity.role}
            </h2>
            <div style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>
              {opportunity.company.name} • {opportunity.location} ({opportunity.work_mode})
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: 'none',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Opportunity Summary pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(0, 242, 254, 0.05)',
            border: '1px solid rgba(0, 242, 254, 0.15)',
            borderRadius: 12,
            padding: '10px 16px',
            marginBottom: 20,
            fontSize: 13,
          }}
        >
          <div>
            <span style={{ color: '#64748b' }}>Stipend:</span>{' '}
            <strong style={{ color: 'var(--accent-cyan)' }}>{opportunity.stipend}</strong>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>Min CGPA:</span>{' '}
            <strong style={{ color: '#fff' }}>{opportunity.min_cgpa}</strong>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>Duration:</span>{' '}
            <strong style={{ color: '#fff' }}>{opportunity.duration}</strong>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14 }}>
            <div>
              <label className="form-label">Branch / Specialization</label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">CGPA</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                required
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <label className="form-label">Grad Year</label>
              <input
                type="number"
                className="form-input"
                required
                value={formData.graduation_year}
                onChange={(e) => setFormData({ ...formData, graduation_year: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Link2 size={14} color="var(--accent-cyan)" /> Resume URL (Google Drive / GitHub / Portfolio link)
            </label>
            <input
              type="url"
              className="form-input"
              required
              placeholder="https://drive.google.com/file/d/... or https://github.com/..."
              value={formData.resume_url}
              onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
            />
            <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 4 }}>
              💡 Zero-cost architecture: Host your resume on Google Drive / Notion / GitHub and paste the viewable link.
            </div>
          </div>

          <div>
            <label className="form-label">Candidate Note / Cover Note</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Briefly highlight your relevant projects or certifications..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 10 }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              style={{ minWidth: 160 }}
            >
              {submitting ? 'Submitting...' : 'Submit Application →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
