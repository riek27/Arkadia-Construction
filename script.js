// =========================
// Page Loader
// =========================
window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    const progress = document.getElementById('loaderProgress');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            loader.style.opacity = 0;
            setTimeout(() => loader.style.display = 'none', 600);
        } else {
            width++;
            progress.style.width = width + '%';
        }
    }, 15);
});

// =========================
// Custom Cursor
// =========================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

let posX = 0, posY = 0, mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateFollower() {
    posX += (mouseX - posX) * 0.1;
    posY += (mouseY - posY) * 0.1;
    follower.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(animateFollower);
}
animateFollower();

// =========================
// Mobile Menu Toggle
// =========================
const mobileBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('mainNav');
const overlay = document.getElementById('mobileOverlay');

mobileBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
});

// =========================
// Dropdown Menu
// =========================
document.querySelectorAll('.has-dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const dropdown = link.nextElementSibling;
        dropdown.classList.toggle('active');
        dropdown.style.maxHeight = dropdown.classList.contains('active') ? dropdown.scrollHeight + 'px' : '0';
    });
});

// =========================
// Back to Top Button
// =========================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =========================
// Hero Typing Effect
// =========================
const typeText = document.querySelector('.page-hero-content p');
const phrases = [
    "Building excellence in South Sudan since 2008 with quality, integrity, and innovation.",
    "Delivering premium residential, commercial, and infrastructure projects."
];
let phraseIndex = 0;
let letterIndex = 0;
let typingSpeed = 50;
let erasingSpeed = 30;
let delayBetweenPhrases = 2000;

function type() {
    if (letterIndex < phrases[phraseIndex].length) {
        typeText.textContent += phrases[phraseIndex][letterIndex];
        letterIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, delayBetweenPhrases);
    }
}

function erase() {
    if (letterIndex > 0) {
        typeText.textContent = phrases[phraseIndex].substring(0, letterIndex - 1);
        letterIndex--;
        setTimeout(erase, erasingSpeed);
    } else {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, typingSpeed);
    }
}
document.addEventListener('DOMContentLoaded', type);

// =========================
// Service Accordion
// =========================
document.querySelectorAll('.service-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const arrow = header.querySelector('.service-arrow');
        if(content.style.maxHeight) {
            content.style.maxHeight = null;
            arrow.style.transform = 'rotate(0deg)';
        } else {
            document.querySelectorAll('.service-content').forEach(c => c.style.maxHeight = null);
            document.querySelectorAll('.service-arrow').forEach(a => a.style.transform = 'rotate(0deg)');
            content.style.maxHeight = content.scrollHeight + "px";
            arrow.style.transform = 'rotate(180deg)';
        }
    });
});

// =========================
// Stats Counter Animation
// =========================
function animateStats() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const current = +counter.innerText;
            const increment = target / 200;
            if(current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

let statsSection = document.querySelector('.about-stats');
let statsStarted = false;
window.addEventListener('scroll', () => {
    if(statsSection && !statsStarted) {
        const rect = statsSection.getBoundingClientRect();
        if(rect.top < window.innerHeight) {
            animateStats();
            statsStarted = true;
        }
    }
});
