const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Static Validation Script for Mail Server Factory Website
 * Validates translations, structure, and readiness without running server
 */

class StaticValidator {
    constructor() {
        this.results = {
            summary: {
                totalChecks: 0,
                passed: 0,
                failed: 0,
                warnings: 0
            },
            details: [],
            languages: {}
        };
    }

    log(message, status = 'info', language = null) {
        const timestamp = new Date().toLocaleTimeString();
        const statusIcon = {
            'pass': '✅',
            'fail': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        }[status] || 'ℹ️';

        const logMessage = `${statusIcon} [${timestamp}] ${language ? `[${language}] ` : ''}${message}`;
        console.log(logMessage);

        this.results.details.push({
            message,
            status,
            language,
            timestamp: new Date().toISOString()
        });

        if (status === 'pass') this.results.summary.passed++;
        else if (status === 'fail') this.results.summary.failed++;
        else if (status === 'warning') this.results.summary.warnings++;

        this.results.summary.totalChecks++;
    }

    async validateTranslations() {
        console.log('🌍 Starting Static Translation Validation...\n');

        try {
            // Load translations
            const translationsPath = path.join(__dirname, '_data', 'translations.yml');
            const languagesPath = path.join(__dirname, '_data', 'languages.yml');

            if (!fs.existsSync(translationsPath)) {
                this.log('translations.yml not found', 'fail');
                return;
            }

            if (!fs.existsSync(languagesPath)) {
                this.log('languages.yml not found', 'fail');
                return;
            }

            const translationsContent = fs.readFileSync(translationsPath, 'utf8');
            const languagesContent = fs.readFileSync(languagesPath, 'utf8');

            const translations = yaml.load(translationsContent);
            const languages = yaml.load(languagesContent);

            // Get supported languages
            const supportedLanguages = Object.keys(languages);
            this.log(`Found ${supportedLanguages.length} supported languages: ${supportedLanguages.join(', ')}`);

            // Get English as reference
            const englishKeys = Object.keys(translations.en || {});
            this.log(`English has ${englishKeys.length} translation keys`);

            // Validate each language
            for (const lang of supportedLanguages) {
                this.results.languages[lang] = { total: 0, present: 0, missing: 0 };

                if (!translations[lang]) {
                    this.log(`Language ${lang} completely missing from translations`, 'fail', lang);
                    continue;
                }

                const langTranslations = translations[lang];
                const langKeys = Object.keys(langTranslations);

                this.results.languages[lang].total = englishKeys.length;
                this.results.languages[lang].present = langKeys.length;

                // Check for missing keys
                const missingKeys = englishKeys.filter(key => !langKeys.includes(key));
                if (missingKeys.length > 0) {
                    this.log(`Missing ${missingKeys.length} translations: ${missingKeys.join(', ')}`, 'fail', lang);
                    this.results.languages[lang].missing = missingKeys.length;
                } else {
                    this.log(`All ${englishKeys.length} translations present`, 'pass', lang);
                }

                // Check for empty translations
                const emptyTranslations = langKeys.filter(key => !langTranslations[key] || langTranslations[key].trim() === '');
                if (emptyTranslations.length > 0) {
                    this.log(`${emptyTranslations.length} empty translations: ${emptyTranslations.join(', ')}`, 'warning', lang);
                }

                // Check for English word leakage (basic check)
                const englishWords = ['the', 'and', 'or', 'is', 'are', 'was', 'were', 'has', 'have', 'with', 'for', 'from', 'to', 'by', 'on', 'in', 'at'];
                let englishLeakage = 0;

                for (const [key, value] of Object.entries(langTranslations)) {
                    if (typeof value === 'string') {
                        const words = value.toLowerCase().split(/\s+/);
                        for (const word of words) {
                            if (englishWords.includes(word) && lang !== 'en') {
                                englishLeakage++;
                                break;
                            }
                        }
                    }
                }

                if (englishLeakage > 0) {
                    this.log(`${englishLeakage} potential English word leakages detected`, 'warning', lang);
                }
            }

        } catch (error) {
            this.log(`Validation error: ${error.message}`, 'fail');
        }
    }

    async validateAssets() {
        console.log('\n📁 Validating Assets...\n');

        const requiredFiles = [
            '_data/translations.yml',
            '_data/languages.yml',
            'assets/js/language-selector.js',
            'assets/js/translations.js',
            'assets/css/style.scss',
            '_layouts/default.html'
        ];

        for (const file of requiredFiles) {
            if (fs.existsSync(path.join(__dirname, file))) {
                this.log(`Found ${file}`, 'pass');
            } else {
                this.log(`Missing ${file}`, 'fail');
            }
        }
    }

    async validateRTLSupport() {
        console.log('\n🔄 Validating RTL Support...\n');

        // Check JavaScript RTL implementation
        const jsPath = path.join(__dirname, 'assets/js/language-selector.js');
        if (fs.existsSync(jsPath)) {
            const jsContent = fs.readFileSync(jsPath, 'utf8');
            if (jsContent.includes('dir = rtlLanguages.includes(lang) ? \'rtl\' : \'ltr\'')) {
                this.log('JavaScript RTL direction setting implemented', 'pass');
            } else {
                this.log('JavaScript RTL direction setting missing', 'fail');
            }

            const rtlLanguages = ['ar', 'fa', 'he'];
            let rtlCheck = true;
            for (const lang of rtlLanguages) {
                if (!jsContent.includes(`'${lang}'`)) {
                    rtlCheck = false;
                    break;
                }
            }
            if (rtlCheck) {
                this.log('RTL languages properly configured in JavaScript', 'pass');
            } else {
                this.log('RTL languages not properly configured', 'fail');
            }
        }

        // Check CSS RTL support
        const cssPath = path.join(__dirname, 'assets/css/style.scss');
        if (fs.existsSync(cssPath)) {
            const cssContent = fs.readFileSync(cssPath, 'utf8');
            if (cssContent.includes('[dir="rtl"]')) {
                this.log('CSS RTL styles present', 'pass');
            } else {
                this.log('CSS RTL styles minimal or missing', 'warning');
            }
        }
    }

    async validateHTMLStructure() {
        console.log('\n🏗️ Validating HTML Structure...\n');

        const layoutPath = path.join(__dirname, '_layouts/default.html');
        if (fs.existsSync(layoutPath)) {
            const htmlContent = fs.readFileSync(layoutPath, 'utf8');

            // Check for required elements
            const checks = [
                { pattern: 'data-i18n', description: 'data-i18n attributes for translations' },
                { pattern: 'language-selector', description: 'language selector container' },
                { pattern: 'lang=', description: 'lang attribute on html element' },
                { pattern: 'dir=', description: 'dir attribute on html element' }
            ];

            for (const check of checks) {
                if (htmlContent.includes(check.pattern)) {
                    this.log(`${check.description} found`, 'pass');
                } else {
                    this.log(`${check.description} missing`, 'warning');
                }
            }
        } else {
            this.log('Default layout not found', 'fail');
        }
    }

    async validateTestInfrastructure() {
        console.log('\n🧪 Validating Test Infrastructure...\n');

        const testFiles = [
            'comprehensive-test-runner.js',
            'test-website.js',
            'package.json'
        ];

        for (const file of testFiles) {
            if (fs.existsSync(path.join(__dirname, file))) {
                this.log(`Test file ${file} present`, 'pass');
            } else {
                this.log(`Test file ${file} missing`, 'fail');
            }
        }

        // Check package.json for test scripts
        const packagePath = path.join(__dirname, 'package.json');
        if (fs.existsSync(packagePath)) {
            const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            if (packageContent.scripts && packageContent.scripts.test) {
                this.log('Test scripts configured in package.json', 'pass');
            } else {
                this.log('Test scripts missing in package.json', 'warning');
            }
        }
    }

    async runAllValidations() {
        console.log('🚀 Mail Server Factory Static Validation Suite\n');

        await this.validateAssets();
        await this.validateTranslations();
        await this.validateRTLSupport();
        await this.validateHTMLStructure();
        await this.validateTestInfrastructure();

        // Generate summary
        console.log('\n📊 VALIDATION SUMMARY:');
        console.log(`Total Checks: ${this.results.summary.totalChecks}`);
        console.log(`✅ Passed: ${this.results.summary.passed}`);
        console.log(`❌ Failed: ${this.results.summary.failed}`);
        console.log(`⚠️ Warnings: ${this.results.summary.warnings}`);

        const successRate = ((this.results.summary.passed / this.results.summary.totalChecks) * 100).toFixed(1);
        console.log(`Success Rate: ${successRate}%`);

        if (this.results.summary.failed === 0) {
            console.log('\n🎉 ALL VALIDATIONS PASSED!');
        } else {
            console.log(`\n⚠️ ${this.results.summary.failed} validation(s) failed.`);
        }

        // Save results
        const resultsPath = path.join(__dirname, 'static-validation-results.json');
        fs.writeFileSync(resultsPath, JSON.stringify(this.results, null, 2));
        console.log(`\n💾 Results saved to ${resultsPath}`);

        return this.results;
    }
}

// CLI interface
async function main() {
    const validator = new StaticValidator();
    await validator.runAllValidations();
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = StaticValidator;