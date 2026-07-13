/**
 * Gallery Media Player Controller
 * 2026 Architecture - Media Player Interface
 * 
 * Features:
 * - Virtualized thumbnail filmstrip
 * - Hardware-accelerated transitions
 * - Touch gesture support
 * - Keyboard navigation
 * - Lazy loading with preloading strategy
 * - Accessibility (ARIA, focus management)
 */

export class MediaPlayerGallery {
  constructor(data, options = {}) {
    this.data = data;
    this.currentIndex = 0;
    this.isLoading = false;
    this.options = {
      preloadCount: 2,
      transitionDuration: 400,
      swipeThreshold: 50,
      ...options
    };
    
    // DOM Elements
    this.elements = {
      stageImage: document.getElementById('stage-image'),
      stageCaption: document.getElementById('stage-caption'),
      stageDesc: document.getElementById('stage-description'),
      filmstrip: document.getElementById('filmstrip'),
      prevBtn: document.getElementById('prev-btn'),
      nextBtn: document.getElementById('next-btn')
    };
    
    // Bind methods
    this.showImage = this.showImage.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    
    // Initialize
    this.init();
  }
  
  init() {
    if (!this.elements.stageImage || !this.elements.filmstrip) {
      console.warn('Gallery player: Required elements not found');
      return;
    }
    
    this.renderFilmstrip();
    this.showImage(0);
    this.addEventListeners();
    this.setupTouchGestures();
    this.preloadAdjacent();
  }
  
  renderFilmstrip() {
    const fragment = document.createDocumentFragment();
    
    this.data.forEach((item, index) => {
      const thumb = document.createElement('button');
      thumb.className = `filmstrip-thumb ${index === 0 ? 'active' : ''}`;
      thumb.dataset.index = index;
      thumb.setAttribute('role', 'listitem');
      thumb.setAttribute('aria-label', `View ${item.caption}`);
      thumb.setAttribute('aria-current', index === 0 ? 'true' : 'false');
      
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt;
      img.loading = 'lazy';
      img.decoding = 'async';
      
      thumb.appendChild(img);
      fragment.appendChild(thumb);
    });
    
    this.elements.filmstrip.innerHTML = '';
    this.elements.filmstrip.appendChild(fragment);
    
    // Add click handlers
    this.elements.filmstrip.querySelectorAll('.filmstrip-thumb').forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index);
        this.showImage(index);
      });
    });
  }
  
  showImage(index) {
    if (this.isLoading || index < 0 || index >= this.data.length) return;
    
    this.currentIndex = index;
    const item = this.data[index];
    
    // Update thumbnail states
    this.updateThumbnailStates(index);
    
    // Crossfade transition
    this.elements.stageImage.classList.remove('active');
    
    // Force reflow for transition restart
    void this.elements.stageImage.offsetWidth;
    
    // Update image source and metadata
    this.elements.stageImage.src = item.src;
    this.elements.stageImage.alt = item.alt;
    this.elements.stageCaption.textContent = item.caption;
    this.elements.stageDesc.textContent = item.description;
    
    // Handle load completion
    const handleLoad = () => {
      this.elements.stageImage.classList.add('active');
      this.elements.stageImage.removeEventListener('load', handleLoad);
      this.elements.stageImage.removeEventListener('error', handleError);
    };
    
    const handleError = () => {
      console.error(`Failed to load image: ${item.src}`);
      this.elements.stageImage.removeEventListener('load', handleLoad);
      this.elements.stageImage.removeEventListener('error', handleError);
    };
    
    this.elements.stageImage.addEventListener('load', handleLoad);
    this.elements.stageImage.addEventListener('error', handleError);
    
    // Update button states
    this.updateButtonStates(index);
    
    // Scroll thumbnail into view
    this.scrollToThumb(index);
    
    // Preload adjacent images
    this.preloadAdjacent();
  }
  
  updateThumbnailStates(activeIndex) {
    this.elements.filmstrip.querySelectorAll('.filmstrip-thumb').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === activeIndex);
      thumb.setAttribute('aria-current', i === activeIndex ? 'true' : 'false');
    });
  }
  
  updateButtonStates(index) {
    this.elements.prevBtn.disabled = index === 0;
    this.elements.nextBtn.disabled = index === this.data.length - 1;
  }
  
  scrollToThumb(index) {
    const thumb = this.elements.filmstrip.querySelectorAll('.filmstrip-thumb')[index];
    if (thumb) {
      thumb.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest', 
        inline: 'center' 
      });
    }
  }
  
  preloadAdjacent() {
    const indices = [];
    const count = this.options.preloadCount;
    
    for (let i = 1; i <= count; i++) {
      if (this.currentIndex - i >= 0) indices.push(this.currentIndex - i);
      if (this.currentIndex + i < this.data.length) indices.push(this.currentIndex + i);
    }
    
    indices.forEach(i => {
      const img = new Image();
      img.src = this.data[i].src;
    });
  }
  
  next() {
    if (this.currentIndex < this.data.length - 1) {
      this.showImage(this.currentIndex + 1);
    }
  }
  
  prev() {
    if (this.currentIndex > 0) {
      this.showImage(this.currentIndex - 1);
    }
  }
  
  handleKeydown(e) {
    // Only handle if gallery is visible
    if (!this.elements.filmstrip.offsetParent) return;
    
    switch(e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        this.next();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        this.prev();
        break;
      case 'Home':
        e.preventDefault();
        this.showImage(0);
        break;
      case 'End':
        e.preventDefault();
        this.showImage(this.data.length - 1);
        break;
      case ' ':
      case 'Enter':
        // Optional: Could trigger fullscreen or lightbox
        e.preventDefault();
        break;
    }
  }
  
  addEventListeners() {
    this.elements.prevBtn.addEventListener('click', this.prev);
    this.elements.nextBtn.addEventListener('click', this.next);
    document.addEventListener('keydown', this.handleKeydown);
  }
  
  setupTouchGestures() {
    let startX = 0;
    let endX = 0;
    const threshold = this.options.swipeThreshold;
    
    const stage = this.elements.stageImage.parentElement;
    if (!stage) return;
    
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };
    
    const handleTouchMove = (e) => {
      endX = e.touches[0].clientX;
    };
    
    const handleTouchEnd = () => {
      if (startX - endX > threshold) {
        this.next();
      } else if (endX - startX > threshold) {
        this.prev();
      }
    };
    
    stage.addEventListener('touchstart', handleTouchStart, { passive: true });
    stage.addEventListener('touchmove', handleTouchMove, { passive: true });
    stage.addEventListener('touchend', handleTouchEnd);
  }
  
  // Public API
  goTo(index) {
    this.showImage(index);
  }
  
  getCurrentIndex() {
    return this.currentIndex;
  }
  
  getTotalImages() {
    return this.data.length;
  }
  
  destroy() {
    document.removeEventListener('keydown', this.handleKeydown);
    // Clear any pending operations
    this.isLoading = false;
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGallery);
} else {
  initGallery();
}

function initGallery() {
  // Check if gallery elements exist on page
  const stageImage = document.getElementById('stage-image');
  const filmstrip = document.getElementById('filmstrip');
  
  if (!stageImage || !filmstrip) {
    return; // Not a gallery page
  }
  
  // Gallery data would be passed from HTML or fetched
  // For now, expect it to be available as window.galleryData
  if (window.galleryData && Array.isArray(window.galleryData)) {
    window.galleryPlayer = new MediaPlayerGallery(window.galleryData);
  }
}
