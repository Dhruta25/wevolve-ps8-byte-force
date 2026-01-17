from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware   # ✅ ADD THIS
from app.api.v1.api_router import api_router
from app.core.config import settings

app = FastAPI(title=settings.APP_NAME)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def health_check():
    return {"status": "Backend running successfully"}