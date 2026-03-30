import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, u as unescapeHTML, m as maybeRenderHead, d as addAttribute } from '../../../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { g as getCollection } from '../../../chunks/_astro_content_EAuKh-oG.mjs';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_DCfoLHMi.mjs';
import { g as getBlogHeroUrl, s as slugify } from '../../../chunks/slug_dIgpIVbT.mjs';
/* empty css                                          */
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://playerstall.com");
async function getStaticPaths() {
  const allEntries = await getCollection("blog");
  const periodSet = /* @__PURE__ */ new Set();
  for (const entry of allEntries) {
    const d = /* @__PURE__ */ new Date(entry.data.datePublished + "T12:00:00");
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    periodSet.add(`${yyyy}-${mm}`);
  }
  return Array.from(periodSet).sort((a, b) => b.localeCompare(a)).map((period) => ({
    params: { period }
  }));
}
const $$period = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$period;
  const { period } = Astro2.params;
  if (!period || !/^\d{4}-\d{2}$/.test(period)) {
    return Astro2.redirect("/blog");
  }
  const [yearStr, monthStr] = period.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const allEntries = await getCollection("blog");
  const posts = allEntries.filter((entry) => {
    const d = /* @__PURE__ */ new Date(entry.data.datePublished + "T12:00:00");
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  }).map((entry) => {
    const dateObj = /* @__PURE__ */ new Date(entry.data.datePublished + "T12:00:00");
    return {
      title: entry.data.title,
      date: dateObj.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      category: entry.data.category || "Blog",
      summary: (entry.data.description || entry.data.title).slice(0, 200) + "\u2026",
      heroImage: getBlogHeroUrl({ slug: entry.slug, heroImage: entry.data.heroImage, category: entry.data.category, tags: entry.data.tags }),
      url: `/blog/${entry.slug}`,
      dateSort: dateObj.getTime()
    };
  }).sort((a, b) => b.dateSort - a.dateSort);
  const monthLabel = new Date(year, month - 1, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const pageTitle = `Blog archives: ${monthLabel} | PlayerStall`;
  const pageDescription = `Blog posts from PlayerStall published in ${monthLabel}.`;
  const archiveUrl = `https://playerstall.com/blog/archives/${period}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://playerstall.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://playerstall.com/blog" },
      { "@type": "ListItem", position: 3, name: `Archives: ${monthLabel}`, item: archiveUrl }
    ]
  };
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Blog Archives: ${monthLabel}`,
    description: pageDescription,
    url: archiveUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://playerstall.com${post.url}`,
        name: post.title
      }))
    }
  };
  const archivesByMonth = allEntries.map((entry) => {
    const dateObj = /* @__PURE__ */ new Date(entry.data.datePublished + "T12:00:00");
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    return {
      archiveSlug: `${yyyy}-${mm}`,
      monthLabel: dateObj.toLocaleDateString("en-US", { year: "numeric", month: "short" })
    };
  }).reduce((acc, item) => {
    if (!acc.some((g) => g.archiveSlug === item.archiveSlug)) acc.push(item);
    return acc;
  }, []).sort((a, b) => b.archiveSlug.localeCompare(a.archiveSlug));
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": pageTitle, "description": pageDescription, "data-astro-cid-bk5sbpsn": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="blog-hero-section" data-astro-cid-bk5sbpsn> <div class="blog-hero-background" data-astro-cid-bk5sbpsn> <img src="https://playerstall.b-cdn.net/images/h1-img-8.jpg" alt="Blog archives" class="blog-hero-bg-image" data-astro-cid-bk5sbpsn> </div> <div class="blog-hero-background-overlay" data-astro-cid-bk5sbpsn></div> <div class="blog-hero-container" data-astro-cid-bk5sbpsn> <div class="blog-breadcrumbs" data-astro-cid-bk5sbpsn> <a href="/" data-astro-cid-bk5sbpsn>Home</a> <a href="/blog" data-astro-cid-bk5sbpsn>Blog</a> <span data-astro-cid-bk5sbpsn>Archives · ${monthLabel}</span> </div> <h1 class="blog-page-title" data-astro-cid-bk5sbpsn>Archives: ${monthLabel}</h1> <div class="blog-background-text" data-astro-cid-bk5sbpsn>archives</div> </div> </section> <section class="blog-content-section" id="blog-posts" data-astro-cid-bk5sbpsn> <div class="blog-container" data-astro-cid-bk5sbpsn> <main class="blog-main" data-astro-cid-bk5sbpsn> ${posts.length === 0 ? renderTemplate`<p class="archive-empty" data-astro-cid-bk5sbpsn>No posts found for this month.</p>` : renderTemplate`<div class="blog-mosaic" data-astro-cid-bk5sbpsn> ${posts.map((post, index) => renderTemplate`<article${addAttribute(index === 0 ? "blog-card featured" : "blog-card", "class")} data-astro-cid-bk5sbpsn> <div class="blog-card-meta" data-astro-cid-bk5sbpsn> <a${addAttribute(`/categories/${slugify(post.category)}`, "href")} class="blog-card-category" data-astro-cid-bk5sbpsn>${post.category}</a> <span class="blog-card-date" data-astro-cid-bk5sbpsn>${post.date}</span> </div> <a${addAttribute(post.url, "href")} class="blog-card-link" data-astro-cid-bk5sbpsn> <div class="blog-card-image" data-astro-cid-bk5sbpsn> <img${addAttribute(post.heroImage, "src")}${addAttribute(post.title, "alt")} loading="lazy" data-astro-cid-bk5sbpsn> </div> <div class="blog-card-body" data-astro-cid-bk5sbpsn> <h2 class="blog-card-title" data-astro-cid-bk5sbpsn>${post.title}</h2> <p class="blog-card-excerpt" data-astro-cid-bk5sbpsn>${post.summary}</p> <span class="blog-card-cta" data-astro-cid-bk5sbpsn>Read More</span> </div> </a> </article>`)} </div>`} </main> <aside class="blog-sidebar" data-astro-cid-bk5sbpsn> <nav class="sidebar-block sidebar-archives" aria-label="Archives by date" data-astro-cid-bk5sbpsn> <h3 class="sidebar-title" data-astro-cid-bk5sbpsn>Archives</h3> <ul class="archives-list" data-astro-cid-bk5sbpsn> ${archivesByMonth.map((group) => renderTemplate`<li data-astro-cid-bk5sbpsn> <a${addAttribute(`/blog/archives/${group.archiveSlug}`, "href")}${addAttribute(`archive-link${group.archiveSlug === period ? " active" : ""}`, "class")} data-astro-cid-bk5sbpsn> ${group.monthLabel} </a> </li>`)} </ul> </nav> <p class="sidebar-back" data-astro-cid-bk5sbpsn> <a href="/blog" data-astro-cid-bk5sbpsn>← Back to Blog</a> </p> </aside> </div> </section> <section class="cta-section" data-astro-cid-bk5sbpsn> <div class="container" data-astro-cid-bk5sbpsn> <div class="cta-content" data-astro-cid-bk5sbpsn> <h2 data-astro-cid-bk5sbpsn>Have Questions About Your Locker Room Project?</h2> <p data-astro-cid-bk5sbpsn>Get expert advice from 30+ years of experience. Free custom design consultation.</p> <a href="/contact" class="btn btn-primary btn-large" data-astro-cid-bk5sbpsn>Get Free Consultation</a> </div> </div> </section> `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', '<\/script> <script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify(breadcrumbSchema)), unescapeHTML(JSON.stringify(collectionSchema))) })}` })} `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/blog/archives/[period].astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/blog/archives/[period].astro";
const $$url = "/blog/archives/[period]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$period,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
