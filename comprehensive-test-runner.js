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
            'en', 'ru', 'zh', 'be', 'sr'
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
        console.log(`📱 Viewports to test: Desktop, Tablet, Mobile`);

        let browser;
        try {
            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            // Test multiple viewports
            const viewports = [
                { name: 'Desktop', width: 1280, height: 1024 },
                { name: 'Tablet', width: 768, height: 1024 },
                { name: 'Mobile', width: 375, height: 667 }
            ];

            for (const viewport of viewports) {
                console.log(`\n📱 Testing viewport: ${viewport.name} (${viewport.width}x${viewport.height})`);

                const page = await browser.newPage();
                await page.setViewport({ width: viewport.width, height: viewport.height });

                // Navigate to the website
                console.log('📄 Loading website...');
                await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

                // Wait for page to load completely
                await page.waitForTimeout(2000);

                // Run responsiveness tests
                await this.runResponsivenessTests(page, viewport);

                // Run basic functionality tests
                await this.runBasicTests(page, viewport);

                // Run comprehensive localization tests
                await this.runLocalizationTests(page, viewport);

                await page.close();
            }

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

    async runResponsivenessTests(page, viewport) {
        console.log(`📏 Running Responsiveness Tests for ${viewport.name}...`);

        try {
            // Check for horizontal scroll
            const scrollWidth = await page.evaluate(() => {
                return Math.max(
                    document.body.scrollWidth,
                    document.body.offsetWidth,
                    document.documentElement.clientWidth,
                    document.documentElement.scrollWidth,
                    document.documentElement.offsetWidth
                );
            });

            const viewportWidth = viewport.width;

            if (scrollWidth <= viewportWidth + 10) { // Allow small tolerance
                this.log(`No horizontal scroll detected (${scrollWidth}px content vs ${viewportWidth}px viewport)`, 'pass');
                this.results.summary.passed++;
            } else {
                this.log(`Horizontal scroll detected: ${scrollWidth}px content vs ${viewportWidth}px viewport`, 'fail');
                this.results.summary.failed++;
            }
            this.results.summary.totalTests++;

            // Check if content is cut off
            const contentWidth = await page.evaluate(() => {
                const body = document.body;
                const html = document.documentElement;
                return Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
            });

            if (contentWidth <= viewportWidth) {
                this.log('Content fits within viewport width', 'pass');
                this.results.summary.passed++;
            } else {
                this.log(`Content overflows viewport: ${contentWidth}px vs ${viewportWidth}px`, 'fail');
                this.results.summary.failed++;
            }
            this.results.summary.totalTests++;

            // Check if all text is visible
            const hiddenText = await page.evaluate(() => {
                const elements = document.querySelectorAll('*');
                let hiddenCount = 0;
                for (const el of elements) {
                    const style = window.getComputedStyle(el);
                    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
                        if (el.textContent.trim()) {
                            hiddenCount++;
                        }
                    }
                }
                return hiddenCount;
            });

            if (hiddenCount === 0) {
                this.log('All text elements are visible', 'pass');
                this.results.summary.passed++;
            } else {
                this.log(`${hiddenCount} text elements are hidden`, 'warning');
                this.results.summary.warnings++;
            }
            this.results.summary.totalTests++;

        } catch (error) {
            this.log(`Responsiveness test error: ${error.message}`, 'fail');
            this.results.summary.failed++;
            this.results.summary.totalTests++;
        }
    }

    async runBasicTests(page, viewport) {
        console.log(`\n🔧 Running Basic Functionality Tests for ${viewport.name}...`);

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

    async runLocalizationTests(page, viewport) {
        console.log(`\n🌍 Running Comprehensive Localization Tests for ${viewport.name}...`);

        for (const lang of this.supportedLanguages) {
            console.log(`\n🔄 Testing language: ${lang.toUpperCase()} on ${viewport.name}`);
            this.results.summary.languages[lang] = this.results.summary.languages[lang] || { passed: 0, failed: 0, total: 0 };

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

                // Test comprehensive translations - check ALL translatable elements
                const allTranslatableSelectors = [
                    // Hero section
                    '[data-i18n="hero_title"]', '[data-i18n="hero_subtitle"]', '[data-i18n="download_btn"]', '[data-i18n="github_btn"]',
                    '[data-i18n="stats_distributions"]', '[data-i18n="stats_automated"]', '[data-i18n="stats_production"]', '[data-i18n="stats_enterprise"]',
                    '[data-i18n="stat_label_tested"]', '[data-i18n="stat_label_config"]', '[data-i18n="stat_label_protocols"]', '[data-i18n="stat_label_docker"]',

                    // Features section
                    '[data-i18n="features_title"]', '[data-i18n="features_subtitle"]', '[data-i18n="feature_zero_touch"]', '[data-i18n="feature_docker"]',
                    '[data-i18n="feature_security"]', '[data-i18n="feature_tested"]', '[data-i18n="feature_ssh"]', '[data-i18n="feature_complete"]',

                    // Enterprise section
                    '[data-i18n="enterprise_title"]', '[data-i18n="enterprise_subtitle"]', '[data-i18n="enterprise_security"]', '[data-i18n="enterprise_monitoring"]',
                    '[data-i18n="enterprise_config"]', '[data-i18n="enterprise_performance"]',

                    // Tech stack section
                    '[data-i18n="tech_stack_title"]', '[data-i18n="tech_stack_subtitle"]',

                    // Architecture section
                    '[data-i18n="architecture_title"]', '[data-i18n="architecture_subtitle"]',

                    // How it works section
                    '[data-i18n="how_it_works_title"]', '[data-i18n="how_it_works_subtitle"]', '[data-i18n="step_configure"]', '[data-i18n="step_deploy"]', '[data-i18n="step_use"]',

                    // Testing section
                    '[data-i18n="testing_title"]', '[data-i18n="testing_subtitle"]',

                    // Compatibility section
                    '[data-i18n="compatibility_title"]', '[data-i18n="compatibility_subtitle"]',

                    // Use cases section
                    '[data-i18n="use_cases_title"]',

                    // Documentation section
                    '[data-i18n="documentation_title"]',

                    // CTA section
                    '[data-i18n="cta_title"]', '[data-i18n="cta_subtitle"]', '[data-i18n="cta_note"]'
                ];

                // Test all translatable elements
                let translationPassCount = 0;
                let translationFailCount = 0;

                for (const selector of allTranslatableSelectors) {
                    const element = await page.$(selector);
                    if (element) {
                        const text = await page.evaluate(el => el.textContent.trim(), element);
                        if (text && text.length > 0) {
                            // Check for English words in non-English locales
                            if (lang !== 'en') {
                                const hasEnglishWords = await page.evaluate((content) => {
                                    // Comprehensive list of common English words that should not appear
                                    const englishWords = [
                                        'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
                                        'an', 'a', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
                                        'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must',
                                        'can', 'shall', 'this', 'that', 'these', 'those', 'here', 'there', 'where', 'when',
                                        'why', 'how', 'what', 'which', 'who', 'Download', 'View', 'Like', 'Boss', 'Run',
                                        'Your', 'Mail', 'Server', 'Enterprise', 'Grade', 'Automated', 'Installation',
                                        'Comprehensive', 'Testing', 'Multi', 'Distribution', 'Why', 'Factory', 'Features',
                                        'without', 'complexity', 'Zero', 'Touch', 'Deployment', 'Docker', 'Native',
                                        'Security', 'Built', 'In', 'Battle', 'Tested', 'Code', 'SSH', 'Based', 'Remote',
                                        'Execution', 'Complete', 'Stack', 'Advanced', 'Monitoring', 'Observability',
                                        'Configuration', 'Management', 'Performance', 'Optimization', 'Technology',
                                        'Powered', 'industry', 'leading', 'open', 'source', 'technologies', 'Enterprise',
                                        'Architecture', 'Multi', 'layered', 'architecture', 'designed', 'scalability',
                                        'How', 'It', 'Works', 'Three', 'simple', 'steps', 'your', 'production', 'mail',
                                        'server', 'Configure', 'Deploy', 'Use', 'Quick', 'Start', 'Quality', 'Testing',
                                        'comprehensive', 'test', 'coverage', 'ensures', 'reliability', 'Distribution',
                                        'Support', 'Matrix', 'Deploy', 'latest', 'modern', 'Linux', 'server', 'distributions',
                                        'Launcher', 'production', 'ready', 'bash', 'wrapper', 'grade', 'error', 'handling',
                                        'Who', 'Uses', 'Documentation', 'Resources', 'Ready', 'deploy', 'Join', 'community',
                                        'take', 'control', 'email', 'infrastructure', 'today', 'Open', 'source', 'Free',
                                        'forever', 'Community', 'supported'
                                    ];
                                    const words = content.toLowerCase().split(/\s+/);
                                    return words.some(word => {
                                        const cleanWord = word.replace(/[^\w]/g, '');
                                        return englishWords.includes(cleanWord) && cleanWord.length > 2;
                                    });
                                }, text);

                                if (hasEnglishWords) {
                                    this.log(`English words found in ${selector}`, 'fail', lang);
                                    translationFailCount++;
                                } else {
                                    translationPassCount++;
                                }
                            } else {
                                translationPassCount++;
                            }
                        } else {
                            this.log(`${selector} is empty`, 'fail', lang);
                            translationFailCount++;
                        }
                    } else {
                        this.log(`${selector} element not found`, 'fail', lang);
                        translationFailCount++;
                    }
                }

                // Update results for this language
                if (translationFailCount === 0) {
                    this.log(`All ${allTranslatableSelectors.length} translations verified`, 'pass', lang);
                    this.results.summary.languages[lang].passed += translationPassCount;
                    this.results.summary.passed += translationPassCount;
                } else {
                    this.log(`${translationFailCount} translation issues found`, 'fail', lang);
                    this.results.summary.languages[lang].failed += translationFailCount;
                    this.results.summary.failed += translationFailCount;
                    this.results.summary.languages[lang].passed += translationPassCount;
                    this.results.summary.passed += translationPassCount;
                }
                this.results.summary.languages[lang].total += allTranslatableSelectors.length;
                this.results.summary.totalTests += allTranslatableSelectors.length;

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