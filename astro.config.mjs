import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  // Your base domain deployment URL
  site: 'https://github.io',
  
  // The subfolder repository name matching your GitHub URL path
  base: '/MIND_WEBSITE',
  
  // Enforces clean URLs ending with trailing slashes, which GitHub Pages prefers
  trailingSlash: 'always',
});
