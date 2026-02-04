#!/bin/bash
# Email Configuration for Weekly Ranking Reports
# Email: monika@customsportslockers.com

export RANKING_EMAIL_ENABLED=true
export RANKING_EMAIL_TO='monika@customsportslockers.com'
export RANKING_EMAIL_FROM='monika@customsportslockers.com'
export RANKING_SMTP_USER='monika@customsportslockers.com'
export RANKING_SMTP_PASSWORD='Freshst@rt2025'

# Try Google Workspace SMTP first (if using Google Workspace)
export RANKING_SMTP_SERVER='smtp.gmail.com'
export RANKING_SMTP_PORT='587'

echo "✅ Email configuration set for monika@customsportslockers.com"
echo ""
echo "📧 Configuration:"
echo "   To: monika@customsportslockers.com"
echo "   From: monika@customsportslockers.com"
echo "   SMTP Server: smtp.gmail.com:587"
echo ""
echo "⚠️  Note: If this doesn't work, you may need:"
echo "   1. Google Workspace app password (if using Google Workspace)"
echo "   2. Different SMTP server (if using different email provider)"
echo ""
echo "To test: python3 guides/test_email_simple.py"
