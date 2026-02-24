# How to Check Rankings - Step by Step

**Quick guide to check your keyword rankings**

---

## 🚀 Option 1: Automated Check (Python Script)

### Prerequisites:
- ✅ Python dependencies installed (`requests`, `pandas`)
- ✅ DataForSEO credentials set as environment variables

### Steps:

1. **Open Terminal**

2. **Navigate to project directory:**
   ```bash
   cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"
   ```

3. **Set your DataForSEO credentials** (if not already set):
   ```bash
   export DATAFORSEO_LOGIN='your_login'
   export DATAFORSEO_PASSWORD='your_password'
   ```

4. **Run the script:**
   ```bash
   python3 guides/weekly_ranking_check.py
   ```

5. **Check the results:**
   - Open: `guides/ranking_data/weekly_report_[date].md`
   - Or check: `guides/ranking_data/master_rankings.csv`

---

## 📊 Option 2: Manual Check (Google Search Console)

### Steps:

1. **Go to Google Search Console:**
   - Visit: https://search.google.com/search-console
   - Select property: `https://playerstall.com/`

2. **Navigate to Performance:**
   - Click **Performance** in left sidebar
   - Click **Search Results**

3. **Check each keyword:**

   **For each keyword (e.g., "custom sports lockers"):**
   
   a. Click **+ New** button (top)
   b. Select **Query**
   c. Enter keyword: `custom sports lockers`
   d. Check **Average Position** (this is your ranking)
   e. Record the number

4. **Update CSV:**
   - Open: `guides/ranking_data/master_rankings.csv`
   - Find today's date row (2026-01-24)
   - Add position numbers for each keyword

### Example:
```
Keyword: "custom sports lockers"
Average Position: 12.5
→ Record as: 12 (or 13 if rounding up)
```

---

## 🔍 Option 3: Manual SERP Check (See Actual Results)

### Steps:

1. **Open Incognito/Private Browser Window**
   - Chrome: Cmd+Shift+N (Mac) or Ctrl+Shift+N (Windows)
   - Safari: Cmd+Shift+N
   - Firefox: Cmd+Shift+P

2. **Search Each Keyword:**

   **For "custom sports lockers":**
   - Go to Google.com
   - Search: `custom sports lockers`
   - Look for your website: `playerstall.com`
   - Note the position (1-10 on page 1, 11-20 on page 2, etc.)

3. **Record Positions:**

   **If you see your site:**
   - Page 1, position 3 → Record: `3`
   - Page 2, position 5 → Record: `15` (page 2 = positions 11-20)
   - Page 3, position 2 → Record: `22` (page 3 = positions 21-30)

   **If you don't see your site:**
   - Check up to page 10 (positions 1-100)
   - If not found → Record as blank or `>100`

4. **Update CSV:**
   - Open: `guides/ranking_data/master_rankings.csv`
   - Add positions to today's row

---

## 📝 Quick CSV Update Guide

### Your CSV Structure:

```csv
date,wood vs metal sports lockers,custom sports lockers,college sports lockers,...
2026-01-24,45,12,28,...
```

### How to Fill It:

1. **Open CSV in Excel/Google Sheets/Numbers**

2. **For each keyword column:**
   - Find the position number
   - Enter it in today's date row
   - Leave blank if not ranking (or enter `>100`)

3. **Example Row:**
   ```
   2026-01-24,45,12,28,15,,8,22,,35,67,89,23,14,56,78,34,12,45,67,23,45,67,89
   ```

---

## 🎯 Recommended: Start with Google Search Console

**Why?**
- ✅ Uses actual Google data
- ✅ Shows average position (more accurate)
- ✅ Free and reliable
- ✅ Takes 15-20 minutes for all keywords

**Steps:**
1. Open Google Search Console
2. Performance → Search Results
3. Filter by each keyword
4. Record average position
5. Update CSV

---

## ⚡ Quick Check (Just Top Keywords)

**If you're short on time, check these 9 first:**

1. wood vs metal sports lockers
2. custom sports lockers
3. college sports lockers
4. football locker room design
5. how to choose sports lockers
6. hockey lockers
7. basketball lockers
8. baseball lockers
9. football lockers

**Then add the rest later!**

---

## 📊 After Checking

### 1. Review Your Data

Look at your CSV row:
- Which keywords are ranking?
- What positions?
- Which keywords are missing?

### 2. Create a Quick Summary

**Example:**
```
Week 1 (2026-01-24):
- Ranking: 12 keywords
- Top 10: 2 keywords
- Top 20: 5 keywords
- Not ranking: 11 keywords
```

### 3. Next Week

- Check again next Monday
- Compare positions
- See improvements/declines

---

## 💡 Pro Tips

1. **Be Consistent:**
   - Check same day every week (Monday recommended)
   - Use same method (automated or manual)

2. **Take Notes:**
   - Screenshot important changes
   - Note any content updates you made

3. **Don't Panic:**
   - One week's data = snapshot
   - Trends matter more than single positions
   - Small fluctuations are normal

---

## ❓ Troubleshooting

### "Script doesn't work"
- Check credentials are set: `echo $DATAFORSEO_LOGIN`
- Verify dependencies: `python3 -c "import requests; print('OK')"`
- See `SETUP_INSTRUCTIONS.md`

### "Can't find my site in search results"
- Check up to page 10 (100 positions)
- Use incognito mode
- Try different locations/IPs

### "Google Search Console shows different numbers"
- Search Console shows average position
- Manual check shows current position
- Both are valid - use Search Console for consistency

---

**Ready to check?** Start with Google Search Console - it's the fastest! 🚀
