import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, u as unescapeHTML, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DCfoLHMi.mjs';
import { l as levelMarketPages } from '../chunks/programmatic-pages_DbQyLVMz.mjs';
/* empty css                                                        */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://playerstall.com");
async function getStaticPaths() {
  return levelMarketPages.map((page) => ({
    params: { level: page.levelSlug, sport: page.sportSlug },
    props: { levelName: page.levelName, levelSlug: page.levelSlug, sportName: page.sportName, sportSlug: page.sportSlug }
  }));
}
const $$levelsportWoodLockers = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$levelsportWoodLockers;
  const { levelName, levelSlug, sportName, sportSlug } = Astro2.props;
  const sportLower = sportName.toLowerCase();
  const pagePath = `/${levelSlug}-${sportSlug}-wood-lockers`;
  const pageUrl = `https://playerstall.com${pagePath}`;
  const title = `${levelName} ${sportName} Wood Lockers | Custom Athletic Storage | PlayerStall`;
  const description = `Custom ${sportLower} wood lockers for ${levelName.toLowerCase()} programs. Built for serious teams with 30+ years experience, lifetime craftsmanship, and free design consultation. Request a quote.`;
  const faqs = [
    {
      question: `What do ${levelName.toLowerCase()} ${sportLower} programs need from lockers?`,
      answer: `${levelName} ${sportLower} programs need durable, presentable storage that supports daily operations and recruiting. Our wood lockers are designed for roster-sized equipment loads, team branding, and long-term serviceability so facilities stay professional year after year.`
    },
    {
      question: `Do you offer custom design for ${levelName.toLowerCase()} facilities?`,
      answer: `Yes. We provide a free design consultation to match locker layout, dimensions, finishes, and accessories to your roster size, room constraints, and budget. Many ${levelName.toLowerCase()} programs use our process to plan new builds or renovations.`
    },
    {
      question: `What tiers do you offer for ${sportName} lockers?`,
      answer: `We offer Semi Pro, Varsity, Pro, and Stadium tiers so you can choose the right level of durability and finish for your program. We\u2019ll recommend a tier based on your usage, timeline, and facility goals.`
    }
  ];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://playerstall.com" },
      { "@type": "ListItem", position: 2, name: "Products", item: "https://playerstall.com/products" },
      { "@type": "ListItem", position: 3, name: `${levelName} ${sportName} Wood Lockers`, item: pageUrl }
    ]
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${levelName} ${sportName} Wood Lockers`,
    serviceType: "Custom sports locker design and manufacturing",
    provider: { "@type": "Organization", name: "PlayerStall", url: "https://playerstall.com" },
    description,
    url: pageUrl
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "data-astro-cid-26pmbutf": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="programmatic-hero" data-astro-cid-26pmbutf> <div class="programmatic-hero-bg" data-astro-cid-26pmbutf> <img src="https://playerstall.b-cdn.net/images/h1-img-8.jpg"${addAttribute(`${levelName} ${sportName} custom wood lockers`, "alt")} width="1920" height="1080" loading="eager" fetchpriority="high" data-astro-cid-26pmbutf> </div> <div class="programmatic-hero-overlay" data-astro-cid-26pmbutf></div> <div class="programmatic-container programmatic-hero-content" data-astro-cid-26pmbutf> <div class="programmatic-breadcrumbs" data-astro-cid-26pmbutf> <a href="/" data-astro-cid-26pmbutf>Home</a> <a href="/products" data-astro-cid-26pmbutf>Products</a> <span data-astro-cid-26pmbutf>${levelName} ${sportName} Wood Lockers</span> </div> <h1 data-astro-cid-26pmbutf>${levelName} ${sportName} Wood Lockers</h1> <p data-astro-cid-26pmbutf>Custom wood lockers built for ${levelName.toLowerCase()} ${sportLower} programs—durable storage, premium presentation, and design that supports recruiting and daily operations.</p> </div> </section> <section class="programmatic-section" data-astro-cid-26pmbutf> <div class="programmatic-container programmatic-grid" data-astro-cid-26pmbutf> <article class="programmatic-main" data-astro-cid-26pmbutf> <h2 data-astro-cid-26pmbutf>Why ${levelName.toLowerCase()} ${sportLower} programs choose wood lockers</h2> <p data-astro-cid-26pmbutf> ${levelName} ${sportName} facilities need lockers that handle heavy use, support team identity, and hold up over many seasons. PlayerStall designs and manufactures custom wood lockers for ${sportLower} programs at the collegiate, high school, and professional levels. We focus on operational durability, clean presentation, and long-term value so your locker room supports your program for years.
</p> <h2 data-astro-cid-26pmbutf>What ${levelName.toLowerCase()} ${sportLower} programs typically need</h2> <p data-astro-cid-26pmbutf>
Programs at this level usually need roster-sized storage, clear traffic flow, branding options, and construction that can be maintained or refreshed without replacing entire rooms. Our process starts with a free consultation to align on roster count, room layout, equipment load, and budget. From there we recommend locker dimensions, tiers (Semi Pro through Stadium), and finish options that fit your facility and timeline.
</p> <ul data-astro-cid-26pmbutf> <li data-astro-cid-26pmbutf>Layouts that reduce congestion during peak change times</li> <li data-astro-cid-26pmbutf>Durable, serviceable components for long facility life</li> <li data-astro-cid-26pmbutf>Finish and branding options that support recruiting</li> <li data-astro-cid-26pmbutf>Modular planning for future roster or facility changes</li> </ul> <h2 data-astro-cid-26pmbutf>Product tiers and budgeting</h2> <p data-astro-cid-26pmbutf>
We offer multiple tiers so you can match cost to your needs. Semi Pro, Varsity, Pro, and Stadium options provide different levels of finish and reinforcement. Many ${levelName.toLowerCase()} programs choose Varsity or Pro for the right balance of durability and appearance. We’ll walk you through tier differences and lead times so you can plan confidently.
</p> <h2 data-astro-cid-26pmbutf>From consultation to installation</h2> <ol data-astro-cid-26pmbutf> <li data-astro-cid-26pmbutf><strong data-astro-cid-26pmbutf>Consultation:</strong> We align on roster size, room constraints, timeline, and goals.</li> <li data-astro-cid-26pmbutf><strong data-astro-cid-26pmbutf>Design:</strong> We configure dimensions, accessories, and finish packages.</li> <li data-astro-cid-26pmbutf><strong data-astro-cid-26pmbutf>Approval:</strong> You review specs and pricing before production.</li> <li data-astro-cid-26pmbutf><strong data-astro-cid-26pmbutf>Delivery:</strong> We coordinate shipment and install readiness.</li> </ol> <h2 data-astro-cid-26pmbutf>FAQs</h2> ${faqs.map((faq) => renderTemplate`<div class="faq-item" data-astro-cid-26pmbutf> <h3 data-astro-cid-26pmbutf>${faq.question}</h3> <p data-astro-cid-26pmbutf>${faq.answer}</p> </div>`)} </article> <aside class="programmatic-sidebar" data-astro-cid-26pmbutf> <div class="sidebar-card" data-astro-cid-26pmbutf> <h3 data-astro-cid-26pmbutf>Free design consultation</h3> <p data-astro-cid-26pmbutf>Tell us about your ${levelName.toLowerCase()} ${sportLower} facility and we’ll recommend a locker strategy that fits your roster, room, and budget.</p> <a class="sidebar-btn" href="/contact" data-astro-cid-26pmbutf>Request a Quote</a> </div> <div class="sidebar-card" data-astro-cid-26pmbutf> <h3 data-astro-cid-26pmbutf>Useful links</h3> <ul data-astro-cid-26pmbutf> <li data-astro-cid-26pmbutf><a href="/products" data-astro-cid-26pmbutf>Product lineup</a></li> <li data-astro-cid-26pmbutf><a href="/gallery" data-astro-cid-26pmbutf>Installation gallery</a></li> <li data-astro-cid-26pmbutf><a${addAttribute(`/sport/${sportSlug}`, "href")} data-astro-cid-26pmbutf>${sportName} lockers</a></li> <li data-astro-cid-26pmbutf><a href="/our-process" data-astro-cid-26pmbutf>Our process</a></li> </ul> </div> </aside> </div> </section> `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', '<\/script> <script type="application/ld+json">', '<\/script> <script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify(breadcrumbSchema)), unescapeHTML(JSON.stringify(serviceSchema)), unescapeHTML(JSON.stringify(faqSchema))) })}` })} `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/[level]-[sport]-wood-lockers.astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/[level]-[sport]-wood-lockers.astro";
const $$url = "/[level]-[sport]-wood-lockers";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$levelsportWoodLockers,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
