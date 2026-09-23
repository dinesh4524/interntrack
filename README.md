# INTERNTRACK — Student Internship & Placement Portal

> A Dribbble/Awwwards-grade, production-ready full-stack Student Internship & Placement Portal built with **React + TypeScript + Vite** frontend and **FastAPI + SQLAlchemy + Neon PostgreSQL** backend, engineered strictly for **100% Free Tier Deployment** on **Vercel**, **Render**, and **Neon**.

---

## 🌟 Architecture & Free-Tier Stack

```
                             INTERNET
                                |
                                |
                         VERCEL (Frontend)
                     React + TypeScript + Vite
                     SPA Routing (vercel.json)
                                |
                             HTTPS
                                |
                                ▼
                         RENDER (Backend)
                        FastAPI + Python 3.11
                        JWT & Bcrypt Security
                                |
                            SQLAlchemy
                                |
                                ▼
                      NEON (Database Engine)
                         PostgreSQL Server
```

| Component | Technology | Free Deployment Provider |
| :--- | :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, Modern CSS Variables, Framer Motion, Lucide Icons | **Vercel** (`vercel.json`) |
| **Backend** | Python 3.11, FastAPI, SQLAlchemy 2.0, Pydantic v2, PyJWT, Passlib (Bcrypt) | **Render** (`render.yaml` / `Dockerfile`) |
| **Database** | PostgreSQL Relational Database, Connection Pooling, SSL Mode | **Neon PostgreSQL** |

---

## 🚀 Core Features

1. **🌟 Dribbble-Grade Public Landing Page**:
   - Hero composition with interactive 3D particle constellation canvas.
   - Layered floating UI glass cards (87% Match, Shortlisted, ₹25K/mo Stipend, 3-Day Deadline Countdown).
   - Live platform statistics counter (120+ Internships, 45+ Companies, 85+ Skill Tracks, 320+ Applications).
   - Editorial 3-Step "How It Works" walkthrough (*01 Discover ➔ 02 Check ➔ 03 Track*).
   - Competency skill universe and candidate showcase.

2. **🔐 Secure Role-Based Authentication**:
   - JWT token generation, password hashing via Bcrypt, session hydration via AuthContext.
   - Pre-configured **1-Click Demo Accounts**:
     - **Student**: `demo@interntrack.com` / `Demo@12345`
     - **Admin**: `admin@interntrack.com` / `Admin@12345`

3. **⚡ Real-Time Candidate Eligibility Engine (`POST /eligibility/check`)**:
   - Evaluates candidate parameters (CGPA, Engineering Major, Graduation Batch, and Technical Skills) against live recruiter criteria.
   - Dynamic animated circular SVG gauge (0–100%) with instant checklist breakdown and missing skill alerts.

4. **📈 Multi-Stage Application Journey Pipeline (`/applications`)**:
   - Transparent 5-stage recruitment tracker: `Applied` ➔ `Screening` ➔ `Shortlisted` ➔ `Interview` ➔ `Selected`.
   - Detailed timeline history logs with recruiter notes stored in PostgreSQL.
   - Interactive stage advancer for live testing and viva demonstration.

5. **💼 Zero-Cost Application Submission (`POST /applications`)**:
   - Free architecture: Validates and persists direct resume URLs (Google Drive, GitHub, Portfolio) without requiring paid storage buckets.

6. **🎓 Student Profile & Analytics Dashboard (`/profile`)**:
   - Profile completion telemetry percentage.
   - Technical skills catalog with Beginner / Intermediate / Advanced proficiency chips.
   - Verified credentials management (NPTEL IIT Madras, IIT Kharagpur).
   - Engineering project showcase with GitHub repository and live application links.

---

## 📁 Monorepo Structure

```
interntrack/
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios API client with JWT interceptor
│   │   ├── components/      # Glass cards, timeline stepper, gauge, modals, skeletons
│   │   ├── context/         # AuthContext, ToastContext
│   │   ├── pages/           # Landing, Login, Register, Dashboard, Opportunities, Detail, Applications, Profile, Skills, Admin
│   │   ├── types/           # TypeScript data contracts
│   │   ├── App.tsx          # React router configuration
│   │   ├── main.tsx         # Entrypoint
│   │   └── index.css        # Design tokens, glassmorphism, responsive styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── vercel.json          # SPA routing rewrites for Vercel
│   └── .env.example
├── backend/
│   ├── app/
│   │   ├── api/             # FastAPI routers (auth, opportunities, applications, students, skills, eligibility, dashboard, notifications, admin, health)
│   │   ├── core/            # Config, security, JWT token utilities
│   │   ├── database/        # SQLAlchemy session & Neon engine setup
│   │   ├── models/          # PostgreSQL relational schema models
│   │   ├── schemas/         # Pydantic request/response models
│   │   ├── services/        # Eligibility calculator engine
│   │   ├── seed.py          # Database seeder with realistic opportunities & student profile
│   │   └── main.py          # FastAPI application entrypoint with CORS
│   ├── tests/               # Pytest automated API testing suite
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── render.yaml          # 1-Click Render backend deployment blueprint
│   └── .env.example
├── README.md
└── .gitignore
```

---

## 🗄️ Database Schema & Entity Relationships

```mermaid
erDiagram
    USERS ||--|| STUDENT_PROFILES : has
    STUDENT_PROFILES ||--o{ STUDENT_SKILLS : possesses
    SKILLS ||--o{ STUDENT_SKILLS : categorized_in
    COMPANIES ||--o{ OPPORTUNITIES : posts
    OPPORTUNITIES ||--o{ OPPORTUNITY_SKILLS : requires
    SKILLS ||--o{ OPPORTUNITY_SKILLS : matched_in
    STUDENT_PROFILES ||--o{ APPLICATIONS : submits
    OPPORTUNITIES ||--o{ APPLICATIONS : receives
    APPLICATIONS ||--o{ APPLICATION_STATUS_HISTORY : logs
    STUDENT_PROFILES ||--o{ PROJECTS : builds
    STUDENT_PROFILES ||--o{ CERTIFICATIONS : earns
    STUDENT_PROFILES ||--o{ NOTIFICATIONS : receives
```

---

## 🛠️ Local Development Setup

### 1. Clone & Setup Backend (FastAPI)

```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt

# Run seed script (creates tables & seeds realistic dataset)
python -m app.seed

# Start FastAPI dev server
uvicorn app.main:app --reload --port 8000
```
Backend will be active at `http://localhost:8000`. Interactive OpenAPI documentation available at `http://localhost:8000/docs`.

### 2. Setup Frontend (React + TypeScript + Vite)

```bash
cd frontend
npm install
npm run dev
```
Frontend will be active at `http://localhost:5173`.

---

## 🌐 Zero-Cost Public Deployment Guide

### Step 1: Create Neon PostgreSQL Database (Free)
1. Go to [Neon.tech](https://neon.tech) and sign up for a free account.
2. Create a new project called `interntrack`.
3. Copy your connection string: `postgresql://user:pass@ep-cool-123.us-east-2.aws.neon.tech/interntrack?sslmode=require`.

### Step 2: Deploy Backend to Render (Free)
1. Go to [Render.com](https://render.com) and create a **Web Service**.
2. Connect your GitHub repository and set the root directory to `backend`.
3. Set the following Environment Variables in Render:
   - `ENVIRONMENT` = `production`
   - `DATABASE_URL` = `<your-neon-connection-string>`
   - `JWT_SECRET` = `<your-random-32-char-secret-key>`
   - `CORS_ORIGINS` = `https://<your-vercel-app-name>.vercel.app,http://localhost:5173`
4. Build command: `pip install -r requirements.txt`
5. Start command: `python -m app.seed && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Health Check path: `/health`
7. Click **Deploy Web Service** and copy your backend URL (e.g. `https://interntrack-api.onrender.com`).

### Step 3: Deploy Frontend to Vercel (Free)
1. Go to [Vercel.com](https://vercel.com) and import the repository.
2. Set the root directory to `frontend`.
3. Framework Preset: `Vite`.
4. Set Environment Variable:
   - `VITE_API_URL` = `https://<your-render-backend-url>.onrender.com`
5. Click **Deploy**. Vercel will build the React SPA with full SPA routing (`vercel.json`).

---

## 🧪 Testing

Run backend tests using pytest:
```bash
cd backend
pytest tests/ -v
```

---

## 📄 License
MIT License • Built with pride for campus placement and internship excellence.
