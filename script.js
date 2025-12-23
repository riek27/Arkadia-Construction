// ===========================
// Page Loader
// ===========================
window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    const progress = document.getElementById('loaderProgress');

    let width = 0;
    const interval = setInterval(() => {
        width += 1;
        progress.style.width = width + '%';
        if (width >= 100) {
            clearInterval(interval);
            loader.classList.add('loaded');
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 15);
});

// ===========================
// Mobile Menu Toggle (Sliding Menu)
// ===========================
const mobileBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('mainNav');
const overlay = document.getElementById('mobileOverlay');

// Toggle mobile menu open/close
mobileBtn.addEventListener('click', () => {
    nav.classList.toggle('mobile-active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close menu when overlay clicked
overlay.addEventListener('click', () => {
    nav.classList.remove('mobile-active');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('#mainNav a').forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('mobile-active')) {
            nav.classList.remove('mobile-active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

// ===========================
// Dropdown Menu for Mobile & Desktop
// ===========================
document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault(); // prevent redirect

        const dropdown = link.nextElementSibling;
        const parent = link.parentElement;

        if (parent.classList.contains('open')) {
            parent.classList.remove('open');
        } else {
            // Close any other open dropdowns
            document.querySelectorAll('.has-dropdown').forEach(item => item.classList.remove('open'));
            parent.classList.add('open');
        }
    });
});

// ===========================
// Back To Top
// ===========================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
});
backToTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// Typing Effect for Hero Subtext
// ===========================
function typeEffect(element, speed = 50) {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(interval);
    }, speed);
}

document.querySelectorAll('.page-hero-content p').forEach(p => typeEffect(p, 50));

// ===========================
// Stats Counter Animation
// ===========================
const stats = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.about-stats');

function countUp(el, target) {
    let count = 0;
    const increment = target / 200;
    const interval = setInterval(() => {
        count += increment;
        el.textContent = Math.floor(count);
        if (count >= target) {
            el.textContent = target;
            clearInterval(interval);
        }
    }, 10);
}

let statsStarted = false;
window.addEventListener('scroll', () => {
    if (!statsStarted && statsSection && window.scrollY + window.innerHeight > statsSection.offsetTop) {
        stats.forEach(stat => countUp(stat, parseInt(stat.dataset.count)));
        statsStarted = true;
    }
});

// ===========================
// Floating Particles (Optional Fancy Effect)
// ===========================
const particlesContainer = document.getElementById('particlesContainer');
if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${2 + Math.random() * 3}s`;
        particle.style.width = particle.style.height = `${5 + Math.random() * 10}px`;
        particlesContainer.appendChild(particle);
    }
}
