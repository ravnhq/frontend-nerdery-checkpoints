import type { Contact } from './types'

export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <div
      style={{
        border: '1px solid #d0d0d0',
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <p style={{ margin: '0 0 4px', fontWeight: 'bold' }}>{contact.name}</p>
      <p style={{ margin: '0 0 4px', color: '#555555' }}>{contact.email}</p>
      <p style={{ margin: 0, fontStyle: 'italic', color: '#777777' }}>{contact.role}</p>
    </div>
  )
}
