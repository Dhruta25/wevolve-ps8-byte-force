from fastapi import APIRouter
from app.api.v1.routes import job

api_router = APIRouter()
api_router.include_router(job.router, prefix="/job", tags=["Job Generator"])