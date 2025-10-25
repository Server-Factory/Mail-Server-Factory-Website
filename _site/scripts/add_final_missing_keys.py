#!/usr/bin/env python3
"""
Add final missing translation keys
"""

import yaml

FINAL_MISSING_KEYS = {
    'testing_stat_passing': 'Tests Passing (66.6%)',
    'testing_stat_connections': 'Connection Types',
    'testing_stat_completion': 'Feature Completion',
    'table_config_ubuntu25': 'Examples/Ubuntu_25.json',
    'table_config_centos_stream': 'Examples/CentOS_Stream.json',
    'table_config_opensuse156': 'Examples/openSUSE_Leap_15.6.json',
}

# Language-specific translations
LANGUAGE_SPECIFIC = {
    'ru': {
        'testing_stat_passing': 'Тесты пройдены (66,6%)',
        'testing_stat_connections': 'Типы подключений',
        'testing_stat_completion': 'Завершение функций',
    },
    'be': {
        'testing_stat_passing': 'Тэсты пройдзены (66,6%)',
        'testing_stat_connections': 'Тыпы злучэнняў',
        'testing_stat_completion': 'Завяршэнне функцый',
    },
    'zh': {
        'testing_stat_passing': '测试通过 (66.6%)',
        'testing_stat_connections': '连接类型',
        'testing_stat_completion': '功能完成',
    },
    'sr': {
        'testing_stat_passing': 'Тестови прошли (66,6%)',
        'testing_stat_connections': 'Типови веза',
        'testing_stat_completion': 'Завршетак функција',
    },
    'fr': {
        'testing_stat_passing': 'Tests réussis (66,6 %)',
        'testing_stat_connections': 'Types de connexion',
        'testing_stat_completion': 'Achèvement des fonctionnalités',
    },
    'de': {
        'testing_stat_passing': 'Tests bestanden (66,6 %)',
        'testing_stat_connections': 'Verbindungstypen',
        'testing_stat_completion': 'Funktionsvollständigkeit',
    },
    'es': {
        'testing_stat_passing': 'Pruebas aprobadas (66,6%)',
        'testing_stat_connections': 'Tipos de conexión',
        'testing_stat_completion': 'Finalización de funciones',
    },
    'pt': {
        'testing_stat_passing': 'Testes aprovados (66,6%)',
        'testing_stat_connections': 'Tipos de conexão',
        'testing_stat_completion': 'Conclusão de recursos',
    },
    'it': {
        'testing_stat_passing': 'Test superati (66,6%)',
        'testing_stat_connections': 'Tipi di connessione',
        'testing_stat_completion': 'Completamento funzionalità',
    },
    'ja': {
        'testing_stat_passing': 'テスト合格 (66.6%)',
        'testing_stat_connections': '接続タイプ',
        'testing_stat_completion': '機能完了',
    },
    'ko': {
        'testing_stat_passing': '테스트 통과 (66.6%)',
        'testing_stat_connections': '연결 유형',
        'testing_stat_completion': '기능 완료',
    },
    'ar': {
        'testing_stat_passing': 'الاختبارات المجتازة (66.6٪)',
        'testing_stat_connections': 'أنواع الاتصالات',
        'testing_stat_completion': 'اكتمال الميزات',
    },
    'fa': {
        'testing_stat_passing': 'آزمون‌های قبول شده (66.6٪)',
        'testing_stat_connections': 'انواع اتصال',
        'testing_stat_completion': 'تکمیل ویژگی',
    },
    'hi': {
        'testing_stat_passing': 'परीक्षण सफल (66.6%)',
        'testing_stat_connections': 'कनेक्शन प्रकार',
        'testing_stat_completion': 'सुविधा पूर्णता',
    },
    'tr': {
        'testing_stat_passing': 'Başarılı testler (%66,6)',
        'testing_stat_connections': 'Bağlantı türleri',
        'testing_stat_completion': 'Özellik tamamlanması',
    },
}

def load_yaml(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def save_yaml(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, allow_unicode=True, default_flow_style=False, sort_keys=False)

def add_keys(translations_file):
    print(f"Loading {translations_file}...")
    translations = load_yaml(translations_file)

    added_count = 0

    for lang_code in translations.keys():
        for key, default_value in FINAL_MISSING_KEYS.items():
            if key not in translations[lang_code]:
                if lang_code in LANGUAGE_SPECIFIC and key in LANGUAGE_SPECIFIC[lang_code]:
                    value = LANGUAGE_SPECIFIC[lang_code][key]
                else:
                    value = default_value

                translations[lang_code][key] = value
                print(f"  [{lang_code}] Added: {key}")
                added_count += 1

    print(f"\n✅ Total keys added: {added_count}")
    save_yaml(translations_file, translations)
    print("✅ Done!")

if __name__ == "__main__":
    add_keys("../_data/translations.yml")
