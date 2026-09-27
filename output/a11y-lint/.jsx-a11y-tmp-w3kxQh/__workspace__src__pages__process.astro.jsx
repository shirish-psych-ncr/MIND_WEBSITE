function AstroTemplate() {
  return (
    <>
<Layout headExtra="expr" bodyStart="expr" bodyAttrs=`data-design-system="rose-serenity"`>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5RBGN42B"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

  <div id="network-status" className="network-status" role="status" aria-live="polite" hidden><span className="network-status-message"></span></div>

    <!-- OpenGraph / Social Sharing -->
    <meta property="og:title" content="Your Journey to Wellness | Mind Grace Neuropsychiatric Clinic" />
    <meta property="og:description" content="Clear step-by-step guidance for your mental health journey—transparent, compassionate, personalized." />
    <meta property="og:image" content="/assets/images/mind-grace-entry-n-reception.webp" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="675" />
    <meta property="og:image:alt" content="Mind Grace Neuropsychiatric Clinic - Compassionate Mental Health Care" />
    <meta property="og:image:type" content="image/webp" />
    <meta property="og:url" content="https://mindgracencr.in/process/" />
    <meta property="og:site_name" content="Mind Grace Neuropsychiatric Clinic" />
    <meta property="og:type" content="website" />

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Your Journey to Wellness | Mind Grace Neuropsychiatric Clinic" />

    <!-- Structured Data -->
    {/* script removed for JSX lint */}

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&#x26;family=Playfair+Display:wght@600;700&#x26;display=swap" />

    <!-- Stylesheets - Modular CSS Architecture -->
    <link rel="stylesheet" href="/assets/css/min/base.min.css" />
    <link rel="stylesheet" href="/assets/css/min/layout.min.css" />
    <link rel="stylesheet" href="/assets/css/min/components.min.css" />
    <link rel="stylesheet" href="/assets/css/min/breadcrumbs.min.css" />
      <link rel="stylesheet" href="/assets/css/min/seo-pages.min.css" />
    <link rel="stylesheet" href="/assets/css/min/utilities.min.css" />
    <link rel="stylesheet" href="/assets/css/min/animations.min.css" />
  <link rel="stylesheet" href="/assets/css/min/crisis-banner.min.css" />
    <!-- MIND GRACE LIBRARY STACK -->
    <div src="/assets/js/min/http-client.min.js" type="module"></div>
    <div defer src="/assets/js/min/icon-init.min.js"></div>
    <div defer src="/assets/js/min/ui-popovers.min.js"></div>
    <div defer src="/assets/js/min/carousel-init.min.js"></div>
    <div src="/assets/js/min/main.min.js" type="module"></div>
    <div defer src="/assets/js/min/animations-auto.min.js"></div>
  <div defer src="/assets/js/min/crisis-banner.min.js"></div>
    <!-- END LIBRARY STACK -->

    <!-- Network Status Toast -->
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
        In a crisis? Get immediate help. Call emergency services if in immediate
        danger. Visit our emergency page for 24/7 crisis support resources.
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

    <!-- SKIP LINK -->
    <a href="#main-content" className="visually-hidden">Skip to main content</a>

    <!-- HEADER -->

    <!-- MOBILE NAV OVERLAY -->

    <!-- MOBILE NAV PANEL -->

    <!-- MAIN CONTENT -->
    <main id="main-content" tabindex="-1">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Your Care Journey</li></ol></nav>

      <!-- HERO SECTION -->
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-eyebrow">Before your first visit</p>
          <h1>Know what to expect from your first visit</h1>

<div className="seo-answer"><strong>Direct answer:</strong> Your first consultation at Mind Grace in Greater Noida is a focused conversation about what you are experiencing, what you want help with, and which next steps may be appropriate. Initial psychiatric consultations take about 45 minutes; follow-ups about 30 minutes.</div>
          <p className="hero-lead">
            A first consultation is a focused conversation about what you are experiencing, what you want help with, and which next steps may be appropriate.
          </p>
          <div className="hero-cta">
            <a href="/book/" className="button-primary">Request an appointment</a>
            <a href="/faq/" className="button-outline">Read common questions</a>
          </div>
        </div>
        <div className="hero-image" fetchpriority="high">
          <img loading="eager" decoding="async" src="/assets/images/mind-grace-entry-n-reception.webp" alt="Welcoming reception area at Mind Grace Neuropsychiatric Clinic" width="800" height="600" fetchpriority="high" srcset="/assets/images/mind-grace-entry-n-reception.webp" />
        </div>
      </section>

      <!-- STEP-BY-STEP PROCESS -->
      <section className="section-padded">
        <div className="container-narrow">
          <div className="section-header-center">
            <span className="section-badge">The Process</span>
            <h2>From first contact to follow-up</h2>
            <p className="section-intro">
              The process is explained in plain language so you can prepare, ask questions, and make informed decisions about care.
            </p>
          </div>

          <div className="process-timeline">
            <!-- Step 1 -->
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Request an appointment</h3>
                <p>
                  Reach out by phone, WhatsApp, email, or our booking form. If
                  you're unsure which route fits your situation, our team can
                  help you decide the best way forward.
                </p>
                <ul className="check-list">
                  <li>No special preparation needed</li>
                  <li>
                    Bring existing prescriptions or reports if available
                    (optional)
                  </li>
                  <li>We'll guide you through next steps</li>
                </ul>
              </div>
            </div>

            <!-- Step 2 -->
            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>First consultation</h3>
                <p>
                  Allow around 45 minutes for a comprehensive first consultation
                  so the discussion doesn't feel rushed. The conversation begins
                  with what has been troubling you and how long it has affected
                  daily life.
                </p>
                <ul className="check-list">
                  <li>
                    Discussion of sleep, mood, concentration, stress patterns
                  </li>
                  <li>Family context and past treatment history</li>
                  <li>
                    For children: development, speech, school concerns, parent
                    observations
                  </li>
                </ul>
              </div>
            </div>

            <!-- Step 3 -->
            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Assessment &#x26; Understanding</h3>
                <p>
                  The aim is to understand your pattern clearly and explain
                  findings in plain language. You won't be rushed into decisions
                  or overwhelmed with technical terms.
                </p>
                <ul className="check-list">
                  <li>Clear explanation of what we've understood</li>
                  <li>Discussion of possible diagnoses (if applicable)</li>
                  <li>Time for your questions and concerns</li>
                </ul>
              </div>
            </div>

            <!-- Step 4 -->
            <div className="process-step">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3>Treatment Planning</h3>
                <p>
                  Together, we create a personalized plan that may include
                  medication, therapy, lifestyle adjustments, or further
                  assessment—whatever serves your needs best.
                </p>
                <ul className="check-list">
                  <li>Medication discussed only when appropriate</li>
                  <li>Therapy options explained clearly</li>
                  <li>Practical routines and self-care strategies</li>
                </ul>
              </div>
            </div>

            <!-- Step 5 -->
            <div className="process-step">
              <div className="step-number">05</div>
              <div className="step-content">
                <h3>Ongoing Care &#x26; Follow-up</h3>
                <p>
                  You'll leave with clarity about next steps, whether that's
                  scheduling follow-ups, starting therapy, beginning medication,
                  or focusing on lifestyle changes first.
                </p>
                <ul className="check-list">
                  <li>Clear follow-up schedule</li>
                  <li>Access to support between visits</li>
                  <li>Adjustments as needed based on progress</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ SECTION -->
      <section className="section-padded bg-soft">
        <div className="container-narrow">
          <div className="section-header-center">
            <span className="section-badge">Questions</span>
            <h2>Common Questions Before Your First Visit</h2>
          </div>

          <div className="accordion">
            <div className="accordion-item">
              <button className="accordion-trigger" type="button" data-accordion-trigger="" aria-expanded="false" aria-controls="faq-process-1">
                <span className="accordion-title">Do I need a diagnosis before I book?</span>
                <span className="accordion-icon" aria-hidden="true">+</span>
              </button>
              <div className="accordion-panel" id="faq-process-1" hidden>
                <p>
                  No. You can start with what you are experiencing. Many people
                  come without any prior diagnosis—we'll work together to
                  understand what's happening and what might help.
                </p>
              </div>
            </div>

            <div className="accordion-item">
              <button className="accordion-trigger" type="button" data-accordion-trigger="" aria-expanded="false" aria-controls="faq-process-2">
                <span className="accordion-title">Will I be judged for what I say?</span>
                <span className="accordion-icon" aria-hidden="true">+</span>
              </button>
              <div className="accordion-panel" id="faq-process-2" hidden>
                <p>
                  The consultation is meant to be calm, respectful, and
                  practical. The goal is understanding and support, not blame.
                  Everything shared is confidential within ethical guidelines.
                </p>
              </div>
            </div>

            <div className="accordion-item">
              <button className="accordion-trigger" type="button" data-accordion-trigger="" aria-expanded="false" aria-controls="faq-process-3">
                <span className="accordion-title">Will I definitely be given medicine?</span>
                <span className="accordion-icon" aria-hidden="true">+</span>
              </button>
              <div className="accordion-panel" id="faq-process-3" hidden>
                <p>
                  Not always. Medication is considered when appropriate,
                  alongside practical and therapeutic options. Some concerns
                  respond well to therapy or lifestyle changes alone.
                </p>
              </div>
            </div>

            <div className="accordion-item">
              <button className="accordion-trigger" type="button" data-accordion-trigger="" aria-expanded="false" aria-controls="faq-process-4">
                <span className="accordion-title">Can a parent come along for a child or adolescent
                  visit?</span>
                <span className="accordion-icon" aria-hidden="true">+</span>
              </button>
              <div className="accordion-panel" id="faq-process-4" hidden>
                <p>
                  Yes. Parent observations are often important, especially for
                  development, behaviour, and school concerns. For adolescents,
                  part of the session may be private to build trust.
                </p>
              </div>
            </div>

            <div className="accordion-item">
              <button className="accordion-trigger" type="button" data-accordion-trigger="" aria-expanded="false" aria-controls="faq-process-5">
                <span className="accordion-title">What if I'm not ready to say everything in the first
                  visit?</span>
                <span className="accordion-icon" aria-hidden="true">+</span>
              </button>
              <div className="accordion-panel" id="faq-process-5" hidden>
                <p>
                  That is okay. The pace can be adjusted. A first consultation
                  does not require you to say everything at once. Trust builds
                  over time, and we respect your readiness.
                </p>
              </div>
            </div>
          </div>

          <div className="section-cta-center">
            <a href="/faq/" className="button-ghost">View the full FAQ <i data-lucide="arrow-right" aria-hidden="true"></i></a>
          </div>
        </div>
      </section>

      <!-- CTA SECTION -->
      <section className="section-padded bg-dark text-light">
        <div className="container-narrow text-center">
          <h2>Ready to request a visit?</h2>
          <p className="lead">
            Review the appointment details, then choose the contact option that feels most convenient.
          </p>
          <div className="cta-group">
            <a href="/book/" className="button-primary button-large">Request an Appointment</a>
            <a href="/contact/" className="button-outline button-large">Contact Us</a>
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
</Layout>

    </>
  );
}
export default AstroTemplate;
