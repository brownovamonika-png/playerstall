-- Optional message shown on printed estimate/invoice (typed in CRM).
ALTER TABLE orders ADD COLUMN IF NOT EXISTS estimate_customer_note TEXT;
