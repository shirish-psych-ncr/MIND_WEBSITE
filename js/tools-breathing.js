/**
 * Guided Breathing Tool - Anxiety Relief
 * Multiple breathing patterns for different needs
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
                {p:'Inhale',t:4,s:2.2,c:'#38bdf8'},
                {p:'Hold',t:4,s:2.2,c:'#4ade80'},
                {p:'Exhale',t:4,s:1,c:'#fb7185'},
                {p:'Hold',t:4,s:1,c:'#94a3b8'}
            ],
            relax: [
                {p:'Inhale',t:4,s:2.2,c:'#38bdf8'},
                {p:'Hold',t:7,s:2.2,c:'#4ade80'},
                {p:'Exhale',t:8,s:1,c:'#fb7185'}
            ],
            calm: [
                {p:'Inhale',t:7,s:2.2,c:'#38bdf8'},
                {p:'Exhale',t:11,s:1,c:'#fb7185'}
            ]
        },

        init: function() {
            var self = this;
            var chips = document.querySelectorAll('.chip');
            for (var i = 0; i < chips.length; i++) {
                (function(chip) {
                    chip.onclick = function(e) {
                        for (var j = 0; j < chips.length; j++) {
                            chips[j].classList.remove('active');
                        }
                        e.target.classList.add('active');
                        self.dur = parseInt(e.target.dataset.m);
                    };
                })(chips[i]);
            }

            var startBtn = document.getElementById('start-btn');
            if (startBtn) startBtn.onclick = function() { self.start(); };

            var stopBtn = document.getElementById('stop-btn');
            if (stopBtn) stopBtn.onclick = function() { self.finish(); };

            var resetBtn = document.getElementById('reset-btn');
            if (resetBtn) resetBtn.onclick = function() { self.reset(); };
        },

        start: function() {
            this.running = true;
            var techSel = document.getElementById('tech-sel');
            this.tech = techSel ? techSel.value : 'box';
            var seconds = this.dur * 60;

            var menu = document.getElementById('menu');
            if (menu) menu.classList.add('hidden');

            var session = document.getElementById('session');
            if (session) session.classList.remove('hidden');

            var self = this;
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

            var self = this;
            this.breath = setTimeout(function() {
                self.loop((i + 1) % self.patterns[self.tech].length);
            }, step.t * 1000);
        },

        finish: function() {
            this.running = false;
            clearInterval(this.timer);
            clearTimeout(this.breath);

            var session = document.getElementById('session');
            if (session) session.classList.add('hidden');

            var end = document.getElementById('end');
            if (end) end.classList.remove('hidden');
        },

        reset: function() {
            var end = document.getElementById('end');
            if (end) end.classList.add('hidden');

            var menu = document.getElementById('menu');
            if (menu) menu.classList.remove('hidden');
        }
    };

    app.init();
})();
