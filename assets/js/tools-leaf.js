(() => {
  "use strict";

  const canvas = document.getElementById("riverCanvas");
  const context = canvas?.getContext("2d", { alpha: false });
  const input = document.getElementById("worryInput");
  const form = document.getElementById("releaseForm");
  const sendButton = document.getElementById("sendBtn");
  const trigger = document.getElementById("ui-trigger");
  const panel = document.getElementById("inputModal");
  const interfacePanel = document.getElementById("ui");
  const count = document.getElementById("charCount");
  const status = document.getElementById("breath-text");

  if (!canvas || !context || !input || !form) return;

  const state = { width: 0, height: 0, ratio: 1, time: 0, lastFrame: 0, animation: 0, inputOpen: true, leaves: [], ripples: [], reeds: [] };
  const colors = {
    skyTop: "#2d1025", skyBottom: "#f4b3c8", riverDeep: "#32194b", riverMid: "#663b78", riverLight: "#d581a4",
    bank: "#28162a", pink: "#f4a8c4", lava: "#c52f69", gold: "#f4c66d", foam: "rgb(255 239 246 / 46%)"
  };
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const riverCenter = (progress) => state.width * .5 + Math.sin(progress * 4.4 + .35) * state.width * .11;
  const riverWidth = (progress) => state.width * (.28 + progress * .15 + Math.sin(progress * 2.5) * .025);

  function resize() {
    state.ratio = Math.min(window.devicePixelRatio || 1, 2);
    state.width = Math.max(320, window.innerWidth);
    state.height = Math.max(480, window.innerHeight);
    canvas.width = Math.round(state.width * state.ratio);
    canvas.height = Math.round(state.height * state.ratio);
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    context.setTransform(state.ratio, 0, 0, state.ratio, 0, 0);
    buildDetails();
  }

  function buildDetails() {
    state.ripples = Array.from({ length: 18 }, (_, index) => ({ progress: Math.random(), offset: (Math.random() - .5) * .7, length: 18 + Math.random() * 62, phase: index * .8 + Math.random() * 2 }));
    state.reeds = Array.from({ length: Math.max(36, Math.round(state.width / 16)) }, () => ({ side: Math.random() > .5 ? -1 : 1, progress: Math.random(), height: 10 + Math.random() * 34, lean: (Math.random() - .5) * 13 }));
  }

  function setStatus(message) { if (status) status.textContent = message; }
  function updateCount() { if (count) count.textContent = String(input.value.length); }
  function setInputOpen(open) {
    state.inputOpen = open;
    interfacePanel?.classList.toggle("hidden", !open);
    panel?.classList.toggle("hidden", !open);
    trigger?.classList.toggle("active", open);
    trigger?.setAttribute("aria-expanded", String(open));
    if (open) window.setTimeout(() => input.focus(), 120);
  }

  function wrapText(text, maxWidth, font) {
    context.font = font;
    const lines = [];
    let line = "";
    text.split(/\s+/).filter(Boolean).forEach((word) => {
      const candidate = line ? `${line} ${word}` : word;
      if (line && context.measureText(candidate).width > maxWidth) { lines.push(line); line = word; } else line = candidate;
    });
    if (line) lines.push(line);
    if (lines.length > 3) {
      lines.length = 3;
      let last = lines[2];
      while (context.measureText(`${last}…`).width > maxWidth && last.length > 4) last = last.slice(0, -1);
      lines[2] = `${last}…`;
    }
    return lines;
  }

  class ThoughtLeaf {
    constructor(text) {
      this.text = text; this.progress = 0; this.speed = .000018 + Math.random() * .00001; this.phase = Math.random() * Math.PI * 2;
      this.rotation = (Math.random() - .5) * .45; this.rotationSpeed = (Math.random() - .5) * .0009; this.falling = false;
      this.x = riverCenter(0); this.y = state.height * .09; this.opacity = 0; this.lines = wrapText(text, 118, "600 13px Outfit, sans-serif");
    }
    update(milliseconds) {
      const dt = Math.min(milliseconds, 80);
      if (!this.falling) {
        this.speed = Math.min(.00024, this.speed + dt * .000000045);
        this.progress += this.speed * dt;
        const wave = Math.sin(state.time * .0011 + this.phase) * state.height * .014;
        const sink = Math.sin(state.time * .00062 + this.phase) * state.height * .032;
        const progress = clamp(this.progress, 0, 1);
        const center = riverCenter(progress); const width = riverWidth(progress);
        this.x = center + Math.sin(state.time * .0008 + this.phase) * width * .27;
        this.y = state.height * (.09 + this.progress * .74) + wave + sink;
        this.rotation += this.rotationSpeed * dt + Math.sin(state.time * .0007 + this.phase) * .0005;
        this.opacity = clamp(this.opacity + dt * .003, 0, 1);
        if (this.progress >= .86) this.falling = true;
      } else {
        this.y += dt * (.16 + this.progress * .3); this.x += dt * .08; this.rotation += dt * .004; this.opacity -= dt * .0017;
      }
    }
    draw() {
      if (this.opacity <= .01) return;
      const scale = clamp(1 + Math.sin(state.time * .001 + this.phase) * .04, .94, 1.06);
      const width = 78 + Math.min(54, this.lines.join(" ").length * .2); const height = 54 + (this.lines.length - 1) * 4;
      context.save(); context.translate(this.x, this.y); context.rotate(this.rotation); context.scale(scale, scale); context.globalAlpha = this.opacity;
      context.shadowColor = "rgb(24 5 21 / 38%)"; context.shadowBlur = 18; context.shadowOffsetY = 8;
      context.beginPath(); context.moveTo(0, -height / 2); context.bezierCurveTo(width * .48, -height * .3, width * .48, height * .2, width * .05, height / 2); context.bezierCurveTo(-width * .3, height * .38, -width * .5, -height * .08, 0, -height / 2); context.closePath();
      const gradient = context.createLinearGradient(-width / 2, -height / 2, width / 2, height / 2); gradient.addColorStop(0, colors.pink); gradient.addColorStop(.55, colors.lava); gradient.addColorStop(1, colors.gold); context.fillStyle = gradient; context.fill();
      context.shadowColor = "transparent"; context.strokeStyle = "rgb(255 245 249 / 78%)"; context.lineWidth = 1; context.beginPath(); context.moveTo(-width * .35, 0); context.quadraticCurveTo(0, -height * .04, width * .35, -height * .15); context.stroke();
      context.fillStyle = "#2b1020"; context.font = "600 13px Outfit, sans-serif"; context.textAlign = "center"; context.textBaseline = "middle";
      this.lines.forEach((line, index) => context.fillText(line, 0, (index - (this.lines.length - 1) / 2) * 15)); context.restore();
    }
    expired() { return this.opacity <= .01 || this.y > state.height + 100; }
  }

  function releaseLeaf() {
    const text = input.value.trim();
    if (!text) {
      panel?.classList.add("is-invalid"); window.setTimeout(() => panel?.classList.remove("is-invalid"), 420); setStatus("Write one thought before releasing it."); input.focus(); return false;
    }
    state.leaves.push(new ThoughtLeaf(text)); input.value = ""; updateCount(); setStatus("Released. Watch it drift, settle, and leave the river.");
    if (navigator.vibrate) navigator.vibrate([10, 25, 10]);
    return true;
  }

  function drawSky() {
    const gradient = context.createLinearGradient(0, 0, 0, state.height * .72); gradient.addColorStop(0, colors.skyTop); gradient.addColorStop(.55, "#914263"); gradient.addColorStop(1, colors.skyBottom); context.fillStyle = gradient; context.fillRect(0, 0, state.width, state.height);
    context.fillStyle = "rgb(255 227 236 / 28%)"; context.beginPath(); context.arc(state.width * .78, state.height * .18, Math.min(state.width, state.height) * .08, 0, Math.PI * 2); context.fill();
  }
  function drawHills() {
    context.fillStyle = "rgb(42 18 43 / 74%)"; context.beginPath(); context.moveTo(0, state.height * .34); context.quadraticCurveTo(state.width * .2, state.height * .22, state.width * .42, state.height * .35); context.quadraticCurveTo(state.width * .68, state.height * .18, state.width, state.height * .32); context.lineTo(state.width, state.height); context.lineTo(0, state.height); context.closePath(); context.fill();
    context.fillStyle = "rgb(113 48 79 / 78%)"; context.beginPath(); context.moveTo(0, state.height * .47); context.quadraticCurveTo(state.width * .28, state.height * .34, state.width * .5, state.height * .48); context.quadraticCurveTo(state.width * .78, state.height * .36, state.width, state.height * .45); context.lineTo(state.width, state.height); context.lineTo(0, state.height); context.closePath(); context.fill();
  }
  function riverPath() {
    const topCenter = riverCenter(0); const bottomCenter = riverCenter(1); const topHalf = riverWidth(0) / 2; const bottomHalf = riverWidth(1) / 2;
    context.beginPath(); context.moveTo(topCenter - topHalf, 0); context.bezierCurveTo(state.width * .25, state.height * .3, state.width * .22, state.height * .62, bottomCenter - bottomHalf, state.height); context.lineTo(bottomCenter + bottomHalf, state.height); context.bezierCurveTo(state.width * .78, state.height * .62, state.width * .76, state.height * .3, topCenter + topHalf, 0); context.closePath();
  }
  function drawRiver() {
    riverPath(); const gradient = context.createLinearGradient(0, 0, 0, state.height); gradient.addColorStop(0, colors.riverDeep); gradient.addColorStop(.46, colors.riverMid); gradient.addColorStop(1, colors.riverLight); context.fillStyle = gradient; context.fill();
    context.save(); riverPath(); context.clip();
    state.ripples.forEach((ripple) => { const y = (ripple.progress * state.height + state.time * (.012 + ripple.progress * .016)) % (state.height + 70) - 30; const progress = clamp(y / state.height, 0, 1); const x = riverCenter(progress) + ripple.offset * riverWidth(progress); const alpha = .16 + Math.sin(state.time * .001 + ripple.phase) * .06; context.strokeStyle = `rgb(255 235 244 / ${alpha})`; context.lineWidth = 1; context.beginPath(); context.moveTo(x - ripple.length / 2, y); context.quadraticCurveTo(x, y + Math.sin(state.time * .001 + ripple.phase) * 5, x + ripple.length / 2, y); context.stroke(); });
    const mist = context.createLinearGradient(0, state.height * .78, 0, state.height); mist.addColorStop(0, "transparent"); mist.addColorStop(1, "rgb(255 232 243 / 36%)"); context.fillStyle = mist; context.fillRect(0, state.height * .76, state.width, state.height * .24); context.restore();
  }
  function drawBanks() {
    context.save(); context.globalAlpha = .92; context.fillStyle = colors.bank;
    context.beginPath(); context.moveTo(0, 0); context.lineTo(state.width * .28, 0); context.bezierCurveTo(state.width * .18, state.height * .3, state.width * .23, state.height * .7, state.width * .3, state.height); context.lineTo(0, state.height); context.closePath(); context.fill();
    context.beginPath(); context.moveTo(state.width, 0); context.lineTo(state.width * .72, 0); context.bezierCurveTo(state.width * .82, state.height * .3, state.width * .77, state.height * .7, state.width * .7, state.height); context.lineTo(state.width, state.height); context.closePath(); context.fill(); context.restore();
  }
  function drawCliff() { const y = state.height * .86; context.fillStyle = "rgb(255 231 240 / 18%)"; context.fillRect(0, y, state.width, 2); context.fillStyle = colors.foam; context.fillRect(state.width * .32, y, state.width * .36, 3); context.fillStyle = "rgb(30 10 28 / 42%)"; context.fillRect(0, state.height * .93, state.width, state.height * .07); }
  function drawReeds() { state.reeds.forEach((reed) => { const center = riverCenter(reed.progress); const edge = center + reed.side * (riverWidth(reed.progress) / 2 + 9); const y = reed.progress * state.height; context.strokeStyle = reed.side < 0 ? "rgb(244 168 196 / 48%)" : "rgb(255 220 171 / 42%)"; context.lineWidth = 1.2; context.beginPath(); context.moveTo(edge, y); context.quadraticCurveTo(edge + reed.lean, y - reed.height * .55, edge + reed.lean * .7, y - reed.height); context.stroke(); }); }

  function render(milliseconds) {
    state.time = milliseconds; context.clearRect(0, 0, state.width, state.height); drawSky(); drawHills(); drawRiver(); drawBanks(); drawReeds(); drawCliff();
    for (let index = state.leaves.length - 1; index >= 0; index -= 1) { const leaf = state.leaves[index]; leaf.update(milliseconds - state.lastFrame); leaf.draw(); if (leaf.expired()) state.leaves.splice(index, 1); }
    state.lastFrame = milliseconds; state.animation = window.requestAnimationFrame(render);
  }

  function init() {
    resize(); window.addEventListener("resize", resize, { passive: true });
    form.addEventListener("submit", (event) => { event.preventDefault(); releaseLeaf(); }); sendButton?.addEventListener("click", releaseLeaf); input.addEventListener("input", updateCount);
    input.addEventListener("keydown", (event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); releaseLeaf(); } });
    trigger?.addEventListener("click", () => setInputOpen(!state.inputOpen)); document.addEventListener("visibilitychange", () => { if (document.hidden && state.animation) { window.cancelAnimationFrame(state.animation); state.animation = 0; } else if (!document.hidden && !state.animation) { state.lastFrame = performance.now(); state.animation = window.requestAnimationFrame(render); } });
    updateCount(); setInputOpen(true); state.lastFrame = performance.now(); state.animation = window.requestAnimationFrame(render);
  }

  window.MindGraceLeaf = { release: releaseLeaf, toggleInput: () => setInputOpen(!state.inputOpen), getState: () => ({ leafCount: state.leaves.length, inputOpen: state.inputOpen }) };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init();
})();
