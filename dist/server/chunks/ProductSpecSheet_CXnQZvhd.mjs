import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, a as renderTemplate } from './astro/server_BKRL6jPE.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                     */

const $$Astro = createAstro("https://playerstall.com");
const $$ProductSpecSheet = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductSpecSheet;
  const { productName, specs } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="product-spec-sheet" id="specs" data-astro-cid-3ffawsuv> <h3 class="product-spec-sheet-title" data-astro-cid-3ffawsuv>Specifications</h3> <table class="product-spec-table"${addAttribute(`${productName} specifications`, "aria-label")} data-astro-cid-3ffawsuv> <tbody data-astro-cid-3ffawsuv> ${specs.map((row) => renderTemplate`<tr data-astro-cid-3ffawsuv> <th scope="row" class="product-spec-label" data-astro-cid-3ffawsuv>${row.label}</th> <td class="product-spec-value" data-astro-cid-3ffawsuv>${row.value}</td> </tr>`)} </tbody> </table> </div> `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/components/ProductSpecSheet.astro", void 0);

export { $$ProductSpecSheet as $ };
