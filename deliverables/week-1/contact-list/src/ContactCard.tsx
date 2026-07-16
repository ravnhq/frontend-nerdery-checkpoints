import type { Contact } from './types'


export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <div className="contact-card">
      <h3>{contact.name}</h3>
      <p>{contact.email}</p>
      <p>{contact.role}</p>
    </div>
  )
}