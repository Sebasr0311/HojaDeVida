/* ============================================================
   PORTFOLIO — Juan Sebastian Rincón Farelo
   app.js — Interactions: theme, nav, typewriter, scroll reveal
   ============================================================ */

'use strict';

// ───────────────────────────────────────────────────────
// 1. DARK / LIGHT MODE
// ───────────────────────────────────────────────────────
(function initTheme() {
  const body        = document.body;
  const btn         = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'portfolio-theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
    } else {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
    }
  }

  // Restore saved preference or default dark
  const saved = localStorage.getItem(STORAGE_KEY);
  applyTheme(saved || 'dark');

  btn?.addEventListener('click', () => {
    const isLight = body.classList.contains('light-mode');
    const next    = isLight ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
})();


// ───────────────────────────────────────────────────────
// 2. HAMBURGER MENU
// ───────────────────────────────────────────────────────
(function initHamburger() {
  const btn     = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (!btn || !navMenu) return;

  function closeMenu() {
    btn.classList.remove('open');
    navMenu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('open');
    navMenu.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on nav link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();


// ───────────────────────────────────────────────────────
// 3. TYPEWRITER EFFECT
// ───────────────────────────────────────────────────────
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  // Respect reduced motion: just show static text
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    el.textContent = 'Estudiante de Ingeniería de Sistemas | Desarrollador de Software en formación';
    return;
  }

  const phrases = [
    'Estudiante de Ingeniería de Sistemas',
    'Desarrollador de Software en formación',
    'Tecnólogo en Análisis y Desarrollo de Software',
    'Apasionado por la tecnología y el código',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let isDeleting = false;
  const TYPING_SPEED  = 55;
  const DELETE_SPEED  = 30;
  const PAUSE_END     = 1800;
  const PAUSE_START   = 400;

  function tick() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? DELETE_SPEED : TYPING_SPEED;

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      delay = PAUSE_END;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx  = (phraseIdx + 1) % phrases.length;
      delay = PAUSE_START;
    }

    setTimeout(tick, delay);
  }

  setTimeout(tick, 800);
})();


// ───────────────────────────────────────────────────────
// 4. SCROLL REVEAL (IntersectionObserver)
// ───────────────────────────────────────────────────────
(function initScrollReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const targets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  if (prefersReduced) {
    // Just make everything visible without animation
    targets.forEach(el => el.classList.add('revealed'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
})();


// ───────────────────────────────────────────────────────
// 5. ACTIVE NAV LINK ON SCROLL
// ───────────────────────────────────────────────────────
(function initActiveNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const NAV_H    = 72;

  function updateActive() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= NAV_H + 60) current = sec.id;
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();


// ───────────────────────────────────────────────────────
// 6. NAVBAR SCROLL SHADOW
// ───────────────────────────────────────────────────────
(function initNavShadow() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(0,0,0,.4)'
      : 'none';
  }, { passive: true });
})();
