// Cloudflare Pages Function: POST /api/contact
//
// Spam protection, in order: a hidden honeypot field, a minimum time on the form, and a
// Cloudflare Turnstile token verified server-side. Then the message goes out through Resend
// with Reply-To set to the visitor, so replying from your inbox answers them directly.
//
// Set these as secrets on the Pages project (README → Contact form → Turning it on):
//   TURNSTILE_SECRET_KEY  secret from the Turnstile widget
//   RESEND_API_KEY        from resend.com
//   CONTACT_TO            where messages go, e.g. you@gmail.com
//   CONTACT_FROM          sender on a domain verified in Resend, e.g. "Portfolio <hello@yourdomain.com>"
//                         (until a domain is verified, "Portfolio <onboarding@resend.dev>" can only
//                          send to the email address of your Resend account)

interface Env {
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

type Body = {
  name?: unknown;
  email?: unknown;
  topic?: unknown;
  message?: unknown;
  website?: unknown; // honeypot
  elapsed?: unknown; // ms between page load and submit
  'cf-turnstile-response'?: unknown;
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Nobody writes a real message in under 3 seconds.
const MIN_FILL_MS = 3000;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const { TURNSTILE_SECRET_KEY, RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = env;
  if (!TURNSTILE_SECRET_KEY || !RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    return json({ error: "The contact form isn't set up yet." }, 503);
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  // Bots fill the hidden field, or submit faster than anyone can type.
  // Pretend it worked so they don't learn anything.
  const elapsed = Number(body.elapsed);
  if (str(body.website, 200) || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return json({ ok: true });

  // No line breaks in anything that ends up in the subject line.
  const name = str(body.name, 100).replace(/\s+/g, ' ');
  const email = str(body.email, 200);
  const topic = str(body.topic, 100).replace(/\s+/g, ' ') || 'General';
  const message = str(body.message, 5000);
  if (!name || !EMAIL.test(email) || message.length < 10) {
    return json({ error: 'Please fill in your name, a valid email and a message.' }, 400);
  }

  const token = str(body['cf-turnstile-response'], 2048);
  if (!token) return json({ error: 'Please complete the check above the button.' }, 400);

  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret: TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: request.headers.get('CF-Connecting-IP') ?? '',
    }),
  });
  const outcome = (await verify.json()) as { success: boolean };
  if (!outcome.success) return json({ error: "We couldn't verify you're human. Please try again." }, 403);

  const send = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: email,
      subject: `Portfolio: ${topic} from ${name}`,
      text: `${message}\n\n— ${name} <${email}>\nTopic: ${topic}`,
    }),
  });
  if (!send.ok) {
    console.error('resend failed', send.status, await send.text());
    return json({ error: "Your message couldn't be sent right now." }, 502);
  }

  return json({ ok: true });
};
