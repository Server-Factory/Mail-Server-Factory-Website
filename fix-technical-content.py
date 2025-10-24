#!/usr/bin/env python3

"""
Technical Content Fixer - Ensures technical content remains untranslated
Fixes:
1. File paths (Examples/... should not become Примеры/...)
2. Technical brand names in architecture badges
3. Code samples JSON structure
4. Numbers in statistics
"""

import yaml
import re
import sys
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

def fix_technical_content(translations_path, dry_run=False):
    """Fix technical content that should not be translated"""

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
            modified = False

            # Fix 1: File paths (table_config_* keys)
            if key.startswith('table_config_'):
                correct_value = en_translations[key]
                if value != correct_value:
                    lang_data[key] = correct_value
                    changes.append(f"[{lang_code}] {key}: '{value}' -> '{correct_value}' (file path)")
                    fixes_count += 1
                    modified = True

            # Fix 2: Architecture badges - should contain technical terms
            if key.startswith('architecture_badge_'):
                correct_value = en_translations[key]
                if value != correct_value:
                    lang_data[key] = correct_value
                    changes.append(f"[{lang_code}] {key}: '{value}' -> '{correct_value}' (tech badge)")
                    fixes_count += 1
                    modified = True

            # Fix 3: Code samples should be identical
            if key.startswith('code_'):
                correct_value = en_translations[key]
                # Only replace if significantly different
                if 'Examples/' in correct_value and 'Examples/' not in value:
                    lang_data[key] = correct_value
                    changes.append(f"[{lang_code}] {key}: Code sample fixed")
                    fixes_count += 1
                    modified = True
                elif 'mkdir Factory' in correct_value and 'Factory' not in value:
                    lang_data[key] = correct_value
                    changes.append(f"[{lang_code}] {key}: Code sample fixed")
                    fixes_count += 1
                    modified = True

            # Fix 4: Stats must have numbers
            if key.startswith('stats_') and key != 'stats_distributions':
                en_value = en_translations.get(key, '')
                en_number = re.search(r'\d+', en_value)
                if en_number:
                    lang_number = re.search(r'\d+', value)
                    if not lang_number:
                        # Number is missing, use English value
                        lang_data[key] = en_value
                        changes.append(f"[{lang_code}] {key}: Added missing number")
                        fixes_count += 1
                        modified = True

            # Fix 5: stats_distributions should have "12" in it
            if key == 'stats_distributions':
                if '12' not in value:
                    # Insert 12 at the beginning
                    lang_data[key] = f"12 {value}"
                    changes.append(f"[{lang_code}] {key}: Added '12' to start")
                    fixes_count += 1
                    modified = True

            # Fix 6: Logo alt text must contain "Mail Server Factory"
            if key in ['logo_alt', 'logo_alt_home']:
                if 'Mail Server Factory' not in value:
                    # Get the English version and replace main part but keep structure
                    en_value = en_translations[key]
                    # For logo_alt, it's simple
                    if key == 'logo_alt':
                        lang_data[key] = 'Mail Server Factory logo'
                        changes.append(f"[{lang_code}] {key}: Set to 'Mail Server Factory logo'")
                        fixes_count += 1
                        modified = True

    # Print summary
    print(f"\nFound {fixes_count} technical content issues to fix:")
    for change in changes[:50]:  # Show first 50
        print(f"  - {change}")
    if len(changes) > 50:
        print(f"  ... and {len(changes) - 50} more fixes")

    if dry_run:
        print("\nDry run mode - no changes written")
        return fixes_count

    if fixes_count > 0:
        print(f"\nWriting fixes to {translations_path}...")
        save_yaml_ordered(translations, translations_path)
        print("✓ Technical content fixed successfully!")
    else:
        print("\n✓ No technical content issues found!")

    return fixes_count

if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser(description='Fix technical content in translations')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be fixed without making changes')
    parser.add_argument('--file', default='_data/translations.yml', help='Path to translations file')

    args = parser.parse_args()

    try:
        fixes = fix_technical_content(args.file, dry_run=args.dry_run)
        sys.exit(0 if fixes >= 0 else 1)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)
