import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_D5duTZpL.mjs';
import { manifest } from './manifest_BV2_NOcI.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/accessories.astro.mjs');
const _page2 = () => import('./pages/admin/client-copy.astro.mjs');
const _page3 = () => import('./pages/admin/clients/_id_.astro.mjs');
const _page4 = () => import('./pages/admin/clients.astro.mjs');
const _page5 = () => import('./pages/admin/emails.astro.mjs');
const _page6 = () => import('./pages/admin/login.astro.mjs');
const _page7 = () => import('./pages/admin/logout.astro.mjs');
const _page8 = () => import('./pages/admin/orders/_id_.astro.mjs');
const _page9 = () => import('./pages/admin/pipeline.astro.mjs');
const _page10 = () => import('./pages/admin.astro.mjs');
const _page11 = () => import('./pages/blog/archives/_period_.astro.mjs');
const _page12 = () => import('./pages/blog/_slug_.astro.mjs');
const _page13 = () => import('./pages/blog.astro.mjs');
const _page14 = () => import('./pages/cart.astro.mjs');
const _page15 = () => import('./pages/categories/_category_.astro.mjs');
const _page16 = () => import('./pages/checkout.astro.mjs');
const _page17 = () => import('./pages/contact.astro.mjs');
const _page18 = () => import('./pages/contact-us.astro.mjs');
const _page19 = () => import('./pages/gallery.astro.mjs');
const _page20 = () => import('./pages/guides/professional-email-template.astro.mjs');
const _page21 = () => import('./pages/hockey.astro.mjs');
const _page22 = () => import('./pages/homepage-archived.astro.mjs');
const _page23 = () => import('./pages/how-it-works.astro.mjs');
const _page24 = () => import('./pages/installation-guide.astro.mjs');
const _page25 = () => import('./pages/locations.astro.mjs');
const _page26 = () => import('./pages/locker-budget-planner.astro.mjs');
const _page27 = () => import('./pages/manufacturer-order.astro.mjs');
const _page28 = () => import('./pages/my-project/_token_.astro.mjs');
const _page29 = () => import('./pages/new-room-planner/design.astro.mjs');
const _page30 = () => import('./pages/new-room-planner/review.astro.mjs');
const _page31 = () => import('./pages/new-room-planner.astro.mjs');
const _page32 = () => import('./pages/our-process.astro.mjs');
const _page33 = () => import('./pages/our-process-1.astro.mjs');
const _page34 = () => import('./pages/pdf/elite-locker-spec.astro.mjs');
const _page35 = () => import('./pages/pdf/essential-locker-spec.astro.mjs');
const _page36 = () => import('./pages/pdf/installation-instructions.astro.mjs');
const _page37 = () => import('./pages/pdf/model-l-locker-spec.astro.mjs');
const _page38 = () => import('./pages/pdf/model-s-locker-spec.astro.mjs');
const _page39 = () => import('./pages/pdf/model-x-locker-spec.astro.mjs');
const _page40 = () => import('./pages/pdf/pro-locker-spec.astro.mjs');
const _page41 = () => import('./pages/pdf/stadium-locker-spec.astro.mjs');
const _page42 = () => import('./pages/product-elite-locker.astro.mjs');
const _page43 = () => import('./pages/product-legendary-locker.astro.mjs');
const _page44 = () => import('./pages/product-model-l.astro.mjs');
const _page45 = () => import('./pages/product-model-s.astro.mjs');
const _page46 = () => import('./pages/product-pro-locker.astro.mjs');
const _page47 = () => import('./pages/product-semi-pro-locker.astro.mjs');
const _page48 = () => import('./pages/product-stadium-locker.astro.mjs');
const _page49 = () => import('./pages/product-varsity-locker.astro.mjs');
const _page50 = () => import('./pages/product-wood-locker-bench.astro.mjs');
const _page51 = () => import('./pages/products.astro.mjs');
const _page52 = () => import('./pages/profile-picture.astro.mjs');
const _page53 = () => import('./pages/project-status.astro.mjs');
const _page54 = () => import('./pages/request-a-quote.astro.mjs');
const _page55 = () => import('./pages/room-planner.astro.mjs');
const _page56 = () => import('./pages/room-planner-v2/design.astro.mjs');
const _page57 = () => import('./pages/room-planner-v2.astro.mjs');
const _page58 = () => import('./pages/shipping-options/custom.astro.mjs');
const _page59 = () => import('./pages/shipping-options.astro.mjs');
const _page60 = () => import('./pages/shop.astro.mjs');
const _page61 = () => import('./pages/sitemap.xml.astro.mjs');
const _page62 = () => import('./pages/sport/_sport_.astro.mjs');
const _page63 = () => import('./pages/tags/_tag_.astro.mjs');
const _page64 = () => import('./pages/thank-you.astro.mjs');
const _page65 = () => import('./pages/timeline-demo.astro.mjs');
const _page66 = () => import('./pages/warranty.astro.mjs');
const _page67 = () => import('./pages/x-profile.astro.mjs');
const _page68 = () => import('./pages/_city_-_sport_-wood-lockers.astro.mjs');
const _page69 = () => import('./pages/_level_-_sport_-wood-lockers.astro.mjs');
const _page70 = () => import('./pages/_province_-_sport_-wood-lockers.astro.mjs');
const _page71 = () => import('./pages/_state_-_sport_-wood-lockers.astro.mjs');
const _page72 = () => import('./pages/wood-vs-metal-_sport_-lockers.astro.mjs');
const _page73 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/accessories.astro", _page1],
    ["src/pages/admin/client-copy/index.astro", _page2],
    ["src/pages/admin/clients/[id].astro", _page3],
    ["src/pages/admin/clients/index.astro", _page4],
    ["src/pages/admin/emails.astro", _page5],
    ["src/pages/admin/login.astro", _page6],
    ["src/pages/admin/logout.astro", _page7],
    ["src/pages/admin/orders/[id].astro", _page8],
    ["src/pages/admin/pipeline.astro", _page9],
    ["src/pages/admin/index.astro", _page10],
    ["src/pages/blog/archives/[period].astro", _page11],
    ["src/pages/blog/[slug].astro", _page12],
    ["src/pages/blog.astro", _page13],
    ["src/pages/cart.astro", _page14],
    ["src/pages/categories/[category].astro", _page15],
    ["src/pages/checkout.astro", _page16],
    ["src/pages/contact.astro", _page17],
    ["src/pages/contact-us.astro", _page18],
    ["src/pages/gallery.astro", _page19],
    ["src/pages/guides/professional-email-template.astro", _page20],
    ["src/pages/hockey.astro", _page21],
    ["src/pages/homepage-archived.astro", _page22],
    ["src/pages/how-it-works.astro", _page23],
    ["src/pages/installation-guide.astro", _page24],
    ["src/pages/locations.astro", _page25],
    ["src/pages/locker-budget-planner.astro", _page26],
    ["src/pages/manufacturer-order.astro", _page27],
    ["src/pages/my-project/[token].astro", _page28],
    ["src/pages/new-room-planner/design.astro", _page29],
    ["src/pages/new-room-planner/review.astro", _page30],
    ["src/pages/new-room-planner/index.astro", _page31],
    ["src/pages/our-process.astro", _page32],
    ["src/pages/our-process-1.astro", _page33],
    ["src/pages/pdf/elite-locker-spec.astro", _page34],
    ["src/pages/pdf/essential-locker-spec.astro", _page35],
    ["src/pages/pdf/installation-instructions.astro", _page36],
    ["src/pages/pdf/model-l-locker-spec.astro", _page37],
    ["src/pages/pdf/model-s-locker-spec.astro", _page38],
    ["src/pages/pdf/model-x-locker-spec.astro", _page39],
    ["src/pages/pdf/pro-locker-spec.astro", _page40],
    ["src/pages/pdf/stadium-locker-spec.astro", _page41],
    ["src/pages/product-elite-locker.astro", _page42],
    ["src/pages/product-legendary-locker.astro", _page43],
    ["src/pages/product-model-l.astro", _page44],
    ["src/pages/product-model-s.astro", _page45],
    ["src/pages/product-pro-locker.astro", _page46],
    ["src/pages/product-semi-pro-locker.astro", _page47],
    ["src/pages/product-stadium-locker.astro", _page48],
    ["src/pages/product-varsity-locker.astro", _page49],
    ["src/pages/product-wood-locker-bench.astro", _page50],
    ["src/pages/products.astro", _page51],
    ["src/pages/profile-picture.astro", _page52],
    ["src/pages/project-status.astro", _page53],
    ["src/pages/request-a-quote.astro", _page54],
    ["src/pages/room-planner.astro", _page55],
    ["src/pages/room-planner-v2/design.astro", _page56],
    ["src/pages/room-planner-v2/index.astro", _page57],
    ["src/pages/shipping-options/custom.astro", _page58],
    ["src/pages/shipping-options.astro", _page59],
    ["src/pages/shop.astro", _page60],
    ["src/pages/sitemap.xml.ts", _page61],
    ["src/pages/sport/[sport].astro", _page62],
    ["src/pages/tags/[tag].astro", _page63],
    ["src/pages/thank-you.astro", _page64],
    ["src/pages/timeline-demo.astro", _page65],
    ["src/pages/warranty.astro", _page66],
    ["src/pages/x-profile.astro", _page67],
    ["src/pages/[city]-[sport]-wood-lockers.astro", _page68],
    ["src/pages/[level]-[sport]-wood-lockers.astro", _page69],
    ["src/pages/[province]-[sport]-wood-lockers.astro", _page70],
    ["src/pages/[state]-[sport]-wood-lockers.astro", _page71],
    ["src/pages/wood-vs-metal-[sport]-lockers.astro", _page72],
    ["src/pages/index.astro", _page73]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "f9d58c78-d33d-42d5-a58b-ef02dc72eb3c",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
