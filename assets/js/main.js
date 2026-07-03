/**
 * ============================================
 * MAIN.JS - Optimized Interaction Scripts
 * Mind Grace Neuropsychiatric Clinic - Modern Fluid Design
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // Batch DOM reads to prevent layout thrashing
  const domElements = {
    mobileNavTrigger: document.querySelector('.mobile-nav-trigger'),
    mobileNavPanel: document.getElementById('mobile-nav-panel'),
    mobileNavOverlay: document.getElementById('mobile-nav-overlay'),
    siteHeader: document.querySelector('.site-header'),
    reveals: document.querySelectorAll('.reveal'),
    accordionTriggers: document.querySelectorAll('[data-accordion-trigger]'),
    forms: document.querySelectorAll('form[novalidate]'),
    counters: document.querySelectorAll('.stat-number')
  };
  
  // Initialize all modules with batched DOM access
  initMobileNav(domElements);
  initHeaderScroll(domElements);
  initViewportResize();
  initAccordion(domElements);
  initFormValidation(domElements);

  // ==========================================
  // 1. Mobile Navigation
  // ==========================================
  function initMobileNav(el) {
    const { mobileNavTrigger: trigger, mobileNavPanel: panel, mobileNavOverlay: overlay } = el;
    const closeBtn = panel?.querySelector('.close-mobile-menu');
    const navLinks = panel?.querySelectorAll('a[href]') || [];
    
    if (!trigger || !panel || !overlay) return;
    
    let isOpen = false;
    
    const openNav = () => {
      isOpen = true;
      trigger.setAttribute('aria-expanded', 'true');
      panel.classList.add('active');
      overlay.classList.add('active');
      panel.removeAttribute('inert');
      document.body.style.overflow = 'hidden';
      // Focus management
      requestAnimationFrame(() => {
        setTimeout(() => navLinks[0]?.focus(), 50);
      });
    };
    
    const closeNav = () => {
      if (!isOpen) return;
      isOpen = false;
      trigger.setAttribute('aria-expanded', 'false');
      panel.classList.remove('active');
      overlay.classList.remove('active');
      panel.setAttribute('inert', '');
      document.body.style.overflow = '';
      trigger.focus();
    };
    
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      isOpen ? closeNav() : openNav();
    });
    
    overlay.addEventListener('click', closeNav);
    closeBtn?.addEventListener('click', closeNav);
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeNav();
    });
    
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && isOpen) closeNav();
    }, { passive: true });
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => { // Fixed: passed 'e' into callback
        const href = link.getAttribute('href');
        if (!href || href === '#' || href.startsWith('#')) {
          e.preventDefault();
        }
        closeNav();
      });
    });
  }

  // ==========================================
  // 2. Header Scroll Effect
  // ==========================================
  function initHeaderScroll(el) {
    const { siteHeader: header } = el;
    if (!header) return;
    
    let ticking = false;
    const updateScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
      ticking = false;
    };
    
    // Set initial state
    updateScroll();
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  // ==========================================
  // 3. Viewport Resize (Fluid Layouts)
  // ==========================================
  function initViewportResize() {
    let ticking = false;
    const updateViewport = () => {
      document.documentElement.style.setProperty('--vw', `${window.innerWidth}px`);
      document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
      ticking = false;
    };
    
    updateViewport();
    
    const onResize = () => {
      if (!ticking) {
        requestAnimationFrame(updateViewport);
        ticking = true;
      }
    };

    window.addEventListener('resize', onResize, { passive: true });
    window.visualViewport?.addEventListener('resize', onResize, { passive: true });
  }

  // ==========================================
  // 5. Accordion Functionality
  // ==========================================
  function initAccordion(el) {
    const { accordionTriggers: triggers } = el;
    
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        const panelId = trigger.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        
        // Close all triggers (Classic Accordion behavior)
        triggers.forEach(t => {
          t.setAttribute('aria-expanded', 'false');
          const p = document.getElementById(t.getAttribute('aria-controls'));
          if (p) p.hidden = true;
        });
        
        // Open the clicked one if it wasn't already expanded
        if (!expanded && panel) {
          trigger.setAttribute('aria-expanded', 'true');
          panel.hidden = false;
        }
      });
    });
  }

  // ==========================================
  // 6. Form Validation Enhancements
  // ==========================================
  function initFormValidation(el) {
    const { forms } = el;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // Batch read required fields
        const requiredFields = Array.from(form.querySelectorAll('[required]'));
        const fieldStates = new Map();
        
        // First pass: collect all field states (batched read)
        requiredFields.forEach(field => {
          const value = field.value.trim();
          const isEmail = field.type === 'email';
          fieldStates.set(field, { value, isEmail, isValid: true });
        });
        
        // Second pass: validate all fields (batched write)
        requiredFields.forEach(field => {
          const state = fieldStates.get(field);
          let fieldIsValid = true;
          
          if (!state.value) {
            fieldIsValid = false;
          } else if (state.isEmail && !emailRegex.test(state.value)) {
            fieldIsValid = false;
          }
          
          if (!fieldIsValid) {
            isValid = false;
            field.classList.add('error');
            
            if (!field.parentNode.querySelector('.error-message')) {
              const errorMsg = document.createElement('span');
              errorMsg.className = 'error-message';
              errorMsg.textContent = state.isEmail && state.value
                ? 'Please enter a valid email'
                : 'This field is required';
              errorMsg.style.cssText = 'color: var(--error); font-size: 0.75rem; margin-top: var(--space-xs); display: block;';
              field.parentNode.appendChild(errorMsg);
            }
          } else {
            field.classList.remove('error');
            field.parentNode.querySelector('.error-message')?.remove();
          }
        });
        
        if (isValid) {
          console.log('Form submitted successfully');
          // form.submit(); // Uncomment for production
        }
      });
      
      form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', () => {
          field.classList.remove('error');
          field.parentNode.querySelector('.error-message')?.remove();
        });
      });
    });
  }

  // ==========================================
  // 7. Number Counter Animation (rAF Optimized)
  // ==========================================
  function initCounters(el) {
    const { counters } = el;
    if (!counters.length || !('IntersectionObserver' in window)) return;
  
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'), 10) || 100;
          const duration = 2000; // 2 seconds total animation time
          let startTime = null;
          
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // easeOutQuart for a natural slowing down effect
            const easeProgress = 1 - Math.pow(1 - progress, 4); 
            const current = Math.floor(easeProgress * target);
            
            counter.innerText = current + '+';
            
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              counter.innerText = target + '+';
            }
          };
          
          requestAnimationFrame(step);
          obs.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
  
    counters.forEach(counter => observer.observe(counter));
  }
});