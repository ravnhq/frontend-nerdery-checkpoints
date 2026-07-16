import type { Contact } from './types'

export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <div>
      <p>{contact.name}</p>
      <p>{contact.email}</p>
      <p>{contact.role}</p>
    </div>
  )
}
