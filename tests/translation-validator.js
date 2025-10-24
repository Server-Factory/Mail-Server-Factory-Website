#!/usr/bin/env node

/**
 * Translation Validator - Comprehensive test suite for translations
 * Tests for:
 * 1. Missing translation keys
 * 2. Brand names kept in original form
 * 3. Completeness of translations
 * 4. Consistency across languages
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Brand names that should NEVER be translated
const BRAND_NAMES = [
    'Mail Server Factory',
    'Server Factory',
    'GitHub',
    'GitHub Pages',
    'Docker',
    'Kotlin',
    'Gradle',
    'Java',
    'PostgreSQL',
    'Postfix',
    'Dovecot',
    'Rspamd',
    'Redis',
    'ClamAV',
    'Prometheus',
    'JSON',
    'SSH',
    'SMTP',
    'IMAP',
    'POP3',
    'TLS',
    'AES-256-GCM',
    'G1GC',
    'JVM',
    'Caffeine',
    'Ubuntu',
    'Debian',
    'Fedora',
    'AlmaLinux',
    'Rocky Linux',
    'RHEL',
    'openSUSE'
];

// Keys that should contain brand names in original
const BRAND_NAME_KEYS = [
    'footer_server_factory',
    'footer_github_pages',
    'logo_alt',
    'logo_alt_home',
    'features_title',  // "Why Mail Server Factory?"
    'use_cases_title', // "Who Uses Mail Server Factory?"
    'cta_subtitle',    // "Join the Mail Server Factory community"
    'feature_zero_touch_desc',  // Contains "Mail Server Factory"
    'code_web_installer',
    'code_manual_install'
];

class TranslationValidator {
    constructor(translationsPath) {
        this.translationsPath = translationsPath;
        this.translations = null;
        this.errors = [];
        this.warnings = [];
        this.stats = {
            totalLanguages: 0,
            totalKeys: 0,
            missingTranslations: 0,
            brandNameViolations: 0,
            untranslatedContent: 0
        };
    }

    loadTranslations() {
        try {
            const fileContents = fs.readFileSync(this.translationsPath, 'utf8');
            this.translations = yaml.load(fileContents);
            this.stats.totalLanguages = Object.keys(this.translations).length;
            this.stats.totalKeys = Object.keys(this.translations.en || {}).length;
            return true;
        } catch (error) {
            this.errors.push(`Failed to load translations: ${error.message}`);
            return false;
        }
    }

    validateBrandNames() {
        console.log('\n=== Validating Brand Names ===\n');

        const brandNameTranslations = {
            // Common incorrect translations
            'ru': {
                'Server Factory': ['Фабрика серверов', 'Сервер Фабрика', 'Фабрика Серверов'],
                'Mail Server Factory': ['Фабрика почтовых серверов', 'Мейл Сервер Фабрика']
            },
            'zh': {
                'Server Factory': ['服务器工厂', '伺服器工廠'],
                'Mail Server Factory': ['邮件服务器工厂', '郵件伺服器工廠']
            },
            'fr': {
                'Server Factory': ['Usine de serveurs', 'Fabrique de serveurs'],
                'Mail Server Factory': ['Usine de serveurs de messagerie']
            },
            'de': {
                'Server Factory': ['Serverfabrik', 'Server-Fabrik'],
                'Mail Server Factory': ['Mail-Server-Fabrik', 'Mailserverfabrik']
            },
            'es': {
                'Server Factory': ['Fábrica de servidores'],
                'Mail Server Factory': ['Fábrica de servidores de correo']
            },
            'pt': {
                'Server Factory': ['Fábrica de servidores'],
                'Mail Server Factory': ['Fábrica de servidores de e-mail']
            },
            'it': {
                'Server Factory': ['Fabbrica di server'],
                'Mail Server Factory': ['Fabbrica di server di posta']
            }
        };

        for (const [langCode, langData] of Object.entries(this.translations)) {
            if (langCode === 'en') continue;

            const incorrectTranslations = brandNameTranslations[langCode] || {};

            for (const [key, value] of Object.entries(langData || {})) {
                if (!value || typeof value !== 'string') continue;

                // Check for incorrect brand name translations
                for (const [brand, incorrectForms] of Object.entries(incorrectTranslations)) {
                    for (const incorrect of incorrectForms) {
                        if (value.includes(incorrect)) {
                            this.errors.push(
                                `[${langCode}] ${key}: Brand name "${brand}" incorrectly translated as "${incorrect}"`
                            );
                            this.stats.brandNameViolations++;
                        }
                    }
                }

                // Special validation for keys that MUST contain brand names
                if (key === 'footer_server_factory' && value !== 'Server Factory') {
                    this.errors.push(
                        `[${langCode}] ${key}: Must be exactly "Server Factory", found "${value}"`
                    );
                    this.stats.brandNameViolations++;
                }

                if (key === 'footer_github_pages' && value !== 'GitHub Pages') {
                    this.errors.push(
                        `[${langCode}] ${key}: Must be exactly "GitHub Pages", found "${value}"`
                    );
                    this.stats.brandNameViolations++;
                }
            }
        }

        if (this.stats.brandNameViolations === 0) {
            console.log('✓ No brand name violations found');
        } else {
            console.log(`✗ Found ${this.stats.brandNameViolations} brand name violations`);
        }
    }

    validateCompleteness() {
        console.log('\n=== Validating Translation Completeness ===\n');

        const enKeys = new Set(Object.keys(this.translations.en || {}));

        for (const [langCode, langData] of Object.entries(this.translations)) {
            if (langCode === 'en') continue;

            const langKeys = new Set(Object.keys(langData || {}));
            const missing = [...enKeys].filter(key => !langKeys.has(key));

            if (missing.length > 0) {
                this.errors.push(
                    `[${langCode}] Missing ${missing.length} keys: ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '...' : ''}`
                );
                this.stats.missingTranslations += missing.length;
            }

            // Check for empty values
            for (const [key, value] of Object.entries(langData || {})) {
                if (!value || (typeof value === 'string' && value.trim() === '')) {
                    this.errors.push(`[${langCode}] ${key}: Empty translation value`);
                }
            }
        }

        if (this.stats.missingTranslations === 0) {
            console.log('✓ All languages have complete translations');
        } else {
            console.log(`✗ Found ${this.stats.missingTranslations} missing translations`);
        }
    }

    validateConsistency() {
        console.log('\n=== Validating Translation Consistency ===\n');

        // Check that technical terms are consistent within each language
        const technicalTerms = [
            'configuration', 'deployment', 'automation', 'enterprise',
            'monitoring', 'security', 'performance', 'testing'
        ];

        let inconsistencies = 0;

        for (const [langCode, langData] of Object.entries(this.translations)) {
            if (langCode === 'en') continue;

            const termTranslations = {};

            // Collect translations of technical terms
            for (const [key, value] of Object.entries(langData || {})) {
                if (typeof value !== 'string') continue;

                for (const term of technicalTerms) {
                    if (key.toLowerCase().includes(term)) {
                        if (!termTranslations[term]) {
                            termTranslations[term] = new Set();
                        }
                        // Extract the word(s) used for this technical term
                        termTranslations[term].add(value.substring(0, 50));
                    }
                }
            }

            // Report if same technical term is translated differently
            for (const [term, translations] of Object.entries(termTranslations)) {
                if (translations.size > 5) { // Allow some variation
                    this.warnings.push(
                        `[${langCode}] Technical term "${term}" has ${translations.size} different translations (may indicate inconsistency)`
                    );
                    inconsistencies++;
                }
            }
        }

        if (inconsistencies === 0) {
            console.log('✓ No obvious consistency issues found');
        } else {
            console.log(`⚠ Found ${inconsistencies} potential consistency issues`);
        }
    }

    validateUntranslatedContent() {
        console.log('\n=== Checking for Untranslated English Content ===\n');

        // Common English words/phrases that shouldn't appear in non-English translations
        const englishIndicators = [
            /\bthe\b/i, /\band\b/i, /\bwith\b/i, /\bfor\b/i, /\byour\b/i,
            /\bWhy\s+Mail\s+Server\s+Factory\?/,  // This specific phrase in non-English
            /\bWho\s+Uses\s+Mail\s+Server\s+Factory\?/,
            /\bRun\s+your\s+mail\s+server\b/i
        ];

        // Keys that are allowed to have English (code samples, URLs, commands)
        const allowedEnglishKeys = [
            'code_json_example',
            'code_deploy_command',
            'code_verify_command',
            'code_ssh_setup',
            'code_web_installer',
            'code_manual_install',
            'table_config_',  // Prefix for file paths
            'github_btn',
            'download_btn',
            'cta_download',
            'cta_github'
        ];

        for (const [langCode, langData] of Object.entries(this.translations)) {
            if (langCode === 'en') continue;

            for (const [key, value] of Object.entries(langData || {})) {
                if (typeof value !== 'string') continue;

                // Skip keys that are allowed to have English
                if (allowedEnglishKeys.some(allowed => key.includes(allowed))) {
                    continue;
                }

                // Check for English indicators
                for (const pattern of englishIndicators) {
                    if (pattern.test(value)) {
                        // Make sure it's not a false positive (brand names are OK)
                        let isBrandName = false;
                        for (const brand of BRAND_NAMES) {
                            if (value.includes(brand)) {
                                isBrandName = true;
                                break;
                            }
                        }

                        if (!isBrandName) {
                            this.warnings.push(
                                `[${langCode}] ${key}: Possible untranslated English text: "${value.substring(0, 80)}${value.length > 80 ? '...' : ''}"`
                            );
                            this.stats.untranslatedContent++;
                        }
                    }
                }
            }
        }

        if (this.stats.untranslatedContent === 0) {
            console.log('✓ No untranslated English content detected');
        } else {
            console.log(`⚠ Found ${this.stats.untranslatedContent} possible cases of untranslated content`);
        }
    }

    generateReport() {
        console.log('\n' + '='.repeat(70));
        console.log('TRANSLATION VALIDATION REPORT');
        console.log('='.repeat(70));
        console.log('\nStatistics:');
        console.log(`  Total Languages: ${this.stats.totalLanguages}`);
        console.log(`  Total Translation Keys: ${this.stats.totalKeys}`);
        console.log(`  Missing Translations: ${this.stats.missingTranslations}`);
        console.log(`  Brand Name Violations: ${this.stats.brandNameViolations}`);
        console.log(`  Possible Untranslated Content: ${this.stats.untranslatedContent}`);

        console.log('\nErrors:');
        if (this.errors.length === 0) {
            console.log('  ✓ No errors found!');
        } else {
            this.errors.forEach(error => console.log(`  ✗ ${error}`));
        }

        console.log('\nWarnings:');
        if (this.warnings.length === 0) {
            console.log('  ✓ No warnings!');
        } else {
            this.warnings.slice(0, 20).forEach(warning => console.log(`  ⚠ ${warning}`));
            if (this.warnings.length > 20) {
                console.log(`  ... and ${this.warnings.length - 20} more warnings`);
            }
        }

        console.log('\n' + '='.repeat(70));

        return {
            passed: this.errors.length === 0,
            errors: this.errors.length,
            warnings: this.warnings.length,
            stats: this.stats
        };
    }

    run() {
        console.log('Translation Validator\n');

        if (!this.loadTranslations()) {
            console.error('Failed to load translations file');
            return false;
        }

        this.validateBrandNames();
        this.validateCompleteness();
        this.validateConsistency();
        this.validateUntranslatedContent();

        const result = this.generateReport();

        return result.passed;
    }
}

// Main execution
if (require.main === module) {
    const translationsPath = path.join(__dirname, '..', '_data', 'translations.yml');
    const validator = new TranslationValidator(translationsPath);
    const passed = validator.run();

    process.exit(passed ? 0 : 1);
}

module.exports = TranslationValidator;
