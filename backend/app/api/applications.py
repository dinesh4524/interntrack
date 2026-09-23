from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import Application, ApplicationStatusHistory, Opportunity, StudentProfile, Notification
from app.schemas.schemas import ApplicationCreate, ApplicationResponse, ApplicationStatusUpdate
from app.api.deps import get_current_active_student, get_current_user, get_current_admin
from app.api.opportunities import format_opportunity_response
from app.services.eligibility import calculate_eligibility

router = APIRouter(prefix="/applications", tags=["Applications"])

def format_app_response(app: Application) -> dict:
    return {
        "id": app.id,
        "student_id": app.student_id,
        "opportunity_id": app.opportunity_id,
        "status": app.status,
        "resume_url": app.resume_url,
        "notes": app.notes,
        "match_percentage": app.match_percentage,
        "applied_at": app.applied_at,
        "updated_at": app.updated_at,
        "opportunity": format_opportunity_response(app.opportunity, student_profile=app.student),
        "status_history": [
            {
                "id": h.id,
                "status": h.status,
                "note": h.note,
                "created_at": h.created_at
            }
            for h in app.status_history
        ]
    }

@router.post("", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
def submit_application(
    data: ApplicationCreate,
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    opp = db.query(Opportunity).filter(Opportunity.id == data.opportunity_id).first()
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    # Check if already applied
    existing = db.query(Application).filter(
        Application.student_id == student.id,
        Application.opportunity_id == data.opportunity_id
    ).first()
    if existing:
        raise HTTPException(
            status_code=400,
            detail="You have already submitted an application for this role"
        )

    # Calculate match score
    eligibility = calculate_eligibility(
        opportunity=opp,
        student_profile=student,
        candidate_branch=data.branch,
        candidate_cgpa=data.cgpa,
        candidate_grad_year=data.graduation_year
    )

    resume_link = data.resume_url or student.resume_url or "https://drive.google.com/file/d/demo-resume-sample/view"

    # Create application
    application = Application(
        student_id=student.id,
        opportunity_id=opp.id,
        status="APPLIED",
        resume_url=resume_link,
        notes=data.notes,
        match_percentage=eligibility["match_percentage"]
    )
    db.add(application)
    db.flush()

    # Add initial history event
    history = ApplicationStatusHistory(
        application_id=application.id,
        status="APPLIED",
        note="Application submitted successfully with verified profile telemetry."
    )
    db.add(history)

    # Add confirmation notification
    notif = Notification(
        student_id=student.id,
        title=f"Application Submitted: {opp.role}",
        message=f"Your candidate profile was delivered to {opp.company.name}. Status: APPLIED.",
        type="INFO",
        link=f"/applications/{application.id}"
    )
    db.add(notif)

    db.commit()
    db.refresh(application)

    return format_app_response(application)

@router.get("/me", response_model=List[ApplicationResponse])
def get_my_applications(
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    apps = db.query(Application).filter(Application.student_id == student.id).order_by(Application.applied_at.desc()).all()
    return [format_app_response(a) for a in apps]

@router.get("/{id}", response_model=ApplicationResponse)
def get_application(
    id: str,
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    app = db.query(Application).filter(Application.id == id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Ensure student owns the application or is admin
    if app.student_id != student.id and student.user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Access denied")

    return format_app_response(app)

@router.patch("/{id}/status", response_model=ApplicationResponse)
def update_application_status(
    id: str,
    data: ApplicationStatusUpdate,
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    app = db.query(Application).filter(Application.id == id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    new_status = data.status.upper()
    valid_statuses = ["APPLIED", "SCREENING", "SHORTLISTED", "INTERVIEW", "SELECTED", "REJECTED"]
    if new_status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of {valid_statuses}")

    app.status = new_status
    app.updated_at = datetime.utcnow()

    # Add history log
    note_msg = data.note or f"Application status transitioned to {new_status}."
    history = ApplicationStatusHistory(
        application_id=app.id,
        status=new_status,
        note=note_msg
    )
    db.add(history)

    # Add notification for student
    notif_title = f"Application Update: {app.opportunity.role}"
    if new_status == "SHORTLISTED":
        notif_type = "SHORTLIST"
        notif_title = f"🎉 Shortlisted for {app.opportunity.role}!"
    elif new_status == "INTERVIEW":
        notif_type = "INTERVIEW"
        notif_title = f"📅 Interview Scheduled: {app.opportunity.company.name}"
    elif new_status == "SELECTED":
        notif_type = "SHORTLIST"
        notif_title = f"🏆 Offer Received: {app.opportunity.company.name}!"
    else:
        notif_type = "INFO"

    notif = Notification(
        student_id=app.student_id,
        title=notif_title,
        message=f"{app.opportunity.company.name} updated your application status to {new_status}.",
        type=notif_type,
        link=f"/applications/{app.id}"
    )
    db.add(notif)

    db.commit()
    db.refresh(app)
    return format_app_response(app)
