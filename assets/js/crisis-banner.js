/**
 * Crisis Banner Component
 * Displays sticky emergency helpline banner on all pages
 * Cognitive load optimized for users in acute distress
 */

(function() {
  'use strict';

  // Indian National Mental Health Helplines
  const HELPLINES = [
    { name: 'KIRAN (24/7)', number: '18005990019', label: 'KIRAN Mental Health Helpline' },
    { name: 'Vandrevala Foundation', number: '9999666555', label: 'Vandrevala Foundation Crisis Support' },
    { name: 'iCall', number: '9152987821', label: 'iCall Counseling' },
    { name: 'Emergency', number: '112', label: 'National Emergency Number' }
  ];

  /**
   * Create crisis banner HTML
   */
  function createCrisisBanner() {
    const banner = document.createElement('div');
    banner.className = 'crisis-banner';
    banner.setAttribute('role', 'alert');
    banner.setAttribute('aria-label', 'Emergency mental health helplines');

    banner.innerHTML = `
      <div class="crisis-banner__inner">
        <div class="crisis-banner__icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
        </div>
        <div class="crisis-banner__text">
          In crisis? You're not alone. Free confidential support available 24/7:
        </div>
        <div class="crisis-banner__helplines">
          ${HELPLINES.slice(0, 3).map(helpline => `
            <a href="tel:+91${helpline.number}" 
               class="crisis-banner__phone" 
               aria-label="Call ${helpline.label} at ${helpline.number}"
               title="${helpline.name}">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              ${helpline.number}
            </a>
          `).join('')}
        </div>
      </div>
    `;

    return banner;
  }

  /**
   * Initialize crisis banner
   */
  function initCrisisBanner() {
    if (document.querySelector('.emergency-banner--static, .crisis-banner')) return;
    // Don't show on emergency page itself (already has prominent help)
    if (window.location.pathname.includes('/emergency.html')) {
      return;
    }

    // Insert after opening body tag, before header
    const header = document.querySelector('.site-header');
    if (header && header.parentNode) {
      const banner = createCrisisBanner();
      header.parentNode.insertBefore(banner, header);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCrisisBanner);
  } else {
    initCrisisBanner();
  }
})();
