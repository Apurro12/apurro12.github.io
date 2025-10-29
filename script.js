// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling

        // Add event listener for escape key
        document.addEventListener('keydown', handleEscapeKey);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling

        // Remove event listener for escape key
        document.removeEventListener('keydown', handleEscapeKey);
    }
}

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        // Close all open modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleEscapeKey);
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleEscapeKey);
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard support for project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                item.click();
            }
        });
    });

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        // Set initial opacity for smooth loading effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';

        // If image is already loaded (cached), show it immediately
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Add scroll-based animations (optional enhancement)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.experience-item, .project-item, .education-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effects for better interactivity
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click animation for buttons
    const buttons = document.querySelectorAll('.resume-link, .contact-link, .project-links a');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .resume-link, .contact-link, .project-links a {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization: Lazy loading for project images
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        // This would be used if you implement lazy loading
        // const lazyImages = document.querySelectorAll('img[data-src]');
        // lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Add form validation if contact form is added later
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openModal,
        closeModal,
        validateEmail
    };
}