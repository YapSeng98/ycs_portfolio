/* =========================================================
   portfolio.js — shared by every page.
   Each block only runs if its elements exist on the page.
   ========================================================= */
(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* ===== Theme toggle (dark is the default) ===== */
    const themeBtn = document.getElementById('theme-toggle');
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const currentTheme = () => (root.dataset.theme === 'light' ? 'light' : 'dark');

    function syncThemeUI() {
        const light = currentTheme() === 'light';
        if (themeBtn) themeBtn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
        if (themeMeta) themeMeta.setAttribute('content', light ? '#f5f7fb' : '#05050f');
    }

    function applyTheme(theme) {
        root.dataset.theme = theme;
        try { localStorage.setItem('ycs-theme', theme); } catch (e) { /* storage blocked: theme still applies for this visit */ }
        syncThemeUI();
        document.dispatchEvent(new CustomEvent('themechange'));
    }

    syncThemeUI();
    if (themeBtn) {
        themeBtn.addEventListener('click', () => applyTheme(currentTheme() === 'light' ? 'dark' : 'light'));
    }

    /* ===== Particle network (hero) ===== */
    const canvas = document.getElementById('particle-canvas');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        const LINK = 130;
        let particles = [];
        let w = 0, h = 0, lastW = 0;
        let rgb = '0, 212, 255';
        let running = false, rafId = 0, onScreen = true;

        const readColour = () => {
            rgb = getComputedStyle(root).getPropertyValue('--particle-rgb').trim() || rgb;
        };

        function size() {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = rect.width;
            h = rect.height;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function seed() {
            const count = Math.round(Math.min(80, Math.max(28, (w * h) / 16000)));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                r: Math.random() * 1.8 + 0.6,
                a: Math.random() * 0.45 + 0.15
            }));
            lastW = w;
        }

        function draw(move) {
            ctx.clearRect(0, 0, w, h);
            for (const p of particles) {
                if (move) {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > w) p.vx *= -1;
                    if (p.y < 0 || p.y > h) p.vy *= -1;
                }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb},${p.a})`;
                ctx.fill();
            }
            ctx.lineWidth = 0.7;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < LINK * LINK) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${rgb},${(1 - Math.sqrt(d2) / LINK) * 0.14})`;
                        ctx.stroke();
                    }
                }
            }
        }

        const loop = () => { draw(true); rafId = requestAnimationFrame(loop); };
        const start = () => {
            if (running || reduceMotion.matches || !onScreen || document.hidden) return;
            running = true;
            loop();
        };
        const stop = () => { running = false; cancelAnimationFrame(rafId); };

        readColour();
        size();
        seed();
        reduceMotion.matches ? draw(false) : start();

        window.addEventListener('resize', () => {
            size();
            // Phones fire resize when the URL bar shows/hides; only re-seed on a real width change.
            if (Math.abs(w - lastW) > 40) seed();
            if (!running) draw(false);
        });

        if ('IntersectionObserver' in window) {
            new IntersectionObserver(([entry]) => {
                onScreen = entry.isIntersecting;
                onScreen ? start() : stop();
            }).observe(canvas);
        }

        document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
        document.addEventListener('themechange', () => { readColour(); if (!running) draw(false); });
        reduceMotion.addEventListener?.('change', () => {
            if (reduceMotion.matches) { stop(); draw(false); } else { start(); }
        });
    }

    /* ===== Typing animation ===== */
    const typingEl = document.getElementById('typing-text');
    if (typingEl && !reduceMotion.matches) {
        const words = [
            'Senior Application Developer',
            'BPM Specialist',
            'ServiceNow Developer',
            'Full-Stack Builder',
            'AI Integrator'
        ];
        let wi = 0;
        let ci = words[0].length;   // the first word is already in the HTML
        let deleting = false;

        const tick = () => {
            if (!deleting && ci === words[wi].length) {
                deleting = true;
                setTimeout(tick, 2200);
                return;
            }
            if (deleting && ci === 0) {
                deleting = false;
                wi = (wi + 1) % words.length;
            }
            ci += deleting ? -1 : 1;
            typingEl.textContent = words[wi].slice(0, ci);
            setTimeout(tick, deleting ? 45 : 85);
        };
        setTimeout(tick, 600);
    }

    /* ===== Stat counters ===== */
    const counters = document.querySelectorAll('.stat-num[data-target]');
    if (counters.length && !reduceMotion.matches && 'IntersectionObserver' in window) {
        const countUp = el => {
            const target = parseInt(el.dataset.target, 10);
            const t0 = performance.now();
            const step = now => {
                const p = Math.min((now - t0) / 1400, 1);
                el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };
        const counterObs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) { countUp(e.target); counterObs.unobserve(e.target); }
            });
        }, { threshold: 0.6 });
        counters.forEach(el => { el.textContent = '0'; counterObs.observe(el); });
    }

    /* ===== Scroll reveal ===== */
    const reveals = document.querySelectorAll('.reveal');
    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
        reveals.forEach(el => el.classList.add('visible'));
    } else {
        const revealObs = new IntersectionObserver(entries => {
            let i = 0;
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const el = e.target;
                setTimeout(() => el.classList.add('visible'), i++ * 80);
                revealObs.unobserve(el);
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => revealObs.observe(el));
    }

    /* ===== Cursor spotlight on cards ===== */
    document.querySelectorAll('.tile, .project-card, .case, .proj-card').forEach(card => {
        card.addEventListener('pointermove', e => {
            if (e.pointerType !== 'mouse') return;
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
            card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
        });
    });

    /* ===== Navbar state, active links, scroll-to-top ===== */
    const navbar = document.getElementById('navbar');
    const toTop = document.getElementById('scrollToTopButton');
    const sectionLinks = Array.from(document.querySelectorAll('.nav-links a.nav-link[href^="#"]'));
    const sections = sectionLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

    // case-study page: sticky project index
    const caseIndex = document.querySelector('.case-index');
    const caseTrack = caseIndex ? caseIndex.querySelector('.case-index-track') : null;
    const caseLinks = caseIndex ? Array.from(caseIndex.querySelectorAll('a[href^="#"]')) : [];
    const caseTargets = caseLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    let activeCase = null;

    function currentOf(list, offset) {
        let current = null;
        list.forEach(el => { if (el.getBoundingClientRect().top <= offset) current = el; });
        return current;
    }

    function updateOnScroll() {
        const y = window.scrollY;
        if (navbar) navbar.classList.toggle('scrolled', y > 40);
        if (toTop) toTop.classList.toggle('visible', y > 480);

        if (sections.length) {
            const cur = currentOf(sections, 140);
            sectionLinks.forEach(a => a.classList.toggle('active', !!cur && a.getAttribute('href') === `#${cur.id}`));
        }

        if (caseTargets.length) {
            const cur = currentOf(caseTargets, 180);
            const id = cur ? cur.id : null;
            if (id !== activeCase) {
                activeCase = id;
                caseLinks.forEach(a => {
                    const on = a.getAttribute('href') === `#${id}`;
                    a.classList.toggle('active', on);
                    if (on) {
                        a.setAttribute('aria-current', 'true');
                        if (caseTrack) {
                            caseTrack.scrollTo({
                                left: a.offsetLeft - caseTrack.clientWidth / 2 + a.offsetWidth / 2,
                                behavior: reduceMotion.matches ? 'auto' : 'smooth'
                            });
                        }
                    } else {
                        a.removeAttribute('aria-current');
                    }
                });
            }
        }
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => { updateOnScroll(); ticking = false; });
    }, { passive: true });
    updateOnScroll();

    if (toTop) {
        toTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
        });
    }

    /* ===== Mobile menu ===== */
    const menuBtn = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-links');
    const overlay = document.getElementById('nav-overlay');

    function setMenu(open) {
        if (!menuBtn || !navList) return;
        navList.classList.toggle('open', open);
        if (overlay) overlay.classList.toggle('open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) {
            const first = navList.querySelector('a');
            if (first) first.focus();
        }
    }

    if (menuBtn && navList) {
        menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
        navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
        if (overlay) overlay.addEventListener('click', () => setMenu(false));
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
                setMenu(false);
                menuBtn.focus();
            }
        });
        window.matchMedia('(min-width: 861px)').addEventListener?.('change', e => { if (e.matches) setMenu(false); });
    }

    /* ===== Contact form (opens the visitor's mail app) ===== */
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const val = id => (document.getElementById(id)?.value || '').trim();
            const subject = val('subject') || 'Portfolio inquiry';
            const body = `Name: ${val('name')}\nEmail: ${val('email')}\n\nMessage:\n${val('message')}`;
            window.location.href = `mailto:ycseng0398@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }
})();
