'use client'
import { useState } from 'react'

export default function FormContact() {
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [message, setMessage] = useState('')
  const [ok, setOk] = useState<string|undefined>()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const r = await fetch('/api/contact', { method:'POST', body: JSON.stringify({ name, email, message }) })
    setOk(r.ok ? 'Message sent!' : 'Failed')
    if (r.ok) { setName(''); setEmail(''); setMessage('') }
  }

  return (
    <form className="card space-y-3" onSubmit={submit}>
      <input className="input" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
      <input type="email" className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <textarea className="input h-32" placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} />
      <button data-cy='send-btn' className="btn" type="submit">Send</button>
      {ok && <div className="text-sm opacity-70">{ok}</div>}
    </form>
  )
}

