# Convert HTML to PDF Instructions

## Method 1: Using Browser (Easiest)

1. **Open the HTML file in your browser:**
   - Double-click: `producer-message-1.html`
   - Or open: `file:///Users/monikabrownova/Documents/github/player-stall%20December%2019%202025/Jason%20Vietnam%20Production%20Request%20colored%20lockers/producer-message-1.html`

2. **Print to PDF:**
   - Press `Cmd + P` (or go to File → Print)
   - Click "Save as PDF" or "PDF" dropdown → "Save as PDF"
   - Save as: `producer-message-1.pdf` in the same folder

## Method 2: Using Chrome/Edge (Better for images)

1. Open the HTML file in Chrome or Edge
2. Press `Cmd + P`
3. Select "Save as PDF" as the destination
4. Make sure "Background graphics" is checked (to include images)
5. Click "Save"

## Method 3: Online Converter

1. Upload the HTML file to an online converter like:
   - https://www.ilovepdf.com/html-to-pdf
   - https://www.freepdfconvert.com/html-to-pdf
2. Download the PDF

## Method 4: Command Line (if tools are installed)

If you have `wkhtmltopdf` installed:
```bash
wkhtmltopdf --enable-local-file-access producer-message-1.html producer-message-1.pdf
```

---

**Recommended:** Use Method 1 or 2 (Browser Print to PDF) - it's the simplest and will include all images properly.
