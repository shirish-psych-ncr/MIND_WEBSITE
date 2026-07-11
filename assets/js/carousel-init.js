/**
 * ============================================
 * CAROUSEL-INIT.JS - Splide Carousel Initialization
 * Mind Grace Neuropsychiatric Clinic
 * ============================================
 *
 * Initializes Splide carousels for galleries, doctors, and testimonials.
 * Handles re-initialization after page transitions.
 */

(function() {
  'use strict';

  /**
   * Default carousel options
   */
  const defaultOptions = {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    focus: 'center',
    autoplay: true,
    interval: 4000,
    pauseOnHover: true,
    pauseOnFocus: true,
    rewind: true,
    arrows: true,
    pagination: true,
    drag: true,
    snap: true,
    lazyLoad: 'nearby',
    breakpoints: {
      640: {
        perPage: 1,
        arrows: false,
        pagination: true
      },
      768: {
        perPage: 2,
        arrows: true,
        pagination: true
      },
      1024: {
        perPage: 3,
        arrows: true,
        pagination: true
      }
    }
  };

  /**
   * Initialize a single carousel
   * @param {HTMLElement} element - The carousel container
   * @param {Object} options - Carousel options
   * @returns {Splide|null}
   */
  function initCarousel(element, options = {}) {
    /* global Splide */
    if (typeof Splide === 'undefined') {
      console.warn('Splide library not loaded yet');
      return null;
    }

    try {
      const mergedOptions = { ...defaultOptions, ...options };
      const splide = new Splide(element, mergedOptions);
      splide.mount();
      console.log('✓ Carousel initialized:', element.id || 'unnamed');
      return splide;
    } catch (error) {
      console.error('Error initializing carousel:', error);
      return null;
    }
  }

  /**
   * Initialize all carousels on the page
   * @returns {Array} Array of Splide instances
   */
  function initAllCarousels() {
    if (typeof Splide === 'undefined') {
      console.warn('Splide library not loaded, retrying...');
      setTimeout(initAllCarousels, 100);
      return [];
    }

    const carousels = [];
    const selectors = [
      '.splide',
      '.gallery-carousel',
      '.doctor-carousel',
      '.testimonial-carousel',
      '[data-splide]'
    ];

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        const options = parseOptions(element);
        const splide = initCarousel(element, options);
        if (splide) {
          carousels.push(splide);
        }
      });
    });

    console.log(`✓ Initialized ${carousels.length} carousels`);
    return carousels;
  }

  /**
   * Parse data attributes for carousel options
   * @param {HTMLElement} element
   * @returns {Object}
   */
  function parseOptions(element) {
    const options = {};

    if (element.dataset.splideType) options.type = element.dataset.splideType;
    if (element.dataset.splidePerpage) options.perPage = parseInt(element.dataset.splidePerpage, 10);
    if (element.dataset.splideAutoplay) options.autoplay = element.dataset.splideAutoplay === 'true';
    if (element.dataset.splideInterval) options.interval = parseInt(element.dataset.splideInterval, 10);
    if (element.dataset.splideArrows) options.arrows = element.dataset.splideArrows === 'true';
    if (element.dataset.splidePagination) options.pagination = element.dataset.splidePagination === 'true';

    return options;
  }

  /**
   * Destroy all carousels (for page transitions)
   * @param {Array} carousels - Array of Splide instances
   */
  function destroyCarousels(carousels) {
    carousels.forEach(splide => {
      if (splide && splide.destroy) {
        splide.destroy();
      }
    });
    console.log('✓ Carousels destroyed');
  }

  // Store carousel instances
  let carouselInstances = [];

  /**
   * Refresh carousels after dynamic content load
   */
  function refreshCarousels() {
    destroyCarousels(carouselInstances);
    carouselInstances = initAllCarousels();
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      carouselInstances = initAllCarousels();
    });
  } else {
    carouselInstances = initAllCarousels();
  }

  // Listen for custom events
  document.addEventListener('carousel:refresh', refreshCarousels);
  document.addEventListener('swup:content-replaced', refreshCarousels);
  document.addEventListener('navigo:after', refreshCarousels);

  // Export for external use
  window.CarouselInit = {
    init: initCarousel,
    initAll: initAllCarousels,
    refresh: refreshCarousels,
    destroy: destroyCarousels
  };

})();