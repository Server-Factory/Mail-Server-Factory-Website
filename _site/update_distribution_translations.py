#!/usr/bin/env python3
"""
Mail Server Factory - Website Translation Update Script
Updates all 29 languages with new distribution information
"""

import yaml
import sys
from pathlib import Path

# Define new distribution data
NEW_DISTRIBUTION_DATA = {
    'en': {
        'stats_distributions': '25 Distributions',

        # Russian distributions
        'distro_altlinux': 'ALT Linux',
        'distro_altlinux_versions': 'p10, p10-server',
        'distro_astra': 'Astra Linux CE',
        'distro_astra_versions': '2.12',
        'distro_rosa': 'ROSA Linux',
        'distro_rosa_versions': '12.4',

        # Chinese distributions
        'distro_openeuler': 'openEuler',
        'distro_openeuler_versions': '24.03 LTS, 22.03 LTS SP4',
        'distro_openkylin': 'openKylin',
        'distro_openkylin_versions': '2.0',
        'distro_deepin': 'Deepin',
        'distro_deepin_versions': '23',

        # Updated existing distributions
        'distro_ubuntu_versions': '25.10, 24.04 LTS, 22.04 LTS',
        'distro_centos': 'CentOS',
        'distro_centos_versions': 'Stream 9, 8, 7',
        'distro_opensuse_versions': '15.5, 15.6',

        # Remove RHEL/SLES references (keep keys for compatibility but mark as removed)
        'distro_rhel_note': 'Requires Red Hat Developer account (manual registration)',
        'distro_sles_note': 'Requires SUSE Customer Center account (manual registration)',

        # Updated descriptions
        'compatibility_subtitle': 'Deploy on 25 modern Linux distributions: Western, Russian, and Chinese platforms',
        'compatibility_note': 'Note: Supports 25 distributions across Western, Russian (ALT, Astra, ROSA), and Chinese (openEuler, openKylin, Deepin) platforms. SELinux enforcing mode is not currently supported.',

        # Regional categorization
        'distro_category_western': 'Western Distributions',
        'distro_category_russian': 'Russian Distributions 🇷🇺',
        'distro_category_chinese': 'Chinese Distributions 🇨🇳',

        # Configuration examples
        'table_config_altlinux_p10': 'Examples/ALTLinux_p10.json',
        'table_config_altlinux_server': 'Examples/ALTLinux_p10_Server.json',
        'table_config_astra': 'Examples/Astra_Linux_CE_2.12.json',
        'table_config_rosa': 'Examples/ROSA_Linux_12.json',
        'table_config_openeuler_24': 'Examples/openEuler_24.03_LTS.json',
        'table_config_openeuler_22': 'Examples/openEuler_22.03_LTS_SP4.json',
        'table_config_openkylin': 'Examples/openKylin_2.0.json',
        'table_config_deepin': 'Examples/Deepin_23.json',
        'table_config_ubuntu25': 'Examples/Ubuntu_25.json',
        'table_config_centos_stream': 'Examples/CentOS_Stream.json',
        'table_config_opensuse156': 'Examples/openSUSE_Leap_15.6.json',
    },

    # Russian translations
    'ru': {
        'stats_distributions': '25 Дистрибутивов',

        'distro_altlinux': 'ALT Linux',
        'distro_altlinux_versions': 'p10, p10-сервер',
        'distro_astra': 'Astra Linux CE',
        'distro_astra_versions': '2.12',
        'distro_rosa': 'ROSA Linux',
        'distro_rosa_versions': '12.4',

        'distro_openeuler': 'openEuler',
        'distro_openeuler_versions': '24.03 LТС, 22.03 ЛТС SP4',
        'distro_openkylin': 'openKylin',
        'distro_openkylin_versions': '2.0',
        'distro_deepin': 'Deepin',
        'distro_deepin_versions': '23',

        'distro_ubuntu_versions': '25.10, 24.04 ЛТС, 22.04 ЛТС',
        'distro_centos': 'CentOS',
        'distro_centos_versions': 'Stream 9, 8, 7',
        'distro_opensuse_versions': '15.5, 15.6',

        'distro_category_western': 'Западные Дистрибутивы',
        'distro_category_russian': 'Российские Дистрибутивы 🇷🇺',
        'distro_category_chinese': 'Китайские Дистрибутивы 🇨🇳',

        'compatibility_subtitle': 'Развертывание на 25 современных дистрибутивах Linux: западные, российские и китайские платформы',
    },

    # Chinese translations
    'zh': {
        'stats_distributions': '25个发行版',

        'distro_altlinux': 'ALT Linux',
        'distro_altlinux_versions': 'p10, p10-服务器',
        'distro_astra': 'Astra Linux CE',
        'distro_astra_versions': '2.12',
        'distro_rosa': 'ROSA Linux',
        'distro_rosa_versions': '12.4',

        'distro_openeuler': 'openEuler',
        'distro_openeuler_versions': '24.03 LTS, 22.03 LTS SP4',
        'distro_openkylin': 'openKylin',
        'distro_openkylin_versions': '2.0',
        'distro_deepin': 'Deepin',
        'distro_deepin_versions': '23',

        'distro_ubuntu_versions': '25.10, 24.04 LTS, 22.04 LTS',
        'distro_centos': 'CentOS',
        'distro_centos_versions': 'Stream 9, 8, 7',
        'distro_opensuse_versions': '15.5, 15.6',

        'distro_category_western': '西方发行版',
        'distro_category_russian': '俄罗斯发行版 🇷🇺',
        'distro_category_chinese': '中国发行版 🇨🇳',

        'compatibility_subtitle': '支持25个现代Linux发行版：西方、俄罗斯和中国平台',
    },
}

# For other languages, use English as placeholder (will be translated later)
PLACEHOLDER_LANGUAGES = [
    'be', 'hi', 'fa', 'ar', 'ko', 'ja', 'sr', 'fr', 'de', 'es', 'pt', 'no',
    'da', 'sv', 'is', 'bg', 'ro', 'hu', 'it', 'el', 'he', 'ka', 'kk', 'uz', 'tg', 'tr'
]

def load_translations(file_path):
    """Load translations YAML file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def save_translations(file_path, data):
    """Save translations YAML file"""
    with open(file_path, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, allow_unicode=True, default_flow_style=False, sort_keys=False)

def update_translations(translations_file):
    """Update translations with new distribution data"""
    print(f"Loading translations from {translations_file}")
    translations = load_translations(translations_file)

    updated_count = 0
    added_count = 0

    # Update each language
    for lang_code, lang_data in translations.items():
        if lang_code == 'en':
            # English - full update
            for key, value in NEW_DISTRIBUTION_DATA['en'].items():
                if key in lang_data:
                    if lang_data[key] != value:
                        print(f"  [{lang_code}] Updated: {key}")
                        lang_data[key] = value
                        updated_count += 1
                else:
                    print(f"  [{lang_code}] Added: {key}")
                    lang_data[key] = value
                    added_count += 1

        elif lang_code in NEW_DISTRIBUTION_DATA:
            # Languages with custom translations (ru, zh)
            for key, value in NEW_DISTRIBUTION_DATA[lang_code].items():
                if key in lang_data:
                    if lang_data[key] != value:
                        print(f"  [{lang_code}] Updated: {key}")
                        lang_data[key] = value
                        updated_count += 1
                else:
                    print(f"  [{lang_code}] Added: {key}")
                    lang_data[key] = value
                    added_count += 1

        else:
            # Other languages - use English as placeholder
            for key, value in NEW_DISTRIBUTION_DATA['en'].items():
                if key not in lang_data:
                    print(f"  [{lang_code}] Added (placeholder): {key}")
                    lang_data[key] = value  # English placeholder
                    added_count += 1
                elif key == 'stats_distributions':
                    # Always update distribution count
                    lang_data[key] = '25 Distributions'
                    updated_count += 1

    print(f"\nSummary:")
    print(f"  Updated keys: {updated_count}")
    print(f"  Added keys: {added_count}")
    print(f"  Total changes: {updated_count + added_count}")

    # Save updated translations
    print(f"\nSaving updated translations to {translations_file}")
    save_translations(translations_file, translations)
    print("✓ Translations updated successfully!")

    return updated_count + added_count

def main():
    """Main execution"""
    translations_file = Path(__file__).parent / '_data' / 'translations.yml'

    if not translations_file.exists():
        print(f"Error: Translations file not found: {translations_file}")
        sys.exit(1)

    print("="*70)
    print("Mail Server Factory - Distribution Translation Update")
    print("="*70)
    print()

    total_changes = update_translations(translations_file)

    print()
    print("="*70)
    print(f"✓ Complete! Total changes: {total_changes}")
    print("="*70)
    print()
    print("Next steps:")
    print("1. Review the changes in _data/translations.yml")
    print("2. Translate placeholder English text to other languages")
    print("3. Run translation validator: node tests/translation-validator.js")
    print("4. Run unit tests: node tests/unit/translation-unit-tests.js")
    print()

if __name__ == '__main__':
    main()
