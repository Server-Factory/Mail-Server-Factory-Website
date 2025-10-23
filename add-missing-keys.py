#!/usr/bin/env python3
"""
Add Missing Translation Keys Script
Adds all missing translation keys to all languages with English values as placeholders.
This provides a foundation for completing translations.
"""

import yaml
import sys
from pathlib import Path

def load_yaml(file_path):
    """Load YAML file safely."""
    with open(file_path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def save_yaml(file_path, data):
    """Save YAML file safely."""
    with open(file_path, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, default_flow_style=False, allow_unicode=True, sort_keys=False)

def get_missing_keys(translations, english_keys, lang):
    """Get missing translation keys for a language."""
    if lang not in translations:
        return english_keys

    lang_keys = set(translations[lang].keys())
    return english_keys - lang_keys

def add_missing_keys_to_language(translations, english_keys, lang):
    """Add all missing keys to a language with English values as placeholders."""
    print(f"Adding missing keys for {lang}...")

    if lang not in translations:
        translations[lang] = {}

    missing_keys = get_missing_keys(translations, english_keys, lang)
    print(f"  Missing keys: {len(missing_keys)}")

    for key in missing_keys:
        # Use English value as placeholder
        translations[lang][key] = translations['en'][key]

    return translations

def main():
    """Main function to add missing keys to all languages."""
    print("🚀 Adding Missing Translation Keys...")
    print("=" * 50)

    # Load current translations
    translations = load_yaml('_data/translations.yml')
    english_keys = set(translations['en'].keys())

    # Get all languages that need keys added
    all_languages = [k for k in translations.keys() if isinstance(k, str) and k != 'en']

    print(f"📋 Languages to process: {len(all_languages)}")
    print(f"📝 Total keys per language: {len(english_keys)}")

    # Add missing keys to each language
    for lang in all_languages:
        print(f"\n🔄 Processing {lang}...")
        translations = add_missing_keys_to_language(translations, english_keys, lang)

        # Save progress periodically
        save_yaml('_data/translations.yml', translations)
        print(f"  ✅ Added missing keys for {lang}")

    print("\n🎉 Key addition completed!")
    print(f"   Processed {len(all_languages)} languages")
    print(f"   Total keys per language: {len(english_keys)}")

    # Validate completion
    print("\n🔍 Validating completion...")
    all_have_all_keys = True

    for lang in all_languages:
        missing = get_missing_keys(translations, english_keys, lang)
        if missing:
            print(f"❌ {lang} still missing {len(missing)} keys: {list(missing)[:5]}...")
            all_have_all_keys = False
        else:
            print(f"✅ {lang} has all keys")

    if all_have_all_keys:
        print("\n🎉 ALL LANGUAGES HAVE ALL KEYS!")
        print("   Ready for translation completion.")
    else:
        print("\n⚠️  Some languages still have missing keys")
if __name__ == '__main__':
    main()