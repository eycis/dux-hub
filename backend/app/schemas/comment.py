from pydantic import BaseModel, Field


class CommentBase(BaseModel): 
    title: str = Field(min_length=1, max_length=200)
    text: str = Field(min_length=1, max_length=200)

class CommentCreate(CommentBase): 
    pass

class CommentRead(CommentBase): 
    id: int
    model_config = {"from_attributes": True}