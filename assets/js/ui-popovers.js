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
    // Check if Floating UI is loaded
    if (typeof FloatingUI === 'undefined') {
      console.warn('Floating UI library not loaded yet, waiting...');
      setTimeout(initTooltips, 100);
      return;
    }

    const { computePosition, flip, shift, offset, autoUpdate } = FloatingUI;

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

      // Cleanup on scroll
      let cleanup;
      trigger.addEventListener('mouseenter', () => {
        cleanup = autoUpdate(trigger, tooltip, () => {
          computePosition(trigger, tooltip, {
            placement: 'top',
            middleware: [offset(6), flip(), shift({ padding: 8 })]
          }).then(({ x, y }) => {
            Object.assign(tooltip.style, { left: `${x}px`, top: `${y}px` });
          });
        });
      }, { once: true });

      trigger.addEventListener('mouseleave', () => {
        if (cleanup) cleanup();
      }, { once: true });

      trigger._tooltipInitialized = true;
    });

    console.log('✓ Floating UI tooltips initialized:', document.querySelectorAll('.ui-tooltip').length, 'tooltips');
  }

  /**
   * Initialize dropdown positioning for mobile menu
   */
  function initDropdowns() {
    if (typeof FloatingUI === 'undefined') {
      setTimeout(initDropdowns, 100);
      return;
    }

    const { computePosition, flip, shift, offset } = FloatingUI;

    // Mobile menu dropdowns
    const dropdownTriggers = document.querySelectorAll('.has-dropdown, [data-dropdown]');

    dropdownTriggers.forEach(trigger => {
      if (trigger._dropdownInitialized) return;

      const dropdown = document.querySelector(trigger.getAttribute('data-dropdown') || '.dropdown-menu');
      if (!dropdown) return;

      trigger.addEventListener('click', () => {
        computePosition(trigger, dropdown, {
          placement: 'bottom-start',
          middleware: [offset(4), flip(), shift({ padding: 8 })]
        }).then(({ x, y }) => {
          Object.assign(dropdown.style, {
            left: `${x}px`,
            top: `${y}px`
          });
        });

        dropdown.classList.toggle('hidden');
      });

      trigger._dropdownInitialized = true;
    });

    console.log('✓ Floating UI dropdowns initialized');
  }

  /**
   * Initialize medical term popovers in blog posts
   */
  function initMedicalPopovers() {
    if (typeof FloatingUI === 'undefined') {
      setTimeout(initMedicalPopovers, 100);
      return;
    }

    const { computePosition, flip, shift, offset } = FloatingUI;

    // Find medical terms with definitions
    const medicalTerms = document.querySelectorAll('[data-medical-term]');

    medicalTerms.forEach(term => {
      if (term._popoverInitialized) return;

      const definition = term.getAttribute('data-medical-term');
      const popover = document.createElement('div');
      popover.className = 'ui-popover ui-popover--medical';
      popover.innerHTML = `
        <div class="ui-popover__header">Medical Term</div>
        <div class="ui-popover__content">${definition}</div>
      `;

      Object.assign(popover.style, {
        position: 'fixed',
        zIndex: '9999',
        padding: '12px 16px',
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '14px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        pointerEvents: 'none',
        opacity: '0',
        transition: 'opacity 0.2s ease',
        maxWidth: '300px'
      });

      document.body.appendChild(popover);

      term.style.cursor = 'help';
      term.style.borderBottom = '1px dotted #6b7280';

      const showPopover = () => {
        popover.style.opacity = '1';
        computePosition(term, popover, {
          placement: 'top',
          middleware: [offset(8), flip(), shift({ padding: 8 })]
        }).then(({ x, y }) => {
          Object.assign(popover.style, { left: `${x}px`, top: `${y}px` });
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
    });

    console.log('✓ Medical term popovers initialized');
  }

  /**
   * Refresh all UI components after page transitions
   */
  function refreshUI() {
    initTooltips();
    initDropdowns();
    initMedicalPopovers();
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refreshUI);
  } else {
    refreshUI();
  }

  // Listen for custom events
  document.addEventListener('ui:refresh', refreshUI);

  // Export for external use
  window.UIPopovers = {
    init: refreshUI,
    initTooltips,
    initDropdowns,
    initMedicalPopovers
  };

})();