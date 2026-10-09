(() => {
  function init() {
    const setup = document.getElementById("horizon-setup");
    const active = document.getElementById("horizon-active");
    const start = document.getElementById("horizon-start-btn");
    const stop = document.getElementById("horizon-stop-btn");
    const duration = document.getElementById("duration-selector");
    const timer = document.getElementById("horizon-timer");
    const dot = document.getElementById("horizon-dot");
    if (!setup || !active || !start || !stop || !duration || !timer || !dot) return;

    let frame = null;
    let startedAt = 0;
    let durationMs = 60000;
    let position = 50;
    let direction = 1;

    function animate(now) {
      const elapsed = now - startedAt;
      const remaining = Math.max(0, durationMs - elapsed);
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      timer.textContent = `${minutes > 0 ? `${minutes}:` : ""}${String(seconds).padStart(2, "0")}`;
      if (elapsed >= durationMs) {
        stop.click();
        return;
      }
      position += direction * 0.02;
      if (position >= 95 || position <= 5) direction *= -1;
      dot.style.left = `${position}%`;
      dot.style.top = `calc(50% + ${10 * Math.sin(now / 1000)}px)`;
      frame = requestAnimationFrame(animate);
    }

    start.addEventListener("click", () => {
      durationMs = 1000 * Number.parseInt(duration.value, 10);
      setup.classList.add("hidden");
      active.classList.remove("hidden");
      startedAt = performance.now();
      position = 50;
      direction = 1;
      frame = requestAnimationFrame(animate);
    });

    stop.addEventListener("click", () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      active.classList.add("hidden");
      setup.classList.remove("hidden");
      timer.textContent = "";
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
