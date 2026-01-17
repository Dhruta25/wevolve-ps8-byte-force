import json

def load_json(path):
    print("Loading template", path)
    with open(path, "r") as f:
        return json.load(f)