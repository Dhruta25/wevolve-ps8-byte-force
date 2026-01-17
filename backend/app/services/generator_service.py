import random
from app.schemas.job_schema import JobInput
from app.services.template_service import load_template
from app.utils.file_loader import load_json
from app.services.llm.llm_service import enhance_with_llm
from app.services.readability_service import calculate_readability

def generate_job_description(payload: JobInput, use_llm: bool = False):

    template = load_template(payload.industry, payload.experience_level)

    skill_map = load_json("app/data/templates/mapping/skill_responsibilities.json")
    culture_map = load_json("app/data/templates/mapping/culture_benifits.json")

    responsibilities = []
    for skill in payload.key_skills:
        if skill in skill_map:
            responsibilities.append(random.choice(skill_map[skill]))

    benefits = culture_map.get(payload.company_culture, [])

    about_role = " ".join(template["about_role"]).format(
        job_title=payload.job_title
    )

    company_about = template["company_about"].format(
        company_name=payload.company_name
    )

    system_generated = {
        "job_title": payload.job_title,
        "company_name": payload.company_name,
        "about_role": about_role,
        "responsibilities": responsibilities[:7],
        "required_skills": payload.key_skills,
        "preferred_skills": [payload.special_requirements]
        if payload.special_requirements else [],
        "experience": template["experience"],
        "benefits": benefits,
        "company_about": company_about
    }

    llm_variants = None

    if use_llm:
        raw_variants = enhance_with_llm(
            system_generated,
            variants=["default", "concise", "startup"]
        )

        llm_variants = {}
        for variant_name, content in raw_variants.items():
            llm_variants[variant_name] = {
                "content": content,
                "readability_score": calculate_readability(content)
            }

    
    return {
        "system_generated": system_generated,
        "llm_variants": llm_variants,
        "llm_enhanced": llm_variants["default"]["content"] if llm_variants else None
    }