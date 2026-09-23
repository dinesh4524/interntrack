from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import Project, StudentProfile
from app.schemas.schemas import ProjectCreate, ProjectUpdate, ProjectResponse
from app.api.deps import get_current_active_student

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("/me", response_model=List[ProjectResponse])
def get_my_projects(student: StudentProfile = Depends(get_current_active_student)):
    return student.projects

@router.post("/me", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(
    data: ProjectCreate,
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    project = Project(
        student_id=student.id,
        title=data.title,
        description=data.description,
        technologies=data.technologies,
        github_url=data.github_url,
        live_url=data.live_url
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.put("/{id}", response_model=ProjectResponse)
def update_project(
    id: str,
    data: ProjectUpdate,
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == id, Project.student_id == student.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    update_data = data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(project, key, value)

    db.commit()
    db.refresh(project)
    return project

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    id: str,
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == id, Project.student_id == student.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(project)
    db.commit()
    return None
