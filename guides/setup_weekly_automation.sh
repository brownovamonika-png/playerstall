#!/bin/bash
# Setup Weekly Google Ranking Tracker Automation
# Runs every Monday at 9:00 AM

echo "=========================================="
echo "Google Ranking Tracker - Weekly Automation Setup"
echo "=========================================="
echo ""

PROJECT_DIR="/Users/monikabrownova/Documents/github/player-stall December 19 2025"
SCRIPT_PATH="$PROJECT_DIR/guides/google_ranking_tracker.py"
PYTHON_PATH=$(which python3)

echo "📋 Configuration:"
echo "   Project: $PROJECT_DIR"
echo "   Script: $SCRIPT_PATH"
echo "   Python: $PYTHON_PATH"
echo ""

# Check if script exists
if [ ! -f "$SCRIPT_PATH" ]; then
    echo "❌ Error: Script not found at $SCRIPT_PATH"
    exit 1
fi

# Check if Python is available
if [ -z "$PYTHON_PATH" ]; then
    echo "❌ Error: Python 3 not found"
    exit 1
fi

echo "✅ Script found"
echo "✅ Python found"
echo ""

# Create cron job
CRON_JOB="0 9 * * 1 cd \"$PROJECT_DIR\" && $PYTHON_PATH guides/google_ranking_tracker.py >> guides/ranking_data/cron.log 2>&1"

echo "📅 Cron Job Configuration:"
echo "   Schedule: Every Monday at 9:00 AM"
echo "   Command: $CRON_JOB"
echo ""

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "google_ranking_tracker.py"; then
    echo "⚠️  Cron job already exists!"
    echo ""
    echo "Current crontab:"
    crontab -l | grep "google_ranking_tracker"
    echo ""
    read -p "Do you want to replace it? (y/n): " replace
    if [ "$replace" != "y" ]; then
        echo "Keeping existing cron job."
        exit 0
    fi
    # Remove old cron job
    crontab -l 2>/dev/null | grep -v "google_ranking_tracker.py" | crontab -
fi

# Add new cron job
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "✅ Cron job added successfully!"
echo ""
echo "📋 Current crontab:"
crontab -l | grep "google_ranking_tracker"
echo ""
echo "🎯 Your Google Ranking Tracker will now run:"
echo "   - Every Monday at 9:00 AM"
echo "   - Automatically checks all 23 keywords"
echo "   - Generates weekly report"
echo "   - Saves to: guides/ranking_data/"
echo ""
echo "📧 To enable email reports, set:"
echo "   export RANKING_EMAIL_ENABLED=true"
echo "   export RANKING_EMAIL_TO='monika@customsportslockers.com'"
echo "   (and other email settings)"
echo ""
echo "📄 View logs:"
echo "   tail -f guides/ranking_data/cron.log"
echo ""
echo "✅ Setup complete!"
