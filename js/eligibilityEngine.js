/* Eligibility Engine & Interactive Calculator */
import { store } from './state.js';

export function calculateEligibility(inputs, targetOpportunity) {
  if (!targetOpportunity) return { percent: 0, items: [] };

  let score = 0;
  const items = [];

  // 1. CGPA Criterion (Weight: 30%)
  const meetsCgpa = inputs.cgpa >= targetOpportunity.minCgpa;
  if (meetsCgpa) {
    score += 30;
    items.push({
      status: 'valid',
      text: `CGPA requirement met (${inputs.cgpa} >= ${targetOpportunity.minCgpa} minimum)`
    });
  } else {
    items.push({
      status: 'warning',
      text: `CGPA (${inputs.cgpa}) is below minimum requirement (${targetOpportunity.minCgpa})`
    });
  }

  // 2. Branch Criterion (Weight: 25%)
  const meetsBranch = targetOpportunity.allowedBranches.some(
    b => b.toLowerCase().includes(inputs.branch.toLowerCase()) || inputs.branch.toLowerCase().includes(b.toLowerCase())
  );
  if (meetsBranch) {
    score += 25;
    items.push({
      status: 'valid',
      text: `Branch requirement met (${inputs.branch})`
    });
  } else {
    items.push({
      status: 'warning',
      text: `Branch mismatch (${inputs.branch} not directly prioritized)`
    });
  }

  // 3. Graduation Year (Weight: 15%)
  const meetsGrad = targetOpportunity.gradYears.includes(Number(inputs.gradYear));
  if (meetsGrad) {
    score += 15;
    items.push({
      status: 'valid',
      text: `Graduation year matched (${inputs.gradYear} batch eligible)`
    });
  } else {
    items.push({
      status: 'warning',
      text: `Graduation year (${inputs.gradYear}) outside target batch (${targetOpportunity.gradYears.join(', ')})`
    });
  }

  // 4. Skills Match (Weight: 30%)
  const reqSkills = targetOpportunity.requiredSkills;
  const matchedSkills = reqSkills.filter(s => inputs.skills.includes(s));
  const missingSkills = reqSkills.filter(s => !inputs.skills.includes(s));
  const skillRatio = reqSkills.length > 0 ? (matchedSkills.length / reqSkills.length) : 1;
  const skillScore = Math.round(skillRatio * 30);
  score += skillScore;

  if (missingSkills.length === 0) {
    items.push({
      status: 'valid',
      text: `All ${reqSkills.length} required skill competencies verified`
    });
  } else {
    items.push({
      status: 'warning',
      text: `Missing recommended skill: ${missingSkills.join(', ')}`
    });
  }

  return {
    percent: Math.min(100, score),
    items,
    missingSkills,
    matchedSkills
  };
}

export function initEligibilityEngine() {
  const container = document.getElementById('eligibility-engine-mount');
  if (!container) return;

  function render() {
    const state = store.getState();
    const inputs = state.eligibilityInputs;
    const opp = state.opportunities.find(o => o.id === inputs.selectedRoleOppId) || state.opportunities[0];
    const result = calculateEligibility(inputs, opp);

    // Calculate circumference for radial gauge (radius = 70, circ = 2 * PI * 70 = 439.82)
    const circumference = 439.82;
    const dashOffset = circumference - (result.percent / 100) * circumference;

    let statusLabel = 'MATCH';
    if (result.percent >= 85) statusLabel = 'HIGHLY ELIGIBLE';
    else if (result.percent >= 65) statusLabel = 'MODERATE MATCH';
    else statusLabel = 'ACTION NEEDED';

    container.innerHTML = `
      <div class="eligibility-container">
        <div class="eligibility-grid">
          <!-- Left: Interactive Form -->
          <div class="eligibility-form-col">
            <h3 style="font-family: var(--font-display); font-size: 26px; color: #fff; margin-bottom: 20px;">
              Configure Candidate Parameters
            </h3>

            <div class="eligibility-form-group">
              <label class="form-label">
                Target Role & Opportunity
              </label>
              <select id="elig-role-select" class="form-select">
                ${state.opportunities.map(o => `
                  <option value="${o.id}" ${o.id === opp.id ? 'selected' : ''}>
                    ${o.company} — ${o.role} (${o.category})
                  </option>
                `).join('')}
              </select>
            </div>

            <div class="eligibility-form-group">
              <label class="form-label">
                <span>Academic Branch</span>
              </label>
              <select id="elig-branch-select" class="form-select">
                <option value="Computer Science & Engineering" ${inputs.branch === "Computer Science & Engineering" ? 'selected' : ''}>Computer Science & Engineering</option>
                <option value="Cyber Security" ${inputs.branch === "Cyber Security" ? 'selected' : ''}>Cyber Security (Specialized)</option>
                <option value="Information Technology" ${inputs.branch === "Information Technology" ? 'selected' : ''}>Information Technology</option>
                <option value="Electronics" ${inputs.branch === "Electronics" ? 'selected' : ''}>Electronics & Communication</option>
                <option value="Mechanical" ${inputs.branch === "Mechanical" ? 'selected' : ''}>Mechanical Engineering</option>
              </select>
            </div>

            <div class="eligibility-form-group">
              <div class="form-label">
                <span>Current Cumulative CGPA</span>
                <span class="value" id="cgpa-val-display">${Number(inputs.cgpa).toFixed(2)}</span>
              </div>
              <input type="range" id="elig-cgpa-slider" class="custom-range-slider" min="5.0" max="10.0" step="0.05" value="${inputs.cgpa}">
            </div>

            <div class="eligibility-form-group">
              <label class="form-label">Graduation Year</label>
              <select id="elig-grad-select" class="form-select">
                <option value="2026" ${Number(inputs.gradYear) === 2026 ? 'selected' : ''}>2026 (Final Year)</option>
                <option value="2027" ${Number(inputs.gradYear) === 2027 ? 'selected' : ''}>2027 (Pre-Final Year)</option>
                <option value="2028" ${Number(inputs.gradYear) === 2028 ? 'selected' : ''}>2028 (Undergraduate Class)</option>
                <option value="2029" ${Number(inputs.gradYear) === 2029 ? 'selected' : ''}>2029 (Sophomore Class)</option>
              </select>
            </div>

            <div class="eligibility-form-group">
              <label class="form-label">
                <span>Your Active Skills (Click to toggle)</span>
              </label>
              <div class="interactive-skill-picker" id="elig-skill-picker">
                ${["Python", "Cybersecurity", "Linux", "Networking", "SQL", "Git", "Machine Learning", "Web Development", "Cloud", "Java"].map(skill => {
                  const isSelected = inputs.skills.includes(skill);
                  return `
                    <button type="button" class="skill-toggle-chip ${isSelected ? 'selected' : ''}" data-skill="${skill}">
                      ${isSelected ? '✓ ' : '+ '}${skill}
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Right: Animated Gauge & Criteria Breakdown -->
          <div class="eligibility-result-col">
            <div class="eligibility-gauge-card">
              <div class="radial-gauge-wrapper">
                <svg class="gauge-svg" viewBox="0 0 160 160">
                  <defs>
                    <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#00f2fe" />
                      <stop offset="50%" stop-color="#4facfe" />
                      <stop offset="100%" stop-color="#6366f1" />
                    </linearGradient>
                  </defs>
                  <circle class="gauge-bg" cx="80" cy="80" r="70" />
                  <circle class="gauge-progress" cx="80" cy="80" r="70" 
                    stroke-dasharray="${circumference}" 
                    stroke-dashoffset="${dashOffset}" />
                </svg>
                <div class="gauge-center-text">
                  <span class="gauge-percent">${result.percent}%</span>
                  <span class="gauge-status">${statusLabel}</span>
                </div>
              </div>

              <div style="font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 12px;">
                Eligibility Assessment for ${opp.company}
              </div>

              <div class="criteria-checklist">
                ${result.items.map(item => `
                  <div class="criteria-item ${item.status}">
                    ${item.status === 'valid' 
                      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>` 
                      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
                    }
                    <span>${item.text}</span>
                  </div>
                `).join('')}
              </div>

              <div style="margin-top: 24px;">
                <button class="btn btn-primary" style="width: 100%;" id="btn-quick-apply-elig">
                  Apply Now with Verified Score (${result.percent}%)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach form event listeners
    const roleSelect = container.querySelector('#elig-role-select');
    roleSelect?.addEventListener('change', (e) => {
      store.updateEligibilityInputs({ selectedRoleOppId: e.target.value });
    });

    const branchSelect = container.querySelector('#elig-branch-select');
    branchSelect?.addEventListener('change', (e) => {
      store.updateEligibilityInputs({ branch: e.target.value });
    });

    const cgpaSlider = container.querySelector('#elig-cgpa-slider');
    cgpaSlider?.addEventListener('input', (e) => {
      store.updateEligibilityInputs({ cgpa: parseFloat(e.target.value) });
    });

    const gradSelect = container.querySelector('#elig-grad-select');
    gradSelect?.addEventListener('change', (e) => {
      store.updateEligibilityInputs({ gradYear: parseInt(e.target.value) });
    });

    const skillChips = container.querySelectorAll('.skill-toggle-chip');
    skillChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const skill = chip.getAttribute('data-skill');
        const currentSkills = [...inputs.skills];
        const updated = currentSkills.includes(skill)
          ? currentSkills.filter(s => s !== skill)
          : [...currentSkills, skill];
        store.updateEligibilityInputs({ skills: updated });
      });
    });

    const applyBtn = container.querySelector('#btn-quick-apply-elig');
    applyBtn?.addEventListener('click', () => {
      store.applyToOpportunity(opp.id, `Applied after calculating ${result.percent}% eligibility match.`);
    });
  }

  // Subscribe to changes
  store.subscribe((state, changedKey) => {
    if (changedKey === 'eligibilityInputs' || changedKey === 'opportunities') {
      render();
    }
  });

  render();
}
