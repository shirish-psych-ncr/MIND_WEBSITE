/**
 * ============================================
 * UI-POPOVERS.JS - Floating UI Tooltips & Popovers
 * Mind Grace Neuropsychiatric Clinic
 * ============================================
 * Initializes Floating UI for tooltips, popovers, and dropdowns.
 * Optimized for performance (idle initialization) and memory safety.
 */
(() => {
	let retryCount = 0;
	const MAX_RETRIES = 50; // Prevent infinite loops if Floating UI fails to load
	let cleanupObserver = null;

	/**
	 * Get Floating UI library
	 * @returns {Object|null}
	 */
	function getFloatingUI() {
		if (typeof FloatingUIDOM !== "undefined" && FloatingUIDOM.computePosition) {
			return FloatingUIDOM;
		}
		if (typeof FloatingUI !== "undefined" && FloatingUI.computePosition) {
			return FloatingUI;
		}
		return null;
	}

	/**
	 * Setup a floating element (tooltip, popover, dropdown)
	 * @param {HTMLElement} trigger
	 * @param {HTMLElement} floatingEl
	 * @param {Object} options
	 */
	function setupFloating(trigger, floatingEl, options = {}) {
		const FloatingUI = getFloatingUI();
		if (!FloatingUI) return;

		const { computePosition, flip, shift, offset } = FloatingUI;
		const {
			placement = "top",
			middleware = [],
			showOn = "hover",
			offsetVal = 6,
		} = options;

		let isVisible = false;

		const show = () => {
			if (isVisible) return;
			isVisible = true;
			floatingEl.style.opacity = "1";
			floatingEl.style.visibility = "visible";

			computePosition(trigger, floatingEl, {
				placement,
				middleware: [
					offset(offsetVal),
					flip(),
					shift({ padding: 8 }),
					...middleware,
				],
			}).then(({ x, y }) => {
				Object.assign(floatingEl.style, { left: `${x}px`, top: `${y}px` });
			});
		};

		const hide = () => {
			if (!isVisible) return;
			isVisible = false;
			floatingEl.style.opacity = "0";
			floatingEl.style.visibility = "hidden";
		};

		// Event listeners based on interaction type
		if (showOn === "hover") {
			trigger.addEventListener("mouseenter", show);
			trigger.addEventListener("mouseleave", hide);
			trigger.addEventListener("focus", show);
			trigger.addEventListener("blur", hide);
		} else if (showOn === "click") {
			trigger.addEventListener("click", (e) => {
				e.stopPropagation();
				isVisible ? hide() : show();
			});
			// Close on outside click
			document.addEventListener("click", (e) => {
				if (
					isVisible &&
					!trigger.contains(e.target) &&
					!floatingEl.contains(e.target)
				) {
					hide();
				}
			});
		}

		// Escape key to close for accessibility
		const handleEscape = (e) => {
			if (e.key === "Escape" && isVisible) {
				hide();
				trigger.focus();
			}
		};
		document.addEventListener("keydown", handleEscape);

		// Store cleanup function for memory management
		trigger._floatingCleanup = () => {
			hide();
			floatingEl.remove();
			document.removeEventListener("keydown", handleEscape);
		};
	}

	/**
	 * Initialize Tooltips
	 */
	function initTooltips() {
		const triggers = document.querySelectorAll("[title], .has-tooltip");
		triggers.forEach((trigger) => {
			if (trigger._floatingCleanup) return;

			const text =
				trigger.getAttribute("title") || trigger.getAttribute("data-tooltip");
			if (!text) return;

			const tooltip = document.createElement("div");
			tooltip.className = "ui-tooltip";
			tooltip.setAttribute("role", "tooltip");
			tooltip.innerHTML = `<span class="ui-tooltip__content">${text}</span>`;

			Object.assign(tooltip.style, {
				position: "fixed",
				zIndex: "9999",
				padding: "8px 12px",
				backgroundColor: "#1f2937",
				color: "#fff",
				borderRadius: "6px",
				fontSize: "14px",
				fontWeight: "500",
				boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
				pointerEvents: "none",
				opacity: "0",
				visibility: "hidden",
				transition: "opacity 0.2s ease, visibility 0.2s ease",
				maxWidth: "250px",
			});

			document.body.appendChild(tooltip);
			trigger.removeAttribute("title");
			trigger.setAttribute("data-tooltip", text);

			setupFloating(trigger, tooltip, {
				placement: "top",
				offsetVal: 6,
				showOn: "hover",
			});
		});
	}

	/**
	 * Initialize Medical Popovers
	 */
	function initMedicalPopovers() {
		const terms = document.querySelectorAll(".medical-term");
		terms.forEach((term) => {
			if (term._floatingCleanup) return;

			const definition = term.getAttribute("data-definition");
			if (!definition) return;

			const popover = document.createElement("div");
			popover.className = "medical-popover";
			popover.setAttribute("role", "tooltip");
			popover.innerHTML = `<span class="medical-popover__content">${definition}</span>`;

			Object.assign(popover.style, {
				position: "fixed",
				zIndex: "9998",
				padding: "12px 16px",
				backgroundColor: "#f0f9ff",
				color: "#0c4a6e",
				border: "1px solid #bae6fd",
				borderRadius: "8px",
				fontSize: "14px",
				lineHeight: "1.5",
				boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
				pointerEvents: "none",
				opacity: "0",
				visibility: "hidden",
				transition: "opacity 0.2s ease, visibility 0.2s ease",
				maxWidth: "300px",
			});

			document.body.appendChild(popover);
			setupFloating(term, popover, {
				placement: "top",
				offsetVal: 8,
				showOn: "hover",
			});
		});
	}

	/**
	 * Initialize Dropdowns
	 */
	function initDropdowns() {
		const dropdowns = document.querySelectorAll(".has-dropdown");
		dropdowns.forEach((dropdown) => {
			if (dropdown._floatingCleanup) return;

			const menu = dropdown.querySelector(".dropdown-menu");
			if (!menu) return;

			Object.assign(menu.style, {
				position: "fixed",
				zIndex: "9999",
				minWidth: "200px",
				backgroundColor: "#fff",
				borderRadius: "8px",
				boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
				opacity: "0",
				visibility: "hidden",
				transition: "opacity 0.2s ease, visibility 0.2s ease",
			});

			setupFloating(dropdown, menu, {
				placement: "bottom-start",
				offsetVal: 4,
				showOn: "click",
			});
		});
	}

	/**
	 * Cleanup floating elements when their triggers are removed from DOM (Prevents Memory Leaks)
	 */
	function setupMutationObserver() {
		if (cleanupObserver) return;

		cleanupObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.removedNodes.forEach((node) => {
					if (node.nodeType === 1 && node._floatingCleanup) {
						node._floatingCleanup();
					}
					// Check children as well
					if (node.nodeType === 1 && node.querySelectorAll) {
						node.querySelectorAll("*").forEach((el) => {
							if (el._floatingCleanup) el._floatingCleanup();
						});
					}
				});
			});
		});

		cleanupObserver.observe(document.body, { childList: true, subtree: true });
	}

	/**
	 * Main initialization with retry limit
	 */
	function initAll() {
		const FloatingUI = getFloatingUI();
		if (!FloatingUI) {
			if (retryCount < MAX_RETRIES) {
				retryCount++;
				setTimeout(initAll, 100);
			} else {
				console.error(
					"[UI-Popovers] Floating UI library failed to load after maximum retries.",
				);
			}
			return;
		}

		initTooltips();
		initMedicalPopovers();
		initDropdowns();
		setupMutationObserver();
		console.log("[UI-Popovers] ✓ Floating UI components initialized");
	}

	/**
	 * Defer initialization to prevent blocking the main thread (Lighthouse TBT fix)
	 */
	function deferInit() {
		if ("requestIdleCallback" in window) {
			requestIdleCallback(initAll, { timeout: 2000 });
		} else {
			setTimeout(initAll, 300);
		}
	}

	// Initialize on DOM ready
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", deferInit);
	} else {
		deferInit();
	}

	// Expose for re-initialization after page transitions (HTMX, SPA)
	window._reinitPopovers = () => {
		initAll();
	};
})();
