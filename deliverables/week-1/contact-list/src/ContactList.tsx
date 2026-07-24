import { ContactCard } from './ContactCard'
import type { Contact } from './types'
import './ContactList.css'

export function ContactList({ contacts }: { contacts: Contact[] }) {
  if (contacts.length === 0) {
    return <p className="contact-list__empty">No contacts found</p>
  }

  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <li className="contact-list__item" key={contact.id}>
          <ContactCard contact={contact} />
        </li>
      ))}
    </ul>
  )
}
