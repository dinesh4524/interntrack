from datetime import datetime, timedelta
from app.database.session import SessionLocal, Base, engine
from app.models.models import (
    User, StudentProfile, Company, Opportunity, Skill, StudentSkill,
    OpportunitySkill, Application, ApplicationStatusHistory, Project,
    Certification, Notification
)
from app.core.security import get_password_hash

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        print("🌱 Seeding InternTrack Database...")

        # 1. Seed Skills
        skill_catalog = [
            ("Python", "Programming", "code"),
            ("Java", "Programming", "coffee"),
            ("C++", "Programming", "cpu"),
            ("JavaScript", "Web", "file-code"),
            ("React", "Web", "atom"),
            ("TypeScript", "Web", "code-2"),
            ("SQL", "Database", "database"),
            ("Linux", "System", "terminal"),
            ("Networking", "Core", "network"),
            ("Cybersecurity", "Security", "shield-check"),
            ("Machine Learning", "AI", "brain"),
            ("Cloud", "Infrastructure", "cloud"),
            ("Git", "Tools", "git-branch"),
            ("Data Structures", "Core", "layers"),
            ("Docker", "DevOps", "container"),
            ("Kubernetes", "DevOps", "boxes")
        ]

        skills_dict = {}
        for name, category, icon in skill_catalog:
            skill = db.query(Skill).filter(Skill.name == name).first()
            if not skill:
                skill = Skill(name=name, category=category, icon=icon)
                db.add(skill)
                db.flush()
            skills_dict[name] = skill

        # 2. Seed Companies
        companies_data = [
            ("SecureNet Labs", "SN", "#00f2fe", "https://securenet.io", "Premier offensive and defensive cybersecurity research & telemetry lab.", True),
            ("PixelForge", "PF", "#ec4899", "https://pixelforge.design", "Award-winning creative engineering studio building modern web platforms.", True),
            ("NeuralWorks", "NW", "#8b5cf6", "https://neuralworks.ai", "Autonomous deep learning & computer vision intelligence systems.", True),
            ("CloudNova", "CN", "#3b82f6", "https://cloudnova.dev", "Enterprise Kubernetes orchestration and high-availability cloud architecture.", True),
            ("DataSphere", "DS", "#10b981", "https://datasphere.analytics", "Large-scale streaming data pipelines and real-time business telemetry.", True),
            ("CyberShield", "CS", "#f59e0b", "https://cybershield.sec", "24/7 Security Operations Center (SOC) defense & threat intelligence.", True),
            ("Cisco Systems", "CS", "#0284c7", "https://cisco.com", "Global leader in enterprise networking, routers, and threat perimeter security.", True),
            ("Razorpay", "RZ", "#2563eb", "https://razorpay.com", "Next-generation financial infrastructure and frictionless developer payments.", True)
        ]

        companies_dict = {}
        for name, logo_text, logo_color, website, description, verified in companies_data:
            comp = db.query(Company).filter(Company.name == name).first()
            if not comp:
                comp = Company(
                    name=name,
                    logo_text=logo_text,
                    logo_color=logo_color,
                    website=website,
                    description=description,
                    verified=verified
                )
                db.add(comp)
                db.flush()
            companies_dict[name] = comp

        # 3. Seed Opportunities
        now = datetime.utcnow()
        opportunities_data = [
            {
                "company": "SecureNet Labs",
                "role": "Cybersecurity & Penetration Testing Intern",
                "category": "Cybersecurity",
                "location": "Bangalore, India",
                "work_mode": "Hybrid",
                "stipend": "₹25,000 / month",
                "stipend_numeric": 25000,
                "duration": "6 Months",
                "deadline": now + timedelta(days=6),
                "min_cgpa": 7.5,
                "allowed_branches": "Computer Science & Engineering, Information Technology, Cyber Security, Electronics",
                "grad_years": "2027, 2028",
                "is_featured": True,
                "description": "Join our elite Red & Blue team operations to analyze zero-day vulnerabilities, audit perimeter networks, and build automated penetration testing scripts.",
                "responsibilities": "• Perform automated and manual web/network vulnerability assessments\n• Write Python & Bash exploit telemetry scripts\n• Assist in drafting CVSS incident response documentation",
                "benefits": "• Dedicated security lab access\n• Mentorship under senior OSCP certified researchers\n• Direct PPO consideration for top performers",
                "skills": ["Cybersecurity", "Python", "Linux", "Networking"]
            },
            {
                "company": "CloudNova",
                "role": "Cloud DevOps & Platform Engineer Intern",
                "category": "Cloud",
                "location": "Hyderabad, India",
                "work_mode": "Remote",
                "stipend": "₹28,000 / month",
                "stipend_numeric": 28000,
                "duration": "3 Months",
                "deadline": now + timedelta(days=4),
                "min_cgpa": 8.0,
                "allowed_branches": "Computer Science & Engineering, Information Technology, Cyber Security",
                "grad_years": "2027, 2028",
                "is_featured": False,
                "description": "Architect high-throughput Kubernetes deployments and build automated CI/CD pipelines supporting distributed microservices.",
                "responsibilities": "• Maintain Docker containers and Helm deployment charts\n• Build GitHub Actions CI/CD workflows with automated linting\n• Monitor infrastructure reliability metrics with Prometheus/Grafana",
                "benefits": "• AWS Cloud credits & certification voucher\n• Flexible remote working schedule\n• Stipend bonus on feature completion",
                "skills": ["Cloud", "Linux", "Python", "Git", "Docker"]
            },
            {
                "company": "NeuralWorks",
                "role": "AI / Machine Learning Engineering Intern",
                "category": "AI / ML",
                "location": "Bangalore, India",
                "work_mode": "On-site",
                "stipend": "₹30,000 / month",
                "stipend_numeric": 30000,
                "duration": "6 Months",
                "deadline": now + timedelta(days=12),
                "min_cgpa": 8.2,
                "allowed_branches": "Computer Science & Engineering, Data Science, AI & ML",
                "grad_years": "2027, 2028",
                "is_featured": True,
                "description": "Develop and fine-tune transformer models for multi-modal text classification and real-time predictive telemetry.",
                "responsibilities": "• Train and benchmark PyTorch computer vision and NLP models\n• Optimize inference latency using ONNX and TensorRT\n• Document dataset cleaning and data augmentation pipelines",
                "benefits": "• High-performance NVIDIA RTX A6000 GPU cluster access\n• Co-authorship opportunity on research publications\n• Free on-campus gourmet cafeteria",
                "skills": ["Machine Learning", "Python", "Data Structures", "SQL"]
            },
            {
                "company": "PixelForge",
                "role": "Frontend & UI/UX Engineering Intern",
                "category": "Web Development",
                "location": "Pune, India",
                "work_mode": "Remote",
                "stipend": "₹22,000 / month",
                "stipend_numeric": 22000,
                "duration": "3 Months",
                "deadline": now + timedelta(days=9),
                "min_cgpa": 7.0,
                "allowed_branches": "All Engineering Branches",
                "grad_years": "2026, 2027, 2028, 2029",
                "is_featured": False,
                "description": "Craft pixel-perfect React and TypeScript user interfaces with fluid 60FPS Framer Motion animations and responsive design.",
                "responsibilities": "• Translate Figma design tokens into reusable TypeScript component libraries\n• Ensure accessibility (WCAG AA) and cross-browser performance\n• Integrate RESTful endpoints and state management",
                "benefits": "• New Apple MacBook Pro setup provided\n• Subscriptions to leading design tools\n• International creative team mentorship",
                "skills": ["React", "TypeScript", "JavaScript", "Git"]
            },
            {
                "company": "CyberShield",
                "role": "SOC Analyst & Incident Responder Intern",
                "category": "Cybersecurity",
                "location": "Chennai, India",
                "work_mode": "Hybrid",
                "stipend": "₹20,000 / month",
                "stipend_numeric": 20000,
                "duration": "6 Months",
                "deadline": now + timedelta(days=2),
                "min_cgpa": 7.5,
                "allowed_branches": "Computer Science & Engineering, Cyber Security, Information Technology",
                "grad_years": "2027, 2028",
                "is_featured": False,
                "description": "Monitor live enterprise SIEM telemetry, investigate suspicious authentication attempts, and respond to malware alerts.",
                "responsibilities": "• Analyze Splunk and Wireshark network packet dumps\n• Triage automated firewall alerts and correlate IP threat scores\n• Collaborate on incident post-mortem retrospectives",
                "benefits": "• Hands-on enterprise SIEM console training\n• Official corporate cybersecurity credential\n• Fast-track full time conversion",
                "skills": ["Cybersecurity", "Networking", "Linux", "SQL"]
            },
            {
                "company": "DataSphere",
                "role": "Data Analyst & Business Intelligence Intern",
                "category": "Web Development",
                "location": "Mumbai, India",
                "work_mode": "On-site",
                "stipend": "₹24,000 / month",
                "stipend_numeric": 24000,
                "duration": "4 Months",
                "deadline": now + timedelta(days=15),
                "min_cgpa": 7.2,
                "allowed_branches": "Computer Science & Engineering, Information Technology, Data Science",
                "grad_years": "2026, 2027, 2028",
                "is_featured": False,
                "description": "Write advanced SQL queries, build interactive Tableau executive dashboards, and derive actionable growth insights.",
                "responsibilities": "• Design PostgreSQL data warehousing queries and materialized views\n• Build automated scheduled reporting jobs\n• Present monthly KPI summaries to product managers",
                "benefits": "• Real production dataset access (10M+ rows)\n• Structured weekly analytics workshops\n• Transit & housing allowance",
                "skills": ["SQL", "Python", "Data Structures"]
            },
            {
                "company": "Cisco Systems",
                "role": "Network Software Engineer Intern",
                "category": "Linux & Core",
                "location": "Bangalore, India",
                "work_mode": "Hybrid",
                "stipend": "₹32,000 / month",
                "stipend_numeric": 32000,
                "duration": "6 Months",
                "deadline": now + timedelta(days=20),
                "min_cgpa": 8.0,
                "allowed_branches": "Computer Science & Engineering, Cyber Security, Electronics & Communication",
                "grad_years": "2027, 2028",
                "is_featured": True,
                "description": "Engineer core routing protocols, Linux kernel socket programming, and high-speed packet inspection software.",
                "responsibilities": "• Develop C++ and Python testing suites for routing daemons\n• Profile Linux network stack performance under 10Gbps loads\n• Participate in RFC protocol compliance audits",
                "benefits": "• Industry gold-standard networking lab gear\n• Full healthcare & wellness coverage during internship\n• High PPO conversion rate (>80%)",
                "skills": ["Networking", "C++", "Linux", "Python", "Git"]
            },
            {
                "company": "Razorpay",
                "role": "Backend & Distributed Systems Intern",
                "category": "Web Development",
                "location": "Bangalore, India",
                "work_mode": "Hybrid",
                "stipend": "₹35,000 / month",
                "stipend_numeric": 35000,
                "duration": "6 Months",
                "deadline": now + timedelta(days=18),
                "min_cgpa": 8.5,
                "allowed_branches": "Computer Science & Engineering, Information Technology",
                "grad_years": "2027, 2028",
                "is_featured": False,
                "description": "Build high-resilience payment APIs handling 5,000+ transactions per second with sub-50ms latency.",
                "responsibilities": "• Develop resilient microservices in Python and Go\n• Implement distributed locks and idempotent transaction handlers\n• Ensure zero-downtime database migrations with SQLAlchemy/Alembic",
                "benefits": "• Top-tier fintech engineering pedigree\n• Comprehensive fitness and learning allowance\n• Direct mentorship from Staff Engineers",
                "skills": ["Python", "SQL", "Data Structures", "Docker", "Git"]
            }
        ]

        created_opps = {}
        for item in opportunities_data:
            comp = companies_dict[item["company"]]
            opp = db.query(Opportunity).filter(
                Opportunity.company_id == comp.id,
                Opportunity.role == item["role"]
            ).first()
            if not opp:
                opp = Opportunity(
                    company_id=comp.id,
                    role=item["role"],
                    category=item["category"],
                    location=item["location"],
                    work_mode=item["work_mode"],
                    stipend=item["stipend"],
                    stipend_numeric=item["stipend_numeric"],
                    duration=item["duration"],
                    deadline=item["deadline"],
                    min_cgpa=item["min_cgpa"],
                    allowed_branches=item["allowed_branches"],
                    grad_years=item["grad_years"],
                    is_featured=item["is_featured"],
                    description=item["description"],
                    responsibilities=item["responsibilities"],
                    benefits=item["benefits"],
                    is_active=True
                )
                db.add(opp)
                db.flush()

                # Link skills
                for s_name in item["skills"]:
                    if s_name in skills_dict:
                        os_link = OpportunitySkill(
                            opportunity_id=opp.id,
                            skill_id=skills_dict[s_name].id,
                            is_mandatory=True
                        )
                        db.add(os_link)

            created_opps[item["role"]] = opp

        # 4. Seed Demo Student User
        demo_student_email = "demo@interntrack.com"
        demo_user = db.query(User).filter(User.email.ilike(demo_student_email)).first()
        if not demo_user:
            demo_user = User(
                name="Dinesh Kumar",
                email=demo_student_email,
                password_hash=get_password_hash("Demo@12345"),
                role="STUDENT"
            )
            db.add(demo_user)
            db.flush()
        else:
            demo_user.password_hash = get_password_hash("Demo@12345")
            db.flush()

        profile = db.query(StudentProfile).filter(StudentProfile.user_id == demo_user.id).first()
        if not profile:
            profile = StudentProfile(
                user_id=demo_user.id,
                college="College of Engineering",
                degree="B.E. Computer Science & Engineering",
                branch="Cyber Security",
                cgpa=8.48,
                graduation_year=2028,
                bio="Passionate cybersecurity researcher focusing on threat detection algorithms, network perimeter security, and secure software architecture.",
                location="Bangalore, India",
                resume_url="https://drive.google.com/file/d/1demo-dinesh-kumar-resume/view",
                profile_completion=90
            )
            db.add(profile)
            db.flush()

            # Attach student skills
            student_skill_names = [
                ("Cybersecurity", "Advanced"),
                ("Python", "Advanced"),
                ("Linux", "Advanced"),
                ("Networking", "Intermediate"),
                ("SQL", "Intermediate"),
                ("React", "Intermediate"),
                ("Git", "Advanced"),
                ("Data Structures", "Intermediate")
            ]
            for s_name, prof_level in student_skill_names:
                if s_name in skills_dict:
                    ss = StudentSkill(
                        student_id=profile.id,
                        skill_id=skills_dict[s_name].id,
                        proficiency=prof_level,
                        verified=True
                    )
                    db.add(ss)

            # Seed Projects
            projects_data = [
                ("Phishing Email Detector", "Built machine learning classification pipeline analyzing email headers, SPF records, and URL structures with 98.4% detection accuracy.", "Python, Scikit-Learn, FastAPI, React", "https://github.com/dinesh4524/phishing-email-detector", "https://phishing-detector.demo.app"),
                ("VigilStride — Edge Security Telemetry", "Real-time edge security telemetry ingestion daemon monitoring Linux network socket state and anomalous process spawns.", "C++, Linux, eBPF, Docker", "https://github.com/dinesh4524/vigilstride-edge", "https://vigilstride.io"),
                ("Smart Campus Attendance System", "Automated biometric and QR-based attendance tracking platform with tamper-proof cryptographic verification.", "React, TypeScript, PostgreSQL, Python", "https://github.com/dinesh4524/smart-attendance", "https://attendance.campus.edu")
            ]
            for p_title, p_desc, p_tech, p_git, p_live in projects_data:
                proj = Project(
                    student_id=profile.id,
                    title=p_title,
                    description=p_desc,
                    technologies=p_tech,
                    github_url=p_git,
                    live_url=p_live
                )
                db.add(proj)

            # Seed Certifications
            certs_data = [
                ("Cybersecurity and Privacy", "NPTEL — IIT Madras", "Apr 2026", "https://nptel.ac.in/noc/Ecertificate/?q=NPTEL26CS24S1234", True),
                ("Programming in Java (Elite + Gold)", "NPTEL — IIT Kharagpur", "Oct 2025", "https://nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS18S5678", True),
                ("Data Science for Engineers", "NPTEL — IIT Madras", "Jan 2026", "https://nptel.ac.in/noc/Ecertificate/?q=NPTEL26CS08S9012", True)
            ]
            for c_title, c_org, c_date, c_url, c_ver in certs_data:
                cert = Certification(
                    student_id=profile.id,
                    title=c_title,
                    organization=c_org,
                    issue_date=c_date,
                    credential_url=c_url,
                    verified=c_ver
                )
                db.add(cert)

            # Seed realistic Applications with full historical timeline
            app1_opp = created_opps.get("Cybersecurity & Penetration Testing Intern")
            if app1_opp:
                app1 = Application(
                    student_id=profile.id,
                    opportunity_id=app1_opp.id,
                    status="INTERVIEW",
                    resume_url="https://drive.google.com/file/d/1demo-dinesh-kumar-resume/view",
                    match_percentage=94,
                    applied_at=now - timedelta(days=10)
                )
                db.add(app1)
                db.flush()

                db.add(ApplicationStatusHistory(application_id=app1.id, status="APPLIED", note="Candidate applied with 94% profile match.", created_at=now - timedelta(days=10)))
                db.add(ApplicationStatusHistory(application_id=app1.id, status="SCREENING", note="Profile and NPTEL certifications verified by recruiter.", created_at=now - timedelta(days=8)))
                db.add(ApplicationStatusHistory(application_id=app1.id, status="SHORTLISTED", note="Selected for technical interview round.", created_at=now - timedelta(days=5)))
                db.add(ApplicationStatusHistory(application_id=app1.id, status="INTERVIEW", note="Technical interview scheduled for Thursday 3:00 PM IST.", created_at=now - timedelta(days=1)))

            app2_opp = created_opps.get("Cloud DevOps & Platform Engineer Intern")
            if app2_opp:
                app2 = Application(
                    student_id=profile.id,
                    opportunity_id=app2_opp.id,
                    status="SHORTLISTED",
                    resume_url="https://drive.google.com/file/d/1demo-dinesh-kumar-resume/view",
                    match_percentage=88,
                    applied_at=now - timedelta(days=5)
                )
                db.add(app2)
                db.flush()

                db.add(ApplicationStatusHistory(application_id=app2.id, status="APPLIED", note="Application submitted.", created_at=now - timedelta(days=5)))
                db.add(ApplicationStatusHistory(application_id=app2.id, status="SHORTLISTED", note="Shortlisted by CloudNova engineering team.", created_at=now - timedelta(days=2)))

            # Seed Notifications
            db.add(Notification(
                student_id=profile.id,
                title="Interview Scheduled: SecureNet Labs",
                message="Your technical interview with the Red Team lead is confirmed for Thursday at 3:00 PM.",
                type="INTERVIEW",
                link="/applications"
            ))
            db.add(Notification(
                student_id=profile.id,
                title="Application Shortlisted: CloudNova",
                message="CloudNova shortlisted your candidate profile for Cloud DevOps Intern.",
                type="SHORTLIST",
                link="/applications"
            ))
            db.add(Notification(
                student_id=profile.id,
                title="Urgent: SOC Analyst Deadline in 2 Days",
                message="CyberShield internship application window closes in 48 hours.",
                type="DEADLINE",
                link="/opportunities"
            ))

        # 5. Seed Admin User
        admin_email = "admin@interntrack.com"
        admin_user = db.query(User).filter(User.email.ilike(admin_email)).first()
        if not admin_user:
            admin_user = User(
                name="System Administrator",
                email=admin_email,
                password_hash=get_password_hash("Admin@12345"),
                role="ADMIN"
            )
            db.add(admin_user)
        else:
            admin_user.password_hash = get_password_hash("Admin@12345")

        db.commit()
        print("✅ InternTrack Database Seeded Successfully!")

    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
