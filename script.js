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

// --- 8. Project Details Modal Logic ---
const projectDetails = {
    'uncanny-valley': {
        title: 'Uncanny Valley',
        image: 'assets/images/p1finalg.png',
        glb: 'assets/images/toydoll4.glb',
        tags: ['Photoshop', 'Realtime 3D', 'Analysis'],
        description: 'This project explores how the uncanny valley emerges inside the visual language of Pokémon cards — a space that blends nostalgia, character design, and highly stylized illustration. My goal was to examine why certain cards feel charming and alive while others slip into something slightly off: proportions that feel too perfect, expressions that hover between human and creature, or rendering styles that push realism just a little too far.',
        features: [
            'Analysis of Pokémon card visual language and aesthetics',
            'Realtime 3D interactive study of creative artifacts using toydoll4.glb',
            'High-resolution digital reconstruction & custom textures'
        ],
        github: 'https://github.com',
        live: 'https://acrobat.adobe.com/id/urn:aaid:sc:VA6C2:3ee11ad7-57cb-4368-8385-19df9f7a56a3'
    },
    'quasi-object': {
        title: 'Quasi-Object',
        image: 'assets/images/p2finalg.png',
        tags: ['Blender', '3D Design', 'Interactive'],
        description: 'This project investigates the nature of a quasi‑object — a form that never settles into a single, stable identity but instead becomes “real” only through perception, camera position, and digital interaction. Using Blender, I will construct a 3D object whose meaning continuously shifts depending on how it is viewed, lit, or animated. Rather than functioning as a fixed asset, the object behaves like a mutable presence: part illusion, part structure, part performance.',
        features: [
            'Constructed dynamic meshes in Blender',
            'Lighting and material tests under varied perspectives',
            'Interactive digital sculpture logic'
        ],
        github: 'https://github.com',
        live: 'https://acrobat.adobe.com/id/urn:aaid:sc:VA6C2:2b427066-2a0e-478a-9555-58ef088197b3'
    },
    'chronos': {
        title: 'Chronos Task Runner',
        image: 'assets/images/project-3.jpg',
        tags: ['Library', 'JavaScript', 'Async'],
        description: 'A microcron task automation executor in vanilla JavaScript designed to scale with serverless environments.',
        features: [
            'Extremely lightweight footprint (< 2KB gzipped)',
            'Auto-scaling execution queue with concurrency throttling',
            'Robust retry backoff algorithms and crash recovery'
        ],
        github: 'https://github.com',
        live: 'https://github.com'
    }
};

const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalImg = document.getElementById('modal-img');
const modal3d = document.getElementById('modal-3d');
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

        // Populate text & details
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.description;

        // Handle 3D model loading vs static images
        if (data.glb) {
            // Hide static image, show 3D viewer
            modalImg.style.display = 'none';
            modal3d.style.display = 'block';

            // Populate 3D viewer properties
            modal3d.src = data.glb;
            modal3d.poster = data.image; // Use the card preview image as poster loader
            modal3d.alt = `${data.title} 3D Model`;
        } else {
            // Show static image, hide 3D viewer
            modal3d.style.display = 'none';
            modalImg.style.display = 'block';

            modalImg.src = data.image;
            modalImg.alt = `${data.title} Mockup`;
        }

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
    // Clear 3D model source on close to free up resources
    if (modal3d) {
        modal3d.src = '';
    }
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
