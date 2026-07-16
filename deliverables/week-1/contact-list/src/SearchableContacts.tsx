import React from 'react'
import { initialContacts } from './types'
import { ContactList } from './ContactList'
import { ContactForm } from './ContactForm'

export function SearchableContacts() {

  const [contacts, setContacts] = React.useState(initialContacts)
  const [searchTerm, setSearchTerm] = React.useState('')

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleAddContact(newContact: { name: string; email: string; role: string }) {
    const newId = (contacts.length + 1).toString()
    setContacts([...contacts, { id: newId, ...newContact }])
  }

  return (
    <div>
      <label htmlFor="search">Search Contacts:</label>
      <input
        id="search"
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ContactList contacts={filteredContacts} />
      <ContactForm onAdd={handleAddContact} />
    </div>
  )
}
