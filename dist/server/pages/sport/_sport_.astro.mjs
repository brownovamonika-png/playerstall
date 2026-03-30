import { b as createAstro, c as createComponent, r as renderComponent, h as renderScript, a as renderTemplate, m as maybeRenderHead, d as addAttribute, F as Fragment } from '../../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DCfoLHMi.mjs';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://playerstall.com");
function getStaticPaths() {
  return [
    { params: { sport: "football" } },
    { params: { sport: "hockey" } },
    { params: { sport: "basketball" } },
    { params: { sport: "baseball" } },
    { params: { sport: "soccer" } },
    { params: { sport: "lacrosse" } }
  ];
}
const $$sport = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$sport;
  const SPORT_DATA = {
    football: {
      title: "Football Lockers",
      tagline: "Custom wood storage for football equipment - helmets, pads, cleats, uniforms & protective gear",
      description: "Custom football lockers and team storage solutions for professional, collegiate, and high school teams. Organized storage for helmets, shoulder pads, cleats, uniforms, gloves, and all football equipment. 30+ years building wood athletic lockers across the United States.",
      features: [
        "Spacious compartments for helmets, shoulder pads, and chest protectors",
        "Enhanced ventilation to prevent moisture buildup and equipment odor",
        "Dedicated storage for cleats, footwear, and training shoes",
        "Uniform hanging space with reinforced construction for heavy gear",
        "Organized storage for gloves, mouthguards, and protective equipment",
        "Built for professional, NCAA, and high school football programs"
      ],
      heroImage: "https://playerstall.b-cdn.net/images/h1-img-3.jpg",
      gallery: [
        "https://playerstall.b-cdn.net/images/blog-1-img-2.jpg",
        "https://playerstall.b-cdn.net/images/blog-1-img-3.jpg",
        "https://playerstall.b-cdn.net/images/blog-1-img-4.jpg",
        "https://playerstall.b-cdn.net/images/team-title-img.jpg"
      ],
      cta: "Get Football Locker Quote",
      bannerTitle: "Champions Start Here",
      bannerQuotes: [
        { quote: "Winners never quit and quitters never win.", author: "Vince Lombardi" },
        { quote: "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will.", author: "Vince Lombardi" },
        { quote: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" }
      ]
    },
    hockey: {
      title: "Hockey Lockers",
      tagline: "Custom wood storage for hockey equipment - skates, pads, sticks, helmets & goalie gear",
      description: "Custom hockey lockers and team storage solutions for professional, collegiate, and high school teams. Organized storage for skates, pads, sticks, helmets, gloves, goalie equipment, and all hockey gear. 30+ years building wood athletic lockers across the United States and Canada.",
      features: [
        "Reinforced construction for heavy hockey gear and goalie equipment",
        "Specialized compartments for skates, sticks, and helmet storage",
        "Ventilated compartments for pads, gloves, and protective equipment",
        "Equipment drying features to prevent moisture and odor buildup",
        "Storage for jerseys, pants, shoulder pads, and shin guards",
        "Built for NHL, NCAA, junior hockey, and high school programs"
      ],
      heroImage: "https://playerstall.b-cdn.net/images/h3-banner-img-1.jpg",
      gallery: [
        "https://playerstall.b-cdn.net/images/h3-banner-img-3.jpg",
        "https://playerstall.b-cdn.net/images/h3-blog-img-7.jpg",
        "https://playerstall.b-cdn.net/images/h3-blog-img-5.jpg",
        "https://playerstall.b-cdn.net/images/h3-blog-img-6.jpg"
      ],
      highlights: [
        { type: "text", category: "Hockey Lockers", title: "Built for the Toughest Equipment", text: "Hockey equipment is among the most challenging to store. Our hockey lockers are built for skates, pads, sticks, and gear with specialized storage and drying features.", link: "/contact" },
        { type: "image", image: "https://playerstall.b-cdn.net/images/h3-blog-img-3.jpg" },
        { type: "text", category: "Hockey Lockers", title: "Reinforced Construction", text: "Heavy-duty build designed for the weight and bulk of hockey gear. Dedicated compartments for skates and stick storage keep everything organized and accessible.", link: "/contact" },
        { type: "image", image: "https://playerstall.b-cdn.net/images/h3-img-6.jpg" },
        { type: "image", image: "https://playerstall.b-cdn.net/images/h3-blog-img-5.jpg" },
        { type: "text", category: "Hockey Lockers", title: "Ventilated Compartments", text: "Purpose-built ventilation for pads, helmets, and gloves prevents moisture buildup, eliminates odor, and extends the life of expensive equipment.", link: "/contact" },
        { type: "image", image: "https://playerstall.b-cdn.net/images/h3-img-4.jpg" },
        { type: "text", category: "Hockey Lockers", title: "Equipment Drying", text: "Integrated drying features keep gear fresh, dry, and game-ready. Custom wood construction with premium finishes built to last a lifetime.", link: "/contact" }
      ],
      cta: "Get Hockey Locker Quote",
      bannerTitle: "Rule the Ice",
      bannerQuotes: [
        { quote: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
        { quote: "A good hockey player plays where the puck is. A great hockey player plays where the puck is going to be.", author: "Wayne Gretzky" },
        { quote: "Hockey is a unique sport in the sense that you need each and every guy helping each other and pulling in the same direction to be successful.", author: "Wayne Gretzky" }
      ]
    },
    basketball: {
      title: "Basketball Lockers",
      tagline: "Custom wood storage for basketball equipment - shoes, uniforms, training gear & accessories",
      description: "Custom basketball lockers and team storage solutions for professional, collegiate, and high school teams. Organized storage for basketball shoes, uniforms, practice gear, training equipment, and accessories. 30+ years building wood athletic lockers across the United States.",
      features: [
        "Sleek, organized design for basketball shoes and sneaker storage",
        "Dedicated uniform hanging space with jersey and shorts compartments",
        "Personal item storage for phones, wallets, and valuables",
        "Space-efficient layout perfect for modern basketball facilities",
        "Storage for training gear, water bottles, and team equipment",
        "Built for NBA, NCAA, Division I, and high school basketball programs"
      ],
      heroImage: "https://playerstall.b-cdn.net/images/basketball-team-lineup.png",
      gallery: [
        "https://playerstall.b-cdn.net/images/basketball-dribble.png",
        "https://playerstall.b-cdn.net/images/basketball-gallery-3.jpg",
        "https://playerstall.b-cdn.net/images/basketball-dunk-aerial.jpg",
        "https://playerstall.b-cdn.net/images/basketball-gallery-2.jpg"
      ],
      cta: "Get Basketball Locker Quote",
      bannerTitle: "Game Day Ready",
      bannerQuotes: [
        { quote: "I've failed over and over and over again in my life. And that is why I succeed.", author: "Michael Jordan" },
        { quote: "Talent wins games, but teamwork and intelligence win championships.", author: "Michael Jordan" },
        { quote: "I can accept failure, everyone fails at something. But I can't accept not trying.", author: "Michael Jordan" }
      ]
    },
    baseball: {
      title: "Baseball Lockers",
      tagline: "Custom wood storage for baseball equipment - bats, gloves, helmets, uniforms & catcher's gear",
      description: "Custom baseball lockers and team storage solutions for professional, collegiate, and high school teams. Organized storage for bats, gloves, helmets, cleats, catcher's gear, uniforms, and all baseball equipment. 30+ years building wood athletic lockers across the United States.",
      features: [
        "Equipment-specific compartments for bats, gloves, and catcher's gear",
        "Uniform hanging space with helmet and cleat storage",
        "Dedicated storage for batting gloves, protective equipment, and accessories",
        "Ventilated compartments for helmets, shin guards, and chest protectors",
        "Easy access design for game day and practice equipment",
        "Durable wood construction built for professional and collegiate teams"
      ],
      heroImage: "https://playerstall.b-cdn.net/images/h2-img-1.jpg",
      gallery: [
        "https://playerstall.b-cdn.net/images/h2-blog-img-3-1.jpg",
        "https://playerstall.b-cdn.net/images/h2-blog-img-2-1.jpg",
        "https://playerstall.b-cdn.net/images/h2-blog-img-1-1.jpg",
        "https://playerstall.b-cdn.net/images/h2-blog-img-6.jpg"
      ],
      cta: "Get Baseball Locker Quote",
      bannerTitle: "Diamond Champions",
      bannerQuotes: [
        { quote: "It ain't over till it's over.", author: "Yogi Berra" },
        { quote: "Baseball is 90% mental and the other half is physical.", author: "Yogi Berra" },
        { quote: "You can observe a lot by watching.", author: "Yogi Berra" }
      ]
    },
    soccer: {
      title: "Soccer Lockers",
      tagline: "Custom wood storage for soccer equipment - cleats, shin guards, uniforms & training gear",
      description: "Custom soccer lockers and team storage solutions for professional, collegiate, and high school teams. Organized storage for cleats, shin guards, uniforms, goalkeeper gloves, training equipment, and all soccer gear. 30+ years building wood athletic lockers across the United States.",
      features: [
        "Compartments for cleats, soccer shoes, and training footwear",
        "Shin guard storage with ventilation to prevent odor",
        "Uniform hanging space for jerseys, shorts, and warm-up gear",
        "Specialized storage for goalkeeper gloves, equipment, and pads",
        "Space for soccer balls, water bottles, and training accessories",
        "Built for MLS, NCAA, youth soccer, and high school programs"
      ],
      heroImage: "https://playerstall.b-cdn.net/images/soccer-field-aerial.png",
      gallery: [
        "https://playerstall.b-cdn.net/images/soccer-players-celebrating-1.png",
        "https://playerstall.b-cdn.net/images/soccer-referee.png",
        "https://playerstall.b-cdn.net/images/soccer-ball-grass.png",
        "https://playerstall.b-cdn.net/images/soccer-players-celebrating-2.png"
      ],
      cta: "Get Soccer Locker Quote",
      bannerTitle: "Goal Driven Excellence",
      bannerQuotes: [
        { quote: "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing.", author: "Pel\xE9" },
        { quote: "Everything is practice.", author: "Pel\xE9" },
        { quote: "The more difficult the victory, the greater the happiness in winning.", author: "Pel\xE9" }
      ]
    },
    lacrosse: {
      title: "Lacrosse Lockers",
      tagline: "Custom wood storage for lacrosse equipment - sticks, helmets, pads, gloves & uniforms",
      description: "Custom lacrosse lockers and team storage solutions for professional, collegiate, and high school teams. Organized storage for lacrosse sticks, helmets, shoulder pads, gloves, cleats, goalie equipment, and all lacrosse gear. 30+ years building wood athletic lockers across the United States.",
      features: [
        "Specialized stick storage for attack, midfield, and defense sticks",
        "Ventilated compartments for helmets, pads, and protective equipment",
        "Storage for shoulder pads, arm guards, rib pads, and gloves",
        "Cleats and footwear compartments with proper ventilation",
        "Goalie equipment storage for oversized gear and specialized pads",
        "Built for NCAA Division I, club lacrosse, and high school programs"
      ],
      heroImage: "https://playerstall.b-cdn.net/images/lacrosse-field-closeup.png",
      gallery: [
        "https://playerstall.b-cdn.net/images/lacrosse-players-action.png",
        "https://playerstall.b-cdn.net/images/lacrosse-sticks-ball.png",
        "https://playerstall.b-cdn.net/images/lacrosse-team-huddle.png",
        "https://playerstall.b-cdn.net/images/lacrosse-goal-orange.png"
      ],
      cta: "Get Lacrosse Locker Quote",
      bannerTitle: "Built for Battle",
      bannerQuotes: [
        { quote: "The will to win is important, but the will to prepare is vital.", author: "Joe Paterno" },
        { quote: "Champions are made when no one is watching.", author: "Unknown" },
        { quote: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" }
      ]
    }
  };
  const LOCKERS_RAW = [
    { name: "Model X", priceSort: 649, image: "/images/model-x-website-images/model-x-locker.png", images: ["/images/model-x-website-images/model-x-locker.png", "/images/model-x-website-images/model-x-locker-side.png", "/images/model-x-website-images/model-x-locker-black.png", "/images/model-x-website-images/model-x-locker.png"], price: "$649", info: "Top-tier locker. Curved design, maximum durability and customization. Custom-built in three months with full color options.", dimensions: '24" W \xD7 76" H \xD7 24" D', dimensionsNote: 'Widths 18"\u201332"; optional 4" base', href: "/product-legendary-locker" },
    { name: "Model Z", priceSort: 649, image: "/images/elite-locker.png", images: ["/images/elite-locker.png", "/images/elite-locker-side.png", "/images/elite-locker-graphite.png", "/images/elite-locker.png"], price: "$649", info: "Top-tier locker. Curved design, premium materials. Custom-built to your specifications.", dimensions: '24" W \xD7 76" H \xD7 24" D', dimensionsNote: 'Widths 18"\u201332"; optional 4" base', href: "/product-elite-locker" },
    { name: "Model L", priceSort: 649, image: "https://playerstall.b-cdn.net/images/legendary-locker.png", images: ["https://playerstall.b-cdn.net/images/legendary-locker.png", "https://playerstall.b-cdn.net/images/legendary-locker.png", "https://playerstall.b-cdn.net/images/legendary-locker.png", "https://playerstall.b-cdn.net/images/legendary-locker.png"], price: "$649", info: 'Premium melamine, 19" or 24" depth. Reliable workhorse for team locker rooms. Custom-built to your specifications.', dimensions: '24" W \xD7 76" H \xD7 19" D', dimensionsNote: 'Widths 18"\u201332"; optional 4" base', href: "/product-model-l" },
    { name: "Model S", priceSort: 649, image: "/images/stadium-locker.png", images: ["/images/stadium-locker.png", "/images/stadium-locker-side.png", "/images/stadium-locker-third.png", "/images/stadium-locker.png"], price: "$649", info: "Premium melamine, stadium-grade. Heavy-duty build for high-traffic facilities. Custom-built to your specifications.", dimensions: '24" W \xD7 76" H \xD7 19" D', dimensionsNote: 'Widths 18"\u201332"; optional 4" base', href: "/product-model-s" },
    { name: "Pro", priceSort: 599, image: "https://playerstall.b-cdn.net/images/legendary-locker.png", images: ["https://playerstall.b-cdn.net/images/legendary-locker.png", "https://playerstall.b-cdn.net/images/legendary-locker.png", "https://playerstall.b-cdn.net/images/legendary-locker.png", "https://playerstall.b-cdn.net/images/legendary-locker.png"], price: "$599", info: 'Essential line. 19" depth only, Pre-Finished Birch Plywood. Ideal for schools and rec teams.', dimensions: '24" W \xD7 76" H \xD7 19" D', dimensionsNote: 'Widths 18"\u201332"; optional 4" base', href: "/product-pro-locker" },
    { name: "Stadium", priceSort: 599, image: "/images/stadium-locker.png", images: ["/images/stadium-locker.png", "/images/stadium-locker-side.png", "/images/stadium-locker-third.png", "/images/stadium-locker.png"], price: "$599", info: 'Essential line. 19" depth only, Pre-Finished Birch Plywood. Stadium-style layout.', dimensions: '18" W \xD7 76" H \xD7 19" D', dimensionsNote: 'Widths 18"\u201332"; optional 4" base', href: "/product-stadium-locker" },
    { name: "Varsity", priceSort: 449, image: "/images/varsity-locker.png", images: ["/images/varsity-locker.png", "/images/varsity-locker.png", "/images/varsity-locker.png", "/images/varsity-locker.png"], price: "$449", info: 'Essential line. 3/4" solid wood premium finish. Great for varsity and competitive programs.', dimensions: '24" W \xD7 76" H \xD7 19" D', dimensionsNote: 'Widths 18"\u201332"; optional 4" base', href: "/product-varsity-locker" },
    { name: "Semi Pro", priceSort: 349, image: "https://playerstall.b-cdn.net/images/semi-pro-locker-new.png", images: ["https://playerstall.b-cdn.net/images/semi-pro-locker-new.png", "https://playerstall.b-cdn.net/images/semi-pro-locker-new.png", "https://playerstall.b-cdn.net/images/semi-pro-locker-new.png", "https://playerstall.b-cdn.net/images/semi-pro-locker-new.png"], price: "$349", info: 'Essential line. 3/4" solid wood, 19" depth only. Durable and ideal for schools and rec teams.', dimensions: '24" W \xD7 76" H \xD7 19" D', dimensionsNote: 'Widths 18"\u201332"', href: "/product-semi-pro-locker" }
  ];
  const LOCKERS = LOCKERS_RAW.sort((a, b) => b.priceSort - a.priceSort);
  const { sport } = Astro2.params;
  if (!sport || !SPORT_DATA[sport]) {
    throw new Error(`Unknown sport: ${sport}`);
  }
  const data = SPORT_DATA[sport];
  const titleLabel = data.title.replace(" Lockers", "");
  const isDark = !!data.highlights && data.highlights.length > 0;
  const pageTitles = {
    football: "Custom Football Lockers | Wood Athletic Storage for Teams | PlayerStall",
    hockey: "Custom Hockey Lockers | Wood Athletic Storage for Teams | PlayerStall",
    basketball: "Custom Basketball Lockers | Wood Athletic Storage for Teams | PlayerStall",
    baseball: "Custom Baseball Lockers | Wood Athletic Storage for Teams | PlayerStall",
    soccer: "Custom Soccer Lockers | Wood Athletic Storage for Teams | PlayerStall",
    lacrosse: "Custom Lacrosse Lockers | Wood Athletic Storage for Teams | PlayerStall"
  };
  const pageTitle = pageTitles[sport] || `${data.title} | Custom Wood Lockers | PlayerStall`;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": pageTitle, "description": data.description, "data-astro-cid-mukqocnw": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div${addAttribute(isDark ? "sp-page sp-page-dark" : "sp-page", "class")} data-astro-cid-mukqocnw> <!-- ═══════ HERO BANNER ═══════ --> <section${addAttribute(`sp-hero sp-hero-${sport}`, "class")} data-astro-cid-mukqocnw> <div class="sp-hero-bg" data-astro-cid-mukqocnw> <img${addAttribute(data.heroImage, "src")}${addAttribute(data.title, "alt")} class="sp-hero-bg-image" data-astro-cid-mukqocnw> </div> <div class="sp-hero-content" data-astro-cid-mukqocnw> <div class="sp-hero-breadcrumb" data-astro-cid-mukqocnw> <a href="/" data-astro-cid-mukqocnw>Home</a> <span class="sp-bc-text" data-astro-cid-mukqocnw>${titleLabel}</span> </div> <h1 class="sp-hero-title" data-astro-cid-mukqocnw>${data.title}</h1> </div> </section> <!-- ═══════ LOCKERS LIST ═══════ --> <section${addAttribute(`sp-lockers ${sport === "football" ? "sp-lockers-hero-titles" : ""}`, "class")} data-astro-cid-mukqocnw> <div class="sp-lockers-inner" data-astro-cid-mukqocnw> <div class="home-shop-section-header" data-astro-cid-mukqocnw> <p class="home-shop-section-subtitle" data-astro-cid-mukqocnw>THE LOCKER ROOM</p> <h2 class="home-shop-section-title" data-astro-cid-mukqocnw>OUR LOCKERS</h2> </div> <div class="sp-lockers-intro" data-astro-cid-mukqocnw> <a href="/products" class="ts-spotlight-position" data-astro-cid-mukqocnw>Premium Wood Locker Collection</a> <div class="ts-spotlight-meta" data-astro-cid-mukqocnw> <span data-astro-cid-mukqocnw>8 Models Available</span> | <span data-astro-cid-mukqocnw>Custom Options</span> | <span data-astro-cid-mukqocnw>2-12 Week Delivery</span> | <span data-astro-cid-mukqocnw>5-Year Warranty</span> | <span data-astro-cid-mukqocnw>Free Consultation</span> </div> <p class="ts-spotlight-bio" data-astro-cid-mukqocnw>Choose from 8 premium wood locker models designed specifically for athletic teams. Our collection ranges from the essential Semi Pro and Varsity models perfect for high school teams, to Pro and Stadium, to our premium Model L, Model S, Model Z, and Model X models built for collegiate and professional facilities. Every locker features premium 6-layer melamine-faced plywood construction with superior moisture resistance and fire-rated materials. Custom orders typically ship in 8–12 weeks with your choice of dimensions, finishes, colors, and hardware. All backed by our 5-year warranty.</p> </div>  ${LOCKERS.map((locker) => renderTemplate`<article class="sp-locker-featured" data-astro-cid-mukqocnw> <div class="sp-locker-featured-nameblock" data-astro-cid-mukqocnw> <h3 class="sp-locker-name" data-astro-cid-mukqocnw>${locker.name}</h3> <p class="sp-locker-price" data-astro-cid-mukqocnw>${locker.price}</p> </div> <div class="sp-locker-angles" data-astro-cid-mukqocnw> <div class="sp-locker-angle" data-astro-cid-mukqocnw> <img${addAttribute(locker.images[0], "src")}${addAttribute(`${locker.name} Locker - Front View`, "alt")} loading="lazy" data-astro-cid-mukqocnw> </div> <div class="sp-locker-angle" data-astro-cid-mukqocnw> <img${addAttribute(locker.images[1], "src")}${addAttribute(`${locker.name} Locker - Side View`, "alt")} loading="lazy" data-astro-cid-mukqocnw> </div> <div class="sp-locker-angle" data-astro-cid-mukqocnw> <img${addAttribute(locker.images[2], "src")}${addAttribute(`${locker.name} Locker - Detail View`, "alt")} loading="lazy" data-astro-cid-mukqocnw> </div> <div class="sp-locker-angle" data-astro-cid-mukqocnw> <img${addAttribute(locker.images[3], "src")}${addAttribute(`${locker.name} Locker - View`, "alt")} loading="lazy" data-astro-cid-mukqocnw> </div> </div> <div class="sp-locker-featured-action" data-astro-cid-mukqocnw> <a${addAttribute(locker.href, "href")} class="sp-btn sp-btn-featured" data-astro-cid-mukqocnw>View Details</a> </div> </article>`)} </div> </section> <!-- ═══════ HIGHLIGHTS GRID (checkerboard layout) ═══════ --> ${sport !== "hockey" && data.highlights && data.highlights.length > 0 && renderTemplate`<section class="sp-highlights"${addAttribute(`${titleLabel} highlights`, "aria-label")} data-astro-cid-mukqocnw> <div class="sp-highlights-grid" data-astro-cid-mukqocnw> ${data.highlights.map((item, i) => item.type === "image" ? renderTemplate`<div class="sp-hl-cell sp-hl-image" data-astro-cid-mukqocnw> <img${addAttribute(item.image, "src")}${addAttribute(`${titleLabel} highlight ${i + 1}`, "alt")} loading="lazy" data-astro-cid-mukqocnw> </div>` : renderTemplate`<div class="sp-hl-cell sp-hl-text" data-astro-cid-mukqocnw> <div class="sp-hl-text-inner" data-astro-cid-mukqocnw> <span class="sp-hl-category" data-astro-cid-mukqocnw>${item.category}</span> <h3 class="sp-hl-title" data-astro-cid-mukqocnw>${item.title}</h3> <p class="sp-hl-desc" data-astro-cid-mukqocnw>${item.text}</p> <a${addAttribute(item.link || "#", "href")} class="sp-hl-link" data-astro-cid-mukqocnw>Read More</a> </div> </div>`)} </div> </section>`} <!-- ═══════ BOTTOM GALLERY (4 images) ═══════ --> <section class="sp-gallery"${addAttribute(`${titleLabel} imagery`, "aria-label")} data-astro-cid-mukqocnw> <div class="sp-gallery-grid" data-astro-cid-mukqocnw> ${data.gallery.map((img, i) => renderTemplate`<div class="sp-gallery-item" data-astro-cid-mukqocnw> <img${addAttribute(img, "src")}${addAttribute(`${titleLabel} ${i + 1}`, "alt")} loading="lazy" data-astro-cid-mukqocnw> </div>`)} </div> </section> <!-- ═══════ CTA SECTION (Materials We Use Style) ═══════ --> <section class="home-shop-section" data-astro-cid-mukqocnw> <div class="home-shop-container" data-astro-cid-mukqocnw> <div class="home-shop-section-header" data-astro-cid-mukqocnw> <p class="home-shop-section-subtitle" data-astro-cid-mukqocnw>THE LOCKER ROOM</p> <h2 class="home-shop-section-title" data-astro-cid-mukqocnw>READY TO UPGRADE YOUR ${titleLabel.toUpperCase()} LOCKER ROOM?</h2> </div> <div class="ts-spotlight-inner-centered" data-astro-cid-mukqocnw> <div class="ts-spotlight-content" data-astro-cid-mukqocnw> <a href="/products" class="ts-spotlight-position" data-astro-cid-mukqocnw>Custom ${titleLabel} Storage Solutions</a> ${sport === "football" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-mukqocnw": true }, { "default": ($$result3) => renderTemplate` <div class="ts-spotlight-meta" data-astro-cid-mukqocnw> <span data-astro-cid-mukqocnw>Helmets</span> | <span data-astro-cid-mukqocnw>Shoulder Pads</span> | <span data-astro-cid-mukqocnw>Cleats</span> | <span data-astro-cid-mukqocnw>Uniforms</span> | <span data-astro-cid-mukqocnw>Gloves</span> | <span data-astro-cid-mukqocnw>Protective Gear</span> | <span data-astro-cid-mukqocnw>Chest Protectors</span> | <span data-astro-cid-mukqocnw>Mouthguards</span> | <span data-astro-cid-mukqocnw>Training Equipment</span> </div> <p class="ts-spotlight-bio" data-astro-cid-mukqocnw>Custom football locker room solutions designed for professional and collegiate teams. Our wood athletic lockers provide organized storage for all your football equipment including helmets, shoulder pads, chest protectors, cleats, uniforms, gloves, mouthguards, and protective gear. With 30+ years of experience building team locker rooms across the United States, we specialize in custom football storage systems that keep your practice equipment, training gear, and game day essentials organized and accessible. From high school football teams to professional NFL facilities, our football lockers are built to handle everything from Riddell helmets to Nike cleats, Schutt pads to Under Armour uniforms. Expert football locker room design, installation, and customization. Free consultation, 5-year warranty. Serving teams nationwide with custom wood lockers, team storage solutions, and complete locker room renovations.</p> ` })}` : sport === "hockey" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-mukqocnw": true }, { "default": ($$result3) => renderTemplate` <div class="ts-spotlight-meta" data-astro-cid-mukqocnw> <span data-astro-cid-mukqocnw>Skates</span> | <span data-astro-cid-mukqocnw>Sticks</span> | <span data-astro-cid-mukqocnw>Helmets</span> | <span data-astro-cid-mukqocnw>Pads</span> | <span data-astro-cid-mukqocnw>Gloves</span> | <span data-astro-cid-mukqocnw>Goalie Gear</span> | <span data-astro-cid-mukqocnw>Jerseys</span> | <span data-astro-cid-mukqocnw>Shin Guards</span> | <span data-astro-cid-mukqocnw>Equipment Drying</span> </div> <p class="ts-spotlight-bio" data-astro-cid-mukqocnw>Custom hockey locker room solutions designed for professional and collegiate teams. Our wood athletic lockers provide organized storage for all your hockey equipment including skates, sticks, helmets, pads, gloves, goalie gear, jerseys, and protective equipment. With 30+ years of experience building team locker rooms across the United States and Canada, we specialize in custom hockey storage systems that keep your practice equipment, training gear, and game day essentials organized and accessible. From high school hockey teams to professional NHL facilities, our hockey lockers are built to handle everything from Bauer skates to CCM sticks, Warrior gloves to Vaughn goalie pads. Expert hockey locker room design with equipment drying features, installation, and customization. Free consultation, 5-year warranty. Serving teams nationwide with custom wood lockers, team storage solutions, and complete locker room renovations.</p> ` })}` : sport === "basketball" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-mukqocnw": true }, { "default": ($$result3) => renderTemplate` <div class="ts-spotlight-meta" data-astro-cid-mukqocnw> <span data-astro-cid-mukqocnw>Basketball Shoes</span> | <span data-astro-cid-mukqocnw>Sneakers</span> | <span data-astro-cid-mukqocnw>Uniforms</span> | <span data-astro-cid-mukqocnw>Jerseys</span> | <span data-astro-cid-mukqocnw>Shorts</span> | <span data-astro-cid-mukqocnw>Training Gear</span> | <span data-astro-cid-mukqocnw>Water Bottles</span> | <span data-astro-cid-mukqocnw>Personal Items</span> | <span data-astro-cid-mukqocnw>Team Accessories</span> </div> <p class="ts-spotlight-bio" data-astro-cid-mukqocnw>Custom basketball locker room solutions designed for professional and collegiate teams. Our wood athletic lockers provide organized storage for all your basketball equipment including shoes, sneakers, uniforms, jerseys, shorts, training gear, water bottles, and team accessories. With 30+ years of experience building team locker rooms across the United States, we specialize in custom basketball storage systems that keep your practice equipment, training gear, and game day essentials organized and accessible. From high school basketball teams to professional NBA facilities, our basketball lockers are built to handle everything from Nike basketball shoes to Adidas jerseys, Under Armour training gear to team equipment. Expert basketball locker room design, installation, and customization. Free consultation, 5-year warranty. Serving teams nationwide with custom wood lockers, team storage solutions, and complete locker room renovations.</p> ` })}` : sport === "baseball" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-mukqocnw": true }, { "default": ($$result3) => renderTemplate` <div class="ts-spotlight-meta" data-astro-cid-mukqocnw> <span data-astro-cid-mukqocnw>Bats</span> | <span data-astro-cid-mukqocnw>Gloves</span> | <span data-astro-cid-mukqocnw>Helmets</span> | <span data-astro-cid-mukqocnw>Cleats</span> | <span data-astro-cid-mukqocnw>Catcher's Gear</span> | <span data-astro-cid-mukqocnw>Batting Gloves</span> | <span data-astro-cid-mukqocnw>Uniforms</span> | <span data-astro-cid-mukqocnw>Protective Equipment</span> | <span data-astro-cid-mukqocnw>Dugout Storage</span> </div> <p class="ts-spotlight-bio" data-astro-cid-mukqocnw>Custom baseball locker room solutions designed for professional and collegiate teams. Our wood athletic lockers provide organized storage for all your baseball equipment including bats, gloves, helmets, cleats, catcher's gear, batting gloves, uniforms, and protective equipment. With 30+ years of experience building team locker rooms across the United States, we specialize in custom baseball storage systems that keep your dugout equipment, training gear, and game day essentials organized and accessible. From high school baseball teams to professional MLB facilities, our baseball lockers are built to handle everything from Louisville Sluggers to Wilson gloves, Rawlings catcher's mitts to Nike cleats. Expert baseball locker room design, installation, and customization. Free consultation, 5-year warranty. Serving teams nationwide with custom wood lockers, team storage solutions, and complete locker room renovations.</p> ` })}` : sport === "soccer" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-mukqocnw": true }, { "default": ($$result3) => renderTemplate` <div class="ts-spotlight-meta" data-astro-cid-mukqocnw> <span data-astro-cid-mukqocnw>Cleats</span> | <span data-astro-cid-mukqocnw>Shin Guards</span> | <span data-astro-cid-mukqocnw>Goalkeeper Gloves</span> | <span data-astro-cid-mukqocnw>Uniforms</span> | <span data-astro-cid-mukqocnw>Jerseys</span> | <span data-astro-cid-mukqocnw>Training Gear</span> | <span data-astro-cid-mukqocnw>Soccer Balls</span> | <span data-astro-cid-mukqocnw>Water Bottles</span> | <span data-astro-cid-mukqocnw>Team Accessories</span> </div> <p class="ts-spotlight-bio" data-astro-cid-mukqocnw>Custom soccer locker room solutions designed for professional and collegiate teams. Our wood athletic lockers provide organized storage for all your soccer equipment including cleats, shin guards, goalkeeper gloves, uniforms, jerseys, training gear, and team accessories. With 30+ years of experience building team locker rooms across the United States, we specialize in custom soccer storage systems that keep your practice equipment, training gear, and game day essentials organized and accessible. From high school soccer teams to professional MLS facilities, our soccer lockers are built to handle everything from Adidas cleats to Nike jerseys, goalkeeper equipment to team training gear. Expert soccer locker room design, installation, and customization. Free consultation, 5-year warranty. Serving teams nationwide with custom wood lockers, team storage solutions, and complete locker room renovations.</p> ` })}` : sport === "lacrosse" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-mukqocnw": true }, { "default": ($$result3) => renderTemplate` <div class="ts-spotlight-meta" data-astro-cid-mukqocnw> <span data-astro-cid-mukqocnw>Lacrosse Sticks</span> | <span data-astro-cid-mukqocnw>Helmets</span> | <span data-astro-cid-mukqocnw>Shoulder Pads</span> | <span data-astro-cid-mukqocnw>Gloves</span> | <span data-astro-cid-mukqocnw>Cleats</span> | <span data-astro-cid-mukqocnw>Goalie Gear</span> | <span data-astro-cid-mukqocnw>Uniforms</span> | <span data-astro-cid-mukqocnw>Arm Guards</span> | <span data-astro-cid-mukqocnw>Rib Pads</span> </div> <p class="ts-spotlight-bio" data-astro-cid-mukqocnw>Custom lacrosse locker room solutions designed for professional and collegiate teams. Our wood athletic lockers provide organized storage for all your lacrosse equipment including sticks, helmets, shoulder pads, gloves, cleats, goalie gear, uniforms, and protective equipment. With 30+ years of experience building team locker rooms across the United States, we specialize in custom lacrosse storage systems that keep your practice equipment, training gear, and game day essentials organized and accessible. From high school lacrosse teams to NCAA Division I facilities, our lacrosse lockers are built to handle everything from attack sticks to goalie equipment, shoulder pads to protective gear. Expert lacrosse locker room design, installation, and customization. Free consultation, 5-year warranty. Serving teams nationwide with custom wood lockers, team storage solutions, and complete locker room renovations.</p> ` })}` : renderTemplate`<p class="ts-spotlight-bio" data-astro-cid-mukqocnw>With 30+ years of experience serving collegiate and professional teams across North America, we understand what makes a great locker room. Free design consultation, 5 year warranty.</p>`} <div class="materials-buttons-container" data-astro-cid-mukqocnw> <a href="/contact" class="ts-btn ts-btn-filled" data-astro-cid-mukqocnw>${data.cta}</a> </div> </div> </div> </div> </section> <!-- Taste the Victory Banner --> <section class="topscorer-banner"${addAttribute(`background-image: url('https://playerstall.b-cdn.net/images/${sport === "football" ? "h1-img-3.jpg" : sport === "hockey" ? "hockey-arena-wide.png" : sport === "basketball" ? "basketball-court-arena.png" : sport === "soccer" ? "soccer-field-stadium.png" : sport === "lacrosse" ? "lacrosse-field-game.png" : "lacrosse-field-hero.jpg"}');`, "style")} data-astro-cid-mukqocnw> <div class="topscorer-banner-overlay" data-astro-cid-mukqocnw></div> <div class="topscorer-banner-bg-text" aria-hidden="true" data-astro-cid-mukqocnw> <span class="topscorer-banner-bg-line" data-astro-cid-mukqocnw>${sport.toUpperCase()}</span> </div> <div class="topscorer-banner-content" data-astro-cid-mukqocnw> <p class="topscorer-banner-subtitle" data-astro-cid-mukqocnw>Powerful Sports Theme</p> <h2 class="topscorer-banner-title" data-astro-cid-mukqocnw>${data.bannerTitle}</h2> <div class="topscorer-banner-quotes" data-astro-cid-mukqocnw> ${data.bannerQuotes.map((quoteItem, index) => renderTemplate`<blockquote${addAttribute(`topscorer-banner-quote ${index === 0 ? "active" : ""}`, "class")} data-astro-cid-mukqocnw> <p class="topscorer-banner-quote-text" data-astro-cid-mukqocnw>"${quoteItem.quote}"</p> <cite class="topscorer-banner-quote-author" data-astro-cid-mukqocnw>— ${quoteItem.author}</cite> </blockquote>`)} </div> </div> <div class="topscorer-banner-players" aria-hidden="true" data-astro-cid-mukqocnw> ${sport === "baseball" ? renderTemplate`<div class="topscorer-banner-player-slide" data-initial-slide="true" data-astro-cid-mukqocnw><img data-src="https://playerstall.b-cdn.net/images/h2-blog-img-2-1-nobg.png" alt="" width="480" height="640" data-astro-cid-mukqocnw></div>` : sport === "football" ? renderTemplate`<div class="topscorer-banner-player-slide" data-initial-slide="true" data-astro-cid-mukqocnw><img data-src="https://playerstall.b-cdn.net/images/player-img-6.png" alt="" width="480" height="640" data-astro-cid-mukqocnw></div>` : sport === "hockey" ? renderTemplate`<div class="topscorer-banner-player-slide" data-initial-slide="true" data-astro-cid-mukqocnw><img data-src="https://playerstall.b-cdn.net/images/player-img-11-nobg.png" alt="" width="480" height="640" data-astro-cid-mukqocnw></div>` : sport === "basketball" ? renderTemplate`<div class="topscorer-banner-player-slide" data-initial-slide="true" data-astro-cid-mukqocnw><img data-src="https://playerstall.b-cdn.net/images/basketball-player-standing-nobg.png" alt="" width="480" height="640" data-astro-cid-mukqocnw></div>` : sport === "soccer" ? renderTemplate`<div class="topscorer-banner-player-slide" data-initial-slide="true" data-astro-cid-mukqocnw><img data-src="https://playerstall.b-cdn.net/images/soccer-player.png" alt="" width="480" height="640" data-astro-cid-mukqocnw></div>` : sport === "lacrosse" ? renderTemplate`<div class="topscorer-banner-player-slide" data-initial-slide="true" data-astro-cid-mukqocnw><img data-src="https://playerstall.b-cdn.net/images/lacrosse-player-nobg.png" alt="" width="480" height="640" data-astro-cid-mukqocnw></div>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-mukqocnw": true }, { "default": ($$result3) => renderTemplate` <div class="topscorer-banner-player-slide active" data-astro-cid-mukqocnw><img src="https://playerstall.b-cdn.net/images/player-img-10.jpg" alt="" width="480" height="640" loading="eager" data-astro-cid-mukqocnw></div> <div class="topscorer-banner-player-slide" data-astro-cid-mukqocnw><img src="https://playerstall.b-cdn.net/images/soccer-player.png" alt="" width="480" height="640" loading="lazy" data-astro-cid-mukqocnw></div> <div class="topscorer-banner-player-slide" data-astro-cid-mukqocnw><img src="https://playerstall.b-cdn.net/images/hockey-player.png" alt="" width="480" height="640" loading="lazy" data-astro-cid-mukqocnw></div> <div class="topscorer-banner-player-slide" data-astro-cid-mukqocnw><img src="https://playerstall.b-cdn.net/images/basketball-player.png" alt="" width="480" height="640" loading="lazy" data-astro-cid-mukqocnw></div> <div class="topscorer-banner-player-slide" data-astro-cid-mukqocnw><img src="https://playerstall.b-cdn.net/images/baseball-player.png" alt="" width="480" height="640" loading="lazy" data-astro-cid-mukqocnw></div> <div class="topscorer-banner-player-slide" data-astro-cid-mukqocnw><img src="https://playerstall.b-cdn.net/images/player-football-blue-orange.png" alt="" width="480" height="640" loading="lazy" data-astro-cid-mukqocnw></div> ` })}`} </div> </section> </div> ` })}  ${renderScript($$result, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/sport/[sport].astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/sport/[sport].astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/sport/[sport].astro";
const $$url = "/sport/[sport]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$sport,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
