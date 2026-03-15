#!/usr/bin/env python3
"""Remove black background from Pro Locker image and match Semi Pro size (682x1024)."""
from PIL import Image
import os

def process(path_in, path_out, bg_dark_threshold=40):
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
    img.save(path_out, "PNG", optimize=True)
    print(f"Saved {path_out} ({img.size[0]}x{img.size[1]}, transparent background)")

base = os.path.join(os.path.dirname(__file__), "..", "public", "images")
semi_pro_path = os.path.join(base, "semi-pro-locker-new.png")
pro_path = os.path.join(base, "pro-locker.png")

# Get target size from Semi Pro
if os.path.exists(semi_pro_path):
    semi = Image.open(semi_pro_path)
    target_w, target_h = semi.size
    print(f"Target size from Semi Pro: {target_w}x{target_h}")
else:
    target_w, target_h = 682, 1024

process(pro_path, pro_path, bg_dark_threshold=40)

# Resize to match Semi Pro if dimensions differ
img = Image.open(pro_path).convert("RGBA")
if img.size != (target_w, target_h):
    img = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    img.save(pro_path, "PNG", optimize=True)
    print(f"Resized to {target_w}x{target_h}")
