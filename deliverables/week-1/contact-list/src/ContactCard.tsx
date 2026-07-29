import './ContactCard.css'
import type { Contact } from './types'

export function ContactCard({ contact }: { readonly contact: Contact }) {
  return (
    <div className="contact-card">
      <h3 className="contact-name">{contact.name}</h3>
      <span className="contact-email">{contact.email}</span>
      <span className="contact-role">{contact.role}</span>
    </div>
  )
}
