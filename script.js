// VSMC Configuration
const CONFIG = {
    phone: '+14165551234',
    phoneDisplay: '(416) 555-1234',
    email: 'care@vsmc.health',
    address: 'Sherway Medical Centre, 25 The West Mall, Etobicoke, ON M9C 1B8'
};

document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initFAQ();
    initSmoothScroll();
    initFormHandler();
    initNavbar();
    initAnimations();
    handleUrlParams();
});

// URL Parameter Handling (Pre-select service in booking)
function handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    
    if (service && window.location.pathname.includes('booking.html')) {
        const radio = document.querySelector(`input[name="service"][value="${service}"]`);
        if (radio) {
            radio.checked = true;
            // Highlight the selection
            radio.closest('.option-card').classList.add('selected');
        }
    }
}

// Particle Animation System
function initParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'particles';
    canvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;';
    
    // Support for both old and new hero structure
    const bg = heroSection.querySelector('.hero-bg') || heroSection;
    bg.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 80;
    
    function resize() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: Math.random() > 0.5 ? 'rgba(236, 72, 153, 0.6)' : 'rgba(59, 130, 246, 0.6)',
            pulse: Math.random() * Math.PI * 2
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, i) => {
            // Update position
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += 0.02;
            
            // Wrap around edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            // Pulsing size
            const pulseRadius = p.radius + Math.sin(p.pulse) * 0.5;
            
            // Draw particle with glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, pulseRadius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Draw connections to nearby particles
            particles.slice(i + 1).forEach(p2 => {
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 120)})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    animate();
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
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
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 120;
                const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });
}

// Form Handler & Validation
function initFormHandler() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic Validation Check
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // Show Loading State
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="loader"></span> Processing...';
            }

            // Simulate server delay for professional feel
            setTimeout(() => {
                // If it's the contact form, use mailto
                if (form.id === 'contactForm') {
                    const formData = new FormData(form);
                    const email = formData.get('email');
                    const message = formData.get('message');
                    
                    window.location.href = `mailto:${CONFIG.email}?subject=VSMC Inquiry&body=${encodeURIComponent(message)}`;
                    showNotification('Inquiry prepared! Please send the email to complete.');
                } else {
                    // Success display for Booking/Intake/Referral
                    const targetId = form.id.replace('Form', 'Confirmation');
                    const confirmation = document.getElementById(targetId);
                    
                    if (confirmation) {
                        form.style.display = 'none';
                        confirmation.classList.remove('hidden');
                        confirmation.style.display = 'block';
                        window.scrollTo({ top: confirmation.offsetTop - 100, behavior: 'smooth' });
                    } else {
                        showNotification('Form submitted successfully!');
                    }
                }

                // Reset button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
                form.reset();
            }, 1000);
        });
    });
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
            navbar.classList.add('scrolled');
        } else {
            navbar.style.boxShadow = 'none';
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu && navLinks) {
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

    document.querySelectorAll('.service-card, .team-card, .testimonial-card, .step, .faq-item, .sidebar-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add animate-in and loader styles dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-in { opacity: 1 !important; transform: translateY(0) !important; }
    .loader {
        width: 16px; height: 16px; border: 2px solid #FFF; border-bottom-color: transparent;
        border-radius: 50%; display: inline-block; animation: rotation 1s linear infinite;
        vertical-align: middle; margin-right: 8px;
    }
    @keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(style);

// Notification helper
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; bottom: 24px; right: 24px; background: linear-gradient(135deg, #ec4899, #3b82f6);
        color: white; padding: 16px 24px; border-radius: 12px; font-weight: 500;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2); z-index: 9999;
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

