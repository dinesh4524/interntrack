from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import Skill, StudentSkill, StudentProfile
from app.schemas.schemas import SkillResponse, StudentSkillCreate, StudentSkillResponse
from app.api.deps import get_current_active_student

router = APIRouter(prefix="/skills", tags=["Skills"])

@router.get("", response_model=List[SkillResponse])
def get_all_skills(db: Session = Depends(get_db)):
    return db.query(Skill).order_by(Skill.name).all()

@router.post("/me", response_model=StudentSkillResponse, status_code=status.HTTP_201_CREATED)
def add_student_skill(
    data: StudentSkillCreate,
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    skill_name = data.skill_name.strip()
    skill = db.query(Skill).filter(Skill.name.ilike(skill_name)).first()
    if not skill:
        skill = Skill(name=skill_name, category="Technical")
        db.add(skill)
        db.flush()

    # Check if already added
    existing = db.query(StudentSkill).filter(
        StudentSkill.student_id == student.id,
        StudentSkill.skill_id == skill.id
    ).first()
    if existing:
        existing.proficiency = data.proficiency
        db.commit()
        db.refresh(existing)
        return existing

    student_skill = StudentSkill(
        student_id=student.id,
        skill_id=skill.id,
        proficiency=data.proficiency,
        verified=False
    )
    db.add(student_skill)
    db.commit()
    db.refresh(student_skill)
    return student_skill

@router.delete("/me/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_student_skill(
    skill_id: str,
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    student_skill = db.query(StudentSkill).filter(
        StudentSkill.student_id == student.id,
        (StudentSkill.id == skill_id) | (StudentSkill.skill_id == skill_id)
    ).first()
    if not student_skill:
        raise HTTPException(status_code=404, detail="Skill not found in profile")

    db.delete(student_skill)
    db.commit()
    return None
