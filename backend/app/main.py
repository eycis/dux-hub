"""
Main entrypoint for the FastAPI application.
Sets up middleware, routes and configuration.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.settings import settings
# from app.api.routes import router as api_router
from app.api.experiments import router as experiments_router

app = FastAPI(title="DUX Hub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(experiments_router, prefix="/api/experiments", tags=["experiments"])

app.include_router(experiments_router, prefix="/api/comments", tags=["comments"])
