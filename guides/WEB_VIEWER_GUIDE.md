# Web Viewer Guide - View Reports in Browser

**View your Google ranking reports in a web browser**

---

## 🚀 Quick Start

### Option 1: Simple Web Server (Easiest)

**Start the web server:**

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"
./guides/start_web_server.sh
```

**Then open in browser:**
```
http://localhost:8000
```

**To stop:** Press `Ctrl+C` in terminal

---

### Option 2: One-Command Start

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025/guides/ranking_data" && python3 -m http.server 8000
```

Open: **http://localhost:8000**

---

## 📊 What You'll See

### Main Page (`index.html`):
- Overview statistics
- List of all weekly reports
- Links to each report

### Individual Reports:
- Click on any `.md` file to view
- Formatted markdown report
- All ranking data with positions and pages

---

## 🔗 Web Links

### Local Web Server:
```
http://localhost:8000
```

### Direct Report Links:
```
http://localhost:8000/weekly_report_2026-01-24.md
http://localhost:8000/master_rankings.csv
```

---

## 💡 Pro Tips

### Bookmark the Link:
Save `http://localhost:8000` as a bookmark for quick access!

### Keep Server Running:
- Leave terminal open
- Server runs until you press Ctrl+C
- Refresh browser to see new reports

### View CSV in Browser:
```
http://localhost:8000/master_rankings.csv
```

Most browsers will display CSV files nicely, or download to open in Excel.

---

## 🌐 Make It Accessible (Advanced)

### Option 1: Use ngrok (Temporary Public Link)

```bash
# Install ngrok: https://ngrok.com/
ngrok http 8000
```

This gives you a public URL like: `https://abc123.ngrok.io`

### Option 2: Deploy to GitHub Pages

1. Push `ranking_data/` folder to GitHub
2. Enable GitHub Pages
3. Access via: `https://yourusername.github.io/repo/ranking_data/`

---

## 📱 Mobile Access

If on same network:
- Find your Mac's IP address: `ifconfig | grep "inet "`
- Access from phone: `http://YOUR_IP:8000`

---

## 🎯 Quick Access

**Start server:**
```bash
./guides/start_web_server.sh
```

**Open browser:**
```
http://localhost:8000
```

**That's it!** 🎉

---

**Start the server now and open http://localhost:8000 in your browser!**
