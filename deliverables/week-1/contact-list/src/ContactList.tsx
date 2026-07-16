import { ContactCard } from './ContactCard'
import type { Contact } from './types'

export function ContactList({ contacts }: { contacts: Contact[] }) {
  if (contacts.length === 0) {
    return <p style={{ color: '#777777', fontStyle: 'italic' }}>No contacts found</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  )
}
