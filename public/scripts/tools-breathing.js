// Guided Breathing Tool
document.addEventListener('DOMContentLoaded', function() {
  const breathingCircle = document.getElementById('breathing-circle');
  const startBtn = document.getElementById('start-breathing');
  const stopBtn = document.getElementById('stop-breathing');
  const breathText = document.getElementById('breath-text');
  
  let breathingInterval;
  let isBreathing = false;
  
  const breatheIn = () => {
    if (breathingCircle) breathingCircle.style.transform = 'scale(1.5)';
    if (breathText) breathText.textContent = 'Breathe In...';
  };
  
  const breatheOut = () => {
    if (breathingCircle) breathingCircle.style.transform = 'scale(1)';
    if (breathText) breathText.textContent = 'Breathe Out...';
  };
  
  const startBreathing = () => {
    if (isBreathing) return;
    isBreathing = true;
    
    breatheIn();
    breathingInterval = setInterval(() => {
      breatheOut();
      setTimeout(breatheIn, 4000);
    }, 8000);
    
    if (startBtn) startBtn.disabled = true;
    if (stopBtn) stopBtn.disabled = false;
  };
  
  const stopBreathing = () => {
    clearInterval(breathingInterval);
    isBreathing = false;
    
    if (breathingCircle) breathingCircle.style.transform = 'scale(1)';
    if (breathText) breathText.textContent = 'Ready to begin?';
    
    if (startBtn) startBtn.disabled = false;
    if (stopBtn) stopBtn.disabled = true;
  };
  
  if (startBtn) startBtn.addEventListener('click', startBreathing);
  if (stopBtn) stopBtn.addEventListener('click', stopBreathing);
});
