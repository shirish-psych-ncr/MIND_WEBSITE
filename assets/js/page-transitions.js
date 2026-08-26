(() => {
  function pageRoot() {
    return document.querySelector("main") || document.querySelector(".page-content");
  }

  function animatePageLeave() {
    const root = pageRoot();
    if (!root) return;
    if (typeof Motion !== "undefined") {
      Motion.animate(root, { opacity: 0, y: -20 }, { duration: 0.3, easing: [0.4, 0, 0.2, 1] });
    } else {
      root.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      root.style.opacity = "0";
      root.style.transform = "translateY(-20px)";
    }
  }

  function animatePageEnter() {
    const root = pageRoot();
    if (!root) return;
    root.style.opacity = "0";
    root.style.transform = "translateY(20px)";
    if (typeof Motion !== "undefined") {
      Motion.animate(root, { opacity: 1, y: 0 }, { duration: 0.5, easing: [0.4, 0, 0.2, 1], delay: 0.1 });
    } else {
      root.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      root.style.opacity = "1";
      root.style.transform = "translateY(0)";
    }
  }

  function reinitializeComponents() {
    if (typeof lucide !== "undefined") lucide.createIcons();
    if (window.CarouselInit?.refresh) window.CarouselInit.refresh();
    if (window.UIPopovers?.init) window.UIPopovers.init();
    if (window.AutoAnimateInit) window.AutoAnimateInit();
    document.dispatchEvent(new CustomEvent("page:transition:complete"));
  }

  function addTransitionStyles() {
    if (document.getElementById("swup-transition-styles")) return;
    const style = document.createElement("style");
    style.id = "swup-transition-styles";
    style.textContent = `
      html.is-leaving body { cursor: wait; }
      .page-leaving main, .page-leaving .page-content { transition: opacity 0.3s ease, transform 0.3s ease; }
      .page-entered main, .page-entered .page-content { opacity: 1 !important; transform: translateY(0) !important; }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        html.is-leaving body { cursor: default; }
      }
    `;
    document.head.appendChild(style);
  }

  function initialize() {
    addTransitionStyles();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) document.documentElement.classList.add("reduced-motion");
    reducedMotion.addEventListener("change", (event) => {
      document.documentElement.classList.toggle("reduced-motion", event.matches);
    });
    if (typeof Swup === "undefined") return;

    const swup = new Swup({
      containers: ["#swup-container", "main", ".page-content"],
      animateHistoryBrowsing: true,
      linkSelector: 'a[href^="/"]:not([data-no-swup]):not([target="_blank"]):not([download])',
      cache: true,
      popstateHandler: true
    });
    swup.hooks.on("visit:start", () => {
      document.documentElement.classList.add("is-leaving");
      document.body.classList.add("page-leaving");
      animatePageLeave();
    });
    swup.hooks.on("visit:end", () => {
      document.documentElement.classList.remove("is-leaving");
      document.body.classList.remove("page-leaving");
      document.body.classList.add("page-entered");
      animatePageEnter();
      setTimeout(reinitializeComponents, 100);
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
    });
    swup.hooks.on("visit:abort", () => {
      document.documentElement.classList.remove("is-leaving");
      document.body.classList.remove("page-leaving");
    });
    swup.hooks.on("history:popstate", () => {
      document.body.classList.add("page-entered");
      animatePageEnter();
      reinitializeComponents();
    });
    window.SwupInstance = swup;
    window.PageTransitions = { swup, animatePageLeave, animatePageEnter, reinitializeComponents };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize);
  else initialize();
})();
