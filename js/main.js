/* ============================================
   MAIN.JS - Minimal Interaction Scripts
   Mind Grace Clinic - Modern Fluid Design
   ============================================ */

// Mobile Navigation - Simplified
(function initMobileNav() {
  const trigger = document.querySelector('.mobile-nav-trigger');
  const panel = document.getElementById('mobile-nav-panel');
  const overlay = document.getElementById('mobile-nav-overlay');
  const closeBtn = panel?.querySelector('.close-mobile-menu');
  const navLinks = panel?.querySelectorAll('a[href]') || [];
  
  if (!trigger || !panel || !overlay) return;
  
  let isOpen = false;
  
  function openNav() {
    isOpen = true;
    trigger.setAttribute('aria-expanded', 'true');
    panel.classList.add('active');
    overlay.classList.add('active');
    panel.removeAttribute('inert');
    document.body.style.overflow = 'hidden';
    setTimeout(() => navLinks[0]?.focus(), 100);
  }
  
  function closeNav() {
    if (!isOpen) return;
    isOpen = false;
    trigger.setAttribute('aria-expanded', 'false');
    panel.classList.remove('active');
    overlay.classList.remove('active');
    panel.setAttribute('inert', '');
    document.body.style.overflow = '';
    setTimeout(() => trigger.focus(), 50);
  }
  
  // Toggle
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    isOpen ? closeNav() : openNav();
  });
  
  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeNav();
  });
  
  // Close button
  closeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeNav();
  });
  
  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      closeNav();
    }
  });
  
  // Close on desktop resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && isOpen) closeNav();
  }, { passive: true });
  
  // Close on link click (allow navigation)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.startsWith('#')) {
        event?.preventDefault();
      }
      closeNav();
    });
  });
})();

// Header Scroll Effect
(function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  
  let ticking = false;
  function updateScroll() {
    header.classList.toggle('scrolled', window.scrollY > 50);
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });
})();

// Viewport resize handler for fluid layouts
(function initViewportResize() {
  function updateViewport() {
    document.documentElement.style.setProperty('--vw', `${window.innerWidth}px`);
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
  }
  
  updateViewport();
  window.addEventListener('resize', updateViewport, { passive: true });
  window.visualViewport?.addEventListener('resize', updateViewport, { passive: true });
})();

// Reveal animations on scroll (progressive enhancement)
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length || !('IntersectionObserver' in window)) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  reveals.forEach(el => observer.observe(el));
})();
