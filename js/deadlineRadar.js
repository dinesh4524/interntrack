/* Deadline Radar & Live Countdown Engine */
import { store } from './state.js';

export function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
    isExpired: total <= 0
  };
}

export function initDeadlineRadar() {
  const container = document.getElementById('deadline-radar-mount');
  if (!container) return;

  function render() {
    const state = store.getState();
    const sortedByDeadline = [...state.opportunities].sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline)
    ).slice(0, 3);

    container.innerHTML = `
      <div class="deadline-cards-grid">
        ${sortedByDeadline.map(opp => {
          const t = getTimeRemaining(opp.deadline);
          const isUrgent = t.days <= 5 && !t.isExpired;

          let urgencyTag = `${t.days.toString().padStart(2, '0')} DAYS LEFT`;
          if (t.isExpired) urgencyTag = 'CLOSED';
          else if (t.days <= 2) urgencyTag = 'URGENT • 2 DAYS LEFT';

          return `
            <div class="deadline-card ${isUrgent ? 'urgent' : ''}" data-opp-id="${opp.id}">
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                  <span class="section-tag" style="margin-bottom: 0; font-size: 11px; ${isUrgent ? 'color: var(--accent-rose); border-color: rgba(244,63,94,0.4); background: rgba(244,63,94,0.1);' : ''}">
                    ${urgencyTag}
                  </span>
                  <span style="font-family: var(--font-mono); font-size: 13px; font-weight: 700; color: #fff;">
                    ${opp.deadlineFormatted}
                  </span>
                </div>

                <div style="font-size: 13px; color: var(--text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 4px;">
                  ${opp.company}
                </div>
                <h4 style="font-family: var(--font-display); font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 12px; line-height: 1.2;">
                  ${opp.role}
                </h4>

                <!-- Live Countdown Boxes -->
                <div class="deadline-timer-group" id="timer-${opp.id}">
                  <div class="time-box">
                    <div class="time-num timer-days">${t.days.toString().padStart(2, '0')}</div>
                    <div class="time-unit">Days</div>
                  </div>
                  <div class="time-box">
                    <div class="time-num timer-hours">${t.hours.toString().padStart(2, '0')}</div>
                    <div class="time-unit">Hours</div>
                  </div>
                  <div class="time-box">
                    <div class="time-num timer-minutes">${t.minutes.toString().padStart(2, '0')}</div>
                    <div class="time-unit">Mins</div>
                  </div>
                  <div class="time-box">
                    <div class="time-num timer-seconds" style="color: var(--accent-cyan);">${t.seconds.toString().padStart(2, '0')}</div>
                    <div class="time-unit">Secs</div>
                  </div>
                </div>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border-subtle);">
                <span style="font-weight: 700; font-size: 15px; color: #fff;">
                  ${opp.stipend} <span style="font-size: 11px; color: var(--text-muted);">/ month</span>
                </span>
                <button class="btn btn-primary btn-sm btn-deadline-apply" data-opp-id="${opp.id}">
                  Apply Before Window Closes →
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Attach click events
    container.querySelectorAll('.btn-deadline-apply').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const oppId = btn.getAttribute('data-opp-id');
        const opp = state.opportunities.find(o => o.id === oppId);
        if (opp) {
          store.setModal({ type: 'opportunity', data: opp });
        }
      });
    });

    container.querySelectorAll('.deadline-card').forEach(card => {
      card.addEventListener('click', () => {
        const oppId = card.getAttribute('data-opp-id');
        const opp = state.opportunities.find(o => o.id === oppId);
        if (opp) {
          store.setModal({ type: 'opportunity', data: opp });
        }
      });
    });
  }

  render();

  // Tick timer every second
  setInterval(() => {
    const state = store.getState();
    const sorted = [...state.opportunities].sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline)
    ).slice(0, 3);

    sorted.forEach(opp => {
      const timerEl = container.querySelector(`#timer-${opp.id}`);
      if (timerEl) {
        const t = getTimeRemaining(opp.deadline);
        const daysEl = timerEl.querySelector('.timer-days');
        const hoursEl = timerEl.querySelector('.timer-hours');
        const minsEl = timerEl.querySelector('.timer-minutes');
        const secsEl = timerEl.querySelector('.timer-seconds');

        if (daysEl) daysEl.textContent = t.days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = t.hours.toString().padStart(2, '0');
        if (minsEl) minsEl.textContent = t.minutes.toString().padStart(2, '0');
        if (secsEl) secsEl.textContent = t.seconds.toString().padStart(2, '0');
      }
    });
  }, 1000);
}
