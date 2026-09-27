function AstroTemplate() {
  return (
    <>
<Layout headExtra="expr" bodyStart="expr" bodyAttrs=`data-design-system="rose-serenity"`>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5RBGN42B"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

  <div id="network-status" className="network-status" role="status" aria-live="polite" hidden><span className="network-status-message"></span></div>


    <div className="visually-hidden">
      In a crisis? Get immediate help. Call emergency services if in immediate danger. Visit our emergency page for 24/7 crisis support resources.
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

    <main id="main-content" tabindex="-1" className="section shell stack">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/resources/">Therapeutic Tools</a></li><li aria-current="page">Hypnotic Fractal</li></ol></nav>

      <section>
        <h1>Grounding Fractal Tool</h1>
<div className="seo-answer"><strong>What this tool does:</strong> A dynamic fractal visual from Mind Grace Neuropsychiatric Clinic designed to steady attention and support calm during anxious moments.</div>
        <p className="lead">
          Tap to explore a fractal, hold and move to swirl, or match your breathing to the glow. Stop if visual movement feels uncomfortable.
        </p>
      </section>
      <!-- FRACTAL TOOL -->
      <div className="tool-section">
        <canvas id="canvas"></canvas>
        <div className="breath-tag" id="breath-text">Centering…</div>
        <button id="min-btn" type="button" aria-label="Toggle fractal controls"><i data-lucide="settings" aria-hidden="true"></i></button>
        <div className="interface" id="fractal-ui">
            <div className="drawer">
                <div className="row">
                    <label htmlFor="depth">Complexity</label>
                    <input type="range" id="depth" name="depth" min="3" max="8" value="5" />
                </div>
                <div className="row">
                    <label htmlFor="speed">Sensitivity</label>
                    <input type="range" id="speed" name="speed" min="5" max="80" value="30" />
                </div>
                <div>
                    <button type="button" id="clear-canvas">Clear canvas</button>
                    <button type="button" id="haptic-toggle">Haptic: on</button>
                </div>
            </div>
        </div>
      </div>
    </main>
    <div src="/assets/js/min/tools-fractal.min.js?v=fix1" defer></div>



  <!-- MIND GRACE LIBRARY STACK -->

    {/* script removed for JSX lint */}
</Layout>

    </>
  );
}
export default AstroTemplate;
