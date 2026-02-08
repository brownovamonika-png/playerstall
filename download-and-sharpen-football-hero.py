#!/usr/bin/env python3
"""
Download the football hero image from the Top Scorer model site,
sharpen it, and save to public/images/topscorer for the sport page.
"""

import io
import urllib.request
from pathlib import Path

try:
    from PIL import Image, ImageFilter, ImageEnhance
except ImportError:
    print("Install Pillow: pip install Pillow")
    raise

# Model site (Top Scorer) – football hero is h1-img-2 (2020/01)
SOURCE_URL = "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h1-img-2.jpg"
OUTPUT_DIR = Path(__file__).resolve().parent / "public" / "images" / "topscorer"
OUTPUT_FILE = OUTPUT_DIR / "football-hero-our-team.jpg"

REQUEST_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
}


def download_image(url: str) -> bytes:
    req = urllib.request.Request(url, headers=REQUEST_HEADERS)
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read()


def sharpen(img: Image.Image, factor: float = 1.8) -> Image.Image:
    """Sharpen with UnsharpMask then boost with Sharpness enhancer."""
    # Unsharp mask: radius (pixels), percent (strength), threshold (0 = sharpen all)
    img = img.filter(ImageFilter.UnsharpMask(radius=1.5, percent=120, threshold=2))
    enhancer = ImageEnhance.Sharpness(img)
    return enhancer.enhance(factor)


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Downloading: {SOURCE_URL}")
    data = download_image(SOURCE_URL)
    img = Image.open(io.BytesIO(data))
    if img.mode != "RGB":
        img = img.convert("RGB")
    print("Sharpening...")
    sharp = sharpen(img)
    sharp.save(OUTPUT_FILE, "JPEG", quality=90, optimize=True)
    print(f"Saved: {OUTPUT_FILE}")
    print("Use in sport page as: /images/topscorer/football-hero-our-team.jpg")


if __name__ == "__main__":
    main()
