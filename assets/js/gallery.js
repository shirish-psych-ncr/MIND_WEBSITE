/**
 * Gallery Media Player Controller - 2026 Robust Implementation
 * Priority: Image display reliability above all else
 * 
 * Features:
 * - Fail-safe image loading with multiple fallbacks
 * - Hardware-accelerated transitions
 * - Touch gesture support with passive listeners
 * - Keyboard navigation with ARIA
 * - Category-based filtering
 * - Mobile-optimized navigation
 */

(function() {
  'use strict';

  var MediaPlayerGallery = (function() {
    function MediaPlayerGallery(data) {
      this.data = data || [];
      this.currentIndex = 0;
      this.isLoading = false;
      this.hasLoaded = false;
      this.lastCategory = null;
      this.errorCount = 0;
      this.maxErrors = 3;

      // DOM Elements with null checks
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
      this.handleCategoryClick = this.handleCategoryClick.bind(this);
      this.handleImageLoad = this.handleImageLoad.bind(this);
      this.handleImageError = this.handleImageError.bind(this);

      // Initialize
      this.init();
    }

    MediaPlayerGallery.prototype.init = function() {
      var self = this;

      // Fail-safe: show first image even if data is empty
      if (!this.data || this.data.length === 0) {
        console.warn('Gallery: No data available, showing default image');
        this.showError('No images available');
        return;
      }

      // Render thumbnails immediately
      this.renderFilmstrip();

      // Use requestAnimationFrame for smooth initialization
      requestAnimationFrame(function() {
        setTimeout(function() {
          self.showImage(0);
          self.attachEventListeners();
          self.setupCategoryButtons();
          self.setupTouchGestures();
          self.preloadAdjacent();
          self.refreshIcons();
        }, 50);
      });
    };

    MediaPlayerGallery.prototype.attachEventListeners = function() {
      var self = this;

      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', this.prev);
      }
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', this.next);
      }
      if (this.retryBtn) {
        this.retryBtn.addEventListener('click', this.handleRetry);
      }

      document.addEventListener('keydown', this.handleKeydown);

      // Image error handling with capture phase
      if (this.stageImage) {
        this.stageImage.addEventListener('load', this.handleImageLoad, true);
        this.stageImage.addEventListener('error', this.handleImageError, true);
      }
    };

    MediaPlayerGallery.prototype.refreshIcons = function() {
      var self = this;
      requestAnimationFrame(function() {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          try {
            window.lucide.createIcons();
          } catch (e) {
            // Silently fail - icons are decorative
          }
        }
      });
    };

    MediaPlayerGallery.prototype.setupCategoryButtons = function() {
      var self = this;
      var categoryButtons = document.querySelectorAll('.meta-btn[data-category]');

      for (var i = 0; i < categoryButtons.length; i++) {
        (function(btn) {
          btn.addEventListener('click', function(e) {
            e.preventDefault();
            var category = btn.getAttribute('data-category');
            var targetIndex = btn.getAttribute('data-target-index');
            
            // Use data-target-index if available, otherwise find by category
            if (targetIndex !== null) {
              var idx = parseInt(targetIndex, 10);
              if (!isNaN(idx) && idx >= 0 && idx < self.data.length) {
                self.showImage(idx);
                return;
              }
            }
            
            // Fallback: find first image with matching category
            self.handleCategoryClick(category);
          });
        })(categoryButtons[i]);
      }
    };

    MediaPlayerGallery.prototype.handleCategoryClick = function(category) {
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].category === category) {
          this.showImage(i);
          break;
        }
      }
    };

    MediaPlayerGallery.prototype.showLoader = function() {
      if (this.stageLoader) {
        this.stageLoader.hidden = false;
      }
      if (this.stageImage) {
        this.stageImage.style.opacity = '0.5';
      }
      if (this.stageError) {
        this.stageError.hidden = true;
      }
      this.isLoading = true;
    };

    MediaPlayerGallery.prototype.hideLoader = function() {
      if (this.stageLoader) {
        this.stageLoader.hidden = true;
      }
      if (this.stageImage) {
        this.stageImage.style.opacity = '1';
      }
      this.isLoading = false;
    };

    MediaPlayerGallery.prototype.showError = function(message) {
      message = message || 'Failed to load image';
      this.hideLoader();
      
      if (this.stageImage) {
        this.stageImage.hidden = true;
      }
      
      if (this.stageError) {
        var errorMsg = this.stageError.querySelector('p');
        if (errorMsg) {
          errorMsg.textContent = message;
        }
        this.stageError.hidden = false;
      }
    };

    MediaPlayerGallery.prototype.handleImageLoad = function() {
      this.hideLoader();
      this.hasLoaded = true;
      this.errorCount = 0;
    };

    MediaPlayerGallery.prototype.handleImageError = function() {
      this.errorCount++;
      console.warn('Gallery: Image load failed (' + this.errorCount + '/' + this.maxErrors + ')', this.data[this.currentIndex]?.src);

      // Auto-advance if too many errors
      if (this.errorCount >= this.maxErrors) {
        this.showError('Unable to load images. Please check your connection.');
        return;
      }

      // Try next image
      var self = this;
      if (this.currentIndex < this.data.length - 1) {
        setTimeout(function() { self.next(); }, 1000);
      } else if (this.currentIndex > 0) {
        setTimeout(function() { self.prev(); }, 1000);
      } else {
        this.showError('Failed to load image');
      }
    };

    MediaPlayerGallery.prototype.handleRetry = function() {
      var item = this.data[this.currentIndex];
      if (item) {
        this.showLoader();
        // Force reload with cache busting
        var baseSrc = item.src.split('?')[0];
        this.stageImage.src = baseSrc + '?t=' + Date.now();
      }
    };

    MediaPlayerGallery.prototype.renderFilmstrip = function() {
      if (!this.filmstrip) return;

      var self = this;
      var html = '';

      for (var i = 0; i < this.data.length; i++) {
        var item = this.data[i];
        var isActive = i === 0;
        var ariaCurrent = i === 0 ? 'true' : 'false';

        html += '<button class="filmstrip-thumb' + (isActive ? ' active' : '') + '" data-index="' + i + '" aria-label="View ' + (item.caption || 'Image ' + (i + 1)) + '" aria-current="' + ariaCurrent + '" type="button">';
        html += '<img src="' + item.src + '" alt="' + (item.alt || '') + '" loading="lazy" decoding="async" width="120" height="80">';
        html += '</button>';
      }

      this.filmstrip.innerHTML = html;

      // Add click handlers
      var thumbs = this.filmstrip.querySelectorAll('.filmstrip-thumb');
      for (var j = 0; j < thumbs.length; j++) {
        (function(index, thumb) {
          thumb.addEventListener('click', function(e) {
            e.preventDefault();
            self.showImage(index);
          });
        })(j, thumbs[j]);
      }

      this.refreshIcons();
    };

    MediaPlayerGallery.prototype.showImage = function(index) {
      if (this.isLoading || index < 0 || index >= this.data.length) return;

      this.currentIndex = index;
      var item = this.data[index];

      // Update section title when category changes
      this.updateSectionTitle(index);

      // Show loader
      this.showLoader();

      // Update active states in filmstrip
      var thumbs = this.filmstrip.querySelectorAll('.filmstrip-thumb');
      for (var i = 0; i < thumbs.length; i++) {
        var isActive = i === index;
        thumbs[i].classList.toggle('active', isActive);
        thumbs[i].setAttribute('aria-current', isActive ? 'true' : 'false');
      }

      // Smooth crossfade transition
      var self = this;
      this.stageImage.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      this.stageImage.style.opacity = '0';

      setTimeout(function() {
        // Set new image source
        self.stageImage.src = item.src;
        self.stageImage.alt = item.alt || '';
        
        if (self.stageCaption) {
          self.stageCaption.textContent = item.caption || '';
        }
        if (self.stageDesc) {
          self.stageDesc.textContent = item.description || '';
        }

        // Fade in
        requestAnimationFrame(function() {
          self.stageImage.style.opacity = '1';
        });

        // Update button states
        if (self.prevBtn) {
          self.prevBtn.disabled = index === 0;
        }
        if (self.nextBtn) {
          self.nextBtn.disabled = index === self.data.length - 1;
        }

        // Scroll thumbnail into view
        self.scrollToThumb(index);

        // Preload adjacent images
        self.preloadAdjacent();
      }, 400);
    };

    MediaPlayerGallery.prototype.scrollToThumb = function(index) {
      var thumb = this.filmstrip.querySelectorAll('.filmstrip-thumb')[index];
      if (thumb) {
        thumb.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest', 
          inline: 'center' 
        });
      }
    };

    MediaPlayerGallery.prototype.preloadAdjacent = function() {
      var indices = [];
      for (var i = 1; i <= 2; i++) {
        if (this.currentIndex - i >= 0) indices.push(this.currentIndex - i);
        if (this.currentIndex + i < this.data.length) indices.push(this.currentIndex + i);
      }

      for (var j = 0; j < indices.length; j++) {
        var img = new Image();
        img.src = this.data[indices[j]].src;
      }
    };

    MediaPlayerGallery.prototype.updateSectionTitle = function(index) {
      var item = this.data[index];
      if (!item || !item.sectionTitle) return;

      if (this.lastCategory !== item.category && this.sectionTitleText) {
        this.lastCategory = item.category;
        
        // Animate title change
        var self = this;
        this.sectionTitleCard.style.transition = 'opacity 0.3s ease';
        this.sectionTitleCard.style.opacity = '0';
        
        setTimeout(function() {
          self.sectionTitleText.textContent = item.sectionTitle;
          self.sectionTitleCard.style.opacity = '1';
        }, 300);
      }
    };

    MediaPlayerGallery.prototype.next = function() {
      if (this.currentIndex < this.data.length - 1) {
        this.showImage(this.currentIndex + 1);
      }
    };

    MediaPlayerGallery.prototype.prev = function() {
      if (this.currentIndex > 0) {
        this.showImage(this.currentIndex - 1);
      }
    };

    MediaPlayerGallery.prototype.handleKeydown = function(e) {
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
    };

    MediaPlayerGallery.prototype.setupTouchGestures = function() {
      var startX = 0;
      var endX = 0;
      var threshold = 50;
      var self = this;

      var stage = document.getElementById('media-stage');
      if (!stage) return;

      // Passive listeners for better scroll performance
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
    };

    return MediaPlayerGallery;
  })();

  // Initialize when DOM is ready
  function initGallery() {
    if (window.galleryData && window.galleryData.length > 0) {
      window.galleryPlayer = new MediaPlayerGallery(window.galleryData);
    } else {
      console.warn('Gallery: No data available');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    // Use requestAnimationFrame for non-blocking init
    requestAnimationFrame(initGallery);
  }
})();
