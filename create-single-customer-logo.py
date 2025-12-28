#!/usr/bin/env python3
"""
Script to create a single black and white customer logo image.
"""

from PIL import Image, ImageOps
import os
import sys

def convert_to_bw(image_path):
    """Convert an image to black and white."""
    try:
        img = Image.open(image_path)
        # Convert to RGB if needed (handles RGBA, P, etc.)
        if img.mode != 'RGB':
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'RGBA':
                rgb_img.paste(img, mask=img.split()[3])  # Use alpha channel as mask
            else:
                rgb_img.paste(img)
            img = rgb_img
        
        # Convert to grayscale
        gray = ImageOps.grayscale(img)
        # Enhance contrast for better black and white effect
        bw = ImageOps.autocontrast(gray)
        return bw
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
        return None

def create_single_logo_image():
    """Create a single black and white customer logo image."""
    
    # Customer logos directory
    logos_dir = "customer-logos"
    output_path = "public/images/customer-logo-bw.png"
    
    # Find the first available logo
    logo_path = None
    
    # Check customer-logos directory first
    if os.path.exists(logos_dir):
        for filename in sorted(os.listdir(logos_dir)):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                logo_path = os.path.join(logos_dir, filename)
                break
    
    # Fallback to Estevan Bears logo
    if not logo_path or not os.path.exists(logo_path):
        logo_path = "/tmp/estevan-bears-logo.png"
    
    if not os.path.exists(logo_path):
        print("No customer logo found. Please add a logo to the 'customer-logos' directory.")
        return False
    
    # Convert to black and white
    bw_logo = convert_to_bw(logo_path)
    if not bw_logo:
        return False
    
    # Add some padding for a clean look
    padding = 40
    final_width = bw_logo.width + (padding * 2)
    final_height = bw_logo.height + (padding * 2)
    
    # Create white canvas with padding
    canvas = Image.new('RGB', (final_width, final_height), color='white')
    canvas.paste(bw_logo, (padding, padding))
    
    # Save the image
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    canvas.save(output_path, 'PNG', optimize=True)
    print(f"✓ Created single customer logo image: {output_path}")
    print(f"  Dimensions: {final_width}x{final_height}px")
    
    return True

if __name__ == "__main__":
    success = create_single_logo_image()
    sys.exit(0 if success else 1)


