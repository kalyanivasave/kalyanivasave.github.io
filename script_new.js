// ═══════════════════════════════════════════════════════════
// NAVIGATION & SCROLL EFFECTS
// ═══════════════════════════════════════════════════════

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of fixed nav
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link on scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ═══════════════════════════════════════════════════════════
// INTERSECTION OBSERVER FOR ANIMATIONS
// ═══════════════════════════════════════════════════════

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate tiles with stagger effect
            if (entry.target.classList.contains('tile')) {
                const tiles = document.querySelectorAll('.tile');
                tiles.forEach((tile, index) => {
                    setTimeout(() => {
                        tile.style.opacity = '1';
                        tile.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
            
            // Animate project cards
            if (entry.target.classList.contains('project-card')) {
                const cards = document.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
            
            // Animate metrics counter
            if (entry.target.classList.contains('metric-value')) {
                animateCounter(entry.target);
            }
            
            if (entry.target.classList.contains('impact-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.tile, .project-card, .blog-card, .metric-value, .impact-number').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ═══════════════════════════════════════════════════════════
// COUNTER ANIMATION FOR METRICS
// ═══════════════════════════════════════════════════════

function animateCounter(element) {
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const hasMin = text.includes('min');
    const isDecrease = text.includes('↓');
    const isIncrease = text.includes('↑');
    
    // Extract number
    const number = parseInt(text.replace(/[^\d]/g, ''));
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
        current += increment;
        step++;
        
        let displayValue = Math.floor(current);
        let suffix = '';
        
        if (hasPercent) suffix = '%';
        if (hasMin) suffix = ' min';
        if (isDecrease) suffix = '% ↓';
        if (isIncrease) suffix = '% ↑';
        
        element.textContent = displayValue + suffix;
        
        if (step >= steps) {
            element.textContent = number + suffix;
            clearInterval(timer);
        }
    }, duration / steps);
}

// ═══════════════════════════════════════════════════════════
// PARALLAX EFFECT FOR CHARACTERS
// ═══════════════════════════════════════════════════════

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const characters = document.querySelectorAll('.character');
    
    characters.forEach(char => {
        const speed = 0.3;
        const yPos = -(scrolled * speed);
        char.style.transform = `translateY(${yPos}px)`;
    });
});

// ═══════════════════════════════════════════════════════════
// FLOATING PARTICLES EFFECT (OPTIONAL)
// ═══════════════════════════════════════════════════════

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${10 + Math.random() * 20}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10% {
            opacity: 0.5;
        }
        90% {
            opacity: 0.5;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Uncomment to enable particles
// createParticles();

// ═══════════════════════════════════════════════════════════
// CUSTOM CURSOR (OPTIONAL ENHANCEMENT)
// ═══════════════════════════════════════════════════════

function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 107, 109, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Expand cursor on hover over clickable elements
    const clickables = document.querySelectorAll('a, button, .project-card, .tile, .blog-card');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = 'rgba(255, 140, 66, 1)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = 'rgba(255, 107, 109, 0.8)';
        });
    });
}

// Uncomment to enable custom cursor (only on desktop)
// if (window.innerWidth > 768) {
//     initCustomCursor();
// }

// ═══════════════════════════════════════════════════════════
// LOADING ANIMATION
// ═══════════════════════════════════════════════════════

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Stagger hero elements animation
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// ═══════════════════════════════════════════════════════════
// ENHANCED HOVER EFFECTS
// ═══════════════════════════════════════════════════════

// Add glow effect to cards on hover
const cards = document.querySelectorAll('.tile, .project-card, .blog-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ═══════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ═══════════════════════════════════════════════════════════
// ACCESSIBILITY ENHANCEMENTS
// ═══════════════════════════════════════════════════════

// Keyboard navigation for mobile menu
hamburger.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
    }
});

// Focus trap for mobile menu when open
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    });
}

// Apply focus trap when mobile menu is open
const mobileMenuObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('active')) {
            trapFocus(mobileMenu);
        }
    });
});

mobileMenuObserver.observe(mobileMenu, {
    attributes: true,
    attributeFilter: ['class']
});

// ═══════════════════════════════════════════════════════════
// CONSOLE EASTER EGG
// ═══════════════════════════════════════════════════════

console.log(
    '%c👋 Hey there! ',
    'color: #ff6b6b; font-size: 24px; font-weight: bold;'
);
console.log(
    '%cLooking under the hood? I like that. Let\'s chat about building products together!',
    'color: #4fd1c5; font-size: 14px;'
);
console.log(
    '%c📧 wasave.k@northeastern.edu',
    'color: #8a5cf6; font-size: 14px; font-weight: bold;'
);

// ═══════════════════════════════════════════════════════════
// PROJECT EXPAND/COLLAPSE FUNCTIONALITY
// ═══════════════════════════════════════════════════════

function toggleProjectDetails(projectId) {
    const details = document.getElementById(`${projectId}-details`);
    const button = details.previousElementSibling;
    const expandText = button.querySelector('.expand-text');
    const expandIcon = button.querySelector('.expand-icon');
    
    if (details.classList.contains('collapsed')) {
        // Expand
        details.classList.remove('collapsed');
        details.classList.add('expanded');
        button.classList.add('expanded');
        expandText.textContent = 'Collapse Details';
    } else {
        // Collapse
        details.classList.remove('expanded');
        details.classList.add('collapsed');
        button.classList.remove('expanded');
        expandText.textContent = 'Expand Details';
    }
}

// ═══════════════════════════════════════════════════════════
// INITIALIZE
// ═══════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized! 🚀');
    
    // Add loaded class to body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
