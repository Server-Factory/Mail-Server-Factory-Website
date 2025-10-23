const fs = require('fs');
const yaml = require('js-yaml');

async function translateText(text, targetLang) {
    try {
        // Use MyMemory translation API (free tier available)
        const encodedText = encodeURIComponent(text);
        const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${targetLang}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.responseData && result.responseData.translatedText) {
            return result.responseData.translatedText;
        } else {
            throw new Error('No translation in response');
        }
    } catch (error) {
        console.error(`Error translating "${text}" to ${targetLang}:`, error.message);
        return text; // Return original text on error
    }
}

async function translateMissingKeys() {
    console.log('🚀 Starting translation of missing keys...');

    // Load translations
    const translations = yaml.load(fs.readFileSync('_data/translations.yml', 'utf8'));

    // Languages to translate (skip 'en')
    const languages = Object.keys(translations).filter(lang => lang !== 'en');

    // Get English keys
    const englishKeys = Object.keys(translations.en);

    for (const lang of languages) {
        console.log(`\n🔄 Translating to ${lang}...`);

        let translatedCount = 0;

        for (const key of englishKeys) {
            const englishText = translations.en[key];

            // Skip if already translated (not equal to English)
            if (translations[lang][key] !== englishText) {
                continue;
            }

            // Skip empty or very short texts
            if (!englishText || englishText.length < 3) {
                continue;
            }

            // Skip HTML-heavy content for now (can cause issues)
            if (englishText.includes('<') && englishText.includes('>')) {
                continue;
            }

            // Skip code blocks
            if (englishText.includes('```') || englishText.includes('`')) {
                continue;
            }

            try {
                const translatedText = await translateText(englishText, lang);
                translations[lang][key] = translatedText;
                translatedCount++;

                if (translatedCount % 10 === 0) {
                    console.log(`  Translated ${translatedCount} keys for ${lang}...`);
                }
            } catch (error) {
                console.error(`Failed to translate ${key} for ${lang}:`, error);
            }

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        console.log(`  ✅ Completed ${translatedCount} translations for ${lang}`);
    }

    // Save updated translations
    fs.writeFileSync('_data/translations.yml', yaml.dump(translations, {
        indent: 2,
        lineWidth: -1,
        noRefs: true
    }));

    console.log('\n🎉 Translation completed!');
}

translateMissingKeys().catch(console.error);