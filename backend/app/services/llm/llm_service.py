from openai import OpenAI
from app.core.config import settings
from openai import OpenAI
from app.core.config import settings
from app.services.llm.prompt_builder import build_prompt

client = OpenAI(api_key=settings.OPENAI_API_KEY)

def enhance_with_llm(system_jd: dict, variants: list[str]):
    results = {}

    for variant in variants:
        prompt = build_prompt(system_jd, variant)

        response = client.chat.completions.create(
            model=settings.LLM_MODEL,
            messages=[
                {"role": "system", "content": "You are an expert ATS job description writer."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.6
        )

        results[variant] = response.choices[0].message.content

    return results