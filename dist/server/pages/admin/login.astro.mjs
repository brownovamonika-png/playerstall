import { b as createAstro, c as createComponent, e as renderHead, a as renderTemplate } from '../../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import 'clsx';
import { b as supabase, i as isSupabaseConfigured } from '../../chunks/supabase_y1UyI7GV.mjs';
import { g as getSession, s as setSessionCookies } from '../../chunks/auth_CwLs9eZH.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://playerstall.com");
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const demoMode = !isSupabaseConfigured;
  if (!demoMode) {
    const session = await getSession(Astro2.cookies);
    if (session) {
      return Astro2.redirect("/admin");
    }
  }
  let error = "";
  if (Astro2.request.method === "POST") {
    if (demoMode) {
      return Astro2.redirect("/admin");
    }
    const formData = await Astro2.request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (authError || !data.session) {
      error = authError?.message || "Invalid credentials";
    } else {
      setSessionCookies(Astro2.cookies, data.session.access_token, data.session.refresh_token);
      return Astro2.redirect("/admin");
    }
  }
  return renderTemplate`<html lang="en" data-astro-cid-rf56lckb> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="robots" content="noindex, nofollow"><title>Login | PlayerStall CRM</title><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link href="https://fonts.googleapis.com/css?family=Yantramanav:400,500,700|Oswald:600,700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-rf56lckb> <div class="login-page" data-astro-cid-rf56lckb> <div class="login-card" data-astro-cid-rf56lckb> <div class="login-brand" data-astro-cid-rf56lckb> <span class="brand-name" data-astro-cid-rf56lckb>PLAYERSTALL</span> <span class="brand-label" data-astro-cid-rf56lckb>CRM</span> </div> <p class="login-subtitle" data-astro-cid-rf56lckb>Sign in to manage your clients and orders</p> ${demoMode && renderTemplate`<div class="demo-banner" data-astro-cid-rf56lckb> <strong data-astro-cid-rf56lckb>Demo Mode</strong> — Supabase not connected yet. Click "Enter Demo" to preview the CRM with sample data.
</div>`} ${error && renderTemplate`<div class="error-msg" data-astro-cid-rf56lckb>${error}</div>`} ${demoMode ? renderTemplate`<form method="POST" data-astro-cid-rf56lckb> <button type="submit" class="login-btn demo-btn" data-astro-cid-rf56lckb>Enter Demo</button> </form>` : renderTemplate`<form method="POST" data-astro-cid-rf56lckb> <div class="field" data-astro-cid-rf56lckb> <label for="email" data-astro-cid-rf56lckb>Email</label> <input type="email" id="email" name="email" required autocomplete="email" placeholder="you@playerstall.com" data-astro-cid-rf56lckb> </div> <div class="field" data-astro-cid-rf56lckb> <label for="password" data-astro-cid-rf56lckb>Password</label> <input type="password" id="password" name="password" required autocomplete="current-password" placeholder="Your password" data-astro-cid-rf56lckb> </div> <button type="submit" class="login-btn" data-astro-cid-rf56lckb>Sign In</button> </form>`} <p class="login-footer" data-astro-cid-rf56lckb> <a href="/" data-astro-cid-rf56lckb>Back to PlayerStall.com</a> </p> </div> </div> </body></html>`;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/admin/login.astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Login,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
