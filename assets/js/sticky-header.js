// Sticky Header with Glassmorphism Effect
(function() {
    'use strict';

    let lastScrollY = window.pageYOffset;
    const header = document.querySelector('.page-header');
    const navigation = document.querySelector('.header-navigation');
    const scrollThreshold = 50;

    function updateHeader() {
        const currentScrollY = window.pageYOffset;

        if (currentScrollY > scrollThreshold) {
            header.classList.add('scrolled');

            // Hide logo section on scroll, keep navigation visible
            if (navigation) {
                navigation.style.position = 'fixed';
                navigation.style.top = '0';
                navigation.style.left = '0';
                navigation.style.right = '0';
            }
        } else {
            header.classList.remove('scrolled');

            if (navigation) {
                navigation.style.position = 'sticky';
            }
        }

        lastScrollY = currentScrollY;
    }

    // Throttle scroll event for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check
    updateHeader();
})();
