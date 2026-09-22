/* UI Rendering Engine & Micro-Interactions */
import { store } from './state.js';
import { skillUniverseNodes } from './data.js';

export function initUI() {
  const modalBackdrop = document.getElementById('global-modal-backdrop');
  const modalDialog = document.getElementById('global-modal-dialog');
  const toastContainer = document.getElementById('toast-container');

  // Render Opportunities Asymmetric Grid
  function renderOpportunities() {
    const oppMount = document.getElementById('opportunities-mount');
    if (!oppMount) return;

    const state = store.getState();
    let opps = [...state.opportunities];

    // Filter by search query
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      opps = opps.filter(o => 
        o.company.toLowerCase().includes(q) ||
        o.role.toLowerCase().includes(q) ||
        o.requiredSkills.some(s => s.toLowerCase().includes(q)) ||
        o.category.toLowerCase().includes(q)
      );
    }

    // Filter by Category
    if (state.selectedCategory !== 'All') {
      opps = opps.filter(o => o.category === state.selectedCategory);
    }

    // Filter by Work Mode
    if (state.selectedWorkMode !== 'All') {
      opps = opps.filter(o => o.workMode === state.selectedWorkMode);
    }

    // Sort
    if (state.selectedSort === 'deadline') {
      opps.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (state.selectedSort === 'stipend') {
      opps.sort((a, b) => b.stipendNumeric - a.stipendNumeric);
    } else {
      opps.sort((a, b) => b.matchScore - a.matchScore);
    }

    if (opps.length === 0) {
      oppMount.innerHTML = `
        <div class="card-opportunity" style="text-align: center; padding: 60px 20px; grid-column: 1 / -1;">
          <h4 style="font-family: var(--font-display); font-size: 24px; color: #fff; margin-bottom: 12px;">
            No Matching Opportunities Found
          </h4>
          <p style="color: var(--text-secondary); margin-bottom: 20px;">
            Try clearing search filters or selecting another category.
          </p>
          <button class="btn btn-secondary btn-sm" id="btn-reset-filters">
            Reset All Filters
          </button>
        </div>
      `;
      oppMount.querySelector('#btn-reset-filters')?.addEventListener('click', () => {
        store.setSearchQuery('');
        store.setFilterCategory('All');
        store.setFilterWorkMode('All');
        const searchInput = document.getElementById('main-search-input');
        if (searchInput) searchInput.value = '';
      });
      return;
    }

    // Lead Featured Opportunity (first item or item with featured flag)
    const leadOpp = opps[0];
    const secondaryOpps = opps.slice(1, 3);
    const wideOpp = opps.find((o, idx) => idx >= 3 || o.isWide) || (opps.length > 3 ? opps[3] : null);
    const remainingOpps = opps.filter((o, idx) => o.id !== leadOpp.id && !secondaryOpps.some(s => s.id === o.id) && (!wideOpp || o.id !== wideOpp.id));

    oppMount.innerHTML = `
      <div class="editorial-grid">
        <!-- 1. Lead Featured Card (Editorial High-Impact) -->
        <div class="card-opportunity card-featured-lead" data-opp-id="${leadOpp.id}">
          <div class="card-featured-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Featured Opening
          </div>

          <div>
            <div class="company-identity">
              <div class="company-logo" style="border-color: ${leadOpp.logoColor}; color: ${leadOpp.logoColor};">
                ${leadOpp.logoText}
              </div>
              <div class="company-meta">
                <h4>${leadOpp.company}</h4>
                <span>📍 ${leadOpp.location} • ${leadOpp.workMode}</span>
              </div>
            </div>

            <h3 class="opportunity-role-title">${leadOpp.role}</h3>
            <p class="opportunity-desc-brief">${leadOpp.description}</p>

            <div class="opportunity-tags">
              ${leadOpp.requiredSkills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
            </div>
          </div>

          <div class="opportunity-footer">
            <div class="stipend-badge">
              <span class="stipend-amount">${leadOpp.stipend}</span>
              <span class="stipend-period">Per Month</span>
            </div>

            <div class="deadline-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${leadOpp.deadlineFormatted}
            </div>

            <div class="apply-arrow-btn">
              Explore Role →
            </div>
          </div>
        </div>

        <!-- 2. Stacked Secondary Cards -->
        <div class="editorial-col-stacked">
          ${secondaryOpps.map(opp => `
            <div class="card-opportunity" data-opp-id="${opp.id}">
              <div>
                <div class="company-identity" style="margin-bottom: 16px;">
                  <div class="company-logo" style="border-color: ${opp.logoColor}; color: ${opp.logoColor}; width: 40px; height: 40px; font-size: 14px;">
                    ${opp.logoText}
                  </div>
                  <div class="company-meta">
                    <h4>${opp.company}</h4>
                    <span>${opp.workMode} • ${opp.location}</span>
                  </div>
                </div>

                <h4 style="font-family: var(--font-display); font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px;">
                  ${opp.role}
                </h4>

                <div class="opportunity-tags" style="margin-bottom: 16px;">
                  ${opp.requiredSkills.slice(0, 3).map(s => `<span class="skill-tag">${s}</span>`).join('')}
                </div>
              </div>

              <div class="opportunity-footer">
                <div class="stipend-badge">
                  <span class="stipend-amount" style="font-size: 16px;">${opp.stipend}</span>
                  <span class="stipend-period">Per Month</span>
                </div>
                <div class="apply-arrow-btn">
                  View →
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- 3. Wide Panoramic Card (if available) -->
        ${wideOpp ? `
          <div class="card-opportunity card-wide-inner editorial-card-wide" data-opp-id="${wideOpp.id}">
            <div>
              <div class="company-identity" style="margin-bottom: 12px;">
                <div class="company-logo" style="border-color: ${wideOpp.logoColor}; color: ${wideOpp.logoColor}; width: 42px; height: 42px;">
                  ${wideOpp.logoText}
                </div>
                <div class="company-meta">
                  <h4>${wideOpp.company}</h4>
                  <span>${wideOpp.category} • ${wideOpp.workMode}</span>
                </div>
              </div>
              <h3 class="opportunity-role-title" style="font-size: 24px; margin-bottom: 6px;">${wideOpp.role}</h3>
              <p class="opportunity-desc-brief" style="margin-bottom: 0;">${wideOpp.description}</p>
            </div>

            <div>
              <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 8px;">Required Core Skills</div>
              <div class="opportunity-tags" style="margin-bottom: 0;">
                ${wideOpp.requiredSkills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
              </div>
            </div>

            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
              <div class="stipend-amount" style="font-size: 22px;">${wideOpp.stipend} <span style="font-size: 12px; color: var(--text-muted);">/mo</span></div>
              <button class="btn btn-primary btn-sm">
                Apply Now →
              </button>
            </div>
          </div>
        ` : ''}

        <!-- 4. Remaining Cards -->
        ${remainingOpps.map(opp => `
          <div class="card-opportunity" data-opp-id="${opp.id}">
            <div>
              <div class="company-identity" style="margin-bottom: 16px;">
                <div class="company-logo" style="border-color: ${opp.logoColor}; color: ${opp.logoColor}; width: 40px; height: 40px; font-size: 14px;">
                  ${opp.logoText}
                </div>
                <div class="company-meta">
                  <h4>${opp.company}</h4>
                  <span>${opp.workMode} • ${opp.location}</span>
                </div>
              </div>

              <h4 style="font-family: var(--font-display); font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px;">
                ${opp.role}
              </h4>

              <div class="opportunity-tags" style="margin-bottom: 16px;">
                ${opp.requiredSkills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
              </div>
            </div>

            <div class="opportunity-footer">
              <div class="stipend-badge">
                <span class="stipend-amount" style="font-size: 16px;">${opp.stipend}</span>
                <span class="stipend-period">Per Month</span>
              </div>
              <div class="apply-arrow-btn">
                View →
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Attach card click handlers to open modal
    oppMount.querySelectorAll('.card-opportunity').forEach(card => {
      card.addEventListener('click', () => {
        const oppId = card.getAttribute('data-opp-id');
        const opp = state.opportunities.find(o => o.id === oppId);
        if (opp) {
          store.setModal({ type: 'opportunity', data: opp });
        }
      });
    });
  }

  // Render Modal Content
  function renderModal() {
    const state = store.getState();
    if (!state.activeModal) {
      modalBackdrop.classList.remove('open');
      return;
    }

    modalBackdrop.classList.add('open');
    const { type, data } = state.activeModal;

    if (type === 'opportunity') {
      const opp = data;
      const isBookmarked = state.bookmarks.includes(opp.id);
      const isApplied = state.applications.some(a => a.opportunityId === opp.id);

      modalDialog.innerHTML = `
        <button class="modal-close-btn" id="modal-close-trigger" aria-label="Close modal">
          ✕
        </button>

        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
          <div class="company-logo" style="width: 56px; height: 56px; font-size: 20px; border-color: ${opp.logoColor}; color: ${opp.logoColor};">
            ${opp.logoText}
          </div>
          <div>
            <span class="section-tag" style="margin-bottom: 4px; font-size: 11px;">${opp.category}</span>
            <h3 style="font-family: var(--font-display); font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 2px;">
              ${opp.role}
            </h3>
            <div style="color: var(--text-secondary); font-size: 14px;">
              ${opp.company} • 📍 ${opp.location} (${opp.workMode})
            </div>
          </div>
        </div>

        <!-- Meta Grid -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; margin-bottom: 28px;">
          <div>
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Stipend</div>
            <div style="font-size: 16px; font-weight: 800; color: #fff;">${opp.stipend} <span style="font-size: 11px; font-weight: normal; color: var(--text-muted);">/mo</span></div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Duration</div>
            <div style="font-size: 16px; font-weight: 800; color: #fff;">${opp.duration}</div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Deadline</div>
            <div style="font-size: 16px; font-weight: 800; color: var(--accent-amber);">${opp.deadlineFormatted}</div>
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 style="font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 8px;">About the Role</h4>
          <p style="color: var(--text-secondary); line-height: 1.6; font-size: 14px;">${opp.description}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 style="font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 10px;">Key Responsibilities</h4>
          <ul style="color: var(--text-secondary); line-height: 1.7; padding-left: 20px; font-size: 14px;">
            ${opp.responsibilities.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 style="font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 10px;">Required Skills</h4>
          <div class="opportunity-tags">
            ${opp.requiredSkills.map(s => `<span class="skill-tag" style="background: rgba(0,242,254,0.1); border-color: rgba(0,242,254,0.3); color: #fff;">${s}</span>`).join('')}
          </div>
        </div>

        <div style="margin-bottom: 32px;">
          <h4 style="font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 10px;">Benefits & Mentorship</h4>
          <ul style="color: var(--text-secondary); line-height: 1.7; padding-left: 20px; font-size: 14px;">
            ${opp.benefits.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 14px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
          <button class="btn btn-secondary" id="modal-btn-bookmark">
            ${isBookmarked ? '★ Bookmarked' : '☆ Save Opportunity'}
          </button>
          
          <button class="btn btn-primary" id="modal-btn-apply" ${isApplied ? 'disabled style="opacity: 0.6; cursor: not-allowed;"' : ''}>
            ${isApplied ? '✓ Already Applied' : 'Submit Application Now →'}
          </button>
        </div>
      `;

      modalDialog.querySelector('#modal-close-trigger')?.addEventListener('click', () => store.closeModal());
      modalDialog.querySelector('#modal-btn-bookmark')?.addEventListener('click', () => {
        store.toggleBookmark(opp.id);
        renderModal();
      });
      modalDialog.querySelector('#modal-btn-apply')?.addEventListener('click', () => {
        const success = store.applyToOpportunity(opp.id);
        if (success) store.closeModal();
      });

    } else if (type === 'skill') {
      const skill = data;
      modalDialog.innerHTML = `
        <button class="modal-close-btn" id="modal-close-trigger" aria-label="Close modal">✕</button>
        <span class="section-tag" style="margin-bottom: 8px;">${skill.category} Domain</span>
        <h3 style="font-family: var(--font-display); font-size: 32px; font-weight: 800; color: #fff; margin-bottom: 8px;">
          ${skill.name}
        </h3>
        <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px; font-size: 15px;">
          ${skill.desc}
        </p>

        <div style="background: rgba(0,242,254,0.06); border: 1px solid rgba(0,242,254,0.2); border-radius: var(--radius-md); padding: 16px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 13px; color: var(--text-secondary);">Student Mastery Index</span>
          <span style="font-family: var(--font-display); font-size: 20px; font-weight: 800; color: var(--accent-cyan);">${skill.level}</span>
        </div>

        <h4 style="font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 14px;">
          Targeted Industry Learning Roadmap
        </h4>
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px;">
          ${skill.roadmap.map((step, idx) => `
            <div style="display: flex; align-items: flex-start; gap: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 12px 16px; border-radius: var(--radius-sm);">
              <span style="width: 22px; height: 22px; border-radius: 50%; background: var(--grad-primary); color: #050811; font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                ${idx + 1}
              </span>
              <span style="font-size: 13.5px; color: #e2e8f0; font-weight: 500;">${step}</span>
            </div>
          `).join('')}
        </div>

        <div style="display: flex; justify-content: flex-end;">
          <button class="btn btn-primary" id="modal-btn-filter-skill-opps">
            View Matching Opportunities (${skill.relatedOppIds.length}) →
          </button>
        </div>
      `;

      modalDialog.querySelector('#modal-close-trigger')?.addEventListener('click', () => store.closeModal());
      modalDialog.querySelector('#modal-btn-filter-skill-opps')?.addEventListener('click', () => {
        store.setSearchQuery(skill.name);
        store.closeModal();
        document.getElementById('opportunities-section')?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  // Render Toasts
  function renderToasts() {
    const state = store.getState();
    toastContainer.innerHTML = state.toasts.map(t => `
      <div class="toast show">
        <span class="toast-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
        <span>${t.message}</span>
      </div>
    `).join('');
  }

  // Backdrop click close
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      store.closeModal();
    }
  });

  // ESC key listener
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      store.closeModal();
    }
  });

  // Search input events
  const searchInput = document.getElementById('main-search-input');
  searchInput?.addEventListener('input', (e) => {
    store.setSearchQuery(e.target.value);
  });

  // Category filter pills
  const catPills = document.querySelectorAll('.filter-category-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-cat');
      store.setFilterCategory(cat);
    });
  });

  // Work mode select
  const workModeSelect = document.getElementById('filter-workmode-select');
  workModeSelect?.addEventListener('change', (e) => {
    store.setFilterWorkMode(e.target.value);
  });

  // Sort select
  const sortSelect = document.getElementById('filter-sort-select');
  sortSelect?.addEventListener('change', (e) => {
    store.setSort(e.target.value);
  });

  // Store subscriptions
  store.subscribe((state, changedKey) => {
    if (changedKey === 'opportunities' || changedKey === 'searchQuery' || changedKey === 'selectedCategory' || changedKey === 'selectedWorkMode' || changedKey === 'selectedSort') {
      renderOpportunities();
    }
    if (changedKey === 'activeModal' || changedKey === 'bookmarks' || changedKey === 'applications') {
      renderModal();
    }
    if (changedKey === 'toasts') {
      renderToasts();
    }
  });

  // Initial render
  renderOpportunities();
  renderModal();
  renderToasts();
}
