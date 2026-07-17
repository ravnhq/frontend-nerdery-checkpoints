import type { Contact } from './types'

export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <div className="contact-card">
      <p className="contact-name">{contact.name}</p>
      <p className="contact-email">{contact.email}</p>
      <p className="contact-role">{contact.role}</p>
    </div>
  )
}