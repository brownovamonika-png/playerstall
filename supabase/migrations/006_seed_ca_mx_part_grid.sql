-- Pre-seed Canada & Mexico: every Essential model × part type × catalog width (qty 0).
-- Safe to re-run: conflicts on the partial unique index are ignored.

INSERT INTO inventory_stock_lines (
  region,
  tracking_mode,
  essential_model,
  part_code,
  material,
  width_inches,
  depth_inches,
  vented_front,
  lock_box_variant,
  quantity_on_hand
)
SELECT
  reg.region,
  'part',
  em.model,
  pc.code,
  'prefinished_uv',
  w.inches,
  19,
  NULL,
  NULL,
  0
FROM (VALUES ('canada'), ('mexico')) AS reg(region)
CROSS JOIN (
  VALUES
    ('Semi Pro'),
    ('Varsity'),
    ('Pro Locker'),
    ('Stadium Locker')
) AS em(model)
CROSS JOIN (
  VALUES
    ('side_support_left'),
    ('side_support_right'),
    ('front_panel'),
    ('back_panel'),
    ('side_panel'),
    ('seat_top'),
    ('shelf'),
    ('bottom_shelf'),
    ('shelf_spacers')
) AS pc(code)
CROSS JOIN (VALUES (18), (20), (22), (24), (26), (28), (30), (32)) AS w(inches)
ON CONFLICT (region, essential_model, part_code, width_inches, depth_inches, material)
  WHERE tracking_mode = 'part'
  DO NOTHING;
