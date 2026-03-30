import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DCfoLHMi.mjs';
import { g as getCollection } from '../../chunks/_astro_content_EAuKh-oG.mjs';
import { s as slugify, g as getBlogHeroUrl } from '../../chunks/slug_dIgpIVbT.mjs';
/* empty css                                         */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://playerstall.com");
async function getStaticPaths() {
  const entries = await getCollection("blog");
  const categorySlugs = /* @__PURE__ */ new Set();
  for (const entry of entries) {
    const cat = entry.data.category?.trim();
    if (cat) categorySlugs.add(slugify(cat));
  }
  return Array.from(categorySlugs).map((category) => ({ params: { category } }));
}
const $$category = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$category;
  const { category: categorySlug } = Astro2.params;
  if (!categorySlug) return Astro2.redirect("/blog");
  const entries = await getCollection("blog");
  const matching = entries.filter((entry) => slugify(entry.data.category ?? "") === categorySlug);
  const displayName = matching.length > 0 ? matching[0].data.category ?? categorySlug : categorySlug.replace(/-/g, " ");
  const posts = matching.map((entry) => {
    const dateObj = /* @__PURE__ */ new Date(entry.data.datePublished + "T12:00:00");
    return {
      title: entry.data.title,
      date: dateObj.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      category: entry.data.category || "Blog",
      summary: (entry.data.description || entry.data.title).slice(0, 200) + "\u2026",
      heroImage: getBlogHeroUrl({
        slug: entry.slug,
        heroImage: entry.data.heroImage,
        category: entry.data.category,
        tags: entry.data.tags
      }),
      url: `/blog/${entry.slug}`,
      dateSort: dateObj.getTime()
    };
  }).sort((a, b) => b.dateSort - a.dateSort);
  const title = `Category: ${displayName} | PlayerStall Blog`;
  const description = `Browse all blog posts in the ${displayName} category. Sports lockers, locker room design, and athletic facility insights from PlayerStall.`;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "data-astro-cid-2pzlju63": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="blog-hero-section" data-astro-cid-2pzlju63> <div class="blog-hero-background" data-astro-cid-2pzlju63> <img src="https://playerstall.b-cdn.net/images/h1-img-8.jpg" alt="" class="blog-hero-bg-image" data-astro-cid-2pzlju63> </div> <div class="blog-hero-background-overlay" data-astro-cid-2pzlju63></div> <div class="blog-hero-container" data-astro-cid-2pzlju63> <div class="blog-breadcrumbs" data-astro-cid-2pzlju63> <a href="/" data-astro-cid-2pzlju63>Home</a> <a href="/blog" data-astro-cid-2pzlju63>Blog</a> <span data-astro-cid-2pzlju63>Category: ${displayName}</span> </div> <h1 class="blog-page-title" data-astro-cid-2pzlju63>Category: ${displayName}</h1> </div> </section> <section class="blog-content-section" data-astro-cid-2pzlju63> <div class="blog-container" data-astro-cid-2pzlju63> <main class="blog-main" data-astro-cid-2pzlju63> ${posts.length > 0 ? renderTemplate`<div class="blog-mosaic" data-astro-cid-2pzlju63> ${posts.map((post, index) => renderTemplate`<article${addAttribute(index === 0 ? "blog-card featured" : "blog-card", "class")} data-astro-cid-2pzlju63> <a${addAttribute(post.url, "href")} class="blog-card-link" data-astro-cid-2pzlju63> <div class="blog-card-image" data-astro-cid-2pzlju63> <img${addAttribute(post.heroImage, "src")}${addAttribute(post.title, "alt")} loading="lazy" data-astro-cid-2pzlju63> </div> <div class="blog-card-body" data-astro-cid-2pzlju63> <div class="blog-card-meta" data-astro-cid-2pzlju63> <span class="blog-card-category" data-astro-cid-2pzlju63>${post.category}</span> <span class="blog-card-date" data-astro-cid-2pzlju63>${post.date}</span> </div> <h2 class="blog-card-title" data-astro-cid-2pzlju63>${post.title}</h2> <p class="blog-card-excerpt" data-astro-cid-2pzlju63>${post.summary}</p> <span class="blog-card-cta" data-astro-cid-2pzlju63>Read More</span> </div> </a> </article>`)} </div>` : renderTemplate`<p class="blog-empty" data-astro-cid-2pzlju63>No posts found in this category.</p>`} </main> </div> </section> <section class="cta-section" data-astro-cid-2pzlju63> <div class="container" data-astro-cid-2pzlju63> <div class="cta-content" data-astro-cid-2pzlju63> <h2 data-astro-cid-2pzlju63>Have Questions About Your Locker Room Project?</h2> <p data-astro-cid-2pzlju63>Get expert advice from 30+ years of experience. Free custom design consultation.</p> <a href="/contact" class="btn btn-primary btn-large" data-astro-cid-2pzlju63>Get Free Consultation</a> </div> </div> </section> ` })} `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/categories/[category].astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/categories/[category].astro";
const $$url = "/categories/[category]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$category,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
