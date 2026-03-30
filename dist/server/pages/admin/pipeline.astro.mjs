import { b as createAstro, c as createComponent, a as renderTemplate, f as defineScriptVars, r as renderComponent, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CKCou5FD.mjs';
import { g as getSession } from '../../chunks/auth_CwLs9eZH.mjs';
import { s as supabaseAdmin, c as STAGE_ORDER, i as isSupabaseConfigured, S as STAGE_LABELS, a as STAGE_COLORS } from '../../chunks/supabase_y1UyI7GV.mjs';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://playerstall.com");
const prerender = false;
const $$Pipeline = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pipeline;
  const demoMode = !isSupabaseConfigured;
  if (!demoMode) {
    const session = await getSession(Astro2.cookies);
    if (!session) return Astro2.redirect("/admin/login");
    if (Astro2.request.method === "POST") {
      const form = await Astro2.request.formData();
      const orderId = form.get("order_id");
      const newStage = form.get("new_stage");
      if (orderId && newStage) {
        const { data: currentOrder } = await supabaseAdmin.from("orders").select("stage").eq("id", orderId).single();
        if (currentOrder && currentOrder.stage !== newStage) {
          await supabaseAdmin.from("orders").update({ stage: newStage }).eq("id", orderId);
          await supabaseAdmin.from("stage_history").insert({
            order_id: orderId,
            from_stage: currentOrder.stage,
            to_stage: newStage,
            changed_by: "admin"
          });
        }
      }
    }
  }
  const ordersByStage = {};
  for (const stage of STAGE_ORDER) {
    ordersByStage[stage] = [];
  }
  if (demoMode) {
    const demoOrders = [
      { id: "d1", title: "Football Lockers \u2014 60 units", stage: "new_lead", clients: { contact_name: "Mike Johnson", sport: "Football" }, quoted_amount: 35e3, assigned_to: null, updated_at: (/* @__PURE__ */ new Date()).toISOString() },
      { id: "d2", title: "Basketball Lockers \u2014 20 units", stage: "new_lead", clients: { contact_name: "David Chen", sport: "Basketball" }, quoted_amount: null, assigned_to: null, updated_at: new Date(Date.now() - 864e5).toISOString() },
      { id: "d3", title: "Lacrosse Lockers \u2014 25 units", stage: "new_lead", clients: { contact_name: "James Brown", sport: "Lacrosse" }, quoted_amount: null, assigned_to: null, updated_at: new Date(Date.now() - 1728e5).toISOString() },
      { id: "d4", title: "Custom Lockers \u2014 Conference Room", stage: "consultation", clients: { contact_name: "Lisa Park", sport: "Other" }, quoted_amount: null, assigned_to: "Sales", updated_at: new Date(Date.now() - 2592e5).toISOString() },
      { id: "d5", title: "Hockey Lockers \u2014 30 units", stage: "quote_sent", clients: { contact_name: "Sarah Williams", sport: "Hockey" }, quoted_amount: 22500, assigned_to: null, updated_at: new Date(Date.now() - 3456e5).toISOString() },
      { id: "d6", title: "Baseball Lockers \u2014 35 units", stage: "quote_sent", clients: { contact_name: "Tom Rivera", sport: "Baseball" }, quoted_amount: 28e3, assigned_to: null, updated_at: new Date(Date.now() - 432e6).toISOString() },
      { id: "d7", title: "Stadium Lockers \u2014 80 units", stage: "quote_approved", clients: { contact_name: "Andrea Smith", sport: "Football" }, quoted_amount: 65e3, assigned_to: "Production", updated_at: new Date(Date.now() - 5184e5).toISOString() },
      { id: "d8", title: "Soccer Lockers \u2014 40 units", stage: "design_phase", clients: { contact_name: "Emily Torres", sport: "Soccer" }, quoted_amount: 31e3, assigned_to: "Design", updated_at: new Date(Date.now() - 6048e5).toISOString() },
      { id: "d9", title: "Pro Lockers \u2014 50 units", stage: "in_production", clients: { contact_name: "Robert Kim", sport: "Hockey" }, quoted_amount: 42e3, assigned_to: "Production", updated_at: new Date(Date.now() - 864e6).toISOString() },
      { id: "d10", title: "Varsity Lockers \u2014 45 units", stage: "complete", clients: { contact_name: "Nancy White", sport: "Basketball" }, quoted_amount: 27500, assigned_to: null, updated_at: new Date(Date.now() - 1728e6).toISOString() }
    ];
    for (const order of demoOrders) {
      ordersByStage[order.stage].push(order);
    }
  } else {
    const { data: allOrders } = await supabaseAdmin.from("orders").select("*, clients(contact_name, company_name, sport)").order("updated_at", { ascending: false });
    if (allOrders) {
      for (const order of allOrders) {
        if (ordersByStage[order.stage]) {
          ordersByStage[order.stage].push(order);
        }
      }
    }
  }
  return renderTemplate(_a || (_a = __template(["", "  <script>(function(){", "\n	const board = document.getElementById('pipelineBoard');\n	if (!board) throw new Error('Pipeline board not found');\n\n	let draggedCard = null;\n\n	board.addEventListener('dragstart', (e) => {\n		const card = e.target.closest('.pipeline-card');\n		if (!card) return;\n		draggedCard = card;\n		card.classList.add('dragging');\n		e.dataTransfer.effectAllowed = 'move';\n		e.dataTransfer.setData('text/plain', card.dataset.orderId);\n	});\n\n	board.addEventListener('dragend', (e) => {\n		const card = e.target.closest('.pipeline-card');\n		if (card) card.classList.remove('dragging');\n		document.querySelectorAll('.column-cards').forEach(col => col.classList.remove('drag-over'));\n		draggedCard = null;\n	});\n\n	board.addEventListener('dragover', (e) => {\n		e.preventDefault();\n		const column = e.target.closest('.column-cards');\n		if (column) {\n			document.querySelectorAll('.column-cards').forEach(col => col.classList.remove('drag-over'));\n			column.classList.add('drag-over');\n		}\n	});\n\n	board.addEventListener('drop', async (e) => {\n		e.preventDefault();\n		const column = e.target.closest('.column-cards');\n		if (!column || !draggedCard) return;\n\n		column.classList.remove('drag-over');\n\n		const orderId = draggedCard.dataset.orderId;\n		const newStage = column.dataset.stage;\n		const currentStage = draggedCard.dataset.currentStage;\n\n		if (newStage === currentStage) return;\n\n		column.appendChild(draggedCard);\n		draggedCard.dataset.currentStage = newStage;\n\n		// Update column counts\n		document.querySelectorAll('.pipeline-column').forEach(col => {\n			const cards = col.querySelector('.column-cards');\n			const count = col.querySelector('.column-count');\n			if (cards && count) {\n				count.textContent = cards.querySelectorAll('.pipeline-card').length;\n			}\n		});\n\n		// POST the stage change to the server\n		const formData = new FormData();\n		formData.append('order_id', orderId);\n		formData.append('new_stage', newStage);\n\n		try {\n			await fetch('/admin/pipeline', {\n				method: 'POST',\n				body: formData,\n			});\n		} catch (err) {\n			console.error('Failed to update stage:', err);\n		}\n	});\n})();<\/script>"])), renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Pipeline", "activeNav": "pipeline", "data-astro-cid-3wrt23wr": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="pipeline-board" id="pipelineBoard" data-astro-cid-3wrt23wr> ${STAGE_ORDER.map((stage) => {
    const orders = ordersByStage[stage];
    const color = STAGE_COLORS[stage];
    return renderTemplate`<div class="pipeline-column"${addAttribute(stage, "data-stage")} data-astro-cid-3wrt23wr> <div class="column-header" data-astro-cid-3wrt23wr> <span class="column-dot"${addAttribute(`background: ${color}`, "style")} data-astro-cid-3wrt23wr></span> <span class="column-title" data-astro-cid-3wrt23wr>${STAGE_LABELS[stage]}</span> <span class="column-count" data-astro-cid-3wrt23wr>${orders.length}</span> </div> <div class="column-cards"${addAttribute(stage, "data-stage")} data-astro-cid-3wrt23wr> ${orders.map((order) => {
      const daysInStage = Math.floor((Date.now() - new Date(order.updated_at).getTime()) / (1e3 * 60 * 60 * 24));
      return renderTemplate`<div class="pipeline-card" draggable="true"${addAttribute(order.id, "data-order-id")}${addAttribute(order.stage, "data-current-stage")} data-astro-cid-3wrt23wr> <a${addAttribute(`/admin/orders/${order.id}`, "href")} class="card-title" data-astro-cid-3wrt23wr>${order.title}</a> <div class="card-client" data-astro-cid-3wrt23wr>${order.clients?.contact_name || "Unknown"}</div> <div class="card-meta" data-astro-cid-3wrt23wr> ${order.clients?.sport && renderTemplate`<span class="card-sport" data-astro-cid-3wrt23wr>${order.clients.sport}</span>`} ${order.quoted_amount && renderTemplate`<span class="card-amount" data-astro-cid-3wrt23wr>$${Number(order.quoted_amount).toLocaleString()}</span>`} </div> <div class="card-footer" data-astro-cid-3wrt23wr> <span class="card-days" title="Days in this stage" data-astro-cid-3wrt23wr>${daysInStage}d</span> ${order.assigned_to && renderTemplate`<span class="card-assigned" data-astro-cid-3wrt23wr>${order.assigned_to}</span>`} </div> </div>`;
    })} ${orders.length === 0 && renderTemplate`<div class="column-empty" data-astro-cid-3wrt23wr>No orders</div>`} </div> </div>`;
  })} </div> ` }), defineScriptVars({ STAGE_ORDER }));
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/admin/pipeline.astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/admin/pipeline.astro";
const $$url = "/admin/pipeline";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Pipeline,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
