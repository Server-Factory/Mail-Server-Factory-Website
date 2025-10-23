#!/usr/bin/env node

/**
 * Comprehensive Test Runner for Mail Server Factory Website
 * This script runs all localization and functionality tests
 * Designed for AI QA systems and automated testing environments
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class ComprehensiveTestRunner {
    constructor() {
        this.results = {
            summary: {
                totalTests: 0,
                passed: 0,
                failed: 0,
                warnings: 0,
                languages: {}
            },
            details: [],
            metadata: {
                timestamp: new Date().toISOString(),
                version: '1.0.0',
                testEnvironment: 'puppeteer'
            }
        };

        this.supportedLanguages = [
            'en', 'ru', 'be', 'zh', 'hi', 'fa', 'ar', 'ko', 'ja', 'sr',
            'fr', 'de', 'es', 'pt', 'no', 'da', 'sv', 'is', 'bg', 'ro',
            'hu', 'it', 'el', 'he', 'ka', 'kk', 'uz', 'tg', 'tr'
        ];
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
            timestamp,
            language
        });
    }

    async runAllTests(url = 'http://localhost:4000') {
        console.log('🚀 Starting Comprehensive Mail Server Factory Website Tests...');
        console.log(`📍 Testing URL: ${url}`);
        console.log(`🌍 Languages to test: ${this.supportedLanguages.length}`);

        let browser;
        try {
            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            const page = await browser.newPage();
            await page.setViewport({ width: 1280, height: 1024 });

            // Navigate to the website
            console.log('📄 Loading website...');
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

            // Wait for page to load completely
            await page.waitForTimeout(2000);

            // Run basic functionality tests
            await this.runBasicTests(page);

            // Run comprehensive localization tests
            await this.runLocalizationTests(page);

            // Generate final report
            this.generateReport();

        } catch (error) {
            console.error('❌ Test runner failed:', error);
            this.results.summary.failed++;
        } finally {
            if (browser) {
                await browser.close();
            }
        }

        return this.results;
    }

    async runBasicTests(page) {
        console.log('\n🔧 Running Basic Functionality Tests...');

        try {
            // Test page load
            const title = await page.title();
            if (title.includes('Mail Server Factory')) {
                this.log('Page loaded successfully', 'pass');
                this.results.summary.passed++;
            } else {
                this.log(`Unexpected page title: ${title}`, 'fail');
                this.results.summary.failed++;
            }
            this.results.summary.totalTests++;

            // Test language selector presence
            const languageSelector = await page.$('.language-selector');
            if (languageSelector) {
                this.log('Language selector found', 'pass');
                this.results.summary.passed++;
            } else {
                this.log('Language selector not found', 'fail');
                this.results.summary.failed++;
            }
            this.results.summary.totalTests++;

            // Test hero section
            const heroTitle = await page.$('.hero-title');
            if (heroTitle) {
                this.log('Hero section found', 'pass');
                this.results.summary.passed++;
            } else {
                this.log('Hero section not found', 'fail');
                this.results.summary.failed++;
            }
            this.results.summary.totalTests++;

        } catch (error) {
            this.log(`Basic test error: ${error.message}`, 'fail');
            this.results.summary.failed++;
            this.results.summary.totalTests++;
        }
    }

    async runLocalizationTests(page) {
        console.log('\n🌍 Running Comprehensive Localization Tests...');

        for (const lang of this.supportedLanguages) {
            console.log(`\n🔄 Testing language: ${lang.toUpperCase()}`);
            this.results.summary.languages[lang] = { passed: 0, failed: 0, total: 0 };

            try {
                // Change language
                await page.evaluate((language) => {
                    if (window.languageSelectorInstance) {
                        window.languageSelectorInstance.changeLanguage(language);
                    }
                }, lang);

                // Wait for language change
                await page.waitForTimeout(1000);

                // Verify language was set
                const currentLang = await page.evaluate(() => document.documentElement.lang);
                if (currentLang === lang) {
                    this.log('Language set correctly', 'pass', lang);
                    this.results.summary.languages[lang].passed++;
                    this.results.summary.passed++;
                } else {
                    this.log(`Language not set correctly. Expected: ${lang}, Got: ${currentLang}`, 'fail', lang);
                    this.results.summary.languages[lang].failed++;
                    this.results.summary.failed++;
                }
                this.results.summary.languages[lang].total++;
                this.results.summary.totalTests++;

                // Test key translations
                const translationTests = [
                    { selector: '[data-i18n="hero_title"]', key: 'hero_title' },
                    { selector: '[data-i18n="features_title"]', key: 'features_title' },
                    { selector: '[data-i18n="enterprise_title"]', key: 'enterprise_title' },
                    { selector: '[data-i18n="cta_title"]', key: 'cta_title' }
                ];

                for (const test of translationTests) {
                    const element = await page.$(test.selector);
                    if (element) {
                        const text = await page.evaluate(el => el.textContent.trim(), element);
                        if (text && text.length > 0) {
                            // Check for English words in non-English locales
                            if (lang !== 'en') {
                                const hasEnglishWords = await page.evaluate((content) => {
                                    const englishWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'Download', 'View', 'Like', 'Boss', 'Run', 'Your', 'Mail', 'Server'];
                                    const words = content.toLowerCase().split(/\s+/);
                                    return words.some(word => englishWords.includes(word.replace(/[^\w]/g, '')));
                                }, text);

                                if (hasEnglishWords) {
                                    this.log(`English words found in ${test.key}`, 'fail', lang);
                                    this.results.summary.languages[lang].failed++;
                                    this.results.summary.failed++;
                                } else {
                                    this.log(`${test.key} translated correctly`, 'pass', lang);
                                    this.results.summary.languages[lang].passed++;
                                    this.results.summary.passed++;
                                }
                            } else {
                                this.log(`${test.key} present`, 'pass', lang);
                                this.results.summary.languages[lang].passed++;
                                this.results.summary.passed++;
                            }
                        } else {
                            this.log(`${test.key} is empty`, 'fail', lang);
                            this.results.summary.languages[lang].failed++;
                            this.results.summary.failed++;
                        }
                    } else {
                        this.log(`${test.key} element not found`, 'fail', lang);
                        this.results.summary.languages[lang].failed++;
                        this.results.summary.failed++;
                    }
                    this.results.summary.languages[lang].total++;
                    this.results.summary.totalTests++;
                }

                // Test RTL for RTL languages
                const rtlLanguages = ['ar', 'fa', 'he'];
                if (rtlLanguages.includes(lang)) {
                    const dir = await page.evaluate(() => document.documentElement.dir);
                    if (dir === 'rtl') {
                        this.log('RTL direction set correctly', 'pass', lang);
                        this.results.summary.languages[lang].passed++;
                        this.results.summary.passed++;
                    } else {
                        this.log('RTL direction not set', 'fail', lang);
                        this.results.summary.languages[lang].failed++;
                        this.results.summary.failed++;
                    }
                    this.results.summary.languages[lang].total++;
                    this.results.summary.totalTests++;
                }

            } catch (error) {
                this.log(`Error testing ${lang}: ${error.message}`, 'fail', lang);
                this.results.summary.languages[lang].failed++;
                this.results.summary.failed++;
                this.results.summary.languages[lang].total++;
                this.results.summary.totalTests++;
            }
        }
    }

    generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 COMPREHENSIVE TEST REPORT');
        console.log('='.repeat(60));

        console.log(`\n📈 SUMMARY:`);
        console.log(`   Total Tests: ${this.results.summary.totalTests}`);
        console.log(`   ✅ Passed: ${this.results.summary.passed}`);
        console.log(`   ❌ Failed: ${this.results.summary.failed}`);
        console.log(`   ⚠️  Warnings: ${this.results.summary.warnings}`);

        const successRate = ((this.results.summary.passed / this.results.summary.totalTests) * 100).toFixed(2);
        console.log(`   📊 Success Rate: ${successRate}%`);

        console.log(`\n🌍 LANGUAGE BREAKDOWN:`);
        for (const [lang, stats] of Object.entries(this.results.summary.languages)) {
            const langSuccessRate = stats.total > 0 ? ((stats.passed / stats.total) * 100).toFixed(1) : '0.0';
            const status = stats.failed === 0 ? '✅' : '❌';
            console.log(`   ${lang.toUpperCase()}: ${status} ${stats.passed}/${stats.total} (${langSuccessRate}%)`);
        }

        // Overall result
        const overallSuccess = this.results.summary.failed === 0;
        console.log(`\n🏆 FINAL RESULT: ${overallSuccess ? 'ALL TESTS PASSED! 🎉' : 'SOME TESTS FAILED! ⚠️'}`);

        if (!overallSuccess) {
            console.log('\n🔍 FAILED TESTS:');
            this.results.details.filter(test => test.status === 'fail').forEach(test => {
                console.log(`   ❌ ${test.language ? `[${test.language}] ` : ''}${test.message}`);
            });
        }

        // Save detailed report
        const reportPath = path.join(process.cwd(), 'test-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
        console.log(`\n💾 Detailed report saved to: ${reportPath}`);

        return overallSuccess;
    }
}

// CLI interface
if (require.main === module) {
    const args = process.argv.slice(2);
    const url = args[0] || 'http://localhost:4000';

    const runner = new ComprehensiveTestRunner();
    runner.runAllTests(url).then(success => {
        process.exit(success ? 0 : 1);
    }).catch(error => {
        console.error('Test runner failed:', error);
        process.exit(1);
    });
}

module.exports = ComprehensiveTestRunner;