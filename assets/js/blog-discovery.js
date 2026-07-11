function normalizeUrl(url) {
  return new URL(url, window.location.href).href;
}

async function getMeta(url) {
  const normalizedUrl = normalizeUrl(url);
  const res = await fetch(normalizedUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${normalizedUrl}`);
  }

  const text = await res.text();
  const doc = new DOMParser().parseFromString(text, "text/html");
  const getContent = (name) =>
    doc.querySelector(`meta[name="${name}"]`)?.content?.trim() || "";

  return {
    href: normalizedUrl,
    title: getContent("blog-title") || doc.title || "Untitled article",
    desc: getContent("blog-description"),
    date: getContent("blog-date"),
    readtime: getContent("blog-readtime"),
    tags: getContent("blog-tags")
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean),
  };
}

async function discoverPostsFromDirectory(sourceDir) {
  const directoryUrl = new URL(
    sourceDir.endsWith("/") ? sourceDir : `${sourceDir}/`,
    window.location.href,
  );
  const res = await fetch(directoryUrl.href);
  if (!res.ok) {
    throw new Error(
      `Failed to open directory listing for ${directoryUrl.href}`,
    );
  }

  const text = await res.text();
  const doc = new DOMParser().parseFromString(text, "text/html");
  const links = [...doc.querySelectorAll("a[href]")]
    .map((node) => node.getAttribute("href"))
    .filter(Boolean)
    .filter((href) => href.endsWith(".html"))
    .filter((href) => !href.startsWith("?"))
    .filter((href) => !href.startsWith("#"))
    .filter((href) => !href.toLowerCase().includes("index.html"))
    .map((href) => new URL(href, directoryUrl.href).href)
    .filter((href) => href.startsWith(directoryUrl.href))
    .sort((a, b) => a.localeCompare(b));

  return [...new Set(links)];
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function takeRandom(items, count) {
  return shuffle(items).slice(0, count);
}

function hasAnyTag(post, tags) {
  return tags.some((tag) => post.tags.includes(tag));
}

function formatLabel(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function renderCards(target, posts, emptyCopy) {
  if (!target) return;
  if (!posts.length) {
    target.innerHTML = `<div class="empty-state">${emptyCopy}</div>`;
    return;
  }

  target.innerHTML = posts
    .map((post) => {
      const tagMarkup = post.tags
        .filter(
          (tag) =>
            ![
              "adult",
              "child",
              "children",
              "beginner",
              "most-searched",
            ].includes(tag),
        )
        .slice(0, 4)
        .map((tag) => `<span class="tag">${formatLabel(tag)}</span>`)
        .join("");

      return `
        <article class="article-card">
          <div class="article-meta">
            <span>${post.date || "Date placeholder"}</span>
            <span>${post.readtime || "Read time placeholder"}</span>
          </div>
          <div>
            <h3>${post.title}</h3>
            <p style="margin-top:10px;">${post.desc || "Description placeholder."}</p>
          </div>
          <div class="tag-row">${tagMarkup}</div>
          <div class="cta-row">
            <a class="button" href="${post.href}">Read article</a>
          </div>
        </article>
      `;
    })
    .join("");
}

async function initBlogDiscovery() {
  const config = window.BLOG_DISCOVERY_CONFIG;
  if (!config) return;

  const symptomGrid = document.querySelector("[data-symptom-grid]");
  const clusterGrid = document.querySelector("[data-cluster-grid]");
  const feedGrid = document.querySelector("[data-feed-grid]");
  const pinnedGrid = document.querySelector("[data-pinned-grid]");
  const beginnerGrid = document.querySelector("[data-beginner-grid]");
  const loopGrid = document.querySelector("[data-loop-grid]");
  const controlBar = document.querySelector("[data-discovery-controls]");
  const stateLabel = document.querySelector("[data-active-state]");

  let activeMode = "all";
  let activeTag = "";

  let postUrls = [];
  if (config.sourceDir) {
    try {
      postUrls = await discoverPostsFromDirectory(config.sourceDir);
    } catch (_error) {
      postUrls = [];
    }
  }
  if (!postUrls.length) {
    postUrls = (config.posts || []).map((url) => normalizeUrl(url));
  }

  const posts = await Promise.all(postUrls.map((url) => getMeta(url)));
  const pinnedSet = new Set(
    (config.pinned || []).map((url) => normalizeUrl(url)),
  );
  const mostSearchedSet = new Set(
    (config.mostSearched || []).map((url) => normalizeUrl(url)),
  );
  const beginnerPosts = posts.filter((post) => post.tags.includes("beginner"));
  const pinnedPosts = posts.filter((post) => pinnedSet.has(post.href));

  function getFeedPosts() {
    if (activeMode === "tag" && activeTag) {
      const matching = posts.filter((post) => post.tags.includes(activeTag));
      const pinnedMatching = matching.filter((post) =>
        pinnedSet.has(post.href),
      );
      const rest = shuffle(
        matching.filter((post) => !pinnedSet.has(post.href)),
      );
      return [...pinnedMatching, ...rest];
    }

    if (activeMode === "read2") {
      return posts.filter((post) =>
        post.readtime.toLowerCase().includes("2 min"),
      );
    }

    if (activeMode === "most") {
      return posts.filter((post) => mostSearchedSet.has(post.href));
    }

    if (activeMode === "beginner") {
      return takeRandom(beginnerPosts, 3);
    }

    const rest = shuffle(posts.filter((post) => !pinnedSet.has(post.href)));
    return [...pinnedPosts, ...rest];
  }

  function updateStateLabel() {
    if (!stateLabel) return;
    if (activeMode === "tag" && activeTag) {
      stateLabel.textContent = `Showing articles tagged: ${formatLabel(activeTag)}`;
      return;
    }
    if (activeMode === "read2") {
      stateLabel.textContent = "Showing quick 2-minute reads";
      return;
    }
    if (activeMode === "most") {
      stateLabel.textContent = "Showing curated most-searched topics";
      return;
    }
    if (activeMode === "beginner") {
      stateLabel.textContent = "Showing beginner-friendly articles";
      return;
    }
    stateLabel.textContent =
      "Showing a hybrid feed with pinned articles first and the rest shuffled on each load";
  }

  function setTag(tag) {
    activeMode = "tag";
    activeTag = tag;
    render();
  }

  function setMode(mode) {
    activeMode = mode;
    activeTag = "";
    render();
  }

  function bindChipGroup(target, items, onClick) {
    if (!target) return;
    target.innerHTML = items
      .map(
        (item) =>
          `<button class="filter-chip" type="button" data-value="${item.value}">${item.label}</button>`,
      )
      .join("");

    target.querySelectorAll("[data-value]").forEach((button) => {
      button.addEventListener("click", () =>
        onClick(button.getAttribute("data-value")),
      );
    });
  }

  function syncActiveButtons() {
    document
      .querySelectorAll("[data-symptom-grid] .filter-chip")
      .forEach((button) => {
        button.classList.toggle(
          "active",
          activeMode === "tag" &&
            button.getAttribute("data-value") === activeTag,
        );
      });

    document
      .querySelectorAll("[data-cluster-grid] .filter-chip")
      .forEach((button) => {
        const tags = button.getAttribute("data-tags")?.split(",") || [];
        button.classList.toggle(
          "active",
          activeMode === "tag" && tags.includes(activeTag),
        );
      });

    document
      .querySelectorAll("[data-discovery-controls] .filter-chip")
      .forEach((button) => {
        button.classList.toggle(
          "active",
          button.getAttribute("data-mode") === activeMode,
        );
      });
  }

  function render() {
    updateStateLabel();
    renderCards(
      feedGrid,
      getFeedPosts(),
      "No matching articles yet for this filter.",
    );
    renderCards(
      pinnedGrid,
      pinnedPosts,
      "Add pinned posts to keep this section curated.",
    );
    renderCards(
      beginnerGrid,
      takeRandom(beginnerPosts.length ? beginnerPosts : posts, 3),
      "Add beginner-tagged posts to power this section.",
    );
    renderCards(
      loopGrid,
      takeRandom(posts, 3),
      "Add more posts to create the discovery loop.",
    );
    syncActiveButtons();
  }

  bindChipGroup(
    symptomGrid,
    config.symptoms.map((tag) => ({ value: tag, label: formatLabel(tag) })),
    setTag,
  );

  if (clusterGrid) {
    clusterGrid.innerHTML = config.clusters
      .map(
        (cluster) =>
          `<button class="filter-chip" type="button" data-tags="${cluster.tags.join(",")}">${cluster.label}</button>`,
      )
      .join("");

    clusterGrid.querySelectorAll("[data-tags]").forEach((button) => {
      const tags = button.getAttribute("data-tags").split(",");
      button.addEventListener("click", () => {
        const firstAvailableTag = tags.find((tag) =>
          posts.some((post) => post.tags.includes(tag)),
        );
        if (firstAvailableTag) setTag(firstAvailableTag);
      });
    });
  }

  if (controlBar) {
    controlBar.innerHTML = `
      <button class="filter-chip active" type="button" data-mode="all">Show all</button>
      <button class="filter-chip" type="button" data-mode="beginner">Not sure where to start?</button>
      <button class="filter-chip" type="button" data-mode="read2">2-minute reads</button>
      <button class="filter-chip" type="button" data-mode="most">Most searched</button>
    `;

    controlBar.querySelectorAll("[data-mode]").forEach((button) => {
      button.addEventListener("click", () =>
        setMode(button.getAttribute("data-mode")),
      );
    });
  }

  const totalNode = document.querySelector("[data-total-posts]");
  if (totalNode) totalNode.textContent = String(posts.length);

  const tagCountNode = document.querySelector("[data-total-tags]");
  if (tagCountNode) {
    const tags = new Set(posts.flatMap((post) => post.tags));
    tagCountNode.textContent = String(tags.size);
  }

  render();
}

document.addEventListener("DOMContentLoaded", () => {
  initBlogDiscovery().catch((error) => {
    const stateLabel = document.querySelector("[data-active-state]");
    const feedGrid = document.querySelector("[data-feed-grid]");
    if (stateLabel) {
      stateLabel.textContent =
        "The article feed could not load right now. Please try again, or use the main blog hub.";
    }
    if (feedGrid) {
      feedGrid.innerHTML = `<div class="empty-state">${error.message}</div>`;
    }
  });
});
