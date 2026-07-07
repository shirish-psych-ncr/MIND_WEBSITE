/**
 * Mind Grace Neuropsychiatric Clinic - Booking Page Controller
 * Clinical UX Guardrails: Vestibular-safe, A11y compliant, Focus-trapped.
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================
  // 1. STATE & DOM REFERENCES
  // =========================================
  const formSection = document.getElementById('booking-form-section');
  const qualificationSection = document.getElementById('qualifications');
  const continueBtn = document.getElementById('continue-booking-btn') || 
                      document.getElementById('openBookingForm') ||
                      document.getElementById('heroStartBooking') ||
                      document.querySelector('#qualifications .btn-primary');
  const stickyCTA = document.querySelector('.mobile-sticky-cta');
  const heroSection = document.querySelector('.hero');

  // Check for user's motion preferences (Vestibular Guardrail)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =========================================
  // 2. REVEAL FORM LOGIC WITH ACCESSIBILITY
  // =========================================
  function revealForm() {
    if (!formSection || !qualificationSection) return;
    
    qualificationSection.classList.add('hidden');
    formSection.classList.remove('hidden');
    
    // Announce to screen readers
    announceToScreenReader('Booking form is now visible. Please fill out the secure form below.');
    
    // Smooth scroll with motion preference respect
    formSection.scrollIntoView({ 
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
    
    // Focus first interactive element in form section
    requestAnimationFrame(() => {
      const firstFocusable = formSection.querySelector('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    });
  }

  if (continueBtn) {
    continueBtn.addEventListener('click', revealForm);
    
    // Also support keyboard activation
    continueBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        revealForm();
      }
    });
  }

  // =========================================
  // 3. SMOOTH SCROLL FOR ALL INTERNAL ANCHORS
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or empty
      if (!href || href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({ 
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
        
        // Update URL hash without jumping
        history.pushState(null, '', href);
        
        // Move focus to target for accessibility
        const heading = target.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus({ preventScroll: true });
        }
      }
    });
  });

  // =========================================
  // 4. HIDE STICKY CTA WHEN USER REACHES FOOTER
  // =========================================
  let ticking = false;
  
  function updateStickyCTA() {
    if (!stickyCTA) return;
    
    const footer = document.querySelector('.site-footer');
    if (!footer) return;
    
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const buffer = 80; // Buffer pixels before footer

    if (footerTop < windowHeight + buffer) {
      stickyCTA.style.opacity = '0';
      stickyCTA.style.pointerEvents = 'none';
    } else {
      stickyCTA.style.opacity = '1';
      stickyCTA.style.pointerEvents = 'auto';
    }
    
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateStickyCTA);
      ticking = true;
    }
  }, { passive: true });

  // Initial check
  updateStickyCTA();

  // =========================================
  // 5. HANDLE INITIAL HASH ON PAGE LOAD
  // =========================================
  function handleInitialHash() {
    const hash = window.location.hash;
    if (hash && hash !== '#') {
      const target = document.querySelector(hash);
      if (target) {
        // Delay slightly to ensure page is fully loaded
        setTimeout(() => {
          target.scrollIntoView({ 
            behavior: prefersReducedMotion ? 'auto' : 'auto',
            block: 'start'
          });
        }, 100);
      }
    }
  }

  handleInitialHash();

  // =========================================
  // 6. SCREEN READER ANNOUNCEMENTS
  // =========================================
  function announceToScreenReader(message) {
    let region = document.getElementById('booking-live-region');
    
    if (!region) {
      region = document.createElement('div');
      region.id = 'booking-live-region';
      region.setAttribute('role', 'status');
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      
      // Visually hidden but accessible to screen readers
      Object.assign(region.style, {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0'
      });
      
      document.body.appendChild(region);
    }
    
    // Clear and re-set to force announcement
    region.textContent = '';
    requestAnimationFrame(() => {
      region.textContent = message;
    });
  }

  // =========================================
  // 7. IMAGE LAZY LOADING ENHANCEMENT
  // =========================================
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported - add loading="lazy" to images if not already set
    document.querySelectorAll('img:not([loading])').forEach(img => {
      img.loading = 'lazy';
    });
  } else {
    // Fallback for older browsers using IntersectionObserver
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          img.classList.add('is-loaded');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '50px 0px' });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // =========================================
  // 8. FORM IFAME LOADING STATE
  // =========================================
  const iframe = formSection?.querySelector('iframe');
  if (iframe) {
    iframe.addEventListener('load', () => {
      const wrapper = iframe.closest('.form-wrapper');
      if (wrapper) {
        wrapper.classList.add('is-loaded');
        announceToScreenReader('Secure booking form has loaded successfully.');
      }
    });

    iframe.addEventListener('error', () => {
      const wrapper = iframe.closest('.form-wrapper');
      if (wrapper) {
        wrapper.classList.add('is-error');
        announceToScreenReader('There was an issue loading the booking form. Please try refreshing the page or contact us directly.');
      }
    });
  }
});
