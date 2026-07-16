import { useState } from 'react'
import type { Contact, NewContact } from './types'
import { initialContacts } from './types'
import { ContactList } from './ContactList'
import { ContactForm } from './ContactForm'

// TODO: manage contact state; render a "Search contacts" input that filters by
// name or email (case-insensitive); render ContactList and ContactForm (adding appends).
export function SearchableContacts() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [search, setSearch] = useState('')

  const term = search.toLowerCase()
  const filtered = contacts.filter((c) => {
    return c.name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term)
  })

  function handleAdd(newContact: NewContact) {
    setContacts((prev) => [
      ...prev, { ...newContact, id: crypto.randomUUID() },
    ])
  }

  return (
    <div className="contacts">
      <div className="contacts__search">
        <label htmlFor="search-contacts">Search contacts</label>
        <input
          id="search-contacts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ContactList contacts={filtered} />
      <ContactForm onAdd={handleAdd} />
    </div>
  )
}
