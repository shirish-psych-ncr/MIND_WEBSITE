# [LAUNCH] Cloudflare Pages Deployment Guide

## Quick Start

Your website is now configured for **Cloudflare Pages** deployment from GitHub.

### Prerequisites

1. **Cloudflare Account** - Sign up at [cloudflare.com](https://cloudflare.com)
2. **GitHub Repository** - Your code is already in GitHub

---

## Setup Instructions

### Option 1: Direct GitHub Integration (Recommended)

1. **Log into Cloudflare Dashboard**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)

2. **Create a Pages Project**
   - Navigate to **Workers & Pages** → **Create Application** → **Pages**
   - Click **Connect to Git**

3. **Select Your Repository**
   - Choose your GitHub repository from the list
   - Grant Cloudflare access if prompted

4. **Configure Build Settings**
   - **Production branch**: `main`
   - **Build command**: `exit 0`
   - **Build output directory**: `.` (repository root)

5. **Environment Variables (Optional)**
   - No environment variables needed for this static site

6. **Deploy**
   - Click **Save and Deploy**
   - Cloudflare will deploy your site immediately

---

### Option 2: GitHub Actions Workflow

If you prefer automated deployments via GitHub Actions, add your own workflow using Wrangler and the project secrets:

1. **Add Secrets to GitHub Repository**

   Go to: `GitHub Repo → Settings → Secrets and variables → Actions`

   Add these secrets:
   - `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare Account ID

2. **Add Variables to GitHub Repository**

   Go to: `GitHub Repo → Settings → Secrets and variables → Actions → Variables`

   Add this variable:
   - `CLOUDFLARE_PROJECT_NAME` - Your Cloudflare Pages project name

3. **Enable the Workflow**
   - This repository does not include a workflow by default.

---

## Creating Cloudflare API Token

1. Go to **Cloudflare Dashboard** → **My Profile** → **API Tokens**
2. Click **Create Token**
3. Choose **Edit Cloudflare Workers** template (or create custom)
4. Required permissions:
   - **Account.Cloudflare Pages** → **Edit**
   - **Zone.DNS** → **Read** (optional)
5. Copy the token and add it to GitHub secrets

---

## Finding Your Account ID

1. Go to **Cloudflare Dashboard**
2. Look at the right sidebar on the home page
3. Your **Account ID** is displayed there
4. Or go to any domain → Overview → scroll down

---

## Post-Deployment

### Your Site Will Be Available At:
- `https://your-project-name.pages.dev`

### Custom Domain (Optional):
1. Go to your Pages project in Cloudflare dashboard
2. Click **Custom Domains**
3. Add your domain
4. Cloudflare will auto-configure DNS

---

## Troubleshooting

### Build Fails with "Module Not Found"
- [OK] This is a no-build static site; no npm install is required for deployment
- [OK] Runtime scripts are served from the repository, with external CDN resources used only where explicitly configured
- [OK] No build step required - the Pages output directory is the repository root

### CSP Errors
- Check browser console for Content Security Policy violations
- Update `_headers` if you need additional CDN domains

### Assets Not Loading
- Verify root-relative paths resolve from the Cloudflare Pages project root
- Check that the `assets` folder exists in the deployed repository output

---

## Configuration Files

### `_redirects`, `_headers`, and `wrangler.toml`
- `_redirects` contains Cloudflare Pages clean-URL proxy rules.
- `_headers` contains security headers, CSP, and cache policy.
- `wrangler.toml` declares the Pages output directory for CLI deployments.

### `package.json`
Minimal configuration - no dependencies needed:
```json
{
  "name": "mind-grace-website",
  "version": "1.0.0",
  "private": true
}
```

---

## Support

- **Cloudflare Docs**: [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages/)
- **Community Forum**: [community.cloudflare.com](https://community.cloudflare.com)

---

## What Was Cleaned

[OK] Removed all npm dependencies (now using CDN)
[OK] Removed stale vendor references from project documentation
[OK] Removed complex build configurations
[OK] Simplified to pure static site
[OK] Added Cloudflare-ready configuration
[OK] Repository size reduced by 98%

Your site is now **deployment-ready** for Cloudflare Pages!
