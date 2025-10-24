#!/usr/bin/env python3
"""
Script to add missing translation keys to all languages in translations.yml
"""

import yaml
import sys
from collections import OrderedDict

# Missing translation keys with English base translations
MISSING_KEYS = {
    # Section headers for distribution categories
    'distro_section_western': '🌍 Western Distributions',
    'distro_section_russian': '🇷🇺 Russian Distributions',
    'distro_section_chinese': '🇨🇳 Chinese Distributions',

    # Table family names
    'table_family_alt': 'ALT',
    'table_family_ubuntu_based': 'Ubuntu-based',

    # Ubuntu 25.10
    'table_version_ubuntu25': '25.10',
    'table_config_ubuntu25': 'Examples/Ubuntu_25.json',

    # CentOS versions
    'table_version_centos_stream9': 'Stream 9',
    'table_version_centos8': '8',
    'table_version_centos7': '7',
    'table_config_centos_stream': 'Examples/CentOS_Stream.json',
    'table_config_centos8': 'Examples/Centos_8.json',
    'table_config_centos7': 'Examples/Centos_7.json',

    # AlmaLinux/Rocky updated versions
    'table_version_almalinux9': '9',
    'table_version_rocky9': '9',

    # openSUSE 15.5
    'table_version_opensuse155': '15.5',
    'table_config_opensuse156': 'Examples/openSUSE_Leap_15.6.json',

    # ALT Linux
    'table_version_alt_p10': 'p10',
    'table_version_alt_p10_server': 'p10-server',
    'table_config_alt_p10': 'Examples/ALTLinux_p10.json',
    'table_config_alt_p10_server': 'Examples/ALTLinux_p10_Server.json',

    # Astra Linux
    'table_version_astra_ce212': 'CE 2.12',
    'table_config_astra_ce212': 'Examples/Astra_Linux_CE_2.12.json',

    # ROSA Linux
    'table_version_rosa124': '12.4',
    'table_config_rosa12': 'Examples/ROSA_Linux_12.json',

    # openEuler
    'table_version_openeuler2403': '24.03 LTS',
    'table_version_openeuler2203_sp4': '22.03 LTS SP4',
    'table_config_openeuler2403': 'Examples/openEuler_24.03_LTS.json',
    'table_config_openeuler2203_sp4': 'Examples/openEuler_22.03_LTS_SP4.json',

    # openKylin
    'table_version_openkylin20': '2.0',
    'table_config_openkylin20': 'Examples/openKylin_2.0.json',

    # Deepin
    'table_version_deepin23': '23',
    'table_config_deepin23': 'Examples/Deepin_23.json',
}

# Language-specific translations (override English defaults)
LANGUAGE_TRANSLATIONS = {
    'ru': {
        'distro_section_western': '🌍 Западные дистрибутивы',
        'distro_section_russian': '🇷🇺 Российские дистрибутивы',
        'distro_section_chinese': '🇨🇳 Китайские дистрибутивы',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'На основе Ubuntu',
    },
    'be': {
        'distro_section_western': '🌍 Заходнія дыстрыбутывы',
        'distro_section_russian': '🇷🇺 Расійскія дыстрыбутывы',
        'distro_section_chinese': '🇨🇳 Кітайскія дыстрыбутывы',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'На аснове Ubuntu',
    },
    'zh': {
        'distro_section_western': '🌍 西方发行版',
        'distro_section_russian': '🇷🇺 俄罗斯发行版',
        'distro_section_chinese': '🇨🇳 中国发行版',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': '基于Ubuntu',
    },
    'sr': {
        'distro_section_western': '🌍 Западне дистрибуције',
        'distro_section_russian': '🇷🇺 Руске дистрибуције',
        'distro_section_chinese': '🇨🇳 Кинеске дистрибуције',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Базирано на Ubuntu',
    },
    'fr': {
        'distro_section_western': '🌍 Distributions occidentales',
        'distro_section_russian': '🇷🇺 Distributions russes',
        'distro_section_chinese': '🇨🇳 Distributions chinoises',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Basé sur Ubuntu',
    },
    'de': {
        'distro_section_western': '🌍 Westliche Distributionen',
        'distro_section_russian': '🇷🇺 Russische Distributionen',
        'distro_section_chinese': '🇨🇳 Chinesische Distributionen',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Ubuntu-basiert',
    },
    'es': {
        'distro_section_western': '🌍 Distribuciones occidentales',
        'distro_section_russian': '🇷🇺 Distribuciones rusas',
        'distro_section_chinese': '🇨🇳 Distribuciones chinas',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Basado en Ubuntu',
    },
    'pt': {
        'distro_section_western': '🌍 Distribuições ocidentais',
        'distro_section_russian': '🇷🇺 Distribuições russas',
        'distro_section_chinese': '🇨🇳 Distribuições chinesas',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Baseado em Ubuntu',
    },
    'it': {
        'distro_section_western': '🌍 Distribuzioni occidentali',
        'distro_section_russian': '🇷🇺 Distribuzioni russe',
        'distro_section_chinese': '🇨🇳 Distribuzioni cinesi',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Basato su Ubuntu',
    },
    'ja': {
        'distro_section_western': '🌍 西洋のディストリビューション',
        'distro_section_russian': '🇷🇺 ロシアのディストリビューション',
        'distro_section_chinese': '🇨🇳 中国のディストリビューション',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Ubuntuベース',
    },
    'ko': {
        'distro_section_western': '🌍 서양 배포판',
        'distro_section_russian': '🇷🇺 러시아 배포판',
        'distro_section_chinese': '🇨🇳 중국 배포판',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Ubuntu 기반',
    },
    'ar': {
        'distro_section_western': '🌍 التوزيعات الغربية',
        'distro_section_russian': '🇷🇺 التوزيعات الروسية',
        'distro_section_chinese': '🇨🇳 التوزيعات الصينية',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'مبني على Ubuntu',
    },
    'fa': {
        'distro_section_western': '🌍 توزیع‌های غربی',
        'distro_section_russian': '🇷🇺 توزیع‌های روسی',
        'distro_section_chinese': '🇨🇳 توزیع‌های چینی',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'مبتنی بر Ubuntu',
    },
    'hi': {
        'distro_section_western': '🌍 पश्चिमी वितरण',
        'distro_section_russian': '🇷🇺 रूसी वितरण',
        'distro_section_chinese': '🇨🇳 चीनी वितरण',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Ubuntu आधारित',
    },
    'tr': {
        'distro_section_western': '🌍 Batı Dağıtımları',
        'distro_section_russian': '🇷🇺 Rus Dağıtımları',
        'distro_section_chinese': '🇨🇳 Çin Dağıtımları',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Ubuntu tabanlı',
    },
    'el': {
        'distro_section_western': '🌍 Δυτικές διανομές',
        'distro_section_russian': '🇷🇺 Ρωσικές διανομές',
        'distro_section_chinese': '🇨🇳 Κινεζικές διανομές',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Βασισμένο σε Ubuntu',
    },
    'bg': {
        'distro_section_western': '🌍 Западни дистрибуции',
        'distro_section_russian': '🇷🇺 Руски дистрибуции',
        'distro_section_chinese': '🇨🇳 Китайски дистрибуции',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Базиран на Ubuntu',
    },
    'ro': {
        'distro_section_western': '🌍 Distribuții occidentale',
        'distro_section_russian': '🇷🇺 Distribuții rusești',
        'distro_section_chinese': '🇨🇳 Distribuții chinezești',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Bazat pe Ubuntu',
    },
    'hu': {
        'distro_section_western': '🌍 Nyugati disztribúciók',
        'distro_section_russian': '🇷🇺 Orosz disztribúciók',
        'distro_section_chinese': '🇨🇳 Kínai disztribúciók',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Ubuntu-alapú',
    },
    'no': {
        'distro_section_western': '🌍 Vestlige distribusjoner',
        'distro_section_russian': '🇷🇺 Russiske distribusjoner',
        'distro_section_chinese': '🇨🇳 Kinesiske distribusjoner',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Ubuntu-basert',
    },
    'da': {
        'distro_section_western': '🌍 Vestlige distributioner',
        'distro_section_russian': '🇷🇺 Russiske distributioner',
        'distro_section_chinese': '🇨🇳 Kinesiske distributioner',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Ubuntu-baseret',
    },
    'sv': {
        'distro_section_western': '🌍 Västerländska distributioner',
        'distro_section_russian': '🇷🇺 Ryska distributioner',
        'distro_section_chinese': '🇨🇳 Kinesiska distributioner',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Ubuntu-baserad',
    },
    'is': {
        'distro_section_western': '🌍 Vestrænar dreifingar',
        'distro_section_russian': '🇷🇺 Rússneskar dreifingar',
        'distro_section_chinese': '🇨🇳 Kínverskar dreifingar',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Ubuntu-byggt',
    },
    'he': {
        'distro_section_western': '🌍 הפצות מערביות',
        'distro_section_russian': '🇷🇺 הפצות רוסיות',
        'distro_section_chinese': '🇨🇳 הפצות סיניות',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'מבוסס Ubuntu',
    },
    'ka': {
        'distro_section_western': '🌍 დასავლური დისტრიბუციები',
        'distro_section_russian': '🇷🇺 რუსული დისტრიბუციები',
        'distro_section_chinese': '🇨🇳 ჩინური დისტრიბუციები',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Ubuntu-ზე დაფუძნებული',
    },
    'kk': {
        'distro_section_western': '🌍 Батыс дистрибутивтері',
        'distro_section_russian': '🇷🇺 Орыс дистрибутивтері',
        'distro_section_chinese': '🇨🇳 Қытай дистрибутивтері',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Ubuntu негізінде',
    },
    'uz': {
        'distro_section_western': '🌍 G\'arbiy tarqatmalar',
        'distro_section_russian': '🇷🇺 Rus tarqatmalari',
        'distro_section_chinese': '🇨🇳 Xitoy tarqatmalari',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Ubuntu asosida',
    },
    'tg': {
        'distro_section_western': '🌍 Тақсимотҳои ғарбӣ',
        'distro_section_russian': '🇷🇺 Тақсимотҳои русӣ',
        'distro_section_chinese': '🇨🇳 Тақсимотҳои хитоӣ',
        'table_family_alt': 'ALT',
        'table_family_ubuntu_based': 'Дар асоси Ubuntu',
    },
}

def load_yaml_preserving_order(file_path):
    """Load YAML while preserving order"""
    with open(file_path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def save_yaml_preserving_order(file_path, data):
    """Save YAML while preserving order"""
    with open(file_path, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, allow_unicode=True, default_flow_style=False, sort_keys=False)

def add_missing_keys(translations_file):
    """Add missing translation keys to all languages"""
    print(f"Loading {translations_file}...")
    translations = load_yaml_preserving_order(translations_file)

    added_count = 0

    for lang_code in translations.keys():
        print(f"\nProcessing language: {lang_code}")

        for key, default_value in MISSING_KEYS.items():
            if key not in translations[lang_code]:
                # Use language-specific translation if available, otherwise use default
                if lang_code in LANGUAGE_TRANSLATIONS and key in LANGUAGE_TRANSLATIONS[lang_code]:
                    value = LANGUAGE_TRANSLATIONS[lang_code][key]
                else:
                    value = default_value

                translations[lang_code][key] = value
                print(f"  Added: {key} = {value}")
                added_count += 1

    print(f"\n✅ Total keys added: {added_count}")
    print(f"Saving {translations_file}...")
    save_yaml_preserving_order(translations_file, translations)
    print("✅ Done!")

if __name__ == "__main__":
    translations_file = "../_data/translations.yml"
    add_missing_keys(translations_file)
