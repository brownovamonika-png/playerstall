#!/bin/bash
# Quick email setup script for monika@customsportslockers.com

echo "📧 Setting up email for weekly ranking reports..."
echo ""

# Set email configuration
export RANKING_EMAIL_ENABLED=true
export RANKING_EMAIL_TO='monika@customsportslockers.com'
export RANKING_EMAIL_FROM='monika@customsportslockers.com'
export RANKING_SMTP_SERVER='smtp.gmail.com'
export RANKING_SMTP_PORT='587'

echo "✅ Email configured for: monika@customsportslockers.com"
echo ""
echo "⚠️  You still need to set:"
echo "   export RANKING_SMTP_USER='your-gmail@gmail.com'"
echo "   export RANKING_SMTP_PASSWORD='your-app-password'"
echo ""
echo "To get Gmail app password:"
echo "   1. Go to: https://myaccount.google.com/apppasswords"
echo "   2. Generate app password for 'Mail'"
echo "   3. Copy the 16-character password"
echo ""
echo "Then run:"
echo "   source guides/setup_email.sh"
echo "   export RANKING_SMTP_USER='your-gmail@gmail.com'"
echo "   export RANKING_SMTP_PASSWORD='your-app-password'"
echo "   python3 guides/weekly_ranking_check.py"
