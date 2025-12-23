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
// Custom Cursor
// ===========================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

document.addEventListener('mousemove', e => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
});

let posX = 0, posY = 0;
function animateFollower() {
    posX += (event.clientX - posX) * 0.1;
    posY += (event.clientY - posY) * 0.1;
    follower.style.top = posY + 'px';
    follower.style.left = posX + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

// ===========================
// Mobile Menu Toggle
// ===========================
const mobileBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('mainNav');
const overlay = document.getElementById('mobileOverlay');

mobileBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

overlay.addEventListener('click', () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
});

document.querySelectorAll('#mainNav a').forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

// ===========================
// Dropdown Menu Toggle
// ===========================
document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault(); // prevent redirect
        const dropdown = link.nextElementSibling;
        dropdown.classList.toggle('open');
        link.classList.toggle('active');
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
// Typing Effect (Hero Subtext)
// ===========================
function typeEffect(element, speed = 100) {
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
    const increment = target / 200; // smoother animation
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
        stats.forEach(stat => {
            countUp(stat, parseInt(stat.dataset.count));
        });
        statsStarted = true;
    }
});

// ===========================
// Optional: Floating Particles
// ===========================
const particlesContainer = document.getElementById('particlesContainer');
for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${2 + Math.random() * 3}s`;
    particle.style.width = particle.style.height = `${5 + Math.random() * 10}px`;
    particlesContainer.appendChild(particle);
}
