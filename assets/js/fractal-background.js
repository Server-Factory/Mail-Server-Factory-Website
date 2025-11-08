// Fractal Background Animation - Enterprise Grade Visual Effect
(function() {
    'use strict';

    class FractalBackground {
        constructor() {
            this.canvas = null;
            this.ctx = null;
            this.particles = [];
            this.particleCount = 80;
            this.mouseX = 0;
            this.mouseY = 0;
            this.init();
        }

        init() {
            this.createCanvas();
            this.createParticles();
            this.bindEvents();
            this.animate();
        }

        createCanvas() {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'fractal-background';
            this.canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                pointer-events: none;
            `;
            document.body.insertBefore(this.canvas, document.body.firstChild);
            this.ctx = this.canvas.getContext('2d');
            this.resize();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        createParticles() {
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }

        bindEvents() {
            window.addEventListener('resize', () => this.resize());
            document.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
            });
        }

        animate() {
            requestAnimationFrame(() => this.animate());
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Draw connections and particles
            for (let i = 0; i < this.particles.length; i++) {
                const particle = this.particles[i];

                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

                // Mouse interaction
                const dx = this.mouseX - particle.x;
                const dy = this.mouseY - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    particle.x -= dx / dist * 0.5;
                    particle.y -= dy / dist * 0.5;
                }

                // Draw connections
                for (let j = i + 1; j < this.particles.length; j++) {
                    const other = this.particles[j];
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const opacity = (1 - distance / 150) * 0.15;
                        this.ctx.strokeStyle = `rgba(230, 195, 0, ${opacity})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(other.x, other.y);
                        this.ctx.stroke();
                    }
                }

                // Draw particle
                this.ctx.fillStyle = `rgba(230, 195, 0, ${particle.opacity})`;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new FractalBackground());
    } else {
        new FractalBackground();
    }
})();
