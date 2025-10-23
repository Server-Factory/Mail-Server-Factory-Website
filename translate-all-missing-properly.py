#!/usr/bin/env python3
"""
Translate All Missing Languages Properly
Translates all languages that still have English placeholders.
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

def translate_danish(translations):
    """Translate Danish language."""
    lang = 'da'
    print(f"🔄 Translating Danish ({lang})...")
    
    da_translations = {
        'hero_title': 'Kør din mailserver <span class="highlight">Som en Chef</span>',
        'hero_subtitle': 'Enterprise-grade mailserver-automation drevet af Kotlin, Docker og bevist teknologi. Implementer komplet mail-infrastruktur med en enkelt JSON-konfigurationsfil.',
        'download_btn': '⬇ Download seneste udgivelse',
        'github_btn': '⭐ Se på GitHub',
        'stats_distributions': '12 Distributioner',
        'stats_automated': '100% Automatiseret',
        'stats_production': 'Produktionsklar',
        'stats_enterprise': 'Enterprise-niveau',
        'stat_label_tested': 'Fuldt testet og understøttet',
        'stat_label_config': 'Enkelt JSON-konfiguration',
        'stat_label_protocols': 'SMTP/IMAP/POP3',
        'stat_label_docker': 'Docker + QEMU klar',
        'features_title': 'Hvorfor Mail Server Factory?',
        'features_subtitle': 'Enterprise-funktioner uden enterprise-kompleksiteten',
        'feature_zero_touch': 'Zero-Touch Implementering',
        'feature_zero_touch_desc': 'Skriv en simpel JSON-konfigurationsfil og lad Mail Server Factory håndtere alt - fra installation til initialisering. Ingen manuel konfiguration nødvendig.',
        'feature_docker': 'Native Docker-understøttelse',
        'feature_docker_desc': 'Hver komponent kører i sin egen Docker-container, hvilket sikrer isolering, skalerbarhed og nem administration. Implementer på enhver Docker-kompatibel vært.',
        'feature_security': 'Indbygget sikkerhed',
        'feature_security_desc': 'Automatisk TLS-certifikatgenerering med selvsigneret CA, SSH-nøglebaseret autentificering og industristandard sikkerhedspraksisser ud af boksen.',
        'feature_tested': 'Kamp-testet kode',
        'feature_tested_desc': '100% testudførelses succesrate med 47 omfattende tests. Hver komponent valideres før udgivelse.',
        'feature_ssh': 'SSH-baseret fjernudførelse',
        'feature_ssh_desc': 'Implementer på fjernservere via SSH med forbindelsespulje, automatisk filoverførsel og robust fejlhåndtering.',
        'feature_complete': 'Komplet stak',
        'feature_complete_desc': 'Postfix, Dovecot, PostgreSQL, Rspamd, Redis og ClamAV forudkonfigureret og arbejder sammen problemfrit.',
        'enterprise_title': 'Enterprise-funktioner',
        'enterprise_subtitle': 'Produktionsklare kapaciteter til enterprise mail-infrastruktur',
        'enterprise_security': 'Avanceret sikkerhed',
        'enterprise_monitoring': 'Overvågning og observerbærhed',
        'enterprise_config': 'Konfigurationsstyring',
        'enterprise_performance': 'Ydelsesoptimering',
        'enterprise_config_desc': 'Avanceret konfigurationssystem med miljøunderstøttelse, hot reloading og enterprise-validering.',
        'enterprise_monitoring_desc': 'Komplet overvågningsløsning med Prometheus-metrics, sundhedstjek, struktureret logning og enterprise-alarmering.',
        'enterprise_security_desc': 'Enterprise-sikkerhed med AES-256-GCM-kryptering, omfattende revisionslogning, sessionsstyring og TLS 1.3-håndhævelse.',
        'enterprise_performance_desc': 'Enterprise-skala ydeevne med avanceret caching, JVM-tuning og optimeret ressourceudnyttelse.',
        'tech_stack_title': 'Teknologisk stak',
        'tech_stack_subtitle': 'Drevet af førende open source-teknologier',
        'architecture_title': 'Enterprise-arkitektur',
        'architecture_subtitle': 'Flerlagsarkitektur designet til enterprise-skalering og sikkerhed',
        'how_it_works_title': 'Sådan virker det',
        'how_it_works_subtitle': 'Tre enkle trin til din produktionsmailserver',
        'step_configure': 'Konfigurer',
        'step_configure_desc': 'Opret en JSON-konfigurationsfil, der specificerer dine mailserver-detaljer, konti og targethost.',
        'step_deploy': 'Implementer',
        'step_deploy_desc': 'Kør mail_factory-opstarteren med din konfiguration. Slap af mens den installerer og konfigurerer alt.',
        'step_use': 'Brug',
        'step_use_desc': 'Forbind dine e-mail-klienter til den implementerede server. Alle tjenester kører, er konfigureret og klar til at håndtere e-mail.',
        'quick_start_title': 'Hurtig start',
        'testing_title': 'Kvalitet og test',
        'testing_subtitle': 'Omfattende testdækning sikrer pålidelighed',
        'compatibility_title': 'Distributionsstøttematrix',
        'compatibility_subtitle': 'Implementer på de nyeste moderne Linux-server-distributioner',
        'use_cases_title': 'Hvem bruger Mail Server Factory?',
        'documentation_title': 'Dokumentation og ressourcer',
        'nav_documentation': '📚 Dokumentation',
        'nav_download': 'Download',
        'nav_view_github': 'Se på GitHub',
        'skip_to_content': 'Spring til hovedindhold',
        'back_to_top': 'Tilbage til toppen',
        'cta_download': 'Download nu',
        'cta_github': 'Se på GitHub',
        'cta_title': 'Klar til at implementere din mailserver?',
        'cta_subtitle': 'Tilslut dig Mail Server Factory-fællesskabet og tag kontrol over din e-mail-infrastruktur i dag.',
        'cta_note': 'Open source • Gratis for evigt • Fællesskabsstøttet'
    }
    
    for key, value in da_translations.items():
        if key in translations[lang]:
            translations[lang][key] = value
    
    return translations

def translate_swedish(translations):
    """Translate Swedish language."""
    lang = 'sv'
    print(f"🔄 Translating Swedish ({lang})...")
    
    sv_translations = {
        'hero_title': 'Kör din e-postserver <span class="highlight">Som en Chef</span>',
        'hero_subtitle': 'Enterprise-grade e-postserver-automatisering driven av Kotlin, Docker och beprövad teknologi. Distribuera komplett e-postinfrastruktur med en enda JSON-konfigurationsfil.',
        'download_btn': '⬇ Ladda ner senaste versionen',
        'github_btn': '⭐ Visa på GitHub',
        'stats_distributions': '12 Distributioner',
        'stats_automated': '100% Automatiserad',
        'stats_production': 'Produktionsredo',
        'stats_enterprise': 'Enterprise-nivå',
        'stat_label_tested': 'Fullständigt testad och stödd',
        'stat_label_config': 'Enkel JSON-konfiguration',
        'stat_label_protocols': 'SMTP/IMAP/POP3',
        'stat_label_docker': 'Docker + QEMU redo',
        'features_title': 'Varför Mail Server Factory?',
        'features_subtitle': 'Enterprise-funktioner utan enterprise-komplexiteten',
        'feature_zero_touch': 'Zero-Touch Distribution',
        'feature_zero_touch_desc': 'Skriv en enkel JSON-konfigurationsfil och låt Mail Server Factory hantera allt - från installation till initiering. Ingen manuell konfiguration behövs.',
        'feature_docker': 'Native Docker-stöd',
        'feature_docker_desc': 'Varje komponent kör i sin egen Docker-container, vilket säkerställer isolering, skalbarhet och enkel hantering. Distribuera på vilken Docker-kompatibel värd som helst.',
        'feature_security': 'Inbyggd säkerhet',
        'feature_security_desc': 'Automatisk TLS-certifikatgenerering med självsignerad CA, SSH-nyckelbaserad autentisering och industristandard säkerhetspraxis direkt ur lådan.',
        'feature_tested': 'Stridstestad kod',
        'feature_tested_desc': '100% testutförandes framgångsgrad med 47 omfattande tester. Varje komponent valideras före release.',
        'feature_ssh': 'SSH-baserad fjärrutskickning',
        'feature_ssh_desc': 'Distribuera till fjärrservrar via SSH med anslutningspoolning, automatisk filöverföring och robust felhantering.',
        'feature_complete': 'Komplett stack',
        'feature_complete_desc': 'Postfix, Dovecot, PostgreSQL, Rspamd, Redis och ClamAV förkonfigurerade och arbetar sömlöst tillsammans.',
        'enterprise_title': 'Enterprise-funktioner',
        'enterprise_subtitle': 'Produktionsklara kapaciteter för enterprise e-postinfrastruktur',
        'enterprise_security': 'Avancerad säkerhet',
        'enterprise_monitoring': 'Övervakning och observerbarhet',
        'enterprise_config': 'Konfigurationshantering',
        'enterprise_performance': 'Prestandaoptimering',
        'enterprise_config_desc': 'Avancerat konfigurationssystem med miljöstöd, hot reloading och enterprise-validering.',
        'enterprise_monitoring_desc': 'Komplett övervakningslösning med Prometheus-mätvärden, hälsokontroller, strukturerad loggning och enterprise-alarmering.',
        'enterprise_security_desc': 'Enterprise-säkerhet med AES-256-GCM-kryptering, omfattande revisionsloggning, sessionshantering och TLS 1.3-tvång.',
        'enterprise_performance_desc': 'Enterprise-skala prestanda med avancerad cachning, JVM-justering och optimerad resursutnyttjande.',
        'tech_stack_title': 'Teknologisk stack',
        'tech_stack_subtitle': 'Drivs av ledande open source-teknologier',
        'architecture_title': 'Enterprise-arkitektur',
        'architecture_subtitle': 'Flerlagerarkitektur designad för enterprise-skalbarhet och säkerhet',
        'how_it_works_title': 'Hur det fungerar',
        'how_it_works_subtitle': 'Tre enkla steg till din produktionse-postserver',
        'step_configure': 'Konfigurera',
        'step_configure_desc': 'Skapa en JSON-konfigurationsfil som specificerar dina e-postserverdetaljer, konton och målvärd.',
        'step_deploy': 'Distribuera',
        'step_deploy_desc': 'Kör mail_factory-startprogrammet med din konfiguration. Vila medan det installerar och konfigurerar allt.',
        'step_use': 'Använd',
        'step_use_desc': 'Anslut dina e-postklienter till den distribuerade servern. Alla tjänster körs, är konfigurerade och redo att hantera e-post.',
        'quick_start_title': 'Snabbstart',
        'testing_title': 'Kvalitet och testning',
        'testing_subtitle': 'Omfattande testtäckning säkerställer tillförlitlighet',
        'compatibility_title': 'Distributionsstödmatris',
        'compatibility_subtitle': 'Distribuera på de senaste moderna Linux-server-distributionerna',
        'use_cases_title': 'Vem använder Mail Server Factory?',
        'documentation_title': 'Dokumentation och resurser',
        'nav_documentation': '📚 Dokumentation',
        'nav_download': 'Ladda ner',
        'nav_view_github': 'Visa på GitHub',
        'skip_to_content': 'Hoppa till huvudinnehåll',
        'back_to_top': 'Tillbaka till toppen',
        'cta_download': 'Ladda ner nu',
        'cta_github': 'Visa på GitHub',
        'cta_title': 'Redo att distribuera din e-postserver?',
        'cta_subtitle': 'Gå med i Mail Server Factory-gemenskapen och ta kontroll över din e-postinfrastruktur idag.',
        'cta_note': 'Öppen källkod • Gratis för alltid • Gemenskapsstödd'
    }
    
    for key, value in sv_translations.items():
        if key in translations[lang]:
            translations[lang][key] = value
    
    return translations

def main():
    print("🚀 Starting Comprehensive Translation of All Missing Languages...")
    print("=" * 60)
    
    # Load translations
    translations = load_yaml('_data/translations.yml')
    
    # Translate languages with significant missing content
    translations = translate_danish(translations)
    translations = translate_swedish(translations)
    
    # Save updated translations
    save_yaml('_data/translations.yml', translations)
    
    print("\n✅ Translation completed!")
    print("   - Danish fully translated")
    print("   - Swedish fully translated")
    print("\n📝 Next: Continue with other languages as needed")

if __name__ == '__main__':
    main()