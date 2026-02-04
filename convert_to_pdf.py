#!/usr/bin/env python3
"""
Convert HTML file to PDF with images included
"""
import sys
import os
from pathlib import Path

try:
    from weasyprint import HTML
    print("Using weasyprint...")
    
    html_file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/Jason Vietnam Production Request colored lockers/producer-message-1.html"
    pdf_file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/Jason Vietnam Production Request colored lockers/producer-message-1.pdf"
    
    # Convert HTML to PDF
    HTML(filename=html_file).write_pdf(pdf_file)
    print(f"✓ PDF created successfully: {pdf_file}")
    
except ImportError:
    print("weasyprint not installed. Installing...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "weasyprint", "--quiet"])
    
    from weasyprint import HTML
    print("Using weasyprint...")
    
    html_file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/Jason Vietnam Production Request colored lockers/producer-message-1.html"
    pdf_file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/Jason Vietnam Production Request colored lockers/producer-message-1.pdf"
    
    # Convert HTML to PDF
    HTML(filename=html_file).write_pdf(pdf_file)
    print(f"✓ PDF created successfully: {pdf_file}")
