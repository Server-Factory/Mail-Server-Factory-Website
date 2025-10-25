const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Apply manual translations from JSON files to translations.yml
 * Usage: node apply-manual-translations.js <translation-file.json>
 */

function applyManualTranslations(translationFile) {
    console.log(`📥 Loading manual translations from: ${translationFile}`);

    // Load manual translations
    const manualData = JSON.parse(fs.readFileSync(translationFile, 'utf8'));
    const lang = manualData.lang;
    const translations = manualData.translations;

    console.log(`Language: ${lang} (${manualData.name || 'N/A'})`);
    console.log(`Keys to update: ${Object.keys(translations).length}`);

    // Load current translations.yml
    const translationsYml = yaml.load(fs.readFileSync('_data/translations.yml', 'utf8'));

    // Ensure language exists
    if (!translationsYml[lang]) {
        console.error(`❌ Language '${lang}' not found in translations.yml`);
        process.exit(1);
    }

    // Apply translations
    let updated = 0;
    let skipped = 0;

    for (const [key, value] of Object.entries(translations)) {
        if (translationsYml[lang][key] === undefined) {
            console.log(`  ⚠ Key '${key}' does not exist in translations.yml, skipping`);
            skipped++;
            continue;
        }

        const oldValue = translationsYml[lang][key];
        if (oldValue !== value) {
            console.log(`  ✓ ${key}`);
            console.log(`     OLD: ${oldValue.substring(0, 60)}${oldValue.length > 60 ? '...' : ''}`);
            console.log(`     NEW: ${value.substring(0, 60)}${value.length > 60 ? '...' : ''}`);
            translationsYml[lang][key] = value;
            updated++;
        } else {
            skipped++;
        }
    }

    // Save updated translations.yml
    fs.writeFileSync('_data/translations.yml', yaml.dump(translationsYml, {
        indent: 2,
        lineWidth: -1,
        noRefs: true
    }));

    console.log(`\n✅ Applied ${updated} translations to ${lang}`);
    console.log(`⊘ Skipped ${skipped} (unchanged or non-existent keys)`);
    console.log(`💾 Saved to: _data/translations.yml`);
}

// CLI
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log('Usage: node apply-manual-translations.js <translation-file.json>');
        console.log('Example: node apply-manual-translations.js manual-translations-ru.json');
        process.exit(1);
    }

    const translationFile = args[0];

    if (!fs.existsSync(translationFile)) {
        console.error(`❌ File not found: ${translationFile}`);
        process.exit(1);
    }

    applyManualTranslations(translationFile);
}

module.exports = applyManualTranslations;
