import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DCfoLHMi.mjs';
/* empty css                                                        */
export { renderers } from '../../renderers.mjs';

const $$InstallationInstructions = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Shipping and Assembly Instruction PDF | PlayerStall", "description": "PlayerStall locker shipping and assembly instructions: flat-pack packaging, IKEA-style assembly, 25\u201330 min per locker. Print or save as PDF." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="pdf-installation-page"> <div class="pdf-installation-page-inner"> <div class="spotlight-inner-centered"> <a href="/shop" class="spotlight-position">Shop</a> <h1 class="spotlight-name">Shipping and Assembly Instructions</h1> <div class="spotlight-meta">
Flat-pack packaging · IKEA-style assembly · 25–30 min per locker
</div> <p class="spotlight-bio">
Our lockers are shipped <strong>individually packed</strong> in most cases—each unit arrives in its own sturdy, flat-pack box, similar to premium flat-pack furniture. This keeps every locker protected in transit and makes handling and assembly straightforward.
</p> <p class="spotlight-bio">
Each box contains all panels, hardware, and a <strong>full set of step-by-step instructions</strong> in an easy-to-follow, IKEA-style format. Plan for <strong>approximately 25–30 minutes</strong> to assemble each locker once the box is opened. No special tools are required beyond what we include or you typically have on hand.
</p> <h2 class="section-title">Typical box dimensions</h2> <p class="spotlight-bio">
Exact package size depends on the locker model and configuration. Below are two representative examples of how our lockers ship flat-packed.
</p> <div class="installation-boxes"> <div class="installation-box-card"> <figure class="installation-figure"> <img src="/images/locker-packaging-flatpack-1.png" alt="Flat-packed locker packaging – stacked panels, dimensions 75.59&quot; × 23.62&quot; × 4.25&quot;" loading="lazy"> </figure> <p class="installation-box-caption">Representative flat-pack (smaller footprint)</p> <ul class="installation-dims"> <li><strong>Length:</strong> 75.59&quot;</li> <li><strong>Width:</strong> 23.62&quot;</li> <li><strong>Height:</strong> 4.25&quot;</li> </ul> </div> <div class="installation-box-card"> <figure class="installation-figure"> <img src="/images/locker-packaging-flatpack-2.png" alt="Flat-packed locker in shipping box – dimensions 81.87&quot; × 27.62&quot; × 6.98&quot;" loading="lazy"> </figure> <p class="installation-box-caption">Representative flat-pack (larger footprint)</p> <ul class="installation-dims"> <li><strong>Length:</strong> 81.87&quot;</li> <li><strong>Width:</strong> 27.62&quot;</li> <li><strong>Height:</strong> 6.98&quot;</li> </ul> </div> </div> <h5 class="spotlight-bio-title">Included with each locker</h5> <p class="spotlight-bio">
Flat-packed components in one box, full IKEA-style assembly instructions, and hardware. Assembly time: about 25–30 minutes per locker.
</p> </div> <div class="pdf-installation-footer"> <strong>PLAYERSTALL</strong> · sales@playerstall.com · 1 888 584 1444<br>
© 2026 PlayerStall. All rights reserved.
</div> </div> <section class="product-main-section pdf-cta-section"> <div class="product-container"> <p class="pdf-cta"> <span class="pdf-hint">Use your browser's <strong>Print</strong> → <strong>Save as PDF</strong> to download this as Shipping and Assembly Instruction PDF.</span> </p> </div> </section> </main> ` })} `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/pdf/installation-instructions.astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/pdf/installation-instructions.astro";
const $$url = "/pdf/installation-instructions";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$InstallationInstructions,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
