import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead, d as addAttribute } from '../../../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_CKCou5FD.mjs';
import { g as getSession } from '../../../chunks/auth_CwLs9eZH.mjs';
import { s as supabaseAdmin, S as STAGE_LABELS, a as STAGE_COLORS } from '../../../chunks/supabase_y1UyI7GV.mjs';
/* empty css                                      */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://playerstall.com");
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const session = await getSession(Astro2.cookies);
  if (!session) return Astro2.redirect("/admin/login");
  const { id } = Astro2.params;
  let formMessage = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const action = form.get("action");
    if (action === "update_client") {
      const { error } = await supabaseAdmin.from("clients").update({
        contact_name: form.get("contact_name"),
        company_name: form.get("company_name") || null,
        email: form.get("email") || null,
        phone: form.get("phone") || null,
        sport: form.get("sport") || null,
        team_name: form.get("team_name") || null,
        country: form.get("country") || null,
        shipping_address: form.get("shipping_address") || null,
        source_website: form.get("source_website") || null,
        notes: form.get("notes") || null
      }).eq("id", id);
      formMessage = error ? `Error: ${error.message}` : "Client updated";
    }
    if (action === "create_order") {
      const { data: order, error } = await supabaseAdmin.from("orders").insert({
        client_id: id,
        title: form.get("title"),
        description: form.get("description") || null,
        locker_type: form.get("locker_type") || null,
        locker_size: form.get("locker_size") || null,
        locker_width: form.get("locker_width") || null,
        locker_color: form.get("locker_color") || null,
        accessories: form.get("accessories") || null,
        quantity: form.get("quantity") ? Number(form.get("quantity")) : null
      }).select().single();
      if (!error && order) {
        await supabaseAdmin.from("stage_history").insert({
          order_id: order.id,
          to_stage: "new_lead",
          changed_by: session.user.email,
          notes: "Order created"
        });
        formMessage = "Order created";
      } else {
        formMessage = `Error: ${error?.message}`;
      }
    }
    if (action === "add_note") {
      const { error } = await supabaseAdmin.from("notes").insert({
        client_id: id,
        order_id: form.get("order_id") || null,
        content: form.get("content"),
        client_visible: form.get("client_visible") === "on",
        author: session.user.email || "Admin"
      });
      formMessage = error ? `Error: ${error.message}` : "Note added";
    }
    if (action === "regenerate_token") {
      const newToken = [...Array(48)].map(() => Math.random().toString(36)[2]).join("");
      await supabaseAdmin.from("clients").update({ portal_token: newToken }).eq("id", id);
      formMessage = "Portal link regenerated";
    }
  }
  const { data: client } = await supabaseAdmin.from("clients").select("*").eq("id", id).single();
  if (!client) return Astro2.redirect("/admin/clients");
  const [
    { data: orders },
    { data: notes },
    { data: messages },
    { data: emailLog },
    { data: clientDocs }
  ] = await Promise.all([
    supabaseAdmin.from("orders").select("*").eq("client_id", id).order("created_at", { ascending: false }),
    supabaseAdmin.from("notes").select("*").eq("client_id", id).order("created_at", { ascending: false }),
    supabaseAdmin.from("messages").select("*").eq("client_id", id).order("created_at", { ascending: false }).limit(20),
    supabaseAdmin.from("email_log").select("*").eq("client_id", id).order("sent_at", { ascending: false }).limit(20),
    supabaseAdmin.from("documents").select("*").eq("client_id", id).order("created_at", { ascending: false })
  ]);
  const portalUrl = `${Astro2.url.origin}/my-project/${client.portal_token}`;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": client.contact_name, "activeNav": "clients", "data-astro-cid-lnozdavg": true }, { "default": async ($$result2) => renderTemplate`  ${formMessage && renderTemplate`${maybeRenderHead()}<div${addAttribute(["alert", { "alert-error": formMessage.startsWith("Error") }], "class:list")} data-astro-cid-lnozdavg> ${formMessage} </div>`}<div class="client-layout" data-astro-cid-lnozdavg> <!-- Left Column: Client Info --> <div class="client-sidebar" data-astro-cid-lnozdavg> <div class="card" data-astro-cid-lnozdavg> <h3 data-astro-cid-lnozdavg>Client Details</h3> <form method="POST" data-astro-cid-lnozdavg> <input type="hidden" name="action" value="update_client" data-astro-cid-lnozdavg> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Contact Name</label> <input type="text" name="contact_name"${addAttribute(client.contact_name, "value")} required data-astro-cid-lnozdavg> </div> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Company</label> <input type="text" name="company_name"${addAttribute(client.company_name || "", "value")} data-astro-cid-lnozdavg> </div> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Email</label> <input type="email" name="email"${addAttribute(client.email || "", "value")} data-astro-cid-lnozdavg> </div> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Phone</label> <input type="tel" name="phone"${addAttribute(client.phone || "", "value")} data-astro-cid-lnozdavg> </div> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Sport</label> <select name="sport" data-astro-cid-lnozdavg> <option value="" data-astro-cid-lnozdavg>Select...</option> ${["Football", "Hockey", "Basketball", "Baseball", "Soccer", "Lacrosse", "Other"].map((s) => renderTemplate`<option${addAttribute(s, "value")}${addAttribute(client.sport === s, "selected")} data-astro-cid-lnozdavg>${s}</option>`)} </select> </div> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Team Name</label> <input type="text" name="team_name"${addAttribute(client.team_name || "", "value")} data-astro-cid-lnozdavg> </div> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Country</label> <select name="country" data-astro-cid-lnozdavg> <option value="" data-astro-cid-lnozdavg>Select...</option> <option value="USA"${addAttribute(client.country === "USA", "selected")} data-astro-cid-lnozdavg>USA</option> <option value="Canada"${addAttribute(client.country === "Canada", "selected")} data-astro-cid-lnozdavg>Canada</option> </select> </div> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Source Website</label> <input type="text" name="source_website"${addAttribute(client.source_website || "", "value")} placeholder="e.g. customsportslockers.com" data-astro-cid-lnozdavg> </div> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Shipping Address</label> <textarea name="shipping_address" rows="2" placeholder="Full shipping address" data-astro-cid-lnozdavg>${client.shipping_address || ""}</textarea> </div> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Notes</label> <textarea name="notes" rows="3" data-astro-cid-lnozdavg>${client.notes || ""}</textarea> </div> <button type="submit" class="btn btn-primary btn-sm" style="width:100%" data-astro-cid-lnozdavg>Save Changes</button> </form> </div> <div class="card portal-card" data-astro-cid-lnozdavg> <h3 data-astro-cid-lnozdavg>Client Portal</h3> <p class="portal-desc" data-astro-cid-lnozdavg>Share this link so your client can track their project:</p> <div class="portal-link-box" data-astro-cid-lnozdavg> <input type="text"${addAttribute(portalUrl, "value")} readonly id="portalUrl" class="portal-input" data-astro-cid-lnozdavg> <button type="button" class="btn btn-sm btn-secondary" onclick="navigator.clipboard.writeText(document.getElementById('portalUrl').value).then(()=>this.textContent='Copied!').catch(()=>{})" data-astro-cid-lnozdavg>Copy</button> </div> <form method="POST" style="margin-top: 8px" data-astro-cid-lnozdavg> <input type="hidden" name="action" value="regenerate_token" data-astro-cid-lnozdavg> <button type="submit" class="btn btn-sm btn-secondary" style="width:100%" onclick="return confirm('Regenerate portal link? The old link will stop working.')" data-astro-cid-lnozdavg>Regenerate Link</button> </form> </div> </div> <!-- Right Column: Orders, Notes, Activity --> <div class="client-main" data-astro-cid-lnozdavg> <!-- Orders Section --> <div class="card" data-astro-cid-lnozdavg> <div class="card-header" data-astro-cid-lnozdavg> <h3 data-astro-cid-lnozdavg>Orders</h3> <button class="btn btn-primary btn-sm" onclick="document.getElementById('newOrderModal').showModal()" data-astro-cid-lnozdavg>New Order</button> </div> ${orders && orders.length > 0 ? renderTemplate`<div class="order-cards" data-astro-cid-lnozdavg> ${orders.map((order) => renderTemplate`<div class="order-card" data-astro-cid-lnozdavg> <div class="order-card-top" data-astro-cid-lnozdavg> <div class="order-card-title" data-astro-cid-lnozdavg> <a${addAttribute(`/admin/orders/${order.id}`, "href")} data-astro-cid-lnozdavg>${order.title}</a> </div> <span class="badge"${addAttribute(`background: ${STAGE_COLORS[order.stage]}20; color: ${STAGE_COLORS[order.stage]}`, "style")} data-astro-cid-lnozdavg> ${STAGE_LABELS[order.stage]} </span> </div> <div class="order-card-grid" data-astro-cid-lnozdavg> <div class="order-field" data-astro-cid-lnozdavg> <span class="order-field-label" data-astro-cid-lnozdavg>Estimate #</span> <span class="order-field-value" data-astro-cid-lnozdavg>${order.estimate_number || "\u2014"}</span> </div> <div class="order-field" data-astro-cid-lnozdavg> <span class="order-field-label" data-astro-cid-lnozdavg>Invoice #</span> <span class="order-field-value" data-astro-cid-lnozdavg>${order.invoice_number || "\u2014"}</span> </div> <div class="order-field" data-astro-cid-lnozdavg> <span class="order-field-label" data-astro-cid-lnozdavg>Locker Type</span> <span class="order-field-value" data-astro-cid-lnozdavg>${order.locker_type || "\u2014"}</span> </div> <div class="order-field" data-astro-cid-lnozdavg> <span class="order-field-label" data-astro-cid-lnozdavg>Width</span> <span class="order-field-value" data-astro-cid-lnozdavg>${order.locker_size || "\u2014"}</span> </div> <div class="order-field" data-astro-cid-lnozdavg> <span class="order-field-label" data-astro-cid-lnozdavg>Depth</span> <span class="order-field-value" data-astro-cid-lnozdavg>${order.locker_width || "\u2014"}</span> </div> <div class="order-field" data-astro-cid-lnozdavg> <span class="order-field-label" data-astro-cid-lnozdavg>Quantity</span> <span class="order-field-value" data-astro-cid-lnozdavg>${order.quantity || "\u2014"}</span> </div> <div class="order-field" data-astro-cid-lnozdavg> <span class="order-field-label" data-astro-cid-lnozdavg>Color</span> <span class="order-field-value" data-astro-cid-lnozdavg>${order.locker_color || "\u2014"}</span> </div> <div class="order-field" data-astro-cid-lnozdavg> <span class="order-field-label" data-astro-cid-lnozdavg>Quoted Amount</span> <span class="order-field-value" data-astro-cid-lnozdavg>${order.quoted_amount ? `$${Number(order.quoted_amount).toLocaleString()}` : "\u2014"}</span> </div> <div class="order-field full-width" data-astro-cid-lnozdavg> <span class="order-field-label" data-astro-cid-lnozdavg>Accessories</span> <span class="order-field-value" data-astro-cid-lnozdavg>${order.accessories || "\u2014"}</span> </div> ${order.description && renderTemplate`<div class="order-field full-width" data-astro-cid-lnozdavg> <span class="order-field-label" data-astro-cid-lnozdavg>Description</span> <span class="order-field-value" data-astro-cid-lnozdavg>${order.description}</span> </div>`} <div class="order-field" data-astro-cid-lnozdavg> <span class="order-field-label" data-astro-cid-lnozdavg>Assigned To</span> <span class="order-field-value" data-astro-cid-lnozdavg>${order.assigned_to || "\u2014"}</span> </div> <div class="order-field" data-astro-cid-lnozdavg> <span class="order-field-label" data-astro-cid-lnozdavg>Est. Completion</span> <span class="order-field-value" data-astro-cid-lnozdavg>${order.estimated_completion ? new Date(order.estimated_completion).toLocaleDateString() : "\u2014"}</span> </div> <div class="order-field" data-astro-cid-lnozdavg> <span class="order-field-label" data-astro-cid-lnozdavg>Completed Date</span> <span class="order-field-value"${addAttribute(order.completed_date ? "color: #16a34a; font-weight: 600" : "", "style")} data-astro-cid-lnozdavg> ${order.completed_date ? new Date(order.completed_date).toLocaleDateString() : "\u2014"} </span> </div> <div class="order-field" data-astro-cid-lnozdavg> <span class="order-field-label" data-astro-cid-lnozdavg>Created</span> <span class="order-field-value" data-astro-cid-lnozdavg>${new Date(order.created_at).toLocaleDateString()}</span> </div> </div> ${(() => {
    const orderDocs = clientDocs?.filter((d) => d.order_id === order.id) || [];
    return orderDocs.length > 0 ? renderTemplate`<div class="order-docs" data-astro-cid-lnozdavg> <span class="order-field-label" data-astro-cid-lnozdavg>Documents (${orderDocs.length})</span> <div class="order-docs-list" data-astro-cid-lnozdavg> ${orderDocs.map((doc) => renderTemplate`<span class="order-doc-badge" data-astro-cid-lnozdavg> ${doc.file_type === "application/pdf" ? "\u{1F4C4}" : "\u{1F4CE}"} ${doc.file_name} </span>`)} </div> </div>` : null;
  })()} ${client.shipping_address && renderTemplate`<div class="order-shipping" data-astro-cid-lnozdavg> <span class="order-field-label" data-astro-cid-lnozdavg>Shipping To</span> <span class="order-field-value" data-astro-cid-lnozdavg>${client.shipping_address}</span> </div>`} </div>`)} </div>` : renderTemplate`<p style="color: #9ca3af; font-size: 14px; text-align: center; padding: 20px" data-astro-cid-lnozdavg>No orders yet</p>`} </div> <!-- Notes Section --> <div class="card" data-astro-cid-lnozdavg> <div class="card-header" data-astro-cid-lnozdavg> <h3 data-astro-cid-lnozdavg>Notes</h3> </div> <form method="POST" class="note-form" data-astro-cid-lnozdavg> <input type="hidden" name="action" value="add_note" data-astro-cid-lnozdavg> <div class="form-group" data-astro-cid-lnozdavg> <textarea name="content" rows="2" placeholder="Add a note..." required data-astro-cid-lnozdavg></textarea> </div> <div class="note-form-actions" data-astro-cid-lnozdavg> <label class="checkbox-label" data-astro-cid-lnozdavg> <input type="checkbox" name="client_visible" data-astro-cid-lnozdavg> <span data-astro-cid-lnozdavg>Visible to client</span> </label> <button type="submit" class="btn btn-sm btn-primary" data-astro-cid-lnozdavg>Add Note</button> </div> </form> ${notes && notes.length > 0 && renderTemplate`<div class="notes-list" data-astro-cid-lnozdavg> ${notes.map((note) => renderTemplate`<div class="note-item" data-astro-cid-lnozdavg> <div class="note-header" data-astro-cid-lnozdavg> <span class="note-author" data-astro-cid-lnozdavg>${note.author}</span> ${note.client_visible && renderTemplate`<span class="badge" style="background: #dbeafe; color: #2563eb; font-size: 10px" data-astro-cid-lnozdavg>Client visible</span>`} <span class="note-time" data-astro-cid-lnozdavg>${new Date(note.created_at).toLocaleString()}</span> </div> <p class="note-content" data-astro-cid-lnozdavg>${note.content}</p> </div>`)} </div>`} </div> <!-- Email History --> <div class="card" data-astro-cid-lnozdavg> <div class="card-header" data-astro-cid-lnozdavg> <h3 data-astro-cid-lnozdavg>Email History</h3> </div> ${emailLog && emailLog.length > 0 ? renderTemplate`<div class="email-list" data-astro-cid-lnozdavg> ${emailLog.map((log) => renderTemplate`<div class="email-item" data-astro-cid-lnozdavg> <span class="email-subject" data-astro-cid-lnozdavg>${log.subject}</span> <span class="email-meta" data-astro-cid-lnozdavg>to ${log.recipient_email} · ${new Date(log.sent_at).toLocaleString()}</span> <span class="badge"${addAttribute(`background: ${log.status === "sent" ? "#dcfce7" : "#fef9c3"}; color: ${log.status === "sent" ? "#166534" : "#854d0e"}`, "style")} data-astro-cid-lnozdavg>${log.status}</span> </div>`)} </div>` : renderTemplate`<p style="color: #9ca3af; font-size: 14px; text-align: center; padding: 20px" data-astro-cid-lnozdavg>No emails sent yet</p>`} </div> <!-- Messages --> ${messages && messages.length > 0 && renderTemplate`<div class="card" data-astro-cid-lnozdavg> <div class="card-header" data-astro-cid-lnozdavg> <h3 data-astro-cid-lnozdavg>Client Messages</h3> </div> <div class="messages-list" data-astro-cid-lnozdavg> ${messages.map((msg) => renderTemplate`<div${addAttribute(["message-item", { "from-client": msg.sender === "client" }], "class:list")} data-astro-cid-lnozdavg> <span class="message-sender" data-astro-cid-lnozdavg>${msg.sender === "client" ? client.contact_name : "You"}</span> <p class="message-content" data-astro-cid-lnozdavg>${msg.content}</p> <span class="message-time" data-astro-cid-lnozdavg>${new Date(msg.created_at).toLocaleString()}</span> </div>`)} </div> </div>`} </div> </div>  <dialog id="newOrderModal" class="modal" data-astro-cid-lnozdavg> <div class="modal-content" data-astro-cid-lnozdavg> <div class="modal-header" data-astro-cid-lnozdavg> <h2 data-astro-cid-lnozdavg>New Order for ${client.contact_name}</h2> <button type="button" class="modal-close" onclick="document.getElementById('newOrderModal').close()" data-astro-cid-lnozdavg>&times;</button> </div> <form method="POST" data-astro-cid-lnozdavg> <input type="hidden" name="action" value="create_order" data-astro-cid-lnozdavg> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Order Title *</label> <input type="text" name="title" required placeholder="e.g. Football Lockers - 50 units" data-astro-cid-lnozdavg> </div> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Description</label> <textarea name="description" rows="3" placeholder="Details about the order..." data-astro-cid-lnozdavg></textarea> </div> <div class="form-row" data-astro-cid-lnozdavg> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Locker Type</label> <select name="locker_type" data-astro-cid-lnozdavg> <option value="" data-astro-cid-lnozdavg>Select...</option> <option value="Model L" data-astro-cid-lnozdavg>Model L</option> <option value="Model S" data-astro-cid-lnozdavg>Model S</option> <option value="Model Z" data-astro-cid-lnozdavg>Model Z</option> <option value="Model X" data-astro-cid-lnozdavg>Model X</option> <option value="Semi Pro" data-astro-cid-lnozdavg>Semi Pro</option> <option value="Varsity" data-astro-cid-lnozdavg>Varsity</option> <option value="Pro" data-astro-cid-lnozdavg>Pro</option> <option value="Stadium" data-astro-cid-lnozdavg>Stadium</option> <option value="Custom" data-astro-cid-lnozdavg>Custom</option> </select> </div> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Quantity</label> <input type="number" name="quantity" min="1" placeholder="Number of lockers" data-astro-cid-lnozdavg> </div> </div> <div class="form-row" data-astro-cid-lnozdavg> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Width</label> <input type="text" name="locker_size" placeholder="e.g. 24&quot;" data-astro-cid-lnozdavg> </div> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Depth</label> <input type="text" name="locker_width" placeholder="e.g. 18&quot;" data-astro-cid-lnozdavg> </div> </div> <div class="form-row" data-astro-cid-lnozdavg> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Color</label> <input type="text" name="locker_color" placeholder="e.g. Natural Oak, Dark Walnut" data-astro-cid-lnozdavg> </div> <div class="form-group" data-astro-cid-lnozdavg> <label data-astro-cid-lnozdavg>Accessories</label> <input type="text" name="accessories" placeholder="e.g. Name plates, hooks, shelves" data-astro-cid-lnozdavg> </div> </div> <div class="modal-actions" data-astro-cid-lnozdavg> <button type="button" class="btn btn-secondary" onclick="document.getElementById('newOrderModal').close()" data-astro-cid-lnozdavg>Cancel</button> <button type="submit" class="btn btn-primary" data-astro-cid-lnozdavg>Create Order</button> </div> </form> </div> </dialog> `, "header-actions": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "header-actions" }, { "default": async ($$result3) => renderTemplate` <a href="/admin/clients" class="btn btn-secondary btn-sm" data-astro-cid-lnozdavg>Back to Clients</a> ` })}` })} `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/admin/clients/[id].astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/admin/clients/[id].astro";
const $$url = "/admin/clients/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$id,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
