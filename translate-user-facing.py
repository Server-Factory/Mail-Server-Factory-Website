#!/usr/bin/env python3
"""
Translate User-Facing Content Script
Translates the most important user-facing content for all languages.
Focuses on navigation, hero section, features, and other visible elements.
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

def translate_hero_section(lang, translations):
    """Translate hero section content."""
    hero_translations = {
        'ru': {
            'hero_title': 'Запустите свой почтовый сервер <span class="highlight">Как Босс</span>',
            'hero_subtitle': 'Автоматизация почтовых серверов корпоративного уровня на базе Kotlin, Docker и проверенных технологий. Разверните полную почтовую инфраструктуру с помощью одного JSON-файла конфигурации.',
            'download_btn': '⬇ Скачать последнюю версию',
            'github_btn': '⭐ Посмотреть на GitHub',
            'stats_distributions': '12 Дистрибутивов',
            'stats_automated': '100% Автоматизация',
            'stats_production': 'Готов к продакшену',
            'stats_enterprise': 'Корпоративный уровень',
            'stat_label_tested': 'Полностью протестировано и поддерживается',
            'stat_label_config': 'Единая JSON конфигурация',
            'stat_label_protocols': 'SMTP/IMAP/POP3',
            'stat_label_docker': 'Docker + QEMU готовы'
        },
        'zh': {
            'hero_title': '像老板一样运行您的邮件服务器 <span class="highlight">Like The Boss</span>',
            'hero_subtitle': '基于Kotlin、Docker和成熟技术的企业级邮件服务器自动化。通过单个JSON配置文件部署完整的邮件基础设施。',
            'download_btn': '⬇ 下载最新版本',
            'github_btn': '⭐ 在GitHub上查看',
            'stats_distributions': '12个发行版',
            'stats_automated': '100%自动化',
            'stats_production': '生产就绪',
            'stats_enterprise': '企业级',
            'stat_label_tested': '完全测试和支持',
            'stat_label_config': '单个JSON配置',
            'stat_label_protocols': 'SMTP/IMAP/POP3',
            'stat_label_docker': 'Docker + QEMU就绪'
        },
        'fr': {
            'hero_title': 'Gérez votre serveur de messagerie <span class="highlight">Comme un Patron</span>',
            'hero_subtitle': 'Automatisation de serveur de messagerie de niveau entreprise alimentée par Kotlin, Docker et des technologies éprouvées. Déployez une infrastructure de messagerie complète avec un seul fichier de configuration JSON.',
            'download_btn': '⬇ Télécharger la dernière version',
            'github_btn': '⭐ Voir sur GitHub',
            'stats_distributions': '12 Distributions',
            'stats_automated': '100% Automatisé',
            'stats_production': 'Prêt pour la production',
            'stats_enterprise': 'Niveau Entreprise',
            'stat_label_tested': 'Entièrement testé et supporté',
            'stat_label_config': 'Configuration JSON unique',
            'stat_label_protocols': 'SMTP/IMAP/POP3',
            'stat_label_docker': 'Docker + QEMU prêt'
        },
        'de': {
            'hero_title': 'Verwalten Sie Ihren Mail-Server <span class="highlight">Wie ein Chef</span>',
            'hero_subtitle': 'Automatisierung von Mail-Servern auf Enterprise-Niveau, angetrieben von Kotlin, Docker und bewährter Technologie. Implementieren Sie eine vollständige Mail-Infrastruktur mit einer einzigen JSON-Konfigurationsdatei.',
            'download_btn': '⬇ Neueste Version herunterladen',
            'github_btn': '⭐ Auf GitHub ansehen',
            'stats_distributions': '12 Distributionen',
            'stats_automated': '100% Automatisiert',
            'stats_production': 'Produktionsbereit',
            'stats_enterprise': 'Enterprise-Niveau',
            'stat_label_tested': 'Vollständig getestet und unterstützt',
            'stat_label_config': 'Einzelne JSON-Konfiguration',
            'stat_label_protocols': 'SMTP/IMAP/POP3',
            'stat_label_docker': 'Docker + QEMU bereit'
        },
        'es': {
            'hero_title': 'Gestiona tu servidor de correo <span class="highlight">Como un Jefe</span>',
            'hero_subtitle': 'Automatización de servidores de correo de nivel empresarial impulsada por Kotlin, Docker y tecnología probada. Despliega infraestructura de correo completa con un solo archivo de configuración JSON.',
            'download_btn': '⬇ Descargar última versión',
            'github_btn': '⭐ Ver en GitHub',
            'stats_distributions': '12 Distribuciones',
            'stats_automated': '100% Automatizado',
            'stats_production': 'Listo para producción',
            'stats_enterprise': 'Nivel Empresarial',
            'stat_label_tested': 'Completamente probado y soportado',
            'stat_label_config': 'Configuración JSON única',
            'stat_label_protocols': 'SMTP/IMAP/POP3',
            'stat_label_docker': 'Docker + QEMU listo'
        },
        'ja': {
            'hero_title': 'メールサーバーを<span class="highlight">ボスのように</span>運用',
            'hero_subtitle': 'Kotlin、Docker、実証済み技術で動くエンタープライズグレードのメールサーバーオートメーション。単一のJSON設定ファイルで完全なメールインフラをデプロイ。',
            'download_btn': '⬇ 最新版をダウンロード',
            'github_btn': '⭐ GitHubで見る',
            'stats_distributions': '12ディストリビューション',
            'stats_automated': '100%自動化',
            'stats_production': '本番環境対応',
            'stats_enterprise': 'エンタープライズグレード',
            'stat_label_tested': '完全にテスト済み・サポート済み',
            'stat_label_config': '単一JSON設定',
            'stat_label_protocols': 'SMTP/IMAP/POP3',
            'stat_label_docker': 'Docker + QEMU対応'
        },
        'ko': {
            'hero_title': '메일 서버를 <span class="highlight">보스처럼</span> 운영하세요',
            'hero_subtitle': 'Kotlin, Docker, 검증된 기술로 구동되는 엔터프라이즈급 메일 서버 자동화. 단일 JSON 구성 파일로 완전한 메일 인프라를 배포하세요.',
            'download_btn': '⬇ 최신 릴리즈 다운로드',
            'github_btn': '⭐ GitHub에서 보기',
            'stats_distributions': '12개 배포판',
            'stats_automated': '100% 자동화',
            'stats_production': '프로덕션 준비 완료',
            'stats_enterprise': '엔터프라이즈급',
            'stat_label_tested': '완전히 테스트 및 지원됨',
            'stat_label_config': '단일 JSON 구성',
            'stat_label_protocols': 'SMTP/IMAP/POP3',
            'stat_label_docker': 'Docker + QEMU 준비'
        },
        'pt': {
            'hero_title': 'Gerencie seu servidor de email <span class="highlight">Como um Chefe</span>',
            'hero_subtitle': 'Automação de servidor de email de nível empresarial alimentada por Kotlin, Docker e tecnologia comprovada. Implante infraestrutura de email completa com um único arquivo de configuração JSON.',
            'download_btn': '⬇ Baixar última versão',
            'github_btn': '⭐ Ver no GitHub',
            'stats_distributions': '12 Distribuições',
            'stats_automated': '100% Automatizado',
            'stats_production': 'Pronto para produção',
            'stats_enterprise': 'Nível Empresarial',
            'stat_label_tested': 'Totalmente testado e suportado',
            'stat_label_config': 'Configuração JSON única',
            'stat_label_protocols': 'SMTP/IMAP/POP3',
            'stat_label_docker': 'Docker + QEMU pronto'
        },
        'it': {
            'hero_title': 'Gestisci il tuo server di posta <span class="highlight">Come un Capo</span>',
            'hero_subtitle': 'Automazione del server di posta di livello enterprise alimentata da Kotlin, Docker e tecnologia collaudata. Distribuisci infrastruttura di posta completa con un singolo file di configurazione JSON.',
            'download_btn': '⬇ Scarica ultima versione',
            'github_btn': '⭐ Visualizza su GitHub',
            'stats_distributions': '12 Distribuzioni',
            'stats_automated': '100% Automatizzato',
            'stats_production': 'Pronto per la produzione',
            'stats_enterprise': 'Livello Enterprise',
            'stat_label_tested': 'Completamente testato e supportato',
            'stat_label_config': 'Configurazione JSON singola',
            'stat_label_protocols': 'SMTP/IMAP/POP3',
            'stat_label_docker': 'Docker + QEMU pronto'
        }
    }

    if lang in hero_translations:
        for key, value in hero_translations[lang].items():
            if key in translations[lang]:
                translations[lang][key] = value
                print(f"  Translated {key} for {lang}")

    return translations

def translate_features_section(lang, translations):
    """Translate features section content."""
    features_translations = {
        'ru': {
            'features_title': 'Почему Mail Server Factory?',
            'features_subtitle': 'Корпоративные возможности без корпоративной сложности',
            'feature_zero_touch': 'Автоматическое развертывание',
            'feature_zero_touch_desc': 'Напишите простой JSON-файл конфигурации и позвольте Mail Server Factory сделать все остальное - от установки до инициализации. Никаких ручных настроек не требуется.',
            'feature_docker': 'Нативная поддержка Docker',
            'feature_docker_desc': 'Каждый компонент работает в своем собственном Docker-контейнере, обеспечивая изоляцию, масштабируемость и простое управление. Развертывайте на любом хосте с поддержкой Docker.',
            'feature_security': 'Встроенная безопасность',
            'feature_security_desc': 'Автоматическая генерация TLS-сертификатов с самоподписанным CA, аутентификация на основе SSH-ключей и отраслевые стандарты безопасности из коробки.',
            'feature_tested': 'Проверенный код',
            'feature_tested_desc': '100% успешное выполнение тестов с 47 комплексными тестами. Каждый компонент проверяется перед выпуском.',
            'feature_ssh': 'Удаленное выполнение на основе SSH',
            'feature_ssh_desc': 'Развертывание на удаленные серверы через SSH с пулингом соединений, автоматической передачей файлов и надежной обработкой ошибок.',
            'feature_complete': 'Полный стек',
            'feature_complete_desc': 'Postfix, Dovecot, PostgreSQL, Rspamd, Redis и ClamAV предварительно настроены и работают вместе без проблем.'
        }
    }

    if lang in features_translations:
        for key, value in features_translations[lang].items():
            if key in translations[lang]:
                translations[lang][key] = value
                print(f"  Translated {key} for {lang}")

    return translations

def translate_navigation(lang, translations):
    """Translate navigation and common UI elements."""
    nav_translations = {
        'ru': {
            'nav_documentation': '📚 Документация',
            'nav_download': 'Скачать',
            'nav_view_github': 'Посмотреть на GitHub',
            'skip_to_content': 'Перейти к основному содержимому',
            'back_to_top': 'Вернуться наверх',
            'cta_download': 'Скачать сейчас',
            'cta_github': 'Посмотреть на GitHub',
            'cta_title': 'Готовы развернуть свой почтовый сервер?',
            'cta_subtitle': 'Присоединяйтесь к сообществу Mail Server Factory и возьмите контроль над своей почтовой инфраструктурой сегодня.',
            'cta_note': 'Открытый исходный код • Бесплатно навсегда • Поддержка сообщества'
        }
    }

    if lang in nav_translations:
        for key, value in nav_translations[lang].items():
            if key in translations[lang]:
                translations[lang][key] = value
                print(f"  Translated {key} for {lang}")

    return translations

def translate_important_sections(lang, translations):
    """Translate other important sections."""
    section_translations = {
        'ru': {
            'enterprise_title': 'Корпоративные функции',
            'enterprise_subtitle': 'Готовые к продакшену возможности для корпоративной почтовой инфраструктуры',
            'tech_stack_title': 'Технологический стек',
            'tech_stack_subtitle': 'Работает на ведущих технологиях с открытым исходным кодом',
            'architecture_title': 'Корпоративная архитектура',
            'architecture_subtitle': 'Многоуровневая архитектура, разработанная для корпоративной масштабируемости и безопасности',
            'how_it_works_title': 'Как это работает',
            'how_it_works_subtitle': 'Три простых шага к вашему продакшен почтовому серверу',
            'step_configure': 'Настроить',
            'step_deploy': 'Развернуть',
            'step_use': 'Использовать',
            'quick_start_title': 'Быстрый старт',
            'testing_title': 'Качество и тестирование',
            'testing_subtitle': 'Комплексное покрытие тестами обеспечивает надежность',
            'compatibility_title': 'Матрица поддержки дистрибутивов',
            'compatibility_subtitle': 'Развертывайте на новейших современных дистрибутивах Linux серверов',
            'use_cases_title': 'Кто использует Mail Server Factory?',
            'documentation_title': 'Документация и ресурсы'
        }
    }

    if lang in section_translations:
        for key, value in section_translations[lang].items():
            if key in translations[lang]:
                translations[lang][key] = value
                print(f"  Translated {key} for {lang}")

    return translations

def main():
    """Main function to translate user-facing content."""
    print("🚀 Starting User-Facing Translation Process...")
    print("=" * 60)

    # Load current translations
    translations = load_yaml('_data/translations.yml')

    # Get all languages that need translation
    all_languages = [k for k in translations.keys() if isinstance(k, str) and k != 'en']

    print(f"📋 Languages to translate: {len(all_languages)}")

    # Focus on the most important languages first
    priority_languages = ['ru', 'zh', 'fr', 'de', 'es', 'ja', 'ko', 'pt', 'it']

    for lang in priority_languages:
        if lang in all_languages:
            print(f"\n🔄 Translating user-facing content for {lang}...")

            # Translate different sections
            translations = translate_hero_section(lang, translations)
            translations = translate_features_section(lang, translations)
            translations = translate_navigation(lang, translations)
            translations = translate_important_sections(lang, translations)

            # Save progress
            save_yaml('_data/translations.yml', translations)
            print(f"  ✅ Completed user-facing translations for {lang}")

    print("\n🎉 User-facing translation completed!")
    print(f"   Processed {len(priority_languages)} priority languages")
    print("   Other languages still have English placeholders for technical content.")
    print("\n📝 Next steps:")
    print("   - Review and improve translations for priority languages")
    print("   - Add translations for remaining languages as needed")
    print("   - Technical documentation can remain in English for now")

if __name__ == '__main__':
    main()