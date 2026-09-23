from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import Notification, StudentProfile
from app.schemas.schemas import NotificationResponse
from app.api.deps import get_current_active_student

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get("", response_model=List[NotificationResponse])
def get_my_notifications(
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    return db.query(Notification).filter(Notification.student_id == student.id).order_by(Notification.created_at.desc()).limit(20).all()

@router.patch("/{id}/read", response_model=NotificationResponse)
def mark_notification_read(
    id: str,
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    notif = db.query(Notification).filter(
        Notification.id == id,
        Notification.student_id == student.id
    ).first()
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found")

    notif.is_read = True
    db.commit()
    db.refresh(notif)
    return notif

@router.post("/read-all")
def mark_all_notifications_read(
    student: StudentProfile = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    db.query(Notification).filter(
        Notification.student_id == student.id,
        Notification.is_read == False
    ).update({Notification.is_read: True}, synchronize_session=False)
    db.commit()
    return {"message": "All notifications marked as read"}
