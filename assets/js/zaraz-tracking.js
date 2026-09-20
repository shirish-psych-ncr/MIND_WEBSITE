/**
 * Zaraz Event Tracking for Mind Grace Neuropsychiatric Clinic
 * 
 * This script implements Cloudflare Zaraz tracking for key user events.
 * Add this script to your HTML pages after the Zaraz script is loaded.
 * 
 * Usage in Zaraz Dashboard:
 * 1. Create triggers matching the event names below (e.g., "page_view", "booking_started")
 * 2. Configure actions to use event properties via {{ client.property_name }}
 * 
 * Example trigger configuration:
 *   Rule type: Match rule
 *   Variable name: Event Name
 *   Match operation: Equals
 *   Match string: booking_started
 */

(function() {
  'use strict';

  // Wait for zaraz object to be available
  function waitForZaraz(callback, maxAttempts = 50) {
    let attempts = 0;
    const check = () => {
      if (typeof zaraz !== 'undefined' && typeof zaraz.track === 'function') {
        callback();
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(check, 100);
      } else {
        console.warn('Zaraz not available after waiting. Tracking events will be queued.');
        // Queue events for later processing if needed
      }
    };
    check();
  }

  // Track page view automatically
  function trackPageView() {
    waitForZaraz(() => {
      const pageData = {
        page_title: document.title,
        page_path: window.location.pathname,
        page_url: window.location.href,
        referrer: document.referrer || null,
        timestamp: new Date().toISOString()
      };
      
      zaraz.track('page_view', pageData);
    });
  }

  // Track booking flow events
  function setupBookingTracking() {
    waitForZaraz(() => {
      // Track when user clicks to start booking
      const bookingButtons = document.querySelectorAll('#heroStartBooking, #openBookingForm, [data-open-embedded-booking], .mobile-sticky-cta');
      
      bookingButtons.forEach(button => {
        button.addEventListener('click', function() {
          const eventData = {
            event_category: 'booking',
            event_action: 'booking_started',
            button_id: this.id || 'unknown',
            button_class: this.className || 'unknown',
            page_path: window.location.pathname,
            timestamp: new Date().toISOString()
          };
          
          zaraz.track('booking_started', eventData);
        });
      });

      // Track form submission (if using custom form handling)
      const bookingForm = document.querySelector('form[data-booking-form]') || 
                         document.querySelector('iframe[data-booking-iframe]');
      
      if (bookingForm) {
        // For iframe-based forms, track when iframe becomes visible
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && 
                mutation.attributeName === 'hidden' && 
                !bookingForm.hasAttribute('hidden')) {
              zaraz.track('booking_form_opened', {
                event_category: 'booking',
                page_path: window.location.pathname,
                timestamp: new Date().toISOString()
              });
            }
          });
        });
        
        observer.observe(bookingForm, { attributes: true, attributeFilter: ['hidden'] });
      }
    });
  }

  // Track emergency resource access
  function setupEmergencyTracking() {
    waitForZaraz(() => {
      const emergencyLinks = document.querySelectorAll('a[href*="emergency"], .emergency-banner a');
      
      emergencyLinks.forEach(link => {
        link.addEventListener('click', function() {
          zaraz.track('emergency_resource_accessed', {
            event_category: 'emergency',
            link_href: this.href,
            link_text: this.textContent?.trim() || 'unknown',
            page_path: window.location.pathname,
            timestamp: new Date().toISOString()
          });
        });
      });
    });
  }

  // Track tool usage (breathing, butterfly tapper, etc.)
  function setupToolTracking() {
    waitForZaraz(() => {
      // Track when users access self-help tools
      const toolLinks = document.querySelectorAll('a[href*="/tools/"]');
      
      toolLinks.forEach(link => {
        link.addEventListener('click', function() {
          const toolName = this.href.split('/').pop()?.replace('.html', '') || 'unknown';
          
          zaraz.track('tool_accessed', {
            event_category: 'self_help_tool',
            tool_name: toolName,
            link_href: this.href,
            page_path: window.location.pathname,
            timestamp: new Date().toISOString()
          });
        });
      });

      // Track tool interactions if on a tool page
      const toolContainers = document.querySelectorAll('[data-tool-name]');
      toolContainers.forEach(tool => {
        const toolName = tool.dataset.toolName;
        
        // Track tool start
        const startButtons = tool.querySelectorAll('button[data-action="start"], .btn-primary');
        startButtons.forEach(btn => {
          btn.addEventListener('click', function() {
            zaraz.track('tool_session_started', {
              event_category: 'self_help_tool',
              tool_name: toolName,
              timestamp: new Date().toISOString()
            });
          });
        });
      });
    });
  }

  // Track contact method selection
  function setupContactTracking() {
    waitForZaraz(() => {
      const contactMethods = document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"], a[href*="wa.me"]');
      
      contactMethods.forEach(link => {
        link.addEventListener('click', function() {
          let contactType = 'unknown';
          if (this.href.startsWith('tel:')) contactType = 'phone';
          else if (this.href.startsWith('mailto:')) contactType = 'email';
          else if (this.href.includes('wa.me')) contactType = 'whatsapp';
          
          zaraz.track('contact_initiated', {
            event_category: 'contact',
            contact_type: contactType,
            contact_value: this.href,
            page_path: window.location.pathname,
            timestamp: new Date().toISOString()
          });
        });
      });
    });
  }

  // Track CTA clicks
  function setupCTATracking() {
    waitForZaraz(() => {
      const ctaButtons = document.querySelectorAll('.btn-primary, .cta-button, [class*="cta"]');
      
      ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Skip if already tracked by other handlers
          if (this.closest('[data-booking-gate]')) return;
          
          zaraz.track('cta_clicked', {
            event_category: 'engagement',
            cta_text: this.textContent?.trim() || 'unknown',
            cta_class: this.className || 'unknown',
            page_path: window.location.pathname,
            timestamp: new Date().toISOString()
          });
        });
      });
    });
  }

  // Track navigation events
  function setupNavigationTracking() {
    waitForZaraz(() => {
      const navLinks = document.querySelectorAll('nav a, .nav-link, .mobile-nav-trigger');
      
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          const href = this.getAttribute('href');
          
          // Only track internal navigation
          if (href && !href.startsWith('http') && !href.startsWith('#')) {
            zaraz.track('navigation_click', {
              event_category: 'navigation',
              destination: href,
              link_text: this.textContent?.trim() || 'unknown',
              current_page: window.location.pathname,
              timestamp: new Date().toISOString()
            });
          }
        });
      });
    });
  }

  // Track search or filter interactions (if applicable)
  function setupSearchTracking() {
    waitForZaraz(() => {
      const searchInputs = document.querySelectorAll('input[type="search"], input[placeholder*="search" i]');
      
      searchInputs.forEach(input => {
        input.addEventListener('change', function() {
          if (this.value.trim()) {
            zaraz.track('search_performed', {
              event_category: 'search',
              search_query: this.value.trim(),
              page_path: window.location.pathname,
              timestamp: new Date().toISOString()
            });
          }
        });
      });
    });
  }

  // Track scroll depth (optional - can be heavy on performance)
  function setupScrollTracking() {
    let maxScroll = 0;
    let tracked = false;
    
    waitForZaraz(() => {
      window.addEventListener('scroll', () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent;
          
          // Track at 25%, 50%, 75%, 90% thresholds
          if (!tracked && maxScroll >= 25) {
            zaraz.track('scroll_depth', {
              event_category: 'engagement',
              scroll_percent: maxScroll,
              page_path: window.location.pathname,
              timestamp: new Date().toISOString()
            });
            tracked = true;
          }
        }
      }, { passive: true });
    });
  }

  // Track form interactions (generic)
  function setupFormTracking() {
    waitForZaraz(() => {
      const forms = document.querySelectorAll('form:not([data-no-track])');
      
      forms.forEach(form => {
        const formId = form.id || 'unnamed_form';
        
        // Track form focus
        form.addEventListener('focusin', (e) => {
          if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
            zaraz.track('form_field_focused', {
              event_category: 'form_interaction',
              form_id: formId,
              field_name: e.target.name || 'unnamed',
              field_type: e.target.type || e.target.tagName.toLowerCase(),
              page_path: window.location.pathname,
              timestamp: new Date().toISOString()
            });
          }
        });

        // Track form submission
        form.addEventListener('submit', (e) => {
          zaraz.track('form_submitted', {
            event_category: 'form_interaction',
            form_id: formId,
            page_path: window.location.pathname,
            timestamp: new Date().toISOString()
          });
        });
      });
    });
  }

  // Initialize all tracking
  function init() {
    // Always track page views
    trackPageView();
    
    // Setup event listeners for various interactions
    setupBookingTracking();
    setupEmergencyTracking();
    setupToolTracking();
    setupContactTracking();
    setupCTATracking();
    setupNavigationTracking();
    setupFormTracking();
    
    // Optional tracking (uncomment if needed)
    // setupSearchTracking();
    // setupScrollTracking();
    
    console.log('Zaraz tracking initialized for Mind Grace Clinic');
  }

  // Start tracking when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
