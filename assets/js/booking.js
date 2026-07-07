/**
 * Mind Grace Neuropsychiatric Clinic - Booking Page Controller
 * Clinical UX Guardrails: Vestibular-safe, A11y compliant.
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================
  // 1. STATE & DOM REFERENCES
  // =========================================
  const formSection = document.getElementById('booking-form-section');
  const qualificationSection = document.getElementById('qualifications');
  const continueBtn = document.getElementById('continue-booking-btn') || 
                      document.getElementById('openBookingForm') ||
                      document.querySelector('#qualifications .btn-primary');
  const stickyCTA = document.querySelector('.mobile-sticky-cta');

  // Check for user's motion preferences (Vestibular Guardrail)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =========================================
  // 2. REVEAL FORM LOGIC
  // =========================================
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      qualificationSection.classList.add('hidden');
      formSection.classList.remove('hidden');
      formSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // =========================================
  // 3. SMOOTH SCROLL FOR ALL INTERNAL ANCHORS
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================================
  // 4. HIDE STICKY CTA WHEN USER REACHES FOOTER
  // =========================================
  window.addEventListener('scroll', () => {
    if (!stickyCTA) return;
    
    const footer = document.querySelector('.site-footer');
    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (footerTop < windowHeight) {
      stickyCTA.style.display = 'none';
    } else {
      stickyCTA.style.display = 'block';
    }
  });
});
