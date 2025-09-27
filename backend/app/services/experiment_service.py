# from typing import Sequence
# from sqlalchemy import select
from sqlite3 import IntegrityError
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.experiment import Experiment
from app.schemas.experiment import ExperimentCreate, ExperimentRead, ExperimentUpdate

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
    
    def update_experiment(self, experiment_id: int, data: ExperimentUpdate) -> Experiment:
        exp = self.db.get(Experiment, experiment_id)

        if data.name is not None:
            new_name = data.name.strip()
            if not new_name: 
                raise HTTPException(status_code=422, detail="name cannot be empty")
            exp.name = new_name

        if data.hypothesis is not None:
            new_hypothesis = data.hypothesis.strip()
            if not new_name: 
                raise HTTPException(status_code=422, detail="hypothesis cannot be empty")
            exp.hypothesis = new_hypothesis

        if data.status is not None:
            exp.status = str(data.status)

        try:
            self.db.commit()
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(status_code=409, detail="experiment name must be unique")
        self.db.refresh()
        return exp