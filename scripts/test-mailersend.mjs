/**
 * Sends a minimal test email via MailerSend (same API as src/pages/api/send-room-plan.ts).
 *
 * Usage:
 *   node --env-file=.env scripts/test-mailersend.mjs you@example.com
 *
 * Requires MAILERSEND_API_TOKEN. Optional: MAILERSEND_FROM_EMAIL (default team@playerstall.com).
 */

const MAILERSEND_API = 'https://api.mailersend.com/v1/email';

const token = process.env.MAILERSEND_API_TOKEN;
const fromEmail = process.env.MAILERSEND_FROM_EMAIL || 'team@playerstall.com';
const toEmail = process.argv[2] || process.env.MAILERSEND_TEST_TO;

if (!token) {
  console.error('Missing MAILERSEND_API_TOKEN. Add it to .env or export it, then run:');
  console.error('  node --env-file=.env scripts/test-mailersend.mjs your-inbox@example.com');
  process.exit(1);
}

if (!toEmail) {
  console.error('Pass recipient as first argument or set MAILERSEND_TEST_TO, e.g.:');
  console.error('  node --env-file=.env scripts/test-mailersend.mjs your-inbox@example.com');
  process.exit(1);
}

const html = `<!DOCTYPE html><html><body style="font-family:sans-serif;padding:24px;">
<p><strong>PlayerStall MailerSend test</strong></p>
<p>If you received this, <code>team@playerstall.com</code> (or your MAILERSEND_FROM_EMAIL) is working as the sender.</p>
<p style="color:#666;font-size:13px;">Sent at ${new Date().toISOString()}</p>
</body></html>`;

const payload = {
  from: { email: fromEmail, name: 'PlayerStall Test' },
  to: [{ email: toEmail, name: 'Test recipient' }],
  subject: `[PlayerStall] MailerSend test ${new Date().toISOString().slice(0, 19)}Z`,
  html,
};

const res = await fetch(MAILERSEND_API, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(payload),
});

const text = await res.text();
if (!res.ok) {
  console.error(`MailerSend ${res.status}:`, text);
  process.exit(1);
}

console.log('OK — MailerSend accepted the message.');
console.log('Response:', text || '(empty body)');
console.log(`Check inbox for: ${toEmail}`);
console.log(`From address used: ${fromEmail}`);
