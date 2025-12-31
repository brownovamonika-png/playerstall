# AGENTS.md - PlayerStall Project Reference

This document serves as a reference guide for AI agents working on the PlayerStall website project.

## Project Overview

**PlayerStall** is a modern, professional website for a sports locker business that serves customers across the United States. The company specializes in custom wood sports lockers for collegiate and professional teams, with 30+ years of experience and a lifetime guarantee.

### Key Business Information
- **Business Type**: Custom sports locker manufacturer
- **Target Market**: Collegiate and professional sports teams
- **Location**: Brooklyn, NY (7300-7398 Colonial Rd, Brooklyn, NY 11209, USA)
- **Contact Email**: info@customsportslockers.com
- **Website**: PlayerStall / CustomSportsLockers.com

## Tech Stack

- **Framework**: [Astro](https://astro.build) v4.0.0
- **Language**: TypeScript (strict mode)
- **Styling**: Modern CSS (scoped styles in Astro components)
- **Build Tool**: Astro's built-in build system
- **Package Manager**: npm

### Key Dependencies
- `astro`: ^4.0.0
- `typescript`: ^5.3.0
- `@astrojs/check`: ^0.9.0

## Project Structure

```
/
├── public/              # Static assets (images, logos, SVGs)
│   ├── images/         # Image assets
│   └── logos/          # Logo variations (50+ SVG files)
├── src/
│   ├── layouts/        # Layout components
│   │   └── BaseLayout.astro  # Main layout wrapper
│   ├── pages/          # Page components (file-based routing)
│   │   ├── index.astro        # Homepage
│   │   ├── about.astro         # About page
│   │   ├── services.astro      # Products/Services page
│   │   ├── locations.astro     # Locations page
│   │   ├── contact.astro       # Contact page
│   │   ├── shop.astro          # Shop page
│   │   ├── cart.astro          # Shopping cart
│   │   ├── checkout.astro      # Checkout page
│   │   ├── gallery.astro       # Gallery page
│   │   ├── hockey.astro        # Sport-specific page
│   │   ├── blog.astro          # Blog listing
│   │   ├── blog/               # Blog posts
│   │   ├── our-process.astro   # Process page
│   │   └── our-process-1.astro # Alternative process page
│   └── env.d.ts        # TypeScript environment definitions
├── dist/               # Build output (generated)
├── guides/             # Documentation and guides
├── html-files/         # Legacy HTML files
├── astro.config.mjs     # Astro configuration
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## Design System

### Typography

**Primary Fonts** (Google Fonts):
- **Yantramanav** (400, 500) - Main body text, navigation
- **Oswald** (600, 700) - Headings, logo, emphasis
- **Roboto** (400) - Fallback body text

**Font Usage Patterns**:
- Headings: `font-family: 'Oswald', sans-serif`
- Body/Navigation: `font-family: 'Yantramanav', sans-serif`
- Fallback: `font-family: 'Roboto', Arial, sans-serif`

### Color Palette

**Primary Colors**:
- **Primary Orange**: `#fe5900` - CTA buttons, hover states, accents
- **Black**: `#000000` - Top bar, text
- **Dark Gray**: `#1a1a1a` - Footer background
- **Text Dark**: `#0d0d0d` - Main text color
- **Text Light**: `#ffffff` - White text on dark backgrounds
- **Gray Text**: `#b6b6b6`, `#cccccc`, `#8c8c8c` - Secondary text

**Usage**:
- Hover states: `#fe5900` (orange)
- Links: `#cccccc` → `#fe5900` on hover
- Backgrounds: `#ffffff` (white), `#000000` (black), `#1a1a1a` (dark gray)

### Layout Patterns

**Container Width**: `max-width: 1300px` (standard container)
**Padding**: `padding: 0 20px` (standard horizontal padding)

**Grid Systems**:
- Footer: 4-column grid (responsive: 2 columns on tablet, 1 on mobile)
- Contact details: 4-column grid (responsive)

### Component Patterns

**Navigation**:
- Sticky top bar with quote of the day
- Absolute positioned header that becomes sticky on scroll
- Logo centered, nav links split left/right
- Cart link with dynamic count badge

**Buttons**:
- Primary: Orange background (`#fe5900`)
- Secondary: Outlined style
- Uppercase text, letter-spaced

**Hero Slider**:
- Full-width background images
- Overlay for text readability
- Multiple slides with rotation
- CTA buttons per slide

## Key Files and Their Purposes

### `src/layouts/BaseLayout.astro`
**Purpose**: Main layout wrapper used by all pages
**Key Features**:
- Top bar with quote of the day (rotating sports quotes)
- Navigation header (becomes sticky on scroll)
- Footer with 4-column layout
- Cart count management via localStorage
- Header scroll behavior JavaScript
- Social media links in top bar

**Props**:
- `title` (required): Page title
- `description` (optional): Meta description (defaults to "PlayerStall - Premium Sports Locker Solutions")

### `src/pages/index.astro`
**Purpose**: Homepage with hero slider and main content sections
**Key Features**:
- Hero slider with 4 slides
- Multiple content sections showcasing services
- Customer logos section
- Call-to-action sections

### Navigation Structure
```
HOME → / (index.astro)
PRODUCTS → /services (services.astro)
BY SPORT → /hockey (hockey.astro)
GALLERY → /gallery (gallery.astro)
ABOUT → /about (about.astro)
OUR PROCESS → /our-process (our-process.astro)
SHOP → /shop (shop.astro)
CART → /cart (cart.astro)
BLOG → /blog (blog.astro)
CONTACT → /contact (contact.astro)
```

## Development Guidelines

### File Naming Conventions
- **Pages**: kebab-case (e.g., `our-process.astro`)
- **Components**: PascalCase (e.g., `BaseLayout.astro`)
- **Assets**: kebab-case (e.g., `hockey-faceoff.png`)

### Code Style

**Astro Components**:
- Use frontmatter (`---`) for imports and TypeScript
- Scoped styles in `<style>` tags
- Client-side scripts in `<script>` tags
- Use Astro.props for component props

**CSS**:
- Use `:global()` for global styles
- Scoped styles by default
- Mobile-first responsive design
- Use CSS custom properties if needed

**TypeScript**:
- Strict mode enabled
- Type all props interfaces
- Use Astro's built-in types

### Responsive Breakpoints

Based on existing code:
- **Desktop**: Default (1300px max-width containers)
- **Tablet**: `@media (max-width: 1024px)` - Quote of day hidden
- **Mobile**: `@media (max-width: 768px)` - Top bar hidden, nav wraps
- **Small Mobile**: `@media (max-width: 640px)` - Single column layouts

### State Management

**Cart System**:
- Uses `localStorage` with key `playerstall_cart`
- Cart count updates via custom event: `cartUpdated`
- Cross-tab updates via `storage` event listener
- Format: Array of items with `quantity` property

**Quote of the Day**:
- Rotates every 6 seconds
- 15 sports quotes in rotation
- Stored in JavaScript array in BaseLayout

## Common Tasks and Workflows

### Adding a New Page

1. Create new `.astro` file in `src/pages/`
2. Import `BaseLayout` from `../layouts/BaseLayout.astro`
3. Wrap content in `<BaseLayout>` with appropriate `title` and `description`
4. Add navigation link in `BaseLayout.astro` if needed
5. Use existing component patterns for consistency

### Adding a New Blog Post

1. Create new `.astro` file in `src/pages/blog/`
2. Follow existing blog post structure
3. Update `blog.astro` listing page if needed
4. Update footer blog links in `BaseLayout.astro`

### Modifying Navigation

**Location**: `src/layouts/BaseLayout.astro` (lines 48-68)

**Structure**:
- Left nav links: `nav-links-left`
- Logo: Centered
- Right nav links: `nav-links-right`

**To Add/Remove Links**:
1. Add/remove `<li><a href="/path">LABEL</a></li>` in appropriate section
2. Ensure consistent styling (uppercase, letter-spaced)

### Updating Contact Information

**Locations to Update**:
1. Footer section in `BaseLayout.astro` (lines 75-146)
2. Contact page: `src/pages/contact.astro`
3. Top bar social links (if needed)

**Key Fields**:
- Address: 7300-7398 Colonial Rd, Brooklyn, NY 11209, USA
- Email: info@customsportslockers.com
- Phone: + (123) 124-567-8901 (placeholder - verify actual number)

### Working with Images

**Image Locations**:
- Static assets: `public/images/`
- Logos: `public/logos/`
- Page-specific: `public/` root

**Usage in Astro**:
- Reference from `/` root: `/images/filename.jpg`
- Or use relative paths from public folder

### Building and Deployment

**Development**:
```bash
npm run dev
# Runs on http://localhost:4321
```

**Production Build**:
```bash
npm run build
# Outputs to dist/ directory
```

**Preview Production**:
```bash
npm run preview
# Preview the production build locally
```

## Important Notes

### Current State
- Multiple logo variations exist in `public/logos/` (50+ SVG files)
- Some duplicate/experimental pages exist (`our-process.astro` and `our-process-1.astro`)
- Legacy HTML files in `html-files/` directory
- Blog structure includes both listing and individual post pages

### Known Patterns
- Quote of the day rotates sports-themed motivational quotes
- Cart uses localStorage (no backend integration visible)
- Header becomes sticky after scrolling past hero section
- Social media links in top bar (Facebook, Vimeo, Twitter, Pinterest, LinkedIn)

### Design Consistency
- Always use the established color palette
- Maintain typography hierarchy (Oswald for headings, Yantramanav for body)
- Follow container width patterns (1300px max-width)
- Ensure responsive behavior matches existing breakpoints

## SEO Expert Agent Guide

**Purpose**: This section provides comprehensive SEO guidance to ensure PlayerStall consistently improves rankings against competitors and captures organic search traffic.

### SEO Philosophy

**Core Principles**:
1. **Always think competitor-first** - Every SEO decision should consider how it positions us vs competitors
2. **User intent over keyword stuffing** - Create content that genuinely helps users
3. **Technical excellence** - Fix technical issues competitors ignore
4. **Content depth** - Out-depth competitors on every topic
5. **Local + Commercial intent** - Target location-based searches with high conversion potential

### Competitor Landscape

**Primary Competitors** (from analysis):
- **SchoolLockers.com** - #1 for "sports lockers" but vulnerable (9 HTML errors, missing alt tags, thin content)
- **Lockers.com** - High domain authority but poor technical SEO (deprecated HTML, bloated DOM)
- **Hollman.com** - Premium brand but weak SEO (no H1, generic titles, 21 render-blocking scripts)
- **AllWoodLockers.com** - Best technical score (97.07) but beatable with better content

**Key Competitive Advantages**:
- 30+ years experience (unique selling point)
- Made in Canada (differentiation)
- Lifetime guarantee (strong value prop)
- Custom design consultation (free service)
- Focus on collegiate/professional teams (niche expertise)

### On-Page SEO Checklist

**For Every Page Created/Updated**:

#### Meta Tags (Required)
- [ ] **Title Tag**: 50-60 characters, includes primary keyword, brand name
  - Format: `[Primary Keyword] | [Secondary Keyword] | PlayerStall`
  - Example: `Custom Sports Lockers | Wood Athletic Lockers Made in Canada | PlayerStall`
- [ ] **Meta Description**: 150-160 characters, includes CTA, key benefits
  - Must include: "30+ years experience", "Lifetime guarantee", "Free consultation"
- [ ] **H1 Tag**: One per page, includes primary keyword, matches user intent
- [ ] **H2-H6 Tags**: Proper hierarchy, include secondary keywords naturally

#### Content Quality
- [ ] **Minimum Word Count**: 1,500+ words for main pages, 2,000+ for blog posts
- [ ] **Readability**: Flesch-Kincaid score 60+ (aim for 8th-9th grade reading level)
- [ ] **Content Depth**: Answer user questions comprehensively, out-depth competitors
- [ ] **Keyword Density**: 1-2% for primary keyword, natural usage
- [ ] **LSI Keywords**: Include related terms (e.g., "athletic lockers", "team lockers", "custom lockers")

#### Technical SEO
- [ ] **Image Alt Tags**: Every image has descriptive alt text with keywords
  - Format: `[Sport] wood lockers for [location/team type]`
  - Example: `Custom football wood lockers for collegiate teams`
- [ ] **URL Structure**: Clean, keyword-rich, kebab-case
  - Good: `/texas-football-wood-lockers/`
  - Bad: `/page123` or `/products?id=456`
- [ ] **Internal Linking**: 3-5 relevant internal links per page
- [ ] **External Links**: 1-2 authoritative external links (sports organizations, NCAA, etc.)
- [ ] **Schema Markup**: Appropriate schema for page type (see Schema section)

#### Mobile & Performance
- [ ] **Mobile Responsive**: Test on mobile devices, ensure readability
- [ ] **Page Speed**: Aim for <3s load time, <100ms First Contentful Paint
- [ ] **Core Web Vitals**: Pass all metrics (LCP <2.5s, FID <100ms, CLS <0.1)
- [ ] **No Render-Blocking**: Minimize render-blocking CSS/JS

### Schema Markup Requirements

**Current Implementation**: Blog posts use Article + FAQPage schema

**Required Schema Types**:

#### 1. LocalBusiness Schema (Homepage, Contact, Location Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "PlayerStall",
  "image": "https://playerstall.com/images/logoblack2.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "7300-7398 Colonial Rd",
    "addressLocality": "Brooklyn",
    "addressRegion": "NY",
    "postalCode": "11209",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.6184,
    "longitude": -74.0302
  },
  "url": "https://playerstall.com",
  "telephone": "+11231245678901",
  "email": "info@customsportslockers.com",
  "priceRange": "$$",
  "serviceArea": {
    "@type": "Country",
    "name": "United States"
  },
  "areaServed": "US"
}
```

#### 2. Product Schema (Services/Product Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[Product Name]",
  "brand": {
    "@type": "Brand",
    "name": "PlayerStall"
  },
  "description": "[Product description]",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "349-599",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-12-31"
  }
}
```

#### 3. Article Schema (Blog Posts) - Already Implemented
- Use existing implementation in blog posts as template
- Include: headline, description, datePublished, author, publisher

#### 4. FAQPage Schema (Pages with FAQs)
- Use existing FAQPage implementation from blog posts
- Add to product pages, service pages where relevant

#### 5. BreadcrumbList Schema (All Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://playerstall.com"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "[Current Page]",
    "item": "https://playerstall.com/[current-page]"
  }]
}
```

### Keyword Strategy

#### Primary Keyword Categories

**1. Core Commercial Keywords** (High Priority)
- "custom sports lockers" (1,000+ monthly searches)
- "wood athletic lockers" (500+ monthly searches)
- "college locker room lockers" (300+ monthly searches)
- "professional sports lockers" (200+ monthly searches)

**2. Location + Sport Keywords** (Programmatic SEO - HIGH ROI)
- Pattern: `[State] [Sport] wood lockers`
- Examples: "Texas football wood lockers", "California basketball wood lockers"
- **Volume**: 15-170 searches/month per keyword
- **Competition**: LOW (11-25 competition index)
- **Strategy**: Create 100+ programmatic pages (see `guides/PRD_Programmatic_Page_Template.md`)

**3. Comparison Keywords** (Phase 2)
- "wood vs metal sports lockers" (200+ monthly searches)
- "wood vs metal football lockers" (100+ monthly searches)
- **Strategy**: Create comparison pages highlighting wood advantages

**4. Long-Tail Keywords** (Content Marketing)
- "how to choose sports lockers for college teams"
- "custom locker room design consultation"
- "athletic locker room installation process"
- **Strategy**: Target in blog content, FAQ sections

#### Keyword Research Tools & Methods
- **DataForSEO**: Primary tool for keyword research (see `guides/programmatic_keyword_ideas.md`)
- **Google Keyword Planner**: Verify search volumes
- **Competitor Analysis**: Identify keywords competitors rank for
- **Search Console**: Review actual search queries bringing traffic

### Content SEO Strategy

#### Blog Content Requirements

**Minimum Standards**:
- **Word Count**: 2,000+ words per post
- **Structure**: H1 → Introduction (300-400 words) → Main sections (400-500 words each) → Conclusion → CTA
- **Readability**: Flesch-Kincaid 60+ (8th-9th grade level)
- **Internal Links**: 5-10 relevant internal links
- **External Links**: 2-3 authoritative sources
- **Images**: 3-5 images with optimized alt tags
- **Schema**: Article + FAQPage schema

**Content Topics** (High SEO Value):
1. Sport-specific locker guides (football, hockey, basketball, etc.)
2. Wood vs metal comparisons
3. Locker room design guides
4. Installation and maintenance guides
5. ROI and recruiting impact content
6. State/school-specific content (programmatic)

#### Programmatic Content Strategy

**Template**: `[State] [Sport] Wood Lockers` pages
- **Target**: 100+ location pages
- **Word Count**: 1,500+ words per page
- **Structure**: See `guides/PRD_Programmatic_Page_Template.md`
- **Priority States**: Texas, California, Florida, New York, Ohio, Pennsylvania, Illinois, Michigan, North Carolina, Georgia
- **Priority Sports**: Football, Basketball, Hockey, Baseball, Soccer, Lacrosse

**Key Elements**:
- State-specific information
- Sport-specific locker requirements
- Local team examples (if available)
- Local service area emphasis
- Strong CTAs for free consultation

### Technical SEO Priorities

#### Critical Issues to Fix (Based on Competitor Analysis)

**1. Missing Meta Tags** (High Priority)
- Add Open Graph tags for social sharing
- Add Twitter Card tags
- Ensure all pages have unique meta descriptions

**2. Image Optimization** (High Priority)
- Add alt tags to ALL images (competitors missing 20-43 images)
- Optimize image file sizes (compress, use WebP format)
- Use descriptive filenames: `texas-football-wood-lockers.jpg` not `IMG_1234.jpg`

**3. Page Speed** (High Priority)
- Minimize render-blocking resources (competitors have 3-21 blocking scripts)
- Optimize CSS delivery
- Lazy load images below the fold
- Use Astro's built-in optimization features

**4. HTML Validation** (Medium Priority)
- Fix any HTML errors (competitors have 9-21 errors)
- Ensure proper tag closure
- Remove deprecated HTML tags

**5. Structured Data** (Medium Priority)
- Add LocalBusiness schema to homepage
- Add Product schema to product pages
- Add BreadcrumbList to all pages
- Validate schema with Google's Rich Results Test

### Local SEO Strategy

**Business Information** (Keep Consistent):
- **Name**: PlayerStall / CustomSportsLockers.com
- **Address**: 7300-7398 Colonial Rd, Brooklyn, NY 11209, USA
- **Phone**: + (123) 124-567-8901 (verify actual number)
- **Email**: info@customsportslockers.com

**Local SEO Checklist**:
- [ ] Google Business Profile created and optimized
- [ ] NAP (Name, Address, Phone) consistent across all pages
- [ ] LocalBusiness schema on homepage
- [ ] Location pages for major markets
- [ ] Local citations (Yelp, Yellow Pages, industry directories)
- [ ] Local content (mention local teams, facilities, installations)

### Link Building Strategy

**Internal Linking**:
- Link from homepage to key service pages
- Link from blog posts to relevant product pages
- Create topic clusters (hub pages linking to related content)
- Use descriptive anchor text with keywords

**External Link Building**:
- **Target Sites**: Sports organizations, NCAA, athletic associations, school directories
- **Content Types**: Guest posts, resource pages, directory listings
- **Anchor Text**: Natural, branded, and keyword variations
- **Quality Over Quantity**: Focus on authoritative, relevant sites

**Link Opportunities**:
- Athletic department websites (if we've worked with them)
- Sports facility directories
- Locker room design resources
- School equipment supplier directories

### Competitor Monitoring

**Regular Checks** (Monthly):
1. **Ranking Positions**: Track rankings for target keywords vs competitors
2. **New Content**: Monitor competitor blog posts and new pages
3. **Backlink Profile**: Check competitor backlinks (Ahrefs, SEMrush)
4. **Technical Changes**: Monitor competitor site updates
5. **Content Gaps**: Identify topics competitors cover that we don't

**Tools**:
- Google Search Console (our rankings)
- Ahrefs / SEMrush (competitor analysis)
- DataForSEO (keyword research)
- Google Analytics (traffic analysis)

### SEO Performance Metrics

**Track Monthly**:
- **Organic Traffic**: Total sessions from search
- **Keyword Rankings**: Positions for target keywords
- **Click-Through Rate**: CTR from search results
- **Conversion Rate**: Organic traffic → leads/contacts
- **Backlinks**: New referring domains
- **Core Web Vitals**: Performance metrics

**Goals**:
- **6 Months**: 30-40% increase in organic traffic
- **12 Months**: Top 3 rankings for 10+ target keywords
- **Ongoing**: Outrank competitors on key terms

### SEO Best Practices for Developers

**When Creating New Pages**:
1. ✅ Include unique title tag (50-60 chars) with primary keyword
2. ✅ Write compelling meta description (150-160 chars) with CTA
3. ✅ Use H1 tag with primary keyword (one per page)
4. ✅ Add proper heading hierarchy (H2-H6)
5. ✅ Include 1,500+ words of quality content
6. ✅ Add alt tags to all images with keywords
7. ✅ Include 3-5 internal links to related pages
8. ✅ Add appropriate schema markup
9. ✅ Ensure mobile responsiveness
10. ✅ Optimize page speed (<3s load time)

**When Updating Existing Pages**:
1. ✅ Review and improve meta tags if needed
2. ✅ Add more content depth (aim for 1,500+ words)
3. ✅ Update internal links to new content
4. ✅ Refresh outdated information
5. ✅ Add schema markup if missing
6. ✅ Optimize images (alt tags, file size)

**Code-Level SEO Considerations**:
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
- Ensure proper heading hierarchy (don't skip H2 to H4)
- Use descriptive link anchor text (avoid "click here")
- Implement lazy loading for images below fold
- Minimize JavaScript for critical rendering path
- Use Astro's built-in optimizations (image optimization, code splitting)

### Quick SEO Reference

**Title Tag Format**: `[Primary Keyword] | [Secondary Keyword] | PlayerStall` (50-60 chars)
**Meta Description**: Include benefits + CTA (150-160 chars)
**H1**: One per page, includes primary keyword
**Content Length**: 1,500+ words (main pages), 2,000+ words (blog posts)
**Image Alt Tags**: Descriptive with keywords
**Internal Links**: 3-5 per page
**Schema**: LocalBusiness (homepage), Product (product pages), Article (blog), BreadcrumbList (all)
**Page Speed**: <3s load time
**Readability**: Flesch-Kincaid 60+ (8th-9th grade)

**Priority Keywords**:
- Custom sports lockers
- Wood athletic lockers
- [State] [Sport] wood lockers (programmatic)
- College locker room lockers
- Professional sports lockers

**Competitor Weaknesses to Exploit**:
- Missing alt tags (20-43 images)
- HTML errors (9-21 errors)
- Render-blocking resources (3-21 scripts)
- Thin content (low content rate)
- Generic titles/meta descriptions
- Missing schema markup

---

## Quick Reference

**Primary Brand Color**: `#fe5900` (orange)
**Main Container Width**: `1300px`
**Standard Padding**: `0 20px`
**Primary Font**: Yantramanav (body), Oswald (headings)
**Cart Storage Key**: `playerstall_cart`
**Dev Server Port**: `4321`

## When Making Changes

### General Development Checklist

1. **Always test responsive behavior** - Check mobile, tablet, desktop views
2. **Maintain design consistency** - Use established colors, fonts, spacing
3. **Update navigation** - If adding pages, update BaseLayout navigation
4. **Check cart functionality** - Ensure cart count updates correctly
5. **Verify header scroll** - Test sticky header behavior
6. **Test quote rotation** - Ensure quote of the day works on new pages

### SEO Checklist (Critical for All Changes)

**For New Pages**:
1. ✅ **Title tag**: 50-60 characters, includes primary keyword + brand
2. ✅ **Meta description**: 150-160 characters, includes benefits + CTA
3. ✅ **H1 tag**: One per page, includes primary keyword
4. ✅ **Content length**: Minimum 1,500 words (2,000+ for blog posts)
5. ✅ **Image alt tags**: All images have descriptive alt text with keywords
6. ✅ **Internal links**: 3-5 relevant internal links to related pages
7. ✅ **Schema markup**: Appropriate schema for page type
8. ✅ **URL structure**: Clean, keyword-rich, kebab-case
9. ✅ **Mobile optimization**: Test on mobile devices
10. ✅ **Page speed**: Aim for <3s load time

**For Page Updates**:
1. ✅ **Review meta tags**: Ensure they're optimized and unique
2. ✅ **Add content depth**: Expand thin content to 1,500+ words
3. ✅ **Update internal links**: Link to new relevant content
4. ✅ **Refresh outdated info**: Update dates, statistics, references
5. ✅ **Optimize images**: Add/update alt tags, compress file sizes
6. ✅ **Check schema**: Ensure schema markup is present and valid

**Before Deploying**:
1. ✅ **Validate HTML**: Check for HTML errors
2. ✅ **Test schema**: Use Google's Rich Results Test
3. ✅ **Check mobile**: Test on multiple devices
4. ✅ **Verify performance**: Check Core Web Vitals
5. ✅ **Review competitor**: Ensure we're out-optimizing competitors

---

*Last Updated: December 2025*
*Project: PlayerStall - Custom Sports Lockers Website*
