/**
 * Blog Discovery - Dynamic Configuration Loader
 * Automatically fetches post manifest and initializes discovery data.
 */
(async function() {
  'use strict';

  const SOURCE_DIR = 'pages/child/';
  const MANIFEST_URL = `${SOURCE_DIR}manifest.json`;

  try {
    // 1. Fetch manifest with a cache-control hint
    const response = await fetch(MANIFEST_URL, {
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache' }
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    // 2. Build the configuration object
    // Using Object.freeze for data integrity
    window.BLOGDISCOVERYCONFIG = Object.freeze({
      sourceDir: SOURCE_DIR,
      
      // Auto-generated posts list
      posts: Object.freeze(data.files.map(file => `${SOURCE_DIR}${file}`)),

      // You can keep these static if you prefer manual curation, 
      // or move these into your manifest.json as well
      pinned: Object.freeze(data.pinned || []),
      mostSearched: Object.freeze(data.mostSearched || []),
      symptoms: Object.freeze(data.symptoms || []),
      clusters: Object.freeze(data.clusters || []),

      // Helper method to refresh data if needed
      refresh: async () => window.location.reload()
    });

    // 3. Signal to the application that the system is ready
    window.dispatchEvent(new CustomEvent('blogConfigLoaded', {
      detail: { status: 'ready', timestamp: Date.now() }
    }));

    console.info('BlogDiscoveryConfig: Loaded successfully.');

  } catch (error) {
    console.error('BlogDiscoveryConfig: Failed to load manifest.', error);
    
    // Fallback: Ensure the config exists even if the fetch fails
    window.BLOGDISCOVERYCONFIG = { error: true, message: error.message };
  }
})();