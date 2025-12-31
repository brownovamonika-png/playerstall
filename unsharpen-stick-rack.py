#!/usr/bin/env python3
from PIL import Image, ImageFilter

# Open the stick rack image
img_path = 'public/stick-rack.png'
img = Image.open(img_path)

# Apply smoothing filter to counteract sharpening
smoothed = img.filter(ImageFilter.SMOOTH)
smoothed = smoothed.filter(ImageFilter.SMOOTH_MORE)

# Save the smoothed image
smoothed.save(img_path, 'PNG', quality=95)
print(f"Smoothed image saved to {img_path}")
