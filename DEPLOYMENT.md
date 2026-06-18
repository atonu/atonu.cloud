# Cloudflare Pages Deployment Guide
## Deploy to www.atonu.online

This guide will walk you through deploying your Next.js portfolio to Cloudflare Pages with the custom domain **www.atonu.online**.

---

## ✅ Pre-Deployment Checklist (Completed)

The following changes have been made to your project:

1. **Next.js Configuration** (`next.config.ts`)
   - Set `output: 'export'` for static site generation
   - Enabled `images.unoptimized: true` (required for static export)
   - Added `trailingSlash: true` for consistent URLs

2. **Domain Updates** (`app/layout.tsx`)
   - Updated `metadataBase` to `https://www.atonu.online`
   - Updated OpenGraph URL to match

3. **Cloudflare Optimization Files**
   - Created `public/_headers` - Security and caching headers
   - Created `public/_redirects` - Redirect non-www to www
   - Created `.node-version` - Ensures correct Node.js version

4. **Build Verification**
   - Build tested successfully ✓
   - Static files generated in `/out` directory

---

## 📋 Step-by-Step Deployment

### Step 1: Push to GitHub

```bash
# Add all changes
git add .

# Commit changes
git commit -m "Configure for Cloudflare Pages deployment"

# Push to GitHub (assumes you have a remote repository)
git push origin main
```

> **Note:** If you don't have a GitHub repository yet:
> 1. Create a new repository at https://github.com/new
> 2. Run: `git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git`
> 3. Then push: `git push -u origin main`

---

### Step 2: Create Cloudflare Pages Project

1. **Log in to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com/
   - Navigate to **Workers & Pages** > **Pages**

2. **Connect to Git**
   - Click **"Create application"** > **"Pages"** > **"Connect to Git"**
   - Authorize Cloudflare to access your GitHub account
   - Select your repository: `atonu.cloud.deploy` (or your repo name)

3. **Configure Build Settings**
   - **Project name:** `atonu-portfolio` (or your choice)
   - **Production branch:** `main` (or `master` if that's your default branch)
   - **Framework preset:** **None** ⚠️ IMPORTANT - Do NOT use "Next.js"
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Root directory:** `/` (leave as default)

   > ⚠️ **Critical:** Set framework preset to "None" to use static export instead of Cloudflare's Next.js runtime

4. **Environment Variables** (Optional)
   - For now, no environment variables are needed
   - Click **"Save and Deploy"**

5. **Wait for First Deployment**
   - Cloudflare will build and deploy your site
   - This takes 2-5 minutes
   - You'll get a temporary URL like: `atonu-portfolio.pages.dev`

---

### Step 3: Add Custom Domain (www.atonu.online)

#### Option A: Domain Already on Cloudflare

If **atonu.online** is already managed by Cloudflare:

1. In your Pages project, go to **"Custom domains"** tab
2. Click **"Set up a custom domain"**
3. Enter: `www.atonu.online`
4. Click **"Continue"**
5. Cloudflare will automatically create the DNS record
6. Click **"Activate domain"**
7. Wait 1-2 minutes for DNS propagation

#### Option B: Domain Not on Cloudflare Yet

1. **Transfer DNS to Cloudflare** (Recommended)
   - Go to **Cloudflare Dashboard** > **Add a site**
   - Enter `atonu.online` and click **"Add site"**
   - Choose **Free Plan**
   - Cloudflare will scan your existing DNS records
   - Update nameservers at your domain registrar to Cloudflare's nameservers
   - Wait for nameserver propagation (up to 24 hours)

2. **Add Custom Domain** (after DNS is active)
   - In Pages project → **"Custom domains"** → **"Set up a custom domain"**
   - Enter: `www.atonu.online`
   - Cloudflare creates the DNS record automatically

3. **Alternative: CNAME Method** (if you can't change nameservers)
   - In Pages → **"Custom domains"** → Add `www.atonu.online`
   - Cloudflare will give you a CNAME value
   - At your current DNS provider, create:
     - Type: `CNAME`
     - Name: `www`
     - Value: `atonu-portfolio.pages.dev` (or the value Cloudflare provides)

---

### Step 4: Set Up Root Domain Redirect (atonu.online → www.atonu.online)

If you want `atonu.online` (without www) to redirect to `www.atonu.online`:

1. **Add Root Domain as Custom Domain**
   - In Pages → **"Custom domains"** → Add `atonu.online`
   
2. **The `_redirects` file handles the redirect automatically**
   - Already configured in your project
   - `https://atonu.online/*` → `https://www.atonu.online/:splat`

---

### Step 5: Enable HTTPS (Automatic)

Cloudflare automatically provisions SSL certificates:
- **Cloudflare-issued certificate** for `.pages.dev` domain (instant)
- **Let's Encrypt certificate** for custom domains (takes 1-5 minutes)

**To verify:**
1. Go to Pages project → **"Custom domains"**
2. Check status shows **"Active"** with 🔒 icon
3. Visit `https://www.atonu.online` - should load with HTTPS

---

### Step 6: Configure DNS (If Using Cloudflare DNS)

Your DNS should have these records:

| Type  | Name | Target/Value              | Proxy Status |
|-------|------|---------------------------|--------------|
| CNAME | www  | atonu-portfolio.pages.dev | Proxied (🟠) |
| A     | @    | (Cloudflare IP)           | Proxied (🟠) |

> The `@` record is auto-created when you add `atonu.online` as a custom domain.

---

## 🚀 Deployment Workflow (For Future Updates)

After initial setup, deploying updates is automatic:

1. **Make changes locally**
2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```
3. **Cloudflare auto-deploys** - No manual steps needed!

---

## 🔧 Advanced: Build Settings & Environment

### Build Configuration Summary

| Setting               | Value          |
|-----------------------|----------------|
| Framework preset      | Next.js        |
| Build command         | `npm run build`|
| Build output directory| `out`          |
| Node.js version       | 20.18.1        |

### Preview Deployments

- **Every branch** gets a preview URL
- **Pull requests** get automatic preview deployments
- Preview URLs: `<branch-name>.atonu-portfolio.pages.dev`

---

## 🛡️ Security Features Enabled

From `public/_headers`:
- ✅ `X-Frame-Options: DENY` - Prevents clickjacking
- ✅ `X-Content-Type-Options: nosniff` - MIME type security
- ✅ `X-XSS-Protection` - XSS attack protection
- ✅ Cache optimization for static assets
- ✅ PWA service worker caching strategy

---

## 🐛 Troubleshooting

### Build Fails: "require() of ES Module @opennextjs/cloudflare"

**Error message:** `Error: require() of ES Module /opt/buildhome/repo/node_modules/@opennextjs/cloudflare/dist/api/index.js not supported`

**Cause:** Cloudflare auto-detected Next.js and tried to use OpenNext runtime instead of static export

**Fix:**
1. Go to Cloudflare Pages → **Settings** → **Builds & deployments**
2. Click **Edit configurations**
3. Change **Framework preset** from "Next.js" to **"None"**
4. Ensure:
   - Build command: `npm run build`
   - Output directory: `out`
5. Click **Save** and **Retry deployment**

### Build Fails on Cloudflare (Other Issues)

**Check build logs** in Cloudflare Dashboard:
- Look for errors in the build output
- Common issues:
  - Node version mismatch → Verify `.node-version` file
  - Missing dependencies → Check `package.json`
  - TypeScript errors → Run `npm run build` locally first

### Custom Domain Not Working

1. **Check DNS propagation:** https://dnschecker.org/
2. **Verify DNS records** in Cloudflare DNS tab
3. **Check SSL status** in Pages → Custom domains
4. **Clear browser cache** or test in incognito mode

### www vs non-www Issues

- Ensure both `atonu.online` and `www.atonu.online` are added as custom domains
- The `_redirects` file will handle the redirect
- May take 5-10 minutes for redirect to propagate

---

## 📊 Post-Deployment Checklist

After deployment, verify:

- [ ] Site loads at `https://www.atonu.online`
- [ ] HTTPS is enabled (🔒 in browser)
- [ ] `https://atonu.online` redirects to `https://www.atonu.online`
- [ ] All images and assets load correctly
- [ ] Service worker registers (check DevTools → Application)
- [ ] PWA manifest loads (check DevTools → Application → Manifest)
- [ ] Custom cursor works
- [ ] Three.js scenes render properly
- [ ] All sections scroll smoothly
- [ ] Contact form functions (if applicable)

---

## 📈 Analytics & Monitoring (Optional)

Consider adding:

1. **Cloudflare Web Analytics** (Privacy-focused, free)
   - Dashboard → Analytics & Logs → Web Analytics
   - Add analytics snippet to your site

2. **Cloudflare Zaraz** (Tag manager)
   - Add Google Analytics, Meta Pixel, etc. without performance impact

---

## 🎉 You're Done!

Your portfolio will be live at **https://www.atonu.online** with:
- ✅ Automatic HTTPS
- ✅ Global CDN (fast worldwide)
- ✅ Automatic deployments on git push
- ✅ Unlimited bandwidth (Cloudflare Pages free tier)
- ✅ Preview deployments for every branch
- ✅ Security headers and caching optimization

---

## Support & Resources

- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages/
- **Next.js Static Export:** https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- **Cloudflare Community:** https://community.cloudflare.com/

Need help? Check the troubleshooting section or Cloudflare's support forums.
