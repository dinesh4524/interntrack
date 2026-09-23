from typing import List, Dict, Any, Optional
from app.models.models import Opportunity, StudentProfile

def calculate_eligibility(
    opportunity: Opportunity,
    student_profile: Optional[StudentProfile] = None,
    candidate_branch: Optional[str] = None,
    candidate_cgpa: Optional[float] = None,
    candidate_grad_year: Optional[int] = None,
    candidate_skills: Optional[List[str]] = None
) -> Dict[str, Any]:
    # Determine candidate parameters from profile or override
    branch = candidate_branch or (student_profile.branch if student_profile else "Computer Science & Engineering")
    cgpa = candidate_cgpa if candidate_cgpa is not None else (student_profile.cgpa if student_profile else 8.0)
    grad_year = candidate_grad_year if candidate_grad_year is not None else (student_profile.graduation_year if student_profile else 2028)
    
    if candidate_skills is not None:
        skills = [s.strip().lower() for s in candidate_skills]
    elif student_profile and student_profile.skills:
        skills = [ss.skill.name.strip().lower() for ss in student_profile.skills if ss.skill]
    else:
        skills = ["python", "linux", "networking", "sql", "cybersecurity"]

    # 1. CGPA check
    cgpa_matched = float(cgpa) >= float(opportunity.min_cgpa)
    
    # 2. Branch check
    allowed_branches = [b.strip().lower() for b in opportunity.allowed_branches.split(",") if b.strip()]
    branch_lower = branch.strip().lower()
    branch_matched = any(
        ab in branch_lower or branch_lower in ab or "computer" in branch_lower or "information" in branch_lower or "cyber" in branch_lower
        for ab in allowed_branches
    ) or len(allowed_branches) == 0

    # 3. Graduation Year check
    allowed_grad_years = [y.strip() for y in opportunity.grad_years.split(",") if y.strip()]
    grad_year_str = str(grad_year).strip()
    grad_year_matched = grad_year_str in allowed_grad_years or len(allowed_grad_years) == 0

    # 4. Required Skills check
    opp_skills = [os_item.skill.name for os_item in opportunity.skills if os_item.skill]
    matched_skills = []
    missing_skills = []

    for req_skill in opp_skills:
        if req_skill.lower() in skills or any(s in req_skill.lower() for s in skills):
            matched_skills.append(req_skill)
        else:
            missing_skills.append(req_skill)

    # Calculate weighted match score
    # CGPA: 30%, Branch: 25%, Grad Year: 15%, Skills: 30%
    score = 0
    if cgpa_matched:
        # Give bonus if CGPA is significantly above min
        cgpa_diff = float(cgpa) - float(opportunity.min_cgpa)
        score += min(30, int(25 + max(0, cgpa_diff * 5)))
    else:
        score += max(0, int(15 - (float(opportunity.min_cgpa) - float(cgpa)) * 10))

    if branch_matched:
        score += 25
    else:
        score += 5

    if grad_year_matched:
        score += 15
    else:
        score += 5

    if opp_skills:
        skill_ratio = len(matched_skills) / len(opp_skills)
        score += int(30 * skill_ratio)
    else:
        score += 30

    score = min(99, max(35, score))

    reasons = []
    if cgpa_matched:
        reasons.append(f"CGPA requirement met ({cgpa} >= {opportunity.min_cgpa})")
    else:
        reasons.append(f"CGPA is below requirement ({cgpa} < {opportunity.min_cgpa})")

    if branch_matched:
        reasons.append(f"Branch matched ({branch})")
    else:
        reasons.append(f"Branch {branch} is not strictly in allowed branches")

    if grad_year_matched:
        reasons.append(f"Graduation year ({grad_year}) is eligible ({opportunity.grad_years})")
    else:
        reasons.append(f"Graduation year {grad_year} does not match {opportunity.grad_years}")

    for ms in missing_skills:
        reasons.append(f"Missing recommended competency: {ms}")

    is_eligible = cgpa_matched and branch_matched and grad_year_matched and len(missing_skills) <= 1

    return {
        "match_percentage": score,
        "eligible": is_eligible,
        "cgpa_matched": cgpa_matched,
        "branch_matched": branch_matched,
        "grad_year_matched": grad_year_matched,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "reasons": reasons
    }
