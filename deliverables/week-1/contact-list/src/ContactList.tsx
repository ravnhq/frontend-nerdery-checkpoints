import type { Contact } from './types'
import {ContactCard} from './ContactCard'
// TODO: render one ContactCard per contact (stable key), or "No contacts found" when empty.
export function ContactList({ contacts }: { contacts: Contact[] }) {
  return <div>
    {contacts.length === 0 ?
    <p>No contacts found</p> :
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <ContactCard contact={contact}/>
          </li>
        ))}
      </ul>
      
    }

    </div>
}
