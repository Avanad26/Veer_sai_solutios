# Veer Sai Water Solutions — Website

React + Vite + Tailwind CSS project.

## Setup

```bash
npm install
npm run dev
```

## Adding the Bubble Video

The scroll-driven background requires your bubble video.
In `src/components/ScrollBg.jsx`, replace:

```js
const VIDEO_URL = 'REPLACE_WITH_YOUR_BUBBLE_VIDEO_URL'
```

**Option 1 — Host on a CDN** (recommended):
Upload your MP4 to Cloudinary, S3, or any CDN and paste the direct URL.

**Option 2 — Serve locally**:
Place your MP4 in the `public/` folder:
```
public/bubble.mp4
```
Then set:
```js
const VIDEO_URL = '/bubble.mp4'
```

## Project Structure

```
src/
  components/
    Navbar.jsx       — Fixed nav with VS logo, links, Free Consultation CTA
    Hero.jsx         — Full-height hero with dual-video crossfade background
    ScrollBg.jsx     — Fixed scroll-driven bubble video canvas background
    CardsSection.jsx — 3-card reveal section (scroll-driven mask animation)
    SectionThree.jsx — Blur-in stats section
  App.jsx            — Root layout
  index.css          — Tailwind + global styles + liquid-glass utility
```

## Design Decisions

- **Hero background**: dual-video seamless crossfade (two instances offset by half duration)
- **Scroll background**: frame-extracted canvas, scroll position drives frame index
- **Cards**: fixed-position reveal with CSS mask sweep (left→right on desktop, top→bottom mobile)
- **Section 3**: IntersectionObserver blur-in animation
- **Fonts**: Josefin Sans (headings) + Barlow (body)
- **Brand color**: `#1a3a5c` (deep navy)
- **Background**: `#edf1f6` (pearl white)

## Build

```bash
npm run build
```

Output goes to `dist/` — ready to deploy to Netlify, Vercel, or GitHub Pages.
