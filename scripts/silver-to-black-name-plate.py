#!/usr/bin/env python3
"""Create black name plate from silver: recolor silver image to black, save as name-plate-black.png."""
from PIL import Image
import os

base = os.path.join(os.path.dirname(__file__), "..", "public", "images")
silver_path = os.path.join(base, "name-plate-silver.png")
black_path = os.path.join(base, "name-plate-black.png")

img = Image.open(silver_path).convert("RGBA")
data = img.getdata()
new_data = []
for item in data:
    r, g, b, a = item
    if a > 10:  # visible pixel: make it black
        new_data.append((0, 0, 0, a))
    else:
        new_data.append(item)
img.putdata(new_data)
img.save(black_path, "PNG", optimize=True)
print(f"Saved {black_path} ({img.size[0]}x{img.size[1]}) – black version of silver name plate")
