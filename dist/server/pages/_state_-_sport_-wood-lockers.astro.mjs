import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, u as unescapeHTML, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DCfoLHMi.mjs';
import { p as programmaticStates, a as programmaticSports } from '../chunks/programmatic-pages_DbQyLVMz.mjs';
/* empty css                                                        */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://playerstall.com");
async function getStaticPaths() {
  return programmaticStates.flatMap(
    (state) => programmaticSports.map((sport) => ({
      params: { state: state.slug, sport: sport.slug },
      props: { state, sport }
    }))
  );
}
const $$statesportWoodLockers = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$statesportWoodLockers;
  const { state, sport } = Astro2.props;
  const pagePath = `/${state.slug}-${sport.slug}-wood-lockers`;
  const pageUrl = `https://playerstall.com${pagePath}`;
  const title = `${state.name} ${sport.name} Wood Lockers | Custom Athletic Storage | PlayerStall`;
  const description = `Custom ${sport.name.toLowerCase()} wood lockers in ${state.name}. Built for collegiate and professional programs with 30+ years of experience, lifetime craftsmanship standards, and free design consultation.`;
  const faqs = [
    {
      question: `How are ${state.name} ${sport.name.toLowerCase()} locker projects scoped?`,
      answer: `We start with a free consultation to review your roster size, circulation paths, equipment profile, and installation timeline. Then we build a room plan and quote that matches your ${sport.name.toLowerCase()} program's operational needs.`
    },
    {
      question: `Can PlayerStall customize finishes and branding for ${state.name} programs?`,
      answer: `Yes. We customize locker dimensions, finish palettes, hardware, logo treatments, and accessory packages so your facility reflects your team's identity and daily workflow.`
    },
    {
      question: `What are your lead times?`,
      answer: `Custom orders are built in 8\u201312 weeks. We walk through timelines during your free consultation so you can plan confidently.`
    },
    {
      question: `What makes wood lockers a strong long-term option for ${sport.name.toLowerCase()} facilities?`,
      answer: `Wood lockers deliver durable structure, cleaner presentation for recruiting, and modular serviceability over time. Programs can maintain quality standards without replacing full rooms when one component gets damaged.`
    }
  ];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://playerstall.com" },
      { "@type": "ListItem", position: 2, name: "Products", item: "https://playerstall.com/products" },
      { "@type": "ListItem", position: 3, name: `${state.name} ${sport.name} Wood Lockers`, item: pageUrl }
    ]
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${state.name} ${sport.name} Wood Lockers`,
    serviceType: "Custom sports locker design and manufacturing",
    provider: {
      "@type": "Organization",
      name: "PlayerStall",
      url: "https://playerstall.com"
    },
    areaServed: {
      "@type": "State",
      name: state.name
    },
    description,
    url: pageUrl
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "data-astro-cid-qviaouod": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="programmatic-hero" data-astro-cid-qviaouod> <div class="programmatic-hero-bg" data-astro-cid-qviaouod> <img src="https://playerstall.b-cdn.net/images/h1-img-8.jpg"${addAttribute(`${state.name} ${sport.name} custom wood lockers`, "alt")} width="1920" height="1080" loading="eager" fetchpriority="high" data-astro-cid-qviaouod> </div> <div class="programmatic-hero-overlay" data-astro-cid-qviaouod></div> <div class="programmatic-container programmatic-hero-content" data-astro-cid-qviaouod> <div class="programmatic-breadcrumbs" data-astro-cid-qviaouod> <a href="/" data-astro-cid-qviaouod>Home</a> <a href="/products" data-astro-cid-qviaouod>Products</a> <span data-astro-cid-qviaouod>${state.name} ${sport.name} Wood Lockers</span> </div> <h1 data-astro-cid-qviaouod>${state.name} ${sport.name} Wood Lockers</h1> <p data-astro-cid-qviaouod>Built for serious programs that need premium presentation, operational durability, and sport-specific storage performance.</p> </div> </section> <section class="programmatic-section" data-astro-cid-qviaouod> <div class="programmatic-container programmatic-grid" data-astro-cid-qviaouod> <article class="programmatic-main" data-astro-cid-qviaouod> <h2 data-astro-cid-qviaouod>Custom ${sport.name} locker solutions for programs in ${state.name}</h2> <p data-astro-cid-qviaouod>
PlayerStall designs and manufactures custom wood lockers for ${sport.name.toLowerCase()} programs across ${state.name}.
          Whether you are planning a new build, renovating an existing room, or standardizing multiple facilities, we focus on
          one objective: a locker environment that improves daily operations and reinforces team standards.
</p> <p data-astro-cid-qviaouod>
Most ${sport.name.toLowerCase()} projects fail because the room looks good on day one but does not support real program
          traffic through season one. Equipment loading, airflow, circulation around benches, and maintenance access all matter.
          Our process starts with these functional details so your room remains efficient, clean, and durable over the long term.
</p> <h2 data-astro-cid-qviaouod>What ${state.name} ${sport.name.toLowerCase()} programs usually need</h2> <p data-astro-cid-qviaouod>
Programs typically prioritize ${sport.primaryNeed}. We design around ${sport.gearFocus}, while keeping pathways clean for
          coaching staff, trainers, and athletes during high-traffic periods like game-day prep and post-practice turnover.
</p> <ul data-astro-cid-qviaouod> <li data-astro-cid-qviaouod>Player-first layouts that reduce congestion during peak change windows</li> <li data-astro-cid-qviaouod>Durable, serviceable components that support long facility lifecycles</li> <li data-astro-cid-qviaouod>Material and finish options aligned with your branding and recruiting goals</li> <li data-astro-cid-qviaouod>Modular planning that scales with roster growth and future facility updates</li> </ul> <h2 data-astro-cid-qviaouod>Why programs choose wood lockers over commodity alternatives</h2> <p data-astro-cid-qviaouod>
For competitive facilities, locker selection affects more than storage. Room quality shapes athlete experience, alumni
          confidence, and recruiting perception. Wood locker systems are frequently chosen because they support premium finishes,
          better visual consistency, and long-horizon maintenance planning compared with basic commodity options.
</p> <p data-astro-cid-qviaouod>
If you are evaluating materials, use this comparison guide:
<a href="/blog/wood-vs-metal-sports-lockers-complete-2025-comparison-guide" data-astro-cid-qviaouod> Wood vs metal sports lockers</a>.
          For sport-specific considerations, see:
<a${addAttribute(sport.blogUrl, "href")} data-astro-cid-qviaouod> ${sport.name} locker planning guide</a>.
</p> <h2 data-astro-cid-qviaouod>Project workflow for ${state.name} facilities</h2> <ol data-astro-cid-qviaouod> <li data-astro-cid-qviaouod><strong data-astro-cid-qviaouod>Consultation:</strong> We align on roster size, room constraints, timeline, and performance goals.</li> <li data-astro-cid-qviaouod><strong data-astro-cid-qviaouod>Design:</strong> We configure locker dimensions, accessories, circulation, and finish packages.</li> <li data-astro-cid-qviaouod><strong data-astro-cid-qviaouod>Approval:</strong> You review final specs, pricing, and build sequence before production.</li> <li data-astro-cid-qviaouod><strong data-astro-cid-qviaouod>Delivery:</strong> We coordinate shipment and install readiness with your project team.</li> </ol> <h2 data-astro-cid-qviaouod>Budget and lifecycle planning for ${state.name} athletic facilities</h2> <p data-astro-cid-qviaouod>
Programs that evaluate locker rooms only on purchase price usually end up paying more over time. The better lens is lifecycle
          value: serviceability, finish durability, and how quickly individual components can be repaired or refreshed without replacing
          complete rows. For many ${sport.name.toLowerCase()} facilities, this is what preserves quality standards through multiple classes
          of athletes and coaching transitions.
</p> <p data-astro-cid-qviaouod>
We walk you through lead times, tier differences, and facility planning so you can plan confidently.
          If your objective is to balance upfront cost with long-term performance, we can model a package that avoids overbuilding while
          still protecting the athlete experience and recruiting presentation your program depends on.
</p> <h2 data-astro-cid-qviaouod>Locker room planning checklist for ${sport.name.toLowerCase()} operations</h2> <ul data-astro-cid-qviaouod> <li data-astro-cid-qviaouod>Confirm roster counts and swing capacity for depth-chart changes</li> <li data-astro-cid-qviaouod>Map traffic flow from locker entry to taping, training, and team meeting zones</li> <li data-astro-cid-qviaouod>Define equipment density requirements by position group and season phase</li> <li data-astro-cid-qviaouod>Select storage accessories that reduce daily setup and cleanup friction</li> <li data-astro-cid-qviaouod>Align finish durability to expected cleaning cadence and maintenance staffing</li> <li data-astro-cid-qviaouod>Plan for phased updates so future expansions remain visually consistent</li> </ul> <h2 data-astro-cid-qviaouod>Recruiting impact and athlete experience</h2> <p data-astro-cid-qviaouod>
Recruits and families interpret a locker room as a signal of program discipline. The space does not need to be flashy, but it
          does need to feel intentional, clean, and built for the realities of ${sport.name.toLowerCase()} training. Durable materials,
          consistent branding, and organized player zones communicate that your staff plans for performance at every level.
</p> <p data-astro-cid-qviaouod>
For many ${state.name} programs, a locker upgrade is one of the clearest improvements they can show prospects, alumni, and
          donors in a short timeframe. That is why we tie every design decision back to function and presentation: the room must work
          every day, and it must look like it belongs to a serious program.
</p> <h2 data-astro-cid-qviaouod>FAQs</h2> ${faqs.map((faq) => renderTemplate`<div class="faq-item" data-astro-cid-qviaouod> <h3 data-astro-cid-qviaouod>${faq.question}</h3> <p data-astro-cid-qviaouod>${faq.answer}</p> </div>`)} </article> <aside class="programmatic-sidebar" data-astro-cid-qviaouod> <div class="sidebar-card" data-astro-cid-qviaouod> <h3 data-astro-cid-qviaouod>Start with a free consultation</h3> <p data-astro-cid-qviaouod>Tell us your facility goals and we'll provide a practical locker strategy for your ${state.name} ${sport.name.toLowerCase()} program.</p> <a class="sidebar-btn" href="/contact" data-astro-cid-qviaouod>Request a Quote</a> </div> <div class="sidebar-card" data-astro-cid-qviaouod> <h3 data-astro-cid-qviaouod>Useful links</h3> <ul data-astro-cid-qviaouod> <li data-astro-cid-qviaouod><a href="/products" data-astro-cid-qviaouod>Product lineup</a></li> <li data-astro-cid-qviaouod><a href="/gallery" data-astro-cid-qviaouod>Installation gallery</a></li> <li data-astro-cid-qviaouod><a${addAttribute(sport.blogUrl, "href")} data-astro-cid-qviaouod>${sport.name} planning guide</a></li> <li data-astro-cid-qviaouod><a href="/our-process" data-astro-cid-qviaouod>Our process</a></li> </ul> </div> <div class="sidebar-card" data-astro-cid-qviaouod> <h3 data-astro-cid-qviaouod>Need sport-specific help?</h3> <p data-astro-cid-qviaouod>We design for football, basketball, hockey, baseball, soccer, and lacrosse facilities.</p> <a href="/hockey" data-astro-cid-qviaouod>Explore by sport</a> </div> </aside> </div> </section> `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', '<\/script> <script type="application/ld+json">', '<\/script> <script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify(breadcrumbSchema)), unescapeHTML(JSON.stringify(serviceSchema)), unescapeHTML(JSON.stringify(faqSchema))) })}` })} `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/[state]-[sport]-wood-lockers.astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/[state]-[sport]-wood-lockers.astro";
const $$url = "/[state]-[sport]-wood-lockers";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$statesportWoodLockers,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
