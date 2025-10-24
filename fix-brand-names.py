#!/usr/bin/env python3

"""
Brand Name Fixer - Ensures brand names remain in original form across all translations
Fixes:
1. "Server Factory" should never be translated
2. "Mail Server Factory" should never be translated
3. Other brand names (GitHub, Docker, etc.) should remain in English
"""

import yaml
import re
import sys
from collections import OrderedDict

# Brand name replacements (incorrect translation -> correct original)
BRAND_NAME_FIXES = {
    # Russian
    'Фабрика серверов': 'Server Factory',
    'Сервер Фабрика': 'Server Factory',
    'Фабрика Серверов': 'Server Factory',
    'Фабрика почтовых серверов': 'Mail Server Factory',
    'Мейл Сервер Фабрика': 'Mail Server Factory',
    'Страницы GitHub': 'GitHub Pages',
    'Страницы Github': 'GitHub Pages',

    # Chinese
    '服务器工厂': 'Server Factory',
    '伺服器工廠': 'Server Factory',
    '邮件服务器工厂': 'Mail Server Factory',
    '郵件伺服器工廠': 'Mail Server Factory',

    # French
    'Usine de serveurs': 'Server Factory',
    'Fabrique de serveurs': 'Server Factory',
    'Usine de serveurs de messagerie': 'Mail Server Factory',
    'Fabrique de Serveur': 'Server Factory',
    'Fabrique Serveur': 'Server Factory',

    # German
    'Serverfabrik': 'Server Factory',
    'Server-Fabrik': 'Server Factory',
    'Mail-Server-Fabrik': 'Mail Server Factory',
    'Mailserverfabrik': 'Mail Server Factory',
    'Fabrik': 'Server Factory',

    # Spanish
    'Fábrica de servidores': 'Server Factory',
    'Fábrica de Servidores': 'Server Factory',
    'Fábrica de servidores de correo': 'Mail Server Factory',

    # Portuguese
    'Fábrica de servidor': 'Server Factory',
    'Fábrica de Servidor': 'Server Factory',
    'Fábrica de servidores de e-mail': 'Mail Server Factory',

    # Italian
    'Fabbrica di server': 'Server Factory',
    'Fabbrica di Server': 'Server Factory',
    'Fabbrica di server di posta': 'Mail Server Factory',

    # Norwegian
    'Serverfabrikk': 'Server Factory',
    'Server fabrikk': 'Server Factory',

    # Danish
    'Serverfabrik': 'Server Factory',
    'Server fabrik': 'Server Factory',

    # Swedish
    'Serverfabrik': 'Server Factory',
    'Server fabrik': 'Server Factory',

    # Hungarian
    'Szerver Gyár': 'Server Factory',
    'Szervergyár': 'Server Factory',

    # Romanian
    'Fabrică de servere': 'Server Factory',
    'Fabrica de Servere': 'Server Factory',

    # Bulgarian
    'Фабрика за сървъри': 'Server Factory',
    'Фабрика Сървъри': 'Server Factory',

    # Serbian
    'Фабрика сервера': 'Server Factory',
    'Фабрика Сервера': 'Server Factory',

    # Belarusian
    'Фабрыка сервераў': 'Server Factory',
    'Фабрыка Сервераў': 'Server Factory',

    # Persian/Farsi
    'کارخانه سرور': 'Server Factory',

    # Arabic
    'مصنع الخوادم': 'Server Factory',

    # Turkish
    'Sunucu Fabrikası': 'Server Factory',
    'Sunucu fabrikası': 'Server Factory',
}

# Keys that must have exact brand name values
EXACT_BRAND_KEYS = {
    'footer_server_factory': 'Server Factory',
    'footer_github_pages': 'GitHub Pages',
}

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

def fix_brand_names(translations_path, dry_run=False):
    """Fix brand names in all translations"""

    print("Loading translations...")
    translations = load_yaml_ordered(translations_path)

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

            # Check exact brand keys first
            if key in EXACT_BRAND_KEYS:
                correct_value = EXACT_BRAND_KEYS[key]
                if value != correct_value:
                    lang_data[key] = correct_value
                    changes.append(f"[{lang_code}] {key}: '{value}' -> '{correct_value}' (exact match)")
                    fixes_count += 1
                    continue

            # Apply brand name replacements
            modified = False
            for incorrect, correct in BRAND_NAME_FIXES.items():
                if incorrect in value:
                    value = value.replace(incorrect, correct)
                    modified = True

            if modified:
                lang_data[key] = value
                changes.append(f"[{lang_code}] {key}: '{original_value[:60]}...' -> '{value[:60]}...'")
                fixes_count += 1

    # Print summary
    print(f"\nFound {fixes_count} brand name issues to fix:")
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
        print("✓ Brand names fixed successfully!")
    else:
        print("\n✓ No brand name issues found!")

    return fixes_count

if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser(description='Fix brand names in translations')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be fixed without making changes')
    parser.add_argument('--file', default='_data/translations.yml', help='Path to translations file')

    args = parser.parse_args()

    try:
        fixes = fix_brand_names(args.file, dry_run=args.dry_run)
        sys.exit(0 if fixes >= 0 else 1)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)
