---
name: blog-seo-audit
description: >
  Audits a PlayerStall blog post (MDX file) against all SEO, schema, and content quality
  standards. Returns a scored report across 5 dimensions with specific line-level fixes.
  ALWAYS use this skill when the user types /blog-seo-audit, asks to "audit", "review SEO",
  "check this post", or "score" an existing or newly drafted blog post. Also trigger this
  automatically after /blog-draft completes if the user wants a quality check. Use it on
  any post that isn't ranking after 60 days, or before publishing any new post.
---

# PlayerStall Blog SEO Audit Skill

Audit a PlayerStall blog post and return a scored report with specific, actionable fixes.

---

## Step 1: Read the Standards

Before auditing the post, read these reference files:

1. `guides/blog_writing_checklist.md` — the full pre-publication checklist
2. `guides/BLOG_WRITING_SOP.md` — the 8-step writing standard
3. `guides/target_keywords_summary.md` — verify the post targets a real priority keyword
4. `guides/BLOG_KEYWORD_INTEGRATION_GUIDE.md` — keyword placement and density rules

---

## Step 2: Read the Post

Read the MDX file specified by the user. Extract:
- All frontmatter fields
- Word count (or use the `wordCount` field)
- All H1, H2, H3 headings
- First 100 words of body content
- All internal links (href starting with `/`)
- The `faqs` array (count and content)
- The `description` and `title` lengths

---

## Step 3: Score Across 5 Dimensions (0–10 each)

### 1. Keyword Optimization (0–10)
Check against `target_keywords_summary.md` and `BLOG_KEYWORD_INTEGRATION_GUIDE.md`:
- Primary keyword in title within first 60 chars → 2 pts
- Primary keyword in first 100 words of body → 2 pts
- Primary keyword in at least 2 H2 headings → 2 pts
- Secondary keywords from the integration guide used naturally → 2 pts
- No keyword stuffing (unnatural repetition) → 2 pts

### 2. Schema Completeness (0–10)
The platform auto-generates Article + BreadcrumbList from frontmatter. FAQPage requires `faqs`:
- `faqs` array present with 6+ Q&A pairs → 4 pts
- All frontmatter fields populated (title, description, category, tags, heroImage, heroImageAlt, datePublished, readTime, author, wordCount) → 4 pts
- `category` matches existing taxonomy exactly → 2 pts

### 3. Content Depth (0–10)
- Word count 2,100–3,200 → 3 pts (warn and deduct proportionally if under 2,000)
- Has Key Takeaways section → 2 pts
- Has Table of Contents → 2 pts
- 5+ H2 sections with H3 subsections → 2 pts
- Has conclusion + CTA paragraph → 1 pt

### 4. Internal Linking (0–10)
- 5+ internal links present → 5 pts (1 pt per link up to 5)
- Links go to relevant posts (not just homepage or /contact) → 3 pts
- At least 1 link to a product page (/products, /sport/[sport], or specific product) → 2 pts

### 5. Meta Quality (0–10)
- `title` is ≤60 characters → 3 pts
- `description` is ≤160 characters → 3 pts
- `description` includes the primary keyword → 2 pts
- `heroImageAlt` is descriptive (not keyword-stuffed, not empty) → 2 pts

---

## Step 4: Output the Report

```
## SEO Audit: [Post Title]
File: [path]
Audited: [today's date]

Overall Score: [total]/50  ([percentage]%)

| Dimension          | Score | Status |
|--------------------|-------|--------|
| Keyword Opt.       | X/10  | ✓ or ⚠ |
| Schema             | X/10  | ✓ or ⚠ |
| Content Depth      | X/10  | ✓ or ⚠ |
| Internal Linking   | X/10  | ✓ or ⚠ |
| Meta Quality       | X/10  | ✓ or ⚠ |

---

## ✅ Passing
[List items that scored full points — brief, positive]

---

## ⚠ Fixes Required
[For each dimension scoring below 8, list specific fixes with line references or field names]

### Keyword Optimization
- [Specific issue + how to fix]

### Schema
- [e.g., "faqs array has only 4 items — add 2 more Q&A pairs to trigger FAQPage schema"]

### Content Depth
- [e.g., "Word count is 1,847 — needs ~300 more words; consider expanding Section 3"]

### Internal Linking
- [e.g., "Only 3 internal links found — add links to /blog/wood-vs-metal-sports-lockers and /products"]

### Meta Quality
- [e.g., "description is 173 chars — trim to ≤160"]

---

## Priority Fix
[The single most impactful fix to make right now, in one sentence]
```

---

## Scoring Guidance

**45–50:** Publish-ready. No action needed.
**35–44:** Minor fixes. Address ⚠ items before publishing.
**25–34:** Significant gaps. Fix before publishing — likely missing FAQs or internal links.
**Under 25:** Major revision needed. Run `/blog-draft` again using the research guides.

---

## When to Recommend a Full Redraft

Suggest running `/blog-draft` again (rather than patching) if:
- Word count is under 1,500 (structural problem, not fixable by adding a paragraph)
- `faqs` array is missing entirely (schema is absent from this post)
- The primary keyword isn't in the title or first 100 words (wrong keyword focus)
- The post has no H2 structure (no sections — unusable for featured snippets)
