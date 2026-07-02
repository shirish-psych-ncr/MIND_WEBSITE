
/**
 * ZENITH TAPPER v9.0 - ULTRA PATCHED
 * Architecture: State Machine + Dual Canvas + Bilateral Audio
 */

// --- STATE MACHINE ---
const STATE = { IDLE: 0, TRAVEL: 1, ORBIT: 2, READY: 3, EXPLODE: 4, PAUSED: 5 };
let currentState = STATE.IDLE;

// --- APP VARIABLES ---
let canvas, ctx, tCanvas, tCtx;
let w, h, midX, midY;
let particles = [];
let side = 'L'; // Current active side waiting for tap
let count = 0;
let brightness = 100;
let isPaused = false;
let audioCtx, osc, panner, gain;

// Comet Object
let comet = {
    x: 0, y: 0,
    sx: 0, sy: 0, // Start
    tx: 0, ty: 0, // Target
    cx: 0, cy: 0, // Control Point (Bezier)
    progress: 0,
    hue: 190,
    active: false
};

// --- INITIALIZATION ---
function initWorld() {
    if (audioCtx) return; // Prevent re-init
    
    // Check Orientation immediately
    if (window.innerHeight > window.innerWidth) {
        // Wait for rotation, but init audio context on first touch anyway
    }

    setupCanvas();
    setupAudio();
    
    // Start Loop
    currentState = STATE.TRAVEL;
    document.getElementById('label').innerText = "Follow the Light";
    startTransition('L');
    animate();
}

function setupCanvas() {
    canvas = document.getElementById('ui-canvas');
    ctx = canvas.getContext('2d');
    tCanvas = document.getElementById('trail-canvas');
    tCtx = tCanvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
}

function resize() {
    w = canvas.width = tCanvas.width = window.innerWidth;
    h = canvas.height = tCanvas.height = window.innerHeight;
    midX = w / 2;
    midY = h / 2;
}

function setupAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    osc = audioCtx.createOscillator();
    panner = audioCtx.createStereoPanner();
    gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(432, audioCtx.currentTime); // Healing frequency
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    
    osc.connect(panner);
    panner.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
}

// --- CORE LOGIC ---

function startTransition(targetSide) {
    currentState = STATE.TRAVEL;
    comet.active = true;
    comet.progress = 0;
    comet.hue = targetSide === 'L' ? 190 : 280; // Cyan vs Purple
    
    // Remove ready state from cores
    document.getElementById('L').classList.remove('ready');
    document.getElementById('R').classList.remove('ready');
    document.getElementById('L').style.setProperty('--cyan', targetSide === 'L' ? '#22d3ee' : '#a855f7');
    document.getElementById('R').style.setProperty('--cyan', targetSide === 'L' ? '#22d3ee' : '#a855f7');

    // Calculate Coordinates
    const targetNode = document.getElementById(targetSide).getBoundingClientRect();
    comet.tx = targetNode.left + targetNode.width / 2;
    comet.ty = targetNode.top + targetNode.height / 2;
    
    const prevSide = targetSide === 'L' ? 'R' : 'L';
    const prevNode = document.getElementById(prevSide).getBoundingClientRect();
    comet.sx = prevNode.left + prevNode.width / 2;
    comet.sy = prevNode.top + prevNode.height / 2;
    
    // Bezier Control Point (Arch upward)
    comet.cx = (comet.sx + comet.tx) / 2;
    comet.cy = (comet.sy + comet.ty) / 2 - (h * 0.15); // Arc height relative to screen
    
    // Audio Panning
    if (panner) {
        const panVal = targetSide === 'L' ? -1 : 1;
        panner.pan.exponentialRampToValueAtTime(panVal, audioCtx.currentTime + 1.5);
    }
}

function handleTap(s) {
    // Strict State Check
    if (currentState !== STATE.READY || s !== side) return;
    
    // Haptics (Heartbeat Left, Sharp Right)
    if (navigator.vibrate) {
        s === 'L' ? navigator.vibrate([40, 30, 40]) : navigator.vibrate([60]);
    }
    
    currentState = STATE.EXPLODE;
    spawnExplosion(comet.tx, comet.ty, comet.hue);
    
    // Progression Logic
    count++;
    document.getElementById('label').innerText = `Cycle ${count}`;
    
    // Atmospheric Dimming (Reward)
    if (count % 5 === 0 && brightness > 30) {
        brightness -= 5;
        document.body.style.filter = `brightness(${brightness}%)`;
    }
    
    // Supernova Reset
    if (count % 20 === 0) triggerSupernova();
    
    // Switch Side
    side = (s === 'L') ? 'R' : 'L';
    
    // Start Next Travel
    startTransition(side);
}

function spawnExplosion(x, y, hue) {
    for (let i = 0; i < 40; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 15,
            vy: (Math.random() - 0.5) * 15,
            life: 1.0,
            hue: hue
        });
    }
}

function triggerSupernova() {
    const sn = document.getElementById('supernova');
    sn.style.opacity = '1';
    setTimeout(() => {
        sn.style.opacity = '0';
        particles = []; // Clear clutter
        // Deepen Sound
        if (osc) {
            let newFreq = Math.max(200, 432 - (count * 2));
            osc.frequency.exponentialRampToValueAtTime(newFreq, audioCtx.currentTime + 2);
        }
    }, 800);
}

function togglePause(e) {
    e.stopPropagation();
    isPaused = !isPaused;
    const btn = document.getElementById('gear-btn');
    if (isPaused) {
        btn.classList.add('paused');
        currentState = STATE.PAUSED;
        if(audioCtx) audioCtx.suspend();
    } else {
        btn.classList.remove('paused');
        if(audioCtx) audioCtx.resume();
        // Resume state logic could be added here, for now just unpauses render
        if(currentState === STATE.PAUSED) currentState = STATE.READY; 
    }
}

// --- ANIMATION LOOP ---
function animate() {
    requestAnimationFrame(animate);
    
    if (isPaused) return;
    
    // 1. Trail Canvas (Persistent Fade)
    tCtx.fillStyle = 'rgba(1, 2, 4, 0.1)'; // Low opacity creates trails
    tCtx.fillRect(0, 0, w, h);
    
    // 2. UI Canvas (Clear Every Frame)
    ctx.clearRect(0, 0, w, h);
    
    // 3. State Machine Logic
    if (currentState === STATE.TRAVEL || currentState === STATE.ORBIT) {
        comet.progress += 0.006; // Speed control
        
        // Sinusoidal Wobble for organic feel
        const wobble = Math.sin(comet.progress * 30) * 10;
        
        if (comet.progress < 0.7) {
            // PHASE 1: Bezier Curve Travel
            const t = comet.progress / 0.7;
            comet.x = (1-t)**2 * comet.sx + 2*(1-t)*t * comet.cx + t**2 * comet.tx;
            comet.y = (1-t)**2 * comet.sy + 2*(1-t)*t * comet.cy + t**2 * comet.ty + wobble;
            
            // Emit trail particles
            if (Math.random() > 0.5) {
                tCtx.fillStyle = `hsla(${comet.hue}, 80%, 60%, 0.5)`;
                tCtx.beginPath();
                tCtx.arc(comet.x, comet.y, 3, 0, Math.PI*2);
                tCtx.fill();
            }
        } else {
            // PHASE 2: Spiral Convergence (Orbit)
            const t = (comet.progress - 0.7) / 0.3;
            const angle = t * Math.PI * 4; // 2 Rotations
            const radius = 80 * (1 - t); // Shrink to 0
            
            comet.x = comet.tx + Math.cos(angle) * radius;
            comet.y = comet.ty + Math.sin(angle) * radius;
            
            // Check Landing
            if (t >= 1) {
                currentState = STATE.READY;
                comet.active = false;
                document.getElementById(side).classList.add('ready');
                document.getElementById('label').innerText = `Tap ${side === 'L' ? 'Left' : 'Right'}`;
            }
        }
        
        // Draw Comet Head
        if (comet.active) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = `hsl(${comet.hue}, 100%, 50%)`;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(comet.x, comet.y, 5, 0, Math.PI*2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
    
    // 4. Draw Particles (Explosions)
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;
        
        if (p.life <= 0) {
            particles.splice(i, 1);
        } else {
            ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.life})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.life * 4, 0, Math.PI*2);
            ctx.fill();
        }
    }
}

