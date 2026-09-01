(() => {
  let started = false;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const escapeHtml = (value = "") => String(value).replace(/[&<>\"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[character]));
  const normalize = (value) => new URL(value, window.location.origin).href;
  const label = (value) => value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  const shuffle = (items) => [...items].sort(() => Math.random() - .5);

  async function readMeta(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Article unavailable: ${url}`);
    const html = await response.text();
    const documentCopy = new DOMParser().parseFromString(html, "text/html");
    const meta = (name) => documentCopy.querySelector(`meta[name="${name}"]`)?.content?.trim() || "";
    return { href: url, title: meta("blog-title") || documentCopy.title, description: meta("blog-description"), date: meta("blog-date"), readtime: meta("blog-readtime"), tags: meta("blog-tags").split(",").map((tag) => tag.trim().toLowerCase()).filter(Boolean) };
  }

  function renderCards(target, posts, emptyMessage) {
    if (!target) return;
    target.innerHTML = posts.length ? posts.map((post) => {
      const tags = post.tags.filter((tag) => !["adult", "child", "children", "beginner", "most-searched"].includes(tag)).slice(0, 4);
      return `<article class="article-card"><div class="article-meta"><span>${escapeHtml(post.date || "Practical guide")}</span><span>${escapeHtml(post.readtime || "Read at your pace")}</span></div><h3>${escapeHtml(post.title)}</h3><p>${escapeHtml(post.description || "A clear, practical guide from Mind Grace Clinic.")}</p><div class="tag-row">${tags.map((tag) => `<span class="tag">${escapeHtml(label(tag))}</span>`).join("")}</div><a class="button button-primary" href="${escapeHtml(post.href)}">Read this guide</a></article>`;
    }).join("") : `<div class="empty-state">${escapeHtml(emptyMessage)}</div>`;
  }

  async function init() {
    if (started) return;
    const config = window.BLOG_DISCOVERY_CONFIG;
    if (!config) return;
    if (config.error) throw new Error(config.message || "Blog configuration unavailable");
    started = true;
    const articleResults = await Promise.allSettled((config.posts || []).map((url) => readMeta(normalize(url))));
    const posts = articleResults.filter((result) => result.status === "fulfilled").map((result) => result.value);
    if (!posts.length) throw new Error("No blog articles could be loaded");
    const pinned = new Set((config.pinned || []).map(normalize));
    const mostSearched = new Set((config.mostSearched || []).map(normalize));
    const beginner = posts.filter((post) => post.tags.includes("beginner"));
    let mode = "all";
    let selectedTag = "";
    let searchQuery = "";
    const feed = $("[data-feed-grid]");
    const status = $("[data-active-state]");
    const searchInput = $("[data-blog-search]");
    const searchStatus = $("[data-search-state]");
    const clearSearch = $("[data-clear-search]");
    const hashAliases = { speech: "speech-delay", communication: "speech-delay", redflags: "red-flags" };
    const hashTag = decodeURIComponent(window.location.hash.replace(/^#/, "")).toLowerCase();
    const initialTag = hashAliases[hashTag] || hashTag;
    if (initialTag && posts.some((post) => post.tags.includes(initialTag))) {
      mode = "tag";
      selectedTag = initialTag;
      document.getElementById("guide-library")?.scrollIntoView({ block: "start" });
    }
    const draw = () => {
      const pool = searchQuery ? posts.filter((post) => `${post.title} ${post.description} ${post.tags.join(" ")}`.toLowerCase().includes(searchQuery)) : posts;
      const pinnedPosts = pool.filter((post) => pinned.has(post.href));
      const beginnerPosts = pool.filter((post) => post.tags.includes("beginner"));
      let visible = pool;
      if (mode === "beginner") visible = beginnerPosts;
      if (mode === "read2") visible = pool.filter((post) => /2\s*min/i.test(post.readtime));
      if (mode === "most") visible = pool.filter((post) => mostSearched.has(post.href));
      if (mode === "tag") visible = pool.filter((post) => post.tags.includes(selectedTag));
      if (mode === "all") visible = [...pinnedPosts, ...shuffle(pool.filter((post) => !pinned.has(post.href)))];
      renderCards(feed, visible, "No guides match that filter yet.");
      renderCards($("[data-pinned-grid]"), pinnedPosts, "Pinned guides will appear here.");
      renderCards($("[data-beginner-grid]"), (beginnerPosts.length ? beginnerPosts : pool).slice(0, 3), "Beginner-friendly guides will appear here.");
      renderCards($("[data-loop-grid]"), shuffle(pool).slice(0, 3), "More guides are on the way.");
      const filterDescription = mode === "tag" ? `Showing guides tagged ${label(selectedTag)}` : mode === "all" ? "Showing all guides, with trusted starting points first" : `Showing ${mode === "beginner" ? "beginner-friendly" : mode === "read2" ? "quick 2-minute" : "most searched"} guides`;
      if (status) status.textContent = searchQuery ? `${pool.length} result${pool.length === 1 ? "" : "s"} for “${searchQuery}”` : filterDescription;
      if (searchStatus) searchStatus.textContent = searchQuery ? `${pool.length} matching guide${pool.length === 1 ? "" : "s"}. Clear the search to browse the full library.` : "Search by a concern, topic, or phrase.";
      if (clearSearch) clearSearch.hidden = !searchQuery;
      $$('[data-discovery-controls] [data-mode]').forEach((button) => button.classList.toggle("active", button.dataset.mode === mode));
      $$('[data-symptom-grid] [data-value], [data-cluster-grid] [data-tags]').forEach((button) => { const matches = button.dataset.value === selectedTag || button.dataset.tags?.split(",").includes(selectedTag); button.classList.toggle("active", mode === "tag" && matches); });
    };
    const symptoms = $("[data-symptom-grid]");
    if (symptoms) symptoms.innerHTML = (config.symptoms || []).map((value) => `<button type="button" class="filter-chip" data-value="${escapeHtml(value)}">${escapeHtml(label(value))}</button>`).join("");
    const clusters = $("[data-cluster-grid]");
    if (clusters) clusters.innerHTML = (config.clusters || []).map((cluster) => `<button type="button" class="filter-chip" data-tags="${escapeHtml((cluster.tags || []).join(","))}">${escapeHtml(cluster.label)}</button>`).join("");
    const controls = $("[data-discovery-controls]");
    if (controls) controls.innerHTML = `<button type="button" class="filter-chip active" data-mode="all">All guides</button><button type="button" class="filter-chip" data-mode="beginner">Not sure where to start?</button><button type="button" class="filter-chip" data-mode="read2">2-minute reads</button><button type="button" class="filter-chip" data-mode="most">Most searched</button>`;
    $$('[data-discovery-controls] [data-mode]').forEach((button) => button.addEventListener("click", () => { mode = button.dataset.mode; selectedTag = ""; draw(); }));
    $$('[data-symptom-grid] [data-value]').forEach((button) => button.addEventListener("click", () => { mode = "tag"; selectedTag = button.dataset.value; draw(); }));
    $$('[data-cluster-grid] [data-tags]').forEach((button) => button.addEventListener("click", () => { const tag = button.dataset.tags.split(",").find((candidate) => posts.some((post) => post.tags.includes(candidate))); if (tag) { mode = "tag"; selectedTag = tag; draw(); } }));
    $$('[data-filter-tag]').forEach((button) => button.addEventListener("click", () => {
      const tag = button.dataset.filterTag?.trim().toLowerCase();
      if (!tag || !posts.some((post) => post.tags.includes(tag))) return;
      mode = "tag";
      selectedTag = tag;
      draw();
      document.getElementById("guide-library")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }));
    if (searchInput) searchInput.addEventListener("input", () => { searchQuery = searchInput.value.trim().toLowerCase(); mode = "all"; selectedTag = ""; draw(); });
    if (clearSearch) clearSearch.addEventListener("click", () => { if (searchInput) searchInput.value = ""; searchQuery = ""; mode = "all"; selectedTag = ""; draw(); searchInput?.focus(); });
    const total = $("[data-total-posts]"); if (total) total.textContent = String(posts.length);
    const tagTotal = $("[data-total-tags]"); if (tagTotal) tagTotal.textContent = String(new Set(posts.flatMap((post) => post.tags)).size);
    draw();
  }

  const start = () => init().catch((error) => { const status = $("[data-active-state]"); if (status) status.textContent = "The guides are temporarily unavailable. Please try again or contact the clinic."; console.error(error); });
  document.addEventListener("DOMContentLoaded", start, { once: true });
  window.addEventListener("blogConfigLoaded", start);
})();
