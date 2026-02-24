# Google Ranking Tracker

**Automated weekly Google ranking analysis for playerstall.com**

---

## 🎯 What It Does

Tracks Google search rankings for **23 target keywords** every week and generates reports showing:
- **Position** (#1, #5, #12, etc.)
- **Page number** (Page 1, Page 2, Page 3, etc.)
- **Improvements/declines** week-over-week
- **Page distribution** statistics

---

## 🚀 Quick Start

### Run Manually:

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"
python3 guides/google_ranking_tracker.py
```

### Set Up Weekly Automation:

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"
./guides/setup_weekly_automation.sh
```

This will:
- ✅ Set up automatic weekly runs (every Monday at 9 AM)
- ✅ Generate reports automatically
- ✅ Save all data to `guides/ranking_data/`

---

## 📊 Reports Generated

### Weekly Report
**File:** `guides/ranking_data/weekly_report_YYYY-MM-DD.md`

**Contains:**
- Summary statistics
- Page distribution (Page 1, 2, 3, etc.)
- Top movers (improvements/declines)
- Current rankings with position AND page
- Action items

### Master CSV
**File:** `guides/ranking_data/master_rankings.csv`

**Contains:**
- Historical ranking data
- Position and page for each keyword
- Easy to import into Excel/Google Sheets
- Create charts and graphs

---

## 📅 Weekly Schedule

**Runs:** Every Monday at 9:00 AM (automated)

**Manual Run:** Anytime with:
```bash
python3 guides/google_ranking_tracker.py
```

---

## 📧 Email Reports (Optional)

To receive reports via email:

```bash
source guides/email_config.sh
python3 guides/google_ranking_tracker.py
```

Reports will be emailed to: `playerstallsports@gmail.com`

---

## 📁 Files

- **`google_ranking_tracker.py`** - Main script (runs weekly)
- **`setup_weekly_automation.sh`** - Sets up automatic weekly runs
- **`email_config.sh`** - Email configuration
- **`ranking_data/`** - All reports and data

---

## 🎯 Keywords Tracked (23 Total)

### Blog Post Keywords (9):
- wood vs metal sports lockers
- custom sports lockers
- college sports lockers
- football locker room design
- how to choose sports lockers
- hockey lockers
- basketball lockers
- baseball lockers
- football lockers

### Core Business Keywords (9):
- sports lockers
- locker room lockers
- athletic lockers
- wood sports lockers
- wood athletic lockers
- stadium lockers
- pro lockers
- varsity lockers
- buy sports lockers

### Programmatic Keywords (5):
- texas football wood lockers
- california basketball wood lockers
- florida football wood lockers
- new york hockey wood lockers
- ohio football wood lockers

---

## 📈 What You'll Learn

### Week 1-4: Baseline
- Current ranking positions
- Which keywords are ranking
- Which page each keyword is on

### Week 5-12: Trends
- What's improving (moving up pages)
- What's declining (moving down pages)
- Content strategy effectiveness

### Month 3+: Optimization
- Long-term trends
- Seasonal patterns
- Content ROI

---

## 🔧 Troubleshooting

### Check if automation is running:

```bash
crontab -l | grep google_ranking_tracker
```

### View logs:

```bash
tail -f guides/ranking_data/cron.log
```

### Test manually:

```bash
python3 guides/google_ranking_tracker.py
```

### Remove automation:

```bash
crontab -l | grep -v "google_ranking_tracker.py" | crontab -
```

---

## 📋 Weekly Workflow

**Every Monday (automated):**
1. Script runs at 9:00 AM
2. Checks rankings for all 23 keywords
3. Generates weekly report
4. Updates master CSV
5. (Optional) Sends email report

**You:**
- Check `guides/ranking_data/weekly_report_[date].md`
- Review improvements/declines
- Update content strategy based on data

---

## 🎯 Success Metrics

**3-Month Goals:**
- 5+ keywords on Page 1
- 10+ keywords on Page 2
- 15+ keywords ranking total

**6-Month Goals:**
- 10+ keywords on Page 1
- 20+ keywords on Page 2
- 20+ keywords ranking total

---

## 📚 Documentation

- **Setup:** `SETUP_INSTRUCTIONS.md`
- **Email Setup:** `EMAIL_SETUP_STEP_BY_STEP.md`
- **How to Check Rankings:** `HOW_TO_CHECK_RANKINGS.md`
- **Page Explanation:** `PAGE_RANKING_EXPLANATION.md`

---

**Ready to set up weekly automation?** Run:

```bash
./guides/setup_weekly_automation.sh
```

---

*Last Updated: January 24, 2026*
