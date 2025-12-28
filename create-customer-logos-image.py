#!/usr/bin/env python3
"""
Script to combine all customer logos into a single black and white image.
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

def create_customer_logos_image():
    """Create a single image with all customer logos in black and white."""
    
    # Customer logos directory
    logos_dir = "customer-logos"
    output_path = "public/images/customer-logos-combined-bw.png"
    
    # Create logos directory if it doesn't exist
    os.makedirs(logos_dir, exist_ok=True)
    
    # List of customer logos (add more as you find them)
    customer_logos = [
        {
            "name": "Estevan Bears",
            "path": "/tmp/estevan-bears-logo.png"
        }
    ]
    
    # Check for logos in the customer-logos directory
    if os.path.exists(logos_dir):
        for filename in os.listdir(logos_dir):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.svg')):
                customer_logos.append({
                    "name": os.path.splitext(filename)[0],
                    "path": os.path.join(logos_dir, filename)
                })
    
    # Process logos
    processed_logos = []
    for logo_info in customer_logos:
        if os.path.exists(logo_info["path"]):
            bw_logo = convert_to_bw(logo_info["path"])
            if bw_logo:
                processed_logos.append({
                    "name": logo_info["name"],
                    "image": bw_logo
                })
        else:
            print(f"Warning: Logo not found: {logo_info['path']}")
    
    if not processed_logos:
        print("No customer logos found. Please add logos to the 'customer-logos' directory.")
        return False
    
    # Calculate grid dimensions
    num_logos = len(processed_logos)
    cols = min(4, num_logos)  # Max 4 columns
    rows = (num_logos + cols - 1) // cols  # Ceiling division
    
    # Standardize logo sizes (resize to fit in grid cells)
    cell_width = 300
    cell_height = 300
    padding = 20
    spacing = 20
    
    # Resize all logos to fit in cells
    resized_logos = []
    for logo_data in processed_logos:
        img = logo_data["image"]
        # Maintain aspect ratio
        img.thumbnail((cell_width - padding * 2, cell_height - padding * 2), Image.Resampling.LANCZOS)
        resized_logos.append({
            "name": logo_data["name"],
            "image": img
        })
    
    # Create canvas
    canvas_width = cols * cell_width + (cols - 1) * spacing
    canvas_height = rows * cell_height + (rows - 1) * spacing
    canvas = Image.new('RGB', (canvas_width, canvas_height), color='white')
    
    # Place logos on canvas
    for idx, logo_data in enumerate(resized_logos):
        row = idx // cols
        col = idx % cols
        
        x = col * (cell_width + spacing) + (cell_width - logo_data["image"].width) // 2
        y = row * (cell_height + spacing) + (cell_height - logo_data["image"].height) // 2
        
        canvas.paste(logo_data["image"], (x, y))
    
    # Save the combined image
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    canvas.save(output_path, 'PNG', optimize=True)
    print(f"✓ Created combined customer logos image: {output_path}")
    print(f"  Total logos: {num_logos}")
    print(f"  Dimensions: {canvas_width}x{canvas_height}px")
    
    return True

if __name__ == "__main__":
    success = create_customer_logos_image()
    sys.exit(0 if success else 1)


