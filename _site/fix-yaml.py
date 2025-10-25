import yaml
import sys

with open('_data/translations.yml', 'r') as f:
    data = yaml.safe_load(f)

with open('_data/translations.yml', 'w') as f:
    yaml.dump(data, f, default_flow_style=False, allow_unicode=True, indent=2)