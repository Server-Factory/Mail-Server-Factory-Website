// Mail Server Factory Website Test Suite
// Run this in browser console to test website functionality

class WebsiteTester {
    constructor() {
        this.results = [];
        this.startTime = performance.now();
    }

    log(message, status = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const statusIcon = {
            'pass': '✅',
            'fail': '❌', 
            'warning': '⚠️',
            'info': 'ℹ️'
        }[status] || 'ℹ️';
        
        console.log(`${statusIcon} [${timestamp}] ${message}`);
        this.results.push({message, status, timestamp});
    }

    // Language Selector Tests
    testLanguageSelector() {
        this.log('Testing Language Selector...', 'info');
        
        // Check if language selector exists
        const selector = document.querySelector('.language-selector');
        if (!selector) {
            this.log('Language selector not found in DOM', 'fail');
            return false;
        }
        
        this.log('Language selector found in DOM', 'pass');
        
        // Check if dropdown exists
        const dropdown = selector.querySelector('.language-dropdown');
        if (!dropdown) {
            this.log('Language dropdown not found', 'fail');
            return false;
        }
        
        this.log('Language dropdown found', 'pass');
        
        // Check if language options exist
        const options = dropdown.querySelectorAll('.language-option');
        if (options.length === 0) {
            this.log('No language options found', 'fail');
            return false;
        }
        
        this.log(`Found ${options.length} language options`, 'pass');
        
        // Test current language detection
        const currentLang = document.documentElement.lang || 'en';
        this.log(`Current language: ${currentLang}`, 'info');
        
        // Test RTL support
        const rtlLanguages = ['ar', 'fa', 'he'];
        const isRTL = document.documentElement.dir === 'rtl';
        const shouldBeRTL = rtlLanguages.includes(currentLang);
        
        if (isRTL === shouldBeRTL) {
            this.log(`RTL support working: ${isRTL ? 'RTL' : 'LTR'}`, 'pass');
        } else {
            this.log(`RTL support issue: Expected ${shouldBeRTL ? 'RTL' : 'LTR'}, got ${isRTL ? 'RTL' : 'LTR'}`, 'fail');
        }
        
        return true;
    }

    // Theme Toggle Tests
    testThemeToggle() {
        this.log('Testing Theme Toggle...', 'info');
        
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) {
            this.log('Theme toggle button not found', 'fail');
            return false;
        }
        
        this.log('Theme toggle button found', 'pass');
        
        // Check current theme
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        this.log(`Current theme: ${currentTheme}`, 'info');
        
        // Check if theme variables are defined
        const themeVars = ['--bg-primary', '--text-dark', '--accent-color'];
        const computedStyle = getComputedStyle(document.documentElement);
        
        let allVarsDefined = true;
        themeVars.forEach(varName => {
            const value = computedStyle.getPropertyValue(varName);
            if (!value) {
                this.log(`Theme variable ${varName} not defined`, 'fail');
                allVarsDefined = false;
            }
        });
        
        if (allVarsDefined) {
            this.log('All theme variables defined', 'pass');
        }
        
        return true;
    }

    // Documentation Page Tests
    testDocumentationPage() {
        this.log('Testing Documentation Page...', 'info');
        
        // Check if we're on documentation page
        const isDocPage = window.location.pathname.includes('documentation') || 
                         document.querySelector('.documentation');
        
        if (!isDocPage) {
            this.log('Not on documentation page - skipping documentation tests', 'warning');
            return true;
        }
        
        // Check documentation styling
        const docCards = document.querySelectorAll('.doc-card');
        if (docCards.length === 0) {
            this.log('No documentation cards found', 'fail');
            return false;
        }
        
        this.log(`Found ${docCards.length} documentation cards`, 'pass');
        
        // Check code blocks visibility in dark theme
        const codeBlocks = document.querySelectorAll('pre code');
        if (codeBlocks.length > 0) {
            const firstCodeBlock = codeBlocks[0];
            const computedStyle = getComputedStyle(firstCodeBlock);
            const bgColor = computedStyle.backgroundColor;
            
            // Check if code blocks have proper contrast
            if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
                this.log('Code blocks have proper background color', 'pass');
            } else {
                this.log('Code blocks may have visibility issues', 'warning');
            }
        }
        
        return true;
    }

    // Performance Tests
    testPerformance() {
        this.log('Testing Performance...', 'info');
        
        const loadTime = performance.now() - this.startTime;
        this.log(`Page load time: ${loadTime.toFixed(2)}ms`, 'info');
        
        // Check memory usage if available
        if (performance.memory) {
            const memory = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
            this.log(`Memory usage: ${memory} MB`, 'info');
        }
        
        // Check number of DOM elements
        const totalElements = document.getElementsByTagName('*').length;
        this.log(`Total DOM elements: ${totalElements}`, 'info');
        
        if (totalElements < 1000) {
            this.log('DOM size is reasonable', 'pass');
        } else {
            this.log('DOM size is large - consider optimization', 'warning');
        }
        
        return true;
    }

    // Accessibility Tests
    testAccessibility() {
        this.log('Testing Accessibility...', 'info');
        
        // Check for alt attributes on images
        const images = document.querySelectorAll('img');
        let imagesWithAlt = 0;
        images.forEach(img => {
            if (img.alt && img.alt.trim() !== '') {
                imagesWithAlt++;
            }
        });
        
        if (imagesWithAlt === images.length) {
            this.log('All images have alt attributes', 'pass');
        } else {
            this.log(`${imagesWithAlt}/${images.length} images have alt attributes`, 'warning');
        }
        
        // Check for proper heading structure
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length > 0) {
            this.log(`Found ${headings.length} headings`, 'info');
        }
        
        // Check for aria labels on interactive elements
        const interactiveElements = document.querySelectorAll('button, a[href]');
        let elementsWithAria = 0;
        interactiveElements.forEach(el => {
            if (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby')) {
                elementsWithAria++;
            }
        });
        
        this.log(`${elementsWithAria}/${interactiveElements.length} interactive elements have ARIA labels`, 'info');
        
        return true;
    }

    // Translation Tests - Comprehensive locale verification
    testTranslations() {
        this.log('Testing Translations...', 'info');

        const currentLang = document.documentElement.lang || 'en';
        this.log(`Testing translations for language: ${currentLang}`, 'info');

        // Define all translatable elements with their data-i18n keys
        const translatableElements = [
            // Hero section
            { selector: '[data-i18n="hero_title"]', key: 'hero_title' },
            { selector: '[data-i18n="hero_subtitle"]', key: 'hero_subtitle' },
            { selector: '[data-i18n="download_btn"]', key: 'download_btn' },
            { selector: '[data-i18n="github_btn"]', key: 'github_btn' },
            { selector: '[data-i18n="stats_distributions"]', key: 'stats_distributions' },
            { selector: '[data-i18n="stats_automated"]', key: 'stats_automated' },
            { selector: '[data-i18n="stats_production"]', key: 'stats_production' },
            { selector: '[data-i18n="stats_enterprise"]', key: 'stats_enterprise' },
            { selector: '[data-i18n="stat_label_tested"]', key: 'stat_label_tested' },
            { selector: '[data-i18n="stat_label_config"]', key: 'stat_label_config' },
            { selector: '[data-i18n="stat_label_protocols"]', key: 'stat_label_protocols' },
            { selector: '[data-i18n="stat_label_docker"]', key: 'stat_label_docker' },

            // Features section
            { selector: '[data-i18n="features_title"]', key: 'features_title' },
            { selector: '[data-i18n="features_subtitle"]', key: 'features_subtitle' },
            { selector: '[data-i18n="feature_zero_touch"]', key: 'feature_zero_touch' },
            { selector: '[data-i18n="feature_docker"]', key: 'feature_docker' },
            { selector: '[data-i18n="feature_security"]', key: 'feature_security' },
            { selector: '[data-i18n="feature_tested"]', key: 'feature_tested' },
            { selector: '[data-i18n="feature_ssh"]', key: 'feature_ssh' },
            { selector: '[data-i18n="feature_complete"]', key: 'feature_complete' },
            { selector: '[data-i18n="feature_zero_touch_desc"]', key: 'feature_zero_touch_desc' },
            { selector: '[data-i18n="feature_docker_desc"]', key: 'feature_docker_desc' },
            { selector: '[data-i18n="feature_security_desc"]', key: 'feature_security_desc' },
            { selector: '[data-i18n="feature_tested_desc"]', key: 'feature_tested_desc' },
            { selector: '[data-i18n="feature_ssh_desc"]', key: 'feature_ssh_desc' },
            { selector: '[data-i18n="feature_complete_desc"]', key: 'feature_complete_desc' },

            // Enterprise section
            { selector: '[data-i18n="enterprise_title"]', key: 'enterprise_title' },
            { selector: '[data-i18n="enterprise_subtitle"]', key: 'enterprise_subtitle' },
            { selector: '[data-i18n="enterprise_security"]', key: 'enterprise_security' },
            { selector: '[data-i18n="enterprise_monitoring"]', key: 'enterprise_monitoring' },
            { selector: '[data-i18n="enterprise_config"]', key: 'enterprise_config' },
            { selector: '[data-i18n="enterprise_performance"]', key: 'enterprise_performance' },

            // Tech stack section
            { selector: '[data-i18n="tech_stack_title"]', key: 'tech_stack_title' },
            { selector: '[data-i18n="tech_stack_subtitle"]', key: 'tech_stack_subtitle' },

            // Architecture section
            { selector: '[data-i18n="architecture_title"]', key: 'architecture_title' },
            { selector: '[data-i18n="architecture_subtitle"]', key: 'architecture_subtitle' },

            // How it works section
            { selector: '[data-i18n="how_it_works_title"]', key: 'how_it_works_title' },
            { selector: '[data-i18n="how_it_works_subtitle"]', key: 'how_it_works_subtitle' },
            { selector: '[data-i18n="step_configure"]', key: 'step_configure' },
            { selector: '[data-i18n="step_deploy"]', key: 'step_deploy' },
            { selector: '[data-i18n="step_use"]', key: 'step_use' },

            // Testing section
            { selector: '[data-i18n="testing_title"]', key: 'testing_title' },
            { selector: '[data-i18n="testing_subtitle"]', key: 'testing_subtitle' },

            // Compatibility section
            { selector: '[data-i18n="compatibility_title"]', key: 'compatibility_title' },
            { selector: '[data-i18n="compatibility_subtitle"]', key: 'compatibility_subtitle' },

            // Use cases section
            { selector: '[data-i18n="use_cases_title"]', key: 'use_cases_title' },

            // Documentation section
            { selector: '[data-i18n="documentation_title"]', key: 'documentation_title' },

            // CTA section
            { selector: '[data-i18n="cta_title"]', key: 'cta_title' },
            { selector: '[data-i18n="cta_subtitle"]', key: 'cta_subtitle' },
            { selector: '[data-i18n="cta_note"]', key: 'cta_note' }
        ];

        let allTranslated = true;
        let englishWordsFound = [];

        translatableElements.forEach(({ selector, key }) => {
            const elements = document.querySelectorAll(selector);
            if (elements.length === 0) {
                this.log(`No elements found for selector: ${selector}`, 'warning');
                return;
            }

            elements.forEach((element, index) => {
                const text = element.textContent || element.innerText || '';
                const hasTranslation = text.trim() !== '';

                if (!hasTranslation) {
                    this.log(`Element ${selector}${index > 0 ? ` (${index})` : ''} has no translation`, 'fail');
                    allTranslated = false;
                } else {
                    // Check for English words in non-English locales
                    if (currentLang !== 'en') {
                        const englishWords = this.detectEnglishWords(text);
                        if (englishWords.length > 0) {
                            englishWordsFound.push(...englishWords);
                            this.log(`English words found in ${currentLang}: "${englishWords.join(', ')}" in element ${selector}`, 'fail');
                            allTranslated = false;
                        }
                    }
                }
            });
        });

        // Check for any visible English text in the entire document for non-English locales
        if (currentLang !== 'en') {
            const allTextNodes = this.getAllTextNodes(document.body);
            allTextNodes.forEach(node => {
                const text = node.textContent.trim();
                if (text.length > 2) { // Ignore very short text
                    const englishWords = this.detectEnglishWords(text);
                    if (englishWords.length > 0) {
                        englishWordsFound.push(...englishWords);
                    }
                }
            });

            if (englishWordsFound.length > 0) {
                const uniqueEnglishWords = [...new Set(englishWordsFound)];
                this.log(`Found ${uniqueEnglishWords.length} unique English words in ${currentLang} locale: ${uniqueEnglishWords.slice(0, 10).join(', ')}${uniqueEnglishWords.length > 10 ? '...' : ''}`, 'fail');
                allTranslated = false;
            }
        }

        if (allTranslated) {
            this.log(`All translations verified for ${currentLang}`, 'pass');
        } else {
            this.log(`Translation issues found for ${currentLang}`, 'fail');
        }

        return allTranslated;
    }

    // Detect English words in text (simple heuristic)
    detectEnglishWords(text) {
        // Common English words that should not appear in other locales
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

        const foundWords = [];
        const words = text.toLowerCase().split(/\s+/);

        words.forEach(word => {
            // Remove punctuation and check if it's an English word
            const cleanWord = word.replace(/[^\w]/g, '');
            if (englishWords.includes(cleanWord) && cleanWord.length > 2) {
                foundWords.push(cleanWord);
            }
        });

        return [...new Set(foundWords)]; // Remove duplicates
    }

    // Get all text nodes in an element
    getAllTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.trim()) {
                textNodes.push(node);
            }
        }

        return textNodes;
    }

    // Test all supported languages
    async testAllLanguages() {
        this.log('Testing all supported languages...', 'info');

        const supportedLanguages = [
            'en', 'ru', 'be', 'zh', 'hi', 'fa', 'ar', 'ko', 'ja', 'sr',
            'fr', 'de', 'es', 'pt', 'no', 'da', 'sv', 'is', 'bg', 'ro',
            'hu', 'it', 'el', 'he', 'ka', 'kk', 'uz', 'tg', 'tr'
        ];

        const results = {};

        for (const lang of supportedLanguages) {
            this.log(`Testing language: ${lang}`, 'info');

            // Change language
            if (window.languageSelectorInstance) {
                window.languageSelectorInstance.changeLanguage(lang);

                // Wait for translations to load
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            // Test translations for this language
            const translationResult = this.testTranslations();
            results[lang] = translationResult;

            if (!translationResult) {
                this.log(`Translation test FAILED for ${lang}`, 'fail');
            } else {
                this.log(`Translation test PASSED for ${lang}`, 'pass');
            }
        }

        // Summary
        const passed = Object.values(results).filter(r => r).length;
        const failed = Object.values(results).filter(r => !r).length;

        this.log(`\n=== LANGUAGE TEST SUMMARY ===`, 'info');
        this.log(`Languages tested: ${supportedLanguages.length}`, 'info');
        this.log(`Passed: ${passed}`, 'pass');
        this.log(`Failed: ${failed}`, failed > 0 ? 'fail' : 'pass');

        if (failed > 0) {
            const failedLangs = Object.keys(results).filter(lang => !results[lang]);
            this.log(`Failed languages: ${failedLangs.join(', ')}`, 'fail');
        }

        return failed === 0;
    }

    // Comprehensive page element verification
    testPageElements() {
        this.log('Testing page elements...', 'info');

        const requiredElements = [
            // Header
            '.header',
            '.header-actions',
            '.language-selector',

            // Hero section
            '.hero',
            '.hero-content',
            '.hero-title',
            '.hero-subtitle',
            '.hero-cta',
            '.hero-stats',

            // Features section
            '.features',
            '.features-grid',
            '.feature-card',

            // Enterprise section
            '.enterprise-features',
            '.enterprise-grid',
            '.enterprise-card',

            // Tech stack section
            '.tech-stack',
            '.stack-grid',

            // Architecture section
            '.architecture',
            '.architecture-diagram',

            // How it works section
            '.how-it-works',
            '.steps',

            // Testing section
            '.testing',
            '.testing-grid',

            // Compatibility section
            '.compatibility',
            '.os-grid',

            // Use cases section
            '.use-cases',
            '.use-case-grid',

            // Documentation section
            '.documentation',
            '.docs-grid',

            // CTA section
            '.cta',
            '.cta-content'
        ];

        let allElementsPresent = true;

        requiredElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            if (elements.length === 0) {
                this.log(`Required element not found: ${selector}`, 'fail');
                allElementsPresent = false;
            } else {
                this.log(`Element present: ${selector} (${elements.length} found)`, 'pass');
            }
        });

        // Check for broken images
        const images = document.querySelectorAll('img');
        let brokenImages = 0;
        images.forEach(img => {
            if (img.complete && img.naturalHeight === 0) {
                this.log(`Broken image: ${img.src}`, 'fail');
                brokenImages++;
            }
        });

        if (brokenImages === 0) {
            this.log('No broken images found', 'pass');
        }

        // Check for broken links (basic check)
        const links = document.querySelectorAll('a[href]');
        let invalidLinks = 0;
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href.startsWith('javascript:') || href === '#')) {
                // These are acceptable
            } else if (!href || href.trim() === '') {
                this.log(`Link with empty href: ${link.textContent}`, 'warning');
            }
        });

        return allElementsPresent && brokenImages === 0;
    }

    // Run comprehensive localization tests for all languages
    async runLocalizationTests() {
        this.log('Starting Comprehensive Localization Tests...', 'info');
        this.log('This will test ALL supported languages for complete translation coverage', 'info');
        this.log('⚠️  This test may take several minutes to complete', 'warning');

        const result = await this.testAllLanguages();

        if (result) {
            this.log('🎉 ALL LOCALIZATION TESTS PASSED! 100% translation coverage achieved.', 'pass');
        } else {
            this.log('❌ LOCALIZATION TESTS FAILED! Some translations are missing or incorrect.', 'fail');
        }

        return result;
    }

    // Run all tests
    runAllTests() {
        this.log('Starting Mail Server Factory Website Tests...', 'info');

        const tests = [
            this.testLanguageSelector.bind(this),
            this.testThemeToggle.bind(this),
            this.testDocumentationPage.bind(this),
            this.testPerformance.bind(this),
            this.testAccessibility.bind(this),
            this.testPageElements.bind(this),
            this.testVisualElements.bind(this),
            this.testTranslations.bind(this)
        ];

        tests.forEach(test => {
            try {
                test();
            } catch (error) {
                this.log(`Test failed with error: ${error.message}`, 'fail');
            }
        });

        // Summary
        const passed = this.results.filter(r => r.status === 'pass').length;
        const failed = this.results.filter(r => r.status === 'fail').length;
        const warnings = this.results.filter(r => r.status === 'warning').length;

        this.log(`\n=== TEST SUMMARY ===`, 'info');
        this.log(`Passed: ${passed}`, 'pass');
        this.log(`Failed: ${failed}`, failed > 0 ? 'fail' : 'pass');
        this.log(`Warnings: ${warnings}`, warnings > 0 ? 'warning' : 'pass');
        this.log(`Total: ${this.results.length} tests run`, 'info');

        return failed === 0;
    }

    // Test specific language switching
    async testLanguageSwitching() {
        this.log('Testing language switching functionality...', 'info');

        const testLanguages = ['en', 'ru', 'zh', 'fr', 'de', 'es'];
        let allSwitchesSuccessful = true;

        for (const lang of testLanguages) {
            this.log(`Testing switch to: ${lang}`, 'info');

            if (window.languageSelectorInstance) {
                try {
                    window.languageSelectorInstance.changeLanguage(lang);

                    // Wait for language change
                    await new Promise(resolve => setTimeout(resolve, 300));

                    // Verify language was set
                    const currentLang = document.documentElement.lang;
                    if (currentLang === lang) {
                        this.log(`Successfully switched to ${lang}`, 'pass');
                    } else {
                        this.log(`Failed to switch to ${lang}, got ${currentLang}`, 'fail');
                        allSwitchesSuccessful = false;
                    }

                    // Check RTL for RTL languages
                    const rtlLanguages = ['ar', 'fa', 'he'];
                    const expectedDir = rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
                    const actualDir = document.documentElement.dir || 'ltr';

                    if (actualDir === expectedDir) {
                        this.log(`RTL/LTR correct for ${lang}: ${actualDir}`, 'pass');
                    } else {
                        this.log(`RTL/LTR incorrect for ${lang}: expected ${expectedDir}, got ${actualDir}`, 'fail');
                        allSwitchesSuccessful = false;
                    }

                } catch (error) {
                    this.log(`Error switching to ${lang}: ${error.message}`, 'fail');
                    allSwitchesSuccessful = false;
                }
            } else {
                this.log('Language selector instance not found', 'fail');
                allSwitchesSuccessful = false;
                break;
            }
        }

        return allSwitchesSuccessful;
    }

    // Comprehensive visual regression test (basic)
    testVisualElements() {
        this.log('Testing visual elements...', 'info');

        const visualTests = [
            // Check for proper CSS classes
            { selector: '.hero-title', test: 'has highlight span', check: (el) => el.querySelector('.highlight') },
            { selector: '.btn-primary', test: 'has proper button styling', check: (el) => el.classList.contains('btn') },
            { selector: '.feature-card', test: 'has feature icons', check: (el) => el.querySelector('.feature-icon') },
            { selector: '.enterprise-card', test: 'has enterprise icons', check: (el) => el.querySelector('.enterprise-icon') },

            // Check for proper grid layouts
            { selector: '.features-grid', test: 'has multiple feature cards', check: (el) => el.children.length >= 6 },
            { selector: '.enterprise-grid', test: 'has multiple enterprise cards', check: (el) => el.children.length >= 4 },

            // Check for proper stats display
            { selector: '.hero-stats', test: 'has stat values', check: (el) => el.querySelectorAll('.stat-value').length >= 4 },

            // Check for proper code blocks
            { selector: 'pre code', test: 'has syntax highlighting ready', check: (el) => el.textContent.trim() !== '' }
        ];

        let allVisualTestsPass = true;

        visualTests.forEach(({ selector, test, check }) => {
            const elements = document.querySelectorAll(selector);
            if (elements.length === 0) {
                this.log(`No elements found for visual test: ${selector}`, 'warning');
                return;
            }

            elements.forEach((element, index) => {
                const result = check(element);
                if (result) {
                    this.log(`Visual test passed: ${test} (${selector}${index > 0 ? ` ${index}` : ''})`, 'pass');
                } else {
                    this.log(`Visual test failed: ${test} (${selector}${index > 0 ? ` ${index}` : ''})`, 'fail');
                    allVisualTestsPass = false;
                }
            });
        });

        return allVisualTestsPass;
    }

    // Export results
    exportResults() {
        return {
            summary: {
                total: this.results.length,
                passed: this.results.filter(r => r.status === 'pass').length,
                failed: this.results.filter(r => r.status === 'fail').length,
                warnings: this.results.filter(r => r.status === 'warning').length
            },
            details: this.results,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
    }
}

// Create global instance for easy access
window.websiteTester = new WebsiteTester();

// Add convenience methods to global tester
window.websiteTester.testLocalization = window.websiteTester.runLocalizationTests.bind(window.websiteTester);
window.websiteTester.testLanguageSwitching = window.websiteTester.testLanguageSwitching.bind(window.websiteTester);

// Auto-run tests if in development mode
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            console.log('%c🚀 Running Mail Server Factory Website Tests...', 'font-size: 16px; font-weight: bold; color: #4a90e2;');
            console.log('%c💡 Available test commands:', 'font-size: 14px; color: #666;');
            console.log('%c  - window.websiteTester.runAllTests()', 'color: #4a90e2;');
            console.log('%c  - window.websiteTester.testLocalization()', 'color: #4a90e2;');
            console.log('%c  - window.websiteTester.testLanguageSwitching()', 'color: #4a90e2;');
            console.log('%c  - window.websiteTester.testTranslations()', 'color: #4a90e2;');
            console.log('%c  - window.websiteTester.testVisualElements()', 'color: #4a90e2;');
            window.websiteTester.runAllTests();
        }, 1000);
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebsiteTester;
}