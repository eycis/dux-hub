from typing import List
from sqlalchemy.orm import Session
from app.models.comment import Comment
from app.schemas.comment import CommentCreate

class CommentService:

    def __init__(self, db: Session):
        self.db = db
    
    def get_comments(self) -> List[Comment]:
        return self.db.query(Comment).all()
    
    def create_comment(self, data: CommentCreate) -> Comment: 
        comment_instance = Comment(**data.model_dump())
        self.db.add(comment_instance)
        self.db.commit()
        self.db.refresh(comment_instance)
        return comment_instance

