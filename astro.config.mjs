import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  redirects: {
    // Services page renamed to products; preserve old URL
    '/services': '/products',
    // Legacy .html routes → current Astro routes
    // Note: /index.html → / is omitted; it conflicts with the built root index.
    // Most hosts already serve /index.html as /. Configure /index.html→/ in your host (e.g. _redirects, vercel.json) if needed.
    '/sports_locker.html': '/products',
    '/staff.html': '/contact',
    '/other.html': '/products',
    '/custom.html': '/products',
    '/contact.html': '/contact',
    '/wall_locker.html': '/products',
    '/full.html': '/products',
    '/football_stalls.html': '/sport/football',
    '/hockey_stalls.html': '/sport/hockey',
    '/basketball_stalls.html': '/sport/basketball',
    '/baseball_stalls.html': '/sport/baseball',
    '/soccer_stalls.html': '/sport/soccer',
    '/semi_pro.html': '/product-semi-pro-locker',
    '/pro.html': '/product-pro-locker',
    '/stadium.html': '/product-stadium-locker',
    '/varsity.html': '/product-varsity-locker',
    '/quote.html': '/request-a-quote',
  },
});

