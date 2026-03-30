import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, a as renderTemplate, h as renderScript } from './astro/server_BKRL6jPE.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                        */

const $$Astro = createAstro("https://playerstall.com");
const $$LockerAccessories = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LockerAccessories;
  const { items, title = "LOCKER ACCESSORIES", useModal = false } = Astro2.props;
  function isModalItem(item) {
    return useModal && "accImage" in item && "accTitle" in item;
  }
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`locker-accessories ${useModal ? "locker-accessories--modal" : ""}`, "class")} data-astro-cid-2itzxmw3> <div class="locker-accessories-inner" data-astro-cid-2itzxmw3> <h2 class="locker-accessories-heading" data-astro-cid-2itzxmw3>${title}</h2> <div class="locker-accessories-slider" data-astro-cid-2itzxmw3> <div class="locker-accessories-track" data-astro-cid-2itzxmw3> <div class="locker-accessories-track-set" data-astro-cid-2itzxmw3> ${items.map((item) => isModalItem(item) ? renderTemplate`<div class="locker-accessories-card shop-accessory-item"${addAttribute(item.accImage, "data-acc-image")}${addAttribute(item.accImage2, "data-acc-image-2")}${addAttribute(item.accImage3, "data-acc-image-3")}${addAttribute(item.accImage4, "data-acc-image-4")}${addAttribute(item.accTitle, "data-acc-title")}${addAttribute(item.accPrice, "data-acc-price")}${addAttribute(item.accDesc, "data-acc-desc")} data-astro-cid-2itzxmw3> <button type="button" class="shop-accessory-trigger" data-astro-cid-2itzxmw3> <div class="shop-product-image" data-astro-cid-2itzxmw3> <img${addAttribute(item.image, "src")}${addAttribute(item.alt, "alt")} loading="lazy" data-astro-cid-2itzxmw3> </div> <div class="shop-product-content" data-astro-cid-2itzxmw3> <div class="shop-product-categories" data-astro-cid-2itzxmw3>Accessories</div> <h5 class="shop-product-title" data-astro-cid-2itzxmw3>${item.title}</h5> </div> </button> </div>` : renderTemplate`<a${addAttribute(item.href, "href")} class="locker-accessories-card" data-astro-cid-2itzxmw3> <div class="locker-accessories-card-image-wrap" data-astro-cid-2itzxmw3> ${item.tag && renderTemplate`<span${addAttribute(`locker-accessories-tag locker-accessories-tag-${item.tag.toLowerCase()}`, "class")} data-astro-cid-2itzxmw3> ${item.tag} </span>`} <div class="locker-accessories-card-image" data-astro-cid-2itzxmw3> <img${addAttribute(item.image, "src")}${addAttribute(item.alt, "alt")} loading="lazy" data-astro-cid-2itzxmw3> </div> </div> <p class="locker-accessories-category" data-astro-cid-2itzxmw3>${item.category}</p> <h4 class="locker-accessories-card-title" data-astro-cid-2itzxmw3>${item.title}</h4> <div class="locker-accessories-price" data-astro-cid-2itzxmw3> ${item.priceOriginal && renderTemplate`<span class="locker-accessories-price-old" data-astro-cid-2itzxmw3>${item.priceOriginal}</span>`} <span class="locker-accessories-price-current" data-astro-cid-2itzxmw3>${item.price}</span> </div> </a>`)} </div> <div class="locker-accessories-track-set" aria-hidden="true" data-astro-cid-2itzxmw3> ${items.map((item) => isModalItem(item) ? renderTemplate`<div class="locker-accessories-card shop-accessory-item"${addAttribute(item.accImage, "data-acc-image")}${addAttribute(item.accImage2, "data-acc-image-2")}${addAttribute(item.accImage3, "data-acc-image-3")}${addAttribute(item.accImage4, "data-acc-image-4")}${addAttribute(item.accTitle, "data-acc-title")}${addAttribute(item.accPrice, "data-acc-price")}${addAttribute(item.accDesc, "data-acc-desc")} data-astro-cid-2itzxmw3> <button type="button" class="shop-accessory-trigger" data-astro-cid-2itzxmw3> <div class="shop-product-image" data-astro-cid-2itzxmw3> <img${addAttribute(item.image, "src")}${addAttribute(item.alt, "alt")} loading="lazy" data-astro-cid-2itzxmw3> </div> <div class="shop-product-content" data-astro-cid-2itzxmw3> <div class="shop-product-categories" data-astro-cid-2itzxmw3>Accessories</div> <h5 class="shop-product-title" data-astro-cid-2itzxmw3>${item.title}</h5> </div> </button> </div>` : renderTemplate`<a${addAttribute(item.href, "href")} class="locker-accessories-card" data-astro-cid-2itzxmw3> <div class="locker-accessories-card-image-wrap" data-astro-cid-2itzxmw3> ${item.tag && renderTemplate`<span${addAttribute(`locker-accessories-tag locker-accessories-tag-${item.tag.toLowerCase()}`, "class")} data-astro-cid-2itzxmw3> ${item.tag} </span>`} <div class="locker-accessories-card-image" data-astro-cid-2itzxmw3> <img${addAttribute(item.image, "src")}${addAttribute(item.alt, "alt")} loading="lazy" data-astro-cid-2itzxmw3> </div> </div> <p class="locker-accessories-category" data-astro-cid-2itzxmw3>${item.category}</p> <h4 class="locker-accessories-card-title" data-astro-cid-2itzxmw3>${item.title}</h4> <div class="locker-accessories-price" data-astro-cid-2itzxmw3> ${item.priceOriginal && renderTemplate`<span class="locker-accessories-price-old" data-astro-cid-2itzxmw3>${item.priceOriginal}</span>`} <span class="locker-accessories-price-current" data-astro-cid-2itzxmw3>${item.price}</span> </div> </a>`)} </div> </div> </div> </div> </section> `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/components/LockerAccessories.astro", void 0);

const $$AccessoryModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="shop-accessory-modal" class="acc-modal" role="dialog" aria-modal="true" aria-labelledby="acc-modal-title" hidden> <div class="acc-modal-backdrop"></div> <div class="acc-modal-box"> <button type="button" class="acc-modal-close" aria-label="Close">&times;</button> <div class="acc-modal-layout"> <div class="acc-modal-gallery"> <div class="acc-modal-slider" id="acc-modal-slider"> <div class="acc-modal-slides" id="acc-modal-slides"> <div class="acc-modal-slide"> <img id="acc-modal-image" src="" alt=""> </div> <div class="acc-modal-slide" id="acc-modal-slide-2"> <img id="acc-modal-image-2" src="" alt=""> </div> <div class="acc-modal-slide" id="acc-modal-slide-3"> <img id="acc-modal-image-3" src="" alt=""> </div> <div class="acc-modal-slide" id="acc-modal-slide-4"> <img id="acc-modal-image-4" src="" alt=""> </div> </div> <div class="acc-modal-slider-dots" id="acc-modal-slider-nav" hidden> <button type="button" class="acc-modal-slider-dot active" data-slide="0" aria-label="Image 1" aria-current="true"></button> <button type="button" class="acc-modal-slider-dot" data-slide="1" aria-label="Image 2"></button> <button type="button" class="acc-modal-slider-dot" data-slide="2" aria-label="Image 3"></button> <button type="button" class="acc-modal-slider-dot" data-slide="3" aria-label="Image 4"></button> </div> </div> </div> <div class="acc-modal-detail"> <h2 id="acc-modal-title" class="acc-modal-title"></h2> <p id="acc-modal-price" class="acc-modal-price"></p> <p id="acc-modal-desc" class="acc-modal-desc"></p> <p id="acc-modal-size" class="acc-modal-size" hidden></p> <div id="acc-modal-ctas" class="acc-modal-ctas"></div> <div id="acc-modal-colors-pdf-above" class="acc-modal-colors-pdf-above" hidden> <a href="/colors/cushion-colors-pdf.html" target="_blank" rel="noopener noreferrer" class="acc-modal-colors-pdf-link">Colors available (PDF)</a> </div> <div id="acc-modal-color-sheet" class="acc-modal-color-sheet" hidden> <div class="acc-modal-cushion-options"> <label for="acc-cushion-color-select" class="acc-modal-cushion-label">Color</label> <select id="acc-cushion-color-select" class="acc-modal-cushion-select" aria-label="Select cushion color"> <option value="white">White</option> <option value="black">Black</option> <option value="charcoal">Charcoal</option> <option value="grey">Grey</option> <option value="red">Red</option> <option value="navy">Navy</option> <option value="blue">Blue</option> <option value="green">Green</option> </select> </div> <div class="acc-modal-cushion-options acc-modal-cushion-placement"> <span class="acc-modal-cushion-label">Placement</span> <div class="acc-modal-cushion-radios" role="radiogroup" aria-label="Cushion placement"> <label class="acc-modal-cushion-radio-label"> <input type="radio" name="acc-cushion-placement" value="bottom" checked class="acc-modal-cushion-radio"> <span>Bottom cushion ($75)</span> </label> <label class="acc-modal-cushion-radio-label"> <input type="radio" name="acc-cushion-placement" value="both" class="acc-modal-cushion-radio"> <span>Both top &amp; bottom ($150)</span> </label> </div> </div> <div class="acc-modal-cushion-options acc-modal-cushion-qty"> <label for="acc-cushion-qty" class="acc-modal-cushion-label">Quantity</label> <input type="number" id="acc-cushion-qty" class="acc-modal-qty-input" min="1" value="1" aria-label="Quantity"> </div> <div class="acc-modal-cushion-add"> <button type="button" id="acc-cushion-add-to-cart-btn" class="acc-modal-add-to-cart-btn">Add to cart</button> </div> </div> <div id="acc-modal-hooks" class="acc-modal-color-sheet" hidden> <div class="acc-modal-cushion-options"> <label for="acc-hooks-color-select" class="acc-modal-cushion-label">Color</label> <select id="acc-hooks-color-select" class="acc-modal-cushion-select" aria-label="Select hooks color"> <option value="black">Black</option> <option value="silver">Silver</option> </select> </div> <div class="acc-modal-cushion-options acc-modal-cushion-qty"> <label for="acc-hooks-qty" class="acc-modal-cushion-label">Quantity</label> <input type="number" id="acc-hooks-qty" class="acc-modal-qty-input" min="1" value="1" aria-label="Quantity"> </div> <div class="acc-modal-cushion-add"> <button type="button" id="acc-hooks-add-to-cart-btn" class="acc-modal-add-to-cart-btn">Add to cart</button> </div> </div> <div id="acc-modal-skate-hooks" class="acc-modal-color-sheet" hidden> <div class="acc-modal-cushion-options"> <label for="acc-skate-hooks-color-select" class="acc-modal-cushion-label">Color</label> <select id="acc-skate-hooks-color-select" class="acc-modal-cushion-select" aria-label="Select skate hooks color"> <option value="black">Black</option> <option value="silver">Silver</option> </select> </div> <div class="acc-modal-cushion-options acc-modal-cushion-qty"> <label for="acc-skate-hooks-qty" class="acc-modal-cushion-label">Quantity</label> <input type="number" id="acc-skate-hooks-qty" class="acc-modal-qty-input" min="1" value="1" aria-label="Quantity"> </div> <div class="acc-modal-cushion-add"> <button type="button" id="acc-skate-hooks-add-to-cart-btn" class="acc-modal-add-to-cart-btn">Add to cart</button> </div> </div> <div id="acc-modal-name-plate" class="acc-modal-color-sheet" hidden> <div class="acc-modal-cushion-options"> <label for="acc-name-plate-color-select" class="acc-modal-cushion-label">Color</label> <select id="acc-name-plate-color-select" class="acc-modal-cushion-select" aria-label="Select name plate color"> <option value="black">Black</option> <option value="silver">Silver</option> </select> </div> <div class="acc-modal-cushion-options acc-modal-cushion-qty"> <label for="acc-name-plate-qty" class="acc-modal-cushion-label">Quantity</label> <input type="number" id="acc-name-plate-qty" class="acc-modal-qty-input" min="1" value="1" aria-label="Quantity"> </div> <div class="acc-modal-cushion-add"> <button type="button" id="acc-name-plate-add-to-cart-btn" class="acc-modal-add-to-cart-btn">Add to cart</button> </div> </div> <div id="acc-modal-lock-box" class="acc-modal-color-sheet" hidden> <div class="acc-modal-cushion-options acc-modal-cushion-qty"> <label for="acc-lock-box-qty" class="acc-modal-cushion-label">Quantity</label> <input type="number" id="acc-lock-box-qty" class="acc-modal-qty-input" min="1" value="1" aria-label="Quantity"> </div> <div class="acc-modal-cushion-add"> <button type="button" id="acc-lock-box-add-to-cart-btn" class="acc-modal-add-to-cart-btn">Add to cart</button> </div> </div> </div> </div> </div> </div>  ${renderScript($$result, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/components/AccessoryModal.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/components/AccessoryModal.astro", void 0);

const LOCK_BOX_IMG = "https://playerstall.b-cdn.net/images/lock-box.png";
const LOCK_BOX_DIGITAL_IMG = "/images/lock-box.png";
const CUSHION_IMG = "https://playerstall.b-cdn.net/images/cushion-logo.png";
const SHOP_ACCESSORIES_MODAL = [
  {
    accImage: "/images/elite-locker-vent-panel.png",
    accImage2: "/images/stadium-locker-vent-panel.png",
    accImage3: "/images/model-x-website-images/model-x-locker-vent-panel.png",
    accTitle: "Vented Panel",
    accPrice: "+ $40.00",
    accDesc: "Vented front panel for increased airflow – keeps gear dry and reduces odor. Available on Elite, Stadium, and Model X lockers.",
    image: "/images/elite-locker-vent-panel.png",
    alt: "Vented front panel for sports lockers",
    title: "Vented Panel"
  },
  {
    accImage: LOCK_BOX_IMG,
    accImage2: CUSHION_IMG,
    accTitle: "Cushions",
    accPrice: "$75.00 (top or bottom) / $150.00 (both)",
    accDesc: "High-density foam cushions upholstered for comfort and durability – available on the top, bottom, or both.",
    image: LOCK_BOX_IMG,
    alt: "Locker cushion with team logo",
    title: "Cushions"
  },
  {
    accImage: "/images/hook-black.png",
    accImage2: "/images/hook-silver.png",
    accImage3: "/images/hook-spec-sheet.png",
    accTitle: "Hooks",
    accPrice: "$15.00",
    accDesc: "Additional interior hooks for bags, helmets, and everyday gear, matched to your locker layout. Available in black or silver.",
    image: "/images/hook-silver.png",
    alt: "Silver hook for lockers",
    title: "Hooks"
  },
  {
    accImage: "/images/name-plate-black.png",
    accImage2: "/images/name-plate-silver.png",
    accTitle: "Name Plate",
    accPrice: "$10.00",
    accDesc: "Clean, simple name plate for player identification – ideal for teams that want a classic, organized look. Available in black or silver.",
    image: "/images/name-plate-black.png",
    alt: "Black name plate for lockers",
    title: "Name Plate"
  },
  {
    accImage: "/images/skate-hook-black.png",
    accImage2: "/images/skate-hook-silver.png",
    accTitle: "Skate Hooks",
    accPrice: "+ $25.00",
    accDesc: "Additional wall-mounted hooks positioned for skates or gear, perfect for hockey or figure skating locker rooms. Available in black or silver.",
    image: "/images/skate-hook-silver.png",
    alt: "Silver skate hook for hockey lockers",
    title: "Skate Hooks"
  },
  {
    accImage: "/images/custom-logo-example.png",
    accTitle: "Custom Logo",
    accPrice: "+ $75.00",
    accDesc: "Team or program branding applied to the locker face – reinforce your identity every time players walk in. Custom orders only.",
    image: "/images/custom-logo-example.png",
    alt: "Custom team logo example",
    title: "Custom Logo"
  },
  {
    accImage: "/images/stick-rack.png",
    accTitle: "Stick Rack",
    accPrice: "Starting at $299",
    accDesc: "Dedicated stick storage that keeps sticks organized, off the floor, and easy to grab on the way to the ice.",
    image: "/images/stick-rack.png",
    alt: "Wood stick rack for locker rooms",
    title: "Stick Rack"
  },
  {
    accImage: LOCK_BOX_DIGITAL_IMG,
    accImage2: LOCK_BOX_DIGITAL_IMG,
    accImage3: LOCK_BOX_DIGITAL_IMG,
    accImage4: "/images/lock-box-spec-sheet.png",
    accTitle: "Lock Box with Digital Key Lock",
    accPrice: "$80.00",
    accDesc: "Lock box with slow-closing hinge that closes gently and securely. Fitted with an electronic touchable keypad and RFID card lock: password or card entry, programmable master and user codes, battery-powered with emergency external power.",
    image: LOCK_BOX_DIGITAL_IMG,
    alt: "Lock box with digital keypad and RFID lock",
    title: "Lock Box with Digital Key Lock"
  }
];

export { $$LockerAccessories as $, SHOP_ACCESSORIES_MODAL as S, $$AccessoryModal as a };
