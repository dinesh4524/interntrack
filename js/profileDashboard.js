/* Student Profile & Executive Dashboard Module */
import { store } from './state.js';

export function initProfileDashboard() {
  const container = document.getElementById('student-profile-mount');
  if (!container) return;

  function render() {
    const state = store.getState();
    const p = state.profile;
    const apps = state.applications;
    const shortlistedCount = apps.filter(a => a.status === 'Shortlisted' || a.statusStage >= 2).length;
    const interviewCount = apps.filter(a => a.status === 'Interview' || a.statusStage >= 3).length;

    // Circumference for 85% completion ring (r = 38 => circ = 2 * PI * 38 = 238.76)
    const circ = 238.76;
    const offset = circ - (p.profileCompletion / 100) * circ;

    container.innerHTML = `
      <!-- Profile Header Hero -->
      <div class="profile-hero-card">
        <div class="profile-avatar-large">
          ${p.avatarText}
        </div>

        <div class="profile-info">
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 6px;">
            <h2 style="margin-bottom: 0;">${p.name}</h2>
            <span class="profile-badge highlight" style="display: inline-flex; align-items: center; gap: 4px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Verified Candidate
            </span>
          </div>
          <div class="profile-degree">
            ${p.degree} • <span style="color: #fff;">${p.specialization}</span>
          </div>
          <div class="profile-meta-badges">
            <span class="profile-badge">CGPA: <strong style="color: #fff;">${p.cgpa}</strong> / 10.0</span>
            <span class="profile-badge">Class of <strong style="color: #fff;">${p.graduationYear}</strong></span>
            <span class="profile-badge">${p.institution}</span>
            <span class="profile-badge">📍 ${p.location}</span>
          </div>
        </div>

        <!-- 85% Completion Dial -->
        <div class="profile-completion-ring">
          <div style="position: relative; width: 90px; height: 90px; margin: 0 auto 8px;">
            <svg style="transform: rotate(-90deg); width: 100%; height: 100%;" viewBox="0 0 90 90">
              <circle cx="45" cy="45" r="38" stroke="rgba(255,255,255,0.08)" stroke-width="7" fill="none" />
              <circle cx="45" cy="45" r="38" stroke="url(#gauge-gradient)" stroke-width="7" fill="none" stroke-linecap="round"
                stroke-dasharray="${circ}" stroke-dashoffset="${offset}" />
            </svg>
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: var(--font-display); font-size: 20px; font-weight: 800; color: #fff;">
              ${p.profileCompletion}%
            </div>
          </div>
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; color: var(--text-secondary);">
            Profile Strength
          </span>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 40px;">
        <div class="card-opportunity" style="padding: 20px;">
          <span style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Total Submitted</span>
          <div style="font-family: var(--font-display); font-size: 36px; font-weight: 800; color: #fff; margin: 6px 0;">${apps.length}</div>
          <span style="font-size: 12px; color: var(--accent-cyan);">Active In Pipeline</span>
        </div>

        <div class="card-opportunity" style="padding: 20px;">
          <span style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Shortlisted</span>
          <div style="font-family: var(--font-display); font-size: 36px; font-weight: 800; color: var(--accent-emerald); margin: 6px 0;">${shortlistedCount}</div>
          <span style="font-size: 12px; color: var(--text-secondary);">High Match Priority</span>
        </div>

        <div class="card-opportunity" style="padding: 20px;">
          <span style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Interviews</span>
          <div style="font-family: var(--font-display); font-size: 36px; font-weight: 800; color: var(--accent-indigo); margin: 6px 0;">${interviewCount}</div>
          <span style="font-size: 12px; color: var(--text-secondary);">Technical Rounds</span>
        </div>

        <div class="card-opportunity" style="padding: 20px;">
          <span style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Saved Bookmarks</span>
          <div style="font-family: var(--font-display); font-size: 36px; font-weight: 800; color: var(--accent-amber); margin: 6px 0;">${state.bookmarks.length}</div>
          <span style="font-size: 12px; color: var(--text-secondary);">Tracked Openings</span>
        </div>
      </div>

      <!-- Verified Certifications Showcase -->
      <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <h3 style="font-family: var(--font-display); font-size: 24px; color: #fff;">
            Verified NPTEL Certifications
          </h3>
          <span class="section-tag" style="margin-bottom: 0;">National Registry Verified</span>
        </div>

        <div class="showcase-grid">
          ${p.certifications.map(cert => `
            <div class="showcase-card">
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                  <span class="profile-badge highlight" style="font-size: 11px;">${cert.grade}</span>
                  <span style="font-size: 12px; color: var(--text-muted);">${cert.date}</span>
                </div>
                <h4 style="font-family: var(--font-display); font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 6px;">
                  ${cert.name}
                </h4>
                <p style="font-size: 13px; color: var(--text-secondary);">
                  ${cert.issuer}
                </p>
              </div>
              <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--accent-emerald);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Digital Credential Authenticated
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Featured Engineering Projects -->
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <h3 style="font-family: var(--font-display); font-size: 24px; color: #fff;">
            Featured Engineering Projects
          </h3>
          <span class="section-tag" style="margin-bottom: 0;">Portfolio Showcase</span>
        </div>

        <div class="showcase-grid">
          ${p.projects.map(proj => `
            <div class="showcase-card">
              <div>
                <h4 style="font-family: var(--font-display); font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px;">
                  ${proj.title}
                </h4>
                <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px;">
                  ${proj.description}
                </p>
                <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px;">
                  ${proj.techStack.map(t => `
                    <span class="skill-tag" style="font-size: 11px;">${t}</span>
                  `).join('')}
                </div>
              </div>
              <div style="padding-top: 12px; border-top: 1px solid var(--border-subtle); font-size: 12px; color: var(--accent-cyan); font-weight: 600;">
                ★ ${proj.impact}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  store.subscribe((state, changedKey) => {
    if (changedKey === 'profile' || changedKey === 'applications' || changedKey === 'bookmarks') {
      render();
    }
  });

  render();
}
