# Quick Deployment Reference

## ⚡ TL;DR - Deploy in 5 Minutes

### 1️⃣ Push to GitHub
```bash
git add .
git commit -m "Configure for Cloudflare Pages"
git push origin main
```

### 2️⃣ Cloudflare Setup
1. Go to: https://dash.cloudflare.com/
2. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Select your repo
4. Build settings:
   - **Framework preset:** **None** ⚠️ (NOT "Next.js")
   - Build command: `npm run build`
   - Output directory: `out`
5. **Save and Deploy**

### 3️⃣ Add Custom Domain
1. In Pages project → **Custom domains** → **Set up a custom domain**
2. Enter: `www.atonu.online`
3. Click **Activate domain**

### 4️⃣ Done! 🎉
- Your site will be live at: `https://www.atonu.online`
- Automatic HTTPS ✓
- Auto-deploy on git push ✓

---

## 📝 Build Settings

| Setting | Value |
|---------|-------|
| Framework preset | **None** (NOT Next.js) |
| Build command | `npm run build` |
| Output directory | `out` |
| Node version | 20.18.1 |
| Framework | Next.js (Static Export) |

## 🔗 Important URLs

- **Cloudflare Dashboard:** https://dash.cloudflare.com/
- **Pages Docs:** https://developers.cloudflare.com/pages/
- **Your Site:** https://www.atonu.online (after setup)

## 🆘 Common Issues

**Build error: "@opennextjs/cloudflare not supported"**
- **Fix:** Change Framework preset to "None" in Cloudflare Pages settings
- Go to Settings → Builds & deployments → Edit configurations
- Set Framework preset to **"None"** instead of "Next.js"

**Build fails?**
- Run `npm run build` locally first
- Check Cloudflare build logs

**Domain not working?**
- Wait 2-5 minutes for DNS propagation
- Check DNS at: https://dnschecker.org/

**Changes not showing?**
- Clear browser cache (Ctrl+Shift+R)
- Check latest deployment in Cloudflare Dashboard

---

📖 **Full guide:** See [DEPLOYMENT.md](DEPLOYMENT.md)
