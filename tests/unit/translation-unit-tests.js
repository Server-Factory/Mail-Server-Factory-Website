#!/usr/bin/env node

/**
 * Unit Tests for Translation System
 * Tests individual functions and components of the translation system
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class TranslationUnitTests {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
        this.translationsPath = path.join(__dirname, '..', '..', '_data', 'translations.yml');
        this.translations = null;
    }

    // Test helper
    test(name, fn) {
        this.tests.push({ name, fn });
    }

    async runTests() {
        console.log('Running Translation Unit Tests\n');
        console.log('='.repeat(70));

        // Load translations once for all tests
        try {
            const fileContents = fs.readFileSync(this.translationsPath, 'utf8');
            this.translations = yaml.load(fileContents);
        } catch (error) {
            console.error(`Failed to load translations: ${error.message}`);
            return false;
        }

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

    // Utility assertion methods
    assertEquals(actual, expected, message) {
        assert.strictEqual(actual, expected, message);
    }

    assertTrue(condition, message) {
        assert.ok(condition, message);
    }

    assertFalse(condition, message) {
        assert.ok(!condition, message);
    }

    assertContains(haystack, needle, message) {
        assert.ok(haystack.includes(needle), message || `Expected "${haystack}" to contain "${needle}"`);
    }

    assertNotContains(haystack, needle, message) {
        assert.ok(!haystack.includes(needle), message || `Expected "${haystack}" not to contain "${needle}"`);
    }
}

// Create test suite
const suite = new TranslationUnitTests();

// Test: Translations file exists and is valid YAML
suite.test('Translations file exists and is valid YAML', function() {
    this.assertTrue(fs.existsSync(this.translationsPath), 'Translations file should exist');
    this.assertTrue(this.translations !== null, 'Translations should be loaded');
    this.assertTrue(typeof this.translations === 'object', 'Translations should be an object');
});

// Test: English translations exist and are non-empty
suite.test('English translations exist and are non-empty', function() {
    this.assertTrue('en' in this.translations, 'English translations should exist');
    const enKeys = Object.keys(this.translations.en);
    this.assertTrue(enKeys.length > 0, 'English should have translation keys');
    this.assertTrue(enKeys.length > 200, `English should have at least 200 keys, found ${enKeys.length}`);
});

// Test: All configured languages exist in translations
suite.test('All configured languages exist', function() {
    const expectedLanguages = [
        'en', 'ru', 'be', 'zh', 'hi', 'fa', 'ar', 'ko', 'ja', 'sr',
        'fr', 'de', 'es', 'pt', 'no', 'da', 'sv', 'is', 'bg', 'ro',
        'hu', 'it', 'el', 'he', 'ka', 'kk', 'uz', 'tg', 'tr'
    ];

    for (const lang of expectedLanguages) {
        this.assertTrue(lang in this.translations, `Language ${lang} should exist`);
    }
});

// Test: All languages have the same keys as English
suite.test('All languages have complete key sets', function() {
    const enKeys = new Set(Object.keys(this.translations.en));

    for (const [lang, langData] of Object.entries(this.translations)) {
        if (lang === 'en') continue;

        const langKeys = new Set(Object.keys(langData || {}));
        const missing = [...enKeys].filter(key => !langKeys.has(key));

        this.assertTrue(
            missing.length === 0,
            `Language ${lang} missing keys: ${missing.slice(0, 5).join(', ')}`
        );
    }
});

// Test: No translation values are empty strings
suite.test('No empty translation values', function() {
    for (const [lang, langData] of Object.entries(this.translations)) {
        for (const [key, value] of Object.entries(langData || {})) {
            if (typeof value === 'string') {
                this.assertTrue(
                    value.trim().length > 0,
                    `${lang}.${key} should not be empty`
                );
            }
        }
    }
});

// Test: Brand names are preserved in all translations
suite.test('Brand name "Server Factory" is not translated', function() {
    const brandTranslations = {
        'ru': ['Фабрика серверов', 'Сервер Фабрика'],
        'zh': ['服务器工厂', '伺服器工廠'],
        'fr': ['Usine de serveurs', 'Fabrique de serveurs'],
        'de': ['Serverfabrik', 'Server-Fabrik'],
        'es': ['Fábrica de servidores'],
        'pt': ['Fábrica de servidores'],
        'it': ['Fabbrica di server']
    };

    for (const [lang, incorrectForms] of Object.entries(brandTranslations)) {
        if (!(lang in this.translations)) continue;

        for (const [key, value] of Object.entries(this.translations[lang] || {})) {
            if (typeof value !== 'string') continue;

            for (const incorrect of incorrectForms) {
                this.assertFalse(
                    value.includes(incorrect),
                    `${lang}.${key} should not translate "Server Factory" as "${incorrect}"`
                );
            }
        }
    }
});

// Test: footer_server_factory is exactly "Server Factory" in all languages
suite.test('footer_server_factory is exactly "Server Factory"', function() {
    for (const [lang, langData] of Object.entries(this.translations)) {
        if (lang === 'en') continue;

        if (langData && 'footer_server_factory' in langData) {
            this.assertEquals(
                langData.footer_server_factory,
                'Server Factory',
                `${lang}.footer_server_factory should be "Server Factory"`
            );
        }
    }
});

// Test: footer_github_pages is exactly "GitHub Pages" in all languages
suite.test('footer_github_pages is exactly "GitHub Pages"', function() {
    for (const [lang, langData] of Object.entries(this.translations)) {
        if (lang === 'en') continue;

        if (langData && 'footer_github_pages' in langData) {
            this.assertEquals(
                langData.footer_github_pages,
                'GitHub Pages',
                `${lang}.footer_github_pages should be "GitHub Pages"`
            );
        }
    }
});

// Test: Technical brand names are preserved
suite.test('Technical brand names are preserved (Docker, Kotlin, etc.)', function() {
    const technicalBrands = ['Docker', 'Kotlin', 'Gradle', 'Java', 'PostgreSQL', 'Redis'];

    for (const [lang, langData] of Object.entries(this.translations)) {
        if (lang === 'en') continue;

        // Check architecture badges and technical terms
        const badgeKeys = [
            'architecture_badge_docker',
            'architecture_badge_kotlin',
            'architecture_badge_gradle',
            'architecture_badge_java'
        ];

        for (const key of badgeKeys) {
            if (langData && key in langData) {
                const value = langData[key];
                // These should contain the English brand name
                let foundBrand = false;
                for (const brand of technicalBrands) {
                    if (value.includes(brand)) {
                        foundBrand = true;
                        break;
                    }
                }
                this.assertTrue(
                    foundBrand,
                    `${lang}.${key} should contain a technical brand name, found: "${value}"`
                );
            }
        }
    }
});

// Test: Hero title contains proper branding
suite.test('Hero titles maintain "Mail Server Factory" brand', function() {
    for (const [lang, langData] of Object.entries(this.translations)) {
        if (lang === 'en') continue;

        if (langData && 'logo_alt' in langData) {
            this.assertContains(
                langData.logo_alt,
                'Mail Server Factory',
                `${lang}.logo_alt should contain "Mail Server Factory"`
            );
        }

        if (langData && 'logo_alt_home' in langData) {
            this.assertContains(
                langData.logo_alt_home,
                'Mail Server Factory',
                `${lang}.logo_alt_home should contain "Mail Server Factory"`
            );
        }
    }
});

// Test: Code samples are not translated
suite.test('Code samples remain in English', function() {
    const codeKeys = [
        'code_json_example',
        'code_deploy_command',
        'code_verify_command',
        'code_ssh_setup'
    ];

    for (const [lang, langData] of Object.entries(this.translations)) {
        if (lang === 'en') continue;

        for (const key of codeKeys) {
            if (langData && key in langData) {
                const enValue = this.translations.en[key];
                const langValue = langData[key];

                // Code should be identical or very similar
                this.assertTrue(
                    langValue.includes('./mail_factory') || langValue.includes('docker') || langValue.includes('sh '),
                    `${lang}.${key} should contain command-line code`
                );
            }
        }
    }
});

// Test: Download button text is translated but contains emoji
suite.test('Download button contains download emoji', function() {
    for (const [lang, langData] of Object.entries(this.translations)) {
        if (langData && 'download_btn' in langData) {
            this.assertContains(
                langData.download_btn,
                '⬇',
                `${lang}.download_btn should contain download emoji ⬇`
            );
        }
    }
});

// Test: GitHub button contains star emoji
suite.test('GitHub button contains star emoji', function() {
    for (const [lang, langData] of Object.entries(this.translations)) {
        if (langData && 'github_btn' in langData) {
            this.assertContains(
                langData.github_btn,
                '⭐',
                `${lang}.github_btn should contain star emoji ⭐`
            );
        }
    }
});

// Test: Statistics numbers are consistent
suite.test('Statistics values are consistent across languages', function() {
    const statKeys = [
        'stats_distributions',
        'test_stat_value_total',
        'test_stat_value_success',
        'test_stat_value_coverage'
    ];

    for (const key of statKeys) {
        const enValue = this.translations.en[key];
        if (!enValue) continue;

        // Extract number from English version
        const enNumber = enValue.match(/\d+/);
        if (!enNumber) continue;

        for (const [lang, langData] of Object.entries(this.translations)) {
            if (lang === 'en' || !langData) continue;

            if (key in langData) {
                const langValue = langData[key];
                const langNumber = langValue.match(/\d+/);

                this.assertTrue(
                    langNumber !== null,
                    `${lang}.${key} should contain a number`
                );

                if (langNumber) {
                    this.assertEquals(
                        langNumber[0],
                        enNumber[0],
                        `${lang}.${key} number should match English (${enNumber[0]}), found ${langNumber[0]}`
                    );
                }
            }
        }
    }
});

// Test: Version numbers are consistent
suite.test('Version numbers are consistent across languages', function() {
    const versionKeys = Object.keys(this.translations.en).filter(key =>
        key.includes('version_') || key.includes('badge_')
    );

    for (const key of versionKeys) {
        const enValue = this.translations.en[key];
        if (!enValue || typeof enValue !== 'string') continue;

        // Extract version numbers (e.g., "2.0.21", "8.14.3", "17")
        const versionPattern = /\d+\.\d+(\.\d+)?/g;
        const enVersions = enValue.match(versionPattern) || [];

        if (enVersions.length === 0) continue;

        for (const [lang, langData] of Object.entries(this.translations)) {
            if (lang === 'en' || !langData) continue;

            if (key in langData) {
                const langValue = langData[key];
                const langVersions = (langValue.match(versionPattern) || []).sort();
                const enVersionsSorted = [...enVersions].sort();

                this.assertEquals(
                    langVersions.length,
                    enVersionsSorted.length,
                    `${lang}.${key} should have same number of versions as English`
                );

                // Versions should match
                langVersions.forEach((ver, idx) => {
                    if (enVersionsSorted[idx]) {
                        this.assertEquals(
                            ver,
                            enVersionsSorted[idx],
                            `${lang}.${key} version mismatch`
                        );
                    }
                });
            }
        }
    }
});

// Test: File paths in configurations are identical
suite.test('Configuration file paths are identical across languages', function() {
    const configKeys = Object.keys(this.translations.en).filter(key =>
        key.startsWith('table_config_')
    );

    for (const key of configKeys) {
        const enValue = this.translations.en[key];

        for (const [lang, langData] of Object.entries(this.translations)) {
            if (lang === 'en' || !langData) continue;

            if (key in langData) {
                this.assertEquals(
                    langData[key],
                    enValue,
                    `${lang}.${key} file path should be identical to English`
                );
            }
        }
    }
});

// Test: Step numbers are consistent
suite.test('Step numbers are preserved across languages', function() {
    const stepKeys = ['step_number1', 'step_number2', 'step_number3'];

    for (const [idx, key] of stepKeys.entries()) {
        const expectedNumber = String(idx + 1);

        for (const [lang, langData] of Object.entries(this.translations)) {
            if (!langData || !(key in langData)) continue;

            this.assertEquals(
                langData[key],
                expectedNumber,
                `${lang}.${key} should be "${expectedNumber}"`
            );
        }
    }
});

// Test: RTL languages have proper direction marker keys
suite.test('RTL languages exist and have direction support', function() {
    const rtlLanguages = ['ar', 'fa', 'he'];

    for (const lang of rtlLanguages) {
        this.assertTrue(
            lang in this.translations,
            `RTL language ${lang} should exist in translations`
        );
    }
});

// Run all tests
if (require.main === module) {
    suite.runTests().then(passed => {
        process.exit(passed ? 0 : 1);
    });
}

module.exports = TranslationUnitTests;
