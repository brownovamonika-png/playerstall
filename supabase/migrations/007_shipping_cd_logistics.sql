-- Pallet / shipping reference (Essential vs Premium) + C & D Logistics memo template

CREATE TABLE shipping_pallet_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_tier TEXT NOT NULL UNIQUE CHECK (product_tier IN ('essential', 'premium')),
  label TEXT NOT NULL,
  pallet_length_in NUMERIC(8, 2),
  pallet_width_in NUMERIC(8, 2),
  pallet_height_in NUMERIC(8, 2),
  weight_lb NUMERIC(10, 2),
  lockers_per_pallet_note TEXT,
  packing_notes TEXT,
  handling_instructions TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER shipping_pallet_profiles_updated_at
  BEFORE UPDATE ON shipping_pallet_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE shipping_pallet_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY admin_all_shipping_profiles ON shipping_pallet_profiles
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO shipping_pallet_profiles (
  product_tier, label, pallet_length_in, pallet_width_in, pallet_height_in, weight_lb,
  lockers_per_pallet_note, packing_notes, handling_instructions
) VALUES
(
  'essential',
  'Essential lockers (Semi Pro, Varsity, Pro Locker, Stadium)',
  96, 48, 72,
  1200,
  'Typical: edit based on your flat-pack counts per order.',
  'Flat-pack wood locker kits; banded to standard pallet. Edit dimensions/weight to match actual build.',
  'Forklift from side; do not double-stack unless approved. Update per your SOP.'
),
(
  'premium',
  'Premium lockers (Models X, Z, S, L)',
  96, 48, 84,
  1650,
  'Typical: premium units often taller/heavier — confirm per order.',
  'Premium flat-pack / crated assemblies; confirm strap pattern with warehouse.',
  'Heavier than Essential; verify dock equipment. Update per your SOP.'
)
ON CONFLICT (product_tier) DO NOTHING;

CREATE TABLE logistics_carrier_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_slug TEXT NOT NULL UNIQUE,
  carrier_display_name TEXT NOT NULL DEFAULT 'C & D Logistics',
  email_subject_template TEXT NOT NULL DEFAULT 'Shipment — PlayerStall — {{reference}}',
  attachment_body_template TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER logistics_carrier_templates_updated_at
  BEFORE UPDATE ON logistics_carrier_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE logistics_carrier_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY admin_all_logistics_templates ON logistics_carrier_templates
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO logistics_carrier_templates (carrier_slug, carrier_display_name, email_subject_template, attachment_body_template)
VALUES (
  'cd_logistics',
  'C & D Logistics',
  'Shipment request — PlayerStall — {{reference}}',
  'C & D LOGISTICS — SHIPMENT MEMO (PlayerStall)
Generated: {{generated_at}}

FROM / SHIPPER
Company: {{shipper_company}}
Contact: {{shipper_contact}}
Phone: {{shipper_phone}}

REFERENCE
Reference / PO: {{reference}}
Ship date (requested): {{ship_date}}

CONSIGNEE / DELIVER TO
{{ship_to}}

PRODUCT
Line: {{product_line}}
Locker quantity (approx): {{locker_qty}}
Number of pallets: {{pallet_qty}}

PALLET DATA (per your profile — verify before shipping)
Dimensions (L × W × H inches): {{pallet_length_in}} × {{pallet_width_in}} × {{pallet_height_in}}
Declared weight (lb, est.): {{weight_lb}}

PACKING / HANDLING NOTES
{{packing_notes}}

HANDLING INSTRUCTIONS
{{handling_instructions}}

INTERNAL NOTES
{{internal_notes}}

---
Edit this template on Admin → Shipping. Merge fields use double braces, e.g. {{reference}}.
'
)
ON CONFLICT (carrier_slug) DO NOTHING;
