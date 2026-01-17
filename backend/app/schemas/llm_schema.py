from pydantic import BaseModel
from typing import List

class systemgeneratedJS(BaseModel):
    about_role: str
    responsibilities: List[str]
    required_skills: List[str]
    preferred_skills: List[str]
    experience: str
    benefits: List[str]
    company_about: str