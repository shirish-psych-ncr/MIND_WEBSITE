(() => {
  const state = { timer: null, breath: null, duration: 1, technique: "box", running: false, patterns: {
    box: [{ label: "Inhale", seconds: 4, scale: 2.2, color: "#38bdf8" }, { label: "Hold", seconds: 4, scale: 2.2, color: "#4ade80" }, { label: "Exhale", seconds: 4, scale: 1, color: "#fb7185" }, { label: "Hold", seconds: 4, scale: 1, color: "#94a3b8" }],
    relax: [{ label: "Inhale", seconds: 4, scale: 2.2, color: "#38bdf8" }, { label: "Hold", seconds: 7, scale: 2.2, color: "#4ade80" }, { label: "Exhale", seconds: 8, scale: 1, color: "#fb7185" }],
    calm: [{ label: "Inhale", seconds: 7, scale: 2.2, color: "#38bdf8" }, { label: "Exhale", seconds: 11, scale: 1, color: "#fb7185" }]
  }};
  const get = (id) => document.getElementById(id);
  const show = (id, visible) => get(id)?.classList.toggle("hidden", !visible);
  function finish() { state.running = false; clearInterval(state.timer); clearTimeout(state.breath); get("breath-app")?.classList.remove("is-session"); show("session", false); show("end", true); }
  function loop(index) {
    if (!state.running) return;
    const phase = state.patterns[state.technique][index]; const circle = get("circle"); const label = get("label");
    if (!phase || !circle || !label) return finish();
    label.textContent = phase.label; circle.style.transition = `all ${phase.seconds}s linear`; circle.style.transform = `scale(${phase.scale})`; circle.style.background = phase.color;
    state.breath = setTimeout(() => loop((index + 1) % state.patterns[state.technique].length), phase.seconds * 1000);
  }
  function start() {
    if (state.running) return;
    state.running = true; state.technique = get("tech-sel")?.value || "box"; let remaining = 60 * state.duration;
    show("menu", false); show("session", true); get("breath-app")?.classList.add("is-session");
    const timerLabel = get("timer"); const tick = () => { const minutes = Math.floor(remaining / 60); const seconds = remaining % 60; if (timerLabel) timerLabel.textContent = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`; if (remaining <= 0) finish(); remaining -= 1; };
    tick(); state.timer = setInterval(tick, 1000); loop(0);
  }
  function reset() { state.running = false; clearInterval(state.timer); clearTimeout(state.breath); get("breath-app")?.classList.remove("is-session"); show("end", false); show("session", false); show("menu", true); }
  function init() {
    const startButton = get("start-btn"); if (!startButton || startButton.dataset.bound === "true") return;
    startButton.dataset.bound = "true"; startButton.addEventListener("click", start); get("stop-btn")?.addEventListener("click", finish); get("reset-btn")?.addEventListener("click", reset);
    document.querySelectorAll(".chip").forEach((chip) => chip.addEventListener("click", () => { document.querySelectorAll(".chip").forEach((item) => item.classList.remove("active")); chip.classList.add("active"); state.duration = Number(chip.dataset.m) || 1; }));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init();
  window.addEventListener("mindgrace:chrome-ready", init);
})();
