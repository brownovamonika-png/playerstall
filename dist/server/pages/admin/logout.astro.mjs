import { b as createAstro, c as createComponent } from '../../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import 'clsx';
import { i as isSupabaseConfigured } from '../../chunks/supabase_y1UyI7GV.mjs';
import { c as clearSessionCookies } from '../../chunks/auth_CwLs9eZH.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://playerstall.com");
const prerender = false;
const $$Logout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Logout;
  if (isSupabaseConfigured) {
    clearSessionCookies(Astro2.cookies);
  }
  return Astro2.redirect("/admin/login");
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/admin/logout.astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/admin/logout.astro";
const $$url = "/admin/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Logout,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
