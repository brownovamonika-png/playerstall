#!/usr/bin/env bash
# Renders public/playerstall-brand-board.html to a printable PDF
# (local static server + Chrome headless). macOS-oriented Chrome path.

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC="$ROOT/public"
OUT="${1:-$PUBLIC/playerstall-brand-board.pdf}"
PORT="${PDF_SPEC_PORT:-$(python3 -c 'import socket; s=socket.socket(); s.bind(("",0)); print(s.getsockname()[1]); s.close()')}"

cleanup() {
  if [[ -n "${SERVER_PID:-}" ]] && kill -0 "$SERVER_PID" 2>/dev/null; then
    kill "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

cd "$PUBLIC"
python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER_PID=$!

for _ in $(seq 1 50); do
  if curl -sf "http://127.0.0.1:$PORT/playerstall-brand-board.html" -o /dev/null; then
    break
  fi
  sleep 0.1
done

CHROME=""
for c in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium" \
  "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary"
do
  if [[ -x "$c" ]]; then CHROME="$c"; break; fi
done

if [[ -z "$CHROME" ]]; then
  echo "Chrome or Chromium not found in /Applications. Install Google Chrome, or set CHROME to the browser binary." >&2
  exit 1
fi

URL="http://127.0.0.1:$PORT/playerstall-brand-board.html"
# Allow time for Google Fonts + CDN logo image
"$CHROME" --headless=new --disable-gpu --no-first-run --no-default-browser-check \
  --run-all-compositor-stages-before-draw --virtual-time-budget=12000 \
  --no-pdf-header-footer \
  --print-to-pdf="$OUT" \
  "$URL"

echo "Wrote $OUT"
ls -lh "$OUT"
