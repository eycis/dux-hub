# from typing import Sequence
# from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.experiment import Experiment
from app.schemas.experiment import ExperimentCreate, ExperimentRead

# class ExperimentService:
#     def __init__(self, db: Session):
#         self.db = db

def create_experiment(db: Session, data: ExperimentCreate): 
    experiment_instance = Experiment(**data.model_dump())
    db.add(experiment_instance)
    db.commit()
    db.refresh()
    return experiment_instance

def get_experiments(db:Session):
    return db.query(Experiment).all()