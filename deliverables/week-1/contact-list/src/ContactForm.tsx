import { useState } from 'react'
import type { NewContact } from './types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm({ onAdd }: { onAdd: (contact: NewContact) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name.trim()) {
      setError('Name is required.')
      return
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    onAdd({ name: name.trim(), email: email.trim(), role: role.trim() })
    setName('')
    setEmail('')
    setRole('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p role="alert">{error}</p>}

      <label htmlFor="contact-name">Name</label>
      <input id="contact-name" value={name} onChange={(event) => setName(event.target.value)} />

      <label htmlFor="contact-email">Email</label>
      <input id="contact-email" value={email} onChange={(event) => setEmail(event.target.value)} />

      <label htmlFor="contact-role">Role</label>
      <input id="contact-role" value={role} onChange={(event) => setRole(event.target.value)} />

      <button type="submit">Add contact</button>
    </form>
  )
}
