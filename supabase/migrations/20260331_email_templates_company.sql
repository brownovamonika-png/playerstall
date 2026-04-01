-- Existing CRM databases: add sender company per template (run once in SQL Editor).
ALTER TABLE email_templates
  ADD COLUMN IF NOT EXISTS company TEXT NOT NULL DEFAULT 'playerstall';

ALTER TABLE email_templates
  DROP CONSTRAINT IF EXISTS email_templates_company_check;

ALTER TABLE email_templates
  ADD CONSTRAINT email_templates_company_check
  CHECK (company IN ('playerstall', 'custom_sport_lockers'));
