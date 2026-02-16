# Email Setup - Step by Step Instructions

**Set up weekly ranking reports to be emailed to playerstallsports@gmail.com**

---

## 📋 What You'll Need

- ✅ Gmail account (any Gmail address)
- ✅ 5 minutes
- ✅ Terminal/Command Line access

---

## Step 1: Get Gmail App Password (3 minutes)

### Why App Password?
Gmail requires an "App Password" for third-party apps (like our script) to send emails. This is more secure than using your regular password.

### How to Get It:

1. **Go to Google Account Settings:**
   - Open: https://myaccount.google.com/
   - Sign in if needed

2. **Enable 2-Step Verification** (if not already enabled):
   - Click **Security** (left sidebar)
   - Find **2-Step Verification**
   - Click **Get Started** and follow the prompts
   - You'll need your phone to verify

3. **Create App Password:**
   - Go back to **Security** page
   - Scroll down to **2-Step Verification** section
   - Click **App passwords** (or go directly to: https://myaccount.google.com/apppasswords)
   - You may need to sign in again

4. **Generate Password:**
   - Select app: **Mail**
   - Select device: **Other (Custom name)**
   - Type name: `Ranking Tracker`
   - Click **Generate**

5. **Copy the Password:**
   - You'll see a 16-character password (like: `abcd efgh ijkl mnop`)
   - **Copy this password** - you'll need it in Step 2
   - Click **Done**

**⚠️ Important:** Save this password somewhere safe - you won't be able to see it again!

---

## Step 2: Open Terminal

### Mac:
- Press `Cmd + Space`
- Type "Terminal"
- Press Enter

### Windows:
- Press `Windows + R`
- Type "cmd"
- Press Enter

---

## Step 3: Navigate to Your Project

Copy and paste this command:

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"
```

Press Enter.

---

## Step 4: Set Up Email Configuration

Copy and paste these commands **one at a time**, replacing the placeholders:

### Command 1: Enable Email
```bash
export RANKING_EMAIL_ENABLED=true
```

### Command 2: Set Recipient Email (Already Set!)
```bash
export RANKING_EMAIL_TO='playerstallsports@gmail.com'
```

### Command 3: Set Sender Email
```bash
export RANKING_EMAIL_FROM='playerstallsports@gmail.com'
```

### Command 4: Set SMTP Server
```bash
export RANKING_SMTP_SERVER='smtp.gmail.com'
```

### Command 5: Set SMTP Port
```bash
export RANKING_SMTP_PORT='587'
```

### Command 6: Set Your Gmail Address
**Replace `your-gmail@gmail.com` with your actual Gmail address:**

```bash
export RANKING_SMTP_USER='your-gmail@gmail.com'
```

**Example:**
```bash
export RANKING_SMTP_USER='monika@gmail.com'
```

### Command 7: Set App Password
**Replace `your-app-password` with the 16-character password from Step 1:**

```bash
export RANKING_SMTP_PASSWORD='your-app-password'
```

**Example:**
```bash
export RANKING_SMTP_PASSWORD='abcd efgh ijkl mnop'
```

**Note:** Include spaces in the password, or remove them - both work.

---

## Step 5: Test Email Setup

Run the ranking check script:

```bash
python3 guides/weekly_ranking_check.py
```

### What Should Happen:

1. Script runs and checks rankings
2. You see: `📧 Sending email to playerstallsports@gmail.com...`
3. You see: `✅ Email sent successfully to playerstallsports@gmail.com`
4. Check your email inbox at `playerstallsports@gmail.com`
5. You should receive an email with subject: `Weekly Ranking Report - [Date] | CustomSportsLockers.com`

### If You See Errors:

**"Email disabled"**
→ Make sure you ran: `export RANKING_EMAIL_ENABLED=true`

**"Authentication failed"**
→ Check your Gmail address and app password are correct
→ Make sure you're using app password, not regular password
→ Verify 2-Step Verification is enabled

**"Connection refused"**
→ Check your internet connection
→ Try again in a few minutes

---

## Step 6: Make It Permanent (Optional but Recommended)

Right now, the email settings only last for this terminal session. To make them permanent:

### Mac/Linux:

1. **Open your shell config file:**
   ```bash
   nano ~/.zshrc
   ```
   (Or use `~/.bash_profile` if you use bash)

2. **Add these lines at the end:**
   ```bash
   # Weekly Ranking Report Email Configuration
   export RANKING_EMAIL_ENABLED=true
   export RANKING_EMAIL_TO='playerstallsports@gmail.com'
   export RANKING_EMAIL_FROM='playerstallsports@gmail.com'
   export RANKING_SMTP_SERVER='smtp.gmail.com'
   export RANKING_SMTP_PORT='587'
   export RANKING_SMTP_USER='your-gmail@gmail.com'
   export RANKING_SMTP_PASSWORD='your-app-password'
   ```

3. **Save and exit:**
   - Press `Ctrl + X`
   - Press `Y` to confirm
   - Press `Enter`

4. **Reload your shell:**
   ```bash
   source ~/.zshrc
   ```

Now the settings will be saved and work every time you open a new terminal!

---

## ✅ Setup Complete!

Now every time you run:

```bash
python3 guides/weekly_ranking_check.py
```

You'll automatically receive an email at `playerstallsports@gmail.com` with your weekly ranking report!

---

## 📧 What You'll Receive

**Email Subject:** `Weekly Ranking Report - 2026-01-24 | CustomSportsLockers.com`

**Email Content:**
- Summary statistics (how many keywords ranking)
- Top movers (what's improving/declining)
- Current rankings for all 23 keywords
- Action items (what to continue/fix)
- Full ranking table

**Format:** Beautiful HTML email with styling

---

## 🔄 Weekly Automation (Optional)

Set it to run automatically every Monday:

### Mac/Linux:

1. **Edit crontab:**
   ```bash
   crontab -e
   ```

2. **Add this line** (runs every Monday at 9 AM):
   ```bash
   0 9 * * 1 cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025" && /usr/bin/python3 guides/weekly_ranking_check.py
   ```

3. **Save and exit:**
   - Press `Ctrl + X`
   - Press `Y` to confirm
   - Press `Enter`

Now you'll receive ranking reports automatically every Monday at 9 AM!

---

## ❓ Troubleshooting

### Problem: "ModuleNotFoundError: No module named 'smtplib'"

**Solution:** This is built into Python, so this shouldn't happen. Try:
```bash
python3 --version
```
Should show Python 3.7 or higher.

### Problem: "Email not arriving"

**Check:**
1. Spam/junk folder
2. Email address is correct: `playerstallsports@gmail.com`
3. Script output shows "Email sent successfully"
4. Wait a few minutes (sometimes delayed)

### Problem: "Authentication failed"

**Check:**
1. Using app password (not regular password)
2. 2-Step Verification is enabled
3. Gmail address is correct
4. App password copied correctly (no extra spaces)

### Problem: "Settings don't persist"

**Solution:** Add to `~/.zshrc` (see Step 6 above)

---

## 📝 Quick Reference

**All Commands in One Place:**

```bash
# Navigate to project
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"

# Set email configuration
export RANKING_EMAIL_ENABLED=true
export RANKING_EMAIL_TO='playerstallsports@gmail.com'
export RANKING_EMAIL_FROM='playerstallsports@gmail.com'
export RANKING_SMTP_SERVER='smtp.gmail.com'
export RANKING_SMTP_PORT='587'
export RANKING_SMTP_USER='your-gmail@gmail.com'
export RANKING_SMTP_PASSWORD='your-app-password'

# Test it
python3 guides/weekly_ranking_check.py
```

---

## 🎯 Next Steps

1. ✅ Complete Step 1-5 above
2. ✅ Test email delivery
3. ✅ (Optional) Make settings permanent (Step 6)
4. ✅ (Optional) Set up weekly automation
5. ✅ Receive weekly ranking reports!

---

**Need help?** Check the script output - error messages will tell you what's missing!

---

*Last Updated: January 24, 2026*
