// Butterfly Tapper Tool
document.addEventListener('DOMContentLoaded', function() {
  const leftHand = document.getElementById('left-hand');
  const rightHand = document.getElementById('right-hand');
  const startBtn = document.getElementById('start-tapping');
  const stopBtn = document.getElementById('stop-tapping');
  const speedSlider = document.getElementById('tapping-speed');
  const statusText = document.getElementById('tapping-status');
  
  let tappingInterval;
  let isTapping = false;
  let currentSide = 'left';
  
  const tapLeft = () => {
    if (leftHand) {
      leftHand.style.opacity = '1';
      leftHand.style.transform = 'scale(1.1)';
    }
    if (rightHand) {
      rightHand.style.opacity = '0.3';
      rightHand.style.transform = 'scale(1)';
    }
    if (statusText) statusText.textContent = 'Tap with left hand';
  };
  
  const tapRight = () => {
    if (rightHand) {
      rightHand.style.opacity = '1';
      rightHand.style.transform = 'scale(1.1)';
    }
    if (leftHand) {
      leftHand.style.opacity = '0.3';
      leftHand.style.transform = 'scale(1)';
    }
    if (statusText) statusText.textContent = 'Tap with right hand';
  };
  
  const startTapping = () => {
    if (isTapping) return;
    isTapping = true;
    
    const speed = speedSlider ? parseInt(speedSlider.value) : 1000;
    
    tapLeft();
    tappingInterval = setInterval(() => {
      currentSide = currentSide === 'left' ? 'right' : 'left';
      if (currentSide === 'left') {
        tapLeft();
      } else {
        tapRight();
      }
    }, speed);
    
    if (startBtn) startBtn.disabled = true;
    if (stopBtn) stopBtn.disabled = false;
    if (speedSlider) speedSlider.disabled = true;
  };
  
  const stopTapping = () => {
    clearInterval(tappingInterval);
    isTapping = false;
    
    if (leftHand) {
      leftHand.style.opacity = '0.5';
      leftHand.style.transform = 'scale(1)';
    }
    if (rightHand) {
      rightHand.style.opacity = '0.5';
      rightHand.style.transform = 'scale(1)';
    }
    if (statusText) statusText.textContent = 'Ready to begin?';
    
    if (startBtn) startBtn.disabled = false;
    if (stopBtn) stopBtn.disabled = true;
    if (speedSlider) speedSlider.disabled = false;
  };
  
  if (startBtn) startBtn.addEventListener('click', startTapping);
  if (stopBtn) stopBtn.addEventListener('click', stopTapping);
  if (speedSlider) speedSlider.addEventListener('change', () => {
    if (isTapping) {
      stopTapping();
      startTapping();
    }
  });
});
