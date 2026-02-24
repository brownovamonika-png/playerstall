# Weekly Ranking Tracker - playerstall.com

**Purpose:** Track weekly keyword rankings for all blog post target keywords  
**Website:** https://playerstall.com/  
**Location:** United States  
**Frequency:** Weekly (every Monday)

---

## Master Keyword List

### Blog Post Target Keywords (Primary Focus)

| # | Keyword | Blog Post | Priority | Target Position |
|---|---------|-----------|----------|-----------------|
| 1 | wood vs metal sports lockers | Blog Post 1 | 🔴 CRITICAL | Top 10 |
| 2 | custom sports lockers | Blog Post 2 | 🔴 CRITICAL | Top 5 |
| 3 | college sports lockers | Blog Post 3 | 🔴 CRITICAL | Top 10 |
| 4 | football locker room design | Blog Post 4 | 🟠 HIGH | Top 10 |
| 5 | how to choose sports lockers | Blog Post 5 | 🟠 HIGH | Top 10 |
| 6 | hockey lockers | Blog Post 6 | 🟠 HIGH | Top 10 |
| 7 | basketball lockers | Blog Post 7 | 🟠 HIGH | Top 10 |
| 8 | baseball lockers | Blog Post 8 | 🟡 MEDIUM | Top 20 |
| 9 | football lockers | Blog Post 9 | 🟠 HIGH | Top 10 |

### Core Business Keywords (Tier 1)

| # | Keyword | Monthly Searches | Current Priority |
|---|---------|-----------------|------------------|
| 10 | sports lockers | 2,400-2,900 | 🔴 CRITICAL |
| 11 | locker room lockers | 880-1,300 | 🔴 CRITICAL |
| 12 | athletic lockers | 590-880 | 🔴 CRITICAL |
| 13 | wood sports lockers | 170 | 🔴 CRITICAL ⭐ |
| 14 | wood athletic lockers | 30-90 | 🟠 HIGH |
| 15 | stadium lockers | 140-390 | 🟠 HIGH |
| 16 | pro lockers | 70-210 | 🟠 HIGH |
| 17 | varsity lockers | 20-70 | 🟡 MEDIUM |
| 18 | buy sports lockers | 10-90 | 🟡 MEDIUM |

### Programmatic Keywords (Sample - Track Top 10)

| # | Keyword | Monthly Searches | Competition |
|---|---------|-----------------|-------------|
| 19 | texas football wood lockers | 30-170 | LOW (11) |
| 20 | california basketball wood lockers | 20-100 | LOW |
| 21 | florida football wood lockers | 20-100 | LOW |
| 22 | new york hockey wood lockers | 15-80 | LOW |
| 23 | ohio football wood lockers | 15-80 | LOW |

**Total Keywords to Track:** 23 (expandable)

---

## Weekly Tracking Process

### Step 1: Run Ranking Check (Every Monday)

Use the automated script or manual DataForSEO API check:

```bash
# Run the ranking tracker script
python guides/weekly_ranking_check.py
```

This will:
1. Check rankings for all keywords
2. Save results to `guides/ranking_data/weekly_rankings_[YYYY-MM-DD].json`
3. Generate a weekly report

### Step 2: Review Weekly Report

Check the generated report in:
- `guides/ranking_data/weekly_report_[YYYY-MM-DD].md`

### Step 3: Update Master Tracking Sheet

Update the master tracking CSV:
- `guides/ranking_data/master_rankings.csv`

### Step 4: Analyze Trends

Look for:
- Keywords moving up (improving)
- Keywords moving down (needs attention)
- New keywords entering top 100
- Keywords stuck at same position

---

## Success Metrics

### 3-Month Goals
- 5+ keywords in top 10
- 10+ keywords in top 20
- 15+ keywords in top 50

### 6-Month Goals
- 10+ keywords in top 10
- 20+ keywords in top 20
- 25+ keywords in top 50

### 12-Month Goals
- 15+ keywords in top 10
- 30+ keywords in top 20
- 40+ keywords in top 50

---

## What to Learn From Rankings

### If Rankings Are Improving:
✅ **What's Working:**
- Content quality and depth
- Internal linking strategy
- On-page SEO optimization
- Backlink acquisition
- Site speed and technical SEO

**Action:** Continue current strategy, double down on what's working

### If Rankings Are Stagnant:
⚠️ **What to Check:**
- Content freshness (update old posts)
- Competitor analysis (what are they doing?)
- Technical SEO issues
- Backlink gaps
- Content depth vs competitors

**Action:** Identify gaps and improve

### If Rankings Are Declining:
❌ **What to Fix:**
- Check for technical issues (site speed, mobile, errors)
- Review recent content changes
- Analyze competitor improvements
- Check for penalties or algorithm updates

**Action:** Immediate investigation and fixes

---

## Weekly Report Template

Each week's report should include:

1. **Summary**
   - Total keywords tracked
   - Keywords improved (count)
   - Keywords declined (count)
   - Keywords stable (count)

2. **Top Movers**
   - Biggest improvements (top 5)
   - Biggest declines (top 5)

3. **Current Top Rankings**
   - Keywords in top 10
   - Keywords in top 20
   - Keywords in top 50

4. **Action Items**
   - What to continue doing
   - What to fix/improve
   - What to investigate

---

## Files Structure

```
guides/
├── WEEKLY_RANKING_TRACKER.md (this file)
├── weekly_ranking_check.py (automation script)
└── ranking_data/
    ├── master_rankings.csv (all historical data)
    ├── weekly_rankings_[date].json (weekly snapshots)
    └── weekly_report_[date].md (weekly reports)
```

---

*Last Updated: January 24, 2026*  
*Next Check: [Update weekly]*
