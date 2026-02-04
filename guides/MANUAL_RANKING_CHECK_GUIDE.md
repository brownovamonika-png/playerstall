# Manual Ranking Check Guide

**Alternative method:** Use DataForSEO MCP tools or Google Search Console for manual tracking

---

## Method 1: Using DataForSEO MCP Tools (If Available)

If you have DataForSEO MCP server configured, you can check rankings directly:

### Step-by-Step:

1. **For each keyword, check SERP:**
   ```
   Use: mcp_dataforseo_serp_organic_live_advanced
   Parameters:
   - keyword: "custom sports lockers"
   - location_name: "United States"
   - language_code: "en"
   - depth: 100 (to check top 100)
   ```

2. **Find your website in results:**
   - Look for https://customsportslockers.com/
   - Note the position (1-100)

3. **Record in CSV:**
   - Update `ranking_data/master_rankings.csv`
   - Add new row with date and positions

### Example for One Keyword:

```python
# Check "custom sports lockers"
result = mcp_dataforseo_serp_organic_live_advanced(
    keyword="custom sports lockers",
    location_name="United States",
    language_code="en",
    depth=100
)

# Find your website
for idx, item in enumerate(result['items'], start=1):
    if 'customsportslockers.com' in item.get('url', ''):
        print(f"Position: #{idx}")
        break
```

---

## Method 2: Google Search Console (Recommended for Manual)

### Step 1: Access Search Console

1. Go to: https://search.google.com/search-console
2. Select your property: `https://customsportslockers.com/`

### Step 2: Check Performance

1. Navigate to: **Performance** → **Search Results**
2. Set date range: **Last 7 days** (or custom range)
3. Click **+ New** → **Query**

### Step 3: Filter by Keywords

For each keyword:

1. **Add filter:** Query contains "[your keyword]"
2. **Check average position** for that keyword
3. **Record in CSV**

### Step 4: Export Data

1. Click **Export** button (top right)
2. Choose **Google Sheets** or **CSV**
3. Match keywords to your tracking list
4. Update `master_rankings.csv`

---

## Method 3: Manual SERP Check (Simple but Time-Consuming)

### Step-by-Step:

1. **Use Incognito/Private Browsing**
   - Important: Use incognito to avoid personalized results
   - Or use a VPN to ensure consistent location

2. **Search Each Keyword**
   - Go to Google.com
   - Search: "custom sports lockers"
   - Look for your website in results

3. **Record Position**
   - If on page 1: Note position (1-10)
   - If on page 2: Note position (11-20)
   - If not found in top 10 pages: Record as "Not ranking" or ">100"

4. **Update CSV**
   - Open `ranking_data/master_rankings.csv`
   - Add new row with date
   - Fill in positions for each keyword

### Tips:

- **Be Consistent:** Always use same browser/method
- **Check Same Day:** Every Monday for consistency
- **Use Same Location:** United States (or your target location)
- **Take Screenshots:** Save screenshots for reference

---

## Quick CSV Update Template

### Format for `master_rankings.csv`:

```csv
date,wood vs metal sports lockers,custom sports lockers,college sports lockers,...
2026-01-24,45,12,28,...
2026-01-31,42,10,25,...
```

### How to Update:

1. Open `ranking_data/master_rankings.csv` in Excel/Google Sheets
2. Add new row at bottom
3. Enter date in first column
4. Enter positions for each keyword (or leave blank if not ranking)
5. Save file

---

## Creating Weekly Report Manually

After updating CSV, create a simple report:

### Template:

```markdown
# Weekly Ranking Report - [DATE]

## Summary
- Keywords tracked: 23
- Keywords ranking: [count]
- Top 10: [count]
- Top 20: [count]

## Top Rankings
- #1: [keyword]
- #2: [keyword]
...

## Improvements
- [keyword]: #X → #Y (+Z positions)

## Declines
- [keyword]: #X → #Y (-Z positions)

## Action Items
- [What to continue doing]
- [What to fix]
```

Save as: `ranking_data/weekly_report_[date].md`

---

## Time Estimate

- **Google Search Console:** 15-20 minutes
- **Manual SERP Check:** 30-45 minutes
- **DataForSEO MCP:** 10-15 minutes (if automated)

---

## Which Method to Use?

### Use Google Search Console If:
- ✅ You want free, reliable data
- ✅ You don't mind manual work
- ✅ You want actual Google data
- ✅ You only need top 100 positions

### Use Manual SERP If:
- ✅ You want to see actual search results
- ✅ You don't have Search Console access
- ✅ You want to check competitor positions too
- ⚠️ You have time (30-45 min/week)

### Use DataForSEO MCP If:
- ✅ You have MCP server configured
- ✅ You want faster checks
- ✅ You want to automate
- ✅ You need positions beyond page 1

### Use Automated Script If:
- ✅ You want fully automated
- ✅ You have DataForSEO API access
- ✅ You want consistent, scheduled checks
- ✅ You want historical tracking

---

## Pro Tips

1. **Be Consistent**
   - Same day every week
   - Same method
   - Same time of day (if possible)

2. **Take Notes**
   - Screenshot important changes
   - Note any algorithm updates
   - Document content changes

3. **Track Trends**
   - Don't panic over one week's data
   - Look for patterns over 4+ weeks
   - Compare month-over-month

4. **Use Multiple Methods**
   - Search Console for baseline
   - Manual check for verification
   - Automated for consistency

---

*Last Updated: January 24, 2026*
