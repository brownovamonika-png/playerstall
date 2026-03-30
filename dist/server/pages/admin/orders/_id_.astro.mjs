import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, d as addAttribute, m as maybeRenderHead } from '../../../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_CKCou5FD.mjs';
import { g as getSession } from '../../../chunks/auth_CwLs9eZH.mjs';
import { s as supabaseAdmin, c as STAGE_ORDER, S as STAGE_LABELS, a as STAGE_COLORS } from '../../../chunks/supabase_y1UyI7GV.mjs';
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
    if (action === "update_stage") {
      const newStage = form.get("new_stage");
      const stageNotes = form.get("stage_notes");
      const { data: currentOrder } = await supabaseAdmin.from("orders").select("stage").eq("id", id).single();
      if (currentOrder) {
        await supabaseAdmin.from("orders").update({ stage: newStage }).eq("id", id);
        await supabaseAdmin.from("stage_history").insert({
          order_id: id,
          from_stage: currentOrder.stage,
          to_stage: newStage,
          changed_by: session.user.email,
          notes: stageNotes || null
        });
        formMessage = `Stage updated to ${STAGE_LABELS[newStage]}`;
      }
    }
    if (action === "update_order") {
      const { error } = await supabaseAdmin.from("orders").update({
        title: form.get("title"),
        description: form.get("description") || null,
        estimate_number: form.get("estimate_number") || null,
        invoice_number: form.get("invoice_number") || null,
        quoted_amount: form.get("quoted_amount") ? Number(form.get("quoted_amount")) : null,
        locker_type: form.get("locker_type") || null,
        locker_size: form.get("locker_size") || null,
        locker_width: form.get("locker_width") || null,
        locker_color: form.get("locker_color") || null,
        accessories: form.get("accessories") || null,
        quantity: form.get("quantity") ? Number(form.get("quantity")) : null,
        assigned_to: form.get("assigned_to") || null,
        estimated_completion: form.get("estimated_completion") || null,
        completed_date: form.get("completed_date") || null
      }).eq("id", id);
      formMessage = error ? `Error: ${error.message}` : "Order updated";
    }
    if (action === "add_note") {
      await supabaseAdmin.from("notes").insert({
        order_id: id,
        client_id: form.get("client_id") || null,
        content: form.get("content"),
        client_visible: form.get("client_visible") === "on",
        author: session.user.email || "Admin"
      });
      formMessage = "Note added";
    }
    if (action === "upload_document") {
      const file = form.get("file");
      const docType = form.get("doc_type") || "invoice";
      if (file && file.size > 0) {
        file.name.split(".").pop();
        const storagePath = `orders/${id}/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabaseAdmin.storage.from("documents").upload(storagePath, file, { contentType: file.type });
        if (uploadError) {
          formMessage = `Upload error: ${uploadError.message}`;
        } else {
          await supabaseAdmin.from("documents").insert({
            order_id: id,
            client_id: order ? (await supabaseAdmin.from("orders").select("client_id").eq("id", id).single()).data?.client_id : null,
            file_name: file.name,
            file_type: file.type,
            file_size: file.size,
            storage_path: storagePath,
            doc_type: docType,
            uploaded_by: session.user.email || "Admin"
          });
          formMessage = `"${file.name}" uploaded successfully`;
        }
      }
    }
    if (action === "delete_document") {
      const docId = form.get("doc_id");
      const { data: doc } = await supabaseAdmin.from("documents").select("storage_path").eq("id", docId).single();
      if (doc) {
        await supabaseAdmin.storage.from("documents").remove([doc.storage_path]);
        await supabaseAdmin.from("documents").delete().eq("id", docId);
        formMessage = "Document deleted";
      }
    }
  }
  const { data: order } = await supabaseAdmin.from("orders").select("*, clients(*)").eq("id", id).single();
  if (!order) return Astro2.redirect("/admin");
  const client = order.clients;
  const [
    { data: stageHistory },
    { data: notes },
    { data: attachments },
    { data: emailLog },
    { data: documents }
  ] = await Promise.all([
    supabaseAdmin.from("stage_history").select("*").eq("order_id", id).order("created_at", { ascending: false }),
    supabaseAdmin.from("notes").select("*").eq("order_id", id).order("created_at", { ascending: false }),
    supabaseAdmin.from("attachments").select("*").eq("order_id", id).order("uploaded_at", { ascending: false }),
    supabaseAdmin.from("email_log").select("*").eq("order_id", id).order("sent_at", { ascending: false }),
    supabaseAdmin.from("documents").select("*").eq("order_id", id).order("created_at", { ascending: false })
  ]);
  const currentStageIndex = STAGE_ORDER.indexOf(order.stage);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": order.title, "activeNav": "pipeline", "data-astro-cid-n6vruvag": true }, { "default": async ($$result2) => renderTemplate`  ${formMessage && renderTemplate`${maybeRenderHead()}<div${addAttribute(["alert", { "alert-error": formMessage.startsWith("Error") }], "class:list")} data-astro-cid-n6vruvag> ${formMessage} </div>`} <div class="card stage-card" data-astro-cid-n6vruvag> <div class="stage-progress" data-astro-cid-n6vruvag> ${STAGE_ORDER.map((stage, i) => {
    const isActive = stage === order.stage;
    const isPast = i < currentStageIndex;
    const color = STAGE_COLORS[stage];
    return renderTemplate`<div${addAttribute(["stage-step", { active: isActive, past: isPast }], "class:list")} data-astro-cid-n6vruvag> <div class="stage-dot"${addAttribute(isActive ? `background: ${color}; box-shadow: 0 0 0 4px ${color}33` : isPast ? `background: ${color}` : "", "style")} data-astro-cid-n6vruvag></div> <span class="stage-name"${addAttribute(isActive ? `color: ${color}; font-weight: 700` : "", "style")} data-astro-cid-n6vruvag>${STAGE_LABELS[stage]}</span> </div>`;
  })} </div> <div class="stage-actions" data-astro-cid-n6vruvag> <form method="POST" class="stage-change-form" data-astro-cid-n6vruvag> <input type="hidden" name="action" value="update_stage" data-astro-cid-n6vruvag> <select name="new_stage" class="stage-select" data-astro-cid-n6vruvag> ${STAGE_ORDER.map((stage) => renderTemplate`<option${addAttribute(stage, "value")}${addAttribute(stage === order.stage, "selected")} data-astro-cid-n6vruvag>${STAGE_LABELS[stage]}</option>`)} </select> <input type="text" name="stage_notes" placeholder="Note (optional)" class="stage-note-input" data-astro-cid-n6vruvag> <button type="submit" class="btn btn-primary btn-sm" data-astro-cid-n6vruvag>Move Stage</button> </form> </div> </div> <div class="order-layout" data-astro-cid-n6vruvag> <!-- Left: Order Details --> <div class="order-sidebar" data-astro-cid-n6vruvag> <div class="card" data-astro-cid-n6vruvag> <h3 data-astro-cid-n6vruvag>Order Details</h3> <form method="POST" data-astro-cid-n6vruvag> <input type="hidden" name="action" value="update_order" data-astro-cid-n6vruvag> <div class="form-group" data-astro-cid-n6vruvag> <label data-astro-cid-n6vruvag>Title</label> <input type="text" name="title"${addAttribute(order.title, "value")} required data-astro-cid-n6vruvag> </div> <div class="form-group" data-astro-cid-n6vruvag> <label data-astro-cid-n6vruvag>Description</label> <textarea name="description" rows="3" data-astro-cid-n6vruvag>${order.description || ""}</textarea> </div> <div class="form-group" data-astro-cid-n6vruvag> <label data-astro-cid-n6vruvag>Estimate #</label> <input type="text" name="estimate_number"${addAttribute(order.estimate_number || "", "value")} placeholder="e.g. EST-1296" data-astro-cid-n6vruvag> </div> <div class="form-group" data-astro-cid-n6vruvag> <label data-astro-cid-n6vruvag>Invoice #</label> <input type="text" name="invoice_number"${addAttribute(order.invoice_number || "", "value")} placeholder="e.g. INV-1088" data-astro-cid-n6vruvag> </div> <div class="form-group" data-astro-cid-n6vruvag> <label data-astro-cid-n6vruvag>Quoted Amount ($)</label> <input type="number" name="quoted_amount" step="0.01"${addAttribute(order.quoted_amount || "", "value")} data-astro-cid-n6vruvag> </div> <div class="form-group" data-astro-cid-n6vruvag> <label data-astro-cid-n6vruvag>Locker Type</label> <select name="locker_type" data-astro-cid-n6vruvag> <option value="" data-astro-cid-n6vruvag>Select...</option> <option value="Model L"${addAttribute(order.locker_type === "Model L", "selected")} data-astro-cid-n6vruvag>Model L</option> <option value="Model S"${addAttribute(order.locker_type === "Model S", "selected")} data-astro-cid-n6vruvag>Model S</option> <option value="Model Z"${addAttribute(order.locker_type === "Model Z", "selected")} data-astro-cid-n6vruvag>Model Z</option> <option value="Model X"${addAttribute(order.locker_type === "Model X", "selected")} data-astro-cid-n6vruvag>Model X</option> <option value="Semi Pro"${addAttribute(order.locker_type === "Semi Pro", "selected")} data-astro-cid-n6vruvag>Semi Pro</option> <option value="Varsity"${addAttribute(order.locker_type === "Varsity", "selected")} data-astro-cid-n6vruvag>Varsity</option> <option value="Pro"${addAttribute(order.locker_type === "Pro", "selected")} data-astro-cid-n6vruvag>Pro</option> <option value="Stadium"${addAttribute(order.locker_type === "Stadium", "selected")} data-astro-cid-n6vruvag>Stadium</option> <option value="Custom"${addAttribute(order.locker_type === "Custom", "selected")} data-astro-cid-n6vruvag>Custom</option> </select> </div> <div class="form-group" data-astro-cid-n6vruvag> <label data-astro-cid-n6vruvag>Width</label> <input type="text" name="locker_size"${addAttribute(order.locker_size || "", "value")} placeholder="e.g. 24&quot;" data-astro-cid-n6vruvag> </div> <div class="form-group" data-astro-cid-n6vruvag> <label data-astro-cid-n6vruvag>Depth</label> <input type="text" name="locker_width"${addAttribute(order.locker_width || "", "value")} placeholder="e.g. 18&quot;" data-astro-cid-n6vruvag> </div> <div class="form-group" data-astro-cid-n6vruvag> <label data-astro-cid-n6vruvag>Color</label> <input type="text" name="locker_color"${addAttribute(order.locker_color || "", "value")} placeholder="e.g. Natural Oak, Dark Walnut" data-astro-cid-n6vruvag> </div> <div class="form-group" data-astro-cid-n6vruvag> <label data-astro-cid-n6vruvag>Accessories</label> <input type="text" name="accessories"${addAttribute(order.accessories || "", "value")} placeholder="e.g. Name plates, hooks, shelves" data-astro-cid-n6vruvag> </div> <div class="form-group" data-astro-cid-n6vruvag> <label data-astro-cid-n6vruvag>Quantity</label> <input type="number" name="quantity" min="1"${addAttribute(order.quantity || "", "value")} data-astro-cid-n6vruvag> </div> <div class="form-group" data-astro-cid-n6vruvag> <label data-astro-cid-n6vruvag>Assigned To</label> <input type="text" name="assigned_to"${addAttribute(order.assigned_to || "", "value")} data-astro-cid-n6vruvag> </div> <div class="form-group" data-astro-cid-n6vruvag> <label data-astro-cid-n6vruvag>Est. Completion</label> <input type="date" name="estimated_completion"${addAttribute(order.estimated_completion || "", "value")} data-astro-cid-n6vruvag> </div> <div class="form-group" data-astro-cid-n6vruvag> <label data-astro-cid-n6vruvag>Completed Date</label> <input type="date" name="completed_date"${addAttribute(order.completed_date || "", "value")} data-astro-cid-n6vruvag> </div> <button type="submit" class="btn btn-primary btn-sm" style="width:100%" data-astro-cid-n6vruvag>Save Changes</button> </form> </div> <div class="card info-card" data-astro-cid-n6vruvag> <h3 data-astro-cid-n6vruvag>Client</h3> <div class="info-row" data-astro-cid-n6vruvag> <span class="info-label" data-astro-cid-n6vruvag>Name</span> <a${addAttribute(`/admin/clients/${client.id}`, "href")} data-astro-cid-n6vruvag>${client.contact_name}</a> </div> ${client.company_name && renderTemplate`<div class="info-row" data-astro-cid-n6vruvag> <span class="info-label" data-astro-cid-n6vruvag>Company</span> <span data-astro-cid-n6vruvag>${client.company_name}</span> </div>`} ${client.email && renderTemplate`<div class="info-row" data-astro-cid-n6vruvag> <span class="info-label" data-astro-cid-n6vruvag>Email</span> <a${addAttribute(`mailto:${client.email}`, "href")} data-astro-cid-n6vruvag>${client.email}</a> </div>`} ${client.phone && renderTemplate`<div class="info-row" data-astro-cid-n6vruvag> <span class="info-label" data-astro-cid-n6vruvag>Phone</span> <span data-astro-cid-n6vruvag>${client.phone}</span> </div>`} </div> </div> <!-- Right: Timeline, Notes, Files --> <div class="order-main" data-astro-cid-n6vruvag> <!-- Stage Timeline --> <div class="card" data-astro-cid-n6vruvag> <h3 data-astro-cid-n6vruvag>Timeline</h3> ${stageHistory && stageHistory.length > 0 ? renderTemplate`<div class="timeline" data-astro-cid-n6vruvag> ${stageHistory.map((entry) => renderTemplate`<div class="timeline-item" data-astro-cid-n6vruvag> <div class="timeline-dot"${addAttribute(`background: ${STAGE_COLORS[entry.to_stage]}`, "style")} data-astro-cid-n6vruvag></div> <div class="timeline-content" data-astro-cid-n6vruvag> <div class="timeline-header" data-astro-cid-n6vruvag> ${entry.from_stage ? renderTemplate`<span data-astro-cid-n6vruvag>${STAGE_LABELS[entry.from_stage]} → <strong${addAttribute(`color: ${STAGE_COLORS[entry.to_stage]}`, "style")} data-astro-cid-n6vruvag>${STAGE_LABELS[entry.to_stage]}</strong></span>` : renderTemplate`<span data-astro-cid-n6vruvag>Created as <strong${addAttribute(`color: ${STAGE_COLORS[entry.to_stage]}`, "style")} data-astro-cid-n6vruvag>${STAGE_LABELS[entry.to_stage]}</strong></span>`} </div> ${entry.notes && renderTemplate`<p class="timeline-notes" data-astro-cid-n6vruvag>${entry.notes}</p>`} <span class="timeline-meta" data-astro-cid-n6vruvag>${entry.changed_by || "System"} · ${new Date(entry.created_at).toLocaleString()}</span> </div> </div>`)} </div>` : renderTemplate`<p style="color: #9ca3af; font-size: 14px; padding: 12px 0" data-astro-cid-n6vruvag>No stage changes yet</p>`} </div> <!-- Notes --> <div class="card" data-astro-cid-n6vruvag> <h3 data-astro-cid-n6vruvag>Notes</h3> <form method="POST" class="note-form" data-astro-cid-n6vruvag> <input type="hidden" name="action" value="add_note" data-astro-cid-n6vruvag> <input type="hidden" name="client_id"${addAttribute(client.id, "value")} data-astro-cid-n6vruvag> <textarea name="content" rows="2" placeholder="Add a note..." required data-astro-cid-n6vruvag></textarea> <div class="note-form-actions" data-astro-cid-n6vruvag> <label class="checkbox-label" data-astro-cid-n6vruvag> <input type="checkbox" name="client_visible" data-astro-cid-n6vruvag> <span data-astro-cid-n6vruvag>Visible to client</span> </label> <button type="submit" class="btn btn-sm btn-primary" data-astro-cid-n6vruvag>Add Note</button> </div> </form> ${notes && notes.length > 0 && renderTemplate`<div class="notes-list" data-astro-cid-n6vruvag> ${notes.map((note) => renderTemplate`<div class="note-item" data-astro-cid-n6vruvag> <div class="note-header" data-astro-cid-n6vruvag> <span class="note-author" data-astro-cid-n6vruvag>${note.author}</span> ${note.client_visible && renderTemplate`<span class="badge" style="background: #dbeafe; color: #2563eb; font-size: 10px" data-astro-cid-n6vruvag>Client visible</span>`} <span class="note-time" data-astro-cid-n6vruvag>${new Date(note.created_at).toLocaleString()}</span> </div> <p class="note-content" data-astro-cid-n6vruvag>${note.content}</p> </div>`)} </div>`} </div> <!-- Attachments --> <div class="card" data-astro-cid-n6vruvag> <h3 data-astro-cid-n6vruvag>Files & Attachments</h3> ${attachments && attachments.length > 0 ? renderTemplate`<div class="files-list" data-astro-cid-n6vruvag> ${attachments.map((file) => renderTemplate`<div class="file-item" data-astro-cid-n6vruvag> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2" data-astro-cid-n6vruvag><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-n6vruvag></path><polyline points="14 2 14 8 20 8" data-astro-cid-n6vruvag></polyline></svg> <a${addAttribute(file.file_url, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-n6vruvag>${file.filename}</a> <span class="badge" style="background: #f3f4f6; color: #6b7280; font-size: 10px" data-astro-cid-n6vruvag>${file.file_type}</span> ${file.client_visible && renderTemplate`<span class="badge" style="background: #dbeafe; color: #2563eb; font-size: 10px" data-astro-cid-n6vruvag>Client visible</span>`} </div>`)} </div>` : renderTemplate`<p style="color: #9ca3af; font-size: 14px; padding: 12px 0" data-astro-cid-n6vruvag>No files attached yet</p>`} </div> <!-- Documents / Invoices --> <div class="card" data-astro-cid-n6vruvag> <h3 data-astro-cid-n6vruvag>Documents & Invoices</h3> <form method="POST" enctype="multipart/form-data" class="upload-form" data-astro-cid-n6vruvag> <input type="hidden" name="action" value="upload_document" data-astro-cid-n6vruvag> <div class="upload-row" data-astro-cid-n6vruvag> <select name="doc_type" class="upload-select" data-astro-cid-n6vruvag> <option value="invoice" data-astro-cid-n6vruvag>Invoice (QBO)</option> <option value="quote" data-astro-cid-n6vruvag>Quote</option> <option value="design" data-astro-cid-n6vruvag>Design / Drawing</option> <option value="room_plan" data-astro-cid-n6vruvag>Room Plan</option> <option value="contract" data-astro-cid-n6vruvag>Contract</option> <option value="photo" data-astro-cid-n6vruvag>Photo</option> <option value="other" data-astro-cid-n6vruvag>Other</option> </select> <label class="upload-btn btn btn-sm btn-secondary" data-astro-cid-n6vruvag>
Choose File
<input type="file" name="file" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx" style="display:none" onchange="this.closest('.upload-row').querySelector('.upload-filename').textContent = this.files[0]?.name || 'No file chosen'" data-astro-cid-n6vruvag> </label> <span class="upload-filename" data-astro-cid-n6vruvag>No file chosen</span> <button type="submit" class="btn btn-sm btn-primary" data-astro-cid-n6vruvag>Upload</button> </div> </form> ${documents && documents.length > 0 ? renderTemplate`<div class="doc-list" data-astro-cid-n6vruvag> ${documents.map((doc) => {
    const { data: urlData } = supabaseAdmin.storage.from("documents").getPublicUrl(doc.storage_path);
    const fileUrl = urlData?.publicUrl || "#";
    const sizeKB = doc.file_size ? `${(doc.file_size / 1024).toFixed(0)} KB` : "";
    const typeLabel = {
      invoice: "Invoice",
      quote: "Quote",
      design: "Design",
      room_plan: "Room Plan",
      contract: "Contract",
      photo: "Photo",
      other: "Other"
    };
    return renderTemplate`<div class="doc-item" data-astro-cid-n6vruvag> <div class="doc-icon" data-astro-cid-n6vruvag> ${doc.file_type === "application/pdf" ? renderTemplate`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" data-astro-cid-n6vruvag><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-n6vruvag></path><polyline points="14 2 14 8 20 8" data-astro-cid-n6vruvag></polyline><line x1="16" y1="13" x2="8" y2="13" data-astro-cid-n6vruvag></line><line x1="16" y1="17" x2="8" y2="17" data-astro-cid-n6vruvag></line></svg>` : renderTemplate`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2" data-astro-cid-n6vruvag><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-n6vruvag></path><polyline points="14 2 14 8 20 8" data-astro-cid-n6vruvag></polyline></svg>`} </div> <div class="doc-info" data-astro-cid-n6vruvag> <a${addAttribute(fileUrl, "href")} target="_blank" rel="noopener noreferrer" class="doc-name" data-astro-cid-n6vruvag>${doc.file_name}</a> <span class="doc-meta" data-astro-cid-n6vruvag> <span class="badge" style="background: #f3f4f6; color: #6b7280; font-size: 10px" data-astro-cid-n6vruvag>${typeLabel[doc.doc_type] || doc.doc_type}</span> ${sizeKB && renderTemplate`<span data-astro-cid-n6vruvag>${sizeKB}</span>`} <span data-astro-cid-n6vruvag>${new Date(doc.created_at).toLocaleDateString()}</span> ${doc.uploaded_by && renderTemplate`<span data-astro-cid-n6vruvag>by ${doc.uploaded_by}</span>`} </span> </div> <form method="POST" style="margin:0" data-astro-cid-n6vruvag> <input type="hidden" name="action" value="delete_document" data-astro-cid-n6vruvag> <input type="hidden" name="doc_id"${addAttribute(doc.id, "value")} data-astro-cid-n6vruvag> <button type="submit" class="doc-delete" title="Delete" onclick="return confirm('Delete this document?')" data-astro-cid-n6vruvag> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-n6vruvag><polyline points="3 6 5 6 21 6" data-astro-cid-n6vruvag></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" data-astro-cid-n6vruvag></path></svg> </button> </form> </div>`;
  })} </div>` : renderTemplate`<p style="color: #9ca3af; font-size: 14px; padding: 12px 0" data-astro-cid-n6vruvag>No documents uploaded yet. Upload invoices from QBO, designs, contracts, or room plans.</p>`} </div> <!-- Email History --> <div class="card" data-astro-cid-n6vruvag> <h3 data-astro-cid-n6vruvag>Email History</h3> ${emailLog && emailLog.length > 0 ? renderTemplate`<div class="email-list" data-astro-cid-n6vruvag> ${emailLog.map((log) => renderTemplate`<div class="email-item" data-astro-cid-n6vruvag> <span class="email-subject" data-astro-cid-n6vruvag>${log.subject}</span> <span class="email-meta" data-astro-cid-n6vruvag>${new Date(log.sent_at).toLocaleString()}</span> <span class="badge"${addAttribute(`background: ${log.status === "sent" ? "#dcfce7" : "#fef9c3"}; color: ${log.status === "sent" ? "#166534" : "#854d0e"}`, "style")} data-astro-cid-n6vruvag>${log.status}</span> </div>`)} </div>` : renderTemplate`<p style="color: #9ca3af; font-size: 14px; padding: 12px 0" data-astro-cid-n6vruvag>No emails sent yet</p>`} </div> </div> </div> `, "header-actions": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "header-actions" }, { "default": async ($$result3) => renderTemplate` <a${addAttribute(`/admin/clients/${client.id}`, "href")} class="btn btn-secondary btn-sm" data-astro-cid-n6vruvag>View Client</a> ` })}` })} `;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/admin/orders/[id].astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/admin/orders/[id].astro";
const $$url = "/admin/orders/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$id,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
