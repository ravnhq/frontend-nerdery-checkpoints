import type { Contact } from './types'

// TODO: render the contact's name, email and role.
export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <div>
      <h3>{contact.name}</h3>
      <p>Email: {contact.email}</p>
      <p>Role: {contact.role}</p>
    </div>
  )
}
