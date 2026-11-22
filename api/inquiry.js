const limits = { name: 100, email: 254, company: 120, type: 80, budget: 80, description: 4000 }

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Use POST.' })
  }
  const origin = req.headers.origin
  const sameOrigin = origin && (origin === `https://${req.headers.host}` || origin === process.env.INQUIRY_SITE_ORIGIN)
  if (!sameOrigin) return res.status(403).json({ error: 'Invalid origin.' })

  let input
  try {
    input = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ error: 'Invalid request.' })
  }
  if (!input || typeof input !== 'object' || input.website) return res.status(400).json({ error: 'Invalid request.' })
  const data = Object.fromEntries(Object.keys(limits).map(key => [key, typeof input[key] === 'string' ? input[key].trim() : '']))
  if (Object.entries(data).some(([key, value]) => value.length > limits[key]) ||
      !data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || !data.type ||
      /[\r\n]/.test(data.type) || data.description.length < 10) {
    return res.status(400).json({ error: 'Invalid inquiry details.' })
  }

  const { RESEND_API_KEY, INQUIRY_FROM_EMAIL, INQUIRY_TO_EMAIL } = process.env
  if (!RESEND_API_KEY || !INQUIRY_FROM_EMAIL || !INQUIRY_TO_EMAIL) return res.status(503).json({ error: 'Email delivery is unavailable.' })

  const text = [
    `Name: ${data.name}`, `Email: ${data.email}`, `Company: ${data.company || '—'}`,
    `Project type: ${data.type}`, `Budget: ${data.budget || '—'}`, '', data.description
  ].join('\n')
  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: INQUIRY_FROM_EMAIL, to: [INQUIRY_TO_EMAIL], reply_to: data.email,
        subject: `Portfolio inquiry — ${data.type}`, text
      }),
      signal: AbortSignal.timeout(8000)
    })
    if (!result.ok) return res.status(502).json({ error: 'Email delivery failed.' })
    return res.status(200).json({ ok: true })
  } catch {
    return res.status(502).json({ error: 'Email delivery failed.' })
  }
}
