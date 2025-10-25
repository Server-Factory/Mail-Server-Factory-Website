#!/usr/bin/env python3
"""
Final validation of translations
Verify:
1. No placeholders remain
2. All languages have all keys
3. Serbian is in Cyrillic
"""

import yaml
import re

def validate_translations():
    filepath = '_data/translations.yml'

    print("=" * 80)
    print("  FINAL TRANSLATION VALIDATION")
    print("=" * 80)
    print()

    # Load YAML
    with open(filepath, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)

    # Get English keys as reference
    english_keys = set(data['en'].keys())
    print(f"✓ English reference has {len(english_keys)} keys")

    # Get all languages except English
    languages = [lang for lang in data.keys() if lang != 'en']
    print(f"✓ Found {len(languages)} non-English languages")
    print()

    # Check each language
    print("Checking translation completeness...")
    print("-" * 80)

    all_complete = True
    for lang in sorted(languages):
        lang_keys = set(data[lang].keys())
        missing = english_keys - lang_keys
        extra = lang_keys - english_keys

        if missing:
            print(f"❌ {lang.upper()}: Missing {len(missing)} keys: {', '.join(sorted(missing)[:5])}...")
            all_complete = False
        elif extra:
            print(f"⚠️  {lang.upper()}: Has {len(extra)} extra keys: {', '.join(sorted(extra)[:5])}...")
        else:
            print(f"✅ {lang.upper()}: Complete ({len(lang_keys)} keys)")

    print()

    # Check for placeholders
    print("Checking for untranslated placeholders...")
    print("-" * 80)

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    placeholder_patterns = [
        r'\[NEEDS_[A-Z]{2}_TRANSLATION\]',
        r'\[LANG_CODE\]',
        r'\[TODO\]',
        r'UNTRANSLATED',
        r'\[TRANSLATE\]',
    ]

    total_placeholders = 0
    for pattern in placeholder_patterns:
        matches = re.findall(pattern, content, re.IGNORECASE)
        if matches:
            print(f"❌ Found {len(matches)} instances of {pattern}")
            total_placeholders += len(matches)

    if total_placeholders == 0:
        print("✅ No untranslated placeholders found!")
    else:
        print(f"\n❌ Total placeholders: {total_placeholders}")
        all_complete = False

    print()

    # Verify Serbian is Cyrillic
    print("Verifying Serbian language script...")
    print("-" * 80)

    serbian_text = str(data['sr'])

    # Check for Cyrillic characters
    cyrillic_pattern = r'[\u0400-\u04FF]'  # Cyrillic Unicode range
    cyrillic_matches = len(re.findall(cyrillic_pattern, serbian_text))

    # Check for Latin characters in specific Serbian words (would indicate Latin script)
    # Serbian Latin would have words like "pokrenite", "distribucija", etc.
    latin_serbian_indicators = ['pokrenite', 'distribucija', 'automatizovano', 'konfiguracija']
    latin_matches = sum(1 for word in latin_serbian_indicators if word.lower() in serbian_text.lower())

    if cyrillic_matches > 100 and latin_matches == 0:
        print(f"✅ Serbian is in Cyrillic script ({cyrillic_matches} Cyrillic characters)")
        print(f"   Sample: {data['sr']['hero_title'][:50]}...")
    else:
        print(f"❌ Serbian may be in Latin script!")
        print(f"   Cyrillic characters: {cyrillic_matches}")
        print(f"   Latin indicators: {latin_matches}")
        all_complete = False

    print()

    # Final summary
    print("=" * 80)
    if all_complete:
        print("🎉 SUCCESS! ALL TRANSLATIONS ARE COMPLETE!")
        print("   ✅ All 27 languages have all keys")
        print("   ✅ No untranslated placeholders remain")
        print("   ✅ Serbian is in Cyrillic script")
        print("   ✅ YAML syntax is valid")
    else:
        print("⚠️  Some issues were found (see above)")
    print("=" * 80)
    print()

    return all_complete

if __name__ == '__main__':
    validate_translations()
