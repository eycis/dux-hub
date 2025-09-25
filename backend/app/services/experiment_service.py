# from typing import Sequence
# from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.experiment import Experiment
from app.schemas.experiment import ExperimentCreate, ExperimentRead

class ExperimentService:
    def __init__(self, db: Session):
        self.db = db

    def create_experiment(self, data: ExperimentCreate): 
        experiment_instance = Experiment(**data.model_dump())
        self.db.add(experiment_instance)
        self.db.commit()
        self.db.refresh(experiment_instance)
        return experiment_instance

    def get_experiments(self):
        return self.db.query(ExperimentRead).all()