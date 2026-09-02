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
  const consent = document.getElementById("booking-consent");
  const consentError = document.getElementById("booking-consent-error");
  const gate = document.querySelector("[data-booking-gate]");
  const iframe = document.querySelector("[data-booking-iframe]");
  const formWrapper = iframe?.closest(".form-wrapper");

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

  const markFormLoaded = () => {
    formWrapper?.classList.add("is-loaded");
    formWrapper?.classList.remove("is-error");
    announce("Appointment form loaded. Share only the basic details needed for routine appointment coordination.");
  };

  const markFormError = () => {
    formWrapper?.classList.add("is-error");
    announce("The appointment form could not be loaded. Please call or email the clinic for routine booking help.");
  };

  iframe?.addEventListener("load", markFormLoaded);
  iframe?.addEventListener("error", markFormError);

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
  document.querySelector("[data-open-embedded-booking]")?.addEventListener("click", () => {
    if (!consent?.checked) {
      if (consentError) consentError.hidden = false;
      consent?.focus();
      announce("Please confirm the privacy and emergency-use notice before opening the form.");
      return;
    }
    if (consentError) consentError.hidden = true;
    if (gate) gate.hidden = true;
    if (iframe) iframe.hidden = false;
    formWrapper?.classList.remove("is-error");
    iframe?.focus();
    announce("Appointment form opened. Share only the basic details needed for routine appointment coordination.");
  });
  sticky?.addEventListener("click", (event) => {
    if (formSection?.classList.contains("hidden") || formSection?.hasAttribute("hidden")) {
      revealBooking(event);
    }
  });

  if (window.location.hash === "#booking-form-section") revealBooking();
});
