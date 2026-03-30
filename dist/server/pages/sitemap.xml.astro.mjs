import { g as getCollection } from '../chunks/_astro_content_EAuKh-oG.mjs';
import { p as programmaticStates, a as programmaticSports, w as woodVsMetalSports, l as levelMarketPages } from '../chunks/programmatic-pages_DbQyLVMz.mjs';
export { renderers } from '../renderers.mjs';

const staticPages = [
  { url: "", priority: "1.0", changefreq: "weekly" },
  // Homepage
  { url: "/products", priority: "0.9", changefreq: "weekly" },
  { url: "/shop", priority: "0.9", changefreq: "weekly" },
  { url: "/contact", priority: "0.8", changefreq: "monthly" },
  { url: "/about", priority: "0.7", changefreq: "monthly" },
  { url: "/our-process", priority: "0.7", changefreq: "monthly" },
  { url: "/gallery", priority: "0.7", changefreq: "monthly" },
  { url: "/blog", priority: "0.8", changefreq: "daily" },
  { url: "/hockey", priority: "0.8", changefreq: "monthly" },
  { url: "/sport", priority: "0.7", changefreq: "monthly" },
  { url: "/cart", priority: "0.6", changefreq: "weekly" },
  { url: "/checkout", priority: "0.6", changefreq: "monthly" },
  { url: "/locations", priority: "0.7", changefreq: "monthly" },
  { url: "/request-a-quote", priority: "0.8", changefreq: "monthly" },
  { url: "/contact-us", priority: "0.7", changefreq: "monthly" },
  { url: "/accessories", priority: "0.7", changefreq: "monthly" },
  { url: "/locker-budget-planner", priority: "0.6", changefreq: "monthly" },
  // Product pages
  { url: "/product-pro-locker", priority: "0.8", changefreq: "monthly" },
  { url: "/product-stadium-locker", priority: "0.8", changefreq: "monthly" },
  { url: "/product-elite-locker", priority: "0.8", changefreq: "monthly" },
  { url: "/product-legendary-locker", priority: "0.8", changefreq: "monthly" },
  { url: "/product-semi-pro-locker", priority: "0.8", changefreq: "monthly" },
  { url: "/product-varsity-locker", priority: "0.8", changefreq: "monthly" },
  { url: "/product-model-s", priority: "0.8", changefreq: "monthly" },
  { url: "/product-model-l", priority: "0.8", changefreq: "monthly" },
  { url: "/product-wood-locker-bench", priority: "0.7", changefreq: "monthly" },
  // Sport-specific pages (future)
  { url: "/sport/football", priority: "0.7", changefreq: "monthly" },
  { url: "/sport/hockey", priority: "0.7", changefreq: "monthly" },
  { url: "/sport/basketball", priority: "0.7", changefreq: "monthly" },
  { url: "/sport/baseball", priority: "0.7", changefreq: "monthly" },
  { url: "/sport/soccer", priority: "0.7", changefreq: "monthly" },
  { url: "/sport/lacrosse", priority: "0.7", changefreq: "monthly" }
];
const GET = async ({ site }) => {
  const baseUrl = site?.toString() || "https://playerstall.com";
  const blogPosts = await getCollection("blog");
  const comprehensiveBlogPosts = [
    "hockey-lockers-complete-guide-to-custom-athletic-storage-solutions",
    "football-lockers-complete-guide-to-custom-athletic-storage-solutions",
    "football-locker-room-design-guide",
    "college-sports-lockers-buyer-guide",
    "basketball-lockers-complete-guide-to-custom-athletic-storage-solutions",
    "wood-vs-metal-sports-lockers-comparison",
    "complete-guide-custom-sports-lockers",
    "college-athletic-locker-guide",
    "hockey-wood-lockers-complete-guide"
  ];
  const programmaticStateSportUrls = programmaticStates.flatMap(
    (state) => programmaticSports.map((sport) => `/${state.slug}-${sport.slug}-wood-lockers`)
  );
  const programmaticStateSportEntries = programmaticStateSportUrls.map((url) => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join("\n");
  const woodVsMetalEntries = woodVsMetalSports.map((s) => `  <url>
    <loc>${baseUrl}/wood-vs-metal-${s.slug}-lockers</loc>
    <lastmod>${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join("\n");
  const levelMarketEntries = levelMarketPages.map((p) => `  <url>
    <loc>${baseUrl}/${p.levelSlug}-${p.sportSlug}-wood-lockers</loc>
    <lastmod>${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticPages.map((page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
${programmaticStateSportEntries}
${woodVsMetalEntries}
${levelMarketEntries}
${blogPosts.map((post) => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.data.datePublished || (/* @__PURE__ */ new Date()).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join("\n")}
${comprehensiveBlogPosts.map((slug) => `  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join("\n")}
</urlset>`;
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
      // Cache for 1 hour
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
