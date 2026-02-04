# Email Setup Complete ✅

**Your email is configured for: monika@customsportslockers.com**

---

## 🚀 Quick Start

### Option 1: Run Setup Script (Easiest)

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"
source guides/email_config.sh
python3 guides/weekly_ranking_check.py
```

### Option 2: Manual Setup

```bash
cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"

export RANKING_EMAIL_ENABLED=true
export RANKING_EMAIL_TO='monika@customsportslockers.com'
export RANKING_EMAIL_FROM='monika@customsportslockers.com'
export RANKING_SMTP_USER='monika@customsportslockers.com'
export RANKING_SMTP_PASSWORD='Freshst@rt2025'
export RANKING_SMTP_SERVER='smtp.gmail.com'
export RANKING_SMTP_PORT='587'

python3 guides/weekly_ranking_check.py
```

---

## ⚠️ Important Notes

### If Using Google Workspace:

If `monika@customsportslockers.com` is a Google Workspace email, you may need:

1. **App Password** (not regular password)
   - Go to: https://myaccount.google.com/apppasswords
   - Generate app password for "Mail"
   - Use that instead of regular password

2. **SMTP Settings:**
   - Server: `smtp.gmail.com`
   - Port: `587`
   - These are already set correctly

### If Using Different Email Provider:

**Microsoft 365 / Outlook:**
```bash
export RANKING_SMTP_SERVER='smtp.office365.com'
export RANKING_SMTP_PORT='587'
```

**Other Providers:**
- Check with your email provider for SMTP settings
- Common ports: 587 (TLS) or 465 (SSL)

---

## 🧪 Test Email Configuration

Test if email is working:

```bash
python3 guides/test_email_simple.py
```

This will:
- Show your configuration
- Test connection
- Send a test email
- Show any errors

---

## ✅ What Should Happen

When you run the ranking check:

1. Script checks rankings
2. Generates report
3. Sends email to: `monika@customsportslockers.com`
4. You see: `✅ Email sent successfully`

**Check your inbox!** (Also check spam folder)

---

## 🔄 Make It Permanent

To save these settings:

### Add to ~/.zshrc:

```bash
nano ~/.zshrc
```

Add these lines:

```bash
# Weekly Ranking Report Email
export RANKING_EMAIL_ENABLED=true
export RANKING_EMAIL_TO='monika@customsportslockers.com'
export RANKING_EMAIL_FROM='monika@customsportslockers.com'
export RANKING_SMTP_USER='monika@customsportslockers.com'
export RANKING_SMTP_PASSWORD='Freshst@rt2025'
export RANKING_SMTP_SERVER='smtp.gmail.com'
export RANKING_SMTP_PORT='587'
```

Save and reload:
```bash
source ~/.zshrc
```

---

## ❓ Troubleshooting

### "Authentication failed"

**If using Google Workspace:**
- Need app password (not regular password)
- Get from: https://myaccount.google.com/apppasswords

**If using other provider:**
- Check SMTP server settings
- Verify password is correct

### "Connection refused"

**Try different SMTP server:**
- Google Workspace: `smtp.gmail.com`
- Microsoft 365: `smtp.office365.com`
- Check with your email provider

### Email not arriving

1. Check spam folder
2. Wait 5-10 minutes (sometimes delayed)
3. Verify email address: `monika@customsportslockers.com`
4. Test with different email address first

---

## 🎯 Next Steps

1. ✅ Run: `source guides/email_config.sh`
2. ✅ Test: `python3 guides/test_email_simple.py`
3. ✅ Run ranking check: `python3 guides/weekly_ranking_check.py`
4. ✅ Check email inbox!

---

**Ready to test?** Run:

```bash
source guides/email_config.sh
python3 guides/test_email_simple.py
```
