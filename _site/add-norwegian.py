#!/usr/bin/env python3

"""
Add Norwegian (no) translations to translations.yml
Uses English as base and translates to Norwegian (Bokmål)
"""

import yaml
from collections import OrderedDict

# Norwegian translations
NORWEGIAN_TRANSLATIONS = {
    'hero_title': 'Kjør din e-postserver <span class="highlight">Som Sjefen</span>',
    'hero_subtitle': 'Enterprise-grade e-postserver automatisering drevet av Kotlin, Docker og bevist teknologi. Distribuer komplett e-post infrastruktur med en enkelt JSON konfigurasjonsfil.',
    'download_btn': '⬇ Last ned siste versjon',
    'github_btn': '⭐ Se på GitHub',
    'stats_distributions': '12 Distribusjoner',
    'stats_automated': '100% Automatisert',
    'stats_production': 'Produksjonsklar',
    'stats_enterprise': 'Enterprise Grade',
    'stat_label_tested': 'Fullt testet og støttet',
    'stat_label_config': 'Enkelt JSON Config',
    'stat_label_protocols': 'SMTP/IMAP/POP3',
    'stat_label_docker': 'Docker + QEMU klar',
    'features_title': 'Hvorfor Mail Server Factory?',
    'features_subtitle': 'Enterprise funksjoner uten enterprise kompleksitet',
    'feature_zero_touch': 'Null-Touch Distribusjon',
    'feature_docker': 'Docker Nativ',
    'feature_security': 'Sikkerhet Innebygd',
    'feature_tested': 'Kampprøvd Kode',
    'feature_ssh': 'SSH-basert fjernkjøring',
    'feature_complete': 'Komplett Stack',
    'enterprise_title': 'Enterprise Funksjoner',
    'enterprise_subtitle': 'Produksjonsklare funksjoner for enterprise e-post infrastruktur',
    'enterprise_security': 'Avansert Sikkerhet',
    'enterprise_monitoring': 'Overvåking og Observerbarhet',
    'enterprise_config': 'Konfigurasjonshåndtering',
    'enterprise_performance': 'Ytelsesoptimalisering',
    'tech_stack_title': 'Teknologi Stack',
    'tech_stack_subtitle': 'Drevet av bransjeledende open source teknologier',
    'architecture_title': 'Enterprise Arkitektur',
    'architecture_subtitle': 'Flerlagsarkitektur designet for enterprise skalerbarhet og sikkerhet',
    'how_it_works_title': 'Hvordan det fungerer',
    'how_it_works_subtitle': 'Tre enkle trinn til din produksjons e-postserver',
    'step_configure': 'Konfigurer',
    'step_deploy': 'Distribuer',
    'step_use': 'Bruk',
    'testing_title': 'Kvalitet og Testing',
    'testing_subtitle': 'Omfattende testdekning sikrer pålitelighet',
    'compatibility_title': 'Distribusjonsstøtte Matrise',
    'compatibility_subtitle': 'Distribuer på de nyeste moderne Linux serverdistribusjoner',
    'use_cases_title': 'Hvem bruker Mail Server Factory?',
    'documentation_title': 'Dokumentasjon og Ressurser',
    'cta_title': 'Klar til å distribuere din e-postserver?',
    'cta_subtitle': 'Bli med i Mail Server Factory-fellesskapet og ta kontroll over din e-post infrastruktur i dag.',
    'cta_note': 'Open source • Gratis for alltid • Fellesskapsstøttet',
    'footer_website_maintained': 'Nettsted',
    'footer_website_maintained_text': 'vedlikeholdes av',
    'footer_server_factory': 'Server Factory',
    'footer_generated_by': 'Denne siden ble generert av',
    'footer_github_pages': 'GitHub Pages',
    'logo_alt': 'Mail Server Factory logo',
    'logo_alt_home': 'Mail Server Factory - Kjør din e-postserver som sjefen!',
    'footer_opensource': 'Open Source • Gratis for alltid • Fellesskapsstøttet',
    'architecture_application_layer': '🏗️ Applikasjonslag',
    'architecture_badge_docker': 'Docker',
    'architecture_badge_gradle': 'Gradle 8.14.3',
    'architecture_badge_java': 'Java 17',
    'architecture_badge_json': 'JSON Configuration',
    'architecture_badge_kotlin': 'Kotlin 2.0.21',
    'architecture_badge_ssh': 'SSH Protocol',
    'architecture_benefit1': 'Sikkerhet Først',
    'architecture_benefit1_desc': 'Defense-in-depth sikkerhet med enterprise-grade kryptering og overvåking',
    'architecture_benefit2': 'Skalerbar',
    'architecture_benefit2_desc': 'Horisontal skalering med stateless design og optimalisert ressursutnyttelse',
    'architecture_benefit3': 'Observerbar',
    'architecture_benefit3_desc': 'Komplett observerbarhet med metrikker, logging og helseovervåking',
    'architecture_benefit4': 'Vedlikeholdbar',
    'architecture_benefit4_desc': 'Hot reloading konfigurasjon og automatisert testing sikrer pålitelighet',
    'architecture_benefits_title': 'Enterprise Fordeler',
    'architecture_built_with': 'Bygget med moderne verktøy',
    'architecture_component1': 'AES-256-GCM Kryptering',
    'architecture_component10': 'Helsekontroller',
    'architecture_component11': 'Strukturert Logging',
    'architecture_component12': 'Varselhåndtering',
    'architecture_component13': 'Miljøkonfigurasjoner',
    'architecture_component14': 'Hot Reloading',
    'architecture_component15': 'Skjemavalidering',
    'architecture_component16': 'Hemmelighetshåndtering',
    'architecture_component17': 'Kotlin 2.0.21',
    'architecture_component18': 'Gradle 8.14.3',
    'architecture_component19': 'Java 17',
    'architecture_component2': 'Sesjonshåndtering',
    'architecture_component20': 'JSON Configuration',
    'architecture_component21': 'PostgreSQL',
    'architecture_component22': 'Postfix',
    'architecture_component23': 'Dovecot',
    'architecture_component24': 'Rspamd',
    'architecture_component25': 'Redis',
    'architecture_component26': 'ClamAV',
    'architecture_component3': 'Revisjonlogging',
    'architecture_component4': 'TLS 1.3 Håndhevelse',
    'architecture_component5': 'Caffeine Caching',
    'architecture_component6': 'JVM Tuning (G1GC)',
    'architecture_component7': 'Connection Pooling',
    'architecture_component8': 'Async Operations',
    'architecture_component9': 'Prometheus Metrics',
    'architecture_config_layer': '⚙️ Konfigurasjonslag',
    'architecture_infrastructure_layer': '🐳 Infrastrukturlag',
    'architecture_monitoring_layer': '📊 Overvåkingslag',
    'architecture_performance_layer': '⚡ Ytelsesslag',
    'architecture_security_layer': '🔒 Sikkerhetslag',
    'code_deploy_command': './mail_factory config.json',
    'code_json_example': '{\n  "hostname": "mail.example.com",\n  "accounts": [...],\n  "database": {...}\n}',
    'code_manual_install': '# Clone the repository\n\nmkdir Factory && cd Factory\n\ngit clone --recurse-submodules git@github.com:Server-Factory/Mail-Server-Factory.git .\n\n\n# Build the project\n\n./gradlew assemble\n\n\n# Run with your configuration\n\n./mail_factory Examples/Centos_8.json',
    'code_ssh_setup': '# Enable passwordless SSH to target host\n\nsh Core/Utils/init_ssh_access.sh your-server.local',
    'code_verify_command': 'docker ps -a  # Verify running services',
    'code_web_installer': '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Server-Factory/Utils/master/web_installer.sh)"',
    'compatibility_automated_desc': 'Alle distribusjoner er klare for automatisert testing med QEMU virtualisering. Test rammeverket inkluderer ISO verifisering, automatisk installasjon og konfigurasjonsvalidering. Alle konfigurasjoner er produksjonsklare og aktivt vedlikeholdt.',
    'compatibility_automated_title': '✅ Automatisert Testing Tilgjengelig',
    'compatibility_table_config': 'Konfigurasjon',
    'compatibility_table_distribution': 'Distribusjon',
    'compatibility_table_family': 'Distribusjonsfamilie',
    'compatibility_table_tested': 'Testet',
    'compatibility_table_version': 'Versjon',
    'coverage_value_core': '85%+ Dekning',
    'coverage_value_enterprise': '100% Dekning',
    'coverage_value_factory': '85%+ Dekning',
    'cta_download': 'Last ned nå',
    'cta_github': 'Se på GitHub',
    'distro_almalinux': 'AlmaLinux',
    'distro_almalinux_versions': '9.5',
    'distro_debian': 'Debian',
    'distro_debian_versions': '11 (Bullseye), 12 (Bookworm)',
    'distro_fedora': 'Fedora Server',
    'distro_fedora_versions': '38, 39, 40, 41',
    'distro_opensuse': 'openSUSE Leap',
    'distro_opensuse_versions': '15.6',
    'distro_rhel': 'Red Hat Enterprise Linux',
    'distro_rhel_versions': '9',
    'distro_rocky': 'Rocky Linux',
    'distro_rocky_versions': '9.5',
    'distro_ubuntu': 'Ubuntu Server',
    'distro_ubuntu_versions': '22.04 LTS, 24.04 LTS',
    'doc_configuration': 'Konfigurasjon',
    'doc_configuration_desc': 'Enterprise konfigurasjonsfiler og miljøoppsett',
    'doc_enterprise': 'Enterprise Guide',
    'doc_enterprise_desc': 'Sikkerhet, ytelse og konfigurasjonsstandarder',
    'doc_examples': 'Eksempler',
    'doc_examples_desc': 'Eksempel konfigurasjoner for enterprise distribusjoner',
    'doc_issues': 'Issues',
    'doc_issues_desc': 'Rapporter feil eller be om enterprise funksjoner',
    'doc_readme': 'README',
    'doc_readme_desc': 'Komplett prosjektoversikt med enterprise funksjoner',
    'doc_testing': 'Testing Guide',
    'doc_testing_desc': 'Enterprise testing med 85%+ dekningsdokumentasjon',
    'enterprise_config_desc': 'Avansert konfigurasjonssystem med miljøstøtte, hot reloading og enterprise validering.',
    'enterprise_config_item1': 'Multi-miljø konfigurasjoner',
    'enterprise_config_item2': 'Hot reloading uten omstart',
    'enterprise_config_item3': 'Skjemavalidering og feilrapportering',
    'enterprise_config_item4': 'Sikker hemmelighetshåndtering',
    'enterprise_monitoring_desc': 'Komplett overvåkingsløsning med Prometheus metrikker, helsekontroller, strukturert logging og enterprise varsling.',
    'enterprise_monitoring_item1': 'Prometheus-kompatibel metrikk endepunkt',
    'enterprise_monitoring_item2': 'Automatiserte helsekontroller',
    'enterprise_monitoring_item3': 'Strukturert logging med korrelasjons-IDer',
    'enterprise_monitoring_item4': 'Sanntids ytelsesovervåking',
    'enterprise_performance_desc': 'Enterprise-skala ytelse med avansert caching, JVM tuning og optimalisert ressursutnyttelse.',
    'enterprise_performance_item1': 'Caffeine-basert multi-region caching',
    'enterprise_performance_item2': 'JVM ytelsestuning (G1GC)',
    'enterprise_performance_item3': 'Database connection pooling',
    'enterprise_performance_item4': 'Async I/O operasjoner',
    'enterprise_security_desc': 'Enterprise-grade sikkerhet med AES-256-GCM kryptering, omfattende revisjonlogging, sesjonshåndtering og TLS 1.3 håndhevelse.',
    'enterprise_security_item1': 'AES-256-GCM kryptering for data i ro',
    'enterprise_security_item2': 'Enterprise passordpolicyer',
    'enterprise_security_item3': 'Sanntids sikkerhetsovervåking',
    'enterprise_security_item4': '90-dagers revisjonlogg oppbevaring',
    'feature_complete_desc': 'Postfix, Dovecot, PostgreSQL, Rspamd, Redis og ClamAV forhåndskonfigurert og fungerer sammen sømløst.',
    'feature_docker_desc': 'Hver komponent kjører i sin egen Docker container, som sikrer isolasjon, skalerbarhet og enkel håndtering. Distribuer på enhver Docker-kapabel vert.',
    'feature_security_desc': 'Automatisk TLS sertifikatgenerering med selvlignede CA, SSH-nøkkelbasert autentisering og bransjestandarder for sikkerhetspraksis ut av boksen.',
    'feature_ssh_desc': 'Distribuer til fjernservere via SSH med connection pooling, automatiske filoverføringer og robust feilhåndtering.',
    'feature_tested_desc': '100% test utførelsessuksessrate med 47 omfattende tester. Hver komponent er validert før utgivelse.',
    'feature_zero_touch_desc': 'Skriv en enkel JSON konfigurasjonsfil og la Mail Server Factory håndtere alt - fra installasjon til initialisering. Ingen manuell konfigurasjon nødvendig.',
    'hero_badge_automated': 'Automatisert Installasjon',
    'hero_badge_distribution': 'Multi-Distribusjon',
    'hero_badge_enterprise': 'Enterprise Grade',
    'hero_badge_testing': 'Omfattende Testing',
    'launcher_command_debug': 'Aktiver verbose debugging output',
    'launcher_command_dry_run': 'Vis kommando uten å kjøre',
    'launcher_command_help': 'Vis hjelpemelding',
    'launcher_command_home': 'Egendefinert installasjonshjem katalog',
    'launcher_command_jar': 'Overstyr JAR plassering',
    'launcher_command_version': 'Vis versjonsinformasjon',
    'launcher_commands_title': 'Launcher Alternativer',
    'launcher_feature1': 'Automatisk JAR Oppdagelse',
    'launcher_feature1_desc': 'Søker 7 standardplasseringer for Application JAR',
    'launcher_feature2': 'Java Deteksjon',
    'launcher_feature2_desc': 'Finner Java runtime og validerer versjon (minimum Java 17)',
    'launcher_feature3': 'Miljøvariabler',
    'launcher_feature3_desc': 'Støtter JAVA_OPTS, JAVA_HOME, MAIL_FACTORY_HOME',
    'launcher_feature4': '41 Test Cases',
    'launcher_feature4_desc': 'Omfattende testsuite validerer all launcher funksjonalitet',
    'launcher_subtitle': 'Produksjonsklar bash wrapper med enterprise-grade feilhåndtering',
    'launcher_title': 'Launcher Funksjoner',
    'quick_start_manual_install': 'Manuell Installasjon',
    'quick_start_ssh_setup': 'Sett opp SSH Tilgang',
    'quick_start_title': 'Rask Start',
    'quick_start_web_installer': 'Web Installer (Anbefalt)',
    'step_configure_desc': 'Opprett en JSON konfigurasjonsfil som spesifiserer dine e-postserver detaljer, kontoer og målvert.',
    'step_deploy_desc': 'Kjør mail_factory launcher med din konfigurasjon. Lene tilbake mens den installerer og konfigurerer alt.',
    'step_number1': '1',
    'step_number2': '2',
    'step_number3': '3',
    'step_use_desc': 'Koble til e-postklientene dine til den distribuerte serveren. Alle tjenester kjører, er konfigurert og klare til å håndtere e-post.',
    'table_config_almalinux9': 'Examples/AlmaLinux_9.json',
    'table_config_debian11': 'Examples/Debian_11.json',
    'table_config_debian12': 'Examples/Debian_12.json',
    'table_config_fedora38': 'Examples/Fedora_Server_38.json',
    'table_config_fedora39': 'Examples/Fedora_Server_39.json',
    'table_config_fedora40': 'Examples/Fedora_Server_40.json',
    'table_config_fedora41': 'Examples/Fedora_Server_41.json',
    'table_config_opensuse15': 'Examples/openSUSE_Leap_15.json',
    'table_config_rhel9': 'Examples/RHEL_9.json',
    'table_config_rocky9': 'Examples/Rocky_9.json',
    'table_config_ubuntu22': 'Examples/Ubuntu_22.json',
    'table_config_ubuntu24': 'Examples/Ubuntu_24.json',
    'table_version_almalinux95': '9.5',
    'table_version_debian11': '11 (Bullseye)',
    'table_version_debian12': '12 (Bookworm)',
    'table_version_fedora38': '38',
    'table_version_fedora39': '39',
    'table_version_fedora40': '40',
    'table_version_fedora41': '41',
    'table_version_opensuse156': '15.6',
    'table_version_rhel9': '9',
    'table_version_rocky95': '9.5',
    'table_version_ubuntu22': '22.04 LTS (Jammy)',
    'table_version_ubuntu24': '24.04 LTS (Noble)',
    'tech_clamav': 'ClamAV',
    'tech_clamav_desc': 'Anti-Virus',
    'tech_dovecot': 'Dovecot',
    'tech_dovecot_desc': 'IMAP/POP3 Server',
    'tech_postfix': 'Postfix',
    'tech_postfix_desc': 'SMTP Server',
    'tech_postgresql': 'PostgreSQL',
    'tech_postgresql_desc': 'Hoved Database',
    'tech_redis': 'Redis',
    'tech_redis_desc': 'Cache Lag',
    'tech_rspamd': 'Rspamd',
    'tech_rspamd_desc': 'Anti-Spam Motor',
    'test_stat_value_coverage': '85%+',
    'test_stat_value_smells': '0',
    'test_stat_value_success': '100%',
    'test_stat_value_total': '47',
    'testing_coverage_core': 'Core Framework',
    'testing_coverage_enterprise': 'Enterprise Funksjoner',
    'testing_coverage_factory': 'Factory Modul',
    'testing_coverage_title': 'Test Dekning etter Modul',
    'testing_stat_coverage': 'Dekning',
    'testing_stat_smells': 'Code Smells',
    'testing_stat_success': 'Suksessrate',
    'testing_stat_total': 'Totalt Tester',
    'use_case1': '🏢 Små Bedrifter',
    'use_case1_desc': 'Eie din e-post infrastruktur uten leverandør lock-in. Full kontroll over data og personvern.',
    'use_case2': '👨‍💻 DevOps Ingeniører',
    'use_case2_desc': 'Automatiser e-postserver distribusjoner på tvers av flere miljøer med konsistent konfigurasjon.',
    'use_case3': '🔐 Personvernbevisste Organisasjoner',
    'use_case3_desc': 'Hold e-postdata on-premises med full kontroll over sikkerhet og compliance.',
    'use_case4': '🎓 Utdanningsinstitusjoner',
    'use_case4_desc': 'Distribuer kostnadseffektive e-postservere for studenter og ansatte med minimal vedlikehold.',
    'page_description': 'Distribuer produksjonsklar e-postserver infrastruktur uten trøbbel',
    'theme_toggle': 'Veksle tema',
    'select_language': 'Velg språk',
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

def add_norwegian(translations_path):
    """Add Norwegian translations"""

    print("Loading translations...")
    translations = load_yaml_ordered(translations_path)

    if 'no' in translations:
        print("Norwegian translations already exist!")
        return False

    print(f"Adding Norwegian with {len(NORWEGIAN_TRANSLATIONS)} keys...")

    # Insert Norwegian after Danish (da)
    new_translations = OrderedDict()
    for lang, trans in translations.items():
        new_translations[lang] = trans
        if lang == 'da':
            new_translations['no'] = OrderedDict(NORWEGIAN_TRANSLATIONS)

    print(f"Writing to {translations_path}...")
    save_yaml_ordered(new_translations, translations_path)
    print("✓ Norwegian translations added successfully!")

    return True

if __name__ == '__main__':
    add_norwegian('_data/translations.yml')
