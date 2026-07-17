import { useState, useId } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { type Contact, initialContacts, type NewContact } from './types';

export function SearchableContacts() {
  const [people, setPeople] = useState<Contact[]>(initialContacts);
  const [search, setSearch] = useState('');
  
  const searchId = useId();

  const onAdd = (contact: NewContact) => {
    setPeople(previousPeople => [...previousPeople, { id: crypto.randomUUID(), ...contact}]);
  };

  const filteredPeople = people.filter(person => {
    const query = search.toLowerCase();
    return (
      person.name.toLowerCase().includes(query) ||
      person.email.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <div className="field">
        <label htmlFor={searchId}>Search contacts</label>
        <input
          id={searchId}
          type="text"
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
      </div>

      <ContactForm onAdd={onAdd} />
      
      <ContactList contacts={filteredPeople} />
    </div>
  );
}