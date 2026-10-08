# Amplitude integration (retired)

Status: retired on 9 October 2026.

Amplitude was removed from every page after blocked ingestion requests produced console errors, retries, and verbose SDK logs. The service worker no longer precaches its assets, and the site CSP no longer allows Amplitude hosts.

The old source and vendored files remain temporarily for repository history, but no generated HTML may load them. `scripts/validate-structured-data.mjs` fails the build if an Amplitude runtime reference returns.

Do not re-enable this integration without:

1. A documented privacy and consent decision.
2. A clear event taxonomy that excludes sensitive clinical information.
3. Production CSP and ad-blocker testing.
4. A quiet failure mode with no retries or console errors when blocked.
5. An update to the generated-output validation and this document.

GA4/GTM are the only page analytics currently retained. Their configuration should be reviewed separately to ensure an event is not sent twice.
