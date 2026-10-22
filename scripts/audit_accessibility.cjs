// Backward-compatible entry point; the runner audits only generated routes.
import("./audit-site-accessibility.mjs").catch(error => { console.error(error); process.exitCode = 1; });
