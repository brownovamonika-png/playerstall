#!/usr/bin/env python3
"""
Simple email test script
Tests if email configuration is working
"""

import os
import smtplib
from email.mime.text import MIMEText

print("=" * 60)
print("Email Configuration Test")
print("=" * 60)
print()

# Get configuration
email_to = os.getenv("RANKING_EMAIL_TO", "playerstallsports@gmail.com")
email_from = os.getenv("RANKING_EMAIL_FROM", "playerstallsports@gmail.com")
smtp_user = os.getenv("RANKING_SMTP_USER", "")
smtp_password = os.getenv("RANKING_SMTP_PASSWORD", "")
smtp_server = os.getenv("RANKING_SMTP_SERVER", "smtp.gmail.com")
smtp_port = int(os.getenv("RANKING_SMTP_PORT", "587"))

# Display configuration
print("📧 Email Configuration:")
print(f"   To: {email_to}")
print(f"   From: {email_from}")
print(f"   SMTP Server: {smtp_server}:{smtp_port}")
print(f"   SMTP User: {smtp_user if smtp_user else 'NOT SET'}")
print(f"   SMTP Password: {'SET' if smtp_password else 'NOT SET'}")
print()

# Check if credentials are set
if not smtp_user or not smtp_password:
    print("❌ ERROR: SMTP credentials not configured!")
    print()
    print("Please set:")
    print("  export RANKING_SMTP_USER='your-gmail@gmail.com'")
    print("  export RANKING_SMTP_PASSWORD='your-app-password'")
    print()
    exit(1)

# Try to send test email
print("🔍 Testing email connection...")
try:
    # Create message
    msg = MIMEText("This is a test email from the ranking tracker.\n\nIf you received this, your email configuration is working!")
    msg['Subject'] = 'Test Email - Ranking Tracker Configuration'
    msg['From'] = email_from
    msg['To'] = email_to
    
    # Connect and send
    print(f"   Connecting to {smtp_server}:{smtp_port}...")
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()
    
    print(f"   Authenticating as {smtp_user}...")
    server.login(smtp_user, smtp_password)
    
    print(f"   Sending email to {email_to}...")
    server.send_message(msg)
    server.quit()
    
    print()
    print("=" * 60)
    print("✅ SUCCESS! Test email sent!")
    print("=" * 60)
    print()
    print(f"📬 Check your inbox at: {email_to}")
    print("   (Also check spam/junk folder)")
    print()
    
except smtplib.SMTPAuthenticationError as e:
    print()
    print("=" * 60)
    print("❌ AUTHENTICATION FAILED")
    print("=" * 60)
    print()
    print("Possible issues:")
    print("  1. Wrong Gmail address or password")
    print("  2. Not using app password (need app password, not regular password)")
    print("  3. 2-Step Verification not enabled")
    print()
    print("Fix:")
    print("  1. Go to: https://myaccount.google.com/apppasswords")
    print("  2. Generate app password for 'Mail'")
    print("  3. Use that password (not your regular password)")
    print()
    print(f"Error: {e}")
    print()
    
except smtplib.SMTPConnectError as e:
    print()
    print("=" * 60)
    print("❌ CONNECTION FAILED")
    print("=" * 60)
    print()
    print("Cannot connect to email server.")
    print("Check:")
    print("  1. Internet connection")
    print("  2. SMTP server address: {smtp_server}")
    print("  3. SMTP port: {smtp_port}")
    print()
    print(f"Error: {e}")
    print()
    
except Exception as e:
    print()
    print("=" * 60)
    print("❌ ERROR")
    print("=" * 60)
    print()
    print(f"Error: {e}")
    print()
    print("Check your email configuration:")
    print("  export RANKING_SMTP_USER='your-gmail@gmail.com'")
    print("  export RANKING_SMTP_PASSWORD='your-app-password'")
    print()
