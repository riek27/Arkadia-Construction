document.addEventListener('DOMContentLoaded', () => {

    // ===================== HERO TYPING =====================
    const typewriterText = document.getElementById('typewriterText');
    const typewriterCursor = document.getElementById('typewriterCursor');

    if (typewriterText) {
        const text = "Delivering Premium Construction Across South Sudan";
        let i = 0;

        const typeEffect = () => {
            if (i < text.length) {
                typewriterText.textContent += text.charAt(i);
                i++;
                setTimeout(typeEffect, 60);
            } else {
                blinkCursor();
            }
        };

        const blinkCursor = () => {
            typewriterCursor.classList.toggle('active');
            setTimeout(blinkCursor, 500);
        };

        typeEffect();
    }

    // ===================== MOBILE MENU =====================
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mainNav');
    const overlay = document.getElementById('mobileOverlay');

    const toggleMenu = () => {
        mobileNav.classList.toggle('mobile-active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    mobileBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // ===================== MOBILE DROPDOWN =====================
    const dropdownParents = document.querySelectorAll('#mainNav .has-dropdown');

    dropdownParents.forEach(parent => {
        const link = parent.querySelector('a');
        const dropdown = parent.querySelector('.dropdown');
        const arrow = parent.querySelector('.dropdown-arrow');

        link.addEventListener('click', e => {
            // prevent redirect on mobile
            if (window.innerWidth <= 991) {
                e.preventDefault();
                parent.classList.toggle('open');
                if (dropdown.style.maxHeight) {
                    dropdown.style.maxHeight = null;
                    if (arrow) arrow.style.transform = 'rotate(0deg)';
                } else {
                    dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
                    if (arrow) arrow.style.transform = 'rotate(180deg)';
                }
            }
        });
    });

    // ===================== BACK TO TOP =====================
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 300);
    });

    backToTop.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===================== FADE IN ON SCROLL =====================
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

});


// ===================== PAGE LOADER =====================
const pageLoader = document.getElementById('pageLoader');
const loaderProgress = document.getElementById('loaderProgress');

if (pageLoader) {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1; // Increment progress
        if (loaderProgress) loaderProgress.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            pageLoader.style.opacity = '0';
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 500); // fade out smoothly
        }
    }, 10); // speed of loader bar
}
