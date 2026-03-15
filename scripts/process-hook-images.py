#!/usr/bin/env python3
"""Make hook image backgrounds transparent and resize, keeping all text."""
from PIL import Image
import os

def process(path_in, path_out, bg_threshold=230, max_width=180):
    img = Image.open(path_in).convert("RGBA")
    w, h = img.size
    data = img.getdata()
    new_data = []
    for item in data:
        r, g, b, a = item
        # Make white/light grey background transparent
        if r >= bg_threshold and g >= bg_threshold and b >= bg_threshold:
            new_data.append((r, g, b, 0))
        else:
            new_data.append(item)
    img.putdata(new_data)

    # Resize: scale to max_width keeping aspect ratio
    if w > max_width:
        ratio = max_width / w
        new_w = max_width
        new_h = int(h * ratio)
        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    img.save(path_out, "PNG", optimize=True)
    print(f"Saved {path_out} ({img.size[0]}x{img.size[1]})")

base = os.path.join(os.path.dirname(__file__), "..", "public", "images")
# 25% smaller than previous: max_width 135 (75% of 180)
process(os.path.join(base, "hook-black.png"), os.path.join(base, "hook-black.png"), bg_threshold=235, max_width=135)
process(os.path.join(base, "hook-silver.png"), os.path.join(base, "hook-silver.png"), bg_threshold=235, max_width=135)
