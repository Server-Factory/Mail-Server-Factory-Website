#!/usr/bin/env python3
"""
Add Missing Translation Keys Script
Adds all missing translation keys from index.md to translations.yml with English defaults.
"""

import yaml
import re
from pathlib import Path

def load_yaml(file_path):
    """Load YAML file safely."""
    with open(file_path, 'r', encoding='utf-8') as f:
        return yaml.load(f, Loader=yaml.Loader)

def save_yaml(file_path, data):
    """Save YAML file safely."""
    with open(file_path, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, default_flow_style=False, allow_unicode=True, sort_keys=False)

def extract_i18n_data_from_html():
    """Extract data-i18n keys and their default text from index.md."""
    with open('index.md', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all data-i18n attributes and their associated text
    pattern = r'data-i18n="([^"]+)"[^>]*>([^<]+)</'
    matches = re.findall(pattern, content, re.MULTILINE | re.DOTALL)

    i18n_data = {}
    for key, text in matches:
        # Clean up the text (remove extra whitespace)
        text = text.strip()
        # Handle HTML spans
        text = re.sub(r'<span[^>]*>(.*?)</span>', r'<span class="highlight">\1</span>', text)
        i18n_data[key] = text

    # Also find pre/code blocks with data-i18n
    pre_pattern = r'<pre[^>]*data-i18n="([^"]+)"[^>]*>(.*?)</pre>'
    pre_matches = re.findall(pre_pattern, content, re.MULTILINE | re.DOTALL)
    for key, text in pre_matches:
        text = text.strip()
        i18n_data[key] = text

    code_pattern = r'<code[^>]*data-i18n="([^"]+)"[^>]*>(.*?)</code>'
    code_matches = re.findall(code_pattern, content, re.MULTILINE | re.DOTALL)
    for key, text in code_matches:
        text = text.strip()
        i18n_data[key] = text

    return i18n_data

def main():
    """Main function to add missing keys."""
    print("🚀 Adding Missing Translation Keys...")
    print("=" * 60)

    # Load current translations
    translations = load_yaml('_data/translations.yml')

    # Extract i18n data from HTML
    html_i18n_data = extract_i18n_data_from_html()
    print(f"📋 Found {len(html_i18n_data)} data-i18n entries in index.md")

    # Get existing English keys
    existing_en_keys = set(translations['en'].keys())

    # Find missing keys
    html_keys = set(html_i18n_data.keys())
    missing_keys = html_keys - existing_en_keys

    print(f"❌ Missing keys: {len(missing_keys)}")

    # Add missing keys to English translations
    added_count = 0
    for key in sorted(missing_keys):
        if key in html_i18n_data:
            translations['en'][key] = html_i18n_data[key]
            added_count += 1
            print(f"  ✅ Added: {key}")
        else:
            print(f"  ⚠️  No default text found for: {key}")

    # For other languages, add placeholder entries
    languages = [lang for lang in translations.keys() if lang != 'en']
    for lang in languages:
        for key in missing_keys:
            if key not in translations[lang]:
                # Use English as placeholder for now
                translations[lang][key] = translations['en'][key]

    # Save the updated translations
    save_yaml('_data/translations.yml', translations)

    print("\n🎉 Completed!")
    print(f"   Added {added_count} missing keys to English translations")
    print(f"   Added placeholders for {len(languages)} other languages")
    print("\n📝 Next steps:")
    print("   - Run translation scripts to translate the new keys")
    print("   - Test the website to ensure translations work")

if __name__ == '__main__':
    main()