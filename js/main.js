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

/* ============================================
   ACCORDION FUNCTIONALITY
   For FAQ and Process pages
   ============================================ */
(function initAccordion() {
  const triggers = document.querySelectorAll('[data-accordion-trigger]');
  
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      
      // Close all accordions (optional - for accordion behavior)
      // Remove this block if you want multiple panels open
      document.querySelectorAll('[data-accordion-trigger]').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        const p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) p.hidden = true;
      });
      
      // Toggle current
      if (!expanded && panel) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
      }
    });
  });
})();

/* ============================================
   FORM VALIDATION ENHANCEMENTS
   For contact and booking forms
   ============================================ */
(function initFormValidation() {
  const forms = document.querySelectorAll('form[novalidate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const requiredFields = this.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          // Add error message if not present
          if (!field.parentNode.querySelector('.error-message')) {
            const errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'This field is required';
            errorMsg.style.color = 'var(--error)';
            errorMsg.style.fontSize = '0.75rem';
            errorMsg.style.marginTop = 'var(--space-xs)';
            errorMsg.style.display = 'block';
            field.parentNode.appendChild(errorMsg);
          }
        } else {
          field.classList.remove('error');
          const existingError = field.parentNode.querySelector('.error-message');
          if (existingError) existingError.remove();
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value)) {
            isValid = false;
            field.classList.add('error');
          }
        }
      });
      
      if (isValid) {
        // Form is valid - in production, this would submit
        console.log('Form submitted successfully');
      }
    });
    
    // Clear errors on input
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) existingError.remove();
      });
    });
  });
})();
