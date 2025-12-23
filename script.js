// ==============================
// Arkadia Construction - Main JS
// ==============================

// Wait until DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    handlePageLoader();
});

// ==============================
// Page Loader
// ==============================
function handlePageLoader() {
    const pageLoader = document.getElementById('pageLoader');
    if (!pageLoader) {
        initializeWebsite();
        return;
    }

    const loaderProgress = document.getElementById('loaderProgress');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                pageLoader.style.opacity = '0';
                pageLoader.style.visibility = 'hidden';
                setTimeout(initializeWebsite, 300);
            }, 500);
        }
        if (loaderProgress) loaderProgress.style.width = `${progress}%`;
    }, 150);
}

// ==============================
// Initialize All Website Components
// ==============================
function initializeWebsite() {
    initNavigation();
    initTypewriter();
    initServicesDropdown();
    initContactForm();
    initScrollAnimations();
    initCustomCursor();
    createParticles();
    initStatsCounter();
    initBackToTop();
    initHomePageAnimations();
    highlightCurrentPage();
    window.dispatchEvent(new Event('scroll'));
}

// ==============================
// Highlight Current Navigation Link
// ==============================
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else link.classList.remove('active');
    });
}

// ==============================
// Navigation
// ==============================
function initNavigation() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mainNav');
    const overlay = document.getElementById('mobileOverlay');
    const dropdown = document.getElementById('servicesDropdown');
    const dropdownToggle = document.querySelector('.has-dropdown .nav-link');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', e => {
            e.stopPropagation();
            nav.classList.toggle('active');
            overlay?.classList.toggle('active');
            mobileBtn.innerHTML = nav.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });
    }

    overlay?.addEventListener('click', () => {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        mobileBtn && (mobileBtn.innerHTML = '<i class="fas fa-bars"></i>');
        dropdown?.classList.remove('active');
    });

    dropdownToggle?.addEventListener('click', e => {
        if (window.innerWidth <= 768 && dropdown) {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('active');
        }
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.has-dropdown') && window.innerWidth > 768) {
            dropdown?.classList.remove('active');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                overlay?.classList.remove('active');
                mobileBtn && (mobileBtn.innerHTML = '<i class="fas fa-bars"></i>');
                dropdown?.classList.remove('active');
            }
        });
    });
}

// ==============================
// Typewriter Effect
// ==============================
function initTypewriter() {
    const textEl = document.getElementById('typewriterText');
    const cursorEl = document.getElementById('typewriterCursor');
    if (!textEl || !cursorEl) return;

    const lines = [
        "Building Your Dream Home",
        "Your Trusted Construction Company in South Sudan",
        "Quality. Strength. Reliability.",
        "Transforming Visions Into Reality",
        "Excellence in Every Project"
    ];

    let line = 0, char = 0, deleting = false;

    function type() {
        const currentText = lines[line];
        if (!deleting) {
            textEl.textContent = currentText.substring(0, char);
            char++;
            if (char > currentText.length) {
                deleting = true;
                setTimeout(type, 1500);
                return;
            }
        } else {
            textEl.textContent = currentText.substring(0, char);
            char--;
            if (char < 0) {
                deleting = false;
                line = (line + 1) % lines.length;
                setTimeout(type, 500);
                return;
            }
        }
        setTimeout(type, deleting ? 40 : 80 + Math.random() * 40);
    }

    setTimeout(type, 1000);
}

// ==============================
// Services Dropdown
// ==============================
function initServicesDropdown() {
    const headers = document.querySelectorAll('.service-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            headers.forEach(h => {
                if (h !== header) {
                    h.classList.remove('active');
                    h.nextElementSibling.classList.remove('active');
                    h.nextElementSibling.style.maxHeight = null;
                }
            });

            header.classList.toggle('active');
            if (!isActive) {
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.classList.remove('active');
                content.style.maxHeight = null;
            }
        });
    });
}

// ==============================
// Contact Form
// ==============================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const data = {
            name: form.querySelector('#name').value.trim(),
            email: form.querySelector('#email').value.trim(),
            phone: form.querySelector('#phone').value.trim(),
            message: form.querySelector('#message').value.trim()
        };

        if (!data.name || !data.email || !data.phone || !data.message) {
            alert('Please fill in all fields before submitting.');
            return;
        }

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.backgroundColor = '#4CAF50';
        console.log('Form submitted:', data);

        setTimeout(() => {
            form.reset();
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
        }, 3000);
    });
}

// ==============================
// Scroll Animations
// ==============================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// ==============================
// Custom Cursor
// ==============================
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');

    if (!cursor || !follower) return;

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .service-header, .project-card, .btn, .contact-item, .feature-card, .stat-item')
            .forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.classList.add('hover');
                    follower.style.width = '60px';
                    follower.style.height = '60px';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('hover');
                    follower.style.width = '40px';
                    follower.style.height = '40px';
                });
            });
    } else {
        cursor.style.display = 'none';
        follower.style.display = 'none';
    }
}

// ==============================
// Floating Particles
// ==============================
function createParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;

    const count = window.innerWidth > 768 ? 40 : 15;
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 80 + 20;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.opacity = Math.random() * 0.1 + 0.05;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 10;
        p.style.animation = `float ${duration}s ${delay}s infinite linear`;
        container.appendChild(p);
    }

    if (!document.getElementById('particlesAnimation')) {
        const style = document.createElement('style');
        style.id = 'particlesAnimation';
        style.textContent = `
        @keyframes float {
            0% { transform: translate(0,0) rotate(0deg); }
            25% { transform: translate(${Math.random()*100-50}px, ${Math.random()*100-50}px) rotate(90deg); }
            50% { transform: translate(${Math.random()*100-50}px, ${Math.random()*100-50}px) rotate(180deg); }
            75% { transform: translate(${Math.random()*100-50}px, ${Math.random()*100-50}px) rotate(270deg); }
            100% { transform: translate(0,0) rotate(360deg); }
        }`;
        document.head.appendChild(style);
    }
}

// ==============================
// Stats Counter
// ==============================
function initStatsCounter() {
    const numbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    numbers.forEach(n => observer.observe(n));

    function countUp(el) {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        let start = 0;
        const step = () => {
            const progress = Math.min((Date.now() - start) / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = value;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        };
        start = Date.now();
        requestAnimationFrame(step);
    }
}

// ==============================
// Back to Top Button
// ==============================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('active', window.pageYOffset > 300);
    });

    btn.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==============================
// Home Page Animations
// ==============================
function initHomePageAnimations() {
    const stats = document.querySelectorAll('.about-stat-number');
    if (stats.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stats.forEach(stat => animateStat(stat));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const section = document.querySelector('.about-home-section');
        if (section) observer.observe(section);
    }

    const cards = document.querySelectorAll('.service-preview-card, .project-preview-card');
    window.addEventListener('scroll', () => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                card.style.transform = `translateY(${-rect.top * 0.1}px)`;
            }
        });
    });

    function animateStat(stat) {
        const value = parseInt(stat.textContent.replace('+',''));
        let counter = 0;
        const step = value / 50;
        const timer = setInterval(() => {
            counter += step;
            if (counter >= value) {
                stat.textContent = value + '+';
                clearInterval(timer);
            } else stat.textContent = Math.floor(counter) + '+';
        }, 50);
    }
}

// ==============================
// Window Resize
// ==============================
window.addEventListener('resize', () => {
    initCustomCursor();
    if (window.innerWidth > 768) {
        document.getElementById('mainNav')?.classList.remove('active');
        document.getElementById('mobileOverlay')?.classList.remove('active');
        document.getElementById('mobileMenuBtn') && (document.getElementById('mobileMenuBtn').innerHTML = '<i class="fas fa-bars"></i>');
        document.getElementById('servicesDropdown')?.classList.remove('active');
    }
});
