function AstroTemplate() {
  return (
    <>
<Layout headExtra="expr" bodyStart="expr" bodyAttrs=`data-design-system="rose-serenity"`>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5RBGN42B"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

  <div id="network-status" className="network-status" role="status" aria-live="polite" hidden><span className="network-status-message"></span></div>

<link rel="dns-prefetch" href="" />
  <link rel="dns-prefetch" href="https://wa.me" />
  <link rel="dns-prefetch" href="https://wa.me" />
  {/* script removed for JSX lint */}
  <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />

    <!-- Screen reader only static content -->
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
    <div className="top-banner">If the concern becomes urgent, use emergency services or the nearest hospital instead of waiting for routine confirmation.</div>

    <main id="main-content" tabindex="-1" className="section" data-thank-you="">
      <div className="seo-answer"><strong>Direct answer:</strong> Thank you — your appointment request to Mind Grace Neuropsychiatric Clinic in Greater Noida has been captured. Our team calls back on +91 96678 63295 to confirm your slot; for urgent help call the same number or, in an emergency, dial 112 or Tele-MANAS 14416.</div>
<nav className="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Booking Confirmation</li></ol></nav>

      <div className="shell stack">
        <section className="surface panel">
          <p className="eyebrow">Next step</p>
          <h1>Your appointment request is ready for follow-up</h1>
          <p className="lead">
            Thank you, <span data-booking-name="">there</span>. Please use one of the options below so the clinic can coordinate your visit.
          </p>
        </section>

        <section className="surface panel" data-thank-you-details="">
          <div className="two-col">
            <div>
              <h2>Request details</h2>
              <p className="notice">
                Appointment ID: <strong data-appointment-id="">MG-00000000</strong>
              </p>
              <p>Route: <strong data-booking-route="">Mind Grace</strong></p>
              <pre data-booking-summary=""></pre>
            </div>
            <div>
              <h2>Continue now</h2>
              <div className="stack">
                <a className="button-primary" data-whatsapp-summary="" rel="nofollow noopener" href="https://wa.me/919667863295">Send on WhatsApp</a>
                <a className="button-ghost" data-email-summary="" href="mailto:contact@mindgracencr.in">Send by email</a>
                <a className="button-ghost" href="tel:+919667863295">Call the clinic</a>
              </div>
              <div className="notice">
                If you have already sent your request by WhatsApp or email, you do not need to repeat it.
              </div>
            </div>
          </div>
        </section>

        <section className="surface-soft panel hidden" data-thank-you-fallback="">
          <h2>No booking summary was found</h2>
          <p className="lead">
            Please return to the booking page and submit the form again, or contact the clinic directly.
          </p>
          <div className="cta-row">
            <a className="button-primary" href="/book/">Go back to booking</a>
            <a className="button-ghost" rel="nofollow noopener" href="https://wa.me/919667863295">WhatsApp clinic</a>
          </div>
        </section>
      </div>
    </main>
</Layout>

    </>
  );
}
export default AstroTemplate;
