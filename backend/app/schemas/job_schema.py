from pydantic import BaseModel
from typing import List, Optional

class JobInput(BaseModel):
    job_title: str
    company_name: str
    industry: str
    experience_level: str
    key_skills: List[str]
    company_culture: str
    special_requirements: Optional[str] = None


class JobOutput(BaseModel):
    job_title: str
    company_name: str
    about_role: str
    responsibilities: List[str]
    required_skills: List[str]
    preferred_skills: List[str]
    experience: str
    benefits: List[str]
    company_about: str