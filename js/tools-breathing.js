/**
 * Guided Breathing Tool
 * Clinically grounded breathing exercises for anxiety and calm
 */

(function() {
    'use strict';

    var app = {
        timer: null,
        breath: null,
        dur: 1,
        tech: 'box',
        running: false,

        patterns: {
            box: [
                {p:'Inhale', t:4, s:2.2, c:'#38bdf8'},
                {p:'Hold', t:4, s:2.2, c:'#4ade80'},
                {p:'Exhale', t:4, s:1, c:'#fb7185'},
                {p:'Hold', t:4, s:1, c:'#94a3b8'}
            ],
            relax: [
                {p:'Inhale', t:4, s:2.2, c:'#38bdf8'},
                {p:'Hold', t:7, s:2.2, c:'#4ade80'},
                {p:'Exhale', t:8, s:1, c:'#fb7185'}
            ],
            calm: [
                {p:'Inhale', t:7, s:2.2, c:'#38bdf8'},
                {p:'Exhale', t:11, s:1, c:'#fb7185'}
            ]
        },

        init: function() {
            var self = this;
            var chips = document.querySelectorAll('.chip');
            chips.forEach(function(c) {
                c.onclick = function(e) {
                    document.querySelectorAll('.chip').forEach(function(x) { 
                        x.classList.remove('active'); 
                    });
                    e.target.classList.add('active');
                    self.dur = parseInt(e.target.dataset.m);
                };
            });

            var startBtn = document.getElementById('start-btn');
            var stopBtn = document.getElementById('stop-btn');
            var resetBtn = document.getElementById('reset-btn');

            if (startBtn) startBtn.onclick = function() { self.start(); };
            if (stopBtn) stopBtn.onclick = function() { self.finish(); };
            if (resetBtn) resetBtn.onclick = function() { self.reset(); };
        },

        start: function() {
            var self = this;
            this.running = true;
            this.tech = document.getElementById('tech-sel').value;
            var seconds = this.dur * 60;

            document.getElementById('menu').classList.add('hidden');
            document.getElementById('session').classList.remove('hidden');

            this.timer = setInterval(function() {
                seconds--;
                var m = Math.floor(seconds/60), s = seconds%60;
                var timerEl = document.getElementById('timer');
                if (timerEl) {
                    timerEl.innerText = m + ':' + (s < 10 ? '0'+s : s);
                }
                if (seconds <= 0) self.finish();
            }, 1000);

            this.loop(0);
        },

        loop: function(i) {
            var self = this;
            if (!this.running) return;
            var step = this.patterns[this.tech][i];
            var el = document.getElementById('circle');
            var label = document.getElementById('label');
            
            if (label) label.innerText = step.p;
            if (el) {
                el.style.transition = 'all ' + step.t + 's linear';
                el.style.transform = 'scale(' + step.s + ')';
                el.style.background = step.c;
            }

            this.breath = setTimeout(function() {
                self.loop((i + 1) % self.patterns[self.tech].length);
            }, step.t * 1000);
        },

        finish: function() {
            this.running = false;
            clearInterval(this.timer);
            clearTimeout(this.breath);

            document.getElementById('session').classList.add('hidden');
            document.getElementById('end').classList.remove('hidden');
        },

        reset: function() {
            document.getElementById('end').classList.add('hidden');
            document.getElementById('menu').classList.remove('hidden');
        }
    };

    // Auto-init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            app.init();
        });
    } else {
        app.init();
    }

    // Expose for debugging
    window.breathingApp = app;
})();
