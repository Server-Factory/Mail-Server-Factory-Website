const fs = require('fs');
const yaml = require('js-yaml');
// Node 18+ has native fetch support

// Technical keys that should remain in English or are version numbers
const TECHNICAL_KEYS = new Set([
    'architecture_component17', // Kotlin 2.0.21
    'architecture_component18', // Gradle 8.14.3
    'architecture_component19', // Java 17
    'architecture_component21', // PostgreSQL
    'architecture_component22', // Postfix
    'architecture_component23', // Dovecot
    'architecture_component24', // Rspamd
    'architecture_component25', // Redis
    'architecture_component26', // ClamAV
    'tech_postgresql',
    'tech_postfix',
    'tech_dovecot',
    'tech_rspamd',
    'tech_redis',
    'tech_clamav',
    'code_deploy_command', // Command-line code
    'code_web_installer', // Code block
    'step_number1', // Just "1"
    'step_number2', // Just "2"
    'step_number3', // Just "3"
    // Version numbers
    'table_version_ubuntu22',
    'table_version_ubuntu24',
    'table_version_debian11',
    'table_version_debian12',
    'table_version_rhel9',
    'table_version_almalinux95',
    'table_version_rocky95',
    'table_version_fedora38',
    'table_version_fedora39',
    'table_version_fedora40',
    'table_version_fedora41',
    'table_version_opensuse156',
    // Test metrics (numbers)
    'test_stat_value_total',
    'test_stat_value_success',
    'test_stat_value_coverage',
    'test_stat_value_smells',
    // Distribution names
    'distro_ubuntu',
    'distro_debian',
    'distro_rhel',
    'distro_almalinux',
    'distro_rocky',
    'distro_fedora',
    'distro_opensuse',
]);

// Language code mapping for translation APIs
const LANG_CODE_MAP = {
    'zh': 'zh-CN',
    'no': 'no',
    'be': 'be',
    'sr': 'sr',
    'ka': 'ka',
    'kk': 'kk',
    'uz': 'uz',
    'tg': 'tg',
    'fa': 'fa',
    'ar': 'ar',
    'he': 'iw',  // Hebrew in some APIs
};

function getTargetLangCode(lang) {
    return LANG_CODE_MAP[lang] || lang;
}

async function translateText(text, targetLang) {
    const targetCode = getTargetLangCode(targetLang);

    // Strategy 1: MyMemory API (most reliable free API)
    try {
        const encodedText = encodeURIComponent(text);
        const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${targetCode}`;

        const response = await fetch(url);
        if (response.ok) {
            const result = await response.json();
            if (result.responseData && result.responseData.translatedText) {
                const translation = result.responseData.translatedText;
                // Check if it's actually translated (not just echoed back)
                if (translation !== text && !translation.startsWith('MYMEMORY WARNING')) {
                    console.log(`  ✓ MyMemory: "${text}" → "${translation}"`);
                    return translation;
                }
            }
        }
    } catch (e) {
        console.error(`  ✗ MyMemory failed: ${e.message}`);
    }

    // Wait between attempts
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Strategy 2: LibreTranslate
    try {
        const url = 'https://libretranslate.com/translate';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                source: 'en',
                target: targetCode,
            }),
        });

        if (response.ok) {
            const result = await response.json();
            if (result.translatedText && result.translatedText !== text) {
                console.log(`  ✓ LibreTranslate: "${text}" → "${result.translatedText}"`);
                return result.translatedText;
            }
        }
    } catch (e) {
        console.error(`  ✗ LibreTranslate failed: ${e.message}`);
    }

    throw new Error(`All translation strategies failed for "${text}" to ${targetLang}`);
}

async function translateMissingKeys() {
    console.log('🚀 Starting comprehensive translation...\n');

    // Load translations
    const fileContents = fs.readFileSync('_data/translations.yml', 'utf8');
    const translations = yaml.load(fileContents);

    const languages = Object.keys(translations).filter(lang => lang !== 'en');
    const englishKeys = Object.keys(translations.en);

    let totalTranslated = 0;
    let totalSkipped = 0;
    let totalFailed = 0;

    for (const lang of languages) {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`🌍 Processing ${lang.toUpperCase()}...`);
        console.log(`${'='.repeat(60)}`);

        let translatedCount = 0;
        let skippedCount = 0;
        let failedCount = 0;

        for (const key of englishKeys) {
            const englishText = translations.en[key];
            const currentTranslation = translations[lang][key];

            // Skip if key doesn't exist in target language
            if (currentTranslation === undefined || currentTranslation === null) {
                console.log(`  ⚠ Missing key: ${key}`);
                translations[lang][key] = englishText; // Use English as fallback
                skippedCount++;
                continue;
            }

            // Skip if already translated (different from English)
            if (currentTranslation !== englishText) {
                continue;
            }

            // Skip technical keys
            if (TECHNICAL_KEYS.has(key)) {
                console.log(`  ⊘ Technical key skipped: ${key}`);
                skippedCount++;
                continue;
            }

            // Skip very short texts (likely numbers or codes)
            if (!englishText || englishText.trim().length < 2) {
                console.log(`  ⊘ Too short, skipped: ${key}`);
                skippedCount++;
                continue;
            }

            // Try to translate
            try {
                console.log(`\n  🔄 Translating: ${key}`);
                console.log(`     EN: ${englishText.substring(0, 100)}${englishText.length > 100 ? '...' : ''}`);

                const translatedText = await translateText(englishText, lang);
                translations[lang][key] = translatedText;
                translatedCount++;
                totalTranslated++;

                // Save progress every 10 translations
                if (translatedCount % 10 === 0) {
                    fs.writeFileSync('_data/translations.yml', yaml.dump(translations, {
                        indent: 2,
                        lineWidth: -1,
                        noRefs: true
                    }));
                    console.log(`\n  💾 Progress saved: ${translatedCount} translations for ${lang}`);
                }

                // Rate limiting: wait between translations
                await new Promise(resolve => setTimeout(resolve, 2000));

            } catch (error) {
                console.error(`  ✗ Failed to translate ${key}: ${error.message}`);
                failedCount++;
                totalFailed++;

                // On failure, continue with next key
                continue;
            }
        }

        console.log(`\n  ✅ ${lang.toUpperCase()} Summary:`);
        console.log(`     Translated: ${translatedCount}`);
        console.log(`     Skipped: ${skippedCount}`);
        console.log(`     Failed: ${failedCount}`);

        totalSkipped += skippedCount;

        // Save after each language
        fs.writeFileSync('_data/translations.yml', yaml.dump(translations, {
            indent: 2,
            lineWidth: -1,
            noRefs: true
        }));
        console.log(`  💾 Saved all ${lang} translations`);

        // Wait before next language
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log('🎉 TRANSLATION COMPLETE!');
    console.log(`${'='.repeat(60)}`);
    console.log(`Total Translated: ${totalTranslated}`);
    console.log(`Total Skipped: ${totalSkipped}`);
    console.log(`Total Failed: ${totalFailed}`);
    console.log(`\n💾 Final save completed.`);
}

// Handle errors gracefully
translateMissingKeys().catch(error => {
    console.error('\n❌ FATAL ERROR:', error);
    process.exit(1);
});
