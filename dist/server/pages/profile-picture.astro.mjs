import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DCfoLHMi.mjs';
/* empty css                                           */
export { renderers } from '../renderers.mjs';

const $$ProfilePicture = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Model S Locker Profile Picture | PlayerStall", "description": "Download the Model S locker image resized for use as a profile picture (400\xD7400).", "data-astro-cid-kl4jgdsx": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="profile-picture-page" data-astro-cid-kl4jgdsx> <div class="profile-picture-card" data-astro-cid-kl4jgdsx> <h1 data-astro-cid-kl4jgdsx>Model S Locker — Profile Picture</h1> <p class="subtitle" data-astro-cid-kl4jgdsx>400×400 px, ready for X, Instagram, or any profile.</p> <div class="preview-wrap" data-astro-cid-kl4jgdsx> <img src="/images/model-s-locker-profile.png" alt="Model S locker profile picture" width="400" height="400" class="preview-img" data-astro-cid-kl4jgdsx> </div> <a href="/images/model-s-locker-profile.png" download="playerstall-model-s-locker-profile.png" class="download-btn" data-astro-cid-kl4jgdsx>
Download profile picture
</a> <p class="hint" data-astro-cid-kl4jgdsx>Right-click the image and choose “Save image as…” if the button doesn’t start a download.</p> </div> </section>  ` })}`;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/profile-picture.astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/profile-picture.astro";
const $$url = "/profile-picture";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$ProfilePicture,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
