document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Header Scroll Effect
    const header = document.getElementById('header');

    const handleScroll = () => {
        const heroHeight = document.getElementById('hero').offsetHeight;
        if (window.scrollY > heroHeight - 100) { // Switch slightly before leaving hero
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init check

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Hero Slideshow
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 6000); // Switch every 6 seconds
    }
    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');

    if (loadingScreen) {
        const hideLoadingScreen = () => {
            loadingScreen.classList.add('hidden');
            loadingScreen.addEventListener('transitionend', (event) => {
                if (event.propertyName === 'opacity') {
                    loadingScreen.remove();
                }
            }, { once: true });
        };

        const triggerHide = () => {
            window.removeEventListener('load', triggerHide);
            hideLoadingScreen();
        };

        // Ensure minimum display time of 1.5 seconds for branding
        setTimeout(() => {
            if (document.readyState === 'complete') {
                hideLoadingScreen();
            } else {
                window.addEventListener('load', triggerHide);
            }
        }, 1500);
    }
});
