import { ContactList } from './ContactList'
import { ContactForm } from './ContactForm'
import { initialContacts } from './types'
import type { NewContact } from './types'
import { useState } from 'react'
// TODO: manage contact state; render a "Search contacts" input that filters by
// name or email (case-insensitive); render ContactList and ContactForm (adding appends).

export function SearchableContacts() {
  const [contacts, setContacts] = useState(initialContacts)
  const [query, setQuery] = useState('')
  const normalizedQuery = query.toLowerCase()
  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(normalizedQuery) ||
    c.email.toLowerCase().includes(normalizedQuery)
  )
  function handleAdd(newContact: NewContact) {
    setContacts(prev => [...prev, { ...newContact, id: crypto.randomUUID()}])
  }
  return <div>
    <label>
      Search contacts
      <input name="query" type="search" value={query}
      onChange={(e) => setQuery(e.currentTarget.value)} />
    </label>
    <ContactForm onAdd={handleAdd}/>
    <ContactList contacts={filtered}/>
    </div>
}
