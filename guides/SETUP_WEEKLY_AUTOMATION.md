# Set Up Weekly Google Ranking Tracker

**Automate your Google ranking checks to run every Monday**

---

## 🚀 Quick Setup (2 Minutes)

### Step 1: Run Setup Script

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"
./guides/setup_weekly_automation.sh
```

This will:
- ✅ Set up cron job to run every Monday at 9:00 AM
- ✅ Configure automatic ranking checks
- ✅ Generate reports automatically

### Step 2: Verify It's Set Up

```bash
crontab -l | grep google_ranking_tracker
```

You should see:
```
0 9 * * 1 cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025" && /usr/bin/python3 guides/google_ranking_tracker.py
```

---

## 📅 Schedule

**Runs:** Every Monday at 9:00 AM

**What happens:**
1. Checks rankings for all 23 keywords
2. Generates weekly report
3. Updates master CSV
4. (Optional) Sends email report

**Reports saved to:** `guides/ranking_data/`

---

## 🧪 Test It Now

Before setting up automation, test it manually:

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"
python3 guides/google_ranking_tracker.py
```

Or use the quick script:

```bash
./guides/RUN_GOOGLE_RANKING_TRACKER.sh
```

---

## 📧 Enable Email Reports

To receive reports via email every week:

```bash
# Set email configuration
source guides/email_config.sh

# Add to crontab with email enabled
# (The setup script will use your current environment variables)
```

---

## 🔍 Check Automation Status

### View Scheduled Jobs:

```bash
crontab -l
```

### View Logs:

```bash
tail -f guides/ranking_data/cron.log
```

### Test Next Run:

Wait until next Monday, or manually trigger:

```bash
python3 guides/google_ranking_tracker.py
```

---

## 🛠️ Troubleshooting

### Cron Job Not Running?

**Check:**
1. Is cron enabled on your Mac?
   ```bash
   sudo launchctl list | grep cron
   ```

2. Check logs:
   ```bash
   cat guides/ranking_data/cron.log
   ```

3. Verify Python path:
   ```bash
   which python3
   ```

### Remove Automation:

```bash
crontab -l | grep -v "google_ranking_tracker.py" | crontab -
```

### Change Schedule:

Edit cron job:
```bash
crontab -e
```

**Schedule Format:**
```
0 9 * * 1  = Every Monday at 9:00 AM
0 10 * * 1 = Every Monday at 10:00 AM
0 9 * * *  = Every day at 9:00 AM
```

---

## ✅ Setup Complete!

Once set up, your Google Ranking Tracker will:
- ✅ Run automatically every Monday
- ✅ Check all 23 keywords
- ✅ Generate reports with position AND page numbers
- ✅ Save all data for historical tracking
- ✅ (Optional) Email reports

**No action needed** - it runs automatically! 🎉

---

**Ready to set up?** Run:

```bash
./guides/setup_weekly_automation.sh
```
