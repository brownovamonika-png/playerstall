-- supabase/migrations/001_crm_overhaul.sql
-- Baseline CRM: enums, tables, triggers, RLS, and seed email templates.
-- Aligned with supabase/schema.sql (body starts at ENUM TYPES).
-- For empty databases only; re-running on an existing CRM will error on CREATE TYPE/TABLE.

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE order_stage AS ENUM (
  'new_lead',
  'consultation',
  'quote_sent',
  'quote_approved',
  'design_phase',
  'in_production',
  'quality_check',
  'shipped',
  'installed',
  'complete'
);

CREATE TYPE client_source AS ENUM (
  'web_form',
  'phone',
  'email',
  'referral',
  'room_planner',
  'old_website',
  'other'
);

CREATE TYPE automation_trigger AS ENUM (
  'stage_change',
  'time_based',
  'no_response'
);

CREATE TYPE automation_action AS ENUM (
  'send_email',
  'create_reminder',
  'update_stage'
);

CREATE TYPE task_status AS ENUM (
  'pending',
  'sent',
  'cancelled'
);

-- ============================================================
-- CLIENTS
-- ============================================================

CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT,
  contact_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  sport TEXT,
  team_name TEXT,
  notes TEXT,
  country TEXT,
  shipping_address TEXT,
  source client_source DEFAULT 'web_form',
  source_website TEXT,
  portal_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(24), 'hex'),
  automation_paused BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_portal_token ON clients(portal_token);

-- ============================================================
-- ORDERS
-- ============================================================

CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  estimate_number TEXT,
  invoice_number TEXT,
  stage order_stage DEFAULT 'new_lead',
  quoted_amount DECIMAL(10,2),
  locker_type TEXT,
  locker_size TEXT,   -- displayed as "Width"
  locker_width TEXT,  -- displayed as "Depth"
  locker_color TEXT,
  accessories TEXT,
  quantity INTEGER,
  assigned_to TEXT,
  estimated_completion DATE,
  completed_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_orders_client ON orders(client_id);
CREATE INDEX idx_orders_stage ON orders(stage);

-- ============================================================
-- STAGE HISTORY (audit trail)
-- ============================================================

CREATE TABLE stage_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  from_stage order_stage,
  to_stage order_stage NOT NULL,
  changed_by TEXT,
  notes TEXT,
  client_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_stage_history_order ON stage_history(order_id);

-- ============================================================
-- DOCUMENTS (invoices, PDFs, attachments)
-- ============================================================

CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  storage_path TEXT NOT NULL,
  doc_type TEXT DEFAULT 'invoice',
  uploaded_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_documents_order ON documents(order_id);
CREATE INDEX idx_documents_client ON documents(client_id);

-- ============================================================
-- EMAIL TEMPLATES
-- ============================================================

CREATE TABLE email_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  stage_trigger order_stage,
  delay_hours INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  company TEXT NOT NULL DEFAULT 'playerstall' CHECK (company IN ('playerstall', 'custom_sport_lockers')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- EMAIL LOG
-- ============================================================

CREATE TABLE email_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  template_id UUID REFERENCES email_templates(id) ON DELETE SET NULL,
  subject TEXT,
  recipient_email TEXT,
  status TEXT DEFAULT 'sent',
  sent_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_email_log_order ON email_log(order_id);
CREATE INDEX idx_email_log_client ON email_log(client_id);

-- ============================================================
-- NOTES / ACTIVITY
-- ============================================================

CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  author TEXT DEFAULT 'Admin',
  content TEXT NOT NULL,
  client_visible BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_notes_order ON notes(order_id);
CREATE INDEX idx_notes_client ON notes(client_id);

-- ============================================================
-- ATTACHMENTS
-- ============================================================

CREATE TABLE attachments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  filename TEXT NOT NULL,
  file_type TEXT DEFAULT 'other',
  client_visible BOOLEAN DEFAULT false,
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_attachments_order ON attachments(order_id);

-- ============================================================
-- AUTOMATION RULES
-- ============================================================

CREATE TABLE automation_rules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  trigger_type automation_trigger NOT NULL,
  trigger_config JSONB DEFAULT '{}',
  action_type automation_action NOT NULL,
  action_config JSONB DEFAULT '{}',
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- SCHEDULED TASKS
-- ============================================================

CREATE TABLE scheduled_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  automation_rule_id UUID REFERENCES automation_rules(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  execute_at TIMESTAMPTZ NOT NULL,
  status task_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_scheduled_tasks_execute ON scheduled_tasks(execute_at) WHERE status = 'pending';

-- ============================================================
-- CLIENT MESSAGES (portal <-> admin)
-- ============================================================

CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  sender TEXT NOT NULL DEFAULT 'client',
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_messages_client ON messages(client_id);

-- ============================================================
-- AUTO-UPDATE updated_at TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER email_templates_updated_at
  BEFORE UPDATE ON email_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE stage_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Admin users (authenticated) can do everything
CREATE POLICY admin_all ON clients FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY admin_all ON orders FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY admin_all ON stage_history FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY admin_all ON email_templates FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY admin_all ON email_log FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY admin_all ON notes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY admin_all ON attachments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY admin_all ON automation_rules FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY admin_all ON scheduled_tasks FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY admin_all ON messages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Anon users can read client-visible data via portal token (handled in app layer)
-- The portal uses the service role key server-side, so no anon RLS policies needed

-- ============================================================
-- SEED: Default Email Templates
-- ============================================================

INSERT INTO email_templates (name, subject, body, stage_trigger, delay_hours) VALUES
(
  'Inquiry Acknowledgment',
  'Thanks for reaching out, {{first_name}}! | PlayerStall',
  '<p>Hi {{first_name}},</p><p>Thank you for your interest in PlayerStall custom wood lockers! We received your inquiry and wanted to let you know that one of our team members will be in touch within 24 hours.</p><p>In the meantime, here are a few things that set us apart:</p><ul><li><strong>30+ years</strong> of craftsmanship</li><li><strong>5-year guarantee</strong> on every locker</li><li><strong>Custom-built</strong> in 8-12 weeks</li><li><strong>Free design consultation</strong></li></ul><p>Feel free to browse our <a href="https://playerstall.com/gallery">gallery</a> to see some of our recent work.</p><p>We look forward to helping you create something special for your team.</p><p>Best,<br>The PlayerStall Team</p>',
  'new_lead',
  0
),
(
  'Consultation Follow-Up',
  'Great talking with you, {{first_name}} | PlayerStall',
  '<p>Hi {{first_name}},</p><p>Thank you for taking the time to speak with us about your {{sport}} locker project. It was great learning about what you''re looking for.</p><p>Here''s a quick recap of what we discussed:</p><p><em>{{consultation_notes}}</em></p><p>Our next step is to put together a detailed quote based on your requirements. You can expect to hear from us within the next few business days.</p><p>If you think of any additional questions in the meantime, don''t hesitate to reach out.</p><p>Best,<br>The PlayerStall Team</p>',
  'consultation',
  1
),
(
  'Quote Delivery',
  'Your custom locker quote is ready, {{first_name}} | PlayerStall',
  '<p>Hi {{first_name}},</p><p>Great news — your custom quote for {{order_title}} is ready!</p><p><strong>Quoted Amount: {{quoted_amount}}</strong></p><p>You can view all the details, download the quote, and track your project anytime at your personal project page:</p><p><a href="{{portal_link}}" style="display:inline-block;padding:14px 36px;background:#fe5900;color:#ffffff;text-decoration:none;font-weight:600;border-radius:6px;text-transform:uppercase;">View Your Project</a></p><p>This quote is valid for 30 days. If you have any questions or would like to make adjustments, just reply to this email or give us a call.</p><p>We''d love to build something great for your team.</p><p>Best,<br>The PlayerStall Team</p>',
  'quote_sent',
  0
),
(
  'Order Confirmation',
  'Welcome aboard, {{first_name}}! Your project is underway | PlayerStall',
  '<p>Hi {{first_name}},</p><p>This is exciting — your {{sport}} locker project is officially underway!</p><p>Here''s what to expect next:</p><ol><li><strong>Design Phase</strong> — Our team will begin working on your custom locker design</li><li><strong>Your Approval</strong> — We''ll share design mockups for your review</li><li><strong>Production</strong> — Once approved, we begin crafting your lockers</li><li><strong>Delivery &amp; Installation</strong> — Estimated completion: {{estimated_date}}</li></ol><p>You can track every step of the process at your project page:</p><p><a href="{{portal_link}}" style="display:inline-block;padding:14px 36px;background:#fe5900;color:#ffffff;text-decoration:none;font-weight:600;border-radius:6px;text-transform:uppercase;">Track Your Project</a></p><p>Thank you for choosing PlayerStall. We take great pride in every locker we build.</p><p>Best,<br>The PlayerStall Team</p>',
  'quote_approved',
  2
),
(
  'Design Phase Update',
  'Your locker design is in progress, {{first_name}} | PlayerStall',
  '<p>Hi {{first_name}},</p><p>Quick update — our design team has started working on your custom {{sport}} lockers. We''re putting careful thought into every detail to make sure your locker room looks and functions exactly how you envisioned.</p><p>You''ll be able to view design updates and mockups as they become available on your project page:</p><p><a href="{{portal_link}}" style="display:inline-block;padding:14px 36px;background:#fe5900;color:#ffffff;text-decoration:none;font-weight:600;border-radius:6px;text-transform:uppercase;">View Design Progress</a></p><p>If you have any specific preferences or changes in mind, now is the perfect time to let us know.</p><p>Best,<br>The PlayerStall Team</p>',
  'design_phase',
  1
),
(
  'Production Update',
  'Your lockers are being built, {{first_name}}! | PlayerStall',
  '<p>Hi {{first_name}},</p><p>Exciting news — your custom {{sport}} lockers are now in production! Our craftsmen are hard at work bringing your design to life.</p><p><strong>Estimated completion: {{estimated_date}}</strong></p><p>Each locker is built with the same attention to detail that has defined PlayerStall for over 30 years. Your lockers are backed by our 5-year guarantee.</p><p>Track your project progress anytime:</p><p><a href="{{portal_link}}" style="display:inline-block;padding:14px 36px;background:#fe5900;color:#ffffff;text-decoration:none;font-weight:600;border-radius:6px;text-transform:uppercase;">Track Your Project</a></p><p>Best,<br>The PlayerStall Team</p>',
  'in_production',
  2
),
(
  'Shipping Notification',
  'Your lockers are on their way, {{first_name}}! | PlayerStall',
  '<p>Hi {{first_name}},</p><p>Your custom {{sport}} lockers have shipped and are on their way to you!</p><p>View delivery details and tracking information on your project page:</p><p><a href="{{portal_link}}" style="display:inline-block;padding:14px 36px;background:#fe5900;color:#ffffff;text-decoration:none;font-weight:600;border-radius:6px;text-transform:uppercase;">View Delivery Details</a></p><p>Please make sure your installation area is prepared and accessible for delivery. If you need any help preparing, check out our <a href="https://playerstall.com/installation-guide">installation guide</a>.</p><p>We can''t wait for your team to see them!</p><p>Best,<br>The PlayerStall Team</p>',
  'shipped',
  0
),
(
  'Installation Complete',
  'Your new lockers are installed, {{first_name}}! | PlayerStall',
  '<p>Hi {{first_name}},</p><p>Your new {{sport}} lockers are installed and ready for your team!</p><p>A few things to keep in mind:</p><ul><li>Your lockers come with our <strong>5-year guarantee</strong></li><li>Check our <a href="https://playerstall.com/warranty">care &amp; warranty page</a> for maintenance tips</li><li>Your project page has all your documents and photos: <a href="{{portal_link}}">View Project</a></li></ul><p>We''d love to hear what your team thinks! If you have a moment, we''d really appreciate a quick testimonial or photo to share.</p><p>Thank you for choosing PlayerStall.</p><p>Best,<br>The PlayerStall Team</p>',
  'installed',
  1
),
(
  'Gentle Quote Follow-Up',
  'Checking in on your locker quote, {{first_name}} | PlayerStall',
  '<p>Hi {{first_name}},</p><p>Just wanted to check in — we sent over a quote for your {{sport}} locker project about a week ago, and wanted to make sure you had a chance to review it.</p><p>You can view the full details anytime here:</p><p><a href="{{portal_link}}" style="display:inline-block;padding:14px 36px;background:#fe5900;color:#ffffff;text-decoration:none;font-weight:600;border-radius:6px;text-transform:uppercase;">View Your Quote</a></p><p>If you have any questions, need adjustments to the design, or want to discuss pricing — we''re here to help. No pressure at all.</p><p>Best,<br>The PlayerStall Team</p>',
  NULL,
  0
),
(
  '30-Day Check-In',
  'How are the new lockers, {{first_name}}? | PlayerStall',
  '<p>Hi {{first_name}},</p><p>It''s been about a month since your new {{sport}} lockers were installed, and we wanted to check in.</p><p>How is everything working out? Is your team enjoying the new setup?</p><p>If there''s anything we can help with — adjustments, additional accessories, or maintenance questions — just let us know.</p><p>And if your team is happy with the lockers, we''d be thrilled if you could share a quick testimonial or photo. It really helps other programs find us.</p><p>Thank you again for trusting PlayerStall with your locker room.</p><p>Best,<br>The PlayerStall Team</p>',
  NULL,
  0
),
(
  'Annual Warranty Reminder',
  'Your PlayerStall warranty check-in | PlayerStall',
  '<p>Hi {{first_name}},</p><p>Just a friendly reminder that your PlayerStall lockers are covered by our 5-year guarantee.</p><p>If you need any maintenance, repairs, or have questions about your warranty coverage, we''re always here to help. You can also check our <a href="https://playerstall.com/warranty">warranty &amp; care page</a> for tips.</p><p>Thinking about expanding or upgrading? We''d love to work with you again.</p><p>Best,<br>The PlayerStall Team</p>',
  NULL,
  0
),
(
  'Fundraising & Funding Ideas (Room Planner)',
  'Ideas to help fund your locker project, {{first_name}} | PlayerStall',
  '<p>Hi {{first_name}},</p><p>Thank you for sharing that <strong>{{company_name}}</strong> is working on fundraising for your {{sport}} locker project. We saw that in your room planner notes — and we want you to know we''re rooting for you. A great locker room is absolutely worth the effort, and many schools and programs have successfully closed the gap with a mix of the ideas below.</p><p><strong>Ideas that work well in the U.S.</strong></p><ul><li><strong>Athletic booster club</strong> — dedicated campaigns, annual drives, or a line item for facility improvements</li><li><strong>Corporate &amp; local sponsors</strong> — naming rights on locker plaques, donor walls, or end panels (check district/athletic association rules)</li><li><strong>Alumni &amp; community giving</strong> — targeted appeals, giving days, or small-donor crowdfunding</li><li><strong>Events</strong> — tournaments, silent auctions, golf outings, or spirit-wear sales with proceeds earmarked for the locker room</li><li><strong>Grants &amp; foundations</strong> — school foundations, education funds, and regional grants for athletics or facilities (requirements vary by state and district)</li></ul><p><strong>Ideas that work well in Canada</strong></p><ul><li><strong>Parent councils &amp; athletic associations</strong> — formal proposals for capital or equipment budgets</li><li><strong>Municipal &amp; provincial programs</strong> — recreation, facility, or healthy communities grants (eligibility varies by province)</li><li><strong>Community partners</strong> — local businesses, service clubs, and alumni networks</li><li><strong>Kids'' sport &amp; access programs</strong> — programs such as Jumpstart (Canadian Tire) and similar regional initiatives where your project qualifies</li><li><strong>Fundraising events</strong> — same spirit as in the U.S.: tournaments, auctions, and team-led campaigns</li></ul><p>We''re happy to provide <strong>renderings, a simple one-pager, or a ballpark summary</strong> you can attach to grant or donor packets — reply and tell us what would help your committee.</p><p>You can always review your project and documents here:</p><p><a href="{{portal_link}}" style="display:inline-block;padding:14px 36px;background:#fe5900;color:#ffffff;text-decoration:none;font-weight:600;border-radius:6px;text-transform:uppercase;">View Your Project</a></p><p>If you''d like to brainstorm what has worked for other {{sport}} programs, call us at <strong>1 888 584 1444</strong> or reply to this email. We''re here to help you get across the finish line.</p><p>Best,<br>The PlayerStall Team</p>',
  NULL,
  0
);

-- ============================================================
-- SEED: Custom Sport Lockers email templates (disabled by default)
-- ============================================================

INSERT INTO email_templates (name, subject, body, stage_trigger, delay_hours, company, enabled) VALUES
(
  'Inquiry Acknowledgment — Custom Sport Lockers',
  'Thanks for reaching out, {{first_name}}! | Custom Sport Lockers',
  '<p>Hi {{first_name}},</p><p>Thank you for your interest in Custom Sport Lockers custom wood lockers! We received your inquiry and wanted to let you know that one of our team members will be in touch within 24 hours.</p><p>In the meantime, here are a few things that set us apart:</p><ul><li><strong>30+ years</strong> of craftsmanship</li><li><strong>5-year guarantee</strong> on every locker</li><li><strong>Custom-built</strong> in 8-12 weeks</li><li><strong>Free design consultation</strong></li></ul><p>Feel free to browse our <a href="https://customsportslockers.com/gallery">gallery</a> to see some of our recent work.</p><p>We look forward to helping you create something special for your team.</p><p>Best,<br>The Custom Sport Lockers Team</p>',
  'new_lead',
  0,
  'custom_sport_lockers',
  false
),
(
  'Consultation Follow-Up — Custom Sport Lockers',
  'Great talking with you, {{first_name}}! | Custom Sport Lockers',
  '<p>Hi {{first_name}},</p><p>Thank you for taking the time to speak with us about your {{sport}} locker project. It was great learning about what you''re looking for.</p><p>Here''s a quick recap of what we discussed:</p><p><em>{{consultation_notes}}</em></p><p>Our next step is to put together a detailed quote based on your requirements. You can expect to hear from us within the next few business days.</p><p>If you think of any additional questions in the meantime, don''t hesitate to reach out.</p><p>Best,<br>The Custom Sport Lockers Team</p>',
  'consultation',
  1,
  'custom_sport_lockers',
  false
),
(
  'Quote Delivery — Custom Sport Lockers',
  'Your custom locker quote is ready, {{first_name}}! | Custom Sport Lockers',
  '<p>Hi {{first_name}},</p><p>Great news — your custom quote for {{order_title}} is ready!</p><p><strong>Quoted Amount: {{quoted_amount}}</strong></p><p>You can view all the details, download the quote, and track your project anytime at your personal project page:</p><p><a href="{{portal_link}}" style="display:inline-block;padding:14px 36px;background:#fe5900;color:#ffffff;text-decoration:none;font-weight:600;border-radius:6px;text-transform:uppercase;">View Your Project</a></p><p>This quote is valid for 30 days. If you have any questions or would like to make adjustments, just reply to this email or give us a call.</p><p>We''d love to build something great for your team.</p><p>Best,<br>The Custom Sport Lockers Team</p>',
  'quote_sent',
  0,
  'custom_sport_lockers',
  false
),
(
  'Order Confirmation — Custom Sport Lockers',
  'Welcome aboard, {{first_name}}! Your project is underway | Custom Sport Lockers',
  '<p>Hi {{first_name}},</p><p>This is exciting — your {{sport}} locker project is officially underway!</p><p>Here''s what to expect next:</p><ol><li><strong>Design Phase</strong> — Our team will begin working on your custom locker design</li><li><strong>Your Approval</strong> — We''ll share design mockups for your review</li><li><strong>Production</strong> — Once approved, we begin crafting your lockers</li><li><strong>Delivery &amp; Installation</strong> — Estimated completion: {{estimated_date}}</li></ol><p>You can track every step of the process at your project page:</p><p><a href="{{portal_link}}" style="display:inline-block;padding:14px 36px;background:#fe5900;color:#ffffff;text-decoration:none;font-weight:600;border-radius:6px;text-transform:uppercase;">Track Your Project</a></p><p>Thank you for choosing Custom Sport Lockers. We take great pride in every locker we build.</p><p>Best,<br>The Custom Sport Lockers Team</p>',
  'quote_approved',
  2,
  'custom_sport_lockers',
  false
),
(
  'Design Phase Update — Custom Sport Lockers',
  'Your locker design is in progress, {{first_name}} | Custom Sport Lockers',
  '<p>Hi {{first_name}},</p><p>Quick update — our design team has started working on your custom {{sport}} lockers. We''re putting careful thought into every detail to make sure your locker room looks and functions exactly how you envisioned.</p><p>You''ll be able to view design updates and mockups as they become available on your project page:</p><p><a href="{{portal_link}}" style="display:inline-block;padding:14px 36px;background:#fe5900;color:#ffffff;text-decoration:none;font-weight:600;border-radius:6px;text-transform:uppercase;">View Design Progress</a></p><p>If you have any specific preferences or changes in mind, now is the perfect time to let us know.</p><p>Best,<br>The Custom Sport Lockers Team</p>',
  'design_phase',
  1,
  'custom_sport_lockers',
  false
),
(
  'Production Update — Custom Sport Lockers',
  'Your lockers are being built, {{first_name}}! | Custom Sport Lockers',
  '<p>Hi {{first_name}},</p><p>Exciting news — your custom {{sport}} lockers are now in production! Our craftsmen are hard at work bringing your design to life.</p><p><strong>Estimated completion: {{estimated_date}}</strong></p><p>Each locker is built with the same attention to detail that has defined Custom Sport Lockers for over 30 years. Your lockers are backed by our 5-year guarantee.</p><p>Track your project progress anytime:</p><p><a href="{{portal_link}}" style="display:inline-block;padding:14px 36px;background:#fe5900;color:#ffffff;text-decoration:none;font-weight:600;border-radius:6px;text-transform:uppercase;">Track Your Project</a></p><p>Best,<br>The Custom Sport Lockers Team</p>',
  'in_production',
  2,
  'custom_sport_lockers',
  false
),
(
  'Shipping Notification — Custom Sport Lockers',
  'Your lockers are on their way, {{first_name}}! | Custom Sport Lockers',
  '<p>Hi {{first_name}},</p><p>Your custom {{sport}} lockers have shipped and are on their way to you!</p><p>View delivery details and tracking information on your project page:</p><p><a href="{{portal_link}}" style="display:inline-block;padding:14px 36px;background:#fe5900;color:#ffffff;text-decoration:none;font-weight:600;border-radius:6px;text-transform:uppercase;">View Delivery Details</a></p><p>Please make sure your installation area is prepared and accessible for delivery. If you need any help preparing, check out our <a href="https://customsportslockers.com/installation-guide">installation guide</a>.</p><p>We can''t wait for your team to see them!</p><p>Best,<br>The Custom Sport Lockers Team</p>',
  'shipped',
  0,
  'custom_sport_lockers',
  false
),
(
  'Installation Complete — Custom Sport Lockers',
  'Your new lockers are installed, {{first_name}}! | Custom Sport Lockers',
  '<p>Hi {{first_name}},</p><p>Your new {{sport}} lockers are installed and ready for your team!</p><p>A few things to keep in mind:</p><ul><li>Your lockers come with our <strong>5-year guarantee</strong></li><li>Check our <a href="https://customsportslockers.com/warranty">care &amp; warranty page</a> for maintenance tips</li><li>Your project page has all your documents and photos: <a href="{{portal_link}}">View Project</a></li></ul><p>We''d love to hear what your team thinks! If you have a moment, we''d really appreciate a quick testimonial or photo to share.</p><p>Thank you for choosing Custom Sport Lockers.</p><p>Best,<br>The Custom Sport Lockers Team</p>',
  'installed',
  1,
  'custom_sport_lockers',
  false
),
(
  'Gentle Quote Follow-Up — Custom Sport Lockers',
  'Checking in on your locker quote, {{first_name}} | Custom Sport Lockers',
  '<p>Hi {{first_name}},</p><p>Just wanted to check in — we sent over a quote for your {{sport}} locker project about a week ago, and wanted to make sure you had a chance to review it.</p><p>You can view the full details anytime here:</p><p><a href="{{portal_link}}" style="display:inline-block;padding:14px 36px;background:#fe5900;color:#ffffff;text-decoration:none;font-weight:600;border-radius:6px;text-transform:uppercase;">View Your Quote</a></p><p>If you have any questions, need adjustments to the design, or want to discuss pricing — we''re here to help. No pressure at all.</p><p>Best,<br>The Custom Sport Lockers Team</p>',
  NULL,
  0,
  'custom_sport_lockers',
  false
),
(
  '30-Day Check-In — Custom Sport Lockers',
  'How are the new lockers, {{first_name}}? | Custom Sport Lockers',
  '<p>Hi {{first_name}},</p><p>It''s been about a month since your new {{sport}} lockers were installed, and we wanted to check in.</p><p>How is everything working out? Is your team enjoying the new setup?</p><p>If there''s anything we can help with — adjustments, additional accessories, or maintenance questions — just let us know.</p><p>And if your team is happy with the lockers, we''d be thrilled if you could share a quick testimonial or photo. It really helps other programs find us.</p><p>Thank you again for trusting Custom Sport Lockers with your locker room.</p><p>Best,<br>The Custom Sport Lockers Team</p>',
  NULL,
  0,
  'custom_sport_lockers',
  false
),
(
  'Annual Warranty Reminder — Custom Sport Lockers',
  'Your Custom Sport Lockers warranty check-in | Custom Sport Lockers',
  '<p>Hi {{first_name}},</p><p>Just a friendly reminder that your wood lockers from Custom Sport Lockers are covered by our 5-year guarantee.</p><p>If you need any maintenance, repairs, or have questions about your warranty coverage, we''re always here to help. You can also check our <a href="https://customsportslockers.com/warranty">warranty &amp; care page</a> for tips.</p><p>Thinking about expanding or upgrading? We''d love to work with you again.</p><p>Best,<br>The Custom Sport Lockers Team</p>',
  NULL,
  0,
  'custom_sport_lockers',
  false
);
