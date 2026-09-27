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
<!-- MOBILE NAV OVERLAY -->
<!-- MOBILE NAV PANEL -->
  <!-- Scroll Progress Bar -->
  <div className="scroll-progress" aria-hidden="true"></div>
    <div className="progress"><div className="progress-bar" data-progress=""></div></div>
    <div className="top-banner">
      In case of a medical emergency or immediate danger, please call 112 or visit the nearest hospital immediately.
    </div>
    <!-- HEADER -->
    <!-- MAIN -->
    <main id="main-content" tabindex="-1" className="section">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/resources/">Therapeutic Tools</a></li><li aria-current="page">Guided Breathing</li></ol></nav>

      <div className="shell stack">
        <section className="surface panel">
          <h1>Guided breathing for anxiety and calm</h1>
<div className="seo-answer"><strong>What this tool does:</strong> A guided breathing exercise from Mind Grace Neuropsychiatric Clinic to reduce anxiety, ease panic and support sleep by slowing the breath in paced cycles.</div>
          <p className="lead">
            Use this as a short breathing pause when tension, racing thoughts, or difficulty settling makes the moment feel harder.
          </p>
        </section>
        <!-- TOOL -->
<!-- Mind Grace Guided Breathing Tool -->
<div id="breath-app" className="app-container">
  <!-- MENU -->
  <div id="menu" className="view">
    <h2 className="title">Guided Breathing</h2>
    <p className="lead-mini">
      A simple way to calm the body when anxiety, overthinking, or restlessness builds up.
    </p>
    <div className="setting">
      <label htmlFor="tech-sel">Choose focus</label>
      <select id="tech-sel" name="technique" autocomplete="off">
        <option value="box">Focus &#x26; Grounding (Box Breathing)</option>
        <option value="relax">Sleep &#x26; Deep Relaxation (4-7-8)</option>
        <option value="calm">Panic &#x26; Rapid Calm (7-11)</option>
      </select>
    </div>
    <div className="setting">
      <span className="setting-label" id="duration-label">Duration</span>
      <div className="chips">
        <button type="button" className="chip active" data-m="1">1m</button>
        <button type="button" className="chip" data-m="2">2m</button>
        <button type="button" className="chip" data-m="5">5m</button>
        <button type="button" className="chip" data-m="10">10m</button>
      </div>
    </div>
    <button type="button" id="start-btn" className="main-btn"><i data-lucide="play" aria-hidden="true"></i> Start</button>
  </div>
  <!-- SESSION -->
  <div id="session" className="view hidden">
    <div id="timer" className="timer">01:00</div>
    <div className="stage">
      <div id="circle" className="circle">
        <span id="label">Prepare</span>
      </div>
    </div>
    <button type="button" id="stop-btn" className="text-btn"><i data-lucide="square" aria-hidden="true"></i> End session</button>
  </div>
  <!-- END -->
  <div id="end" className="view hidden">
    <div className="end-content">
      <div className="star" aria-hidden="true"><i data-lucide="sparkles"></i></div>
      <h2>Notice the shift</h2>
      <p>Your body has slowed down. Let it stay that way.</p>
      <div className="cta-row">
        <button type="button" id="reset-btn" className="main-btn"><i data-lucide="rotate-ccw" aria-hidden="true"></i> Repeat</button>
        <a href="/resources/" className="button-ghost"><i data-lucide="book-open" aria-hidden="true"></i> Learn more</a>
      </div>
    </div>
  </div>
</div>
</div>

</main>



  <!-- MIND GRACE LIBRARY STACK -->
    {/* script removed for JSX lint */}
</Layout>

    </>
  );
}
export default AstroTemplate;
