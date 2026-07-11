/**
 * ============================================
 * PAGE-TRANSITIONS.JS - Swup + Animations
 * Mind Grace Neuropsychiatric Clinic
 * ============================================
 *
 * Implements smooth page transitions with Swup,
 * enter/move/leave animations using Motion One,
 * and AutoAnimate for DOM updates.
 */

(function() {
  'use strict';

  // Check if required libraries are loaded
  if (typeof Swup === 'undefined') {
    console.warn('Swup library not loaded, transitions disabled');
    return;
  }

  /**
   * Initialize Swup with custom plugins and animation handlers
   */
  function initSwup() {
    const swup = new Swup({
      containers: ['#swup-container', 'main', '.page-content'],
      animateHistoryBrowsing: true,
      linkSelector: 'a[href^="/"]:not([data-no-swup]):not([target="_blank"]):not([download])',
      cache: true,
      skipPopStateHandling: () => false,
      requestAnimation: () => new Promise(resolve => resolve()),
      popstateHandler: true
    });

    // Register animation handlers
    swup.hooks.on('visit:start', ({ visit }) => {
      console.log('🔄 Page transition starting:', visit.to.url);

      // Add leaving class to current page
      document.documentElement.classList.add('is-leaving');
      document.body.classList.add('page-leaving');

      // Animate out current content
      animatePageLeave();
    });

    swup.hooks.on('visit:transition', ({ visit }) => {
      console.log('🎬 Transitioning to:', visit.to.url);
    });

    swup.hooks.on('visit:end', ({ visit }) => {
      console.log('✅ Page transition complete:', visit.to.url);

      // Remove leaving class
      document.documentElement.classList.remove('is-leaving');
      document.body.classList.remove('page-leaving');
      document.body.classList.add('page-entered');

      // Animate in new content
      animatePageEnter();

      // Reinitialize dynamic components
      setTimeout(() => {
        reinitializeComponents();
      }, 100);

      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    swup.hooks.on('visit:abort', ({ visit }) => {
      console.warn('❌ Transition aborted:', visit.to.url);
      document.documentElement.classList.remove('is-leaving');
      document.body.classList.remove('page-leaving');
    });

    // Handle history navigation
    swup.hooks.on('history:popstate', () => {
      console.log('🔙 History navigation detected');
      document.body.classList.add('page-entered');
      animatePageEnter();
      reinitializeComponents();
    });

    console.log('✓ Swup initialized with', swup.options.containers.length, 'containers');
    return swup;
  }

  /**
   * Animate page leaving (fade out)
   */
  function animatePageLeave() {
    if (typeof Motion !== 'undefined') {
      const mainContent = document.querySelector('main') || document.querySelector('.page-content');
      if (mainContent) {
        Motion.animate(mainContent, { opacity: 0, y: -20 }, { duration: 0.3, easing: [0.4, 0, 0.2, 1] });
      }
    } else {
      // Fallback: CSS transition
      const mainContent = document.querySelector('main') || document.querySelector('.page-content');
      if (mainContent) {
        mainContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(-20px)';
      }
    }
  }

  /**
   * Animate page entering (fade in with stagger)
   */
  function animatePageEnter() {
    const mainContent = document.querySelector('main') || document.querySelector('.page-content');
    if (!mainContent) return;

    // Reset styles
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(20px)';

    if (typeof Motion !== 'undefined') {
      // Motion One animation
      Motion.animate(mainContent, { opacity: 1, y: 0 }, {
        duration: 0.5,
        easing: [0.4, 0, 0.2, 1],
        delay: 0.1
      });

      // Animate child elements with stagger
      const headings = mainContent.querySelectorAll('h1, h2, h3');
      const cards = mainContent.querySelectorAll('.card, .service-card, .doctor-card');
      const paragraphs = mainContent.querySelectorAll('p');

      [headings, cards, paragraphs].forEach((elements, index) => {
        elements.forEach((el, i) => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          Motion.animate(el, { opacity: 1, y: 0 }, {
            duration: 0.4,
            easing: [0.4, 0, 0.2, 1],
            delay: 0.2 + (index * 0.1) + (i * 0.05)
          });
        });
      });
    } else if (window.AutoAnimate) {
      // AutoAnimate fallback
      AutoAnimate.autoAnimate(mainContent);
      mainContent.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      mainContent.style.opacity = '1';
      mainContent.style.transform = 'translateY(0)';
    } else {
      // CSS fallback
      mainContent.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      mainContent.style.opacity = '1';
      mainContent.style.transform = 'translateY(0)';
    }
  }

  /**
   * Reinitialize dynamic components after page load
   */
  function reinitializeComponents() {
    console.log('🔄 Reinitializing components...');

    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
      try {
        lucide.createIcons();
        console.log('✓ Icons refreshed');
      } catch (e) {
        console.warn('Icon refresh failed:', e);
      }
    }

    // Reinitialize carousels
    if (typeof window.CarouselInit !== 'undefined' && window.CarouselInit.refresh) {
      try {
        window.CarouselInit.refresh();
        console.log('✓ Carousels refreshed');
      } catch (e) {
        console.warn('Carousel refresh failed:', e);
      }
    }

    // Reinitialize UI popovers
    if (typeof window.UIPopovers !== 'undefined') {
      try {
        window.UIPopovers.init();
        console.log('✓ Popovers refreshed');
      } catch (e) {
        console.warn('Popover refresh failed:', e);
      }
    }

    // Reinitialize auto-animations
    if (typeof window.AutoAnimateInit !== 'undefined') {
      try {
        window.AutoAnimateInit();
        console.log('✓ Auto-animations refreshed');
      } catch (e) {
        console.warn('Auto-animation refresh failed:', e);
      }
    }

    // Dispatch custom event for other scripts to listen
    document.dispatchEvent(new CustomEvent('page:transition:complete'));
  }

  /**
   * Setup reduced motion preference
   */
  function setupReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQuery.matches) {
      console.log('♿ Reduced motion enabled');
      document.documentElement.classList.add('reduced-motion');

      // Disable animations
      if (typeof Swup !== 'undefined') {
        // Swup will respect the class and disable animations
      }
    }

    mediaQuery.addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.classList.add('reduced-motion');
      } else {
        document.documentElement.classList.remove('reduced-motion');
      }
    });
  }

  /**
   * Add CSS for transitions if not already present
   */
  function addTransitionStyles() {
    if (document.getElementById('swup-transition-styles')) return;

    const style = document.createElement('style');
    style.id = 'swup-transition-styles';
    style.textContent = `
      /* Page transition base styles */
      html.is-leaving body {
        cursor: wait;
      }

      .page-leaving main,
      .page-leaving .page-content {
        transition: opacity 0.3s ease, transform 0.3s ease;
      }

      .page-entered main,
      .page-entered .page-content {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }

      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }

        html.is-leaving body {
          cursor: default;
        }
      }

      /* Swup fade transition */
      .swup-fade-out {
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }

      .swup-fade-in {
        opacity: 0;
        transform: translateY(20px);
        animation: swupFadeIn 0.5s ease forwards;
      }

      @keyframes swupFadeIn {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Stagger animations for children */
      .stagger-item {
        opacity: 0;
        transform: translateY(20px);
      }

      .stagger-item.animated {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.4s ease, transform 0.4s ease;
      }
    `;
    document.head.appendChild(style);
    console.log('✓ Transition styles added');
  }

  // Initialize everything when DOM is ready
  function init() {
    console.log('🚀 Initializing page transitions...');

    addTransitionStyles();
    setupReducedMotion();

    const swup = initSwup();

    // Expose to window for debugging
    window.SwupInstance = swup;
    window.PageTransitions = {
      swup,
      animatePageLeave,
      animatePageEnter,
      reinitializeComponents
    };

    // Initial animation for first page load
    setTimeout(() => {
      document.body.classList.add('page-entered');
      animatePageEnter();
    }, 100);
  }

  // Start initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();