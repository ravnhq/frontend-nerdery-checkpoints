import type { Contact } from './types'
import { ContactCard } from './ContactCard'

// TODO: render one ContactCard per contact (stable key), or "No contacts found" when empty.
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
