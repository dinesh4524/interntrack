/* Application Reactive State Store & LocalStorage Sync */
import { studentProfile, initialOpportunities, initialApplications } from './data.js';

const STORAGE_KEYS = {
  APPLICATIONS: 'interntrack_apps_v1',
  PROFILE: 'interntrack_profile_v1',
  BOOKMARKS: 'interntrack_bookmarks_v1'
};

class StateStore {
  constructor() {
    this.listeners = new Set();
    
    // Load persisted or initial data
    const savedApps = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
    const savedBookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);

    this.state = {
      activeTab: 'explore',
      searchQuery: '',
      selectedCategory: 'All',
      selectedWorkMode: 'All',
      selectedSort: 'match',
      opportunities: [...initialOpportunities],
      applications: savedApps ? JSON.parse(savedApps) : [...initialApplications],
      profile: savedProfile ? JSON.parse(savedProfile) : { ...studentProfile },
      bookmarks: savedBookmarks ? JSON.parse(savedBookmarks) : ['opp_1', 'opp_4'],
      eligibilityInputs: {
        branch: "Computer Science & Engineering",
        cgpa: 8.48,
        gradYear: 2028,
        selectedRoleOppId: "opp_1",
        skills: ["Python", "Linux", "Networking", "Cybersecurity", "SQL", "Git"]
      },
      activeModal: null, // { type: 'opportunity' | 'skill' | 'apply' | 'eligibility', data: any }
      toasts: []
    };
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(changedKey) {
    this.listeners.forEach(fn => fn(this.state, changedKey));
  }

  setActiveTab(tab) {
    this.state.activeTab = tab;
    this.notify('activeTab');
  }

  setSearchQuery(query) {
    this.state.searchQuery = query;
    this.notify('searchQuery');
  }

  setFilterCategory(cat) {
    this.state.selectedCategory = cat;
    this.notify('selectedCategory');
  }

  setFilterWorkMode(mode) {
    this.state.selectedWorkMode = mode;
    this.notify('selectedWorkMode');
  }

  setSort(sort) {
    this.state.selectedSort = sort;
    this.notify('selectedSort');
  }

  setModal(modal) {
    this.state.activeModal = modal;
    this.notify('activeModal');
  }

  closeModal() {
    this.state.activeModal = null;
    this.notify('activeModal');
  }

  toggleBookmark(oppId) {
    if (this.state.bookmarks.includes(oppId)) {
      this.state.bookmarks = this.state.bookmarks.filter(id => id !== oppId);
      this.showToast('Removed from saved opportunities');
    } else {
      this.state.bookmarks.push(oppId);
      this.showToast('Opportunity saved to your bookmarks!');
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(this.state.bookmarks));
    this.notify('bookmarks');
  }

  applyToOpportunity(oppId, customNotes = '') {
    const opp = this.state.opportunities.find(o => o.id === oppId);
    if (!opp) return;

    // Check if already applied
    const existing = this.state.applications.find(a => a.opportunityId === oppId);
    if (existing) {
      this.showToast(`Already applied to ${opp.company} (${existing.status})`);
      return false;
    }

    const newApp = {
      id: `app_${Date.now()}`,
      opportunityId: oppId,
      company: opp.company,
      role: opp.role,
      appliedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Applied',
      statusStage: 0,
      stages: ["Applied", "Screening", "Shortlisted", "Interview", "Selected"],
      notes: customNotes || "Application submitted via InternTrack Portal."
    };

    this.state.applications.unshift(newApp);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(this.state.applications));
    this.showToast(`Application successfully sent to ${opp.company}! 🎉`);
    this.notify('applications');
    return true;
  }

  advanceApplicationStage(appId) {
    const app = this.state.applications.find(a => a.id === appId);
    if (!app) return;

    if (app.statusStage < app.stages.length - 1) {
      app.statusStage += 1;
      app.status = app.stages[app.statusStage];
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(this.state.applications));
      this.showToast(`${app.company} application moved to ${app.status}! ✨`);
      this.notify('applications');
    }
  }

  updateEligibilityInputs(newInputs) {
    this.state.eligibilityInputs = { ...this.state.eligibilityInputs, ...newInputs };
    this.notify('eligibilityInputs');
  }

  showToast(message, icon = 'check-circle') {
    const toast = { id: Date.now(), message, icon };
    this.state.toasts.push(toast);
    this.notify('toasts');

    setTimeout(() => {
      this.state.toasts = this.state.toasts.filter(t => t.id !== toast.id);
      this.notify('toasts');
    }, 4000);
  }
}

export const store = new StateStore();
