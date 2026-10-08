# 🚀 Quick Start: Deploy Security Headers in 5 Minutes

## Prerequisites
- Node.js installed (v16 or higher)
- Cloudflare account (free at https://cloudflare.com/signup)
- Access to mindgracencr.in domain settings

## Step-by-Step Deployment

### 1. Install Wrangler CLI
```bash
npm install -g wrangler
```

### 2. Login to Cloudflare
```bash
wrangler login
```
This opens a browser window. Click "Allow" when prompted.

### 3. Deploy the Security Worker
```bash
cd /workspace
wrangler deploy worker.js --name mind-grace-security-worker
```

### 4. Add Route in Cloudflare Dashboard
1. Go to https://dash.cloudflare.com
2. Navigate to **Workers & Pages** → **mind-grace-security-worker**
3. Click **Add route**
4. Enter: `mindgracencr.in/*`
5. Select your zone: `mindgracencr.in`
6. Click **Add route**

### 5. Verify Headers Are Working
```bash
curl -I https://mindgracencr.in/
```

You should see:
```
HTTP/2 200 
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-frame-options: DENY
x-content-type-options: nosniff
content-security-policy: default-src 'self'; ...
referrer-policy: strict-origin-when-cross-origin
permissions-policy: geolocation=(), microphone=(), camera=()
```

## ✅ Done! Your site now has enterprise-grade security headers.

## Next Steps (Optional but Recommended)

### Migrate to Cloudflare Pages for Better Performance
1. Go to **Workers & Pages** → **Create application** → **Pages**
2. Connect your GitHub repository
3. Build settings:
   - **Build command**: Leave blank
   - **Build output directory**: `/`
4. Click **Deploy**
5. In **Settings** → **Functions** → Upload `_headers` file content

### Set Up Automatic Deploys
The worker will update automatically when you push to GitHub if you:
1. Connect your repo to Cloudflare Pages
2. Enable automatic deployments in Settings

## Troubleshooting

**Error: "Zone not found"**
- Make sure you've added your domain to Cloudflare first
- Go to **Websites** → **Add site** → Enter `mindgracencr.in`
- Update your nameservers at your domain registrar

**Headers not appearing?**
- Wait 2-3 minutes for propagation
- Clear your browser cache
- Try incognito mode
- Check that the route is active in Workers dashboard

**Need help?**
- Full guide: See `DEPLOYMENT_GUIDE.md`
- Cloudflare support: https://support.cloudflare.com
- Worker docs: https://developers.cloudflare.com/workers/

---

**Cost**: FREE (Cloudflare free tier includes 100,000 requests/day)  
**Time**: 5-10 minutes  
**Impact**: Fixes ALL security header issues reported in audits
