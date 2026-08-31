(() => {
  "use strict";

  const items = Array.isArray(window.galleryData) && window.galleryData.length
    ? window.galleryData
    : [{
      id: "fallback-exterior",
      src: "/assets/images/Location_street_view_distance.webp",
      alt: "Street view of Mind Grace Neuropsychiatric Clinic and AASHA Child Development Centre",
      caption: "Clinic Exterior",
      description: "Exterior view showing clinic building, entrance, parking, and signage.",
      category: "exterior",
      sectionTitle: "Welcome to Our Clinic"
    }];
  const image = document.getElementById("stage-image");
  const backdrop = document.getElementById("stage-backdrop");
  const caption = document.getElementById("stage-caption");
  const description = document.getElementById("stage-description");
  const loader = document.getElementById("stage-loader");
  const error = document.getElementById("stage-error");
  const filmstrip = document.getElementById("filmstrip");
  const sectionTitle = document.querySelector(".section-title-text");
  const previous = document.getElementById("prev-btn");
  const next = document.getElementById("next-btn");
  const retry = document.getElementById("retry-btn");
  const stage = document.getElementById("media-stage");
  let index = 0;
  let pointerStartX = null;

  if (!image || !filmstrip || !items.length) {
    if (loader) loader.hidden = true;
    if (error) error.hidden = false;
    return;
  }

  const safeBackground = (src) => {
    const escaped = String(src || "").replaceAll("\\", "\\\\").replaceAll('"', '\\"');
    return escaped ? `url("${escaped}")` : "none";
  };

  const setLoading = (loading) => {
    if (loader) loader.hidden = !loading;
    image.classList.toggle("is-ready", !loading);
    image.classList.toggle("is-loading", loading);
  };

  const showError = () => {
    setLoading(false);
    image.classList.add("is-error");
    if (backdrop) backdrop.style.setProperty("--stage-image", "none");
    if (error) error.hidden = false;
  };

  const updateSelection = () => {
    [...filmstrip.children].forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const activeThumb = filmstrip.children[index];
    if (activeThumb) {
      // Keep the document anchored while bringing the selected thumbnail into
      // view. Element.scrollIntoView() can scroll the whole page vertically,
      // moving the arrow controls during a rapid next/previous sequence.
      const centeredLeft = activeThumb.offsetLeft - (filmstrip.clientWidth - activeThumb.offsetWidth) / 2;
      filmstrip.scrollTo({ left: Math.max(0, centeredLeft), behavior: "smooth" });
    }
    if (previous) previous.disabled = items.length < 2;
    if (next) next.disabled = items.length < 2;
  };

  const render = (nextIndex, { focus = false } = {}) => {
    index = (Number(nextIndex) + items.length) % items.length;
    const item = items[index];
    setLoading(true);
    image.classList.remove("is-error");
    if (error) error.hidden = true;
    if (backdrop) backdrop.style.setProperty("--stage-image", safeBackground(item.src));
    image.onload = () => setLoading(false);
    image.onerror = showError;
    image.alt = item.alt || item.caption || "Mind Grace Clinic photograph";
    image.src = item.src;
    if (caption) caption.textContent = item.caption || "Clinic photograph";
    if (description) description.textContent = item.description || "A photograph from Mind Grace Clinic.";
    if (sectionTitle) sectionTitle.textContent = item.sectionTitle || "Welcome to Our Clinic";
    updateSelection();
    if (focus) filmstrip.children[index]?.focus();
  };

  items.forEach((item, itemIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-thumb";
    button.setAttribute("aria-label", `View ${item.caption || `image ${itemIndex + 1}`}`);
    button.setAttribute("aria-pressed", "false");
    const miniBackdrop = document.createElement("span");
    miniBackdrop.className = "thumb-backdrop";
    miniBackdrop.setAttribute("aria-hidden", "true");
    miniBackdrop.style.setProperty("--thumb-image", safeBackground(item.src));
    const thumb = document.createElement("img");
    thumb.src = item.src;
    thumb.alt = "";
    // The filmstrip is the visitor's primary navigation. Eager thumbnails are
    // intentional here: lazy loading makes the carousel look empty on first
    // visit and is especially unreliable after a keyboard jump or swipe.
    thumb.loading = "eager";
    thumb.decoding = "async";
    thumb.addEventListener("error", () => {
      button.classList.add("is-error");
      miniBackdrop.style.setProperty("--thumb-image", "none");
      thumb.alt = "Image unavailable";
      thumb.removeAttribute("src");
    }, { once: true });
    button.append(miniBackdrop, thumb);
    button.addEventListener("click", () => render(itemIndex, { focus: true }));
    filmstrip.append(button);
  });

  previous?.addEventListener("click", () => render(index - 1));
  next?.addEventListener("click", () => render(index + 1));
  retry?.addEventListener("click", () => render(index));
  stage?.addEventListener("pointerdown", (event) => { pointerStartX = event.clientX; });
  stage?.addEventListener("pointerup", (event) => {
    if (pointerStartX === null) return;
    const delta = event.clientX - pointerStartX;
    pointerStartX = null;
    if (Math.abs(delta) > 45) render(index + (delta < 0 ? 1 : -1));
  });
  document.addEventListener("keydown", (event) => {
    if (event.target.matches("input, textarea, select, button, a")) return;
    if (event.key === "ArrowLeft") render(index - 1);
    if (event.key === "ArrowRight") render(index + 1);
    if (event.key === "Home") render(0);
    if (event.key === "End") render(items.length - 1);
  });
  document.querySelectorAll(".meta-btn[data-target-index]").forEach((button) => {
    button.addEventListener("click", () => render(Number(button.dataset.targetIndex) || 0));
  });

  window.galleryPlayer = {
    render,
    next: () => render(index + 1),
    prev: () => render(index - 1),
    getIndex: () => index,
    getItems: () => items.slice()
  };
  document.dispatchEvent(new Event("icons:refresh"));
  render(0);
})();
