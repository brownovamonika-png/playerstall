import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  redirects: {
    // Legacy .html routes → current Astro routes
    // Note: /index.html → / is omitted; it conflicts with the built root index.
    // Most hosts already serve /index.html as /. Configure /index.html→/ in your host (e.g. _redirects, vercel.json) if needed.
    '/sports_locker.html': '/services',
    '/staff.html': '/contact',
    '/other.html': '/services',
    '/custom.html': '/services',
    '/contact.html': '/contact',
    '/wall_locker.html': '/services',
    '/semi_pro.html': '/product-semi-pro-locker',
    '/pro.html': '/product-pro-locker',
    '/stadium.html': '/product-stadium-locker',
    '/varsity.html': '/product-varsity-locker',
    '/quote.html': '/request-a-quote',
  },
});

