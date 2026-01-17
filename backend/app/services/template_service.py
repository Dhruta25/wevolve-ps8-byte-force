import os
import random
from app.utils.file_loader import load_json

def load_template(industry: str, experience: str):
    industry = industry.lower()
    experience = experience.lower()
    
    # Base directory for templates
    base_dir = "app/data/templates"
    path = os.path.join(base_dir, industry, f"{experience}.json")
    
    # Fallback to fintech if industry not found
    if not os.path.exists(path):
        print(f"Template not found at {path}, falling back to fintech")
        path = os.path.join(base_dir, "fintech", f"{experience}.json")
        
    # Catch empty file or invalid JSON early
    try:
        return load_json(path)
    except Exception as e:
        print(f"Error loading template at {path}: {e}")
        # Final fallback to mid level if specific xp fails
        fallback_path = os.path.join(base_dir, "fintech", "mid.json")
        return load_json(fallback_path)