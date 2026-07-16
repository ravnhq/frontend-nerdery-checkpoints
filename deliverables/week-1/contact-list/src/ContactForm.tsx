import React from 'react'
import type { NewContact } from './types'

export function ContactForm({ onAdd }: { onAdd: (contact: NewContact) => void }) {

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [role, setRole] = React.useState('')
  const [error, setError] = React.useState('')

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if(!name || !email || !role) {
      setError('All fields are required.')
      return
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }
    onAdd({ name, email, role })
    setName('')
    setEmail('')
    setRole('')
    setError('')
  }

  return <form onSubmit={handleSubmit}>
    <label>
      Name:
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </label>
    <label>
      Email:
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </label>
    <label> 
      Role:
      <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
    </label>
    <button type="submit">Add Contact</button>
    {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}
  </form>
}
