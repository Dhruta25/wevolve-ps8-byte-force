import textstat

def calculate_readability(text: str) -> float:
    """
    Returns Flesch Reading Ease score
    """
    if not text or len(text.strip()) == 0:
        return 0.0

    return round(textstat.flesch_reading_ease(text), 2)