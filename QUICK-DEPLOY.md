# Quick Cloudflare Pages Deployment
## Deploy Next.js to www.atonu.online

> **Windows ARM64 Note:** Local Cloudflare builds won't work on your machine, but deployment via GitHub works perfectly! Cloudflare builds on their servers (x64 Linux).

---

## ⚡ Deploy in 3 Steps

### 1️⃣ Push to GitHub
```bash
git add .
git commit -m "Configure for Cloudflare Pages"
git push origin master
```

### 2️⃣ Create Cloudflare Pages Project
1. Go to https://dash.cloudflare.com/
2. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Select your repository
4. **Build settings:**
   - **Framework preset:** Next.js (Advanced) ⚡
   - **Build command:** `npx @cloudflare/next-on-pages`
   - **Output directory:** `.vercel/output/static`
5. Click **"Save and Deploy"**

### 3️⃣ Add Custom Domain
1. In your Pages project → **Custom domains**
2. Add: `www.atonu.online`
3. Click **"Activate domain"**

**Done!** 🎉 Your site will be live at `https://www.atonu.online`

---

## 🎯 What You Get

✅ **Full Next.js SSR** - Server components, API routes  
✅ **Edge Runtime** - 270+ cities globally  
✅ **Auto HTTPS** - SSL included  
✅ **Auto-deploy** - Push to GitHub → auto-deploys  
✅ **Unlimited bandwidth** - Free tier  

---

## 🔄 Future Updates

```bash
# Make changes
git add .
git commit -m "Update site"
git push origin master

# Cloudflare auto-deploys! ✅
```

---

## 📖 Full Guide

See [CLOUDFLARE-DEPLOY-GUIDE.md](CLOUDFLARE-DEPLOY-GUIDE.md) for complete instructions, troubleshooting, and advanced configuration.

---

## 💻 Local Development

```bash
npm run dev  # Works fine on ARM64!
```

Local development works perfectly. Only Cloudflare build tools need x64, but builds happen on Cloudflare's servers, not locally.

---

## 🐛 Common Issues

**Build fails in Cloudflare?**
- Check build logs in Cloudflare dashboard
- Ensure framework preset is "Next.js (Advanced)"

**Domain not working?**
- Wait 2-5 minutes for DNS propagation
- Check at: https://dnschecker.org/

---

**Need help?** Check the [full deployment guide](CLOUDFLARE-DEPLOY-GUIDE.md).
