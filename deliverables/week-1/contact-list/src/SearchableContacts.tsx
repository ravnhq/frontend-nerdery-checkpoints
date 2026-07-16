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
    <div>
      <label htmlFor="contact-search">Search contacts</label>
      <input id="contact-search" value={search} onChange={(event) => setSearch(event.target.value)} />

      <ContactList contacts={filteredContacts} />
      <ContactForm onAdd={handleAdd} />
    </div>
  )
}
