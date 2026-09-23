from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import Certification, StudentProfile
from app.schemas.schemas import CertificationCreate, CertificationUpdate, CertificationResponse
from app.api.deps import get_current_active_student

router = APIRouter(prefix="/certifications", tags=["Certifications"])

@router.get("/me", response_model=List[CertificationResponse])
def get_my_certifications(student: StudentProfile = Depends(get_current_active_student)):
    return student.certifications

@router.post("/me", response_model=CertificationResponse, status_code=status.HTTP_201_CREATED)
def create_certification(
    data: CertificationCreate,
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    cert = Certification(
        student_id=student.id,
        title=data.title,
        organization=data.organization,
        issue_date=data.issue_date,
        credential_url=data.credential_url,
        verified=data.verified if data.verified is not None else True
    )
    db.add(cert)
    db.commit()
    db.refresh(cert)
    return cert

@router.put("/{id}", response_model=CertificationResponse)
def update_certification(
    id: str,
    data: CertificationUpdate,
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    cert = db.query(Certification).filter(Certification.id == id, Certification.student_id == student.id).first()
    if not cert:
        raise HTTPException(status_code=404, detail="Certification not found")

    update_data = data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(cert, key, value)

    db.commit()
    db.refresh(cert)
    return cert

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_certification(
    id: str,
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    cert = db.query(Certification).filter(Certification.id == id, Certification.student_id == student.id).first()
    if not cert:
        raise HTTPException(status_code=404, detail="Certification not found")

    db.delete(cert)
    db.commit()
    return None
