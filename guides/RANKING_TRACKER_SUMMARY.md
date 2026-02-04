# Weekly Ranking Tracker - Summary

**Created:** January 24, 2026  
**Purpose:** Track weekly keyword rankings for CustomSportsLockers.com  
**Website:** https://customsportslockers.com/  
**Location:** United States

---

## ✅ What's Been Set Up

### 1. Master Keyword List
- **23 keywords** to track weekly
- Includes blog post keywords + core business keywords
- Located in: `WEEKLY_RANKING_TRACKER.md`

### 2. Automation Script
- **Python script** for automated ranking checks
- File: `weekly_ranking_check.py`
- Uses DataForSEO API (or mock mode for testing)

### 3. Data Storage
- **Master CSV:** `ranking_data/master_rankings.csv`
- **Weekly Snapshots:** `ranking_data/weekly_rankings_[date].json`
- **Weekly Reports:** `ranking_data/weekly_report_[date].md`

### 4. Documentation
- **Quick Start:** `QUICK_START_RANKING_TRACKER.md`
- **Setup Guide:** `RANKING_TRACKER_SETUP.md`
- **Main Tracker:** `WEEKLY_RANKING_TRACKER.md`

---

## 🎯 Keywords Being Tracked

### Blog Post Keywords (9)
1. wood vs metal sports lockers
2. custom sports lockers
3. college sports lockers
4. football locker room design
5. how to choose sports lockers
6. hockey lockers
7. basketball lockers
8. baseball lockers
9. football lockers

### Core Business Keywords (9)
10. sports lockers
11. locker room lockers
12. athletic lockers
13. wood sports lockers
14. wood athletic lockers
15. stadium lockers
16. pro lockers
17. varsity lockers
18. buy sports lockers

### Programmatic Keywords (5)
19. texas football wood lockers
20. california basketball wood lockers
21. florida football wood lockers
22. new york hockey wood lockers
23. ohio football wood lockers

---

## 📅 Weekly Workflow

### Every Monday:

1. **Run Ranking Check** (5 min)
   ```bash
   python guides/weekly_ranking_check.py
   ```

2. **Review Weekly Report** (10 min)
   - Open `ranking_data/weekly_report_[date].md`
   - Check improvements/declines
   - Review action items

3. **Update Strategy** (15 min)
   - Continue what's working
   - Fix what's declining
   - Plan content updates

**Total Time:** ~30 minutes per week

---

## 📊 What You'll Get

### Weekly Report Includes:

1. **Summary Statistics**
   - Total keywords tracked
   - How many are ranking
   - Breakdown by position (top 10, 20, 50)

2. **Top Movers**
   - Biggest improvements (what's working)
   - Biggest declines (needs attention)
   - New rankings (progress)

3. **Current Rankings**
   - All keywords and their positions
   - Priority levels
   - Trend indicators

4. **Action Items**
   - What to continue doing
   - What to fix/improve
   - Growth opportunities

---

## 🚀 Getting Started

### Option 1: Automated (Recommended)

1. **Set up DataForSEO API:**
   ```bash
   export DATAFORSEO_LOGIN='your_login'
   export DATAFORSEO_PASSWORD='your_password'
   ```

2. **Install dependencies:**
   ```bash
   pip install requests pandas
   ```

3. **Run first check:**
   ```bash
   python guides/weekly_ranking_check.py
   ```

### Option 2: Manual

1. Use Google Search Console
2. Check positions manually
3. Update `master_rankings.csv`

See `QUICK_START_RANKING_TRACKER.md` for details.

---

## 📈 Success Metrics

### 3-Month Goals
- 5+ keywords in top 10
- 10+ keywords in top 20

### 6-Month Goals
- 10+ keywords in top 10
- 20+ keywords in top 20

### 12-Month Goals
- 15+ keywords in top 10
- 30+ keywords in top 20

---

## 📁 File Structure

```
guides/
├── WEEKLY_RANKING_TRACKER.md (main guide)
├── QUICK_START_RANKING_TRACKER.md (quick start)
├── RANKING_TRACKER_SETUP.md (setup instructions)
├── RANKING_TRACKER_SUMMARY.md (this file)
├── weekly_ranking_check.py (automation script)
└── ranking_data/
    ├── master_rankings.csv (all historical data)
    ├── weekly_rankings_[date].json (weekly snapshots)
    └── weekly_report_[date].md (weekly reports)
```

---

## 💡 Key Benefits

1. **Track Progress**
   - See if rankings are improving
   - Identify what's working
   - Catch declines early

2. **Data-Driven Decisions**
   - Use rankings to guide content strategy
   - Focus on keywords showing improvement
   - Fix issues before they hurt

3. **Learn & Optimize**
   - Understand which content ranks
   - Identify content gaps
   - Optimize based on data

4. **Save Time**
   - Automated tracking (30 min/week)
   - Clear reports with action items
   - Historical data for trends

---

## 🔄 Next Steps

1. ✅ **Set up API credentials** (if using automated)
2. ✅ **Run first ranking check**
3. ✅ **Review first report**
4. ✅ **Set up weekly automation** (cron/GitHub Actions)
5. ✅ **Track progress over time**

---

## 📚 Documentation

- **Quick Start:** `QUICK_START_RANKING_TRACKER.md`
- **Setup Guide:** `RANKING_TRACKER_SETUP.md`
- **Main Tracker:** `WEEKLY_RANKING_TRACKER.md`

---

*Created: January 24, 2026*  
*Ready to track your rankings! 🚀*
