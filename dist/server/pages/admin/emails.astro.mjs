import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CKCou5FD.mjs';
import { g as getSession } from '../../chunks/auth_CwLs9eZH.mjs';
import { s as supabaseAdmin, i as isSupabaseConfigured, S as STAGE_LABELS } from '../../chunks/supabase_y1UyI7GV.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://playerstall.com");
const prerender = false;
const $$Emails = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Emails;
  const demoMode = !isSupabaseConfigured;
  if (!demoMode) {
    const session = await getSession(Astro2.cookies);
    if (!session) return Astro2.redirect("/admin/login");
  }
  let formMessage = "";
  let templates = [];
  if (demoMode) {
    templates = [
      { id: "d1", name: "Inquiry Acknowledgment", subject: "Thanks for reaching out, {{first_name}}! | PlayerStall", body: "<p>Hi {{first_name}},</p><p>Thank you for your interest in PlayerStall!</p>", stage_trigger: "new_lead", delay_hours: 0, enabled: true },
      { id: "d2", name: "Consultation Follow-Up", subject: "Great talking with you, {{first_name}} | PlayerStall", body: "<p>Hi {{first_name}},</p><p>Thank you for taking the time to speak with us...</p>", stage_trigger: "consultation", delay_hours: 1, enabled: true },
      { id: "d3", name: "Quote Delivery", subject: "Your custom locker quote is ready, {{first_name}} | PlayerStall", body: "<p>Hi {{first_name}},</p><p>Great news \u2014 your custom quote is ready!</p>", stage_trigger: "quote_sent", delay_hours: 0, enabled: true },
      { id: "d4", name: "Order Confirmation", subject: "Welcome aboard, {{first_name}}! | PlayerStall", body: "<p>Hi {{first_name}},</p><p>Your project is officially underway!</p>", stage_trigger: "quote_approved", delay_hours: 2, enabled: true },
      { id: "d5", name: "Design Phase Update", subject: "Your locker design is in progress | PlayerStall", body: "<p>Hi {{first_name}},</p><p>Our design team has started working...</p>", stage_trigger: "design_phase", delay_hours: 1, enabled: true },
      { id: "d6", name: "Production Update", subject: "Your lockers are being built! | PlayerStall", body: "<p>Hi {{first_name}},</p><p>Exciting news \u2014 your lockers are now in production!</p>", stage_trigger: "in_production", delay_hours: 2, enabled: true },
      { id: "d7", name: "Shipping Notification", subject: "Your lockers are on their way! | PlayerStall", body: "<p>Hi {{first_name}},</p><p>Your custom lockers have shipped!</p>", stage_trigger: "shipped", delay_hours: 0, enabled: true },
      { id: "d8", name: "Installation Complete", subject: "Your new lockers are installed! | PlayerStall", body: "<p>Hi {{first_name}},</p><p>Your new lockers are installed and ready!</p>", stage_trigger: "installed", delay_hours: 1, enabled: true },
      { id: "d9", name: "Gentle Quote Follow-Up", subject: "Checking in on your locker quote | PlayerStall", body: "<p>Hi {{first_name}},</p><p>Just wanted to check in on the quote we sent...</p>", stage_trigger: null, delay_hours: 0, enabled: true },
      { id: "d10", name: "30-Day Check-In", subject: "How are the new lockers? | PlayerStall", body: "<p>Hi {{first_name}},</p><p>It has been about a month since installation...</p>", stage_trigger: null, delay_hours: 0, enabled: true },
      { id: "d11", name: "Annual Warranty Reminder", subject: "Your PlayerStall warranty check-in | PlayerStall", body: "<p>Hi {{first_name}},</p><p>Just a friendly reminder about your 5-year guarantee...</p>", stage_trigger: null, delay_hours: 0, enabled: false }
    ];
  } else {
    if (Astro2.request.method === "POST") {
      const form = await Astro2.request.formData();
      const action = form.get("action");
      if (action === "update_template") {
        const templateId = form.get("template_id");
        const { error } = await supabaseAdmin.from("email_templates").update({
          name: form.get("name"),
          subject: form.get("subject"),
          body: form.get("body"),
          stage_trigger: form.get("stage_trigger") || null,
          delay_hours: Number(form.get("delay_hours") || 0),
          enabled: form.get("enabled") === "on"
        }).eq("id", templateId);
        formMessage = error ? `Error: ${error.message}` : "Template updated";
      }
      if (action === "create_template") {
        const { error } = await supabaseAdmin.from("email_templates").insert({
          name: form.get("name"),
          subject: form.get("subject"),
          body: form.get("body") || "<p>Email body here...</p>",
          stage_trigger: form.get("stage_trigger") || null,
          delay_hours: Number(form.get("delay_hours") || 0),
          enabled: true
        });
        formMessage = error ? `Error: ${error.message}` : "Template created";
      }
      if (action === "toggle_template") {
        const templateId = form.get("template_id");
        const enabled = form.get("current_enabled") === "true";
        await supabaseAdmin.from("email_templates").update({ enabled: !enabled }).eq("id", templateId);
        formMessage = `Template ${enabled ? "disabled" : "enabled"}`;
      }
    }
    const { data } = await supabaseAdmin.from("email_templates").select("*").order("created_at", { ascending: true });
    templates = data || [];
  }
  const mergeVars = [
    { var: "{{first_name}}", desc: "Client first name" },
    { var: "{{client_name}}", desc: "Client full name" },
    { var: "{{company_name}}", desc: "Company/team name" },
    { var: "{{sport}}", desc: "Sport type" },
    { var: "{{order_title}}", desc: "Order title" },
    { var: "{{quoted_amount}}", desc: "Quote amount" },
    { var: "{{estimated_date}}", desc: "Estimated completion" },
    { var: "{{portal_link}}", desc: "Client portal URL" },
    { var: "{{consultation_notes}}", desc: "Consultation notes" }
  ];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Email Templates", "activeNav": "emails", "data-astro-cid-vr4b4vi4": true }, { "default": async ($$result2) => renderTemplate`  ${formMessage && renderTemplate`${maybeRenderHead()}<div${addAttribute(["alert", { "alert-error": formMessage.startsWith("Error") }], "class:list")} data-astro-cid-vr4b4vi4> ${formMessage} </div>`}<div class="templates-layout" data-astro-cid-vr4b4vi4> <div class="templates-list" data-astro-cid-vr4b4vi4> ${templates && templates.map((template) => renderTemplate`<details class="template-card"${addAttribute(`template-${template.id}`, "id")} data-astro-cid-vr4b4vi4> <summary class="template-summary" data-astro-cid-vr4b4vi4> <div class="template-info" data-astro-cid-vr4b4vi4> <span${addAttribute(["template-status", { enabled: template.enabled, disabled: !template.enabled }], "class:list")} data-astro-cid-vr4b4vi4></span> <div data-astro-cid-vr4b4vi4> <span class="template-name" data-astro-cid-vr4b4vi4>${template.name}</span> <span class="template-subject" data-astro-cid-vr4b4vi4>${template.subject}</span> </div> </div> <div class="template-tags" data-astro-cid-vr4b4vi4> ${template.stage_trigger && renderTemplate`<span class="badge" style="background: #f3f4f6; color: #6b7280" data-astro-cid-vr4b4vi4>
Trigger: ${STAGE_LABELS[template.stage_trigger]} </span>`} ${template.delay_hours > 0 && renderTemplate`<span class="badge" style="background: #fef3c7; color: #854d0e" data-astro-cid-vr4b4vi4> ${template.delay_hours}h delay
</span>`} </div> </summary> <div class="template-editor" data-astro-cid-vr4b4vi4> <form method="POST" data-astro-cid-vr4b4vi4> <input type="hidden" name="action" value="update_template" data-astro-cid-vr4b4vi4> <input type="hidden" name="template_id"${addAttribute(template.id, "value")} data-astro-cid-vr4b4vi4> <div class="form-row" data-astro-cid-vr4b4vi4> <div class="form-group" data-astro-cid-vr4b4vi4> <label data-astro-cid-vr4b4vi4>Template Name</label> <input type="text" name="name"${addAttribute(template.name, "value")} required data-astro-cid-vr4b4vi4> </div> <div class="form-group" data-astro-cid-vr4b4vi4> <label data-astro-cid-vr4b4vi4>Stage Trigger</label> <select name="stage_trigger" data-astro-cid-vr4b4vi4> <option value="" data-astro-cid-vr4b4vi4>None (manual only)</option> ${Object.entries(STAGE_LABELS).map(([stage, label]) => renderTemplate`<option${addAttribute(stage, "value")}${addAttribute(template.stage_trigger === stage, "selected")} data-astro-cid-vr4b4vi4>${label}</option>`)} </select> </div> </div> <div class="form-row" data-astro-cid-vr4b4vi4> <div class="form-group" data-astro-cid-vr4b4vi4> <label data-astro-cid-vr4b4vi4>Subject Line</label> <input type="text" name="subject"${addAttribute(template.subject, "value")} required data-astro-cid-vr4b4vi4> </div> <div class="form-group" data-astro-cid-vr4b4vi4> <label data-astro-cid-vr4b4vi4>Delay (hours)</label> <input type="number" name="delay_hours" min="0"${addAttribute(template.delay_hours, "value")} data-astro-cid-vr4b4vi4> </div> </div> <div class="form-group" data-astro-cid-vr4b4vi4> <label data-astro-cid-vr4b4vi4>Email Body (HTML)</label> <textarea name="body" rows="12" class="code-textarea" data-astro-cid-vr4b4vi4>${template.body}</textarea> </div> <div class="template-actions" data-astro-cid-vr4b4vi4> <label class="checkbox-label" data-astro-cid-vr4b4vi4> <input type="checkbox" name="enabled"${addAttribute(template.enabled, "checked")} data-astro-cid-vr4b4vi4> <span data-astro-cid-vr4b4vi4>Enabled</span> </label> <div style="display: flex; gap: 8px;" data-astro-cid-vr4b4vi4> <button type="submit" class="btn btn-primary btn-sm" data-astro-cid-vr4b4vi4>Save Template</button> </div> </div> </form> <form method="POST" style="margin-top: 8px;" data-astro-cid-vr4b4vi4> <input type="hidden" name="action" value="toggle_template" data-astro-cid-vr4b4vi4> <input type="hidden" name="template_id"${addAttribute(template.id, "value")} data-astro-cid-vr4b4vi4> <input type="hidden" name="current_enabled"${addAttribute(String(template.enabled), "value")} data-astro-cid-vr4b4vi4> <button type="submit" class="btn btn-sm btn-secondary" style="width: 100%" data-astro-cid-vr4b4vi4> ${template.enabled ? "Disable Template" : "Enable Template"} </button> </form> </div> </details>`)} </div> <div class="merge-vars-panel" data-astro-cid-vr4b4vi4> <div class="card" data-astro-cid-vr4b4vi4> <h3 data-astro-cid-vr4b4vi4>Merge Variables</h3> <p class="merge-desc" data-astro-cid-vr4b4vi4>Use these in subject lines and email body:</p> <div class="vars-list" data-astro-cid-vr4b4vi4> ${mergeVars.map((v) => renderTemplate`<div class="var-item" data-astro-cid-vr4b4vi4> <code class="var-code" data-astro-cid-vr4b4vi4>${v.var}</code> <span class="var-desc" data-astro-cid-vr4b4vi4>${v.desc}</span> </div>`)} </div> </div> </div> </div>  <dialog id="newTemplateModal" class="modal" data-astro-cid-vr4b4vi4> <div class="modal-content" data-astro-cid-vr4b4vi4> <div class="modal-header" data-astro-cid-vr4b4vi4> <h2 data-astro-cid-vr4b4vi4>New Email Template</h2> <button type="button" class="modal-close" onclick="document.getElementById('newTemplateModal').close()" data-astro-cid-vr4b4vi4>&times;</button> </div> <form method="POST" data-astro-cid-vr4b4vi4> <input type="hidden" name="action" value="create_template" data-astro-cid-vr4b4vi4> <div class="form-group" data-astro-cid-vr4b4vi4> <label data-astro-cid-vr4b4vi4>Template Name *</label> <input type="text" name="name" required placeholder="e.g. Follow-Up Reminder" data-astro-cid-vr4b4vi4> </div> <div class="form-group" data-astro-cid-vr4b4vi4> <label data-astro-cid-vr4b4vi4>Subject Line *</label> <input type="text" name="subject" required placeholder="e.g. Checking in, {{first_name}} | PlayerStall" data-astro-cid-vr4b4vi4> </div> <div class="form-row" data-astro-cid-vr4b4vi4> <div class="form-group" data-astro-cid-vr4b4vi4> <label data-astro-cid-vr4b4vi4>Stage Trigger</label> <select name="stage_trigger" data-astro-cid-vr4b4vi4> <option value="" data-astro-cid-vr4b4vi4>None (manual only)</option> ${Object.entries(STAGE_LABELS).map(([stage, label]) => renderTemplate`<option${addAttribute(stage, "value")} data-astro-cid-vr4b4vi4>${label}</option>`)} </select> </div> <div class="form-group" data-astro-cid-vr4b4vi4> <label data-astro-cid-vr4b4vi4>Delay (hours)</label> <input type="number" name="delay_hours" min="0" value="0" data-astro-cid-vr4b4vi4> </div> </div> <div class="form-group" data-astro-cid-vr4b4vi4> <label data-astro-cid-vr4b4vi4>Email Body (HTML)</label> <textarea name="body" rows="6" placeholder="<p>Hi {{first_name}},</p><p>Your email content here...</p>" data-astro-cid-vr4b4vi4></textarea> </div> <div class="modal-actions" data-astro-cid-vr4b4vi4> <button type="button" class="btn btn-secondary" onclick="document.getElementById('newTemplateModal').close()" data-astro-cid-vr4b4vi4>Cancel</button> <button type="submit" class="btn btn-primary" data-astro-cid-vr4b4vi4>Create Template</button> </div> </form> </div> </dialog> `, "header-actions": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "header-actions" }, { "default": async ($$result3) => renderTemplate` <button class="btn btn-primary" onclick="document.getElementById('newTemplateModal').showModal()" data-astro-cid-vr4b4vi4> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-vr4b4vi4><line x1="12" y1="5" x2="12" y2="19" data-astro-cid-vr4b4vi4></line><line x1="5" y1="12" x2="19" y2="12" data-astro-cid-vr4b4vi4></line></svg>
New Template
</button> ` })}` })} `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/admin/emails.astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/admin/emails.astro";
const $$url = "/admin/emails";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Emails,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
