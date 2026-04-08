-- Manufacturer CAD form selection (Model L/X/S/Z) for orders; complements locker_type.
ALTER TABLE orders ADD COLUMN IF NOT EXISTS manufacturers_form TEXT;

COMMENT ON COLUMN orders.manufacturers_form IS 'CRM: which 24" manufacturer CAD form was selected (Model L, Model X, Model S, or Model Z); aligns with locker_type when set from picker';
