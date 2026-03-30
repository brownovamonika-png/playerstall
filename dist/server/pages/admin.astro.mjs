import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_CKCou5FD.mjs';
import { g as getSession } from '../chunks/auth_CwLs9eZH.mjs';
import { s as supabaseAdmin, i as isSupabaseConfigured, S as STAGE_LABELS, a as STAGE_COLORS } from '../chunks/supabase_y1UyI7GV.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

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
  let totalClients = 0;
  let totalOrders = 0;
  let activeOrders = 0;
  let newLeadsThisWeek = 0;
  let unreadMessages = 0;
  let recentOrders = [];
  let stageDistribution = {};
  let recentActivity = [];
  if (demoMode) {
    totalClients = 64;
    totalOrders = 75;
    activeOrders = 75;
    newLeadsThisWeek = 2;
    unreadMessages = 0;
    stageDistribution = { new_lead: 0, consultation: 0, quote_sent: 12, quote_approved: 0, design_phase: 0, in_production: 0, shipped: 0, installed: 0, quality_check: 0, complete: 0 };
    recentOrders = [
      { id: "o12", title: 'Stadium 24" \xD7 60 \u2014 Shawn Blechinger', clients: { contact_name: "Shawn Blechinger" }, stage: "quote_sent", updated_at: "2026-03-16T00:00:00.000Z" },
      { id: "o13", title: 'Stadium 24"/28"/32" \xD7 91 \u2014 Jeff Bloomer', clients: { contact_name: "Jeff Bloomer" }, stage: "quote_sent", updated_at: "2026-03-11T00:00:00.000Z" },
      { id: "o14", title: 'Stadium 24"/30" \xD7 58 \u2014 John Loftis', clients: { contact_name: "John Loftis" }, stage: "quote_sent", updated_at: "2026-03-06T00:00:00.000Z" },
      { id: "o15", title: 'Semi Pro 24" \xD7 30 \u2014 Chris Hudson', clients: { contact_name: "Chris Hudson" }, stage: "quote_sent", updated_at: "2026-03-03T00:00:00.000Z" },
      { id: "o16", title: 'Varsity 24" \xD7 25 \u2014 Libby Messer', clients: { contact_name: "Libby Messer" }, stage: "quote_sent", updated_at: "2026-03-03T00:00:00.000Z" },
      { id: "o17", title: 'Stadium 24" \xD7 130 \u2014 MD Daniels', clients: { contact_name: "MD Daniels" }, stage: "quote_sent", updated_at: "2026-02-11T00:00:00.000Z" },
      { id: "o18", title: 'Stadium 24"/30" \xD7 64 \u2014 Alexander Johnson', clients: { contact_name: "Alexander Johnson" }, stage: "quote_sent", updated_at: "2026-01-20T00:00:00.000Z" },
      { id: "o19", title: 'Stadium 20" \xD7 55 \u2014 Christian Hall', clients: { contact_name: "Christian Hall" }, stage: "quote_sent", updated_at: "2026-01-13T00:00:00.000Z" },
      { id: "o20", title: 'Stadium 24" \xD7 50 \u2014 Dana Tarver', clients: { contact_name: "Dana Tarver" }, stage: "quote_sent", updated_at: "2026-01-09T00:00:00.000Z" }
    ];
    recentActivity = [
      { to_stage: "quote_sent", from_stage: "new_lead", orders: { title: "Est #1296 \u2014 Stadium \xD7 60" }, changed_by: "admin", notes: "Quote sent to Shawn Blechinger \u2014 St. Mary High School", created_at: "2026-03-16T00:00:00.000Z" },
      { to_stage: "quote_sent", from_stage: "new_lead", orders: { title: "Est #1295 \u2014 Stadium \xD7 91" }, changed_by: "admin", notes: "Quote sent to Jeff Bloomer \u2014 Signal Peak Energy Arena", created_at: "2026-03-11T00:00:00.000Z" },
      { to_stage: "quote_sent", from_stage: "new_lead", orders: { title: "Est #1294 \u2014 Stadium \xD7 58" }, changed_by: "admin", notes: "Quote sent to John Loftis \u2014 Hockey lockers with stick racks", created_at: "2026-03-06T00:00:00.000Z" },
      { to_stage: "quote_sent", from_stage: "new_lead", orders: { title: "Est #1293 \u2014 Semi Pro \xD7 30" }, changed_by: "admin", notes: "Quote sent to Chris Hudson \u2014 Texarkana, AR", created_at: "2026-03-03T00:00:00.000Z" },
      { to_stage: "quote_sent", from_stage: "new_lead", orders: { title: "Est #1287 \u2014 Stadium \xD7 130" }, changed_by: "admin", notes: "Quote sent to MD Daniels \u2014 Largest order, 130 lockers", created_at: "2026-02-11T00:00:00.000Z" }
    ];
  } else {
    const [
      { count: tc },
      { count: to },
      { data: ro },
      { data: sc },
      { count: um }
    ] = await Promise.all([
      supabaseAdmin.from("clients").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("orders").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("orders").select("*, clients(contact_name, company_name)").order("updated_at", { ascending: false }).limit(10),
      supabaseAdmin.from("orders").select("stage"),
      supabaseAdmin.from("messages").select("*", { count: "exact", head: true }).eq("sender", "client").eq("read", false)
    ]);
    totalClients = tc || 0;
    totalOrders = to || 0;
    unreadMessages = um || 0;
    recentOrders = ro || [];
    if (sc) {
      for (const row of sc) {
        stageDistribution[row.stage] = (stageDistribution[row.stage] || 0) + 1;
      }
    }
    activeOrders = totalOrders - (stageDistribution["complete"] || 0);
    const weekAgo = /* @__PURE__ */ new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const { count: nlw } = await supabaseAdmin.from("orders").select("*", { count: "exact", head: true }).eq("stage", "new_lead").gte("created_at", weekAgo.toISOString());
    newLeadsThisWeek = nlw || 0;
    const { data: ra } = await supabaseAdmin.from("stage_history").select("*, orders(title, clients(contact_name))").order("created_at", { ascending: false }).limit(8);
    recentActivity = ra || [];
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard", "activeNav": "dashboard", "data-astro-cid-u2h3djql": true }, { "default": async ($$result2) => renderTemplate`${demoMode && renderTemplate`${maybeRenderHead()}<div class="demo-banner" data-astro-cid-u2h3djql> <strong data-astro-cid-u2h3djql>Demo Mode</strong> — You're viewing sample data. To connect to your real database, set up Supabase and add your API keys to <code data-astro-cid-u2h3djql>.env</code>. See <a href="/guides/CRM_SETUP.md" data-astro-cid-u2h3djql>Setup Guide</a>.
</div>`}<div class="stats-grid" data-astro-cid-u2h3djql> <div class="stat-card" data-astro-cid-u2h3djql> <div class="stat-label" data-astro-cid-u2h3djql>Total Clients</div> <div class="stat-value" data-astro-cid-u2h3djql>${totalClients || 0}</div> </div> <div class="stat-card" data-astro-cid-u2h3djql> <div class="stat-label" data-astro-cid-u2h3djql>Active Orders</div> <div class="stat-value" data-astro-cid-u2h3djql>${activeOrders}</div> </div> <div class="stat-card" data-astro-cid-u2h3djql> <div class="stat-label" data-astro-cid-u2h3djql>New Leads This Week</div> <div class="stat-value" data-astro-cid-u2h3djql>${newLeadsThisWeek || 0}</div> </div> <div class="stat-card" data-astro-cid-u2h3djql> <div class="stat-label" data-astro-cid-u2h3djql>Unread Messages</div> <div class="stat-value" data-astro-cid-u2h3djql>${unreadMessages || 0}</div> </div> </div> <div class="dashboard-grid" data-astro-cid-u2h3djql> <div class="card" data-astro-cid-u2h3djql> <div class="card-header" data-astro-cid-u2h3djql> <h2 data-astro-cid-u2h3djql>Pipeline Overview</h2> <a href="/admin/pipeline" class="btn btn-sm btn-secondary" data-astro-cid-u2h3djql>View Board</a> </div> <div class="pipeline-bars" data-astro-cid-u2h3djql> ${Object.entries(STAGE_LABELS).map(([stage, label]) => {
    const count = stageDistribution[stage] || 0;
    const maxCount = Math.max(...Object.values(stageDistribution), 1);
    const width = Math.max(count / maxCount * 100, count > 0 ? 8 : 0);
    return renderTemplate`<div class="pipeline-row" data-astro-cid-u2h3djql> <span class="pipeline-label" data-astro-cid-u2h3djql>${label}</span> <div class="pipeline-bar-track" data-astro-cid-u2h3djql> <div class="pipeline-bar-fill"${addAttribute(`width: ${width}%; background: ${STAGE_COLORS[stage]}`, "style")} data-astro-cid-u2h3djql></div> </div> <span class="pipeline-count" data-astro-cid-u2h3djql>${count}</span> </div>`;
  })} </div> </div> <div class="card" data-astro-cid-u2h3djql> <div class="card-header" data-astro-cid-u2h3djql> <h2 data-astro-cid-u2h3djql>Recent Orders</h2> <a href="/admin/clients" class="btn btn-sm btn-secondary" data-astro-cid-u2h3djql>View All</a> </div> ${recentOrders && recentOrders.length > 0 ? renderTemplate`<div class="table-wrap" data-astro-cid-u2h3djql> <table class="data-table" data-astro-cid-u2h3djql> <thead data-astro-cid-u2h3djql> <tr data-astro-cid-u2h3djql> <th data-astro-cid-u2h3djql>Order</th> <th data-astro-cid-u2h3djql>Client</th> <th data-astro-cid-u2h3djql>Stage</th> <th data-astro-cid-u2h3djql>Updated</th> </tr> </thead> <tbody data-astro-cid-u2h3djql> ${recentOrders.map((order) => renderTemplate`<tr data-astro-cid-u2h3djql> <td data-astro-cid-u2h3djql><a${addAttribute(`/admin/orders/${order.id}`, "href")} data-astro-cid-u2h3djql>${order.title}</a></td> <td data-astro-cid-u2h3djql>${order.clients?.contact_name || "\u2014"}</td> <td data-astro-cid-u2h3djql> <span class="badge"${addAttribute(`background: ${STAGE_COLORS[order.stage]}20; color: ${STAGE_COLORS[order.stage]}`, "style")} data-astro-cid-u2h3djql> ${STAGE_LABELS[order.stage]} </span> </td> <td data-astro-cid-u2h3djql>${new Date(order.updated_at).toLocaleDateString()}</td> </tr>`)} </tbody> </table> </div>` : renderTemplate`<div class="empty-state" data-astro-cid-u2h3djql> <h3 data-astro-cid-u2h3djql>No orders yet</h3> <p data-astro-cid-u2h3djql>Create your first client and order to get started.</p> <a href="/admin/clients" class="btn btn-primary" data-astro-cid-u2h3djql>Add Client</a> </div>`} </div> <div class="card" data-astro-cid-u2h3djql> <div class="card-header" data-astro-cid-u2h3djql> <h2 data-astro-cid-u2h3djql>Recent Activity</h2> </div> ${recentActivity && recentActivity.length > 0 ? renderTemplate`<div class="activity-list" data-astro-cid-u2h3djql> ${recentActivity.map((entry) => renderTemplate`<div class="activity-item" data-astro-cid-u2h3djql> <div class="activity-dot"${addAttribute(`background: ${STAGE_COLORS[entry.to_stage]}`, "style")} data-astro-cid-u2h3djql></div> <div class="activity-content" data-astro-cid-u2h3djql> <span class="activity-text" data-astro-cid-u2h3djql> <strong data-astro-cid-u2h3djql>${entry.orders?.title || "Order"}</strong> moved to${" "} <span${addAttribute(`color: ${STAGE_COLORS[entry.to_stage]}`, "style")} data-astro-cid-u2h3djql> ${STAGE_LABELS[entry.to_stage]} </span> </span> ${entry.notes && renderTemplate`<p class="activity-note" data-astro-cid-u2h3djql>${entry.notes}</p>`} <span class="activity-time" data-astro-cid-u2h3djql>${new Date(entry.created_at).toLocaleString()}</span> </div> </div>`)} </div>` : renderTemplate`<div class="empty-state" data-astro-cid-u2h3djql> <p data-astro-cid-u2h3djql>No activity yet. Stage changes will appear here.</p> </div>`} </div> </div> ` })} `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/admin/index.astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
