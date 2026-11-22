import React, { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { email, services } from '../content.js'

const endpoint = import.meta.env.VITE_INQUIRY_ENDPOINT
const fields = [
  ['name', 'Name', 'text', 'name', 100],
  ['email', 'Email', 'email', 'email', 254],
  ['company', 'Company (optional)', 'text', 'organization', 120]
]

function draft(data) {
  const message = [
    `Name: ${data.name}`, `Email: ${data.email}`,
    data.company && `Company: ${data.company}`,
    `Project type: ${data.type}`,
    data.budget && `Budget: ${data.budget}`,
    '', data.description
  ].filter(line => line !== false).join('\n')
  return `mailto:${email}?subject=${encodeURIComponent(`Project inquiry — ${data.type}`)}&body=${encodeURIComponent(message)}`
}

export default function Inquiry() {
  const [status, setStatus] = useState({ kind: '', message: '' })

  async function submit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (!endpoint) {
      window.location.href = draft(data)
      setStatus({ kind: 'info', message: 'If your email app opened, send the draft from there.' })
      return
    }

    setStatus({ kind: 'pending', message: 'Sending your inquiry…' })
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(12000)
      })
      if (!response.ok || (await response.json()).ok !== true) throw new Error('Delivery failed')
      form.reset()
      setStatus({ kind: 'success', message: 'Your inquiry was sent. Thanks for getting in touch.' })
    } catch {
      setStatus({ kind: 'error', message: 'The inquiry couldn’t be sent. Try again or open an email draft.', href: draft(data) })
    }
  }

  return <form className="inquiry" onSubmit={submit} aria-labelledby="inquiry-heading">
    <h3 id="inquiry-heading">Project inquiry</h3>
    <div className="form-grid">
      {fields.map(([name, label, type, autoComplete, maxLength]) => <label key={name}>{label}
        <input name={name} type={type} autoComplete={autoComplete} maxLength={maxLength} required={name !== 'company'} pattern={name === 'name' ? '.*\\S.*' : undefined}/>
      </label>)}
      <label>Project type<select name="type" required defaultValue="">
        <option disabled value="">Choose a service</option>
        {services.map(([service]) => <option key={service}>{service}</option>)}
        <option>Other</option>
      </select></label>
      <label className="full">Estimated budget (optional)<input name="budget" maxLength={80} placeholder="e.g. ₹30,000–₹50,000"/></label>
      <label className="full">Project description<textarea name="description" rows={4} required minLength={10} maxLength={4000} placeholder="Tell me what you’re building and when you’d like to launch."/></label>
      <input type="text" className="form-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
    </div>
    <button className="action" disabled={status.kind === 'pending'} type="submit">{endpoint ? 'Send inquiry' : 'Open email draft'} <ArrowUpRight size={17}/></button>
    <div className="form-status" role="status">{status.message}{status.href && <> <a href={status.href}>Open email draft</a></>}</div>
  </form>
}
