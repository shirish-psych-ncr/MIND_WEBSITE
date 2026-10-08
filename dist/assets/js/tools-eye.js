(() => {
  let moveTimer = null;
  let direction = "right";
  function stopTracking() {
    if (moveTimer) window.clearInterval(moveTimer);
    moveTimer = null;
    document.getElementById("active-view")?.classList.add("hidden");
    document.getElementById("eye-setup")?.classList.remove("hidden");
    const orb = document.getElementById("orb");
    if (orb) { orb.style.transition = "none"; orb.style.left = "0%"; }
    direction = "right";
  }
  function startTracking() {
    const speed = Number.parseInt(document.getElementById("speed-selector")?.value || "1500", 10);
    const setup = document.getElementById("eye-setup");
    const active = document.getElementById("active-view");
    const orb = document.getElementById("orb");
    if (!setup || !active || !orb) return;
    if (moveTimer) window.clearInterval(moveTimer);
    setup.classList.add("hidden");
    active.classList.remove("hidden");
    orb.style.transition = `left ${speed}ms ease-in-out`;
    orb.style.left = `calc(100% - ${orb.offsetWidth}px)`;
    direction = "left";
    moveTimer = window.setInterval(() => {
      if (direction === "right") { orb.style.left = `calc(100% - ${orb.offsetWidth}px)`; direction = "left"; }
      else { orb.style.left = "0%"; direction = "right"; }
    }, speed + 50);
  }
  function init() {
    const start = document.getElementById("eye-start-btn");
    const stop = document.getElementById("eye-stop-btn");
    if (!start || !stop || start.dataset.bound === "true") return;
    start.dataset.bound = "true";
    start.addEventListener("click", startTracking);
    stop.addEventListener("click", stopTracking);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
  window.addEventListener("mindgrace:chrome-ready", init);
})();
