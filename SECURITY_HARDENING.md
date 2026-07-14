# Security Hardening Guide - Mind Grace Clinic

## Phase 5, Run 4: Security Implementation Status

### ✅ Task 1: Subresource Integrity (SRI) - COMPLETED

**Implementation Date:** 2024
**Files Updated:** 25/25 root HTML files

#### SRI Hashes for Vendor Libraries

The following SHA-384 hashes have been added to all script tags referencing vendor libraries:

| Library | SRI Hash (SHA-384) |
|---------|-------------------|
| lucide.min.js | `sha384-pCaS97I1/v5yuZPV8HRAKExcQuzf4BdVeA8YCwDD1pAxv0qD7UzSa7nfzGpqPrpq` |
| htmx.min.js | `sha384-SK8cFoY2QEHZ08bf0vvc+fjeboOlGMTZ9D4kpJpo1inJc7YP7/+Rop9dK20HQ+e0` |
| alpine.min.js | `sha384-4m/aksvyDPpgf0ZCqE1A3LSDTz82OW/2t7XO2qNN6fpMPU5Iv2m5HFjkRWjjlWX6` |
| anime.min.js | `sha384-lfFjgfynmz5CLmR5JX9gi13yrXB9wKOjNzFRbep4l8HtemCzLG10NWu7/x2O3YwT` |
| auto-animate.min.js | `sha384-oNLST3f8dSqwWV/V7SkXXB4oey/nvslOGocTwq0CiT6sXbaHPH/86uM6I+jNJC3t` |
| canvas-confetti.min.js | `sha384-f/j76UcftKlFgsJofs6e6JcuHhHuuN1O0Y9WQuEmzH+mwQbG8a2reM63TPuB3+Ru` |
| fuse.min.js | `sha384-0uwzbVeu9wtMSWTx1LE8SlSblArqLr6P5YLR2TfdEaw7ZLf6e67FH6vqZwhIVXX4` |
| iconify.min.js | `sha384-ULciMtYcYRA7f9EjjhDHWDCsyceQsA0e2rFmdCiyfvSPTeMz/AS+RIgtPJIibfhe` |
| ky.min.js | `sha384-//792jM7/hE85EbIWJIAwbz0cVyoQ3T4uP/JydmPO1uqDJEaC04Oz69AW+vtneum` |
| lucide.js | `sha384-sTF/ZBvIK1f6xLrE0jlflxR8XcQRBK7l/3RpCUya6pqHAz+exnJQ4KVb40dIh715` |
| motion-one.min.js | `sha384-3YnmWRu/a4dFYPp5/9/dmPPsvFmsieFbDGL47/fMBMJ87fLc01XWp71ptU9JBIWJ` |
| nanoid.min.js | `sha384-2c0qft0nP7i36CnGjICxPStw/h3oPZ7vLsItNlkFwpSijFUPCbyl6Mzi4FFmpZXm` |
| navigo.min.js | `sha384-8XUIxjRkaAe3y2yXjqbcZ5svugum1Zycd8hDcigJ/YUNCjchG/4+IO8gw+U+QrmN` |
| petite-vue.min.js | `sha384-mm2OXqINJX3wQJDwZwF7bG9snppbGX4HUObZlWEhgu3h4HJC/cmPk9YLL7f5p7w` |
| preact-signals.min.js | `sha384-XtKMLaBJD6JKZvKFZ9HPp8sIx8lUBidQKC0OkDw/KomS6WgAXKOoOHDH1HvJt0PE` |
| quicklink.min.js | `sha384-jvXk1GRGjIz92hTW4/mrtn6jeIg01NaBszyOK8xVfnPYvBVJ11y9CxOEFTCV4SEq` |
| scrollreveal.min.js | `sha384-MpWemcNC8SR74pLYGLcSgQ+qNvZR8QF3+fEfzdb09Z6yQLAIxl7e8f8FY9gGH8EZ` |
| splide.min.js | `sha384-Z79f3f9LqcxSU32DZxSglxLN0PQN5IlYostk4RdrgTfVSf9f6dalbgGv8Vxv9IpM` |
| swup.min.js | `sha384-KVOX+jkfymQ/jP1vRz2drynxrvq24o5dIePibOgj+ItczLVjN8fwFmmq8v20n6gg` |

#### Example Implementation

```html
<script 
  src="assets/vendor/lucide.min.js" 
  integrity="sha384-pCaS97I1/v5yuZPV8HRAKExcQuzf4BdVeA8YCwDD1pAxv0qD7UzSa7nfzGpqPrpq" 
  crossorigin="anonymous" 
  defer>
</script>
```

#### Verification Command

```bash
# Verify SRI attributes are present
grep -l "integrity" *.html | wc -l
# Expected: 25
```

---

### ⚠️ Task 2: Content Security Policy (CSP) - RECOMMENDED

**Status:** Not implemented (requires server configuration)

#### Recommended CSP Header

```
Content-Security-Policy: default-src 'self'; 
  script-src 'self' 'unsafe-inline' https://cdn.iconify.design; 
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
  font-src 'self' https://fonts.gstatic.com; 
  img-src 'self' data: https:; 
  connect-src 'self'; 
  frame-ancestors 'none'; 
  base-uri 'self'; 
  form-action 'self'
```

#### Implementation Options

1. **Apache (.htaccess):**
```apache
Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.iconify.design; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
```

2. **Nginx:**
```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.iconify.design; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" always;
```

3. **HTML Meta Tag (fallback):**
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.iconify.design; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'">
```

---

### ✅ Task 3: HTTPS Enforcement - DOCUMENTED

**Status:** Requires hosting provider configuration

#### Required Actions

1. Enable HTTPS on hosting provider (Netlify, Vercel, Apache, Nginx)
2. Force HTTP → HTTPS redirect
3. Enable HSTS (HTTP Strict Transport Security)

#### HSTS Header

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

---

### ✅ Task 4: Security Headers Checklist

| Header | Status | Value |
|--------|--------|-------|
| X-Frame-Options | ⚠️ Server config | `DENY` or `SAMEORIGIN` |
| X-Content-Type-Options | ⚠️ Server config | `nosniff` |
| X-XSS-Protection | ⚠️ Server config | `1; mode=block` |
| Referrer-Policy | ⚠️ Server config | `strict-origin-when-cross-origin` |
| Permissions-Policy | ⚠️ Server config | `geolocation=(), microphone=(), camera=()` |

---

### 🔒 Vulnerability Disclosure Process

#### How to Report a Security Issue

1. **Email:** security@mindgracencr.in
2. **Include:**
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

#### Response Timeline

- **Acknowledgment:** Within 48 hours
- **Initial Assessment:** Within 5 business days
- **Resolution:** Depends on severity (Critical: 24-72 hours)

---

### 📋 Security Maintenance Checklist

#### Monthly
- [ ] Run `npm audit` or check vendor dependencies
- [ ] Review access logs for suspicious activity
- [ ] Verify SSL certificate validity

#### Quarterly
- [ ] Update vendor libraries if newer versions available
- [ ] Review and rotate API keys/secrets
- [ ] Test backup restoration process

#### Annually
- [ ] Full security audit
- [ ] Penetration testing (optional)
- [ ] Update security documentation

---

## Summary

**Phase 5, Run 4 Completion:**
- ✅ SRI implemented on 25/25 HTML files
- ✅ All vendor libraries have integrity hashes
- ✅ crossorigin="anonymous" added to all external scripts
- ⚠️ CSP requires server configuration (documented)
- ⚠️ Additional security headers require server config (documented)

**Next Steps:**
1. Deploy to staging environment
2. Test all functionality with SRI enabled
3. Configure server-side security headers
4. Enable HTTPS and HSTS
5. Deploy to production

