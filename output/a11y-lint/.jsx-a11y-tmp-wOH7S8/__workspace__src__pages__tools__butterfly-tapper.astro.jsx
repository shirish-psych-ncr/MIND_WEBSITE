function AstroTemplate() {
  return (
    <>
<Layout headExtra="expr" bodyStart="expr" bodyClass="butterfly-tool tool-page" bodyAttrs=`id="butterfly-body" data-design-system="rose-serenity"`>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5RBGN42B"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

  <div id="network-status" className="network-status" role="status" aria-live="polite" hidden><span className="network-status-message"></span></div>

  <!-- Skip Link -->
  <!-- EMERGENCY BANNER WITH MARQUEE -->
  <div className="emergency-banner" role="alert" aria-label="Emergency crisis support information">
    <div className="emergency-banner__marquee">
      <div className="emergency-banner__inner" aria-hidden="true">
        <span className="emergency-banner__message">
          <span className="emergency-indicator" aria-hidden="true"></span>
          In a crisis? Get immediate help now.
        </span>
        <span className="emergency-banner__message">
          <span className="emergency-indicator" aria-hidden="true"></span>
          <a href="/emergency/">Click here for emergency resources</a>
        </span>
        <span className="emergency-banner__message">
          <span className="emergency-indicator" aria-hidden="true"></span>
          Call emergency services if in immediate danger.
        </span>
        <span className="emergency-banner__message">
          <span className="emergency-indicator" aria-hidden="true"></span>
          24/7 Crisis Support Available
        </span>
      </div>
    <div className="visually-hidden">
      In a crisis? Get immediate help. Call emergency services if in immediate danger. Visit our emergency page for 24/7 crisis support resources.
    </div>
  </div>
</div>


<!-- MOBILE NAV OVERLAY -->
  <div className="mobile-nav-overlay" id="mobile-nav-overlay" hidden></div>

  <!-- MOBILE NAV PANEL - Simplified -->
  <nav className="mobile-nav-panel" id="mobile-nav-panel" aria-label="Mobile navigation" inert hidden>
    <div className="mobile-nav-header">
      <h2>Menu</h2>
      <button type="button" className="close-mobile-menu" aria-label="Close menu">
        <i data-lucide="x" width="24" height="24" aria-hidden="true"></i>
      </button>
    </div>
    <div className="mobile-nav-content">
      <div className="mobile-nav-section">
        <div className="mobile-nav-section-title">Explore</div>
        <ul className="mobile-nav-list">
          <li><a href="/about/">About Us</a></li>
          <li><a href="/services/">Our Services</a></li>
          <li><a href="/process/">What to Expect</a></li>
          <li><a href="/location/">Find Us</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </div>

      <div className="mobile-nav-section">
        <div className="mobile-nav-section-title">Resources &#x26; Tools</div>
        <ul className="mobile-nav-list">
          <li><a href="/gallery/">Gallery</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/book/">Resource Book</a></li>
          <li><a href="/resources/">Resources</a></li>
          <li><a href="/faq/#common-questions">Frequently asked questions</a></li>
        </ul>
      </div>

      <div className="mobile-nav-section">
        <div className="mobile-nav-section-title">Therapeutic Tools</div>
        <ul className="mobile-nav-list">
          <li><a href="/tools/guided-breathing/">Guided Breathing</a></li>
          <li><a href="/tools/butterfly-tapper/">Butterfly Tapper</a></li>
          <li><a href="/tools/eye-movement/">Eye Movement</a></li>
          <li><a href="/tools/hypnos-fractal/">Hypnotic Fractal</a></li>
          <li><a href="/tools/horizon-scan/">Horizon Scan</a></li>
          <li><a href="/tools/leaf-on-stream/">Leaf on Stream</a></li>
        </ul>
      </div>

      <div className="mobile-nav-section">
        <a href="/book/" className="cta-button">Book Appointment</a>
      </div>
    </div>
  </nav>

<!-- MOBILE NAV OVERLAY -->

<!-- MOBILE NAV PANEL -->

<!-- Visual Layers -->
<div id="supernova"></div>
<canvas id="trail-canvas"></canvas>
<canvas id="ui-canvas"></canvas>

<!-- UI Elements -->
<button id="gear-btn" type="button" aria-label="Pause butterfly tapper" aria-pressed="false"><i data-lucide="settings" aria-hidden="true"></i></button>
<div className="status-overlay" role="status" aria-live="polite" aria-atomic="true">
    <div className="status-text" id="label">Tap Screen to Begin</div>
</div>

<!-- Interaction Cores -->
<main id="main-content" tabindex="-1">
<h1 className="tool-page-title">Butterfly tapping for a brief grounding pause</h1>
<div className="seo-answer"><strong>What this tool does:</strong> Butterfly tapping is a bilateral grounding exercise from Mind Grace Neuropsychiatric Clinic — cross your arms over your chest and alternate gentle taps on each shoulder to calm routine stress in about a minute.</div>
      <nav className="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/resources/">Therapeutic Tools</a></li><li aria-current="page">Butterfly Tapper</li></ol></nav>

  <!-- Scroll Progress Bar -->
  <div className="scroll-progress" aria-hidden="true"><div className="progress"><div className="progress-bar" data-progress=""></div></div></div>

  <div className="tapper-container">
    <button type="button" id="L" className="core" aria-label="Tap left side"><span className="core-inner"></span></button>
    <button type="button" id="R" className="core" aria-label="Tap right side"><span className="core-inner"></span></button>
  </div>
</main>



  <!-- MIND GRACE LIBRARY STACK -->

    {/* script removed for JSX lint */}

  <!-- Crisis Banner for emergency support -->
  <link rel="stylesheet" href="/assets/css/min/crisis-banner.min.css" />
  <div src="/assets/js/min/crisis-banner.min.js" defer></div>
</Layout>

    </>
  );
}
export default AstroTemplate;
