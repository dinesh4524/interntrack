export interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN';
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string;
}

export interface StudentSkill {
  id: string;
  skill: Skill;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
  verified: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies?: string;
  github_url?: string;
  live_url?: string;
  created_at: string;
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  issue_date?: string;
  credential_url?: string;
  verified: boolean;
  created_at: string;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  college?: string;
  degree?: string;
  branch?: string;
  cgpa?: number;
  graduation_year?: number;
  bio?: string;
  location?: string;
  resume_url?: string;
  profile_completion: number;
  skills: StudentSkill[];
  projects: Project[];
  certifications: Certification[];
}

export interface Company {
  id: string;
  name: string;
  logo_text: string;
  logo_color: string;
  website?: string;
  description?: string;
  verified: boolean;
}

export interface Opportunity {
  id: string;
  role: string;
  category: string;
  location: string;
  work_mode: string;
  stipend: string;
  stipend_numeric: number;
  duration: string;
  deadline: string;
  min_cgpa: number;
  allowed_branches: string;
  grad_years: string;
  description: string;
  responsibilities?: string;
  benefits?: string;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  company: Company;
  skills: Skill[];
  match_percentage?: number;
  is_applied?: boolean;
}

export interface ApplicationStatusHistory {
  id: string;
  status: string;
  note?: string;
  created_at: string;
}

export interface Application {
  id: string;
  student_id: string;
  opportunity_id: string;
  status: 'APPLIED' | 'SCREENING' | 'SHORTLISTED' | 'INTERVIEW' | 'SELECTED' | 'REJECTED';
  resume_url?: string;
  notes?: string;
  match_percentage: number;
  applied_at: string;
  updated_at: string;
  opportunity: Opportunity;
  status_history: ApplicationStatusHistory[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'SHORTLIST' | 'INTERVIEW' | 'DEADLINE' | 'MATCH' | 'INFO';
  is_read: boolean;
  link?: string;
  created_at: string;
}

export interface EligibilityResult {
  match_percentage: number;
  eligible: boolean;
  cgpa_matched: boolean;
  branch_matched: boolean;
  grad_year_matched: boolean;
  matched_skills: string[];
  missing_skills: string[];
  reasons: string[];
}

export interface DashboardData {
  user: User;
  student_profile: StudentProfile;
  statistics: {
    total_applications: number;
    shortlisted: number;
    interviews: number;
    upcoming_deadlines_count: number;
    profile_completion: number;
  };
  recommended_opportunities: Opportunity[];
  recent_applications: Application[];
  upcoming_deadlines: {
    opportunity_id: string;
    role: string;
    company_name: string;
    deadline: string;
    days_remaining: number;
    category: string;
  }[];
  notifications: Notification[];
}
