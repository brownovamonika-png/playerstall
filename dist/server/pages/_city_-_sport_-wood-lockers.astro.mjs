import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, u as unescapeHTML, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DCfoLHMi.mjs';
import { c as canadianCities, a as programmaticSports } from '../chunks/programmatic-pages_DbQyLVMz.mjs';
/* empty css                                                       */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://playerstall.com");
async function getStaticPaths() {
  return canadianCities.flatMap(
    (city) => programmaticSports.map((sport) => ({
      params: { city: city.slug, sport: sport.slug },
      props: { city, sport }
    }))
  );
}
const $$citysportWoodLockers = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$citysportWoodLockers;
  const { city, sport } = Astro2.props;
  const pagePath = `/${city.slug}-${sport.slug}-wood-lockers`;
  const pageUrl = `https://playerstall.com${pagePath}`;
  const title = `${city.name} ${sport.name} Wood Lockers | Custom Athletic Storage | PlayerStall`;
  const description = `Custom ${sport.name.toLowerCase()} wood lockers in ${city.name}, ${city.province}. Canadian-owned and manufactured since 1996 \u2014 built for collegiate and professional programs with a lifetime craftsmanship standard and free design consultation.`;
  const faqs = [
    {
      question: `Do you ship custom wood lockers to ${city.name}?`,
      answer: `Yes. We ship to ${city.name} and throughout ${city.province} directly from our facility in Langley, British Columbia. As a Canadian company, there are no cross-border fees, import duties, or extended wait times \u2014 just direct Canadian delivery to your facility.`
    },
    {
      question: `How are ${city.name} ${sport.name.toLowerCase()} locker projects scoped?`,
      answer: `We start with a free consultation to review your roster size, circulation paths, equipment profile, and installation timeline. Then we build a room plan and quote that matches your ${sport.name.toLowerCase()} program's operational needs.`
    },
    {
      question: `Can PlayerStall customize finishes and branding for ${city.name} programs?`,
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
      {
        "@type": "ListItem",
        position: 3,
        name: `${city.province} ${sport.name} Wood Lockers`,
        item: `https://playerstall.com/${city.provinceSlug}-${sport.slug}-wood-lockers`
      },
      { "@type": "ListItem", position: 4, name: `${city.name} ${sport.name} Wood Lockers`, item: pageUrl }
    ]
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${city.name} ${sport.name} Wood Lockers`,
    serviceType: "Custom sports locker design and manufacturing",
    provider: {
      "@type": "Organization",
      name: "PlayerStall",
      url: "https://playerstall.com"
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      addressRegion: city.province,
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
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "data-astro-cid-e5na6gx3": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="programmatic-hero" data-astro-cid-e5na6gx3> <div class="programmatic-hero-bg" data-astro-cid-e5na6gx3> <img src="https://playerstall.b-cdn.net/images/h1-img-8.jpg"${addAttribute(`${city.name} ${sport.name} custom wood lockers`, "alt")} width="1920" height="1080" loading="eager" fetchpriority="high" data-astro-cid-e5na6gx3> </div> <div class="programmatic-hero-overlay" data-astro-cid-e5na6gx3></div> <div class="programmatic-container programmatic-hero-content" data-astro-cid-e5na6gx3> <div class="programmatic-breadcrumbs" data-astro-cid-e5na6gx3> <a href="/" data-astro-cid-e5na6gx3>Home</a> <a href="/products" data-astro-cid-e5na6gx3>Products</a> <a${addAttribute(`/${city.provinceSlug}-${sport.slug}-wood-lockers`, "href")} data-astro-cid-e5na6gx3>${city.province} ${sport.name} Wood Lockers</a> <span data-astro-cid-e5na6gx3>${city.name} ${sport.name} Wood Lockers</span> </div> <h1 data-astro-cid-e5na6gx3>${city.name} ${sport.name} Wood Lockers</h1> <p data-astro-cid-e5na6gx3>Canadian-owned and built since 1996 — premium wood locker systems for serious ${sport.name.toLowerCase()} programs in ${city.name}, ${city.province}.</p> </div> </section> <section class="programmatic-section" data-astro-cid-e5na6gx3> <div class="programmatic-container programmatic-grid" data-astro-cid-e5na6gx3> <article class="programmatic-main" data-astro-cid-e5na6gx3> <h2 data-astro-cid-e5na6gx3>Custom ${sport.name} locker solutions for ${city.name} programs</h2> <p data-astro-cid-e5na6gx3>
PlayerStall designs and manufactures custom wood lockers for ${sport.name.toLowerCase()} programs in ${city.name} and
          across ${city.province}. As a Canadian-owned company operating since 1996 from our facility in Langley, British Columbia,
          we deliver to ${city.name} without cross-border complications — quoted in Canadian dollars, shipped direct, with no
          third-party distributors between your program and the people who build your lockers.
</p> <p data-astro-cid-e5na6gx3>
Whether you are planning a new build, renovating an existing room, or standardizing multiple facilities across ${city.name},
          we focus on one objective: a locker environment that improves daily operations and reinforces team standards.
</p> <h2 data-astro-cid-e5na6gx3>What ${city.name} ${sport.name.toLowerCase()} programs usually need</h2> <p data-astro-cid-e5na6gx3>
Programs typically prioritize ${sport.primaryNeed}. We design around ${sport.gearFocus}, while keeping pathways clean for
          coaching staff, trainers, and athletes during high-traffic periods like game-day prep and post-practice turnover.
</p> <ul data-astro-cid-e5na6gx3> <li data-astro-cid-e5na6gx3>Player-first layouts that reduce congestion during peak change windows</li> <li data-astro-cid-e5na6gx3>Durable, serviceable components that support long facility lifecycles</li> <li data-astro-cid-e5na6gx3>Material and finish options aligned with your branding and recruiting goals</li> <li data-astro-cid-e5na6gx3>Modular planning that scales with roster growth and future facility updates</li> </ul> <h2 data-astro-cid-e5na6gx3>Why ${city.name} programs choose PlayerStall</h2> <p data-astro-cid-e5na6gx3>
Most locker suppliers serving ${city.name} programs operate out of the United States. That means cross-border freight,
          import duties, longer lead times, and support teams unfamiliar with Canadian university and school program operations.
          PlayerStall is different: we have been manufacturing in Canada since 1996, we quote in Canadian dollars, and we work
          directly with your facilities team from design through delivery.
</p> <p data-astro-cid-e5na6gx3>
For competitive facilities, locker selection also affects more than storage. Room quality shapes athlete experience,
          alumni confidence, and recruiting perception. Wood locker systems are frequently chosen because they support premium
          finishes, better visual consistency, and long-horizon maintenance planning compared with basic commodity options.
</p> <p data-astro-cid-e5na6gx3>
If you are evaluating materials, use this comparison guide:
<a href="/blog/wood-vs-metal-sports-lockers-complete-2025-comparison-guide" data-astro-cid-e5na6gx3> Wood vs metal sports lockers</a>.
          For sport-specific considerations, see:
<a${addAttribute(sport.blogUrl, "href")} data-astro-cid-e5na6gx3> ${sport.name} locker planning guide</a>.
          For other programs in ${city.province}, see:
<a${addAttribute(`/${city.provinceSlug}-${sport.slug}-wood-lockers`, "href")} data-astro-cid-e5na6gx3> ${city.province} ${sport.name} wood lockers</a>.
</p> <h2 data-astro-cid-e5na6gx3>Project workflow for ${city.name} facilities</h2> <ol data-astro-cid-e5na6gx3> <li data-astro-cid-e5na6gx3><strong data-astro-cid-e5na6gx3>Consultation:</strong> We align on roster size, room constraints, timeline, and performance goals.</li> <li data-astro-cid-e5na6gx3><strong data-astro-cid-e5na6gx3>Design:</strong> We configure locker dimensions, accessories, circulation, and finish packages.</li> <li data-astro-cid-e5na6gx3><strong data-astro-cid-e5na6gx3>Approval:</strong> You review final specs, pricing (in CAD), and build sequence before production.</li> <li data-astro-cid-e5na6gx3><strong data-astro-cid-e5na6gx3>Delivery:</strong> We coordinate shipment from our BC facility to your ${city.name} project site.</li> </ol> <h2 data-astro-cid-e5na6gx3>Budget and lifecycle planning for ${city.name} athletic facilities</h2> <p data-astro-cid-e5na6gx3>
Programs that evaluate locker rooms only on purchase price usually end up paying more over time. The better lens is lifecycle
          value: serviceability, finish durability, and how quickly individual components can be repaired or refreshed without replacing
          complete rows. For many ${sport.name.toLowerCase()} facilities in ${city.name}, this is what preserves quality standards through
          multiple classes of athletes and coaching transitions.
</p> <p data-astro-cid-e5na6gx3>
We help teams compare quick-ship and custom paths based on budget windows, opening deadlines, and long-range facility plans.
          If your objective is to balance upfront cost with long-term performance, we can model a package that avoids overbuilding while
          still protecting the athlete experience and recruiting presentation your program depends on.
</p> <h2 data-astro-cid-e5na6gx3>Locker room planning checklist for ${sport.name.toLowerCase()} operations</h2> <ul data-astro-cid-e5na6gx3> <li data-astro-cid-e5na6gx3>Confirm roster counts and swing capacity for depth-chart changes</li> <li data-astro-cid-e5na6gx3>Map traffic flow from locker entry to taping, training, and team meeting zones</li> <li data-astro-cid-e5na6gx3>Define equipment density requirements by position group and season phase</li> <li data-astro-cid-e5na6gx3>Select storage accessories that reduce daily setup and cleanup friction</li> <li data-astro-cid-e5na6gx3>Align finish durability to expected cleaning cadence and maintenance staffing</li> <li data-astro-cid-e5na6gx3>Plan for phased updates so future expansions remain visually consistent</li> </ul> <h2 data-astro-cid-e5na6gx3>Recruiting impact and athlete experience</h2> <p data-astro-cid-e5na6gx3>
Recruits and families interpret a locker room as a signal of program discipline. The space does not need to be flashy, but it
          does need to feel intentional, clean, and built for the realities of ${sport.name.toLowerCase()} training. Durable materials,
          consistent branding, and organized player zones communicate that your staff plans for performance at every level.
</p> <p data-astro-cid-e5na6gx3>
For many ${city.name} programs, a locker upgrade is one of the clearest improvements they can show prospects, alumni, and
          donors in a short timeframe. That is why we tie every design decision back to function and presentation: the room must work
          every day, and it must look like it belongs to a serious program.
</p> <h2 data-astro-cid-e5na6gx3>FAQs</h2> ${faqs.map((faq) => renderTemplate`<div class="faq-item" data-astro-cid-e5na6gx3> <h3 data-astro-cid-e5na6gx3>${faq.question}</h3> <p data-astro-cid-e5na6gx3>${faq.answer}</p> </div>`)} </article> <aside class="programmatic-sidebar" data-astro-cid-e5na6gx3> <div class="sidebar-card" data-astro-cid-e5na6gx3> <h3 data-astro-cid-e5na6gx3>Start with a free consultation</h3> <p data-astro-cid-e5na6gx3>Tell us your facility goals and we'll provide a practical locker strategy for your ${city.name} ${sport.name.toLowerCase()} program.</p> <a class="sidebar-btn" href="/contact" data-astro-cid-e5na6gx3>Request a Quote</a> </div> <div class="sidebar-card" data-astro-cid-e5na6gx3> <h3 data-astro-cid-e5na6gx3>Canadian-owned since 1996</h3> <p data-astro-cid-e5na6gx3>We manufacture in Langley, BC and ship across Canada — quoted in Canadian dollars with no cross-border complications.</p> </div> <div class="sidebar-card" data-astro-cid-e5na6gx3> <h3 data-astro-cid-e5na6gx3>Useful links</h3> <ul data-astro-cid-e5na6gx3> <li data-astro-cid-e5na6gx3><a href="/products" data-astro-cid-e5na6gx3>Product lineup</a></li> <li data-astro-cid-e5na6gx3><a href="/gallery" data-astro-cid-e5na6gx3>Installation gallery</a></li> <li data-astro-cid-e5na6gx3><a${addAttribute(sport.blogUrl, "href")} data-astro-cid-e5na6gx3>${sport.name} planning guide</a></li> <li data-astro-cid-e5na6gx3><a${addAttribute(`/${city.provinceSlug}-${sport.slug}-wood-lockers`, "href")} data-astro-cid-e5na6gx3>${city.province} ${sport.name} lockers</a></li> <li data-astro-cid-e5na6gx3><a href="/our-process" data-astro-cid-e5na6gx3>Our process</a></li> </ul> </div> <div class="sidebar-card" data-astro-cid-e5na6gx3> <h3 data-astro-cid-e5na6gx3>Need sport-specific help?</h3> <p data-astro-cid-e5na6gx3>We design for football, basketball, hockey, baseball, soccer, and lacrosse facilities.</p> <a href="/hockey" data-astro-cid-e5na6gx3>Explore by sport</a> </div> </aside> </div> </section> `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', '<\/script> <script type="application/ld+json">', '<\/script> <script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify(breadcrumbSchema)), unescapeHTML(JSON.stringify(serviceSchema)), unescapeHTML(JSON.stringify(faqSchema))) })}` })} `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/[city]-[sport]-wood-lockers.astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/[city]-[sport]-wood-lockers.astro";
const $$url = "/[city]-[sport]-wood-lockers";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$citysportWoodLockers,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
