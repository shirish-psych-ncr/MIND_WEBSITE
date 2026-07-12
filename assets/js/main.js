/**
 * Mind Grace Neuropsychiatric Clinic - Main JavaScript Module
 * Optimized for 2026 Web Standards
 * Features: Core Web Vitals, WCAG 2.2 Accessibility, PWA Ready
 */

// RAF-throttled scroll handler for performance
function _initScrollProgress() {
  const progress = document.querySelector('.scroll-progress');
  if (!progress) return;
  
  let ticking = false;
  const updateProgress = () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = max > 0 ? (scrolled / max) * 100 : 0;
    progress.style.width = `${Math.min(percentage, 100)}%`;
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
  
  updateProgress();
}

// Orientation adapter for mobile layouts
function _initOrientationAdapter() {
  if (!document.getElementById('orientation-adapter')) return;
  
  const mediaQuery = window.matchMedia('(orientation: landscape) and (max-height: 500px)');
  const handleOrientation = (e) => {
    const event = new CustomEvent('orientationchange', { detail: { isLandscape: e.matches } });
    window.dispatchEvent(event);
    
    if (e.matches) {
      document.body.classList.add('is-landscape-mobile');
      document.body.classList.remove('is-portrait-mobile');
    } else {
      document.body.classList.add('is-portrait-mobile');
      document.body.classList.remove('is-landscape-mobile');
    }
  };
  
  handleOrientation(mediaQuery);
  mediaQuery.addEventListener('change', handleOrientation);
}

// OpenGraph meta tags initialization
function initOpenGraphMeta() {
  const defaultImage = '/assets/images/og-default.jpg';
  const pageTitle = document.title.split('|')[0].trim() || 'Mind Grace Neuropsychiatric Clinic';
  const description = document.querySelector('meta[name="description"]')?.content || 
    'Compassionate, evidence-based neuropsychiatric care in India.';
  
  const metaTags = [
    { property: 'og:title', content: `${pageTitle} | Mind Grace Neuropsychiatric Clinic` },
    { property: 'og:description', content: description },
    { property: 'og:image', content: defaultImage },
    { property: 'og:url', content: document.querySelector('link[rel="canonical"]')?.href || window.location.href },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'en_IN' },
    { property: 'og:site_name', content: 'Mind Grace Neuropsychiatric Clinic' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${pageTitle} | Mind Grace` },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: defaultImage }
  ];
  
  metaTags.forEach(meta => {
    let element;
    if (meta.property) {
      element = document.querySelector(`meta[property="${meta.property}"]`);
    } else if (meta.name) {
      element = document.querySelector(`meta[name="${meta.name}"]`);
    }
    
    if (element) {
      element.setAttribute('content', meta.content);
    } else {
      const newMeta = document.createElement('meta');
      if (meta.property) newMeta.setAttribute('property', meta.property);
      if (meta.name) newMeta.setAttribute('name', meta.name);
      newMeta.setAttribute('content', meta.content);
      document.head.appendChild(newMeta);
    }
  });
}

// Network status indicator
function initNetworkStatus() {
  if (!document.body) {
    console.warn('[Mind Grace] Body not ready for network status');
    return;
  }
  
  if (document.getElementById('network-status')) return;
  
  const statusEl = document.createElement('div');
  statusEl.id = 'network-status';
  statusEl.className = 'network-status';
  statusEl.setAttribute('role', 'alert');
  statusEl.setAttribute('aria-live', 'polite');
  statusEl.innerHTML = `
    <span class="network-status-icon">📡</span>
    <span class="network-status-message">You're offline. Some features may be unavailable.</span>
  `;
  document.body.appendChild(statusEl);
  
  const updateStatus = () => {
    if (navigator.onLine) {
      statusEl.classList.remove('is-offline');
      statusEl.classList.add('is-online');
    } else {
      statusEl.classList.remove('is-online');
      statusEl.classList.add('is-offline');
    }
  };
  
  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus();
}

// Global error boundary
function initErrorBoundary() {
  window.addEventListener('error', (e) => {
    console.error('[Mind Grace Error]', e.message, e.filename, e.lineno);
    if (window.location.hostname !== 'localhost') {
      e.preventDefault();
    }
  });
  
  window.addEventListener('unhandledrejection', (e) => {
    console.error('[Mind Grace Unhandled Promise]', e.reason);
    if (window.location.hostname !== 'localhost') {
      e.preventDefault();
    }
  });
}

// Skip link functionality
function initSkipLink() {
  const skipLink = document.querySelector('.skip-link');
  const mainContent = document.getElementById('main-content');
  
  if (skipLink && mainContent) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus({ preventScroll: true });
      mainContent.addEventListener('blur', () => {
        mainContent.removeAttribute('tabindex');
      }, { once: true });
    });
  }
}

// Burger Menu with sleek dropdown - visible on ALL screens
function initBurgerMenu() {
  const burgerBtn = document.getElementById('burgerMenuBtn');
  const navDropdown = document.getElementById('navDropdown');
  
  if (!burgerBtn || !navDropdown) return;
  
  let isOpen = false;
  let lastFocusedElement = null;
  const navLinks = navDropdown.querySelectorAll('a[href]');
  
  // Close menu function
  const closeMenu = () => {
    if (!isOpen) return;
    isOpen = false;
    burgerBtn.classList.remove('burger-btn--active');
    navDropdown.classList.remove('nav-dropdown--active');
    navDropdown.setAttribute('inert', '');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    
    // Restore focus to burger button
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };
  
  // Open menu function
  const openMenu = () => {
    if (isOpen) return;
    isOpen = true;
    lastFocusedElement = document.activeElement;
    burgerBtn.classList.add('burger-btn--active');
    navDropdown.classList.add('nav-dropdown--active');
    navDropdown.removeAttribute('inert');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = '';
    
    // Focus first link after animation
    setTimeout(() => {
      if (navLinks.length > 0) {
        navLinks[0].focus();
      }
    }, 300);
  };
  
  // Toggle menu on burger click
  burgerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  
  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (isOpen && !navDropdown.contains(e.target) && !burgerBtn.contains(e.target)) {
      closeMenu();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
      burgerBtn.focus();
    }
    
    // Focus trap within dropdown
    if (e.key === 'Tab' && isOpen) {
      const firstLink = navLinks[0];
      const lastLink = navLinks[navLinks.length - 1];
      
      if (e.shiftKey && document.activeElement === firstLink) {
        e.preventDefault();
        lastLink.focus();
      } else if (!e.shiftKey && document.activeElement === lastLink) {
        e.preventDefault();
        firstLink.focus();
      }
    }
  });
  
  // Close when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
  
  // Handle resize
  window.addEventListener('resize', () => {
    if (isOpen) {
      closeMenu();
    }
  }, { passive: true });
}

// Header scroll state with RAF throttling
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  
  let ticking = false;
  
  const updateHeader = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 50);
    ticking = false;
  };
  
  updateHeader();
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
}

// Smooth scroll for anchor links with reduced motion support
function initSmoothScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Dynamic viewport units
function initDynamicViewport() {
  let ticking = false;
  
  const setViewportUnits = () => {
    document.documentElement.style.setProperty('--vw', `${window.innerWidth}px`);
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    ticking = false;
  };
  
  setViewportUnits();
  
  const updateOnResize = () => {
    if (!ticking) {
      requestAnimationFrame(setViewportUnits);
      ticking = true;
    }
  };
  
  window.addEventListener('resize', updateOnResize, { passive: true });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', updateOnResize, { passive: true });
  }
}

// Accordion functionality
function initAccordions(accordionTriggers) {
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const controlsId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(controlsId);
      
      // Close all accordions
      accordionTriggers.forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        const panelToClose = document.getElementById(t.getAttribute('aria-controls'));
        if (panelToClose) panelToClose.hidden = true;
      });
      
      // Open clicked accordion if it wasn't already open
      if (!isExpanded && panel) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
      }
    });
  });
}

// Form validation
function initForms(forms) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      const requiredFields = Array.from(form.querySelectorAll('[required]'));
      const fieldData = new Map();
      
      // Collect field data
      requiredFields.forEach(field => {
        const value = field.value.trim();
        const isEmail = field.type === 'email';
        fieldData.set(field, { value, isEmail, isValid: true });
      });
      
      // Validate fields
      requiredFields.forEach(field => {
        const data = fieldData.get(field);
        let fieldValid = true;
        
        if (data.value) {
          if (data.isEmail && !emailRegex.test(data.value)) {
            fieldValid = false;
          }
        } else {
          fieldValid = false;
        }
        
        if (fieldValid) {
          field.classList.remove('error');
          const errorMsg = field.parentNode.querySelector('.error-message');
          if (errorMsg) errorMsg.remove();
        } else {
          isValid = false;
          field.classList.add('error');
          
          if (!field.parentNode.querySelector('.error-message')) {
            const errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            errorMsg.textContent = data.isEmail && data.value 
              ? 'Please enter a valid email' 
              : 'This field is required';
            errorMsg.style.cssText = 'color: var(--color-error); font-size: 0.75rem; margin-top: var(--space-xs); display: block;';
            field.parentNode.appendChild(errorMsg);
          }
        }
      });
      
      if (isValid) {
        console.log('Form submitted successfully');
        // form.submit(); // Uncomment for production
      }
    });
    
    // Clear errors on input
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('error');
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
      });
    });
  });
}

// Counter animations with Intersection Observer
function initCounters(counters) {
  if (!counters.length || !('IntersectionObserver' in window)) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'), 10) || 100;
        const duration = 2000;
        let startTime = null;
        
        const animate = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(easeOutQuart * target);
          counter.innerText = `${current}+`;
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            counter.innerText = `${target}+`;
          }
        };
        
        requestAnimationFrame(animate);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// Update footer year
function updateFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// Initialize all modules on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    burgerMenuBtn: document.getElementById('burgerMenuBtn'),
    navDropdown: document.getElementById('navDropdown'),
    siteHeader: document.querySelector('.site-header'),
    reveals: document.querySelectorAll('.reveal'),
    accordionTriggers: document.querySelectorAll('[data-accordion-trigger]'),
    forms: document.querySelectorAll('form[novalidate]'),
    counters: document.querySelectorAll('.stat-number')
  };
  
  // Initialize burger menu
  initBurgerMenu();
  
  // Initialize header scroll
  initHeaderScroll();
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Initialize dynamic viewport
  initDynamicViewport();
  
  // Initialize accordions
  initAccordions(elements.accordionTriggers);
  
  // Initialize forms
  initForms(elements.forms);
  
  // Update footer year
  updateFooterYear();
  
  // Initialize counters
  initCounters(elements.counters);
});

// Bootstrap all modules
(function bootstrap() {
  try {
    _initOrientationAdapter();
    initNetworkStatus();
    initOpenGraphMeta();
    initErrorBoundary();
    initSkipLink();
    _initScrollProgress();
    console.log('[Mind Grace] All modules initialized successfully');
  } catch (error) {
    console.error('[Mind Grace Bootstrap Error]', error);
  }
})();
