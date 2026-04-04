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
    <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style>
      body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; margin: 0; padding: 40px 10px; -webkit-font-smoothing: antialiased; }
      .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); }
      
      /* Header */
      .header { background: linear-gradient(135deg, #2563eb 0%, #0891b2 100%); padding: 32px; color: #ffffff; }
      .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em; text-transform: uppercase; }
      .header p { margin: 0; font-size: 14px; opacity: 0.9; font-weight: 500; }
      
      .content { padding: 32px; }
      
      /* Info Grid */
      .info-table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 32px; }
      .info-table td { padding: 12px 0; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
      .lbl { color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; width: 100px; }
      .val { color: #0f172a; font-size: 15px; font-weight: 500; }
      .val a { color: #2563eb; text-decoration: none; }
      
      /* Message Section */
      .msg-container { background: #f8fafc; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; border-left: 4px solid #3b82f6; margin-bottom: 32px; }
      .msg-header { color: #3b82f6; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; display: block; }
      .msg-content { color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap; margin: 0; }
      
      /* Button Section */
      .cta-section { text-align: center; padding: 10px 0; }
      .btn { display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #0891b2 100%); color: #ffffff !important; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 15px; transition: all 0.2s ease; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2); }
      
      /* Footer */
      .footer { padding: 20px 32px; background: #f8fafc; font-size: 11px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
    </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>Inquiry Received</h1>
          <p>Syncline IT Portal · syncline.com.au</p>
        </div>
        
        <div class="content">
          <table class="info-table">
            <tr>
              <td class="lbl">Sender</td>
              <td class="val">${esc(name)}</td>
            </tr>
            ${businessRow}
            <tr>
              <td class="lbl">Email</td>
              <td class="val"><a href="mailto:${esc(email)}">${esc(email)}</a></td>
            </tr>
            ${phoneRow}
          </table>
          
          <div class="msg-container">
            <span class="msg-header">Message Brief</span>
            <div class="msg-content">${esc(message)}</div>
          </div>

          <div class="cta-section">
            <a href="mailto:${esc(email)}?subject=Re: Inquiry from ${esc(name)}" class="btn">
              Reply to ${esc(name)}
            </a>
          </div>
        </div>
        
        <div class="footer">
          Generated <b>${timestamp} AEST</b> via Syncline Web Systems
        </div>
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