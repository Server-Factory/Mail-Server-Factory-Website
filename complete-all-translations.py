#!/usr/bin/env python3
"""
Complete All Translations
Translates all remaining languages that still have English placeholders.
"""

import yaml

def load_yaml(file_path):
    """Load YAML file safely."""
    with open(file_path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def save_yaml(file_path, data):
    """Save YAML file safely."""
    with open(file_path, 'w', encoding='utf-8') as f:
        yaml.dump(data, f, default_flow_style=False, allow_unicode=True, sort_keys=False)

def apply_translations(translations, lang_code, lang_translations):
    """Apply translations for a specific language."""
    print(f"🔄 Translating {lang_code}...")
    
    for key, value in lang_translations.items():
        if key in translations[lang_code]:
            translations[lang_code][key] = value
    
    return translations

def main():
    print("🚀 Starting Complete Translation of All Remaining Languages...")
    print("=" * 60)
    
    # Load translations
    translations = load_yaml('_data/translations.yml')
    
    # Bulgarian translations
    bg_translations = {
        'hero_title': 'Стартирайте вашия имейл сървър <span class="highlight">Като Шеф</span>',
        'hero_subtitle': 'Автоматизация на имейл сървъри на корпоративно ниво, задвижвана от Kotlin, Docker и доказани технологии. Разгърнете пълна имейл инфраструктура с един JSON конфигурационен файл.',
        'download_btn': '⬇ Изтеглете последната версия',
        'github_btn': '⭐ Вижте в GitHub',
        'stats_distributions': '12 Дистрибуции',
        'stats_automated': '100% Автоматизирано',
        'stats_production': 'Готово за производство',
        'stats_enterprise': 'Корпоративно ниво',
        'stat_label_tested': 'Напълно тествано и поддържано',
        'stat_label_config': 'Един JSON конфиг',
        'stat_label_protocols': 'SMTP/IMAP/POP3',
        'stat_label_docker': 'Docker + QEMU готово',
        'features_title': 'Защо Mail Server Factory?',
        'features_subtitle': 'Корпоративни възможности без корпоративната сложност',
        'feature_zero_touch': 'Автоматично разгръщане',
        'feature_zero_touch_desc': 'Напишете прост JSON конфигурационен файл и оставете Mail Server Factory да се погрижи за всичко - от инсталация до инициализация. Не се изисква ръчна конфигурация.',
        'feature_docker': 'Нативна поддръжка на Docker',
        'feature_docker_desc': 'Всеки компонент работи в собствен Docker контейнер, осигурявайки изолация, мащабируемост и лесно управление. Разгръщайте на всеки хост с поддръжка на Docker.',
        'feature_security': 'Вградена сигурност',
        'feature_security_desc': 'Автоматично генериране на TLS сертификати със самоподписан CA, удостоверяване, базирано на SSH ключове и индустриални стандарти за сигурност от кутията.',
        'feature_tested': 'Тестван код',
        'feature_tested_desc': '100% успех при изпълнение на тестове с 47 изчерпателни теста. Всеки компонент се валидира преди пускане.',
        'feature_ssh': 'Отдалечено изпълнение, базирано на SSH',
        'feature_ssh_desc': 'Разгръщане на отдалечени сървъри чрез SSH с пулинг на връзки, автоматично прехвърляне на файлове и стабилно обработване на грешки.',
        'feature_complete': 'Пълен стек',
        'feature_complete_desc': 'Postfix, Dovecot, PostgreSQL, Rspamd, Redis и ClamAV предварително конфигурирани и работят заедно безпроблемно.',
        'enterprise_title': 'Корпоративни функции',
        'enterprise_subtitle': 'Готови за производство възможности за корпоративна имейл инфраструктура',
        'enterprise_security': 'Разширена сигурност',
        'enterprise_monitoring': 'Мониторинг и наблюдаемост',
        'enterprise_config': 'Управление на конфигурацията',
        'enterprise_performance': 'Оптимизация на производителността',
        'enterprise_config_desc': 'Разширена конфигурационна система с поддръжка на среда, горещо презареждане и корпоративна валидация.',
        'enterprise_monitoring_desc': 'Пълно решение за мониторинг с Prometheus метрики, проверки за здраве, структурирано логване и корпоративни известия.',
        'enterprise_security_desc': 'Корпоративна сигурност с AES-256-GCM криптиране, изчерпателно логване за одит, управление на сесии и прилагане на TLS 1.3.',
        'enterprise_performance_desc': 'Производителност в корпоративен мащаб с разширено кеширане, настройка на JVM и оптимизирано използване на ресурси.',
        'tech_stack_title': 'Технологичен стек',
        'tech_stack_subtitle': 'Задвижвано от водещи технологии с отворен код',
        'architecture_title': 'Корпоративна архитектура',
        'architecture_subtitle': 'Многослойна архитектура, проектирана за корпоративна мащабируемост и сигурност',
        'how_it_works_title': 'Как работи',
        'how_it_works_subtitle': 'Три прости стъпки до вашия производствен имейл сървър',
        'step_configure': 'Конфигуриране',
        'step_configure_desc': 'Създайте JSON конфигурационен файл, указващ детайлите на вашия имейл сървър, акаунтите и целевия хост.',
        'step_deploy': 'Разгръщане',
        'step_deploy_desc': 'Стартирайте mail_factory стартера с вашата конфигурация. Отпуснете се, докато той инсталира и конфигурира всичко.',
        'step_use': 'Използване',
        'step_use_desc': 'Свържете вашите имейл клиенти към разгърнатия сървър. Всички услуги работят, конфигурирани са и са готови да обработват имейли.',
        'quick_start_title': 'Бърз старт',
        'testing_title': 'Качество и тестване',
        'testing_subtitle': 'Изчерпателно покритие на тестовете осигурява надеждност',
        'compatibility_title': 'Матрица за поддръжка на дистрибуции',
        'compatibility_subtitle': 'Разгръщайте на най-новите модерни Linux сървър дистрибуции',
        'use_cases_title': 'Кой използва Mail Server Factory?',
        'documentation_title': 'Документация и ресурси',
        'nav_documentation': '📚 Документация',
        'nav_download': 'Изтегли',
        'nav_view_github': 'Вижте в GitHub',
        'skip_to_content': 'Прескочи до съдържанието',
        'back_to_top': 'Обратно към началото',
        'cta_download': 'Изтеглете сега',
        'cta_github': 'Вижте в GitHub',
        'cta_title': 'Готови ли сте да разгърнете вашия имейл сървър?',
        'cta_subtitle': 'Присъединете се към общността на Mail Server Factory и поемете контрол над вашата имейл инфраструктура днес.',
        'cta_note': 'Отворен код • Безплатно завинаги • Поддръжка от общността'
    }
    
    # Romanian translations
    ro_translations = {
        'hero_title': 'Rulează-ți serverul de mail <span class="highlight">Ca un Șef</span>',
        'hero_subtitle': 'Automatizare server de mail la nivel enterprise alimentată de Kotlin, Docker și tehnologii dovedite. Implementează infrastructură completă de mail cu un singur fișier de configurare JSON.',
        'download_btn': '⬇ Descarcă ultima versiune',
        'github_btn': '⭐ Vezi pe GitHub',
        'stats_distributions': '12 Distribuții',
        'stats_automated': '100% Automatizat',
        'stats_production': 'Gata pentru producție',
        'stats_enterprise': 'Nivel Enterprise',
        'stat_label_tested': 'Complet testat și suportat',
        'stat_label_config': 'Configurație JSON unică',
        'stat_label_protocols': 'SMTP/IMAP/POP3',
        'stat_label_docker': 'Docker + QEMU gata',
        'features_title': 'De ce Mail Server Factory?',
        'features_subtitle': 'Capacități enterprise fără complexitatea enterprise',
        'feature_zero_touch': 'Implementare fără intervenție',
        'feature_zero_touch_desc': 'Scrie un fișier de configurare JSON simplu și lasă Mail Server Factory să se ocupe de tot - de la instalare la inițializare. Nu este necesară nicio configurare manuală.',
        'feature_docker': 'Suport nativ Docker',
        'feature_docker_desc': 'Fiecare componentă rulează în propriul container Docker, asigurând izolare, scalabilitate și gestionare ușoară. Implementează pe orice gazdă compatibilă cu Docker.',
        'feature_security': 'Securitate încorporată',
        'feature_security_desc': 'Generare automată certificate TLS cu CA auto-semnat, autentificare bazată pe chei SSH și practici de securitate standard din industrie gata de utilizare.',
        'feature_tested': 'Cod testat în luptă',
        'feature_tested_desc': 'Rată de succes 100% la execuția testelor cu 47 teste comprehensive. Fiecare componentă este validată înainte de lansare.',
        'feature_ssh': 'Execuție la distanță bazată pe SSH',
        'feature_ssh_desc': 'Implementare pe servere la distanță prin SSH cu pool de conexiuni, transfer automat de fișiere și gestionare robustă a erorilor.',
        'feature_complete': 'Stivă completă',
        'feature_complete_desc': 'Postfix, Dovecot, PostgreSQL, Rspamd, Redis și ClamAV pre-configurate și funcționează împreună fără probleme.',
        'enterprise_title': 'Funcții Enterprise',
        'enterprise_subtitle': 'Capacități gata pentru producție pentru infrastructura de mail enterprise',
        'enterprise_security': 'Securitate avansată',
        'enterprise_monitoring': 'Monitorizare și observabilitate',
        'enterprise_config': 'Gestionare configurație',
        'enterprise_performance': 'Optimizare performanță',
        'enterprise_config_desc': 'Sistem de configurație avansat cu suport pentru medii, reîncărcare la cald și validare enterprise.',
        'enterprise_monitoring_desc': 'Soluție completă de monitorizare cu metrici Prometheus, verificări de sănătate, jurnalizare structurată și alerte enterprise.',
        'enterprise_security_desc': 'Securitate enterprise cu criptare AES-256-GCM, jurnalizare audit cuprinzătoare, gestionare sesiuni și aplicare TLS 1.3.',
        'enterprise_performance_desc': 'Performanță la scară enterprise cu caching avansat, reglare JVM și utilizare optimizată a resurselor.',
        'tech_stack_title': 'Stivă tehnologică',
        'tech_stack_subtitle': 'Alimentat de tehnologii open source de top',
        'architecture_title': 'Arhitectură Enterprise',
        'architecture_subtitle': 'Arhitectură multi-strat proiectată pentru scalabilitate și securitate enterprise',
        'how_it_works_title': 'Cum funcționează',
        'how_it_works_subtitle': 'Trei pași simpli către serverul tău de mail de producție',
        'step_configure': 'Configurează',
        'step_configure_desc': 'Creează un fișier de configurare JSON specificând detaliile serverului de mail, conturile și gazda țintă.',
        'step_deploy': 'Implementează',
        'step_deploy_desc': 'Rulează lansatorul mail_factory cu configurația ta. Relaxează-te în timp ce instalează și configurează totul.',
        'step_use': 'Folosește',
        'step_use_desc': 'Conectează-ți clienții de mail la serverul implementat. Toate serviciile rulează, sunt configurate și gata să proceseze mail.',
        'quick_start_title': 'Start rapid',
        'testing_title': 'Calitate și testare',
        'testing_subtitle': 'Acoperire testare cuprinzătoare asigură fiabilitate',
        'compatibility_title': 'Matrice suport distribuții',
        'compatibility_subtitle': 'Implementează pe cele mai noi distribuții moderne de server Linux',
        'use_cases_title': 'Cine folosește Mail Server Factory?',
        'documentation_title': 'Documentație și resurse',
        'nav_documentation': '📚 Documentație',
        'nav_download': 'Descarcă',
        'nav_view_github': 'Vezi pe GitHub',
        'skip_to_content': 'Sari la conținut',
        'back_to_top': 'Înapoi sus',
        'cta_download': 'Descarcă acum',
        'cta_github': 'Vezi pe GitHub',
        'cta_title': 'Gata să-ți implementezi serverul de mail?',
        'cta_subtitle': 'Alătură-te comunității Mail Server Factory și preia controlul asupra infrastructurii tale de mail astăzi.',
        'cta_note': 'Open source • Gratuit pentru totdeauna • Suport comunitate'
    }
    
    # Apply translations
    translations = apply_translations(translations, 'bg', bg_translations)
    translations = apply_translations(translations, 'ro', ro_translations)
    
    # Save updated translations
    save_yaml('_data/translations.yml', translations)
    
    print("\n✅ Translation completed!")
    print("   - Bulgarian fully translated")
    print("   - Romanian fully translated")
    print("\n📝 Next: Continue with remaining languages")

if __name__ == '__main__':
    main()