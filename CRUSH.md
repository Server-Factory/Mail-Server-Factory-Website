# Mail Server Factory Website - Development Guide

## Build & Development Commands

### Local Development
```bash
# Primary method: Start Jekyll website with Docker Compose
./start-website.sh

# Manual Docker method
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop website
./stop-website.sh

# Direct Jekyll (if running locally without Docker)
bundle exec jekyll serve --host 0.0.0.0 --port 4000 --livereload --drafts --future

# Build static site
bundle exec jekyll build
```

### Testing
```bash
# Run all translation tests (comprehensive)
./tests/run-all-translation-tests.sh

# Individual test suites
node tests/translation-validator.js                    # Brand names & completeness
node tests/unit/translation-unit-tests.js               # Unit tests
node tests/integration/language-selector-integration-tests.js  # Integration (requires jsdom)
node tests/e2e/translation-e2e-tests.js                # End-to-end workflow

# Browser testing (run after starting website)
# Open http://localhost:4000 and run in console:
window.websiteTester.runAllTests()
window.websiteTester.testLanguageSelector()
```

### Dependencies
```bash
# Required for tests
npm install js-yaml

# Optional for integration tests
npm install jsdom
```

## Project Architecture

### Technology Stack
- **Static Site Generator**: Jekyll 4.2.0+ with Ruby
- **Theme**: jekyll-theme-cayman
- **Frontend**: Vanilla JavaScript (ES6+), SCSS, HTML5
- **Containerization**: Docker + Docker Compose for development
- **Deployment**: GitHub Pages (gh-pages branch)

### Key Jekyll Features Used
- Multi-language support via `_data/` files
- Live reload in development
- SEO optimization with jekyll-seo-tag
- Sitemap generation with jekyll-sitemap
- Feed generation with jekyll-feed

## File Organization & Structure

### Core Jekyll Files
- `_config.yml` - Site configuration, language list (28 languages), plugins
- `_layouts/` - HTML templates using Liquid templating (`default.html`, `home.html`)
- `_data/` - YAML data files for translations and language metadata
- `index.md` - Homepage content with front matter
- `Gemfile` - Ruby dependencies for Jekyll

### Frontend Assets
- `assets/css/style.scss` - Main stylesheet with CSS custom properties, mobile-first design
- `assets/js/` - JavaScript modules:
  - `language-selector.js` - Language switching with comprehensive detection
  - `theme-toggle.js` - Dark/light mode theming
  - `translations.js` - Translation system integration
- `assets/images/` - Static images (Logo, Favicon)

### Development Infrastructure
- `docker-compose.yml` - Development environment setup
- `Dockerfile` - Multi-stage build for Jekyll 4.2.2
- `start-website.sh` - Smart development server with port detection
- `stop-website.sh` - Clean shutdown script

### Testing Suite
- `tests/` - Comprehensive translation testing framework
- `tests/run-all-translation-tests.sh` - Master test runner
- `tests/translation-validator.js` - Brand name & completeness validation
- `tests/unit/`, `tests/integration/`, `tests/e2e/` - Structured test categories

## Code Style & Conventions

### SCSS/CSS Architecture
- **CSS Custom Properties**: Used for theming (light/dark mode)
- **BEM-like Naming**: Component-based class names (e.g., `language-selector`, `theme-toggle-btn`)
- **Mobile-First Design**: Progressive enhancement with `@media` queries
- **CSS Grid & Flexbox**: Modern layout systems
- **Organization**: Commented sections grouping related styles
- **Reset**: CSS normalize at top of style.scss

### JavaScript Patterns
- **ES6+ Modules**: Class-based architecture with `export`/`import`
- **Data Attributes**: Use `data-*` for DOM element identification (`data-i18n`, `data-lang`)
- **Event Delegation**: Efficient dynamic content handling
- **Async/Await**: Modern asynchronous patterns with proper error handling
- **Graceful Degradation**: Accessibility-first approach
- **Single Responsibility**: Each class handles one feature (LanguageSelector, ThemeToggle)

### Liquid/Jekyll Templates
- **Minimal Logic**: Keep logic in templates to a minimum
- **Front Matter**: Properly formatted YAML in Markdown files
- **Data Access**: Use `site.data.translations[lang].key` pattern
- **Internationalization**: All text via `data-i18n` attributes
- **Semantic HTML5**: Proper use of `header`, `main`, `footer`, `nav`, etc.

### Naming Conventions
- **Files**: kebab-case (`language-selector.js`, `style.scss`)
- **CSS Classes**: kebab-case (`feature-card`, `header-actions`)
- **JavaScript Variables**: camelCase (`currentLang`, `languageSelector`)
- **DOM IDs**: kebab-case (`theme-toggle`, `content`)
- **Translation Keys**: snake_case (`hero_title`, `nav_documentation`)

## Internationalization (i18n) System

### Supported Languages (28 total)
- **Primary**: English (en) - reference language
- **European**: Russian, Belarusian, French, German, Spanish, Portuguese, Norwegian, Danish, Swedish, Icelandic, Bulgarian, Romanian, Hungarian, Italian, Greek
- **Asian**: Chinese, Hindi, Korean, Japanese
- **Middle Eastern**: Persian (Farsi), Arabic, Hebrew
- **Other**: Serbian, Turkish, Georgian, Kazakh, Uzbek, Tajik

### Translation Architecture
- **Language Codes**: ISO 639-1 standard (2-letter)
- **RTL Support**: Arabic (ar), Persian (fa), Hebrew (he) with automatic `dir="rtl"`
- **Detection Priority**: URL parameter → localStorage → browser language → system locale → English
- **Fallback System**: Graceful fallback to English for missing content

### Translation Files
- `_data/languages.yml` - Language metadata (names, flags)
- `_data/translations.yml` - All translations with 259+ keys per language
- `assets/js/translations.js` - Client-side translation engine

### Translation Policy (CRITICAL)
**NEVER translate these brand names (must stay English across ALL languages):**
- Mail Server Factory, Server Factory
- GitHub, GitHub Pages
- Docker, Kubernetes
- Kotlin, Java, Gradle
- PostgreSQL, Postfix, Dovecot, Rspamd, Redis, ClamAV
- Prometheus, JSON, SSH, SMTP, IMAP, POP3, TLS
- Ubuntu, Debian, Fedora, RHEL, AlmaLinux, Rocky Linux, openSUSE

**NEVER translate technical content:**
1. File paths: `Examples/Ubuntu_22.json` (must stay exactly as is)
2. Code samples and commands
3. Version numbers: `2.0.21`, `8.14.3`, `17`
4. Architecture badges and technical terms
5. Statistics numbers: `12 Distributions`, `100%`, `47 Tests`

### Implementation Details
- **Data Attributes**: Use `data-i18n="key"` for translatable content
- **ARIA Labels**: Use `data-i18n-aria="key"` for accessibility
- **HTML Preservation**: Content with HTML tags uses `.innerHTML`, plain text uses `.textContent`
- **Dynamic Updates**: Language switching updates DOM without page reload

## Development Workflow & Gotchas

### Docker Development Best Practices
- **Smart Port Detection**: `start-website.sh` automatically finds available ports 4000-4100
- **Volume Mounts**: Automatic live reload on file changes
- **Cache Optimization**: Multi-stage Dockerfile with dependency caching
- **Development Environment**: Uses Jekyll 4.2.2 with `--drafts --future` flags

### Common Gotchas
1. **Port Conflicts**: The start script handles this automatically by finding free ports
2. **Translation Inconsistencies**: Always run tests after modifying translations.yml
3. **Brand Name Violations**: Use the automated fix scripts to prevent accidental translations
4. **JavaScript Modules**: Files load in specific order - translations.js must load before language-selector.js
5. **RTL Languages**: Language selector automatically sets `dir="rtl"` for ar, fa, he
6. **Caching**: Browser cache can prevent seeing translation changes - use hard refresh

### Adding New Languages
1. Add to `_config.yml` languages array
2. Add metadata to `_data/languages.yml`
3. Add complete translations to `_data/translations.yml` (259+ keys)
4. Run `./tests/run-all-translation-tests.sh`
5. Fix any brand name issues with `python3 fix-brand-names.py`

### Content Updates
After changing `_data/translations.yml`:
```bash
# Validate and fix common issues
python3 fix-brand-names.py
python3 fix-technical-content.py
./tests/run-all-translation-tests.sh
```

### Performance Considerations
- **Image Optimization**: Use WebP format where possible
- **DOM Complexity**: Keep under 1000 total elements
- **CSS Animations**: Prefer CSS transitions over JavaScript
- **Lazy Loading**: Non-critical resources should load lazily
- **Compression**: Jekyll automatically enables gzip compression

### Accessibility Requirements
- **Images**: All require `alt` attributes (use `data-i18n` for translatable alt text)
- **Semantic HTML**: Proper heading hierarchy (h1 → h6)
- **ARIA Labels**: Interactive elements need `data-i18n-aria` attributes
- **Keyboard Navigation**: All functionality must work without mouse
- **Color Contrast**: Ensure WCAG AA compliance for all themes

### Deployment Notes
- **Target**: GitHub Pages (gh-pages branch)
- **Build Process**: GitHub Actions builds Jekyll site automatically
- **SSL**: Automatic HTTPS via GitHub Pages
- **Custom Domain**: Configured via CNAME file
- **Analytics**: Google Analytics integration available in _config.yml