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
    appendStylesheet("/assets/css/site-foundation.css?v=chrome13", "mindgraceFinalFoundation");
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
        <a class="mobile-book-btn" href="/book.html" aria-label="Book an appointment"><i data-lucide="calendar-days" aria-hidden="true"></i><span class="mobile-book-label">Book</span><span class="visually-hidden">Book an appointment</span></a>
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

  // Give every meaningful page a clear concern-to-care pathway. The copy is
  // intentionally factual and local, so it remains useful without making a
  // diagnosis or promising an outcome.
  function addContentPathway(main) {
    if (!main || main.querySelector("[data-content-pathway]")) return;
    const path = window.location.pathname.replace(/\\/g, "/");
    const file = currentFile();
    const pathways = {
      "/": {
        title: "A calmer next step in Greater Noida",
        body: "If anxiety, low mood, sleep changes, or a child’s development are making daily life harder, you can begin with the concern you notice. Mind Grace in Gamma II helps adults, children, adolescents, and families understand what support may fit.",
        links: [["Explore mental health services", "/services.html"], ["Book a confidential consultation", "/book.html"], ["Find the clinic in Gamma II", "/location.html"]]
      },
      "services.html": {
        title: "Support matched to the concern you bring",
        body: "You do not need a perfect label before you reach out. Start with the change affecting sleep, school, work, relationships, or family life, then use an assessment and conversation to decide the next step.",
        links: [["See conditions we support", "/conditions.html"], ["Meet the care team", "/doctors.html"], ["Understand the first visit", "/process.html"], ["Book an appointment", "/book.html"]]
      },
      "conditions.html": {
        title: "Start with the pattern you are noticing",
        body: "A symptom can have more than one explanation, and online information cannot replace an assessment. Use these condition guides to find language for your concern, then connect it with the right service or consultation in Greater Noida.",
        links: [["See our care approach", "/approach.html"], ["Read mental health guides", "/blog/index.html"], ["Book an assessment", "/book.html"]]
      },
      "about.html": {
        title: "Care that makes room for your context",
        body: "Starting care can feel difficult when you have been carrying a concern alone. Mind Grace brings psychiatric and child-development support together in Gamma II, Greater Noida, with space to explain what has changed and what you need next.",
        links: [["Meet Dr Anita Sharma", "/dr-anita-sharma.html"], ["See the care team", "/doctors.html"], ["Find the clinic", "/location.html"], ["Book a consultation", "/book.html"]]
      },
      "approach.html": {
        title: "Understand first, then choose the next step",
        body: "Good care begins with listening to the full picture: symptoms, routines, relationships, development, and the pressures around you. A clear conversation can help you move from uncertainty toward a practical plan.",
        links: [["What to expect", "/process.html"], ["View services", "/services.html"], ["Ask a question", "/contact.html"]]
      },
      "location.html": {
        title: "Find Mind Grace in Gamma II",
        body: "The clinic is at J123, Gamma II, Greater Noida, 201310. This location serves people travelling from Alpha-1, Delta-1, Pari Chowk, Knowledge Park, Surajpur, and nearby Greater Noida routes.",
        links: [["Get booking information", "/book.html"], ["Contact the clinic", "/contact.html"], ["See what to expect", "/process.html"]]
      },
      "process.html": {
        title: "Know what happens after you reach out",
        body: "If the first step feels uncertain, you can begin by sharing the concern that brought you here. The visit can then focus on understanding the situation, discussing options, and identifying a manageable next step.",
        links: [["Review appointment details", "/book.html"], ["Read frequently asked questions", "/faq.html#common-questions"], ["View clinic location", "/location.html"]]
      },
      "faq.html": {
        title: "Answers before your first conversation",
        body: "Questions about privacy, fees, children’s care, medication, or the first visit are normal. Use these answers to prepare, then contact the clinic if your situation needs a more specific response.",
        links: [["See fees and payments", "/fees.html"], ["Understand the care process", "/process.html"], ["Contact Mind Grace", "/contact.html"]]
      },
      "contact.html": {
        title: "You can start with one clear question",
        body: "Tell Mind Grace what you are noticing and what kind of support you are trying to find. The clinic can help with routine appointment guidance, directions, and questions about psychiatric or child-development care in Gamma II.",
        links: [["Book an appointment", "/book.html"], ["Find the clinic", "/location.html"], ["Read common questions", "/faq.html#common-questions"]]
      },
      "book.html": {
        title: "A confidential first step for adults and families",
        body: "You can request a psychiatric or child-development consultation without having a final diagnosis. Share the basic details that feel relevant, and use the clinic’s contact options if you need help before booking.",
        links: [["Learn what to expect", "/process.html"], ["Check fees and payments", "/fees.html"], ["Find the clinic", "/location.html"]]
      },
      "doctors.html": {
        title: "Meet the people who can help you begin",
        body: "Choosing care often starts with knowing who will listen. Review the Mind Grace care team, then use the service and booking pages to find a practical route for adult, child-development, or family support.",
        links: [["Meet Dr Anita Sharma", "/dr-anita-sharma.html"], ["Explore services", "/services.html"], ["Understand your first visit", "/process.html"], ["Book a consultation", "/book.html"]]
      },
      "dr-anita-sharma.html": {
        title: "Bring the concern you can name",
        body: "You do not need to prepare a perfect explanation before seeking help. Learn about Dr Anita Sharma’s clinical focus, then choose the contact or booking route that feels manageable for you or your family in Greater Noida.",
        links: [["View Mind Grace services", "/services.html"], ["Meet the wider care team", "/doctors.html"], ["Book a consultation", "/book.html"]]
      },
      "fees.html": {
        title: "Know what to plan before your visit",
        body: "Questions about fees and payment can add stress when you are already deciding whether to seek help. Review the available information before booking, and contact the clinic if you need clarification about your appointment.",
        links: [["Book an appointment", "/book.html"], ["Read common questions", "/faq.html#common-questions"], ["Contact the clinic", "/contact.html"]]
      },
      "aasha.html": {
        title: "Support for children starts with noticing",
        body: "Parents may notice differences in communication, learning, behaviour, or development and still feel unsure what they mean. AASHA connects families with child-development information and a route toward appropriate support in Greater Noida.",
        links: [["Read child-development guides", "/blog/children.html"], ["See child-development services", "/services.html"], ["Book a consultation", "/book.html"]]
      },
      "gallery.html": {
        title: "See the space before you arrive",
        body: "A first visit can feel less uncertain when you know what the clinic looks like. Use the gallery alongside the location and process pages to plan your route to Mind Grace in Gamma II.",
        links: [["Find the clinic", "/location.html"], ["See what to expect", "/process.html"], ["Book an appointment", "/book.html"]]
      },
      "testimonials.html": {
        title: "Read experiences with care and context",
        body: "Patient feedback can help you understand how others experienced the care journey, but every person’s situation is different. Use these reflections alongside the services, process, and booking information.",
        links: [["Explore services", "/services.html"], ["Understand the care process", "/process.html"], ["Book a consultation", "/book.html"]]
      },
      "mind-grace.html": {
        title: "A connected route through Mind Grace",
        body: "Whether you are looking for psychiatric care, child-development support, practical information, or a place to begin, the site is designed to help you move at your own pace from concern to a clear next step in Greater Noida.",
        links: [["Explore services", "/services.html"], ["Meet the care team", "/doctors.html"], ["Read mental health guides", "/blog/index.html"], ["Book an appointment", "/book.html"]]
      },
      "blog/index.html": {
        title: "Find language for what you are experiencing",
        body: "These guides explain common adult mental-health and child-development concerns in clear, practical language. Read at your own pace, then connect what you notice with a tool, service, or confidential conversation.",
        links: [["Read adult mental health guides", "/blog/adult.html"], ["Read child-development guides", "/blog/children.html"], ["Explore self-help tools", "/resources.html#tools"], ["Book a consultation", "/book.html"]]
      },
      "adult.html": {
        title: "Adult mental health guidance for real-life concerns",
        body: "Worry, low mood, sleep changes, and difficulty coping can affect work, relationships, and daily routines. These guides help you recognise patterns without diagnosing yourself and show where professional support may fit.",
        links: [["Browse all mental health guides", "/blog/index.html"], ["Try a self-help tool", "/resources.html#tools"], ["See adult services", "/services.html"], ["Book a consultation", "/book.html"]]
      },
      "children.html": {
        title: "Child-development guidance for parents and caregivers",
        body: "Parents often notice a concern before they have the words to describe it. These guides cover communication, sensory experiences, school concerns, and early development, with practical routes toward support when a pattern continues.",
        links: [["Browse all child guides", "/blog/index.html"], ["See child-development services", "/services.html"], ["Explore gentle tools", "/resources.html#tools"], ["Book a consultation", "/book.html"]]
      },
      "emergency.html": {
        title: "If this feels unsafe, act now",
        body: "Mind Grace does not provide emergency services. If someone may harm themselves or another person, call 112 or go to the nearest hospital emergency department. Routine clinic information can wait until immediate safety is addressed.",
        links: [["Call 112 for emergency help", "tel:112"], ["Find the clinic for routine care", "/location.html"], ["Contact the clinic for routine care", "/contact.html"]]
      },
      "thank-you.html": {
        title: "Your next steps after sending a request",
        body: "Keep your phone available for appointment follow-up and note any questions you want to discuss. You can review the visit process, fees, and clinic directions while you wait.",
        links: [["Review what to expect", "/process.html"], ["Check fees and payments", "/fees.html"], ["Find the clinic", "/location.html"], ["Return to the homepage", "/index.html"]]
      },
      "404.html": {
        title: "Let’s get you back to useful information",
        body: "The page address may have changed, but you can continue from the main care pathways. Choose services, location, self-help resources, or booking based on what you need now.",
        links: [["Explore mental health services", "/services.html"], ["Find the clinic", "/location.html"], ["Explore self-help tools", "/resources.html#tools"], ["Book an appointment", "/book.html"]]
      },
      "resources.html": {
        title: "Small tools for difficult moments",
        body: "Breathing, grounding, focus, and calming exercises can help you pause and notice what is happening. They are educational supports, not a diagnosis or a replacement for professional care when distress continues.",
        links: [["Read adult mental health guides", "/blog/adult.html"], ["Read child development guides", "/blog/children.html"], ["Book professional support", "/book.html"]]
      }
    };
    let content = pathways[path] || pathways[file];
    if (!content && file === "index.html" && !path.startsWith("/blog/")) content = pathways["/"];
    if (path.startsWith("/tools/")) {
      const toolCopy = {
        "guided-breathing.html": ["Create a brief pause with guided breathing", "Use paced breathing when you want to slow down and notice how you feel. Stop if it increases discomfort, and choose professional support when symptoms persist, interfere with daily life, or feel unsafe."],
        "butterfly-tapper.html": ["Try a gentle grounding rhythm", "Butterfly tapping gives you a short, structured way to focus on touch and the present moment. Keep the movement comfortable, stop if it feels unsettling, and seek professional support for ongoing distress."],
        "eye-movement.html": ["Use visual focus to return to the present", "This lateral grounding exercise offers a brief visual focus practice. Move at a comfortable pace, stop if it causes discomfort, and treat it as an educational support rather than a treatment."],
        "hypnos-fractal.html": ["Let a steady visual pattern hold your attention", "The fractal exercise offers a quiet visual focus point for a short pause. Stop if visual movement feels uncomfortable, and contact a professional when distress continues or affects daily life."],
        "horizon-scan.html": ["Orient your attention to the space around you", "Horizon scanning invites you to notice your surroundings in a slow, deliberate way. Use it as a brief grounding exercise, stop if it feels uncomfortable, and seek help when you need more than a self-guided pause."],
        "leaf-on-stream.html": ["Watch thoughts pass without chasing them", "Leaf on Stream offers an imagery-based pause for observing thoughts and feelings. It does not replace assessment or care, and you can stop whenever the exercise feels uncomfortable or unhelpful."]
      }[file] || ["Use this tool at your own pace", "This exercise offers a brief way to pause, focus, or ground yourself. Stop if it increases discomfort, and choose professional support when symptoms persist, interfere with daily life, or feel unsafe."];
      content = { title: toolCopy[0], body: toolCopy[1], links: [["See all self-help tools", "/resources.html#tools"], ["Read practical mental health guides", "/blog/index.html"], ["Book a consultation", "/book.html"]] };
    }
    if (path.startsWith("/blog/pages/")) {
      const childArticle = path.includes("/child/");
      content = {
        title: childArticle ? "For parents, a clearer way to notice what is changing" : "Information is a starting point, not a diagnosis",
        body: childArticle
          ? "This guide helps parents put words to a child’s communication, sensory, school, or developmental concerns. If the pattern affects daily life or keeps worrying your family, a child-development conversation can help you decide what support fits."
          : "This guide helps you put words to a pattern affecting mood, worry, sleep, or daily life. If the concern continues or feels difficult to manage, a confidential conversation can help you decide what support fits.",
        links: [["Browse all guides", "/blog/index.html"], [childArticle ? "See child-development services" : "See adult mental health services", "/services.html"], ["Try a gentle self-help tool", "/resources.html#tools"], ["Book a consultation", "/book.html"]]
      };
    }
    if (!content || ["privacy.html", "terms.html", "consent.html", "disclaimer.html"].includes(file)) return;
    const panel = document.createElement("section");
    panel.className = "content-pathway";
    panel.dataset.contentPathway = "true";
    panel.setAttribute("aria-labelledby", "content-pathway-title");
    const heading = document.createElement("h2");
    heading.id = "content-pathway-title";
    heading.textContent = content.title;
    const paragraph = document.createElement("p");
    paragraph.textContent = content.body;
    const actions = document.createElement("div");
    actions.className = "content-pathway__links";
    content.links.forEach(([label, href]) => {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      actions.appendChild(link);
    });
    panel.append(heading, paragraph, actions);
    const breadcrumbs = main.querySelector(".breadcrumbs");
    if (breadcrumbs) breadcrumbs.after(panel); else main.prepend(panel);
  }

  function initializeRevealMotion() {
    const candidates = $$(".fade-in-up, .service-card, .feature-card, .condition-card, .testimonial-card, .article-card");
    if (!candidates.length || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { candidates.forEach((element) => element.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries, instance) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); instance.unobserve(entry.target); } }), { threshold: 0.08, rootMargin: "0px 0px -32px" });
    candidates.forEach((element) => observer.observe(element));
  }

  function initialize() {
    document.documentElement.dataset.designSystem = "rose-serenity";
    ensureFinalStyles();
    const shell = normalizeSiteChrome();
    enhanceBreadcrumbs(shell?.main || $("main"));
    addContentPathway(shell?.main || $("main"));
    markCurrentNavigation();
    initializeRevealMotion();
    document.body.dataset.visitorFriendly = "true";
    ensureIcons();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
