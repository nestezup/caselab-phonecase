// CASELAB Landing Page JavaScript
// Smooth scrolling and interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.nav-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.style.background = 'rgba(17, 17, 17, 0.95)';
        } else {
            header.style.background = 'rgba(17, 17, 17, 0.85)';
        }

        lastScrollY = currentScrollY;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-card, .feature-item, .about-text, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 10px 20px rgba(17, 17, 17, 0.2)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Parallax effect for hero section
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            heroContent.style.opacity = 1 - (scrolled / 800);
        }
    });

    // Mobile menu toggle (if needed for responsive design)
    function createMobileMenu() {
        const nav = document.querySelector('.nav-header .nav-content');
        const logo = document.querySelector('.logo');

        // Create hamburger menu button
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-toggle';
        menuButton.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        menuButton.style.cssText = `
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
            z-index: 1001;
        `;

        // Add styles for hamburger menu
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-toggle span {
                display: block;
                width: 25px;
                height: 2px;
                background: white;
                margin: 5px 0;
                transition: 0.3s;
            }

            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }

            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }

            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }

            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: block !important;
                }

                .nav-links {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 70%;
                    height: 100vh;
                    background: rgba(17, 17, 17, 0.98);
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    transition: right 0.3s ease;
                    z-index: 1000;
                }

                .nav-links.active {
                    right: 0;
                }

                .nav-link {
                    margin: 20px 0;
                    font-size: 18px;
                }
            }
        `;

        document.head.appendChild(style);
        nav.appendChild(menuButton);

        // Toggle mobile menu
        menuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            document.querySelector('.nav-links').classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuButton.classList.remove('active');
                document.querySelector('.nav-links').classList.remove('active');
            });
        });
    }

    // Initialize mobile menu for responsive design
    createMobileMenu();

    // Add loading animation for images (when real images are added)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    lazyLoadImages();

    // Form submission handler (if contact form is added later)
    function handleFormSubmission() {
        const form = document.querySelector('form');

        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                // Add your form submission logic here
                console.log('Form submitted');

                // Show success message
                const successMessage = document.createElement('div');
                successMessage.textContent = '메시지가 성공적으로 전송되었습니다!';
                successMessage.style.cssText = `
                    background: rgb(203, 235, 58);
                    color: rgb(17, 17, 17);
                    padding: 20px;
                    border-radius: 4px;
                    margin-top: 20px;
                    text-align: center;
                    font-weight: 600;
                `;

                form.appendChild(successMessage);
                form.reset();

                // Remove message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            });
        }
    }

    handleFormSubmission();

    // Add subtle animation to feature icons on scroll
    function animateFeatureIcons() {
        const featureIcons = document.querySelectorAll('.feature-icon');

        const iconObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.6s ease forwards, pulse 2s ease-in-out infinite';
                    }, index * 100);
                    iconObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        featureIcons.forEach(icon => {
            icon.style.opacity = '0';
            iconObserver.observe(icon);
        });
    }

    // Add pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(pulseStyle);

    animateFeatureIcons();

    console.log('CASELAB Landing Page - All interactions initialized');
});