# Mail Server Factory Website Testing Suite

This comprehensive testing suite ensures 100% localization coverage and proper functionality of the Mail Server Factory website across all supported languages.

## 🚀 Quick Start

### Browser-Based Testing (Development)
Run tests directly in your browser console:

```javascript
// Run all basic tests
window.websiteTester.runAllTests()

// Run comprehensive localization tests (tests all 29 languages)
window.websiteTester.testLocalization()

// Test language switching functionality
window.websiteTester.testLanguageSwitching()

// Test current language translations
window.websiteTester.testTranslations()

// Test visual elements
window.websiteTester.testVisualElements()
```

### Automated Testing (CI/CD)
Run comprehensive tests programmatically:

```bash
# Install dependencies
npm install

# Run all tests against local development server
npm run test:local

# Run tests against any URL
node comprehensive-test-runner.js https://your-website.com

# Run browser-based tests (opens test page)
npm run test:browser
```

## 📋 Test Coverage

### ✅ Functionality Tests
- Language selector presence and functionality
- Theme toggle functionality
- Page element structure validation
- Performance metrics
- Accessibility compliance
- Visual element verification

### 🌍 Localization Tests
- **29 Supported Languages**: en, ru, be, zh, hi, fa, ar, ko, ja, sr, fr, de, es, pt, no, da, sv, is, bg, ro, hu, it, el, he, ka, kk, uz, tg, tr
- Translation completeness verification
- English word detection in non-English locales
- RTL language support (Arabic, Persian, Hebrew)
- Language switching functionality

### 🔍 Quality Assurance
- **100% Translation Coverage**: No English words visible in any non-English locale
- **Zero Broken Elements**: All required page elements present
- **Proper RTL Support**: Correct text direction for RTL languages
- **Visual Consistency**: All styling and layout elements working

## 🛠️ Test Structure

### Browser Tests (`test-website.js`)
- `runAllTests()`: Runs all basic functionality tests
- `testLocalization()`: Comprehensive localization testing for all languages
- `testLanguageSwitching()`: Tests language switching mechanics
- `testTranslations()`: Validates translations for current language
- `testVisualElements()`: Checks visual layout and styling

### Automated Tests (`comprehensive-test-runner.js`)
- Headless browser testing with Puppeteer
- Comprehensive cross-language validation
- Detailed reporting and JSON output
- CI/CD integration ready

## 📊 Test Results

### Success Criteria
- ✅ **All tests pass** with 0 failures
- ✅ **100% translation coverage** - no English words in non-English locales
- ✅ **All page elements present** and functional
- ✅ **Proper RTL support** for Arabic, Persian, and Hebrew
- ✅ **Language switching works** for all supported languages

### Sample Output
```
🚀 Starting Comprehensive Mail Server Factory Website Tests...
📍 Testing URL: http://localhost:4000
🌍 Languages to test: 29

🔧 Running Basic Functionality Tests...
✅ [14:30:15] Page loaded successfully
✅ [14:30:15] Language selector found
✅ [14:30:15] Hero section found

🌍 Running Comprehensive Localization Tests...

🔄 Testing language: EN
✅ [14:30:16] [EN] Language set correctly
✅ [14:30:16] [EN] hero_title translated correctly
✅ [14:30:16] [EN] features_title translated correctly
...

🏆 FINAL RESULT: ALL TESTS PASSED! 🎉
```

## 🔧 Configuration

### Supported Languages
The test suite validates all languages defined in `_data/languages.yml`:

```yaml
en: English
ru: Русский
be: Беларуская
zh: 中文
# ... and 25 more languages
```

### Translation Files
Tests validate translations in `_data/translations.yml` with keys like:
- `hero_title`: Main slogan with HTML span
- `features_title`: Section headers
- `enterprise_title`: Enterprise features
- `cta_title`: Call-to-action text

## 🚨 Troubleshooting

### Common Issues

**Tests failing due to missing translations:**
- Check `_data/translations.yml` for missing language sections
- Ensure all `data-i18n` keys have corresponding translations

**Language switching not working:**
- Verify `language-selector.js` is loaded
- Check browser console for JavaScript errors

**RTL languages not displaying correctly:**
- Ensure `dir="rtl"` is set on `html` element for RTL languages
- Check CSS for RTL-specific styling

### Debug Mode
Enable verbose logging:
```javascript
// In browser console
window.websiteTester.log = function(msg, status) {
    console.log(`[${status.toUpperCase()}] ${msg}`);
};
```

## 📈 CI/CD Integration

Add to your CI pipeline:

```yaml
# GitHub Actions example
- name: Run Website Tests
  run: |
    npm install
    npm run test:local

- name: Upload Test Results
  uses: actions/upload-artifact@v3
  with:
    name: test-results
    path: test-report.json
```

## 🎯 Quality Gates

### Must Pass Criteria
1. **Zero test failures** in any environment
2. **100% translation coverage** for all supported languages
3. **All page elements render correctly** in all languages
4. **No English text visible** in non-English locales
5. **Proper RTL support** for Arabic, Persian, and Hebrew

### Performance Benchmarks
- Page load time: < 3 seconds
- Language switch time: < 1 second
- Memory usage: < 50MB
- DOM elements: < 1000

## 📞 Support

For test failures or questions:
- Check browser console for detailed error messages
- Review `test-report.json` for comprehensive results
- Ensure all translations are present in `_data/translations.yml`
- Verify website is running on `http://localhost:4000` for local testing

---

**Note**: These tests are designed to be run by AI QA systems and ensure complete localization coverage across all supported languages with zero English text leakage.</content>
</xai:function_call">### Uzbek (uz)
<xai:function_call name="edit">
<parameter name="filePath">_data/translations.yml