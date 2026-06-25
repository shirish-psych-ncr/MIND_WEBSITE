/**
 * Book Appointment Page - Form Loading Logic
 */

(function() {
  'use strict';

  // Initialize booking form when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const formWrap = document.querySelector('[data-booking-form-wrap]');
    
    if (!formWrap) return;

    // Add loading state
    formWrap.classList.add('loading');

    // Simulate form load (or replace with actual fetch logic if needed)
    setTimeout(function() {
      formWrap.classList.remove('loading', 'hidden');
      
      // Scroll to form smoothly
      formWrap.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 300);
  });
})();
