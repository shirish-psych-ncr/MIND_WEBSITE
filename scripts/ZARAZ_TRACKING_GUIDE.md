# Cloudflare Zaraz integration (retired)

Status: retired before the 9 October 2026 documentation pass.

Zaraz was disabled because its queued tracking loop added noise and avoidable client work. The site must not load `assets/js/zaraz-tracking.js` from generated pages. The source file remains only as historical implementation material.

Do not re-enable Zaraz without:

1. Confirming that it does not duplicate GA4/GTM events.
2. Defining a consent model appropriate for a mental-health website.
3. Excluding form values, free text, health concerns, and other sensitive data.
4. Testing blocked, offline, and slow-network behavior without queues or console spam.
5. Running `npm run check` and the browser console smoke test.

Cloudflare security headers and routing do not depend on Zaraz.
