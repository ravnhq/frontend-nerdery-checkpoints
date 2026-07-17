import type { NewContact } from './types'
import { useState } from 'react'
// TODO: accessible form (labels for Name/Email/Role), validate on submit,
// call onAdd only when valid, show an error message when invalid.
export function ContactForm({ onAdd }: { onAdd: (contact: NewContact) => void }) {
  const [newContact, setNewContact] = useState<NewContact>({
    name: '',
    email: '',
    role: '',
  })
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault() // sin esto, el navegador recarga la página
    const looksLikeEmail = /^\S+@\S+\.\S+$/.test(newContact.email)
    if (!newContact.name.trim() || !looksLikeEmail || !newContact.role.trim()) {
      setError('Please enter a valid name and email.')
      return
    }

    onAdd(newContact)
    setNewContact({ name: '', email: '', role: '' }) // vuelve al estado inicial vacío
    setError('')
  }
  return <form onSubmit={handleSubmit}>
    <label>
      Name
      <input name="name" type="text" value={newContact.name} onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}/>
    </label>
    <label>
      Email
      <input name="email" type="text" value={newContact.email} onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}/>
    </label>
    <label>
      Role
      <input name="role" type="text" value={newContact.role} onChange={(e) => setNewContact(prev => ({ ...prev, role: e.target.value }))}/>
    </label>
    {error && <div role="alert">{error}</div>}
    <button type="submit">Add</button>
    </form>
}
