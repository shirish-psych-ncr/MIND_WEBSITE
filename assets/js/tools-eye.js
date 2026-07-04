// Eye Movement Tool JavaScript

let moveInterval;
let currentDir = 'right';

function startTracking() {
  const speed = parseInt(document.getElementById('speed-selector').value);
  const orb = document.getElementById('orb');

  document.getElementById('setup-view').classList.add('hidden');
  document.getElementById('active-view').classList.remove('hidden');

  orb.style.transition = `left ${speed}ms ease-in-out`;

  setTimeout(() => {
    orb.style.left = 'calc(100% - ' + orb.offsetWidth + 'px)';
  }, 50);

  moveInterval = setInterval(() => {
    if (currentDir === 'right') {
      orb.style.left = '0%';
      currentDir = 'left';
    } else {
      orb.style.left = 'calc(100% - ' + orb.offsetWidth + 'px)';
      currentDir = 'right';
    }
  }, speed + 50);
}

function stopTracking() {
  clearInterval(moveInterval);

  document.getElementById('active-view').classList.add('hidden');
  document.getElementById('setup-view').classList.remove('hidden');

  const orb = document.getElementById('orb');
  orb.style.transition = 'none';
  orb.style.left = '0%';

  currentDir = 'right';
}

// Migrate inline onclick handlers to event listeners (Phase 8)
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('eye-start-btn');
  const stopBtn = document.getElementById('eye-stop-btn');
  
  if (startBtn) {
    startBtn.addEventListener('click', startTracking);
  }
  
  if (stopBtn) {
    stopBtn.addEventListener('click', stopTracking);
  }
});
