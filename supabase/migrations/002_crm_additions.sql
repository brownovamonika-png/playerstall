-- supabase/migrations/002_crm_additions.sql
-- Incremental CRM updates after baseline (001_crm_overhaul.sql or schema.sql).
-- Safe to re-run in SQL Editor: IF NOT EXISTS / conditional insert.
-- If you already applied the full current schema.sql, this is mostly a no-op.

-- ---------------------------------------------------------------------------
-- 1) email_templates: per-brand sender (PlayerStall vs Custom Sport Lockers)
-- ---------------------------------------------------------------------------
ALTER TABLE email_templates
  ADD COLUMN IF NOT EXISTS company TEXT NOT NULL DEFAULT 'playerstall';

ALTER TABLE email_templates
  DROP CONSTRAINT IF EXISTS email_templates_company_check;

ALTER TABLE email_templates
  ADD CONSTRAINT email_templates_company_check
  CHECK (company IN ('playerstall', 'custom_sport_lockers'));

-- ---------------------------------------------------------------------------
-- 2) Fundraising support template (e.g. room planner notes mention fundraising)
-- ---------------------------------------------------------------------------
INSERT INTO email_templates (name, subject, body, stage_trigger, delay_hours, enabled, company)
SELECT
  'Fundraising & Funding Ideas (Room Planner)',
  'Ideas to help fund your locker project, {{first_name}} | PlayerStall',
  '<p>Hi {{first_name}},</p><p>Thank you for sharing that <strong>{{company_name}}</strong> is working on fundraising for your {{sport}} locker project. We saw that in your room planner notes — and we want you to know we''re rooting for you. A great locker room is absolutely worth the effort, and many schools and programs have successfully closed the gap with a mix of the ideas below.</p><p><strong>Ideas that work well in the U.S.</strong></p><ul><li><strong>Athletic booster club</strong> — dedicated campaigns, annual drives, or a line item for facility improvements</li><li><strong>Corporate &amp; local sponsors</strong> — naming rights on locker plaques, donor walls, or end panels (check district/athletic association rules)</li><li><strong>Alumni &amp; community giving</strong> — targeted appeals, giving days, or small-donor crowdfunding</li><li><strong>Events</strong> — tournaments, silent auctions, golf outings, or spirit-wear sales with proceeds earmarked for the locker room</li><li><strong>Grants &amp; foundations</strong> — school foundations, education funds, and regional grants for athletics or facilities (requirements vary by state and district)</li></ul><p><strong>Ideas that work well in Canada</strong></p><ul><li><strong>Parent councils &amp; athletic associations</strong> — formal proposals for capital or equipment budgets</li><li><strong>Municipal &amp; provincial programs</strong> — recreation, facility, or healthy communities grants (eligibility varies by province)</li><li><strong>Community partners</strong> — local businesses, service clubs, and alumni networks</li><li><strong>Kids'' sport &amp; access programs</strong> — programs such as Jumpstart (Canadian Tire) and similar regional initiatives where your project qualifies</li><li><strong>Fundraising events</strong> — same spirit as in the U.S.: tournaments, auctions, and team-led campaigns</li></ul><p>We''re happy to provide <strong>renderings, a simple one-pager, or a ballpark summary</strong> you can attach to grant or donor packets — reply and tell us what would help your committee.</p><p>You can always review your project and documents here:</p><p><a href="{{portal_link}}" style="display:inline-block;padding:14px 36px;background:#fe5900;color:#ffffff;text-decoration:none;font-weight:600;border-radius:6px;text-transform:uppercase;">View Your Project</a></p><p>If you''d like to brainstorm what has worked for other {{sport}} programs, call us at <strong>1 888 584 1444</strong> or reply to this email. We''re here to help you get across the finish line.</p><p>Best,<br>The PlayerStall Team</p>',
  NULL,
  0,
  true,
  'playerstall'
WHERE NOT EXISTS (
  SELECT 1 FROM email_templates WHERE name = 'Fundraising & Funding Ideas (Room Planner)' AND company = 'playerstall'
);
