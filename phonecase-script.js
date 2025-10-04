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

    // Product modal functionality
    const productBtns = document.querySelectorAll('.btn-product');
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body">
                <h2 class="modal-title"></h2>
                <div class="modal-image"></div>
                <div class="modal-details"></div>
                <div class="modal-price"></div>
                <div class="modal-features"></div>
                <div class="modal-actions">
                    <button class="btn btn-primary modal-buy">Buy Now</button>
                    <button class="btn btn-secondary modal-add-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    // Product data
    const productData = {
        'PRO SERIES': {
            title: 'PRO SERIES',
            price: '₩49,000',
            description: '군사 등급 보호, 탄소 섬유 소재',
            features: [
                'MIL-STD-810H 군사 규격 통과',
                '탄소 섬유 강화 구조',
                '1.5m 낙하 테스트 통과',
                '무선 충전 호환',
                '마그네틱 카트리지 지원'
            ],
            image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=300&fit=crop'
        },
        'SLIM CASE': {
            title: 'SLIM CASE',
            price: '₩29,000',
            description: '초박형 디자인, 일상적인 보호',
            features: [
                '0.8mm 초박형 두께',
                'TPU 소재 사용',
                '일상적 낙하 방지',
                '미끄럼 방지 그립',
                '모든 포트 완벽 접근'
            ],
            image: 'https://images.unsplash.com/photo-1605236453806-b918f9b8f7c4?w=400&h=300&fit=crop'
        },
        'WALLET CASE': {
            title: 'WALLET CASE',
            price: '₩59,000',
            description: '카드 수납 기능, RFID 차단',
            features: [
                '3개 카드 수납 슬롯',
                'RFID 차단 기술',
                '스탠드 기능',
                '가죽 소재',
                '자동 잠금 기능'
            ],
            image: 'https://images.unsplash.com/photo-1605236453806-b918f9b8f7c4?w=400&h=300&fit=crop'
        }
    };

    productBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const product = productData[productName];

            if (product) {
                openProductModal(product);
            }
        });
    });

    function openProductModal(product) {
        const modalTitle = modalOverlay.querySelector('.modal-title');
        const modalImage = modalOverlay.querySelector('.modal-image');
        const modalDetails = modalOverlay.querySelector('.modal-details');
        const modalPrice = modalOverlay.querySelector('.modal-price');
        const modalFeatures = modalOverlay.querySelector('.modal-features');

        modalTitle.textContent = product.title;
        modalImage.innerHTML = `<img src="${product.image}" alt="${product.title}" style="width: 100%; border-radius: 8px;">`;
        modalDetails.textContent = product.description;
        modalPrice.textContent = product.price;
        modalFeatures.innerHTML = product.features.map(feature => `<li>✓ ${feature}</li>`).join('');

        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    function closeModal() {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    modalOverlay.querySelector('.modal-buy').addEventListener('click', function() {
        alert('결제 시스템 준비 중입니다. 곧 출시됩니다!');
        closeModal();
    });

    modalOverlay.querySelector('.modal-add-cart').addEventListener('click', function() {
        const productName = modalOverlay.querySelector('.modal-title').textContent;
        showNotification(`${productName}가 장바구니에 추가되었습니다!`);
        closeModal();
    });

    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgb(1, 86, 91);
            color: white;
            padding: 16px 24px;
            border-radius: 4px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Contact form functionality
    const contactBtns = document.querySelectorAll('a[href^="mailto:"], .btn[href^="mailto:"]');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showContactForm();
        });
    });

    function showContactForm() {
        const existingForm = document.querySelector('.contact-modal');
        if (existingForm) existingForm.remove();

        const contactModal = document.createElement('div');
        contactModal.className = 'modal-overlay contact-modal';
        contactModal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-body">
                    <h2>Contact Us</h2>
                    <form class="contact-form">
                        <input type="text" placeholder="Your Name" required>
                        <input type="email" placeholder="Your Email" required>
                        <input type="tel" placeholder="Phone Number">
                        <textarea placeholder="Your Message" rows="5" required></textarea>
                        <button type="submit" class="btn btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(contactModal);
        contactModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        contactModal.querySelector('.modal-close').addEventListener('click', () => {
            contactModal.remove();
            document.body.style.overflow = 'auto';
        });

        contactModal.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('메시지가 성공적으로 전송되었습니다! 곧 연락드리겠습니다.');
            contactModal.remove();
            document.body.style.overflow = 'auto';
        });
    }

    // Add CSS for modal and animations
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background: white;
            padding: 40px;
            border-radius: 8px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: fadeInUp 0.3s ease;
        }

        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 32px;
            cursor: pointer;
            color: rgb(17, 17, 17);
        }

        .modal-title {
            font-size: 32px;
            margin-bottom: 20px;
            color: rgb(17, 17, 17);
        }

        .modal-price {
            font-size: 24px;
            font-weight: 700;
            color: rgb(1, 86, 91);
            margin: 20px 0;
        }

        .modal-features {
            list-style: none;
            padding: 0;
            margin: 20px 0;
        }

        .modal-features li {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }

        .modal-actions {
            display: flex;
            gap: 16px;
            margin-top: 30px;
        }

        .contact-form input,
        .contact-form textarea {
            width: 100%;
            padding: 16px;
            margin: 8px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }

        .contact-form button {
            width: 100%;
            margin-top: 16px;
        }

        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        @media (max-width: 768px) {
            .modal-content {
                padding: 20px;
                margin: 20px;
            }

            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(modalStyles);

    console.log('CASELAB Landing Page - All interactions initialized with enhanced features');
});