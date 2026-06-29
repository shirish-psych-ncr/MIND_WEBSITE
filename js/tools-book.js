/**
 * Book Appointment Page - Form Loading Logic
 */

(function() {
  'use strict';

  // Initialize booking form when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const openButton = document.getElementById('openBookingForm');
    const formSection = document.getElementById('bookingFormSection');

    if (!openButton || !formSection) return;

    // Add click handler to open button
    openButton.addEventListener('click', function() {
      // Show the form section with smooth scroll
      formSection.style.display = 'block';
      
      // Scroll to form smoothly
      setTimeout(function() {
        formSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    });
  });
})();
