function AstroTemplate() {
  return (
    <>
<Layout headExtra="expr" bodyStart="expr" bodyAttrs=`data-design-system="rose-serenity"`>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5RBGN42B"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

  <div id="network-status" className="network-status" role="status" aria-live="polite" hidden><span className="network-status-message"></span></div>


  <main id="main-content" tabindex="-1" className="page-content" data-tool-stage="leaf">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/resources/">Therapeutic Tools</a></li><li aria-current="page">Leaf on Stream</li></ol></nav>

    <section className="hero-section">
      <h1>Leaf on Stream: notice thoughts without chasing them</h1>
<div className="seo-answer"><strong>What this tool does:</strong> Leaf on Stream is a guided imagery exercise from Mind Grace Neuropsychiatric Clinic — place each thought on a drifting leaf and watch it pass, practising noticing thoughts without chasing them.</div>
      <p className="hero-subtitle">Use a guided imagery exercise to observe thoughts as they pass. Stop if the exercise feels uncomfortable, and seek professional support when distress continues.</p>
    </section>

    <canvas id="riverCanvas" aria-hidden="true"></canvas>

    <div className="tool-link-bar">
        <a href="/">Home</a>
        <a href="/resources/">Resources</a>
    </div>

    <button type="button" id="ui-trigger" aria-label="Toggle release panel" aria-expanded="true"><i data-lucide="sliders-horizontal" aria-hidden="true"></i></button>

    <div id="ui" className="interface">
        <div id="inputModal" className="input-modal">
          <form id="releaseForm">
            <h2>What would you like to release today?</h2>
            <label htmlFor="worryInput">Thought or feeling to release</label>
            <textarea id="worryInput" name="thought" placeholder="Type a worry, thought, or feeling here…" maxlength="200" aria-label="Thought or feeling to release"></textarea>
            <p className="char-count"><span id="charCount">0</span>/200</p>
            <p className="input-hint">Press Enter to release. Use Shift+Enter for a new line.</p>
            <div className="release-actions">
              <button type="submit" id="releaseBtn" className="release-btn"><i data-lucide="leaf" aria-hidden="true"></i> Release</button>
              <button type="button" id="sendBtn" className="send-btn"><i data-lucide="send" aria-hidden="true"></i><span className="visually-hidden">Send thought</span></button>
            </div>
          </form>
        </div>

        <div id="breath-text" className="breath-text" aria-live="polite"></div>
    </div>

    <div src="/assets/js/min/main.min.js" type="module"></div>
    <div src="/assets/js/min/tools-leaf.min.js" type="module"></div>
    <div src="/assets/js/min/tools-leaf-enhancements.min.js" defer></div>

</main>
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

    

  <!-- MIND GRACE LIBRARY STACK -->

    {/* script removed for JSX lint */}
</Layout>

    </>
  );
}
export default AstroTemplate;
