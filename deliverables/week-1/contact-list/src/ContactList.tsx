import { ContactCard } from './ContactCard'
import type { Contact } from './types'

export function ContactList({ contacts }: { contacts: Contact[] }) {

  if (contacts.length === 0) {
      return <p>No contacts found</p>
  }

  return (
    <div>
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  )
}
