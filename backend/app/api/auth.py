from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import User, StudentProfile, Skill, StudentSkill, Notification
from app.schemas.schemas import UserRegister, UserLogin, Token, UserResponse
from app.core.security import get_password_hash, verify_password, create_access_token
from app.api.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register(data: UserRegister, db: Session = Depends(get_db)):
    # Check if email exists
    existing_user = db.query(User).filter(User.email == data.email.lower().strip()).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists"
        )
    
    # Create user
    user = User(
        name=data.name.strip(),
        email=data.email.lower().strip(),
        password_hash=get_password_hash(data.password),
        role="STUDENT"
    )
    db.add(user)
    db.flush()

    # Create associated student profile
    profile = StudentProfile(
        user_id=user.id,
        college=data.college or "College of Engineering",
        degree="B.E. Computer Science & Engineering",
        branch=data.branch or "Cyber Security",
        cgpa=data.cgpa if data.cgpa is not None else 8.48,
        graduation_year=data.graduation_year or 2028,
        profile_completion=85
    )
    db.add(profile)
    db.flush()

    # Add default welcome skills
    default_skills = ["Python", "Linux", "Networking", "SQL", "Cybersecurity"]
    for skill_name in default_skills:
        skill = db.query(Skill).filter(Skill.name.ilike(skill_name)).first()
        if not skill:
            skill = Skill(name=skill_name, category="Core")
            db.add(skill)
            db.flush()
        student_skill = StudentSkill(
            student_id=profile.id,
            skill_id=skill.id,
            proficiency="Intermediate",
            verified=True
        )
        db.add(student_skill)

    # Add welcome notification
    notif = Notification(
        student_id=profile.id,
        title="Welcome to InternTrack! 🚀",
        message="Your candidate profile has been initialized. Explore recommended internships and check your eligibility score.",
        type="INFO",
        link="/opportunities"
    )
    db.add(notif)
    db.commit()
    db.refresh(user)

    access_token = create_access_token(subject=user.id)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@router.post("/login", response_model=Token)
def login(data: UserLogin, db: Session = Depends(get_db)):
    email_clean = data.email.lower().strip()
    user = db.query(User).filter(User.email.ilike(email_clean)).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password. Use demo@interntrack.com / Demo@12345"
        )
    
    access_token = create_access_token(subject=user.id)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
