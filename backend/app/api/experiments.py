from fastapi import Depends, APIRouter
from app.services.experiment_service import ExperimentService
from app.schemas.experiment import ExperimentRead, ExperimentCreate, ExperimentUpdate
from app.db import get_db
from sqlalchemy.orm import Session

router = APIRouter()

@router.get("/", response_model=list[ExperimentRead])
async def list_experiments(db: Session = Depends(get_db)):
    experiments = ExperimentService(db).get_experiments()
    return [ExperimentRead.model_validate(exp) for exp in experiments]

@router.post("/", response_model = ExperimentRead, status_code=201)
async def create_experiment(experiment: ExperimentCreate, db: Session = Depends(get_db)):
    return ExperimentService(db).create_experiment(experiment)

@router.put("/{experiment_id}", response_model = ExperimentRead, status_code=201)
async def update_experiment(experiment_id: int, experiment: ExperimentUpdate, db: Session = Depends(get_db)):
    return ExperimentService(db).update_experiment(experiment_id, experiment)

@router.delete("/{experiment_id}", status_code=204)
async def delete_experiment(experiment_id: int, db: Session = Depends(get_db)):
    ExperimentService(db).delete_experiment(experiment_id)
    return None