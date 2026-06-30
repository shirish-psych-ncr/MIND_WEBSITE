// Leaf on Stream Tool
document.addEventListener('DOMContentLoaded', function() {
  const stream = document.getElementById('stream');
  const leaf = document.getElementById('leaf');
  const addLeafBtn = document.getElementById('add-leaf');
  const clearLeavesBtn = document.getElementById('clear-leaves');
  
  const createLeaf = () => {
    if (!stream) return;
    
    const newLeaf = document.createElement('div');
    newLeaf.className = 'leaf';
    newLeaf.textContent = '🍃';
    newLeaf.style.position = 'absolute';
    newLeaf.style.left = Math.random() * 80 + '%';
    newLeaf.style.top = '-50px';
    newLeaf.style.fontSize = '2rem';
    newLeaf.style.cursor = 'pointer';
    newLeaf.style.userSelect = 'none';
    
    // Animate leaf floating down
    const duration = 5000 + Math.random() * 5000;
    const endX = parseFloat(newLeaf.style.left) + (Math.random() * 40 - 20);
    
    const animation = newLeaf.animate([
      { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
      { transform: `translateY(${stream.offsetHeight}px) translateX(${endX - parseFloat(newLeaf.style.left)}%) rotate(360deg)`, opacity: 0.7 }
    ], {
      duration: duration,
      easing: 'ease-in-out'
    });
    
    animation.onfinish = () => {
      newLeaf.remove();
    };
    
    // Click to remove leaf
    newLeaf.addEventListener('click', () => {
      newLeaf.style.transition = 'opacity 0.3s';
      newLeaf.style.opacity = '0';
      setTimeout(() => newLeaf.remove(), 300);
    });
    
    stream.appendChild(newLeaf);
  };
  
  if (addLeafBtn) addLeafBtn.addEventListener('click', createLeaf);
  
  if (clearLeavesBtn) clearLeavesBtn.addEventListener('click', () => {
    const leaves = document.querySelectorAll('.leaf');
    leaves.forEach(leaf => {
      leaf.style.transition = 'opacity 0.3s';
      leaf.style.opacity = '0';
      setTimeout(() => leaf.remove(), 300);
    });
  });
  
  // Add initial leaf
  if (stream) {
    setTimeout(createLeaf, 500);
  }
});
