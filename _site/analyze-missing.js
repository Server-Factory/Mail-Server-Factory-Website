const fs = require('fs');
const yaml = require('js-yaml');

// Technical keys that should remain in English
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

function analyzeMissingTranslations() {
    const fileContents = fs.readFileSync('_data/translations.yml', 'utf8');
    const translations = yaml.load(fileContents);

    const languages = Object.keys(translations).filter(lang => lang !== 'en');
    const englishKeys = Object.keys(translations.en);

    console.log(`Found ${languages.length} languages (excluding English)`);
    console.log(`English has ${englishKeys.length} keys\n`);

    const report = [];
    let totalMissing = 0;

    for (const lang of languages) {
        const langData = translations[lang];
        let missingCount = 0;
        let untranslatedCount = 0;
        const missingKeys = [];

        for (const key of englishKeys) {
            const englishText = translations.en[key];
            const translation = langData[key];

            // Missing key
            if (translation === undefined || translation === null) {
                missingKeys.push(key);
                missingCount++;
                continue;
            }

            // Untranslated (same as English) and not a technical key
            if (translation === englishText && !TECHNICAL_KEYS.has(key)) {
                // Skip very short texts
                if (englishText && englishText.trim().length >= 2) {
                    missingKeys.push(key);
                    untranslatedCount++;
                }
            }
        }

        const totalNeeded = missingCount + untranslatedCount;
        totalMissing += totalNeeded;

        report.push({
            lang,
            missing: missingCount,
            untranslated: untranslatedCount,
            total: totalNeeded,
            keys: missingKeys
        });
    }

    // Sort by total needed
    report.sort((a, b) => b.total - a.total);

    console.log('━'.repeat(80));
    console.log('TRANSLATION NEEDS ANALYSIS');
    console.log('━'.repeat(80));
    console.log(sprintf('%-6s  %8s  %12s  %10s', 'Lang', 'Missing', 'Untranslated', 'Total'));
    console.log('─'.repeat(80));

    for (const item of report) {
        console.log(sprintf('%-6s  %8d  %12d  %10d',
            item.lang.toUpperCase(),
            item.missing,
            item.untranslated,
            item.total
        ));
    }

    console.log('─'.repeat(80));
    console.log(sprintf('%-6s  %8s  %12s  %10d', 'TOTAL', '', '', totalMissing));
    console.log('━'.repeat(80));

    // Show which languages need the most work
    console.log('\n📊 Top 10 languages needing translation:');
    for (let i = 0; i < Math.min(10, report.length); i++) {
        const item = report[i];
        if (item.total > 0) {
            console.log(`  ${i + 1}. ${item.lang.toUpperCase()}: ${item.total} keys`);
        }
    }

    // Save detailed report
    const detailedReport = {
        summary: {
            totalLanguages: languages.length,
            totalKeys: englishKeys.length,
            totalMissingTranslations: totalMissing
        },
        byLanguage: report
    };

    fs.writeFileSync('translation-analysis.json', JSON.stringify(detailedReport, null, 2));
    console.log('\n💾 Detailed analysis saved to: translation-analysis.json');

    return report;
}

function sprintf(format, ...args) {
    let i = 0;
    return format.replace(/%([-]?)(\d*)([sd])/g, (match, align, width, type) => {
        const value = args[i++].toString();
        const w = parseInt(width) || 0;
        if (align === '-') {
            return value.padEnd(w);
        } else {
            return value.padStart(w);
        }
    });
}

analyzeMissingTranslations();
