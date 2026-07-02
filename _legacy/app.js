const siteData = {
  doctor: {
    name: "Dr. Anita Sharma",
    credentials: "MD (Psychiatry), MBBS",
    tagline: "14+ Years. Compassionate Psychiatry. Outcome-Focused Care.",
    positioning: "Consultant Psychiatrist and Child Development Specialist serving Greater Noida and Delhi NCR.",
    phone: "+91 96678 63295",
    whatsapp: "919667863295",
    email: "dranitasharma86@gmail.com",
    mci: "MCI/11-40210",
    hpr: "71-2147-5815-3754"
  },
  clinic: {
    name: "Mind Grace Neuropsychiatric Clinic",
    address: "J-123, Gamma-2, Greater Noida, Uttar Pradesh 201310",
    timings: "Monday to Saturday, 10:00 AM to 4:00 PM and 5:30 PM to 7:30 PM",
    maps: "https://maps.app.goo.gl/NorMGtR8Uqu5eM8G9"
  },
  landmarks: {
    metro: [
      { name: "Alpha-1 Metro Station", distance: "4.0 km", time: "8 mins", href: "location.html#alpha1" },
      { name: "Delta-1 Metro Station", distance: "3.9 km", time: "8 mins", href: "location.html#delta1" }
    ],
    bus: [
      { name: "Jagat Plaza Bus Stop", distance: "2.4 km", time: "6 mins", href: "location.html#jagat" },
      { name: "Pari Chowk Bus Terminal", distance: "4.0 km", time: "8 mins", href: "location.html#pari" }
    ]
  },
  conditions: [
    { slug: "depression", name: "Depression", type: "adult", query: ["low mood", "hopeless", "tired"], href: "conditions.html#depression" },
    { slug: "anxiety", name: "Anxiety Disorders", type: "adult", query: ["panic", "overthinking", "worry"], href: "conditions.html#anxiety" },
    { slug: "adult-adhd", name: "Adult ADHD", type: "adult", query: ["cant focus", "can't focus", "distracted"], href: "conditions.html#adult-adhd" },
    { slug: "autism", name: "Autism Spectrum", type: "child", query: ["delayed speech", "eye contact", "repetitive"], href: "conditions.html#autism" },
    { slug: "speech-language-delay", name: "Speech and Language Delay", type: "child", query: ["late talking", "speech delay", "unclear speech"], href: "conditions.html#speech-language-delay" }
  ],
  services: [
    { slug: "psychiatric-consultation", name: "Psychiatric Consultation", type: "mind-grace", href: "services.html#psychiatric-consultation" },
    { slug: "medication-management", name: "Medication Management", type: "mind-grace", href: "services.html#medication-management" },
    { slug: "anxiety-disorders", name: "Anxiety and Panic Care", type: "mind-grace", href: "services.html#anxiety-disorders" },
    { slug: "mood-disorders", name: "Depression and Mood Care", type: "mind-grace", href: "services.html#mood-disorders" },
    { slug: "adult-adhd", name: "Adult ADHD Assessment and Care", type: "mind-grace", href: "services.html#adult-adhd" },
    { slug: "speech-therapy", name: "Speech Therapy", type: "aasha", href: "services.html#speech-therapy" },
    { slug: "occupational-therapy", name: "Occupational Therapy", type: "aasha", href: "services.html#occupational-therapy" },
    { slug: "parent-guidance", name: "Parent Guidance", type: "aasha", href: "services.html#parent-guidance" }
  ],
  articles: [
    { title: "About Dr Anita Sharma", href: "about.html" },
    { title: "What to expect in your first visit", href: "process.html" },
    { title: "Frequently asked questions", href: "faq.html" },
    { title: "Clinic location and directions", href: "location.html" },
    { title: "Fees and payment options", href: "fees.html" },
    { title: "Gallery and clinic photos", href: "gallery.html" },
    { title: "Contact details", href: "contact.html" },
    { title: "Mental health tools", href: "resources.html" },
    { title: "Mental health blog", href: "blog/index.html" },
    { title: "Adult mental health articles", href: "blog/adult.html" },
    { title: "Child development articles", href: "blog/children.html" },
    { title: "Speech delay red flags", href: "blog/pages/child/speech-delay-red-flags.html" },
    { title: "Scheduled worry time", href: "blog/pages/adult/scheduled-worry-time-technique.html" },
    { title: "Stimulus control therapy", href: "blog/pages/adult/stimulus-control-therapy.html" }
  ],
  crisisWords: {
    adult: ["suicidal", "want to die", "end my life", "hurt myself", "overdose", "poison", "emergency"],
    child: ["child abuse", "harm to minor"]
  }
};

function initApp() {
  initProgress();
  initConsent();
  initStickyCta();
  initSearch();
  initReturningState();
  initExitIntent();
  initFocusMode();
  initReadingGuide();
  initSymptomTranslator();
  initBookingForms();
  initThankYou();
  initCrisisChecks();
  initEventTracking();
  initSkeletons();
  initContentVersion();
  initFaqAccordions();
  initOfficeHours();
  initIntentPrompt();
  initCopyActions();
  initHelpfulToggles();
  trackPageView();
}

function initProgress() {
  const bar = document.querySelector("[data-progress]");
  if (!bar) return;

  const update = () => {
    const doc = document.documentElement;
    const total = doc.scrollHeight - doc.clientHeight;
    const progress = total > 0 ? (doc.scrollTop / total) * 100 : 0;
    bar.style.width = `${progress}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initConsent() {
  const banner = document.querySelector("[data-consent]");
  const accept = document.querySelector("[data-consent-accept]");
  if (!banner || !accept) return;

  if (localStorage.getItem("mind-grace-consent") === "accepted") {
    banner.classList.add("hidden");
    return;
  }

  accept.addEventListener("click", () => {
    localStorage.setItem("mind-grace-consent", "accepted");
    banner.classList.add("hidden");
    track("consent_accepted", { event: "consent_accepted" });
  });
}

function initStickyCta() {
  const sticky = document.querySelector("[data-sticky-cta]");
  if (!sticky) return;

  let lastScroll = window.scrollY;
  const revealPoint = 120;

  const update = () => {
    const currentScroll = window.scrollY;
    const scrollingDown = currentScroll > lastScroll;
    const pastHero = currentScroll > revealPoint;

    if (scrollingDown && pastHero) {
      sticky.classList.add("visible");
    } else if (!scrollingDown) {
      sticky.classList.remove("visible");
    }

    lastScroll = currentScroll;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initSearch() {
  const overlay = document.querySelector("[data-search-overlay]");
  const openers = document.querySelectorAll("[data-open-search]");
  const closer = document.querySelector("[data-close-search]");
  const input = document.querySelector("[data-search-input]");
  const results = document.querySelector("[data-search-results]");
  if (!overlay || !input || !results) return;

  function render(query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      results.innerHTML = siteData.articles
        .map((item) => `<a class="result" href="${item.href}"><strong>${item.title}</strong><div class="notice">Explore this page</div></a>`)
        .join("");
      return;
    }

    const matches = [];

    siteData.conditions.forEach((item) => {
      if (item.name.toLowerCase().includes(normalized) || item.query.some((term) => normalized.includes(term) || term.includes(normalized))) {
        matches.push({ title: item.name, href: item.href, label: "Condition" });
      }
    });

    siteData.services.forEach((item) => {
      if (item.name.toLowerCase().includes(normalized)) {
        matches.push({ title: item.name, href: item.href, label: "Service" });
      }
    });

    siteData.articles.forEach((item) => {
      if (item.title.toLowerCase().includes(normalized)) {
        matches.push({ title: item.title, href: item.href, label: "Page" });
      }
    });

    results.innerHTML = (matches.length ? matches : [{ title: "No direct match yet", href: "book.html", label: "Start with booking" }])
      .map((item) => `<a class="result" href="${item.href}"><strong>${item.title}</strong><div class="notice">${item.label}</div></a>`)
      .join("");
  }

  openers.forEach((button) => {
    button.addEventListener("click", () => {
      overlay.classList.add("open");
      input.focus();
      track("search_opened", { event: "search_opened" });
    });
  });

  if (closer) {
    closer.addEventListener("click", () => overlay.classList.remove("open"));
  }

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) overlay.classList.remove("open");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") overlay.classList.remove("open");
  });

  input.addEventListener("input", () => render(input.value));
  render("");
}

function initReturningState() {
  const target = document.querySelector("[data-returning-copy]");
  const isReturning = localStorage.getItem("mind-grace-returning") === "yes";
  if (target && isReturning) {
    target.textContent = "Welcome back. If you already know what you need, you can go straight to booking, location, or WhatsApp.";
  }
  localStorage.setItem("mind-grace-returning", "yes");
}

function initExitIntent() {
  const modal = document.querySelector("[data-exit-modal]");
  const dismiss = document.querySelector("[data-exit-dismiss]");
  if (!modal || !dismiss) return;

  let shown = false;
  document.addEventListener("mouseleave", (event) => {
    if (shown || event.clientY > 10) return;
    shown = true;
    modal.classList.add("open");
    track("exit_intent", { event: "exit_intent", page: location.pathname });
  });

  dismiss.addEventListener("click", () => modal.classList.remove("open"));
}

function initFocusMode() {
  const trigger = document.querySelector("[data-focus-toggle]");
  if (!trigger) return;

  trigger.addEventListener("click", () => {
    document.body.classList.toggle("focus-mode");
    trigger.textContent = document.body.classList.contains("focus-mode") ? "Exit focus mode" : "Enter focus mode";
  });
}

function initReadingGuide() {
  const trigger = document.querySelector("[data-reading-guide]");
  if (!trigger) return;

  trigger.addEventListener("click", () => {
    document.body.classList.toggle("reading-guide");
    trigger.textContent = document.body.classList.contains("reading-guide") ? "Hide reading guide" : "Show reading guide";
  });
}

function initSymptomTranslator() {
  const input = document.querySelector("[data-symptom-search]");
  const results = document.querySelector("[data-symptom-results]");
  if (!input || !results) return;

  const render = (query) => {
    const normalized = query.trim().toLowerCase();
    const list = normalized
      ? siteData.conditions.filter((item) => item.query.some((term) => normalized.includes(term) || term.includes(normalized)) || item.name.toLowerCase().includes(normalized))
      : siteData.conditions.slice(0, 3);

    results.innerHTML = list
      .map((item) => `<a class="card" href="${item.href}"><h3>${item.name}</h3><p class="lead" style="font-size:15px">${item.type === "child" ? "Child development" : "Adult psychiatry"} pathway</p></a>`)
      .join("");
  };

  input.addEventListener("input", () => render(input.value));
  render("");
}

function initBookingForms() {
  const gate = document.querySelector("[data-qualification-gate]");
  const formWrap = document.querySelector("[data-booking-form-wrap]");
  const gateButton = document.querySelector("[data-open-booking-form]");
  const form = document.querySelector("[data-booking-form]");
  if (!form) return;

  if (gate && formWrap) {
    formWrap.classList.add("hidden");
  }

  if (gateButton && gate && formWrap) {
    gateButton.addEventListener("click", () => {
      gate.classList.add("hidden");
      formWrap.classList.remove("hidden");
      formWrap.scrollIntoView({ behavior: "smooth", block: "start" });
      track("cta_click", { event: "cta_click", location: "booking_gate", type: "book" });
    });
  }

  const firstField = form.querySelector("input, select, textarea");
  if (firstField) {
    firstField.addEventListener("focus", () => {
      if (form.dataset.started === "yes") return;
      form.dataset.started = "yes";
      track("form_start", { event: "form_start", page: "booking" });
    }, { once: true });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearFormErrors(form);

    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      contact: String(data.get("contact") || "").trim(),
      email: String(data.get("email") || "").trim(),
      concern: String(data.get("concern") || "").trim(),
      preferredTime: String(data.get("preferredTime") || "").trim(),
      message: String(data.get("message") || "").trim(),
      consent: data.get("consent") === "on",
      website: String(data.get("website") || "").trim()
    };

    const errors = validateBookingPayload(payload);
    if (tooManyBookingAttempts()) {
      errors.contact = "Please wait a little before sending another request from this device.";
    }

    if (Object.keys(errors).length) {
      Object.entries(errors).forEach(([field, message]) => {
        showFormError(form, field, message);
        track("form_error", { event: "form_error", field, reason: message });
      });
      return;
    }

    rememberBookingAttempt();

    const route = ["speech", "autism", "school", "development", "child", "adhd-child"].some((item) => payload.concern.toLowerCase().includes(item))
      ? "Aasha"
      : "Mind Grace";

    const appointmentId = `MG-${Date.now().toString().slice(-8)}`;
    const request = {
      ...payload,
      route,
      appointmentId,
      createdAt: new Date().toISOString()
    };

    sessionStorage.setItem("mind-grace-booking-request", JSON.stringify(request));
    track("form_submit", { event: "form_submit", status: "success", route });
    window.location.href = "thank-you.html";
  });
}

function validateBookingPayload(payload) {
  const errors = {};
  const indianPhone = /^(?:\+91[-\s]?)?[6-9]\d{9}$/;

  if (payload.website) {
    errors.name = "We could not verify this request. Please try again.";
    return errors;
  }
  if (payload.name.length < 2) {
    errors.name = "Please enter your full name.";
  }
  if (!indianPhone.test(payload.contact.replace(/\s+/g, ""))) {
    errors.contact = "Please enter a valid Indian mobile number.";
  }
  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!payload.concern) {
    errors.concern = "Please choose the main concern for this visit.";
  }
  if (!payload.preferredTime) {
    errors.preferredTime = "Please choose a preferred time window.";
  }
  if (!payload.consent) {
    errors.consent = "Please confirm that you agree to the privacy note.";
  }

  return errors;
}

function tooManyBookingAttempts() {
  const now = Date.now();
  const attempts = JSON.parse(localStorage.getItem("mind-grace-booking-attempts") || "[]")
    .filter((stamp) => now - stamp < 60 * 60 * 1000);
  localStorage.setItem("mind-grace-booking-attempts", JSON.stringify(attempts));
  return attempts.length >= 5;
}

function rememberBookingAttempt() {
  const now = Date.now();
  const attempts = JSON.parse(localStorage.getItem("mind-grace-booking-attempts") || "[]")
    .filter((stamp) => now - stamp < 60 * 60 * 1000);
  attempts.push(now);
  localStorage.setItem("mind-grace-booking-attempts", JSON.stringify(attempts));
}

function clearFormErrors(form) {
  form.querySelectorAll(".field-error").forEach((node) => node.remove());
  form.querySelectorAll("[aria-invalid='true']").forEach((node) => node.setAttribute("aria-invalid", "false"));
}

function showFormError(form, field, message) {
  const input = form.querySelector(`[name="${field}"]`);
  if (!input) return;
  input.setAttribute("aria-invalid", "true");
  const error = document.createElement("div");
  error.className = "field-error";
  error.textContent = message;
  input.insertAdjacentElement("afterend", error);
}

function initThankYou() {
  const root = document.querySelector("[data-thank-you]");
  if (!root) return;

  const request = JSON.parse(sessionStorage.getItem("mind-grace-booking-request") || "null");
  const fallbackBlock = document.querySelector("[data-thank-you-fallback]");
  const detailsBlock = document.querySelector("[data-thank-you-details]");

  if (!request) {
    if (detailsBlock) detailsBlock.classList.add("hidden");
    if (fallbackBlock) fallbackBlock.classList.remove("hidden");
    return;
  }

  const summary = [
    `Name: ${request.name}`,
    `Contact: ${request.contact}`,
    request.email ? `Email: ${request.email}` : null,
    `Concern: ${request.concern}`,
    `Preferred time: ${request.preferredTime}`,
    request.message ? `Notes: ${request.message}` : null
  ].filter(Boolean).join("\n");

  setText("[data-booking-name]", request.name);
  setText("[data-booking-route]", request.route);
  setText("[data-appointment-id]", request.appointmentId);
  setText("[data-booking-summary]", summary);

  const whatsappText = encodeURIComponent(
    `Hello, I would like to request an appointment.\n\nAppointment ID: ${request.appointmentId}\n${summary}`
  );
  const emailBody = encodeURIComponent(
    `Appointment request\n\nAppointment ID: ${request.appointmentId}\n${summary}`
  );

  const waLink = document.querySelector("[data-whatsapp-summary]");
  const mailLink = document.querySelector("[data-email-summary]");
  if (waLink) waLink.href = `https://wa.me/${siteData.doctor.whatsapp}?text=${whatsappText}`;
  if (mailLink) mailLink.href = `mailto:${siteData.doctor.email}?subject=Appointment%20Request%20${request.appointmentId}&body=${emailBody}`;
}

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}

function initCrisisChecks() {
  document.querySelectorAll("[data-crisis-input]").forEach((input) => {
    const box = input.closest("[data-crisis-box]");
    const output = box ? box.querySelector("[data-crisis-output]") : null;
    if (!output) return;

    input.addEventListener("input", () => {
      const text = input.value.toLowerCase();
      const isChild = siteData.crisisWords.child.some((word) => text.includes(word));
      const isAdult = siteData.crisisWords.adult.some((word) => text.includes(word));

      if (isChild) {
        output.innerHTML = `<div class="notice"><strong>Immediate child safety support:</strong> Call Childline 1098, emergency services 112, or go to the nearest hospital right away.</div>`;
      } else if (isAdult) {
        output.innerHTML = `<div class="notice"><strong>Immediate crisis support:</strong> Call 112, the nearest hospital, or a 24/7 helpline such as Vandrevala Foundation.</div>`;
      } else {
        output.innerHTML = "";
      }
    });
  });
}

function initEventTracking() {
  document.querySelectorAll("[data-track]").forEach((node) => {
    node.addEventListener("click", () => {
      track(node.getAttribute("data-track"), { event: node.getAttribute("data-track") });
    });
  });
}

function initSkeletons() {
  document.querySelectorAll("[data-skeleton-target]").forEach((node) => {
    node.classList.add("skeleton");
    setTimeout(() => node.classList.remove("skeleton"), 750);
  });
}

function initContentVersion() {
  document.querySelectorAll("[data-version-stamp]").forEach((node) => {
    node.textContent = `Updated ${new Date().toLocaleDateString("en-IN")}`;
  });
}

function initFaqAccordions() {
  document.querySelectorAll("[data-faq-trigger]").forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      button.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });
}

function initOfficeHours() {
  const status = getOfficeHoursStatus();

  document.querySelectorAll("[data-office-status]").forEach((node) => {
    node.textContent = status.message;
  });

  document.querySelectorAll("[data-office-hours-mode]").forEach((node) => {
    node.textContent = status.primaryAction;
  });

  document.querySelectorAll("[data-after-hours-only]").forEach((node) => {
    node.classList.toggle("hidden", status.isOfficeHours);
  });
}

function getOfficeHoursStatus() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const isOfficeHours =
    ((day >= 1 && day <= 5) && ((hour >= 10 && hour < 16) || (hour >= 17 && hour < 20))) ||
    (day === 6 && ((hour >= 10 && hour < 16) || (hour >= 17 && hour < 20)));

  return {
    isOfficeHours,
    message: isOfficeHours ? "Clinic hours are open now. You can call, WhatsApp, or complete the booking form." : "Outside clinic hours. You can still send a booking request, WhatsApp message, or call back during the next open session.",
    primaryAction: isOfficeHours ? "Call now" : "Book online"
  };
}

function initIntentPrompt() {
  const modal = document.querySelector("[data-intent-modal]");
  const dismiss = document.querySelector("[data-intent-dismiss]");
  if (!modal) return;

  const views = Number(sessionStorage.getItem("mind-grace-page-views") || "0");
  if (views > 3) {
    modal.classList.add("open");
  }

  if (dismiss) {
    dismiss.addEventListener("click", () => modal.classList.remove("open"));
  }
}

function trackPageView() {
  const views = Number(sessionStorage.getItem("mind-grace-page-views") || "0") + 1;
  sessionStorage.setItem("mind-grace-page-views", String(views));
}

function initCopyActions() {
  document.querySelectorAll("[data-copy-text]").forEach((button) => {
    button.addEventListener("click", async () => {
      const text = button.getAttribute("data-copy-text") || "";
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "Copied";
      } catch (_error) {
        button.textContent = "Copy unavailable";
      }
    });
  });
}

function initHelpfulToggles() {
  document.querySelectorAll("[data-helpful]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-helpful");
      const group = button.closest("[data-helpful-group]");
      if (!group) return;
      group.querySelectorAll("[data-helpful]").forEach((node) => node.classList.remove("active"));
      button.classList.add("active");
      track("page_helpful", { event: "page_helpful", value, page: location.pathname });
    });
  });
}

function track(type, metadata = {}) {
  const payload = { type, metadata, at: new Date().toISOString(), path: location.pathname };
  const existing = JSON.parse(localStorage.getItem("mind-grace-events") || "[]");
  existing.push(payload);
  localStorage.setItem("mind-grace-events", JSON.stringify(existing.slice(-200)));

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: metadata.event || type, ...metadata, path: location.pathname });
}

document.addEventListener("DOMContentLoaded", initApp);

// Mobile Menu Toggle Functionality
function initMobileMenu() {
  const toggle = document.querySelector("#mobile-toggle");
  const panel = document.querySelector("#mobile-nav-panel");
  const overlay = document.querySelector("#mobile-nav-overlay");
  const closeBtn = document.querySelector("#mobile-close");

  if (!toggle || !panel) return;

  function openMenu() {
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    panel.removeAttribute("inert");
    toggle.setAttribute("aria-expanded", "true");
    if (overlay) {
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      overlay.removeAttribute("inert");
    }
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    panel.setAttribute("inert", "");
    toggle.setAttribute("aria-expanded", "false");
    if (overlay) {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      overlay.setAttribute("inert", "");
    }
    document.body.style.overflow = "";
    toggle.focus();
  }

  toggle.addEventListener("click", openMenu);
  if (overlay) overlay.addEventListener("click", closeMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  // Close on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("is-open")) {
      closeMenu();
    }
  });
}

// Sticky Sub-nav on Scroll
function initStickySubNav() {
  const subNav = document.querySelector('.sub-nav');
  if (!subNav) return;
  
  let lastScroll = window.scrollY;
  const stickyPoint = 150;
  
  const update = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > stickyPoint) {
      subNav.classList.add('sticky');
    } else {
      subNav.classList.remove('sticky');
    }
    lastScroll = currentScroll;
  };
  
  update();
  window.addEventListener('scroll', update, { passive: true });
}

// Add to initApp
const originalInitApp = initApp;
initApp = function() {
  originalInitApp();
  initMobileMenu();
  initStickySubNav();
}
