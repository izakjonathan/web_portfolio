# Izak Portfolio — Consolidated Smooth Build

This build consolidates the app and removes the expensive mobile scroll/parallax logic that caused iPhone jank.

## What changed

- The hero graphic is now a real `<img>` element, not a huge fixed animated background.
- The hero graphic starts at the top of the page and is full viewport width.
- No mobile breakpoint changes the hero graphic scale or placement.
- No scroll listener updates CSS every frame.
- Grain animation is disabled on mobile for smoother Safari scrolling.
- Profile image keeps the uploaded aspect ratio and overflows 10px beyond the right screen edge.
- No package-lock.json.

## Vercel

Use defaults, or:

- Install Command: `npm install --no-package-lock --no-audit --no-fund`
- Build Command: `npm run build`
- Output Directory: leave empty
