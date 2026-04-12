# Ranking Tracker Setup Guide

**Purpose:** Set up automated weekly ranking tracking for playerstall.com

---

## Quick Start

### Option 1: Using DataForSEO API (Recommended)

1. **Get DataForSEO API Credentials**
   - Sign up at https://dataforseo.com/
   - Get your API login and password
   - Set environment variables:
     ```bash
     export DATAFORSEO_LOGIN='your_login'
     export DATAFORSEO_PASSWORD='your_password'
     ```

2. **Install Python Dependencies**
   ```bash
   pip install requests pandas
   ```

3. **Run Weekly Check**
   ```bash
   python guides/weekly_ranking_check.py
   ```

### Option 2: Manual Tracking (No API)

Use Google Search Console or manual SERP checks:

1. **Google Search Console Method**
   - Go to Google Search Console
   - Navigate to Performance → Search Results
   - Filter by query
   - Export data weekly

2. **Manual SERP Check**
   - Use incognito mode
   - Search each keyword
   - Note your position
   - Update `master_rankings.csv` manually

---

## Setup Instructions

### Step 1: Install Requirements

```bash
# Install Python packages
pip install requests pandas

# Or use scripts/requirements-ranking-tracker.txt (kept out of repo root so Vercel does not treat the site as a Python app)
pip install -r scripts/requirements-ranking-tracker.txt
```

### Step 2: Configure API Access

**For DataForSEO:**

1. Sign up for DataForSEO account: https://dataforseo.com/
2. Get API credentials from dashboard
3. Set environment variables:

**Mac/Linux:**
```bash
export DATAFORSEO_LOGIN='your_login_here'
export DATAFORSEO_PASSWORD='your_password_here'
```

**Windows:**
```cmd
set DATAFORSEO_LOGIN=your_login_here
set DATAFORSEO_PASSWORD=your_password_here
```

**Or create a `.env` file** (recommended):
```bash
# .env file (don't commit this!)
DATAFORSEO_LOGIN=your_login_here
DATAFORSEO_PASSWORD=your_password_here
```

Then load it:
```bash
source .env  # Mac/Linux
# or use python-dotenv package
```

### Step 3: Test the Script

```bash
# Run the script
python guides/weekly_ranking_check.py
```

**Expected Output:**
- Creates `guides/ranking_data/` directory
- Saves weekly snapshot JSON
- Updates master CSV
- Generates weekly report

---

## Weekly Workflow

### Every Monday Morning:

1. **Run the Script**
   ```bash
   python guides/weekly_ranking_check.py
   ```

2. **Review the Report**
   - Open `guides/ranking_data/weekly_report_[date].md`
   - Check top movers (improvements/declines)
   - Review action items

3. **Update Strategy**
   - If rankings improved: Continue what's working
   - If rankings declined: Investigate and fix
   - If stagnant: Review content and competitors

4. **Share Results** (Optional)
   - Share report with team
   - Document learnings
   - Update content strategy

---

## Alternative: Using Google Search Console

If you prefer not to use DataForSEO API:

### Method 1: Google Search Console Export

1. Go to Google Search Console
2. Performance → Search Results
3. Filter by date range (last 7 days)
4. Export CSV
5. Match keywords to your list
6. Update `master_rankings.csv` manually

### Method 2: Manual SERP Checks

1. Use incognito/private browsing
2. Search each keyword
3. Find your website position
4. Record in spreadsheet

**Pros:**
- Free
- Uses actual Google data
- No API needed

**Cons:**
- Time-consuming (manual)
- May miss positions beyond page 1
- Less accurate for positions 20+

---

## Customizing Keywords

### Add New Keywords

Edit `guides/weekly_ranking_check.py`:

```python
KEYWORDS = [
    # ... existing keywords ...
    "your new keyword here",
]
```

### Add Keyword Priority

Edit the `KEYWORD_PRIORITIES` dictionary:

```python
KEYWORD_PRIORITIES = {
    # ... existing priorities ...
    "your new keyword": "HIGH",
}
```

---

## Understanding the Reports

### Weekly Report Sections

1. **Summary Statistics**
   - Total keywords tracked
   - How many are ranking
   - Breakdown by position ranges (top 10, 20, 50)

2. **Top Movers**
   - Biggest improvements (what's working)
   - Biggest declines (needs attention)
   - New rankings (progress)

3. **Current Top Rankings**
   - Keywords in top 10
   - Keywords in top 20
   - All rankings table

4. **Action Items**
   - What to continue doing
   - What to fix
   - Growth opportunities

### Master CSV File

The `master_rankings.csv` file contains:
- Date column
- One column per keyword
- Historical ranking data

**Use it to:**
- Track trends over time
- Create charts/graphs
- Identify patterns
- Export to Excel/Google Sheets

---

## Troubleshooting

### Issue: "DataForSEO credentials not found"

**Solution:**
- Set environment variables (see Step 2)
- Or use mock mode for testing

### Issue: "API error" or "Rate limit exceeded"

**Solution:**
- Check DataForSEO account limits
- Reduce number of keywords per run
- Add delays between API calls
- Upgrade DataForSEO plan if needed

### Issue: "No previous rankings found"

**Solution:**
- This is normal for first run
- Next week's report will show comparisons

### Issue: "Script runs but shows mock data"

**Solution:**
- Verify environment variables are set
- Check API credentials are correct
- Test API connection separately

---

## Advanced: Automating Weekly Checks

### Option 1: Cron Job (Mac/Linux)

```bash
# Edit crontab
crontab -e

# Add this line (runs every Monday at 9 AM)
0 9 * * 1 cd /path/to/project && python guides/weekly_ranking_check.py >> logs/ranking_check.log 2>&1
```

### Option 2: GitHub Actions (Recommended)

Create `.github/workflows/weekly-rankings.yml`:

```yaml
name: Weekly Ranking Check

on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9 AM UTC
  workflow_dispatch:  # Allow manual trigger

jobs:
  check-rankings:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.9'
      - name: Install dependencies
        run: pip install requests pandas
      - name: Run ranking check
        env:
          DATAFORSEO_LOGIN: ${{ secrets.DATAFORSEO_LOGIN }}
          DATAFORSEO_PASSWORD: ${{ secrets.DATAFORSEO_PASSWORD }}
        run: python guides/weekly_ranking_check.py
      - name: Commit results
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add guides/ranking_data/
          git commit -m "Weekly ranking check $(date +%Y-%m-%d)" || exit 0
          git push
```

### Option 3: Zapier/Make.com Automation

1. Set up weekly trigger (every Monday)
2. Run Python script via API/webhook
3. Send report via email/Slack

---

## Data Privacy & Security

### Important Notes:

- **Never commit API credentials** to git
- Use environment variables or `.env` file
- Add `.env` to `.gitignore`
- Keep `ranking_data/` folder (it's safe to commit)

### .gitignore Entry:

```
# API credentials
.env
*.env

# But keep ranking data
!guides/ranking_data/
```

---

## Next Steps

1. ✅ Set up API credentials
2. ✅ Run first ranking check
3. ✅ Review first report
4. ✅ Set up weekly automation
5. ✅ Track progress over time

---

## Questions?

- **API Issues:** Check DataForSEO documentation
- **Script Errors:** Check Python version (3.7+)
- **Data Questions:** Review report sections above

---

*Last Updated: January 24, 2026*
