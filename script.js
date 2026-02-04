// VSMC Configuration
const CONFIG = {
    phone: '+14165551234',
    phoneDisplay: '(416) 555-1234',
    email: 'care@vsmc.health',
    address: 'Sherway Medical Centre, 25 The West Mall, Etobicoke, ON M9C 1B8'
};

document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
    initSmoothScroll();
    initFormHandler();
    initNavbar();
    initAnimations();
});

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 120;
                const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });
}

// Form Handler
function initFormHandler() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            const subject = encodeURIComponent(`VSMC Consultation Request - ${firstName} ${lastName}`);
            const body = encodeURIComponent(
                `New Consultation Request\n\n` +
                `Name: ${firstName} ${lastName}\n` +
                `Email: ${email}\n` +
                `Phone: ${phone}\n` +
                `Service: ${service}\n\n` +
                `Message:\n${message}`
            );
            
            window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
            
            showNotification('Thank you! Your email client will open to complete your request.');
            form.reset();
        });
    }
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .team-card, .testimonial-card, .step, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add animate-in class styles dynamically
const style = document.createElement('style');
style.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// Notification helper
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; bottom: 24px; right: 24px; background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white; padding: 16px 24px; border-radius: 12px; font-weight: 500;
        box-shadow: 0 10px 40px rgba(99,102,241,0.4); z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Animation keyframes
const keyframes = document.createElement('style');
keyframes.textContent = `
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
`;
document.head.appendChild(keyframes);
