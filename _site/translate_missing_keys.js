const fs = require('fs');
const yaml = require('js-yaml');
const translate = require('@vitalets/google-translate-api');

async function translateText(text, targetLang) {
    const strategies = [
        // Strategy 1: Google Translate (unofficial)
        async () => {
            try {
                const result = await translate(text, { from: 'en', to: targetLang });
                if (result && result.text) {
                    return result.text;
                }
                throw new Error('No text in result');
            } catch (e) {
                throw new Error(`Google Translate failed: ${e.message}`);
            }
        },
        // Strategy 2: MyMemory API
        async () => {
            const encodedText = encodeURIComponent(text);
            const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${targetLang}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`MyMemory HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            if (result.responseData && result.responseData.translatedText) {
                return result.responseData.translatedText;
            } else {
                throw new Error('No translation in MyMemory response');
            }
        },
        // Strategy 3: LibreTranslate API
        async () => {
            const url = 'https://libretranslate.com/translate';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    q: text,
                    source: 'en',
                    target: targetLang,
                }),
            });

            if (!response.ok) {
                throw new Error(`LibreTranslate HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            if (result.translatedText) {
                return result.translatedText;
            } else {
                throw new Error('No translation in LibreTranslate response');
            }
        },
        // Strategy 4: Alternative MyMemory endpoint
        async () => {
            const encodedText = encodeURIComponent(text);
            const url = `https://translated-mymemory---translation-memory.p.rapidapi.com/get?q=${encodedText}&langpair=en|${targetLang}&mt=1&onlyprivate=0&de=a%40b.c`;

            const response = await fetch(url, {
                headers: {
                    'X-RapidAPI-Key': 'free', // Assuming free tier
                    'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
                }
            });

            if (!response.ok) {
                throw new Error(`Alt MyMemory HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            if (result.responseData && result.responseData.translatedText) {
                return result.responseData.translatedText;
            } else {
                throw new Error('No translation in Alt MyMemory response');
            }
        },
        // Strategy 5: Yandex Translate (free tier)
        async () => {
            const encodedText = encodeURIComponent(text);
            const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=free&text=${encodedText}&lang=en-${targetLang}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Yandex HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            if (result.text && result.text.length > 0) {
                return result.text[0];
            } else {
                throw new Error('No translation in Yandex response');
            }
        }
    ];

    for (let i = 0; i < strategies.length; i++) {
        try {
            console.log(`Trying strategy ${i + 1} for "${text}" to ${targetLang}`);
            const translated = await strategies[i]();
            console.log(`Strategy ${i + 1} succeeded`);
            return translated;
        } catch (error) {
            console.error(`Strategy ${i + 1} failed: ${error.message}`);
            // Wait before next strategy
            if (i < strategies.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }

    // All strategies failed
    throw new Error(`All 5 translation strategies failed for "${text}" to ${targetLang}`);
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
                console.error(`Failed to translate ${key} for ${lang}:`, error.message);
                throw new Error(`Translation failed for ${key} in ${lang}: ${error.message}`);
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