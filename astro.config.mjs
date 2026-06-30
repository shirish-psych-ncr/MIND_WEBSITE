import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  // CORRECTED: Point to your specific GitHub Pages subdomain
  site: 'https://shirish-psych-ncr.github.io',
  
  // The subfolder repository name matching your GitHub URL path
  base: '/MIND_WEBSITE',
  
  // Enforces clean URLs ending with trailing slashes, which GitHub Pages prefers
  trailingSlash: 'always',

  // OPTIMIZATION: Compresses build output automatically for faster loading times
  compressHTML: true,
});
