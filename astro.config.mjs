import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

// #region agent log
fetch('http://127.0.0.1:7632/ingest/78dd8d1c-aacc-48ee-ae03-d1ab86aa14e4',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'53bd14'},body:JSON.stringify({sessionId:'53bd14',runId:'post-fix',hypothesisId:'A',location:'astro.config.mjs:4',message:'astro config imports resolved successfully (vercel adapter loaded)',data:{vercelType:typeof vercel,mdxType:typeof mdx},timestamp:Date.now()})}).catch(()=>{});
// #endregion

// CRM pages (/admin/*, /my-project/*) are SSR (prerender: false), so they ship
// as Vercel serverless functions. When DEPLOY_TARGET=public the postbuild
// script `scripts/purge-crm-from-public-build.mjs` strips those functions and
// routes from .vercel/output so the public playerstall.com project does not
// expose the CRM.

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
    '/new-room-planner': '/room-planner',
    '/new-room-planner/design': '/room-planner',
    '/new-room-planner/review': '/room-planner',
    '/room-planner-v2': '/room-planner',
    '/room-planner-v2/design': '/room-planner',
  },
});

