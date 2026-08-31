(() => {
  const manifestUrl = "/blog/pages/child/manifest.json";
  const sourceDir = "/blog/pages/child/";
  fetch(manifestUrl, { cache: "no-store" })
    .then((response) => { if (!response.ok) throw new Error(`Child blog manifest: ${response.status}`); return response.json(); })
    .then((manifest) => {
      window.BLOG_DISCOVERY_CONFIG = Object.freeze({
        sourceDir,
        posts: Object.freeze((manifest.files || []).map((file) => `${sourceDir}${file}`)),
        pinned: Object.freeze((manifest.pinned || []).map((file) => `${sourceDir}${file}`)),
        mostSearched: Object.freeze((manifest.mostSearched || []).map((file) => `${sourceDir}${file}`)),
        symptoms: Object.freeze(manifest.symptoms || []),
        clusters: Object.freeze(manifest.clusters || [])
      });
      window.dispatchEvent(new CustomEvent("blogConfigLoaded"));
    })
    .catch(() => {
      const files = ["early-signs-of-autism.html", "school-concerns-and-adhd.html", "sensory-overload-at-home.html", "speech-delay-red-flags.html"];
      window.BLOG_DISCOVERY_CONFIG = { sourceDir, posts: files.map((file) => `${sourceDir}${file}`), pinned: [], mostSearched: [], symptoms: [], clusters: [] };
      window.dispatchEvent(new CustomEvent("blogConfigLoaded"));
    });
})();
