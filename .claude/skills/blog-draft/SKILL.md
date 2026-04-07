---
name: blog-draft
description: >
  Drafts a complete, publish-ready SEO-optimized blog post in MDX format for PlayerStall
  (playerstall.com), a custom wood sports locker manufacturer. Always triggers when the
  user types /blog-draft or asks to write, draft, or create a blog post for PlayerStall.
  ALWAYS use this skill before writing any PlayerStall blog content — it reads all existing
  keyword research, competitor analysis, and content guides automatically so every post
  is built on the full strategic foundation. Triggers on: /blog-draft, "write a blog post",
  "draft a blog", "create a blog about", "write an article about [locker/sport topic]".
---

# PlayerStall Blog Draft Skill

You are writing a blog post for **PlayerStall** (playerstall.com), a Canadian-owned custom
wood sports locker manufacturer with 30+ years of experience serving collegiate, professional,
and high school athletic programs across the U.S.

---

## Step 1: Read the Research (Always Do This First)

Before writing a single word of content, read these files in the working directory:

1. `guides/target_keywords_summary.md` — which keywords to target, search volumes, difficulty
2. `guides/BLOG_KEYWORD_INTEGRATION_GUIDE.md` — how to use keywords naturally (density, placement rules)
3. `guides/competitor_seo_analysis_2026.md` — competitor weaknesses to use as PlayerStall differentiators
4. `guides/BLOG_WRITING_SOP.md` — the 8-step writing standard operating procedure
5. `guides/blog_writing_checklist.md` — pre-publication quality gates

Then read **one existing top-performing blog post** as a tone and format reference. Good choices:
- `src/content/blog/football-lockers-complete-guide.mdx`
- `src/content/blog/hockey-lockers-complete-guide.mdx`

This research step is not optional — the quality of every post depends on it. The guides contain
competitor weaknesses you should weave in as PlayerStall advantages, secondary keywords to place
naturally, and the checklist items that determine whether a post actually ranks.

---

## Step 2: Understand the Assignment

Extract from the user's prompt:
- **Primary keyword** — the exact phrase to rank for (e.g., "high school athletic lockers")
- **Target publish date** — used in `datePublished` frontmatter
- **Topic angle** — audience (high school AD? college? sport-specific?), goal of the post

If any of these are missing from the prompt, infer them from context. The content calendar
is documented in `.claude/plans/curried-plotting-knuth.md` if you need to look up a date.

---

## Step 3: Write the Complete MDX File

### Frontmatter (every field is required)

```yaml
---
title: "[Primary keyword in first 60 chars] + clarifying phrase"
description: "[Primary keyword] + specific benefit + implicit call to action. Must be ≤160 characters."
category: "[One of: Football | Hockey | Basketball | Baseball | Soccer | Lacrosse | Locker Room Design | Buying Guides | College Athletics | Comparisons | Maintenance]"
tags: ["tag1", "tag2", "tag3", "tag4", "tag5"]  # 5–8 tags, lowercase, hyphenated
heroImage: "https://playerstall.b-cdn.net/images/[relevant-image].jpg"
heroImageAlt: "[Descriptive phrase — what the image shows, not the keyword]"
datePublished: "YYYY-MM-DD"
readTime: "[wordCount ÷ 200, rounded up] min read"
author: "PlayerStall"
wordCount: [actual integer]
faqs:
  - question: "[Question an athletic director would actually ask]"
    answer: "[Specific, useful answer — 2–4 sentences]"
  - question: "..."
    answer: "..."
  # Include 6–8 FAQ pairs — this field generates the FAQPage JSON-LD schema automatically
---
```

**Why FAQs matter:** The platform generates `FAQPage`, `Article`, and `BreadcrumbList` JSON-LD
schema automatically from frontmatter. The only schema that requires your content is `faqs`.
Every post without 6+ FAQs is missing structured data that competitors don't have.

### Body Structure

Write the body in this exact order:

**1. Hook intro (300–400 words)**
- Open with a specific athletic director scenario or pain point
- Establish PlayerStall's 30+ years of authority in the first paragraph
- State clearly what the reader will learn and why it matters for their program
- Include the primary keyword in the first 100 words naturally

**2. Key Takeaways box**
```
## Key Takeaways
- [Concrete, specific takeaway — not vague]
- [5–6 bullets total]
- [Each one should be useful standalone — these target featured snippets]
```

**3. Table of Contents**
```
## In This Guide
- [Section Name](#anchor-link)
- [Another Section](#anchor-link)
```

**4. Main content sections (5–8 H2 sections, 400–500 words each)**

Each section should:
- Have the primary or secondary keyword in at least 2 H2 headings
- Use H3 subheadings to break down sub-topics
- Include specific numbers, dimensions, or price ranges where applicable
- Reference competitor weaknesses as PlayerStall strengths (use the competitor analysis)
- Link internally to 1–2 related posts or product pages per section

**5. FAQ section body**
```
## Frequently Asked Questions

### [Question from frontmatter faqs[0].question]
[Answer from frontmatter faqs[0].answer — expand slightly for readability]

### [Next question...]
```
This section must mirror the `faqs` frontmatter exactly — same questions in the same order.

**6. Conclusion (200–300 words)**
- Summarize the 2–3 most important points
- Reinforce why PlayerStall's 30+ years of experience matters for this specific topic
- Transition naturally into the CTA

**7. Closing CTA**
```
Ready to [specific outcome relevant to the post topic]? [Schedule your free custom design consultation](/contact).
We'll help you [specific benefit tied to the post]. With 30+ years of experience and our commitment
to quality, we're here to help you make the right decisions for your [sport/program] program.
```

---

## Step 4: SEO Checklist — Verify Before Writing the File

Run through this before outputting the MDX. Fix any failures:

- [ ] Primary keyword appears in: title (first 60 chars), H1, first 100 words, ≥2 H2 headings
- [ ] `description` is ≤160 characters and includes keyword + benefit
- [ ] `heroImageAlt` describes what the image shows (not keyword-stuffed)
- [ ] At least 5 internal links to related posts (`/blog/[slug]`) and product pages (`/products`, `/sport/[sport]`)
- [ ] `faqs` frontmatter contains 6–8 Q&A pairs
- [ ] Secondary keywords from `BLOG_KEYWORD_INTEGRATION_GUIDE.md` appear naturally in body
- [ ] At least 1 competitor weakness from `competitor_seo_analysis_2026.md` addressed as PlayerStall advantage
- [ ] Word count is 2,100–3,200 (warn if under 2,000; don't pad to hit the number)
- [ ] `category` matches the existing taxonomy exactly (case-sensitive)
- [ ] Slug is kebab-case and contains the primary keyword

---

## Step 5: Write the File and Report

Write the complete MDX to `src/content/blog/[primary-keyword-as-kebab-case].mdx`.

Then print this summary:

```
✅ Blog post drafted: src/content/blog/[slug].mdx

Word count:      [N] words ([N÷200] min read)
Primary keyword: [keyword]
FAQs:            [N] Q&A pairs (FAQPage schema ✓)
Internal links:  [N] links
Category:        [category]
Publish date:    [YYYY-MM-DD]

SEO checklist: [✓ All passed] OR [⚠ Items needing attention: ...]
```

---

## PlayerStall Brand Voice Reference

- **Authority:** "After 30+ years designing locker rooms for championship programs..."
- **Specificity:** Use actual dimensions, price ranges, and lead times — not vague claims
- **Audience:** Athletic directors, coaches, and facilities managers — not end athletes
- **Tone:** Direct, knowledgeable, peer-to-peer (not salesy or breathless)
- **Differentiators to use:** Canadian-built quality, 30+ years, lifetime-grade durability,
  custom design consultation, price match guarantee, sport-specific expertise
- **Competitor angle:** Most competitors have thin 600-word pages with no schema, no FAQs,
  and no real sport-specific guidance — PlayerStall wins with depth and specificity
