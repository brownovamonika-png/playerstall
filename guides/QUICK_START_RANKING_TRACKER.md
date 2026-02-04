# Quick Start: Weekly Ranking Tracker

**Get started tracking your keyword rankings in 5 minutes!**

---

## 🚀 Quick Start (3 Steps)

### Step 1: Choose Your Method

**Option A: Automated (Recommended)**
- Uses DataForSEO API
- Fully automated
- See `RANKING_TRACKER_SETUP.md` for setup

**Option B: Manual (Simple)**
- Use Google Search Console
- Manual tracking
- No API needed

### Step 2: Run Your First Check

**Automated:**
```bash
python guides/weekly_ranking_check.py
```

**Manual:**
1. Open Google Search Console
2. Check positions for your keywords
3. Update `guides/ranking_data/master_rankings.csv`

### Step 3: Review Your Report

Check `guides/ranking_data/weekly_report_[date].md` for:
- Current rankings
- Improvements/declines
- Action items

---

## 📊 What Gets Tracked

### 23 Keywords Total:

**Blog Post Keywords (9):**
- wood vs metal sports lockers
- custom sports lockers
- college sports lockers
- football locker room design
- how to choose sports lockers
- hockey lockers
- basketball lockers
- baseball lockers
- football lockers

**Core Business Keywords (9):**
- sports lockers
- locker room lockers
- athletic lockers
- wood sports lockers
- wood athletic lockers
- stadium lockers
- pro lockers
- varsity lockers
- buy sports lockers

**Programmatic Keywords (5):**
- texas football wood lockers
- california basketball wood lockers
- florida football wood lockers
- new york hockey wood lockers
- ohio football wood lockers

---

## 📅 Weekly Schedule

**Every Monday:**
1. Run ranking check (5 minutes)
2. Review weekly report (10 minutes)
3. Update strategy based on results (15 minutes)

**Total Time:** ~30 minutes per week

---

## 📈 What You'll Learn

### Week 1-4: Baseline
- Current ranking positions
- Which keywords are ranking
- Which keywords need work

### Week 5-12: Trends
- What's improving (what's working)
- What's declining (needs attention)
- Content strategy effectiveness

### Month 3+: Optimization
- Long-term trends
- Seasonal patterns
- Content ROI

---

## 🎯 Success Metrics

**3-Month Goals:**
- 5+ keywords in top 10
- 10+ keywords in top 20

**6-Month Goals:**
- 10+ keywords in top 10
- 20+ keywords in top 20

**12-Month Goals:**
- 15+ keywords in top 10
- 30+ keywords in top 20

---

## 📁 Files Created

After running the tracker:

```
guides/
├── WEEKLY_RANKING_TRACKER.md (main guide)
├── weekly_ranking_check.py (automation script)
├── RANKING_TRACKER_SETUP.md (setup instructions)
└── ranking_data/
    ├── master_rankings.csv (all historical data)
    ├── weekly_rankings_[date].json (weekly snapshots)
    └── weekly_report_[date].md (weekly reports)
```

---

## 💡 Pro Tips

1. **Be Consistent**
   - Check rankings same day every week
   - Use same method (automated or manual)

2. **Track Trends, Not Just Positions**
   - One week's data = snapshot
   - Multiple weeks = trends
   - Trends show what's working

3. **Focus on Improvements**
   - Celebrate keywords moving up
   - Investigate keywords moving down
   - Don't panic over small fluctuations

4. **Use Data to Guide Content**
   - If rankings improve → continue strategy
   - If rankings decline → investigate and fix
   - If stagnant → review competitors

---

## ❓ Need Help?

- **Setup Issues:** See `RANKING_TRACKER_SETUP.md`
- **Understanding Reports:** See `WEEKLY_RANKING_TRACKER.md`
- **API Questions:** Check DataForSEO documentation

---

**Ready to start?** Run your first check now! 🚀

```bash
python guides/weekly_ranking_check.py
```
