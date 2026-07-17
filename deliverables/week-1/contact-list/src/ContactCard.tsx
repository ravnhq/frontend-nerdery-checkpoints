import type { Contact } from './types'

// TODO: render the contact's name, email and role.
export function ContactCard({ contact }: { contact: Contact }) {
  return <div style={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
    <span>{contact.name}</span>
    <span>{contact.email}</span>
    <span>{contact.role}</span>
  </div>
}
