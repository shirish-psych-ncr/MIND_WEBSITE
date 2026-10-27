(() => {
  const manifestUrl = "/blog/pages/adult/manifest.json";
  const sourceDir = "/blog/pages/adult";
  const resolve = (file) => file.startsWith("/") ? file : `${sourceDir}/${file}`;
  fetch(manifestUrl, { cache: "no-store" })
    .then((response) => { if (!response.ok) throw new Error(`Adult blog manifest: ${response.status}`); return response.json(); })
    .then((manifest) => {
      window.BLOG_DISCOVERY_CONFIG = Object.freeze({
        sourceDir,
        posts: Object.freeze((manifest.files || []).map(resolve)),
        pinned: Object.freeze((manifest.pinned || []).map(resolve)),
        mostSearched: Object.freeze((manifest.mostSearched || []).map(resolve)),
        symptoms: Object.freeze(manifest.symptoms || []),
        clusters: Object.freeze(manifest.clusters || [])
      });
      window.dispatchEvent(new CustomEvent("blogConfigLoaded"));
    })
    .catch(() => {
      const files = ["overthinking-vs-anxiety", "scheduled-worry-time-technique", "sleep-and-anxiety-cycle", "stimulus-control-therapy", "when-to-see-a-psychiatrist"];
      window.BLOG_DISCOVERY_CONFIG = { sourceDir, posts: files.map(resolve), pinned: [], mostSearched: [], symptoms: [], clusters: [] };
      window.dispatchEvent(new CustomEvent("blogConfigLoaded"));
    });
})();
