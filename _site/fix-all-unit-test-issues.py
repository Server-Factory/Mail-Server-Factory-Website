#!/usr/bin/env python3

"""
Fix all remaining unit test issues:
1. logo_alt_home must contain "Mail Server Factory"
2. code_json_example must preserve JSON structure
3. Version numbers must use consistent decimal separator (.)
"""

import yaml
import re
from collections import OrderedDict

def load_yaml_ordered(filepath):
    """Load YAML while preserving order"""
    class OrderedLoader(yaml.SafeLoader):
        pass

    def construct_mapping(loader, node):
        loader.flatten_mapping(node)
        return OrderedDict(loader.construct_pairs(node))

    OrderedLoader.add_constructor(
        yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG,
        construct_mapping)

    with open(filepath, 'r', encoding='utf-8') as f:
        return yaml.load(f, OrderedLoader)

def save_yaml_ordered(data, filepath):
    """Save YAML while preserving order"""
    class OrderedDumper(yaml.SafeDumper):
        pass

    def _dict_representer(dumper, data):
        return dumper.represent_mapping(
            yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG,
            data.items())

    OrderedDumper.add_representer(OrderedDict, _dict_representer)

    with open(filepath, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, Dumper=OrderedDumper,
                 allow_unicode=True, default_flow_style=False,
                 sort_keys=False, width=120)

def fix_all_issues(translations_path, dry_run=False):
    """Fix all remaining unit test issues"""

    print("Loading translations...")
    translations = load_yaml_ordered(translations_path)
    en_translations = translations['en']

    fixes_count = 0
    changes = []

    for lang_code, lang_data in translations.items():
        if lang_code == 'en':
            continue

        if not lang_data:
            print(f"Warning: {lang_code} has no translations")
            continue

        for key, value in list(lang_data.items()):
            if not isinstance(value, str):
                continue

            original_value = value

            # Fix 1: logo_alt_home must contain "Mail Server Factory"
            if key == 'logo_alt_home' and 'Mail Server Factory' not in value:
                # Keep the structure but ensure brand name is present
                # Pattern: "Mail Server Factory - [rest of the text]"
                if ' - ' in value:
                    parts = value.split(' - ', 1)
                    if len(parts) == 2:
                        lang_data[key] = f'Mail Server Factory - {parts[1]}'
                        changes.append(f"[{lang_code}] logo_alt_home: Added 'Mail Server Factory' brand")
                        fixes_count += 1
                else:
                    # If no separator, just prepend
                    lang_data[key] = f'Mail Server Factory - {value}'
                    changes.append(f"[{lang_code}] logo_alt_home: Added 'Mail Server Factory' brand")
                    fixes_count += 1

            # Fix 2: code_json_example must be identical (JSON structure)
            if key == 'code_json_example':
                correct_value = en_translations[key]
                if value != correct_value:
                    lang_data[key] = correct_value
                    changes.append(f"[{lang_code}] code_json_example: Restored JSON structure")
                    fixes_count += 1

            # Fix 3: Version numbers must use period (.) as decimal separator, not comma
            if key.startswith('table_version_') or key.startswith('distro_') and 'version' in key:
                # Replace comma with period in version numbers
                if ',' in value and re.search(r'\d+,\d+', value):
                    new_value = re.sub(r'(\d+),(\d+)', r'\1.\2', value)
                    if new_value != value:
                        lang_data[key] = new_value
                        changes.append(f"[{lang_code}] {key}: Fixed decimal separator {value} -> {new_value}")
                        fixes_count += 1

            # Fix 4: Ensure architecture_badge keys match English exactly
            if key.startswith('architecture_badge_'):
                correct_value = en_translations[key]
                if value != correct_value:
                    lang_data[key] = correct_value
                    changes.append(f"[{lang_code}] {key}: Set to '{correct_value}'")
                    fixes_count += 1

            # Fix 5: Ensure all table_version keys match English format
            if key.startswith('table_version_'):
                correct_value = en_translations[key]
                # Version strings should match
                en_numbers = re.findall(r'\d+\.?\d*', correct_value)
                lang_numbers = re.findall(r'\d+[,.]?\d*', value)

                if len(en_numbers) != len(lang_numbers):
                    # Number count mismatch, use English
                    lang_data[key] = correct_value
                    changes.append(f"[{lang_code}] {key}: Fixed version format to match English")
                    fixes_count += 1

    # Print summary
    print(f"\nFound {fixes_count} issues to fix:")
    for change in changes[:100]:  # Show first 100
        print(f"  - {change}")
    if len(changes) > 100:
        print(f"  ... and {len(changes) - 100} more fixes")

    if dry_run:
        print("\nDry run mode - no changes written")
        return fixes_count

    if fixes_count > 0:
        print(f"\nWriting fixes to {translations_path}...")
        save_yaml_ordered(translations, translations_path)
        print("✓ All unit test issues fixed successfully!")
    else:
        print("\n✓ No issues found!")

    return fixes_count

if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser(description='Fix all unit test issues in translations')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be fixed without making changes')
    parser.add_argument('--file', default='_data/translations.yml', help='Path to translations file')

    args = parser.parse_args()

    try:
        fixes = fix_all_issues(args.file, dry_run=args.dry_run)
        exit(0 if fixes >= 0 else 1)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        exit(1)
