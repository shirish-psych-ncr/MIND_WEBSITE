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
    .catch((error) => { window.BLOG_DISCOVERY_CONFIG = { error: true, message: error.message }; window.dispatchEvent(new CustomEvent("blogConfigLoaded")); });
})();
