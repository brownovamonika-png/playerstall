"""
Vercel Python entrypoint shim for this project root.

The scheduled QuickBooks sync runs at GET /api/sync (see api/sync.py). Some Vercel
builds require a discoverable top-level handler when Python is the project runtime.
"""

from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        body = b"qb-crm-automation: use GET /api/sync for QuickBooks sync.\n"
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)
