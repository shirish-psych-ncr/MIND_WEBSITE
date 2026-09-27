// @ts-check
import { defineConfig } from 'astro/config';

// Mind Grace clinic site — static output preserves the exact URL scheme
// (clean directory routes like /about/ plus .html hubs under /blog/).
export default defineConfig({
  output: 'static',
  site: 'https://mindgracencr.in/',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    // Pages already ship their own <head>; keep Astro's helpers out of the way.
    inlineStylesheets: 'auto',
  },
  devToolbar: { enabled: false },
  prefetch: { prefetchAll: false },
});
