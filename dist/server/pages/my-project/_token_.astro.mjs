import { b as createAstro, c as createComponent, e as renderHead, r as renderComponent, F as Fragment, a as renderTemplate, d as addAttribute } from '../../chunks/astro/server_BKRL6jPE.mjs';
import 'piccolore';
import { s as supabaseAdmin, c as STAGE_ORDER, S as STAGE_LABELS, a as STAGE_COLORS } from '../../chunks/supabase_y1UyI7GV.mjs';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://playerstall.com");
const prerender = false;
const $$token = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$token;
  const { token } = Astro2.params;
  const { data: client } = await supabaseAdmin.from("clients").select("*").eq("portal_token", token).single();
  if (!client) {
    return new Response("Project not found", { status: 404 });
  }
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const content = form.get("message");
    if (content?.trim()) {
      await supabaseAdmin.from("messages").insert({
        client_id: client.id,
        content: content.trim(),
        sender: "client"
      });
    }
  }
  const { data: orders } = await supabaseAdmin.from("orders").select("*").eq("client_id", client.id).order("created_at", { ascending: false });
  const primaryOrder = orders?.[0] || null;
  const { data: timeline } = primaryOrder ? await supabaseAdmin.from("stage_history").select("*").eq("order_id", primaryOrder.id).eq("client_visible", true).order("created_at", { ascending: true }) : { data: [] };
  const { data: attachments } = primaryOrder ? await supabaseAdmin.from("attachments").select("*").eq("order_id", primaryOrder.id).eq("client_visible", true).order("uploaded_at", { ascending: false }) : { data: [] };
  const { data: notes } = primaryOrder ? await supabaseAdmin.from("notes").select("*").eq("order_id", primaryOrder.id).eq("client_visible", true).order("created_at", { ascending: false }) : { data: [] };
  const { data: messages } = await supabaseAdmin.from("messages").select("*").eq("client_id", client.id).order("created_at", { ascending: true }).limit(50);
  const currentStageIndex = primaryOrder ? STAGE_ORDER.indexOf(primaryOrder.stage) : -1;
  const progressPercent = primaryOrder ? Math.round((currentStageIndex + 1) / STAGE_ORDER.length * 100) : 0;
  return renderTemplate`<html lang="en" data-astro-cid-yiiyrpey> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="robots" content="noindex, nofollow"><title>My Project | PlayerStall</title><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link href="https://fonts.googleapis.com/css?family=Yantramanav:400,500,700|Oswald:600,700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-yiiyrpey> <div class="portal-wrapper" data-astro-cid-yiiyrpey> <header class="portal-header" data-astro-cid-yiiyrpey> <div class="portal-header-inner" data-astro-cid-yiiyrpey> <a href="https://playerstall.com" class="portal-brand" data-astro-cid-yiiyrpey> <span class="brand-name" data-astro-cid-yiiyrpey>PLAYERSTALL</span> </a> <div class="portal-greeting" data-astro-cid-yiiyrpey> <span data-astro-cid-yiiyrpey>Welcome, <strong data-astro-cid-yiiyrpey>${client.contact_name}</strong></span> </div> </div> </header> <main class="portal-main" data-astro-cid-yiiyrpey> ${primaryOrder ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-yiiyrpey": true }, { "default": async ($$result2) => renderTemplate`  <section class="portal-card hero-card" data-astro-cid-yiiyrpey> <div class="project-overview" data-astro-cid-yiiyrpey> <div data-astro-cid-yiiyrpey> <h1 class="project-title" data-astro-cid-yiiyrpey>${primaryOrder.title}</h1> <p class="project-stage" data-astro-cid-yiiyrpey>
Current Status:
<span class="stage-badge"${addAttribute(`background: ${STAGE_COLORS[primaryOrder.stage]}20; color: ${STAGE_COLORS[primaryOrder.stage]}`, "style")} data-astro-cid-yiiyrpey> ${STAGE_LABELS[primaryOrder.stage]} </span> </p> ${primaryOrder.estimated_completion && renderTemplate`<p class="project-est" data-astro-cid-yiiyrpey>Estimated Completion: <strong data-astro-cid-yiiyrpey>${new Date(primaryOrder.estimated_completion).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</strong></p>`} </div> </div> <!-- Progress Bar --> <div class="progress-section" data-astro-cid-yiiyrpey> <div class="progress-bar" data-astro-cid-yiiyrpey> <div class="progress-fill"${addAttribute(`width: ${progressPercent}%`, "style")} data-astro-cid-yiiyrpey></div> </div> <div class="progress-steps" data-astro-cid-yiiyrpey> ${STAGE_ORDER.map((stage, i) => {
    const isActive = stage === primaryOrder.stage;
    const isPast = i < currentStageIndex;
    return renderTemplate`<div${addAttribute(["progress-step", { active: isActive, past: isPast }], "class:list")} data-astro-cid-yiiyrpey> <div class="step-dot"${addAttribute(isActive ? `background: ${STAGE_COLORS[stage]}; box-shadow: 0 0 0 3px ${STAGE_COLORS[stage]}33` : "", "style")} data-astro-cid-yiiyrpey></div> <span class="step-label" data-astro-cid-yiiyrpey>${STAGE_LABELS[stage]}</span> </div>`;
  })} </div> </div> </section>  <div class="portal-grid" data-astro-cid-yiiyrpey> <!-- Timeline --> <section class="portal-card" data-astro-cid-yiiyrpey> <h2 data-astro-cid-yiiyrpey>Project Timeline</h2> ${timeline && timeline.length > 0 ? renderTemplate`<div class="timeline" data-astro-cid-yiiyrpey> ${timeline.map((entry, i) => renderTemplate`<div${addAttribute(["timeline-item", { latest: i === timeline.length - 1 }], "class:list")} data-astro-cid-yiiyrpey> <div class="timeline-dot"${addAttribute(`background: ${STAGE_COLORS[entry.to_stage]}`, "style")} data-astro-cid-yiiyrpey></div> <div class="timeline-content" data-astro-cid-yiiyrpey> <span class="timeline-stage"${addAttribute(`color: ${STAGE_COLORS[entry.to_stage]}`, "style")} data-astro-cid-yiiyrpey> ${STAGE_LABELS[entry.to_stage]} </span> ${entry.notes && renderTemplate`<p class="timeline-notes" data-astro-cid-yiiyrpey>${entry.notes}</p>`} <span class="timeline-date" data-astro-cid-yiiyrpey> ${new Date(entry.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} </span> </div> </div>`)} </div>` : renderTemplate`<p class="empty-text" data-astro-cid-yiiyrpey>Your timeline will appear here as your project progresses.</p>`} </section> <!-- Files & Documents --> <section class="portal-card" data-astro-cid-yiiyrpey> <h2 data-astro-cid-yiiyrpey>Files & Documents</h2> ${attachments && attachments.length > 0 ? renderTemplate`<div class="files-list" data-astro-cid-yiiyrpey> ${attachments.map((file) => renderTemplate`<a${addAttribute(file.file_url, "href")} class="file-item" target="_blank" rel="noopener noreferrer" data-astro-cid-yiiyrpey> <div class="file-icon" data-astro-cid-yiiyrpey> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-yiiyrpey><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-yiiyrpey></path><polyline points="14 2 14 8 20 8" data-astro-cid-yiiyrpey></polyline></svg> </div> <div class="file-info" data-astro-cid-yiiyrpey> <span class="file-name" data-astro-cid-yiiyrpey>${file.filename}</span> <span class="file-type" data-astro-cid-yiiyrpey>${file.file_type}</span> </div> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-yiiyrpey><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-astro-cid-yiiyrpey></path><polyline points="7 10 12 15 17 10" data-astro-cid-yiiyrpey></polyline><line x1="12" y1="15" x2="12" y2="3" data-astro-cid-yiiyrpey></line></svg> </a>`)} </div>` : renderTemplate`<p class="empty-text" data-astro-cid-yiiyrpey>Documents such as room plans, design mockups, and quotes will appear here.</p>`} </section> </div>  <div class="portal-grid" data-astro-cid-yiiyrpey> <!-- Notes / Updates --> ${notes && notes.length > 0 && renderTemplate`<section class="portal-card" data-astro-cid-yiiyrpey> <h2 data-astro-cid-yiiyrpey>Updates from Our Team</h2> <div class="updates-list" data-astro-cid-yiiyrpey> ${notes.map((note) => renderTemplate`<div class="update-item" data-astro-cid-yiiyrpey> <p class="update-content" data-astro-cid-yiiyrpey>${note.content}</p> <span class="update-date" data-astro-cid-yiiyrpey> ${note.author} · ${new Date(note.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} </span> </div>`)} </div> </section>`} <!-- Messages --> <section class="portal-card" data-astro-cid-yiiyrpey> <h2 data-astro-cid-yiiyrpey>Messages</h2> <div class="messages-container" data-astro-cid-yiiyrpey> ${messages && messages.length > 0 ? renderTemplate`<div class="messages-list" data-astro-cid-yiiyrpey> ${messages.map((msg) => renderTemplate`<div${addAttribute(["message-bubble", { "from-me": msg.sender === "client", "from-them": msg.sender !== "client" }], "class:list")} data-astro-cid-yiiyrpey> <p data-astro-cid-yiiyrpey>${msg.content}</p> <span class="message-time" data-astro-cid-yiiyrpey> ${msg.sender === "client" ? "You" : "PlayerStall"} · ${new Date(msg.created_at).toLocaleString()} </span> </div>`)} </div>` : renderTemplate`<p class="empty-text" style="margin-bottom: 16px" data-astro-cid-yiiyrpey>Have a question? Send us a message below.</p>`} <form method="POST" class="message-form" data-astro-cid-yiiyrpey> <textarea name="message" rows="2" placeholder="Type a message..." required data-astro-cid-yiiyrpey></textarea> <button type="submit" class="send-btn" data-astro-cid-yiiyrpey>
Send
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-yiiyrpey><line x1="22" y1="2" x2="11" y2="13" data-astro-cid-yiiyrpey></line><polygon points="22 2 15 22 11 13 2 9 22 2" data-astro-cid-yiiyrpey></polygon></svg> </button> </form> </div> </section> </div> ` })}` : renderTemplate`<section class="portal-card hero-card" data-astro-cid-yiiyrpey> <h1 class="project-title" data-astro-cid-yiiyrpey>Welcome, ${client.contact_name}</h1> <p class="empty-text" data-astro-cid-yiiyrpey>Your project details will appear here once your order is set up. We'll be in touch soon!</p> </section>`} </main> <footer class="portal-footer" data-astro-cid-yiiyrpey> <p data-astro-cid-yiiyrpey>PlayerStall — Custom Sports Lockers Since 1996</p> <p data-astro-cid-yiiyrpey>Questions? Email <a href="mailto:sales@playerstall.com" data-astro-cid-yiiyrpey>sales@playerstall.com</a> or call 1-888-584-1444</p> </footer> </div> </body></html>`;
}, "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/my-project/[token].astro", void 0);

const $$file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/pages/my-project/[token].astro";
const $$url = "/my-project/[token]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$token,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
