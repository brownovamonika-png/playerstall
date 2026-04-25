# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at http://localhost:4321
npm run dev:clean    # Wipe .astro/dist caches, then dev
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
```

No test runner is configured. TypeScript type checking is done via `@astrojs/check` (invoked automatically during build).

## Architecture

This is an **Astro 5** website for PlayerStall, a custom wood sports locker manufacturer. It is deployed to Vercel.

### Page routing

- `src/pages/` — file-based routing. Most pages are hand-authored `.astro` files.
- **Programmatic SEO pages** generate routes from data defined in `src/lib/programmatic-pages.ts`:
  - `[state]-[sport]-wood-lockers.astro` — 10 states × 5 sports
  - `[level]-[sport]-wood-lockers.astro` — e.g. collegiate-football, high-school-football
  - `wood-vs-metal-[sport]-lockers.astro` — 6 sports
  - `sport/[sport].astro` — sport landing pages
- **Blog** lives in `src/content/blog/` as MDX files. Routes: `/blog/[slug]`, `/categories/[category]`, `/tags/[tag]`, `/blog/archives/[period]`.
- Legacy HTML URL redirects are handled in `astro.config.mjs`.

### Content system

- `src/content/config.ts` — Astro Content Collections schema for the `blog` collection. Frontmatter fields: `title`, `description`, `category`, `tags`, `datePublished`, `dateModified`, `readTime`, `author`, `heroImage`, `heroImageAlt`, `faqs`, `draft`.
- Blog posts with `draft: true` are excluded from listings.
- `src/lib/blog-hero.ts` — hero image resolution logic for blog posts.

### Layouts

- `src/layouts/BaseLayout.astro` — root layout with `<head>`, GTM, Vercel Analytics/Speed Insights, nav, and footer. Props: `title`, `description`, `ogImage`, `ogImageAlt`, `canonical`, `isArticle`, `headerBlack`.
- `src/layouts/BlogPostLayout.astro` — wraps BaseLayout for blog posts, injects Article + FAQ schema.
- `src/layouts/BlogLayout.astro` — listing/index layout.

### Room planner

The interactive locker room planner is a substantial client-side TypeScript application in `src/room-planner/`:

- `types.ts` — all shared types: `PlannerState`, `LockerInstance`, `Wall`, `Opening`, `Camera`, etc.
- `state.ts` — state management
- `catalog.ts` — loads locker templates from `src/data/locker-templates/*.json`
- `geometry.ts` — 2D layout math (wall snap, clearance checks)
- `pricing.ts` — per-locker price calculation from template pricing tables
- `render.ts` — 2D canvas renderer
- `render3d.ts` — 3D preview using Three.js (`three` package)
- `units.ts` — unit conversion (in/cm/mm/ft)

Locker product definitions live in `src/data/locker-templates/*.json` — one file per SKU (pro, semi-pro, stadium, varsity, model-l, model-s, model-x, model-z). Each defines geometry, pricing, colors, and accessories.

The room planner has two route families: `/room-planner` (original), `/room-planner-v2/`, and `/new-room-planner/`.

### API / serverless

`api/send-room-plan.ts` — Vercel serverless function (`@vercel/node`). Called by the room planner to send a dual email (customer + sales) via **MailerSend** with an optional PDF attachment.

Required environment variable: `MAILERSEND_API_TOKEN`. Optional: `MAILERSEND_FROM_EMAIL` (defaults to `sales@playerstall.com`).

### SEO utilities

- `src/utils/schema.ts` — functions for generating Schema.org JSON-LD: `generateProductSchema`, `generateArticleSchema`, `generateFAQSchema`, `generateBreadcrumbSchema`, `generateLocalBusinessSchema`.
- Canonical URLs are auto-generated in BaseLayout; trailing slashes are stripped (except homepage).
- Images are served from BunnyCDN: `https://playerstall.b-cdn.net/`.

### Scripts

`scripts/` contains one-off Node.js and Python scripts for content migration (WordPress → MDX), image processing, SEO audits, and blog maintenance. These are not part of the build.
