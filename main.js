/* ═══════════════════════════════════════════════════
   STEELBRIDGE MANUFACTURING — main.js
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Navbar: scroll state ── */
  const header = document.getElementById('header');

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ── Hamburger / mobile menu ── */
  const toggle  = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    navMenu.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on nav link click
  navMenu.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!header.contains(e.target)) {
      toggle.classList.remove('open');
      navMenu.classList.remove('open');
    }
  });

  /* ── Active nav link on scroll ── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-item');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id     = section.id;
      const link   = document.querySelector(`.nav-item[href="#${id}"]`);
      if (link && scrollY >= top && scrollY < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ── Scroll-reveal animation ── */
  const revealTargets = [
    '.about-img-col',
    '.about-text-col',
    '.svc-card',
    '.gal-item',
    '.vid-item',
    '.contact-left',
    '.contact-form',
    '.section-header',
  ];

  const allRevealEls = document.querySelectorAll(revealTargets.join(','));

  allRevealEls.forEach(el => {
    if (!el.closest('.hero')) el.classList.add('reveal');
  });

  // Stagger cards in a grid
  function staggerCards(selector, delay = 80) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.transitionDelay = `${i * delay}ms`;
    });
  }
  staggerCards('.svc-card', 70);
  staggerCards('.gal-item', 60);
  staggerCards('.vid-item', 70);

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Contact form ── */
  const form   = document.getElementById('contact-form');
  const cfNote = document.getElementById('cf-note');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      setTimeout(() => {
        cfNote.textContent = '✓ Message received! We\'ll reply within one business day.';
        cfNote.style.color = '#16a34a';
        submitBtn.textContent = 'Message Sent ✓';
        submitBtn.style.background = '#15803d';
        submitBtn.style.borderColor = '#15803d';

        form.querySelectorAll('input, select, textarea').forEach(el => {
          el.value = '';
        });
      }, 1000);
    });
  }

  /* ── Smooth scroll with offset ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
    });
  });

})();
