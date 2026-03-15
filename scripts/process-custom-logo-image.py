#!/usr/bin/env python3
"""Make custom logo image background (black) transparent and resize."""
from PIL import Image
import os

path = os.path.join(os.path.dirname(__file__), "..", "public", "images", "custom-logo-example.png")
img = Image.open(path).convert("RGBA")
w, h = img.size
data = img.getdata()
new_data = []
bg_dark = 45  # make near-black background transparent
for item in data:
    r, g, b, a = item
    if r <= bg_dark and g <= bg_dark and b <= bg_dark:
        new_data.append((r, g, b, 0))
    else:
        new_data.append(item)
img.putdata(new_data)
max_width = 135
if w > max_width:
    ratio = max_width / w
    new_w = max_width
    new_h = int(h * ratio)
    img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
img.save(path, "PNG", optimize=True)
print(f"Saved {path} ({img.size[0]}x{img.size[1]})")
