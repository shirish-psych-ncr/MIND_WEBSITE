document.addEventListener("DOMContentLoaded", () => {
  const formSection = document.getElementById("booking-form-section")
    || document.getElementById("bookingFormSection");
  const qualifications = document.getElementById("qualifications");
  const controls = [
    document.getElementById("continue-booking-btn"),
    document.getElementById("openBookingForm"),
    document.getElementById("heroStartBooking"),
    document.querySelector("#qualifications .btn-primary")
  ].filter(Boolean);
  const sticky = document.getElementById("mobileStickyCtaBtn")
    || document.querySelector(".mobile-sticky-cta");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const announce = (message) => {
    let region = document.getElementById("booking-live-region");
    if (!region) {
      region = document.createElement("div");
      region.id = "booking-live-region";
      region.setAttribute("role", "status");
      region.setAttribute("aria-live", "polite");
      region.className = "visually-hidden";
      document.body.appendChild(region);
    }
    region.textContent = message;
  };

  const revealBooking = (event) => {
    event?.preventDefault();
    if (!formSection) return;
    qualifications?.classList.add("hidden");
    formSection.classList.remove("hidden");
    formSection.removeAttribute("hidden");
    announce("Booking form is now visible. Please complete the form below.");
    formSection.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    requestAnimationFrame(() => formSection.querySelector("input, select, textarea")?.focus());
  };

  controls.forEach((control) => control.addEventListener("click", revealBooking));
  sticky?.addEventListener("click", (event) => {
    if (formSection?.classList.contains("hidden") || formSection?.hasAttribute("hidden")) {
      revealBooking(event);
    }
  });

  if (window.location.hash === "#booking-form-section") revealBooking();
});
