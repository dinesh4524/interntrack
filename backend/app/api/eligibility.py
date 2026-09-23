from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import Opportunity
from app.schemas.schemas import EligibilityCheckRequest, EligibilityCheckResponse
from app.api.deps import security, get_current_user
from app.services.eligibility import calculate_eligibility

router = APIRouter(prefix="/eligibility", tags=["Eligibility"])

@router.post("/check", response_model=EligibilityCheckResponse)
def check_eligibility(
    data: EligibilityCheckRequest,
    db: Session = Depends(get_db),
    auth_credentials = Depends(security)
):
    opp = db.query(Opportunity).filter(Opportunity.id == data.opportunity_id).first()
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    student_profile = None
    if auth_credentials:
        try:
            from jose import jwt
            from app.core.config import settings
            from app.models.models import User
            payload = jwt.decode(auth_credentials.credentials, settings.JWT_SECRET, algorithms=[settings.ALGORITHM])
            user_id = payload.get("sub")
            if user_id:
                user = db.query(User).filter(User.id == user_id).first()
                if user:
                    student_profile = user.student_profile
        except Exception:
            pass

    result = calculate_eligibility(
        opportunity=opp,
        student_profile=student_profile,
        candidate_branch=data.branch,
        candidate_cgpa=data.cgpa,
        candidate_grad_year=data.graduation_year,
        candidate_skills=data.skills
    )

    return result
