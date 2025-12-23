// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {

    // --------------------
    // HERO TYPING EFFECT
    // --------------------
    const heroText = document.querySelector('.page-hero-content p');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        let i = 0;
        const typeEffect = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeEffect, 50);
            }
        };
        typeEffect();
    }

    // --------------------
    // MOBILE MENU TOGGLE
    // --------------------
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

    // --------------------
    // MOBILE DROPDOWN
    // --------------------
    const dropdownParents = document.querySelectorAll('#mainNav .has-dropdown');

    dropdownParents.forEach(parent => {
        const link = parent.querySelector('a');
        link.addEventListener('click', e => {
            e.preventDefault(); // prevent redirect
            parent.classList.toggle('open');
        });
    });

    // --------------------
    // BACK TO TOP BUTTON
    // --------------------
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) backToTop.classList.add('show');
        else backToTop.classList.remove('show');
    });

    backToTop.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
