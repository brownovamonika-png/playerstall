# Blog Writing Quick Checklist

**One-page reference for blog post creation**  
**Full SOP:** See `BLOG_WRITING_SOP.md`

---

## Pre-Writing (45 min)

- [ ] **Keyword Research** (15 min)
  - [ ] Primary keyword: Selected from target keywords list (see target_keywords_summary.md)
  - [ ] Primary keyword priority: 🔴 CRITICAL keywords preferred ("wood sports lockers", "custom sports lockers", etc.)
  - [ ] Secondary keywords: 3-5 keywords from target keywords list identified
  - [ ] Competitor analysis: Checked top 3-5 ranking pages
  - [ ] Keyword reference: Reviewed target_keywords_summary.md for keyword strategy

- [ ] **Content Strategy** (10 min)
  - [ ] Target audience identified
  - [ ] User intent clear
  - [ ] Competitive angle defined (how we'll out-depth competitors)
  - [ ] Content gaps identified

- [ ] **Outline** (20 min)
  - [ ] H1 with primary keyword
  - [ ] Introduction (300-400 words)
  - [ ] 5-8 main sections (H2s), 400-500 words each
  - [ ] Key takeaways box
  - [ ] Table of contents (if 2,500+ words)
  - [ ] FAQ section (6-8 questions)
  - [ ] Conclusion + CTA

---

## Writing (2-3 hours)

- [ ] **Frontmatter** (5 min)
  - [ ] Title: 50-60 chars, includes primary keyword
  - [ ] Description: 150-160 chars, includes CTA
  - [ ] Slug: keyword-rich, kebab-case
  - [ ] Word count target: 3,000+

- [ ] **FAQs** (15 min)
  - [ ] 6-8 FAQs created
  - [ ] Target featured snippets
  - [ ] Answers: 150-200 words each
  - [ ] Include keywords naturally

- [ ] **Schema Markup** (5 min)
  - [ ] Article schema complete
  - [ ] FAQPage schema complete
  - [ ] Publisher info correct

- [ ] **Content Writing** (2-3 hours)
  - [ ] Introduction: 300-400 words (hook, problem, promise)
  - [ ] Main sections: 5-8 sections, 400-500 words each
  - [ ] Total word count: 3,000+ words
  - [ ] Internal links: 5-8 links to product/service pages
  - [ ] External links: 2-3 authoritative sources
  - [ ] Key messaging included:
    - [ ] 30+ years experience (3-5 mentions)
    - [ ] Lifetime guarantee (1-2 mentions)
    - [ ] Made in Canada (when relevant)
    - [ ] Free consultation CTA

---

## Post-Writing (1 hour)

- [ ] **SEO Optimization** (15 min)
  - [ ] Title tag: 50-60 chars, includes primary keyword from target keywords list ✓
  - [ ] Meta description: 150-160 chars, includes primary keyword + CTA ✓
  - [ ] H1: One per page, includes primary keyword ✓
  - [ ] Primary keyword in first paragraph ✓
  - [ ] Heading hierarchy: H1 → H2 → H3 ✓
  - [ ] Keyword density: 1-2% for primary keyword (natural)
  - [ ] Secondary keywords: 3-5 keywords from target keywords list included naturally ✓
  - [ ] Target keywords referenced: "wood sports lockers", "custom sports lockers", "athletic lockers" when relevant ✓
  - [ ] Readability: 8th-9th grade level

- [ ] **Brand Voice** (10 min)
  - [ ] Professional but approachable tone
  - [ ] Authority established (30+ years)
  - [ ] Authentic insights (not generic)
  - [ ] Value-first (educational before promotional)
  - [ ] CTAs natural and helpful

- [ ] **Internal Linking** (10 min)
  - [ ] 5-8 links to product/service pages
  - [ ] 2-3 links to related blog posts
  - [ ] 1 link to process page
  - [ ] Descriptive anchor text with keywords

- [ ] **Image Optimization** (15 min)
  - [ ] 3-5 images minimum
  - [ ] All images have alt tags (descriptive + keywords)
  - [ ] File names: keyword-rich, kebab-case
  - [ ] File sizes optimized (<200KB)

- [ ] **Final Review** (20 min)
  - [ ] Content complete (no placeholders)
  - [ ] Word count: 3,000+ words ✓
  - [ ] Spelling/grammar checked
  - [ ] Fact-checked (dates, numbers)
  - [ ] Schema markup valid (test with Google Rich Results Test)
  - [ ] Code syntax correct
  - [ ] Build test passed (`npm run build`)

---

## Publication (35 min)

- [ ] **Publish** (5 min)
  - [ ] File location: `src/pages/blog/[slug].astro`
  - [ ] Build test: No errors
  - [ ] Preview: Looks correct

- [ ] **Update Site** (10 min)
  - [ ] Added to blog listing (`blog.astro`)
  - [ ] Sitemap updated
  - [ ] Submitted to Search Console

- [ ] **Promote** (30 min)
  - [ ] Shared on social media (Facebook, LinkedIn, Twitter)
  - [ ] Internal links added from related pages
  - [ ] Email newsletter (if applicable)

---

## Quality Standards

### Must Have ✓
- 3,000+ words
- 6-8 FAQs with schema
- 5-8 internal links
- Title/Meta optimized
- All images have alt tags
- Schema markup valid

### Should Have ⭐
- 3,500+ words
- 8+ FAQs
- Unique data/insights
- Case studies/examples
- Featured snippet optimization

---

## Quick Reference

**Title Format:** `[Primary Keyword]: [Benefit/Year]` (50-60 chars)  
**Meta Format:** `[Benefits] + [CTA]` (150-160 chars)  
**H1 Format:** Includes primary keyword naturally  
**Word Count:** Minimum 3,000 words  
**FAQs:** 6-8 minimum, 150-200 words each  
**Internal Links:** 5-8 to product/service pages  
**External Links:** 2-3 authoritative sources  
**Images:** 3-5 minimum, all with alt tags  
**Schema:** Article + FAQPage required

**KEYWORD STRATEGY:**
- **Primary Keyword:** Select from target keywords list (target_keywords_summary.md)
- **🔴 CRITICAL Keywords:** "wood sports lockers", "custom sports lockers", "sports lockers", "locker room lockers", "athletic lockers"
- **Secondary Keywords:** Include 3-5 from target keywords list naturally
- **Keyword Placement:** H1, title tag, meta description, first paragraph, throughout content
- **LSI Keywords:** Include related terms (collegiate lockers, custom design, wood lockers, etc.)

---

**Need help?** See full SOP: `BLOG_WRITING_SOP.md`  
**Template:** See `blog_post_template.astro`
