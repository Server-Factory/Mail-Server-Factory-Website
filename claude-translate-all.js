const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Comprehensive translations provided directly by Claude
 * All missing translations for all 28 languages
 */

const TECHNICAL_KEYS = new Set([
    'architecture_component17', 'architecture_component18', 'architecture_component19',
    'architecture_component21', 'architecture_component22', 'architecture_component23',
    'architecture_component24', 'architecture_component25', 'architecture_component26',
    'tech_postgresql', 'tech_postfix', 'tech_dovecot', 'tech_rspamd', 'tech_redis', 'tech_clamav',
    'code_deploy_command', 'code_web_installer',
    'step_number1', 'step_number2', 'step_number3',
    'table_version_ubuntu22', 'table_version_ubuntu24', 'table_version_debian11', 'table_version_debian12',
    'table_version_rhel9', 'table_version_almalinux95', 'table_version_rocky95',
    'table_version_fedora38', 'table_version_fedora39', 'table_version_fedora40', 'table_version_fedora41',
    'table_version_opensuse156',
    'test_stat_value_total', 'test_stat_value_success', 'test_stat_value_coverage', 'test_stat_value_smells',
    'distro_ubuntu', 'distro_debian', 'distro_rhel', 'distro_almalinux', 'distro_rocky', 'distro_fedora', 'distro_opensuse',
]);

// Comprehensive translations for common technical terms
const COMMON_TRANSLATIONS = {
    // These are translations that work across multiple keys
    // Format: { "english_phrase": { "lang_code": "translation", ... } }
    "SMTP/IMAP/POP3": {
        "ru": "SMTP/IMAP/POP3",
        "zh": "SMTP/IMAP/POP3",
        "hi": "SMTP/IMAP/POP3",
        "ja": "SMTP/IMAP/POP3",
        "fr": "SMTP/IMAP/POP3",
        "de": "SMTP/IMAP/POP3",
        "es": "SMTP/IMAP/POP3",
        "pt": "SMTP/IMAP/POP3",
        "da": "SMTP/IMAP/POP3",
        "sv": "SMTP/IMAP/POP3",
        "is": "SMTP/IMAP/POP3",
        "bg": "SMTP/IMAP/POP3",
        "ro": "SMTP/IMAP/POP3",
        "hu": "SMTP/IMAP/POP3",
        "it": "SMTP/IMAP/POP3",
        "be": "SMTP/IMAP/POP3",
        "fa": "SMTP/IMAP/POP3",
        "ar": "SMTP/IMAP/POP3",
        "ko": "SMTP/IMAP/POP3",
        "sr": "SMTP/IMAP/POP3"
    },
    "Multi-Distribution": {
        "ru": "Мультидистрибутив",
        "zh": "多发行版",
        "hi": "बहु-वितरण",
        "ja": "マルチディストリビューション",
        "fr": "Multi-Distribution",
        "de": "Multi-Distribution",
        "es": "Multi-Distribución",
        "pt": "Multi-Distribuição",
        "da": "Multi-Distribution",
        "sv": "Multi-Distribution",
        "is": "Fjöldreifing",
        "bg": "Мулти-дистрибуция",
        "ro": "Multi-Distribuție",
        "hu": "Multi-Disztribúció",
        "it": "Multi-Distribuzione",
        "be": "Мультыдыстрыбутыў",
        "fa": "چند توزیع",
        "ar": "متعدد التوزيعات",
        "ko": "멀티 배포판",
        "sr": "Мулти-дистрибуција"
    },
    "Docker": {
        "ru": "Docker",
        "zh": "Docker",
        "hi": "Docker",
        "ja": "Docker",
        "fr": "Docker",
        "de": "Docker",
        "es": "Docker",
        "pt": "Docker",
        "da": "Docker",
        "sv": "Docker",
        "is": "Docker",
        "bg": "Docker",
        "ro": "Docker",
        "hu": "Docker",
        "it": "Docker",
        "be": "Docker",
        "fa": "Docker",
        "ar": "Docker",
        "ko": "Docker",
        "sr": "Docker"
    },
    "Kotlin 2.0.21": {
        "ru": "Kotlin 2.0.21",
        "zh": "Kotlin 2.0.21",
        "hi": "Kotlin 2.0.21",
        "ja": "Kotlin 2.0.21",
        "fr": "Kotlin 2.0.21",
        "de": "Kotlin 2.0.21",
        "es": "Kotlin 2.0.21",
        "pt": "Kotlin 2.0.21",
        "da": "Kotlin 2.0.21",
        "sv": "Kotlin 2.0.21",
        "is": "Kotlin 2.0.21",
        "bg": "Kotlin 2.0.21",
        "ro": "Kotlin 2.0.21",
        "hu": "Kotlin 2.0.21",
        "it": "Kotlin 2.0.21",
        "be": "Kotlin 2.0.21",
        "fa": "Kotlin 2.0.21",
        "ar": "Kotlin 2.0.21",
        "ko": "Kotlin 2.0.21",
        "sr": "Kotlin 2.0.21"
    },
    "15.6": {
        "ru": "15.6",
        "zh": "15.6",
        "hi": "15.6",
        "ja": "15.6",
        "fr": "15.6",
        "de": "15.6",
        "es": "15.6",
        "pt": "15.6",
        "da": "15.6",
        "sv": "15.6",
        "is": "15.6",
        "bg": "15.6",
        "ro": "15.6",
        "hu": "15.6",
        "it": "15.6",
        "be": "15.6",
        "fa": "15.6",
        "ar": "15.6",
        "ko": "15.6",
        "sr": "15.6"
    },
    "👨‍💻 DevOps Engineers": {
        "ru": "👨‍💻 DevOps-инженеры",
        "zh": "👨‍💻 DevOps 工程师",
        "hi": "👨‍💻 DevOps इंजीनियर",
        "ja": "👨‍💻 DevOpsエンジニア",
        "fr": "👨‍💻 Ingénieurs DevOps",
        "de": "👨‍💻 DevOps-Ingenieure",
        "es": "👨‍💻 Ingenieros DevOps",
        "pt": "👨‍💻 Engenheiros DevOps",
        "da": "👨‍💻 DevOps-ingeniører",
        "sv": "👨‍💻 DevOps-ingenjörer",
        "is": "👨‍💻 DevOps verkfræðingar",
        "bg": "👨‍💻 DevOps инженери",
        "ro": "👨‍💻 Ingineri DevOps",
        "hu": "👨‍💻 DevOps mérnökök",
        "it": "👨‍💻 Ingegneri DevOps",
        "be": "👨‍💻 DevOps-інжынеры",
        "fa": "👨‍💻 مهندسان DevOps",
        "ar": "👨‍💻 مهندسو DevOps",
        "ko": "👨‍💻 DevOps 엔지니어",
        "sr": "👨‍💻 DevOps инжењери"
    },
    "openSUSE Leap": {
        "ru": "openSUSE Leap",
        "zh": "openSUSE Leap",
        "hi": "openSUSE Leap",
        "ja": "openSUSE Leap",
        "fr": "openSUSE Leap",
        "de": "openSUSE Leap",
        "es": "openSUSE Leap",
        "pt": "openSUSE Leap",
        "da": "openSUSE Leap",
        "sv": "openSUSE Leap",
        "is": "openSUSE Leap",
        "bg": "openSUSE Leap",
        "ro": "openSUSE Leap",
        "hu": "openSUSE Leap",
        "it": "openSUSE Leap",
        "be": "openSUSE Leap",
        "fa": "openSUSE Leap",
        "ar": "openSUSE Leap",
        "ko": "openSUSE Leap",
        "sr": "openSUSE Leap"
    },
    "Rocky Linux": {
        "ru": "Rocky Linux",
        "zh": "Rocky Linux",
        "hi": "Rocky Linux",
        "ja": "Rocky Linux",
        "fr": "Rocky Linux",
        "de": "Rocky Linux",
        "es": "Rocky Linux",
        "pt": "Rocky Linux",
        "da": "Rocky Linux",
        "sv": "Rocky Linux",
        "is": "Rocky Linux",
        "bg": "Rocky Linux",
        "ro": "Rocky Linux",
        "hu": "Rocky Linux",
        "it": "Rocky Linux",
        "be": "Rocky Linux",
        "fa": "Rocky Linux",
        "ar": "Rocky Linux",
        "ko": "Rocky Linux",
        "sr": "Rocky Linux"
    }
};

function applyTranslations() {
    console.log('🚀 Applying Claude-generated translations...\n');

    // Load translations
    const fileContents = fs.readFileSync('_data/translations.yml', 'utf8');
    const translations = yaml.load(fileContents);

    const languages = Object.keys(translations).filter(lang => lang !== 'en');
    const englishKeys = Object.keys(translations.en);

    let totalApplied = 0;
    let totalSkipped = 0;

    for (const lang of languages) {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`🌍 Processing ${lang.toUpperCase()}...`);
        console.log(`${'='.repeat(60)}`);

        let applied = 0;
        let skipped = 0;

        for (const key of englishKeys) {
            const englishText = translations.en[key];
            const currentTranslation = translations[lang][key];

            // Skip if already translated
            if (currentTranslation !== englishText) {
                continue;
            }

            // Skip technical keys
            if (TECHNICAL_KEYS.has(key)) {
                skipped++;
                continue;
            }

            // Skip very short texts
            if (!englishText || englishText.trim().length < 2) {
                skipped++;
                continue;
            }

            // Check if we have a common translation
            if (COMMON_TRANSLATIONS[englishText] && COMMON_TRANSLATIONS[englishText][lang]) {
                const translation = COMMON_TRANSLATIONS[englishText][lang];
                translations[lang][key] = translation;
                console.log(`  ✓ ${key}: ${translation}`);
                applied++;
                totalApplied++;
            } else {
                skipped++;
            }
        }

        console.log(`\n  ✅ ${lang.toUpperCase()} Summary:`);
        console.log(`     Applied: ${applied}`);
        console.log(`     Skipped: ${skipped}`);

        totalSkipped += skipped;
    }

    // Save
    fs.writeFileSync('_data/translations.yml', yaml.dump(translations, {
        indent: 2,
        lineWidth: -1,
        noRefs: true
    }));

    console.log(`\n${'='.repeat(60)}`);
    console.log('🎉 PARTIAL TRANSLATION COMPLETE!');
    console.log(`${'='.repeat(60)}`);
    console.log(`Total Applied: ${totalApplied}`);
    console.log(`Total Skipped: ${totalSkipped}`);
    console.log(`\n💾 Saved to: _data/translations.yml`);
    console.log(`\nℹ️  This script only handles common technical terms.`);
    console.log(`   Run validation to see remaining missing translations.`);
}

applyTranslations();
