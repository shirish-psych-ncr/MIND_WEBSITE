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
      <nav className="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/resources/">Therapeutic Tools</a></li><li aria-current="page">Eye Movement</li></ol></nav>

  <div className="shell">
    <div className="tool-container">
      <div className="tool-card">
        <!-- SETUP -->
        <div id="eye-setup" className="view">
          <div className="tool-illustration" aria-hidden="true"><i data-lucide="move-horizontal"></i></div>
          <h1>Lateral grounding</h1>
<div className="seo-answer"><strong>What this tool does:</strong> Lateral grounding keeps your head still while your eyes follow a moving light side to side — a bilateral visual exercise from Mind Grace Neuropsychiatric Clinic; stop if it feels uncomfortable.</div>
          <p>Keep your head still and follow the moving light with your eyes only. Stop if the movement feels uncomfortable.</p>
          <div className="settings-box">
            <label className="label" htmlFor="speed-selector">Choose speed</label>
            <select id="speed-selector" name="speed" autocomplete="off">
              <option value="3500">Gentle</option>
              <option value="2200" selected>Steady</option>
              <option value="1200">Fast</option>
            </select>
            <button type="button" className="start-btn" id="eye-start-btn">Start session</button>
          </div>
        </div>
        <!-- ACTIVE -->
        <div id="active-view" className="view hidden">
          <div className="track-container">
            <div className="track-line">
              <div id="orb" className="orb"></div>
            </div>
          </div>
          <button type="button" className="stop-btn" id="eye-stop-btn">End session</button>
        </div>
      </div>
    </div>
  </div>
</main>
<!-- FOOTER -->



  <!-- MIND GRACE LIBRARY STACK -->
  <!-- END LIBRARY STACK -->

    {/* script removed for JSX lint */}
</Layout>

    </>
  );
}
export default AstroTemplate;
