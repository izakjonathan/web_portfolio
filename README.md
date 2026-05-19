# Izak Portfolio Fresh Vercel Build

This project was rebuilt from scratch as a minimal stable Next.js app.

## Important

There is deliberately NO `package-lock.json`.

## Vercel

Recommended: leave Vercel settings on default.

If you manually set commands:

- Install Command: `npm install --no-package-lock --no-audit --no-fund`
- Build Command: `npm run build`
- Output Directory: leave empty / default

## Repo root must contain

- app/
- components/
- data/
- public/
- package.json
- next.config.mjs
- vercel.json
- .npmrc
