import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional().default(''),
    category: z.string().default('Uncategorized'),
    tags: z.array(z.string()).optional().default([]),
    datePublished: z.string().transform((s) => (s && s.trim() ? s : '2000-01-01')),
    dateModified: z.string().optional(),
    readTime: z.string().default('5 min read'),
    author: z.string().default('PlayerStall'),
    wordCount: z.number().optional(),
    heroImage: z.string().optional(),
    /** Optional alt text for the hero image (for accessibility/SEO). Falls back to post title if unset. */
    heroImageAlt: z.string().optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional().default([]),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  blog,
};
