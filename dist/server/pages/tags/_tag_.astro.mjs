import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DCfoLHMi.mjs';
import { g as getCollection } from '../../chunks/_astro_content_EAuKh-oG.mjs';
import { s as slugify, g as getBlogHeroUrl } from '../../chunks/slug_dIgpIVbT.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://playerstall.com");
async function getStaticPaths() {
  const entries = await getCollection("blog");
  const tagSlugs = /* @__PURE__ */ new Set();
  for (const entry of entries) {
    const tags = entry.data.tags ?? [];
    for (const t of tags) {
      const s = slugify(t);
      if (s) tagSlugs.add(s);
    }
  }
  return Array.from(tagSlugs).map((tag) => ({ params: { tag } }));
}
const $$tag = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$tag;
  const { tag: tagSlug } = Astro2.params;
  if (!tagSlug) return Astro2.redirect("/blog");
  const entries = await getCollection("blog");
  const matching = entries.filter(
    (entry) => (entry.data.tags ?? []).some((t) => slugify(t) === tagSlug)
  );
  const displayName = matching.length > 0 ? (matching[0].data.tags ?? []).find((t) => slugify(t) === tagSlug) ?? tagSlug : tagSlug;
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
  const title = `Posts tagged "${displayName.replace(/-/g, " ")}" | PlayerStall Blog`;
  const description = `Browse all blog posts tagged with ${displayName.replace(/-/g, " ")}. Sports lockers, locker room design, and athletic facility insights from PlayerStall.`;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "data-astro-cid-tge3q7ae": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="blog-hero-section" data-astro-cid-tge3q7ae> <div class="blog-hero-background" data-astro-cid-tge3q7ae> <img src="https://playerstall.b-cdn.net/images/h1-img-8.jpg" alt="" class="blog-hero-bg-image" data-astro-cid-tge3q7ae> </div> <div class="blog-hero-background-overlay" data-astro-cid-tge3q7ae></div> <div class="blog-hero-container" data-astro-cid-tge3q7ae> <div class="blog-breadcrumbs" data-astro-cid-tge3q7ae> <a href="/" data-astro-cid-tge3q7ae>Home</a> <a href="/blog" data-astro-cid-tge3q7ae>Blog</a> <span data-astro-cid-tge3q7ae>Tag: ${displayName.replace(/-/g, " ")}</span> </div> <h1 class="blog-page-title" data-astro-cid-tge3q7ae>Tag: ${displayName.replace(/-/g, " ")}</h1> </div> </section> <section class="blog-content-section" data-astro-cid-tge3q7ae> <div class="blog-container" data-astro-cid-tge3q7ae> <main class="blog-main" data-astro-cid-tge3q7ae> ${posts.length > 0 ? renderTemplate`<div class="blog-mosaic" data-astro-cid-tge3q7ae> ${posts.map((post, index) => renderTemplate`<article${addAttribute(index === 0 ? "blog-card featured" : "blog-card", "class")} data-astro-cid-tge3q7ae> <a${addAttribute(post.url, "href")} class="blog-card-link" data-astro-cid-tge3q7ae> <div class="blog-card-image" data-astro-cid-tge3q7ae> <img${addAttribute(post.heroImage, "src")}${addAttribute(post.title, "alt")} loading="lazy" data-astro-cid-tge3q7ae> </div> <div class="blog-card-body" data-astro-cid-tge3q7ae> <div class="blog-card-meta" data-astro-cid-tge3q7ae> <span class="blog-card-category" data-astro-cid-tge3q7ae>${post.category}</span> <span class="blog-card-date" data-astro-cid-tge3q7ae>${post.date}</span> </div> <h2 class="blog-card-title" data-astro-cid-tge3q7ae>${post.title}</h2> <p class="blog-card-excerpt" data-astro-cid-tge3q7ae>${post.summary}</p> <span class="blog-card-cta" data-astro-cid-tge3q7ae>Read More</span> </div> </a> </article>`)} </div>` : renderTemplate`<p class="blog-empty" data-astro-cid-tge3q7ae>No posts found for this tag.</p>`} </main> </div> </section> <section class="cta-section" data-astro-cid-tge3q7ae> <div class="container" data-astro-cid-tge3q7ae> <div class="cta-content" data-astro-cid-tge3q7ae> <h2 data-astro-cid-tge3q7ae>Have Questions About Your Locker Room Project?</h2> <p data-astro-cid-tge3q7ae>Get expert advice from 30+ years of experience. Free custom design consultation.</p> <a href="/contact" class="btn btn-primary btn-large" data-astro-cid-tge3q7ae>Get Free Consultation</a> </div> </div> </section> ` })} `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/tags/[tag].astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/tags/[tag].astro";
const $$url = "/tags/[tag]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$tag,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
