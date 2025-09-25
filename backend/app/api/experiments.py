from fastapi import FastAPI, Depends, HTTPException
# import schemas.experiment
from app.services.experiment_service import ExperimentService
from app.schemas.experiment import ExperimentRead, ExperimentCreate
# from backend.app import schemas, services
from app.db import get_db
from sqlalchemy.orm import Session

app = FastAPI()

@app.get("/experiments", response_model=list[ExperimentRead])
async def list_experiments(db: Session = Depends(get_db)):
    return ExperimentService(db).get_experiments()

@app.post("/experiments", response_model = ExperimentRead, status_code=201)
async def create_experiment(experiment: ExperimentCreate, db: Session = Depends(get_db)):
    return ExperimentService(db).create_experiment(experiment)