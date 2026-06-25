/**
 * Main JavaScript - Shared functionality across all pages
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobilePanel = document.getElementById('mobile-panel');
    
    if (mobileToggle && mobilePanel) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = mobilePanel.getAttribute('aria-hidden') === 'false';
        mobilePanel.setAttribute('aria-hidden', !isOpen);
        mobileToggle.setAttribute('aria-expanded', !isOpen);
      });
      
      document.querySelectorAll('[data-close-mobile-menu]').forEach(el => {
        el.addEventListener('click', () => {
          mobilePanel.setAttribute('aria-hidden', true);
          mobileToggle.setAttribute('aria-expanded', false);
        });
      });
    }

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    // Service Row Hover Effects
    document.querySelectorAll('.service-row').forEach(row => {
      row.addEventListener('mouseenter', () => {
        const arrow = row.querySelector('.service-arrow');
        if (arrow) {
          arrow.style.transform = 'translateX(8px)';
        }
      });
      row.addEventListener('mouseleave', () => {
        const arrow = row.querySelector('.service-arrow');
        if (arrow) {
          arrow.style.transform = 'translateX(0)';
        }
      });
    });
  });
})();
