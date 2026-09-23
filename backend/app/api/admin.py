from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.database.session import get_db
from app.models.models import User, Opportunity, Application, StudentProfile
from app.api.deps import get_current_admin

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/stats")
def get_admin_stats(
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    total_users = db.query(User).count()
    total_students = db.query(StudentProfile).count()
    total_opportunities = db.query(Opportunity).count()
    total_applications = db.query(Application).count()
    shortlisted = db.query(Application).filter(Application.status.in_(["SHORTLISTED", "INTERVIEW", "SELECTED"])).count()
    selected = db.query(Application).filter(Application.status == "SELECTED").count()

    return {
        "total_users": total_users,
        "total_students": total_students,
        "total_opportunities": total_opportunities,
        "total_applications": total_applications,
        "shortlisted": shortlisted,
        "selected": selected
    }

@router.get("/applications")
def get_all_applications(
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    apps = db.query(Application).order_by(desc(Application.applied_at)).limit(100).all()
    return [
        {
            "id": a.id,
            "student_name": a.student.user.name,
            "student_email": a.student.user.email,
            "branch": a.student.branch,
            "cgpa": a.student.cgpa,
            "role": a.opportunity.role,
            "company": a.opportunity.company.name,
            "status": a.status,
            "match_percentage": a.match_percentage,
            "resume_url": a.resume_url,
            "applied_at": a.applied_at
        }
        for a in apps
    ]

@router.get("/users")
def get_all_users(
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    users = db.query(User).order_by(desc(User.created_at)).limit(100).all()
    return [
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role,
            "created_at": u.created_at,
            "college": u.student_profile.college if u.student_profile else "N/A",
            "branch": u.student_profile.branch if u.student_profile else "N/A",
            "cgpa": u.student_profile.cgpa if u.student_profile else 0.0
        }
        for u in users
    ]
