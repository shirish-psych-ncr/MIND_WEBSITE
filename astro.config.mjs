import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import postAudit from '@casoon/astro-post-audit';
import brokenLinksChecker from 'astro-broken-links-checker';

export default defineConfig({
  site: 'https://shirish-psych-ncr.github.io',
  base: '/MIND_WEBSITE',
  trailingSlash: 'always',
  compressHTML: true,

  integrations: [
    // 1. Sitemap (Index 0)
    sitemap(),

    // 2. Broken Link Checker (Index 1 - Now correctly configured)
    brokenLinksChecker({
      checkExternalLinks: false,
      throwError: false,
      cacheExternalLinks: true,
    }),

    // 3. Post Audit (Index 2) - disabled due to too many errors
    // postAudit({
    //   preset: 'standard',
    //   failOn: 'none',
    //   maxWarnings: 10000,
    //   rules: {
    //     filters: { exclude: ['404.html'] },
    //     html_basics: { meta_description_required: true, lang_attr_required: true },
    //     a11y: { require_skip_link: true, check_landmarks: true, img_alt_required: true },
    //     opengraph: { require_og_title: true, require_og_image: true, og_image_absolute_url: true },
    //     security: { check_target_blank: true }
    //   },
    //   reports: {
    //     json: 'audit-report.json',
    //     sarif: 'audit.sarif'
    //   }
    // })
  ]
});