# Blog Drafts

This folder contains draft blog posts that are not yet published. It includes **105 posts imported from the WordPress export** (`playerstallwoodsportslockers.WordPress.2026-02-09.xml`). To re-run the import or add more from a new export, use:

```bash
node scripts/extract-wordpress-blogs.mjs
```

## Usage

- Place draft blog posts here while they're being written or reviewed
- Draft posts will not appear in the main blog listing page
- Once ready to publish, move the `.astro` file to the parent `blog/` directory
- Update the `blog.astro` file to include the new post in the posts array

## Draft Post Template

When creating a new draft, follow the existing blog post structure:

1. Use `BaseLayout` component
2. Include proper SEO meta tags (title, description)
3. Add Article + FAQPage schema markup
4. Follow the content structure: H1 → Introduction → Main sections → Conclusion → CTA
5. Ensure 2,000+ words for SEO
6. Include optimized images with descriptive alt tags
