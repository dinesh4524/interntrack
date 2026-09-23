from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.database.session import Base, engine
from app.api import (
    auth,
    opportunities,
    applications,
    students,
    skills,
    projects,
    certifications,
    eligibility,
    dashboard,
    notifications,
    admin,
    health
)

# Auto-create tables on startup (PostgreSQL / SQLite)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="Production-Ready API for InternTrack — Student Internship & Placement Portal"
)

# Configure CORS for Vercel and local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred. Please try again later."}
    )

# Include Routers
app.include_router(health.router)
app.include_router(auth.router)
app.include_router(opportunities.router)
app.include_router(applications.router)
app.include_router(students.router)
app.include_router(skills.router)
app.include_router(projects.router)
app.include_router(certifications.router)
app.include_router(eligibility.router)
app.include_router(dashboard.router)
app.include_router(notifications.router)
app.include_router(admin.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
