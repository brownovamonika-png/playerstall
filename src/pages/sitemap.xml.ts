import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { programmaticStates, programmaticSports, woodVsMetalSports, levelMarketPages } from '../lib/programmatic-pages';

// Static pages with priorities
const staticPages = [
	{ url: '', priority: '1.0', changefreq: 'weekly' }, // Homepage
	{ url: '/products', priority: '0.9', changefreq: 'weekly' },
	{ url: '/shop', priority: '0.9', changefreq: 'weekly' },
	{ url: '/contact', priority: '0.8', changefreq: 'monthly' },
	{ url: '/about', priority: '0.7', changefreq: 'monthly' },
	{ url: '/our-process', priority: '0.7', changefreq: 'monthly' },
	{ url: '/gallery', priority: '0.7', changefreq: 'monthly' },
	{ url: '/blog', priority: '0.8', changefreq: 'daily' },
	{ url: '/hockey', priority: '0.8', changefreq: 'monthly' },
	{ url: '/sport', priority: '0.7', changefreq: 'monthly' },
	{ url: '/cart', priority: '0.6', changefreq: 'weekly' },
	{ url: '/checkout', priority: '0.6', changefreq: 'monthly' },
	{ url: '/locations', priority: '0.7', changefreq: 'monthly' },
	{ url: '/request-a-quote', priority: '0.8', changefreq: 'monthly' },
	{ url: '/contact-us', priority: '0.7', changefreq: 'monthly' },
	{ url: '/accessories', priority: '0.7', changefreq: 'monthly' },
	{ url: '/locker-budget-planner', priority: '0.6', changefreq: 'monthly' },
	// Product pages
	{ url: '/product-pro-locker', priority: '0.8', changefreq: 'monthly' },
	{ url: '/product-stadium-locker', priority: '0.8', changefreq: 'monthly' },
	{ url: '/product-elite-locker', priority: '0.8', changefreq: 'monthly' },
	{ url: '/product-legendary-locker', priority: '0.8', changefreq: 'monthly' },
	{ url: '/product-semi-pro-locker', priority: '0.8', changefreq: 'monthly' },
	{ url: '/product-varsity-locker', priority: '0.8', changefreq: 'monthly' },
	{ url: '/product-model-s', priority: '0.8', changefreq: 'monthly' },
	{ url: '/product-model-l', priority: '0.8', changefreq: 'monthly' },
	{ url: '/product-wood-locker-bench', priority: '0.7', changefreq: 'monthly' },
	// Sport-specific pages (future)
	{ url: '/sport/football', priority: '0.7', changefreq: 'monthly' },
	{ url: '/sport/hockey', priority: '0.7', changefreq: 'monthly' },
	{ url: '/sport/basketball', priority: '0.7', changefreq: 'monthly' },
	{ url: '/sport/baseball', priority: '0.7', changefreq: 'monthly' },
	{ url: '/sport/soccer', priority: '0.7', changefreq: 'monthly' },
	{ url: '/sport/lacrosse', priority: '0.7', changefreq: 'monthly' },
];

export const GET: APIRoute = async ({ site }) => {
	const baseUrl = site?.toString() || 'https://playerstall.com';
	
	// Get all blog posts from content collection
	const blogPosts = await getCollection('blog');
	
	// Get comprehensive Astro blog posts from pages/blog
	const comprehensiveBlogPosts = [
		'hockey-lockers-complete-guide-to-custom-athletic-storage-solutions',
		'football-lockers-complete-guide-to-custom-athletic-storage-solutions',
		'football-locker-room-design-guide',
		'college-sports-lockers-buyer-guide',
		'basketball-lockers-complete-guide-to-custom-athletic-storage-solutions',
		'wood-vs-metal-sports-lockers-comparison',
		'complete-guide-custom-sports-lockers',
		'college-athletic-locker-guide',
		'hockey-wood-lockers-complete-guide'
	];

	// Programmatic state + sport pages
	const programmaticStateSportUrls = programmaticStates.flatMap((state) =>
		programmaticSports.map((sport) => `/${state.slug}-${sport.slug}-wood-lockers`)
	);
	const programmaticStateSportEntries = programmaticStateSportUrls.map((url) => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n');

	// Wood vs metal [sport] lockers pages
	const woodVsMetalEntries = woodVsMetalSports.map((s) => `  <url>
    <loc>${baseUrl}/wood-vs-metal-${s.slug}-lockers</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n');

	// Level/market pages (collegiate, high school, professional, college × sport)
	const levelMarketEntries = levelMarketPages.map((p) => `  <url>
    <loc>${baseUrl}/${p.levelSlug}-${p.sportSlug}-wood-lockers</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n');
	
	// Generate sitemap XML
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${programmaticStateSportEntries}
${woodVsMetalEntries}
${levelMarketEntries}
${blogPosts.map(post => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.data.datePublished || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
${comprehensiveBlogPosts.map(slug => `  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
		},
	});
};
