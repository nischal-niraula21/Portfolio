const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8' }
});

const clean = (value) => String(value ?? '').trim();

const escapeHtml = (value) => clean(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== '/api/contact') {
      return env.ASSETS.fetch(request);
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed.' }, 405);
    }

    const origin = request.headers.get('Origin');
    if (origin && new URL(origin).host !== url.host) {
      return json({ error: 'Invalid request origin.' }, 403);
    }

    if (!env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured.');
      return json({ error: 'Contact form is not configured yet.' }, 503);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid request.' }, 400);
    }

    const name = clean(body.name);
    const email = clean(body.email).toLowerCase();
    const message = clean(body.message);
    const website = clean(body.website);

    if (website) return json({ ok: true });

    if (name.length < 2 || name.length > 80) {
      return json({ error: 'Please enter a valid name.' }, 400);
    }
    if (!isEmail(email) || email.length > 160) {
      return json({ error: 'Please enter a valid email address.' }, 400);
    }
    if (message.length < 10 || message.length > 3000) {
      return json({ error: 'Your message must be between 10 and 3000 characters.' }, 400);
    }

    const to = env.CONTACT_TO || 'nischalniraula21@gmail.com';
    const from = env.CONTACT_FROM || 'Nischal Niraula Portfolio <contact@nischal-niraula.com.np>';
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replaceAll('\n', '<br>');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        html: `<h2>New portfolio message</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Message:</strong></p><p>${safeMessage}</p>`,
        text: `New portfolio message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Resend error:', response.status, detail);
      return json({ error: 'Unable to send your message right now. Please try again later.' }, 502);
    }

    return json({ ok: true });
  }
};
