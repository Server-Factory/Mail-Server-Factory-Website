# Mail Server Factory Website - Development Guide

## Build & Development Commands

### Local Development
- `./start-website.sh` - Start Jekyll website with Docker Compose (port 4000)
- `./stop-website.sh` - Stop the running website
- `docker-compose up --build` - Build and start containers manually
- `docker-compose logs -f` - View live logs

### Jekyll Commands (if running locally)
- `bundle exec jekyll serve` - Serve locally without Docker
- `bundle exec jekyll build` - Build static site

## Code Style Guidelines

### File Organization
- **Layouts**: `_layouts/` - HTML templates using Liquid templating
- **Styles**: `assets/css/style.scss` - SCSS with CSS custom properties
- **Scripts**: `assets/js/` - Vanilla JavaScript for theme/language switching
- **Translations**: `_data/translations.yml` - Multi-language content
- **Configuration**: `_config.yml` - Jekyll site configuration

### CSS/Styling
- Use CSS custom properties for theming (light/dark mode)
- Follow BEM-like naming for custom components
- Mobile-first responsive design with media queries
- Use semantic HTML5 elements and ARIA labels
- Maintain consistent spacing and typography scales

### JavaScript
- Vanilla JS only (no frameworks)
- Use event delegation for dynamic elements
- Follow ES6+ syntax with proper error handling
- Implement graceful degradation for accessibility

### Liquid Templates
- Keep logic minimal in templates
- Use includes for reusable components
- Follow Jekyll's front matter conventions
- Use `site.data` for translations and configuration

### Naming Conventions
- **Files**: kebab-case (e.g., `language-selector.js`)
- **CSS Classes**: kebab-case (e.g., `feature-card`)
- **Variables**: camelCase in JS, kebab-case in CSS
- **IDs**: kebab-case for DOM elements

### Internationalization
- All user-facing text in `_data/translations.yml`
- Support for 25+ languages with RTL consideration
- Language switcher with flag emojis
- Consistent translation keys across all languages

### Docker & Deployment
- Multi-stage Dockerfile for production builds
- Volume mounts for development hot-reload
- Environment variables for configuration
- Health checks and restart policies