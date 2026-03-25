// api/contact.js
// Vercel Serverless Function — auto-exposed as POST /api/contact
// No extra npm packages needed — fetch is built into the Vercel Node runtime.
//
// Environment variables (set in Vercel Dashboard → Settings → Env Variables):
//   TENANT_ID      → Azure AD / Entra tenant ID
//   CLIENT_ID      → App registration client ID
//   CLIENT_SECRET  → App registration client secret
//   MAILBOX        → info@syncline.com.au

async function getAccessToken() {
  const { TENANT_ID, CLIENT_ID, CLIENT_SECRET } = process.env;

  if (!TENANT_ID || !CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Missing Azure AD environment variables (TENANT_ID / CLIENT_ID / CLIENT_SECRET).');
  }

  const res = await fetch(
    `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
    {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type:    'client_credentials',
        client_id:     CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope:         'https://graph.microsoft.com/.default',
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Azure token error ${res.status}: ${text}`);
  }

  const { access_token } = await res.json();
  return access_token;
}

function esc(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHtmlEmail({ name, business, email, phone, message }) {
  const timestamp = new Date().toLocaleString('en-AU', {
    timeZone:  'Australia/Melbourne',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const businessRow = business
    ? `<tr><td class="lbl">Business</td><td>${esc(business)}</td></tr>` : '';
  const phoneRow = phone
    ? `<tr><td class="lbl">Phone</td><td>${esc(phone)}</td></tr>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/>
<style>
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #0f172a; margin: 0; padding: 24px; }
  .card { max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; overflow: hidden; }
  .header { background: linear-gradient(135deg, #2563eb, #0891b2); padding: 28px 32px; color: #fff; }
  .header h1 { margin: 0; font-size: 22px; font-weight: 800; }
  .header p  { margin: 4px 0 0; font-size: 13px; opacity: .75; }
  .body { padding: 28px 32px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
  td { padding: 10px 12px; font-size: 14px; color: #cbd5e1; border-bottom: 1px solid #334155; vertical-align: top; }
  td.lbl { color: #94a3b8; width: 110px; white-space: nowrap; font-weight: 600; }
  .msg-label { font-size: 13px; color: #94a3b8; font-weight: 600; margin-bottom: 8px; }
  .msg-box { background: #0f172a; border-radius: 8px; padding: 16px; color: #e2e8f0; font-size: 14px; line-height: 1.7; white-space: pre-wrap; }
  .footer { padding: 16px 32px; font-size: 12px; color: #475569; border-top: 1px solid #334155; }
  a { color: #38bdf8; }
</style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>📬 New Website Enquiry</h1>
      <p>Syncline IT · syncline.com.au</p>
    </div>
    <div class="body">
      <table>
        <tr><td class="lbl">Name</td><td>${esc(name)}</td></tr>
        ${businessRow}
        <tr><td class="lbl">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        ${phoneRow}
      </table>
      <div class="msg-label">Message</div>
      <div class="msg-box">${esc(message)}</div>
    </div>
    <div class="footer">Received ${timestamp} AEST · via syncline.com.au</div>
  </div>
</body>
</html>`;
}

async function sendEmail({ name, business, email, phone, message }) {
  const token   = await getAccessToken();
  const MAILBOX = process.env.MAILBOX;

  if (!MAILBOX) throw new Error('MAILBOX environment variable is not set.');

  const subject = `New Enquiry from ${name}${business ? ` – ${business}` : ''}`;

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${MAILBOX}/sendMail`,
    {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        message: {
          subject,
          body: {
            contentType: 'HTML',
            content:     buildHtmlEmail({ name, business, email, phone, message }),
          },
          toRecipients: [{ emailAddress: { address: MAILBOX } }],
          replyTo:      [{ emailAddress: { address: email, name } }],
        },
        saveToSentItems: true,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Graph sendMail error ${res.status}: ${text}`);
  }
}

function sanitise(str = '', max = 2000) {
  return String(str).trim().slice(0, max);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, business, email, phone, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    await sendEmail({
      name:     sanitise(name,     100),
      business: sanitise(business, 200),
      email:    sanitise(email,    254),
      phone:    sanitise(phone,     30),
      message:  sanitise(message, 2000),
    });

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('[api/contact]', err.message);
    return res.status(500).json({
      error: 'Failed to send your message. Please try again or call us directly.',
    });
  }
}