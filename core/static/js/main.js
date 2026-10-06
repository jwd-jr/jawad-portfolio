// ── Typed text effect ──
const phrases = [
    'AI Engineer',
    'Backend Developer',
    'LLM Integrator',
    'RAG Pipeline Builder',
    'FastAPI Developer'
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');

function typeLoop() {
    if (!typedEl) return;
    const current = phrases[phraseIdx];
    typedEl.textContent = deleting ? current.slice(0, charIdx--) : current.slice(0, charIdx++);
    let delay = deleting ? 60 : 100;
    if (!deleting && charIdx > current.length) { delay = 1800; deleting = true; }
    else if (deleting && charIdx < 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; delay = 300; }
    setTimeout(typeLoop, delay);
}
typeLoop();

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    highlightNav();
});

// ── Active nav link ──
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
function highlightNav() {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}

// ── Hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinksEl.classList.toggle('open'));
navLinks.forEach(a => a.addEventListener('click', () => navLinksEl.classList.remove('open')));

// ── Scroll reveal ──
const revealEls = document.querySelectorAll('.section-header, .skill-card, .project-card, .exp-card, .about-grid, .contact-card, .contact-form-wrap');
revealEls.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// ── Contact form (AJAX submit) ──
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        btn.textContent = 'Sending...';
        btn.disabled = true;

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'ok') {
                btn.textContent = 'Message Sent! ✓';
                btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
                setTimeout(() => {
                    btn.textContent = 'Send Message';
                    btn.style.background = '';
                    btn.disabled = false;
                    form.reset();
                }, 3000);
            } else {
                btn.textContent = 'Error — Try Again';
                btn.style.background = 'linear-gradient(135deg, #ef4444, #f97316)';
                setTimeout(() => {
                    btn.textContent = 'Send Message';
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }
        })
        .catch(() => {
            btn.textContent = 'Error — Try Again';
            btn.style.background = 'linear-gradient(135deg, #ef4444, #f97316)';
            setTimeout(() => {
                btn.textContent = 'Send Message';
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        });
    });
}
