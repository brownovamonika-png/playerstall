# Yoast SEO Guide for WordPress Blog Posts

**Platform:** WordPress (customsportslockers.com)  
**Plugin:** Yoast SEO  
**Purpose:** Optimize blog posts for search engines

---

## Quick Answer: Yes, Use Yoast SEO!

**Yoast SEO is perfect for WordPress** - it's the industry standard and will help you:
- ✅ Optimize meta titles and descriptions
- ✅ Check keyword usage
- ✅ Improve readability
- ✅ Add schema markup
- ✅ Generate XML sitemaps
- ✅ Track SEO scores

---

## Setting Up Yoast SEO

### Installation

1. **Install Plugin:**
   - WordPress Admin → Plugins → Add New
   - Search "Yoast SEO"
   - Install and Activate

2. **Run Setup Wizard:**
   - Follow the setup wizard
   - Connect to Google Search Console (recommended)
   - Configure basic settings

### Basic Configuration

**General Settings:**
- **Site Name:** PlayerStall / CustomSportsLockers
- **Separator:** | (pipe)
- **Homepage Title:** Custom Sports Lockers | PlayerStall
- **Homepage Meta Description:** [Your description]

**Post Types:**
- Enable SEO for "Posts"
- Enable SEO for "Pages"

---

## Using Yoast SEO for Blog Posts

### Step-by-Step Process

#### 1. Create New Post

WordPress Admin → Posts → Add New

#### 2. Enter Focus Keyword

**In Yoast SEO Box (below editor):**
- **Focus Keyword:** Enter your primary keyword
  - Example: "wood vs metal sports lockers"
  - Example: "custom sports lockers"

**What Yoast Checks:**
- ✅ Keyword in title (first 60 characters)
- ✅ Keyword in first paragraph
- ✅ Keyword in URL slug
- ✅ Keyword in H1 (one per page)
- ✅ Keyword in meta description
- ✅ Keyword density (1-2%)

#### 3. Optimize SEO Title

**In Yoast SEO Box → SEO Title:**
- **Format:** `[Primary Keyword] | [Benefit/Year] | PlayerStall`
- **Length:** 50-60 characters (Yoast shows green/yellow/red)
- **Example:** `Wood vs Metal Sports Lockers: Complete 2025 Guide | PlayerStall`

**Yoast Indicators:**
- 🟢 **Green:** Perfect length (50-60 chars)
- 🟡 **Yellow:** Too short or too long
- 🔴 **Red:** Way too long (will be cut off)

#### 4. Write Meta Description

**In Yoast SEO Box → Meta Description:**
- **Length:** 150-160 characters (Yoast shows progress bar)
- **Include:** Primary keyword, benefits, CTA
- **Example:** `Compare wood vs metal sports lockers: durability, cost, customization, and ROI. 30+ years experience reveals which material wins long-term. Free consultation available.`

**Yoast Indicators:**
- 🟢 **Green:** Perfect length (150-160 chars)
- 🟡 **Yellow:** Too short or too long
- 🔴 **Red:** Way too long (will be cut off)

#### 5. Check Readability

**Yoast Readability Analysis:**
- **Target:** Green score (60+)
- **Checks:**
  - Sentence length (short sentences)
  - Paragraph length (3-4 sentences)
  - Subheading distribution (H2s every 300 words)
  - Transition words
  - Passive voice (minimize)

**How to Improve:**
- Break up long sentences
- Add more subheadings (H2s)
- Use transition words (however, therefore, etc.)
- Write in active voice

#### 6. Check SEO Score

**Yoast SEO Analysis:**
- **Target:** Green score (all checks passed)
- **Checks:**
  - Focus keyword in title ✓
  - Focus keyword in first paragraph ✓
  - Focus keyword in URL ✓
  - Focus keyword in H1 ✓
  - Focus keyword in meta description ✓
  - Image alt tags ✓
  - Internal links ✓
  - Outbound links ✓

**Fix Any Red/Yellow Issues:**
- Red = Critical (must fix)
- Yellow = Warning (should fix)
- Green = Good (optimal)

#### 7. Add FAQ Schema (Yoast Premium)

**If You Have Yoast Premium:**
- Use Yoast's FAQ block
- Add FAQs directly in editor
- Yoast automatically adds schema markup

**If You Don't Have Yoast Premium:**
- Use Schema Pro plugin (alternative)
- Or add schema manually (see BLOG_WRITING_SOP.md)

---

## Yoast SEO Checklist for Each Post

### Before Publishing:

**SEO Tab:**
- [ ] Focus keyword entered
- [ ] SEO title: 50-60 characters (green)
- [ ] Meta description: 150-160 characters (green)
- [ ] SEO score: Green (all checks passed)
- [ ] Focus keyword in title ✓
- [ ] Focus keyword in first paragraph ✓
- [ ] Focus keyword in URL ✓
- [ ] Focus keyword in H1 ✓
- [ ] Image alt tags include keywords ✓

**Readability Tab:**
- [ ] Readability score: Green (60+)
- [ ] Sentence length: Good
- [ ] Paragraph length: Good
- [ ] Subheading distribution: Good
- [ ] Transition words: Used appropriately

**General:**
- [ ] Featured image set
- [ ] Category selected
- [ ] Tags added (3-5 relevant tags)
- [ ] URL slug is keyword-rich
- [ ] Excerpt written (use meta description)

---

## Common Yoast SEO Issues & Fixes

### Issue: "Focus keyword not in first paragraph"
**Fix:** Add focus keyword naturally in first 100 words

### Issue: "No H1 found"
**Fix:** Ensure post title is set as H1 (usually automatic)

### Issue: "Image alt tags missing keywords"
**Fix:** Add alt text to all images with focus keyword

### Issue: "No internal links found"
**Fix:** Add 5-8 internal links to related pages

### Issue: "No outbound links found"
**Fix:** Add 2-3 links to authoritative sources

### Issue: "Readability score too low"
**Fix:** 
- Break up long sentences
- Add more H2 subheadings
- Use shorter paragraphs
- Add transition words

---

## Advanced Yoast SEO Features

### Schema Markup (Yoast Premium)

**FAQ Schema:**
- Use Yoast FAQ block in editor
- Yoast automatically adds FAQPage schema
- Helps capture featured snippets

**Article Schema:**
- Yoast automatically adds Article schema
- Includes: headline, author, date, publisher

### XML Sitemap

**Yoast Auto-Generates:**
- XML sitemap for all posts
- Submit to Google Search Console
- Location: `yoursite.com/sitemap_index.xml`

### Social Media

**Open Graph Tags:**
- Yoast automatically adds Open Graph tags
- Optimizes social media sharing
- Customize in Yoast → Social → Facebook

**Twitter Cards:**
- Yoast adds Twitter Card tags
- Optimizes Twitter sharing
- Customize in Yoast → Social → Twitter

---

## Yoast SEO vs Manual SEO (Astro)

### WordPress (Yoast SEO):
- ✅ Plugin handles meta tags automatically
- ✅ Real-time SEO score feedback
- ✅ Readability analysis built-in
- ✅ Schema markup with premium version
- ✅ XML sitemap generation
- ✅ Easy to use, visual feedback

### Astro (Manual SEO):
- ✅ More control over implementation
- ✅ No plugin overhead (faster site)
- ✅ Schema markup in template
- ✅ Meta tags in BaseLayout
- ✅ Requires manual checklist (use BLOG_WRITING_SOP.md)

**Recommendation:** Use Yoast SEO for WordPress, manual SEO for Astro (both work great!)

---

## Best Practices

### Do:
- ✅ Use focus keyword naturally (don't stuff)
- ✅ Aim for green scores (but yellow is okay)
- ✅ Write for humans first, SEO second
- ✅ Update old posts with Yoast SEO
- ✅ Check Yoast before publishing

### Don't:
- ❌ Keyword stuff (Yoast will flag this)
- ❌ Ignore readability (affects rankings)
- ❌ Skip image alt tags
- ❌ Forget internal links
- ❌ Publish without checking Yoast

---

## Quick Reference

**Focus Keyword:** Enter in Yoast box  
**SEO Title:** 50-60 characters (green)  
**Meta Description:** 150-160 characters (green)  
**Readability:** Green score (60+)  
**SEO Score:** Green (all checks passed)  
**FAQ Schema:** Use Yoast FAQ block (premium) or Schema Pro

---

## Resources

- **Yoast SEO Documentation:** https://yoast.com/help/
- **Yoast Blog:** https://yoast.com/blog/
- **WordPress Publishing Guide:** `wordpress-blogs/WORDPRESS_PUBLISHING_GUIDE.md`
- **Blog Writing SOP:** `guides/BLOG_WRITING_SOP.md`

---

*Guide Created: December 2025*  
*For WordPress blog posts on customsportslockers.com*
