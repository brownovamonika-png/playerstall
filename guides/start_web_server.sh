#!/bin/bash
# Start Local Web Server to View Ranking Reports

cd "/Users/monikabrownova/Documents/github/player-stall December 19 2025/guides/ranking_data"

PORT=8000

echo "=========================================="
echo "Google Ranking Tracker - Web Viewer"
echo "=========================================="
echo ""
echo "🌐 Starting web server..."
echo ""
echo "📊 View your reports at:"
echo "   http://localhost:$PORT"
echo ""
echo "📁 Viewing directory:"
pwd
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start Python's built-in HTTP server
python3 -m http.server $PORT
