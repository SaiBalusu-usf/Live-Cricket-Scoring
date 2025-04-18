# Live Cricket Site (Vercel‑ready)

A **Next.js 14** app that scrapes live scores from **CricClubs** and exposes them through a serverless API.  
The UI updates every 15 seconds with slick animations, and the `/overlay` route is sized for OBS overlays.

## Quick start

```bash
# 1. Install deps
pnpm i            # or yarn / npm install

# 2. Dev server
pnpm dev          # http://localhost:3000
```

## Deploy to Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).  
2. Sign in to Vercel → **Add New Project** and import the repo.  
3. Keep all defaults (Framework: *Next.js*, Root Directory: `/`).  
4. Click **Deploy**.  
5. Grab the generated `https://<project‑name>.vercel.app` URL – this is your public endpoint.  
   *OBS overlay:* `https://<project‑name>.vercel.app/overlay`

No extra env vars are needed.

## Folder structure

```
app/            # Next.js (app router)
  api/score/    # Serverless scraping function
  overlay/      # Minimal overlay page
  page.js       # Main dashboard
public/         # Static assets (empty for now)
styles/         # Tailwind CSS
```

---

Feel free to adjust the scraping selectors or add batsman/bowler stats in `app/api/score/route.js`.
