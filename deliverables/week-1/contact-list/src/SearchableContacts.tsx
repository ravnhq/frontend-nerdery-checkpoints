import { useState } from 'react';
import { Contact, initialContacts } from './types'
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';

export function SearchableContacts() {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleAddContact(newContact: { name: string; email: string; role: string }) {
    const contact: Contact = {
      id: crypto.randomUUID(),
      ...newContact
    };
    setContacts([...contacts, contact]);
  }
  
  return <div>
    <label htmlFor="search">Search contacts:</label>
    <input
      id="search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <ContactList contacts={filteredContacts} />
    <ContactForm onAdd={handleAddContact} />
  </div>
}

