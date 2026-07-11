/**
 * ============================================
 * UI-POPOVERS.JS - Floating UI Tooltips & Popovers
 * Mind Grace Neuropsychiatric Clinic
 * ============================================
 *
 * Initializes Floating UI for tooltips, popovers, and dropdowns.
 * Handles re-initialization after page transitions.
 */

(function() {
  'use strict';

  /**
   * Initialize tooltips for elements with .has-tooltip class or title attribute
   */
  function initTooltips() {
    const FloatingUILib = typeof FloatingUI !== 'undefined' ? FloatingUI : (typeof FloatingUIDOM !== 'undefined' ? FloatingUIDOM : null);

    if (!FloatingUILib) {
      setTimeout(initTooltips, 100);
      return;
    }

    const { computePosition, flip, shift, offset, autoUpdate } = FloatingUILib;

    // Find all elements with title attribute or .has-tooltip class
    const tooltipTriggers = document.querySelectorAll('[title], .has-tooltip');

    tooltipTriggers.forEach(trigger => {
      // Skip if already initialized
      if (trigger._tooltipInitialized) return;

      const tooltipText = trigger.getAttribute('title') || trigger.getAttribute('data-tooltip');
      if (!tooltipText) return;

      // Create tooltip element
      const tooltip = document.createElement('div');
      tooltip.className = 'ui-tooltip';
      tooltip.setAttribute('role', 'tooltip');
      tooltip.innerHTML = `<span class="ui-tooltip__content">${tooltipText}</span>`;

      // Remove title to prevent default browser tooltip
      trigger.removeAttribute('title');
      trigger.setAttribute('data-tooltip', tooltipText);
      trigger.setAttribute('aria-describedby', 'tooltip-' + Math.random().toString(36).substr(2, 9));

      // Style the tooltip
      Object.assign(tooltip.style, {
        position: 'fixed',
        zIndex: '9999',
        padding: '8px 12px',
        backgroundColor: '#1f2937',
        color: '#fff',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        pointerEvents: 'none',
        opacity: '0',
        transition: 'opacity 0.2s ease',
        maxWidth: '250px'
      });

      document.body.appendChild(tooltip);

      // Show tooltip on hover/focus
      const showTooltip = () => {
        tooltip.style.opacity = '1';
        computePosition(trigger, tooltip, {
          placement: 'top',
          middleware: [
            offset(6),
            flip(),
            shift({ padding: 8 })
          ]
        }).then(({ x, y }) => {
          Object.assign(tooltip.style, {
            left: `${x}px`,
            top: `${y}px`
          });
        });
      };

      const hideTooltip = () => {
        tooltip.style.opacity = '0';
      };

      // Event listeners
      trigger.addEventListener('mouseenter', showTooltip);
      trigger.addEventListener('mouseleave', hideTooltip);
      trigger.addEventListener('focus', showTooltip);
      trigger.addEventListener('blur', hideTooltip);

      // Mark as initialized
      trigger._tooltipInitialized = true;

      // Handle cleanup on page transition
      trigger.addEventListener('cleanup', () => {
        tooltip.remove();
        trigger._tooltipInitialized = false;
      });
    });
  }

  /**
   * Initialize dropdowns for elements with .has-dropdown class
   */
  function initDropdowns() {
    const FloatingUILib = typeof FloatingUI !== 'undefined' ? FloatingUI : (typeof FloatingUIDOM !== 'undefined' ? FloatingUIDOM : null);

    if (!FloatingUILib) {
      setTimeout(initDropdowns, 100);
      return;
    }

    const { computePosition, flip, shift, offset } = FloatingUILib;

    const dropdowns = document.querySelectorAll('.has-dropdown');

    dropdowns.forEach(dropdown => {
      if (dropdown._dropdownInitialized) return;

      const menu = dropdown.querySelector('.dropdown-menu');
      if (!menu) return;

      // Style the menu
      Object.assign(menu.style, {
        position: 'fixed',
        zIndex: '9999',
        minWidth: '200px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'none'
      });

      let isOpen = false;

      const toggleDropdown = () => {
        isOpen = !isOpen;
        menu.style.display = isOpen ? 'block' : 'none';

        if (isOpen) {
          computePosition(dropdown, menu, {
            placement: 'bottom-start',
            middleware: [
              offset(4),
              flip(),
              shift({ padding: 8 })
            ]
          }).then(({ x, y }) => {
            Object.assign(menu.style, {
              left: `${x}px`,
              top: `${y}px`
            });
          });
        }
      };

      dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
      });

      document.addEventListener('click', (e) => {
        if (isOpen && !dropdown.contains(e.target)) {
          toggleDropdown();
        }
      });

      dropdown._dropdownInitialized = true;
    });
  }

  /**
   * Initialize medical term popovers
   */
  function initMedicalPopovers() {
    const FloatingUILib = typeof FloatingUI !== 'undefined' ? FloatingUI : (typeof FloatingUIDOM !== 'undefined' ? FloatingUIDOM : null);

    if (!FloatingUILib) {
      setTimeout(initMedicalPopovers, 100);
      return;
    }

    const { computePosition, flip, shift, offset } = FloatingUILib;

    const medicalTerms = document.querySelectorAll('.medical-term');

    medicalTerms.forEach(term => {
      if (term._popoverInitialized) return;

      const definition = term.getAttribute('data-definition');
      if (!definition) return;

      const popover = document.createElement('div');
      popover.className = 'medical-popover';
      popover.setAttribute('role', 'tooltip');
      popover.innerHTML = `<span class="medical-popover__content">${definition}</span>`;

      Object.assign(popover.style, {
        position: 'fixed',
        zIndex: '9998',
        padding: '12px 16px',
        backgroundColor: '#f0f9ff',
        color: '#0c4a6e',
        border: '1px solid #bae6fd',
        borderRadius: '8px',
        fontSize: '14px',
        lineHeight: '1.5',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        pointerEvents: 'none',
        opacity: '0',
        transition: 'opacity 0.2s ease',
        maxWidth: '300px'
      });

      document.body.appendChild(popover);

      const showPopover = () => {
        popover.style.opacity = '1';
        computePosition(term, popover, {
          placement: 'top',
          middleware: [
            offset(8),
            flip(),
            shift({ padding: 8 })
          ]
        }).then(({ x, y }) => {
          Object.assign(popover.style, {
            left: `${x}px`,
            top: `${y}px`
          });
        });
      };

      const hidePopover = () => {
        popover.style.opacity = '0';
      };

      term.addEventListener('mouseenter', showPopover);
      term.addEventListener('mouseleave', hidePopover);
      term.addEventListener('focus', showPopover);
      term.addEventListener('blur', hidePopover);

      term._popoverInitialized = true;

      term.addEventListener('cleanup', () => {
        popover.remove();
        term._popoverInitialized = false;
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTooltips();
      initDropdowns();
      initMedicalPopovers();
    });
  } else {
    initTooltips();
    initDropdowns();
    initMedicalPopovers();
  }

  // Expose for re-initialization after page transitions
  window._reinitPopovers = () => {
    initTooltips();
    initDropdowns();
    initMedicalPopovers();
  };
})();
