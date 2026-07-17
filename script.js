document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Current Year Footer Update ---
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --- 2. Theme Switcher Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Determine initial theme
    let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
    });

    // --- 3. Mobile Navigation Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- 4. Hero Section Typing Animation ---
    const typingElement = document.getElementById('typing-text');
    const words = ["feel like art.", "drive growth.", "solve problems.", "delight users."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typingElement) return;

        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    // --- 5. Projects Category Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active filter button class
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                // Add fade-out visual transition first
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(10px)';

                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        // Trigger fade-in
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // --- 6. Scroll Reveal Animation & Active Nav Highlighter ---
    const sections = document.querySelectorAll('section');
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Nav Link Highlighting
    const navObserverOptions = {
        threshold: 0.5
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    // --- 7. Form Submission Validation Mock ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple visual response for form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.style.background = 'var(--accent-tertiary)';
            submitBtn.innerHTML = `
                <span>Message Sent Successfully!</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;

            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.innerHTML = originalText;
            }, 3000);
        });
    }
});

// --- 8. Project Details Modal Logic ---
const projectDetails = {
    'nova': {
        title: 'Nova Cloud Dashboard',
        image: 'assets/images/project-1.jpg',
        tags: ['Web App', 'TypeScript', 'WebSockets'],
        description: 'A next-generation cloud infrastructure management portal featuring live socket streams, visual canvas grids, and lightweight animations. It allows teams to monitor distributed microservices in real-time, scale compute resources dynamically, and configure custom alerts via a drag-and-drop workspace layout.',
        features: [
            'Real-time WebSocket streaming with < 50ms latency',
            'Interactive visual topology map using HTML5 Canvas',
            'Customizable widget grid with local persistence',
            'Sleek theme-aware telemetry charting with Chart.js'
        ],
        github: 'https://github.com',
        live: 'https://github.com'
    },
    'aether': {
        title: 'Aether Design System',
        image: 'assets/images/project-2.jpg',
        tags: ['Design System', 'CSS Grid', 'Figma'],
        description: 'A custom, micro-interaction-focused layout and components bundle providing dynamic layouts, complex tables, and high-fidelity overlays. Designed to help frontend developers build cohesive and accessible user interfaces rapidly with zero-config dark mode support.',
        features: [
            'CSS Custom Properties theme token engine',
            'WCAG 2.1 AA compliant components out-of-the-box',
            'Flexible custom CSS grid and flexbox utility wrappers',
            'Pre-built visual layouts for landing and dashboard pages'
        ],
        github: 'https://github.com',
        live: 'https://github.com'
    },
    'chronos': {
        title: 'Chronos Task Runner',
        image: 'assets/images/project-3.jpg',
        tags: ['Library', 'JavaScript', 'Async'],
        description: 'A microcron task automation executor in vanilla JavaScript designed to scale with serverless environments. Chronos handles heavy asynchronous workflows, retry queues, and cron-like timing loops while maintaining a tiny memory footprint.',
        features: [
            'Extremely lightweight footprint (< 2KB gzipped)',
            'Auto-scaling execution queue with concurrency throttling',
            'Robust retry backoff algorithms and crash recovery',
            'Full support for standard 5-field cron syntax'
        ],
        github: 'https://github.com',
        live: 'https://github.com'
    }
};

const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalTagsContainer = document.getElementById('modal-tags');
const modalDesc = document.getElementById('modal-desc');
const modalFeaturesList = document.getElementById('modal-features-list');
const modalLinkGithub = document.getElementById('modal-link-github');
const modalLinkLive = document.getElementById('modal-link-live');

// Prevent modal from triggering when clicking external preview links directly on the card
const cardLinks = document.querySelectorAll('.project-link-btn');
cardLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// Setup card click listeners
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project-id');
        const data = projectDetails[projectId];
        if (!data) return;

        // Populate text & image
        modalImg.src = data.image;
        modalImg.alt = `${data.title} Mockup`;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.description;

        // Build dynamic tag spans
        modalTagsContainer.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'project-tag';
            span.textContent = tag;
            modalTagsContainer.appendChild(span);
        });

        // Build dynamic features list
        modalFeaturesList.innerHTML = '';
        data.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeaturesList.appendChild(li);
        });

        // Update external buttons
        modalLinkGithub.href = data.github;
        modalLinkLive.href = data.live;

        // Show Modal
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    });
});

// Close Handler
const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Resume background scrolling
};

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close when clicking the overlay backdrop
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close when pressing the Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});
