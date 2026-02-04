#!/bin/bash
# Quick Setup - Run this to configure email immediately

cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025"

# Load email configuration
source guides/email_config.sh

# Test email
echo ""
echo "🧪 Testing email configuration..."
python3 guides/test_email_simple.py
