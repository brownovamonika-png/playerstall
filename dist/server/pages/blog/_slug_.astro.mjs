import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, s as spreadAttributes, a as renderTemplate, r as renderComponent, F as Fragment, u as unescapeHTML } from '../../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { g as getCollection } from '../../chunks/_astro_content_EAuKh-oG.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DCfoLHMi.mjs';
import 'clsx';
import { g as getBlogHeroUrl, s as slugify } from '../../chunks/slug_dIgpIVbT.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("https://playerstall.com");
const $$BlogImage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogImage;
  const { src, alt = "", title, ...rest } = Astro2.props;
  const explicitAlt = typeof alt === "string" ? alt.trim() : "";
  const titleAlt = typeof title === "string" ? title.trim() : "";
  const imageAlt = explicitAlt || titleAlt || "PlayerStall custom sports locker room installation";
  return renderTemplate`${maybeRenderHead()}<figure class="blog-figure"> <img${addAttribute(src, "src")}${addAttribute(imageAlt, "alt")}${addAttribute(title ?? void 0, "title")} loading="lazy"${spreadAttributes(rest)}> ${explicitAlt ? renderTemplate`<figcaption>${explicitAlt}</figcaption>` : null} </figure>`;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/components/BlogImage.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro("https://playerstall.com");
async function getStaticPaths() {
  const staticBlogSlugs = new Set(
    Object.keys({}).map((path) => path.replace(/^\.\/(.*)\.astro$/, "$1")).filter((s) => s !== "[slug]")
  );
  const allEntries = await getCollection("blog", ({ data }) => !data.draft);
  const blogEntries = allEntries.filter((e) => !staticBlogSlugs.has(e.slug));
  const sorted = [...blogEntries].sort(
    (a, b) => new Date(b.data.datePublished).getTime() - new Date(a.data.datePublished).getTime()
  );
  return sorted.map((entry, i) => {
    const prevEntry = i > 0 ? { slug: sorted[i - 1].slug, title: sorted[i - 1].data.title } : null;
    const nextEntry = i < sorted.length - 1 ? { slug: sorted[i + 1].slug, title: sorted[i + 1].data.title } : null;
    const sameCategory = sorted.filter(
      (e) => e.slug !== entry.slug && e.data.category === entry.data.category
    );
    const toRelated = (e) => ({
      slug: e.slug,
      title: e.data.title,
      datePublished: e.data.datePublished,
      category: e.data.category,
      heroImage: e.data.heroImage,
      tags: e.data.tags
    });
    const relatedEntries = sameCategory.slice(0, 3).map(toRelated);
    if (relatedEntries.length < 3) {
      const rest = sorted.filter((e) => e.slug !== entry.slug && !sameCategory.some((s) => s.slug === e.slug)).slice(0, 3 - relatedEntries.length);
      for (const e of rest) {
        relatedEntries.push(toRelated(e));
      }
    }
    const sidebarCategories = [...new Set(sorted.map((e) => e.data.category).filter(Boolean))].sort().map((cat) => ({ name: cat, slug: slugify(cat) }));
    const sidebarLatestPosts = sorted.filter((e) => e.slug !== entry.slug).slice(0, 4).map((e) => ({
      slug: e.slug,
      title: e.data.title,
      datePublished: e.data.datePublished,
      category: e.data.category,
      heroImage: e.data.heroImage,
      tags: e.data.tags
    }));
    const allTags = [...new Set(sorted.flatMap((e) => e.data.tags || []).filter(Boolean))].sort().slice(0, 20);
    return {
      params: { slug: entry.slug },
      props: { entry, prevEntry, nextEntry, relatedEntries, sidebarCategories, sidebarLatestPosts, allTags }
    };
  });
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { entry, prevEntry, nextEntry, relatedEntries, sidebarCategories, sidebarLatestPosts, allTags } = Astro2.props;
  const { Content } = await entry.render();
  const post = entry.data;
  const heroUrl = getBlogHeroUrl({
    slug: entry.slug,
    heroImage: post.heroImage,
    category: post.category,
    tags: post.tags
  });
  const formattedDate = post.datePublished ? new Date(post.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";
  const categorySlug = slugify(post.category);
  const postUrl = `https://playerstall.com/blog/${entry.slug}`;
  const dateModified = post.dateModified ?? post.datePublished;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description || "",
    datePublished: post.datePublished,
    dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl
    },
    author: {
      "@type": "Organization",
      name: post.author
    },
    publisher: {
      "@type": "Organization",
      name: "PlayerStall",
      logo: {
        "@type": "ImageObject",
        url: "https://playerstall.b-cdn.net/images/logoblack2.png"
      }
    },
    image: heroUrl,
    wordCount: post.wordCount
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://playerstall.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://playerstall.com/blog" },
      { "@type": "ListItem", position: 3, name: post.category, item: `https://playerstall.com/categories/${categorySlug}` },
      { "@type": "ListItem", position: 4, name: post.title, item: postUrl }
    ]
  };
  const faqSchema = post.faqs?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  } : null;
  const heroAlt = post.heroImageAlt ?? post.title;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${post.title} | PlayerStall`, "description": post.description || "", "ogImage": heroUrl, "isArticle": true, "articlePublishedTime": post.datePublished, "data-astro-cid-4sn4zg3r": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<article class="blog-post" data-astro-cid-4sn4zg3r> <div class="qodef-page-title" data-astro-cid-4sn4zg3r> <div class="qodef-page-title-inner" data-astro-cid-4sn4zg3r> <div class="qodef-breadcrumbs" data-astro-cid-4sn4zg3r> <a href="/" data-astro-cid-4sn4zg3r>Home</a> <span class="qodef-breadcrumbs-sep" data-astro-cid-4sn4zg3r></span> <a${addAttribute(`/categories/${categorySlug}`, "href")} data-astro-cid-4sn4zg3r>${post.category}</a> <span class="qodef-breadcrumbs-sep" data-astro-cid-4sn4zg3r></span> <span class="qodef-breadcrumbs-current" data-astro-cid-4sn4zg3r>${post.title}</span> </div> </div> </div> <div class="qodef-page-inner" data-astro-cid-4sn4zg3r> <div class="qodef-grid-inner" data-astro-cid-4sn4zg3r> <div class="qodef-page-content" data-astro-cid-4sn4zg3r> <div class="qodef-single-post" data-astro-cid-4sn4zg3r> <div class="qodef-e-media" data-astro-cid-4sn4zg3r> <img${addAttribute(heroUrl, "src")}${addAttribute(heroAlt, "alt")} width="1300" height="806" loading="eager" fetchpriority="high" data-astro-cid-4sn4zg3r> </div> <div class="qodef-e-info qodef-info-top" data-astro-cid-4sn4zg3r> <a${addAttribute(`/categories/${categorySlug}`, "href")} class="qodef-e-info-category" data-astro-cid-4sn4zg3r>${post.category}</a> <time class="qodef-e-info-date"${addAttribute(post.datePublished, "datetime")} data-astro-cid-4sn4zg3r>${formattedDate}</time> </div> <h1 class="qodef-e-title" data-astro-cid-4sn4zg3r>${post.title}</h1> <div class="qodef-e-text" data-astro-cid-4sn4zg3r> ${renderComponent($$result2, "Content", Content, { "components": { img: $$BlogImage }, "data-astro-cid-4sn4zg3r": true })} </div> <div class="qodef-e-info qodef-info-bottom" data-astro-cid-4sn4zg3r> <div class="qodef-info-bottom-left" data-astro-cid-4sn4zg3r> ${post.tags?.length ? renderTemplate`<div class="qodef-e-tags" data-astro-cid-4sn4zg3r> ${post.tags.map((tag) => renderTemplate`<a${addAttribute(`/tags/${slugify(tag)}`, "href")} class="qodef-tag" data-astro-cid-4sn4zg3r>${tag.replace(/-/g, " ")}</a>`)} </div>` : null} </div> <div class="qodef-info-bottom-right" data-astro-cid-4sn4zg3r> <span class="qodef-share-label" data-astro-cid-4sn4zg3r>Share</span> <a${addAttribute(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, "href")} target="_blank" rel="noopener noreferrer" class="qodef-share-icon" aria-label="Share on Facebook" data-astro-cid-4sn4zg3r> <svg width="10" height="18" viewBox="0 0 10 18" data-astro-cid-4sn4zg3r><path d="M6.5 10.2H9l.4-2.6H6.5V5.8c0-1.1.3-2 2-2h1.3V1.2C9.4 1.1 8.3 1 7.1 1 4.8 1 3.2 2.5 3.2 5.3v2.3H.5v2.6h2.7V18h3.3v-7.8z" data-astro-cid-4sn4zg3r></path></svg> </a> <a${addAttribute(`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`, "href")} target="_blank" rel="noopener noreferrer" class="qodef-share-icon" aria-label="Share on Twitter" data-astro-cid-4sn4zg3r> <svg width="18" height="15" viewBox="0 0 18 15" data-astro-cid-4sn4zg3r><path d="M18 1.8c-.7.3-1.4.5-2.1.6.8-.5 1.3-1.2 1.6-2-.7.4-1.5.7-2.3.9C14.5.5 13.5 0 12.3 0c-2.2 0-3.9 1.8-3.9 4 0 .3 0 .6.1.9C5.6 4.7 3 3.1 1.2.7c-.3.6-.5 1.2-.5 1.9 0 1.4.7 2.6 1.7 3.3-.6 0-1.2-.2-1.7-.5v.1c0 1.9 1.4 3.5 3.2 3.9-.3.1-.7.1-1.1.1-.3 0-.5 0-.8-.1.5 1.6 2 2.8 3.8 2.8-1.4 1.1-3.2 1.8-5.1 1.8H0c1.8 1.2 4 1.8 6.3 1.8 7.5 0 11.7-6.3 11.7-11.7V3.5c.8-.6 1.5-1.3 2-2.1z" data-astro-cid-4sn4zg3r></path></svg> </a> <a${addAttribute(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.title)}`, "href")} target="_blank" rel="noopener noreferrer" class="qodef-share-icon" aria-label="Share on LinkedIn" data-astro-cid-4sn4zg3r> <svg width="16" height="16" viewBox="0 0 16 16" data-astro-cid-4sn4zg3r><path d="M3.6 16H.3V5.3h3.3V16zM1.9 3.9C.9 3.9 0 3 0 1.9S.9 0 1.9 0s1.9.9 1.9 1.9S3 3.9 1.9 3.9zM16 16h-3.3v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V16H5.7V5.3h3.2v1.5c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V16z" data-astro-cid-4sn4zg3r></path></svg> </a> <a${addAttribute(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(postUrl)}&media=${encodeURIComponent(heroUrl)}&description=${encodeURIComponent(post.title)}`, "href")} target="_blank" rel="noopener noreferrer" class="qodef-share-icon" aria-label="Share on Pinterest" data-astro-cid-4sn4zg3r> <svg width="14" height="18" viewBox="0 0 14 18" data-astro-cid-4sn4zg3r><path d="M7 0C3.1 0 0 3.1 0 7c0 2.8 1.6 5.2 4 6.3 0-.6 0-1.2.2-1.8l1-4.3s-.3-.5-.3-1.2c0-1.2.7-2 1.5-2 .7 0 1.1.5 1.1 1.2 0 .7-.5 1.8-.7 2.8-.2.8.4 1.5 1.3 1.5 1.5 0 2.5-1.9 2.5-4.2 0-1.7-1.2-3-3.3-3-2.4 0-3.9 1.8-3.9 3.8 0 .7.2 1.2.5 1.5.1.2.2.2.1.4l-.2.6c0 .2-.2.3-.4.2-1.1-.4-1.6-1.6-1.6-2.9 0-2.2 1.8-4.7 5.5-4.7 2.9 0 4.8 2.1 4.8 4.4 0 3-1.7 5.3-4.1 5.3-.8 0-1.6-.4-1.8-.9l-.5 2c-.2.7-.6 1.3-1 1.9C5.6 18 6.3 18 7 18c3.9 0 7-3.1 7-7S10.9 0 7 0z" data-astro-cid-4sn4zg3r></path></svg> </a> </div> </div> <div class="qodef-author-info" data-astro-cid-4sn4zg3r> <div class="qodef-author-content" data-astro-cid-4sn4zg3r> <h4 class="qodef-author-heading" data-astro-cid-4sn4zg3r> <span class="qodef-author-label" data-astro-cid-4sn4zg3r>The author</span> <span class="qodef-author-name" data-astro-cid-4sn4zg3r>${post.author}</span> </h4> <p class="qodef-author-desc" data-astro-cid-4sn4zg3r>PlayerStall has been building custom wood sports lockers for collegiate and professional teams for over 30 years. Canadian-owned and operated since 1996, we offer a five year guarantee on all of our products.</p> </div> </div> <nav class="qodef-post-nav" aria-label="Post navigation" data-astro-cid-4sn4zg3r> ${prevEntry ? renderTemplate`<a class="qodef-nav-link qodef-nav-prev"${addAttribute(`/blog/${prevEntry.slug}`, "href")} data-astro-cid-4sn4zg3r> <svg width="26" height="51" viewBox="0 0 26 51" data-astro-cid-4sn4zg3r><polygon points="25,0 26,0 1,25.5 26,51 25,51 0,25.5" data-astro-cid-4sn4zg3r></polygon></svg> <span class="qodef-nav-label" data-astro-cid-4sn4zg3r>Previous</span> </a>` : renderTemplate`<span class="qodef-nav-link qodef-nav-prev qodef-nav-empty" data-astro-cid-4sn4zg3r></span>`} ${nextEntry ? renderTemplate`<a class="qodef-nav-link qodef-nav-next"${addAttribute(`/blog/${nextEntry.slug}`, "href")} data-astro-cid-4sn4zg3r> <span class="qodef-nav-label" data-astro-cid-4sn4zg3r>Next</span> <svg width="26" height="51" viewBox="0 0 26 51" data-astro-cid-4sn4zg3r><polygon points="1,0 0,0 25,25.5 0,51 1,51 26,25.5" data-astro-cid-4sn4zg3r></polygon></svg> </a>` : renderTemplate`<span class="qodef-nav-link qodef-nav-next qodef-nav-empty" data-astro-cid-4sn4zg3r></span>`} </nav> ${relatedEntries.length > 0 ? renderTemplate`<div class="qodef-related-posts" data-astro-cid-4sn4zg3r> <h3 class="qodef-related-title" data-astro-cid-4sn4zg3r>Related posts</h3> <div class="qodef-related-grid" data-astro-cid-4sn4zg3r> ${relatedEntries.map((rel) => {
    const relDate = rel.datePublished ? new Date(rel.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";
    const relHeroUrl = getBlogHeroUrl({ slug: rel.slug, heroImage: rel.heroImage, category: rel.category, tags: rel.tags });
    return renderTemplate`<a class="qodef-related-card"${addAttribute(`/blog/${rel.slug}`, "href")} data-astro-cid-4sn4zg3r> <div class="qodef-related-card-img" data-astro-cid-4sn4zg3r> <img${addAttribute(relHeroUrl, "src")}${addAttribute(rel.title, "alt")} loading="lazy" width="300" height="300" data-astro-cid-4sn4zg3r> </div> <div class="qodef-related-card-body" data-astro-cid-4sn4zg3r> <span class="qodef-related-card-date" data-astro-cid-4sn4zg3r>${relDate}</span> <h4 class="qodef-related-card-title" data-astro-cid-4sn4zg3r>${rel.title}</h4> </div> </a>`;
  })} </div> </div>` : null} </div> </div> <aside class="qodef-page-sidebar" data-astro-cid-4sn4zg3r> <div class="qodef-widget qodef-widget-about" data-astro-cid-4sn4zg3r> <h4 class="qodef-widget-title" data-astro-cid-4sn4zg3r>about us</h4> <p data-astro-cid-4sn4zg3r>PlayerStall has been building custom wood sports lockers for collegiate and professional teams for over 30 years. Canadian-owned and operated since 1996, we offer a five year guarantee and free design consultation.</p> </div> <div class="qodef-widget qodef-widget-search" data-astro-cid-4sn4zg3r> <form class="qodef-search-form" action="/blog" method="get" data-astro-cid-4sn4zg3r> <input type="search" class="qodef-search-field" placeholder="Search" name="q" data-astro-cid-4sn4zg3r> <button type="submit" class="qodef-search-btn" aria-label="Search" data-astro-cid-4sn4zg3r> <svg width="15" height="15" viewBox="0 0 15 15" data-astro-cid-4sn4zg3r><path d="M11.5,10.63c0.96-1.17,1.49-2.63,1.49-4.14C12.99,2.91,10.08,0,6.49,0S0,2.91,0,6.49c0,3.58,2.91,6.49,6.49,6.49c1.51,0,2.97-0.53,4.14-1.49l3.42,3.42L14.13,15L15,14.13L11.5,10.63z M6.49,11.76c-2.91,0-5.27-2.36-5.27-5.27s2.36-5.27,5.27-5.27s5.27,2.36,5.27,5.27S9.4,11.76,6.49,11.76z" data-astro-cid-4sn4zg3r></path></svg> </button> </form> </div> ${sidebarCategories.length > 0 ? renderTemplate`<div class="qodef-widget qodef-widget-categories" data-astro-cid-4sn4zg3r> <h4 class="qodef-widget-title" data-astro-cid-4sn4zg3r>Categories</h4> <ul data-astro-cid-4sn4zg3r> ${sidebarCategories.map((cat) => renderTemplate`<li data-astro-cid-4sn4zg3r><a${addAttribute(`/categories/${cat.slug}`, "href")} data-astro-cid-4sn4zg3r>${cat.name}</a></li>`)} </ul> </div>` : null} ${sidebarLatestPosts.length > 0 ? renderTemplate`<div class="qodef-widget qodef-widget-latest" data-astro-cid-4sn4zg3r> <h4 class="qodef-widget-title" data-astro-cid-4sn4zg3r>latest posts</h4> <div class="qodef-latest-list" data-astro-cid-4sn4zg3r> ${sidebarLatestPosts.map((lp) => {
    const lpDate = lp.datePublished ? new Date(lp.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";
    const lpHeroUrl = getBlogHeroUrl({ slug: lp.slug, heroImage: lp.heroImage, category: lp.category, tags: lp.tags });
    return renderTemplate`<a${addAttribute(`/blog/${lp.slug}`, "href")} class="qodef-latest-item" data-astro-cid-4sn4zg3r> <div class="qodef-latest-thumb" data-astro-cid-4sn4zg3r> <img${addAttribute(lpHeroUrl, "src")}${addAttribute(lp.title, "alt")} loading="lazy" width="150" height="150" data-astro-cid-4sn4zg3r> </div> <div class="qodef-latest-text" data-astro-cid-4sn4zg3r> <span class="qodef-latest-date" data-astro-cid-4sn4zg3r>${lpDate}</span> <span class="qodef-latest-title" data-astro-cid-4sn4zg3r>${lp.title}</span> </div> </a>`;
  })} </div> </div>` : null} ${allTags.length > 0 ? renderTemplate`<div class="qodef-widget qodef-widget-tags" data-astro-cid-4sn4zg3r> <h4 class="qodef-widget-title" data-astro-cid-4sn4zg3r>Tags</h4> <div class="qodef-tag-cloud" data-astro-cid-4sn4zg3r> ${allTags.map((tag) => renderTemplate`<a${addAttribute(`/tags/${slugify(tag)}`, "href")} class="qodef-tag-link" data-astro-cid-4sn4zg3r>${tag.replace(/-/g, " ")}</a>`)} </div> </div>` : null} </aside> </div> </div> <section class="cta-section" data-astro-cid-4sn4zg3r> <div class="cta-container" data-astro-cid-4sn4zg3r> <div class="cta-content" data-astro-cid-4sn4zg3r> <h2 data-astro-cid-4sn4zg3r>Ready for Custom Sports Lockers?</h2> <p data-astro-cid-4sn4zg3r>Get a free design consultation. 30+ years experience. Five year guarantee.</p> <a class="cta-btn" href="/contact" data-astro-cid-4sn4zg3r>Get Free Consultation</a> </div> </div> </section> </article> `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": async ($$result3) => renderTemplate(_b || (_b = __template([' <script type="application/ld+json">', '<\/script> <script type="application/ld+json">', "<\/script> ", ""])), unescapeHTML(JSON.stringify(articleSchema)), unescapeHTML(JSON.stringify(breadcrumbSchema)), faqSchema ? renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(faqSchema))) : null) })}` })} `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/blog/[slug].astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
