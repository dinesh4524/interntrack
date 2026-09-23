from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, desc, asc
from app.database.session import get_db
from app.models.models import Opportunity, Company, Skill, OpportunitySkill, Application, StudentProfile
from app.schemas.schemas import OpportunityResponse, OpportunityListResponse, SkillResponse, CompanyResponse
from app.api.deps import get_current_user, get_current_active_student, get_current_admin, security
from app.services.eligibility import calculate_eligibility

router = APIRouter(prefix="/opportunities", tags=["Opportunities"])

def format_opportunity_response(
    opp: Opportunity,
    student_profile: Optional[StudentProfile] = None,
    applied_opp_ids: Optional[set] = None
) -> dict:
    skills_list = [
        SkillResponse(
            id=os_item.skill.id,
            name=os_item.skill.name,
            category=os_item.skill.category,
            icon=os_item.skill.icon
        )
        for os_item in opp.skills if os_item.skill
    ]
    
    match_score = None
    if student_profile:
        el_res = calculate_eligibility(opp, student_profile=student_profile)
        match_score = el_res["match_percentage"]

    is_applied = False
    if applied_opp_ids and opp.id in applied_opp_ids:
        is_applied = True

    return {
        "id": opp.id,
        "role": opp.role,
        "category": opp.category,
        "location": opp.location,
        "work_mode": opp.work_mode,
        "stipend": opp.stipend,
        "stipend_numeric": opp.stipend_numeric,
        "duration": opp.duration,
        "deadline": opp.deadline,
        "min_cgpa": opp.min_cgpa,
        "allowed_branches": opp.allowed_branches,
        "grad_years": opp.grad_years,
        "description": opp.description,
        "responsibilities": opp.responsibilities,
        "benefits": opp.benefits,
        "is_active": opp.is_active,
        "is_featured": opp.is_featured,
        "created_at": opp.created_at,
        "company": CompanyResponse.from_orm(opp.company),
        "skills": skills_list,
        "match_percentage": match_score,
        "is_applied": is_applied
    }

@router.get("", response_model=OpportunityListResponse)
def list_opportunities(
    search: Optional[str] = None,
    category: Optional[str] = None,
    work_mode: Optional[str] = None,
    min_cgpa: Optional[float] = None,
    skill: Optional[str] = None,
    sort: Optional[str] = "match",  # match, newest, deadline, stipend
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=50),
    db: Session = Depends(get_db),
    auth_credentials = Depends(security)
):
    # Optional authentication
    student_profile = None
    applied_opp_ids = set()
    if auth_credentials:
        try:
            from jose import jwt
            from app.core.config import settings
            from app.models.models import User
            payload = jwt.decode(auth_credentials.credentials, settings.JWT_SECRET, algorithms=[settings.ALGORITHM])
            user_id = payload.get("sub")
            if user_id:
                user = db.query(User).filter(User.id == user_id).first()
                if user and user.student_profile:
                    student_profile = user.student_profile
                    apps = db.query(Application.opportunity_id).filter(Application.student_id == student_profile.id).all()
                    applied_opp_ids = {a[0] for a in apps}
        except Exception:
            pass

    query = db.query(Opportunity).filter(Opportunity.is_active == True)

    if search:
        s = f"%{search.strip()}%"
        query = query.join(Opportunity.company).filter(
            or_(
                Opportunity.role.ilike(s),
                Opportunity.description.ilike(s),
                Company.name.ilike(s),
                Opportunity.category.ilike(s)
            )
        )

    if category and category != "All":
        query = query.filter(Opportunity.category.ilike(f"%{category.strip()}%"))

    if work_mode and work_mode != "All":
        query = query.filter(Opportunity.work_mode.ilike(f"%{work_mode.strip()}%"))

    if min_cgpa is not None:
        query = query.filter(Opportunity.min_cgpa <= min_cgpa)

    if skill:
        query = query.join(Opportunity.skills).join(OpportunitySkill.skill).filter(
            Skill.name.ilike(f"%{skill.strip()}%")
        )

    # Sorting
    if sort == "newest":
        query = query.order_by(desc(Opportunity.created_at))
    elif sort == "deadline":
        query = query.order_by(asc(Opportunity.deadline))
    elif sort == "stipend":
        query = query.order_by(desc(Opportunity.stipend_numeric))
    else:
        # Default order
        query = query.order_by(desc(Opportunity.is_featured), desc(Opportunity.created_at))

    total = query.count()
    total_pages = max(1, (total + page_size - 1) // page_size)
    offset = (page - 1) * page_size
    opps = query.offset(offset).limit(page_size).all()

    items = [
        format_opportunity_response(o, student_profile=student_profile, applied_opp_ids=applied_opp_ids)
        for o in opps
    ]

    # If sorted by match %, sort after calculation
    if sort == "match" and student_profile:
        items.sort(key=lambda x: (x["match_percentage"] or 0), reverse=True)

    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": total_pages
    }

@router.get("/{id}", response_model=OpportunityResponse)
def get_opportunity(
    id: str,
    db: Session = Depends(get_db),
    auth_credentials = Depends(security)
):
    opp = db.query(Opportunity).filter(Opportunity.id == id).first()
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    student_profile = None
    applied_opp_ids = set()
    if auth_credentials:
        try:
            from jose import jwt
            from app.core.config import settings
            from app.models.models import User
            payload = jwt.decode(auth_credentials.credentials, settings.JWT_SECRET, algorithms=[settings.ALGORITHM])
            user_id = payload.get("sub")
            if user_id:
                user = db.query(User).filter(User.id == user_id).first()
                if user and user.student_profile:
                    student_profile = user.student_profile
                    apps = db.query(Application.opportunity_id).filter(Application.student_id == student_profile.id).all()
                    applied_opp_ids = {a[0] for a in apps}
        except Exception:
            pass

    return format_opportunity_response(opp, student_profile=student_profile, applied_opp_ids=applied_opp_ids)
