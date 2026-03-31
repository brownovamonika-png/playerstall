"""
Vercel Serverless Function — /api/sync
This is the HTTP endpoint that Vercel's cron job hits on schedule.

Set your cron schedule in vercel.json (currently: every hour).
You can also hit this endpoint manually to trigger a sync.
"""

from http.server import BaseHTTPRequestHandler
import json
import sys
import os

# Add parent directory to path so we can import sync.py
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sync import run_sync


class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        # Optional: protect with a secret so random people can't trigger syncs
        expected_secret = os.environ.get("CRON_SECRET")
        if expected_secret:
            auth_header = self.headers.get("Authorization", "")
            if auth_header != f"Bearer {expected_secret}":
                self._respond(401, {"error": "Unauthorized"})
                return

        try:
            counts = run_sync()
            self._respond(200, {
                "ok": True,
                "synced": counts,
            })
        except Exception as e:
            self._respond(500, {
                "ok": False,
                "error": str(e),
            })

    def _respond(self, status: int, body: dict):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(body).encode())
