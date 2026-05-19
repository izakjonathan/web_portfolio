# Izak Studio Portfolio

A deployable Next.js portfolio web app for graphic design, web development, interface systems, and creative experiments.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Upload/push this folder to GitHub.
2. In Vercel, create a new project from the GitHub repo.
3. Use these settings:
   - Framework preset: Next.js
   - Install command: `npm install`
   - Build command: `npm run build`
   - Output directory: leave empty / default
4. Deploy.

## Edit portfolio projects

Edit project content in:

```txt
src/data/projects.ts
```

Each project automatically gets:

```txt
/projects/[slug]
```

## Main files

```txt
src/app/page.tsx              Homepage
src/app/projects/page.tsx     Portfolio index
src/app/projects/[slug]/page.tsx Project case-study page
src/app/lab/page.tsx          Experiment/lab page
src/app/about/page.tsx        About page
src/app/contact/page.tsx      Contact page
src/app/globals.css           Full visual system and responsive styling
src/data/projects.ts          Portfolio content
src/components/Nav.tsx        Navigation
src/components/ProjectCard.tsx Project card component
src/components/SiteShell.tsx  Shared background/shell
```
