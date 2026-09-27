function AstroTemplate() {
  return (
    <>
<Layout headExtra="expr" bodyStart="expr" bodyAttrs=`data-design-system="rose-serenity"`>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5RBGN42B"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

  <div id="network-status" className="network-status" role="status" aria-live="polite" hidden><span className="network-status-message"></span></div>



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
<!-- Scroll Progress Bar -->
  <div className="scroll-progress" aria-hidden="true"></div>
<div className="progress"><div className="progress-bar" data-progress=""></div></div>
<div className="top-banner">
  In case of a medical emergency, call 112 or visit the nearest hospital.
</div>
<!-- HEADER -->
<!-- MAIN -->
<main id="main-content" tabindex="-1" className="section">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/resources/">Therapeutic Tools</a></li><li aria-current="page">Horizon Scan</li></ol></nav>

  <div className="shell">
    <div className="tool-container">
      <div className="tool-card">
        <div id="horizon-setup" className="view">
          <h1>Horizon scanning</h1>
<div className="seo-answer"><strong>What this tool does:</strong> Horizon scanning guides slow, side-to-side eye tracking of a moving dot to reduce anxiety and restore emotional balance; keep your head still and stop if uncomfortable.</div>
          <p>Follow the dot as it moves gently across the screen. Keep your head still and move only your eyes. Stop if this feels uncomfortable.</p>
          <div className="settings-box">
            <label className="label" htmlFor="duration-selector">Duration</label>
            <select id="duration-selector" name="duration" autocomplete="off">
              <option value="30">30 seconds</option>
              <option value="60" selected>1 minute</option>
              <option value="120">2 minutes</option>
            </select>
            <button type="button" className="start-btn" id="horizon-start-btn">Begin</button>
          </div>
        </div>
        <div id="horizon-active" className="view hidden">
          <div className="track-container">
            <div className="track-line">
              <div id="horizon-dot" className="dot"></div>
            </div>
          </div>
          <div id="horizon-timer" className="timer"></div>
          <button type="button" className="stop-btn" id="horizon-stop-btn">End session</button>
        </div>
      </div>
    </div>
  </div>
</main>
<!-- FOOTER -->



  <!-- MIND GRACE LIBRARY STACK -->

    {/* script removed for JSX lint */}
</Layout>

    </>
  );
}
export default AstroTemplate;
