from typing import List
from sqlalchemy import select
from sqlite3 import IntegrityError
from fastapi import HTTPException
from sqlalchemy.orm import Session, selectinload
from app.models.experiment import Experiment, ExperimentVariant
from app.schemas.experiment import ExperimentCreate, ExperimentRead, ExperimentUpdate

class ExperimentService:
    def __init__(self, db: Session):
        self.db = db

    #helper: 
    def _get_or_404(self, experiment_id: int) -> Experiment: 
        exp = self.db.execute(select(Experiment)
                              .options(selectinload(Experiment.variants))
                              .where(Experiment.id == experiment_id)
                              ).scalar_one_or_none()
        if not exp: 
            raise HTTPException(status_code=404, detail="Experiment not found")
        return exp
    
    def create_experiment(self, data: ExperimentCreate): 
        if data.name is None or data.hypothesis is None: 
            raise HTTPException(status_code = 422, detail= "name or hypothesis are none")
        
        experiment_instance = Experiment(
            name=data.name.strip(),
            hypothesis=data.hypothesis.strip(),
            status = "draft",
            variants=[ExperimentVariant(**v.model_dump()) for v in data.variants],
            )
        self.db.add(experiment_instance)
        try:
            self.db.commit()
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(status_code= 409, detail="Experiment must be unique")
        self.db.refresh(experiment_instance)
        return experiment_instance

    def get_experiments(self) -> List[Experiment]:
        return self.db.execute(select(Experiment)
                               .options(selectinload(Experiment.variants))
                               ).scalars().all()
    
    def update_experiment(self, experiment_id: int, data: ExperimentUpdate) -> Experiment:
        exp = self._get_or_404(experiment_id)

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

        if data.variants is not None:
            exp.variants.clear()
            for v in data.variants:
                exp.variants.append(ExperimentVariant(**v.model_dump()))

        try:
            self.db.commit()
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(status_code=409, detail="experiment name must be unique")
        self.db.refresh()
        return exp
    
    def delete_experiment(self, experiment_id: int) -> None: 
        exp = self._get_or_404(experiment_id)
        self.db.delete(exp)
        self.db.commit()