// Language selector functionality for Mail Server Factory website
class LanguageSelector {
    constructor() {
        this.currentLang = this.getCurrentLanguage();
        this.init();
    }

    init() {
        this.createLanguageSelector();
        this.bindEvents();
        // Apply translations after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.updateContent();
        }, 100);
    }

    getCurrentLanguage() {
        // Check URL parameter first (highest priority)
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && this.isValidLanguage(langParam)) {
            return langParam;
        }

        // Check localStorage (second priority)
        const storedLang = localStorage.getItem('mail-factory-lang');
        if (storedLang && this.isValidLanguage(storedLang)) {
            return storedLang;
        }

        // Check browser language with comprehensive locale detection
        const browserLanguages = navigator.languages || [navigator.language || navigator.userLanguage];
        
        // Try all browser languages in order of preference
        for (const lang of browserLanguages) {
            // Try exact match first
            if (this.isValidLanguage(lang)) {
                return lang;
            }
            
            // Try short language code
            const shortLang = lang.split('-')[0];
            if (this.isValidLanguage(shortLang)) {
                return shortLang;
            }
        }

        // Check for system locale via Intl API
        if (typeof Intl !== 'undefined') {
            try {
                const locale = Intl.DateTimeFormat().resolvedOptions().locale;
                const shortLocale = locale.split('-')[0];
                if (this.isValidLanguage(shortLocale)) {
                    return shortLocale;
                }
            } catch (e) {
                console.warn('Could not detect system locale via Intl:', e);
            }
        }

        // Fallback to default language from Jekyll config
        const jekyllLang = document.documentElement.lang || 'en';
        const shortJekyllLang = jekyllLang.split('-')[0];
        if (this.isValidLanguage(shortJekyllLang)) {
            return shortJekyllLang;
        }

        // Final fallback to English
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

        // Remove any existing language selectors to avoid duplicates
        const existingSelectors = headerActions.querySelectorAll('.language-selector');
        existingSelectors.forEach(selector => selector.remove());

        const languageSelector = document.createElement('div');
        languageSelector.className = 'language-selector';
        languageSelector.innerHTML = `
            <button class="language-toggle" data-i18n-aria="select_language" aria-expanded="false">
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

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update page direction for RTL languages
        const rtlLanguages = ['ar', 'fa', 'he'];
        document.documentElement.dir = rtlLanguages.includes(lang) ? 'rtl' : 'ltr';

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

    async updateContent() {
        console.log(`Language changed to: ${this.currentLang}`);

        // Load and apply translations
        await this.loadTranslations();

        // Force re-apply translations to ensure header buttons are updated
        this.applyTranslations(window.siteTranslations[this.currentLang] || {});
    }

    async loadTranslations() {
        try {
            // Use the translations from the YAML data via Jekyll
            // Since Jekyll processes YAML files, we can access them through site.data
            const translations = this.getTranslationsFromJekyll();
            
            if (translations[this.currentLang]) {
                this.applyTranslations(translations[this.currentLang]);
            }
        } catch (error) {
            console.warn('Error loading translations:', error);
            // Fallback to hardcoded translations
            const fallbackTranslations = this.getTranslations();
            if (fallbackTranslations[this.currentLang]) {
                this.applyTranslations(fallbackTranslations[this.currentLang]);
            }
        }
    }

    getTranslationsFromJekyll() {
        // Try to get from window.siteTranslations first (works with both Jekyll and static server)
        if (typeof window.siteTranslations !== 'undefined') {
            return window.siteTranslations;
        }
        // Try to get translations from Jekyll site data
        if (typeof site !== 'undefined' && site.data && site.data.translations) {
            return site.data.translations;
        }
        return this.getTranslations();
    }

    getTranslations() {
        // Return translations based on the current language
        // This is a simplified approach - in a real Jekyll site, you'd use Jekyll's i18n features
        return {
            en: {
                hero_title: "Run Your Mail Server <span class=\"highlight\">Like The Boss</span>",
                hero_subtitle: "Enterprise-grade mail server automation powered by Kotlin, Docker, and proven technology. Deploy complete mail infrastructure with a single JSON configuration file.",
                download_btn: "⬇ Download Latest Release",
                github_btn: "⭐ View on GitHub",
                stats_distributions: "12 Distributions",
                stats_automated: "100% Automated",
                stats_production: "Production Ready",
                stats_enterprise: "Enterprise Grade",
                features_title: "Why Mail Server Factory?",
                features_subtitle: "Enterprise features without the enterprise complexity",
                // Add more translations as needed
            },
            ru: {
                hero_title: "Запустите свой почтовый сервер <span class=\"highlight\">Как Босс</span>",
                hero_subtitle: "Автоматизация почтовых серверов корпоративного уровня на базе Kotlin, Docker и проверенных технологий. Разверните полную почтовую инфраструктуру с помощью одного JSON-файла конфигурации.",
                download_btn: "⬇ Скачать последнюю версию",
                github_btn: "⭐ Посмотреть на GitHub",
                stats_distributions: "12 Дистрибутивов",
                stats_automated: "100% Автоматизация",
                stats_production: "Готов к продакшену",
                stats_enterprise: "Корпоративный уровень",
                features_title: "Почему Mail Server Factory?",
                features_subtitle: "Корпоративные возможности без корпоративной сложности",
                // Add more translations as needed
            },
            zh: {
                hero_title: "像老板一样运行您的邮件服务器 <span class=\"highlight\">Like The Boss</span>",
                hero_subtitle: "基于Kotlin、Docker和成熟技术的企业级邮件服务器自动化。通过单个JSON配置文件部署完整的邮件基础设施。",
                download_btn: "⬇ 下载最新版本",
                github_btn: "⭐ 在GitHub上查看",
                stats_distributions: "12个发行版",
                stats_automated: "100%自动化",
                stats_production: "生产就绪",
                stats_enterprise: "企业级",
                features_title: "为什么选择Mail Server Factory？",
                features_subtitle: "企业级功能，无企业级复杂性",
                // Add more translations as needed
            },
            fr: {
                hero_title: "Gérez votre serveur de messagerie <span class=\"highlight\">Comme un Patron</span>",
                hero_subtitle: "Automatisation de serveur de messagerie de niveau entreprise alimentée par Kotlin, Docker et des technologies éprouvées. Déployez une infrastructure de messagerie complète avec un seul fichier de configuration JSON.",
                download_btn: "⬇ Télécharger la dernière version",
                github_btn: "⭐ Voir sur GitHub",
                stats_distributions: "12 Distributions",
                stats_automated: "100% Automatisé",
                stats_production: "Prêt pour la production",
                stats_enterprise: "Niveau Entreprise",
                features_title: "Pourquoi Mail Server Factory ?",
                features_subtitle: "Fonctionnalités d'entreprise sans la complexité d'entreprise",
                // Add more translations as needed
            },
            de: {
                hero_title: "Verwalten Sie Ihren Mail-Server <span class=\"highlight\">Wie ein Chef</span>",
                hero_subtitle: "Automatisierung von Mail-Servern auf Enterprise-Niveau, angetrieben von Kotlin, Docker und bewährter Technologie. Implementieren Sie eine vollständige Mail-Infrastruktur mit einer einzigen JSON-Konfigurationsdatei.",
                download_btn: "⬇ Neueste Version herunterladen",
                github_btn: "⭐ Auf GitHub ansehen",
                stats_distributions: "12 Distributionen",
                stats_automated: "100% Automatisiert",
                stats_production: "Produktionsbereit",
                stats_enterprise: "Enterprise-Niveau",
                features_title: "Warum Mail Server Factory?",
                features_subtitle: "Enterprise-Funktionen ohne Enterprise-Komplexität",
                // Add more translations as needed
            },
            es: {
                hero_title: "Gestiona tu servidor de correo <span class=\"highlight\">Como un Jefe</span>",
                hero_subtitle: "Automatización de servidores de correo de nivel empresarial impulsada por Kotlin, Docker y tecnología probada. Despliega infraestructura de correo completa con un solo archivo de configuración JSON.",
                download_btn: "⬇ Descargar última versión",
                github_btn: "⭐ Ver en GitHub",
                stats_distributions: "12 Distribuciones",
                stats_automated: "100% Automatizado",
                stats_production: "Listo para producción",
                stats_enterprise: "Nivel Empresarial",
                features_title: "¿Por qué Mail Server Factory?",
                features_subtitle: "Características empresariales sin la complejidad empresarial",
                // Add more translations as needed
            },
            ja: {
                hero_title: "メールサーバーを<span class=\"highlight\">ボスのように</span>運用",
                hero_subtitle: "Kotlin、Docker、実証済み技術で動くエンタープライズグレードのメールサーバーオートメーション。単一のJSON設定ファイルで完全なメールインフラをデプロイ。",
                download_btn: "⬇ 最新版をダウンロード",
                github_btn: "⭐ GitHubで見る",
                stats_distributions: "12ディストリビューション",
                stats_automated: "100%自動化",
                stats_production: "本番環境対応",
                stats_enterprise: "エンタープライズグレード",
                features_title: "なぜMail Server Factory？",
                features_subtitle: "エンタープライズ機能、エンタープライズ複雑さなし",
                // Add more translations as needed
            },
            ko: {
                hero_title: "메일 서버를 <span class=\"highlight\">보스처럼</span> 운영하세요",
                hero_subtitle: "Kotlin, Docker, 검증된 기술로 구동되는 엔터프라이즈급 메일 서버 자동화. 단일 JSON 구성 파일로 완전한 메일 인프라를 배포하세요.",
                download_btn: "⬇ 최신 릴리즈 다운로드",
                github_btn: "⭐ GitHub에서 보기",
                stats_distributions: "12개 배포판",
                stats_automated: "100% 자동화",
                stats_production: "프로덕션 준비 완료",
                stats_enterprise: "엔터프라이즈급",
                features_title: "왜 Mail Server Factory인가?",
                features_subtitle: "엔터프라이즈 복잡성 없는 엔터프라이즈 기능",
                // Add more translations as needed
            },
            sr: {
                hero_title: "Покрените свој поштански сервер <span class=\"highlight\">Као Шеф</span>",
                hero_subtitle: "Аутоматизација поштанских сервера на нивоу предузећа заснована на Kotlin-у, Docker-у и провереним технологијама. Деплојујте комплетну поштанску инфраструктуру са једним JSON конфигурационим фајлом.",
                download_btn: "⬇ Преузми најновију верзију",
                github_btn: "⭐ Погледај на GitHub-у",
                stats_distributions: "12 дистрибуција",
                stats_automated: "100% аутоматизовано",
                stats_production: "Спремно за продукцију",
                stats_enterprise: "Ниво предузећа",
                features_title: "Зашто Mail Server Factory?",
                features_subtitle: "Функције предузећа без сложености предузећа",
                // Add more translations as needed
            }
        };
    }

    applyTranslations(translations) {
        // Apply translations to elements with data-i18n attributes
        Object.keys(translations).forEach(key => {
            const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
            elements.forEach(element => {
                // Preserve HTML content for elements that need it (like hero_title with span)
                if (translations[key] && translations[key].includes('<') && translations[key].includes('>')) {
                    element.innerHTML = translations[key];
                } else if (translations[key]) {
                    element.textContent = translations[key];
                }
            });

            // Handle aria-label attributes
            const ariaElements = document.querySelectorAll(`[data-i18n-aria="${key}"]`);
            ariaElements.forEach(element => {
                if (translations[key]) {
                    element.setAttribute('aria-label', translations[key]);
                }
            });
        });

        // Update CTA buttons with specific handling
        if (translations.cta_download) {
            const downloadBtns = document.querySelectorAll('a[href*="releases"]');
            downloadBtns.forEach(btn => {
                if (btn.classList.contains('btn-large')) {
                    btn.textContent = translations.cta_download;
                }
            });
        }
        
        if (translations.cta_github) {
            const githubBtns = document.querySelectorAll('a[href*="github.com"]');
            githubBtns.forEach(btn => {
                if (btn.classList.contains('btn-large')) {
                    btn.textContent = translations.cta_github;
                }
            });
        }

        // Handle code blocks and pre elements specially
        const codeElements = document.querySelectorAll('pre[data-i18n], code[data-i18n]');
        codeElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }
}

// Initialize when DOM is loaded - ensure only one instance
document.addEventListener('DOMContentLoaded', () => {
    if (!window.languageSelectorInstance) {
        window.languageSelectorInstance = new LanguageSelector();
    }
});