import { useEffect, useId, useState } from 'react'
import { ContactForm } from './ContactForm'
import { ContactList } from './ContactList'
import { FieldLabel } from './FieldLabel'
import { initialContacts, type Contact, type NewContact } from './types'
import './SearchableContacts.css'

const STORAGE_KEY = 'contact-list-contacts'

function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `contact-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function hydrateContacts(): Contact[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) {
    try {
      return JSON.parse(stored) as Contact[]
    } catch (e) {
      console.error('SearchableContacts: failed to parse persisted contacts:', e)
    }
  }
  return initialContacts
}

export function SearchableContacts() {
  const searchId = useId()
  const [contacts, setContacts] = useState<Contact[]>(hydrateContacts)
  const [query, setQuery] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
    } catch (e) {
      console.error('SearchableContacts: failed to persist contacts:', e)
    }
  }, [contacts])

  const normalizedQuery = query.trim().toLowerCase()
  const visibleContacts = normalizedQuery
    ? contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(normalizedQuery) ||
          contact.email.toLowerCase().includes(normalizedQuery),
      )
    : contacts

  function handleAdd(contact: NewContact) {
    setContacts((prev) => [...prev, { id: createId(), ...contact }])
  }

  return (
    <section className="contacts">
      <div className="contacts__search">
        <FieldLabel htmlFor={searchId}>Search contacts</FieldLabel>
        <input
          className="contacts__input"
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="contacts__body">
        <div className="contacts__directory">
          <p className="contacts__count">
            <span className="contacts__count-value">
              {String(visibleContacts.length).padStart(2, '0')}
            </span>
            <span className="contacts__count-label">shown</span>
          </p>
          <ContactList contacts={visibleContacts} />
        </div>
        <ContactForm onAdd={handleAdd} />
      </div>
    </section>
  )
}
