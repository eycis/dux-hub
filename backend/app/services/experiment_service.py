# from typing import Sequence
# from sqlalchemy import select
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.experiment import Experiment
from app.schemas.experiment import ExperimentCreate, ExperimentRead

class ExperimentService:
    def __init__(self, db: Session):
        self.db = db

    def create_experiment(self, data: ExperimentCreate): 
        if data.name is None or data.hypothesis is None: 
            raise HTTPException(status_code = 422, detail= "name or hypothesis are none")
        
        experiment_instance = Experiment(name=data.name.strip(), hypothesis=data.hypothesis.strip())
        self.db.add(experiment_instance)
        self.db.commit()
        self.db.refresh(experiment_instance)
        return experiment_instance

#TODO: update to modern syntax: 
    def get_experiments(self):
        return self.db.execute(select(Experiment)).scalars().all()