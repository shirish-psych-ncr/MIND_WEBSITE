/**
 * Fractal Tool - Grounding Exercise
 * Interactive fractal patterns for anxiety relief
 */

(function() {
    'use strict';

    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    const breathText = document.getElementById('breath-text');
    const ui = document.getElementById('ui');
    
    let w, h, entities = [], isDown = false, hue = 180, haptic = true;

    function resize() {
        w = canvas.width = canvas.parentElement.clientWidth;
        h = canvas.height = canvas.parentElement.clientHeight;
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    function toggleZen() {
        document.body.classList.toggle('zen-active');
        if (ui) ui.classList.toggle('collapsed');
        const minBtn = document.getElementById('min-btn');
        if (minBtn) {
            minBtn.style.background = document.body.classList.contains('zen-active') ? 'var(--brand-accent)' : '';
        }
    }

    function Star(x, y) {
        this.x = x;
        this.y = y;
        this.tx = x;
        this.ty = y;
        this.life = 1.0;
        const depthEl = document.getElementById('depth');
        this.d = depthEl ? parseInt(depthEl.value) : 5;
    }

    Star.prototype.update = function() {
        this.x += (this.tx - this.x) * 0.1;
        this.y += (this.ty - this.y) * 0.1;
        this.life -= 0.003;
    };

    Star.prototype.draw = function(bs) {
        ctx.save();
        ctx.translate(this.x, this.y);
        for (let i = 0; i < 4; i++) {
            ctx.rotate(Math.PI / 2);
            this.step(0, 0, h * 0.18 * this.life, -Math.PI/2, this.d, bs);
        }
        ctx.restore();
    };

    Star.prototype.step = function(x, y, l, a, d, bs) {
        if (d === 0) return;
        const x2 = x + Math.cos(a) * l;
        const y2 = y + Math.sin(a) * l;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + Math.cos(a+0.5) * l/2, y + Math.sin(a+0.5) * l/2, x2, y2);
        ctx.strokeStyle = 'hsla(' + ((hue + d*15)%360) + ', 80%, 55%, ' + (this.life * d * 0.12 * bs) + ')';
        ctx.lineWidth = d * bs;
        ctx.stroke();
        const spr = 0.8 + (Math.sin(Date.now()*0.001)*0.2);
        this.step(x2, y2, l * 0.7, a - spr, d-1, bs);
        this.step(x2, y2, l * 0.7, a + spr, d-1, bs);
    };

    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function start(e) {
        if (e.target.closest('.drawer') || e.target.id === 'min-btn') return;
        isDown = true;
        const p = getPos(e);
        entities.push(new Star(p.x, p.y));
        if (haptic && navigator.vibrate) navigator.vibrate(15);
    }

    function move(e) {
        if (!isDown) return;
        const p = getPos(e);
        if (entities.length > 0) {
            entities[entities.length-1].tx = p.x;
            entities[entities.length-1].ty = p.y;
        }
    }

    canvas.addEventListener('mousedown', start);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', function() { isDown = false; });
    canvas.addEventListener('touchstart', start, {passive:false});
    window.addEventListener('touchmove', move, {passive:false});
    window.addEventListener('touchend', function() { isDown = false; }, {passive:true});

    function animate() {
        hue += 0.2;
        const bCycle = (Math.sin(Date.now() / 1500) + 1) / 2;
        const bScale = 0.5 + (bCycle * 0.5);
        if (breathText) {
            breathText.innerText = bCycle > 0.8 ? "Hold" : (Math.cos(Date.now()/1500) > 0 ? "Inhale" : "Exhale");
        }
        
        ctx.fillStyle = 'rgba(1, 2, 4, 0.15)';
        ctx.fillRect(0, 0, w, h);
        
        for (let i = entities.length - 1; i >= 0; i--) {
            const p = entities[i];
            p.update();
            p.draw(bScale);
            if (p.life <= 0) entities.splice(i, 1);
        }
        
        if (haptic && bCycle > 0.98 && navigator.vibrate) navigator.vibrate(8);
        requestAnimationFrame(animate);
    }

    window.clearCanvas = function() {
        entities = [];
        ctx.fillStyle = "#010204";
        ctx.fillRect(0, 0, w, h);
    };

    window.toggleHaptic = function() {
        haptic = !haptic;
        const toggle = document.getElementById('haptic-toggle');
        if (toggle) toggle.innerText = haptic ? "HAPTIC: ON" : "HAPTIC: OFF";
    };

    window.toggleZen = toggleZen;

    animate();
})();
