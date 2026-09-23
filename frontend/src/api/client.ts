import axios from 'axios';
import {
  User,
  Opportunity,
  Application,
  StudentProfile,
  Skill,
  Project,
  Certification,
  Notification,
  EligibilityResult,
  DashboardData
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Attach JWT token to outgoing requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('interntrack_jwt_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
      localStorage.removeItem('interntrack_jwt_token');
      localStorage.removeItem('interntrack_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Endpoints
export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const res = await api.post<{ access_token: string; token_type: string; user: User }>('/auth/login', credentials);
    return res.data;
  },
  register: async (data: any) => {
    const res = await api.post<{ access_token: string; token_type: string; user: User }>('/auth/register', data);
    return res.data;
  },
  getMe: async () => {
    const res = await api.get<User>('/auth/me');
    return res.data;
  },
};

export const opportunitiesApi = {
  list: async (params?: {
    search?: string;
    category?: string;
    work_mode?: string;
    min_cgpa?: number;
    skill?: string;
    sort?: string;
    page?: number;
    page_size?: number;
  }) => {
    const res = await api.get<{
      items: Opportunity[];
      total: number;
      page: number;
      page_size: number;
      total_pages: number;
    }>('/opportunities', { params });
    return res.data;
  },
  getById: async (id: string) => {
    const res = await api.get<Opportunity>(`/opportunities/${id}`);
    return res.data;
  },
};

export const eligibilityApi = {
  check: async (data: {
    opportunity_id: string;
    branch?: string;
    cgpa?: number;
    graduation_year?: number;
    skills?: string[];
  }) => {
    const res = await api.post<EligibilityResult>('/eligibility/check', data);
    return res.data;
  },
};

export const applicationsApi = {
  submit: async (data: {
    opportunity_id: string;
    name?: string;
    email?: string;
    phone?: string;
    college?: string;
    branch?: string;
    cgpa?: number;
    graduation_year?: number;
    resume_url?: string;
    notes?: string;
  }) => {
    const res = await api.post<Application>('/applications', data);
    return res.data;
  },
  getMyApplications: async () => {
    const res = await api.get<Application[]>('/applications/me');
    return res.data;
  },
  getById: async (id: string) => {
    const res = await api.get<Application>(`/applications/${id}`);
    return res.data;
  },
  updateStatus: async (id: string, status: string, note?: string) => {
    const res = await api.patch<Application>(`/applications/${id}/status`, { status, note });
    return res.data;
  },
};

export const profileApi = {
  getMyProfile: async () => {
    const res = await api.get<StudentProfile>('/students/me');
    return res.data;
  },
  updateProfile: async (data: Partial<StudentProfile>) => {
    const res = await api.put<StudentProfile>('/students/me', data);
    return res.data;
  },
};

export const skillsApi = {
  listAll: async () => {
    const res = await api.get<Skill[]>('/skills');
    return res.data;
  },
  addStudentSkill: async (skill_name: string, proficiency: string = 'Intermediate') => {
    const res = await api.post('/skills/me', { skill_name, proficiency });
    return res.data;
  },
  removeStudentSkill: async (skill_id: string) => {
    const res = await api.delete(`/skills/me/${skill_id}`);
    return res.data;
  },
};

export const projectsApi = {
  getMyProjects: async () => {
    const res = await api.get<Project[]>('/projects/me');
    return res.data;
  },
  create: async (data: Omit<Project, 'id' | 'created_at'>) => {
    const res = await api.post<Project>('/projects/me', data);
    return res.data;
  },
  update: async (id: string, data: Partial<Project>) => {
    const res = await api.put<Project>(`/projects/${id}`, data);
    return res.data;
  },
  delete: async (id: string) => {
    const res = await api.delete(`/projects/${id}`);
    return res.data;
  },
};

export const certificationsApi = {
  getMyCertifications: async () => {
    const res = await api.get<Certification[]>('/certifications/me');
    return res.data;
  },
  create: async (data: Omit<Certification, 'id' | 'created_at'>) => {
    const res = await api.post<Certification>('/certifications/me', data);
    return res.data;
  },
  update: async (id: string, data: Partial<Certification>) => {
    const res = await api.put<Certification>(`/certifications/${id}`, data);
    return res.data;
  },
  delete: async (id: string) => {
    const res = await api.delete(`/certifications/${id}`);
    return res.data;
  },
};

export const dashboardApi = {
  get: async () => {
    const res = await api.get<DashboardData>('/dashboard');
    return res.data;
  },
};

export const notificationsApi = {
  list: async () => {
    const res = await api.get<Notification[]>('/notifications');
    return res.data;
  },
  markAsRead: async (id: string) => {
    const res = await api.patch<Notification>(`/notifications/${id}/read`);
    return res.data;
  },
  markAllAsRead: async () => {
    const res = await api.post('/notifications/read-all');
    return res.data;
  },
};

export const adminApi = {
  getStats: async () => {
    const res = await api.get<{
      total_users: number;
      total_students: number;
      total_opportunities: number;
      total_applications: number;
      shortlisted: number;
      selected: number;
    }>('/admin/stats');
    return res.data;
  },
  getApplications: async () => {
    const res = await api.get<any[]>('/admin/applications');
    return res.data;
  },
  getUsers: async () => {
    const res = await api.get<any[]>('/admin/users');
    return res.data;
  },
};
