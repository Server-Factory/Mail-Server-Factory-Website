// Language selector functionality for Mail Server Factory website
class LanguageSelector {
    constructor() {
        this.currentLang = this.getCurrentLanguage();
        this.init();
    }

    init() {
        this.createLanguageSelector();
        this.updateContent();
        this.bindEvents();
    }

    getCurrentLanguage() {
        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && this.isValidLanguage(langParam)) {
            return langParam;
        }

        // Check localStorage
        const storedLang = localStorage.getItem('mail-factory-lang');
        if (storedLang && this.isValidLanguage(storedLang)) {
            return storedLang;
        }

        // Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang.split('-')[0];
        if (this.isValidLanguage(shortLang)) {
            return shortLang;
        }

        // Default to English
        return 'en';
    }

    isValidLanguage(lang) {
        const validLanguages = [
            'en', 'ru', 'be', 'zh', 'hi', 'fa', 'ar', 'ko', 'ja', 'sr',
            'fr', 'de', 'es', 'pt', 'no', 'da', 'sv', 'is', 'bg', 'ro',
            'hu', 'it', 'el', 'he', 'ka', 'kk', 'uz', 'tg', 'tr'
        ];
        return validLanguages.includes(lang);
    }

    createLanguageSelector() {
        const headerActions = document.querySelector('.header-actions');
        if (!headerActions) return;

        const languageSelector = document.createElement('div');
        languageSelector.className = 'language-selector';
        languageSelector.innerHTML = `
            <button class="language-toggle" aria-label="Select language">
                <span class="current-flag">${this.getFlag(this.currentLang)}</span>
                <span class="current-lang">${this.getLanguageName(this.currentLang)}</span>
                <span class="dropdown-arrow">▼</span>
            </button>
            <div class="language-dropdown">
                ${this.generateLanguageOptions()}
            </div>
        `;

        headerActions.insertBefore(languageSelector, headerActions.firstChild);
    }

    generateLanguageOptions() {
        const languages = {
            'en': { name: 'English', flag: '🇺🇸' },
            'ru': { name: 'Русский', flag: '🇷🇺' },
            'be': { name: 'Беларуская', flag: '🇧🇾' },
            'zh': { name: '中文', flag: '🇨🇳' },
            'hi': { name: 'हिन्दी', flag: '🇮🇳' },
            'fa': { name: 'فارسی', flag: '🇮🇷' },
            'ar': { name: 'العربية', flag: '🇸🇦' },
            'ko': { name: '한국어', flag: '🇰🇷' },
            'ja': { name: '日本語', flag: '🇯🇵' },
            'sr': { name: 'Српски', flag: '🇷🇸' },
            'fr': { name: 'Français', flag: '🇫🇷' },
            'de': { name: 'Deutsch', flag: '🇩🇪' },
            'es': { name: 'Español', flag: '🇪🇸' },
            'pt': { name: 'Português', flag: '🇵🇹' },
            'no': { name: 'Norsk', flag: '🇳🇴' },
            'da': { name: 'Dansk', flag: '🇩🇰' },
            'sv': { name: 'Svenska', flag: '🇸🇪' },
            'is': { name: 'Íslenska', flag: '🇮🇸' },
            'bg': { name: 'Български', flag: '🇧🇬' },
            'ro': { name: 'Română', flag: '🇷🇴' },
            'hu': { name: 'Magyar', flag: '🇭🇺' },
            'it': { name: 'Italiano', flag: '🇮🇹' },
            'el': { name: 'Ελληνικά', flag: '🇬🇷' },
            'he': { name: 'עברית', flag: '🇮🇱' },
            'ka': { name: 'ქართული', flag: '🇬🇪' },
            'kk': { name: 'Қазақ', flag: '🇰🇿' },
            'uz': { name: 'Oʻzbek', flag: '🇺🇿' },
            'tg': { name: 'Тоҷикӣ', flag: '🇹🇯' },
            'tr': { name: 'Türkçe', flag: '🇹🇷' }
        };

        return Object.entries(languages)
            .map(([code, { name, flag }]) => `
                <button class="language-option ${code === this.currentLang ? 'active' : ''}" 
                        data-lang="${code}">
                    <span class="flag">${flag}</span>
                    <span class="name">${name}</span>
                </button>
            `).join('');
    }

    getFlag(lang) {
        const flags = {
            'en': '🇺🇸', 'ru': '🇷🇺', 'be': '🇧🇾', 'zh': '🇨🇳', 'hi': '🇮🇳',
            'fa': '🇮🇷', 'ar': '🇸🇦', 'ko': '🇰🇷', 'ja': '🇯🇵', 'sr': '🇷🇸',
            'fr': '🇫🇷', 'de': '🇩🇪', 'es': '🇪🇸', 'pt': '🇵🇹', 'no': '🇳🇴',
            'da': '🇩🇰', 'sv': '🇸🇪', 'is': '🇮🇸', 'bg': '🇧🇬', 'ro': '🇷🇴',
            'hu': '🇭🇺', 'it': '🇮🇹', 'el': '🇬🇷', 'he': '🇮🇱', 'ka': '🇬🇪',
            'kk': '🇰🇿', 'uz': '🇺🇿', 'tg': '🇹🇯', 'tr': '🇹🇷'
        };
        return flags[lang] || '🌐';
    }

    getLanguageName(lang) {
        const names = {
            'en': 'English', 'ru': 'Русский', 'be': 'Беларуская', 'zh': '中文', 'hi': 'हिन्दी',
            'fa': 'فارسی', 'ar': 'العربية', 'ko': '한국어', 'ja': '日本語', 'sr': 'Српски',
            'fr': 'Français', 'de': 'Deutsch', 'es': 'Español', 'pt': 'Português', 'no': 'Norsk',
            'da': 'Dansk', 'sv': 'Svenska', 'is': 'Íslenska', 'bg': 'Български', 'ro': 'Română',
            'hu': 'Magyar', 'it': 'Italiano', 'el': 'Ελληνικά', 'he': 'עברית', 'ka': 'ქართული',
            'kk': 'Қазақ', 'uz': 'Oʻzbek', 'tg': 'Тоҷикӣ', 'tr': 'Türkçe'
        };
        return names[lang] || 'English';
    }

    bindEvents() {
        const toggle = document.querySelector('.language-toggle');
        const dropdown = document.querySelector('.language-dropdown');

        if (toggle && dropdown) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('show');
            });

            document.addEventListener('click', () => {
                dropdown.classList.remove('show');
            });

            dropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            const options = dropdown.querySelectorAll('.language-option');
            options.forEach(option => {
                option.addEventListener('click', () => {
                    const lang = option.dataset.lang;
                    this.changeLanguage(lang);
                    dropdown.classList.remove('show');
                });
            });
        }
    }

    changeLanguage(lang) {
        if (lang === this.currentLang) return;

        this.currentLang = lang;
        localStorage.setItem('mail-factory-lang', lang);

        // Update URL without page reload
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url);

        this.updateContent();
        this.updateSelector();
    }

    updateSelector() {
        const currentFlag = document.querySelector('.current-flag');
        const currentLang = document.querySelector('.current-lang');
        const activeOptions = document.querySelectorAll('.language-option.active');

        if (currentFlag) currentFlag.textContent = this.getFlag(this.currentLang);
        if (currentLang) currentLang.textContent = this.getLanguageName(this.currentLang);

        activeOptions.forEach(option => option.classList.remove('active'));
        const newActive = document.querySelector(`[data-lang="${this.currentLang}"]`);
        if (newActive) newActive.classList.add('active');
    }

    updateContent() {
        // This would typically fetch translations from a server
        // For now, we'll use the translations we have in the data file
        // In a real implementation, you would fetch the appropriate translation file
        console.log(`Language changed to: ${this.currentLang}`);
        
        // Update page direction for RTL languages
        const rtlLanguages = ['ar', 'fa', 'he'];
        document.documentElement.dir = rtlLanguages.includes(this.currentLang) ? 'rtl' : 'ltr';
        
        // Update lang attribute
        document.documentElement.lang = this.currentLang;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSelector();
});