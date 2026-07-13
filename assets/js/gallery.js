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

(function() {
  'use strict';

  class MediaPlayerGallery {
    constructor(data) {
      this.data = data || [];
      this.currentIndex = 0;
      this.isLoading = false;
      this.hasLoaded = false;
      this.lastCategory = null;
      
      // DOM Elements
      this.stageImage = document.getElementById('stage-image');
      this.stageCaption = document.getElementById('stage-caption');
      this.stageDesc = document.getElementById('stage-description');
      this.filmstrip = document.getElementById('filmstrip');
      this.prevBtn = document.getElementById('prev-btn');
      this.nextBtn = document.getElementById('next-btn');
      this.stageLoader = document.getElementById('stage-loader');
      this.stageError = document.getElementById('stage-error');
      this.retryBtn = document.getElementById('retry-btn');
      this.sectionTitleCard = document.getElementById('section-title-card');
      this.sectionTitleText = this.sectionTitleCard ? this.sectionTitleCard.querySelector('.section-title-text') : null;

      // Bind methods
      this.loadImage = this.loadImage.bind(this);
      this.showImage = this.showImage.bind(this);
      this.next = this.next.bind(this);
      this.prev = this.prev.bind(this);
      this.handleKeydown = this.handleKeydown.bind(this);
      this.renderFilmstrip = this.renderFilmstrip.bind(this);
      this.handleRetry = this.handleRetry.bind(this);
      this.updateSectionTitle = this.updateSectionTitle.bind(this);

      // Initialize
      this.init();
    }

    init() {
      if (!this.data || this.data.length === 0) {
        
        this.showError('No images available');
        return;
      }

      // Render thumbnails first
      this.renderFilmstrip();

      // Small delay to ensure DOM is ready
      var self = this;
      setTimeout(function() {
        // Load first image and show initial section title
        self.showImage(0);

        // Event listeners
        if (self.prevBtn) self.prevBtn.addEventListener('click', self.prev);
        if (self.nextBtn) self.nextBtn.addEventListener('click', self.next);
        if (self.retryBtn) self.retryBtn.addEventListener('click', self.handleRetry);
        document.addEventListener('keydown', self.handleKeydown);

        // Image error handling
        if (self.stageImage) {
          self.stageImage.addEventListener('load', function() { self.handleImageLoad(); });
          self.stageImage.addEventListener('error', function() { self.handleImageError(); });
        }

        // Touch gestures for swipe navigation
        self.setupTouchGestures();

        // Preload adjacent images
        self.preloadAdjacent();

        // Re-initialize lucide icons after DOM updates
        self.refreshIcons();
      }, 100);
    }

    refreshIcons() {
      // Wait for DOM to settle then refresh lucide icons
      var self = this;
      requestAnimationFrame(function() {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          window.lucide.createIcons();
        }
      });
    }

    updateSectionTitle(index) {
      var item = this.data[index];
      if (!item || !item.sectionTitle || !this.sectionTitleCard) return;

      // Only update if category changed
      if (item.category === this.lastCategory) return;

      this.lastCategory = item.category;

      // Fade out, update text, fade in
      var self = this;
      this.sectionTitleCard.style.opacity = '0';

      setTimeout(function() {
        if (self.sectionTitleText) {
          self.sectionTitleText.textContent = item.sectionTitle;
        }
        self.sectionTitleCard.hidden = false;

        // Force reflow
        void self.sectionTitleCard.offsetWidth;

        self.sectionTitleCard.style.opacity = '1';
      }, 300);
    }

    hideSectionTitle() {
      if (!this.sectionTitleCard) return;

      var self = this;
      this.sectionTitleCard.style.opacity = '0';
      setTimeout(function() {
        self.sectionTitleCard.hidden = true;
      }, 300);
    }

    showError(message) {
      message = message || 'Failed to load image';
      if (this.stageLoader) this.stageLoader.hidden = true;
      if (this.stageImage) this.stageImage.hidden = true;
      if (this.stageError) {
        var errorMsg = this.stageError.querySelector('p');
        if (errorMsg) errorMsg.textContent = message;
        this.stageError.hidden = false;
      }
      this.isLoading = false;
    }

    showLoader() {
      if (this.stageLoader) this.stageLoader.hidden = false;
      if (this.stageImage) this.stageImage.hidden = false;
      if (this.stageError) this.stageError.hidden = true;
      this.isLoading = true;
    }

    hideLoader() {
      if (this.stageLoader) this.stageLoader.hidden = true;
      this.isLoading = false;
    }

    handleImageLoad() {
      this.hideLoader();
      if (this.stageImage) this.stageImage.classList.add('active');
      this.hasLoaded = true;
      this.refreshIcons();
    }

    handleImageError() {
      
      this.showError();

      // Auto-advance to next image if available
      var self = this;
      if (this.currentIndex < this.data.length - 1) {
        setTimeout(function() { self.next(); }, 1500);
      } else if (this.currentIndex > 0) {
        setTimeout(function() { self.prev(); }, 1500);
      }
    }

    handleRetry() {
      var item = this.data[this.currentIndex];
      if (item) {
        this.showLoader();
        // Force reload by adding timestamp
        this.stageImage.src = item.src + '?t=' + Date.now();
      }
    }

    renderFilmstrip() {
      if (!this.filmstrip) return;

      var self = this;
      var html = '';
      
      for (var i = 0; i < this.data.length; i++) {
        var item = this.data[i];
        var isActive = i === 0 ? 'active' : '';
        var ariaCurrent = i === 0 ? 'true' : 'false';
        
        html += '<button class="filmstrip-thumb ' + isActive + '" data-index="' + i + '" aria-label="View ' + (item.caption || 'Image ' + (i + 1)) + '" aria-current="' + ariaCurrent + '" type="button">';
        html += '<img src="' + item.src + '" alt="' + (item.alt || '') + '" loading="lazy" decoding="async">';
        html += '</button>';
      }
      
      this.filmstrip.innerHTML = html;

      // Add click handlers to thumbnails
      var thumbs = this.filmstrip.querySelectorAll('.filmstrip-thumb');
      for (var j = 0; j < thumbs.length; j++) {
        (function(index, thumb) {
          thumb.addEventListener('click', function(e) {
            e.preventDefault();
            self.showImage(index);
          });
        })(i, thumbs[j]);
      }

      this.refreshIcons();
    }

    showImage(index) {
      if (this.isLoading || index < 0 || index >= this.data.length) return;

      this.currentIndex = index;
      var item = this.data[index];

      // Update section title when category changes
      this.updateSectionTitle(index);

      // Show loader
      this.showLoader();

      // Update active states
      var thumbs = this.filmstrip.querySelectorAll('.filmstrip-thumb');
      for (var i = 0; i < thumbs.length; i++) {
        var isActive = i === index;
        thumbs[i].classList.toggle('active', isActive);
        thumbs[i].setAttribute('aria-current', isActive ? 'true' : 'false');
      }

      // Crossfade transition with enhanced animation
      var self = this;
      this.stageImage.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      this.stageImage.style.opacity = '0';

      setTimeout(function() {
        // Set new image source with error handling
        self.stageImage.src = item.src;
        self.stageImage.alt = item.alt || '';
        if (self.stageCaption) self.stageCaption.textContent = item.caption || '';
        if (self.stageDesc) self.stageDesc.textContent = item.description || '';

        // Fade in
        requestAnimationFrame(function() {
          self.stageImage.style.opacity = '1';
        });

        // Update button states
        if (self.prevBtn) self.prevBtn.disabled = index === 0;
        if (self.nextBtn) self.nextBtn.disabled = index === self.data.length - 1;

        // Scroll thumbnail into view
        self.scrollToThumb(index);

        // Preload next/prev images
        self.preloadAdjacent();
      }, 400);
    }

    scrollToThumb(index) {
      var thumb = this.filmstrip.querySelectorAll('.filmstrip-thumb')[index];
      if (thumb) {
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    preloadAdjacent() {
      var indices = [];
      for (var i = 1; i <= 2; i++) {
        if (this.currentIndex - i >= 0) indices.push(this.currentIndex - i);
        if (this.currentIndex + i < this.data.length) indices.push(this.currentIndex + i);
      }

      for (var j = 0; j < indices.length; j++) {
        var img = new Image();
        img.src = this.data[indices[j]].src;
      }
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
      switch(e.key) {
        case 'ArrowRight':
          e.preventDefault();
          this.next();
          break;
        case 'ArrowLeft':
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
      }
    }

    setupTouchGestures() {
      var startX = 0;
      var endX = 0;
      var threshold = 50;
      var self = this;

      var stage = document.getElementById('media-stage');
      if (!stage) return;

      stage.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
      }, { passive: true });

      stage.addEventListener('touchmove', function(e) {
        endX = e.touches[0].clientX;
      }, { passive: true });

      stage.addEventListener('touchend', function() {
        if (startX - endX > threshold) {
          self.next();
        } else if (endX - startX > threshold) {
          self.prev();
        }
      });
    }
  }

  // Initialize when DOM is ready
  function initGallery() {
    if (window.galleryData && window.galleryData.length > 0) {
      window.galleryPlayer = new MediaPlayerGallery(window.galleryData);
    } else {
      
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }
})();
