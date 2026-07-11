/**
 * Horizon Scan Tool - Visual grounding tool for anxiety reduction
 * Uses gentle eye movement tracking across a simulated horizon
 */

(() => {
	// Wait for DOM to be ready
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}

	function init() {
		const setupView = document.getElementById("horizon-setup");
		const activeView = document.getElementById("horizon-active");
		const startBtn = document.getElementById("horizon-start-btn");
		const stopBtn = document.getElementById("horizon-stop-btn");
		const durationSelector = document.getElementById("duration-selector");
		const timerDisplay = document.getElementById("horizon-timer");

		if (!setupView || !activeView || !startBtn || !stopBtn) {
			return; // Not on horizon tool page
		}

		let animationId = null;
		let startTime = null;
		let duration = 60000; // default 1 minute
		let pos = 50;
		let direction = 1;
		let lastTime = 0;

		// Get elements for the active view
		const trackLine = activeView.querySelector(".track-line");
		const dot = document.getElementById("horizon-dot");

		if (!trackLine || !dot) {
			console.error("Horizon tool: required elements not found");
			return;
		}

		// Start button handler
		startBtn.addEventListener("click", () => {
			duration = parseInt(durationSelector.value, 10) * 1000;
			setupView.classList.add("hidden");
			activeView.classList.remove("hidden");
			startTime = performance.now();
			lastTime = startTime;
			pos = 50;
			direction = 1;
			animate(performance.now());
		});

		// Stop button handler
		stopBtn.addEventListener("click", () => {
			if (animationId) {
				cancelAnimationFrame(animationId);
				animationId = null;
			}
			activeView.classList.add("hidden");
			setupView.classList.remove("hidden");
			timerDisplay.textContent = "";
		});

		function animate(currentTime) {
			if (!startTime) return;

			const elapsed = currentTime - startTime;

			// Update timer display
			const remaining = Math.max(0, duration - elapsed);
			const minutes = Math.floor(remaining / 60000);
			const seconds = Math.floor((remaining % 60000) / 1000);
			timerDisplay.textContent =
				(minutes > 0 ? `${minutes}:` : "") + String(seconds).padStart(2, "0");

			// Check if session is complete
			if (elapsed >= duration) {
				stopBtn.click();
				return;
			}

			const dt = currentTime - lastTime || 16;
			lastTime = currentTime;

			// Speed based on elapsed time (gentle movement)
			const speed = 0.02;
			pos += speed * direction * (dt / 16);

			// Ping-pong at edges
			if (pos > 95) {
				pos = 95;
				direction = -1;
			} else if (pos < 5) {
				pos = 5;
				direction = 1;
			}

			// Add slight vertical drift for natural feel
			const driftY = Math.sin(currentTime * 0.001) * 10;

			dot.style.left = `${pos}%`;
			dot.style.top = `calc(50% + ${driftY}px)`;

			animationId = requestAnimationFrame(animate);
		}
	}
})();
