import { useState } from 'react'
import type { NewContact } from './types'

// TODO: accessible form (labels for Name/Email/Role), validate on submit,
// call onAdd only when valid, show an error message when invalid.
export function ContactForm({ onAdd }: { onAdd: (contact: NewContact) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim()) {
      setError('Name is required')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Valid email is required')
      return
    }

    onAdd({ name: name.trim(), email: email.trim(), role: role.trim() })
    setName('')
    setEmail('')
    setRole('')
    setError('')
  }

  return (
    <><h1>Add a new contact</h1><form className="contact-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="contact-role">Role</label>
        <input id="contact-role" value={role} onChange={(e) => setRole(e.target.value)} />
      </div>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Add contact</button>
    </form></>
  )
}
