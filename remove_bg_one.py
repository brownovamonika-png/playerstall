#!/usr/bin/env python3
"""Remove background from one image. Usage: python remove_bg_one.py <input> [output]"""
import sys
from pathlib import Path

def main():
    if len(sys.argv) < 2:
        print("Usage: python remove_bg_one.py <input> [output]", file=sys.stderr)
        sys.exit(1)
    src = Path(sys.argv[1]).resolve()
    if len(sys.argv) >= 3:
        out = Path(sys.argv[2]).resolve()
    else:
        out = src.parent / (src.stem + "-nobg.png")

    if not src.exists():
        print("Not found:", src, file=sys.stderr)
        sys.exit(1)

    from rembg import remove

    print("Loading", src, "...")
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
