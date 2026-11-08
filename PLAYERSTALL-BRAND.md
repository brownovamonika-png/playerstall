# PlayerStall Visual Brand — Current State Audit

**Audit date:** 2026-08-10  
**Scope:** Live site styles as implemented in source (no redesign).  
**Primary system of record:** `src/layouts/BaseLayout.astro` (site chrome + global rules), with page-level and blog-scoped variants noted below.

---

## 1. Brand identity summary

PlayerStall’s live visual brand is a **high-contrast athletic / industrial** look:

- **Wordmark-first logo** (text “PLAYERSTALL”, not an image mark in the header)
- **Oswald** for display / headings; **Yantramanav** for UI and body
- **Signal orange** `#fe5900` as the only strong accent
- **Black / near-black** for chrome and type; **white** page grounds
- **Square corners everywhere** (site-wide `border-radius: 0 !important`)
- **Uppercase + role-based letter-spacing** (nav `0.3em`, labels often `6–8px`, CTAs `0.1–0.15em`, large titles sometimes tight/negative — see §7.2)

---

## 2. Logos & brand marks

### 2.1 Live / in-use marks

| Asset / treatment | How it’s used | Source |
|---|---|---|
| **Text wordmark `PLAYERSTALL`** | Primary site logo in header (`<a class="logo"><h1>PLAYERSTALL</h1></a>`). Oswald 600, 43px desktop / 24px mobile, uppercase, `letter-spacing: 0.05em`. White over heroes; black when header is scrolled or `headerBlack`. | `src/layouts/BaseLayout.astro` (markup ~124–126; styles `.logo` / `.logo h1`) |
| **CDN `logoblack2.png`** | Default Open Graph / Twitter image; LocalBusiness / publisher schema logo; author avatar fallback. URL: `https://playerstall.b-cdn.net/images/logoblack2.png` | `src/layouts/BaseLayout.astro` (props `ogImage`); `src/utils/schema.ts`; `src/pages/index.astro`; `src/pages/contact.astro`; `src/layouts/BlogPostLayout.astro`; `src/components/AuthorBio.astro`; `src/pages/blog/[slug].astro` |
| **Favicon** | Declared as `/favicon.svg` in layout head (file not present in `public/` at audit time). | `src/layouts/BaseLayout.astro` (line ~78) |
| **Custom cursor** | Cartoon orange football: `/cursor-football.png` | `src/layouts/BaseLayout.astro` (`body` cursor); file: `public/cursor-football.png` |

### 2.2 Logo files on disk (mostly experimental / unused in live chrome)

**Catalog / preview:** `public/logos/preview.html` (“PlayerStall Logo Variations”)

**PNG wordmark / concept assets (`public/logos/`):**
- `playerstall-header-logo.png`
- `playerstall-header-logo-original.png`
- `playerstall-logo-elegant.png`
- `playerstall-logo-graphic.png`
- `playerstall-logo-typography-shirt.png`

**SVG experiments (`public/logos/`):** ~80 files (`logo-01-…` through `logo-58-…`, plus named variants such as `logo-sport-team-clean.svg`, `logo-sport-team-wordmark.svg`, `logo-elegant-minimal.svg`, `logo-typography-shirt.svg`, etc.). These are **not** wired into `BaseLayout` nav; they are design explorations.

**Product / content imagery (not the brand mark):**
- `/images/custom-logo-example.png` — team logo on locker examples (`src/pages/shop.astro`, product/PDF pages)
- CDN `lock-box.png`, etc. — product photography

---

## 3. Typography

### 3.1 Google Fonts load (public site)

```
Yantramanav: 400, 500
Oswald: 600, 700
Roboto: 400
```

**Source:** `src/layouts/BaseLayout.astro`  
`<link href="https://fonts.googleapis.com/css?family=Yantramanav:500,400|Oswald:600,700|Roboto:400&display=swap" />`

### 3.2 Admin font load (extra weight)

```
Yantramanav: 400, 500, 700
Oswald: 600, 700
```

**Source:** `src/layouts/AdminLayout.astro`

### 3.3 PDF / email embed fonts (local TTFs)

| File | Role |
|---|---|
| `public/fonts-pdf/Oswald-SemiBold.ttf` | Display / wordmark (mapped as Oswald bold in PDF) |
| `public/fonts-pdf/Oswald-Bold.ttf` | Available bold Oswald |
| `public/fonts-pdf/Yantramanav-Regular.ttf` | Body 400 |
| `public/fonts-pdf/Yantramanav-Medium.ttf` | Labels (aliased as italic style in PDF helper) |
| `public/fonts-pdf/Yantramanav-Bold.ttf` | Subheads / totals 700 |

**Source:** `src/room-planner/pdfFonts.ts`; files under `public/fonts-pdf/`

### 3.4 Role mapping (live site)

| Role | Family | Typical weights | Source |
|---|---|---|---|
| Global body / UI | `'Yantramanav', 'Roboto', Arial, sans-serif` | 400, 500 | `BaseLayout.astro` `:global(html)` |
| Display / headings | `'Oswald', sans-serif` | 600, 700 | Widespread; e.g. logo, footer h4, homepage sections |
| Fallback body | `'Roboto', Arial, sans-serif` | 400 | Loaded in BaseLayout; used sparsely (e.g. some `.btn` on how-it-works) |
| Blog CSS vars | `--font-heading: Oswald`; `--font-body: Yantramanav…` | — | `src/styles/blog.css` |

### 3.5 Heading & type patterns

| Pattern | Spec | Source |
|---|---|---|
| Nav logo wordmark | Oswald 600, 43px (24px ≤768px), uppercase, `letter-spacing: 0.05em` | `BaseLayout.astro` `.logo h1` |
| Nav links | Yantramanav 500, 13px, uppercase, `letter-spacing: 0.3em` | `BaseLayout.astro` `.nav-links a` |
| Dropdown items | 12px, `letter-spacing: 0.15em` | `BaseLayout.astro` `.nav-dropdown-menu a` |
| Top-bar “FOLLOW US” | Yantramanav 500, 12px, uppercase, `letter-spacing: 0.1em` | `BaseLayout.astro` `.top-bar-right span` |
| Quote of day | Yantramanav 400, 13px, `#e0e0e0`; label 500 `#b6b6b6` | `BaseLayout.astro` |
| Footer section titles | Oswald 600, 18px, lowercase (main columns) or uppercase (quick contact), `letter-spacing: 0.05em` / `0.1em` | `BaseLayout.astro` |
| Footer body | Yantramanav 14px, `#cccccc`, line-height 1.8 | `BaseLayout.astro` |
| Homepage hero title | Oswald 600, 52px (42px tablet / 32px small), uppercase, `letter-spacing: 2px`, white | `src/pages/index.astro` `.hero-slide-title` |
| Homepage section title | Oswald 700, `clamp(36px, 4vw, 56px)`, uppercase, `#0d0d0d` | `index.astro` `.ts-section-title` |
| Homepage section label | Yantramanav 15px, uppercase, `letter-spacing: 6px`, `#8c8c8c` | `index.astro` `.ts-section-label` |
| Shop section titles | Oswald 700, `clamp(32px, 4vw, 52px)`, uppercase | `index.astro` `.home-shop-section-title` |
| Shop section eyebrow | Yantramanav 13px, uppercase, `letter-spacing: 6px`, `#8c8c8c` | `index.astro` `.home-shop-section-subtitle` |
| Materials stack (homepage) | See §3.5a — centered 900px container | `index.astro` Materials We Use block |
| Product info H2 | Oswald 600, 32px, uppercase, `letter-spacing: 0.02em` | e.g. `src/pages/product-varsity-locker.astro` `.product-info-heading` |
| Blog post title | Oswald 700, `clamp(28px, 5vw, 48px)`, uppercase, `letter-spacing: -0.5px` | `BlogPostLayout.astro` `.blog-post-title` |
| Blog H2 / H3 | Oswald 700/600, 24px / 20px, uppercase | `BlogPostLayout.astro` |
| Blog body | Yantramanav 18px / line-height 1.8, color muted `#8c8c8c` | `BlogPostLayout.astro` |
| Blog page banner H1 | Oswald 700, `clamp(24px, 4vw, 36px)`, uppercase, `letter-spacing: 3px`, white on black | `src/styles/blog.css` `.page-banner h1` |
| Pull quote | Oswald 600 quote + 1.7rem text; cite Yantramanav 500 | `BaseLayout.astro` `:global(.pull-quote)` |
| Global body line-height | `1.6` | `BaseLayout.astro` `:global(body)` |

**Repeated type rules:** uppercase for brand chrome, CTAs, and most display headings; **letter-spacing is intentional and varies by role** (see §7.2 — not one global tracking value); Oswald never used for long body copy.

### 3.5a Materials We Use container (favorite stack)

Homepage block at `index.astro` (`.home-shop-section` + `.ts-spotlight-inner-centered`). Outer container `1300px`; content stack `max-width: 900px`, centered, white background. Type layers top → bottom:

| Layer | Class | Font | Size | Tracking | Color | Notes |
|---|---|---|---|---|---|---|
| Eyebrow | `.home-shop-section-subtitle` | Yantramanav | 13px | `6px` | `#8c8c8c` | “THE LOCKER ROOM” |
| Title | `.home-shop-section-title` | Oswald 700 | `clamp(32px, 4vw, 52px)` | none | `#0d0d0d` | Condensed look is the face |
| Position link | `.ts-spotlight-position` | Yantramanav | 13px | `4px` | `#8c8c8c` | “PREMIUM MATERIALS COLLECTION” |
| Meta row | `.ts-spotlight-meta` | Yantramanav | 14px | — | `#8c8c8c` | Pipe separators; links `#fe5900` |
| Body | `.ts-spotlight-bio` | Yantramanav | 15px | — | `#666666` | `line-height: 1.8` |
| CTA | `.ts-btn.ts-btn-filled` | Oswald 600 | 14px | `3px` | `#fff` on `#000` | `16px 40px` padding; hover `#fe5900` |

Brand board: **Example 26**.

---

## 4. Color palette

### 4.1 Primary brand colors

| Token (informal) | Hex | Role | Sources |
|---|---|---|---|
| **Accent orange** | `#fe5900` | CTAs, hovers, cart badge, accents, links on dark CTAs | `BaseLayout.astro`, `blog.css` `--color-accent`, product pages, admin, homepage |
| **Accent hover (darker)** | `#e04d00` | Primary button hover (most marketing/product/admin pages) | e.g. `how-it-works.astro`, `product-varsity-locker.astro`, `AdminLayout.astro`, `index.astro` `.ts-match-cta:hover` |
| **Accent hover (blog)** | `#d94e00` | Blog solid button hover | `src/styles/blog.css` `--color-accent-dk` |
| **Text / primary near-black** | `#0d0d0d` | Body text, scrolled header, blog primary | `BaseLayout.astro`, `blog.css` `--color-primary` / `--color-text` |
| **Pure black** | `#000000` | Top bar, hero slide primary buttons, some hero fills | `BaseLayout.astro` `.top-bar`; `index.astro` `.btn-slide-primary` |
| **White** | `#ffffff` | Page bg, text on dark, solid CTAs | `BaseLayout.astro` `:global(html)` |
| **Footer dark gray** | `#1a1a1a` | Footer (and admin sidebar) | `BaseLayout.astro` `footer`; `AdminLayout.astro` |

### 4.2 Secondary / supporting neutrals

| Hex | Role | Sources |
|---|---|---|
| `#b6b6b6` | Top-bar social icons, muted labels | `BaseLayout.astro` |
| `#cccccc` | Footer links/text | `BaseLayout.astro` |
| `#8c8c8c` | Muted body / dates / section labels | Footer dates; `blog.css` `--color-muted`; homepage labels |
| `#e0e0e0` | Quote text; light borders | Top bar quote; product borders |
| `#e8e8e8` | Dropdown / card borders | `BaseLayout.astro` nav dropdown; many pages |
| `#333333` | Footer rule lines; secondary dark buttons | `BaseLayout.astro` footer borders; `how-it-works.astro` `.btn-secondary` |
| `#999999` | Footer copyright | `BaseLayout.astro` `.footer-bottom` |
| `#4a4a4a` | Pull-quote cite | `BaseLayout.astro` `.pull-quote cite` |
| `#f9f7f2` | Blog warm alt background | `blog.css` `--color-bg-alt` |
| `#e3dfd7` | Blog warm border / pull-quote rule | `blog.css` `--color-border`; `BaseLayout` pull-quote |
| `#f7f7f7` | Admin page ground; some form fields | `AdminLayout.astro`; room planner inputs |
| `#d0d0d0` | Admin secondary button border | `AdminLayout.astro` `.btn-secondary` |
| `rgba(254, 89, 0, 0.08)` | Nav dropdown item hover fill | `BaseLayout.astro` |
| `rgba(254, 89, 0, 0.05)` | Blog filter tab active fill | `blog.css` |
| `#ff7426` | Occasional link hover (how-it-works phone) | `how-it-works.astro` — **outlier**, not core palette |

### 4.3 Semantic usage rules (observed)

- Default links: `#0d0d0d` → hover `#fe5900` (`BaseLayout` `:global(a)`)
- Footer / dark chrome links: `#cccccc` → `#fe5900`
- Focus rings on forms often: border + `box-shadow: 0 0 0 1px #fe5900` (product pages)
- Checkbox / accent UI: `accent-color: #fe5900` (room planner)

---

## 5. Border radius

**Global rule: square corners.**

```css
:global(*),
:global(*)::before,
:global(*)::after {
  border-radius: 0 !important;
}
```

**Source:** `src/layouts/BaseLayout.astro` (end of layout `<style>`, comment: “Site-wide square corners”)

Also set explicitly on cart badge: `.cart-count { border-radius: 0; }` in same file.

**Exceptions that appear in source but are overridden by the global rule when BaseLayout wraps the page:** circular slider dots on homepage (`border-radius: 50%` in `index.astro`) — the global `!important` forces them square on live pages that use BaseLayout. Pages outside BaseLayout (e.g. some admin/print) may keep local radii unless they opt into the same rule.

**Admin / CRM:** many components also set `border-radius: 0` explicitly (`AdminLayout.astro`, admin client/order pages).

---

## 6. Buttons & CTA styles

There is **no single shared button component**; patterns repeat with small variations.

### 6.1 Pattern A — Solid accent primary (most common marketing/product/admin)

| Property | Value |
|---|---|
| Background / border | `#fe5900` |
| Text | `#ffffff` |
| Hover | `#e04d00` bg + border |
| Typography | Uppercase; often Yantramanav 500, `letter-spacing: 0.1em`–`0.15em` |
| Border | `2px solid` |
| Radius | 0 (global) |

**Sources:**  
`src/layouts/AdminLayout.astro` `.btn` / `.btn-primary`  
`src/pages/how-it-works.astro` `.btn` / `.btn-primary`  
`src/pages/product-varsity-locker.astro` (and sibling product pages) `.btn` / `.btn-primary`  
Homepage `.ts-match-cta` in `src/pages/index.astro`

**Typical paddings:**
- Admin: `10px 25px`, 12px type (`AdminLayout.astro`)
- How-it-works: `0.75rem 1.8rem`, ~0.85rem type
- Product add-to-cart: `15px 40px` / `16px 36px`, 16px type
- Match CTA: `0.79rem 1.92rem`, ~0.78rem type, `min-width: 139px`

### 6.2 Pattern B — Hero slide buttons (homepage)

| Class | Default | Hover |
|---|---|---|
| `.btn-slide-primary` | Black fill `#000`, white text, 2px black border | Orange fill `#fe5900` |
| `.btn-slide-secondary` | White fill, black text, 2px white border | Orange fill `#fe5900`, white text |

Shared: Yantramanav 500, 12px, uppercase, `letter-spacing: 0.15em`, padding `10px 25px`, `min-width: 136px`.  
**Source:** `src/pages/index.astro`

Related TopScorer-style variants on same page: `.ts-hero-btn-primary`, `.ts-btn-filled`, `.ts-btn-outline`, `.ts-btn-outline-dark`, etc. (black/white outline → orange or black hover).

### 6.3 Pattern C — Blog buttons

| Class | Default | Hover |
|---|---|---|
| `.btn` (outline) | Transparent, 2px `#fe5900`, orange text | Orange fill, white text |
| `.btn-solid` | Orange fill + white text | `#d94e00` |

Oswald 600, 12px, `letter-spacing: 1.5px`, padding `9px 26px`.  
**Source:** `src/styles/blog.css`

### 6.4 Pattern D — Secondary / dark

- Gray/dark fill `#333` with white text → orange on hover (`how-it-works.astro` `.btn-secondary`)
- White fill + `#d0d0d0` border (`AdminLayout.astro` `.btn-secondary`)
- Destructive red `#dc2626` / hover `#b91c1c` (admin only)

### 6.5 Cart badge (not a button, but CTA chrome)

Orange `#fe5900` square badge, white 10px/600 text, padding `2px 6px`.  
**Source:** `BaseLayout.astro` `.cart-count`

---

## 7. Spacing

Two different kinds of spacing show up in the brand:

1. **Layout spacing** — padding, gaps, container width (§7.1)
2. **Letter-spacing (tracking)** — space between letters; **deliberately different by element** (§7.2)

There is no single site-wide `letter-spacing`. Values range from tight/negative on large titles to very open on nav and section labels.

---

### 7.1 Layout spacing (boxes & gaps)

| Rule | Value | Source |
|---|---|---|
| Content max width | `1300px` | `BaseLayout` top bar, nav, footer; homepage containers; most marketing pages |
| Horizontal padding | `0 20px` on containers | Same |
| Nav link gap | `40px` | `BaseLayout` `.nav-links` / `.nav-container` gap |
| Navbar vertical padding | `20px 0` | `BaseLayout` `.navbar` |
| Top bar padding | `10px 0` | `BaseLayout` `.top-bar` |
| Footer grid | 4 columns → 2 @ ≤768px → 1 @ ≤640px; gap `3rem` | `BaseLayout` |
| Footer contact grid | 4 → 2 → 1 same breakpoints | `BaseLayout` |
| Blog layout | `1fr 300px` grid, gap `40px`, vertical padding `56px 0` | `blog.css` |
| Blog section title underline | `3px solid` accent under Oswald title | `blog.css` `.section-title` |
| Transitions | Often `color 0.3s` / `all 0.3s ease` | BaseLayout links, buttons |
| Programmatic pages | Sometimes `max-width: 1200px` (slight variant) | e.g. `[state]-[sport]-wood-lockers.astro` |

**Breakpoints (chrome):**
- `1024px` — hide quote of the day  
- `768px` — hide top bar; mobile hamburger nav; logo 24px  
- `640px` — single-column footer  

**Source:** `BaseLayout.astro` media queries; also documented in `AGENTS.md`.

---

### 7.2 Letter-spacing (tracking between letters)

Units mix **`em`** (site chrome, CTAs, product UI) and **`px`** (homepage labels, blog UI). Both are intentional.

#### System chrome — `src/layouts/BaseLayout.astro`

| Value | Used on | Selector |
|---|---|---|
| `0.3em` | Main nav links & dropdown triggers (widest chrome tracking) | `.nav-links a`, `.nav-dropdown-trigger`, mobile `.nav-menu-list a` |
| `0.15em` | Nav dropdown / submenu links | `.nav-dropdown-menu a`, `.nav-menu-dropdown-list a` |
| `0.12em` | Planner mobile drawer nav links | `body:has(.planner-hero)` `.nav-menu-list a` |
| `0.1em` | “FOLLOW US” label; footer quick-contact heading | `.top-bar-right span`, `.footer-quick-contact h4` |
| `0.05em` | Logo wordmark; footer column headings | `.logo h1`, `.footer-section h4` |
| `0.02em` | Pull-quote cite; top-bar quote text (near-body) | `.pull-quote cite`, `.quote-text` |

#### Homepage — `src/pages/index.astro`

| Value | Used on | Selector |
|---|---|---|
| `8px` | Vertical side labels; some slide subtitles | `.ts-vertical-text`, `.ts-slide-subtitle` |
| `6px` | Section / store / features / timer / shop subtitles | `.ts-section-label`, `.ts-timer-label`, `.ts-store-label`, `.ts-features-label`, `.home-shop-section-subtitle` |
| `4px` | Match info strip; spotlight position | `.ts-match-info`, `.ts-spotlight-position` |
| `3px` | Some buttons / category / feature tags / news | `.ts-btn`, `.ts-blog-card-category`, `.ts-features-tags span`, `.ts-news-category` |
| `2px` | Hero / slide titles; read-more; cart; brand tags | `.hero-slide-title`, `.ts-slide-title`, `.ts-read-more`, `.ts-add-to-cart`, `.ts-store-item-brand` |
| `1px` | Badges; some button variants | `.ts-badge`, some `.ts-btn` |
| `0.3px` | Hero / slide supporting text (tight body) | `.hero-slide-text`, `.ts-slide-text` |
| `0.3em` | Trending-stats subtitle | `.trending-stats-subtitle` |
| `0.22em` | Quote-strip role line | `.home-quote-strip-role` |
| `0.15em` | Hero CTAs; match CTA; shipping badge | `.btn-slide-primary/secondary`, `.ts-hero-btn`, `.ts-match-cta`, `.ts-shipping-badge` |
| `0.12em` | Trending stat labels | `.trending-stat-label` |
| `0.1em` | Shop overlay buttons, badges, categories | `.home-shop-details-btn-overlay`, `.home-shop-badge`, `.home-shop-product-categories` |
| `0.08em` | Fact labels; quote-strip background word; ship links | `.ts-fact-label`, `.home-quote-strip-bg-word`, `.ship-copy-link` |
| `0.06em` | Quote-strip numbers | `.home-quote-strip-num` |
| `0.05em` | Quote-strip name | `.home-quote-strip-name` |
| `0.02em` | Ship copy titles; quote lines | `.ship-copy-item-title`, `.home-quote-strip-quote-line` |

#### Blog listing / shared blog UI — `src/styles/blog.css`

| Value | Used on | Selector |
|---|---|---|
| `3px` | Page banner H1 | `.page-banner h1` |
| `2.5px` | Prev/next nav label | `.nav-label` |
| `2px` | Category label, section title, filter label, share label | `.category-label`, `.section-title`, `.filter-label`, `.share-label` |
| `1.5px` | Tags, filter tabs, outline/solid buttons, tags label | `.tag`, `.filter-tab`, `.btn`, `.tags-label` |
| `1px` | Listing post title | `.post-title` |
| `0.5px` | Share buttons | `.share-btn` |
| `0.4px` | Breadcrumb bar | `.breadcrumb` |
| `0.3px` | Post meta row; blockquote p; nav title | `.post-meta-row`, `.post-body blockquote p`, `.nav-title` |

#### Single blog post — `src/layouts/BlogPostLayout.astro`

| Value | Used on | Selector |
|---|---|---|
| `3px` | Breadcrumbs, meta, tags, share/author labels | `.blog-post-breadcrumbs`, `.blog-post-meta`, `.blog-post-tag`, `.blog-post-share-label`, `.blog-post-author-label` |
| `2px` | Prev/next text, CTA button; breadcrumbs on small screens | `.pn-text`, `.blog-post-cta-btn`; mobile `.blog-post-breadcrumbs` |
| `0` | In-article H2; blockquote heading/text | `.blog-post-body h2`, blockquote `h4`/`p` |
| **`-0.5px`** | Post title (tightened) | `.blog-post-title` |

#### Product pages (example: Varsity) — `src/pages/product-varsity-locker.astro`

| Value | Used on | Selector |
|---|---|---|
| **`-2px`** | Giant background product word (tightest) | `.product-background-text` |
| `0.1em` | Breadcrumbs, option labels, primary buttons | `.product-breadcrumbs`, `.option-label`, `.btn` |
| `0.05em` | Accessories, swatches, volume UI, quantity, subheads | `.accessory-box`, `.swatch`, `.volume-title`, `.volume-table th`, `.quantity-label`, `.product-info-subheading` |
| `0.02em` | Main product info heading | `.product-info-heading` |

#### How it works — `src/pages/how-it-works.astro`

| Value | Used on | Selector |
|---|---|---|
| `6px` | Hero subtitle | `.hiw-subtitle` |
| `0.25em` | CTA subtitle | `.hiw-cta-subtitle` |
| `0.2em` | CTA badge | `.hiw-cta-badge` |
| `0.1em` | Breadcrumbs, hero/CTA buttons | `.hiw-breadcrumbs`, `.hiw-btn`, `.btn` |
| `0.02em` | CTA title | `.hiw-cta-title` |

#### Admin — `src/layouts/AdminLayout.astro`

| Value | Used on | Selector |
|---|---|---|
| `0.15em` | Brand label, buttons, table headers | `.brand-label`, `.btn`, `table.data-table th` |
| `0.1em` | Stat card labels | `.stat-card .stat-label` |
| `0.08em` | Sidebar nav items, form labels | `.nav-item`, `.form-group label` |
| `0.05em` | Brand name, badges, empty-state titles | `.brand-name`, `.badge`, `.empty-state h3` |
| `0.02em` | Page titles; accessory form labels | `.page-title`, `.form-group label.crm-acc-label` |
| `1.5px` / `1px` | CRM guide title / step count | `.crm-guide-title`, `.crm-guide-step-count` |

#### Letter-spacing roles (how the brand uses tracking)

| Role | Typical tracking | Intent |
|---|---|---|
| **Main nav** | `0.3em` | Most open — athletic spaced caps |
| **Section / eyebrow labels** | `6px`–`8px` | Very open small uppercase labels |
| **CTAs / buttons (site chrome style)** | `0.1em`–`0.15em` | Open but less than nav |
| **Blog small UI (tags, buttons)** | `1.5px`–`2px` | Open caps in px |
| **Meta / breadcrumbs (blog post)** | `3px` | Open small labels |
| **Logo wordmark** | `0.05em` | Moderate open |
| **Large display titles** | `2px`, `0`, or **negative** (`-0.5px`, `-2px`) | Hero titles open slightly; long blog/product display titles tightened |
| **Body / supporting copy** | `0.02em`–`0.3px` or unset | Near default |

---



## 8. Header / chrome behavior

| State | Look | Source |
|---|---|---|
| Over hero (default) | Transparent header, white logo + nav | `BaseLayout` `header` |
| Scrolled past hero | White sticky header, `#0d0d0d` logo/nav | `header.scrolled` + JS in `BaseLayout` |
| `headerBlack` pages (blog etc.) | Black logo/nav from load | `body.header-black` rules |
| Planner pages | Force scrolled (solid) header; hide top bar; drawer nav | `body:has(.planner-hero)` overrides |

Sticky black top bar (`z-index: 1001`) sits above absolute header (`top: 40px`) on desktop.

---

## 9. Other repeated visual rules

1. **Square everything** — see §5.  
2. **Uppercase UI chrome** — nav, CTAs, section titles, category labels.  
3. **Orange = interaction** — hover, focus, active tabs, cart, accents.  
4. **No soft cards in core chrome** — nav dropdowns use flat white + light border `#e8e8e8` + soft shadow `0 8px 24px rgba(0,0,0,0.12)` (`BaseLayout`).  
5. **Category / section accent underline** — orange 2–3px under labels (`blog.css` `.category-label`, `.section-title`).  
6. **Pull quotes** — large typographic open-quote in warm gray `#e3dfd7` (`BaseLayout` `.pull-quote`; blog blockquotes use Georgia for the mark).  
7. **Custom football cursor** on `body` (`BaseLayout`).  
8. **External social icons** — Inline SVG (`currentColor`): Instagram, LinkedIn, X. Top bar **14×14** at `#b6b6b6` (gap `18px`); footer **18×18** at `#cccccc` (gap `1rem`). Hover → `#fe5900`. Handles: `@playerstalllockers`, `/company/playerstall/`, `@PlayerStallGear` (`BaseLayout.astro`).  
9. **Hero imagery** — full-bleed photo slides with dark overlay for type readability (`index.astro`).  
10. **Brand in PDFs/emails** — same Oswald + Yantramanav + `#0d0d0d` text (`pdfFonts.ts`, `roomPlanEmailTemplates.ts`).

---

## 10. CSS variables (blog-scoped only)

Defined on `.blog-page` in `src/styles/blog.css` (not global site tokens):

```css
--color-accent:    #fe5900;
--color-accent-dk: #d94e00;
--color-primary:   #0d0d0d;
--color-white:     #ffffff;
--color-text:      #0d0d0d;
--color-bg:        #ffffff;
--color-bg-alt:    #f9f7f2;
--color-border:    #e3dfd7;
--color-muted:     #8c8c8c;
--font-heading: 'Oswald', sans-serif;
--font-body:    'Yantramanav', 'Roboto', Arial, sans-serif;
```

Consumed by `BlogPostLayout.astro` and blog listing styles.

---

## 11. Key source file index

| Concern | Primary files |
|---|---|
| Global fonts, colors, links, header, footer, square corners | `src/layouts/BaseLayout.astro` |
| Blog tokens + listing/post chrome | `src/styles/blog.css`, `src/layouts/BlogPostLayout.astro` |
| Homepage heroes, section titles, slide CTAs | `src/pages/index.astro` |
| Shared product CTA pattern | `src/pages/product-*.astro` (e.g. `product-varsity-locker.astro`) |
| How-it-works CTA pattern | `src/pages/how-it-works.astro` |
| Admin chrome + buttons | `src/layouts/AdminLayout.astro` |
| Schema / OG logo URL | `src/utils/schema.ts`, `BaseLayout` props |
| Logo experiments | `public/logos/*`, `public/logos/preview.html` |
| PDF fonts | `public/fonts-pdf/*`, `src/room-planner/pdfFonts.ts` |
| High-level design notes (secondary) | `AGENTS.md` (Design System section) |

---

## 12. Notes / inconsistencies (documented, not fixed)

- **Two accent hover oranges:** `#e04d00` (most of site) vs `#d94e00` (blog `--color-accent-dk`).  
- **Button font inconsistency:** many CTAs use Yantramanav; blog buttons use Oswald; how-it-works `.btn` specifies Roboto.  
- **Live logo is typographic** (Oswald wordmark); dozens of SVG/PNG logo files in `public/logos/` are unused in site chrome.  
- **Favicon** referenced as `/favicon.svg` but not found under `public/` at audit time.  
- **Global `border-radius: 0 !important`** overrides intentional circular styles (e.g. slider dots) on BaseLayout pages.  
- Occasional outlier accent `#ff7426` on how-it-works phone hover.

---

## 13. Additional styles added to brand board (examples 23–24)

### Room-plan Order Summary (PDF page 2 / email)
- **Fonts:** Oswald (display wordmark + section titles) + Yantramanav (body, values, “Your email”)
- **Source:** `src/room-planner/pdfEstimate.ts`, `pdfBranding.ts`, `pdfFonts.ts`, `src/lib/roomPlanEmailTemplates.ts`
- **Page header:** `PLAYERSTALL` Oswald 700, `letter-spacing: 0.08em`; subtitle `Order summary · page N` in `#8c8c8c`
- **Panels:** `#f7f7f7` fill, `#e0e0e0` borders, strong rules `#cccccc`, square corners
- **Section titles:** `YOUR SELECTIONS` / `ORDER SUMMARY` — Oswald 700, uppercase, ~`2px` tracking
- **Field labels:** e.g. `PREFERRED DELIVERY TIMING` — muted caps `#8c8c8c`, ~`1.2px` tracking
- **Estimated Total:** large bold (~20px) `#0d0d0d`
- **Your email:** label `#8c8c8c` + white input-style box (`border: #e0e0e0`, Yantramanav 14px `#0d0d0d`)
- **Reference:** `public/images/brand-board/room-plan-order-summary-page2-reference.png`

### Dual logo — PLAYER + script “stall” + tagline
- **PLAYER:** Oswald 700, uppercase, tight tracking, `#0d0d0d`
- **stall:** **Best visual match: Turbinado** (Aerotype / Stephen Miggas) — dry-brush casual connected script (Regular or Dry weight). Charcoal `#4a4a4a`. Distinctive long horizontal **t**-crossbar. **Not** Great Vibes / Allura (those are smooth formal copperplate scripts; Paintboard HQ experiments used them incorrectly for this merch lockup). Exact commercial ID not confirmed via automated font tools (photo texture + overlap make matching hard); Turbinado is the closest match among dry-brush scripts with that signature long t-bar.
- **Tagline “EVERY GAME BEGINS HERE”:** Oswald, wide letter-spacing `0.28em`–`0.42em`, `#666666`
- **Sources:** Merch reference photo in `public/images/brand-board/`; Adobe Fonts / MyFonts (Turbinado); homepage section title in `src/pages/index.astro`. Authoritative specimen for “stall” is the photo — do not fake with Google script fonts.

### Social media icons
- **Networks:** Instagram, LinkedIn, X (inline SVG, `fill="currentColor"`)
- **Top bar:** 14×14, `#b6b6b6` → hover `#fe5900`, gap `18px`, next to “FOLLOW US:”
- **Footer:** 18×18, `#cccccc` → hover `#fe5900`, gap `1rem`
- **URLs:** `instagram.com/playerstalllockers`, `linkedin.com/company/playerstall/`, `x.com/PlayerStallGear`
- **Source:** `src/layouts/BaseLayout.astro` (`.social-icon`, `.footer-social-link`)

---

*This file is a factual audit of the current visual brand as coded. It intentionally does not propose redesigns.*
