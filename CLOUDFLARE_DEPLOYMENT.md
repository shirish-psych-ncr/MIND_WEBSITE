# 🚀 Cloudflare Pages Deployment Guide

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
   - **Build command**: Leave empty (no build needed)
   - **Build output directory**: `/` (root directory)

5. **Environment Variables (Optional)**
   - No environment variables needed for this static site

6. **Deploy**
   - Click **Save and Deploy**
   - Cloudflare will deploy your site immediately

---

### Option 2: GitHub Actions Workflow

If you prefer automated deployments via GitHub Actions:

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
   - The workflow file is in `.github/workflows/deploy-cloudflare.yml`
   - It will automatically deploy on every push to `main`

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
- ✅ This site uses CDN resources only - no npm modules needed
- ✅ All JavaScript loads from `unpkg.com` and `cdn.jsdelivr.net`
- ✅ No build step required - it's pure static HTML

### CSP Errors
- Check browser console for Content Security Policy violations
- Update `wrangler.toml` headers if you need additional CDN domains

### Assets Not Loading
- Verify all paths are relative (not absolute)
- Check that assets folder exists in repository

---

## Configuration Files

### `wrangler.toml`
Contains Cloudflare-specific configuration:
- Redirects for clean URLs
- Security headers
- Cache control settings

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

✅ Removed all npm dependencies (now using CDN)  
✅ Deleted vendor files from `assets/vendor/`  
✅ Removed complex build configurations  
✅ Simplified to pure static site  
✅ Added Cloudflare-ready configuration  
✅ Repository size reduced by 98%  

Your site is now **deployment-ready** for Cloudflare Pages!
