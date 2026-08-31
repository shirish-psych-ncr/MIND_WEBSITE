/* Shared visitor-friendly shell for every Mind Grace route. */
(() => {
  "use strict";

  const navigation = [
    ["Home", "/index.html"],
    ["About", "/about.html"],
    ["Services", "/services.html"],
    ["What to expect", "/process.html"],
    ["Resources", "/resources.html"],
    ["Location", "/location.html"],
    ["Contact", "/contact.html"]
  ];
  const mobileNavigation = [
    {
      label: "Start here",
      icon: "compass",
      children: [
        ["Home", "/index.html"],
        ["About the clinic", "/about.html"],
        ["Dr Anita Sharma", "/dr-anita-sharma.html"],
        ["Our care team", "/doctors.html"]
      ]
    },
    {
      label: "Care and services",
      icon: "heart-handshake",
      children: [
        ["Services", "/services.html"],
        ["What to expect", "/process.html"],
        ["Fees and payments", "/fees.html"],
        {
          label: "Who we support",
          icon: "users-round",
          children: [
            ["Adult mental health", "/conditions.html"],
            ["Child development", "/aasha.html"],
            ["Our care approach", "/approach.html"]
          ]
        }
      ]
    },
    {
      label: "Explore and learn",
      icon: "book-open",
      children: [
        ["Resources", "/resources.html#tools"],
        ["Clinic gallery", "/gallery.html"],
        ["Patient experiences", "/testimonials.html"],
        ["Blog", "/blog/index.html"],
        ["Frequently asked questions", "/faq.html#common-questions"]
      ]
    },
    {
      label: "Self-help tools",
      icon: "sparkles",
      href: "/resources.html#tools",
      children: [
        ["All self-help tools", "/resources.html#tools"],
        ["Guided breathing", "/tools/guided-breathing.html"],
        ["Butterfly tapper", "/tools/butterfly-tapper.html"],
        ["Eye movement", "/tools/eye-movement.html"],
        ["Hypnotic fractal", "/tools/hypnos-fractal.html"],
        ["Horizon scan", "/tools/horizon-scan.html"],
        ["River of Release", "/tools/leaf-on-stream.html"]
      ]
    },
    {
      label: "Visit and contact",
      icon: "map-pin",
      children: [
        ["Find the clinic", "/location.html"],
        ["Contact", "/contact.html"],
        ["Emergency help", "/emergency.html"]
      ]
    }
  ];
  const themeKey = "mindgrace-theme";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function currentFile() {
    const parts = window.location.pathname.replace(/\\/g, "/").split("/").filter(Boolean);
    return parts.at(-1) || "index.html";
  }

  function isLocalLink(href) {
    return href && !/^(?:#|https?:|mailto:|tel:|sms:|javascript:|data:)/i.test(href);
  }

  function linkMarkup(items = navigation) {
    return items.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join("");
  }

  function mobileTreeMarkup(items, level = 0, parentId = "mobile-nav") {
    const listClass = level === 0 ? "mobile-nav-tree" : "mobile-nav-children";
    const listId = level === 0 ? "" : ` id="${parentId}"`;
    const hidden = level === 0 ? "" : " hidden";
    return `<ul class="${listClass}"${listId}${hidden}>${items.map((item, index) => {
      if (Array.isArray(item)) return `<li class="mobile-nav-tree-item"><a class="mobile-nav-tree-link" href="${item[1]}">${item[0]}</a></li>`;
      const branchId = `${parentId}-branch-${level}-${index}`;
      const parentLink = item.href
        ? `<a class="mobile-nav-tree-link" href="${item.href}">${item.label}</a>`
        : `<button type="button" class="mobile-nav-tree-parent" data-nav-label="${item.label}" aria-label="Show ${item.label} options" aria-controls="${branchId}" aria-expanded="false"><i data-lucide="${item.icon || "folder"}" aria-hidden="true"></i><span>${item.label}</span><i data-lucide="chevron-right" class="mobile-nav-branch-chevron" aria-hidden="true"></i></button>`;
      const disclosure = item.href
        ? `<button type="button" class="mobile-nav-disclosure" data-nav-label="${item.label}" aria-label="Show ${item.label} options" aria-controls="${branchId}" aria-expanded="false"><i data-lucide="chevron-right" aria-hidden="true"></i></button>`
        : "";
      return `<li class="mobile-nav-tree-item mobile-nav-tree-item--branch"><div class="mobile-nav-tree-row">${parentLink}${disclosure}</div>${mobileTreeMarkup(item.children || [], level + 1, branchId)}</li>`;
    }).join("")}</ul>`;
  }

  function selectedTheme() {
    const saved = window.localStorage?.getItem(themeKey);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function refreshIcons() {
    if (window.lucide?.createIcons) {
      try { window.lucide.createIcons(); } catch (_) { /* icon rendering is non-blocking */ }
    }
    document.dispatchEvent(new Event("icons:refresh"));
  }

  function setTheme(theme, persist = true) {
    const value = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = value;
    document.documentElement.style.colorScheme = value;
    if (persist) window.localStorage?.setItem(themeKey, value);
    const toggle = $("#theme-toggle");
    if (toggle) {
      const dark = value === "dark";
      toggle.setAttribute("aria-pressed", String(dark));
      toggle.setAttribute("aria-label", dark ? "Use light theme" : "Use dark theme");
      toggle.innerHTML = `<i data-lucide="${dark ? "sun" : "moon"}" aria-hidden="true"></i><span class="visually-hidden">${dark ? "Light theme" : "Dark theme"}</span>`;
      refreshIcons();
    }
  }

  function ensureIcons() {
    if (!document.querySelector("[data-lucide]")) return;
    if (window.lucide?.createIcons) { refreshIcons(); return; }
    if (document.querySelector("script[data-mindgrace-lucide]")) return;
    const script = document.createElement("script");
    script.src = "/assets/js/lib/lucide.min.js";
    script.defer = true;
    script.dataset.mindgraceLucide = "true";
    script.addEventListener("load", refreshIcons, { once: true });
    document.head.appendChild(script);
  }

  function ensureFinalStyles() {
    const placeLast = () => {
      const parent = document.body || document.head;
      [
        document.querySelector("link[data-mindgrace-final-foundation]"),
        document.querySelector("link[data-mindgrace-final-tool-overrides]"),
        document.querySelector("link[data-mindgrace-final-tool-shell]")
      ].filter(Boolean).forEach((link) => parent.appendChild(link));
    };
    if (document.querySelector("link[data-mindgrace-final-foundation]")) {
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", placeLast, { once: true });
      else placeLast();
      return;
    }
    const appendStylesheet = (href, marker) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.dataset[marker] = "true";
      document.head.appendChild(link);
    };
    appendStylesheet("/assets/css/site-foundation.css?v=chrome9", "mindgraceFinalFoundation");
    if (window.location.pathname.replace(/\\/g, "/").includes("/tools/")) {
      appendStylesheet("/assets/css/tool-overrides.css?v=tools5", "mindgraceFinalToolOverrides");
      appendStylesheet("/assets/css/tools-shell.css?v=toolview6", "mindgraceFinalToolShell");
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", placeLast, { once: true });
    else placeLast();
  }

  function buildHeader() {
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `<div class="header-inner">
      <a class="logo-link" href="/index.html">
        <img class="logo-img" src="/assets/images/Mind_Grace_Clinic_Logo_Pink.svg" alt="" width="180" height="60" loading="eager" decoding="async">
        <span class="logo-copy"><span class="logo-text" id="site-logo-name">Mind Grace</span><span class="logo-tagline">Neuropsychiatric Clinic | Where You Come First</span></span>
      </a>
      <nav class="desktop-nav" aria-label="Main navigation"><ul>${linkMarkup()}<li><a class="btn btn--primary" href="/book.html">Book an appointment</a></li></ul></nav>
      <div class="header-actions">
        <button type="button" class="theme-toggle" id="theme-toggle" aria-pressed="false" aria-label="Use dark theme"><i data-lucide="moon" aria-hidden="true"></i><span class="visually-hidden">Dark theme</span></button>
        <button type="button" class="mobile-nav-trigger" id="burgerMenuBtn" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-nav-panel"><i data-lucide="menu" aria-hidden="true"></i></button>
        <a class="mobile-book-btn" href="/book.html" aria-label="Book an appointment"><i data-lucide="calendar" aria-hidden="true"></i><span class="visually-hidden">Book an appointment</span></a>
      </div>
    </div>`;
    return header;
  }

  function buildFooter() {
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `<div class="footer-container">
      <div class="footer-brand"><img class="footer-logo" src="/assets/images/Mind_Grace_Clinic_Logo_Pink.svg" alt="" width="180" height="60" loading="lazy"><p class="footer-tagline">Where You Come First</p><p class="footer-description">Compassionate neuropsychiatric care in Greater Noida for adults, children, adolescents, and families.</p><a class="footer-phone" href="tel:+919667863295">Call +91 96678 63295</a></div>
      <nav class="footer-links" aria-label="Footer navigation"><div><h2>Patient care</h2><ul><li><a href="/book.html">Book an appointment</a></li><li><a href="/services.html">Our services</a></li><li><a href="/process.html">What to expect</a></li><li><a href="/location.html">Find us</a></li></ul></div><div><h2>Help and resources</h2><ul><li><a href="/faq.html#common-questions">Frequently asked questions</a></li><li><a href="/resources.html#tools">Self-help tools</a></li><li><a href="/gallery.html">Clinic gallery</a></li><li><a href="/emergency.html">Emergency help</a></li><li><a href="/contact.html">Contact</a></li></ul></div></nav>
      <address class="footer-contact"><h2>Visit or call</h2><p>Mind Grace Neuropsychiatric Clinic<br>J123, Gamma II, Greater Noida, 201310</p><p><a href="tel:+919667863295">+91 96678 63295</a><br><a href="mailto:contact@mindgracencr.in">contact@mindgracencr.in</a></p></address>
    </div><div class="footer-bottom"><p>&copy; <span id="year"></span> Mind Grace Neuropsychiatric Clinic. Educational information only.</p><div><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a><a href="/disclaimer.html">Disclaimer</a><a href="/consent.html">Consent</a></div></div>`;
    return footer;
  }

  function preserveMain() {
    let main = $("main");
    if (!main) {
      main = document.createElement("main");
      main.id = "main-content";
      [...document.body.children].forEach((child) => {
        if (!child.matches("header, footer, .site-header, .mobile-nav-panel, .mobile-nav-overlay, script, link, .skip-link, .network-status")) main.appendChild(child);
      });
      document.body.appendChild(main);
    }
    main.id ||= "main-content";
    main.removeAttribute("role");
    main.setAttribute("tabindex", "-1");
    return main;
  }

  function normalizeSkipLink() {
    const links = $$(".skip-link");
    const skip = links[0] || document.createElement("a");
    skip.className = "skip-link";
    skip.href = "#main-content";
    skip.textContent = "Skip to main content";
    if (!skip.parentElement) document.body.prepend(skip);
    links.slice(1).forEach((link) => link.remove());
    return skip;
  }

  function bindMenu(header, mobileNav, overlay) {
    const toggle = $("#burgerMenuBtn", header);
    const close = $(".close-mobile-menu", mobileNav);
    const branchButtons = $$(".mobile-nav-disclosure, .mobile-nav-tree-parent", mobileNav);
    let lastFocus = null;
    const setBranchOpen = (button, open) => {
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      if (!panel) return;
      button.setAttribute("aria-expanded", String(open));
      if (button.dataset.navLabel) button.setAttribute("aria-label", `${open ? "Hide" : "Show"} ${button.dataset.navLabel} options`);
      panel.hidden = !open;
      button.classList.toggle("is-expanded", open);
      if (!open) $$(".mobile-nav-disclosure, .mobile-nav-tree-parent", panel).forEach((child) => setBranchOpen(child, false));
    };
    branchButtons.forEach((button) => {
      button.addEventListener("click", () => setBranchOpen(button, button.getAttribute("aria-expanded") !== "true"));
    });
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      toggle.innerHTML = `<i data-lucide="${open ? "x" : "menu"}" aria-hidden="true"></i>`;
      mobileNav.hidden = !open;
      overlay.hidden = !open;
      mobileNav.toggleAttribute("inert", !open);
      mobileNav.classList.toggle("is-open", open);
      overlay.classList.toggle("is-active", open);
      document.body.classList.toggle("menu-open", open);
      if (!open) branchButtons.forEach((button) => setBranchOpen(button, false));
      refreshIcons();
      if (open) { lastFocus = document.activeElement; close.focus(); } else { lastFocus?.focus?.(); }
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    close.addEventListener("click", () => setOpen(false));
    overlay.addEventListener("click", () => setOpen(false));
    mobileNav.addEventListener("click", (event) => { if (event.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !mobileNav.hidden) setOpen(false); });
  }

  function normalizeSiteChrome() {
    if (!document.body || document.body.dataset.chromeNormalized === "true") return { main: $("main") };
    const main = preserveMain();
    normalizeSkipLink();
    $$("header, footer, .site-header, .mobile-nav-panel, .mobile-nav-overlay").forEach((node) => node.remove());
    const header = buildHeader();
    const skip = $(".skip-link");
    if (skip) skip.after(header); else document.body.prepend(header);
    const overlay = document.createElement("div");
    overlay.className = "mobile-nav-overlay";
    overlay.id = "mobile-nav-overlay";
    overlay.hidden = true;
    const mobileNav = document.createElement("nav");
    mobileNav.className = "mobile-nav-panel";
    mobileNav.id = "mobile-nav-panel";
    mobileNav.setAttribute("aria-label", "Mobile navigation");
    mobileNav.hidden = true;
    mobileNav.setAttribute("inert", "");
    mobileNav.innerHTML = `<div class="mobile-nav-panel-inner"><div class="mobile-nav-header"><div><p class="mobile-nav-kicker">Mind Grace</p><h2>Find your next step</h2></div><button type="button" class="close-mobile-menu" aria-label="Close navigation menu"><i data-lucide="x" aria-hidden="true"></i></button></div><p class="mobile-nav-intro">Choose a section, then open a branch to see the pages inside it.</p>${mobileTreeMarkup(mobileNavigation)}<a class="btn btn--primary mobile-nav-appointment" href="/book.html"><i data-lucide="calendar" aria-hidden="true"></i> Book an appointment</a></div>`;
    header.after(overlay, mobileNav);
    const footer = buildFooter();
    document.body.appendChild(footer);
    footer.querySelector("#year").textContent = String(new Date().getFullYear());
    bindMenu(header, mobileNav, overlay);
    $("#theme-toggle", header).addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
    setTheme(selectedTheme(), false);
    document.body.dataset.chromeNormalized = "true";
    window.dispatchEvent(new Event("mindgrace:chrome-ready"));
    ensureIcons();
    return { main, header, footer };
  }

  function markCurrentNavigation() {
    const file = currentFile();
    $$(".desktop-nav a[href], .mobile-nav-panel a[href], .footer-links a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (!isLocalLink(href)) return;
      const target = href.split("#")[0].split("?")[0].replace(/\\/g, "/").split("/").filter(Boolean).at(-1) || "index.html";
      const current = target === file;
      link.classList.toggle("is-current", current);
      if (current) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });
  }

  function enhanceBreadcrumbs(main) {
    if (!main || currentFile() === "index.html") return;
    const labels = {
      "about.html": "About the clinic", "services.html": "Services", "process.html": "What to expect",
      "resources.html": "Resources", "location.html": "Find the clinic", "contact.html": "Contact",
      "book.html": "Book an appointment", "emergency.html": "Emergency help", "conditions.html": "Conditions we support",
      "doctors.html": "Care team", "dr-anita-sharma.html": "Dr Anita Sharma", "aasha.html": "Aasha child development",
      "gallery.html": "Clinic gallery", "fees.html": "Fees and payments", "faq.html": "Frequently asked questions",
      "privacy.html": "Privacy", "terms.html": "Terms", "disclaimer.html": "Medical disclaimer",
      "consent.html": "Consent", "mind-grace.html": "Mind Grace overview", "thank-you.html": "Thank you"
    };
    const file = currentFile();
    const title = $("h1", main)?.textContent?.replace(/\s+/g, " ").trim();
    const slugLabel = (value) => value.replace(/\.html$/i, "").split("-").map((part) => part ? part[0].toUpperCase() + part.slice(1) : part).join(" ");
    const entries = [{ label: "Home", href: "/index.html" }];
    const path = window.location.pathname.replace(/\\/g, "/");
    if (path.startsWith("/blog/")) {
      entries.push({ label: "Blog", href: "/blog/index.html" });
      if (path.includes("/adult/")) entries.push({ label: "Adult mental health", href: "/blog/adult.html" });
      else if (path.includes("/child/")) entries.push({ label: "Child development", href: "/blog/children.html" });
    } else if (path.startsWith("/tools/")) {
      entries.push({ label: "Resources", href: "/resources.html" });
      entries.push({ label: "Therapeutic tools", href: "/resources.html#tools" });
    }
    entries.push({ label: title || labels[file] || slugLabel(file), href: null });
    let nav = $(".breadcrumbs", main) || $("nav[aria-label='Breadcrumb']", main);
    if (!nav) { nav = document.createElement("nav"); nav.className = "breadcrumbs"; main.prepend(nav); }
    nav.setAttribute("aria-label", "Breadcrumb");
    const list = document.createElement("ol");
    entries.forEach(({ label, href }, index) => {
      const item = document.createElement("li");
      if (index) { const separator = document.createElement("span"); separator.className = "breadcrumb-separator"; separator.setAttribute("aria-hidden", "true"); separator.innerHTML = '<i data-lucide="chevron-right"></i>'; item.appendChild(separator); }
      if (href) { const link = document.createElement("a"); link.href = href; link.textContent = label; item.appendChild(link); }
      else { item.setAttribute("aria-current", "page"); const text = document.createElement("span"); text.textContent = label; item.appendChild(text); }
      list.appendChild(item);
    });
    nav.replaceChildren(list);
    ensureIcons();
  }

  function initializeRevealMotion() {
    const candidates = $$(".fade-in-up, .service-card, .feature-card, .condition-card, .testimonial-card, .article-card");
    if (!candidates.length || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { candidates.forEach((element) => element.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries, instance) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); instance.unobserve(entry.target); } }), { threshold: 0.08, rootMargin: "0px 0px -32px" });
    candidates.forEach((element) => observer.observe(element));
  }

  function initializeImageFallbacks() {
    $$('img[data-image-fallback]').forEach((image) => {
      image.addEventListener('error', () => {
        image.hidden = true;
        const fallback = image.nextElementSibling;
        if (fallback) {
          fallback.style.display = 'block';
          fallback.setAttribute('role', 'img');
          fallback.setAttribute('aria-label', `Placeholder for ${image.alt || 'unavailable image'}`);
        }
      }, { once: true });
    });
  }

  function initialize() {
    document.documentElement.dataset.designSystem = "rose-serenity";
    ensureFinalStyles();
    const shell = normalizeSiteChrome();
    enhanceBreadcrumbs(shell?.main || $("main"));
    markCurrentNavigation();
    initializeRevealMotion();
    initializeImageFallbacks();
    document.body.dataset.visitorFriendly = "true";
    ensureIcons();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
