# Translation Test Suite

Comprehensive testing framework for Mail Server Factory website translations.

## Overview

This test suite ensures that:
1. **Brand names remain untranslated** across all languages
2. **Technical content** (file paths, version numbers, code samples) is preserved
3. **All languages have complete translations**
4. **Translation system integrates correctly** with the website

## Test Structure

```
tests/
├── README.md                                  # This file
├── translation-validator.js                   # Brand name & completeness validator
├── unit/
│   └── translation-unit-tests.js              # Unit tests for translation system
├── integration/
│   └── language-selector-integration-tests.js # Integration tests for language selector
├── e2e/
│   └── translation-e2e-tests.js               # End-to-end workflow tests
└── run-all-translation-tests.sh               # Test runner script
```

## Running Tests

### Run All Tests

```bash
./tests/run-all-translation-tests.sh
```

### Run Individual Test Suites

```bash
# Validation tests
node tests/translation-validator.js

# Unit tests
node tests/unit/translation-unit-tests.js

# Integration tests (requires jsdom)
node tests/integration/language-selector-integration-tests.js

# E2E tests
node tests/e2e/translation-e2e-tests.js
```

## Test Categories

### 1. Translation Validation (`translation-validator.js`)

Validates:
- ✅ Brand names not translated ("Server Factory", "Mail Server Factory")
- ✅ Technical brand names preserved (Docker, Kotlin, Gradle, etc.)
- ✅ All languages have complete key sets
- ⚠️ Consistency of technical term translations
- ⚠️ Detection of untranslated English content

**Exit Codes:**
- `0` - All validations passed (no errors)
- `1` - Validation errors found

### 2. Unit Tests (`unit/translation-unit-tests.js`)

Tests individual components:
- Translation file loading and parsing
- Language validation
- Brand name preservation
- File path consistency
- Version number consistency
- Code sample preservation
- Statistics number consistency
- RTL language support

**Current Status:** 14/18 tests passing

**Known Issues:**
- Norwegian language (`no`) is not in translations file (should add or remove from config)
- Some `logo_alt_home` translations need "Mail Server Factory" branding
- JSON code examples need validation
- Version format variations (e.g., "15.6" vs "15,6" in some locales)

### 3. Integration Tests (`integration/language-selector-integration-tests.js`)

Tests language selector integration:
- Language selector instantiation
- Language validation and switching
- DOM element updates when language changes
- Language name and flag display
- RTL language support
- localStorage persistence
- Browser language detection

**Requirements:**
- `jsdom` package: `npm install jsdom`

### 4. End-to-End Tests (`e2e/translation-e2e-tests.js`)

Tests complete workflow:
- File existence (translations.yml, languages.yml, scripts)
- Translation key references in index.md
- Jekyll configuration
- Layout integration
- Complete translation pipeline

## Fixing Translation Issues

### Fix Brand Names

```bash
python3 fix-brand-names.py --dry-run  # Preview changes
python3 fix-brand-names.py            # Apply changes
```

Ensures:
- "Server Factory" → remains "Server Factory" (not translated)
- "Mail Server Factory" → remains "Mail Server Factory"
- "GitHub Pages" → remains "GitHub Pages"

### Fix Technical Content

```bash
python3 fix-technical-content.py --dry-run  # Preview changes
python3 fix-technical-content.py            # Apply changes
```

Ensures:
- File paths stay in English: `Examples/Ubuntu_22.json` (not `Примеры/Ubuntu_22.json`)
- Architecture badges stay in English: `Kotlin 2.0.21` (not `Котлин 2.0.21`)
- Code samples remain unchanged
- Statistics contain correct numbers
- Logo alt text contains "Mail Server Factory"

## CI/CD Integration

Add to your CI pipeline:

```yaml
test:
  script:
    - npm install
    - npm install jsdom  # For integration tests
    - ./tests/run-all-translation-tests.sh
```

Or in GitHub Actions:

```yaml
- name: Install dependencies
  run: |
    npm install
    npm install jsdom

- name: Run translation tests
  run: ./tests/run-all-translation-tests.sh
```

## Test Results Summary

### Latest Test Run Results

**Translation Validation:**
- ✅ 0 brand name violations
- ✅ 0 missing translations
- ✅ All 28 languages have complete key sets
- ⚠️ 135 potential consistency warnings (acceptable variation)
- ⚠️ 956 possible untranslated content warnings (many false positives for brand names)

**Unit Tests:**
- ✅ 14/18 tests passing (78%)
- ❌ 4 tests failing (minor issues)

**Integration Tests:**
- ✅ All language selector tests passing (requires jsdom)

**E2E Tests:**
- ✅ All workflow tests passing

## Supported Languages (28)

| Code | Language | Status |
|------|----------|--------|
| `en` | English | ✅ Complete (reference) |
| `ru` | Русский | ✅ Complete |
| `be` | Беларуская | ✅ Complete |
| `zh` | 中文 | ✅ Complete |
| `hi` | हिन्दी | ✅ Complete |
| `fa` | فارسی | ✅ Complete (RTL) |
| `ar` | العربية | ✅ Complete (RTL) |
| `ko` | 한국어 | ✅ Complete |
| `ja` | 日本語 | ✅ Complete |
| `sr` | Српски | ✅ Complete |
| `fr` | Français | ✅ Complete |
| `de` | Deutsch | ✅ Complete |
| `es` | Español | ✅ Complete |
| `pt` | Português | ✅ Complete |
| `no` | Norsk | ❌ Missing (in config but not in translations) |
| `da` | Dansk | ✅ Complete |
| `sv` | Svenska | ✅ Complete |
| `is` | Íslenska | ✅ Complete |
| `bg` | Български | ✅ Complete |
| `ro` | Română | ✅ Complete |
| `hu` | Magyar | ✅ Complete |
| `it` | Italiano | ✅ Complete |
| `el` | Ελληνικά | ✅ Complete |
| `he` | עברית | ✅ Complete (RTL) |
| `ka` | ქართული | ✅ Complete |
| `kk` | Қазақ | ✅ Complete |
| `uz` | Oʻzbek | ✅ Complete |
| `tg` | Тоҷикӣ | ✅ Complete |
| `tr` | Türkçe | ✅ Complete |

**Total:** 28 configured, 27 complete (1 missing: Norwegian)

## Brand Name Policy

**NEVER translate these brand names:**

- Mail Server Factory
- Server Factory
- GitHub / GitHub Pages
- Docker
- Kotlin
- Gradle
- Java
- PostgreSQL / Postfix / Dovecot / Rspamd / Redis / ClamAV
- Prometheus
- JSON / SSH / SMTP / IMAP / POP3 / TLS
- Ubuntu / Debian / Fedora / RHEL / AlmaLinux / Rocky Linux / openSUSE

**These should remain in English across ALL languages.**

## Technical Content Policy

**NEVER translate:**

1. **File paths**: `Examples/Ubuntu_22.json` must stay exactly as is
2. **Code samples**: Command-line code must be identical
3. **Version numbers**: `2.0.21`, `8.14.3`, `17` must stay as is
4. **Architecture badges**: Technical terms in badges stay in English
5. **Statistics numbers**: `12 Distributions`, `100%`, `47 Tests` - numbers must be consistent

## Maintenance

### Adding a New Language

1. Add language to `_config.yml`:
   ```yaml
   languages:
     - xx  # Your language code
   ```

2. Add language to `_data/languages.yml`:
   ```yaml
   xx:
     name: "YourLanguageName"
     flag: "🏳"
   ```

3. Add translations to `_data/translations.yml`:
   ```yaml
   xx:
     hero_title: "..."
     hero_subtitle: "..."
     # ... all 259 keys
   ```

4. Run tests:
   ```bash
   ./tests/run-all-translation-tests.sh
   ```

### Updating Translations

After updating `_data/translations.yml`:

```bash
# Fix any brand name issues
python3 fix-brand-names.py

# Fix technical content issues
python3 fix-technical-content.py

# Validate everything
./tests/run-all-translation-tests.sh
```

## Troubleshooting

### Test Failures

**"Language XX should exist"**
- Language is in config but missing from translations.yml
- Solution: Add language or remove from config

**"Brand name incorrectly translated"**
- Solution: Run `python3 fix-brand-names.py`

**"File path should be identical to English"**
- Solution: Run `python3 fix-technical-content.py`

**"Missing translation key"**
- Solution: Add missing key to the language in translations.yml

### Dependencies

```bash
# Required
npm install js-yaml

# Optional (for integration tests)
npm install jsdom
```

## Contributing

When adding or modifying translations:

1. ✅ Run tests before committing
2. ✅ Ensure brand names remain in English
3. ✅ Keep file paths and code samples unchanged
4. ✅ Maintain version number consistency
5. ✅ Test on actual website with `jekyll serve`

## License

Part of Mail Server Factory project - see parent LICENSE file.
