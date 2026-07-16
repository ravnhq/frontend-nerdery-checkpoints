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
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxWidth: '320px',
        padding: '16px',
        border: '1px solid #d0d0d0',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
      }}
    >
      {error && (
        <p role="alert" style={{ color: '#b00020', margin: 0 }}>
          {error}
        </p>
      )}

      <label htmlFor="contact-name">Name</label>
      <input
        id="contact-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        style={{ padding: '6px 8px', border: '1px solid #bbbbbb', borderRadius: '4px' }}
      />

      <label htmlFor="contact-email">Email</label>
      <input
        id="contact-email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        style={{ padding: '6px 8px', border: '1px solid #bbbbbb', borderRadius: '4px' }}
      />

      <label htmlFor="contact-role">Role</label>
      <input
        id="contact-role"
        value={role}
        onChange={(event) => setRole(event.target.value)}
        style={{ padding: '6px 8px', border: '1px solid #bbbbbb', borderRadius: '4px' }}
      />

      <button
        type="submit"
        style={{
          padding: '8px 12px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          cursor: 'pointer',
        }}
      >
        Add contact
      </button>
    </form>
  )
}
