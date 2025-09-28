from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

class ExperimentStatus(str, Enum): 
    draft = "draft"
    running = "running"
    completed = "completed"


class VariantIn(BaseModel): 
    key: str = Field(min_length=1, max_length=10)
    description : Optional[str] = Field(default=None, max_length= 200)
    weight: int = Field(ge=0, le=100, default=50)


class VariantRead(VariantIn): 
    id: int
class ExperimentBase(BaseModel):
    name:str = Field(min_length=1, max_length=200)
    hypothesis: str = Field(min_length=1, max_length=1000)

class ExperimentCreate(ExperimentBase):
    variants: List[VariantIn] = Field(default_factory=list)

class ExperimentUpdate(BaseModel):
    name: Optional[str] = Field(min_length=1, max_length=200)
    hypothesis: Optional[str] = Field(default=None, min_length=1, max_length=1000)
    status: Optional[ExperimentStatus] = None
    variants: Optional[List[VariantIn]] = None

class ExperimentRead(BaseModel): 
    id:int
    name:str
    hypothesis:str
    status:str
    variants: List[VariantRead] = Field(default_factory = list)
    model_config = {"from_attributes" : True}