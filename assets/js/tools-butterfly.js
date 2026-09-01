/* Butterfly Tapper: a small, dependency-free bilateral grounding interaction. */
(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const STATE = Object.freeze({ idle: 'idle', travelling: 'travelling', ready: 'ready', paused: 'paused' });
  const state = { phase: STATE.idle, side: 'L', cycle: 0, progress: 0, comet: { x: 0, y: 0, startX: 0, startY: 0, targetX: 0, targetY: 0, hue: 188 }, particles: [], width: 0, height: 0, dpr: 1, resizeObserver: null, audio: null };
  const $ = (selector) => document.querySelector(selector);
  const canvas = $('#ui-canvas');
  const trailCanvas = $('#trail-canvas');
  const left = $('#L');
  const right = $('#R');
  const label = $('#label');
  const gear = $('#gear-btn');
  const reduceMotion = () => prefersReducedMotion.matches;
  if (!canvas || !trailCanvas || !left || !right || !label) return;
  const context = canvas.getContext('2d', { alpha: true });
  const trailContext = trailCanvas.getContext('2d', { alpha: true });

  function announce(message) { label.textContent = message; }
  function resize() {
    const rect = document.body.getBoundingClientRect();
    state.width = Math.max(1, Math.round(rect.width));
    state.height = Math.max(1, Math.round(rect.height));
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    [canvas, trailCanvas].forEach((element) => {
      element.width = Math.round(state.width * state.dpr);
      element.height = Math.round(state.height * state.dpr);
      element.style.width = `${state.width}px`;
      element.style.height = `${state.height}px`;
    });
    context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    trailContext.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
  }
  function centre(element) { const rect = element.getBoundingClientRect(); return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }; }
  function setReady(side) {
    state.phase = STATE.ready;
    state.side = side;
    left.classList.toggle('ready', side === 'L');
    right.classList.toggle('ready', side === 'R');
    announce(`Tap ${side === 'L' ? 'left' : 'right'}`);
  }
  function beginAudio() {
    if (state.audio || !('AudioContext' in window || 'webkitAudioContext' in window)) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const panner = audioContext.createStereoPanner();
      oscillator.type = 'sine'; oscillator.frequency.value = 432; gain.gain.value = 0.025;
      oscillator.connect(panner).connect(gain).connect(audioContext.destination); oscillator.start();
      state.audio = { audioContext, panner };
    } catch { state.audio = null; }
  }
  function moveAudio(side) {
    const audio = state.audio; if (!audio) return;
    const now = audio.audioContext.currentTime;
    audio.audioContext.resume?.().catch(() => {});
    audio.panner.pan.cancelScheduledValues(now);
    audio.panner.pan.linearRampToValueAtTime(side === 'L' ? -0.75 : 0.75, now + 0.2);
  }
  function startSession() {
    beginAudio(); state.phase = STATE.travelling; state.progress = 0;
    state.comet.hue = state.side === 'L' ? 188 : 278;
    const target = centre(state.side === 'L' ? left : right);
    const start = centre(state.side === 'L' ? right : left);
    Object.assign(state.comet, { startX: start.x, startY: start.y, targetX: target.x, targetY: target.y });
    moveAudio(state.side); left.classList.remove('ready'); right.classList.remove('ready'); announce('Follow the light');
  }
  function addParticles(x, y, hue) {
    if (reduceMotion()) return;
    for (let index = 0; index < 22; index += 1) { const angle = (Math.PI * 2 * index) / 22; const speed = 1.5 + Math.random() * 2.5; state.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, hue }); }
  }
  function tap(side) {
    if (state.phase === STATE.idle) { state.side = side; startSession(); return; }
    if (state.phase !== STATE.ready || side !== state.side) return;
    const target = centre(side === 'L' ? left : right); addParticles(target.x, target.y, state.comet.hue);
    state.cycle += 1; announce(`Cycle ${state.cycle}`); state.side = side === 'L' ? 'R' : 'L'; startSession();
  }
  function togglePause(event) {
    event?.preventDefault(); beginAudio();
    if (state.phase === STATE.paused) { state.phase = STATE.ready; gear.setAttribute('aria-label', 'Pause butterfly tapper'); gear.setAttribute('aria-pressed', 'false'); state.audio?.audioContext.resume?.().catch(() => {}); announce(`Tap ${state.side === 'L' ? 'left' : 'right'}`); }
    else { state.phase = STATE.paused; gear.setAttribute('aria-label', 'Resume butterfly tapper'); gear.setAttribute('aria-pressed', 'true'); state.audio?.audioContext.suspend?.().catch(() => {}); announce('Paused'); }
    gear.classList.toggle('paused', state.phase === STATE.paused);
  }
  function draw() {
    requestAnimationFrame(draw);
    if (state.phase === STATE.paused) return;
    trailContext.fillStyle = 'rgba(1, 2, 4, 0.12)'; trailContext.fillRect(0, 0, state.width, state.height); context.clearRect(0, 0, state.width, state.height);
    if (state.phase === STATE.travelling) {
      state.progress = Math.min(1, state.progress + (reduceMotion() ? 0.08 : 0.018));
      const eased = state.progress * state.progress * (3 - 2 * state.progress); const arc = Math.sin(state.progress * Math.PI) * Math.min(120, state.width * 0.16);
      state.comet.x = state.comet.startX + (state.comet.targetX - state.comet.startX) * eased; state.comet.y = state.comet.startY + (state.comet.targetY - state.comet.startY) * eased - arc;
      if (!reduceMotion()) { trailContext.fillStyle = `hsla(${state.comet.hue}, 90%, 65%, 0.35)`; trailContext.beginPath(); trailContext.arc(state.comet.x, state.comet.y, 3, 0, Math.PI * 2); trailContext.fill(); }
      if (state.progress >= 1) setReady(state.side);
      context.shadowBlur = reduceMotion() ? 0 : 24; context.shadowColor = `hsl(${state.comet.hue}, 100%, 60%)`; context.fillStyle = '#fff'; context.beginPath(); context.arc(state.comet.x, state.comet.y, 6, 0, Math.PI * 2); context.fill(); context.shadowBlur = 0;
    }
    state.particles = state.particles.filter((particle) => { particle.x += particle.vx; particle.y += particle.vy; particle.life -= 0.025; if (particle.life <= 0) return false; context.fillStyle = `hsla(${particle.hue}, 90%, 65%, ${particle.life})`; context.beginPath(); context.arc(particle.x, particle.y, 4 * particle.life, 0, Math.PI * 2); context.fill(); return true; });
  }
  function bind() {
    [left, right].forEach((button) => { button.addEventListener('pointerdown', (event) => { event.preventDefault(); tap(button.id); }); button.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); tap(button.id); } }); });
    gear?.addEventListener('click', togglePause); prefersReducedMotion.addEventListener?.('change', resize);
    state.resizeObserver = new ResizeObserver(resize); state.resizeObserver.observe(document.body); resize(); draw();
  }
  document.addEventListener('DOMContentLoaded', bind, { once: true });
})();
