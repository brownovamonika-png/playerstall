#!/usr/bin/env python3
from PIL import Image
import urllib.request

# The stick rack was originally from /stick-rack.png (local file)
# Since we don't have a backup, we'll reload the original if it exists
# or we'll need to inform the user that we can't fully restore it

img_path = 'public/stick-rack.png'

# Since we don't have a backup of the pre-sharpened version,
# we'll apply smoothing to reduce the sharpening effect
img = Image.open(img_path)

# Apply smoothing to counteract sharpening
smoothed = img.filter(ImageFilter.SMOOTH)
smoothed = smoothed.filter(ImageFilter.SMOOTH_MORE)

smoothed.save(img_path, 'PNG', quality=95)
print(f"Applied smoothing to reduce sharpening effect on {img_path}")
