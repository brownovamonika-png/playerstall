-- Fundraising / funding status (matches new room planner Step 1 select)
ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS fundraising_status TEXT;

COMMENT ON COLUMN clients.fundraising_status IS 'Room-planner-aligned codes: have_funds, need_funding, fundraising, unsure';
