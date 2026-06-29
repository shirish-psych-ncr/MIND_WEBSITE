/**
 * Main JavaScript - Shared functionality across all pages
 * Version: 3.0-RESPONSIVE (Graceful fallbacks included)
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initFadeInAnimations();
    initServiceRowEffects();
  });

  /**
   * Mobile Navigation with Graceful Fallbacks
   * Uses progressive enhancement: works without JS, enhanced with JS
   */
  function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobilePanel = document.getElementById('mobile-nav-panel');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const closeBtn = document.getElementById('mobile-close');
    
    // Graceful fallback: if elements don't exist, exit silently
    if (!mobileToggle || !mobilePanel) {
      console.debug('[MainJS] Mobile nav elements not found - using CSS-only fallback');
      return;
    }

    // Ensure overlay exists (create if missing for graceful degradation)
    let overlay = mobileOverlay;
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'mobile-nav-overlay';
      overlay.className = 'mobile-nav-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('inert', '');
      mobilePanel.insertAdjacentElement('beforebegin', overlay);
    }

    // Toggle function with state management
    function toggleMenu(forceOpen) {
      const isOpen = mobilePanel.classList.contains('is-open');
      const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !isOpen;
      
      if (shouldOpen) {
        mobilePanel.classList.add('is-open');
        mobilePanel.setAttribute('aria-hidden', 'false');
        mobilePanel.removeAttribute('inert');
        mobileToggle.setAttribute('aria-expanded', 'true');
        
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        overlay.removeAttribute('inert');
        
        // Focus trap: move focus to first link in panel
        const firstLink = mobilePanel.querySelector('a[href]');
        if (firstLink) firstLink.focus();
        
        // Prevent body scroll on mobile
        document.body.style.overflow = 'hidden';
      } else {
        mobilePanel.classList.remove('is-open');
        mobilePanel.setAttribute('aria-hidden', 'true');
        mobilePanel.setAttribute('inert', '');
        mobileToggle.setAttribute('aria-expanded', 'false');
        
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        overlay.setAttribute('inert', '');
        
        // Return focus to toggle button
        mobileToggle.focus();
        
        // Restore body scroll
        document.body.style.overflow = '';
      }
    }

    // Event listeners with passive options for performance
    mobileToggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
    }, { passive: false });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu(false);
      }, { passive: false });
    }

    // Close on overlay click
    overlay.addEventListener('click', () => {
      toggleMenu(false);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobilePanel.classList.contains('is-open')) {
        toggleMenu(false);
      }
    });

    // Close on nav link click (for single-page navigation)
    mobilePanel.querySelectorAll('.mobile-nav-list a').forEach(link => {
      link.addEventListener('click', () => {
        // Don't close if it's a hash link for same page
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.includes(window.location.pathname)) {
          toggleMenu(false);
        }
      });
    });

    // Handle resize: auto-close if switching to desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && mobilePanel.classList.contains('is-open')) {
          toggleMenu(false);
        }
      }, 150);
    });
  }

  /**
   * Intersection Observer for Fade-in Animations
   * Graceful fallback: if Observer not supported, show all elements immediately
   */
  function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (!fadeElements.length) return;

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      console.debug('[MainJS] IntersectionObserver not supported - showing all fade-in elements');
      fadeElements.forEach(el => el.classList.add('visible'));
      return;
    }

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

    fadeElements.forEach(el => observer.observe(el));
  }

  /**
   * Service Row Hover Effects
   * Graceful fallback: CSS :hover handles basic states, JS enhances with smooth transitions
   */
  function initServiceRowEffects() {
    const serviceRows = document.querySelectorAll('.service-row');
    
    if (!serviceRows.length) return;

    // Check if device supports hover (skip on touch-only devices)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) {
      console.debug('[MainJS] Touch device detected - skipping hover effects');
      return;
    }

    serviceRows.forEach(row => {
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
  }
})();
