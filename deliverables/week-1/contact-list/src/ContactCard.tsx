import type { Contact } from './types'

// TODO: render the contact's name, email and role.
export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <div className="contact-card"> 
      <p>{contact.name}</p>
      <p>{contact.email}</p>
      <p>{contact.role}</p>
    </div>
  )
}
