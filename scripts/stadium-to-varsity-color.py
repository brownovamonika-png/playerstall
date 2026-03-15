#!/usr/bin/env python3
"""Recolor stadium locker image to match varsity locker wood color (for Essential Lockers card)."""
from PIL import Image
import os
import colorsys

def rgb_to_hsv(r, g, b):
    r, g, b = r / 255.0, g / 255.0, b / 255.0
    h, s, v = colorsys.rgb_to_hsv(r, g, b)
    return h, s, v

def hsv_to_rgb(h, s, v):
    r, g, b = colorsys.hsv_to_rgb(h, s, v)
    return int(round(r * 255)), int(round(g * 255)), int(round(b * 255))

def main():
    base = os.path.join(os.path.dirname(__file__), "..", "public", "images")
    varsity_path = os.path.join(base, "varsity-locker.png")
    stadium_path = os.path.join(base, "stadium-locker-side.png")
    out_path = os.path.join(base, "stadium-locker-side-varsity.png")

    varsity = Image.open(varsity_path).convert("RGBA")
    varsity_data = varsity.getdata()
    # Sample varsity wood color: average of non-transparent, mid-tone pixels (avoid background)
    r_sum, g_sum, b_sum, n = 0, 0, 0, 0
    for p in varsity_data:
        r, g, b, a = p
        if a > 128 and (r + g + b) > 100 and (r + g + b) < 600:
            r_sum += r
            g_sum += g
            b_sum += b
            n += 1
    if n == 0:
        r_avg, g_avg, b_avg = 76, 62, 40
    else:
        r_avg = r_sum // n
        g_avg = g_sum // n
        b_avg = b_sum // n
    v_h, v_s, v_v = rgb_to_hsv(r_avg, g_avg, b_avg)
    print(f"Varsity wood color RGB: ({r_avg}, {g_avg}, {b_avg}) -> HSV H={v_h:.2f} S={v_s:.2f} V={v_v:.2f}")

    stadium = Image.open(stadium_path).convert("RGBA")
    w, h = stadium.size
    data = stadium.getdata()
    new_data = []
    for item in data:
        r, g, b, a = item
        if a < 10:
            new_data.append(item)
            continue
        lum = (r + g + b) / 3.0
        # Map stadium luminance to value; keep varsity hue and saturation
        new_v = min(1.0, (lum / 255.0) * 1.2)
        nr, ng, nb = hsv_to_rgb(v_h, v_s, new_v)
        new_data.append((nr, ng, nb, a))
    stadium.putdata(new_data)
    stadium.save(out_path, "PNG", optimize=True)
    print(f"Saved {out_path} ({w}x{h})")

if __name__ == "__main__":
    main()
