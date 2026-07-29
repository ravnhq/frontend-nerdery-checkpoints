import type { Contact } from './types'
import { ContactCard } from './ContactCard'

export function ContactList({ contacts }: { contacts: Contact[] }) {
  if (contacts.length === 0) {
    return <div>No contacts found</div>
  }
  return <div>
    {contacts.map(contact => (
      <ContactCard key={contact.id} contact={contact} />
    ))}
  </div>
}
