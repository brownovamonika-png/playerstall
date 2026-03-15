#!/usr/bin/env python3
"""Make name plate image backgrounds (black) transparent and resize."""
from PIL import Image
import os

def process_dark_bg(path_in, path_out, bg_dark_threshold=50, max_width=135):
    img = Image.open(path_in).convert("RGBA")
    w, h = img.size
    data = img.getdata()
    new_data = []
    for item in data:
        r, g, b, a = item
        if r <= bg_dark_threshold and g <= bg_dark_threshold and b <= bg_dark_threshold:
            new_data.append((r, g, b, 0))
        else:
            new_data.append(item)
    img.putdata(new_data)
    if w > max_width:
        ratio = max_width / w
        new_w = max_width
        new_h = int(h * ratio)
        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    img.save(path_out, "PNG", optimize=True)
    print(f"Saved {path_out} ({img.size[0]}x{img.size[1]})")

base = os.path.join(os.path.dirname(__file__), "..", "public", "images")
process_dark_bg(os.path.join(base, "name-plate-black.png"), os.path.join(base, "name-plate-black.png"), bg_dark_threshold=50, max_width=135)
process_dark_bg(os.path.join(base, "name-plate-silver.png"), os.path.join(base, "name-plate-silver.png"), bg_dark_threshold=50, max_width=135)
