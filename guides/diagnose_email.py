#!/usr/bin/env python3
"""
Email Diagnostic Tool
Helps identify why emails aren't being sent
"""

import os
import sys
import smtplib
from email.mime.text import MIMEText

print("=" * 70)
print("EMAIL DIAGNOSTIC TOOL")
print("=" * 70)
print()

# Check all configuration
print("📋 Checking Configuration...")
print()

email_enabled = os.getenv("RANKING_EMAIL_ENABLED", "false").lower() == "true"
email_to = os.getenv("RANKING_EMAIL_TO", "playerstallsports@gmail.com")
email_from = os.getenv("RANKING_EMAIL_FROM", "playerstallsports@gmail.com")
smtp_user = os.getenv("RANKING_SMTP_USER", "playerstallsports@gmail.com")
smtp_password = os.getenv("RANKING_SMTP_PASSWORD", "Freshst@rt2025")
smtp_server = os.getenv("RANKING_SMTP_SERVER", "smtp.gmail.com")
smtp_port = int(os.getenv("RANKING_SMTP_PORT", "587"))

# Display configuration
config_ok = True

print("Configuration Status:")
print(f"  Email Enabled: {'✅ YES' if email_enabled else '❌ NO'}")
if not email_enabled:
    print("     ⚠️  Set: export RANKING_EMAIL_ENABLED=true")
    config_ok = False

print(f"  Email To: {email_to}")
print(f"  Email From: {email_from}")
print(f"  SMTP User: {smtp_user if smtp_user else '❌ NOT SET'}")
if not smtp_user:
    config_ok = False

print(f"  SMTP Password: {'✅ SET' if smtp_password else '❌ NOT SET'}")
if not smtp_password:
    config_ok = False

print(f"  SMTP Server: {smtp_server}")
print(f"  SMTP Port: {smtp_port}")
print()

if not config_ok:
    print("❌ Configuration incomplete! Please set missing values.")
    print()
    print("Run these commands:")
    print("  export RANKING_EMAIL_ENABLED=true")
    print("  export RANKING_SMTP_USER='playerstallsports@gmail.com'")
    print("  export RANKING_SMTP_PASSWORD='Freshst@rt2025'")
    sys.exit(1)

# Test connection
print("=" * 70)
print("🔍 Testing Connection...")
print()

# Try different SMTP servers
smtp_servers_to_try = [
    ("smtp.gmail.com", 587, "Google/Gmail"),
    ("smtp.office365.com", 587, "Microsoft 365/Outlook"),
    ("smtp.gmail.com", 465, "Google/Gmail (SSL)"),
]

for server, port, provider in smtp_servers_to_try:
    print(f"Trying {provider} ({server}:{port})...")
    try:
        # Test connection
        smtp = smtplib.SMTP(server, port, timeout=10)
        smtp.starttls()
        print(f"  ✅ Connected to {server}:{port}")
        
        # Test authentication
        try:
            smtp.login(smtp_user, smtp_password)
            print(f"  ✅ Authentication successful!")
            smtp.quit()
            
            # If we get here, this server works!
            print()
            print("=" * 70)
            print("✅ SUCCESS! Found working SMTP server!")
            print("=" * 70)
            print()
            print(f"Working Configuration:")
            print(f"  SMTP Server: {server}")
            print(f"  SMTP Port: {port}")
            print()
            print("Update your configuration:")
            print(f"  export RANKING_SMTP_SERVER='{server}'")
            print(f"  export RANKING_SMTP_PORT='{port}'")
            print()
            
            # Try sending test email
            print("📧 Sending test email...")
            try:
                msg = MIMEText("Test email from ranking tracker diagnostic tool.")
                msg['Subject'] = 'Test Email - Ranking Tracker'
                msg['From'] = email_from
                msg['To'] = email_to
                
                smtp = smtplib.SMTP(server, port)
                smtp.starttls()
                smtp.login(smtp_user, smtp_password)
                smtp.send_message(msg)
                smtp.quit()
                
                print(f"  ✅ Test email sent to {email_to}!")
                print()
                print("Check your inbox (and spam folder) for the test email.")
                print()
                sys.exit(0)
                
            except Exception as e:
                print(f"  ⚠️  Connected but couldn't send email: {e}")
                print("  This might be a permissions issue.")
                continue
                
        except smtplib.SMTPAuthenticationError as e:
            print(f"  ❌ Authentication failed: {e}")
            print()
            if "535" in str(e) or "530" in str(e):
                print("  ⚠️  This usually means:")
                print("     - Wrong password")
                print("     - Need app password (for Gmail/Google Workspace)")
                print("     - 2-Step Verification not enabled")
                print()
                print("  For Google Workspace/Gmail:")
                print("    1. Go to: https://myaccount.google.com/apppasswords")
                print("    2. Generate app password for 'Mail'")
                print("    3. Use that password instead")
            continue
            
    except smtplib.SMTPConnectError as e:
        print(f"  ❌ Connection failed: {e}")
        continue
    except Exception as e:
        print(f"  ❌ Error: {e}")
        continue

print()
print("=" * 70)
print("❌ COULDN'T CONNECT TO ANY SMTP SERVER")
print("=" * 70)
print()
print("Possible issues:")
print("  1. Wrong email provider (need correct SMTP server)")
print("  2. Firewall blocking connection")
print("  3. Internet connection issue")
print("  4. Email provider requires different settings")
print()
print("Next steps:")
print("  1. Check what email provider hosts playerstallsports@gmail.com")
print("  2. Get SMTP settings from your email provider")
print("  3. Try manual SMTP test with correct server")
print()
