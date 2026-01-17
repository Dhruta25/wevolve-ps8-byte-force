# AI-Powered Job Description Generator (Problem Statement 8)

## 📌 Problem Statement Chosen
**Problem Statement 8: AI-Powered Job Description Generator**

Many employers struggle to write clear, compelling, and ATS-friendly job descriptions. The goal of this project is to build a backend system that generates **structured, professional job descriptions** from minimal input, with optional **AI (LLM) enhancement**, A/B testing, and quality scoring.

---

## 🚀 Solution Overview

This project implements a **hybrid job description generation system**:
- A **rule-based system** (templates + skill mappings) generates a reliable, ATS-optimized base description.
- An **LLM enhancement layer (OpenAI)** optionally improves language quality and tone.
- Multiple AI variants (A/B testing) are generated.
- Each AI variant is evaluated using a **readability score** (Flesch Reading Ease).

This approach ensures **accuracy, transparency, and control**, while still leveraging AI for quality improvements.

---

## 🧠 Key Features

- ✅ System-generated ATS-friendly job descriptions
- ✅ Optional LLM-enhanced descriptions (OpenAI)
- ✅ A/B testing (Professional, Concise, Startup-friendly)
- ✅ Readability scoring using `textstat`
- ✅ Clean FastAPI architecture
- ✅ Swagger API documentation
- ✅ Easy extensibility for future features

---

## 🛠️ Tech Stack Used

**Backend**
- Python 3.11+
- FastAPI
- Uvicorn

**AI / NLP**
- OpenAI API
- Prompt-engineered LLM enhancement
- Hybrid rule-based + AI design

**Utilities**
- `textstat` (readability scoring)
- Pydantic (data validation)

---

## 📂 Project Structure (Simplified)
```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       └── routes/          # API routes
│   ├── services/               # Business logic (generator, LLM, readability)
│   ├── schemas/                # Pydantic schemas
│   ├── data/                   # Templates & skill/culture mappings
│   ├── utils/                  # File loaders & helpers
│   └── main.py                 # FastAPI entry point
│
├── requirements.txt
└── .env
```
---

## ⚙️ Setup Instructions (Step-by-Step)

### 1️⃣ Clone the Repository

git clone <your-repo-url>
cd backend

2️⃣ Create Virtual Environment
python3 -m venv venv

MacOS/linux
source venv/bin/activate

Windows
venv\Scripts\activate

Install Dependencies
pip install -r requirements.txt

Create your .env file
OPENAI_API_KEY = "openai-api-key"
LLM_MODEL = "openai-4o-mini"


## 📡 API Documentation

### Generate Job Description

Generates a structured, ATS-friendly job description using a rule-based system, with optional AI (LLM) enhancement and A/B testing.

---

### **Endpoint**

---

### **Query Parameters**

| Parameter | Type | Required | Description |
|---------|------|----------|------------|
| `use_llm` | boolean | No | Enable LLM-based enhancement and A/B variants |

**Example:**

---

### **Request Body**

```json
{
  "job_title": "Backend Developer",
  "company_name": "Wevolve",
  "industry": "fintech",
  "experience_level": "mid",
  "key_skills": ["Python", "FastAPI", "PostgreSQL"],
  "company_culture": "Startup",
  "special_requirements": "backend developer"
}
```
### **Response Body**
```json
{
  "system_generated": {
    "job_title": "Backend Developer",
    "company_name": "Wevolve",
    "about_role": "...",
    "responsibilities": [...],
    "required_skills": [...],
    "preferred_skills": [...],
    "experience": "...",
    "benefits": [...],
    "company_about": "..."
  },
  "llm_variants": {
    "default": {
      "content": "...",
      "readability_score": 61.4
    },
    "concise": {
      "content": "...",
      "readability_score": 69.2
    },
    "startup": {
      "content": "...",
      "readability_score": 72.8
    }
  }
}
```

