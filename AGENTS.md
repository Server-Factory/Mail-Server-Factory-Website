# Mail Server Factory Website - Agent Guidelines

## Build & Development Commands

### Local Development
```bash
# Start development server with live reload
./start-website.sh

# Alternative: Direct Jekyll serve
bundle exec jekyll serve --host 0.0.0.0 --port 4000 --livereload --drafts --future

# Stop development server
./stop-website.sh
```

### Docker Development
```bash
# Build and start with Docker Compose
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Testing
```bash
# Run website functionality tests (browser console)
# Open http://localhost:4000 and run:
window.websiteTester.runAllTests()

# Run specific test
window.websiteTester.testLanguageSelector()
```

## Code Style Guidelines

### Jekyll/Liquid
- Use Jekyll 4.2.0+ syntax
- Front matter YAML must be properly formatted
- Use `data-i18n` attributes for all translatable content
- Liquid filters: `{{ site.data.translations[site.default_lang].key }}`

### SCSS/CSS
- Follow BEM methodology for class names
- Use CSS custom properties (variables) for theming
- Mobile-first responsive design with `@media` queries
- CSS Grid and Flexbox for layouts
- Maintain CSS organization with commented sections

### JavaScript
- ES6+ modules with class-based architecture
- Use `data-*` attributes for DOM element identification
- Event delegation for dynamic content
- Async/await for asynchronous operations
- Console logging with timestamps and status indicators

### File Organization
- `_layouts/`: Jekyll layout templates
- `_data/`: YAML data files (languages.yml, translations.yml)
- `assets/css/`: SCSS stylesheets
- `assets/js/`: JavaScript modules
- `assets/images/`: Static images and icons

### Internationalization
- All user-facing text must use `data-i18n` attributes
- Language codes: ISO 639-1 (en, ru, zh, etc.)
- RTL support for Arabic, Persian, Hebrew
- Fallback to English for missing translations

### Accessibility
- All images require `alt` attributes
- Use semantic HTML5 elements appropriately
- ARIA labels on interactive elements
- Proper heading hierarchy (h1 → h6)
- Keyboard navigation support

### Performance
- Optimize images (WebP format when possible)
- Minimize DOM elements (< 1000 total)
- Use CSS transitions instead of JavaScript animations
- Lazy load non-critical resources
- Enable Gzip compression via Jekyll config