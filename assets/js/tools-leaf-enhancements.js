(() => {
  "use strict";
  const init = () => {
    const input = document.getElementById("worryInput");
    const count = document.getElementById("charCount");
    if (!input || input.dataset.counterReady === "true") return;
    input.dataset.counterReady = "true";
    const update = () => { if (count) count.textContent = String(input.value.length); };
    input.addEventListener("input", update);
    update();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init();
})();
