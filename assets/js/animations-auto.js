/**
 * ============================================
 * ANIMATIONS-AUTO.JS - AutoAnimate Integration
 * Mind Grace Neuropsychiatric Clinic
 * ============================================
 *
 * Applies smooth animations to dynamic content changes.
 * Respects prefers-reduced-motion setting.
 */

(function() {
  'use strict';

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
   */
  function applyAutoAnimate(element) {
    if (typeof autoAnimate === 'undefined') {
      console.warn('AutoAnimate library not loaded');
      return;
    }

    if (prefersReducedMotion()) {
      console.log('Reduced motion preferred, skipping auto-animate');
      return;
    }

    try {
      autoAnimate(element, {
        duration: 300,
        easing: 'ease-out',
        opacity: true,
        scale: true,
        y: 30
      });
      console.log('✓ AutoAnimate applied:', element.id || element.className);
    } catch (error) {
      console.error('Error applying auto-animate:', error);
    }
  }

  /**
   * Initialize auto-animate on target elements
   */
  function initAutoAnimate() {
    const targets = document.querySelectorAll('[data-auto-animate], .animate-list, .animate-grid, .faq-container, .gallery-filter-container, form[data-validate]');

    targets.forEach(element => {
      if (!element._autoAnimated) {
        applyAutoAnimate(element);
        element._autoAnimated = true;
      }
    });
  }

  /**
   * Refresh animations after dynamic content load
   */
  function refreshAnimations() {
    // Remove old markers to re-apply animations
    document.querySelectorAll('[data-auto-animate], .animate-list, .animate-grid, .faq-container, .gallery-filter-container, form[data-validate]').forEach(el => {
      el._autoAnimated = false;
    });
    initAutoAnimate();
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAutoAnimate);
  } else {
    initAutoAnimate();
  }

  // Listen for custom events
  document.addEventListener('animations:refresh', refreshAnimations);
  document.addEventListener('swup:content-replaced', refreshAnimations);
  document.addEventListener('navigo:after', refreshAnimations);

  // Export for external use
  window.AutoAnimation = {
    init: initAutoAnimate,
    refresh: refreshAnimations,
    apply: applyAutoAnimate
  };

})();