def build_prompt(system_jd: dict, variant: str = "default") -> str:
    VARIANT_INSTRUCTIONS = {
        "default": "Use a professional, neutral corporate tone.",
        "concise": "Make the job description concise and to-the-point while preserving all key information.",
        "startup": "Use a friendly, energetic, startup-style tone while remaining professional."
    }

    variant_instruction = VARIANT_INSTRUCTIONS.get(
        variant, VARIANT_INSTRUCTIONS["default"]
    )

    return f"""
        You are a professional HR content writer.

        TASK:
        Improve the job description below.

        STYLE INSTRUCTION:
        {variant_instruction}

        STRICT RULES:
        - Keep ATS-friendly formatting
        - DO NOT add new skills
        - DO NOT remove any section
        - DO NOT change job title or experience
        - Keep bullet points as bullet points
        - No hallucinations

        JOB DESCRIPTION:

        About the Role:
        {system_jd['about_role']}

        Responsibilities:
        {system_jd['responsibilities']}

        Required Skills:
        {system_jd['required_skills']}

        Preferred Skills:
        {system_jd['preferred_skills']}

        Experience:
        {system_jd['experience']}

        Benefits:
        {system_jd['benefits']}

        Company Overview:
        {system_jd['company_about']}
        """