import { initialContacts, NewContact } from './types'
import { ContactList } from './ContactList'
import { ContactForm } from './ContactForm'
import { useState } from 'react'
import './SearchableContacts.css'

export function SearchableContacts() {
  const [contacts, setContacts] = useState(initialContacts)
  const [searchTerm, setSearchTerm] = useState('')

  const resultContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm),
  )

  return (
    <div className="searchable-contacts">
      <section className="search-bar">
        <label className="contact-label">
          <span>Search contacts</span>
          <input
            type="text"
            name="search"
            onChange={(event) => {
              setSearchTerm(event.target.value)
            }}
            placeholder="Filter by name or email..."
            className="search"
          />
        </label>
      </section>
      <section className="contacts">
        <ContactList contacts={resultContacts} />
      </section>
      <section className="add-contact">
        <ContactForm
          onAdd={(newContact: NewContact) => {
            const lastContact = contacts.at(-1)
            setContacts([
              ...contacts,
              {
                ...newContact,
                id: lastContact ? String(Number(lastContact.id) + 1) : '1',
              },
            ])
          }}
        />
      </section>
    </div>
  )
}
