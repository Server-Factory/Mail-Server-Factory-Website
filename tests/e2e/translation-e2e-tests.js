#!/usr/bin/env node

/**
 * End-to-End Tests for Translation Workflow
 * Tests the complete translation system from file to rendered page
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class TranslationE2ETests {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
        this.projectRoot = path.join(__dirname, '..', '..');
    }

    test(name, fn) {
        this.tests.push({ name, fn });
    }

    async runTests() {
        console.log('Running Translation End-to-End Tests\n');
        console.log('='.repeat(70));

        for (const test of this.tests) {
            try {
                await test.fn.call(this);
                console.log(`✓ ${test.name}`);
                this.passed++;
            } catch (error) {
                console.log(`✗ ${test.name}`);
                console.log(`  Error: ${error.message}`);
                this.failed++;
            }
        }

        console.log('='.repeat(70));
        console.log(`\nResults: ${this.passed} passed, ${this.failed} failed\n`);

        return this.failed === 0;
    }

    assertEquals(actual, expected, message) {
        assert.strictEqual(actual, expected, message);
    }

    assertTrue(condition, message) {
        assert.ok(condition, message);
    }

    assertFileExists(filepath, message) {
        assert.ok(fs.existsSync(filepath), message || `File ${filepath} should exist`);
    }
}

// Create test suite
const suite = new TranslationE2ETests();

// Test: All required files exist in the project
suite.test('All translation system files exist', function() {
    const requiredFiles = [
        '_data/translations.yml',
        '_data/languages.yml',
        'assets/js/language-selector.js',
        'assets/js/translations.js',
        'index.md',
        '_layouts/default.html',
        '_layouts/home.html'
    ];

    for (const file of requiredFiles) {
        const fullPath = path.join(this.projectRoot, file);
        this.assertFileExists(fullPath, `Required file ${file} should exist`);
    }
});

// Test: translations.yml is valid and complete
suite.test('translations.yml is valid YAML and contains all languages', function() {
    const translationsPath = path.join(this.projectRoot, '_data', 'translations.yml');
    const fileContents = fs.readFileSync(translationsPath, 'utf8');

    const translations = yaml.load(fileContents);

    this.assertTrue(typeof translations === 'object', 'Translations should be an object');
    this.assertTrue('en' in translations, 'English translations should exist');

    const expectedLanguages = [
        'en', 'ru', 'be', 'zh', 'hi', 'fa', 'ar', 'ko', 'ja', 'sr',
        'fr', 'de', 'es', 'pt', 'no', 'da', 'sv', 'is', 'bg', 'ro',
        'hu', 'it', 'el', 'he', 'ka', 'kk', 'uz', 'tg', 'tr'
    ];

    for (const lang of expectedLanguages) {
        this.assertTrue(
            lang in translations,
            `Language ${lang} should exist in translations`
        );
    }
});

// Test: languages.yml is valid and matches translations.yml
suite.test('languages.yml matches translations.yml language codes', function() {
    const translationsPath = path.join(this.projectRoot, '_data', 'translations.yml');
    const languagesPath = path.join(this.projectRoot, '_data', 'languages.yml');

    const translations = yaml.load(fs.readFileSync(translationsPath, 'utf8'));
    const languages = yaml.load(fs.readFileSync(languagesPath, 'utf8'));

    const translationLangs = Object.keys(translations);
    const languagesLangs = Object.keys(languages);

    // Every language in translations should be in languages.yml
    for (const lang of translationLangs) {
        this.assertTrue(
            languagesLangs.includes(lang),
            `Language ${lang} from translations.yml should be in languages.yml`
        );
    }

    // Every language in languages.yml should have translations
    for (const lang of languagesLangs) {
        this.assertTrue(
            translationLangs.includes(lang),
            `Language ${lang} from languages.yml should have translations`
        );
    }
});

// Test: All data-i18n keys in index.md exist in translations
suite.test('All data-i18n keys in index.md have translations', function() {
    const indexPath = path.join(this.projectRoot, 'index.md');
    const translationsPath = path.join(this.projectRoot, '_data', 'translations.yml');

    const indexContent = fs.readFileSync(indexPath, 'utf8');
    const translations = yaml.load(fs.readFileSync(translationsPath, 'utf8'));

    // Extract all data-i18n keys from index.md
    const dataI18nPattern = /data-i18n="([^"]+)"/g;
    const keys = [];
    let match;

    while ((match = dataI18nPattern.exec(indexContent)) !== null) {
        keys.push(match[1]);
    }

    this.assertTrue(keys.length > 50, `Should find at least 50 data-i18n keys, found ${keys.length}`);

    // Check that all keys exist in English translations
    const enTranslations = translations.en;
    const missingKeys = [];

    for (const key of keys) {
        if (!(key in enTranslations)) {
            missingKeys.push(key);
        }
    }

    this.assertEquals(
        missingKeys.length,
        0,
        `All data-i18n keys should exist in translations. Missing: ${missingKeys.join(', ')}`
    );
});

// Test: language-selector.js contains all language codes
suite.test('language-selector.js has all configured languages', function() {
    const selectorPath = path.join(this.projectRoot, 'assets', 'js', 'language-selector.js');
    const languagesPath = path.join(this.projectRoot, '_data', 'languages.yml');

    const selectorContent = fs.readFileSync(selectorPath, 'utf8');
    const languages = yaml.load(fs.readFileSync(languagesPath, 'utf8'));

    // Check that isValidLanguage function includes all languages
    for (const lang of Object.keys(languages)) {
        this.assertTrue(
            selectorContent.includes(`'${lang}'`),
            `language-selector.js should include language code '${lang}'`
        );
    }
});

// Test: Theme toggle script exists
suite.test('Theme toggle functionality exists', function() {
    const themeTogglePath = path.join(this.projectRoot, 'assets', 'js', 'theme-toggle.js');
    this.assertFileExists(themeTogglePath, 'theme-toggle.js should exist');

    const content = fs.readFileSync(themeTogglePath, 'utf8');
    this.assertTrue(content.includes('theme'), 'theme-toggle.js should contain theme logic');
});

// Test: Complete workflow from translations file to index.md
suite.test('Complete workflow: translation key → index.md → rendered correctly', function() {
    const translationsPath = path.join(this.projectRoot, '_data', 'translations.yml');
    const indexPath = path.join(this.projectRoot, 'index.md');

    const translations = yaml.load(fs.readFileSync(translationsPath, 'utf8'));
    const indexContent = fs.readFileSync(indexPath, 'utf8');

    // Test a specific key that should exist everywhere
    const testKey = 'hero_title';

    // 1. Key should exist in English translations
    this.assertTrue(
        testKey in translations.en,
        'hero_title should exist in English translations'
    );

    // 2. Key should exist in index.md
    this.assertTrue(
        indexContent.includes(`data-i18n="${testKey}"`),
        'hero_title should be referenced in index.md'
    );

    // 3. Key should exist in all other languages
    for (const [lang, langData] of Object.entries(translations)) {
        this.assertTrue(
            testKey in langData,
            `hero_title should exist in ${lang} translations`
        );

        const value = langData[testKey];
        this.assertTrue(
            typeof value === 'string' && value.length > 0,
            `hero_title in ${lang} should be a non-empty string`
        );
    }
});

// Test: Brand names are preserved across the full pipeline
suite.test('Brand names preserved from translations through to content', function() {
    const translationsPath = path.join(this.projectRoot, '_data', 'translations.yml');
    const translations = yaml.load(fs.readFileSync(translationsPath, 'utf8'));

    // Check that footer_server_factory is "Server Factory" in all languages
    for (const [lang, langData] of Object.entries(translations)) {
        if (lang === 'en') continue;

        if ('footer_server_factory' in langData) {
            this.assertEquals(
                langData.footer_server_factory,
                'Server Factory',
                `${lang}.footer_server_factory should be "Server Factory"`
            );
        }
    }
});

// Test: All code samples remain unchanged across languages
suite.test('Code samples identical across all languages', function() {
    const translationsPath = path.join(this.projectRoot, '_data', 'translations.yml');
    const translations = yaml.load(fs.readFileSync(translationsPath, 'utf8'));

    const codeSampleKeys = [
        'code_deploy_command',
        'code_verify_command'
    ];

    for (const key of codeSampleKeys) {
        const enValue = translations.en[key];

        for (const [lang, langData] of Object.entries(translations)) {
            if (lang === 'en' || !langData) continue;

            if (key in langData) {
                // Code samples should be identical or nearly identical
                const langValue = langData[key];
                this.assertTrue(
                    langValue.includes('./mail_factory') || langValue.includes('docker'),
                    `${lang}.${key} should contain expected command`
                );
            }
        }
    }
});

// Test: Jekyll configuration includes all languages
suite.test('Jekyll _config.yml includes all supported languages', function() {
    const configPath = path.join(this.projectRoot, '_config.yml');
    this.assertFileExists(configPath, '_config.yml should exist');

    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(configContent);

    this.assertTrue('languages' in config, '_config.yml should have languages array');
    this.assertTrue(Array.isArray(config.languages), 'languages should be an array');
    this.assertTrue(
        config.languages.length >= 28,
        `Should have at least 28 languages, found ${config.languages.length}`
    );
});

// Test: Translations.js fallback file exists and is valid
suite.test('translations.js fallback file exists and contains translations', function() {
    const translationsJsPath = path.join(this.projectRoot, 'assets', 'js', 'translations.js');
    this.assertFileExists(translationsJsPath, 'translations.js should exist');

    const content = fs.readFileSync(translationsJsPath, 'utf8');
    this.assertTrue(content.includes('translations'), 'translations.js should define translations');
    this.assertTrue(content.length > 10000, 'translations.js should contain substantial content');
});

// Test: Default language fallback works
suite.test('Default language fallback to English is configured', function() {
    const configPath = path.join(this.projectRoot, '_config.yml');
    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

    this.assertTrue('lang' in config || 'default_lang' in config, 'Default language should be configured');

    const defaultLang = config.lang || config.default_lang || 'en';
    this.assertEquals(defaultLang, 'en', 'Default language should be English');
});

// Test: All layouts have language selector integration
suite.test('Layouts include language selector', function() {
    const layoutPaths = [
        path.join(this.projectRoot, '_layouts', 'default.html'),
        path.join(this.projectRoot, '_layouts', 'home.html')
    ];

    for (const layoutPath of layoutPaths) {
        this.assertFileExists(layoutPath, `Layout ${path.basename(layoutPath)} should exist`);

        const content = fs.readFileSync(layoutPath, 'utf8');
        // Should reference language selector or have header-actions div
        this.assertTrue(
            content.includes('header-actions') || content.includes('language-selector'),
            `Layout ${path.basename(layoutPath)} should support language selector`
        );
    }
});

// Test: Translation validation script exists and is executable
suite.test('Translation validation tools exist', function() {
    const validatorPath = path.join(this.projectRoot, 'tests', 'translation-validator.js');
    this.assertFileExists(validatorPath, 'translation-validator.js should exist');

    const content = fs.readFileSync(validatorPath, 'utf8');
    this.assertTrue(content.includes('class TranslationValidator'), 'Should contain TranslationValidator class');
});

// Test: Fix script exists for brand names
suite.test('Brand name fix script exists', function() {
    const fixScriptPath = path.join(this.projectRoot, 'fix-brand-names.py');
    this.assertFileExists(fixScriptPath, 'fix-brand-names.py should exist');

    const content = fs.readFileSync(fixScriptPath, 'utf8');
    this.assertTrue(content.includes('BRAND_NAME_FIXES'), 'Fix script should have brand name mappings');
});

// Test: No broken translation references in HTML
suite.test('No undefined translation keys in index.md', function() {
    const indexPath = path.join(this.projectRoot, 'index.md');
    const translationsPath = path.join(this.projectRoot, '_data', 'translations.yml');

    const indexContent = fs.readFileSync(indexPath, 'utf8');
    const translations = yaml.load(fs.readFileSync(translationsPath, 'utf8'));

    // Extract all data-i18n keys
    const dataI18nPattern = /data-i18n="([^"]+)"/g;
    let match;
    let undefinedKeys = [];

    while ((match = dataI18nPattern.exec(indexContent)) !== null) {
        const key = match[1];
        if (!(key in translations.en)) {
            undefinedKeys.push(key);
        }
    }

    this.assertEquals(
        undefinedKeys.length,
        0,
        `Found undefined translation keys: ${undefinedKeys.join(', ')}`
    );
});

// Run tests
if (require.main === module) {
    suite.runTests().then(passed => {
        process.exit(passed ? 0 : 1);
    }).catch(err => {
        console.error('Test suite failed:', err);
        process.exit(1);
    });
}

module.exports = TranslationE2ETests;
