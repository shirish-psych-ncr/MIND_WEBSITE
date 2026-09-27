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
  {/* script removed for JSX lint */}
  <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />

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
  </div>
  <!-- Screen reader only static content -->
  <div className="visually-hidden">
    In a crisis? Get immediate help. Call emergency services if in immediate danger. Visit our emergency page for 24/7 crisis support resources.
  </div>
</div>

<!-- HEADER -->


<!-- MOBILE NAV OVERLAY -->
<div className="mobile-nav-overlay" id="mobile-nav-overlay" hidden></div>

<!-- MOBILE NAV PANEL -->
<nav className="mobile-nav-panel" id="mobile-nav-panel" aria-label="Mobile navigation" inert hidden>
  <div className="mobile-nav-header">
    <h2>Menu</h2>
    <button type="button" className="close-mobile-menu" aria-label="Close menu">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12">
      </path></svg>
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

<div className="progress"><div className="progress-bar" data-progress=""></div></div>

<!-- Main Content -->
<main id="main-content" className="site-main">
      <div className="seo-answer"><strong>Direct answer:</strong> The Mind Grace Neuropsychiatric Clinic gallery shows the clinic's waiting area, counselling rooms and play-therapy spaces in Greater Noida so families know what to expect before their first visit.</div>
<nav className="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Clinic Gallery</li></ol></nav>


    <!-- Hero Section -->
    <section className="page-hero">
        <div className="container">
            <h1 className="hero-title">Our Clinic Gallery</h1>
            <p className="hero-subtitle">See the clinic setting before your visit, then use the location and process pages to plan your arrival.</p>
        </div>
    </section>

    <!-- Media Player Interface -->
    <section className="gallery-player-section" aria-label="Clinic Gallery">
        <div className="container gallery-container">

            <!-- Main Stage (Large View) -->
            <div className="media-stage" id="media-stage" role="region" aria-label="Image Viewer">
                <div className="stage-viewport">
                    <!-- Loading State -->
                    <div className="stage-loader" id="stage-loader" aria-hidden="true">
                        <div className="spinner"></div>
                        <span>Loading…</span>
                    </div>

                    <!-- Error State -->
                    <div className="stage-error" id="stage-error" hidden>
                        <i data-lucide="image-off" aria-hidden="true"></i>
                        <p>Failed to load image</p>
                        <button className="retry-btn" id="retry-btn" type="button">Retry</button>
                    </div>

                    <!-- Same-photo blurred backdrop keeps every aspect ratio visually balanced. -->
                    <div className="stage-backdrop" id="stage-backdrop" aria-hidden="true"></div>
                    <!-- Main Image -->
                    <img
                        id="stage-image"
                        src="/assets/images/location-street-view-distance.webp"
                        alt="Street view of Mind Grace Neuropsychiatric Clinic and AASHA Child Development Centre located in Greater Noida, Uttar Pradesh"
                        className="stage-img"
                        loading="eager"
                        fetchpriority="high"
                        decoding="async"
                     width="1200" height="630" />

                    <!-- Caption Overlay -->
                    <div className="stage-overlay">
                        <h2 id="stage-caption" className="stage-caption">Clinic Exterior</h2>
                        <p id="stage-description" className="stage-desc">An exterior photograph showing the clinic building, entrance, parking area, roadside access, and clinic signage. The image helps patients and families identify the location before visiting.</p>
                    </div>
                </div>

                <!-- Navigation Arrows -->
                <div className="stage-nav">
                    <button className="stage-nav-btn prev-btn" id="prev-btn" aria-label="Previous image" type="button">
                        <i data-lucide="chevron-left" aria-hidden="true"></i>
                    </button>
                    <button className="stage-nav-btn next-btn" id="next-btn" aria-label="Next image" type="button">
                        <i data-lucide="chevron-right" aria-hidden="true"></i>
                    </button>
                </div>
            </div>

            <!-- Section Title Card (appears between categories) -->
            <div className="section-title-card" id="section-title-card" aria-live="polite">
                <h2 className="section-title-text">Welcome to Our Clinic</h2>
                <div className="section-title-decoration"></div>
            </div>

            <!-- Filmstrip (Thumbnails) -->
            <div className="media-filmstrip" id="filmstrip" role="group" aria-label="Gallery thumbnails">
                <!-- Thumbnails injected via JS -->
            </div>

        </div>
    </section>

    <!-- Categories / Info Section -->
    <section className="gallery-meta container">
        <div className="meta-grid">
            <button className="meta-btn meta-btn--ghost" data-category="exterior" data-target-index="0" type="button" aria-label="View Facilities images">
                <h3>Facilities</h3>
                <p>Modern consultation rooms and waiting areas designed for comfort.</p>
            </button>
            <button className="meta-btn meta-btn--ghost" data-category="speech" data-target-index="4" type="button" aria-label="View Therapy Zones images">
                <h3>Therapy Zones</h3>
                <p>Specialized rooms for Speech, Occupational, and Behavioral therapy.</p>
            </button>
            <button className="meta-btn meta-btn--ghost" data-category="team" data-target-index="15" type="button" aria-label="View Team images">
                <h3>Team</h3>
                <p>Meet our dedicated professionals committed to your care.</p>
            </button>
        </div>
    </section>

    <section className="gallery-intro" aria-label="About Our Gallery">
        <div className="container">
            <h2>A Glimpse Into Our Healing Space</h2>
            <p>Welcome to the Mind Grace Neuropsychiatric Clinic gallery. These images showcase our thoughtfully designed clinic environment in Greater Noida, created with your comfort and healing in mind. Our spaces blend clinical excellence with warm, welcoming aesthetics—featuring natural light, calming colors, and private consultation rooms where you can speak freely. From our reception area to our therapy rooms, every detail reflects our commitment to providing a safe, dignified, and compassionate environment for mental health care. We believe that a healing atmosphere is an essential part of treatment, and our gallery offers a window into the care and attention we bring to every aspect of your visit.</p>
        </div>
    </section>

</main>

<!-- NETWORK STATUS TOAST -->
</Layout>

    </>
  );
}
export default AstroTemplate;
