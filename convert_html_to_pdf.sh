#!/bin/bash

# Convert HTML to PDF using macOS Safari
HTML_FILE="/Users/monikabrownova/Documents/github/player-stall December 19 2025/Jason Vietnam Production Request colored lockers/producer-message-1.html"
PDF_FILE="/Users/monikabrownova/Documents/github/player-stall December 19 2025/Jason Vietnam Production Request colored lockers/producer-message-1.pdf"

# Convert file:// URL to absolute path
HTML_PATH=$(echo "$HTML_FILE" | sed 's/%20/ /g')

# Use Safari to print to PDF via AppleScript
osascript <<EOF
tell application "Safari"
    activate
    open POSIX file "$HTML_PATH"
    delay 2
    tell application "System Events"
        keystroke "p" using {command down}
        delay 1
        keystroke "s" using {command down}
        delay 1
        keystroke "$PDF_FILE"
        delay 1
        keystroke return
        delay 2
        keystroke "w" using {command down}
    end tell
end tell
EOF

echo "PDF conversion initiated. Please check: $PDF_FILE"
