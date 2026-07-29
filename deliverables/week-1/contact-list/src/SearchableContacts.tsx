import React from 'react'
import { initialContacts } from './types'
import { ContactList } from './ContactList'
import { ContactForm } from './ContactForm'
import { ErrorBoundary } from './ErrorBoundary'

// TODO: manage contact state; render a "Search contacts" input that filters by
// name or email (case-insensitive); render ContactList and ContactForm (adding appends).
export function SearchableContacts() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [contacts, setContacts] = React.useState(initialContacts);
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className="contacts-container">
      <h1>Searchable Contacts</h1>
      <input
        type="text"
        aria-label="Search contacts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p aria-live="polite">
        Showing {filteredContacts.length} of {contacts.length} contacts
      </p>
      {/* Scoped to just ContactList (not the whole component) — ContactForm (adding a
    contact) stays useful even if the list fails to render, so the user doesn't
    lose all functionality. */}
      <ErrorBoundary>
        <ContactList contacts={filteredContacts} />
      </ErrorBoundary>
      <ContactForm onAdd={(contact) => setContacts((prevContacts) => [...prevContacts, { ...contact, id: crypto.randomUUID() }])} />
    </div>
  );
}
