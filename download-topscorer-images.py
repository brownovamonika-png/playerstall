#!/usr/bin/env python3
"""
Download all images from Top Scorer website (topscorer.qodeinteractive.com)
Scraped image list - saves to public/images/topscorer/ by default
"""

import os
import re
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

# Output directory (relative to project root)
OUTPUT_DIR = Path(__file__).parent / "public" / "images" / "topscorer"

# Basketball images (Unsplash – orange/warm, free to use). (download_url, save_filename)
BASKETBALL_IMAGES = [
    ("https://unsplash.com/photos/7tlIJOOP7fg/download?force=true&w=800", "basketball-rim-sunset.jpg"),   # basketball rim during sunset (orange)
    ("https://unsplash.com/photos/_UbXJa5y87A/download?force=true&w=800", "basketball-hoop-orange.jpg"),   # white and orange basketball hoop
    ("https://images.unsplash.com/photo-1519869325934-2813331509ce?w=800&q=80", "basketball-lockers.jpg"),   # basketball locker room (direct CDN)
]

# Soccer images (Unsplash – orange/warm, free to use). (download_url, save_filename)
SOCCER_IMAGES = [
    ("https://unsplash.com/photos/z1gNxguQblg/download?force=true&w=800", "soccer.jpg"),   # white, orange and black soccer ball on field (warm)
]

# All image URLs (deduplicated) - from topscorer-images-list.txt
IMAGE_URLS = [
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h3-banner-img-1.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h3-banner-img-2.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h3-banner-img-3.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h1-img-2.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h3-img-1.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/03/title-about-us-2.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/our-team-title-photo.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/title-trophy-room.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/03/shop-title-img.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2019/11/romans-img.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/titans-img.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2019/11/team-logo-1.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2019/11/team-logo-5.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2019/11/team-logo-6.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h1-iwt-img-1.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h1-iwt-img-2.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h1-iwt-img-3.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h1-iwt-img-4.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h1-iwt-img-5.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h1-iwt-img-6.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h1-iwt-img-7.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h1-iwt-img-8.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2019/11/player-img-6.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2019/11/player-img-7.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2019/11/player-img-8.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2019/11/player-img-9.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/player-img-10.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/player-img-11.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/player-img-12.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/player-img-13.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/client-1.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/client-2.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/client-3.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/client-4.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/client-5.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/client-6.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/client-8.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/client-9.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/client-10.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/trophy-img-5.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/trophy-img-6.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/trophy-img-7.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/trophy-img-8.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/p3-img-trophy.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/blog-1-img-1.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/blog-1-img-2.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/blog-1-img-3.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/blog-1-img-4.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/blog-1-masonry-img-1.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/blog-1-masonry-img-2.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/blog-1-masonry-img-3.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/blog-1-masonry-img-4.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/blog-1-masonry-img-5.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/blog-1-masonry-img-6.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/blog-1-masonry-img-7.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/blog-1-masonry-img-8.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h2-blog-img-1-1.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h2-blog-img-2-1.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h2-blog-img-3-1.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h2-blog-img-4-1.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/h2-blog-img-5.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/h2-blog-img-6.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/h2-blog-img-7.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/h2-blog-img-8.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h3-blog-img-1.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h3-blog-img-2.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h3-blog-img-3.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/h3-blog-img-4.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/h3-blog-img-5.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/h3-blog-img-6.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/h3-blog-img-7.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-1-3-300x420.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-2-1-300x420.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-3-300x420.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-4-300x420.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-5-300x420.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-6-300x420.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-7-300x420.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-8-300x420.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-9-300x420.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-1-3-650x800.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-2-1-650x800.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-5-650x800.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-7-650x800.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-8-650x800.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/shop-img-9-650x800.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h1-img-7.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h1-img-9.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/h1-img-9.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h2-img-4.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/p3-img.jpg",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/baseball-player.png",
    # --- MISSING HOMEPAGE IMAGES (from live site) ---
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2019/12/heder-banner.jpg",  # main hero slider
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h1-img-4.jpg",     # section background
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/h1-img-6.jpg",     # section background
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/02/h1-img-8.jpg",     # section image
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/sidearea-icons-img-1.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/sidearea-icons-img-2.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/sidearea-icons-img-3.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/01/sidearea-icons-img-4.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/03/logo.png",
    "https://topscorer.qodeinteractive.com/wp-content/uploads/2020/03/logo-footer.png",
]

# Custom User-Agent to avoid blocks
REQUEST_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
}


def sanitize_filename(url: str) -> str:
    """Create a safe filename from URL path."""
    parsed = urlparse(url)
    name = os.path.basename(parsed.path)
    # Replace problematic chars
    name = re.sub(r"[^\w\-\.]", "_", name)
    return name


def download_image(url: str, out_dir: Path) -> bool:
    """Download single image. Returns True on success."""
    try:
        req = urllib.request.Request(url, headers=REQUEST_HEADERS)
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
        filename = sanitize_filename(url)
        out_path = out_dir / filename
        out_path.write_bytes(data)
        return True
    except Exception as e:
        print(f"  ❌ Failed: {e}")
        return False


def download_basketball_image(url: str, out_path: Path) -> bool:
    """Download image from URL (follows redirects for Unsplash). Returns True on success."""
    try:
        req = urllib.request.Request(url, headers=REQUEST_HEADERS)
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
        out_path.write_bytes(data)
        return True
    except Exception as e:
        print(f"  ❌ Failed: {e}")
        return False


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Downloading {len(IMAGE_URLS)} images to: {OUTPUT_DIR}")
    print("-" * 50)
    ok = 0
    for i, url in enumerate(IMAGE_URLS, 1):
        name = sanitize_filename(url)
        print(f"[{i}/{len(IMAGE_URLS)}] {name}...", end=" ")
        if download_image(url, OUTPUT_DIR):
            ok += 1
            print("✓")
        else:
            print("✗")
    print("-" * 50)
    print(f"Done. {ok}/{len(IMAGE_URLS)} images saved.")

    # Basketball images (Unsplash – orange/warm style)
    print("\nBasketball images (Unsplash, orange-themed):")
    print("-" * 50)
    for i, (url, filename) in enumerate(BASKETBALL_IMAGES, 1):
        out_path = OUTPUT_DIR / filename
        print(f"[{i}/{len(BASKETBALL_IMAGES)}] {filename}...", end=" ")
        if download_basketball_image(url, out_path):
            ok += 1
            print("✓")
        else:
            print("✗")
    print("-" * 50)

    # Soccer images (Unsplash – same style)
    print("\nSoccer images (Unsplash):")
    print("-" * 50)
    for i, (url, filename) in enumerate(SOCCER_IMAGES, 1):
        out_path = OUTPUT_DIR / filename
        print(f"[{i}/{len(SOCCER_IMAGES)}] {filename}...", end=" ")
        if download_basketball_image(url, out_path):
            ok += 1
            print("✓")
        else:
            print("✗")
    print("-" * 50)
    print(f"\nUse in your site as: /images/topscorer/<filename>")
    print("Basketball: /images/topscorer/basketball-dribble.png (or basketball-rim-sunset.jpg). Soccer: /images/topscorer/soccer.jpg")


if __name__ == "__main__":
    main()
