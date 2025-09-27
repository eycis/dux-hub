from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class ExperimentStatus(str, Enum): 
    draft = "draft"
    running = "running"
    completed = "completed"

class ExperimentBase(BaseModel):
    name:str = Field(min_length=1, max_length=200)
    hypothesis: str = Field(min_length=1, max_length=1000)

class ExperimentCreate(ExperimentBase):
    pass

class ExperimentUpdate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    hypothesis: Optional[str] = Field(default=None, min_length=1, max_length=1000)
    status: ExperimentStatus = Field()

class ExperimentRead(BaseModel): 
    id:int
    name:str
    hypothesis:str
    status:str
    model_config = {"from_attributes" : True}