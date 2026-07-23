/* ============================================
   ALFA HIDAYAT — PORTFOLIO INTERACTIVE LOGIC
   Vanilla ES6+ JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // ============ PRELOADER ============
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader?.classList.add('hidden');
            document.body.classList.add('loaded');
            setTimeout(() => preloader?.remove(), 500);
        }, 600);
    });

    // Fallback: hide preloader after 3 seconds max
    setTimeout(() => {
        preloader?.classList.add('hidden');
        document.body.classList.add('loaded');
    }, 3000);

    // ============ THEME TOGGLE ============
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
        if (metaColorScheme) {
            metaColorScheme.content = theme === 'light' ? 'light' : 'dark';
        }
        localStorage.setItem('theme', theme);
    };

    applyTheme(currentTheme);

    themeToggle?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        
        // Rotate animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => { themeToggle.style.transform = ''; }, 400);
    });

    // ============ NAVIGATION ============
    const nav = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.getElementById('navToggle');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    // Sticky nav on scroll
    const handleScroll = () => {
        if (window.scrollY > 100) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile nav toggle
    navToggle?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks?.classList.remove('active');
            navToggle?.classList.remove('active');
        });
    });

    // Close mobile nav on click outside
    document.addEventListener('click', (e) => {
        if (navLinks?.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !navToggle?.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle?.classList.remove('active');
        }
    });

    // ============ SMOOTH SCROLL ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = nav?.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============ ACTIVE NAV LINK ON SCROLL ============
    const sections = document.querySelectorAll('section[id]');

    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinkItems.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: '-80px 0px -50% 0px'
        }
    );

    sections.forEach(section => navObserver.observe(section));

    // ============ TYPING EFFECT ============
    const typingElement = document.getElementById('typingText');
    const roles = [
        'DJ & Music Producer',
        'Web Developer (Laravel)',
        'Digital Illustrator',
        'Playwright & Theater Director',
        'Indonesian Language Educator'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout = null;

    const typeText = () => {
        if (!typingElement) return;

        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            charIndex--;
            typingElement.textContent = currentRole.substring(0, charIndex);
        } else {
            charIndex++;
            typingElement.textContent = currentRole.substring(0, charIndex);
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400; // Brief pause before next word
        }

        typingTimeout = setTimeout(typeText, speed);
    };

    // Start typing after a short delay
    setTimeout(typeText, 1200);

    // ============ ANIMATED COUNTERS ============
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        const easeOutQuad = (t) => t * (2 - t);

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuad(progress);
            const currentValue = Math.round(target * easedProgress);

            counter.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    counters.forEach((counter, index) => {
                        setTimeout(() => animateCounter(counter), index * 200);
                    });
                }
            });
        },
        { threshold: 0.5 }
    );

    const heroStats = document.querySelector('.hero-badge-left') || document.querySelector('.hero-stats');
    if (heroStats) {
        counterObserver.observe(heroStats);
    }

    // ============ PORTFOLIO FILTER ============
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    // Staggered animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 80);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ============ LIGHTBOX ============
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

    const openLightbox = (src, alt) => {
        if (!lightbox || !lightboxImage) return;
        lightboxImage.src = src;
        lightboxImage.alt = alt || 'Full size image';
        lightbox.classList.add('active');
        document.body.classList.add('no-scroll');
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
        setTimeout(() => {
            if (lightboxImage) lightboxImage.src = '';
        }, 300);
    };

    lightboxTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(trigger.src, trigger.alt);
        });
    });

    lightboxClose?.addEventListener('click', closeLightbox);
    
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ============ SCROLL REVEAL ============
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 50);
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    // ============ CONTACT FORM ============
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    const showToast = () => {
        toast?.classList.add('show');
        setTimeout(() => {
            toast?.classList.remove('show');
        }, 4000);
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();

        // Validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Show success notification
        showToast();
        contactForm.reset();

        // Optionally open mailto
        const service = document.getElementById('service')?.value || 'General';
        const subject = encodeURIComponent(`[Portfolio] ${service} Inquiry from ${name}`);
        const body = encodeURIComponent(`Hi Alfa,\n\n${message}\n\nBest regards,\n${name}\n${email}`);
        
        // Open email client in background
        const mailLink = document.createElement('a');
        mailLink.href = `mailto:taofan.alfa@gmail.com?subject=${subject}&body=${body}`;
        mailLink.click();
    });

    // ============ HERO PARALLAX ============
    const heroSection = document.querySelector('.hero');
    const heroImageWrapper = document.querySelector('.hero-image-wrapper');

    if (heroSection && heroImageWrapper) {
        let ticking = false;

        heroSection.addEventListener('mousemove', (e) => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                const rect = heroSection.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                const moveX = ((mouseX - centerX) / centerX) * 15;
                const moveY = ((mouseY - centerY) / centerY) * 15;

                heroImageWrapper.style.transform = `translate(${moveX}px, ${moveY}px)`;
                ticking = false;
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            heroImageWrapper.style.transform = 'translate(0, 0)';
        });
    }

    // ============ SKILL BAR ANIMATION ============
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const width = getComputedStyle(fill).getPropertyValue('--fill-width');
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 200);
                    skillObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    skillBars.forEach(bar => skillObserver.observe(bar));

});
