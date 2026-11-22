# Deploy guide

This project is a Next.js app. The existing `README.md` is intentionally left untouched — this file is the setup guide for the portfolio site.

## 1. Verify locally

```bash
npm install
npm run build
npm run dev      # http://localhost:3000
```

## 2. Push to GitHub

The repo already has a remote configured:

```bash
git remote -v
# origin  https://github.com/ranjith11102007/ranjith11102007.git
```

Commit and push:

```bash
git add .
git commit -m "Build interactive 3D portfolio"
git push origin main
```

If GitHub asks for authentication, use a Personal Access Token or the GitHub CLI (`gh auth login`).

## 3. Deploy on Vercel (free)

1. Go to <https://vercel.com/new> and sign in with GitHub.
2. Import `ranjith11102007/ranjith11102007`.
3. Vercel detects **Next.js** automatically — no build command changes needed.
4. Add one environment variable (optional but recommended):
   - `NEXT_PUBLIC_SITE_URL` = your deployment URL, e.g. `https://ranjith11102007.vercel.app`
5. Click **Deploy**. Every future push to `main` auto-deploys.

## 4. After the first deploy

- Copy the Vercel URL into `NEXT_PUBLIC_SITE_URL` in the Vercel project settings and redeploy. This fixes the social-share preview URL in metadata.
- Optional: add a custom domain under **Settings → Domains**.
- The contact form uses FormSubmit. The **first** time someone submits it, GitHub/Vercel-independent email confirmation is sent to `ranjitht323748@gmail.com`; approve it once. The copy-email button always works as a fallback.

## 5. Notes

- 3D scene loads only in the hero, pauses when offscreen or in a background tab, and is disabled for `prefers-reduced-motion`.
- GitHub follower count is fetched live from the public GitHub API (rate-limited). If it fails, the UI shows `—` instead of a fake number.
- Contribution graph is a third-party SVG (`ghchart.rshah.org`). If that service is down, the rest of the page is unaffected.
