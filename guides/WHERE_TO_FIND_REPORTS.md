# Where to Find Your Ranking Reports

**Even without email, your reports are saved locally!**

---

## 📁 Report Location

All reports are saved in:

```
guides/ranking_data/
```

**Full path:**
```
/Users/monikabrownova/Documents/github/player-stall December 19 2025/guides/ranking_data/
```

---

## 📄 Files You'll Find

### 1. Weekly Reports (Markdown Format)

**File:** `weekly_report_YYYY-MM-DD.md`

**Example:**
- `weekly_report_2026-01-24.md`
- `weekly_report_2026-01-31.md`

**How to open:**
- Double-click the file (opens in any text editor)
- Or open in VS Code/Cursor
- Or view in any markdown viewer

**Contains:**
- Summary statistics
- Top movers (improvements/declines)
- Current rankings
- Action items
- Full ranking table

### 2. Master CSV File

**File:** `master_rankings.csv`

**How to open:**
- Double-click (opens in Excel/Numbers)
- Or open in Google Sheets
- Or view in any spreadsheet app

**Contains:**
- All historical ranking data
- One row per week
- One column per keyword
- Easy to create charts/graphs

### 3. Weekly Snapshots (JSON)

**File:** `weekly_rankings_YYYY-MM-DD.json`

**Contains:**
- Raw ranking data in JSON format
- Useful for data analysis

---

## 🚀 How to View Reports

### Option 1: Finder (Mac)

1. **Open Finder**
2. **Navigate to:**
   ```
   Documents → github → player-stall December 19 2025 → guides → ranking_data
   ```
3. **Double-click any `.md` file** to open it

### Option 2: VS Code / Cursor

1. **Open your project in Cursor**
2. **Navigate to:** `guides/ranking_data/`
3. **Click on:** `weekly_report_2026-01-24.md` (or latest date)
4. **View the report** - it's formatted markdown!

### Option 3: Terminal

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025/guides/ranking_data"
ls -la
cat weekly_report_2026-01-24.md
```

### Option 4: Open in Browser

```bash
# Open the folder in Finder
open guides/ranking_data/

# Or open specific file
open guides/ranking_data/weekly_report_2026-01-24.md
```

---

## 📊 View CSV in Excel/Google Sheets

### Excel (Mac):

```bash
open guides/ranking_data/master_rankings.csv
```

### Google Sheets:

1. Go to: https://sheets.google.com
2. Click **File → Import**
3. Upload `master_rankings.csv`
4. Create charts and graphs!

---

## 🔍 Find Latest Report

### Quick Command:

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025/guides/ranking_data"
ls -t weekly_report_*.md | head -1
```

This shows the most recent report file.

### Or Just Look:

The files are named by date, so:
- `weekly_report_2026-01-24.md` = January 24, 2026
- `weekly_report_2026-01-31.md` = January 31, 2026

**Latest date = most recent report!**

---

## 📧 Email vs Local Files

**Even if email doesn't work:**
- ✅ Reports are still generated
- ✅ Saved to `guides/ranking_data/`
- ✅ You can view them anytime
- ✅ CSV file tracks all history

**Email is just a convenience** - all data is saved locally!

---

## 🎯 Quick Access

### Open Latest Report Right Now:

**Mac:**
```bash
open "/Users/monikabrownova/Documents/github/player-stall December 19 2025/guides/ranking_data"
```

**Or in Cursor:**
1. Press `Cmd + P` (Quick Open)
2. Type: `ranking_data`
3. Click on latest `weekly_report_*.md` file

---

## 📋 What's in the Report?

Each weekly report includes:

1. **Summary Statistics**
   - Total keywords tracked
   - How many are ranking
   - Top 10/20/50 breakdown

2. **Top Movers**
   - Biggest improvements
   - Biggest declines
   - New rankings

3. **Current Rankings**
   - All keywords and positions
   - Priority levels
   - Trend indicators

4. **Action Items**
   - What to continue doing
   - What to fix
   - Growth opportunities

---

## 💡 Pro Tip

**Bookmark this folder:**
```
guides/ranking_data/
```

You can check it every week to see your latest rankings, even without email!

---

## 🔄 After Running Script

When you run:
```bash
python3 guides/weekly_ranking_check.py
```

**Check this folder:**
```
guides/ranking_data/
```

**You'll see:**
- New `weekly_report_[date].md` file
- Updated `master_rankings.csv`
- New `weekly_rankings_[date].json` file

**All your data is there!** 📊

---

**Open the folder now:**
```bash
open "/Users/monikabrownova/Documents/github/player-stall December 19 2025/guides/ranking_data"
```
