#!/bin/bash
# Email Configuration for Weekly Ranking Reports
# Email: playerstallsports@gmail.com

export RANKING_EMAIL_ENABLED=true
export RANKING_EMAIL_TO='playerstallsports@gmail.com'
export RANKING_EMAIL_FROM='playerstallsports@gmail.com'
export RANKING_SMTP_USER='playerstallsports@gmail.com'
export RANKING_SMTP_PASSWORD='Freshst@rt2025'

# Try Google Workspace SMTP first (if using Google Workspace)
export RANKING_SMTP_SERVER='smtp.gmail.com'
export RANKING_SMTP_PORT='587'

echo "✅ Email configuration set for playerstallsports@gmail.com"
echo ""
echo "📧 Configuration:"
echo "   To: playerstallsports@gmail.com"
echo "   From: playerstallsports@gmail.com"
echo "   SMTP Server: smtp.gmail.com:587"
echo ""
echo "⚠️  Note: If this doesn't work, you may need:"
echo "   1. Google Workspace app password (if using Google Workspace)"
echo "   2. Different SMTP server (if using different email provider)"
echo ""
echo "To test: python3 guides/test_email_simple.py"
