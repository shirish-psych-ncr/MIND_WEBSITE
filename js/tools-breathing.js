const app = {
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

  init() {
    document.querySelectorAll('.chip').forEach(c => {
      c.onclick = (e) => {
        document.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
        e.target.classList.add('active');
        this.dur = e.target.dataset.m;
      };
    });

    document.getElementById('start-btn').onclick = () => this.start();
    document.getElementById('stop-btn').onclick = () => this.finish();
    document.getElementById('reset-btn').onclick = () => this.reset();
  },

  start() {
    this.running = true;
    this.tech = document.getElementById('tech-sel').value;
    let seconds = this.dur * 60;

    document.getElementById('menu').classList.add('hidden');
    document.getElementById('session').classList.remove('hidden');

    this.timer = setInterval(() => {
      seconds--;
      let m = Math.floor(seconds/60), s = seconds%60;
      document.getElementById('timer').innerText = `${m}:${s < 10 ? '0'+s : s}`;
      if (seconds <= 0) this.finish();
    }, 1000);

    this.loop(0);
  },

  loop(i) {
    if (!this.running) return;
    const step = this.patterns[this.tech][i];

    const el = document.getElementById('circle');
    document.getElementById('label').innerText = step.p;

    el.style.transition = `all ${step.t}s linear`;
    el.style.transform = `scale(${step.s})`;
    el.style.background = step.c;

    this.breath = setTimeout(() => {
      this.loop((i + 1) % this.patterns[this.tech].length);
    }, step.t * 1000);
  },

  finish() {
    this.running = false;
    clearInterval(this.timer);
    clearTimeout(this.breath);

    document.getElementById('session').classList.add('hidden');
    document.getElementById('end').classList.remove('hidden');
  },

  reset() {
    document.getElementById('end').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
  }
};

app.init();
