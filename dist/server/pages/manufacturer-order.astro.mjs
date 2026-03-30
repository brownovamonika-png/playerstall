import { c as createComponent, r as renderComponent, h as renderScript, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DCfoLHMi.mjs';
/* empty css                                              */
export { renderers } from '../renderers.mjs';

const $$ManufacturerOrder = createComponent(($$result, $$props, $$slots) => {
  const sideProfiles = [
    { value: "model-1", label: "Model 1", image: "/images/manufacturer/side-profile-model-1.png", alt: "Side profile Model 1 \u2013 straight full-height panel" },
    { value: "model-2", label: "Model 2", image: "/images/manufacturer/side-profile-model-2.png", alt: "Side profile Model 2 \u2013 hourglass contoured cutout" },
    { value: "model-3", label: "Model 3", image: "/images/manufacturer/side-profile-model-3.png", alt: "Side profile Model 3 \u2013 C-shape angular diagonal" },
    { value: "model-4", label: "Model 4", image: "/images/manufacturer/side-profile-model-4.png", alt: "Side profile Model 4 \u2013 tapered front long diagonal" }
  ];
  const topTypes = [
    { value: "lockbox-no-digital", label: "Lock box, no digital lock" },
    { value: "lockbox-digital", label: "Lock box with digital lock" },
    { value: "top-covered", label: "Whole top covered (enclosed)" },
    { value: "all-open", label: "All open, nothing inside" }
  ];
  const bottomTypes = [
    { value: "three-vents", label: "Three vents" },
    { value: "one-rectangular-vent", label: "One big rectangular vent" },
    { value: "no-vents", label: "No vents" }
  ];
  const widthOptions = [18, 20, 22, 24, 26, 28, 30, 32].map((inches) => ({
    value: String(inches),
    label: `${inches} inches`
  }));
  const heightOptions = [
    { value: "76", label: "76 inches" },
    { value: "other", label: "Other" }
  ];
  const depthOptions = [
    { value: "19", label: "19 inches" },
    { value: "23.5", label: "23.5 inches" }
  ];
  const colorOptions = [
    { value: "1", label: "Type 1", hex: "#1a1a1a" },
    { value: "2", label: "Type 2", hex: "#333333" },
    { value: "3", label: "Type 3", hex: "#5c5c5c" },
    { value: "4", label: "Type 4", hex: "#8c8c8c" },
    { value: "5", label: "Type 5", hex: "#c4c4c4" },
    { value: "6", label: "Type 6", hex: "#e8e4df" },
    { value: "7", label: "Type 7", hex: "#f5f5f0" },
    { value: "8", label: "Type 8", hex: "#4a6b5a" },
    { value: "9", label: "Type 9", hex: "#3d5a6c" },
    { value: "10", label: "Type 10", hex: "#8b6914" }
  ];
  const cushionColorOptions = [
    { value: "1", label: "Type 1", hex: "#1a1a1a" },
    { value: "2", label: "Type 2", hex: "#8c8c8c" },
    { value: "3", label: "Type 3", hex: "#e8e4df" },
    { value: "4", label: "Type 4", hex: "#f5f5f0" },
    { value: "5", label: "Type 5", hex: "#4a6b5a" }
  ];
  const cushionSizeOptions = [
    { value: "19", label: 'For 19" deep locker' },
    { value: "23.5", label: 'For 23.5" deep locker' }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Manufacturer Order Form | PlayerStall", "description": "Order form for Vietnamese manufacturers: side profile, top type, bottom vents, and order details. Print or save as PDF to send to factory.", "data-astro-cid-3fiu7xu2": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="manufacturer-hero" data-astro-cid-3fiu7xu2> <div class="manufacturer-hero-bg" data-astro-cid-3fiu7xu2> <img src="https://playerstall.b-cdn.net/images/h1-img-8.jpg" alt="" class="manufacturer-hero-img" data-astro-cid-3fiu7xu2> </div> <div class="manufacturer-hero-overlay" data-astro-cid-3fiu7xu2></div> <div class="manufacturer-hero-inner" data-astro-cid-3fiu7xu2> <nav class="manufacturer-breadcrumbs" data-astro-cid-3fiu7xu2> <a href="/" data-astro-cid-3fiu7xu2>Home</a> <span data-astro-cid-3fiu7xu2>Manufacturer Order Form</span> </nav> <h1 class="manufacturer-hero-title" data-astro-cid-3fiu7xu2>Manufacturer Order Form</h1> <p class="manufacturer-hero-subtitle" data-astro-cid-3fiu7xu2>Select side profile, width, height, depth, top type, bottom vents, and enter order details. Print or Save as PDF to send to factory.</p> </div> </section> <section class="manufacturer-section" data-astro-cid-3fiu7xu2> <div class="manufacturer-container" data-astro-cid-3fiu7xu2> <form class="manufacturer-form" id="manufacturer-order-form" data-astro-cid-3fiu7xu2> <!-- Side profile --> <div class="form-block" data-astro-cid-3fiu7xu2> <h2 class="form-block-title" data-astro-cid-3fiu7xu2>Side profile</h2> <div class="profile-grid" role="group" aria-label="Side profile" data-astro-cid-3fiu7xu2> ${sideProfiles.map((p) => renderTemplate`<label class="profile-card" data-astro-cid-3fiu7xu2> <input type="checkbox" name="side_profile"${addAttribute(p.value, "value")} class="profile-checkbox option-checkbox" data-group="side_profile" data-astro-cid-3fiu7xu2> <span class="profile-card-inner" data-astro-cid-3fiu7xu2> <img${addAttribute(p.image, "src")}${addAttribute(p.alt, "alt")} class="profile-img" width="120" height="200" loading="lazy" data-astro-cid-3fiu7xu2> <span class="profile-label" data-astro-cid-3fiu7xu2>${p.label}</span> </span> </label>`)} </div> </div> <!-- Color --> <div class="form-block" data-astro-cid-3fiu7xu2> <h2 class="form-block-title" data-astro-cid-3fiu7xu2>Color</h2> <div class="chip-group color-swatch-group" role="group" aria-label="Color" data-astro-cid-3fiu7xu2> ${colorOptions.map((c) => renderTemplate`<label class="chip chip-color" data-astro-cid-3fiu7xu2> <input type="checkbox" name="color"${addAttribute(c.value, "value")} class="chip-input option-checkbox" data-group="color" data-astro-cid-3fiu7xu2> <span class="color-swatch"${addAttribute(`background-color: ${c.hex}`, "style")} aria-hidden="true" data-astro-cid-3fiu7xu2></span> <span class="chip-label" data-astro-cid-3fiu7xu2>${c.label}</span> </label>`)} </div> </div> <!-- Width (quantity per width) --> <div class="form-block" data-astro-cid-3fiu7xu2> <h2 class="form-block-title" data-astro-cid-3fiu7xu2>Width &amp; quantity</h2> <p class="form-block-hint" data-astro-cid-3fiu7xu2>Enter quantity for each width. Use 0 if that width is not needed.</p> <div class="width-qty-grid" data-astro-cid-3fiu7xu2> ${widthOptions.map((w) => renderTemplate`<div class="width-qty-row" data-astro-cid-3fiu7xu2> <label${addAttribute(`qty_width_${w.value}`, "for")} class="width-qty-label" data-astro-cid-3fiu7xu2>${w.label}</label> <input type="number"${addAttribute(`qty_width_${w.value}`, "id")}${addAttribute(`qty_width_${w.value}`, "name")} min="0" value="0" class="width-qty-input"${addAttribute(`Quantity for ${w.label}`, "aria-label")} data-astro-cid-3fiu7xu2> </div>`)} </div> </div> <!-- Cushion --> <div class="form-block" data-astro-cid-3fiu7xu2> <h2 class="form-block-title" data-astro-cid-3fiu7xu2>Cushion</h2> <div class="cushion-sub-options" data-astro-cid-3fiu7xu2> <div class="cushion-sub-row" data-astro-cid-3fiu7xu2> <span class="cushion-sub-label" data-astro-cid-3fiu7xu2>Cushion color</span> <div class="chip-group color-swatch-group" role="group" aria-label="Cushion color" data-astro-cid-3fiu7xu2> ${cushionColorOptions.map((c) => renderTemplate`<label class="chip chip-color" data-astro-cid-3fiu7xu2> <input type="checkbox" name="cushion_color"${addAttribute(c.value, "value")} class="chip-input option-checkbox" data-group="cushion_color" data-astro-cid-3fiu7xu2> <span class="color-swatch"${addAttribute(`background-color: ${c.hex}`, "style")} aria-hidden="true" data-astro-cid-3fiu7xu2></span> <span class="chip-label" data-astro-cid-3fiu7xu2>${c.label}</span> </label>`)} </div> </div> <div class="cushion-sub-row" data-astro-cid-3fiu7xu2> <span class="cushion-sub-label" data-astro-cid-3fiu7xu2>Cushion size</span> <div class="chip-group" role="group" aria-label="Cushion size" data-astro-cid-3fiu7xu2> ${cushionSizeOptions.map((s) => renderTemplate`<label class="chip" data-astro-cid-3fiu7xu2> <input type="checkbox" name="cushion_size"${addAttribute(s.value, "value")} class="chip-input option-checkbox" data-group="cushion_size" data-astro-cid-3fiu7xu2> <span class="chip-label" data-astro-cid-3fiu7xu2>${s.label}</span> </label>`)} </div> </div> </div> </div> <!-- Height --> <div class="form-block" data-astro-cid-3fiu7xu2> <h2 class="form-block-title" data-astro-cid-3fiu7xu2>Height</h2> <div class="chip-group chip-group-height" role="group" aria-label="Height" data-astro-cid-3fiu7xu2> ${heightOptions.map((h) => renderTemplate`<label class="chip" data-astro-cid-3fiu7xu2> <input type="checkbox" name="height"${addAttribute(h.value, "value")} class="chip-input option-checkbox height-checkbox" data-group="height" data-astro-cid-3fiu7xu2> <span class="chip-label" data-astro-cid-3fiu7xu2>${h.label}</span> </label>`)} <div class="height-other-wrap" id="height-other-wrap" hidden data-astro-cid-3fiu7xu2> <input type="text" id="height_other" name="height_other" placeholder="Enter height (e.g. 72 inches)" class="height-other-input" aria-label="Height other" data-astro-cid-3fiu7xu2> </div> </div> </div> <!-- Depth --> <div class="form-block" data-astro-cid-3fiu7xu2> <h2 class="form-block-title" data-astro-cid-3fiu7xu2>Depth</h2> <div class="chip-group" role="group" aria-label="Depth" data-astro-cid-3fiu7xu2> ${depthOptions.map((d) => renderTemplate`<label class="chip" data-astro-cid-3fiu7xu2> <input type="checkbox" name="depth"${addAttribute(d.value, "value")} class="chip-input option-checkbox" data-group="depth" data-astro-cid-3fiu7xu2> <span class="chip-label" data-astro-cid-3fiu7xu2>${d.label}</span> </label>`)} </div> </div> <!-- Top type --> <div class="form-block" data-astro-cid-3fiu7xu2> <h2 class="form-block-title" data-astro-cid-3fiu7xu2>Top type</h2> <div class="chip-group chip-group-one-line" role="group" aria-label="Top type" data-astro-cid-3fiu7xu2> ${topTypes.map((t) => renderTemplate`<label class="chip" data-astro-cid-3fiu7xu2> <input type="checkbox" name="top_type"${addAttribute(t.value, "value")} class="chip-input option-checkbox" data-group="top_type" data-astro-cid-3fiu7xu2> <span class="chip-label" data-astro-cid-3fiu7xu2>${t.label}</span> </label>`)} </div> </div> <!-- Bottom type --> <div class="form-block" data-astro-cid-3fiu7xu2> <h2 class="form-block-title" data-astro-cid-3fiu7xu2>Bottom / vents</h2> <div class="chip-group" role="group" aria-label="Bottom vents" data-astro-cid-3fiu7xu2> ${bottomTypes.map((b) => renderTemplate`<label class="chip" data-astro-cid-3fiu7xu2> <input type="checkbox" name="bottom_type"${addAttribute(b.value, "value")} class="chip-input option-checkbox" data-group="bottom_type" data-astro-cid-3fiu7xu2> <span class="chip-label" data-astro-cid-3fiu7xu2>${b.label}</span> </label>`)} </div> </div> <!-- Order details --> <div class="form-block" data-astro-cid-3fiu7xu2> <h2 class="form-block-title" data-astro-cid-3fiu7xu2>Order details</h2> <div class="form-row" data-astro-cid-3fiu7xu2> <div class="form-group" data-astro-cid-3fiu7xu2> <label for="po" data-astro-cid-3fiu7xu2>Order / PO number</label> <input type="text" id="po" name="po" placeholder="e.g. PO-2026-001" data-astro-cid-3fiu7xu2> </div> <div class="form-group" data-astro-cid-3fiu7xu2> <label for="quantity" data-astro-cid-3fiu7xu2>Quantity</label> <input type="number" id="quantity" name="quantity" min="1" placeholder="Number of units" data-astro-cid-3fiu7xu2> </div> </div> <div class="form-row" data-astro-cid-3fiu7xu2> <div class="form-group" data-astro-cid-3fiu7xu2> <label for="dimensions" data-astro-cid-3fiu7xu2>Dimensions / size</label> <input type="text" id="dimensions" name="dimensions" placeholder="e.g. 24\" W × 76\" H × 19\" D" data-astro-cid-3fiu7xu2> </div> <div class="form-group" data-astro-cid-3fiu7xu2> <label for="finish" data-astro-cid-3fiu7xu2>Finish / color</label> <input type="text" id="finish" name="finish" placeholder="e.g. Black, Maple" data-astro-cid-3fiu7xu2> </div> </div> <div class="form-row" data-astro-cid-3fiu7xu2> <div class="form-group" data-astro-cid-3fiu7xu2> <label for="delivery" data-astro-cid-3fiu7xu2>Requested delivery date</label> <input type="text" id="delivery" name="delivery" placeholder="e.g. 2026-04-15 or Q2 2026" data-astro-cid-3fiu7xu2> </div> </div> <div class="form-group" data-astro-cid-3fiu7xu2> <label for="notes" data-astro-cid-3fiu7xu2>Notes / special instructions</label> <textarea id="notes" name="notes" rows="4" placeholder="Any special requirements for the factory" data-astro-cid-3fiu7xu2></textarea> </div> </div> <div class="form-actions" data-astro-cid-3fiu7xu2> <p class="pdf-hint" data-astro-cid-3fiu7xu2>Use your browser's <strong data-astro-cid-3fiu7xu2>Print</strong> → <strong data-astro-cid-3fiu7xu2>Save as PDF</strong> to download this order form and send to the factory.</p> <button type="button" class="btn-print" onclick="window.print()" data-astro-cid-3fiu7xu2>Print / Save as PDF</button> </div> </form> </div> </section> ` })} ${renderScript($$result, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/manufacturer-order.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/manufacturer-order.astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/manufacturer-order.astro";
const $$url = "/manufacturer-order";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$ManufacturerOrder,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
