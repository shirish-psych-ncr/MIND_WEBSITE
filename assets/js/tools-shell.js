(() => {
  "use strict";

  const stageSelectors = [
    "#breath-app",
    ".horizon-shell",
    ".tool-card",
    ".tool-section",
    "#riverCanvas",
    "#trail-canvas",
    "#canvas"
  ];

  const icon = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;

  function refreshIcons() {
    if (window.lucide?.createIcons) window.lucide.createIcons();
    document.dispatchEvent(new Event("icons:refresh"));
  }

  function getToolName() {
    const heading = document.querySelector("main h1:not(.visually-hidden), main h1");
    return heading?.textContent?.trim() || "Therapeutic tool";
  }

  const relatedReading = {
    "guided-breathing.html": [
      ["Scheduled worry time", "/blog/pages/adult/scheduled-worry-time-technique"],
      ["Sleep and the anxiety cycle", "/blog/pages/adult/sleep-and-anxiety-cycle"]
    ],
    "butterfly-tapper.html": [
      ["Overthinking vs anxiety", "/blog/pages/adult/overthinking-vs-anxiety"],
      ["When to see a psychiatrist", "/blog/pages/adult/when-to-see-a-psychiatrist"]
    ],
    "eye-movement.html": [
      ["Overthinking vs anxiety", "/blog/pages/adult/overthinking-vs-anxiety"],
      ["When to see a psychiatrist", "/blog/pages/adult/when-to-see-a-psychiatrist"]
    ],
    "hypnos-fractal.html": [
      ["Overthinking vs anxiety", "/blog/pages/adult/overthinking-vs-anxiety"],
      ["Sleep and the anxiety cycle", "/blog/pages/adult/sleep-and-anxiety-cycle"]
    ],
    "horizon-scan.html": [
      ["Scheduled worry time", "/blog/pages/adult/scheduled-worry-time-technique"],
      ["Managing sensory overload at home", "/blog/pages/child/sensory-overload-at-home"]
    ],
    "leaf-on-stream.html": [
      ["Scheduled worry time", "/blog/pages/adult/scheduled-worry-time-technique"],
      ["Managing sensory overload at home", "/blog/pages/child/sensory-overload-at-home"]
    ]
  };

  function addRelatedReading() {
    const main = document.querySelector("main");
    const file = window.location.pathname.split("/").filter(Boolean).pop() || "";
    const links = relatedReading[file] || relatedReading[file.replace(/\.html$/i, "")];
    if (!main || !links || main.querySelector(".tool-related-reading")) return;
    const aside = document.createElement("aside");
    aside.className = "article-related tool-related-reading surface panel";
    aside.setAttribute("aria-labelledby", "tool-related-reading-title");
    aside.innerHTML = `<p class="eyebrow">Continue at your pace</p><h2 id="tool-related-reading-title">Guides that may help next</h2><div class="article-related-grid">${links.map(([label, href]) => `<a class="article-related-link" href="${href}"><span>${label}</span>${icon("arrow-right")}</a>`).join("")}</div><p class="tool-related-reading__footer"><a href="/blog">Browse all mental health guides</a> <span aria-hidden="true">·</span> <a href="/resources#tools">See all self-help tools</a></p>`;
    main.appendChild(aside);
  }

  function buildControls() {
    if (document.querySelector("[data-tool-controls]")) return document.querySelector("[data-tool-controls]");
    const controls = document.createElement("section");
    controls.className = "tool-viewbar";
    controls.dataset.toolControls = "true";
    controls.setAttribute("aria-label", "Tool view options");
    controls.innerHTML = `<div class="tool-viewbar__title">${icon("panels-top-left")}<span>Tool view</span></div>
      <div class="tool-viewbar__actions">
        <button type="button" class="tool-viewbar__action" data-tool-view="window" aria-pressed="true">${icon("rectangle-horizontal")}<span>Windowed</span></button>
        <button type="button" class="tool-viewbar__action" data-tool-view="fullscreen" aria-pressed="false">${icon("maximize-2")}<span>Full screen</span></button>
        <button type="button" class="tool-viewbar__action" data-tool-view="exit" hidden>${icon("arrow-left")}<span>Back</span></button>
      </div>
      <span class="tool-viewbar__status" aria-live="polite">Windowed view</span>`;
    const main = document.querySelector("main");
    (main || document.body).prepend(controls);
    return controls;
  }

  function init() {
    if (document.body.dataset.toolShellReady === "true") return;
    document.body.dataset.toolShellReady = "true";
    document.body.classList.add("tool-page");
    const stage = stageSelectors.map((selector) => document.querySelector(selector)).find(Boolean);
    if (stage) stage.dataset.toolStage = "true";
    addRelatedReading();
    const controls = buildControls();
    const status = controls.querySelector(".tool-viewbar__status");
    const windowButton = controls.querySelector('[data-tool-view="window"]');
    const fullButton = controls.querySelector('[data-tool-view="fullscreen"]');
    const exitButton = controls.querySelector('[data-tool-view="exit"]');
    const toolName = getToolName();

    const setView = (view, message) => {
      document.body.dataset.toolView = view;
      windowButton.setAttribute("aria-pressed", String(view === "window"));
      fullButton.setAttribute("aria-pressed", String(view === "fullscreen"));
      exitButton.hidden = view !== "fullscreen";
      status.textContent = message || (view === "fullscreen" ? `${toolName} is full screen. Press Back or Escape to exit.` : "Windowed view");
      refreshIcons();
    };

    const exitFullScreen = () => {
      if (document.fullscreenElement && document.exitFullscreen) {
        const exitPromise = document.exitFullscreen();
        exitPromise?.catch?.(() => setView("window", "Windowed view"));
      } else setView("window", "Windowed view");
    };

    windowButton.addEventListener("click", () => { exitFullScreen(); });
    fullButton.addEventListener("click", () => {
      if (!document.documentElement.requestFullscreen) {
        setView("window", "Full screen is not available in this browser.");
        return;
      }
      try {
        const fullscreenPromise = document.documentElement.requestFullscreen({ navigationUI: "hide" });
        fullscreenPromise?.catch?.(() => setView("window", "Full screen could not be opened. You can continue in the windowed view."));
      } catch (_) {
        setView("window", "Full screen could not be opened. You can continue in the windowed view.");
      }
    });
    exitButton.addEventListener("click", exitFullScreen);
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) setView("fullscreen");
      else setView("window");
    });
    document.addEventListener("icons:refresh", refreshIcons, { once: true });
    setView("window");
    refreshIcons();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
