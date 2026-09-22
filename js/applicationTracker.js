/* Application Journey Tracker & Recruitment Pipeline */
import { store } from './state.js';

export function initApplicationTracker() {
  const container = document.getElementById('application-tracker-mount');
  if (!container) return;

  function render() {
    const state = store.getState();
    const apps = state.applications;

    if (apps.length === 0) {
      container.innerHTML = `
        <div class="card-opportunity" style="text-align: center; padding: 60px 20px;">
          <h3 style="font-family: var(--font-display); font-size: 24px; color: #fff; margin-bottom: 12px;">
            No Active Applications Yet
          </h3>
          <p style="color: var(--text-secondary); margin-bottom: 24px;">
            Discover exciting internships and submit your application to track your progress here.
          </p>
          <div>
            <button class="btn btn-primary" id="btn-explore-now-empty">
              Explore Available Opportunities
            </button>
          </div>
        </div>
      `;
      container.querySelector('#btn-explore-now-empty')?.addEventListener('click', () => {
        document.getElementById('opportunities-section')?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }

    container.innerHTML = `
      <div class="tracker-board">
        ${apps.map(app => {
          return `
            <div class="application-journey-card">
              <!-- Left: Meta -->
              <div>
                <div style="font-size: 11px; text-transform: uppercase; color: var(--accent-cyan); font-weight: 700; letter-spacing: 0.05em; margin-bottom: 4px;">
                  Applied on ${app.appliedDate}
                </div>
                <h4 style="font-family: var(--font-display); font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 4px;">
                  ${app.role}
                </h4>
                <div style="font-size: 14px; color: var(--text-secondary);">
                  ${app.company}
                </div>
              </div>

              <!-- Center: Interactive Pipeline Stepper -->
              <div class="pipeline-stepper">
                ${app.stages.map((stageName, idx) => {
                  let statusClass = '';
                  if (idx < app.statusStage) statusClass = 'completed';
                  else if (idx === app.statusStage) statusClass = 'current';

                  return `
                    <div class="pipeline-step ${statusClass}" title="Stage ${idx + 1}: ${stageName}">
                      <div class="step-circle">
                        ${idx < app.statusStage ? '✓' : idx + 1}
                      </div>
                      <span class="step-label">${stageName}</span>
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- Right: Actions & Advance status -->
              <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                <span class="section-tag" style="margin-bottom: 0; padding: 4px 12px; font-size: 11px;">
                  ${app.status.toUpperCase()}
                </span>
                ${app.statusStage < app.stages.length - 1 ? `
                  <button class="btn btn-secondary btn-sm btn-advance-stage" data-app-id="${app.id}">
                    Advance Stage →
                  </button>
                ` : `
                  <span style="font-size: 12px; color: var(--accent-emerald); font-weight: 700;">
                    🎉 Offer Finalized
                  </span>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Attach advance stage buttons
    const advanceBtns = container.querySelectorAll('.btn-advance-stage');
    advanceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const appId = btn.getAttribute('data-app-id');
        store.advanceApplicationStage(appId);
      });
    });
  }

  // Subscribe to changes
  store.subscribe((state, changedKey) => {
    if (changedKey === 'applications') {
      render();
    }
  });

  render();
}
