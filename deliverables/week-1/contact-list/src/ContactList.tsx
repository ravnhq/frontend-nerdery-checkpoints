import type { Contact } from './types'
import { ContactCard } from './ContactCard'
import './ContactList.css'

export function ContactList({ contacts }: { readonly contacts: Contact[] }) {
  return (
    <div className="contact-list">
      {contacts.length > 0
        ? contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        : 'No contacts found'}
    </div>
  )
}
