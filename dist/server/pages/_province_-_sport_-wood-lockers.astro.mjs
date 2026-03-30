import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, u as unescapeHTML, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DCfoLHMi.mjs';
import { b as canadianProvinces, a as programmaticSports } from '../chunks/programmatic-pages_DbQyLVMz.mjs';
/* empty css                                                           */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://playerstall.com");
async function getStaticPaths() {
  return canadianProvinces.flatMap(
    (province) => programmaticSports.map((sport) => ({
      params: { province: province.slug, sport: sport.slug },
      props: { province, sport }
    }))
  );
}
const $$provincesportWoodLockers = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$provincesportWoodLockers;
  const { province, sport } = Astro2.props;
  const pagePath = `/${province.slug}-${sport.slug}-wood-lockers`;
  const pageUrl = `https://playerstall.com${pagePath}`;
  const title = `${province.name} ${sport.name} Wood Lockers | Custom Athletic Storage | PlayerStall`;
  const description = `Custom ${sport.name.toLowerCase()} wood lockers in ${province.name}. Canadian-owned and manufactured since 1996 \u2014 built for collegiate and professional programs with a lifetime craftsmanship standard and free design consultation.`;
  const faqs = [
    {
      question: `Do you ship custom wood lockers to ${province.name}?`,
      answer: `Yes. We ship across Canada, including ${province.name}, directly from our facility in Langley, British Columbia. No cross-border complications, duties, or delays \u2014 just Canadian manufacturing delivered to your program.`
    },
    {
      question: `How are ${province.name} ${sport.name.toLowerCase()} locker projects scoped?`,
      answer: `We start with a free consultation to review your roster size, circulation paths, equipment profile, and installation timeline. Then we build a room plan and quote that matches your ${sport.name.toLowerCase()} program's operational needs.`
    },
    {
      question: `Can PlayerStall customize finishes and branding for ${province.name} programs?`,
      answer: `Yes. We customize locker dimensions, finish palettes, hardware, logo treatments, and accessory packages so your facility reflects your team's identity and daily workflow.`
    },
    {
      question: `Are your prices in Canadian dollars?`,
      answer: `Yes. All PlayerStall pricing is quoted in Canadian dollars. As a Canadian-owned company operating since 1996, we work with Canadian programs, schools, and facilities on standard Canadian billing terms.`
    },
    {
      question: `What makes wood lockers a strong long-term option for ${sport.name.toLowerCase()} facilities?`,
      answer: `Wood lockers deliver durable structure, cleaner presentation for recruiting, and modular serviceability over time. Programs can maintain quality standards without replacing full rows when one component gets damaged.`
    }
  ];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://playerstall.com" },
      { "@type": "ListItem", position: 2, name: "Products", item: "https://playerstall.com/products" },
      { "@type": "ListItem", position: 3, name: `${province.name} ${sport.name} Wood Lockers`, item: pageUrl }
    ]
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${province.name} ${sport.name} Wood Lockers`,
    serviceType: "Custom sports locker design and manufacturing",
    provider: {
      "@type": "Organization",
      name: "PlayerStall",
      url: "https://playerstall.com"
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: province.name,
      addressCountry: "CA"
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
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "data-astro-cid-2bujmcfq": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="programmatic-hero" data-astro-cid-2bujmcfq> <div class="programmatic-hero-bg" data-astro-cid-2bujmcfq> <img src="https://playerstall.b-cdn.net/images/h1-img-8.jpg"${addAttribute(`${province.name} ${sport.name} custom wood lockers`, "alt")} width="1920" height="1080" loading="eager" fetchpriority="high" data-astro-cid-2bujmcfq> </div> <div class="programmatic-hero-overlay" data-astro-cid-2bujmcfq></div> <div class="programmatic-container programmatic-hero-content" data-astro-cid-2bujmcfq> <div class="programmatic-breadcrumbs" data-astro-cid-2bujmcfq> <a href="/" data-astro-cid-2bujmcfq>Home</a> <a href="/products" data-astro-cid-2bujmcfq>Products</a> <span data-astro-cid-2bujmcfq>${province.name} ${sport.name} Wood Lockers</span> </div> <h1 data-astro-cid-2bujmcfq>${province.name} ${sport.name} Wood Lockers</h1> <p data-astro-cid-2bujmcfq>Canadian-owned and built since 1996 — premium wood locker systems for serious programs across ${province.name}.</p> </div> </section> <section class="programmatic-section" data-astro-cid-2bujmcfq> <div class="programmatic-container programmatic-grid" data-astro-cid-2bujmcfq> <article class="programmatic-main" data-astro-cid-2bujmcfq> <h2 data-astro-cid-2bujmcfq>Custom ${sport.name} locker solutions for programs in ${province.name}</h2> <p data-astro-cid-2bujmcfq>
PlayerStall designs and manufactures custom wood lockers for ${sport.name.toLowerCase()} programs across ${province.name}.
          As a Canadian-owned company operating since 1996 from our facility in Langley, British Columbia, we serve programs
          throughout ${province.region} — with no cross-border delays, no import duties, and no third-party distributors
          between your program and the people who build your lockers.
</p> <p data-astro-cid-2bujmcfq>
Whether you are planning a new build, renovating an existing room, or standardizing multiple facilities, we focus on
          one objective: a locker environment that improves daily operations and reinforces team standards.
</p> <h2 data-astro-cid-2bujmcfq>What ${province.name} ${sport.name.toLowerCase()} programs usually need</h2> <p data-astro-cid-2bujmcfq>
Programs typically prioritize ${sport.primaryNeed}. We design around ${sport.gearFocus}, while keeping pathways clean for
          coaching staff, trainers, and athletes during high-traffic periods like game-day prep and post-practice turnover.
</p> <ul data-astro-cid-2bujmcfq> <li data-astro-cid-2bujmcfq>Player-first layouts that reduce congestion during peak change windows</li> <li data-astro-cid-2bujmcfq>Durable, serviceable components that support long facility lifecycles</li> <li data-astro-cid-2bujmcfq>Material and finish options aligned with your branding and recruiting goals</li> <li data-astro-cid-2bujmcfq>Modular planning that scales with roster growth and future facility updates</li> </ul> <h2 data-astro-cid-2bujmcfq>Why Canadian programs choose PlayerStall</h2> <p data-astro-cid-2bujmcfq>
Most locker suppliers serving Canadian programs operate out of the United States. That means cross-border freight,
          import duties, longer lead times, and support teams that are not familiar with how Canadian university and school
          programs operate. PlayerStall is different: we have been manufacturing in Canada since 1996, we quote in Canadian
          dollars, and we work directly with your facilities team from design through delivery.
</p> <p data-astro-cid-2bujmcfq>
For competitive facilities, locker selection also affects more than storage. Room quality shapes athlete experience,
          alumni confidence, and recruiting perception. Wood locker systems are frequently chosen because they support premium
          finishes, better visual consistency, and long-horizon maintenance planning compared with basic commodity options.
</p> <p data-astro-cid-2bujmcfq>
If you are evaluating materials, use this comparison guide:
<a href="/blog/wood-vs-metal-sports-lockers-complete-2025-comparison-guide" data-astro-cid-2bujmcfq> Wood vs metal sports lockers</a>.
          For sport-specific considerations, see:
<a${addAttribute(sport.blogUrl, "href")} data-astro-cid-2bujmcfq> ${sport.name} locker planning guide</a>.
</p> <h2 data-astro-cid-2bujmcfq>Project workflow for ${province.name} facilities</h2> <ol data-astro-cid-2bujmcfq> <li data-astro-cid-2bujmcfq><strong data-astro-cid-2bujmcfq>Consultation:</strong> We align on roster size, room constraints, timeline, and performance goals.</li> <li data-astro-cid-2bujmcfq><strong data-astro-cid-2bujmcfq>Design:</strong> We configure locker dimensions, accessories, circulation, and finish packages.</li> <li data-astro-cid-2bujmcfq><strong data-astro-cid-2bujmcfq>Approval:</strong> You review final specs, pricing (in CAD), and build sequence before production.</li> <li data-astro-cid-2bujmcfq><strong data-astro-cid-2bujmcfq>Delivery:</strong> We coordinate shipment from our BC facility to your ${province.name} project site.</li> </ol> <h2 data-astro-cid-2bujmcfq>Budget and lifecycle planning for ${province.name} athletic facilities</h2> <p data-astro-cid-2bujmcfq>
Programs that evaluate locker rooms only on purchase price usually end up paying more over time. The better lens is lifecycle
          value: serviceability, finish durability, and how quickly individual components can be repaired or refreshed without replacing
          complete rows. For many ${sport.name.toLowerCase()} facilities, this is what preserves quality standards through multiple classes
          of athletes and coaching transitions.
</p> <p data-astro-cid-2bujmcfq>
We help teams compare quick-ship and custom paths based on budget windows, opening deadlines, and long-range facility plans.
          If your objective is to balance upfront cost with long-term performance, we can model a package that avoids overbuilding while
          still protecting the athlete experience and recruiting presentation your program depends on.
</p> <h2 data-astro-cid-2bujmcfq>Locker room planning checklist for ${sport.name.toLowerCase()} operations</h2> <ul data-astro-cid-2bujmcfq> <li data-astro-cid-2bujmcfq>Confirm roster counts and swing capacity for depth-chart changes</li> <li data-astro-cid-2bujmcfq>Map traffic flow from locker entry to taping, training, and team meeting zones</li> <li data-astro-cid-2bujmcfq>Define equipment density requirements by position group and season phase</li> <li data-astro-cid-2bujmcfq>Select storage accessories that reduce daily setup and cleanup friction</li> <li data-astro-cid-2bujmcfq>Align finish durability to expected cleaning cadence and maintenance staffing</li> <li data-astro-cid-2bujmcfq>Plan for phased updates so future expansions remain visually consistent</li> </ul> <h2 data-astro-cid-2bujmcfq>Recruiting impact and athlete experience</h2> <p data-astro-cid-2bujmcfq>
Recruits and families interpret a locker room as a signal of program discipline. The space does not need to be flashy, but it
          does need to feel intentional, clean, and built for the realities of ${sport.name.toLowerCase()} training. Durable materials,
          consistent branding, and organized player zones communicate that your staff plans for performance at every level.
</p> <p data-astro-cid-2bujmcfq>
For many ${province.name} programs, a locker upgrade is one of the clearest improvements they can show prospects, alumni, and
          donors in a short timeframe. That is why we tie every design decision back to function and presentation: the room must work
          every day, and it must look like it belongs to a serious program.
</p> <h2 data-astro-cid-2bujmcfq>FAQs</h2> ${faqs.map((faq) => renderTemplate`<div class="faq-item" data-astro-cid-2bujmcfq> <h3 data-astro-cid-2bujmcfq>${faq.question}</h3> <p data-astro-cid-2bujmcfq>${faq.answer}</p> </div>`)} </article> <aside class="programmatic-sidebar" data-astro-cid-2bujmcfq> <div class="sidebar-card" data-astro-cid-2bujmcfq> <h3 data-astro-cid-2bujmcfq>Start with a free consultation</h3> <p data-astro-cid-2bujmcfq>Tell us your facility goals and we'll provide a practical locker strategy for your ${province.name} ${sport.name.toLowerCase()} program.</p> <a class="sidebar-btn" href="/contact" data-astro-cid-2bujmcfq>Request a Quote</a> </div> <div class="sidebar-card" data-astro-cid-2bujmcfq> <h3 data-astro-cid-2bujmcfq>Canadian-owned since 1996</h3> <p data-astro-cid-2bujmcfq>We manufacture in Langley, BC and ship across Canada — quoted in Canadian dollars with no cross-border complications.</p> </div> <div class="sidebar-card" data-astro-cid-2bujmcfq> <h3 data-astro-cid-2bujmcfq>Useful links</h3> <ul data-astro-cid-2bujmcfq> <li data-astro-cid-2bujmcfq><a href="/products" data-astro-cid-2bujmcfq>Product lineup</a></li> <li data-astro-cid-2bujmcfq><a href="/gallery" data-astro-cid-2bujmcfq>Installation gallery</a></li> <li data-astro-cid-2bujmcfq><a${addAttribute(sport.blogUrl, "href")} data-astro-cid-2bujmcfq>${sport.name} planning guide</a></li> <li data-astro-cid-2bujmcfq><a href="/our-process" data-astro-cid-2bujmcfq>Our process</a></li> </ul> </div> <div class="sidebar-card" data-astro-cid-2bujmcfq> <h3 data-astro-cid-2bujmcfq>Need sport-specific help?</h3> <p data-astro-cid-2bujmcfq>We design for football, basketball, hockey, baseball, soccer, and lacrosse facilities.</p> <a href="/hockey" data-astro-cid-2bujmcfq>Explore by sport</a> </div> </aside> </div> </section> `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', '<\/script> <script type="application/ld+json">', '<\/script> <script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify(breadcrumbSchema)), unescapeHTML(JSON.stringify(serviceSchema)), unescapeHTML(JSON.stringify(faqSchema))) })}` })} `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/[province]-[sport]-wood-lockers.astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/[province]-[sport]-wood-lockers.astro";
const $$url = "/[province]-[sport]-wood-lockers";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$provincesportWoodLockers,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
