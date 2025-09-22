from fastapi import FastAPI, Depends, HTTPException
# import schemas.experiment
from app.services.experiment_service import ExperimentService
from app.schemas.experiment import ExperimentRead, ExperimentCreate
from db import get_db, engine
from sqlalchemy.orm import Session

app = FastAPI()

@app.get("/experiments", response_model=list.ExperimentRead)
async def get_all_experiments(db: Session = Depends(get_db)):
    return services.get_experiments()

@app.post("/experiments", response_model = list.Experiment)
async def create_experiment(experiment: schemas.ExperimentCreate, db: Session = Depends(get_db)):
    # return services.create_experiment()