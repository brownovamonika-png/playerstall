# Setup Instructions - Ranking Tracker

**Follow these steps to set up your weekly ranking tracker**

---

## Step 1: Install Python Dependencies

Open your terminal and run:

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"
pip3 install --user requests pandas
```

**If you get permission errors**, try:

```bash
pip3 install requests pandas
```

**Or use pip with sudo** (if needed):

```bash
sudo pip3 install requests pandas
```

**Verify installation:**

```bash
python3 -c "import requests; import pandas; print('✅ Dependencies installed!')"
```

---

## Step 2: Set Up DataForSEO Credentials

### Option A: Environment Variables (Recommended)

**Mac/Linux (Terminal):**

```bash
# Add to your ~/.zshrc or ~/.bash_profile
export DATAFORSEO_LOGIN='your_login_here'
export DATAFORSEO_PASSWORD='your_password_here'

# Then reload:
source ~/.zshrc  # or source ~/.bash_profile
```

**Or set temporarily for this session:**

```bash
export DATAFORSEO_LOGIN='your_login_here'
export DATAFORSEO_PASSWORD='your_password_here'
```

**Windows (Command Prompt):**

```cmd
set DATAFORSEO_LOGIN=your_login_here
set DATAFORSEO_PASSWORD=your_password_here
```

### Option B: Create .env File (Alternative)

1. Create a file named `.env` in your project root:

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"
touch .env
```

2. Add your credentials to `.env`:

```
DATAFORSEO_LOGIN=your_login_here
DATAFORSEO_PASSWORD=your_password_here
```

3. Install python-dotenv:

```bash
pip3 install --user python-dotenv
```

4. Update the script to load .env (I can help with this if needed)

---

## Step 3: Test the Script

Run the script to test:

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"
python3 guides/weekly_ranking_check.py
```

**Expected output:**
- ✅ Checks rankings for all 23 keywords
- ✅ Creates `guides/ranking_data/` directory
- ✅ Saves weekly snapshot JSON
- ✅ Updates master CSV
- ✅ Generates weekly report

---

## Step 4: Verify Your First Check

After running, check:

1. **Weekly snapshot:**
   ```
   guides/ranking_data/weekly_rankings_[date].json
   ```

2. **Weekly report:**
   ```
   guides/ranking_data/weekly_report_[date].md
   ```

3. **Master CSV:**
   ```
   guides/ranking_data/master_rankings.csv
   ```

---

## Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'requests'"

**Solution:**
```bash
pip3 install --user requests pandas
```

### Issue: "DataForSEO credentials not found"

**Solution:**
- Check environment variables are set:
  ```bash
  echo $DATAFORSEO_LOGIN
  echo $DATAFORSEO_PASSWORD
  ```
- If empty, set them (see Step 2)

### Issue: "Permission denied" when installing

**Solution:**
```bash
# Try without --user
pip3 install requests pandas

# Or use sudo (Mac/Linux)
sudo pip3 install requests pandas
```

### Issue: "API error" or "Rate limit"

**Solution:**
- Check your DataForSEO account limits
- Verify credentials are correct
- Check DataForSEO dashboard for API status

---

## Quick Test Command

Run this to test everything:

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025" && \
export DATAFORSEO_LOGIN='your_login' && \
export DATAFORSEO_PASSWORD='your_password' && \
python3 guides/weekly_ranking_check.py
```

*(Replace 'your_login' and 'your_password' with your actual credentials)*

---

## Next Steps

Once setup is complete:

1. ✅ Run your first weekly check
2. ✅ Review the weekly report
3. ✅ Set up weekly automation (optional)
   - See `RANKING_TRACKER_SETUP.md` for cron/GitHub Actions

---

**Need help?** Check the other guides:
- `QUICK_START_RANKING_TRACKER.md` - Quick overview
- `RANKING_TRACKER_SETUP.md` - Detailed setup
- `WEEKLY_RANKING_TRACKER.md` - Main guide
