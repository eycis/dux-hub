from pydantic import BaseModel, Field
from typing import Optional

class ExperimentBase(BaseModel):
    name:str = Field(min_length=1, max_length=200)
    hypothesis: str = Field(min_length=1, max_length=1000)

class ExperimentCreate(BaseModel):
    pass

class ExperimentUpdate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    hypothesis: Optional[str] = Field(default=None, min_length=1, max_length=1000)
    status: str = Field(min_length=1, max_length=200)
class ExperimentRead(BaseModel): 
    id:int
    name:str
    hypothesis:str
    status:str
    model_config = {"from_attributes" : True}