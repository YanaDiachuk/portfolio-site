'use client'
import { useState } from 'react'

export default function FormContact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [ok, setOk] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()

  function validateEmail(v: string) {
    return /\S+@\S+\.\S+/.test(v)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(undefined)
    setOk(undefined)

    // --- CLIENT-SIDE VALIDATION ---
    if (name.trim().length < 1) {
      setError('Name must be at least 1 character')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email')
      return
    }
    if (message.trim().length < 10) {
      setError('Message must be at least 10 characters')
      return
    }

    // --- SEND TO API ---
    const r = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name, email, message })
    })

    setOk(r.ok ? 'Message sent!' : 'Failed')

    if (r.ok) {
      setName('')
      setEmail('')
      setMessage('')
    }
  }

  return (
    <form className="card space-y-3" onSubmit={submit}>
      <input
        className="input"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        type="email"
        className="input"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <textarea
        className="input h-32"
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      <button data-cy="send-btn" className="btn" type="submit">
        Send
      </button>

      {/* Ошибка валидации */}
      {error && <div className="text-red-400 text-sm">{error}</div>}

      {/* Результат отправки */}
      {ok && <div className="text-sm opacity-70">{ok}</div>}
    </form>
  )
}
