// ================= FULL SCRIPT.JS =================
document.addEventListener('DOMContentLoaded', () => {

    // ================= PAGE LOADER =================
    const pageLoader = document.getElementById('pageLoader');
    const loaderProgress = document.getElementById('loaderProgress');

    if (pageLoader && loaderProgress) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 3) + 1; // smooth random increment
            if (progress > 100) progress = 100;
            loaderProgress.style.width = progress + '%';
            if (progress === 100) {
                clearInterval(interval);
                pageLoader.classList.add('hidden'); // fade out loader
            }
        }, 20);
    }

    // ================= HERO TYPING ANIMATION =================
    const typewriterText = document.getElementById('typewriterText');
    const typewriterCursor = document.getElementById('typewriterCursor');
    const heroTexts = [
        "Building Excellence in South Sudan",
        "Premium Residential and Commercial Projects",
        "Your Vision, Our Expertise",
        "Transforming Spaces, Building Communities"
    ];
    let txtIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let typingSpeed = 100;
    let pauseTime = 1500;

    function typeWriter() {
        if (!typewriterText) return;

        const currentText = heroTexts[txtIndex];
        if (!deleting) {
            typewriterText.textContent = currentText.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentText.length) {
                deleting = true;
                setTimeout(typeWriter, pauseTime);
                return;
            }
        } else {
            typewriterText.textContent = currentText.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                txtIndex = (txtIndex + 1) % heroTexts.length;
            }
        }
        typewriterCursor.textContent = "|";
        setTimeout(typeWriter, deleting ? typingSpeed / 2 : typingSpeed);
    }
    typeWriter();

    // ================= FADE-IN EFFECTS ON SCROLL =================
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // ================= BACK TO TOP BUTTON =================
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ================= MOBILE MENU & DROPDOWN =================
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const mobileOverlay = document.getElementById('mobileOverlay');

    // Toggle mobile menu
    mobileBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // prevent body scroll when menu is open
    });

    // Close mobile menu when clicking overlay
    mobileOverlay.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    // Handle dropdown menus
    const dropdownParents = document.querySelectorAll('.has-dropdown > a');
    dropdownParents.forEach(parent => {
        parent.addEventListener('click', (e) => {
            e.preventDefault(); // prevent redirect
            const dropdown = parent.nextElementSibling;
            dropdown.classList.toggle('show');
        });
    });

    // ================= CUSTOM CURSOR (OPTIONAL) =================
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');

    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', e => {
            cursor.style.top = e.clientY + "px";
            cursor.style.left = e.clientX + "px";

            cursorFollower.style.top = e.clientY + "px";
            cursorFollower.style.left = e.clientX + "px";
        });
    }

});
