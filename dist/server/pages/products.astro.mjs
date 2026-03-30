import { c as createComponent, r as renderComponent, h as renderScript, a as renderTemplate, u as unescapeHTML, m as maybeRenderHead } from '../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DCfoLHMi.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Products = createComponent(($$result, $$props, $$slots) => {
  const productsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Product",
        "position": 1,
        "name": "Semi Pro Locker",
        "description": "Essential tier wood sports locker for high schools and training facilities. 3/4 inch solid wood construction with 5 year warranty.",
        "brand": {
          "@type": "Brand",
          "name": "PlayerStall"
        },
        "image": "http://playerstall.com/wp-content/uploads/2016/03/Athletic-Locker-Semipro.jpg",
        "offers": {
          "@type": "Offer",
          "url": "https://playerstall.com/product-semi-pro-locker",
          "priceCurrency": "USD",
          "price": "349",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "PlayerStall"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "reviewCount": "89"
        }
      },
      {
        "@type": "Product",
        "position": 2,
        "name": "Varsity Locker",
        "description": "Mid-tier wood sports locker with enhanced storage and professional finishing. Perfect for high school varsity programs.",
        "brand": {
          "@type": "Brand",
          "name": "PlayerStall"
        },
        "image": "/images/varsity-locker.png",
        "offers": {
          "@type": "Offer",
          "url": "https://playerstall.com/product-varsity-locker",
          "priceCurrency": "USD",
          "price": "449",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "PlayerStall"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "127"
        }
      },
      {
        "@type": "Product",
        "position": 3,
        "name": "Model L Locker",
        "description": "Premium tier wood sports locker with maximum storage capacity and elite finishing quality. Ideal for collegiate programs.",
        "brand": {
          "@type": "Brand",
          "name": "PlayerStall"
        },
        "image": "https://playerstall.b-cdn.net/images/legendary-locker.png",
        "offers": {
          "@type": "Offer",
          "url": "https://playerstall.com/product-pro-locker",
          "priceCurrency": "USD",
          "price": "549",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "PlayerStall"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "203"
        }
      },
      {
        "@type": "Product",
        "position": 4,
        "name": "Model S Locker",
        "description": "Premium wood sports locker for high-traffic facilities. Stadium-grade melamine construction with championship-quality finishing. Custom-built to your dimensions and finish choices.",
        "brand": {
          "@type": "Brand",
          "name": "PlayerStall"
        },
        "image": "/images/stadium-locker.png",
        "offers": {
          "@type": "Offer",
          "url": "https://playerstall.com/product-stadium-locker",
          "priceCurrency": "USD",
          "price": "649",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": "0",
              "currency": "USD"
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 8,
                "maxValue": 12,
                "unitCode": "WK"
              }
            }
          },
          "seller": {
            "@type": "Organization",
            "name": "PlayerStall"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "156"
        }
      },
      {
        "@type": "Product",
        "position": 5,
        "name": "Model Z Locker",
        "description": "Curved-design premium wood sports locker. Modern aesthetic with maximum functionality for collegiate and professional teams. Custom-built to your specifications.",
        "brand": {
          "@type": "Brand",
          "name": "PlayerStall"
        },
        "image": "/images/elite-locker.png",
        "offers": {
          "@type": "Offer",
          "url": "https://playerstall.com/product-elite-locker",
          "priceCurrency": "USD",
          "price": "649",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": "0",
              "currency": "USD"
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 8,
                "maxValue": 12,
                "unitCode": "WK"
              }
            }
          },
          "seller": {
            "@type": "Organization",
            "name": "PlayerStall"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "94"
        }
      },
      {
        "@type": "Product",
        "position": 6,
        "name": "Model X Locker",
        "description": "Ultimate premium tier wood sports locker with maximum customization options. Elite finishing for championship facilities.",
        "brand": {
          "@type": "Brand",
          "name": "PlayerStall"
        },
        "image": "https://playerstall.b-cdn.net/images/legendary-locker.png",
        "offers": {
          "@type": "Offer",
          "url": "https://playerstall.com/product-legendary-locker",
          "priceCurrency": "USD",
          "price": "649",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "PlayerStall"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "67"
        }
      }
    ]
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://playerstall.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Our Products",
        "item": "https://playerstall.com/products"
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Wood Sports Locker Models & Pricing | PlayerStall", "description": "Custom wood sports lockers built in 8\u201312 weeks. Price match guarantee. Eight locker tiers from $349. 5 year warranty. Free design consultation.", "canonical": "https://playerstall.com/products", "data-astro-cid-3swd3b6j": true }, { "default": ($$result2) => renderTemplate`     ${maybeRenderHead()}<section class="hero-section" data-astro-cid-3swd3b6j> <div class="hero-parallax-img-holder" data-astro-cid-3swd3b6j> <div class="hero-parallax-img-wrapper" data-astro-cid-3swd3b6j> <img src="https://playerstall.b-cdn.net/images/our-team-title-photo.jpg" alt="Our Products" class="hero-parallax-img" data-astro-cid-3swd3b6j> </div> </div> <div class="hero-content qodef-content-grid" data-astro-cid-3swd3b6j> <div class="breadcrumbs" data-astro-cid-3swd3b6j> <a href="/" data-astro-cid-3swd3b6j>Home</a> <span class="breadcrumbs-separator" data-astro-cid-3swd3b6j></span> <span class="breadcrumbs-current" data-astro-cid-3swd3b6j>Our Products</span> </div> <h1 class="hero-title" data-astro-cid-3swd3b6j>Premium Wood Lockers. Priced Right.</h1> </div> </section>  <section class="products-team-section" data-astro-cid-3swd3b6j> <!-- Background Elements --> <div class="products-background-dots" data-astro-cid-3swd3b6j></div> <div class="products-background-text-holder" data-astro-cid-3swd3b6j> <span class="products-background-text" data-astro-cid-3swd3b6j>p r o d u c t</span> </div> <div class="products-container qodef-content-grid" data-astro-cid-3swd3b6j> <div class="section-header" data-astro-cid-3swd3b6j> <p class="section-subtitle" data-astro-cid-3swd3b6j>our products</p> <h2 class="section-title" data-astro-cid-3swd3b6j>CUSTOM BUILT</h2> <p style="max-width: 700px; margin: 1rem auto 0; font-size: 1rem; color: #666;" data-astro-cid-3swd3b6j>Custom orders are built in 8–12 weeks with your choice of dimensions, finishes, and materials. We walk you through options during a free consultation. Price match guarantee on USA competitors.</p> </div> <div class="products-grid" data-astro-cid-3swd3b6j> <!-- Semi Pro --> <div class="product-card" id="semi-pro" data-astro-cid-3swd3b6j> <a href="/product-semi-pro-locker" class="product-link product-card-trigger-link" data-astro-cid-3swd3b6j> <div class="product-image" data-astro-cid-3swd3b6j> <img src="http://playerstall.com/wp-content/uploads/2016/03/Athletic-Locker-Semipro.jpg" alt="Semi Pro Locker" loading="lazy" data-astro-cid-3swd3b6j> </div> <div class="product-details" data-astro-cid-3swd3b6j> <div class="product-position" data-astro-cid-3swd3b6j>Semi Pro</div> <h4 class="product-name" data-astro-cid-3swd3b6j>Semi Pro <span class="product-price-inline" data-astro-cid-3swd3b6j>$349</span></h4> <span class="spec-toggle-label" data-astro-cid-3swd3b6j>View spec sheet &rarr;</span> </div> </a> </div> <!-- Varsity --> <div class="product-card" id="varsity" data-astro-cid-3swd3b6j> <a href="/product-varsity-locker" class="product-link product-card-trigger-link" data-astro-cid-3swd3b6j> <div class="product-image" data-astro-cid-3swd3b6j> <img src="/images/varsity-locker.png" alt="Varsity Locker" loading="lazy" data-astro-cid-3swd3b6j> </div> <div class="product-details" data-astro-cid-3swd3b6j> <div class="product-position" data-astro-cid-3swd3b6j>Varsity</div> <h4 class="product-name" data-astro-cid-3swd3b6j>Varsity <span class="product-price-inline" data-astro-cid-3swd3b6j>$449</span></h4> <span class="spec-toggle-label" data-astro-cid-3swd3b6j>View spec sheet &rarr;</span> </div> </a> </div> <!-- Pro --> <div class="product-card" id="pro" data-astro-cid-3swd3b6j> <a href="/product-pro-locker" class="product-link product-card-trigger-link" data-astro-cid-3swd3b6j> <div class="product-image" data-astro-cid-3swd3b6j> <img src="https://playerstall.b-cdn.net/images/legendary-locker.png" alt="Model L Locker" loading="lazy" data-astro-cid-3swd3b6j> </div> <div class="product-details" data-astro-cid-3swd3b6j> <div class="product-position" data-astro-cid-3swd3b6j>Model L</div> <h4 class="product-name" data-astro-cid-3swd3b6j>Model L <span class="product-price-inline" data-astro-cid-3swd3b6j>$549</span></h4> <span class="spec-toggle-label" data-astro-cid-3swd3b6j>View spec sheet &rarr;</span> </div> </a> </div> <!-- Stadium --> <div class="product-card" id="stadium" data-astro-cid-3swd3b6j> <a href="/product-stadium-locker" class="product-link product-card-trigger-link" data-astro-cid-3swd3b6j> <div class="product-image" data-astro-cid-3swd3b6j> <img src="/images/stadium-locker.png" alt="Model S Locker" loading="lazy" data-astro-cid-3swd3b6j> </div> <div class="product-details" data-astro-cid-3swd3b6j> <div class="product-position" data-astro-cid-3swd3b6j>Model S</div> <h4 class="product-name" data-astro-cid-3swd3b6j>Model S <span class="product-price-inline" data-astro-cid-3swd3b6j>From $649</span></h4> <span class="spec-toggle-label" data-astro-cid-3swd3b6j>View spec sheet &rarr;</span> </div> </a> </div> <!-- Model Z Locker (formerly Elite) --> <div class="product-card product-card-with-spec" id="elite" data-astro-cid-3swd3b6j> <button type="button" class="product-card-trigger" aria-expanded="false" aria-controls="spec-elite" data-spec-target="spec-elite" data-astro-cid-3swd3b6j> <div class="product-image" data-astro-cid-3swd3b6j> <img src="/images/elite-locker.png" alt="Model Z Locker" loading="lazy" data-astro-cid-3swd3b6j> </div> <div class="product-details" data-astro-cid-3swd3b6j> <div class="product-position" data-astro-cid-3swd3b6j>Model Z</div> <h4 class="product-name" data-astro-cid-3swd3b6j>Model Z Locker <span class="product-price-inline" data-astro-cid-3swd3b6j>From $649</span></h4> <span class="spec-toggle-label" data-astro-cid-3swd3b6j>View specs &darr;</span> </div> </button> <div id="spec-elite" class="spec-panel" hidden data-astro-cid-3swd3b6j> <div class="spec-panel-inner" data-astro-cid-3swd3b6j> <h5 data-astro-cid-3swd3b6j>Specifications</h5> <ul data-astro-cid-3swd3b6j> <li data-astro-cid-3swd3b6j><strong data-astro-cid-3swd3b6j>Standard size shown:</strong> 24&quot; W x 76&quot; H x 19&quot; D</li> <li data-astro-cid-3swd3b6j><strong data-astro-cid-3swd3b6j>Base:</strong> optional 4&quot; high base can be added</li> <li data-astro-cid-3swd3b6j><strong data-astro-cid-3swd3b6j>Weight:</strong> approx. 175 lbs</li> <li data-astro-cid-3swd3b6j><strong data-astro-cid-3swd3b6j>Base price:</strong> $649 · <strong data-astro-cid-3swd3b6j>Colors:</strong> Black, Light Grey, Dark Grey, Maple</li> <li data-astro-cid-3swd3b6j><strong data-astro-cid-3swd3b6j>Lead time:</strong> 8–12 weeks — custom dimensions, finishes, and materials</li> </ul> <a href="/product-elite-locker" class="spec-cta" data-astro-cid-3swd3b6j>View product</a> <a href="/contact" class="spec-cta" data-astro-cid-3swd3b6j>Request a quote</a> </div> </div> </div> <!-- Model X Locker --> <div class="product-card product-card-with-spec" id="model-x" data-astro-cid-3swd3b6j> <button type="button" class="product-card-trigger" aria-expanded="false" aria-controls="spec-model-x" data-spec-target="spec-model-x" data-astro-cid-3swd3b6j> <div class="product-image" data-astro-cid-3swd3b6j> <img src="https://playerstall.b-cdn.net/images/legendary-locker.png" alt="Model X Locker" loading="lazy" data-astro-cid-3swd3b6j> </div> <div class="product-details" data-astro-cid-3swd3b6j> <div class="product-position" data-astro-cid-3swd3b6j>Model X</div> <h4 class="product-name" data-astro-cid-3swd3b6j>Model X Locker <span class="product-price-inline" data-astro-cid-3swd3b6j>From $649</span></h4> <span class="spec-toggle-label" data-astro-cid-3swd3b6j>View specs &darr;</span> </div> </button> <div id="spec-model-x" class="spec-panel" hidden data-astro-cid-3swd3b6j> <div class="spec-panel-inner" data-astro-cid-3swd3b6j> <h5 data-astro-cid-3swd3b6j>Specifications</h5> <ul data-astro-cid-3swd3b6j> <li data-astro-cid-3swd3b6j><strong data-astro-cid-3swd3b6j>Standard size shown:</strong> 24&quot; W x 76&quot; H x 19&quot; D</li> <li data-astro-cid-3swd3b6j><strong data-astro-cid-3swd3b6j>Base:</strong> optional 4&quot; high base can be added</li> <li data-astro-cid-3swd3b6j><strong data-astro-cid-3swd3b6j>Weight:</strong> approx. 175 lbs</li> <li data-astro-cid-3swd3b6j><strong data-astro-cid-3swd3b6j>Premium tier</strong> with maximum customization · <strong data-astro-cid-3swd3b6j>Base price:</strong> $649</li> <li data-astro-cid-3swd3b6j><strong data-astro-cid-3swd3b6j>Colors:</strong> Black, Light Grey, Dark Grey, Maple</li> <li data-astro-cid-3swd3b6j><strong data-astro-cid-3swd3b6j>Custom:</strong> 8–12 weeks — any size, wood, or materials</li> </ul> <a href="/product-legendary-locker" class="spec-cta" data-astro-cid-3swd3b6j>View product</a> <a href="/contact" class="spec-cta" data-astro-cid-3swd3b6j>Request a quote</a> </div> </div> </div> <!-- Bench --> <div class="product-card product-card-with-spec" id="wood-locker-bench" data-astro-cid-3swd3b6j> <button type="button" class="product-card-trigger" aria-expanded="false" aria-controls="spec-bench" data-spec-target="spec-bench" data-astro-cid-3swd3b6j> <div class="product-image" data-astro-cid-3swd3b6j> <img src="https://playerstall.b-cdn.net/images/wood-lockers-starting-lineup.jpg" alt="Bench free standing for locker rooms" loading="lazy" data-astro-cid-3swd3b6j> </div> <div class="product-details" data-astro-cid-3swd3b6j> <div class="product-position" data-astro-cid-3swd3b6j>Accessory</div> <h4 class="product-name" data-astro-cid-3swd3b6j>Bench <span class="product-price-inline" data-astro-cid-3swd3b6j>From $225</span></h4> <span class="spec-toggle-label" data-astro-cid-3swd3b6j>View specs &darr;</span> </div> </button> <div id="spec-bench" class="spec-panel" hidden data-astro-cid-3swd3b6j> <div class="spec-panel-inner" data-astro-cid-3swd3b6j> <h5 data-astro-cid-3swd3b6j>Specifications</h5> <ul data-astro-cid-3swd3b6j> <li data-astro-cid-3swd3b6j><strong data-astro-cid-3swd3b6j>Standard size shown:</strong> 24&quot; W x 76&quot; H x 19&quot; D</li> <li data-astro-cid-3swd3b6j><strong data-astro-cid-3swd3b6j>Base:</strong> optional 4&quot; high base can be added</li> <li data-astro-cid-3swd3b6j><strong data-astro-cid-3swd3b6j>Weight:</strong> approx. 175 lbs</li> <li data-astro-cid-3swd3b6j><strong data-astro-cid-3swd3b6j>Colors:</strong> Black, Light Grey, Dark Grey, Maple · Custom colors available</li> </ul> <a href="/product-wood-locker-bench" class="spec-cta" data-astro-cid-3swd3b6j>View product</a> <a href="/contact" class="spec-cta" data-astro-cid-3swd3b6j>Request a quote</a> </div> </div> </div> <!-- Accessories --> <div class="product-card" data-astro-cid-3swd3b6j> <a href="/accessories" class="product-link product-card-trigger-link" data-astro-cid-3swd3b6j> <div class="product-image" data-astro-cid-3swd3b6j> <img src="https://playerstall.b-cdn.net/images/player-img-12.jpg" alt="Accessories" loading="lazy" data-astro-cid-3swd3b6j> </div> <div class="product-details" data-astro-cid-3swd3b6j> <div class="product-position" data-astro-cid-3swd3b6j>Accessories</div> <h4 class="product-name" data-astro-cid-3swd3b6j>Lock Box &amp; Stick Rack</h4> <span class="spec-toggle-label" data-astro-cid-3swd3b6j>View accessories &rarr;</span> </div> </a> </div> </div> </div> </section>  <section class="accessories-section" id="accessories" data-astro-cid-3swd3b6j> <div class="container" data-astro-cid-3swd3b6j> <div class="accessories-header" data-astro-cid-3swd3b6j> <p class="section-subtitle" data-astro-cid-3swd3b6j>finishing touches</p> <h2 class="section-title" data-astro-cid-3swd3b6j>locker accessories</h2> <p class="accessories-tagline" data-astro-cid-3swd3b6j>Dial in every detail – airflow, storage, comfort, and branding.</p> </div> <div class="accessories-grid" data-astro-cid-3swd3b6j> <div class="accessory-card accessory-card--cushions" data-astro-cid-3swd3b6j> <div class="accessory-image" data-astro-cid-3swd3b6j> <img src="https://playerstall.b-cdn.net/images/lock-box.png" alt="Locker cushion with team logo" loading="lazy" data-astro-cid-3swd3b6j> </div> <h3 class="accessory-title" data-astro-cid-3swd3b6j>Cushions</h3> <p class="accessory-price" data-astro-cid-3swd3b6j>+ $75.00 (top or bottom) / $150.00 (both)</p> <p class="accessory-copy" data-astro-cid-3swd3b6j>High-density foam cushions upholstered for comfort and durability – available on the top, bottom, or both.</p> </div> <div class="accessory-card accessory-card--hooks" data-astro-cid-3swd3b6j> <div class="accessory-image" data-astro-cid-3swd3b6j> <img src="/images/hook-silver.png" alt="Silver hook for lockers" loading="lazy" data-astro-cid-3swd3b6j> </div> <h3 class="accessory-title" data-astro-cid-3swd3b6j>Hooks</h3> <p class="accessory-price" data-astro-cid-3swd3b6j>$15.00</p> <p class="accessory-copy" data-astro-cid-3swd3b6j>Additional interior hooks for bags, helmets, and everyday gear, matched to your locker layout. Available in black or silver.</p> </div> <div class="accessory-card accessory-card--name-plate" data-astro-cid-3swd3b6j> <div class="accessory-image" data-astro-cid-3swd3b6j> <img src="/images/name-plate-black.png" alt="Black name plate for lockers" loading="lazy" data-astro-cid-3swd3b6j> </div> <h3 class="accessory-title" data-astro-cid-3swd3b6j>Name Plate</h3> <p class="accessory-price" data-astro-cid-3swd3b6j>+ $10.00</p> <p class="accessory-copy" data-astro-cid-3swd3b6j>Clean, simple name plate for player identification – ideal for teams that want a classic, organized look. Available in black or silver.</p> </div> <div class="accessory-card accessory-card--skate-hooks" data-astro-cid-3swd3b6j> <div class="accessory-image" data-astro-cid-3swd3b6j> <img src="/images/skate-hook-silver.png" alt="Silver skate hook for hockey lockers" loading="lazy" data-astro-cid-3swd3b6j> </div> <h3 class="accessory-title" data-astro-cid-3swd3b6j>Skate Hooks</h3> <p class="accessory-price" data-astro-cid-3swd3b6j>+ $25.00</p> <p class="accessory-copy" data-astro-cid-3swd3b6j>Additional wall-mounted hooks positioned for skates or gear, perfect for hockey or figure skating locker rooms.</p> </div> <div class="accessory-card accessory-card--custom-logo" data-astro-cid-3swd3b6j> <div class="accessory-image" data-astro-cid-3swd3b6j> <img src="/images/custom-logo-example.png" alt="Example of custom team logo on wood background" loading="lazy" data-astro-cid-3swd3b6j> </div> <h3 class="accessory-title" data-astro-cid-3swd3b6j>Custom Logo</h3> <p class="accessory-price" data-astro-cid-3swd3b6j>+ $75.00</p> <p class="accessory-copy" data-astro-cid-3swd3b6j>Team or program branding applied to the locker face – reinforce your identity every time players walk in.</p> </div> <div class="accessory-card accessory-card-link" data-astro-cid-3swd3b6j> <a href="/accessories" class="accessory-card-link-inner" data-astro-cid-3swd3b6j> <h3 class="accessory-title" data-astro-cid-3swd3b6j>Lock Box &amp; Stick Rack</h3> <p class="accessory-copy" data-astro-cid-3swd3b6j>Lock box with digital key lock (+$80) and stick rack (from $299). View details and request a quote.</p> <span class="spec-toggle-label" data-astro-cid-3swd3b6j>View accessories &rarr;</span> </a> </div> </div> </div> </section>  <section class="comparison-table-section" id="comparison" data-astro-cid-3swd3b6j> <div class="container" data-astro-cid-3swd3b6j> <h2 data-astro-cid-3swd3b6j>Compare All Tiers</h2> <p class="comparison-table-hint" data-astro-cid-3swd3b6j>All 8 locker types. Scroll horizontally on small screens to see every column.</p> <div class="comparison-table-wrapper" data-astro-cid-3swd3b6j> <table class="comparison-table" role="grid" aria-label="Compare all 8 locker tiers" data-astro-cid-3swd3b6j> <colgroup data-astro-cid-3swd3b6j> <col class="col-feature" data-astro-cid-3swd3b6j> <col data-astro-cid-3swd3b6j><col data-astro-cid-3swd3b6j><col data-astro-cid-3swd3b6j><col data-astro-cid-3swd3b6j><col data-astro-cid-3swd3b6j><col data-astro-cid-3swd3b6j><col data-astro-cid-3swd3b6j><col data-astro-cid-3swd3b6j> </colgroup> <thead data-astro-cid-3swd3b6j> <tr data-astro-cid-3swd3b6j> <th scope="col" data-astro-cid-3swd3b6j>Feature</th> <th scope="col" data-astro-cid-3swd3b6j>Semi Pro</th> <th scope="col" data-astro-cid-3swd3b6j>Varsity</th> <th scope="col" data-astro-cid-3swd3b6j>Pro</th> <th scope="col" data-astro-cid-3swd3b6j>Stadium</th> <th scope="col" data-astro-cid-3swd3b6j>Model L</th> <th scope="col" data-astro-cid-3swd3b6j>Model S</th> <th scope="col" data-astro-cid-3swd3b6j>Model Z</th> <th scope="col" data-astro-cid-3swd3b6j>Model X</th> </tr> </thead> <tbody data-astro-cid-3swd3b6j> <tr data-astro-cid-3swd3b6j> <td data-astro-cid-3swd3b6j>Starting price</td> <td data-astro-cid-3swd3b6j>$349</td> <td data-astro-cid-3swd3b6j>$449</td> <td data-astro-cid-3swd3b6j>$599</td> <td data-astro-cid-3swd3b6j>$599</td> <td data-astro-cid-3swd3b6j>$549</td> <td data-astro-cid-3swd3b6j>$649</td> <td data-astro-cid-3swd3b6j>$649</td> <td data-astro-cid-3swd3b6j>$649</td> </tr> <tr data-astro-cid-3swd3b6j> <td data-astro-cid-3swd3b6j>3/4" Melamine wood</td> <td data-astro-cid-3swd3b6j>—</td> <td data-astro-cid-3swd3b6j>—</td> <td data-astro-cid-3swd3b6j>—</td> <td data-astro-cid-3swd3b6j>—</td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> </tr> <tr data-astro-cid-3swd3b6j> <td data-astro-cid-3swd3b6j>3/4" Birch plywood</td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j>—</td> <td data-astro-cid-3swd3b6j>—</td> <td data-astro-cid-3swd3b6j>—</td> <td data-astro-cid-3swd3b6j>—</td> </tr> <tr data-astro-cid-3swd3b6j> <td data-astro-cid-3swd3b6j>5 Year Warranty</td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> </tr> <tr data-astro-cid-3swd3b6j> <td data-astro-cid-3swd3b6j>Modular Design</td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> </tr> <tr data-astro-cid-3swd3b6j> <td data-astro-cid-3swd3b6j>Lock box with digital lock</td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> </tr> <tr data-astro-cid-3swd3b6j> <td data-astro-cid-3swd3b6j>Vented front</td> <td data-astro-cid-3swd3b6j>No</td> <td data-astro-cid-3swd3b6j>No</td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> <td data-astro-cid-3swd3b6j><span class="checkmark" data-astro-cid-3swd3b6j>Yes</span></td> </tr> <tr data-astro-cid-3swd3b6j> <td data-astro-cid-3swd3b6j>Storage Capacity</td> <td data-astro-cid-3swd3b6j>Standard</td> <td data-astro-cid-3swd3b6j>Maximum</td> <td data-astro-cid-3swd3b6j>Maximum</td> <td data-astro-cid-3swd3b6j>Maximum</td> <td data-astro-cid-3swd3b6j>Maximum</td> <td data-astro-cid-3swd3b6j>Maximum</td> <td data-astro-cid-3swd3b6j>Maximum</td> <td data-astro-cid-3swd3b6j>Maximum</td> </tr> <tr data-astro-cid-3swd3b6j> <td data-astro-cid-3swd3b6j>Finishing Quality</td> <td data-astro-cid-3swd3b6j>Professional</td> <td data-astro-cid-3swd3b6j>Professional</td> <td data-astro-cid-3swd3b6j>Professional</td> <td data-astro-cid-3swd3b6j>Professional</td> <td data-astro-cid-3swd3b6j>Premium</td> <td data-astro-cid-3swd3b6j>Premium</td> <td data-astro-cid-3swd3b6j>Premium</td> <td data-astro-cid-3swd3b6j>Premium</td> </tr> <tr data-astro-cid-3swd3b6j> <td data-astro-cid-3swd3b6j>Depth</td> <td data-astro-cid-3swd3b6j>19"</td> <td data-astro-cid-3swd3b6j>19"</td> <td data-astro-cid-3swd3b6j>19"</td> <td data-astro-cid-3swd3b6j>19"</td> <td data-astro-cid-3swd3b6j>19" & 24"</td> <td data-astro-cid-3swd3b6j>19" & 24"</td> <td data-astro-cid-3swd3b6j>19" & 24"</td> <td data-astro-cid-3swd3b6j>19" & 24"</td> </tr> <tr data-astro-cid-3swd3b6j> <td data-astro-cid-3swd3b6j>Backing</td> <td data-astro-cid-3swd3b6j>5mm thick</td> <td data-astro-cid-3swd3b6j>5mm thick</td> <td data-astro-cid-3swd3b6j>3/4" thick</td> <td data-astro-cid-3swd3b6j>3/4" thick</td> <td data-astro-cid-3swd3b6j>3/4" thick</td> <td data-astro-cid-3swd3b6j>3/4" thick</td> <td data-astro-cid-3swd3b6j>3/4" thick</td> <td data-astro-cid-3swd3b6j>3/4" thick</td> </tr> </tbody> </table> </div> </div> </section>  <section class="cta-section" data-astro-cid-3swd3b6j> <div class="container" data-astro-cid-3swd3b6j> <div class="cta-content" data-astro-cid-3swd3b6j> <h2 data-astro-cid-3swd3b6j>Find the Right Locker for Your Program</h2> <p data-astro-cid-3swd3b6j>Get a free custom design consultation. Our team will help you choose the perfect locker solution for your program and budget.</p> <a href="/contact" class="btn btn-primary btn-large" data-astro-cid-3swd3b6j>Get Free Consultation</a> </div> </div> </section> `, "head": ($$result2) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', '<\/script><script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(productsSchema)), unescapeHTML(JSON.stringify(breadcrumbSchema))) })}  ${renderScript($$result, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/products.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/products.astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/products.astro";
const $$url = "/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Products,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
