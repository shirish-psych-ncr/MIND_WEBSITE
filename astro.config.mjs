// @ts-check
import { defineConfig } from 'astro/config';
import { publicAssets } from './scripts/public-assets.mjs';

// Mind Grace clinic site — static output preserves the exact URL scheme
// (clean directory routes like /about/ plus .html hubs under /blog/).
export default defineConfig({
  output: 'static',
  integrations: [publicAssets()],
  site: 'https://mindgracencr.in/',
  trailingSlash: 'never',
  build: {
    format: 'file',
    // Pages already ship their own <head>; keep Astro's helpers out of the way.
    inlineStylesheets: 'auto',
  },
  devToolbar: { enabled: false },
  // The site does not opt into Astro view transitions or link prefetching.
  // Disabling the integration avoids shipping an unused module on every page
  // and prevents browser preload/credentials warnings.
  prefetch: false,
});
