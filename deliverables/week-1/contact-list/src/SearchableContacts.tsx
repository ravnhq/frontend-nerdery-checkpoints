import { useState } from 'react'
import { ContactForm } from './ContactForm'
import { ContactList } from './ContactList'
import { initialContacts, type Contact, type NewContact } from './types'

export function SearchableContacts() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [search, setSearch] = useState('')

  const filteredContacts = contacts.filter((contact) => {
    const query = search.toLowerCase()
    return contact.name.toLowerCase().includes(query) || contact.email.toLowerCase().includes(query)
  })

  function handleAdd(newContact: NewContact) {
    setContacts((current) => [...current, { ...newContact, id: crypto.randomUUID() }])
  }

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="contact-search">Search contacts</label>
        <input
          id="contact-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{
            display: 'block',
            marginTop: '4px',
            padding: '6px 8px',
            border: '1px solid #bbbbbb',
            borderRadius: '4px',
            width: '100%',
          }}
        />
      </div>

      <ContactList contacts={filteredContacts} />

      <div style={{ marginTop: '16px' }}>
        <ContactForm onAdd={handleAdd} />
      </div>
    </div>
  )
}
