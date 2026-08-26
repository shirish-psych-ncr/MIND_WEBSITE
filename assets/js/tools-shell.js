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
