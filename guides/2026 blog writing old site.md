# Blog Writing Guide - PlayerStall

This guide provides comprehensive instructions for writing SEO-optimized blog posts for the PlayerStall website.

## Table of Contents
1. [Blog Post Structure](#blog-post-structure)
2. [SEO Requirements](#seo-requirements)
3. [Content Guidelines](#content-guidelines)
4. [Writing Best Practices](#writing-best-practices)
5. [Template](#template)
6. [Examples](#examples)

## Blog Post Structure

### Required Elements

Every blog post must include:

1. **Title Tag** (50-60 characters)
   - Format: `[Primary Keyword] | PlayerStall Blog`
   - Example: `Custom College Athletic Lockers Guide | PlayerStall Blog`

2. **Meta Description** (150-160 characters)
   - Include: Primary keyword, key benefit, CTA
   - Example: `Discover how to choose custom athletic lockers for college teams. 30+ years experience, lifetime guarantee. Free consultation available.`

3. **H1 Heading** (One per post)
   - Should match or closely align with title tag
   - Includes primary keyword naturally

4. **Introduction** (300-400 words)
   - Hook the reader
   - Introduce the topic
   - Preview what they'll learn
   - Include primary keyword in first paragraph

5. **Main Content Sections** (400-500 words each)
   - Use H2 headings for main sections
   - Use H3 for subsections
   - Include secondary keywords naturally
   - Provide actionable, valuable information

6. **Conclusion** (150-200 words)
   - Summarize key points
   - Reinforce main message
   - Include CTA

7. **Call-to-Action (CTA)**
   - Link to contact page or consultation form
   - Use action-oriented language
   - Example: "Ready to upgrade your locker room? Get a free custom design consultation today."

## SEO Requirements

### Minimum Standards

- **Word Count**: 2,000+ words per post
- **Readability**: Flesch-Kincaid score 60+ (8th-9th grade reading level)
- **Keyword Density**: 1-2% for primary keyword, natural usage
- **Internal Links**: 5-10 relevant internal links to related pages
- **External Links**: 2-3 authoritative sources (sports organizations, NCAA, etc.)
- **Images**: 3-5 images with optimized alt tags
- **Schema**: Article + FAQPage schema (see template)

### Keyword Strategy

**Primary Keywords** (use one per post):
- Custom sports lockers
- Wood athletic lockers
- College locker room lockers
- Professional sports lockers
- [Sport]-specific lockers (e.g., "football lockers", "hockey lockers")

**Secondary Keywords** (use naturally throughout):
- Athletic lockers
- Team lockers
- Custom lockers
- Locker room design
- Sports facility lockers
- Wood lockers vs metal lockers

**Long-Tail Keywords** (target in content):
- "how to choose sports lockers for college teams"
- "custom locker room design consultation"
- "athletic locker room installation process"
- "wood vs metal sports lockers comparison"

### Image Requirements

**Every Image Must Have**:
- Descriptive filename: `college-football-wood-lockers.jpg` (not `IMG_1234.jpg`)
- Alt tag with keywords: `Custom wood athletic lockers for college football teams`
- Optimized file size (compress before uploading)
- Relevant to content

**Image Placement**:
- Hero image at top (below H1)
- 1-2 images in main content sections
- 1 image in conclusion section

## Content Guidelines

### Tone and Voice

- **Professional yet approachable**: Expert knowledge, friendly delivery
- **Confident**: Emphasize 30+ years experience and expertise
- **Helpful**: Focus on solving reader's problems
- **Educational**: Teach, don't just sell

### Content Depth

**Out-depth competitors** by:
- Answering questions competitors don't address
- Providing specific examples and case studies
- Including actionable tips and checklists
- Sharing industry insights and best practices
- Addressing common concerns and objections

### Content Topics (High SEO Value)

1. **Sport-Specific Guides**
   - Football locker room design
   - Hockey locker room essentials
   - Basketball facility lockers
   - Baseball team lockers
   - Soccer locker room planning

2. **Comparison Content**
   - Wood vs metal sports lockers
   - Custom vs standard lockers
   - Different wood types for lockers

3. **Design & Planning Guides**
   - Locker room design best practices
   - Space planning for athletic facilities
   - Locker room layout optimization

4. **Installation & Maintenance**
   - Locker installation process
   - Maintenance tips for wood lockers
   - Locker room renovation guide

5. **ROI & Business Value**
   - Impact of quality lockers on recruiting
   - ROI of custom locker room design
   - Long-term value of wood lockers

6. **State/School-Specific Content**
   - [State] [Sport] locker room guide
   - College athletic facility trends by region

## Writing Best Practices

### Headings

- **H1**: One per post, includes primary keyword
- **H2**: Main sections (3-5 per post), include secondary keywords
- **H3**: Subsections, use naturally
- **Don't skip levels**: H1 → H2 → H3 (not H1 → H3)

### Paragraphs

- Keep paragraphs short (3-4 sentences max)
- Use white space effectively
- Break up long paragraphs with subheadings
- Use bullet points and numbered lists for clarity

### Links

**Internal Links** (5-10 per post):
- Link to relevant product pages (`/products`)
- Link to related blog posts
- Link to process page (`/our-process`)
- Link to contact page (`/contact`)
- Use descriptive anchor text: "custom wood athletic lockers" not "click here"

**External Links** (2-3 per post):
- Link to authoritative sources:
  - NCAA guidelines
  - Sports facility associations
  - Athletic department resources
  - Industry publications

### Lists

Use lists to improve readability:
- Bullet points for features, benefits, tips
- Numbered lists for step-by-step processes
- Keep items concise (1-2 sentences each)

### CTAs

Include CTAs throughout:
- After introduction: "Learn more about our custom design process"
- In main sections: "See our gallery of custom locker installations"
- In conclusion: "Ready to upgrade your locker room? Get a free consultation"

## Template

```markdown
---
// Astro frontmatter
import BaseLayout from '../layouts/BaseLayout.astro';

const title = "[Primary Keyword] | PlayerStall Blog";
const description = "[150-160 character meta description with keyword, benefit, and CTA]";
const primaryKeyword = "[primary keyword]";
const publishDate = "YYYY-MM-DD";
---

<BaseLayout title={title} description={description}>
  <article>
    <!-- Schema Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "[Article Title]",
      "description": "[Meta description]",
      "datePublished": "[YYYY-MM-DD]",
      "author": {
        "@type": "Organization",
        "name": "PlayerStall"
      },
      "publisher": {
        "@type": "Organization",
        "name": "PlayerStall",
        "logo": {
          "@type": "ImageObject",
          "url": "https://playerstall.com/images/logoblack2.png"
        }
      }
    }
    </script>

    <!-- Hero Image -->
    <img 
      src="/images/[descriptive-filename].jpg" 
      alt="[Descriptive alt text with keywords]"
      style="width: 100%; max-width: 1200px; margin: 0 auto; display: block;"
    />

    <!-- H1 Title -->
    <h1>[Article Title with Primary Keyword]</h1>

    <!-- Introduction (300-400 words) -->
    <section>
      <p>[Hook - engaging opening sentence]</p>
      <p>[Introduce topic and why it matters]</p>
      <p>[Preview what reader will learn]</p>
      <p>[Include primary keyword naturally]</p>
    </section>

    <!-- Main Content Section 1 (400-500 words) -->
    <section>
      <h2>[H2 Heading with Secondary Keyword]</h2>
      <p>[Content paragraph]</p>
      <p>[Content paragraph]</p>
      
      <h3>[H3 Subheading if needed]</h3>
      <p>[Content paragraph]</p>
      
      <!-- Image -->
      <img 
        src="/images/[descriptive-filename].jpg" 
        alt="[Descriptive alt text with keywords]"
        style="width: 100%; max-width: 800px; margin: 20px auto; display: block;"
      />
      
      <p>[Content paragraph]</p>
      
      <!-- Internal Link -->
      <p>Learn more about our <a href="/products">custom sports locker solutions</a>.</p>
    </section>

    <!-- Main Content Section 2 (400-500 words) -->
    <section>
      <h2>[H2 Heading with Secondary Keyword]</h2>
      <p>[Content paragraph]</p>
      
      <!-- List Example -->
      <ul>
        <li>[List item 1]</li>
        <li>[List item 2]</li>
        <li>[List item 3]</li>
      </ul>
      
      <p>[Content paragraph]</p>
      
      <!-- External Link -->
      <p>According to <a href="[authoritative source]" target="_blank" rel="noopener">[Source Name]</a>, [relevant information].</p>
    </section>

    <!-- Main Content Section 3 (400-500 words) -->
    <section>
      <h2>[H2 Heading with Secondary Keyword]</h2>
      <p>[Content paragraph]</p>
      <p>[Content paragraph]</p>
      
      <!-- CTA -->
      <p><strong>Ready to upgrade your locker room?</strong> <a href="/contact">Get a free custom design consultation</a> from our team of experts.</p>
    </section>

    <!-- FAQ Section (Optional but Recommended) -->
    <section>
      <h2>Frequently Asked Questions</h2>
      
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
          "@type": "Question",
          "name": "[Question 1]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[Answer 1]"
          }
        }, {
          "@type": "Question",
          "name": "[Question 2]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[Answer 2]"
          }
        }]
      }
      </script>

      <div>
        <h3>[Question 1]</h3>
        <p>[Answer 1 - 2-3 sentences]</p>
      </div>

      <div>
        <h3>[Question 2]</h3>
        <p>[Answer 2 - 2-3 sentences]</p>
      </div>
    </section>

    <!-- Conclusion (150-200 words) -->
    <section>
      <h2>Conclusion</h2>
      <p>[Summarize key points]</p>
      <p>[Reinforce main message]</p>
      <p>[Final CTA with link to contact page]</p>
    </section>

    <!-- Related Content -->
    <section>
      <h2>Related Articles</h2>
      <ul>
        <li><a href="/blog/[related-post-1]">[Related Post Title 1]</a></li>
        <li><a href="/blog/[related-post-2]">[Related Post Title 2]</a></li>
      </ul>
    </section>
  </article>
</BaseLayout>

<style>
  article {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  h1 {
    font-family: 'Oswald', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: #0d0d0d;
  }

  h2 {
    font-family: 'Oswald', sans-serif;
    font-size: 2rem;
    font-weight: 600;
    margin-top: 40px;
    margin-bottom: 20px;
    color: #0d0d0d;
  }

  h3 {
    font-family: 'Oswald', sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 30px;
    margin-bottom: 15px;
    color: #0d0d0d;
  }

  p {
    font-family: 'Yantramanav', sans-serif;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 20px;
    color: #0d0d0d;
  }

  a {
    color: #fe5900;
    text-decoration: underline;
  }

  a:hover {
    color: #cc4700;
  }

  ul, ol {
    margin: 20px 0;
    padding-left: 30px;
  }

  li {
    font-family: 'Yantramanav', sans-serif;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.75rem;
    }

    h3 {
      font-size: 1.25rem;
    }

    p, li {
      font-size: 1rem;
    }
  }
</style>
```

## Examples

### Example 1: Sport-Specific Guide

**Title**: "Complete Guide to Custom Football Lockers for College Teams | PlayerStall Blog"

**Primary Keyword**: "custom football lockers"

**Structure**:
1. Introduction: Why football lockers matter for college programs
2. Section 1: Key features of quality football lockers
3. Section 2: Design considerations for football locker rooms
4. Section 3: Wood vs metal for football lockers
5. Section 4: Installation and maintenance tips
6. FAQ: Common questions about football lockers
7. Conclusion: CTA for free consultation

### Example 2: Comparison Content

**Title**: "Wood vs Metal Sports Lockers: Complete Comparison Guide | PlayerStall Blog"

**Primary Keyword**: "wood vs metal sports lockers"

**Structure**:
1. Introduction: The importance of choosing the right locker material
2. Section 1: Benefits of wood lockers
3. Section 2: Benefits of metal lockers
4. Section 3: Side-by-side comparison
5. Section 4: Which is right for your facility?
6. FAQ: Common questions about locker materials
7. Conclusion: CTA for custom consultation

## Pre-Publication Checklist

Before publishing any blog post, verify:

- [ ] Title tag is 50-60 characters and includes primary keyword
- [ ] Meta description is 150-160 characters with CTA
- [ ] H1 includes primary keyword (one per post)
- [ ] Word count is 2,000+ words
- [ ] 5-10 internal links included with descriptive anchor text
- [ ] 2-3 external links to authoritative sources
- [ ] 3-5 images with descriptive alt tags and keywords
- [ ] Article schema markup included
- [ ] FAQPage schema included (if FAQs present)
- [ ] All headings follow proper hierarchy (H1 → H2 → H3)
- [ ] CTAs included throughout (at least 3)
- [ ] Mobile responsive (test on mobile device)
- [ ] Readability score 60+ (check with online tool)
- [ ] No spelling or grammar errors
- [ ] All links work correctly
- [ ] Images are optimized (compressed, proper file size)

## Post-Publication

After publishing:

1. **Submit to Google Search Console** (if not auto-indexed)
2. **Share on Social Media** (Facebook, LinkedIn, Twitter)
3. **Add to Blog Index Page** (`/blog`)
4. **Update Related Posts** (add links to new post in related articles)
5. **Monitor Performance** (track in Google Analytics)

## Resources

- **SEO Tools**: Google Keyword Planner, Ahrefs, SEMrush
- **Readability Checker**: Readable.io, Hemingway Editor
- **Image Optimization**: TinyPNG, Squoosh
- **Schema Validator**: Google Rich Results Test
- **Competitor Analysis**: Review competitor blog posts for inspiration

---

*Last Updated: December 2025*
*For questions or feedback, contact: playerstallsports@gmail.com*
