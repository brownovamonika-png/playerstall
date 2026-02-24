# Email Setup Guide - Weekly Ranking Reports

**Set up automated email delivery of your weekly ranking reports**

---

## Quick Setup (Gmail)

### Step 1: Get Gmail App Password

1. **Go to Google Account Settings:**
   - Visit: https://myaccount.google.com/
   - Click **Security** (left sidebar)

2. **Enable 2-Step Verification** (if not already enabled):
   - Click **2-Step Verification**
   - Follow the setup process

3. **Create App Password:**
   - Go back to **Security**
   - Click **App passwords** (under "2-Step Verification")
   - Select **Mail** and **Other (Custom name)**
   - Enter name: "Ranking Tracker"
   - Click **Generate**
   - **Copy the 16-character password** (you'll need this!)

### Step 2: Set Environment Variables

**Mac/Linux (Terminal):**

```bash
# Add to your ~/.zshrc or ~/.bash_profile
export RANKING_EMAIL_ENABLED=true
export RANKING_EMAIL_TO='your-email@gmail.com'
export RANKING_EMAIL_FROM='your-email@gmail.com'
export RANKING_SMTP_SERVER='smtp.gmail.com'
export RANKING_SMTP_PORT='587'
export RANKING_SMTP_USER='your-email@gmail.com'
export RANKING_SMTP_PASSWORD='your-16-char-app-password'

# Then reload:
source ~/.zshrc  # or source ~/.bash_profile
```

**Or set temporarily:**

```bash
export RANKING_EMAIL_ENABLED=true
export RANKING_EMAIL_TO='your-email@gmail.com'
export RANKING_EMAIL_FROM='your-email@gmail.com'
export RANKING_SMTP_SERVER='smtp.gmail.com'
export RANKING_SMTP_PORT='587'
export RANKING_SMTP_USER='your-email@gmail.com'
export RANKING_SMTP_PASSWORD='your-16-char-app-password'
```

**Windows (Command Prompt):**

```cmd
set RANKING_EMAIL_ENABLED=true
set RANKING_EMAIL_TO=your-email@gmail.com
set RANKING_EMAIL_FROM=your-email@gmail.com
set RANKING_SMTP_SERVER=smtp.gmail.com
set RANKING_SMTP_PORT=587
set RANKING_SMTP_USER=your-email@gmail.com
set RANKING_SMTP_PASSWORD=your-16-char-app-password
```

### Step 3: Test Email

Run the script:

```bash
python3 guides/weekly_ranking_check.py
```

You should receive an email with your ranking report!

---

## Other Email Providers

### Outlook/Office 365

```bash
export RANKING_SMTP_SERVER='smtp.office365.com'
export RANKING_SMTP_PORT='587'
export RANKING_SMTP_USER='your-email@outlook.com'
export RANKING_SMTP_PASSWORD='your-password'
```

### Yahoo Mail

```bash
export RANKING_SMTP_SERVER='smtp.mail.yahoo.com'
export RANKING_SMTP_PORT='587'
export RANKING_SMTP_USER='your-email@yahoo.com'
export RANKING_SMTP_PASSWORD='your-app-password'
```

### Custom SMTP Server

```bash
export RANKING_SMTP_SERVER='your-smtp-server.com'
export RANKING_SMTP_PORT='587'  # or 465 for SSL
export RANKING_SMTP_USER='your-username'
export RANKING_SMTP_PASSWORD='your-password'
```

---

## Using .env File (Alternative)

### Step 1: Create .env File

Create a file named `.env` in your project root:

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"
touch .env
```

### Step 2: Add Email Configuration

Add to `.env`:

```
RANKING_EMAIL_ENABLED=true
RANKING_EMAIL_TO=your-email@gmail.com
RANKING_EMAIL_FROM=your-email@gmail.com
RANKING_SMTP_SERVER=smtp.gmail.com
RANKING_SMTP_PORT=587
RANKING_SMTP_USER=your-email@gmail.com
RANKING_SMTP_PASSWORD=your-app-password
```

### Step 3: Install python-dotenv

```bash
pip3 install --user python-dotenv
```

### Step 4: Update Script

Add to the top of `weekly_ranking_check.py`:

```python
from dotenv import load_dotenv
load_dotenv()
```

---

## Email Configuration Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `RANKING_EMAIL_ENABLED` | Enable/disable email | `true` or `false` |
| `RANKING_EMAIL_TO` | Recipient email | `your-email@gmail.com` |
| `RANKING_EMAIL_FROM` | Sender email | `your-email@gmail.com` |
| `RANKING_SMTP_SERVER` | SMTP server | `smtp.gmail.com` |
| `RANKING_SMTP_PORT` | SMTP port | `587` (TLS) or `465` (SSL) |
| `RANKING_SMTP_USER` | SMTP username | `your-email@gmail.com` |
| `RANKING_SMTP_PASSWORD` | SMTP password | App password (Gmail) |

---

## Troubleshooting

### "Email disabled" Message

**Solution:**
```bash
export RANKING_EMAIL_ENABLED=true
```

### "Email address not configured"

**Solution:**
```bash
export RANKING_EMAIL_TO='your-email@gmail.com'
```

### "Authentication failed" Error

**Causes:**
- Wrong password
- Need app password (Gmail)
- 2FA not enabled (Gmail)

**Solution:**
- Use app password, not regular password
- Enable 2-Step Verification
- Check credentials are correct

### "Connection refused" Error

**Causes:**
- Wrong SMTP server
- Wrong port
- Firewall blocking

**Solution:**
- Verify SMTP server address
- Try port 587 (TLS) or 465 (SSL)
- Check firewall settings

---

## Security Notes

### ⚠️ Important:

1. **Never commit `.env` file to git**
   - Add `.env` to `.gitignore`
   - Keep credentials private

2. **Use App Passwords (Gmail)**
   - Don't use your main password
   - Generate app-specific password

3. **Environment Variables**
   - More secure than hardcoding
   - Don't share credentials

---

## Testing Email

### Quick Test:

```bash
# Set all variables
export RANKING_EMAIL_ENABLED=true
export RANKING_EMAIL_TO='your-email@gmail.com'
export RANKING_EMAIL_FROM='your-email@gmail.com'
export RANKING_SMTP_SERVER='smtp.gmail.com'
export RANKING_SMTP_PORT='587'
export RANKING_SMTP_USER='your-email@gmail.com'
export RANKING_SMTP_PASSWORD='your-app-password'

# Run script
python3 guides/weekly_ranking_check.py
```

**Expected:**
- ✅ Script runs
- ✅ Email sent message appears
- ✅ Email arrives in inbox

---

## Weekly Automation

Once email is working, set up weekly automation:

### Option 1: Cron Job (Mac/Linux)

```bash
# Edit crontab
crontab -e

# Add this line (runs every Monday at 9 AM)
0 9 * * 1 cd /path/to/project && /usr/bin/python3 guides/weekly_ranking_check.py
```

### Option 2: GitHub Actions

See `RANKING_TRACKER_SETUP.md` for GitHub Actions setup.

---

## Email Format

You'll receive:

**Subject:** `Weekly Ranking Report - 2026-01-24 | playerstall.com`

**Content:**
- Summary statistics
- Top movers (improvements/declines)
- Current rankings
- Action items
- Full ranking table

**Format:** HTML email with styling

---

## Next Steps

1. ✅ Set up Gmail app password
2. ✅ Configure environment variables
3. ✅ Test email delivery
4. ✅ Set up weekly automation
5. ✅ Receive reports every Monday!

---

**Need help?** Check the script output for error messages - they'll tell you what's missing!
