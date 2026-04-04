-- Regional inventory: Canada/Mexico (UV Essential parts, 19" deep) vs Vietnam (melamine locker boxes).

CREATE TABLE inventory_stock_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  region TEXT NOT NULL CHECK (region IN ('canada', 'mexico', 'vietnam')),
  tracking_mode TEXT NOT NULL CHECK (tracking_mode IN ('part', 'locker_box')),
  essential_model TEXT,
  part_code TEXT,
  material TEXT NOT NULL,
  width_inches INT NOT NULL,
  depth_inches INT NOT NULL DEFAULT 19,
  vented_front BOOLEAN,
  lock_box_variant BOOLEAN,
  quantity_on_hand INT NOT NULL DEFAULT 0 CHECK (quantity_on_hand >= 0),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT inventory_row_shape CHECK (
    (
      tracking_mode = 'part'
      AND region IN ('canada', 'mexico')
      AND part_code IS NOT NULL
      AND essential_model IS NOT NULL
      AND material = 'prefinished_uv'
      AND depth_inches = 19
      AND vented_front IS NULL
      AND lock_box_variant IS NULL
      AND width_inches IN (18, 20, 22, 24, 26, 28, 30, 32)
    )
    OR
    (
      tracking_mode = 'locker_box'
      AND region = 'vietnam'
      AND part_code IS NULL
      AND essential_model IS NOT NULL
      AND material = 'melamine'
      AND depth_inches = 19
      AND vented_front IS TRUE
      AND lock_box_variant IS NOT NULL
      AND width_inches IN (24, 26, 28, 30)
    )
  ),
  CONSTRAINT inventory_part_codes CHECK (
    part_code IS NULL
    OR part_code IN (
      'side_support_left',
      'side_support_right',
      'front_panel',
      'back_panel',
      'side_panel',
      'seat_top',
      'shelf',
      'bottom_shelf',
      'shelf_spacers'
    )
  )
);

CREATE UNIQUE INDEX uq_inventory_part_line
  ON inventory_stock_lines (region, essential_model, part_code, width_inches, depth_inches, material)
  WHERE tracking_mode = 'part';

CREATE UNIQUE INDEX uq_inventory_locker_box_line
  ON inventory_stock_lines (region, essential_model, width_inches, lock_box_variant)
  WHERE tracking_mode = 'locker_box';

CREATE INDEX idx_inventory_region ON inventory_stock_lines(region);
CREATE INDEX idx_inventory_tracking ON inventory_stock_lines(tracking_mode);

CREATE TRIGGER inventory_stock_lines_updated_at
  BEFORE UPDATE ON inventory_stock_lines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE inventory_stock_lines ENABLE ROW LEVEL SECURITY;

CREATE POLICY admin_all_inventory ON inventory_stock_lines
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO inventory_stock_lines (
  region, tracking_mode, essential_model, part_code, material,
  width_inches, depth_inches, vented_front, lock_box_variant, quantity_on_hand
)
SELECT * FROM (VALUES
  ('vietnam', 'locker_box', 'Stadium Locker', NULL, 'melamine', 24, 19, TRUE, FALSE, 0),
  ('vietnam', 'locker_box', 'Stadium Locker', NULL, 'melamine', 24, 19, TRUE, TRUE, 0),
  ('vietnam', 'locker_box', 'Stadium Locker', NULL, 'melamine', 26, 19, TRUE, FALSE, 0),
  ('vietnam', 'locker_box', 'Stadium Locker', NULL, 'melamine', 26, 19, TRUE, TRUE, 0),
  ('vietnam', 'locker_box', 'Stadium Locker', NULL, 'melamine', 28, 19, TRUE, FALSE, 0),
  ('vietnam', 'locker_box', 'Stadium Locker', NULL, 'melamine', 28, 19, TRUE, TRUE, 0),
  ('vietnam', 'locker_box', 'Stadium Locker', NULL, 'melamine', 30, 19, TRUE, FALSE, 0),
  ('vietnam', 'locker_box', 'Stadium Locker', NULL, 'melamine', 30, 19, TRUE, TRUE, 0)
) AS v(region, tracking_mode, essential_model, part_code, material, width_inches, depth_inches, vented_front, lock_box_variant, quantity_on_hand)
WHERE NOT EXISTS (
  SELECT 1 FROM inventory_stock_lines i
  WHERE i.tracking_mode = 'locker_box' AND i.region = 'vietnam' AND i.essential_model = 'Stadium Locker'
  LIMIT 1
);
