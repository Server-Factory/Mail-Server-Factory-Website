#!/usr/bin/env python3
"""
Translation Validation Script
Verifies that all required translation keys are present for all supported languages.
"""

import yaml
import sys
from pathlib import Path

def load_yaml(file_path):
    """Load YAML file safely."""
    with open(file_path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def validate_translations():
    """Validate translations completeness."""
    print("🔍 Validating Mail Server Factory Translations...")

    # Load data files
    try:
        languages = load_yaml('_data/languages.yml')
        translations = load_yaml('_data/translations.yml')
    except Exception as e:
        print(f"❌ Error loading files: {e}")
        return False

    # Get supported languages (filter out non-string keys)
    supported_langs = [k for k in languages.keys() if isinstance(k, str)]
    print(f"📋 Supported languages: {len(supported_langs)}")
    print(f"   {', '.join(supported_langs)}")

    if len(supported_langs) != len(languages):
        print(f"⚠️  Warning: {len(languages) - len(supported_langs)} non-string keys found in languages.yml")

    # Get English translations as reference
    if 'en' not in translations:
        print("❌ English translations not found!")
        return False

    english_keys = set(translations['en'].keys())
    print(f"📝 Total translation keys in English: {len(english_keys)}")

    # Check each language
    missing_translations = {}
    incomplete_languages = []

    for lang in supported_langs:
        if lang not in translations:
            print(f"❌ Language {lang} completely missing from translations!")
            missing_translations[lang] = list(english_keys)
            incomplete_languages.append(lang)
            continue

        lang_translations = set(translations[lang].keys())
        missing_keys = english_keys - lang_translations

        if missing_keys:
            print(f"⚠️  Language {lang} missing {len(missing_keys)} translations:")
            for key in sorted(missing_keys):
                print(f"     - {key}")
            missing_translations[lang] = list(missing_keys)
            incomplete_languages.append(lang)
        else:
            print(f"✅ Language {lang} has complete translations")

    # Summary
    print(f"\n📊 VALIDATION SUMMARY:")
    print(f"   Languages checked: {len(supported_langs)}")
    print(f"   Complete languages: {len(supported_langs) - len(incomplete_languages)}")
    print(f"   Incomplete languages: {len(incomplete_languages)}")

    if incomplete_languages:
        print(f"   Languages needing work: {', '.join(incomplete_languages)}")
        print("\n❌ TRANSLATION VALIDATION FAILED!")
        print("   Some languages are missing translations.")
        return False
    else:
        print("\n🎉 TRANSLATION VALIDATION PASSED!")
        print("   All languages have complete translations.")
        return True

def check_english_leakage():
    """Check for potential English words in non-English translations."""
    print("\n🔍 Checking for English word leakage...")

    try:
        translations = load_yaml('_data/translations.yml')
    except Exception as e:
        print(f"❌ Error loading translations: {e}")
        return False

    # Common English words that should not appear in other locales
    english_words = {
        'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
        'an', 'a', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
        'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must',
        'can', 'shall', 'this', 'that', 'these', 'those', 'here', 'there', 'where', 'when',
        'why', 'how', 'what', 'which', 'who', 'Download', 'View', 'Like', 'Boss', 'Run',
        'Your', 'Mail', 'Server', 'Enterprise', 'Grade', 'Automated', 'Installation',
        'Comprehensive', 'Testing', 'Multi', 'Distribution'
    }

    leakage_found = False

    for lang, lang_translations in translations.items():
        if lang == 'en':
            continue  # Skip English

        for key, value in lang_translations.items():
            if isinstance(value, str):
                # Simple word-based check
                words = value.lower().split()
                found_english = set()

                for word in words:
                    # Remove punctuation
                    clean_word = ''.join(c for c in word if c.isalnum())
                    if clean_word in english_words:
                        found_english.add(clean_word)

                if found_english:
                    print(f"⚠️  English words in {lang}.{key}: {', '.join(found_english)}")
                    leakage_found = True

    if not leakage_found:
        print("✅ No English word leakage detected")
        return True
    else:
        print("❌ English word leakage found in some translations")
        return False

if __name__ == '__main__':
    print("🚀 Mail Server Factory Translation Validator")
    print("=" * 50)

    # Validate completeness
    complete = validate_translations()

    # Check for English leakage
    no_leakage = check_english_leakage()

    # Final result
    if complete and no_leakage:
        print("\n🎉 ALL VALIDATION CHECKS PASSED!")
        print("   Website is ready for 100% localization coverage.")
        sys.exit(0)
    else:
        print("\n❌ VALIDATION FAILED!")
        print("   Please fix the issues above before deploying.")
        sys.exit(1)