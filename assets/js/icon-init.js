/**
 * ============================================
 * ICON-INIT.JS - Lucide Icons Initialization
 * Mind Grace Neuropsychiatric Clinic
 * ============================================
 * Initializes Lucide icons across the site.
 * Handles re-initialization after dynamic content loads.
 * Optimized to prevent main-thread blocking and infinite loops.
 */
(() => {
	let retryCount = 0;
	const MAX_RETRIES = 50; // Prevent infinite loops if Lucide fails to load

	/**
	 * Initialize Lucide icons
	 * @param {Object} [options={}] - Lucide createIcons options
	 */
	function initIcons(options = {}) {
		// Check if Lucide is loaded
		if (typeof lucide === "undefined") {
			if (retryCount < MAX_RETRIES) {
				retryCount++;
				setTimeout(() => initIcons(options), 100);
			} else {
				console.error(
					"[IconInit] Lucide library failed to load after maximum retries.",
				);
			}
			return;
		}

		try {
			// Lucide's createIcons replaces <i data-lucide> with <svg>
			lucide.createIcons(options);
			console.log("[IconInit] ✓ Lucide icons initialized");
		} catch (error) {
			console.error("[IconInit] Error initializing Lucide icons:", error);
		}
	}

	/**
	 * Re-initialize icons after page transitions or dynamic content (HTMX, SPA)
	 */
	function refreshIcons() {
		if (typeof lucide !== "undefined") {
			try {
				lucide.createIcons();
			} catch (error) {
				console.error("[IconInit] Error refreshing icons:", error);
			}
		}
	}

	/**
	 * Defer initialization to prevent blocking the main thread (Lighthouse TBT fix)
	 */
	function deferInit() {
		if ("requestIdleCallback" in window) {
			requestIdleCallback(() => initIcons(), { timeout: 2000 });
		} else {
			setTimeout(() => initIcons(), 300);
		}
	}

	// Initialize on DOM ready
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", deferInit);
	} else {
		deferInit();
	}

	// Listen for custom events that may require icon refresh (SPA/HTMX transitions)
	document.addEventListener("icons:refresh", refreshIcons);
	document.addEventListener("swup:content-replaced", refreshIcons);
	document.addEventListener("navigo:after", refreshIcons);

	// HTMX specific events (since htmx.min.js is in the stack)
	document.addEventListener("htmx:afterSettle", refreshIcons);
	document.addEventListener("htmx:load", refreshIcons);

	// Export for external use
	window.IconInit = {
		init: initIcons,
		refresh: refreshIcons,
	};
})();
