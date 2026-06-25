/**
 * Butterfly Tapper - Grounding Tool
 * Bilateral stimulation exercise for anxiety relief
 */

(function() {
    'use strict';

    const STATE = { IDLE: 0, TRAVEL: 1, ORBIT: 2, READY: 3, EXPLODE: 4, PAUSED: 5 };
    let currentState = STATE.IDLE;
    let canvas, ctx, tCanvas, tCtx, w, h, midX, midY;
    let particles = [];
    let side = 'L', count = 0, brightness = 100, isPaused = false;
    let audioCtx, osc, panner, gain;
    let comet = { x: 0, y: 0, sx: 0, sy: 0, tx: 0, ty: 0, cx: 0, cy: 0, progress: 0, hue: 190, active: false };

    function initWorld() {
        if (audioCtx) return;
        setupCanvas();
        setupAudio();
        currentState = STATE.TRAVEL;
        const label = document.getElementById('label');
        if (label) label.innerText = "Follow the Light";
        startTransition('L');
        animate();
    }

    function setupCanvas() {
        canvas = document.getElementById('ui-canvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        tCanvas = document.getElementById('trail-canvas');
        if (!tCanvas) return;
        tCtx = tCanvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);
    }

    function resize() {
        if (!canvas || !tCanvas) return;
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
        osc.frequency.setValueAtTime(432, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        osc.connect(panner);
        panner.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
    }

    function startTransition(targetSide) {
        currentState = STATE.TRAVEL;
        comet.active = true;
        comet.progress = 0;
        comet.hue = targetSide === 'L' ? 190 : 280;
        const L = document.getElementById('L'), R = document.getElementById('R');
        if (L) L.classList.remove('ready');
        if (R) R.classList.remove('ready');
        if (L) L.style.setProperty('--cyan', targetSide === 'L' ? '#22d3ee' : '#a855f7');
        if (R) R.style.setProperty('--cyan', targetSide === 'L' ? '#22d3ee' : '#a855f7');
        const targetNode = document.getElementById(targetSide).getBoundingClientRect();
        comet.tx = targetNode.left + targetNode.width / 2;
        comet.ty = targetNode.top + targetNode.height / 2;
        const prevSide = targetSide === 'L' ? 'R' : 'L';
        const prevNode = document.getElementById(prevSide).getBoundingClientRect();
        comet.sx = prevNode.left + prevNode.width / 2;
        comet.sy = prevNode.top + prevNode.height / 2;
        comet.cx = (comet.sx + comet.tx) / 2;
        comet.cy = (comet.sy + comet.ty) / 2 - (h * 0.15);
        if (panner) {
            const panVal = targetSide === 'L' ? -1 : 1;
            panner.pan.exponentialRampToValueAtTime(panVal, audioCtx.currentTime + 1.5);
        }
    }

    function handleTap(s) {
        if (currentState !== STATE.READY || s !== side) return;
        if (navigator.vibrate) {
            s === 'L' ? navigator.vibrate([40, 30, 40]) : navigator.vibrate([60]);
        }
        currentState = STATE.EXPLODE;
        spawnExplosion(comet.tx, comet.ty, comet.hue);
        count++;
        const label = document.getElementById('label');
        if (label) label.innerText = 'Cycle ' + count;
        if (count % 5 === 0 && brightness > 30) {
            brightness -= 5;
            document.body.style.filter = 'brightness(' + brightness + '%)';
        }
        if (count % 20 === 0) triggerSupernova();
        side = (s === 'L') ? 'R' : 'L';
        startTransition(side);
    }

    function spawnExplosion(x, y, hue) {
        for (let i = 0; i < 40; i++) {
            particles.push({ x: x, y: y, vx: (Math.random() - 0.5) * 15, vy: (Math.random() - 0.5) * 15, life: 1.0, hue: hue });
        }
    }

    function triggerSupernova() {
        const sn = document.getElementById('supernova');
        if (sn) sn.style.opacity = '1';
        setTimeout(function() {
            if (sn) sn.style.opacity = '0';
            particles = [];
            if (osc) {
                var newFreq = Math.max(200, 432 - (count * 2));
                osc.frequency.exponentialRampToValueAtTime(newFreq, audioCtx.currentTime + 2);
            }
        }, 800);
    }

    function togglePause(e) {
        if (e) e.stopPropagation();
        isPaused = !isPaused;
        const btn = document.getElementById('gear-btn');
        if (isPaused) {
            if (btn) btn.classList.add('paused');
            currentState = STATE.PAUSED;
            if (audioCtx) audioCtx.suspend();
        } else {
            if (btn) btn.classList.remove('paused');
            if (audioCtx) audioCtx.resume();
            if (currentState === STATE.PAUSED) currentState = STATE.READY;
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        if (isPaused) return;
        if (tCtx) { tCtx.fillStyle = 'rgba(1, 2, 4, 0.1)'; tCtx.fillRect(0, 0, w, h); }
        if (ctx) ctx.clearRect(0, 0, w, h);
        if (currentState === STATE.TRAVEL || currentState === STATE.ORBIT) {
            comet.progress += 0.006;
            var wobble = Math.sin(comet.progress * 30) * 10;
            if (comet.progress < 0.7) {
                var t = comet.progress / 0.7;
                comet.x = Math.pow(1-t,2) * comet.sx + 2*(1-t)*t * comet.cx + Math.pow(t,2) * comet.tx;
                comet.y = Math.pow(1-t,2) * comet.sy + 2*(1-t)*t * comet.cy + Math.pow(t,2) * comet.ty + wobble;
                if (Math.random() > 0.5 && tCtx) {
                    tCtx.fillStyle = 'hsla(' + comet.hue + ', 80%, 60%, 0.5)';
                    tCtx.beginPath();
                    tCtx.arc(comet.x, comet.y, 3, 0, Math.PI*2);
                    tCtx.fill();
                }
            } else {
                var t2 = (comet.progress - 0.7) / 0.3;
                var angle = t2 * Math.PI * 4;
                var radius = 80 * (1 - t2);
                comet.x = comet.tx + Math.cos(angle) * radius;
                comet.y = comet.ty + Math.sin(angle) * radius;
                if (t2 >= 1) {
                    currentState = STATE.READY;
                    comet.active = false;
                    var activeSide = document.getElementById(side);
                    if (activeSide) activeSide.classList.add('ready');
                    var label = document.getElementById('label');
                    if (label) label.innerText = 'Tap ' + (side === 'L' ? 'Left' : 'Right');
                }
            }
            if (comet.active && ctx) {
                ctx.shadowBlur = 20;
                ctx.shadowColor = 'hsl(' + comet.hue + ', 100%, 50%)';
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(comet.x, comet.y, 5, 0, Math.PI*2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
        for (var i = particles.length - 1; i >= 0; i--) {
            var p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.015;
            if (p.life <= 0) { particles.splice(i, 1); }
            else if (ctx) {
                ctx.fillStyle = 'hsla(' + p.hue + ', 80%, 60%, ' + p.life + ')';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.life * 4, 0, Math.PI*2);
                ctx.fill();
            }
        }
    }

    window.initWorld = initWorld;
    window.handleTap = handleTap;
    window.togglePause = togglePause;
})();
