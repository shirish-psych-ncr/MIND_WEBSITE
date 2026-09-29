(() => {
  const manifestUrl = "/blog/pages/child/manifest.json";
  const sourceDir = "/blog/pages/child/";
  const resolve = (file) => file.startsWith("/") ? file : `${sourceDir}${file}`;
  fetch(manifestUrl, { cache: "no-store" })
    .then((response) => { if (!response.ok) throw new Error(`Child blog manifest: ${response.status}`); return response.json(); })
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
      const files = ["/sleep-and-autism-guide-indian-parents", "early-signs-of-autism", "school-concerns-and-adhd", "sensory-overload-at-home", "speech-delay-red-flags"];
      window.BLOG_DISCOVERY_CONFIG = { sourceDir, posts: files.map(resolve), pinned: [], mostSearched: [], symptoms: [], clusters: [] };
      window.dispatchEvent(new CustomEvent("blogConfigLoaded"));
    });
})();
