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

    // Run all tests
    runAllTests() {
        this.log('Starting Mail Server Factory Website Tests...', 'info');
        
        const tests = [
            this.testLanguageSelector.bind(this),
            this.testThemeToggle.bind(this),
            this.testDocumentationPage.bind(this),
            this.testPerformance.bind(this),
            this.testAccessibility.bind(this)
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

    // Export results
    exportResults() {
        return {
            summary: {
                total: this.results.length,
                passed: this.results.filter(r => r.status === 'pass').length,
                failed: this.results.filter(r => r.status === 'fail').length,
                warnings: this.results.filter(r => r.status === 'warning').length
            },
            details: this.results
        };
    }
}

// Create global instance for easy access
window.websiteTester = new WebsiteTester();

// Auto-run tests if in development mode
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            console.log('%c🚀 Running Mail Server Factory Website Tests...', 'font-size: 16px; font-weight: bold; color: #4a90e2;');
            window.websiteTester.runAllTests();
        }, 1000);
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebsiteTester;
}