/**
 * ============================================
 * ANIMATIONS-AUTO.JS - AutoAnimate Integration
 * Mind Grace Neuropsychiatric Clinic
 * ============================================
 * Applies smooth animations to dynamic content changes.
 * Strictly respects prefers-reduced-motion setting.
 * Optimized for performance (idle initialization) and memory safety.
 */
(function () {
  'use strict';

  // Cache selector string for performance
  const TARGET_SELECTOR = '[data-auto-animate], .animate-list, .animate-grid, .faq-container, .gallery-filter-container, form[data-validate]';

  /**
   * Check if reduced motion is preferred
   * @returns {boolean}
   */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Apply auto-animate to an element
   * @param {HTMLElement} element
   * @returns {Function|null} Cleanup function to prevent memory leaks
   */
  function applyAutoAnimate(element) {
    if (typeof autoAnimate === 'undefined') {
      console.warn('[AutoAnimate] Library not loaded yet.');
      return null;
    }

    // Clinical Guardrail: Respect vestibular sensitivities
    if (prefersReducedMotion()) {
      // Apply with 0 duration so DOM mutations still track correctly 
      // without triggering visual motion that could cause nausea/dizziness
      return autoAnimate(element, { duration: 0, easing: 'linear' });
    }

    try {
      const cleanup = autoAnimate(element, {
        duration: 300,
        easing: 'ease-out',
        opacity: true,
        scale: true,
        y: 30
      });
      console.log('[AutoAnimate] ✓ Applied to:', element.id || element.className);
      return cleanup;
    } catch (error) {
      console.error('[AutoAnimate] Error applying:', error);
      return null;
    }
  }

  /**
   * Initialize auto-animate on target elements
   */
  function initAutoAnimate() {
    if (typeof autoAnimate === 'undefined') return;

    const targets = document.querySelectorAll(TARGET_SELECTOR);
    targets.forEach(element => {
      // Prevent double-initialization
      if (!element._autoAnimateCleanup) {
        element._autoAnimateCleanup = applyAutoAnimate(element);
      }
    });
  }

  /**
   * Refresh animations after dynamic content load (SPA/HTMX)
   */
  function refreshAnimations() {
    // 1. Clean up old instances to prevent memory leaks and duplicate listeners
    document.querySelectorAll(TARGET_SELECTOR).forEach(el => {
      if (typeof el._autoAnimateCleanup === 'function') {
        el._autoAnimateCleanup();
      }
      el._autoAnimateCleanup = null;
    });
    
    // 2. Re-initialize for new DOM nodes
    initAutoAnimate();
  }

  /**
   * Defer initialization to prevent blocking the main thread (Lighthouse TBT fix)
   */
  function deferInit() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(initAutoAnimate, { timeout: 2000 });
    } else {
      setTimeout(initAutoAnimate, 300);
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', deferInit);
  } else {
    deferInit();
  }

  // Listen for custom events (SPA transitions)
  document.addEventListener('animations:refresh', refreshAnimations);
  document.addEventListener('swup:content-replaced', refreshAnimations);
  document.addEventListener('navigo:after', refreshAnimations);
  
  // HTMX specific events (since htmx.min.js is in the stack)
  document.addEventListener('htmx:afterSettle', refreshAnimations);
  document.addEventListener('htmx:load', refreshAnimations);

  // Export for external use
  window.AutoAnimation = {
    init: initAutoAnimate,
    refresh: refreshAnimations,
    apply: applyAutoAnimate
  };
})();