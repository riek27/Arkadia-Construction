// Enhanced Page Loader
document.addEventListener('DOMContentLoaded', function() {
    const pageLoader = document.getElementById('pageLoader');
    
    if (pageLoader) {
        const loaderProgress = document.getElementById('loaderProgress');
        
        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Hide loader after a short delay
                setTimeout(() => {
                    pageLoader.style.opacity = '0';
                    pageLoader.style.visibility = 'hidden';
                    
                    // Initialize everything after loader is gone
                    setTimeout(initializeWebsite, 300);
                }, 500);
            }
            if (loaderProgress) {
                loaderProgress.style.width = `${progress}%`;
            }
        }, 150);
    } else {
        // If no loader, initialize immediately
        initializeWebsite();
    }
});

// Initialize all website components
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
    
    // Highlight current page in navigation
    highlightCurrentPage();
    
    // Trigger initial scroll animations
    window.dispatchEvent(new Event('scroll'));
}

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Enhanced Navigation System
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const servicesDropdown = document.getElementById('servicesDropdown');
    const hasDropdown = document.querySelector('.has-dropdown');
    const dropdownToggle = hasDropdown ? hasDropdown.querySelector('.nav-link') : null;
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            if (mobileOverlay) mobileOverlay.classList.toggle('active');
            this.innerHTML = mainNav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            mainNav.classList.remove('active');
            this.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            if (servicesDropdown) servicesDropdown.classList.remove('active');
        });
    }
    
    // Handle dropdown toggle on mobile
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && servicesDropdown) {
                e.preventDefault();
                e.stopPropagation();
                servicesDropdown.classList.toggle('active');
            }
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.has-dropdown') && window.innerWidth > 768 && servicesDropdown) {
            servicesDropdown.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                if (mobileOverlay) mobileOverlay.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                if (servicesDropdown) servicesDropdown.classList.remove('active');
            }
        });
    });
}

// Enhanced Typewriter Effect (for home page only)
function initTypewriter() {
    const typewriterText = document.getElementById('typewriterText');
    const typewriterCursor = document.getElementById('typewriterCursor');
    
    // Only run if on home page
    if (!typewriterText || !typewriterCursor) return;
    
    const lines = [
        "Building Your Dream Home",
        "Your Trusted Construction Company in South Sudan", 
        "Quality. Strength. Reliability.",
        "Transforming Visions Into Reality",
        "Excellence in Every Project"
    ];
    
    let currentLine = 0;
    let currentChar = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        if (isPaused) return;
        
        const currentText = lines[currentLine];
        
        if (!isDeleting && currentChar <= currentText.length) {
            // Typing forward
            typewriterText.textContent = currentText.substring(0, currentChar);
            currentChar++;
            setTimeout(type, 80 + Math.random() * 40);
        } else if (isDeleting && currentChar >= 0) {
            // Deleting
            typewriterText.textContent = currentText.substring(0, currentChar);
            currentChar--;
            setTimeout(type, 40);
        } else if (!isDeleting && currentChar > currentText.length) {
            // Finished typing, pause then start deleting
            isDeleting = true;
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                setTimeout(type, 500);
            }, 1500);
        } else if (isDeleting && currentChar < 0) {
            // Finished deleting, move to next line
            isDeleting = false;
            currentLine = (currentLine + 1) % lines.length;
            currentChar = 0;
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                setTimeout(type, 500);
            }, 500);
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
}

// Enhanced Services Dropdown System
function initServicesDropdown() {
    const serviceHeaders = document.querySelectorAll('.service-header');
    
    serviceHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other service items
            serviceHeaders.forEach(h => {
                if (h !== this) {
                    h.classList.remove('active');
                    const otherContent = h.nextElementSibling;
                    otherContent.classList.remove('active');
                    otherContent.style.maxHeight = null;
                }
            });
            
            // Toggle current service item
            this.classList.toggle('active');
            
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

// Enhanced Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Form validation
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            alert('Please fill in all fields before submitting.');
            return;
        }
        
        // Show success message with animation
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.backgroundColor = '#4CAF50';
        
        // In a real implementation, you would send this data to a server
        console.log('Form submitted:', formData);
        
        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.backgroundColor = '';
        }, 3000);
    });
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Check on load and scroll
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
}

// Enhanced Custom Cursor
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    
    // Only enable custom cursor on desktop
    if (window.innerWidth > 768 && cursor && cursorFollower) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });
        
        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .service-header, .project-card, .btn, .contact-item, .feature-card, .stat-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.style.width = '60px';
                cursorFollower.style.height = '60px';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
            });
        });
    } else if (cursor && cursorFollower) {
        // Hide custom cursor on mobile
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
}

// Enhanced Floating Particles
function createParticles() {
    const particlesContainer = document.getElementById('particlesContainer');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth > 768 ? 40 : 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size and position
        const size = Math.random() * 100 + 20;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = Math.random() * 0.1 + 0.05;
        
        // Random animation
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 10;
        particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add keyframes for floating animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg); }
            50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg); }
            75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Enhanced Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function startCounting(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const startTime = Date.now();
        
        function updateCounter() {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            const currentValue = Math.floor(easeOutQuart * target);
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Start counting when stats are in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Handle window resize
window.addEventListener('resize', function() {
    // Reinitialize custom cursor on resize
    initCustomCursor();
    
    // Close mobile menu when resizing to desktop
    if (window.innerWidth > 768) {
        const mainNav = document.getElementById('mainNav');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const servicesDropdown = document.getElementById('servicesDropdown');
        
        if (mainNav) mainNav.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        if (servicesDropdown) servicesDropdown.classList.remove('active');
    }
});
