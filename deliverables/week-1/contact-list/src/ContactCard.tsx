import type { Contact } from './types'

export function ContactCard({ contact }: { contact: Contact }) {


  return (
    <article className="contact-card">
      <header className="contact-card__header">
        <h2>{contact.name}</h2>
      </header>
      <section className="contact-card__details">
        <p>{contact.email}</p>
        <p>{contact.role}</p>
      </section>
    </article>
  )
}
