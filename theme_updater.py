import re

with open('public/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add Intersection Observer and Spotlight Trackers at the very end of app.js
new_js = """

// === SCROLL SURPRISES & GAMIFIED SPOTLIGHT EFFECTS ===
document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Spotlight effect on cards
    const cards = document.querySelectorAll('.bonus-card, .tier-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        // Also add the reveal class
        card.classList.add('reveal-on-scroll');
    });

    // 2. Setup Intersection Observer for scrolling surprises
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once revealed
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards
    cards.forEach(card => {
        scrollObserver.observe(card);
    });
    
    // Also observe section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('reveal-on-scroll');
        scrollObserver.observe(header);
    });
});
"""

if "SCROLL SURPRISES" not in js:
    js += new_js
    with open('public/app.js', 'w', encoding='utf-8') as f:
        f.write(js)
    with open('legacy/app.js', 'w', encoding='utf-8') as f:
        f.write(js)
