# Blog Writing SOP: PlayerStall Content Creation Process

**Version:** 2.0  
**Last Updated:** December 2025  
**Purpose:** Streamlined, repeatable process for creating SEO-optimized blog posts that outrank competitors

---

## Overview

This SOP replaces static PDF documentation with a dynamic, checklist-driven process that ensures every blog post:
- ✅ Out-depths competitors (3,000+ words vs. 500-1,200 words)
- ✅ Targets high-value keywords with low competition
- ✅ Includes proper SEO elements (schema, FAQs, internal links)
- ✅ Follows brand voice and messaging guidelines
- ✅ Generates qualified leads

---

## Pre-Writing Phase: Research & Planning

### Step 1: Keyword Research (15 minutes)

**Use DataForSEO or Keyword Planner to identify:**

- [ ] **Primary Keyword**: Select from target keywords list below (30-200 monthly searches, low-medium competition)
- [ ] **Secondary Keywords**: 3-5 related terms to naturally include from target keywords
- [ ] **Competitor Analysis**: Check top 3-5 ranking pages
  - Word count of competitors
  - Content gaps they're missing
  - Questions they don't answer

**TARGET KEYWORDS REFERENCE:**

#### 🔴 CRITICAL PRIORITY KEYWORDS (Use These First)
1. **"wood sports lockers"** - 170 searches/month (All Wood Lockers ranks #1 - YOUR PRIMARY KEYWORD)
2. **"custom sports lockers"** - 30-70 searches/month, Keyword Difficulty = 9 (Very Low - Easy to rank!)
3. **"sports lockers"** - 2,400-2,900 searches/month (Long-term goal, high competition)
4. **"locker room lockers"** - 880-1,300 searches/month (High CPC = $22.43, high value)
5. **"athletic lockers"** - 590-880 searches/month (Strong volume)

#### 🟠 HIGH PRIORITY KEYWORDS (Use for Secondary Focus)
- **"wood athletic lockers"** - 30-90 searches/month
- **"football wood lockers"** - 30-90 searches/month
- **"stadium lockers"** - 140-390 searches/month
- **"pro lockers"** - 70-210 searches/month
- **"[State] [Sport] wood lockers"** - Programmatic pattern (LOW competition, high ROI)
  - Examples: "Texas football wood lockers" (30-170 searches, LOW competition = 11)
  - Priority states: Texas, California, Florida, New York, Ohio, Pennsylvania, Illinois, Michigan, North Carolina, Georgia

#### 🟡 MEDIUM PRIORITY KEYWORDS (Long-Tail Opportunities)
- **"wood vs metal sports lockers"** - 10-30 searches/month (High conversion intent)
- **"varsity lockers"** - 20-70 searches/month
- **"buy sports lockers"** - 10-90 searches/month (LOW competition)
- **"locker room renovation"** - 30-50 searches/month (MEDIUM competition)
- **"custom football lockers"** - 10-40 searches/month
- **"how to choose sports lockers"** - Long-tail educational keywords

**Example Keyword Selection:**
- Primary: "wood vs metal sports lockers" (10-30 searches/month, LOW competition)
- Secondary: "wood athletic lockers", "custom sports lockers", "locker material comparison", "wood sports lockers"

### Step 2: Content Strategy (10 minutes)

**Answer these questions:**

- [ ] **Target Audience**: Who is this for? (Athletic directors, coaches, facility managers)
- [ ] **User Intent**: What problem are they solving? (Choosing material, planning budget, understanding ROI)
- [ ] **Competitive Angle**: How will we out-depth competitors?
  - More word count (3,000+ vs. 500-1,200)
  - Unique sections competitors don't have
  - Real data from 30+ years experience
- [ ] **Content Gaps**: What questions aren't being answered?

### Step 3: Outline Creation (20 minutes)

**Create outline with:**

- [ ] **H1**: Includes primary keyword naturally
- [ ] **Introduction** (300-400 words): Hook, problem statement, what they'll learn
- [ ] **Main Sections** (H2s): 5-8 sections, 400-500 words each
- [ ] **Subsections** (H3s): Break down complex topics
- [ ] **Key Takeaways Box**: 3-5 bullet points
- [ ] **Table of Contents**: For posts 2,500+ words
- [ ] **FAQ Section**: 6-8 questions (target featured snippets)
- [ ] **Conclusion**: Summary + CTA
- [ ] **Related Links**: 3-5 internal links to product/service pages

**Template Outline:**
```
1. H1: [Primary Keyword] | [Benefit/Year]
2. Introduction (300-400 words)
   - Hook with 30+ years experience
   - Problem statement
   - What they'll learn
3. Key Takeaways Box
4. Table of Contents (if 2,500+ words)
5. Main Section 1: [Topic] (400-500 words)
   - H3: Subsection
   - H3: Subsection
6. Main Section 2: [Topic] (400-500 words)
7. Main Section 3: [Topic] (400-500 words)
8. FAQ Section (6-8 questions)
9. Conclusion + CTA
10. Related Links
```

---

## Writing Phase: Content Creation

### Step 4: Frontmatter Setup (5 minutes)

**Copy this template and fill in:**

```javascript
const post = {
	title: '[Primary Keyword]: [Benefit/Year]', // 50-60 characters
	description: '[150-160 chars: Include benefits, CTA, key differentiators]',
	category: '[Category]', // Buyer Guides, Design, Planning, etc.
	datePublished: 'YYYY-MM-DD',
	readTime: 'X min read', // Estimate: 200 words = 1 min
	author: 'PlayerStall Editorial Team',
	slug: 'kebab-case-url-slug',
	wordCount: 3000 // Target minimum
};
```

**Checklist:**
- [ ] Title includes primary keyword (50-60 characters)
- [ ] Description includes benefits + CTA (150-160 characters)
- [ ] Slug is keyword-rich, kebab-case
- [ ] Word count target: 3,000+ words

### Step 5: FAQ Creation (15 minutes)

**Create 6-8 FAQs targeting:**

- [ ] **Featured Snippet Opportunities**: Questions competitors answer poorly
- [ ] **Common Buyer Questions**: What do prospects actually ask?
- [ ] **Long-Tail Keywords**: Include question variations
- [ ] **Schema-Ready Format**: Each FAQ structured for FAQPage schema

**FAQ Template:**
```javascript
const faqItems = [
	{
		question: '[Question with primary/secondary keyword]',
		answer: '[150-200 word answer with data, examples, and CTA]'
	},
	// ... 5-7 more FAQs
];
```

**FAQ Best Practices:**
- Answer length: 150-200 words (comprehensive but concise)
- Include specific data (30+ years, percentages, timeframes)
- End with value proposition or CTA when natural
- Use keywords naturally in questions and answers

### Step 6: Schema Markup Setup (5 minutes)

**Copy this template:**

```javascript
const structuredData = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'Article',
			headline: post.title,
			description: post.description,
			datePublished: post.datePublished,
			dateModified: post.datePublished,
			wordCount: post.wordCount,
			author: {
				'@type': 'Organization',
				name: post.author
			},
			publisher: {
				'@type': 'Organization',
				name: 'PlayerStall',
				logo: {
					'@type': 'ImageObject',
					url: 'https://playerstall.com/images/logoblack2.png'
				}
			},
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': `https://playerstall.com/blog/${post.slug}`
			}
		},
		{
			'@type': 'FAQPage',
			mainEntity: faqItems.map((item) => ({
				'@type': 'Question',
				name: item.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: item.answer
				}
			}))
		}
	]
};
```

**Checklist:**
- [ ] Article schema includes all required fields
- [ ] FAQPage schema includes all FAQs
- [ ] Publisher logo URL is correct
- [ ] Main entity URL matches slug

### Step 7: Content Writing (2-3 hours)

**Follow this structure:**

#### Introduction (300-400 words)
- [ ] **Hook**: Start with 30+ years experience or compelling stat
- [ ] **Problem**: What challenge are readers facing?
- [ ] **Promise**: What will they learn/achieve?
- [ ] **Credibility**: Why should they trust us?

**Example Hook:**
> "After 30+ years manufacturing custom sports lockers, we've seen every material, every failure, and every success story. This comprehensive guide reveals the real differences between wood and metal sports lockers—beyond marketing claims—so you can make the right decision for your athletic facility."

#### Main Sections (400-500 words each)
- [ ] **H2 Headings**: Include secondary keywords naturally
- [ ] **H3 Subsections**: Break down complex topics
- [ ] **Data & Examples**: Use real numbers, case studies, 30+ years insights
- [ ] **Internal Links**: Link to relevant product/service pages (3-5 links)
- [ ] **External Links**: Link to 2-3 authoritative sources (NCAA, sports orgs)
- [ ] **Visual Breaks**: Use bullet points, numbered lists, tables

**Content Requirements:**
- [ ] Minimum 3,000 words total
- [ ] 5-8 main sections (H2s)
- [ ] Each section 400-500 words
- [ ] Include specific data (percentages, timeframes, costs)
- [ ] Reference 30+ years experience 3-5 times
- [ ] Mention lifetime guarantee 1-2 times
- [ ] Include "Canadian-owned and operated since 1996" when relevant

#### Key Messaging to Weave In

**Always include (naturally):**
- ✅ **30+ years experience** (authority)
- ✅ **Lifetime guarantee** (confidence)
- ✅ **Canadian-owned and operated since 1996** (quality)
- ✅ **Wood superiority** (core differentiator)
- ✅ **Free consultation** (CTA)
- ✅ **Custom design** (unique value)

#### Keyword Integration Requirements

**Every blog post MUST include:**

1. **Primary Keyword Usage:**
   - [ ] Primary keyword in H1 (exact match or close variant)
   - [ ] Primary keyword in first paragraph (naturally)
   - [ ] Primary keyword in title tag (50-60 characters)
   - [ ] Primary keyword in meta description (150-160 characters)
   - [ ] Primary keyword density: 1-2% throughout content (natural usage)

2. **Secondary Keywords Usage:**
   - [ ] Include 3-5 secondary keywords from target keywords list
   - [ ] Use in H2/H3 headings where natural
   - [ ] Include in alt tags for images
   - [ ] Use in internal link anchor text

3. **Target Keywords to Reference (Choose Relevant Ones):**
   - [ ] **"wood sports lockers"** - Your primary keyword (use in every post when relevant)
   - [ ] **"custom sports lockers"** - Low difficulty, easy to rank (use frequently)
   - [ ] **"athletic lockers"** - High volume (use when discussing general lockers)
   - [ ] **"locker room lockers"** - High CPC value (use when discussing facilities)
   - [ ] **"wood athletic lockers"** - Your specialty (use when discussing wood)
   - [ ] **"[Sport] wood lockers"** - Sport-specific (football, hockey, basketball, etc.)
   - [ ] **"wood vs metal sports lockers"** - Comparison content (use in comparison posts)

4. **LSI Keywords (Related Terms to Include Naturally):**
   - [ ] "collegiate lockers", "college lockers", "university lockers"
   - [ ] "professional lockers", "pro lockers", "team lockers"
   - [ ] "custom design", "custom lockers", "customized lockers"
   - [ ] "locker room design", "athletic facility lockers"
   - [ ] "wood lockers", "wooden lockers", "solid wood lockers"
   - [ ] "Canadian-owned and operated since 1996", "North American made"
   - [ ] "lifetime warranty", "lifetime guarantee"

#### Conclusion (200-300 words)
- [ ] **Summary**: Recap main points
- [ ] **Next Steps**: What should readers do?
- [ ] **CTA**: Link to contact page or consultation
- [ ] **Value Reminder**: Why PlayerStall is the right choice

---

## Post-Writing Phase: Optimization & Review

### Step 8: SEO Optimization Checklist (15 minutes)

**Meta Tags:**
- [ ] Title tag: 50-60 characters, includes primary keyword
- [ ] Meta description: 150-160 characters, includes CTA
- [ ] H1: One per page, includes primary keyword
- [ ] Heading hierarchy: H1 → H2 → H3 (no skipping)

**Content Quality:**
- [ ] Word count: 3,000+ words (check actual count)
- [ ] Readability: 8th-9th grade level (use Hemingway Editor)
- [ ] Keyword density: 1-2% for primary keyword (natural usage)
- [ ] LSI keywords: Include related terms throughout
- [ ] **Target keywords included**: Primary keyword + 3-5 secondary keywords from target keywords list
- [ ] **Keyword placement**: Primary keyword in H1, title tag, meta description, first paragraph
- [ ] **Secondary keywords**: Used naturally in H2/H3 headings, body content, alt tags

**Technical SEO:**
- [ ] Internal links: 5-8 links to product/service pages
- [ ] External links: 2-3 authoritative sources
- [ ] Image alt tags: All images have descriptive alt text with keywords
- [ ] Schema markup: Article + FAQPage (validate with Google Rich Results Test)
- [ ] URL structure: Clean, keyword-rich slug

**Competitor Comparison:**
- [ ] Word count exceeds competitors (check top 3-5 ranking pages)
- [ ] Content depth exceeds competitors (more sections, more detail)
- [ ] FAQs address questions competitors don't answer
- [ ] Unique value propositions highlighted (30+ years, lifetime guarantee)

### Step 9: Brand Voice Review (10 minutes)

**Check for:**
- [ ] **Tone**: Professional but approachable (not salesy)
- [ ] **Authority**: 30+ years experience mentioned appropriately
- [ ] **Authenticity**: Real insights, not generic advice
- [ ] **Value-First**: Educational before promotional
- [ ] **CTAs**: Natural, helpful, not pushy

**Brand Voice Guidelines:**
- Write like you're advising a friend (professional but warm)
- Use "we" and "our" (not "PlayerStall" repeatedly)
- Include real examples and data
- Be honest about trade-offs (builds trust)
- Focus on helping readers make better decisions

### Step 10: Internal Linking (10 minutes)

**Link to:**
- [ ] **Product Pages**: Services page, specific product tiers (3-5 links)
- [ ] **Related Blog Posts**: Other relevant blog content (2-3 links)
- [ ] **Process Page**: Our Process page (1 link)
- [ ] **Contact Page**: CTA links (2-3 links)

**Internal Linking Best Practices:**
- Use descriptive anchor text with keywords
- Link naturally within content (not forced)
- Link to pages that add value to the reader
- Vary anchor text (don't use same phrase repeatedly)

### Step 11: Image Optimization (15 minutes)

**For each image:**
- [ ] **Alt Tag**: Descriptive with keywords
  - Format: `[Sport/Type] wood lockers for [use case]`
  - Example: `Custom football wood lockers for collegiate teams`
- [ ] **File Name**: Descriptive, keyword-rich
  - Format: `kebab-case-descriptive-name.jpg`
  - Example: `wood-vs-metal-lockers-comparison.jpg`
- [ ] **File Size**: Optimized (<200KB when possible)
- [ ] **Dimensions**: Appropriate size (not oversized)

**Image Requirements:**
- Minimum 3-5 images per post
- At least one hero image (top of post)
- Images break up long text sections
- Include comparison visuals when relevant
- Use real product photos when possible

### Step 12: Final Review (20 minutes)

**Pre-Publication Checklist:**

**Content:**
- [ ] All sections complete (no placeholders)
- [ ] Word count: 3,000+ words
- [ ] Readability: 8th-9th grade level
- [ ] Spelling/grammar checked
- [ ] Fact-checked (dates, numbers, claims)

**SEO:**
- [ ] Title tag optimized (50-60 chars)
- [ ] Meta description optimized (150-160 chars)
- [ ] H1 includes primary keyword
- [ ] Schema markup valid (test with Google Rich Results Test)
- [ ] All images have alt tags
- [ ] Internal links in place (5-8 links)
- [ ] External links in place (2-3 links)

**Technical:**
- [ ] Code syntax correct (no errors)
- [ ] BaseLayout props correct (title, description)
- [ ] Slug matches URL structure
- [ ] Date published is correct
- [ ] Category is correct

**Brand:**
- [ ] Brand voice consistent
- [ ] Key messaging included (30+ years, lifetime guarantee, etc.)
- [ ] CTAs are natural and helpful
- [ ] No competitor bashing (focus on our strengths)

---

## Publication Phase: Launch & Promotion

### Step 13: Publication (5 minutes)

**Before publishing:**
- [ ] **File Location**: `src/pages/blog/[slug].astro`
- [ ] **File Name**: Matches slug (kebab-case)
- [ ] **Build Test**: Run `npm run build` to check for errors
- [ ] **Preview**: Run `npm run preview` to review

**After publishing:**
- [ ] **Update Blog Listing**: Add to `src/pages/blog.astro` posts array
- [ ] **Update Sitemap**: Ensure new post is included
- [ ] **Submit to Search Console**: Request indexing

### Step 14: Promotion (30 minutes)

**Internal Promotion:**
- [ ] **Homepage**: Link from homepage if high-priority post
- [ ] **Related Pages**: Add links from relevant service/product pages
- [ ] **Email**: Include in next newsletter (if applicable)
- [ ] **Social Media**: Share on Facebook, LinkedIn, Twitter

**External Promotion:**
- [ ] **Social Sharing**: Post on all social channels
- [ ] **Communities**: Share in relevant forums/groups (if allowed)
- [ ] **Backlinks**: Reach out to relevant sites for backlinks

---

## Quality Standards

### Minimum Requirements (Must Have)

**Content:**
- ✅ 3,000+ words
- ✅ 6-8 FAQs with schema markup
- ✅ 5-8 main sections (H2s)
- ✅ Proper heading hierarchy
- ✅ 5-8 internal links
- ✅ 2-3 external links

**SEO:**
- ✅ Title tag: 50-60 characters with primary keyword
- ✅ Meta description: 150-160 characters with CTA
- ✅ H1 with primary keyword
- ✅ Article + FAQPage schema markup
- ✅ All images have alt tags
- ✅ Keyword-rich URL slug

**Brand:**
- ✅ 30+ years experience mentioned
- ✅ Lifetime guarantee mentioned
- ✅ Free consultation CTA included
- ✅ Brand voice consistent

### Excellence Standards (Should Have)

**Content:**
- ⭐ 3,500+ words (out-depth competitors significantly)
- ⭐ 8+ FAQs (capture more featured snippets)
- ⭐ Unique data/insights competitors don't have
- ⭐ Case studies or real examples
- ⭐ Visual elements (comparison tables, charts)

**SEO:**
- ⭐ Featured snippet optimization (answer questions directly)
- ⭐ Related keyword coverage (LSI keywords)
- ⭐ Comprehensive internal linking (topic clusters)
- ⭐ Video content (if applicable)

---

## Template Files

### Blog Post Template

See `guides/blog_post_template.astro` for complete Astro template.

### Quick Reference Checklist

See `guides/blog_writing_checklist.md` for one-page checklist version.

---

## Common Mistakes to Avoid

### ❌ Don't:
- Write less than 3,000 words (competitors have 500-1,200)
- Skip FAQs (missed featured snippet opportunities)
- Forget schema markup (lose rich result opportunities)
- Use generic content (competitors already have this)
- Skip internal linking (miss SEO value)
- Forget alt tags (accessibility + SEO issue)
- Write salesy copy (hurts trust and rankings)

### ✅ Do:
- Write comprehensive, helpful content (3,000+ words)
- Include 6-8 FAQs with schema markup
- Use real data from 30+ years experience
- Link internally to product/service pages
- Optimize all images with alt tags
- Focus on helping readers, not selling
- Include unique insights competitors don't have

---

## Performance Tracking

### Metrics to Monitor (Monthly)

**SEO Metrics:**
- Keyword rankings (target keywords)
- Organic traffic (sessions from search)
- Click-through rate (CTR from search results)
- Featured snippet captures
- Backlinks acquired

**Engagement Metrics:**
- Time on page (target: 3+ minutes)
- Scroll depth (target: 60%+ scroll)
- Bounce rate (target: <60%)
- Pages per session
- Social shares

**Conversion Metrics:**
- Contact form submissions from blog
- Consultation requests
- Email signups
- Downloads (if applicable)

### Review Schedule

**Weekly:** Check keyword rankings  
**Monthly:** Review traffic and engagement metrics  
**Quarterly:** Update content based on performance data  
**Annually:** Refresh top-performing posts

---

## Version History

**v2.0 (December 2025):**
- Replaced PDF SOP with markdown-based process
- Added comprehensive checklists
- Integrated with existing SEO strategy
- Added template references
- Included performance tracking guidelines

**v1.0 (Previous):**
- PDF-based SOP (static, hard to update)

---

## Questions or Updates?

This SOP should be a living document. If you find improvements or have questions:
1. Update this document directly
2. Share updates with the team
3. Keep version history updated

---

*This SOP ensures every blog post follows best practices, out-depths competitors, and drives qualified leads while maintaining brand consistency and SEO excellence.*
