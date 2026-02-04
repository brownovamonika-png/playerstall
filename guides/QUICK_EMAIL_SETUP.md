# Quick Email Setup - 5 Minutes

**Get weekly ranking reports emailed to you automatically**

---

## 🚀 Quick Setup (Gmail)

### Step 1: Get Gmail App Password (2 minutes)

1. Go to: https://myaccount.google.com/apppasswords
2. Sign in if needed
3. Select **Mail** → **Other (Custom name)**
4. Name it: "Ranking Tracker"
5. Click **Generate**
6. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)

### Step 2: Set Your Email (1 minute)

Open terminal and run:

```bash
export RANKING_EMAIL_ENABLED=true
export RANKING_EMAIL_TO='your-email@gmail.com'
export RANKING_EMAIL_FROM='your-email@gmail.com'
export RANKING_SMTP_SERVER='smtp.gmail.com'
export RANKING_SMTP_PORT='587'
export RANKING_SMTP_USER='your-email@gmail.com'
export RANKING_SMTP_PASSWORD='paste-your-16-char-password-here'
```

**Replace:**
- `your-email@gmail.com` with your actual email
- `paste-your-16-char-password-here` with the app password from Step 1

### Step 3: Test It (2 minutes)

```bash
python3 guides/weekly_ranking_check.py
```

**You should receive an email!** 📧

---

## ✅ That's It!

Now every time you run the script, you'll get an email with your ranking report.

---

## 🔄 Make It Permanent

To keep these settings, add to your `~/.zshrc`:

```bash
# Add to ~/.zshrc
export RANKING_EMAIL_ENABLED=true
export RANKING_EMAIL_TO='your-email@gmail.com'
export RANKING_EMAIL_FROM='your-email@gmail.com'
export RANKING_SMTP_SERVER='smtp.gmail.com'
export RANKING_SMTP_PORT='587'
export RANKING_SMTP_USER='your-email@gmail.com'
export RANKING_SMTP_PASSWORD='your-app-password'

# Then reload:
source ~/.zshrc
```

---

## 📧 What You'll Receive

Every Monday (or whenever you run the script):

**Email Subject:** `Weekly Ranking Report - [Date] | CustomSportsLockers.com`

**Email Includes:**
- Summary statistics
- Top movers (what's improving/declining)
- Current rankings for all 23 keywords
- Action items
- Full ranking table

---

## ❓ Troubleshooting

**"Email disabled" message?**
→ Set `RANKING_EMAIL_ENABLED=true`

**"Authentication failed"?**
→ Use app password, not regular password
→ Make sure 2-Step Verification is enabled

**Email not arriving?**
→ Check spam folder
→ Verify email address is correct
→ Check script output for errors

---

**Need more help?** See `EMAIL_SETUP_GUIDE.md` for detailed instructions.
