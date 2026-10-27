/**
 * Butterfly Tapper - Bilateral Stimulation Tool
 * Enterprise-grade PWA optimization with graceful event handling
 * @version 3.0.0 - PWA Optimized
 * @module tools-butterfly
 */
(() => {
  'use strict';

  // ============================================================================
  // CONFIGURATION & CONSTANTS
  // ============================================================================
  const CONFIG = Object.freeze({
    STATES: { IDLE: 'idle', TRAVELLING: 'travelling', READY: 'ready', PAUSED: 'paused' },
    COLORS: { LEFT_HUE: 188, RIGHT_HUE: 278 },
    AUDIO: { FREQUENCY: 432, GAIN: 0.025, PAN_LEFT: -0.75, PAN_RIGHT: 0.75 },
    ANIMATION: { 
      SPEED_NORMAL: 0.018, 
      SPEED_REDUCED: 0.08, 
      PARTICLE_COUNT: 22, 
      PARTICLE_DECAY: 0.025 
    },
    CANVAS: { MAX_DPR: 2, TRAIL_OPACITY: 0.12, COMET_RADIUS: 6, TRAIL_RADIUS: 3 },
    FULLSCREEN: { ESCAPE_KEY: 'Escape', DOUBLE_TAP_DELAY: 300 },
    PWA: { STORAGE_KEY: 'butterfly_pwa_installed', ORIENTATION_LOCK: 'landscape' },
    ARIA_MESSAGES: {
      IDLE: 'Tap screen to begin',
      FOLLOW: 'Follow the light',
      PAUSED: 'Paused',
      CYCLE: (n) => `Cycle ${n}`,
      FULLSCREEN_ENTER: 'Entered fullscreen mode',
      FULLSCREEN_EXIT: 'Exited fullscreen mode'
    }
  });

  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  const state = {
    phase: CONFIG.STATES.IDLE,
    side: 'L',
    cycle: 0,
    progress: 0,
    comet: { x: 0, y: 0, startX: 0, startY: 0, targetX: 0, targetY: 0, hue: CONFIG.COLORS.LEFT_HUE },
    particles: [],
    dimensions: { width: 0, height: 0, dpr: 1 },
    resizeObserver: null,
    audio: null,
    animationFrameId: null,
    isFullscreen: false,
    isPWA: false,
    lastTapTime: 0,
    cleanupFunctions: []
  };

  // ============================================================================
  // DOM ELEMENTS CACHE
  // ============================================================================
  const elements = {
    canvas: document.getElementById('ui-canvas'),
    trailCanvas: document.getElementById('trail-canvas'),
    left: document.getElementById('L'),
    right: document.getElementById('R'),
    label: document.getElementById('label'),
    gearBtn: document.getElementById('gear-btn'),
    body: document.getElementById('butterfly-body')
  };

  // Early exit if critical elements missing
  if (!elements.canvas || !elements.trailCanvas || !elements.left || !elements.right || !elements.label) {
    console.warn('Butterfly Tapper: Required elements not found');
    return;
  }

  // ============================================================================
  // CANVAS CONTEXTS WITH OPTIMIZATION
  // ============================================================================
  const contexts = {
    main: elements.canvas.getContext('2d', { 
      alpha: true, 
      desynchronized: true,
      willReadFrequently: false 
    }),
    trail: elements.trailCanvas.getContext('2d', { 
      alpha: true, 
      desynchronized: true,
      willReadFrequently: false 
    })
  };

  // ============================================================================
  // MEDIA QUERIES & FEATURE DETECTION
  // ============================================================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduceMotion = () => prefersReducedMotion.matches;
  
  // Feature detection
  const supportsFullscreen = () => !!(
    document.documentElement.requestFullscreen ||
    document.documentElement.webkitRequestFullscreen ||
    document.documentElement.mozRequestFullScreen ||
    document.documentElement.msRequestFullscreen
  );
  
  const supportsOrientationLock = () => !!(
    screen.orientation && screen.orientation.lock
  );
  
  const supportsVibration = () => 'vibrate' in navigator;
  const supportsWakeLock = () => 'wakeLock' in navigator;

  /**
   * Accessibility: Update ARIA live region with throttling
   * @param {string} message - Message to announce
   */
  function announce(message) {
    if (!elements.label) return;
    // Throttle announcements to prevent screen reader overload
    requestAnimationFrame(() => {
      elements.label.textContent = message;
    });
  }

  /**
   * Handle canvas resizing with DPR optimization and performance
   */
  function resize() {
    const rect = document.body.getBoundingClientRect();
    state.dimensions.width = Math.max(1, Math.round(rect.width));
    state.dimensions.height = Math.max(1, Math.round(rect.height));
    state.dimensions.dpr = Math.min(window.devicePixelRatio || 1, CONFIG.CANVAS.MAX_DPR);

    [elements.canvas, elements.trailCanvas].forEach((canvas) => {
      canvas.width = Math.round(state.dimensions.width * state.dimensions.dpr);
      canvas.height = Math.round(state.dimensions.height * state.dimensions.dpr);
      canvas.style.width = `${state.dimensions.width}px`;
      canvas.style.height = `${state.dimensions.height}px`;
    });

    contexts.main.setTransform(state.dimensions.dpr, 0, 0, state.dimensions.dpr, 0, 0);
    contexts.trail.setTransform(state.dimensions.dpr, 0, 0, state.dimensions.dpr, 0, 0);
  }

  /**
   * Get center coordinates of an element
   * @param {HTMLElement} element
   * @returns {{x: number, y: number}}
   */
  function getCenter(element) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  /**
   * Set ready state for tapping with visual feedback
   * @param {string} side - 'L' or 'R'
   */
  function setReady(side) {
    state.phase = CONFIG.STATES.READY;
    state.side = side;
    elements.left.classList.toggle('ready', side === 'L');
    elements.right.classList.toggle('ready', side === 'R');
    announce(`Tap ${side === 'L' ? 'left' : 'right'}`);
  }

  /**
   * Initialize Web Audio API with graceful error handling
   */
  function initAudio() {
    if (state.audio || !(window.AudioContext || window.webkitAudioContext)) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioCtx({ latencyHint: 'interactive' });
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const panner = audioContext.createStereoPanner();

      oscillator.type = 'sine';
      oscillator.frequency.value = CONFIG.AUDIO.FREQUENCY;
      gainNode.gain.value = CONFIG.AUDIO.GAIN;

      oscillator.connect(panner).connect(gainNode).connect(audioContext.destination);
      oscillator.start();

      state.audio = { audioContext, panner, gainNode, oscillator };
      
      // Resume audio context on user interaction (browser autoplay policy)
      const resumeAudio = () => {
        if (audioContext.state === 'suspended') {
          audioContext.resume().catch(() => {});
        }
      };
      
      document.addEventListener('pointerdown', resumeAudio, { once: true, passive: true });
      document.addEventListener('keydown', resumeAudio, { once: true, passive: true });
    } catch (error) {
      console.warn('Butterfly Tapper: Audio initialization failed', error);
      state.audio = null;
    }
  }

  /**
   * Pan audio to specified side with smooth transitions
   * @param {string} side - 'L' or 'R'
   */
  function panAudio(side) {
    if (!state.audio?.panner) return;

    const { audioContext, panner } = state.audio;
    const now = audioContext.currentTime;
    const targetPan = side === 'L' ? CONFIG.AUDIO.PAN_LEFT : CONFIG.AUDIO.PAN_RIGHT;

    audioContext.resume?.().catch(() => {});
    panner.pan.cancelScheduledValues(now);
    panner.pan.linearRampToValueAtTime(targetPan, now + 0.2);
  }

  /**
   * Provide haptic feedback if supported
   * @param {number} pattern - Vibration pattern
   */
  function vibrate(pattern = 15) {
    if (supportsVibration()) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Vibration not supported or blocked
      }
    }
  }

  /**
   * Request fullscreen mode with cross-browser support
   * @returns {Promise<boolean>}
   */
  async function enterFullscreen() {
    if (!supportsFullscreen() || state.isFullscreen) return false;

    try {
      const elem = document.documentElement;
      const requestFullscreen = 
        elem.requestFullscreen ||
        elem.webkitRequestFullscreen ||
        elem.mozRequestFullScreen ||
        elem.msRequestFullscreen;

      await requestFullscreen.call(elem);
      state.isFullscreen = true;
      
      // Lock orientation in fullscreen for better experience
      if (supportsOrientationLock()) {
        try {
          await screen.orientation.lock(CONFIG.PWA.ORIENTATION_LOCK);
        } catch (e) {
          // Orientation lock failed, continue anyway
        }
      }
      
      // Request wake lock to prevent screen sleep
      if (supportsWakeLock()) {
        try {
          await navigator.wakeLock.request('screen');
        } catch (e) {
          // Wake lock not available
        }
      }
      
      announce(CONFIG.ARIA_MESSAGES.FULLSCREEN_ENTER);
      return true;
    } catch (error) {
      console.warn('Butterfly Tapper: Fullscreen request failed', error);
      return false;
    }
  }

  /**
   * Exit fullscreen mode
   * @returns {Promise<boolean>}
   */
  async function exitFullscreen() {
    if (!state.isFullscreen) return false;

    try {
      const exitFullscreen = 
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.mozCancelFullScreen ||
        document.msExitFullscreen;

      await exitFullscreen.call(document);
      state.isFullscreen = false;
      
      // Unlock orientation
      if (supportsOrientationLock() && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
      
      announce(CONFIG.ARIA_MESSAGES.FULLSCREEN_EXIT);
      return true;
    } catch (error) {
      console.warn('Butterfly Tapper: Exit fullscreen failed', error);
      return false;
    }
  }

  /**
   * Toggle fullscreen on double tap or gear button long press
   * @param {Event} event
   */
  async function handleFullscreenToggle(event) {
    const now = Date.now();
    const isDoubleTap = (now - state.lastTapTime) < CONFIG.FULLSCREEN.DOUBLE_TAP_DELAY;
    
    if (isDoubleTap || (event && event.detail >= 2)) {
      event?.preventDefault();
      if (state.isFullscreen) {
        await exitFullscreen();
      } else {
        await enterFullscreen();
      }
      state.lastTapTime = 0;
    } else {
      state.lastTapTime = now;
    }
  }

  /**
   * Start animation session with haptic feedback
   */
  function startSession() {
    initAudio();
    state.phase = CONFIG.STATES.TRAVELLING;
    state.progress = 0;
    state.comet.hue = state.side === 'L' ? CONFIG.COLORS.LEFT_HUE : CONFIG.COLORS.RIGHT_HUE;

    const targetEl = state.side === 'L' ? elements.left : elements.right;
    const startEl = state.side === 'L' ? elements.right : elements.left;

    const target = getCenter(targetEl);
    const start = getCenter(startEl);

    Object.assign(state.comet, {
      startX: start.x,
      startY: start.y,
      targetX: target.x,
      targetY: target.y
    });

    panAudio(state.side);
    vibrate(10); // Light haptic feedback
    elements.left.classList.remove('ready');
    elements.right.classList.remove('ready');
    announce(CONFIG.ARIA_MESSAGES.FOLLOW);
  }

  /**
   * Create particle explosion effect with performance optimization
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} hue - Color hue
   */
  function createParticles(x, y, hue) {
    if (reduceMotion()) return;

    // Reduce particle count on low-end devices
    const particleCount = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
      ? Math.floor(CONFIG.ANIMATION.PARTICLE_COUNT * 0.6)
      : CONFIG.ANIMATION.PARTICLE_COUNT;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 1.5 + Math.random() * 2.5;

      state.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        hue
      });
    }
  }

  /**
   * Handle tap interaction with fullscreen support
   * @param {string} side - 'L' or 'R'
   * @param {PointerEvent} event
   */
  function handleTap(side, event) {
    // Check for double-tap to toggle fullscreen
    handleFullscreenToggle(event);
    
    if (state.phase === CONFIG.STATES.IDLE) {
      state.side = side;
      startSession();
      return;
    }

    if (state.phase !== CONFIG.STATES.READY || side !== state.side) return;

    const target = getCenter(side === 'L' ? elements.left : elements.right);
    createParticles(target.x, target.y, state.comet.hue);

    state.cycle++;
    announce(CONFIG.ARIA_MESSAGES.CYCLE(state.cycle));
    state.side = side === 'L' ? 'R' : 'L';
    startSession();
  }

  /**
   * Toggle pause/resume state with audio management
   * @param {Event} event
   */
  function togglePause(event) {
    event?.preventDefault();
    initAudio();

    const isPaused = state.phase === CONFIG.STATES.PAUSED;

    if (isPaused) {
      state.phase = CONFIG.STATES.READY;
      elements.gearBtn.setAttribute('aria-label', 'Pause butterfly tapper');
      elements.gearBtn.setAttribute('aria-pressed', 'false');
      state.audio?.audioContext.resume?.().catch(() => {});
      announce(`Tap ${state.side === 'L' ? 'left' : 'right'}`);
    } else {
      state.phase = CONFIG.STATES.PAUSED;
      elements.gearBtn.setAttribute('aria-label', 'Resume butterfly tapper');
      elements.gearBtn.setAttribute('aria-pressed', 'true');
      state.audio?.audioContext.suspend?.().catch(() => {});
      announce(CONFIG.ARIA_MESSAGES.PAUSED);
    }

    elements.gearBtn.classList.toggle('paused', !isPaused);
  }

  /**
   * Main animation loop with delta-time calculation
   * @param {number} timestamp - Current timestamp from requestAnimationFrame
   */
  let lastFrameTime = 0;
  function animate(timestamp) {
    state.animationFrameId = requestAnimationFrame(animate);

    // Calculate delta time for smooth animation across different refresh rates
    const deltaTime = timestamp - lastFrameTime;
    lastFrameTime = timestamp;

    if (state.phase === CONFIG.STATES.PAUSED) return;

    const { main: ctx, trail: trailCtx } = contexts;
    const { width, height } = state.dimensions;

    // Trail fade effect
    trailCtx.fillStyle = `rgba(1, 2, 4, ${CONFIG.CANVAS.TRAIL_OPACITY})`;
    trailCtx.fillRect(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);

    if (state.phase === CONFIG.STATES.TRAVELLING) {
      // Adjust speed based on frame rate for consistency
      const speedMultiplier = deltaTime / 16.67; // Normalize to 60fps
      const speed = reduceMotion() 
        ? CONFIG.ANIMATION.SPEED_REDUCED * speedMultiplier 
        : CONFIG.ANIMATION.SPEED_NORMAL * speedMultiplier;
      
      state.progress = Math.min(1, state.progress + speed);

      const eased = state.progress * state.progress * (3 - 2 * state.progress);
      const arc = Math.sin(state.progress * Math.PI) * Math.min(120, width * 0.16);

      state.comet.x = state.comet.startX + (state.comet.targetX - state.comet.startX) * eased;
      state.comet.y = state.comet.startY + (state.comet.targetY - state.comet.startY) * eased - arc;

      // Draw trail
      if (!reduceMotion()) {
        trailCtx.fillStyle = `hsla(${state.comet.hue}, 90%, 65%, 0.35)`;
        trailCtx.beginPath();
        trailCtx.arc(state.comet.x, state.comet.y, CONFIG.CANVAS.TRAIL_RADIUS, 0, Math.PI * 2);
        trailCtx.fill();
      }

      // Check completion
      if (state.progress >= 1) {
        setReady(state.side);
      }

      // Draw comet
      ctx.shadowBlur = reduceMotion() ? 0 : 24;
      ctx.shadowColor = `hsl(${state.comet.hue}, 100%, 60%)`;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(state.comet.x, state.comet.y, CONFIG.CANVAS.COMET_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Update and draw particles
    state.particles = state.particles.filter((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= CONFIG.ANIMATION.PARTICLE_DECAY;

      if (particle.life <= 0) return false;

      ctx.fillStyle = `hsla(${particle.hue}, 90%, 65%, ${particle.life})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 4 * particle.life, 0, Math.PI * 2);
      ctx.fill();

      return true;
    });
  }

  /**
   * Handle visibility change - pause when tab is hidden
   */
  function handleVisibilityChange() {
    if (document.hidden && state.phase !== CONFIG.STATES.PAUSED && state.phase !== CONFIG.STATES.IDLE) {
      // Store previous state and pause
      state.wasRunning = true;
      togglePause();
    } else if (!document.hidden && state.wasRunning) {
      // Resume if was running before hiding
      state.wasRunning = false;
      togglePause();
    }
  }

  /**
   * Handle escape key to exit fullscreen
   * @param {KeyboardEvent} event
   */
  async function handleEscapeKey(event) {
    if (event.key === CONFIG.FULLSCREEN.ESCAPE_KEY && state.isFullscreen) {
      await exitFullscreen();
    }
  }

  /**
   * Bind event listeners with passive optimization and cleanup
   */
  function bindEvents() {
    const tapHandler = (event) => {
      event.preventDefault();
      handleTap(event.currentTarget.id, event);
    };

    const keyHandler = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleTap(event.currentTarget.id, event);
      }
    };

    // Use pointer events for unified mouse/touch/pen support
    [elements.left, elements.right].forEach((button) => {
      button.addEventListener('pointerdown', tapHandler, { passive: false });
      button.addEventListener('keydown', keyHandler);
      // Prevent context menu on long press
      button.addEventListener('contextmenu', (e) => e.preventDefault());
    });

    // Gear button for pause/fullscreen
    elements.gearBtn?.addEventListener('click', togglePause);
    elements.gearBtn?.addEventListener('dblclick', handleFullscreenToggle);
    
    // Fullscreen change listener
    document.addEventListener('fullscreenchange', () => {
      state.isFullscreen = !!document.fullscreenElement;
    });
    
    // Keyboard handlers
    document.addEventListener('keydown', handleEscapeKey);
    
    // Visibility change handler
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Resize observer with cleanup
    prefersReducedMotion.addEventListener?.('change', resize);

    state.resizeObserver = new ResizeObserver(resize);
    state.resizeObserver.observe(document.body);
    
    // Store cleanup functions
    state.cleanupFunctions.push(() => {
      state.resizeObserver?.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleEscapeKey);
    });

    resize();
    animate(0);
  }

  /**
   * Cleanup function for graceful teardown
   */
  function cleanup() {
    if (state.animationFrameId) {
      cancelAnimationFrame(state.animationFrameId);
    }
    
    state.audio?.audioContext?.close?.().catch(() => {});
    
    state.cleanupFunctions.forEach(fn => fn());
    state.cleanupFunctions = [];
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindEvents, { once: true });
  } else {
    bindEvents();
  }
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', cleanup);
})();
