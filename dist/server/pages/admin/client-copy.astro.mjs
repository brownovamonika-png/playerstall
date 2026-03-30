import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, d as addAttribute, m as maybeRenderHead } from '../../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CKCou5FD.mjs';
import { g as getSession } from '../../chunks/auth_CwLs9eZH.mjs';
import { i as isSupabaseConfigured } from '../../chunks/supabase_y1UyI7GV.mjs';
import fs from 'node:fs';
import nodePath from 'node:path';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

function parseCsv(text) {
  const rows = [];
  let i = 0;
  const s = text.replace(/^\uFEFF/, "");
  const len = s.length;
  while (i < len) {
    const row = [];
    while (i < len) {
      let cell = "";
      if (s[i] === '"') {
        i++;
        while (i < len) {
          if (s[i] === '"') {
            if (s[i + 1] === '"') {
              cell += '"';
              i += 2;
              continue;
            }
            i++;
            break;
          }
          cell += s[i++];
        }
      } else {
        while (i < len && s[i] !== "," && s[i] !== "\n" && s[i] !== "\r") {
          cell += s[i++];
        }
      }
      row.push(cell);
      if (s[i] === ",") {
        i++;
        continue;
      }
      if (s[i] === "\r") i++;
      if (s[i] === "\n") {
        i++;
        break;
      }
      break;
    }
    rows.push(row);
  }
  while (rows.length && rows[rows.length - 1].every((c) => !String(c).trim())) {
    rows.pop();
  }
  if (rows.length === 0) return { headers: [], rows: [] };
  const headers = rows[0].map((h) => String(h).trim());
  const dataRows = rows.slice(1).filter((r) => r.some((c) => String(c).trim()));
  return { headers, rows: dataRows };
}
function isLikelyHtmlLoginResponse(text) {
  const t = text.trimStart().slice(0, 200).toLowerCase();
  return t.startsWith("<!doctype") || t.startsWith("<html") || text.includes("Sign in") || text.includes("accounts.google.com");
}

const $$Astro = createAstro("https://playerstall.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const demoMode = !isSupabaseConfigured;
  if (!demoMode) {
    const session = await getSession(Astro2.cookies);
    if (!session) return Astro2.redirect("/admin/login");
  }
  const GOOGLE_SHEET_CSV = "https://docs.google.com/spreadsheets/d/1JfSrwC3UPs4rPfxKkd4kTlavKyiY7wfValE2y3gcNyU/export?format=csv&gid=0";
  const SHEET_EDIT_URL = "https://docs.google.com/spreadsheets/d/1JfSrwC3UPs4rPfxKkd4kTlavKyiY7wfValE2y3gcNyU/edit?gid=0";
  let csvText = "";
  let loadSource = "";
  let loadWarning = "";
  const tryUrls = [GOOGLE_SHEET_CSV];
  for (const url of tryUrls) {
    try {
      const res = await fetch(url, { redirect: "follow", headers: { Accept: "text/csv,text/plain,*/*" } });
      const text = await res.text();
      if (!res.ok) continue;
      if (isLikelyHtmlLoginResponse(text)) continue;
      if (text.trim().length < 5) continue;
      csvText = text;
      loadSource = url.includes("1JfSrwC3UPs4rPfxKkd4kTlavKyiY7wfValE2y3gcNyU") ? "Google Sheet (linked)" : "CLIENT_COPY_CSV_URL";
      break;
    } catch {
      continue;
    }
  }
  if (!csvText) {
    const localPath = nodePath.join(process.cwd(), "src/data/client-copy.csv");
    if (fs.existsSync(localPath)) {
      csvText = fs.readFileSync(localPath, "utf-8");
      loadSource = "Local file (src/data/client-copy.csv)";
      loadWarning = "Using local CSV fallback. Share your Google Sheet as “Anyone with the link can view” so the live sheet loads, or set CLIENT_COPY_CSV_URL to a published CSV link.";
    }
  }
  if (!csvText) {
    loadWarning = "No data loaded. Share the Google Sheet with “Anyone with the link” as Viewer (or publish to web), or add src/data/client-copy.csv, or set CLIENT_COPY_CSV_URL in .env.";
  }
  const { headers, rows: rawRows } = csvText ? parseCsv(csvText) : { headers: [], rows: [] };
  const colCount = Math.max(headers.length, ...rawRows.map((r) => r.length), 0);
  const padRow = (r) => {
    const out = [...r];
    while (out.length < colCount) out.push("");
    return out.slice(0, colCount);
  };
  const rows = rawRows.map(padRow);
  const searchRaw = (Astro2.url.searchParams.get("q") || "").trim();
  const searchLower = searchRaw.toLowerCase();
  const filteredRows = searchLower ? rows.filter((r) => r.some((c) => String(c).toLowerCase().includes(searchLower))) : rows;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Client copy", "activeNav": "client-copy", "data-astro-cid-atwhydv6": true }, { "default": async ($$result2) => renderTemplate`  ${(loadWarning || loadSource) && renderTemplate`${maybeRenderHead()}<div${addAttribute(["sheet-banner", { warn: !!loadWarning }], "class:list")} data-astro-cid-atwhydv6> ${loadSource && renderTemplate`<p data-astro-cid-atwhydv6> <strong data-astro-cid-atwhydv6>Data source:</strong> ${loadSource} ${filteredRows.length > 0 && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-atwhydv6": true }, { "default": async ($$result3) => renderTemplate`${" "}
· <strong data-astro-cid-atwhydv6>${filteredRows.length}</strong> row${filteredRows.length === 1 ? "" : "s"}${searchRaw && ` (filtered)`}` })}`} </p>`} ${loadWarning && renderTemplate`<p class="banner-detail" data-astro-cid-atwhydv6>${loadWarning}</p>`} </div>`}<div class="clients-toolbar" data-astro-cid-atwhydv6> <form method="GET" class="search-form" data-astro-cid-atwhydv6> <input type="text" name="q"${addAttribute(searchRaw, "value")} placeholder="Search…" class="search-input" data-astro-cid-atwhydv6> <button type="submit" class="btn btn-secondary btn-sm" data-astro-cid-atwhydv6>Search</button> </form> <span class="client-count" data-astro-cid-atwhydv6>${headers.length} columns</span> </div> ${headers.length > 0 ? renderTemplate`<div class="card" data-astro-cid-atwhydv6> <div class="table-wrap" data-astro-cid-atwhydv6> <table class="data-table sheet-table" data-astro-cid-atwhydv6> <thead data-astro-cid-atwhydv6> <tr data-astro-cid-atwhydv6> ${headers.map((h) => renderTemplate`<th data-astro-cid-atwhydv6>${h || "—"}</th>`)} </tr> </thead> <tbody data-astro-cid-atwhydv6> ${filteredRows.map((row, ri) => renderTemplate`<tr data-astro-cid-atwhydv6> ${padRow(row).map((cell, ci) => renderTemplate`<td${addAttribute([{ "num-cell": ci === 0 }], "class:list")} data-astro-cid-atwhydv6>${cell || "—"}</td>`)} </tr>`)} </tbody> </table> </div> </div>` : renderTemplate`<div class="card empty-sheet" data-astro-cid-atwhydv6> <h3 data-astro-cid-atwhydv6>No rows to show</h3> <p data-astro-cid-atwhydv6>Fix sharing on the Google Sheet or add data to <code data-astro-cid-atwhydv6>src/data/client-copy.csv</code>.</p> <a${addAttribute(SHEET_EDIT_URL, "href")} class="btn btn-primary" target="_blank" rel="noopener noreferrer" data-astro-cid-atwhydv6>
Open Google Sheet
</a> </div>`}`, "header-actions": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "header-actions" }, { "default": async ($$result3) => renderTemplate` <a${addAttribute(SHEET_EDIT_URL, "href")} class="btn btn-secondary" target="_blank" rel="noopener noreferrer" data-astro-cid-atwhydv6>
Open Google Sheet
</a> ` })}` })} `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/admin/client-copy/index.astro", void 0);
const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/admin/client-copy/index.astro";
const $$url = "/admin/client-copy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
