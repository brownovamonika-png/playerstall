# Fix Email Issue - Step by Step

**Let's diagnose why emails aren't being sent**

---

## Step 1: Load Your Configuration

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"
source guides/email_config.sh
```

---

## Step 2: Run Diagnostic Tool

This will test your email configuration and find the problem:

```bash
python3 guides/diagnose_email.py
```

**This will:**
- ✅ Check all your settings
- ✅ Test different SMTP servers
- ✅ Try to authenticate
- ✅ Send a test email
- ✅ Tell you exactly what's wrong

---

## Step 3: Check the Output

The diagnostic will tell you:

### If it says "Authentication failed":
**Problem:** Password is wrong or needs app password

**Fix for Google Workspace:**
1. Go to: https://myaccount.google.com/apppasswords
2. Generate app password for "Mail"
3. Use that password instead

**Update:**
```bash
export RANKING_SMTP_PASSWORD='your-new-app-password'
```

### If it says "Connection failed":
**Problem:** Wrong SMTP server

**Check what email provider you're using:**
- Google Workspace → `smtp.gmail.com`
- Microsoft 365 → `smtp.office365.com`
- Other → Check with your provider

**Update:**
```bash
export RANKING_SMTP_SERVER='correct-server-here'
export RANKING_SMTP_PORT='587'
```

### If it says "Email sent successfully":
**Problem:** Email might be in spam or delayed

**Check:**
1. Spam/junk folder
2. Wait 5-10 minutes
3. Search for "Ranking Tracker" in your email

---

## Step 4: What Email Provider Are You Using?

**playerstallsports@gmail.com** could be hosted by:

### Option A: Google Workspace
- SMTP: `smtp.gmail.com`
- Port: `587`
- **Need:** App password (not regular password)

### Option B: Microsoft 365
- SMTP: `smtp.office365.com`
- Port: `587`
- **Need:** Regular password (usually works)

### Option C: Other Provider
- Check with your email provider for SMTP settings
- Common: cPanel, Zoho, etc.

---

## Quick Fix Commands

### If Using Google Workspace:

```bash
# Get app password from: https://myaccount.google.com/apppasswords
export RANKING_EMAIL_ENABLED=true
export RANKING_EMAIL_TO='playerstallsports@gmail.com'
export RANKING_EMAIL_FROM='playerstallsports@gmail.com'
export RANKING_SMTP_USER='playerstallsports@gmail.com'
export RANKING_SMTP_PASSWORD='your-app-password-here'  # Use app password!
export RANKING_SMTP_SERVER='smtp.gmail.com'
export RANKING_SMTP_PORT='587'

python3 guides/diagnose_email.py
```

### If Using Microsoft 365:

```bash
export RANKING_EMAIL_ENABLED=true
export RANKING_EMAIL_TO='playerstallsports@gmail.com'
export RANKING_EMAIL_FROM='playerstallsports@gmail.com'
export RANKING_SMTP_USER='playerstallsports@gmail.com'
export RANKING_SMTP_PASSWORD='Freshst@rt2025'
export RANKING_SMTP_SERVER='smtp.office365.com'  # Different server!
export RANKING_SMTP_PORT='587'

python3 guides/diagnose_email.py
```

---

## Most Common Issue: Google Workspace Needs App Password

If `playerstallsports@gmail.com` is Google Workspace:

1. **Regular password won't work** - need app password
2. **Get app password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Sign in with playerstallsports@gmail.com
   - Generate app password
   - Use that instead of `Freshst@rt2025`

---

## Run This Now:

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"
source guides/email_config.sh
python3 guides/diagnose_email.py
```

**Copy the output and share it with me** - I'll tell you exactly what to fix!

---

## Alternative: Check Email Provider

**To find out what email provider you're using:**

1. **Check your email settings** (in your email client or webmail)
2. **Look for SMTP settings** - that will tell you the server
3. **Or ask your IT/admin** - they'll know the SMTP settings

Once you know the SMTP server, update:
```bash
export RANKING_SMTP_SERVER='your-smtp-server-here'
```

---

**Run the diagnostic tool and share the output!** 🔍
