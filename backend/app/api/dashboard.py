from datetime import datetime, timedelta
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import desc, asc
from app.database.session import get_db
from app.models.models import User, StudentProfile, Opportunity, Application, Notification
from app.schemas.schemas import DashboardResponse, UpcomingDeadline, DashboardStatistics
from app.api.deps import get_current_user, get_current_active_student
from app.api.opportunities import format_opportunity_response
from app.api.applications import format_app_response
from app.api.students import calculate_completion
from app.services.eligibility import calculate_eligibility

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("", response_model=DashboardResponse)
def get_dashboard_data(
    current_user: User = Depends(get_current_user),
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    # 1. Fetch applications
    apps = db.query(Application).filter(Application.student_id == student.id).order_by(desc(Application.applied_at)).all()
    applied_opp_ids = {a.opportunity_id for a in apps}

    # 2. Compute statistics
    total_apps = len(apps)
    shortlisted = sum(1 for a in apps if a.status in ["SHORTLISTED", "INTERVIEW", "SELECTED"])
    interviews = sum(1 for a in apps if a.status == "INTERVIEW")
    
    # 3. Fetch opportunities and calculate match for recommendations
    active_opps = db.query(Opportunity).filter(Opportunity.is_active == True).all()
    recommended = []
    upcoming_deadlines_list = []
    now = datetime.utcnow()

    for opp in active_opps:
        # Calculate match
        el = calculate_eligibility(opp, student_profile=student)
        opp_formatted = format_opportunity_response(opp, student_profile=student, applied_opp_ids=applied_opp_ids)
        opp_formatted["match_percentage"] = el["match_percentage"]
        recommended.append(opp_formatted)

        # Check deadline
        days_diff = (opp.deadline - now).days
        if days_diff >= 0:
            upcoming_deadlines_list.append({
                "opportunity_id": opp.id,
                "role": opp.role,
                "company_name": opp.company.name,
                "deadline": opp.deadline,
                "days_remaining": max(0, days_diff),
                "category": opp.category
            })

    # Sort recommended by match score descending
    recommended.sort(key=lambda x: (x["match_percentage"] or 0), reverse=True)
    top_recommended = recommended[:6]

    # Sort upcoming deadlines by days remaining
    upcoming_deadlines_list.sort(key=lambda x: x["days_remaining"])
    top_deadlines = upcoming_deadlines_list[:4]

    # 4. Fetch notifications
    notifs = db.query(Notification).filter(Notification.student_id == student.id).order_by(desc(Notification.created_at)).limit(5).all()

    student.profile_completion = calculate_completion(student)

    stats = DashboardStatistics(
        total_applications=total_apps,
        shortlisted=shortlisted,
        interviews=interviews,
        upcoming_deadlines_count=len(upcoming_deadlines_list),
        profile_completion=student.profile_completion
    )

    return {
        "user": current_user,
        "student_profile": student,
        "statistics": stats,
        "recommended_opportunities": top_recommended,
        "recent_applications": [format_app_response(a) for a in apps[:5]],
        "upcoming_deadlines": top_deadlines,
        "notifications": notifs
    }
