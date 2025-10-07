from pydantic import BaseModel, ConfigDict, Field
from typing import List, Optional
from enum import Enum


class CommentBase(BaseModel): 
    title: str = Field(min_length=1, max_length=200)
    text: str = Field(min_length=1, max_length=200)

class CommentCreate(CommentBase): 
    pass

class CommentRead(BaseModel): 
    id: int

    model_config = {"from_attributes": True}