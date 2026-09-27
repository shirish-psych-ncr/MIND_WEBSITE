function AstroTemplate() {
  return (
    <>
<aside className="emergency-banner emergency-banner--static" role="note" aria-labelledby="emergency-notice-title"><div className="emergency-banner__content"><span id="emergency-notice-title">Not an emergency service.</span><span>Immediate danger? Call <a href="tel:112">112</a>.</span><a href="/emergency/">Emergency resources</a></div></aside>
<a className="skip-link" href="#main-content">Skip to main content</a>
<header className="site-header" data-shared-shell>
  <div className="header-inner">
    <a className="logo-link" href="/">
      <img className="logo-img" src="/assets/images/mind-grace-clinic-logo-pink.svg" alt="Mind Grace Neuropsychiatric Clinic" width="180" height="60" loading="eager" decoding="async" />
      <span className="logo-copy"><span className="logo-text" id="site-logo-name">Mind Grace</span><span className="logo-tagline">Neuropsychiatric Clinic | Where You Come First</span></span>
    </a>
    <nav className="desktop-nav" aria-label="Main navigation"><ul>{navigation.map(([label, href]) => <li><a href="expr">{label}</a></li>)}<li><a className="btn btn--primary" href="/book/">Book an appointment</a></li></ul></nav>
    <div className="header-actions">
      <button type="button" className="accessibility-toggle" id="accessibility-toggle" aria-expanded="false" aria-controls="accessibility-panel">Accessibility</button>
      <button type="button" className="theme-toggle" id="theme-toggle" aria-pressed="false" aria-label="Use dark theme"><i data-lucide="moon" aria-hidden="true"></i><span className="visually-hidden">Dark theme</span></button>
      <button type="button" className="mobile-nav-trigger" id="burgerMenuBtn" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-nav-panel"><i data-lucide="menu" aria-hidden="true"></i></button>
      <a className="mobile-book-btn" href="/book/" aria-label="Book an appointment"><i data-lucide="calendar-days" aria-hidden="true"></i><span className="mobile-book-label">Book</span><span className="visually-hidden">Book an appointment</span></a>
    </div>
  </div>
</header>
<footer className="site-footer" data-shared-shell>
  <div className="footer-container">
    <div className="footer-brand"><img className="footer-logo" src="/assets/images/mind-grace-clinic-logo-pink.svg" alt="" width="180" height="60" loading="lazy" /><p className="footer-tagline">Where You Come First</p><p className="footer-description">Compassionate neuropsychiatric care in Greater Noida for adults, children, adolescents, and families.</p><a className="footer-phone" href="tel:+919667863295">Call +91 96678 63295</a></div>
    <nav className="footer-links" aria-label="Footer navigation"><div><h2>Patient care</h2><ul><li><a href="/book/">Book an appointment</a></li><li><a href="/services/">Our services</a></li><li><a href="/process/">What to expect</a></li><li><a href="/location/">Find us</a></li></ul></div><div><h2>Help and resources</h2><ul><li><a href="/faq/#common-questions">Frequently asked questions</a></li><li><a href="/resources/#tools">Self-help tools</a></li><li><a href="/gallery/">Clinic gallery</a></li><li><a href="/emergency/">Emergency help</a></li><li><a href="/contact/">Contact</a></li></ul></div></nav>
    <address className="footer-contact"><h2>Visit or call</h2><p>Mind Grace Neuropsychiatric Clinic<br />J123, Gamma II, Greater Noida, 201310</p><p><a href="tel:+919667863295">+91 96678 63295</a><br /><a href="mailto:contact@mindgracencr.in">contact@mindgracencr.in</a></p></address>
  </div><div className="footer-bottom"><p>&copy; <span id="year">2026</span> Mind Grace Neuropsychiatric Clinic. Educational information only.</p><div><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/disclaimer/">Disclaimer</a><a href="/consent/">Consent</a></div></div>
</footer>

    </>
  );
}
export default AstroTemplate;
