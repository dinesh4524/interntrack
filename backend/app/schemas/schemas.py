from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, HttpUrl, Field

# --- Auth Schemas ---
class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    password: str = Field(..., min_length=6)
    confirm_password: Optional[str] = None
    college: Optional[str] = "College of Engineering"
    branch: Optional[str] = "Cyber Security"
    cgpa: Optional[float] = 8.48
    graduation_year: Optional[int] = 2028

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserResponse"

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    created_at: datetime

    class Config:
        from_attributes = True

# --- Skill Schemas ---
class SkillResponse(BaseModel):
    id: str
    name: str
    category: str
    icon: Optional[str] = None

    class Config:
        from_attributes = True

class StudentSkillCreate(BaseModel):
    skill_name: str
    proficiency: str = "Intermediate"  # Beginner, Intermediate, Advanced

class StudentSkillResponse(BaseModel):
    id: str
    skill: SkillResponse
    proficiency: str
    verified: bool

    class Config:
        from_attributes = True

# --- Project & Certification Schemas ---
class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=2)
    description: str = Field(..., min_length=5)
    technologies: Optional[str] = "Python, FastAPI, React"
    github_url: Optional[str] = None
    live_url: Optional[str] = None

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    technologies: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None

class ProjectResponse(BaseModel):
    id: str
    title: str
    description: str
    technologies: Optional[str]
    github_url: Optional[str]
    live_url: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class CertificationCreate(BaseModel):
    title: str
    organization: str
    issue_date: Optional[str] = None
    credential_url: Optional[str] = None
    verified: Optional[bool] = True

class CertificationUpdate(BaseModel):
    title: Optional[str] = None
    organization: Optional[str] = None
    issue_date: Optional[str] = None
    credential_url: Optional[str] = None
    verified: Optional[bool] = None

class CertificationResponse(BaseModel):
    id: str
    title: str
    organization: str
    issue_date: Optional[str]
    credential_url: Optional[str]
    verified: bool
    created_at: datetime

    class Config:
        from_attributes = True

# --- Student Profile Schemas ---
class StudentProfileUpdate(BaseModel):
    college: Optional[str] = None
    degree: Optional[str] = None
    branch: Optional[str] = None
    cgpa: Optional[float] = None
    graduation_year: Optional[int] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    resume_url: Optional[str] = None

class StudentProfileResponse(BaseModel):
    id: str
    user_id: str
    college: Optional[str]
    degree: Optional[str]
    branch: Optional[str]
    cgpa: Optional[float]
    graduation_year: Optional[int]
    bio: Optional[str]
    location: Optional[str]
    resume_url: Optional[str]
    profile_completion: int
    skills: List[StudentSkillResponse] = []
    projects: List[ProjectResponse] = []
    certifications: List[CertificationResponse] = []

    class Config:
        from_attributes = True

# --- Company & Opportunity Schemas ---
class CompanyResponse(BaseModel):
    id: str
    name: str
    logo_text: str
    logo_color: str
    website: Optional[str]
    description: Optional[str]
    verified: bool

    class Config:
        from_attributes = True

class OpportunityResponse(BaseModel):
    id: str
    role: str
    category: str
    location: str
    work_mode: str
    stipend: str
    stipend_numeric: int
    duration: str
    deadline: datetime
    min_cgpa: float
    allowed_branches: str
    grad_years: str
    description: str
    responsibilities: Optional[str]
    benefits: Optional[str]
    is_active: bool
    is_featured: bool
    created_at: datetime
    company: CompanyResponse
    skills: List[SkillResponse] = []
    match_percentage: Optional[int] = None
    is_applied: Optional[bool] = False

    class Config:
        from_attributes = True

class OpportunityListResponse(BaseModel):
    items: List[OpportunityResponse]
    total: int
    page: int
    page_size: int
    total_pages: int

# --- Eligibility Check ---
class EligibilityCheckRequest(BaseModel):
    opportunity_id: str
    branch: Optional[str] = None
    cgpa: Optional[float] = None
    graduation_year: Optional[int] = None
    skills: Optional[List[str]] = None

class EligibilityCheckResponse(BaseModel):
    match_percentage: int
    eligible: bool
    cgpa_matched: bool
    branch_matched: bool
    grad_year_matched: bool
    matched_skills: List[str]
    missing_skills: List[str]
    reasons: List[str]

# --- Application Schemas ---
class ApplicationCreate(BaseModel):
    opportunity_id: str
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    college: Optional[str] = None
    branch: Optional[str] = None
    cgpa: Optional[float] = None
    graduation_year: Optional[int] = None
    resume_url: Optional[str] = None  # Google Drive / GitHub / Portfolio link
    notes: Optional[str] = None

class ApplicationStatusHistoryResponse(BaseModel):
    id: str
    status: str
    note: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class ApplicationResponse(BaseModel):
    id: str
    student_id: str
    opportunity_id: str
    status: str
    resume_url: Optional[str]
    notes: Optional[str]
    match_percentage: int
    applied_at: datetime
    updated_at: datetime
    opportunity: OpportunityResponse
    status_history: List[ApplicationStatusHistoryResponse] = []

    class Config:
        from_attributes = True

class ApplicationStatusUpdate(BaseModel):
    status: str
    note: Optional[str] = None

# --- Notification Schemas ---
class NotificationResponse(BaseModel):
    id: str
    title: str
    message: str
    type: str
    is_read: bool
    link: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

# --- Dashboard Overview Schema ---
class UpcomingDeadline(BaseModel):
    opportunity_id: str
    role: str
    company_name: str
    deadline: datetime
    days_remaining: int
    category: str

class DashboardStatistics(BaseModel):
    total_applications: int
    shortlisted: int
    interviews: int
    upcoming_deadlines_count: int
    profile_completion: int

class DashboardResponse(BaseModel):
    user: UserResponse
    student_profile: StudentProfileResponse
    statistics: DashboardStatistics
    recommended_opportunities: List[OpportunityResponse]
    recent_applications: List[ApplicationResponse]
    upcoming_deadlines: List[UpcomingDeadline]
    notifications: List[NotificationResponse]

Token.update_forward_refs()
