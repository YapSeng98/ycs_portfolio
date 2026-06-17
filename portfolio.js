/* ===== Particle Neural Network Canvas ===== */
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const COUNT = 75;
    const CONNECT_DIST = 130;

    function resize() {
        canvas.width = canvas.offsetWidth || window.innerWidth;
        canvas.height = canvas.offsetHeight || window.innerHeight;
    }

    class Particle {
        constructor() { this.init(); }
        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = (Math.random() - 0.5) * 0.45;
            this.r = Math.random() * 1.8 + 0.6;
            this.alpha = Math.random() * 0.45 + 0.15;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,212,255,${this.alpha})`;
            ctx.fill();
        }
    }

    function init() {
        particles = Array.from({ length: COUNT }, () => new Particle());
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < CONNECT_DIST) {
                    const a = (1 - d / CONNECT_DIST) * 0.13;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0,212,255,${a})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(animate);
    }

    resize();
    init();
    animate();
    window.addEventListener('resize', () => { resize(); init(); });
}

/* ===== Typing Animation ===== */
const typingEl = document.getElementById('typing-text');
if (typingEl) {
    const words = [
        'Application Developer',
        'BPM Specialist',
        'Workflow Architect',
        'Low-Code Expert',
        'Process Automator'
    ];
    let wi = 0, ci = 0, deleting = false;

    function type() {
        const word = words[wi];
        typingEl.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);

        if (!deleting && ci === word.length) {
            setTimeout(() => { deleting = true; type(); }, 2200);
            return;
        }
        if (deleting && ci === 0) {
            deleting = false;
            wi = (wi + 1) % words.length;
        }
        setTimeout(type, deleting ? 55 : 85);
    }
    setTimeout(type, 600);
}

/* ===== Counter Animation ===== */
function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const interval = 16;
    const steps = duration / interval;
    let step = 0;
    const timer = setInterval(() => {
        step++;
        el.textContent = Math.min(Math.round((step / steps) * target), target);
        if (step >= steps) clearInterval(timer);
    }, interval);
}

const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            animateCount(e.target);
            counterObs.unobserve(e.target);
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-num').forEach(el => counterObs.observe(el));

/* ===== Scroll Reveal ===== */
const revealObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 90);
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ===== Active Nav + Scrolled State ===== */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const scrollBtn = document.getElementById('scrollToTopButton');

function onScroll() {
    const y = window.scrollY;

    if (navbar) {
        navbar.classList.toggle('scrolled', y > 60);
    }

    if (sections.length) {
        sections.forEach(sec => {
            const top = sec.offsetTop - 90;
            const bottom = top + sec.offsetHeight;
            if (y >= top && y < bottom) {
                navLinks.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === `#${sec.id}`);
                });
            }
        });
    }

    if (scrollBtn) {
        scrollBtn.classList.toggle('visible', y > 380);
    }
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ===== Hamburger Menu ===== */
const menuToggle = document.getElementById('menu-toggle');
const navList = document.querySelector('.nav-links');

if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });

    navList.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navList.classList.remove('active');
            menuToggle.classList.remove('open');
        });
    });
}

/* ===== Scroll to Top ===== */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===== Contact Form ===== */
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const subject = document.getElementById('subject')?.value.trim() || 'Portfolio Inquiry';
        const message = document.getElementById('message')?.value.trim() || '';
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        window.location.href = `mailto:yceng038@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}
