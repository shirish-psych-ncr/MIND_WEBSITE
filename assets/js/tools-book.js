/**
 * Book Appointment Page - Form Loading Logic
 * Optimized for performance and accessibility.
 */
document.addEventListener("DOMContentLoaded", () => {
	const openButton = document.getElementById("openBookingForm");
	const formSection = document.getElementById("bookingFormSection");

	if (!openButton || !formSection) return;

	openButton.addEventListener("click", () => {
		// 1. Update accessibility state
		openButton.setAttribute("aria-expanded", "true");

		// 2. Reveal the form using native attributes (or use a CSS class)
		formSection.removeAttribute("hidden");
		// formSection.classList.add('is-visible'); // Alternative: use if you have CSS animations

		// 3. Wait for the browser to render the display change, then scroll
		requestAnimationFrame(() => {
			formSection.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});

			// 4. Accessibility: Shift focus to the first input field
			const firstInput = formSection.querySelector("input, select, textarea");
			if (firstInput) {
				// Prevent the browser from abruptly jumping to the focused element,
				// allowing our smooth scroll to play out
				firstInput.focus({ preventScroll: true });
			}
		});
	});
});
