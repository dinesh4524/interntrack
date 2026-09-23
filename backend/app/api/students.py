from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import StudentProfile
from app.schemas.schemas import StudentProfileResponse, StudentProfileUpdate
from app.api.deps import get_current_active_student

router = APIRouter(prefix="/students", tags=["Students"])

def calculate_completion(profile: StudentProfile) -> int:
    score = 40  # base with name and email
    if profile.college and profile.branch:
        score += 15
    if profile.cgpa and profile.graduation_year:
        score += 15
    if profile.skills and len(profile.skills) >= 3:
        score += 10
    if profile.projects and len(profile.projects) >= 1:
        score += 10
    if profile.certifications and len(profile.certifications) >= 1:
        score += 10
    return min(100, score)

@router.get("/me", response_model=StudentProfileResponse)
def get_my_profile(student: StudentProfile = Depends(get_current_active_student)):
    student.profile_completion = calculate_completion(student)
    return student

@router.put("/me", response_model=StudentProfileResponse)
def update_my_profile(
    data: StudentProfileUpdate,
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    update_data = data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(student, key, value)
    
    student.profile_completion = calculate_completion(student)
    db.commit()
    db.refresh(student)
    return student
