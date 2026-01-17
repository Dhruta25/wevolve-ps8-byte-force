from sqlalchemy import Column, String, JSON
from app.db.database import Base

class JobDescription(Base):
    __tablename__ = "job_descriptions"

    id = Column(String, primary_key=True)
    data = Column(JSON)