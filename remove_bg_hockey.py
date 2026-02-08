#!/usr/bin/env python3
"""Remove background from hockey player image and save to public/images/topscorer/."""
import subprocess
import sys
from pathlib import Path

def main():
    script_dir = Path(__file__).resolve().parent
    filename = "Screenshot_2026-02-08_at_11.54.41_AM-3c56ec14-b558-4567-a62a-12fbab2566f9.png"
    # Cursor assets path (under user home)
    src = Path.home() / ".cursor/projects/Users-monikabrownova-Documents-github-player-stall-December-19-2025/assets" / filename
    if not src.exists():
        src = script_dir / "assets" / filename
    if not src.exists():
        src = script_dir / filename

    out_dir = script_dir / "public/images/topscorer"
    out_dir.mkdir(parents=True, exist_ok=True)
    out = out_dir / "hockey-player.png"

    if not src.exists():
        print("Source image not found at:", src, file=sys.stderr)
        sys.exit(1)

    try:
        from rembg import remove
        from PIL import Image
    except ImportError:
        print("rembg not found. Install with: pip install rembg pillow  (or use a venv)")
        sys.exit(1)

    print("Loading image...")
    with open(src, "rb") as f:
        input_data = f.read()
    print("Removing background...")
    output_data = remove(input_data)
    print("Saving to", out)
    with open(out, "wb") as f:
        f.write(output_data)
    print("Done:", out)

if __name__ == "__main__":
    main()
