from fastapi import Depends, APIRouter
from app.models.comment import Comment
from app.services.comments_service import CommentService
from app.schemas.comment import CommentRead, CommentCreate
from app.db import get_db
from sqlalchemy.orm import Session

router = APIRouter()

@router.get("/", response_model=list[CommentRead])
async def get_comments(db: Session = Depends(get_db)):
    comments = (db.query(Comment).all())
    return comments

@router.post("/", response_model=CommentCreate)
async def create_comment(comment: CommentCreate, db: Session = Depends(get_db)):
    return CommentService.create_comment(db, comment)