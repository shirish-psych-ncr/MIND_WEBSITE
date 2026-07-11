/**
 * ============================================
 * ICON-INIT.JS - Lucide Icons Initialization
 * Mind Grace Neuropsychiatric Clinic
 * ============================================
 *
 * Initializes Lucide icons across the site.
 * Handles re-initialization after dynamic content loads.
 */

(function() {
  'use strict';

  /**
   * Initialize Lucide icons
   * @param {Object} options - Lucide createIcons options
   */
  function initIcons(options = {}) {
    // Check if Lucide is loaded
    if (typeof lucide === 'undefined') {
      console.warn('Lucide library not loaded yet, waiting...');
      setTimeout(() => initIcons(options), 100);
      return;
    }

    try {
      lucide.createIcons(options);
      console.log('✓ Lucide icons initialized');
    } catch (error) {
      console.error('Error initializing Lucide icons:', error);
    }
  }

  /**
   * Re-initialize icons after page transitions or dynamic content
   */
  function refreshIcons() {
    initIcons();
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initIcons());
  } else {
    initIcons();
  }

  // Listen for custom events that may require icon refresh
  document.addEventListener('icons:refresh', refreshIcons);

  // Export for external use
  window.IconInit = {
    init: initIcons,
    refresh: refreshIcons
  };

})();