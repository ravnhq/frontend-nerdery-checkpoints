import type { Contact } from './types'
import './ContactCard.css'

export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <article className="contact-card">
      <h3 className="contact-card__name">{contact.name}</h3>
      <p className="contact-card__email">{contact.email}</p>
      <p className="contact-card__role">{contact.role}</p>
    </article>
  )
}
