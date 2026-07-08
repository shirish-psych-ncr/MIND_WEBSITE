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
  initSmoothScroll();
  initViewportResize();
  initAccordion(domElements);
  initFormValidation(domElements);
  initYearUpdate();

  // ==========================================
  // 1. Mobile Navigation
  // ==========================================
  function initMobileNav(el) {
    const { mobileNavTrigger: trigger, mobileNavPanel: panel, mobileNavOverlay: overlay } = el;
    const closeBtn = panel?.querySelector('.close-mobile-menu');
    const navLinks = panel?.querySelectorAll('a[href]') || [];
    
    if (!trigger || !panel || !overlay) return;
    
    let isOpen = false;
    let previousFocus = null;
    
    const openNav = () => {
      isOpen = true;
      previousFocus = document.activeElement;
      trigger.setAttribute('aria-expanded', 'true');
      panel.classList.add('active');
      overlay.classList.add('active');
      panel.removeAttribute('inert');
      document.body.style.overflow = 'hidden';
      // Focus management - defer to next paint without blocking
      if (closeBtn) {
        Promise.resolve().then(() => closeBtn.focus());
      }
    };
    
    const closeNav = () => {
      if (!isOpen) return;
      isOpen = false;
      trigger.setAttribute('aria-expanded', 'false');
      panel.classList.remove('active');
      overlay.classList.remove('active');
      panel.setAttribute('inert', '');
      document.body.style.overflow = '';
      if (previousFocus) previousFocus.focus();
    };
    
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      isOpen ? closeNav() : openNav();
    });
    
    overlay.addEventListener('click', closeNav);
    closeBtn?.addEventListener('click', closeNav);
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeNav();
      
      // Focus trap
      if (e.key === 'Tab' && isOpen) {
        const focusable = panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
    
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && isOpen) closeNav();
    }, { passive: true });
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
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

  // ==========================================
  // 3. Smooth Scroll for Anchor Links
  // ==========================================
  function initSmoothScroll() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (!target) return;
        
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      });
    });
  }

  // ==========================================
  // 4. Viewport Resize (Fluid Layouts)
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
  // ==========================================
  // 8. Year Update for Footer
  // ==========================================
  function initYearUpdate() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

// ==========================================
// 9. Scroll Progress Bar
// ==========================================
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    lastScrollY = scrollTop;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  // Initial call
  updateProgress();
}

// ==========================================
// 10. Enhanced Smooth Scroll with Offset
// ==========================================
function initSmoothScroll() {
  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.offsetHeight : 0;
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      e.preventDefault();
      
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash without jumping
      history.pushState(null, null, targetId);
      
      // Set focus for accessibility
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: true });
    });
  });
}

// ==========================================
// 11. Orientation Monitor for Mobile
// ==========================================
function initOrientationMonitor() {
  const warning = document.querySelector('.orientation-warning');
  if (!warning) return;

  const mediaQuery = window.matchMedia('(orientation: landscape) and (max-height: 500px)');
  
  const handleOrientationChange = (e) => {
    if (e.matches) {
      warning.classList.add('is-active', 'is-mobile-landscape');
      document.body.style.overflow = 'hidden';
    } else {
      warning.classList.remove('is-active', 'is-mobile-landscape');
      document.body.style.overflow = '';
    }
  };

  // Initial check
  handleOrientationChange(mediaQuery);

  // Listen for changes
  mediaQuery.addEventListener('change', handleOrientationChange);
}

// ==========================================
// 12. Dynamic Open Graph Meta Tags
// ==========================================
function initOpenGraphMeta() {
  const defaultImage = '/assets/images/og-default.jpg';
  const defaultTitle = 'Mind Grace Neuropsychiatric Clinic';
  const defaultDescription = 'Compassionate, evidence-based neuropsychiatric care in India. Specialized treatment for anxiety, depression, ADHD, and more.';
  
  // Get page-specific content
  const pageTitle = document.title.split('|')[0].trim() || defaultTitle;
  const pageDescription = document.querySelector('meta[name="description"]')?.content || defaultDescription;
  const canonicalUrl = document.querySelector('link[rel="canonical"]')?.href || window.location.href;
  
  // Create or update OG tags
  const ogTags = [
    { property: 'og:title', content: pageTitle + ' | Mind Grace Neuropsychiatric Clinic' },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: defaultImage },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'en_IN' },
    { property: 'og:site_name', content: 'Mind Grace Neuropsychiatric Clinic' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle + ' | Mind Grace' },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: defaultImage }
  ];

  ogTags.forEach(tag => {
    let existing;
    if (tag.property) {
      existing = document.querySelector(`meta[property="${tag.property}"]`);
    } else if (tag.name) {
      existing = document.querySelector(`meta[name="${tag.name}"]`);
    }

    if (!existing) {
      const meta = document.createElement('meta');
      if (tag.property) meta.setAttribute('property', tag.property);
      if (tag.name) meta.setAttribute('name', tag.name);
      meta.setAttribute('content', tag.content);
      document.head.appendChild(meta);
    } else {
      existing.setAttribute('content', tag.content);
    }
  });
}

// ==========================================
// 13. Network Status Monitoring
// ==========================================
function initNetworkStatus() {
  const toast = document.createElement('div');
  toast.id = 'network-status';
  toast.className = 'network-status';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `
    <span class="network-status-icon">📡</span>
    <span class="network-status-message">You're offline. Some features may be unavailable.</span>
  `;
  document.body.appendChild(toast);

  const updateStatus = () => {
    if (navigator.onLine) {
      toast.classList.remove('is-offline');
      toast.classList.add('is-online');
    } else {
      toast.classList.remove('is-online');
      toast.classList.add('is-offline');
    }
  };

  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  
  // Initial check
  updateStatus();
}

// ==========================================
// 14. Error Boundary for Production Resilience
// ==========================================
function initErrorBoundary() {
  window.addEventListener('error', (event) => {
    console.error('[Mind Grace Error]', event.message, event.filename, event.lineno);
    
    // In production, you could send this to a monitoring service
    // For now, we just log it and prevent total failure
    if (window.location.hostname !== 'localhost') {
      // Silent fail in production - don't show errors to users
      event.preventDefault();
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('[Mind Grace Unhandled Promise]', event.reason);
    if (window.location.hostname !== 'localhost') {
      event.preventDefault();
    }
  });
}

// ==========================================
// 14. Skip Link Enhancement
// ==========================================
function initSkipLink() {
  const skipLink = document.querySelector('.skip-link');
  const mainContent = document.getElementById('main-content');
  
  if (!skipLink || !mainContent) return;

  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    mainContent.setAttribute('tabindex', '-1');
    mainContent.focus({ preventScroll: true });
    
    // Remove tabindex after focus to avoid it being in tab order
    mainContent.addEventListener('blur', () => {
      mainContent.removeAttribute('tabindex');
    }, { once: true });
  });
}

// ==========================================
// BOOTSTRAP - Initialize All Modules
// ==========================================
(function bootstrap() {
  try {
    initOrientationMonitor();
    initNetworkStatus();
    initOpenGraphMeta();
    initErrorBoundary();
    initSkipLink();
    initScrollProgress();
    
    console.log('[Mind Grace] All modules initialized successfully');
  } catch (error) {
    console.error('[Mind Grace Bootstrap Error]', error);
  }
})();
