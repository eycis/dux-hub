from typing import List
from sqlalchemy import select
from sqlite3 import IntegrityError
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.orm import Session, selectinload
from app.models.comment import Comment
from app.schemas.comment import CommentCreate

class CommentService:

    def __init__(self, db: Session):
        self.db = db
    
    def get_comments(self) -> List[Comment]:
        return self.db.query(Comment).all()
    
    def create_comment(self, data: CommentCreate): 
        comment_instance = Comment(**data.model_dump())
        self.db.add(comment_instance)
        self.db.commit()
        self.db.refresh()
        return comment_instance

