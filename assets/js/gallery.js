/**
 * Mind Grace Neuropsychiatric Clinic — Gallery Controller
 * ========================================================
 * Zero-dependency, progressively enhanced, clinically safe.
 *
 * Features:
 *  • View Transitions API lightbox with graceful fallback
 *  • Keyboard-navigable focus trap (WCAG 2.2)
 *  • IntersectionObserver sidebar sync
 *  • Touch/swipe support for mobile lightbox
 *  • Image preloading & lazy-load hydration
 *  • prefers-reduced-motion respected at every layer
 *  • Debounced resize, cleanup on unload
 */

(() => {
  "use strict";

  /* ──────────────────────────────────────────────
     0. FEATURE DETECTION & UTILITIES
     ────────────────────────────────────────────── */

  const supportsViewTransitions = "startViewTransition" in document;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  function debounce(fn, ms = 100) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(null, args), ms);
    };
  }

  /** Run a DOM mutation inside a View Transition when available */
  function transition(fn) {
    if (supportsViewTransitions && !prefersReducedMotion.matches) {
      return document.startViewTransition(fn);
    }
    fn();
    return null;
  }

  /** Announce to screen readers via a live region */
  function announce(message) {
    let region = document.getElementById("gallery-live-region");
    if (!region) {
      region = document.createElement("div");
      region.id = "gallery-live-region";
      region.setAttribute("role", "status");
      region.setAttribute("aria-live", "polite");
      region.setAttribute("aria-atomic", "true");
      Object.assign(region.style, {
        position: "absolute",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
      });
      document.body.appendChild(region);
    }
    region.textContent = "";
    // Force re-announcement by clearing then setting
    requestAnimationFrame(() => {
      region.textContent = message;
    });
  }

  /* ──────────────────────────────────────────────
     1. IMAGE LAZY-LOAD HYDRATION
     ────────────────────────────────────────────── */

  function initLazyImages() {
    const images = document.querySelectorAll('.image-card img[loading="lazy"]');
    if (!("loading" in HTMLImageElement.prototype)) {
      // Fallback for very old browsers
      const io = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
              }
              observer.unobserve(img);
            }
          });
        },
        { rootMargin: "200px" },
      );
      images.forEach((img) => io.observe(img));
    }
  }

  /* ──────────────────────────────────────────────
     2. LIGHTBOX / FOCUS MODE CONTROLLER
     ────────────────────────────────────────────── */

  class GalleryLightbox {
    constructor() {
      this.cards = Array.from(document.querySelectorAll(".image-card"));
      this.backdrop = document.getElementById("gallery-backdrop");
      this.currentIndex = -1;
      this.isOpen = false;
      this.previousFocus = null;
      this.touchStartX = 0;
      this.touchStartY = 0;
      this.swipeThreshold = 50;

      if (!this.cards.length || !this.backdrop) return;

      this._bindEvents();
      this._injectControls();
    }

    /* — Inject previous / next / close / counter controls into backdrop — */
    _injectControls() {
      // Close button
      this.closeBtn = this._createButton(
        "gallery-close-btn",
        "Close image viewer",
        `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      `,
      );

      // Prev button
      this.prevBtn = this._createButton(
        "gallery-prev-btn",
        "Previous image",
        `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      `,
      );

      // Next button
      this.nextBtn = this._createButton(
        "gallery-next-btn",
        "Next image",
        `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      `,
      );

      // Counter
      this.counter = document.createElement("div");
      this.counter.className = "gallery-counter";
      this.counter.setAttribute("aria-hidden", "true");

      // Caption overlay
      this.captionOverlay = document.createElement("div");
      this.captionOverlay.className = "gallery-caption-overlay";

      // Append all to body
      const controls = [
        this.closeBtn,
        this.prevBtn,
        this.nextBtn,
        this.counter,
        this.captionOverlay,
      ];
      controls.forEach((el) => {
        el.style.display = "none";
        document.body.appendChild(el);
      });
    }

    _createButton(className, ariaLabel, innerHTML) {
      const btn = document.createElement("button");
      btn.className = className;
      btn.setAttribute("aria-label", ariaLabel);
      btn.setAttribute("type", "button");
      btn.innerHTML = innerHTML;
      return btn;
    }

    /* — Event Binding — */
    _bindEvents() {
      // Card clicks
      this.cards.forEach((card, index) => {
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute(
          "aria-label",
          card.querySelector("figcaption")?.textContent ||
            `Gallery image ${index + 1}`,
        );

        card.addEventListener("click", () => this.open(index));
        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.open(index);
          }
        });
      });

      // Backdrop click to close
      if (this.backdrop) {
        this.backdrop.addEventListener("click", () => this.close());
      }

      // Control buttons
      if (this.closeBtn) {
        this.closeBtn.addEventListener("click", () => this.close());
      }
      if (this.prevBtn) {
        this.prevBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.prev();
        });
      }
      if (this.nextBtn) {
        this.nextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.next();
        });
      }

      // Global keyboard
      this._onKeydown = this._handleKeydown.bind(this);
      document.addEventListener("keydown", this._onKeydown);

      // Touch / swipe support
      if (this.backdrop) {
        this.backdrop.addEventListener(
          "touchstart",
          this._onTouchStart.bind(this),
          { passive: true },
        );
        this.backdrop.addEventListener(
          "touchend",
          this._onTouchEnd.bind(this),
          { passive: true },
        );
      }

      // Click on focused card to close
      this.cards.forEach((card) => {
        card.addEventListener("click", () => {
          if (card.classList.contains("is-focused")) this.close();
        });
      });
    }

    /* — Open — */
    open(index) {
      if (this.isOpen) return;
      this.isOpen = true;
      this.currentIndex = index;
      this.previousFocus = document.activeElement;

      transition(() => {
        this.cards.forEach((c) => c.classList.remove("is-focused"));
        this.cards[index].classList.add("is-focused");
        this.backdrop.classList.add("is-active");
        this._showControls(true);
        this._updateDisplay();
        this._preloadAdjacent();
      });

      document.body.style.overflow = "hidden";

      // Move focus into lightbox for accessibility
      requestAnimationFrame(() => this.closeBtn.focus());

      const caption =
        this.cards[index].querySelector("figcaption")?.textContent || "";
      announce(
        `Image viewer opened. ${caption}. Image ${index + 1} of ${this.cards.length}.`,
      );
    }

    /* — Close — */
    close() {
      if (!this.isOpen) return;
      this.isOpen = false;

      transition(() => {
        this.cards.forEach((c) => c.classList.remove("is-focused"));
        this.backdrop.classList.remove("is-active");
        this._showControls(false);
      });

      document.body.style.overflow = "";

      // Restore focus
      if (this.previousFocus) {
        requestAnimationFrame(() => this.previousFocus.focus());
      }

      announce("Image viewer closed.");
    }

    /* — Navigate — */
    prev() {
      if (!this.isOpen) return;
      const newIndex =
        (this.currentIndex - 1 + this.cards.length) % this.cards.length;
      this._goTo(newIndex);
    }

    next() {
      if (!this.isOpen) return;
      const newIndex = (this.currentIndex + 1) % this.cards.length;
      this._goTo(newIndex);
    }

    _goTo(index) {
      this.currentIndex = index;

      transition(() => {
        this.cards.forEach((c) => c.classList.remove("is-focused"));
        this.cards[index].classList.add("is-focused");
        this._updateDisplay();
        this._preloadAdjacent();
      });

      const caption =
        this.cards[index].querySelector("figcaption")?.textContent || "";
      announce(`${caption}. Image ${index + 1} of ${this.cards.length}.`);
    }

    /* — Display Updates — */
    _updateDisplay() {
      const total = this.cards.length;
      const current = this.currentIndex + 1;
      this.counter.textContent = `${current} / ${total}`;

      const caption =
        this.cards[this.currentIndex].querySelector("figcaption")
          ?.textContent || "";
      this.captionOverlay.textContent = caption;
    }

    _showControls(show) {
      const display = show ? "" : "none";
      this.closeBtn.style.display = display;
      this.prevBtn.style.display = display;
      this.nextBtn.style.display = display;
      this.counter.style.display = show ? "block" : "none";
      this.captionOverlay.style.display = show ? "block" : "none";
    }

    /* — Preload adjacent images — */
    _preloadAdjacent() {
      const indices = [
        (this.currentIndex - 1 + this.cards.length) % this.cards.length,
        (this.currentIndex + 1) % this.cards.length,
      ];
      indices.forEach((i) => {
        const img = this.cards[i]?.querySelector("img");
        if (img && !img.complete) {
          const preload = new Image();
          preload.src = img.src;
        }
      });
    }

    /* — Keyboard Handler — */
    _handleKeydown(e) {
      if (!this.isOpen) return;

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          this.close();
          break;
        case "ArrowLeft":
          e.preventDefault();
          this.prev();
          break;
        case "ArrowRight":
          e.preventDefault();
          this.next();
          break;
        case "Tab":
          // Focus trap within lightbox controls
          this._trapFocus(e);
          break;
      }
    }

    _trapFocus(e) {
      const focusable = [this.closeBtn, this.prevBtn, this.nextBtn];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    /* — Touch / Swipe — */
    _onTouchStart(e) {
      if (!this.isOpen) return;
      this.touchStartX = e.changedTouches[0].clientX;
      this.touchStartY = e.changedTouches[0].clientY;
    }

    _onTouchEnd(e) {
      if (!this.isOpen) return;
      const dx = e.changedTouches[0].clientX - this.touchStartX;
      const dy = e.changedTouches[0].clientY - this.touchStartY;

      // Only trigger horizontal swipes (ignore vertical scroll intent)
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > this.swipeThreshold) {
        if (dx > 0) this.prev();
        else this.next();
      }
    }

    /* — Cleanup — */
    destroy() {
      document.removeEventListener("keydown", this._onKeydown);
      this._showControls(false);
    }
  }

  /* ──────────────────────────────────────────────
     3. SIDEBAR WAYFINDING CONTROLLER
     ────────────────────────────────────────────── */

  class GalleryWayfinder {
    constructor() {
      this.zones = Array.from(document.querySelectorAll(".tour-zone"));
      this.dots = Array.from(document.querySelectorAll(".tour-dot"));

      if (!this.zones.length || !this.dots.length) return;

      this.observer = null;
      this._init();
    }

    _init() {
      // IntersectionObserver for scroll tracking
      this.observer = new IntersectionObserver(this._onIntersect.bind(this), {
        root: null,
        rootMargin: "-15% 0px -75% 0px",
        threshold: 0,
      });

      this.zones.forEach((zone) => this.observer.observe(zone));

      // Smooth-scroll click handlers
      this.dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = dot.getAttribute("href");
          if (!targetId) return;

          const target = document.querySelector(targetId);
          if (!target) return;

          target.scrollIntoView({
            behavior: prefersReducedMotion.matches ? "auto" : "smooth",
            block: "start",
          });

          // Update URL hash without jumping
          history.replaceState(null, "", targetId);

          announce(`Navigated to ${dot.textContent} section.`);
        });
      });

      // Handle initial hash on page load
      this._handleInitialHash();
    }

    _onIntersect(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const zoneId = entry.target.id;

          this.dots.forEach((dot) => dot.classList.remove("active"));

          const activeDot = this.dots.find(
            (dot) => dot.getAttribute("href") === `#${zoneId}`,
          );

          if (activeDot) {
            activeDot.classList.add("active");

            // On mobile, scroll horizontal nav to keep active dot visible
            if (window.innerWidth <= 1024) {
              activeDot.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
            }
          }
        }
      });
    }

    _handleInitialHash() {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          requestAnimationFrame(() => {
            target.scrollIntoView({ behavior: "auto", block: "start" });
          });
        }
      }
    }

    destroy() {
      if (this.observer) this.observer.disconnect();
    }
  }

  /* ──────────────────────────────────────────────
     4. SCROLL PROGRESS BAR
     ────────────────────────────────────────────── */

  function initProgressBar() {
    const bar = document.querySelector("[data-progress]");
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${Math.min(progress, 100)}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ──────────────────────────────────────────────
     5. IMAGE LOAD STAGGER (Graceful Appearance)
     ────────────────────────────────────────────── */

  function initImageLoadStagger() {
    const images = document.querySelectorAll(".image-card img");

    images.forEach((img) => {
      const card = img.closest(".image-card");
      if (!card) return;

      // Add loading skeleton state
      card.classList.add("is-loading");

      const onLoad = () => {
        card.classList.remove("is-loading");
        card.classList.add("is-loaded");
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onError);
      };

      const onError = () => {
        card.classList.remove("is-loading");
        card.classList.add("is-error");
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onError);
      };

      if (img.complete && img.naturalWidth > 0) {
        onLoad();
      } else {
        img.addEventListener("load", onLoad);
        img.addEventListener("error", onError);
      }
    });
  }

  /* ──────────────────────────────────────────────
     6. MOBILE NAV CONTROLLER (if not in main.js)
     ────────────────────────────────────────────── */

  function initMobileNav() {
    const trigger = document.querySelector(".mobile-nav-trigger");
    const panel = document.getElementById("mobile-nav-panel");
    const overlay = document.getElementById("mobile-nav-overlay");
    const closeBtn = document.querySelector(".close-mobile-menu");

    if (!trigger || !panel) return;

    function openNav() {
      panel.removeAttribute("inert");
      trigger.setAttribute("aria-expanded", "true");
      panel.classList.add("is-open");
      if (overlay) overlay.classList.add("is-active");
      document.body.style.overflow = "hidden";
      closeBtn?.focus();
    }

    function closeNav() {
      panel.setAttribute("inert", "");
      trigger.setAttribute("aria-expanded", "false");
      panel.classList.remove("is-open");
      if (overlay) overlay.classList.remove("is-active");
      document.body.style.overflow = "";
      trigger.focus();
    }

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      isOpen ? closeNav() : openNav();
    });

    closeBtn?.addEventListener("click", closeNav);
    overlay?.addEventListener("click", closeNav);

    // Close on link click inside mobile nav
    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("is-open")) {
        closeNav();
      }
    });
  }

  /* ──────────────────────────────────────────────
     7. RESIZE HANDLER (Debounced)
     ────────────────────────────────────────────── */

  function initResizeHandler(lightbox) {
    const handleResize = debounce(() => {
      // If lightbox is open and viewport changes significantly,
      // recalculate positioning (CSS handles most of it, but
      // we ensure controls stay visible)
      if (lightbox?.isOpen) {
        lightbox._updateDisplay();
      }
    }, 150);

    window.addEventListener("resize", handleResize, { passive: true });
  }

  /* ──────────────────────────────────────────────
     8. YEAR FOOTER SCRIPT
     ────────────────────────────────────────────── */

  function initYearUpdate() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ──────────────────────────────────────────────
     9. BOOTSTRAP — DOMContentLoaded
     ────────────────────────────────────────────── */

  let lightboxInstance = null;
  let wayfinderInstance = null;

  document.addEventListener("DOMContentLoaded", () => {
    initYearUpdate();
    initLazyImages();
    initImageLoadStagger();
    initProgressBar();
    initMobileNav();

    lightboxInstance = new GalleryLightbox();
    wayfinderInstance = new GalleryWayfinder();
    initResizeHandler(lightboxInstance);
  });

  // Cleanup on page unload to prevent memory leaks
  window.addEventListener("beforeunload", () => {
    lightboxInstance?.destroy();
    wayfinderInstance?.destroy();
  });
})();
