/* InternTrack Master Application Bootstrapper */
import { CareerConstellation } from './canvas3d.js';
import { initEligibilityEngine } from './eligibilityEngine.js';
import { initSkillUniverse } from './skillUniverse.js';
import { initApplicationTracker } from './applicationTracker.js';
import { initDeadlineRadar } from './deadlineRadar.js';
import { initProfileDashboard } from './profileDashboard.js';
import { initUI } from './ui.js';
import { store } from './state.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D Canvas Particle Network
  const heroConstellation = new CareerConstellation('hero-canvas');

  // 2. Initialize Core Subsystems
  initUI();
  initEligibilityEngine();
  initSkillUniverse();
  initApplicationTracker();
  initDeadlineRadar();
  initProfileDashboard();

  // 3. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // 4. Smooth Anchor Navigation & Active Indicator
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // 5. Card Tilt Micro-interactions (3D depth on hover)
  const tiltElements = document.querySelectorAll('.tilt-card, .card-main-profile');
  tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / rect.height) * -12;
      const tiltY = (x / rect.width) * 12;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // 6. Quick Search Keyboard Shortcut (Ctrl+K / Cmd+K)
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('main-search-input');
      if (searchInput) {
        document.getElementById('opportunities-section')?.scrollIntoView({ behavior: 'smooth' });
        searchInput.focus();
        searchInput.select();
        store.showToast('Search mode activated (Ctrl+K)');
      }
    }
  });

  // 7. CTA triggers
  document.getElementById('btn-hero-explore')?.addEventListener('click', () => {
    document.getElementById('opportunities-section')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('btn-hero-track')?.addEventListener('click', () => {
    document.getElementById('applications-section')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('btn-nav-get-started')?.addEventListener('click', () => {
    document.getElementById('eligibility-section')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('nav-profile-trigger')?.addEventListener('click', () => {
    document.getElementById('profile-section')?.scrollIntoView({ behavior: 'smooth' });
  });

  console.log('⚡ InternTrack Portal successfully initialized with rich visual systems.');
});
