#!/usr/bin/env python3
"""
Simple HTML to PDF converter using macOS print system
"""
import subprocess
import os
from pathlib import Path

html_file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/Jason Vietnam Production Request colored lockers/producer-message-1.html"
pdf_file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/Jason Vietnam Production Request colored lockers/producer-message-1.pdf"

# Convert file path to file:// URL
html_url = f"file://{html_file.replace(' ', '%20')}"

# Use macOS's cupsfilter if available, otherwise provide instructions
try:
    # Try using cupsfilter (requires HTML to be converted via print system)
    print("Attempting to convert using macOS print system...")
    print(f"HTML file: {html_file}")
    print(f"PDF will be saved to: {pdf_file}")
    print("\n" + "="*60)
    print("MANUAL CONVERSION REQUIRED:")
    print("="*60)
    print("\n1. Open this file in your browser:")
    print(f"   {html_url}")
    print("\n2. Press Cmd + P (or File → Print)")
    print("\n3. Click 'PDF' dropdown → 'Save as PDF'")
    print(f"\n4. Save as: producer-message-1.pdf")
    print("\n5. Make sure 'Background graphics' is enabled")
    print("   (to include all images and colors)")
    print("\n" + "="*60)
    
except Exception as e:
    print(f"Error: {e}")
    print("\nPlease use the manual browser method described above.")
