from fastapi import APIRouter,Query
from app.schemas.job_schema import JobInput, JobOutput
from app.services.generator_service import generate_job_description

router = APIRouter()

@router.post("/generate")
def generate_job(payload: JobInput, use_llm: bool = Query(False,description="Enable LLM enhancement")):
    return generate_job_description(payload, use_llm)