# Cloudflare Pages Deployment for Next.js
## Deploy with SSR to www.atonu.online

> **Note:** This project uses Cloudflare Pages with Next.js runtime for full SSR support. Local builds won't work on Windows ARM64, but deployment via GitHub works perfectly (builds on Cloudflare's servers).

---

## 🚀 Quick Deploy Guide

### Step 1: Push Your Code to GitHub

```bash
git add .
git commit -m "Configure for Cloudflare Pages with Next.js runtime"
git push origin master
```

### Step 2: Create Cloudflare Pages Project

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com/
   - Navigate to: **Workers & Pages** → **Pages**

2. **Connect to GitHub**
   - Click **"Create application"** → **"Pages"** → **"Connect to Git"**
   - Authorize Cloudflare to access GitHub
   - Select repository: `atonu.cloud` (or your repo name)

3. **Configure Build Settings**
   
   **IMPORTANT:** Use these exact settings:

   | Setting | Value |
   |---------|-------|
   | Project name | `atonu-portfolio` |
   | Production branch | `master` |
   | Framework preset | **Next.js (Advanced)** ⚡ |
   | Build command | `npx @cloudflare/next-on-pages` |
   | Build output directory | `.vercel/output/static` |
   | Root directory | `/` (default) |

   > ⚠️ **Critical:** Select "Next.js (Advanced)" as framework preset - this enables the Workers runtime

4. **Environment Variables** (optional)
   - For now, leave empty
   - Can add later if needed

5. **Deploy**
   - Click **"Save and Deploy"**
   - Wait 3-5 minutes for build
   - You'll get a URL like: `atonu-portfolio.pages.dev`

---

### Step 3: Add Custom Domain

1. **In your Pages project:**
   - Go to **"Custom domains"** tab
   - Click **"Set up a custom domain"**

2. **Add www.atonu.online:**
   - Enter: `www.atonu.online`
   - Click **"Continue"**

3. **DNS Configuration:**
   
   **If atonu.online is already on Cloudflare:**
   - Cloudflare auto-creates DNS record
   - Click **"Activate domain"**
   - Wait 1-2 minutes ✅ Done!

   **If atonu.online is NOT on Cloudflare:**
   - Option A: Transfer DNS to Cloudflare (recommended)
     - Add site to Cloudflare
     - Update nameservers at registrar
   - Option B: Use CNAME at current DNS provider
     - Add CNAME: `www` → `atonu-portfolio.pages.dev`

4. **Add root domain (optional):**
   - Also add `atonu.online` as custom domain
   - Cloudflare will auto-redirect to `www.atonu.online`

---

## ✅ What You Get

✅ **Full Next.js SSR** - Server-side rendering, API routes, server components  
✅ **Edge Runtime** - Fast global performance (270+ cities)  
✅ **Automatic HTTPS** - SSL certificate included  
✅ **Auto-deploy** - Push to GitHub → auto-builds and deploys  
✅ **Preview deployments** - Every branch gets a preview URL  
✅ **Unlimited bandwidth** - Free tier includes everything you need  

---

## 🔄 Future Deployments

After initial setup, deploying updates is automatic:

```bash
# Make changes to your code
git add .
git commit -m "Update portfolio"
git push origin master

# Cloudflare auto-builds and deploys! 🎉
```

No manual steps needed!

---

## 📝 Build Details

### How it Works:
1. You push to GitHub
2. Cloudflare detects the push
3. Cloudflare's build servers (x64 Linux) run:
   - `npx @cloudflare/next-on-pages`
4. Outputs to `.vercel/output/static`
5. Deploys to Workers runtime globally
6. Live in 2-3 minutes! ⚡

### Why Local Build Doesn't Work:
- Cloudflare Workers runtime tools (`workerd`) require x64 architecture
- Your Windows ARM64 machine isn't compatible
- **This is fine!** - Builds happen on Cloudflare's servers, not locally
- Your local `npm run dev` still works perfectly for development

---

## 🛠️ Development Workflow

### Local Development (Works Fine):
```bash
npm run dev
```
Opens Next.js dev server at `http://localhost:3000`

### Testing Before Deploy:
- Test locally with `npm run dev`
- Push to GitHub
- Check preview deployment in Cloudflare dashboard

### Branch Previews:
- Create feature branch: `git checkout -b feature/new-section`
- Push: `git push origin feature/new-section`  
- Cloudflare creates preview URL automatically
- Example: `feature-new-section.atonu-portfolio.pages.dev`

---

## 🔍 Monitoring & Logs

### View Deployment Status:
1. Cloudflare Dashboard → Your Pages project
2. **Deployments** tab
3. Click any deployment to see build logs

### Real-time Logs:
- Click on active deployment
- **View details** → **Build logs**
- See real-time build progress

### Analytics:
- **Analytics** tab in your Pages project
- See requests, bandwidth, errors
- Geographic distribution

---

## 🐛 Troubleshooting

### Build Fails in Cloudflare:

**Error: "Unsupported Next.js feature"**
- Check compatibility: https://github.com/cloudflare/next-on-pages/blob/main/packages/next-on-pages/docs/supported.md
- Some Node.js APIs aren't supported in Workers runtime
- Use edge-compatible alternatives

**Error: "Module not found"**
- Ensure all dependencies are in `package.json`
- Check that all imports use correct paths

**Build times out:**
- Contact Cloudflare support
- May need to optimize build (rare)

### Domain Not Working:

1. **Check DNS propagation:**
   - Visit: https://dnschecker.org/
   - Enter: `www.atonu.online`
   - Wait if still propagating

2. **Verify DNS records:**
   - Cloudflare Dashboard → DNS tab
   - Should see CNAME for `www` pointing to `atonu-portfolio.pages.dev`
   - Proxy status: Orange (Proxied)

3. **Check SSL:**
   - Pages → Custom domains
   - Status should show "Active" with 🔒

4. **Clear cache:**
   - Browser: Ctrl+Shift+R
   - Try incognito mode

### Changes Not Showing:

1. **Check deployment status:**
   - Pages → Deployments tab
   - Ensure latest deployment succeeded

2. **Clear Cloudflare cache:**
   - Dashboard → Caching → Purge Everything

3. **Force new deployment:**
   - Make a small change
   - Commit and push
   - Or trigger manual redeploy in dashboard

---

## ⚙️ Advanced: Environment Variables

### Add via Dashboard:
1. Pages project → **Settings** → **Environment variables**
2. Click **"Add variable"**
3. Add for Production and/or Preview
4. Redeploy to apply

### Example Variables:
```env
NEXT_PUBLIC_SITE_URL=https://www.atonu.online
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Secrets:
- Never commit API keys to Git!
- Add sensitive values only in Cloudflare dashboard
- Use `NEXT_PUBLIC_` prefix for client-side env vars

---

## 📊 Post-Deployment Checklist

After deployment, verify:

- [ ] Site loads at `https://www.atonu.online`
- [ ] HTTPS works (🔒 in browser)
- [ ] `https://atonu.online` redirects to `https://www.atonu.online`
- [ ] All images and assets load
- [ ] Three.js scenes render correctly
- [ ] Animations work smoothly
- [ ] Custom cursor functions
- [ ] Mobile responsive
- [ ] All sections scroll properly
- [ ] Service worker registers (check DevTools)
- [ ] Test on multiple devices/browsers

---

## 📚 Resources

- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages/
- **Next.js on Pages:** https://developers.cloudflare.com/pages/framework-guides/nextjs/
- **Supported Features:** https://github.com/cloudflare/next-on-pages/blob/main/packages/next-on-pages/docs/supported.md
- **Cloudflare Community:** https://community.cloudflare.com/

---

## 🎉 Summary

Your portfolio is configured for Cloudflare Pages with:
- ✅ Full Next.js SSR support
- ✅ Edge runtime (Workers)
- ✅ GitHub auto-deployment
- ✅ Custom domain ready
- ✅ Free tier (unlimited bandwidth)
- ✅ Global CDN

Just push to GitHub and let Cloudflare handle the rest! 🚀

---

## ⚠️ Important Notes

1. **Local builds won't work** on Windows ARM64 - this is normal and expected
2. **Development still works** - `npm run dev` works fine
3. **Builds happen on Cloudflare** - Their servers are x64 Linux
4. **No local testing needed** - Use preview deployments for testing
5. **Free tier is generous** - No costs for personal portfolio sites

Need help? Check Cloudflare Community forums or documentation.
