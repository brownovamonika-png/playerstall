import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://playerstall.com',
  output: 'static',
  adapter: vercel(),
  integrations: [mdx()],
  vite: {
    build: {
      // Room planner / 3D client bundles exceed Vite’s default 500 kB warning threshold.
      chunkSizeWarningLimit: 900,
    },
  },
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

