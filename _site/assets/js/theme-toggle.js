// Theme Toggle Functionality with System Preference Detection
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');

    // Function to get system theme preference
    function getSystemThemePreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    // Function to get user's preferred theme
    function getPreferredTheme() {
        // Check for saved user preference first
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        
        // Fall back to system preference
        return getSystemThemePreference();
    }

    // Function to apply theme
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
        
        // Prevent flash of unstyled content by adding a class when theme is applied
        document.documentElement.classList.add('theme-applied');
    }

    // Function to update theme icon and accessibility
    function updateThemeIcon(theme) {
        const isDark = theme === 'dark';
        themeIcon.textContent = isDark ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
        themeToggle.setAttribute('aria-pressed', isDark);
    }

    // Initialize theme
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', function(e) {
            // Only update if user hasn't set a manual preference
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                applyTheme(newTheme);
            }
        });
    }

    // Add smooth transition for theme changes
    document.documentElement.style.setProperty('--transition', 'all 0.3s ease');
});