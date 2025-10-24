#!/usr/bin/env python3
"""
Fix YAML syntax errors where two keys ended up on the same line
"""

import re

def fix_yaml_syntax():
    filepath = '_data/translations.yml'

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to find: "  key: value  compatibility_automated_desc: |-"
    # Should be: "  key: value\n  compatibility_automated_desc: |-"
    pattern = r'(\s+\w+:\s+[^\n]+?)(\s{2,}compatibility_automated_desc:\s+\|-)'

    # Count occurrences
    matches = re.findall(pattern, content)
    print(f"Found {len(matches)} YAML syntax errors to fix...")
    print()

    # Fix by adding newline between the keys
    content = re.sub(
        pattern,
        r'\1\n  compatibility_automated_desc: |-',
        content
    )

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✅ Fixed {len(matches)} syntax errors")
    print()

    # Validate
    print("Validating YAML syntax...")
    try:
        import yaml
        yaml.safe_load(open(filepath, 'r', encoding='utf-8'))
        print("✅ YAML is valid!")
        return True
    except yaml.YAMLError as e:
        print(f"❌ YAML still has errors: {e}")
        return False

if __name__ == '__main__':
    fix_yaml_syntax()
