# Mail Server Factory Website

> Professional enterprise mail server automation website with Jekyll, featuring modern design, animations, and multi-language support.

## 🌟 Features

- **Enterprise Design**: Professional glass-morphism UI with warm yellow brand colors
- **Advanced Animations**: Smooth fractal backgrounds, floating logos, and micro-interactions
- **Responsive Layout**: Perfect on desktop, tablet, and mobile devices
- **Multi-language Support**: Internationalized content with easy language switching
- **Modern Stack**: Jekyll, SCSS, JavaScript, Docker-ready
- **Performance Optimized**: Fast loading, efficient animations, and SEO friendly

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Git

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Server-Factory/Mail-Server-Factory-Website.git
   cd Mail-Server-Factory-Website
   ```

2. **Start development server**:
   ```bash
   docker-compose up -d
   ```

3. **View the website**:
   Open http://localhost:4000 in your browser

4. **Stop when done**:
   ```bash
   docker-compose down
   ```

### Alternative: Manual Setup

1. **Install Ruby and Jekyll**:
   ```bash
   gem install jekyll bundler
   ```

2. **Install dependencies**:
   ```bash
   bundle install
   ```

3. **Start local server**:
   ```bash
   bundle exec jekyll serve --livereload
   ```

## 📁 Project Structure

```
Mail-Server-Factory-Website/
├── _layouts/                 # Jekyll layout templates
│   └── default.html          # Main page layout
├── _data/                   # Site data
│   └── translations.yml     # Multi-language translations
├── assets/                  # Static assets
│   ├── css/                # Stylesheets
│   │   └── style.scss     # Main SCSS file
│   ├── js/                 # JavaScript files
│   │   ├── theme-toggle.js
│   │   ├── sticky-header.js
│   │   ├── fractal-background.js
│   │   ├── translations.js
│   │   └── language-selector.js
│   └── images/             # Image assets
├── _config.yml              # Jekyll configuration
├── index.md                 # Homepage content
├── docker-compose.yml        # Docker setup
├── Gemfile                  # Ruby dependencies
└── README.md               # This file
```

## 🎨 Design System

### Colors
- **Primary**: `#f39c12` (Warm Yellow/Golden)
- **Primary Light**: `#f1c40f` 
- **Primary Dark**: `#e67e22`
- **Background**: Dark gradients with fractal overlays

### Typography
- **Font Family**: System fonts stack for optimal performance
- **Weights**: 600 for UI, 700 for headers, 800 for emphasis
- **Responsive Scaling**: Fluid typography from mobile to desktop

### Animations
- **Logo Float**: Multi-stage floating animation with glow
- **Header Shimmer**: Rotating gradient patterns
- **Fractal Backgrounds**: Non-aggressive animated patterns
- **Micro-interactions**: Smooth hover states and transitions

## 🔧 Customization

### Brand Colors
Edit the CSS variables in `assets/css/style.scss`:
```scss
:root {
    --brand-primary: #f39c12;
    --brand-primary-light: #f1c40f;
    --brand-primary-dark: #e67e22;
}
```

### Content Updates
Edit `index.md` for homepage content and `_data/translations.yml` for text translations.

### Styling Changes
All custom styles are in `assets/css/style.scss`. The SCSS is well-organized with clear sections.

## 🌍 Multi-language Support

### Adding a New Language

1. **Add to translations.yml**:
   ```yaml
   fr:
     nav_home: "Accueil"
     hero_title: "Exécutez votre serveur de messagerie comme un patron"
   ```

2. **Update language selector** in `assets/js/language-selector.js`

### Current Languages
- English (en) - Default
- Add more languages as needed

## 🐳 Docker Deployment

### Production Build
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Environment Variables
- `JEKYLL_ENV=production` - Production mode
- `TARGET_HOST` - Custom hostname if needed

## 📱 Mobile Responsiveness

- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px  
  - Desktop: > 1024px
- **Touch Optimized**: Larger tap targets and touch-friendly interactions
- **Performance**: Optimized animations for mobile devices

## ⚡ Performance Features

- **Critical CSS**: Inline critical styles for fast loading
- **Optimized Images**: Compressed and properly sized
- **Efficient Animations**: GPU-accelerated transforms
- **Lazy Loading**: Images loaded on demand
- **Caching**: Proper cache headers and service worker ready

## 🛠️ Development Tools

### Live Reload
Changes to files are automatically reflected in the browser.

### SCSS Compilation
Styles are compiled automatically with source maps for debugging.

### Jekyll Development Mode
Includes drafts and future posts during development.

## 📦 Building for Production

### Static Site Build
```bash
bundle exec jekyll build
```

The static site will be generated in the `_site` directory.

### Deployment
Copy the `_site` contents to your web server or deploy to GitHub Pages, Netlify, Vercel, etc.

## 🔍 SEO and Analytics

### Meta Tags
Automatically generated by Jekyll SEO tag plugin.

### Google Analytics
Configure in `_config.yml`:
```yaml
google_analytics: GA_MEASUREMENT_ID
```

### Sitemap
Automatically generated at `/sitemap.xml`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Test on multiple browsers and devices
- Keep animations subtle and performant
- Ensure mobile responsiveness

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/Server-Factory/Mail-Server-Factory-Website/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Server-Factory/Mail-Server-Factory-Website/discussions)
- **Main Project**: [Mail Server Factory](https://github.com/Server-Factory/Mail-Server-Factory)

## 🎯 Roadmap

- [ ] Enhanced animations and micro-interactions
- [ ] Additional language support
- [ ] Dark/light theme improvements
- [ ] Performance optimizations
- [ ] Accessibility enhancements
- [ ] Advanced component library

---

**Built with ❤️ by Server Factory**