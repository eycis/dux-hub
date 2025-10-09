from pydantic import BaseModel, Field
from datetime import datetime

class CommentBase(BaseModel): 
    title: str = Field(min_length=1, max_length=200)
    text: str = Field(min_length=1, max_length=200)

class CommentCreate(CommentBase): 
    pass

class CommentRead(CommentBase): 
    id: int
    createdAt : datetime
    model_config = {"from_attributes": True}