import { useRef, useState } from 'react'
import type { Contact, NewContact } from './types'
import { initialContacts } from './types'
import { ContactList } from './ContactList'
import { ContactForm } from './ContactForm'

function getNextContactId(contacts: Contact[]) {
  const maxId = contacts.reduce((currentMax, contact) => {
    const numericId = Number(contact.id)
    return Number.isFinite(numericId) ? Math.max(currentMax, numericId) : currentMax
  }, 0)

  return maxId + 1
}

// TODO: manage contact state; render a "Search contacts" input that filters by
// name or email (case-insensitive); render ContactList and ContactForm (adding appends).
export function SearchableContacts() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [search, setSearch] = useState('')
  const nextContactId = useRef(getNextContactId(initialContacts))

  const term = search.toLowerCase()
  const filtered = contacts.filter((c) => {
    return c.name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term)
  })

  function handleAdd(newContact: NewContact) {
    const id = String(nextContactId.current)
    nextContactId.current += 1

    setContacts((prev) => [
      ...prev, { ...newContact, id },
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
