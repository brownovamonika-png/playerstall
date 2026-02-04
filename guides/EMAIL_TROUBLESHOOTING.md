# Email Troubleshooting Guide

**Didn't receive the email? Let's fix it!**

---

## 🔍 Step 1: Check What Happened

### Run the script and look for these messages:

```bash
python3 guides/weekly_ranking_check.py
```

### What to Look For:

**✅ Good Signs:**
- `📧 Sending email to monika@customsportslockers.com...`
- `✅ Email sent successfully to monika@customsportslockers.com`

**❌ Problem Signs:**
- `📧 Email disabled` → Email not enabled
- `⚠️ Email address not configured` → Missing email address
- `❌ Error sending email:` → Authentication or connection issue

---

## 🔧 Common Issues & Fixes

### Issue 1: "Email disabled" Message

**Problem:** Email feature is not enabled

**Fix:**
```bash
export RANKING_EMAIL_ENABLED=true
```

Then run the script again:
```bash
python3 guides/weekly_ranking_check.py
```

---

### Issue 2: "Email address not configured"

**Problem:** Email address not set

**Fix:**
```bash
export RANKING_EMAIL_TO='monika@customsportslockers.com'
export RANKING_EMAIL_FROM='monika@customsportslockers.com'
```

Then run the script again.

---

### Issue 3: "Authentication failed" Error

**Problem:** Gmail credentials are wrong

**Check:**
1. Are you using **app password** (not regular password)?
2. Is 2-Step Verification enabled?
3. Is the Gmail address correct?

**Fix:**
```bash
# Get new app password from: https://myaccount.google.com/apppasswords
export RANKING_SMTP_USER='your-gmail@gmail.com'
export RANKING_SMTP_PASSWORD='your-16-char-app-password'
```

**Verify credentials are set:**
```bash
echo $RANKING_SMTP_USER
echo $RANKING_SMTP_PASSWORD
```

If these are empty, set them again.

---

### Issue 4: "Connection refused" or "Connection timeout"

**Problem:** Can't connect to Gmail server

**Check:**
1. Internet connection working?
2. Firewall blocking connection?
3. Try again in a few minutes

**Fix:**
```bash
# Verify SMTP settings
export RANKING_SMTP_SERVER='smtp.gmail.com'
export RANKING_SMTP_PORT='587'
```

---

### Issue 5: Script says "Email sent" but no email arrives

**Possible Causes:**

1. **Check Spam/Junk Folder**
   - Look in spam folder
   - Check "Promotions" tab (Gmail)
   - Search for "Weekly Ranking Report"

2. **Email Address Typo**
   - Verify: `monika@customsportslockers.com`
   - Check for typos

3. **Email Server Delay**
   - Wait 5-10 minutes
   - Sometimes emails are delayed

4. **Email Provider Blocking**
   - Check if customsportslockers.com email server is blocking
   - Try sending to a Gmail address to test

---

## 🧪 Test Email Configuration

### Quick Test Script

Create a test file to verify email setup:

```bash
# Create test script
cat > test_email.py << 'EOF'
import os
import smtplib
from email.mime.text import MIMEText

# Get configuration
email_to = os.getenv("RANKING_EMAIL_TO", "monika@customsportslockers.com")
smtp_user = os.getenv("RANKING_SMTP_USER", "")
smtp_password = os.getenv("RANKING_SMTP_PASSWORD", "")

print(f"Email To: {email_to}")
print(f"SMTP User: {smtp_user}")
print(f"SMTP Password: {'*' * len(smtp_password) if smtp_password else 'NOT SET'}")

if not smtp_user or not smtp_password:
    print("\n❌ ERROR: SMTP credentials not set!")
    print("Set them with:")
    print("  export RANKING_SMTP_USER='your-gmail@gmail.com'")
    print("  export RANKING_SMTP_PASSWORD='your-app-password'")
    exit(1)

try:
    msg = MIMEText("Test email from ranking tracker")
    msg['Subject'] = 'Test Email - Ranking Tracker'
    msg['From'] = smtp_user
    msg['To'] = email_to
    
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(smtp_user, smtp_password)
    server.send_message(msg)
    server.quit()
    
    print("\n✅ Test email sent successfully!")
    print(f"Check inbox at: {email_to}")
except Exception as e:
    print(f"\n❌ Error: {e}")
EOF

# Run test
python3 test_email.py
```

---

## ✅ Complete Setup Checklist

Run through this checklist:

```bash
# 1. Check if email is enabled
echo "Email Enabled: $RANKING_EMAIL_ENABLED"

# 2. Check recipient email
echo "Email To: $RANKING_EMAIL_TO"

# 3. Check sender email
echo "Email From: $RANKING_EMAIL_FROM"

# 4. Check SMTP user
echo "SMTP User: $RANKING_SMTP_USER"

# 5. Check SMTP password (should show asterisks)
echo "SMTP Password: ${RANKING_SMTP_PASSWORD:+SET}"

# 6. Check SMTP server
echo "SMTP Server: $RANKING_SMTP_SERVER"

# 7. Check SMTP port
echo "SMTP Port: $RANKING_SMTP_PORT"
```

**All should show values (not empty)!**

---

## 🔄 Complete Setup (Start Over)

If nothing works, start fresh:

```bash
# Navigate to project
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"

# Set all email configuration
export RANKING_EMAIL_ENABLED=true
export RANKING_EMAIL_TO='monika@customsportslockers.com'
export RANKING_EMAIL_FROM='monika@customsportslockers.com'
export RANKING_SMTP_SERVER='smtp.gmail.com'
export RANKING_SMTP_PORT='587'

# Set your Gmail credentials (REPLACE these!)
export RANKING_SMTP_USER='your-gmail@gmail.com'
export RANKING_SMTP_PASSWORD='your-app-password'

# Verify they're set
echo "SMTP User: $RANKING_SMTP_USER"
echo "SMTP Password Set: ${RANKING_SMTP_PASSWORD:+YES}"

# Run the script
python3 guides/weekly_ranking_check.py
```

---

## 📧 Alternative: Test with Gmail Address

If `monika@customsportslockers.com` isn't receiving emails, test with a Gmail address first:

```bash
# Temporarily change recipient
export RANKING_EMAIL_TO='your-gmail@gmail.com'

# Run script
python3 guides/weekly_ranking_check.py

# If this works, the issue is with customsportslockers.com email
# If this doesn't work, the issue is with Gmail setup
```

---

## 🆘 Still Not Working?

### Get Detailed Error Message

Run the script and copy the **full error message**:

```bash
python3 guides/weekly_ranking_check.py 2>&1 | tee email_error.log
```

Then check `email_error.log` for the exact error.

### Common Error Messages:

**"535-5.7.8 Username and Password not accepted"**
→ Wrong password or not using app password

**"530-5.5.1 Authentication Required"**
→ Need to enable "Less secure app access" OR use app password

**"Connection refused"**
→ Firewall or network issue

**"Timeout"**
→ Network issue, try again later

---

## 💡 Quick Fixes

### Fix 1: Verify All Settings

```bash
# Check everything is set
env | grep RANKING
```

Should show all 7 RANKING_* variables.

### Fix 2: Use Different Email Provider

If Gmail doesn't work, try Outlook:

```bash
export RANKING_SMTP_SERVER='smtp.office365.com'
export RANKING_SMTP_PORT='587'
export RANKING_SMTP_USER='your-email@outlook.com'
export RANKING_SMTP_PASSWORD='your-password'
```

### Fix 3: Check Python Can Send Email

```bash
python3 -c "import smtplib; print('✅ SMTP module available')"
```

---

## 📝 What Information Do I Need?

To help debug, please share:

1. **What message did you see?**
   - "Email sent successfully"?
   - "Error sending email"?
   - "Email disabled"?

2. **Did you check spam folder?**
   - Yes/No

3. **What's your Gmail address?** (for testing)
   - You can use a test Gmail address

4. **Error message** (if any)
   - Copy the full error

---

**Run the script again and let me know what message you see!**
